$(function() {
    $('.well .pull-right:eq(0)').prepend("<a id='btnChangeTopluCihaz' class='btn btn-sm btn-info pull-left'  style='margin-right:10px;'>Cihaz Konumunu Toplu Güncelle</a>");
    var trList = $('.no-more-table tbody tr');
    var tdLength = $('.no-more-table tbody tr:eq(0)').find('td').length;
    $.each(trList, function(i, el) {
        $(this).find('td:eq(0)').append('<input type="checkbox" class="sec"/>');
    });
    var recordList = '';
    $('body').on('click', '#btnChangeTopluCihaz', function() {
        var isExist = false;
        var chcList = $('.sec');
        $.each(chcList, function(i, el) {
            if ($(this).prop('checked')) {
                isExist = true;
                var recordId = $(this).parents('tr').attr('data-id');
                recordList += recordId + '|';
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
                    body: '<div id="msg" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>' +
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
                    coId: "1E190AF11F3F4DDE9154838F8E7DD595",
                    id: "6434502A462D41E0B1BC84CB00B0EC58",
                    viewFilterId: "F3A1E3334E4A4CD180C96F1CB0CF415F",
                },
                null,
                false
            );

        };
    });

    $('body').on('click',
        '#btnKaydetTopluCihaz',
        function() {
            var topluCihazKonumuVal = $('#topluCihaz').val();
            var recordsList = recordList.split('|');
            $('#msg').show();
            recordsList.forEach(record => {
                $('#selectTopluCihaz').hide();
                var data = {
                    customObjectId: "1E190AF11F3F4DDE9154838F8E7DD595",
                    recordId: record,
                    fieldId: '6434502A462D41E0B1BC84CB00B0EC58 ',
                    value: topluCihazKonumuVal
                };
                $.post('/Set/UpdateFieldValue', data, function(r) {

                    if (!r.IsOk) {}
                });
            });
            setTimeout(() => {
                window.location.reload();
            }, 2000);


        });
});