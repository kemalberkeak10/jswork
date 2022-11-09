$(function() {
    if ($('#LayoutPublicId').val() == 'E37E5B5D8442407DB2FA34D9E7396BC6') {
        $('body').on('lookupRelationLoadTriggerEvent', function(e, relationId) {
            oldValuesArray = [];
            if (relationId == '8E5BCC39452D4CB2A3EF3814938C050D') {
                var $relation = $(String.format('div[data-id={0}]', relationId));
                $relation.find('#btnTopluGuncelle, .btn-analiz-ekle').remove();
                $relation.find('#btnTopluKaydet, .btn-analiz-ekle').remove();
                $(('div[data-id=8E5BCC39452D4CB2A3EF3814938C050D]')).prepend('<a id="btnTopluGuncelle" class="btn btn-sm btn-warning pull-right"  style="margin-right:10px;" >Toplu Sonuç Giriş</a>');
                $(('div[data-id=8E5BCC39452D4CB2A3EF3814938C050D]')).prepend('<a id="btnTopluKaydet" class="btn btn-sm btn-success pull-right"  style="margin-right:10px;" >Kaydet</a>');
                $('#btnTopluKaydet').hide();

                var panel1 = $('[data-id=8E5BCC39452D4CB2A3EF3814938C050D]');
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
                //$("#modalTopluGuncelle .modal-body").find('#loading').show();
                $('body').on('change', '.changeable', function() {
                    var activeDiv = $(this).closest('div');
                    activeDiv.find('label').removeClass('btn-success active');
                    $(this).addClass('btn-success active');
                })
                $('#btnTopluGuncelle').on('click', function() {
                    //$('#modalTopluGuncelle').modal('toggle');
                    $('#btnTopluGuncelle').hide();
                    $('#btnTopluKaydet').show();
                    panel1.find('table tbody tr').each(function(i, v) {
                        var id = $(v).data('id');
                        disLabColumn = $(v).find('[data-id=BC3ECDD8A4F543E3A17C6204544FED66]');
                        disLabColumnValue = disLabColumn[0].dataset.value.toLowerCase();
                        disLabColumn.html(String.format('<input id=chk_{0} type="checkbox" class="dislab">', id));
                        var isDisLab = (disLabColumnValue === 'true');
                        $('#chk_' + id).prop('checked', isDisLab);
                        ozelIstekColumn = $(v).find('[data-id=938E42E184CC45529AB5758B92C6AB13]');
                        ozelIstekColumnValue = ozelIstekColumn[0].dataset.value.toLowerCase();
                        ozelIstekColumn.html(String.format('<input id=ozelIstekchk_{0} type="checkbox" class="ozelistek">', id));
                        var isOzelIstek = (ozelIstekColumnValue === 'true');
                        $('#ozelIstekchk_' + id).prop('checked', isOzelIstek);


                        analizAdiColumn = $(v).find('[data-id=321A3D2A22524B8D9CACF5F2588AF9C2]'),
                            analizAdiColumnId = analizAdiColumn.data('value'),
                            analizAdiColumnText = analizAdiColumn.data('text');

                        analizAdiColumn.html(String.format('<div class="analiz-adi" id="analiz-adi_{0}"></div>', id));
                        prepareSelect2(String.format("#analiz-adi_{0}", id), '/summary/LookupFieldValues', {
                            coId: "45666A08E34044E59F17AEE1E0EDC5EB",
                            id: "321A3D2A22524B8D9CACF5F2588AF9C2",
                            viewFilterId: "7A866F0934634917ACB7025012BBBEA6",
                        }, null, null);
                        if (!String.isNullOrWhiteSpace(analizAdiColumnId) && !String.isNullOrWhiteSpace(analizAdiColumnText)) {
                            $(String.format("#analiz-adi_{0}", id)).select2('data', {
                                id: analizAdiColumnId,
                                text: analizAdiColumnText
                            });
                        }
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
                        analizYontemiColumn = $(v).find('[data-id=B081CFEBCF664BFBA6253ACFEBE68C92]'),
                            analizYontemiColumnId = analizYontemiColumn.data('value'),
                            analizYontemiColumnText = analizYontemiColumn.data('text');

                        analizYontemiColumn.html(String.format('<div class="analizyontemi" id="analizyontemi_{0}"></div>', id));
                        prepareSelect2(String.format("#analizyontemi_{0}", id), '/summary/LookupFieldValues', {
                            coId: "45666A08E34044E59F17AEE1E0EDC5EB",
                            id: "B081CFEBCF664BFBA6253ACFEBE68C92",
                            viewFilterId: "6A2124D5A3BD44BD87A28CB267FF6134",
                        }, null, null);
                        if (!String.isNullOrWhiteSpace(analizYontemiColumnId) && !String.isNullOrWhiteSpace(analizYontemiColumnText)) {
                            $(String.format("#analizyontemi_{0}", id)).select2('data', {
                                id: analizYontemiColumnId,
                                text: analizYontemiColumnText
                            });
                        }
                        ldKaynagiColumn = $(v).find('[data-id=3AADF92982F944ACBF853C31597FCA87]');
                        ldKaynagiColumnText = ldKaynagiColumn.data('text');
                        ldKaynagiColumn.html(String.format('<input id={0} type="text" class="form-control ld-kaynagi" value="{1}">', id, ldKaynagiColumnText));
                        ldNumberColumn = $(v).find('[data-id=5CE18BBEF1674FEFB95BDF3C540F2884]');
                        ldNumberColumnText = ldNumberColumn.data('text');
                        ldNumberColumn.html(String.format('<input id={0} type="text" class="form-control ld-number" value="{1}">', id, ldNumberColumnText));
                        ldMetinColumn = $(v).find('[data-id=E129980DB6DA44108506392FD7BE2BDB]');
                        ldMetinColumnText = ldMetinColumn.data('text');
                        ldMetinColumn.html(String.format('<input id={0} type="text" class="form-control ld-metin" value="{1}">', id, ldMetinColumnText));
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
                        labColumn = $(v).find('[data-id=BC889EDDDD04456399169755D022B46B]'),
                            labColumnId = labColumn.data('value'),
                            labColumnText = labColumn.data('text');

                        labColumn.html(String.format('<div class="lab" id="lab_{0}"></div>', id));
                        prepareSelect2(String.format("#lab_{0}", id), '/summary/LookupFieldValues', {
                            coId: "45666A08E34044E59F17AEE1E0EDC5EB",
                            id: "BC889EDDDD04456399169755D022B46B",
                            viewFilterId: "C8844359DA944DBA9B054D60CDFF82F2",
                        }, null, null);
                        if (!String.isNullOrWhiteSpace(labColumnId) && !String.isNullOrWhiteSpace(labColumnText)) {
                            $(String.format("#lab_{0}", id)).select2('data', {
                                id: labColumnId,
                                text: labColumnText
                            });
                        }
                        oldValuesArray.push({
                            RecordId: id,
                            AnalizAdi: analizAdiColumnId,
                            Birim: birimColumnId,
                            Sonuc: sonucColumnText,
                            Ol: olcumLimitiText,
                            GK: geriKazanimColumnText,
                            OB: obColumnText,
                            AnalizYontemi: analizYontemiColumnId,
                            LDKaynagi: ldKaynagiColumnText,
                            LDNumber: ldNumberColumnText,
                            LDMetin: ldMetinColumnText,
                            Degerlendirme: degerlendirmeVal,
                            DisLab: isDisLab,
                            OzelIstek: isOzelIstek,
                            Lab: labColumnId
                        });
                    });
                    //  $('#modalTopluGuncelle').modal('toggle');

                });

                $('body').on('click', '#btnTopluKaydet', function() {
                    $('#modalTopluGuncelle').modal('toggle');
                    var array = [];
                    var data = {};
                    panel1.find('table tbody tr').each(function(i, v) {
                        var id = $(v).data('id');
                        dislab = $(v).find('.dislab').is(":checked");
                        ozelistek = $(v).find('.ozelistek').is(":checked");

                        analiz = $(v).find(String.format("#analiz-adi_{0}", id)).select2('data'),
                            analizAdi = analiz !== null ? analiz.id : "";
                        birimSelect = $(v).find(String.format("#birim_{0}", id)).select2('data');
                        birim = birimSelect !== null ? birimSelect.id : "";
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
                        labSelect = $(v).find(String.format("#lab_{0}", id)).select2('data');
                        lab = labSelect !== null ? labSelect.id : "";

                        if (degerlendirme == undefined) {
                            degerlendirme = "";
                        }

                        var index = oldValuesArray.findIndex(recordId => recordId.RecordId == id);
                        if (oldValuesArray[index].AnalizAdi != analizAdi || oldValuesArray[index].Birim != birim ||
                            oldValuesArray[index].Sonuc != sonuc || oldValuesArray[index].Ol != ol ||
                            oldValuesArray[index].GK != gk || oldValuesArray[index].OB != ob ||
                            oldValuesArray[index].AnalizYontemi != analizyontemi || oldValuesArray[index].LDKaynagi != ldKaynagi ||
                            oldValuesArray[index].LDNumber != ldNumber || oldValuesArray[index].LDMetin != ldMetin ||
                            oldValuesArray[index].Lab != lab || oldValuesArray[index].Degerlendirme != degerlendirme ||
                            oldValuesArray[index].DisLab != dislab || oldValuesArray[index].OzelIstek != ozelistek
                        ) {

                            array.push({
                                RecordId: id,
                                AnalizAdi: analizAdi,
                                Birim: birim,
                                Sonuc: sonuc,
                                Ol: ol,
                                GK: gk,
                                OB: ob,
                                AnalizYontemi: analizyontemi,
                                LDKaynagi: ldKaynagi,
                                LDNumber: ldNumber,
                                LDMetin: ldMetin,
                                Degerlendirme: degerlendirme,
                                DisLab: dislab,
                                OzelIstek: ozelistek,
                                Lab: lab
                            });

                        }
                    });
                    data.NumuneModelList = array;
                    if (data.NumuneModelList.length < 1) {
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
                    var url2 = 'http://localhost:44358/api/data/NumuneTopluUpdate ';
                    var url = 'https://kazlicesmewebapi.setcrm.com/api/data/NumuneTopluUpdate';
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

                });
            }
        });
    }
});