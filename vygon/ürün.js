$(function() {

    //$('.well .pull-right:eq(0)').prepend('<a id="btnSpg" class="btn btn-sm btn-success"  style="margin-right:10px;" >Sipariş Oluştur</a>');
    $('.field-responsive-area').find('.fa-angle-down').append('<a id="btnSpg" class="btn btn-danger btn-xs pull-right" style="margin-left:10px;">ÜRÜN EKLE</a>');
    $('body').on('click', '#btnSpg', function() {
        ModalCreate();
        prepareSelect2('#selectGrup', '/Summary/LookupFieldValues', {
            coId: '49C158C15DBF49A6AA70DA68AA06BAD5',
            id: '05102BDBABE74281A67E99A1BDA0389B',
            viewFilterId: 'E289221647DD4937924677C0641EC0F0'
        }, null, false);

    });
    $('body').on('change', '#selectGrup', function() {
        if (!String.isNullOrWhiteSpace($('#selectGrup').val())) {
            ModalTableCreate();
            console.log("Modal tablosu oluşturma başarılı.");
        }
    });

    $("body").on("keyup", '#searchUrun',
        function() {
            var trList = $('#newTbl tbody tr');
            var value = $(this).val().toLowerCase();
            trList.filter(function() {
                $(this).toggle($(this).find('td:eq(0) label').text().trim().toLowerCase().indexOf(value) > -1);
            });
        });

    $('body').on('click', '.deleteRow', function() {
        $(this).parents('tr').remove();
    });

    $('body').on('click', '#btnOlustur', function() {
        $('#modalLoading').remove();
        window.setModal.Create({
            id: 'modalLoading',
            html: {
                header: ' ',
                body: '<div id="txt" style="margin:0 0 5px; width: 100%;">İşlem biraz uzun sürebilir, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>',

            }
        });
        $('#modalLoading').modal('toggle');
        CreateNewOrder();
    });

});

function ModalCreate() {
    window.setModal.Create({
        id: 'modalNewOrder',
        html: {
            header: ' <h3 class="text-center"><strong>Yeni Sipariş Oluşturma</strong></h3>',
            body: '<div id="msg" style="margin:0 23px 5px; width: 100%;font-size:15px;"></div>' +
                '<div style="width:300px;margin-bottom:10px;"><label style="font-size:15px;">Grup: </label><input id="selectGrup" type="select" class="form-control"></div>' +
                '<div style="width:300px;margin-bottom:10px;"><label style="font-size:15px;">Ürün Ara: </label><input id="searchUrun" type="text"  class="form-control"></div>' +
                '<div id="contentModalNewOrder">' +

                '<div class="row" id="grupluUrunH3" style="display:none;"><h3 class="text-center" style="margin-right:35px;"><strong>Ürünler</strong></h3></div>' +
                '<table id="newTbl" class="table" style="display:none;">' +
                '<thead>' +
                '<th style="background:#21d961; tex-align:left">Seç</th>' +
                '<th style="background:#21d961; tex-align:left">Sıra No</th>' +
                '<th style="background:#21d961; tex-align:center">Ürün Adı</th>' +
                '<th style="background:#21d961; tex-align:center">Para Birimi</th>' +
                '<th style="background:#21d961; tex-align:center">Birim</th>' +
                '<th style="background:#21d961; tex-align:center">Birim Seti Oranı</th>' +
                '<th style="background:#21d961; tex-align:center">Barkod Kodu</th>' +
                '<th style="background:#21d961; tex-align:center">SUT Kodu</th>' +
                '<th style="background:#21d961; tex-align:center">Önerilen Satış Fiyatı</th>' +
                '<th style="background:#21d961; tex-align:center">Birim Satış Fiyatı</th>' +
                '<th style="background:#21d961; tex-align:center">Miktar</th>' +
                '<th style="background:#21d961; tex-align:center">İndirim Tutarı</th>' +
                //'<th style="background:#21d961; tex-align:center">Sevk Miktarı</th>' +
                // '<th style="background:#21d961; tex-align:center">Tutar</th>' +
                // '<th style="background:#21d961; tex-align:center">Ürün Toplam TL Tutarı</th>' +
                // '<th style="background:#21d961; tex-align:center">Ürün KDV</th>' +
                // '<th style="background:#21d961; tex-align:center">Ürün TL Tutarı(KDV Dahil)</th>' +
                // '<th style="background:#21d961; tex-align:center">Aktarım</th>' +
                '</thead>' +
                '<tbody>' +
                '</tbody>' +
                '</table>' +
                '</div>',
            footer: '<button id="btnOlustur" class="btn btn-warning btn-sm">Sipariş Oluştur</button><button id="btnClose" data-dismiss="modal" class="btn btn-success btn-sm">Kapat</button>'
        }
    });
    $('#modalNewOrder .modal-dialog').css('width', '100%');
    $('#modalNewOrder').modal('toggle');
}

