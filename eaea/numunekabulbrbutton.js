$(function() {

    var UrunList = [];
    var newRowIndex = 0;
    $('[data-publicid=0227FB9A463F48739951E62C92C7B0C9]').hide().after('<a id="btnNumuneKabul" class="btn btn-warning btn-sm" style="margin-right: 5px;">Numune Kabul</a>');

    $('body').on('click', '#btnNumuneKabul', function() {
        $('#modalNumuneKabul').remove();
        window.setModal.Create({
            id: 'modalNumuneKabul',
            html: {
                header: '<h3 class="text-center"><strong>Numune Kabul</strong></h3>',
                body: '<div id="modalNumuneKabulMessage1"></div>' +
                    '<div id="modalNumuneKabulLoadingBar1" style="margin:0 0 5px; width: 100%;display:none;">İşlem yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>' +
                    '<div id="contentmodalNumuneKabul" style="display:none;">' +
                    '<table id="newTableNumune" class="table">' +
                    '<thead>' +
                    '<th style="background:#ff9500; text-align:center; widht:120px;">Sıra No</th>' +
                    '<th style="background:#ff9500; text-align:center; widht:300px;">Deney Tanımı</th>' +
                    '<th style="background:#ff9500; text-align:center; widht:300px;">Standart Bilgisi</th>' +
                    '<th style="background:#ff9500; text-align:center; widht:60px;"> Ekle </th>' +
                    '</thead>' +
                    '<tbody>' +
                    '<td colspan="1" rowspan="1" style="width:120px;"><input id="siraNoNumune" type="number" style="width:100%; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;"></td>' +
                    '<td colspan="1" rowspan="1" style="width:300px;"><div id="deneyTanimi"></div></td>' +
                    '<td colspan="1" rowspan="1" style="width:300px;"><input id="standartBilgisi" type="text" style="width:100%; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;"></td>' +
                    '<td colspan="1" rowspan="1" style="text-align:center"><button style="height:40px" id="btnEkleNumune" class="btn btn-success btn-m">Ekle</td>' +
                    '</tbody>' +
                    '</table>' +
                    '<div class="row" id="seciliOnaylar"><h3 class="text-center" style="margin-right:35px;"><strong>Eklenen Deney Tanımları</strong></h3></div>' +
                    '<table id="editTableNumune" class="table">' +
                    '<thead>' +
                    '<th style="background:#ff9500; text-align:center; position:sticky; widht:120px;">Sıra No</th>' +
                    '<th style="background:#ff9500; text-align:center; position:sticky; widht:300px;">Deney Tanımı</th>' +
                    '<th style="background:#ff9500; text-align:center; position:sticky; widht:300px;">Standart Bilgisi</th>' +
                    '<th style="background:#ff9500; text-align:center; position:sticky; widht:60px;">Sil </th>' +
                    '</thead>' +
                    '<tbody>' +
                    '</tbody>' +
                    '</table>',
                footer: '<button id="btnKaydetNumune" type="button" class="btn btn-sm btn-success" >Kaydet</button>' + '<button type="button" class="btn btn-sm btn-default" data-dismiss="modal">İptal Et</button>'
            }
        });

        //$('#modalNumuneKabul').modal('toggle');
        // $('#editTableNumune').hide();
        // $('#seciliOnaylar').hide();
        prepareSelect2('#deneyTanimi', '/Summary/LookupFieldValues', {
            coId: '9E15FA15940A4B8E9BE9AE17D4B2158F',
            id: 'FC4B408A11564C20B0A55B5355B0B844',
            viewFilterId: '8ECCBF31691341779621422187675E1C'
        }, null, false);
        var recordId = $('#RecordPublicId').val();
        var url = 'https://eaewebapi.setcrm.com/api/data/LrOkuma?recordId=' + recordId + '&lrId=24D1ADEC686C441DB376D6E696FE235F&q=';
        var url2 = 'http://localhost:44358/api/data/LrOkuma?recordId=' + recordId + '&lrId=24D1ADEC686C441DB376D6E696FE235F&q=';
        $.get(url,
            function(r) {
                if (r.IsOk === true) {
                    $.each(r.Records, function(i, v) {
                        var deneyTanimiID = v.Values.first('FieldPublicId', 'FC4B408A11564C20B0A55B5355B0B844').SelectedItemPublicIds;
                        var deneyTanimiTXT = v.Values.first('FieldPublicId', 'FC4B408A11564C20B0A55B5355B0B844').Value;
                        var siraNoNumune = v.Values.first('FieldPublicId', '3D6B80692E3048B0A9AFA992A2D63099').Value;
                        if (!String.isNullOrWhiteSpace(siraNoNumune)) {
                            if (siraNoNumune.includes(',')) {
                                siraNoNumune = siraNoNumune.split(',')[0];
                            }
                        }

                        var standartBilgisi = v.Values.first('FieldPublicId', '53A703FD05264EF8A5CAE332212F1AA2').Value;
                        var newRow = $('<tr/>', {
                            'data-id': "",
                            'data-rowid': i
                        });
                        newRow.append('<td style="width:120px;"><input id="' + String.format('siraNoNumuneNew_{0}', i) + '" type="number"  style="width:100%; height:40px; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;" class="form-control siraNoNumune" disabled  value="' + siraNoNumune + '" ></td>');
                        newRow.append('<td style="width:300px;"><div id="' + String.format('deneyTanimiNew_{0}', i) + '"/></td>');
                        $('#editTableNumune tbody').append(newRow);
                        var deneyTanimi = "#deneyTanimiNew_" + i;
                        prepareSelect2(deneyTanimi, '/Summary/LookupFieldValues', {
                            coId: '9E15FA15940A4B8E9BE9AE17D4B2158F',
                            id: 'FC4B408A11564C20B0A55B5355B0B844',
                            viewFilterId: '8ECCBF31691341779621422187675E1C'
                        }, null, false);
                        newRow.append('<td style="width:300px;"><input id="' + String.format('standartBilgisiNew_{0}', 0) + '" type="text"  style="width:100%; height:40px; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;" class="form-control sorumluluk" disabled  value="' + standartBilgisi + '"></td>');
                        newRow.append('<td><button style="height:40px" id="' + String.format('btnSil_{0}', 0) + '" class="btn btn-danger btn-m btn-sil-numune">Sil</td>');
                        if (!String.isNullOrWhiteSpace(deneyTanimiID) && !String.isNullOrWhiteSpace(deneyTanimiTXT)) {
                            $(deneyTanimi).select2('data', {
                                id: deneyTanimiID,
                                text: deneyTanimiTXT
                            });
                            $(deneyTanimi).select2('enable', false);
                        }
                        $('#editTableNumune tbody').append(newRow);
                        newRowIndex++;
                    });
                }
            });


        $('#modalNumuneKabul').modal({
            backdrop: false
        });

        ModalNumuneCreate(0);

    })

    function ModalNumuneCreate(type) {
        if (type == 0) {
            $("#modalNumuneKabul .modal-dialog").animate({
                width: "50%",
            }, 400);
            $('#modalNumuneKabul .modal-body').css('max-height',
                '500px');
            $('#modalNumuneKabul #contentmodalNumuneKabul').show();
            $("#btnOnayaGonder").show();
        } else {
            $("#modalNumuneKabul .modal-dialog").animate({
                width: "40%",
            }, 400);
            $('#modalNumuneKabul #contentmodalNumuneKabul').hide();
            $("#btnOnayaGonder").hide();
        }
    };

    $('body').on('click', '#btnEkleNumune', function() {
        added = false;
        $(this).html('İşleminiz yapılıyor...').prop('disabled', true);
        AddToTable();
        $('#editTableNumune').show();
        $('#seciliOnaylar').show();
        if (added == true) {
            $(this).html('Ekle').prop('disabled', false);
            $('#siraNoNumune').val('');
            $('#deneyTanimi').select2('data', null);
            $('#standartBilgisi').val('');
        } else {
            setUtil.alert({
                container: '#modalNumuneKabulMessage1',
                message: 'Talep Sahibi Eklenemedi.',
                alertClass: 'alert-danger',
                autoClose: false
            });
            $(this).html('Ekle').prop('disabled', false);
        }

    });
    $('body').on('change',
        '#deneyTanimi',
        function() {
            debugger;
            if (!String.isNullOrWhiteSpace($(this).select2('data'))) {
                $('#btnEkleNumune').prop('disabled', true);
                var id = $(this).select2('data').id;

                var url = '/set/deney-tanimi/detail/' + id;
                $.get(url, function(sdata) {
                    var elem = $('<div/>').html(sdata);
                    var standartBilgisi = elem.find('label[for=A7EB218ADD9E4B0192B536BF99889064]').parent().data('value');
                    $('#standartBilgisi').val(standartBilgisi);
                    $('#btnEkleNumune').prop('disabled', false);
                });
            } else {
                $('#standartBilgisi').val('');
            }
        })

    $('body').on('click',
        '#btnKaydetNumune',
        function() {
            SaveNumune();

        });

    function AddToTable() {
        var siraNoNumune = $('#siraNoNumune').val();
        deneyTanimi = $('#deneyTanimi').select2('data');
        var deneyTanimiId, deneyTanimiTxt;
        if (!String.isNullOrWhiteSpace(deneyTanimi)) {
            deneyTanimiId = deneyTanimi.id;
            deneyTanimiTxt = deneyTanimi.text;
        }
        standartBilgisi = $('#standartBilgisi').val();
        added = true;

        var newRow = $('<tr/>', {
            'data-id': "",
            'data-rowid': newRowIndex
        });
        newRow.append('<td style="width:120px;"><input id="' + String.format('siraNoNumuneNew_{0}', newRowIndex) + '" type="number"  style="width:100%; height:40px; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;" class="form-control siraNoNumune" disabled  value=' + siraNoNumune + '></td>');
        newRow.append('<td style="width:300px;"><div id="' + String.format('deneyTanimiNew_{0}', newRowIndex) + '"></div></td>');
        var deneyTanimiNew = '#deneyTanimiNew_' + newRowIndex;
        $('#editTableNumune tbody').append(newRow);
        prepareSelect2(deneyTanimiNew, '/Summary/LookupFieldValues', {
            coId: '8985E2529B4C43639B69882E0A21C20B',
            id: 'EC77FAFD51BD4E82B50B3515FA116543',
            viewFilterId: '177C8C23F7DC4C048FBD428632D8F543'
        }, null, false);
        newRow.append('<td style="width:300px;"><input id="' + String.format('standartBilgisiNew_{0}', newRowIndex) + '" type="text"  style="width:100%; height:40px; border-radius: 3px; border: 1px solid #ffc694; padding: 8px 12px;" class="form-control standartBilgisi" disabled  value=' + standartBilgisi + '></td>');
        newRow.append('<td><button style="height:40px" id="' + String.format('btnSil_{0}', newRowIndex) + '" class="btn btn-danger btn-m btn-sil-numune">Sil</td>');

        $('#deneyTanimiNew_' + newRowIndex).select2('data', {
            id: deneyTanimiId,
            text: deneyTanimiTxt
        });
        $('#deneyTanimiNew_' + newRowIndex).select2('enable', false);
        $('#editTableNumune tbody').append(newRow);

        $('#editTableNumune').show();
        newRowIndex++;
    }

    function SaveNumune() {
        var numuneList = [];
        var trListNumune = $('#editTableNumune tbody tr');
        var recordId = $('#RecordPublicId').val();
        $.each(trListNumune,
            function(i, v) {
                var rowId = $(v).data('rowid');
                var siraNoNumune = $('#siraNoNumuneNew_' + rowId).val();
                var deneyTanimiId = $('#deneyTanimiNew_' + rowId).select2('data').id;
                var deneyTanimiName = $('#deneyTanimiNew_' + rowId).select2('data').text;
                var standartBilgisi = $('#standartBilgisiNew_' + rowId).val();

                var model = {
                    SiraNoNumune: siraNoNumune,
                    DeneyTanimiId: deneyTanimiId,
                    DeneyTanimiText: deneyTanimiName,
                    StandartBilgisi: standartBilgisi
                }
                numuneList.push(model);
            });
        var data = {
            RecordId: recordId,
            UserId: userData.id,
            DeneyList: numuneList
        }

        var localUrl = String.format('https://localhost:44328/api/data/NumuneDeneyOlustur');
        var realUrl = String.format('https://eaewebapi.setcrm.com/api/data/NumuneDeneyOlustur');
        $('#modalNumuneKabulLoadingBar1').show();
        $('#newTableNumune').hide();
        $('#editTableNumune').hide();
        ModalNumuneCreate(1);
        $('#btnKaydetNumune').hide();
        $.ajax({
            contentType: 'application/json',
            type: "POST",
            url: localUrl,
            dataType: "json",
            data: JSON.stringify(data),
            async: true,
            success: function(r) {
                if (r.Status) {
                    setUtil.alert({
                        container: '#modalNumuneKabul #txt',
                        message: r.Message,
                        alertClass: 'alert-success',
                        autoClose: true
                    });
                    window.location.reload();
                } else {
                    $('#btnKaydetNumune').hide();
                    $('#modalNumuneKabulLoadingBar1').hide();
                    $('#newTableNumune').show();
                    $('#editTableNumune').show();
                    ModalNumuneCreate(0);
                    setUtil.alert({
                        container: '#modalNumuneKabul #txt',
                        message: r.Message,
                        alertClass: 'alert-danger',
                        autoClose: false
                    });
                }
            }
        });
    }

    $('body').on('click',
        '.btn-sil-numune',
        function() {
            $(this).parents('tr').remove();
        });

});