$(function() {
    $('.btn-br-actions[data-publicid=BFC70ADB670044DEADAF56B8260F0BAD]').hide();
    $('.btn-br-actions[data-publicid=BFC70ADB670044DEADAF56B8260F0BAD]').closest('td').prepend('<a id="btnTesteGonder" class="btn btn-sm btn-warning"  style="margin-right:10px;" >Test Edilmesi Bekleniyor</a>');
    $('body').on('click', '#btnTesteGonder', function() {
        $('#modalSablon').remove();
        window.setModal.Create({
            id: 'modalSablon',
            html: {
                content: 'style="width:900px !important"',
                body: '<div id="msg" style="margin:0 23px 5px; width: 80%;font-size:15px;"></div>' +
                    '<table class="table" style="width: 100%">' +
                    '<tbody>' +
                    '<tr>' +
                    '<td colspan="2" rowspan="1">' +
                    '<label class="text-center" style="width:50%;border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;">Harcanan Zaman:</label>' +
                    '<input id="harcananZaman"  type="text" style="width:50%;border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;"></td>' +
                    '</div>' +
                    '</tr>' +
                    '</tbody>' +
                    footer: '<button id="btnKaydetSatis" type="button" class="btn btn-sm btn-success" >Kaydet</button>' + '<button type="button" class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>'
            }
        });
        // $('#modalSablon .modal-body').css('height', '450px');
        $('#modalSablon .modal-dialog').css('width', '25%');
        $('#modalSablon').modal('toggle');

        var harcananZaman = $('label[for=AB531C78EDBF438A9BD8660899C0F8A3]').parent().data('value');
        $('#harcananZaman').val(harcananZaman);

    });


    $('body').on('click', '#btnKaydetSatis', function() {
        var data = {
                RecordId: $('#D91AE774A0554BE1B0E55BC2FD12E750').val(),
                HarcananZaman: $('#harcananZaman').val(),

            }
            // var url = 'https://meyicki.setcrm.com/api/data/SatisOnayGuncelle';
            //var url2 = 'http://localhost:50058/api/data/SatisOnayGuncelle';
        $('#modalSablon .modal-body').html('<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>');
        $.post(url, data, function(r) {
            if (r.Status) {
                $('#modalSablon').modal('toggle');
            } else {
                setUtil.alert({
                    container: '#modalSablon .modal-body #msg',
                    message: r.Message,
                    alertClass: 'alert-danger',
                    autoClose: true
                });
            }
        });
    });

});