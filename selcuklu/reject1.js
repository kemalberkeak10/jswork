$(function() {
    var br = $(".btn-br-actions[data-publicid=F7A0CCA5B7D14AC0AEC8E507E5AE8A22]");
    br.hide();
    br.closest('td').append('<a href="#" class="btn btn-sm btn-warning" id="reject1">Reddet 1</a>');

    $('body').on('click', '#reject1', function() {

        $('#modalReject1').remove();
        window.setModal.Create({
            id: 'modalReject1',
            html: {
                header: 'Reddet 1',
                body: '<div id="errorMessage"></div>' +
                    '<div id="loading" style="margin:0 0 5px; width: 100%;display:none;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>' +
                    '<div id="rejectDiv"><div class="form-group" style="margin:10px 0 0 0"><label for="description">Reddetme Açıklaması</label><br><textarea id="rejectDescription" style="resize:vertical" name="rejectDescription" class="form-control" rows="2" maxlength=""></textarea></div></div>',
                footer: '<button type="button" class="btn btn-success btn-sm" id="rejectOkButton"> Güncelle</button><button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Kapat</button>'
            }
        });

        $('#modalReject1').modal('toggle');

        var onayBelgesiDurum = $("label[for=9666C67310FB4374BCCE42F6A2B140C2]").closest('div').data("publicids");
        if (onayBelgesiDurum !== "B9E35F5F6E8440AAADD2A30B3AE56122") {
            setUtil.alert({
                container: '#modalReject1 .modal-body #errorMessage',
                message: 'Onay belgesi durumu talep edildi olması gerekmektedir. Lütfen kontrol ediniz!',
                alertClass: 'alert-danger',
                autoClose: false
            });
            $("#rejectDiv").hide();
            $("#rejectOkButton").remove();
        }
    });

    $('body').on('click',
        '#rejectOkButton',
        function() {
            var $this = $(this),
                rejectDescription = $("#rejectDescription").val();
            if (String.isNullOrWhiteSpace(rejectDescription)) {
                setUtil.alert({
                    container: '#modalReject1 .modal-body #errorMessage',
                    message: "Lütfen reddetme açıklamasını giriniz.",
                    alertClass: 'alert-danger',
                    autoClose: true
                });
                return;
            }

            $this.hide();
            $("#modalReject1 .modal-body").find('#rejectDiv').hide();
            $("#modalReject1 .modal-body").find('#loading').show();

            var url = 'https://selcuklukentapi.setcrm.com/api/data/Reject';
            $.post(url, {
                    Type: '1',
                    Description: rejectDescription,
                    RecordId: $("#RecordPublicId").val()
                },
                function(r) {
                    $("#modalReject1 .modal-body").find('#loading').hide();
                    if (r.IsOk) {
                        $("#modalReject1").modal("toggle");
                        br.trigger('click');
                    } else {
                        $this.show();
                        $("#modalReject1 .modal-body").find('#supervisorDiv').show();
                        setUtil.alert({
                            container: '#modalReject1 .modal-body #errorMessage',
                            message: r.Message,
                            alertClass: 'alert-danger',
                            autoClose: true
                        });
                    }
                }
            );
        });
});