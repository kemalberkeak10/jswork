$(function() {
    $('.well .pull-right:eq(0)').prepend("<a id='btnChangeTopluCihaz' class='btn btn-sm btn-info pull-left'  style='margin-right:10px;'>Cihaz Konumunu Toplu Güncelle</a>");
    var trList = $('.no-more-table tbody tr');
    var tdLength = $('.no-more-table tbody tr:eq(0)').find('td').length;
    $.each(trList, function(i, el) {
        $(this).find('td:eq(0)').append('<input type="checkbox" class="sec"/>');
    });
    var recordList = [];
    $('body').on('click', '#btnChangeTopluCihaz', function() {
        var isExist = false;
        var chcList = $('.sec');
        $.each(chcList, function(i, el) {
            if ($(this).prop('checked')) {
                isExist = true;
                var recordId = $(this).parents('tr').attr('data-id');
                recordList.push(recordId);
            }
        });
        if (!isExist) {
            alert("Bu işlemi gerçekleştirmek için en az bir kayıt seçmelisiniz.");
        } else {
            $('#modalTopluCihazUpdate').remove();
            window.setModal.Create({
                id: 'modalTopluCihazUpdate',
                html: {
                    header: 'Cihaz Konumu Güncelle',
                    body: '<div id="txt" style="margin:0 0 5px; width: 100%;"></div>' +
                        '<div id="msg" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>' +
                        '<table id=modalTable class="table" style="width: 100%">' +
                        '<tbody>' +
                        '<tr>' +
                        '<td id="selectTopluCihaz" colspan="1" rowspan="1"><input id="topluCihaz" type="select"  style="resize:none;width:100%;"></td>' +
                        '</tr>' +
                        '</tbody>' +
                        '</table>',
                    footer: '<button id="btnKaydetTopluCihaz" type="button" class="btn btn-sm btn-success" >Kaydet</button>' + '<button class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>',
                }
            });
            $('#msg').hide();
            $('#modalTopluCihazUpdate').modal('toggle');

            prepareSelect2(
                "#topluCihaz",
                "/Summary/LookupFieldValues", {
                    coId: "41DF6B799F60447291342100E65D25AC",
                    id: "0411390B99D645249F0DE7C044111E2B",
                    viewFilterId: "55FD21A9FD954E739A449A4E19809E64",
                },
                null,
                false
            );

        };
    });

    $('body').on('click',
        '#btnKaydetTopluCihaz',
        function() {
            $('.modal-footer').hide();
            var topluCihazKonumuVal = $('#topluCihaz').val();
            var data = {
                CustomObjectId: $('#CustomObjectPublicId').val(),
                CihazKonumId: topluCihazKonumuVal,
                Fields: recordList,
            }
            $('#selectTopluCihaz').hide();
            $('#msg').show();
            var url2 = 'http://localhost:11174/api/data/TopluCihazKonumUpdate';
            $.post(url2, data, function(r) {
                if (r.Status) {
                    $('#msg').hide();
                    setUtil.alert({
                        container: '#modalTopluCihazUpdate .modal-body #txt',
                        message: "işleminiz başarıyla tamamlandı. Sayfa yenileniyor lütfen bekleyiniz...",
                        alertClass: 'alert-success',
                        autoClose: true
                    });
                    setTimeout(() => {
                        window.location.reload();
                    }, 700);
                } else {
                    $('#msg').hide();
                    setUtil.alert({
                        container: '#modalTopluCihazUpdate .modal-body #txt',
                        message: r.Message,
                        alertClass: 'alert-danger',
                        autoClose: false
                    });
                }
            });


        });
});