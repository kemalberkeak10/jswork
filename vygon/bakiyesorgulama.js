$(function() {
    $('.well .pull-right').prepend('<a id="btnBalance" class="btn btn-sm btn-success"  style="margin-right:10px;" >Bakiye Sorgula</a>');

    var cariKod = $('label[for="D60F86E438A84F5BBC48A6946781AE19"]').parent().data('value');
    //$('#cariKod').val(cariKod);
    var cariAdi = $('label[for="00D69900042744E497F1A1320E71D8BE"]').parent().data('value');
    //$('#cariUnvan').val(cariAdi);
    //var balance = $('label[for="00D69900042744E497F1A1320E71D8BE"]').parent().data('value');
    //$('#Bakiye').val(balance);

    $('body').on('click', '#btnBalance', function() {
        $('#modalBakiye').remove();
        window.setModal.Create({
            id: 'modalBakiye',
            html: {
                content: 'style="width:900px !important"',
                header: 'Cari Bakiye Bilgisi',
                body: '<div id="msg" style="margin:0 23px 5px; width: 80%;font-size:15px;"></div>' +
                    '<table class="table" style="width: 100%">' +
                    '<thead>' +
                    '<tr><th>Cari Kod</th><th>Cari Ünvan</th><th>Bakiye</th></tr>' +
                    '</thead>' +
                    '<tbody>' +
                    '<tr>' +
                    '<td colspan="1" rowspan="1"><label id="cariKod" type="text" style="width:100%; border-radius: 5px; border: 1px solid #5BC0DE; padding: 12px 18px;">' + cariKod + '</label></td>' +
                    '<td colspan="1" rowspan="1"><label id="cariUnvan" type="text" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 12px 18px;">' + cariAdi + '</label></td>' +
                    '<td colspan="1" rowspan="1"><input id="Bakiye" type="text" disabled="disabled" style="width:100%;font-weight: bold; border-radius: 3px; border: 1px solid #5BC0DE; padding: 12px 18px;"></input></td>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>',
                footer: '<button type="button" class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>'
            }
        });

        $('#modalBakiye .modal-dialog').css('width', '80%');
        $('#modalBakiye').modal('toggle');

        data = {
            CariKod: cariKod,
        }
        var url = 'https://meyicki.setcrm.com/api/data/GetBakiye';
        var url2 = 'http://localhost:60066/api/data/GetBakiye';
        $('#modalBakiye .modal-body').append('<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>');
        $('#modalBakiye .modal-dialog').css('width', '50%');
        $.get(url2, data, function(r) {
            $('#txt').hide();
            if (r.Status) {
                $('#Bakiye').val(r.balance);
            } else {
                setUtil.alert({
                    container: '#modalBakiye .modal-body #msg',
                    message: r.Message,
                    alertClass: 'alert-danger',
                    autoClose: false
                });
            }
        });
    });
});