function ModalTableCreate() {

    $('#modalNewOrder .modal-dialog').css('width', '100%');
    GetItems();
    $('#modalNewOrder #contentModalNewOrder #grupluUrunH3').show();
    $('#modalNewOrder #contentModalNewOrder #newTbl').show();

};


function GetItems() {

    var grupId = $('#selectGrup').val();
    var localUrl = String.format('http://localhost:60066/api/data/GetProductsByGroup');
    var realUrl = String.format('https://vygon.setcrm.com/api/data/GetProductsByGroup');
    //prepareSelect2('#selectCurrency', '/Summary/LookupFieldValues', { coId: '70E8827A98164449B88EAB742616B55B', id: 'ECEC60F7B8C3439D9336BE618371C2C4', viewFilterId: '3426ABD43DC94C24865CFC1D55842AB3' }, null, false);
    $.post(localUrl, { GrupId: grupId }, function(r) {
        $('#newTbl tbody').html('');
        if (r.Status) {
            console.log("newTbl status true");
            $.each(r.modelList, function(i, v) {
                console.log(r.length);
                var newRow = $('<tr/>', { 'data-id': v.UrunId, 'data-rowid': i });
                newRow.append('<td><input class="form-check-input" type="checkbox" value="false"></td>');
                newRow.append('<td colspan="1" rowspan="1"><input id="' + String.format('urunSira_{0}', i) + '" type="number"  style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;" /></td>');
                newRow.append('<td><a href="https://maya.setcrm.com/set/stok-karti/detail/' + v.UrunId + '"id="' + String.format('urun-adi_{0}', i) + '"class="form-control" target="_blank"">' + v.UrunAdi + '</a></td>');
                newRow.append(String.format('<td><div id="Currency_{0}"></div></td>', i));
                $('#newTbl tbody').append(newRow);
                var paraBirimList = v.ParaBirim[0];
                prepareSelect2WithData(String.format('#Currency_{0}', i), v.ParaBirim);
                prepareSelect2SelectedOneItem(String.format('#Currency_{0}', i), paraBirimList.id, paraBirimList.text, false);
                //prepareSelect2SelectedOneItem(String.format('#Currency_{0}', i),)
                newRow.append(String.format('<td><div id="Birim_{0}"></div></td>', i));
                $('#newTbl tbody').append(newRow);
                prepareSelect2WithData(String.format('#Birim_{0}', i), v.Birim);
                newRow.append('<td><input type="text" id="' + String.format('birim-seti-orani_{0}', i) + '" class="form-control birim-seti-orani"></td>');
                newRow.append(String.format('<td><div id="Barkod_{0}"></div></td>', i));
                $('#newTbl tbody').append(newRow);
                prepareSelect2WithData(String.format('#Barkod_{0}', i), v.BarkodKodu);
                newRow.append(String.format('<td><div id="sutKodu_{0}"></div></td>', i));
                $('#newTbl tbody').append(newRow);
                prepareSelect2WithData(String.format('#sutKodu_{0}', i), v.SUTKodu);
                newRow.append('<td><input id="' + String.format('onerilen-birim-fiyat_{0}', i) + '" type="text" class="form-control onerilen-birim-fiyat" disabled="true" value=' + v.BirimFiyat + ">" + '</td>');
                newRow.append('<td><input id="' + String.format('birim-fiyat_{0}', i) + '" type="text" class="form-control birim-fiyat" value=' + v.BirimFiyat + ">" + '</td>');
                newRow.append('<td><input id="' + String.format('miktar_{0}', i) + '" type="text" class="form-control miktar"></td>');
                newRow.append('<td><input type="text" id="' + String.format('indirim-tutari_{0}', i) + '" class="form-control indirim-tutari"></td>');
                $('#newTbl tbody').append(newRow);
            });
        } else {}
    })

    // $('#modalNewOrder #contentModalNewOrder #tekli').show();
    // $('#modalNewOrder #contentModalNewOrder #siparisEkle2').show();
    // $('#modalNewOrder #contentModalNewOrder #newTbl3').show();

}


