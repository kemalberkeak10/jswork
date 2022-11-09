$(function() {
    if (window.location.href.includes('?')) {
        if (window.location.href.split('?')[1].split('filter=')[1] == '8099335CB91F4E0789767CC3ABC8AD31') {
            $('.well .pull-right:eq(0)').prepend('<a id="btnKonsinye" class="btn btn-sm btn-warning" style="margin-right:5px;">Yeni Konsinye Transfer Talebi</a>')
        }
    }

    $('body').on('click', '#btnKonsinye',
        function() {
            ModalCreate();
            GetKonsinyeTalepleri();
            prepareSelect2('#firma', '/Summary/LookupFieldValues', {
                coId: 'EA76A071FB9840C0BD38F3D9004F6E16',
                id: '80AD8F1938F948419CFE5931E3018232',
                viewFilterId: 'CD260755CA9341BA9046F38AE48399EA'
            }, null, false);
            prepareSelect2('#sevk', null, null, false);
            $('#sevk').select2('enable', false);
            prepareSelect2('#urunGrubu', '/Summary/LookupFieldValues', {
                coId: 'EA76A071FB9840C0BD38F3D9004F6E16',
                id: 'D05B3738712F4A92AE8FE6610BA2B44A',
                viewFilterId: '0041AB7017524EFCAD8ABD0E0EB6A0E8'
            }, null, false);
            prepareSelect2('#urun', '/Summary/LookupFieldValues', {
                coId: 'EA76A071FB9840C0BD38F3D9004F6E16',
                id: '2CB1BBEE5EC64639B83B6F4E5F437F0B',
                viewFilterId: 'AFEA962141D34CEFB4F7006C489E43B4'
            }, null, false);
            prepareSelect2('#talepEdenSube', '/Summary/LookupFieldValues', {
                coId: 'EA76A071FB9840C0BD38F3D9004F6E16',
                id: '814D774580FF4520B2EACB486010DC39',
                viewFilterId: '092DBD8E57E54B15B489C3F27D897A90'
            }, null, false);
            prepareSelect2('#talepEdilenSube', '/Summary/LookupFieldValues', {
                coId: 'EA76A071FB9840C0BD38F3D9004F6E16',
                id: '21393FDD56CE422FBB3CCE0C7784E81F',
                viewFilterId: '7E3BBE6150CD48C28FAF0FCC81515524'
            }, null, false);
            prepareSelect2('#hazirlayan', '/summary/organizationalunititems', {
                publicId: 'E04D1021477B4CADA5C37A697DDE7A0A',
                name: 'User',
                filterType: 'User',
                groupIds: null,
                depth: 1,
                includeItSelf: true
            }, null, false);
            var userId = userData.id;
            var userName = userData.name;
            prepareSelect2('#satisTemsilcisi', '/Summary/LookupFieldValues', {
                coId: 'EA76A071FB9840C0BD38F3D9004F6E16',
                id: '7A3FEE7BD59F40468D9550309D81F8E5',
                viewFilterId: 'D6373A84962B4451BF088F0DD183B214'
            }, null, false);
            prepareSelect2SelectedOneItem('#hazirlayan', userId, userName, false);
            $('#hazirlayan').select2('enable', false);
            // $('#contentSapModel').hide();
            $('#urun').select2('enable', false);
            $('#newTblLoadingBar').hide();
        });
    $('body').on('change', '#hazirlayan',
        function() {
            if (!String.isNullOrWhiteSpace($(this).select2('data'))) {
                // debugger;
                var url = 'https://maya.setcrm.com/set/satis-temsilcisi/detail/' + userData.specificCode3;
                $.ajax({
                    contentType: 'application/json',
                    type: "GET",
                    url: url,
                    async: false,
                    success: function(sdata) {
                        // debugger;
                        var elem = $('<div/>').html(sdata);
                        var ad = elem.find('label[for=D59A8033D1564EEF930C16BC322C9F12]').parent().data('value');
                        var user = userData.specificCode3;
                        prepareSelect2SelectedOneItem('#satisTemsilcisi', user, ad, false);
                        $('#satisTemsilcisi').select2('enable', false);
                    }
                });
            }
        });
    $('body').on('change',
        '#firma',
        function() {
            if (!String.isNullOrWhiteSpace($(this).select2('data'))) {
                var lrId = "DE0F6FF3CEBD4A63910AC54E0D0956C8";
                var url = 'https://gstmedikalwebapi.setcrm.com/api/data/LrOkuma?recordId=' + $(this).select2('data').id + '&lrId=' + lrId;
                var localurl = 'http://localhost:52748/api/data/LrOkuma?recordId=' + $(this).select2('data').id + '&lrId=' + lrId;
                var sevkAdresi = "";
                var sevk = [];
                $.ajax({
                    contentType: 'application/json',
                    type: "GET",
                    url: url,
                    async: false,
                    success: function(r) {
                        if (r.IsOk === true) {
                            $.each(r.Records, function(i, v) {
                                var adresTipi = (v.Values.first('FieldPublicId', '133FBD78ED1D4345ACAB560791273F9D') != null) ? v.Values.first('FieldPublicId', '133FBD78ED1D4345ACAB560791273F9D').Value : "";
                                if (!String.isNullOrWhiteSpace(adresTipi) && adresTipi == "Sevk Adresi") {
                                    var recordId = v.Values.first('FieldPublicId', '133FBD78ED1D4345ACAB560791273F9D').RecordPublicId;
                                    console.log(v.Values);
                                    sevkAdresi = v.Values.first('FieldPublicId', '93FA1F7AF7D849768190B954C2A58409').Value;
                                    var sevkadr = {
                                        id: recordId,
                                        text: sevkAdresi,
                                        code: "Sevk"
                                    };
                                    sevk.push(sevkadr);
                                    var firmaId = $('#firma').select2('data').id;
                                    prepareSelect2('#sevk', '/Summary/LookupFieldValues', {
                                        coId: 'EA76A071FB9840C0BD38F3D9004F6E16',
                                        id: '45FAC63B575048ED9F37D949E423878E',
                                        viewFilterId: '67E6E2491C6A4971BE6590B3AEC1C73F',
                                        controllingRecordId: firmaId
                                    }, null, false);
                                    if (sevk.length == 1) {
                                        prepareSelect2SelectedOneItem('#sevk', recordId, sevkAdresi, false);
                                    }
                                    $('#sevk').select2('enable', true);
                                }
                            });
                        }
                    }
                });
            } else {
                ('#sevk').select2('enable', false);
                ('#sevk').select2('data', null);
            }
        });
    $('body').on('change',
        '#urunGrubu',
        function() {
            if (!String.isNullOrWhiteSpace($(this).select2('data'))) {
                $('#urun').select2('enable', true);
                prepareSelect2('#urun', '/Summary/LookupFieldValues', {
                    coId: 'EA76A071FB9840C0BD38F3D9004F6E16',
                    id: '2CB1BBEE5EC64639B83B6F4E5F437F0B',
                    controllingRecordId: $(this).select2('data').id,
                    viewFilterId: 'AFEA962141D34CEFB4F7006C489E43B4'
                }, null, false);
            } else {
                $('#urun').select2('enable', false);
                $('#urun').select2('data', null);
            }
        });
    $('body').on('click',
        '#btnAdd',
        function() {
            $('#modalKonsinyeLoadingBar').show();
            var checkValidation = validation();
            if (checkValidation) {
                // debugger;
                var satisTemsilcisi = {
                    id: $('#satisTemsilcisi').select2('data').id,
                    text: $('#satisTemsilcisi').select2('data').text
                };
                var hazirlayan = {
                    id: $('#hazirlayan').select2('data').id,
                    text: $('#hazirlayan').select2('data').text
                };
                var firma = {
                    id: $('#firma').select2('data').id,
                    text: $('#firma').select2('data').text
                };
                var urunGrubu = {
                    id: $('#urunGrubu').select2('data').id,
                    text: $('#urunGrubu').select2('data').text
                };
                var urun = {
                    id: $('#urun').select2('data').id,
                    text: $('#urun').select2('data').text
                };
                if (!String.isNullOrWhiteSpace($('#sevk').select2('data'))) {
                    var sevk = {
                        id: $('#sevk').select2('data').id,
                        text: $('#sevk').select2('data').text
                    };
                } else {
                    var sevk = {
                        id: "",
                        text: ""
                    };
                }
                var talepEdenSube = {
                    id: $('#talepEdenSube').select2('data').id,
                    text: $('#talepEdenSube').select2('data').text
                };
                var talepEdilenSube = {
                    id: $('#talepEdilenSube').select2('data').id,
                    text: $('#talepEdilenSube').select2('data').text
                };
                var miktar = $('#miktar').val(),
                    aciklama = $('#aciklama').val();
                var value = {
                    FirmaDetay: firma,
                    Urun: urun,
                    Miktar: miktar,
                    Aciklama: aciklama
                };
                var values = [];
                values.push(value);
                var data = {
                    Sevk: sevk,
                    UrunGrubu: urunGrubu,
                    SatisTemsilcisi: satisTemsilcisi,
                    Hazirlayan: hazirlayan,
                    FirmaBaslik: firma,
                    Values: values,
                    TalepEdenSube: talepEdenSube,
                    TalepEdilenSube: talepEdilenSube,

                }
                var localUrl = String.format('http://localhost:52748/api/data/CreateKonsinyeTransfer'),
                    realUrl = String.format('https://gstmedikalwebapi.setcrm.com/api/data/CreateKonsinyeTransfer');

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
                                container: '#modalKonsinyeMessage',
                                message: "İşlem başarıyla tamamlanmıştır.",
                                alertClass: 'alert-success',
                                autoClose: false
                            });
                            var length = String.newGuid();
                            var newRow = $('<tr/>', {
                                'data-id': r.RecordId,
                                'data-rowid': length
                            });
                            // newRow.append('<td style="width:50px;"><input class="form-check-input" type="checkbox" value="false"></td>');
                            newRow.append(String.format('<td style="width:200px; height:40px;"><div id="hazirlayanSap_{0}" class="hazirlayanSap"></div></td>', length));
                            $('#newTblSap tbody').append(newRow);
                            if (!String.isNullOrWhiteSpace(hazirlayan)) {
                                prepareSelect2WithData(String.format('#hazirlayanSap_{0}', length), [{
                                    id: hazirlayan.id,
                                    text: hazirlayan.text
                                }]);
                                prepareSelect2SelectedOneItem(String.format('#hazirlayanSap_{0}', length), hazirlayan.id, hazirlayan.text, false);
                                $(String.format('#hazirlayanSap_{0}', length)).select2('enable', false);
                            } else {
                                prepareSelect2WithData(String.format('#hazirlayanSap_{0}', length), null);
                            }
                            newRow.append(String.format('<td style="width:200px; height:40px;"><div id="satisTemsilcisiSap_{0}" class="satisTemsilcisiSap"></div></td>', length));
                            $('#newTblSap tbody').append(newRow);
                            if (!String.isNullOrWhiteSpace(satisTemsilcisi)) {
                                prepareSelect2WithData(String.format('#satisTemsilcisiSap_{0}', length), [{
                                    id: satisTemsilcisi.id,
                                    text: satisTemsilcisi.text
                                }]);
                                prepareSelect2SelectedOneItem(String.format('#satisTemsilcisiSap_{0}', length), satisTemsilcisi.id, satisTemsilcisi.text, false);
                                $(String.format('#satisTemsilcisiSap_{0}', length)).select2('enable', false);
                            } else {
                                prepareSelect2WithData(String.format('#satisTemsilcisiSap_{0}', length), null);
                            }
                            newRow.append(String.format('<td style="width:500px; height:40px;"><div id="FirmaSap_{0}" class="firmaSap"></div></td>', length));
                            $('#newTblSap tbody').append(newRow);
                            // debugger;
                            if (!String.isNullOrWhiteSpace(firma)) {
                                prepareSelect2WithData(String.format('#FirmaSap_{0}', length), [{
                                    id: firma.id,
                                    text: firma.text
                                }]);
                                prepareSelect2SelectedOneItem(String.format('#FirmaSap_{0}', length), firma.id, firma.text, false);
                                $(String.format('#FirmaSap_{0}', length)).select2('enable', false);
                            } else {
                                prepareSelect2WithData(String.format('#FirmaSap_{0}', length), null);
                            }
                            newRow.append(String.format('<td style="width:500px; height:40px;"><div id="sevk_{0}" class="sevkSap"></div></td>', length));
                            $('#newTblSap tbody').append(newRow);
                            // debugger;
                            if (!String.isNullOrWhiteSpace(sevk)) {
                                prepareSelect2WithData(String.format('#sevk_{0}', length), [{
                                    id: sevk.id,
                                    text: sevk.text
                                }]);
                                prepareSelect2SelectedOneItem(String.format('#sevk_{0}', length), sevk.id, sevk.text, false);
                                $(String.format('#sevk_{0}', length)).select2('enable', false);
                            } else {
                                prepareSelect2WithData(String.format('#sevk_{0}', length), null);
                            }
                            newRow.append(String.format('<td style="width:60px; height:40px;"><div id="UrunGrubu_{0}" class="urunGrubuSap"></div></td>', length));
                            $('#newTblSap tbody').append(newRow);
                            // debugger;
                            if (!String.isNullOrWhiteSpace(urunGrubu)) {
                                prepareSelect2WithData(String.format('#UrunGrubu_{0}', length), [{
                                    id: urunGrubu.id,
                                    text: urunGrubu.text
                                }]);
                                prepareSelect2SelectedOneItem(String.format('#UrunGrubu_{0}', length), urunGrubu.id, urunGrubu.text, false);
                                $(String.format('#UrunGrubu_{0}', length)).select2('enable', false);
                            } else {
                                prepareSelect2WithData(String.format('#UrunGrubu_{0}', length), null);
                            }
                            newRow.append(String.format('<td style="width:500px; height:40px;"><div id="Urun_{0}" class="urunSap"></div></td>', length));
                            $('#newTblSap tbody').append(newRow);
                            // debugger;
                            if (!String.isNullOrWhiteSpace(urun)) {
                                prepareSelect2WithData(String.format('#Urun_{0}', length), [{
                                    id: urun.id,
                                    text: urun.text
                                }]);
                                prepareSelect2SelectedOneItem(String.format('#Urun_{0}', length), urun.id, urun.text, false);
                                $(String.format('#Urun_{0}', length)).select2('enable', false);
                            } else {
                                prepareSelect2WithData(String.format('#Urun_{0}', length), null);
                            }
                            newRow.append('<td style="width:100px"><input style="height:40px;" id="' + String.format('miktar_{0}', length) + '" type="text" class="form-control miktarSap" disabled value="' + miktar + '" autocomplete="off"></td>');
                            newRow.append(String.format('<td style="width:200px; height:40px;"><div id="TalepEdilenSube_{0}" class="talepEdilenSubeSap"></div></td>', length));
                            $('#newTblSap tbody').append(newRow);
                            // debugger;
                            if (!String.isNullOrWhiteSpace(talepEdilenSube)) {
                                prepareSelect2WithData(String.format('#TalepEdilenSube_{0}', length), [{
                                    id: talepEdilenSube.id,
                                    text: talepEdilenSube.text
                                }]);
                                prepareSelect2SelectedOneItem(String.format('#TalepEdilenSube_{0}', length), talepEdilenSube.id, talepEdilenSube.text, false);
                                $(String.format('#TalepEdilenSube_{0}', length)).select2('enable', false);
                            } else {
                                prepareSelect2WithData(String.format('#TalepEdilenSube_{0}', length), null);
                            }
                            newRow.append(String.format('<td style="width:200px; height:40px;"><div id="TalepEdenSube_{0}" class="talepEdenSubeSap"></div></td>', length));
                            $('#newTblSap tbody').append(newRow);
                            // debugger;
                            if (!String.isNullOrWhiteSpace(talepEdenSube)) {
                                prepareSelect2WithData(String.format('#TalepEdenSube_{0}', length), [{
                                    id: talepEdenSube.id,
                                    text: talepEdenSube.text
                                }]);
                                prepareSelect2SelectedOneItem(String.format('#TalepEdenSube_{0}', length), talepEdenSube.id, talepEdenSube.text, false);
                                $(String.format('#TalepEdenSube_{0}', length)).select2('enable', false);
                            } else {
                                prepareSelect2WithData(String.format('#TalepEdenSube_{0}', length), null);
                            }
                            newRow.append('<td style="width:100px"><input style="height:40px;" id="' + String.format('aciklama_{0}', length) + '" type="text" class="form-control aciklamaSap" disabled value="' + aciklama + '" autocomplete="off"></td>');
                            $('#newTblSap tbody').append(newRow);
                            clearSelections();
                            $('#modalKonsinyeLoadingBar').hide();
                            // setTimeout(function () {
                            //     window.location.href = 'https://maya.setcrm.com/set/teklifler/detail/' + $('#RecordPublicId').val();
                            // }, 2000);
                        } else {
                            $('#modalKonsinyeLoadingBar').hide();
                            setUtil.alert({
                                container: '#modalKonsinyeMessage',
                                message: r.Message,
                                alertClass: 'alert-danger',
                                autoClose: false
                            });
                        }
                    }
                });
            } else {
                $('#modalKonsinyeLoadingBar').hide();
                setUtil.alert({
                    container: '#modalKonsinyeMessage',
                    message: "Lütfen tüm alanları doldurunuz.",
                    alertClass: 'alert-danger',
                    autoClose: false
                });
            }

        });
    $('body').on('click',
        '#btnTransferKonsinye',
        function() {
            $('#modalKonsinyeLoadingBar').show();
            var localUrl = String.format('http://localhost:52748/api/data/SAPKonsinye?user=' + userData.id),
                realUrl = String.format('https://gstmedikalwebapi.setcrm.com/api/data/SAPKonsinye?user=' + userData.id);
            $.ajax({
                contentType: 'application/json',
                type: "POST",
                url: localUrl,
                async: true,
                success: function(r) {
                    $('#modalKonsinyeLoadingBar').hide();
                    if (r.Status) {
                        setUtil.alert({
                            container: '#modalKonsinyeMessage',
                            message: "İşlem başarılı, sayfa yeniliyor. Lütfen bekleyiniz.",
                            alertClass: 'alert-success',
                            autoClose: false
                        });
                        setTimeout(function() {
                            window.location.href = 'https://maya.setcrm.com/set/list/konsiye-talepleri/?filter=8099335CB91F4E0789767CC3ABC8AD31';
                        }, 2000);
                    } else {
                        setUtil.alert({
                            container: '#modalKonsinyeMessage',
                            message: r.Message,
                            alertClass: 'alert-danger',
                            autoClose: false
                        });
                    }
                }
            });
        });
    $('body').on('click', '.btn-kapat', function() {
        window.location.reload();
    });
    $('body').on('click',
        '#btnSap',
        function() {});
    // $('#modalKonsinyeLoadingBar').show();
    // var recordList = [];
    // var trList = $('#newTblSap tbody tr');
    // $.each(trList,
    //     function (i, el) {
    //         if ($(this).find('.form-check-input:checked').length > 0) {
    //             var rowId = $(this).closest('tr').data('rowid');
    //             var recordId = $(this).closest('tr').data('id');
    //             var firma,
    //                 urunGrubu,
    //                 urun,
    //                 talepEden,
    //                 talepEdilen;
    //             if ($('#FirmaSap_' + rowId).select2('data') != null || $('#FirmaSap_' + rowId).select2('data') != undefined) {
    //                 firma = {
    //                     id: $('#FirmaSap_' + rowId).select2('data').id,
    //                     text: $('#FirmaSap_' + rowId).select2('data').text
    //                 }
    //             }
    //             if ($('#UrunGrubu_' + rowId).select2('data') != null || $('#UrunGrubu_' + rowId).select2('data') != undefined) {
    //                 urunGrubu = {
    //                     id: $('#UrunGrubu_' + rowId).select2('data').id,
    //                     text: $('#UrunGrubu_' + rowId).select2('data').text
    //                 }
    //             }
    //             if ($('#Urun_' + rowId).select2('data') != null || $('#Urun_' + rowId).select2('data') != undefined) {
    //                 urun = {
    //                     id: $('#Urun_' + rowId).select2('data').id,
    //                     text: $('#Urun_' + rowId).select2('data').text
    //                 }
    //             }
    //             if ($('#TalepEdenSube_' + rowId).select2('data') != null || $('#TalepEdenSube_' + rowId).select2('data') != undefined) {
    //                 talepEden = {
    //                     id: $('#TalepEdenSube_' + rowId).select2('data').id,
    //                     text: $('#TalepEdenSube_' + rowId).select2('data').text
    //                 }
    //             }
    //             if ($('#TalepEdilenSube_' + rowId).select2('data') != null || $('#TalepEdilenSube_' + rowId).select2('data') != undefined) {
    //                 talepEdilen = {
    //                     id: $('#TalepEdilenSube_' + rowId).select2('data').id,
    //                     text: $('#TalepEdilenSube_' + rowId).select2('data').text
    //                 }
    //             }
    //             if ($('#satisTemsilcisiSap_' + rowId).select2('data') != null || $('#satisTemsilcisiSap_' + rowId).select2('data') != undefined) {
    //                 user = {
    //                     id: $('#satisTemsilcisiSap_' + rowId).select2('data').id,
    //                     text: $('#satisTemsilcisiSap_' + rowId).select2('data').text
    //                 }
    //             }
    //             var miktar = $('#miktar_' + rowId).val();
    //             var aciklama = $('#aciklama_' + rowId).val();
    //             var value = {
    //                 Firma: firma,
    //                 UrunGrubu: urunGrubu,
    //                 Urun: urun,
    //                 Miktar: miktar,
    //                 Aciklama: aciklama
    //             }
    //             var values = [];
    //             values.push(value);
    //             var model = {
    //                 RecordId: recordId,
    //                 User: user,
    //                 Values: values,
    //                 TalepEdenSube: talepEden,
    //                 TalepEdilenSube: talepEdilen,
    //             }
    //             recordList.push(model);
    //         }
    //     });

    //     if (recordList.length > 0) {
    //         var localUrl = String.format('http://localhost:60067/api/data/SAPKonsinye'),
    //             realUrl = String.format('https://vygon.setcrm.com/api/data/SAPKonsinye');
    //         $.ajax({
    //             contentType: 'application/json',
    //             type: "POST",
    //             url: realUrl,
    //             dataType: "json",
    //             data: JSON.stringify(recordList),
    //             async: true,
    //             success: function (r) {
    //                 $('#modalKonsinyeLoadingBar').hide();
    //                 if (r.Status) {
    //                     setUtil.alert({
    //                         container: '#modalSapMessage',
    //                         message: "İşlem başarılı, sayfa yeniliyor. Lütfen bekleyiniz.",
    //                         alertClass: 'alert-success',
    //                         autoClose: false
    //                     });
    //                     setTimeout(function () {
    //                         window.location.href = 'https://maya.setcrm.com/set/list/stok-transfer-talebi/?filter=D79726C872B54667A292A48D1CB80C97';
    //                     }, 2000);
    //                 } else {
    //                     setUtil.alert({
    //                         container: '#modalSapMessage',
    //                         message: r.Message,
    //                         alertClass: 'alert-danger',
    //                         autoClose: false
    //                     });
    //                 }
    //             }
    //         });
    //     } else {
    //         setUtil.alert({
    //             container: '#modalSapMessage',
    //             message: "İşlemi yapabilmek için en az bir tane kayıt seçiniz.",
    //             alertClass: 'alert-danger',
    //             autoClose: false
    //         });
    //     }

    // });
    // });
});

