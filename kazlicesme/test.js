$(function() {
    var vfId = $('#ViewFilterPublicId').val();
    var modelList = [];

    $.each($('.btn-inline-lookup-relations'), function(i, v) {
        var recordId = $(this).closest('tr').data('id');
        $(this).addClass(recordId);
    });

    $('body').on('click', '.btn-inline-lookup-relations', function() {
        var rowRecordId = $(this)[0].classList[4];
        var tr = $('#detailRow-' + rowRecordId);

        setTimeout(() => {
            $('#btnTopluGuncelle_' + rowRecordId).remove();
            $('#btnTopluKaydet_' + rowRecordId).remove();
            tr.find('.panelBody').prepend('<a id="btnTopluGuncelle_' + rowRecordId + '"  class="btn btn-sm btn-warning pull-right btnTopluGuncelle3" data-publicId="' + rowRecordId + '"  style="margin-right:10px;" >Toplu Sonuç</a>');
            tr.find('.panelBody').prepend('<a id="btnTopluKaydet_' + rowRecordId + '"  class="btn btn-sm btn-success pull-right btnTopluKaydet3"  data-publicId="' + rowRecordId + '"  style="margin-right:10px;" >Kaydet</a>');
        }, 3000);
    });

    if (vfId == "47CA555FFB4A41C49BFA286B524C36C8" || vfId == "A9BD9727061249349A6330AA7DF80201") {
        $('body').on('lookupRelationLoadTriggerEvent', function(_e, relationId) {
                oldValuesArray = [];
                if (relationId == 'F495503EF978460291D98EFB195B0E2A') {
                    var panel = $('[data-id=F495503EF978460291D98EFB195B0E2A]');
                    $('#modalTopluGuncelle').remove();
                    window.setModal.Create({
                        id: 'modalTopluGuncelle',
                        html: {
                            header: 'Toplu Güncelleme',
                            body: '<div id="msg" style="margin:0 0 5px; width: 100%;">' +
                                '<div id="loading" style="margin:0 0 5px; width: 100%;display:none;"><br/>İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>',
                            footer: ''
                        },
                        settings: {
                            widthClass: 'modal-lg'
                        },
                    });
                    $("#modalTopluGuncelle .modal-body").find('#loading').show();

                    // $('body').on('change', '.changeable', function() {
                    // debugger;
                    // var activeDiv = $(this).closest('div');
                    // activeDiv.find('label').removeClass('btn-success active');
                    // $(this).addClass('btn-success active');
                    // })
                    $('.btnTopluGuncelle3').on('click', function() {
                            //$('#modalTopluGuncelle').modal('toggle');
                            $(this).hide();
                            var recordId = $(this).data('publicId');
                            $(this).closest('div').find('#btnTopluKaydet_' + recordId).show();
                            //$('#btnTopluKaydet3').show();
                            panel.find('table tbody tr').each(function(i, v) {
                                var id = $(v).data('id');

                                tespidEdilemediColumn = $(v).find('[data-id=B5244827DCFC4651BE5B7A7E21C26B3D]');
                                tespidEdilemediColumnValue = tespidEdilemediColumn[0].dataset.value.toLowerCase();
                                tespidEdilemediColumn.html(String.format('<input id=chk_{0} type="checkbox" class="tespidEdilemedi">', id));
                                var istespidEdilemedi = (tespidEdilemediColumnValue === 'true');
                                $('#chk_' + id).prop('checked', istespidEdilemedi);

                                birimColumn = $(v).find('[data-id=7F002609C06940DC845975251C01CF33]'),
                                    birimColumnId = birimColumn.data('value'),
                                    birimColumnText = birimColumn.data('text');

                                birimColumn.html(String.format('<div class="birim" id="birim_{0}"></div>', id));
                                prepareSelect2(String.format("#birim_{0}", id), '/summary/LookupFieldValues', {
                                    coId: "45666A08E34044E59F17AEE1E0EDC5EB",
                                    id: "7F002609C06940DC845975251C01CF33",
                                    viewFilterId: "9B360CA2D9ED4010986467956838BB62",
                                }, null, null);
                                if (!String.isNullOrWhiteSpace(birimColumnId) && !String.isNullOrWhiteSpace(birimColumnText)) {
                                    $(String.format("#birim_{0}", id)).select2('data', {
                                        id: birimColumnId,
                                        text: birimColumnText
                                    });
                                }
                                sonucColumn = $(v).find('[data-id=8E213D49A42146E0A048FDAC87C4F237]');
                                sonucColumnText = sonucColumn.data('text');
                                sonucColumn.html(String.format('<input id={0} type="text" class="form-control sonuc" value="{1}">', id, sonucColumnText));
                                olcumLimitiColumn = $(v).find('[data-id=A820EDBBB5714FF6A06DB8032999FE1D]');
                                olcumLimitiText = olcumLimitiColumn.data('text');
                                olcumLimitiColumn.html(String.format('<input id={0} type="text" class="form-control olcumLimiti" value="{1}">', id, olcumLimitiText));
                                geriKazanimColumn = $(v).find('[data-id=E42D512A28D04E9E99A7F1F22C34CB75]');
                                geriKazanimColumnText = geriKazanimColumn.data('text');
                                geriKazanimColumn.html(String.format('<input id={0} type="text" class="form-control geriKazanim" value="{1}">', id, geriKazanimColumnText));
                                obColumn = $(v).find('[data-id=823F6C84D08A4424A26264D4735BC71E]');
                                obColumnText = obColumn.data('text');
                                obColumn.html(String.format('<input id={0} type="text" class="form-control ob" value="{1}">', id, obColumnText));

                                ldKaynagiColumn = $(v).find('[data-id=3AADF92982F944ACBF853C31597FCA87]');
                                ldKaynagiColumnText = ldKaynagiColumn.data('text');
                                ldKaynagiColumn.html(String.format('<input id={0} type="text" class="form-control ld-kaynagi" value="{1}">', id, ldKaynagiColumnText));
                                ldNumberColumn = $(v).find('[data-id=5CE18BBEF1674FEFB95BDF3C540F2884]');
                                ldNumberColumnText = ldNumberColumn.data('text');
                                ldNumberColumn.html(String.format('<input id={0} type="text" class="form-control ld-number" value="{1}">', id, ldNumberColumnText));
                                ldMetinColumn = $(v).find('[data-id=E129980DB6DA44108506392FD7BE2BDB]');
                                ldMetinColumnText = ldMetinColumn.data('text');
                                ldMetinColumn.html(String.format('<input id={0} type="text" class="form-control ld-metin" value="{1}">', id, ldMetinColumnText));
                                degerlendirmeMetniColumn = $(v).find('[data-id=031438A0F3D04FC88FF829D5B2AB590C]'),
                                    degerlendirmeMetniColumnId = degerlendirmeMetniColumn.data('value'),
                                    degerlendirmeMetniColumnText = degerlendirmeMetniColumn.data('text');

                                degerlendirmeMetniColumn.html(String.format('<div class="degerlendirmeMetni" id="degerlendirmeMetni_{0}"></div>', id));
                                prepareSelect2(String.format("#degerlendirmeMetni_{0}", id), '/summary/LookupFieldValues', {
                                    coId: "45666A08E34044E59F17AEE1E0EDC5EB",
                                    id: "031438A0F3D04FC88FF829D5B2AB590C",
                                    viewFilterId: "BEED3E889E86425D8B90BAD853E156EF",
                                }, null, null);
                                if (!String.isNullOrWhiteSpace(degerlendirmeMetniColumnId) && !String.isNullOrWhiteSpace(birimColumnText)) {
                                    $(String.format("#degerlendirmeMetni_{0}", id)).select2('data', {
                                        id: degerlendirmeMetniColumnId,
                                        text: degerlendirmeMetniColumnText
                                    });
                                }
                                var degerlendirmeColumn = $(v).find('[data-id=C2BDD636726C419DBC20CC2318FFB3B9]'),
                                    degerlendirmeVal = degerlendirmeColumn.data('value');
                                degerlendirmeColumn.html('<div><label for="C2BDD636726C419DBC20CC2318FFB3B9">&nbsp;</label><input id="' + id + '" type="hidden" class="hidden degerlendirme" value="' + degerlendirmeVal + '" ><div class="btn-group btn-group-sm well well-xxs" data-toggle="buttons">' +
                                    '<label id="C01AC60526614737AC0AF7589B79006A" class="btn btn-default changeable"><input type="radio" name="RADIO-C2BDD636726C419DBC20CC2318FFB3B9" autocomplete="off" value="C01AC60526614737AC0AF7589B79006A"> D </label>' +
                                    '<label id="6C3CF215C703456A9DFC3DC33CF7E5DE" class="btn btn-default changeable"><input type="radio" name="RADIO-C2BDD636726C419DBC20CC2318FFB3B9" autocomplete="off" value="6C3CF215C703456A9DFC3DC33CF7E5DE"> U </label>' +
                                    '<label id="8A471AE7CBBA4C45937CF4AA3B3AFD7A" class="btn btn-default changeable"><input type="radio" name="RADIO-C2BDD636726C419DBC20CC2318FFB3B9" autocomplete="off" value="8A471AE7CBBA4C45937CF4AA3B3AFD7A"> UD </label>' +
                                    '<label id="01672CC0058741CCBEC0C75A90F64130" class="btn btn-default changeable"><input type="radio" name="RADIO-C2BDD636726C419DBC20CC2318FFB3B9" autocomplete="off" value="01672CC0058741CCBEC0C75A90F64130"> DY </label></div></div>');
                                if (!String.isNullOrWhiteSpace(degerlendirmeVal)) {
                                    $(v).find('#' + degerlendirmeVal).addClass('btn-success active');
                                }

                                oldValuesArray.push({
                                    RecordId: id,
                                    // AnalizAdi: analizAdiColumnId,
                                    // Birim: birimColumnId,
                                    Sonuc: sonucColumnText,
                                    Ol: olcumLimitiText,
                                    GK: geriKazanimColumnText,
                                    OB: obColumnText,
                                    // AnalizYontemi: analizYontemiColumnId,
                                    LDKaynagi: ldKaynagiColumnText,
                                    LDNumber: ldNumberColumnText,
                                    LDMetin: ldMetinColumnText,
                                    Degerlendirme: degerlendirmeVal,
                                    TespidEdilemedi: istespidEdilemedi,
                                    DegerlendirmeMetni: degerlendirmeMetniColumnId

                                });
                            }); //Table each end
                        }) //Toplugüncelle3 click end
                    $('body').on('click', '.btnTopluKaydet3', function() {
                        $(this).hide();
                        var recordId = $(this).data('publicId');
                        $(this).closest('div').find('#btnTopluGuncelle_' + recordId).show();
                        $('#modalTopluGuncelle').modal('toggle');
                        var array = [];
                        var data = {};
                        panel.find('table tbody tr').each(function(i, v) {
                            var id = $(v).data('id');
                            // disLab = $(v).find('.disLab').is(":checked");
                            // ozelIstek = $(v).find('.ozelIstek').is(":checked");
                            tespidEdilemedi = $(v).find('.tespidEdilemedi').is(":checked");
                            analiz = $(v).find(String.format("#analiz-adi_{0}", id)).select2('data'),
                                analizAdi = analiz !== null ? analiz.id : "";
                            birimSelect = $(v).find(String.format("#birim_{0}", id)).select2('data');
                            birim = birimSelect !== null ? birimSelect.id : "";
                            degerlendirmeMetniSelect = $(v).find(String.format("#degerlendirmeMetni_{0}", id)).select2('data');
                            degerlendirmeMetni = degerlendirmeMetniSelect !== null ? degerlendirmeMetniSelect.id : "";
                            sonuc = $(v).find('.sonuc').val();
                            ol = $(v).find('.olcumLimiti').val();
                            gk = $(v).find('.geriKazanim').val();
                            ob = $(v).find('.ob').val();
                            analizYontem = $(v).find(String.format("#analizyontemi_{0}", id)).select2('data');
                            analizyontemi = analizYontem !== null ? analizYontem.id : "";
                            ldKaynagi = $(v).find('.ld-kaynagi').val();
                            ldNumber = $(v).find('.ld-number').val();
                            ldMetin = $(v).find('.ld-metin').val();
                            var degerlendirme = $(v).find('.active').closest('label').attr('id');
                            // analizDurum = $(v).find(String.format("#analiz_{0}", id)).select2('data');
                            // analizDurumu = analizDurum !== null ? analizDurum.id : "";
                            labSelect = $(v).find(String.format("#lab_{0}", id)).select2('data');
                            lab = labSelect !== null ? labSelect.id : "";
                            if (degerlendirme === undefined) {
                                degerlendirme = "";
                            }
                            var index = oldValuesArray.findIndex(recordId => recordId.RecordId == id);
                            // if (oldValuesArray[index].AnalizAdi != analizAdi || oldValuesArray[index].Birim != birim ||
                            // oldValuesArray[index].AnalizYontemi != analizyontemi || oldValuesArray[index].Lab != lab ||
                            if (oldValuesArray[index].Sonuc != sonuc ||
                                oldValuesArray[index].Ol != ol ||
                                oldValuesArray[index].GK != gk ||
                                oldValuesArray[index].OB != ob ||
                                oldValuesArray[index].LDKaynagi != ldKaynagi ||
                                oldValuesArray[index].LDNumber != ldNumber ||
                                oldValuesArray[index].LDMetin != ldMetin ||
                                oldValuesArray[index].Degerlendirme != degerlendirme ||
                                oldValuesArray[index].Birim != birim ||
                                oldValuesArray[index].DegerlendirmeMetni != degerlendirmeMetni ||
                                // oldValuesArray[index].disLab != disLab ||
                                // oldValuesArray[index].ozelIstek != ozelIstek ||
                                oldValuesArray[index].tespidEdilemedi != tespidEdilemedi
                                //oldValuesArray[index].analizDurumu != analizDurumu
                            ) {
                                array.push({
                                    RecordId: id,
                                    // AnalizAdi: analizAdi,
                                    Birim: birim,
                                    DegerlendirmeMetni: degerlendirmeMetni,
                                    Sonuc: sonuc,
                                    Ol: ol,
                                    GK: gk,
                                    OB: ob,
                                    // AnalizYontemi: analizyontemi,
                                    LDKaynagi: ldKaynagi,
                                    LDNumber: ldNumber,
                                    LDMetin: ldMetin,
                                    Degerlendirme: degerlendirme,
                                    TespidEdilemedi: tespidEdilemedi,

                                });
                            }
                        });
                        data.MixModelList = array;
                        if (data.MixModelList.length < 1) {
                            $('#loading').hide();
                            setUtil.alert({
                                container: '#modalTopluGuncelle .modal-body #msg',
                                message: "Herhangi bir kayıt seçilmedi. Sayfa yenileniyor lütfen bekleyiniz...",
                                alertClass: 'alert-success',
                                autoClose: false
                            });
                            setTimeout(() => {
                                window.location.reload();
                            }, 500);
                        }
                        //var url = 'http://localhost:44358/api/data/GidaMixTopluUpdate';
                        var url = 'https://kazlicesmewebapi.setcrm.com/api/data/GidaMixTopluUpdate';
                        $.post(url,
                            data,
                            function(result) {
                                if (result.Status) {
                                    $('#loading').hide();
                                    setUtil.alert({
                                        container: '#modalTopluGuncelle .modal-body #msg',
                                        message: "İşleminiz başarıyla gerçekleşti sayfa yenileniyor lütfen bekleyiniz",
                                        alertClass: 'alert-success',
                                        autoClose: false
                                    });
                                    setTimeout(() => {
                                        window.location.reload();
                                    }, 500);
                                } else {
                                    $('#loading').hide();
                                    setUtil.alert({
                                        container: '#modalTopluGuncelle .modal-body #msg',
                                        message: result.Message,
                                        alertClass: 'alert-success',
                                        autoClose: false
                                    });
                                }
                            });
                    }); // Toplukaydet click end
                } //RelationId If end
            }) //lookupRelationLoadTriggerEvent end
    } //VFId If End

    $('')




});