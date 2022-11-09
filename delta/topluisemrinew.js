$(function() {

    var UrunList = [];
    var newRowIndex = 0;
    $('.well:first .pull-right').prepend('<a id="TopluIsEmriGirisi" class="btn btn-warning btn-sm" style="margin-right: 2px;">Toplu İş Emri Girişi</a>');
    $('body').on('click', '#TopluIsEmriGirisi', function() {

        ModalCreate();
        $('#editTable').hide();
        $('#seciliEmirler').hide();
        ModalTableCreate(0)

    })

    function ModalCreate() {
        $('#modalTopluIsEmri').remove();
        window.setModal.Create({
            id: 'modalTopluIsEmri',
            html: {
                header: '<h3 class="text-center"><strong>Toplu İş Emri Girişi</strong></h3>',
                body: '<div id="modalTopluIsEmriMessage"></div>' +
                    '<div id="modalTopluIsEmriLoadingBar" style="margin:0 0 5px; width: 100%;display:none;">İşlem yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>' +
                    '<div id="contentModalTopluIsEmri" style="display:none;">' +
                    '<table id="newTable" class="table">' +
                    '<thead>' +
                    '<th style="background:#ff9500; text-align:center;">Sipariş</th>' +
                    '<th style="background:#ff9500; text-align:center;">Ürün</th>' +
                    '<th style="background:#ff9500; text-align:center;">Operasyon</th>' +
                    '<th style="background:#ff9500; text-align:center;">Bölüm</th>' +
                    '<th style="background:#ff9500; text-align:center;">Makine</th>' +
                    '<th style="background:#ff9500; text-align:center;">Personel</th>' +
                    '<th style="background:#ff9500; text-align:center;">Tarih</th>' +
                    '<th style="background:#ff9500; text-align:center;">Başlama Zamanı</th>' +
                    '<th style="background:#ff9500; text-align:center;">Bitiş Zamanı</th>' +
                    '<th style="background:#ff9500; text-align:center;">Çalışma Zamanı</th>' +
                    '<th style="background:#ff9500; text-align:center;">Üretilecek Adet</th>' +
                    '<th style="background:#ff9500; text-align:center;">Üretilen Adet</th>' +
                    '<th style="background:#ff9500; text-align:center;">Fire</th>' +
                    '<th style="background:#ff9500; text-align:center;">Boşa Akma</th>' +
                    '<th style="background:#ff9500; text-align:center;">Durum</th>' +
                    '<th style="background:#ff9500; text-align:center;">Duruş Süresi</th>' +
                    '<th style="background:#ff9500; text-align:center;">Duruş Nedeni</th>' +
                    '<th style="background:#ff9500; text-align:center;"> Ekle </th>' +
                    '</thead>' +
                    '<tbody>' +
                    '<td colspan="1" rowspan="1"><input id="Siparis" type="select" style="width:100%; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;"></td>' +
                    '<td colspan="1" rowspan="1"><input id="IsEmri" type="select" style="width:100%; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;"></td>' +
                    '<td colspan="1" rowspan="1"><input id="Operasyon" type="select" style="width:100%; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;"></td>' +
                    '<td colspan="1" rowspan="1"><input id="Bolum" type="select" style="width:100%; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;"></td>' +
                    '<td colspan="1" rowspan="1"><input id="Makine" type="select" style="width:100%; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;"></td>' +
                    '<td colspan="1" rowspan="1"><input id="Personel" type="select" style="width:100%; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;"></td>' +
                    '<td colspan="1" rowspan="1"><input id="Tarih" type="text" style="width:100%; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;"></td>' +
                    '<td colspan="1" rowspan="1"><input id="BaslangicZamani" type="text" autocomplete="off" style="width:100%; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;"></td>' +
                    '<td colspan="1" rowspan="1"><input id="BitisZamani" type="text" autocomplete="off" style="width:100%; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;"></td>' +
                    '<td colspan="1" rowspan="1"><input id="CalismaZamani" type="text" style="width:100%; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;disabled"></td>' +
                    '<td colspan="1" rowspan="1"><input id="UretilecekAdet" type="text" style="width:100%; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;" disabled></td>' +
                    '<td colspan="1" rowspan="1"><input id="UretilenAdet" type="text" style="width:100%; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;"></td>' +
                    '<td colspan="1" rowspan="1"><input id="Fire" type="text" style="width:100%; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;"></td>' +
                    '<td colspan="1" rowspan="1"><input id="BosaAkma" type="text" style="width:100%; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;"></td>' +
                    '<td colspan="1" rowspan="1"><input id="Durum" type="select" style="width:100%; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;"></td>' +
                    '<td colspan="1" rowspan="1"><input id="DurusSuresi" type="text" style="width:100%; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;"></td>' +
                    '<td colspan="1" rowspan="1"><input id="DurusNedeni" type="text" style="width:100%; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;"></td>' +
                    '<td colspan="1" rowspan="1"><button style="height:40px" id="EkleButonu" class="btn btn-dark btn-sm">Ekle</td>' +
                    '</tbody>' +
                    '</table>' +
                    '<div class="row" id="seciliEmirler"><h3 class="text-center" style="margin-right:35px;"><strong>İş Emirleri</strong></h3></div>' +
                    '<table id="editTable" class="table">' +
                    '<thead>' +
                    '<th style="background:#ff9500; text-align:center;">Kopyala</th>' +
                    '<th style="background:#ff9500; text-align:center;">Ürün</th>' +
                    '<th style="background:#ff9500; text-align:center;">Operasyon</th>' +
                    '<th style="background:#ff9500; text-align:center;">Bölüm</th>' +
                    '<th style="background:#ff9500; text-align:center;">Makine</th>' +
                    '<th style="background:#ff9500; text-align:center;">Personel</th>' +
                    '<th style="background:#ff9500; text-align:center;">Tarih</th>' +
                    '<th style="background:#ff9500; text-align:center;">Başlama Zamanı</th>' +
                    '<th style="background:#ff9500; text-align:center;">Bitiş Zamanı</th>' +
                    '<th style="background:#ff9500; text-align:center;">Çalışma Zamanı</th>' +
                    '<th style="background:#ff9500; text-align:center;">Üretilecek Adet</th>' +
                    '<th style="background:#ff9500; text-align:center;">Üretilen Adet</th>' +
                    '<th style="background:#ff9500; text-align:center;">Fire</th>' +
                    '<th style="background:#ff9500; text-align:center;">Boşa Akma</th>' +
                    '<th style="background:#ff9500; text-align:center;">Durum</th>' +
                    '<th style="background:#ff9500; text-align:center;">Duruş Süresi</th>' +
                    '<th style="background:#ff9500; text-align:center;">Duruş Nedeni</th>' +
                    '</thead>' +
                    '<tbody>' +
                    '</tbody>' +
                    '</table>',
                footer: '<button id="btnKaydetTopluIsEmri" type="button" class="btn btn-sm btn-success" >Kaydet</button>' + '<button type="button" class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>'
            }
        });
        prepareSelect2('#Siparis', '/Summary/LookupFieldValues', {
            coId: 'D50204035A95441CB725E91EE4DF0BDE',
            id: '02DA43AA51B14BA2A0F61E645DCB62B5',
            viewFilterId: 'B1BEB4EC3AF14DDABFA758C9366F5BC3'
        }, null, false);

        var SiparisTable = $('.table-bordered tbody tr');
        if (SiparisTable.length > 0) {
            tarih = $(SiparisTable).find('td[data-id=6169BD16B7FB4049BE9AE9E38068F3ED]')[0].innerText;
            $('#Tarih').val(tarih);
        }
        prepareSelect2('#Operasyon', '/Summary/LookupFieldValues', {
            coId: 'D50204035A95441CB725E91EE4DF0BDE',
            id: '15337FABD73845E092329390A1B0DD97',
            viewFilterId: '05E1F91BBC0742CEA857FA540DC1C93B'
        }, null, false);

        // prepareSelect2('#Bolum', '/Summary/LookupFieldValues', {
        //     coId: 'D50204035A95441CB725E91EE4DF0BDE',
        //     id: '946ADAE3B9E44FD393C7D9ADE7904C67',
        //     viewFilterId: 'CAD87717294D40278EE73A043AAB6B89'
        // }, null, false);

        // prepareSelect2('#Makine', '/Summary/LookupFieldValues', {
        //     coId: 'D50204035A95441CB725E91EE4DF0BDE',
        //     id: '29509A41C4F34C9A82E86E869CCDA522',
        //     viewFilterId: '8924247B3F81473F9CE964B192311CD6'
        // }, null, false);

        prepareSelect2('#Personel', '/Summary/LookupFieldValues', {
            coId: 'D50204035A95441CB725E91EE4DF0BDE',
            id: '5A952D0D847748DCAFEDF69F62483E1F',
            viewFilterId: 'D334608476814BC18E43C5164A9360F2'
        }, null, false);

        prepareSelect2('#Durum', '/summary/fielditems', {
            id: 'D6C8ECD0FCBA494A80EC8A847F4465D9'
        }, null, null);
        durumId = "34172E76AC98455C94FB934B8AECB4F6";
        durumText = "Üretiliyor";
        $('#Durum').select2('data', {
            id: durumId,
            text: durumText
        });

        $('#Tarih').datetimepicker({
            inline: false,
            closeOnDateSelect: true,
            timepicker: false,
            format: 'd.m.Y',
            mask: false,
            scrollMonth: false,
            scrollTime: false,
            scrollInput: false,
            dayOfWeekStart: 1
        });

        $('#BaslangicZamani').datetimepicker({
            inline: false,
            closeOnDateSelect: true,
            timepicker: true,
            datepicker: false,
            format: 'H:i',
            mask: false,
            scrollMonth: false,
            scrollTime: false,
            scrollInput: false,
            dayOfWeekStart: 1
        });
        $('#BitisZamani').datetimepicker({
            inline: false,
            closeOnDateSelect: true,
            timepicker: true,
            datepicker: false,
            format: 'H:i',
            mask: false,
            scrollMonth: false,
            scrollTime: false,
            scrollInput: false,
            dayOfWeekStart: 1
        });

        $('#modalTopluIsEmri').modal('toggle');
    }

    $('body').on('change', '#Siparis', function() {
        siparisId = $('#Siparis').val();
        // debugger;
        var localUrl = String.format('http://localhost:62144/api/data/TopluIsEmriUrun?recordId=' + siparisId);
        var realUrl = String.format('https://deltawebapi.setcrm.com/api/data/TopluIsEmriUrun?recordId=' + siparisId);

        $.get(realUrl, function(r) {
            if (r.Status) {
                UrunList = r.urunList;
                prepareSelect2WithData('#IsEmri', r.urunList);
            }
        });

    });

    $('body').on('change', '#Operasyon', function() {
        if (!String.isNullOrWhiteSpace($('#Operasyon').val())) {
            operasyonId = $('#Operasyon').val();

            var localUrl = String.format('http://localhost:62144/api/data/TopluIsEmriBolumMakine?recordId=' + operasyonId);
            var realUrl = String.format('https://deltawebapi.setcrm.com/api/data/TopluIsEmriBolumMakine?recordId=' + operasyonId);
            $.get(realUrl, function(r) {
                if (r.Status) {
                    BolumList = r.bolumList;
                    prepareSelect2WithData('#Bolum', r.bolumList);
                    MakineList = r.makineList;
                    prepareSelect2WithData('#Makine', r.makineList);
                    prepareSelect2SelectedOneItem('#Bolum', r.bolumList[0].id, r.bolumList[0].text, false);
                    prepareSelect2SelectedOneItem('#Makine', r.makineList[0].id, r.makineList[0].text, false);
                } else {
                    setUtil.alert({
                        container: '#modalTopluIsEmri .modal-body #modalTopluIsEmriMessage',
                        message: r.Message,
                        alertClass: 'alert-danger',
                        autoClose: true
                    });
                }
            });
        }
    });

    function operation(start, end, operasyon, tarih) {
        var data = {
            CalismaBaslangic: start,
            CalismaBitis: end,
            OperasyonId: operasyon,
            Day: moment(tarih, 'DD.MM.YYYY').format('dddd'),
        }

        $('#btnKaydetTopluIsEmri').prop('disabled', true);
        var localUrl = 'http://localhost:62144/api/data/CalismaSuresiHesapla';
        var realUrl = 'https://deltawebapi.setcrm.com/api/data/CalismaSuresiHesapla';
        $.post(realUrl, data, function(r) {
            if (r.Status) {
                $('#UretilecekAdet').val(r.uretilecekAdet);
                $('#CalismaZamani').val(r.calismaZamani);
                $('#btnKaydetTopluIsEmri').prop('disabled', false);
            } else {
                $('#Operasyon').select2('data', 'null');
                $('#BaslangicZamani').select2('data', 'null');
                $('#BitisZamani').select2('data', 'null');
                setUtil.alert({
                    container: '#modalTopluIsEmri .modal-body #modalTopluIsEmriMessage',
                    message: r.Message,
                    alertClass: 'alert-danger',
                    autoClose: false
                });
            }
        });
    }

    $('body').off('change', '#BaslangicZamani,#BitisZamani,#Operasyon,#Tarih').on('change', '#BaslangicZamani,#BitisZamani,#Operasyon,#Tarih', function() {
        var start = $('#BaslangicZamani').val(),
            end = $('#BitisZamani').val(),
            operasyon = $('#Operasyon').val(),
            tarih = $('#Tarih').val();
        if (!String.isNullOrWhiteSpace(start) && !String.isNullOrWhiteSpace(end) && !String.isNullOrWhiteSpace(operasyon)) {
            operation(start, end, operasyon, tarih);
        }
    });

    function ModalTableCreate(type) {
        if (type == 0) {
            $("#modalTopluIsEmri .modal-dialog").animate({
                width: "100%",
            }, 400);
            $('#modalTopluIsEmri #contentModalTopluIsEmri').show();
            $("#TopluIsEmriGirisi").show();
        } else {
            $("#modalTopluIsEmri .modal-dialog").animate({
                width: "40%",
            }, 400);
            $('#modalTopluIsEmri #contentModalTopluIsEmri').hide();
            $("#TopluIsEmriGirisi").hide();
        }
    };

    $('body').on('click', '#EkleButonu', function() {
        added = false;
        $(this).html('İşleminiz yapılıyor...').prop('disabled', true);
        AddToTable();
        $('#editTable').show();
        $('#seciliEmirler').show();
        if (added == true) {
            $(this).html('Ekle').prop('disabled', false);
        } else {
            setUtil.alert({
                container: '#modalTopluIsEmriMessage',
                message: 'Üretim emri eklenemedi.',
                alertClass: 'alert-danger',
                autoClose: false
            });
            $(this).html('Ekle').prop('disabled', false);
        }

    });

    $('body').on('click',
        '#btnKaydetTopluIsEmri',
        function() {
            UpdateOrders();

        });

    function AddToTable() {
        var UrunId, UrunText, isEmriNo, operasyonId, operasyonText, makineId, makineText, personelId, personelText, uretilecekAdet, uretilenAdet, fire,
            bosaAkma, durumId, durumText, baslamaZamani, bitisZamani, durusSuresi, durusNedeni, calismaZamani;
        isEmriNo = $('#IsEmri').val();
        if (!String.isNullOrWhiteSpace($('#Bolum').val())) {
            BolumId = $('#Bolum').select2('data').id;
            BolumText = $('#Bolum').select2('data').text;
        }
        if (!String.isNullOrWhiteSpace($('#IsEmri').val())) {
            UrunId = $('#IsEmri').select2('data').id;
            UrunText = $('#IsEmri').select2('data').text;
        }

        if (!String.isNullOrWhiteSpace($('#Operasyon').val())) {
            operasyonId = $('#Operasyon').select2('data').id;
            operasyonText = $('#Operasyon').select2('data').text;
        }
        if (!String.isNullOrWhiteSpace($('#Makine').val())) {
            makineId = $('#Makine').select2('data').id;
            makineText = $('#Makine').select2('data').text;
        }
        if (!String.isNullOrWhiteSpace($('#Personel').val())) {
            personelId = $('#Personel').select2('data').id;
            personelText = $('#Personel').select2('data').text;
        }
        uretilecekAdet = $('#UretilecekAdet').val();
        uretilenAdet = $('#UretilenAdet').val();
        fire = $('#Fire').val();
        bosaAkma = $('#BosaAkma').val();
        durumId = "D7061057227744CA9FED6A7D8A36BCF7";
        durumText = "Beklemede";
        baslamaZamani = $('#BaslangicZamani').val();
        bitisZamani = $('#BitisZamani').val();
        durusSuresi = $('#DurusSuresi').val();
        durusNedeni = $('#DurusNedeni').val();
        isEmriTarih = $('#Tarih').val();
        calismaZamani = $('#CalismaZamani').val();
        added = true;

        var newRow = $('<tr/>', {
            'data-id': "",
            'data-rowid': newRowIndex
        });
        //newRow.append('<td style="width:80px;"><input id="' + String.format('isEmriNoNew_{0}', newRowIndex) + '" type="text"  style="width:100px; height:40px;" class="form-control is-emri-no" disabled value=' + isEmriNo + '></td>');
        newRow.append('<td style="width:70px;"><button style="height:40px" id="' + String.format('btnUrunEkle_{0}', newRowIndex) + '" class="btn btn-dark btn-sm btn-kopya">Kopyala</td>');
        newRow.append(String.format('<td style="width:80px; height:40px; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;"><div id="UrunNew_{0}"></div></td>', newRowIndex));
        $('#editTable tbody').append(newRow);
        prepareSelect2WithData(String.format('#UrunNew_{0}', newRowIndex), UrunList);
        prepareSelect2SelectedOneItem(String.format('#UrunNew_{0}', newRowIndex), UrunId, UrunText, false);

        newRow.append(String.format('<td style="width:80px; height:40px; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;"><div id="operasyonNew_{0}"></div></td>', newRowIndex));
        $('#editTable tbody').append(newRow);
        prepareSelect2(String.format('#operasyonNew_{0}', newRowIndex), '/Summary/LookupFieldValues', {
            coId: 'D50204035A95441CB725E91EE4DF0BDE',
            id: '15337FABD73845E092329390A1B0DD97',
            viewFilterId: '05E1F91BBC0742CEA857FA540DC1C93B'
        }, null, false);
        prepareSelect2SelectedOneItem(String.format('#operasyonNew_{0}', newRowIndex), operasyonId, operasyonText, false);

        newRow.append(String.format('<td style="width:80px; height:40px; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;"><div id="BolumNew_{0}"></div></td>', newRowIndex));
        $('#editTable tbody').append(newRow);
        prepareSelect2(String.format('#BolumNew_{0}', newRowIndex), '/Summary/LookupFieldValues', {
            coId: 'D50204035A95441CB725E91EE4DF0BDE',
            id: '946ADAE3B9E44FD393C7D9ADE7904C67',
            viewFilterId: 'CAD87717294D40278EE73A043AAB6B89'
        }, null, false);
        prepareSelect2SelectedOneItem(String.format('#BolumNew_{0}', newRowIndex), BolumId, BolumText, false);

        newRow.append(String.format('<td style="width:80px; height:40px; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;"><div id="makineNew_{0}"></div></td>', newRowIndex));
        $('#editTable tbody').append(newRow);
        prepareSelect2(String.format('#makineNew_{0}', newRowIndex), '/Summary/LookupFieldValues', {
            coId: 'D50204035A95441CB725E91EE4DF0BDE',
            id: '29509A41C4F34C9A82E86E869CCDA522',
            viewFilterId: '8924247B3F81473F9CE964B192311CD6'
        }, null, false);
        prepareSelect2SelectedOneItem(String.format('#makineNew_{0}', newRowIndex), makineId, makineText, false);
        newRow.append(String.format('<td style="width:80px; height:40px; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;"><div id="personelNew_{0}"></div></td>', newRowIndex));
        $('#editTable tbody').append(newRow);
        prepareSelect2(String.format('#personelNew_{0}', newRowIndex), '/Summary/LookupFieldValues', {
            coId: 'D50204035A95441CB725E91EE4DF0BDE',
            id: '5A952D0D847748DCAFEDF69F62483E1F',
            viewFilterId: 'D334608476814BC18E43C5164A9360F2'
        }, null, false);
        prepareSelect2SelectedOneItem(String.format('#personelNew_{0}', newRowIndex), personelId, personelText, false);

        newRow.append('<td style="width:80px;"><input id="' + String.format('TarihNew_{0}', newRowIndex) + '" type="text"  style="width:100px; height:40px; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;" class="form-control" value=' + isEmriTarih + '></td>');
        $('#editTable tbody').append(newRow);
        $(String.format('#tarihNew_{0}', newRowIndex)).datetimepicker({
            inline: false,
            closeOnDateSelect: true,
            timepicker: false,
            format: 'd.m.Y',
            mask: false,
            scrollMonth: false,
            scrollTime: false,
            scrollInput: false,
            dayOfWeekStart: 1
        });
        prepareDatePicker(String.format('#TarihNew_{0}', newRowIndex), isEmriTarih);
        newRow.append('<td style="width:80px;"><input id="' + String.format('baslamaZamaniNew_{0}', newRowIndex) + '" type="text"  style="width:100px; height:40px; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;" class="form-control baslama-zamani" value=' + baslamaZamani + '></td>');
        newRow.append('<td style="width:80px;"><input id="' + String.format('bitisZamaniNew_{0}', newRowIndex) + '" type="text"  style="width:100px; height:40px; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;" class="form-control bitis-zamani" value=' + bitisZamani + '></td>');
        newRow.append('<td style="width:80px;"><input id="' + String.format('calismaZamaniNew_{0}', newRowIndex) + '" type="text"  style="width:100px; height:40px; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;" class="form-control bitis-zamani" value=' + calismaZamani + '></td>');
        newRow.append('<td style="width:80px;"><input id="' + String.format('uretilecekAdetNew_{0}', newRowIndex) + '" type="text"  style="width:100px; height:40px; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;" class="form-control uretilecek-adet" value=' + uretilecekAdet + '></td>');
        newRow.append('<td style="width:80px;"><input id="' + String.format('uretilenAdetNew_{0}', newRowIndex) + '" type="text"  style="width:100px; height:40px; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;" class="form-control uretilen-adet"  value=' + uretilenAdet + '></td>');
        newRow.append('<td style="width:80px;"><input id="' + String.format('fireNew_{0}', newRowIndex) + '" type="text"  style="width:100px; height:40px; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;" class="form-control fire"  value=' + fire + '></td>');
        newRow.append('<td style="width:80px;"><input id="' + String.format('bosaAkmaNew_{0}', newRowIndex) + '" type="text"  style="width:100px; height:40px; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;" class="form-control bos-akma"  value=' + bosaAkma + '></td>');


        newRow.append(String.format('<td style="width:80px; height:40px; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;"><div id="durumNew_{0}"></div></td>', newRowIndex));
        $('#editTable tbody').append(newRow);
        prepareSelect2(String.format('#durumNew_{0}', newRowIndex), '/summary/fielditems', {
            id: 'D6C8ECD0FCBA494A80EC8A847F4465D9'
        }, null, null);
        prepareSelect2SelectedOneItem(String.format('#durumNew_{0}', newRowIndex), durumId, durumText, false);
        $(String.format('#durumNew_{0}', newRowIndex)).select2('data', {
            id: '34172E76AC98455C94FB934B8AECB4F6',
            text: 'Üretiliyor'
        });

        newRow.append('<td style="width:80px;"><input id="' + String.format('durusSuresiNew_{0}', newRowIndex) + '" type="text"  style="width:100px; height:40px; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;" class="form-control durus-suresi"  value=' + durusSuresi + '></td>');
        newRow.append('<td style="width:80px;"><input id="' + String.format('durusNedeniNew_{0}', newRowIndex) + '" type="text"  style="width:100px; height:40px; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;" class="form-control durus-nedeni"  value=' + durusNedeni + '></td>');
        $('#editTable tbody').append(newRow);
        $(String.format('#baslamaZamaniNew_{0}', newRowIndex)).datetimepicker({
            inline: false,
            closeOnDateSelect: true,
            timepicker: true,
            datepicker: false,
            format: 'H:i',
            mask: false,
            scrollMonth: false,
            scrollTime: false,
            scrollInput: false,
            dayOfWeekStart: 1
        });
        prepareDatePicker(String.format('#baslamaZamaniNew_{0}', newRowIndex), baslamaZamani);
        $(String.format('#bitisZamaniNew_{0}', newRowIndex)).datetimepicker({
            inline: false,
            closeOnDateSelect: true,
            timepicker: true,
            datepicker: false,
            format: 'H:i',
            mask: false,
            scrollMonth: false,
            scrollTime: false,
            scrollInput: false,
            dayOfWeekStart: 1
        });
        prepareDatePicker(String.format('#bitisZamaniNew_{0}', newRowIndex), bitisZamani);
        newRowIndex = newRowIndex + 1;

        $('#editTable').show();
    }

    function AddToTableWithIndex(tr, index) {
        var UrunId,
            UrunText,
            isEmriNo,
            operasyonId,
            operasyonText,
            makineId,
            makineText,
            personelId,
            personelText,
            uretilecekAdet,
            uretilenAdet,
            fire,
            bosaAkma,
            durumId,
            durumText,
            baslamaZamani,
            bitisZamani,
            calismaZamani,
            durusSuresi,
            durusNedeni;
        //isEmriNo = tr.find('#isEmriNo_' + index).val();
        if (!String.isNullOrWhiteSpace(tr.find('#UrunNew_' + index).val())) {
            UrunId = tr.find('#UrunNew_' + index).select2('data').id;
            UrunText = tr.find('#UrunNew_' + index).select2('data').text;
        }
        if (!String.isNullOrWhiteSpace(tr.find('#operasyonNew_' + index).val())) {
            operasyonId = tr.find('#operasyonNew_' + index).select2('data').id;
            operasyonText = tr.find('#operasyonNew_' + index).select2('data').text;
        }
        if (!String.isNullOrWhiteSpace(tr.find('#makineNew_' + index).val())) {
            makineId = tr.find('#makineNew_' + index).select2('data').id;
            makineText = tr.find('#makineNew_' + index).select2('data').text;
        }
        if (!String.isNullOrWhiteSpace(tr.find('#personelNew_' + index).val())) {
            personelId = tr.find('#personelNew_' + index).select2('data').id;
            personelText = tr.find('#personelNew_' + index).select2('data').text;
        }
        if (!String.isNullOrWhiteSpace(tr.find('#BolumNew_' + index).val())) {
            BolumId = tr.find('#BolumNew_' + index).select2('data').id;
            BolumText = tr.find('#BolumNew_' + index).select2('data').text;
        }
        uretilecekAdet = tr.find('#uretilecekAdetNew_' + index).val();
        uretilenAdet = tr.find('#uretilenAdetNew_' + index).val();
        fire = tr.find('#fireNew_' + index).val();
        bosaAkma = tr.find('#bosaAkmaNew_' + index).val();
        durumId = "34172E76AC98455C94FB934B8AECB4F6";
        durumText = "Üretiliyor";
        baslamaZamani = tr.find('#baslamaZamaniNew_' + index).val();
        bitisZamani = tr.find('#bitisZamaniNew_' + index).val();
        calismaZamani = tr.find('#calismaZamaniNew_' + index).val();
        durusSuresi = tr.find('#durusSuresiNew_' + index).val();
        durusNedeni = tr.find('#durusNedeniNew_' + index).val();
        isEmriTarih = tr.find('#TarihNew_' + index).val();
        added = true;

        $('#Urun').select2('data', {
            id: UrunId,
            text: UrunText
        });
        $('#Bolum').select2('data', {
            id: BolumId,
            text: BolumText
        });
        $('#Makine').select2('data', {
            id: makineId,
            text: makineText
        });
        $('#Personel').select2('data', {
            id: personelId,
            text: personelText
        });
        $('#Operasyon').select2('data', {
            id: operasyonId,
            text: operasyonText
        });
        $('#Durum').select2('data', {
            id: durumId,
            text: durumText
        });
        $('#UretilecekAdet').val(uretilecekAdet);
        $('#UretilenAdet').val(uretilenAdet);
        $('#Fire').val(fire);
        $('#BosaAkma').val(bosaAkma);
        $('#BaslamaZamani').val(baslamaZamani);
        $('#BitisZamani').val(bitisZamani);
        $('#CalismaZamani').val(calismaZamani);
        $('#DurusSuresi').val(durusSuresi);
        $('#DurusZamani').val(durusNedeni);
        $('#Tarih').val(isEmriTarih);

    }

    $('body').on('click', '.btn-kopya', function() {
        added = false;
        var tr = $(this).closest('tr');
        var index = tr.data('rowid');
        $(this).html('İşleminiz yapılıyor...').prop('disabled', true);
        AddToTableWithIndex(tr, index);
        if (added == true) {
            $(this).html('Kopyala').prop('disabled', false);
        } else {
            setUtil.alert({
                container: '#modelNewOrderMessage',
                message: 'Üretim emri kopyalanamadı.',
                alertClass: 'alert-danger',
                autoClose: false
            });
            $(this).html('Kopyala').prop('disabled', false);
        }

    });


    function UpdateOrders() {
        var workOrders = [];
        var siparisId = $('#Siparis').val();
        var trListNew = $('#editTable tbody tr');
        debugger;

        $.each(trListNew,
            function(i, v) {
                var rowId = $(v).data('rowid');
                debugger;


                var tarihIsEmri = $('#TarihNew_' + rowId).val();
                if ($('#UrunNew_' + rowId).select2('data') != null || $('#UrunNew_' + rowId).select2('data') != undefined) {
                    var urunId = $('#UrunNew_' + rowId).select2('data').id;
                }
                if ($('#BolumNew_' + rowId).select2('data') != null || $('#BolumNew_' + rowId).select2('data') != undefined) {
                    var urunId = $('#BolumNew_' + rowId).select2('data').id;
                }

                if ($('#operasyonNew_' + rowId).select2('data') != null || $('#operasyonNew_' + rowId).select2('data') != undefined) {
                    var operasyonId = $('#operasyonNew_' + rowId).select2('data').id;
                }

                if ($('#makineNew_' + rowId).select2('data') != null || $('#makineNew_' + rowId).select2('data') != undefined) {
                    var makineId = $('#makineNew_' + rowId).select2('data').id;
                }

                if ($('#personelNew_' + rowId).select2('data') != null || $('#personelNew_' + rowId).select2('data') != undefined) {
                    var personelId = $('#personelNew_' + rowId).select2('data').id;
                };
                if ($('#durumNew_' + rowId).select2('data') != null || $('#durumNew_' + rowId).select2('data') != undefined) {
                    var durumId = $('#durumNew_' + rowId).select2('data').id;
                };
                var uretilecekAdet = $('#uretilecekAdetNew_' + rowId).val();
                var uretilenAdet = $('#uretilenAdetNew_' + rowId).val();
                var fire = $('#fireNew_' + rowId).val();
                var bosaAkma = $('#bosaAkmaNew_' + rowId).val();
                var baslamaZamani = $('#baslamaZamaniNew_' + rowId).val();
                var bitisZamani = $('#bitisZamaniNew_' + rowId).val();
                var calismaZamani = $('#calismaZamani_New' + rowId).val();
                var durusSuresi = $('#durusSuresiNew_' + rowId).val();
                var durusNedeni = $('#durusNedeniNew_' + rowId).val();
                if (durusNedeni == "-") {
                    durusNedeni = "";
                }
                if (personelId == null) {
                    personelId = "";
                }

                var model = {
                    IsEmriId: "",
                    SiparisId: siparisId,
                    UrunId: urunId,
                    OperasyonId: operasyonId,
                    MakineId: makineId,
                    PersonelId: personelId,
                    DurumId: durumId,
                    UretilecekAdet: uretilecekAdet,
                    UretilenAdet: uretilenAdet,
                    Fire: fire,
                    Tarih: tarihIsEmri,
                    BosaAkma: bosaAkma,
                    BaslamaZamani: baslamaZamani,
                    BitisZamani: bitisZamani,
                    CalismaZamani: calismaZamani,
                    DurusSuresi: durusSuresi,
                    DurusNedeni: durusNedeni
                }
                workOrders.push(model);
            });

        console.log(workOrders);

        var localUrl = String.format('http://localhost:62144/api/data/UpdateOrders');
        var realUrl = String.format('https://deltawebapi.setcrm.com/api/data/UpdateOrders');
        // $('#modalLoading').modal('toggle');
        $('#modalLoading').remove();
        window.setModal.Create({
            id: 'modalLoading',
            html: {
                header: ' ',
                body: '<div id="txt" style="margin:0 0 5px; width: 100%;">İşlem biraz uzun sürebilir, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>',

            }
        });
        $('#modalLoading').modal('toggle');
        $.ajax({
            contentType: 'application/json',
            type: "POST",
            url: realUrl,
            dataType: "json",
            data: JSON.stringify(workOrders),
            async: true,
            success: function(r) {
                if (r.Status) {
                    setUtil.alert({
                        container: '#modalLoading #txt',
                        message: r.Message,
                        alertClass: 'alert-success',
                        autoClose: true
                    });
                    window.location.reload();
                } else {
                    setUtil.alert({
                        container: '#modalLoading #txt',
                        message: r.Message,
                        alertClass: 'alert-danger',
                        autoClose: false
                    });
                }
            }
        });
    }

});