function validation() {
    if (!String.isNullOrWhiteSpace($('#firma').select2('data')) && !String.isNullOrWhiteSpace($('#urunGrubu').select2('data')) &&
        !String.isNullOrWhiteSpace($('#urun').select2('data')) && !String.isNullOrWhiteSpace($('#talepEdenSube').select2('data')) &&
        !String.isNullOrWhiteSpace($('#talepEdilenSube').select2('data')) && !String.isNullOrWhiteSpace($('#miktar').val())) {
        return true;
    } else {
        return false;
    }
}

function clearSelections() {
    // $('#satisTemsilcisi').select2('data', null);
    // $('#firma').select2('data', null);
    $('#urunGrubu').select2('data', null);
    $('#urun').select2('data', null);
    // $('#talepEdenSube').select2('data', null);
    // $('#talepEdilenSube').select2('data', null);
    $('#miktar').val('');
    $('#aciklama').val('');
}

function ModalCreate() {
    $('#modalKonsinye').remove();
    window.setModal.Create({
        id: 'modalKonsinye',
        html: {
            header: '<h3 class="text-center"><strong>Yeni Konsinye Talebi</strong></h3>',
            body: '<div id="modalKonsinyeMessage"></div>' +
                '<div id="modalKonsinyeLoadingBar" style="margin:0 0 5px; width: 100%;display:none;">İşlem yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>' +
                '<div id="contentModalKonsinye"><br/>' +
                '<table id="newKonsinye" class="table">' +
                '<thead>' +
                '<th style="background:#21d961; tex-align:left">Hazırlayan</th>' +
                '<th style="background:#21d961; tex-align:left">Satış Temsilcisi</th>' +
                '<th style="background:#21d961; tex-align:left">Firma</th>' +
                '<th style="background:#21d961; tex-align:left">Sevk Adresi</th>' +
                '<th style="background:#21d961; tex-align:center">Ürün Grubu</th>' +
                '<th style="background:#21d961; tex-align:center">Ürün Adı</th>' +
                '<th style="background:#21d961; tex-align:center">Miktar</th>' +
                '<th style="background:#21d961; tex-align:center">Talep Eden Şube</th>' +
                '<th style="background:#21d961; tex-align:center">Talep Edilen Şube</th>' +
                '<th style="background:#21d961; tex-align:center">Açıklama</th>' +
                '</thead>' +
                '<tbody>' +
                '<tr>' +
                '<td style="width:200px; height:40px;"><div id="hazirlayan" class="hazirlayan"></div></td>' +
                '<td style="width:200px; height:40px;"><div id="satisTemsilcisi" class="satisTemsilcisi"></div></td>' +
                '<td style="width:500px; height:40px;"><div id="firma" class="firma"></div></td>' +
                '<td style="width:500px; height:40px;"><div id="sevk" class="sevk"></div></td>' +
                '<td style="width:60px; height:40px;"><div id="urunGrubu" class="urunGrubu"></div></td>' +
                '<td style="width:500px; height:40px;"><div id="urun" class="urun"></div></td>' +
                '<td style="width:100px"><input style="height:40px;" id="miktar" type="text" class="form-control miktar" autocomplete="off"></td>' +
                '<td style="width:200px; height:40px;"><div id="talepEdenSube" class="talepEdenSube"></div></td>' +
                '<td style="width:200px; height:40px;"><div id="talepEdilenSube" class="talepEdilenSube"></div></td>' +
                '<td style="width:100px"><input style="height:40px;" id="aciklama" type="text" class="form-control aciklama" autocomplete="off"></td>' +
                '</tr>' +
                '</tbody>' +
                '</table>' +
                '<div id="newTblSapMessage"></div>' +
                '<div id="newTblLoadingBar" style="margin:0 0 5px; width: 100%;">İşlem yapılıyor, lütfen bekleyiniz..<br/><img src="/Public/img/loading_bar.gif"></div>' +
                '<div id="contentSapModel">' +
                '<div class="row" id="grupss"><h3 class="text-center" style="margin-right:35px;"><strong>Konsinye Talepleri</strong></h3></div>' +
                '<table id="newTblSap" class="table">' +
                '<thead>' +
                // '<th style="background:#21d961; tex-align:left">Seç</th>' +
                '<th style="background:#21d961; tex-align:left">Hazırlayan</th>' +
                '<th style="background:#21d961; tex-align:left">Satış Temsilcisi</th>' +
                '<th style="background:#21d961; tex-align:center">Firma</th>' +
                '<th style="background:#21d961; tex-align:center">Sevk Adresi</th>' +
                '<th style="background:#21d961; tex-align:center">Ürün Grubu</th>' +
                '<th style="background:#21d961; tex-align:center">Ürün</th>' +
                '<th style="background:#21d961; tex-align:center">Miktar</th>' +
                '<th style="background:#21d961; tex-align:center">Talep Edilen Şube</th>' +
                '<th style="background:#21d961; tex-align:center">Talep Eden Şube</th>' +
                '<th style="background:#21d961; tex-align:center">Açıklama</th>' +
                '</thead>' +
                '<tbody>' +
                '</tbody>' +
                '</table>' +
                '</div>',
            footer: '<button id="btnTransferKonsinye" class="btn btn-success btn-sm">Siparişleri Aktar</button><button id="btnAdd" class="btn btn-success btn-sm">Ekle</button><button data-dismiss="modal" class="btn btn-danger btn-sm btn-kapat">Kapat</button>',
        },
        settings: {
            widthClass: 'modal-full-width'
        }
    });
    // $('#btnTransferKonsinye').hide();
    $('#modalKonsinye').modal('toggle');
    // $('#btnTransferKonsinye').hide();
}

