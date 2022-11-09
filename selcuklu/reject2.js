$(function() {
    var br = $(".btn-br-actions[data-publicid=681A7DBFB9424FB4AC2113A26480310C]");
    br.hide();
    br.closest('td').append('<a href="#" class="btn btn-sm btn-warning" id="reject2">Reddet2</a>');

    $('body').on('click', '#reject2', function() {

        $('#modalReject2').remove();
        window.setModal.Create({
            id: 'modalReject2',
            html: {
                header: 'Reddet 2',
                body: '<div id="errorMessage"></div>' +
                    '<div id="loading" style="margin:0 0 5px; width: 100%;display:none;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>' +
                    '<div id="rejectDiv2"><div class="form-group" style="margin:10px 0 0 0"><label for="description">Reddetme Açıklaması</label><br><textarea id="rejectDescription2" style="resize:vertical" name="rejectDescription2" class="form-control" rows="2" maxlength=""></textarea></div></div>',
                footer: '<button type="button" class="btn btn-success btn-sm" id="rejectOkButton"> Güncelle</button><button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Kapat</button>'
            }
        });

        $('#modalReject2').modal('toggle');

        var onayBelgesiDurum = $("label[for=9666C67310FB4374BCCE42F6A2B140C2]").closest('div').data("publicids"),
            onay2 = $("label[for=230C53439203499AAFC9184A170F9355]").closest('div').data("publicids");
        if (!String.isNullOrWhiteSpace(onay2)) {
            setUtil.alert({
                container: '#modalReject2 .modal-body #errorMessage',
                message: 'Zaten reddedilmiştir. Lütfen kontrol ediniz!',
                alertClass: 'alert-danger',
                autoClose: false
            });
            $("#rejectDiv2").hide();
            $("#rejectOkButton").remove();
        }
    });

    $('body').on('click',
        '#rejectOkButton',
        function() {
            var $this = $(this),
                rejectDescription2 = $("#rejectDescription2").val();
            if (String.isNullOrWhiteSpace(rejectDescription2)) {
                setUtil.alert({
                    container: '#modalReject2 .modal-body #errorMessage',
                    message: "Lütfen reddetme açıklamasını giriniz.",
                    alertClass: 'alert-danger',
                    autoClose: true
                });
                return;
            }

            $this.hide();
            $("#modalReject2 .modal-body").find('#rejectDiv2').hide();
            $("#modalReject2 .modal-body").find('#loading').show();

            var url = 'https://selcuklukentapi.setcrm.com/api/data/Reject';
            $.post(url, {
                    Type: '2',
                    Description: rejectDescription2,
                    RecordId: $("#RecordPublicId").val()
                },
                function(r) {
                    $("#modalReject2 .modal-body").find('#loading').hide();
                    if (r.IsOk) {
                        $("#modalReject2").modal("toggle");
                        br.trigger('click');
                    } else {
                        $this.show();
                        $("#modalReject2 .modal-body").find('#supervisorDiv').show();
                        setUtil.alert({
                            container: '#modalReject2 .modal-body #errorMessage',
                            message: r.Message,
                            alertClass: 'alert-danger',
                            autoClose: true
                        });
                    }
                }
            );
        });
});