$(function() {

    var UrunList = [];
    var newRowIndex = 0;
    $('[data-publicid=C5311C065D6A421BA84FBAFB2FC3628B]').hide().after('<a id="btnOnayaGonder" class="btn btn-warning btn-sm" style="margin-right: 5px;">Onaya Gönder</a>');



    $('body').on('click', '#btnOnayaGonder', function() {
        $('#modalOnayaGonder').remove();
        window.setModal.Create({
            id: 'modalOnayaGonder',
            html: {
                header: '<h3 class="text-center"><strong>Onaya Gönder</strong></h3>',
                body: '<div id="modalOnayaGonderMessage1"></div>' +
                    '<div id="modalOnayaGonderLoadingBar1" style="margin:0 0 5px; width: 100%;display:none;">İşlem yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>' +
                    '<div id="contentModalOnayaGonder" style="display:none;">' +
                    '<table id="newTable1" class="table">' +
                    '<thead>' +
                    '<th style="background:#ff9500; text-align:center; widht:120px;">Sıra No</th>' +
                    '<th style="background:#ff9500; text-align:center; widht:300px;">Ad-Soyad</th>' +
                    '<th style="background:#ff9500; text-align:center; widht:300px;">Sorumluluk Bilgisi</th>' +
                    '<th style="background:#ff9500; text-align:center; widht:60px;"> Ekle </th>' +
                    '</thead>' +
                    '<tbody>' +
                    '<td colspan="1" rowspan="1" style="width:120px;"><input id="siraNo" type="number" style="width:100%; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;"></td>' +
                    '<td colspan="1" rowspan="1" style="width:300px;"><div id="adSoyad"></div></td>' +
                    '<td colspan="1" rowspan="1" style="width:300px;"><input id="sorumlulukBilgisi" type="text" style="width:100%; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;"></td>' +
                    '<td colspan="1" rowspan="1" style="text-align:center"><button style="height:40px" id="EkleButonu1" class="btn btn-success btn-m">Ekle</td>' +
                    '</tbody>' +
                    '</table>' +
                    '<div class="row" id="seciliOnaylar"><h3 class="text-center" style="margin-right:35px;"><strong>Eklenen Kişiler</strong></h3></div>' +
                    '<table id="editTable1" class="table">' +
                    '<thead>' +
                    '<th style="background:#ff9500; text-align:center; widht:120px;">Sıra No</th>' +
                    '<th style="background:#ff9500; text-align:center; widht:300px;">Ad-Soyad</th>' +
                    '<th style="background:#ff9500; text-align:center; widht:300px;">Sorumluluk Bilgisi</th>' +
                    '<th style="background:#ff9500; text-align:center; widht:60px;">Sil </th>' +
                    '</thead>' +
                    '<tbody>' +
                    '</tbody>' +
                    '</table>',
                footer: '<button id="btnKaydet1" type="button" class="btn btn-sm btn-success" >Kaydet</button>' + '<button type="button" class="btn btn-sm btn-default" data-dismiss="modal">İptal Et</button>'
            }
        });

        //$('#modalOnayaGonder').modal('toggle');
        // $('#editTable1').hide();
        // $('#seciliOnaylar').hide();
        prepareSelect2('#adSoyad', '/Summary/LookupFieldValues', {
            coId: '8985E2529B4C43639B69882E0A21C20B',
            id: 'EC77FAFD51BD4E82B50B3515FA116543',
            viewFilterId: '177C8C23F7DC4C048FBD428632D8F543'
        }, null, false);
        var adSoyadID = $('label[for=DD8A00164E0C4F09A993D5D4C74A9932]').closest('div').data('publicids');
        var adSoyadTXT = $('label[for=DD8A00164E0C4F09A993D5D4C74A9932]').closest('div').data('value');
        var newRow = $('<tr/>', {
            'data-id': "",
            'data-rowid': 0
        });
        newRow.append('<td style="width:120px;"><input id="' + String.format('siraNoNew_{0}', 0) + '" type="number"  style="width:100%; height:40px; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;" class="form-control siraNo" disabled  value="1"></td>');
        newRow.append('<td style="width:300px;"><div id="' + String.format('adSoyadNew_{0}', 0) + '"/></td>');
        $('#editTable1 tbody').append(newRow);
        newRowIndex++;
        prepareSelect2('#adSoyadNew_0', '/summary/organizationalunititems', {
            publicId: 'DD8A00164E0C4F09A993D5D4C74A9932',
            name: 'User',
            filterType: 'User',
            groupIds: null,
            depth: 1,
            includeItSelf: false
        }, null, false);
        newRow.append('<td style="width:300px;"><input id="' + String.format('sorumlulukBilgisiNew_{0}', 0) + '" type="text"  style="width:100%; height:40px; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;" class="form-control sorumluluk" disabled  value="Talep Sahibi"></td>');
        newRow.append('<td><button style="height:40px" id="' + String.format('btnSil_{0}', 0) + '" class="btn btn-danger btn-m btn-sil">Sil</td>');
        if (!String.isNullOrWhiteSpace(adSoyadID) && !String.isNullOrWhiteSpace(adSoyadTXT)) {
            $('#adSoyadNew_0').select2('data', {
                id: adSoyadID,
                text: adSoyadTXT
            });
            $('#adSoyadNew_0').select2('enable', false);
        }

        $('#editTable1 tbody').append(newRow);
        newRowIndex++;
        adSoyadID = $('label[for=5B24F1AE59494A189695D51167341D78]').closest('div').data('publicids');
        adSoyadTXT = $('label[for=5B24F1AE59494A189695D51167341D78]').closest('div').data('value');
        var newRow = $('<tr/>', {
            'data-id': "",
            'data-rowid': 1
        });
        newRow.append('<td style="width:120px;"><input id="' + String.format('siraNoNew_{0}', 1) + '" type="number"  style="width:100%; height:40px; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;" class="form-control siraNo" disabled  value="2"></td>');
        newRow.append('<td style="width:300px;"><div id="' + String.format('adSoyadNew_{0}', 1) + '"></div></td>');
        $('#editTable1 tbody').append(newRow);
        prepareSelect2('#adSoyadNew_1', '/summary/organizationalunititems', {
            publicId: 'DD8A00164E0C4F09A993D5D4C74A9932',
            name: 'User',
            filterType: 'User',
            groupIds: null,
            depth: 1,
            includeItSelf: false
        }, null, false);
        newRow.append('<td style="width:300px;"><input id="' + String.format('sorumlulukBilgisiNew_{0}', 1) + '" type="text"  style="width:100%; height:40px; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;" class="form-control sorumlu" disabled  value="Ürün Sorumlusu"></td>');
        newRow.append('<td><button style="height:40px" id="' + String.format('btnSil_{0}', 1) + '" class="btn btn-danger btn-m btn-sil">Sil</td>');
        if (!String.isNullOrWhiteSpace(adSoyadID) && !String.isNullOrWhiteSpace(adSoyadTXT)) {
            $('#adSoyadNew_1').select2('data', {
                id: adSoyadID,
                text: adSoyadTXT
            });
            $('#adSoyadNew_1').select2('enable', false);
        }

        $('#editTable1 tbody').append(newRow);


        $('#modalOnayaGonder').modal({
            backdrop: false
        });

        ModalTableCreate(0);

    })

    function ModalTableCreate(type) {
        if (type == 0) {
            $("#modalOnayaGonder .modal-dialog").animate({
                width: "50%",
            }, 400);
            $('#modalOnayaGonder #contentModalOnayaGonder').show();
            $("#btnOnayaGonder").show();
        } else {
            $("#modalOnayaGonder .modal-dialog").animate({
                width: "40%",
            }, 400);
            $('#modalOnayaGonder #contentModalOnayaGonder').hide();
            $("#btnOnayaGonder").hide();
        }
    };

    $('body').on('click', '#EkleButonu1', function() {
        added = false;
        $(this).html('İşleminiz yapılıyor...').prop('disabled', true);
        AddToTable();
        $('#editTable1').show();
        $('#seciliOnaylar').show();
        if (added == true) {
            $(this).html('Ekle').prop('disabled', false);
            $('#siraNo').val('');
            $('#adSoyad').select2('data', null);
            $('#sorumlulukBilgisi').val('');
        } else {
            setUtil.alert({
                container: '#modalOnayaGonderMessage1',
                message: 'Talep Sahibi Eklenemedi.',
                alertClass: 'alert-danger',
                autoClose: false
            });
            $(this).html('Ekle').prop('disabled', false);
        }

    });
    $('body').on('change',
        '#adSoyad',
        function() {
            if (!String.isNullOrWhiteSpace($(this).select2('data'))) {
                $('#btnEkle1').prop('disabled', true);
                var id = $(this).select2('data').id;

                var url = '/set/personel/detail/' + id;
                $.get(url, function(sdata) {
                    var elem = $('<div/>').html(sdata);
                    var sorumlulukBilgisi = elem.find('label[for=04C84FD3A3D6422C8791F63B9AF99CBD]').parent().data('value');
                    $('#sorumlulukBilgisi').val(sorumlulukBilgisi);
                    $('#btnEkle1').prop('disabled', false);
                });
            } else {
                $('#sorumlulukBilgisi').val('');
            }
        })

    $('body').on('click',
        '#btnKaydet1',
        function() {
            SaveOnay();

        });

    function AddToTable() {
        var siraNo = $('#siraNo').val();
        adSoyad = $('#adSoyad').select2('data');
        var adSoyadId, adSoyadTxt;
        if (!String.isNullOrWhiteSpace(adSoyad)) {
            adSoyadId = adSoyad.id;
            adSoyadTxt = adSoyad.text;
        }
        sorumlulukBilgisi = $('#sorumlulukBilgisi').val();
        added = true;

        var newRow = $('<tr/>', {
            'data-id': "",
            'data-rowid': newRowIndex
        });
        newRow.append('<td style="width:120px;"><input id="' + String.format('siraNoNew_{0}', newRowIndex) + '" type="number"  style="width:100%; height:40px; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;" class="form-control siraNo" disabled  value=' + siraNo + '></td>');
        newRow.append('<td style="width:300px;"><div id="' + String.format('adSoyadNew_{0}', newRowIndex) + '"></div></td>');
        var adSoyadNew = '#adSoyadNew_' + newRowIndex;
        $('#editTable1 tbody').append(newRow);
        prepareSelect2(adSoyadNew, '/Summary/LookupFieldValues', {
            coId: '8985E2529B4C43639B69882E0A21C20B',
            id: 'EC77FAFD51BD4E82B50B3515FA116543',
            viewFilterId: '177C8C23F7DC4C048FBD428632D8F543'
        }, null, false);
        newRow.append('<td style="width:300px;"><input id="' + String.format('sorumlulukBilgisiNew_{0}', newRowIndex) + '" type="text"  style="width:100%; height:40px; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;" class="form-control sorumlulukBilgisi" disabled  value=' + sorumlulukBilgisi + '></td>');
        newRow.append('<td><button style="height:40px" id="' + String.format('btnSil_{0}', newRowIndex) + '" class="btn btn-danger btn-m btn-sil">Sil</td>');

        $('#adSoyadNew_' + newRowIndex).select2('data', {
            id: adSoyadId,
            text: adSoyadTxt
        });
        $('#adSoyadNew_' + newRowIndex).select2('enable', false);
        $('#editTable1 tbody').append(newRow);

        $('#editTable1').show();
        newRowIndex++;
    }

    function SaveOnay() {
        var onayKisileri = [];
        var trListNew = $('#editTable1 tbody tr');
        var recordId = $('#RecordPublicId').val();
        $.each(trListNew,
            function(i, v) {
                var rowId = $(v).data('rowid');
                var siraNo = $('#siraNoNew_' + rowId).val();
                var adSoyadId = $('#adSoyadNew_' + rowId).select2('data').id;
                var adSoyadName = $('#adSoyadNew_' + rowId).select2('data').text;
                var sorumlulukBilgisi = $('#sorumlulukBilgisiNew_' + rowId).val();

                var model = {
                    SiraNo: siraNo,
                    AdSoyadId: adSoyadId,
                    AdSoyadText: adSoyadName,
                    SorumlulukBilgisi: sorumlulukBilgisi
                }
                onayKisileri.push(model);
            });
        var data = {
                UserId: userData.id,
                RecordId: recordId,
                ImzaList: onayKisileri
            }
            // console.log(onayKisileri);

        var localUrl = String.format('https://localhost:44328/api/data/EimzaOlusturGonder');
        var realUrl = String.format('https://eaewebapi.setcrm.com/api/data/EimzaOlusturGonder');
        $('#modalOnayaGonderLoadingBar1').show();
        $('#newTable1').hide();
        $('#editTable1').hide();
        ModalTableCreate(1);
        $('#btnKaydet1').hide();
        $.ajax({
            contentType: 'application/json',
            type: "POST",
            url: realUrl,
            dataType: "json",
            data: JSON.stringify(data),
            async: true,
            success: function(r) {
                if (r.Status) {
                    setUtil.alert({
                        container: '#modalOnayaGonder #txt',
                        message: r.Message,
                        alertClass: 'alert-success',
                        autoClose: true
                    });
                    window.location.reload();
                } else {
                    $('#btnKaydet1').hide();
                    $('#modalOnayaGonderLoadingBar1').hide();
                    $('#newTable1').show();
                    $('#editTable1').show();
                    ModalTableCreate(0);
                    setUtil.alert({
                        container: '#modalOnayaGonder #txt',
                        message: r.Message,
                        alertClass: 'alert-danger',
                        autoClose: false
                    });
                }
            }
        });
    }

    $('body').on('click',
        '.btn-sil',
        function() {
            $(this).parents('tr').remove();
        });

});