function CreateNewOrder() {
    var modelList = [];
    var trList = $('#newTbl tbody tr');
    var grupId = $('#selectGrup').val();
    var recordId = $('#RecordPublicId').val();
    $.each(trList,
        function(i, el) {
            if ($(this).find('.form-check-input:checked').length > 0) {
                var rowId = $(this).closest('tr').data('rowid');
                var urunId = $(this).closest('tr').data('id');
                debugger;
                var urunAdi = $('#urun-adi_' + rowId)[0].innerText
                console.log(urunAdi);
                $('#5D551DAB046B48CF8287D5F67AD91187').val($('#urunSira_' + rowId).val());

                //console.log($('#urun-adi_'+rowId).select2('data'))
                $("#3BF8AF883BC049F9BE88645C2C480BBE").select2('data', {
                    id: urunId,
                    text: urunAdi
                });
                $("#58288A727716430DB2EC281B50533A04").select2('data', {
                    id: $('#Currency_' + rowId).select2('data').id,
                    text: $('#Currency_' + rowId).select2('data').text
                });
                $("#B14078D1103D415EBF1A3716FE03441D").select2('data', {
                    id: $('#Birim_' + rowId).select2('data').id,
                    text: $('#Birim_' + rowId).select2('data').text
                });
                $("#6C688F3A15624CF1AFC67720DB99DC6E").select2('data', {
                    id: $('#Barkod_' + rowId).select2('data').id,
                    text: $('#Barkod_' + rowId).select2('data').text
                });
                $("#76E7215002E84F048A63BB87CF742CBC").select2('data', {
                    id: $('#sutKodu_' + rowId).select2('data').id,
                    text: $('#sutKodu_' + rowId).select2('data').text
                });
                $("#07FE3CF8472F46418A985499F7CD1887").select2('data', {
                    id: $('#birim-seti-orani_' + rowId).select2('data').id,
                    text: $('#birim-seti-orani_' + rowId).select2('data').text
                });

                $('#27B74D182B494C0C9CB544A6869EF54B').val($('#birim-fiyat_' + rowId).val()); // --> birim satış fiyatı
                $('#3CBF01DD6D5249FDB6C12C5614E100A9').val($('#miktar_' + rowId).val()); // --> miktar
                $('#E32EF0522C994ABAB82A92392AE497A6').val($('#indirim-tutari_' + rowId).val());
                $('#D1D693283CAB46F18A5AE6BD0143DC6B').val($('#sevk-miktari_' + rowId).val());
                $('.add-row').trigger('click');
            }
            $('#txt').hide();

        });


    //var localUrl = String.format('http://localhost:60066/api/data/CreateNewOrder?grupId='+grupId +'&recordId=' + recordId);
    //realUrl = String.format('https://medarlogo.setcrm.com/api/data/CreateNewOrder?grupId='+grupId +'&recordId='+recordId);

    // $.ajax({
    //     contentType: 'application/json',
    //     type: "POST",
    //     url: localUrl,
    //     dataType: "json",
    //     data: JSON.stringify(modelList),
    //     async: true,
    //     success: function(r) {
    //         if (r.Status) {
    //             setUtil.alert({
    //                 container: '#modalLoading #txt',
    //                 message: r.Message,
    //                 alertClass: 'alert-success',
    //                 autoClose: true
    //             });
    //             setTimeout(() => {
    //                 $('#modalLoading').modal('toggle');
    //                 window.location.reload();
    //             }, 1500);
    //         } else {
    //             setUtil.alert({
    //                 container: '#modalLoading #txt',
    //                 message: r.Message,
    //                 alertClass: 'alert-danger',
    //                 autoClose: false
    //             });
    //         }
    //     }
    // });

}