// function ModalListCreate() {
//     $('#modalKonsinye').modal('toggle');
//     $('#SapKonsinye').remove();
//     window.setModal.Create({
//         id: 'SapKonsinye',
//         html: {
//             header: '<h3 class="text-center"><strong>Konsinye Taleplerini Aktar</strong></h3>',
//             body: '<div id="modalSapMessage"></div>' +
//                 '<div id="modalSapLoadingBar" style="margin:0 0 5px; width: 100%;">İşlem yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>' +
//                 '<div id="contentModalSap" style="display:none;"><br/>' +
//                 '<table id="newTblSap" class="table">' +
//                 '<thead>' +
//                 '<th style="background:#21d961; tex-align:left">Seç</th>' +
//                 '<th style="background:#21d961; tex-align:left">Satış Temsilcisi</th>' +
//                 '<th style="background:#21d961; tex-align:center">Firma</th>' +
//                 '<th style="background:#21d961; tex-align:center">Ürün Grubu</th>' +
//                 '<th style="background:#21d961; tex-align:center">Ürün</th>' +
//                 '<th style="background:#21d961; tex-align:center">Miktar</th>' +
//                 '<th style="background:#21d961; tex-align:center">Talep Edilen Şube</th>' +
//                 '<th style="background:#21d961; tex-align:center">Talep Eden Şube</th>' +
//                 '<th style="background:#21d961; tex-align:center">Açıklama</th>' +
//                 '</thead>' +
//                 '<tbody>' +
//                 '</tbody>' +
//                 '</table>' +
//                 '</div>',
//             footer: '<button id="btnSap" class="btn btn-success btn-sm">Sap ye Aktar</button><button data-dismiss="modal" class="btn btn-danger btn-sm">Kapat</button>'
//         },
//         settings: {
//             widthClass: 'modal-full-width'
//         }
//     });
//     $('#SapKonsinye').modal('toggle');
// }

