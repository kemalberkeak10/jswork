$(function() {
    $('.btn-br-actions[data-publicid=3A5508A28D744BEBB8BDD996DC9CFE62]').hide();
    $('.btn-br-actions[data-publicid=3A5508A28D744BEBB8BDD996DC9CFE62]').closest('td').prepend('<a id="btnAnalizEkle" class="btn btn-sm btn-danger"  style="margin-right:10px;" >Analiz Ekle</a>');
    var tekilAc = false;
    $('body').on('click', '#btnAnalizEkle', function() {
        $('#analizEkleModal').remove();
        window.setModal.Create({
            id: 'analizEkleModal',
            html: {
                header: 'Analiz Ekle',
                body: '<div id="msg" style="margin:0 23px 5px; width: 80%;font-size:15px;"></div>' +
                    '<div class="custom-control custom-radio custom-control-inline" style="padding-left: 15px;">' +
                    '<input id="chkTekil" name="chk_' + 1 + '" value="2" type="checkbox" class="custom-control-input chk" /><label class="custom-control-label" style="margin-left:8px;margin-right:10px;">Tekil Ekle</label>' +
                    '<input id="chkPaket" name="chk_' + 1 + '" value="1" type="checkbox" class="custom-control-input chk" /><label class="custom-control-label" style="margin-left:8px">Paket Ekle</label>' +
                    '<input  type="text" class="form-control modal-search" placeholder="Ara.." style="display:none;"/>' + '</div>' + '</br>' +
                    '<div id="analizAlanlar" style="margin:0 0 5px;"></div>' +
                    '<div id="analizAlanlar2" style="margin:0 0 5px;"></div>',
                footer: '<button type="button" class="btn btn-default  btn-xl pull-right"  data-dismiss="modal" >Kapat</button>' +
                    '<button type="button" id="analizKaydetBtn" class="btn btn-xl btn-success pull-right">Analiz Ekle</button>'
            },

        });
        $('#analizEkleModal .modal-body').css('height', '250px');
        $('#analizEkleModal .modal-dialog').css('width', '40%');
        $('#analizEkleModal').modal('toggle');
        $('input[class="custom-control-input chk"]').click(function() {
            $('.modal-search').show();
            tekilAc = false;
            if (!$('#chkTeklif').prop('checked') && !$('#chkCihaz').prop('checked')) {
                $('#checkDiv').hide();
            } else {
                $('#checkDiv').show();
            }
            if ($(this).is(':checked')) {
                $('#analizEkleModal .modal-body #analizAlanlar').html('');
                $('#analizEkleModal .modal-body #analizAlanlar2').html('');
                $('input[name="' + $(this).attr('name') + '"]').prop('checked', false);
                $(this).prop('checked', true);
                // Tekliften Cihaz Ekleme
                if ($(this).attr('id') == 'chkTekil') {
                    tekilAc = true;
                    var coId = "BD3372559AE24CCE940D50B9E5F611B1";
                    var vfId = "28372890534A458283C0D750EBDB28B0";
                    var url = 'https://kazlicesmewebapi.setcrm.com/api/data/VfOkuma?coId=' + coId + '&vfId=' + vfId;
                    var url2 = 'http://localhost:44358/api/data/VfOkuma?coId=' + coId + '&vfId=' + vfId;
                    $.get(url, function(r) {
                        if (r.IsOk === true) {
                            $('#newTbl thead').html('');
                            $('#newTbl tbody').html('');
                            var newTbl = $('<table id="newTbl" style="width: 100%;overflow-x: scroll;table-layout: fixed; " />');
                            var thead = $('<thead />');
                            var newRow = $('<tr class="table table-bordered table-hover" style="background-color:lightblue;"/>');
                            newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Seçim'));
                            newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Analiz Adı'));
                            newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;width: 500px;" class="col-md-2"/>').text('Cihaz Adı'));
                            newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Metot'));
                            newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Laboratuvar'));
                            newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Birim Sorumlusu'));
                            thead.append(newRow);
                            newTbl.append(thead);
                            var tbody = $('<tbody />');
                            $.each(r.Records, function(i, v) {
                                var analizAdi = v.Values.first('FieldPublicId', '85F455A5959648C4A8830DEAF046A12F').Value;
                                var cihazAdi = v.Values.first('FieldPublicId', '04A3A9980F864EDA8519B3B354A5E3AD').Value;
                                var metot = v.Values.first('FieldPublicId', 'B68E2D1F9B8A4158BFBB2E5A6B9110BC').Value;
                                var laboratuvar = v.Values.first('FieldPublicId', 'BC28D088C4224B07BB9A9808B3E654A1').Value;
                                var birimSorumlusu = v.Values.first('FieldPublicId', 'D5A5E08D2A784CAC9192A3F8F3D4C572').Value;
                                var newRow = $('<tr class="table table-bordered table-hover"/>').attr('data-id', v.PublicId);
                                newRow.append($('<td style="text-align: left;" class="col-md-2"/>').append($('<input />', {
                                    'id': 'chkTablo',
                                    'name': 'chkTablo',
                                    'value': '',
                                    'type': 'checkbox',
                                    'style': 'margin; auto;'
                                })));
                                newRow.append($('<td style="text-align: left;" class="col-md-2"/>').text(analizAdi));
                                newRow.append($('<td style="text-align: left;" class="col-md-2"/>').text(cihazAdi));
                                newRow.append($('<td style="text-align: left;" class="col-md-2"/>').text(metot));
                                newRow.append($('<td style="text-align: left;" class="col-md-2"/>').text(laboratuvar));
                                newRow.append($('<td style="text-align: left;" class="col-md-2"/>').text(birimSorumlusu));
                                tbody.append(newRow);
                                newTbl.append(tbody);
                            });
                            $('#analizEkleModal .modal-body #analizAlanlar').append(newTbl);
                        } else {
                            $('#analizEkleModal').find('#msg').text("Görüntülenecek Analiz Tanımı Kaydı Bulunamadı.");
                        }
                        $('#analizEkleModal .modal-body').css('max-height', '');
                        $('#analizEkleModal .modal-body').css('height', '600px');
                        $('#analizEkleModal .modal-dialog').css('width', '70%');
                    });

                } else {
                    // Pket Eklemesi Yapılacak
                    tekilAc = false;
                    $('#analiz').select2('data', {
                        id: '',
                        text: 'Seçiniz'
                    });
                    $('#analizEkleModal .modal-body #mrkEkle').html(' ');
                    $('#analizEkleModal .modal-body #mdlEkle').html(' ');
                    $('#analizEkleModal .modal-body #chzEkle').html(' ');
                    $('#analizEkleModal .modal-body #yeniKayit').html(' ');
                    //todo: firma vf a sorulacak ve ekrana çizilecek
                    var coId = "31C3FDB966944C0689FE905642E03DC5";
                    var vfId = "165244EDF80A42859FEEF41DB967C90D";
                    var url = 'https://kazlicesmewebapi.setcrm.com/api/data/VfOkuma?coId=' + coId + '&vfId=' + vfId;
                    var url2 = 'http://localhost:44358/api/data/VfOkuma?coId=' + coId + '&vfId=' + vfId;
                    $.get(url, function(r) {
                        if (r.IsOk === true) {
                            $('#newTblPaket thead').html('');
                            $('#newTblPaket tbody').html('');
                            var newTbl = $('<table id="newTblPaket" style="width: 100%;overflow-x: scroll" />');
                            var thead = $('<thead />');
                            var newRow = $('<tr class="table table-bordered table-hover" style="background-color:lightblue;"/>');
                            newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Seçim'));
                            newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Sıra No'));
                            newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Paket Adı'));
                            thead.append(newRow);
                            newTbl.append(thead);
                            var tbody = $('<tbody />');
                            $.each(r.Records, function(i, v) {
                                var siraNo = v.Values.first('FieldPublicId', '223D87886E2A4AE3A9B62F8A1E5857DD').Value;
                                var paketSiraNo = parseInt(siraNo);
                                var paketAdi = v.Values.first('FieldPublicId', 'D4023B0289BC403BB71D583140DF54EA').Value;
                                var newRow = $('<tr class="table table-bordered table-hover"/>').attr('data-id', v.PublicId);
                                newRow.append($('<td style="text-align: left;" class="col-md-2"/>').append($('<input />', {
                                    'id': 'chkTablo',
                                    'name': 'chkTablo',
                                    'value': '',
                                    'type': 'checkbox',
                                    'style': 'margin; auto;'
                                })));
                                newRow.append($('<td style="text-align: left;" class="col-md-2"/>').text(paketSiraNo));
                                newRow.append($('<td style="text-align: left;" class="col-md-2"/>').text(paketAdi));
                                tbody.append(newRow);
                                newTbl.append(tbody);
                            });
                            $('#analizEkleModal .modal-body #analizAlanlar').append(newTbl);
                            $('#newTblPaket tbody input:checkbox').click(function() {

                                if ($(this).is(':checked')) {
                                    $('#analizEkleModal .modal-body #analizAlanlar2').html('');
                                    $('input[name="' + $(this).attr('name') + '"]').prop('checked', false);
                                    $(this).prop('checked', true);
                                }
                                LrCiz($(this).closest('tr').data('id'));
                            });
                        } else {
                            $('#analizEkleModal').find('#msg').text("Görüntülenecek Analiz Paketi Kaydı Bulunamadı.");
                        }
                        $('#analizEkleModal .modal-body').css('max-height', '');
                        $('#analizEkleModal .modal-body').css('height', '600px');
                        $('#analizEkleModal .modal-dialog').css('width', '70%');


                    });

                    function LrCiz(recordId) {
                        var url = 'https://kazlicesmewebapi.setcrm.com/api/data/LrOkuma?recordId=' + recordId + '&lrId=57965324DB0A469198A83467672E2AE1&q=';
                        var url2 = 'http://localhost:44358/api/data/LrOkuma?recordId=' + recordId + '&lrId=57965324DB0A469198A83467672E2AE1&q=';
                        $.get(url,
                            function(r) {
                                if (r.IsOk === true) {
                                    $('#paketAnalizTbl thead').html('');
                                    $('#paketAnalizTbl tbody').html('');
                                    var newTbl = $('<table id="paketAnalizTbl" style="width: 100%;overflow-x: scroll" />');
                                    var thead = $('<thead />');
                                    var newRow = $('<tr class="table table-bordered table-hover" style="background-color:lightblue;"/>');
                                    newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Seçim'));
                                    newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Analiz Adı'));

                                    thead.append(newRow);
                                    newTbl.append(thead);
                                    var tbody = $('<tbody />');
                                    $.each(r.Records, function(i, v) {
                                        var analizId = v.Values.first('FieldPublicId', '55B1B18AA5C749AEA79C48B99D4D91C7').SelectedItemPublicIds;
                                        var analizAdi = v.Values.first('FieldPublicId', '55B1B18AA5C749AEA79C48B99D4D91C7').Value;
                                        var newRow = $('<tr class="table table-bordered table-hover"/>').attr('data-id', analizId);
                                        newRow.append($('<td style="text-align: left;" class="col-md-2"/>').append($('<input />', {
                                            'id': 'chkTablo',
                                            'name': 'chkTablo',
                                            'value': '',
                                            'type': 'checkbox',
                                            'style': 'margin; auto;'
                                        })));
                                        newRow.append($('<td style="text-align: left;" class="col-md-2"/>').text(analizAdi));
                                        tbody.append(newRow);
                                        newTbl.append(tbody);
                                    });
                                    $('#analizEkleModal .modal-body #analizAlanlar2').append(newTbl);
                                    $('#paketAnalizTbl tbody input:checkbox').prop('checked', true); // tüm checkboxları seçer

                                } else {
                                    $('#analizEkleModal').find('#msg').text("Pakete Dahil Analiz Bulunamadı.");
                                }
                                $('#analizEkleModal .modal-body').css('max-height', '');
                                $('#analizEkleModal .modal-body').css('height', '600px');
                                $('#analizEkleModal .modal-dialog').css('width', '70%');
                            });
                    }
                }
            }
        });
        $(".modal-search").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $('#newTblPaket tbody tr').filter(function() {
                $(this).toggle($(this).text().trim().toLowerCase().indexOf(value) > -1);
            });
        });
        $(".modal-search").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $('#newTbl tbody tr').filter(function() {
                $(this).toggle($(this).text().trim().toLowerCase().indexOf(value) > -1);
            });
        });
    });

    $('body').on('click', '#analizKaydetBtn', function() {
        var tekilModel = {};
        var analizTanimiIdList = [];

        if (tekilAc) {
            var tblData = $('#newTbl tbody tr input:checked');
            if (tblData.length > 0) {
                tblData.each(function(i, v) {
                    analizTanimiIdList.push($(v).closest('tr').attr('data-id'));
                });
                tekilModel.AnalizIdList = analizTanimiIdList;
                tekilModel.RecordId = $("#RecordPublicId").val();
                KayitAc(tekilModel);
            } else {
                setUtil.alert({
                    container: '#analizEkleModal .modal-body #msg',
                    message: "Lütfen 1 tane Analiz Tanımı Kaydı Seçiniz.",
                    alertClass: 'alert-danger',
                    autoClose: true
                });
            }
        } else {
            var tblData = $('#paketAnalizTbl  tbody tr input:checked');
            if (tblData.length > 0) {
                tblData.each(function(i, v) {
                    analizTanimiIdList.push($(v).closest('tr').attr('data-id'));
                });
                tekilModel.AnalizIdList = analizTanimiIdList;
                tekilModel.RecordId = $("#RecordPublicId").val();
                KayitAc(tekilModel);
            } else {
                setUtil.alert({
                    container: '#analizEkleModal .modal-body #msg',
                    message: "Lütfen 1 tane Analiz Tanımı Kaydı Seçiniz.",
                    alertClass: 'alert-danger',
                    autoClose: true
                });
            }
        }

        function KayitAc(data) {
            $('#analizEkleModal .modal-body').html('<div id="loading" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>');
            $('#analizEkleModal .modal-body').css('max-height', '');
            $('#analizEkleModal .modal-body').css('height', '200px');
            $('#analizEkleModal .modal-dialog').css('width', '40%');
            var apiFormLinkUrlForLocal = String.format("http://localhost:44358/api/data/TopluAnalizKaydet");
            var apiFormLinkUrlForReal = String.format("https://kazlicesmewebapi.setcrm.com/api/data/TopluAnalizKaydet");
            $.post(apiFormLinkUrlForReal, data, function(r) {
                if (r.Status) {
                    window.location.reload();
                } else {
                    setUtil.alert({
                        container: '#analizEkleModal .modal-body #msg',
                        message: r.Message,
                        alertClass: 'alert-danger',
                        autoClose: true
                    });
                }
            });
        }
    });
});