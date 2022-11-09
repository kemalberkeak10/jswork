$(function() {
    $('.btn-br-actions[data-publicid=BEAE9B2AF04043069B3A1B75DA8C0D1E]').hide();
    $('.btn-br-actions[data-publicid=BEAE9B2AF04043069B3A1B75DA8C0D1E]').closest('td').prepend('<a id="btnDeneyEkle" class="btn btn-sm btn-danger"  style="margin-right:10px;" >Deney Ekle</a>');
    var tekilAc = false;
    var deneyAc = false;

    // var teklifId = $('label[for=A856D30C07DC4949AC70A715DCD0C020]').parent().data('publicids');
    // var raporTipiId = $('label[for=213F9026A8864141AB459FB2ECB148DD]').parent().data('publicids');

    $('body').on('click', '#btnDeneyEkle', function() {
        $('#deneyEkleModal').remove();
        window.setModal.Create({
            id: 'deneyEkleModal',
            html: {
                header: 'Deney Ekle',
                body: '<div id="msg" style="margin:0 23px 5px; width: 80%;font-size:15px;"></div>' +
                    '<div class="custom-control custom-radio custom-control-inline" style="padding-left: 15px;">' +
                    '<input id="chkTekil" name="chk_' + 1 + '" value="2" type="checkbox" class="custom-control-input chk" /><label class="custom-control-label" style="margin-left:8px;margin-right:10px;">Tekil Ekle</label>' +
                    '<input id="chkDeney" name="chk_' + 1 + '" value="1" type="checkbox" class="custom-control-input chk" /><label class="custom-control-label" style="margin-left:8px">Deney Grubu Ekle</label>' +
                    '<input  type="text" class="form-control modal-search" placeholder="Ara.." style="display:none;"/>' + '</div>' + '</br>' +
                    '<div id="deneyAlanlar" style="margin:0 0 5px;"></div>' +
                    '<div id="deneyAlanlar2" style="margin:0 0 5px;"></div>' +
                    '<div id="deneyAlanlar3" style="margin:0 0 5px;"></div>',
                footer: '<button type="button" class="btn btn-default  btn-xl pull-right"  data-dismiss="modal" >Kapat</button>' +
                    '<button type="button" id="deneyKaydetBtn" class="btn btn-xl btn-success pull-right">Kaydet</button>'
            },

        });
        $('#deneyEkleModal .modal-body').css('height', '250px');
        $('#deneyEkleModal .modal-dialog').css('width', '40%');
        // $('#deneyEkleModal').modal('toggle');
        $('#deneyEkleModal').modal({
            backdrop: false
        });
        $('input[class="custom-control-input chk"]').click(function() {
            $('.modal-search').show();
            tekilAc = false;
            // if (!$('#chkTeklif').prop('checked') && !$('#chkCihaz').prop('checked')) {
            // $('#checkDiv').hide();
            // } else {
            // $('#checkDiv').show();
            // }
            if ($(this).is(':checked')) {
                $('#deneyEkleModal .modal-body #deneyAlanlar').html('');
                $('#deneyEkleModal .modal-body #deneyAlanlar2').html('');
                $('input[name="' + $(this).attr('name') + '"]').prop('checked', false);
                $(this).prop('checked', true);
                // Tekliften Cihaz Ekleme
                if ($(this).attr('id') == 'chkTekil') {
                    tekilAc = true;
                    deneyAc = false;
                    var coId = "588D5DA1F7164C4196525CF0E6208039";
                    var vfId = "16584E09402041D985ED0C48E1986AEA";

                    // $.get(url, function (sdata) {
                    //     var elem = $('<div/>').html(sdata);
                    //     vfId = elem.find('label[for=755A70F5CCB840AF963769BE0BFB8428]').parent().data('value');
                    // });
                    // var vfId = "28372890534A458283C0D750EBDB28B0";
                    var url = 'https://eaewebapi.setcrm.com/api/data/VfOkuma?coId=' + coId + '&vfId=' + vfId;
                    var url2 = 'https://localhost:44328/api/data/VfOkuma?coId=' + coId + '&vfId=' + vfId;
                    $.get(url, function(r) {
                        if (r.IsOk === true) {
                            $('#newTbl thead').html('');
                            $('#newTbl tbody').html('');

                            var newTbl = $('<table id="newTbl" style="width: 100%;overflow-x: scroll;table-layout: fixed; " />');
                            var thead = $('<thead/>');
                            var newThead = $('<tr class="table table-bordered table-hover" style="background-color:lightblue;">');

                            newThead.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Seçim'));
                            newThead.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Madde Numarası'));
                            // newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;width: 500px;" class="col-md-2"/>').text('Cihaz Adı'));
                            newThead.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/></tr>').text('Deney Adı'));
                            // newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Ürün Grubu'));
                            // newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Laboratuvar'));
                            // newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Birim Sorumlusu'));
                            thead.append(newThead);
                            newTbl.append(thead);
                            var tbody = $('<tbody/>');
                            $.each(r.Records, function(i, v) {
                                var deneyAdi = v.Values.first('FieldPublicId', 'A7D5911E32FB4DB89ADEB779A40D48C4').Value;
                                if (deneyAdi.contains('İ')) {
                                    deneyAdi = deneyAdi.replace('İ', 'I');
                                }
                                // var cihazAdi = v.Values.first('FieldPublicId', '04A3A9980F864EDA8519B3B354A5E3AD').Value;
                                var maddeNumarasi = v.Values.first('FieldPublicId', '33BA79310DFA4C3E82D626B2C03201CC').Value;
                                // var laboratuvar = v.Values.first('FieldPublicId', 'BC28D088C4224B07BB9A9808B3E654A1').Value;
                                // var birimSorumlusu = v.Values.first('FieldPublicId', 'D5A5E08D2A784CAC9192A3F8F3D4C572').Value;
                                // var urunGrubu = v.Values.first('FieldPublicId', '22101214B8874F9BA23A9C98EB92EF59').Value;
                                // var newRow = $('<tr class="table table-bordered table-hover"/>').attr('data-id', v.PublicId);
                                var newRow = $('<tr class="table table-bordered table-hover">').attr('data-id', v.PublicId);
                                newRow.append($('<td style="text-align: left;" class="col-md-2"/>').append($('<input />', {
                                    'id': 'chkTablo',
                                    'name': 'chkTablo',
                                    'value': '',
                                    'type': 'checkbox',
                                    'style': 'margin; auto;'
                                })));
                                newRow.append($('<td style="text-align: left;" class="col-md-2"/>').text(deneyAdi));
                                // newRow.append($('<td style="text-align: left;" class="col-md-2"/>').text(cihazAdi));
                                newRow.append($('<td style="text-align: left;" class="col-md-2"/></tr>').text(maddeNumarasi));
                                // newRow.append($('<td style="text-align: left;" class="col-md-2"/>').text(laboratuvar));
                                // newRow.append($('<td style="text-align: left;" class="col-md-2"/>').text(birimSorumlusu));
                                // newRow.append($('<td style="text-align: left;" class="col-md-2"/>').text(urunGrubu));
                                tbody.append(newRow);
                                newTbl.append(tbody);
                            });
                            $('#deneyEkleModal .modal-body #deneyAlanlar').append(newTbl);
                        } else {
                            $('#deneyEkleModal').find('#msg').text("Görüntülenecek Deney Tanımı Kaydı Bulunamadı.");
                        }
                        $('#deneyEkleModal .modal-body').css('max-height', '');
                        $('#deneyEkleModal .modal-body').css('height', '600px');
                        $('#deneyEkleModal .modal-dialog').css('width', '70%');
                    });

                } else if ($(this).attr('id') == 'chkDeney') {
                    // Pket Eklemesi Yapılacak
                    deneyAc = true;
                    tekilAc = false;
                    $('#deney').select2('data', {
                        id: '',
                        text: 'Seçiniz'
                    });
                    $('#deneyEkleModal .modal-body #mrkEkle').html(' ');
                    $('#deneyEkleModal .modal-body #mdlEkle').html(' ');
                    $('#deneyEkleModal .modal-body #chzEkle').html(' ');
                    $('#deneyEkleModal .modal-body #yeniKayit').html(' ');
                    //todo: firma vf a sorulacak ve ekrana çizilecek
                    var coId = "474469E60BA3468E835F6A42498BAC8E";
                    var vfId = "26F9CE81D4D444B9BC68D354CE9360E5";
                    var url = 'https://eaewebapi.setcrm.com/api/data/VfOkuma?coId=' + coId + '&vfId=' + vfId;
                    var url2 = 'https://localhost:44328/api/data/VfOkuma?coId=' + coId + '&vfId=' + vfId;
                    $.get(url, function(r) {
                        if (r.IsOk === true) {
                            $('#newTblPaket thead').html('');
                            $('#newTblPaket tbody').html('');
                            var newTbl = $('<table id="newTblPaket" style="width: 100%;overflow-x: scroll" />');
                            var thead = $('<thead />');
                            var newThead = $('<tr class="table table-bordered table-hover" style="background-color:lightblue;">');
                            newThead.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Seçim'));
                            newThead.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/></tr>').text('Deney Grubu Adı'));
                            // newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Paket Adı'));
                            thead.append(newThead);
                            newTbl.append(thead);
                            var tbody = $('<tbody />');
                            $.each(r.Records, function(i, v) {
                                // var siraNo = v.Values.first('FieldPublicId', '223D87886E2A4AE3A9B62F8A1E5857DD').Value;
                                // var paketSiraNo = parseInt(siraNo);
                                var deneyGrubuAdi = v.Values.first('FieldPublicId', '239E5E9D9EBD4FFFA796EC962C5E0CE3').Value;
                                if (deneyGrubuAdi.contains('İ')) {
                                    deneyGrubuAdi = deneyGrubuAdi.replace('İ', 'I');
                                }
                                var newRow = $('<tr class="table table-bordered table-hover">').attr('data-id', v.PublicId);
                                newRow.append($('<td style="text-align: left;" class="col-md-2"/>').append($('<input />', {
                                    'id': 'chkTablo1',
                                    'name': 'chkTablo1',
                                    'value': '',
                                    'type': 'checkbox',
                                    'style': 'margin; auto;'
                                })));
                                // newRow.append($('<td style="text-align: left;" class="col-md-2"/>').text(paketSiraNo));
                                newRow.append($('<td style="text-align: left;" class="col-md-2"/></tr>').text(deneyGrubuAdi));
                                tbody.append(newRow);
                                newTbl.append(tbody);
                            });
                            $('#deneyEkleModal .modal-body #deneyAlanlar').append(newTbl);
                            $('#newTblPaket tbody input:checkbox').click(function() {

                                if ($(this).is(':checked')) {
                                    $('#deneyEkleModal .modal-body #deneyAlanlar2').html('');
                                    //$('input[name="' + $(this).attr('name') + '"]').prop('checked', false);
                                    $(this).prop('checked', true);
                                }
                                // LrCiz($(this).closest('tr').data('id'));
                            });
                        } else {
                            $('#deneyEkleModal').find('#msg').text("Görüntülenecek Deney Paketi Kaydı Bulunamadı.");
                        }
                        $('#deneyEkleModal .modal-body').css('max-height', '');
                        $('#deneyEkleModal .modal-body').css('height', '600px');
                        $('#deneyEkleModal .modal-dialog').css('width', '70%');


                    });

                    // function LrCiz(recordId) {
                    // var url = 'https://kazlicesmewebapi.setcrm.com/api/data/LrOkuma?recordId=' + recordId + '&lrId=57965324DB0A469198A83467672E2AE1&q=';
                    // var url2 = 'http://localhost:44358/api/data/LrOkuma?recordId=' + recordId + '&lrId=57965324DB0A469198A83467672E2AE1&q=';
                    // $.get(url2,
                    // function (r) {
                    // if (r.IsOk === true) {
                    // $('#paketDeneyTbl thead').html('');
                    // $('#paketDeneyTbl tbody').html('');
                    // var newTbl = $('<table id="paketDeneyTbl" style="width: 100%;overflow-x: scroll" />');
                    // var thead = $('<thead />');
                    // var newRow = $('<tr class="table table-bordered table-hover" style="background-color:lightblue;"/>');
                    // newRow.append('<th style="text-align: left;" class="col-md-1"></th>');
                    // newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Seçim'));
                    // newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Deney Adı'));

                    // thead.append(newRow);
                    // newTbl.append(thead);
                    // var tbody = $('<tbody />');
                    // $.each(r.Records, function (i, v) {
                    // var deneyId = v.Values.first('FieldPublicId', '55B1B18AA5C749AEA79C48B99D4D91C7').SelectedItemPublicIds;
                    // var deneyAdi = v.Values.first('FieldPublicId', '55B1B18AA5C749AEA79C48B99D4D91C7').Value;
                    // var newRow = $('<tr class="table table-bordered table-hover"/>').attr('data-id', deneyId);
                    // newRow.append($('<td style="text-align: left;" class="col-md-2"/>').append($('<input />', {
                    // 'id': 'chkTablo',
                    // 'name': 'chkTablo',
                    // 'value': '',
                    // 'type': 'checkbox',
                    // 'style': 'margin; auto;'
                    // })));
                    // newRow.append($('<td style="text-align: left;" class="col-md-2"/>').text(deneyAdi));
                    // tbody.append(newRow);
                    // newTbl.append(tbody);
                    // });
                    // $('#deneyEkleModal .modal-body #deneyAlanlar2').append(newTbl);
                    // $('#paketDeneyTbl tbody input:checkbox').prop('checked', true); // tüm checkboxları seçer

                    // } else {
                    // $('#deneyEkleModal').find('#msg').text("Pakete Dahil Deney Bulunamadı.");
                    // }
                    // $('#deneyEkleModal .modal-body').css('max-height', '');
                    // $('#deneyEkleModal .modal-body').css('height', '600px');
                    // $('#deneyEkleModal .modal-dialog').css('width', '70%');
                    // });
                    // }
                }
            }
        });
        // $('body').on('click', '#selectAll',
        // function () {
        // if ($(this).is(':checked')) {
        // $('.chkDeneyPaket').prop('checked', true);
        // } else {
        // $('.chkDeneyPaket').prop('checked', false);
        // }
        // });
        $(".modal-search").on("keyup",
            function() {
                var val = $(this).val();
                if ($(this).val().contains("İ")) {
                    val = val.replace("İ", "i");
                }
                var value = val.toLowerCase();
                $('#newTblPaket tbody tr').filter(function() {
                    $(this).toggle($(this).text().trim().toLowerCase().indexOf(value) > -1);
                });
            });
        $(".modal-search").on("keyup",
            function() {
                var val = $(this).val();
                if ($(this).val().contains("İ")) {
                    val = val.replace("İ", "i");
                }
                var value = val.toLowerCase();
                $('#newTbl tbody tr').filter(function() {
                    // $(this).toggle($(this).find('td:eq(1)').text().trim().toLowerCase().indexOf(value) > -1);
                    $(this).toggle($(this).text().trim().toLowerCase().indexOf(value) > -1);
                });
            });
        $(".modal-search").on("keyup",
            function() {
                var val = $(this).val();
                if ($(this).val().contains("İ")) {
                    val = val.replace("İ", "i");
                }
                var value = val.toLowerCase();
                $('#newTblTeklif tbody tr').filter(function() {
                    // $(this).toggle($(this).find('td:eq(1)').text().trim().toLowerCase().indexOf(value) > -1);

                    $(this).toggle($(this).text().trim().toLowerCase().indexOf(value) > -1);
                });
            });

    });

    $('body').on('click', '#deneyKaydetBtn', function() {
        var model = {};
        var deneyTanimiKayitlar = [];
        if (tekilAc && !deneyAc) {
            var tblData = $('#newTbl tbody tr input:checked');
            if (tblData.length > 0) {
                tblData.each(function(i, v) {
                    deneyTanimiKayitlar.push($(v).closest('tr').attr('data-id'));
                    console.log(deneyTanimiKayitlar);
                });
                // var Kayitlar = {
                //     DeneyTalepFormulrField: $("#B9B4248BEC294AB9A2124008806F24CA").val(),
                //     DeneyTanimiField: $("#FC4B408A11564C20B0A55B5355B0B844").val(),
                // }
                model.DeneyTanimiRecordId = $("#RecordPublicId").val();
                model.Kayitlar = deneyTanimiKayitlar
                console.log(model);
                model.TeklifDeneyMi = false;
                KayitAc(model);
            } else {
                setUtil.alert({
                    container: '#deneyEkleModal .modal-body #msg',
                    message: "Lütfen 1 tane Deney Tanımı Kaydı Seçiniz.",
                    alertClass: 'alert-danger',
                    autoClose: true
                });
            }
        }
        if (!tekilAc && deneyAc) {
            debugger;
            var tblData = $('#newTblPaket  tbody tr input:checked');
            if (tblData.length > 0) {
                tblData.each(function(i, v) {
                    deneyTanimiKayitlar.push($(v).closest('tr').attr('data-id'));
                });
                model.RaporTipi = $('label[for=9AC9D9FADEF4416FB627ED5B05E23177]').parent().data('publicids');
                model.Kayitlar = deneyTanimiKayitlar;
                model.DeneyTanimiRecordId = $("#RecordPublicId").val();
                model.TeklifDeneyMi = true;
                KayitAc(model);
            } else {
                setUtil.alert({
                    container: '#deneyEkleModal .modal-body #msg',
                    message: "Lütfen 1 tane Deney Tanımı Kaydı Seçiniz.",
                    alertClass: 'alert-danger',
                    autoClose: true
                });
            }
        }

        function KayitAc(data) {
            $('#deneyEkleModal .modal-body').html('<div id="loading" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>');
            $('#deneyEkleModal .modal-body').css('max-height', '');
            $('#deneyEkleModal .modal-body').css('height', '200px');
            $('#deneyEkleModal .modal-dialog').css('width', '40%');
            var localUrl = String.format("https://localhost:44328/api/data/TopluDeneyTanimiKaydet");
            var realUrl = String.format("https://eaewebapi.setcrm.com/api/data/TopluDeneyTanimiKaydet");
            $.post(realUrl, data, function(r) {
                if (r.Status) {
                    window.location.reload();
                } else {
                    setUtil.alert({
                        container: '#deneyEkleModal .modal-body #msg',
                        message: r.Message,
                        alertClass: 'alert-danger',
                        autoClose: true
                    });
                }
            });
        }
    });
});