function GetKonsinyeTalepleri() {
    var localUrl = String.format('http://localhost:52748/api/data/GetKonsinyeTalepleri?userId=' + userData.id);
    var realUrl = String.format('https://gstmedikalwebapi.setcrm.com/api/data/GetKonsinyeTalepleri?userId=' + userData.id);
    $.get(realUrl, function(r) {
        if (r.Status) {
            if (r.KonsinyeList.length > 0) {
                $.each(r.KonsinyeList, function(i, v) {
                    // debugger;
                    var newRow = $('<tr/>', {
                        'data-id': v.RecordId,
                        'data-rowid': i
                    });
                    // newRow.append('<td style="width:50px;"><input class="form-check-input" type="checkbox" value="false"></td>');
                    newRow.append(String.format('<td style="width:200px; height:40px;"><div id="hazirlayanSap_{0}" class="hazirlayanSap"></div></td>', i));
                    $('#newTblSap tbody').append(newRow);
                    if (!String.isNullOrWhiteSpace(v.Hazirlayan)) {
                        prepareSelect2WithData(String.format('#hazirlayanSap_{0}', i), [{
                            id: v.Hazirlayan.id,
                            text: v.Hazirlayan.text
                        }]);
                        prepareSelect2SelectedOneItem(String.format('#hazirlayanSap_{0}', i), v.Hazirlayan.id, v.Hazirlayan.text, false);
                        $(String.format('#hazirlayanSap_{0}', i)).select2('enable', false);
                    } else {
                        prepareSelect2WithData(String.format('#hazirlayanSap_{0}', i), null);
                    }
                    newRow.append(String.format('<td style="width:200px; height:40px;"><div id="satisTemsilcisiSap_{0}" class="satisTemsilcisiSap"></div></td>', i));
                    var value = v.Values[0];
                    $('#newTblSap tbody').append(newRow);
                    if (!String.isNullOrWhiteSpace(v.SatisTemsilcisi)) {
                        prepareSelect2WithData(String.format('#satisTemsilcisiSap_{0}', i), [{
                            id: v.SatisTemsilcisi.id,
                            text: v.SatisTemsilcisi.text
                        }]);
                        prepareSelect2SelectedOneItem(String.format('#satisTemsilcisiSap_{0}', i), v.SatisTemsilcisi.id, v.SatisTemsilcisi.text, false);
                        $(String.format('#satisTemsilcisiSap_{0}', i)).select2('enable', false);
                    } else {
                        prepareSelect2WithData(String.format('#satisTemsilcisiSap_{0}', i), null);
                    }
                    newRow.append(String.format('<td style="width:500px; height:40px;"><div id="FirmaSap_{0}" class="firmaSap"></div></td>', i));
                    $('#newTblSap tbody').append(newRow);
                    // debugger;
                    if (!String.isNullOrWhiteSpace(v.FirmaBaslik)) {
                        prepareSelect2WithData(String.format('#FirmaSap_{0}', i), [{
                            id: v.FirmaBaslik.id,
                            text: v.FirmaBaslik.text
                        }]);
                        prepareSelect2SelectedOneItem(String.format('#FirmaSap_{0}', i), v.FirmaBaslik.id, v.FirmaBaslik.text, false);
                        $(String.format('#FirmaSap_{0}', i)).select2('enable', false);
                    } else {
                        prepareSelect2WithData(String.format('#FirmaSap_{0}', i), null);
                    }
                    newRow.append(String.format('<td style="width:500px; height:40px;"><div id="sevk_{0}" class="sevkSap"></div></td>', i));
                    $('#newTblSap tbody').append(newRow);
                    // debugger;
                    if (!String.isNullOrWhiteSpace(v.Sevk)) {
                        prepareSelect2WithData(String.format('#sevk_{0}', i), [{
                            id: v.Sevk.id,
                            text: v.Sevk.text
                        }]);
                        prepareSelect2SelectedOneItem(String.format('#sevk_{0}', i), v.Sevk.id, v.Sevk.text, false);
                        $(String.format('#sevk_{0}', i)).select2('enable', false);
                    } else {
                        prepareSelect2WithData(String.format('#sevk_{0}', i), null);
                    }
                    newRow.append(String.format('<td style="width:60px; height:40px;"><div id="UrunGrubu_{0}" class="urunGrubuSap"></div></td>', i));
                    $('#newTblSap tbody').append(newRow);
                    // debugger;
                    if (!String.isNullOrWhiteSpace(v.UrunGrubu)) {
                        prepareSelect2WithData(String.format('#UrunGrubu_{0}', i), [{
                            id: v.UrunGrubu.id,
                            text: v.UrunGrubu.text
                        }]);
                        prepareSelect2SelectedOneItem(String.format('#UrunGrubu_{0}', i), v.UrunGrubu.id, v.UrunGrubu.text, false);
                        $(String.format('#UrunGrubu_{0}', i)).select2('enable', false);
                    } else {
                        prepareSelect2WithData(String.format('#UrunGrubu_{0}', i), null);
                    }
                    newRow.append(String.format('<td style="width:500px; height:40px;"><div id="Urun_{0}" class="urunSap"></div></td>', i));
                    $('#newTblSap tbody').append(newRow);
                    // debugger;
                    if (!String.isNullOrWhiteSpace(value.Urun)) {
                        prepareSelect2WithData(String.format('#Urun_{0}', i), [{
                            id: value.Urun.id,
                            text: value.Urun.text
                        }]);
                        prepareSelect2SelectedOneItem(String.format('#Urun_{0}', i), value.Urun.id, value.Urun.text, false);
                        $(String.format('#Urun_{0}', i)).select2('enable', false);
                    } else {
                        prepareSelect2WithData(String.format('#Urun_{0}', i), null);
                    }
                    newRow.append('<td style="width:100px"><input style="height:40px;" id="' + String.format('miktar_{0}', i) + '" type="text" class="form-control miktarSap" disabled value="' + value.Miktar + '" autocomplete="off"></td>');
                    newRow.append(String.format('<td style="width:200px; height:40px;"><div id="TalepEdilenSube_{0}" class="talepEdilenSubeSap"></div></td>', i));
                    $('#newTblSap tbody').append(newRow);
                    // debugger;
                    if (!String.isNullOrWhiteSpace(v.TalepEdilenSube)) {
                        prepareSelect2WithData(String.format('#TalepEdilenSube_{0}', i), [{
                            id: v.TalepEdilenSube.id,
                            text: v.TalepEdilenSube.text
                        }]);
                        prepareSelect2SelectedOneItem(String.format('#TalepEdilenSube_{0}', i), v.TalepEdilenSube.id, v.TalepEdilenSube.text, false);
                        $(String.format('#TalepEdilenSube_{0}', i)).select2('enable', false);
                    } else {
                        prepareSelect2WithData(String.format('#TalepEdilenSube_{0}', i), null);
                    }
                    newRow.append(String.format('<td style="width:200px; height:40px;"><div id="TalepEdenSube_{0}" class="talepEdenSubeSap"></div></td>', i));
                    $('#newTblSap tbody').append(newRow);
                    // debugger;
                    if (!String.isNullOrWhiteSpace(v.TalepEdenSube)) {
                        prepareSelect2WithData(String.format('#TalepEdenSube_{0}', i), [{
                            id: v.TalepEdenSube.id,
                            text: v.TalepEdenSube.text
                        }]);
                        prepareSelect2SelectedOneItem(String.format('#TalepEdenSube_{0}', i), v.TalepEdenSube.id, v.TalepEdenSube.text, false);
                        $(String.format('#TalepEdenSube_{0}', i)).select2('enable', false);
                    } else {
                        prepareSelect2WithData(String.format('#TalepEdenSube_{0}', i), null);
                    }
                    newRow.append('<td style="width:100px"><input style="height:40px;" id="' + String.format('aciklama_{0}', i) + '" type="text" class="form-control aciklamaSap" disabled value="' + value.Aciklama + '" autocomplete="off"></td>');
                    $('#newTblSap tbody').append(newRow);
                });
                // console.log(length);
                $('#modalSapLoadingBar').hide();
                $('#contentSapModel').show();
            }


        } else {
            $('#modalSapLoadingBar').hide();
            setUtil.alert({
                container: '#modalSapMessage',
                message: r.Message,
                alertClass: 'alert-danger',
                autoClose: false
            });
        }
    });
}