$(function() {
    var page = 0;
    $('.well:first .pull-right').prepend('<a id="btnLabSonucGirisi" class="btn btn-success btn-sm" style="margin-right: 5px;">Lab Sonuç Girişi</a>');

    var requestform = $('label[for=C6C3406A4BF84267AA11E775A862FD81]').parent().data('value');
    var requestformId = $('label[for=C6C3406A4BF84267AA11E775A862FD81]').parent().data('publicids');
    var cihazAlani = $('label[for=6BB89F95895A4396BB10269C5D66B01E]').parent().data('value');
    var cihazAlaniId = $('label[for=6BB89F95895A4396BB10269C5D66B01E]').parent().data('publicids');
    cihazAlaniListesi = cihazAlaniId.split('|');
    $("body").on('click', '#btnLabSonucGirisi', function() {
        if (String.isNullOrWhiteSpace(cihazAlani)) {
            notify("danger", "Cihaz bağlamalısınız!");
        } else {
            var table = $('.table-responsive table');

            $('#modalLabSonuc').remove();
            window.setModal.Create({
                id: 'modalLabSonuc',
                html: {
                    header: 'Lab Sonuç Girişi',
                    body: String.format('<div style="width:300px;margin-bottom:10px;"><label style="font-size:15px;">Referans İsmi Ara: </label><input id="searchReferans" type="text"  class="form-control"></div><hr><div class="selected-records"><h4 style="margin-top:0"><i class="fa fa-edit"></i>Seçilen Kayıtlar</h4></div><div class="hizli-ekle-records"><h4 style="margin-top:0"><i class="fa fa-edit"></i> Referans Listesi</h4></div>'),
                    footer: '<button id="btnReferansKaydet" type="button" class="btn btn-sm btn-success" >Kaydet</button>' + '<button id="btnKapat" class="btn btn-danger btn-sm" data-dismiss="modal" onclick="window.location.reload()">Kapat</button>'
                },
                settings: {
                    widthClass: 'modal-full-width'
                }
            });

            var modalBody = $('#modalLabSonuc .modal-body'),
                bodyRecords = modalBody.find('.hizli-ekle-records');
            selectedRecords = modalBody.find('.selected-records');
            bodyRecords.append($('<table/>', {
                class: 'table table-bordered table-hover',
                'style': 'margin-bottom:0;table-layout: fixed;'
            }).append($("<thead/>").html('<tr><th style="text-align:; vertical-align:middle;width:5%;" class="col-md-1"><input id="selectAll" type="checkbox"></th><th style="text-align: center; vertical-align:middle;width:5%;">Referans No</th><th style="text-align: center; vertical-align:middle;width:14%;">Referans İsmi</th><th style="text-align: center; vertical-align:middle;">Sonuç</th><th style="text-align: center; vertical-align:middle;">D.Limiti</th><th style="text-align: center; vertical-align:middle;">RMRL</th><th style="text-align: center; vertical-align:middle;">TRMRL</th><th style="text-align: center; vertical-align:middle;">Ölçüm Belirsizliği Miktarı</th><th style="text-align: center; vertical-align:middle;width:8%">Ölçüm Belirsizliği Birimi</th><th style="text-align: center; vertical-align:middle;">Raporlama Limiti</th><th style="text-align: center; vertical-align:middle;">Ö.B.</th><th style="text-align: center; vertical-align:middle;">G.K.</th><th style="width:10%;">Enstürmantel Analiz Cihazı</th><th style="text-align: center; vertical-align:middle;width:8%;">Analiz Metodu</th><th style="text-align: center; vertical-align:middle;width:8%;">D. Mevzuatı</th></tr>')).append($('<tbody/>')));
            selectedRecords.append($('<table/>', {
                class: 'table table-bordered table-hover',
                'style': 'margin-bottom:0;table-layout: fixed;'
            }).append($("<thead/>").html('<tr><th style="text-align:; vertical-align:middle;width:5%;" class="col-md-1"></th><th style="text-align: center; vertical-align:middle;width:5%;">Referans No</th><th style="text-align: center; vertical-align:middle;width:14%;">Referans İsmi</th><th style="text-align: center; vertical-align:middle;">Sonuç</th><th style="text-align: center; vertical-align:middle;">D.Limiti</th><th style="text-align: center; vertical-align:middle;">RMRL</th><th style="text-align: center; vertical-align:middle;">TRMRL</th><th style="text-align: center; vertical-align:middle;">Ölçüm Belirsizliği Miktarı</th><th style="text-align: center; vertical-align:middle;width:8%">Ölçüm Belirsizliği Birimi</th><th style="text-align: center; vertical-align:middle;">Raporlama Limiti</th><th style="text-align: center; vertical-align:middle;">Ö.B.</th><th style="text-align: center; vertical-align:middle;">G.K.</th><th style="width:10%;">Enstürmantel Analiz Cihazı</th><th style="text-align: center; vertical-align:middle;width:8%;">Analiz Metodu</th><th style="text-align: center; vertical-align:middle;width:8%;">D. Mevzuatı</th></tr>')).append($('<tbody/>')));

            getReferenceList();


            $('#modalLabSonuc').find('.modal-header button:first').attr('onclick',
                'window.location.reload()')
            $('#modalLabSonuc').modal({
                backdrop: 'static',
                keyboard: false
            });
        }


    });
    $('body').on('click',
        '.form-check-input',
        function() {
            var tr = $(this).closest('tr');
            var modalBody = $('#modalLabSonuc .modal-body'),
                selectedRecords = modalBody.find('.selected-records');
            var tbody = selectedRecords.find('tbody');
            tbody.append(tr);

        });
    $('body').on('click',
        '#selectAll',
        function() {
            if ($(this).is(':checked')) {
                $('.form-check-input').prop('checked', true);
            } else {
                $('.form-check-input').prop('checked', false);
            }
        });
    $("body").on("keyup",
        '#searchReferans',
        function(e) {
            if (e.key === 'Enter' || e.keyCode === 13) {
                getReferenceList(0);
            }
            // var trList = $('#modalLabSonuc .modal-body .hizli-ekle-records .table tbody tr');
            // var value = $(this).val().toLowerCase();
            // trList.filter(function() {
            //     $(this).toggle($(this).find('td:eq(2) div label').text().trim().toLowerCase().indexOf(value) != -1);
            // });
        });

    $('body').off('click',
        '#btnReferansKaydet').on('click',
        '#btnReferansKaydet',
        function() {
            $('#btnKapat').prop('disabled', true);

            var checkedList = [];
            var trList = $('.form-check-input:checked');
            if (trList.length < 1) {
                notify("warning", "Lütfen kayıt seçiniz!");
            } else {
                $('#btnReferansKaydet').hide();
                cihazList = null;
                if ($('label[for=6BB89F95895A4396BB10269C5D66B01E]').closest('div').data() != null) {
                    var cihazList = $('label[for=6BB89F95895A4396BB10269C5D66B01E]').closest('div').data('publicids');
                }
                $.each(trList,
                    function(i, el) {
                        var tr = $(el).parents('tr')
                        var recordId = $(this).closest('tr').data('id');
                        var referansNo = $(String.format('#refNo_{0}', recordId)).text();
                        var referansIsım = $(String.format('#refIsmi_{0}', recordId)).text();
                        var referansId = recordId;
                        var Sonuc = $(String.format('#sonuc_{0}', recordId)).val();
                        var DLimiti = $(String.format('#dLimiti_{0}', recordId)).val();
                        var OBelirsizligiMiktari = $(String.format('#oBelirsizligiMiktar_{0}', recordId)).val();
                        var OBelirsizligiBirimi = $(String.format('#oBelirsizligiBirimi_{0}', recordId)).select2('data').text;
                        var RaporlamaLimiti = $(String.format('#raporlamaLimiti_{0}', recordId)).val();
                        var OB = $(String.format('#oB_{0}', recordId)).val();
                        var GK = $(String.format('#gK_{0}', recordId)).val();
                        var EAnalizCihazi = $(String.format('#eAnalizCihazi_{0}', recordId)).val();
                        var AnalizMetodu = $(String.format('#analizMetodu_{0}', recordId)).text();
                        var DMevzuat = $(String.format('#dMevzuati_{0}', recordId)).select2('data').text;
                        var abmrl = $(String.format('#abmrl_{0}', recordId)).val();
                        var trmrl = $(String.format('#trmrl_{0}', recordId)).val();
                        var model = {
                            CihazList: cihazList,
                            RecordPublicId: $('#RecordPublicId').val(),
                            ReferansNo: referansNo,
                            ReferansIsım: referansIsım,
                            ReferansId: referansId,
                            Sonuc: Sonuc,
                            DLimiti: DLimiti,
                            OBelirsizligiMiktari: OBelirsizligiMiktari,
                            OBelirsizligiBirimi: OBelirsizligiBirimi,
                            RaporlamaLimiti: RaporlamaLimiti,
                            OB: OB,
                            GK: GK,
                            EAnalizCihazi: EAnalizCihazi,
                            AnalizMetodu: AnalizMetodu,
                            DMevzuat: DMevzuat,
                            Abmrl: abmrl,
                            Trmrl: trmrl
                        };
                        checkedList.push(model);
                    });
                //notify("warning", "Laboratuvar sonucu kaydediliyor. Lütfen bekleyiniz..");
                $('#modalLabSonuc').modal('toggle');
                $('#modalLoading').remove();
                window.setModal.Create({
                    id: 'modalLoading',
                    html: {
                        header: 'Lab Sonuç Girişi',
                        body: '<div id="msg"></div><div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>',
                        footer: ''
                    }
                });
                $('#modalLoading .modal-dialog').css('width', '30%');
                //$('#modalLoading').modal('toggle');
                $('#modalLoading').modal({
                    backdrop: 'static',
                    keyboard: false
                });
                var realurl = 'https://betalabwebapi.setcrm.com/api/data/LaboratuvarSonucuOlustur';
                var localurl = 'https://localhost:44303/api/data/LaboratuvarSonucuOlustur';

                $.ajax({
                    contentType: 'application/json',
                    type: "POST",
                    url: realurl,
                    dataType: "json",
                    data: JSON.stringify(checkedList),
                    async: true,
                    success: function(r) {
                        if (r.Status) {
                            //notify("success", "Kayıt oluşturuldu.Sayfa yenileniyor lütfen bekleyiniz...");
                            $('#modalLoading .modal-body').html("Kayıt(lar) oluşturuldu. Sayfa yenileniyor...");
                            window.location.reload();
                        } else {
                            notify("danger", r.Message);
                            $('#modalLoading').modal('toggle');
                            $('#modalLabSonuc').modal('toggle');

                            $('#btnReferansKaydet').show();
                            $('#btnKApat').prop('disabled', false)
                        }
                    }
                });
            }
        });

    function notify(type, message) {
        $.notify({
            icon: type === "success" ? 'fas fa-check-double' : 'fas fa-times-circle',
            message: message
        }, {
            z_index: '9999999',
            type: type,
            placement: {
                from: "top",
                align: "right"
            },
            offset: 50,
            animate: {
                enter: 'animated flipInY',
                exit: 'animated flipOutX'
            },
        });
    }

    function getReferenceList(page) {
        var analizinAmaci = $('label[for=F447A92831C44D3283CA6D4859DD0C9C]').parent().data('publicids');

        var modalBody = $('#modalLabSonuc .modal-body'),
            bodyRecords = modalBody.find('.hizli-ekle-records');

        var tbody = bodyRecords.find('tbody'),
            thead = bodyRecords.find('thead');
        tbody.attr('style', 'background:white !important');
        var coId = "C74B84F68CE245C3962DC2771006C25C";
        var vfId = "3CB3E850F35240CD804ECB90CA1D0BF0";
        var url = 'https://betalabwebapi.setcrm.com/api/data/LabSonucuVfOkumaWithQ2?q=' + $('#searchReferans').val() + "&page=" + page;
        var localurl = 'https://localhost:44303/api/data/LabSonucuVfOkumaWithQ2?q=' + $('#searchReferans').val() + "&page=" + page;

        $.get(url, function(r) {
            if (r.Status) {
                tbody.html('');
                $.each(r.model.Records, function(i, v) {

                    var refNo = v.Values.first('FieldPublicId', '9CBE6AA5DDAE40E3B8C0CA991187AD44').Value;
                    var refIsmi = v.Values.first('FieldPublicId', 'CB16F832A9124BB3BCE27E787576D909').Value;
                    var sonuc = v.Values.first('FieldPublicId', '23A05CFF26CA41A8957660075B7EE31F').Value;
                    var dLimiti = v.Values.first('FieldPublicId', '0D3D2E688A9346B0911798BDDBC28028').Value;
                    var oBelirsizligiMiktari = v.Values.first('FieldPublicId', '544993C1FD3D4EFF8DA51D0F4AB0F40A').Value;
                    var oBelirsizligiBirimi = v.Values.first('FieldPublicId', 'D6D8931B94EF4E5B9F9D3013BD182CEA').Value;
                    var oBelirsizligiBirimiId = v.Values.first('FieldPublicId', 'D6D8931B94EF4E5B9F9D3013BD182CEA').SelectedItemPublicIds;
                    var raporlamaLimiti = v.Values.first('FieldPublicId', '6A457D2FC899416D8E5A35FB9CAF9853').Value;
                    var oB = v.Values.first('FieldPublicId', '170A49DA200941D380B5ED46A9AD503B').Value;
                    var gK = v.Values.first('FieldPublicId', '9E86775A397B40DC816F63E2931D9E65').Value;
                    var eAnalizCihazi = v.Values.first('FieldPublicId', '281558A615A84C94BC36D5A1B17074F8').Value;
                    var eAnalizCihaziId = v.Values.first('FieldPublicId', '281558A615A84C94BC36D5A1B17074F8').SelectedItemPublicIds;
                    var analizMetodu = v.Values.first('FieldPublicId', '1E4DD8C647F34B2297F0A853EB28BDA4').Value;
                    var dMevzuati = v.Values.first('FieldPublicId', '32430F2F9E5F4F6593144518CBE9F7E9').Value;
                    var dMevzuatiId = v.Values.first('FieldPublicId', '32430F2F9E5F4F6593144518CBE9F7E9').SelectedItemPublicIds;
                    // var abmrl = v.Values.first('FieldPublicId', '6C19B5CE602B464CB6D282DF875ABDBD').Value;
                    var abmrl = "";
                    var trmrl = v.Values.first('FieldPublicId', 'C4686922F83B42DDB21F19966DCEC38D').Value;

                    cihazAlaniListesi.forEach((element) => {
                        if (element.includes(eAnalizCihaziId)) {

                            tbody.append(String.format("<tr data-id='{0}'><td> <div><label   style=' text-align: center; width:100%; border-radius: 3px; border: 1px solid #a1f6ff; padding: 8px 12px;'><input class='form-check-input' type='checkbox' ></label></div></td><td style='display:none'>{1}</td><td><div><label class='refNo' id='refNo_{0}' type='text' style='width:100%; border-radius: 3px; border: 1px solid #a1f6ff; padding: 8px 12px;'>{1}</label></div></td><td><div><label class='refIsmi' id='refIsmi_{0}' type='text' style='width:100%; border-radius: 3px; border: 1px solid #a1f6ff; padding: 8px 12px;'>{2}</label></div></td><td><div><input class'sonuc' id='sonuc_{0}' type='text' value='{3}' style='width:100%; border-radius: 3px; border: 1px solid #a1f6ff; padding: 8px 12px;'></div></td><td><div><input class='dLimiti' id='dLimiti_{0}' type='text' value='{4}' style='width:100%; border-radius: 3px; border: 1px solid #a1f6ff; padding: 8px 12px;'></div></td><td><div><input class='abmrl' id='abmrl_{0}' type='text' value='{10}' style='width:100%; border-radius: 3px; border: 1px solid #a1f6ff; padding: 8px 12px;'></div></td><td><div><input class='trmrl' id='trmrl_{0}' type='text' value='{11}' style='width:100%; border-radius:3px; border:1px solid #a1f6ff; padding:8px 12px;'></div></td><td><div'><input class='oBelirsizligiMiktar' id='oBelirsizligiMiktar_{0}' type='text' value='{5}' style='width:100%; border-radius:3px; border:1px solid #a1f6ff; padding:8px 12px;'></div></td><td><div class='oBelirsizligiBirimi' id='oBelirsizligiBirimi_{0}'</div></td><td><div><input class='raporlamaLimiti' id='raporlamaLimiti_{0}' type='text' value='{6}' style='width:100%; border-radius: 3px; border: 1px solid #a1f6ff; padding: 8px 12px;'></div></td><td><div><input class='oB' id='oB_{0}' type='text' value='{7}' style='width:100%; border-radius: 3px; border: 1px solid #a1f6ff; padding: 8px 12px;'></div></td><td><div><input class='gK' id='gK_{0}' type='text' value='{8}' style='width:100%; border-radius: 3px; border: 1px solid #a1f6ff; padding: 8px 12px;'></div></td><td><div class='eAnalizCihazi' id='eAnalizCihazi_{0}' border-radius: 3px; border: 1px solid #a1f6ff;'></div></td><td><div><label class='analizMetodu' id='analizMetodu_{0}' type='text' value='{9}' style='width:100%; border-radius: 3px; border: 1px solid #a1f6ff; padding: 8px 12px;'>{9}</label></div></td><td><div class='dMevzuati' id='dMevzuati_{0}'></div></td></tr>", v.PublicId, parseInt(refNo), refIsmi, sonuc, dLimiti, oBelirsizligiMiktari, raporlamaLimiti, oB, gK, analizMetodu, abmrl, trmrl));
                            prepareSelect2('#oBelirsizligiBirimi_' + v.PublicId, '/summary/fielditems', {
                                id: 'D6D8931B94EF4E5B9F9D3013BD182CEA'
                            }, null, null);

                            if (!String.isNullOrWhiteSpace(oBelirsizligiBirimi) && !String.isNullOrWhiteSpace(oBelirsizligiBirimiId)) {
                                // prepareSelect2SelectedOneItem('#requestform_' + v.PublicId, requestformId, requestform, false);
                                $('#oBelirsizligiBirimi_' + v.PublicId).select2('data', {
                                    id: oBelirsizligiBirimiId,
                                    text: oBelirsizligiBirimi
                                })
                            }

                            prepareSelect2('#eAnalizCihazi_' + v.PublicId, '/Summary/LookupFieldValues', {
                                coId: 'C74B84F68CE245C3962DC2771006C25C',
                                id: '281558A615A84C94BC36D5A1B17074F8',
                                viewFilterId: 'C75549EBF835472ABCD20666317BA9E6'
                            }, null, false);

                            if (!String.isNullOrWhiteSpace(eAnalizCihazi) && !String.isNullOrWhiteSpace(eAnalizCihaziId)) {
                                // prepareSelect2SelectedOneItem('#urun_' + v.PublicId, urunId, urunText, false);
                                $('#eAnalizCihazi_' + v.PublicId).select2('data', {
                                    id: eAnalizCihaziId,
                                    text: eAnalizCihazi
                                })
                            }
                            $('.eAnalizCihazi').select2("enable", false);
                            prepareSelect2('#dMevzuati_' + v.PublicId, '/summary/fielditems', {
                                id: '32430F2F9E5F4F6593144518CBE9F7E9'
                            }, null, null);
                            $('.dMevzuati').select2("enable", false);

                            if (!String.isNullOrWhiteSpace(dMevzuati) && !String.isNullOrWhiteSpace(dMevzuatiId)) {
                                // prepareSelect2SelectedOneItem('#urun_' + v.PublicId, urunId, urunText, false);
                                $('#dMevzuati_' + v.PublicId).select2('data', {
                                    id: dMevzuatiId,
                                    text: dMevzuati
                                })
                            }
                        }

                    });

                    if (analizinAmaci == "3CD3588EA23549B3AE36008147060F4D") {
                        $(".dLimiti").prop('disabled', true);
                    }

                    //}
                });


            } else {
                $('#analizAktarModal').find('#msg').text(r.Message);
            }

        });
    }


});