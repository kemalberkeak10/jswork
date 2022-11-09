$(function() {
    $('.well .pull-right').prepend('<a id="btnAmbar" class="btn btn-sm btn-success"  style="margin-right:10px;" >Stok Sorgula</a>');

    $('body').on('click', '#btnAmbar', function() {

        ModalCreate();
        GetItems();
    });

    $("body").on("keyup", '#searchAmbar', function() {
        var trList = $('#newTbl tbody tr');
        var value = $(this).val().toLowerCase();
        trList.filter(function() {
            $(this).toggle($(this).find('td:eq(0) input').val().trim().toLowerCase().indexOf(value) > -1);
        });
    });


});

function ModalCreate() {
    $('#modalNewOrder').remove();
    window.setModal.Create({
        id: 'modalNewOrder',
        html: {
            header: ' <h3 class="text-center"><strong>Ambar Bazlı Stok Bilgisi</strong></h3>',
            body: '<table class="table" style="width: 100%">' +
                '<thead>' +
                '<tr style="background:#ffffff;"><th style="width:300px;">Ambar Adına Göre Ara:</th><th>Toplam Stok Miktarı:</th></tr>' +
                '</thead>' +
                '<tbody>' +
                '<tr>' +
                '<td colspan="1" rowspan="1"><input id="searchAmbar" autocomplete="off" type="text" class="form-control"></td>' +
                '<td colspan="1" rowspan="1"><input id="ToplamStok" autocomplete="off" type="text" class="form-control" disabled></td>' +
                '</tr>' +
                '</tbody>' +
                '<div></div>' +
                '<table id="newTbl" class="table">' +
                '<thead>' +
                '<th style="background:#d2f7f7; width:300px; tex-align:center">Ambar</th>' +
                '<th style="background:#d2f7f7; text-center">Stok Miktarı</th>' +
                '</thead>' +
                '<tbody>' +
                '</tbody>' +
                '</table>',
            footer: '<button data-dismiss="modal" class="btn btn-danger btn-sm">Kapat</button>'
        }
    });
    $('#modalNewOrder').modal('toggle');
}

function GetItems() {

    var itemCode = $('label[for=43DE9E11CE6B4A8E80054032A134FC9E]').parent().data('value');
    debugger;
    var url = 'https://krallogowebapi.setcrm.com/api/logo/GetStok?urunkodu=' + itemCode;

    var toplamStok = 0;

    $.get(url, function(r) {
        debugger;
        /*  if (r.Status) {*/
        $.each(r, function(i, v) {
            var newRow = $('<tr>', {
                'data-id': i,
                'data-rowid': i
            });
            toplamStok = toplamStok + parseInt(v.STOK);
            var onHand = v.STOK;
            newRow.append('<td style="width:300px;"><input id="' + String.format('WhsName_{0}', i) + '" type="text" class="form-control urun-sira" disabled value="' + v.DEPO_ADI + '"></td>');
            newRow.append('<td><input id="' + String.format('OnHand_{0}', i) + '" type="text" class="form-control urun-sira" disabled value="' + onHand + '"></td></tr>');
            $('#newTbl tbody').append(newRow);
        });
        $('#ToplamStok').val(toplamStok);
    });
}