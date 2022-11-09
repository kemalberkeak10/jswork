$(function() {
    $('label[for=44DA9A72E25D40AB93B30C634A661500]').append('<a style="margin-left: 5px" class="stok-sorgula" title="Stok Sorgula"><i class="fa fa-search pointer"></i></a>');
    $('body').on('click', '.stok-sorgula', function() {
        var urunData = $('#44DA9A72E25D40AB93B30C634A661500').select2('data');
        if (String.isNullOrWhiteSpace(urunData)) {
            return;
        };
        var urunText = $('#44DA9A72E25D40AB93B30C634A661500').select2('data').text
        if (String.isNullOrWhiteSpace(urunText)) return;
        var urunKodList = urunText.split('-');
        var urunKod = "";
        $.each(urunKodList, function(i, v) {
            if (i != urunKodList.length - 1) {
                if (i == urunKodList.length - 2) {
                    urunKod += v;
                } else {
                    urunKod += v + '-';
                }
            }
        });
        console.log(urunKod);

        var itemCode = urunKod;
        ModalCreate();
        GetItems(itemCode);
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

function GetItems(itemCode) {

    var url = 'https://krallogowebapi.setcrm.com/api/logo/GetStok?urunkodu=' + itemCode;

    var toplamStok = 0;

    $.get(url, function(r) {
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