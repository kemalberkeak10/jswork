$(function() {
    var urunGrubuDieago = $("label[for=6D9879D0584744F7B7C883E3914065BE]").closest('div').data('publicids') === "0387CC0842FC427EA88B11E1C5041475" ? true : false;
    $('.well .pull-right').prepend('<a id="popupDoc" class="btn btn-sm btn-primary"style="margin-right:10px;" >Rapor Oluştur</a>');
    $('body').on('click', '#popupDoc', function() {
        var numune = $('label[for=D587C1DC156B41728385887D79E21F46]').parent().data('value');
        var laborant = $('label[for=29361EBA2E0649F5B5D9B9A9C628F7CA]').parent().data('value');
        var itemCount = 0;
        $.get('/lookuprelation/records?id=440AAE76942C44A992A302CE918B65DA&recordId=' + $('#RecordPublicId').val() + '&pageSize=100&pageNumber=1&q=&filter=&_=1549873001138', function(result) {
            itemCount = result.PagedItems.ItemCount;
        });
        if (itemCount > 0) {
            alert('Sonucu Girilmemiş Analizler Bulunmaktadır.');
        } else if (numune === "") {
            alert("Numune geliş tarihini giriniz.");
        } else if (laborant === "") {
            alert("Kaydı üzerinize Almadan Oluşturamazsınız.");
        } else {
            $('#modalSablon').remove();
            window.setModal.Create({
                id: 'modalSablon',
                html: {
                    content: 'style="width:900px !important"',
                    header: 'Rapor Oluştur',
                    body: '<div id="msg" style="margin:0 23px 5px; font-size:15px;"></div>' +
                        '<table class="table" style="width: 100%">' +
                        '<thead>' +
                        '<tr><th>Rapor Tarihi</th><th>Inkjet</th><th>Rapor Numarası</th><th>Analiz Talep Tarihi</th></tr>' +
                        '</thead>' +
                        '<tbody>' +
                        '<tr>' +
                        '<td colspan="1" rowspan="1"><input id="raporTarihi" type="text" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;"></td>' +
                        '<td colspan="1" rowspan="1"><input id="kapakKodu" placeholder="Inkjet..." type="text" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;"></td>' +
                        '<td colspan="1" rowspan="1"><input id="raporNo" placeholder="Rapor Numarası.." type="text" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;"></td>' +
                        '<td colspan="1" rowspan="1"><input id="talepTarihi" type="text" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;"></td>' +
                        '</tr>' +
                        '</tbody>' +
                        '</table>' +
                        '<table class="table" style="width: 100%">' +
                        '<thead>' +
                        // '<tr><th>Analiz Başlangıç Tarihi</th><th>Analiz Tipi</th><th>Analiz Sonuç Notu<i class="fa fa-asterisk text-danger" title="" data-original-title="Zorunlu Alan" aria-describedby="tooltip916361"></i></th><th>Raporu Yazan Kişi</th>' +
                        // '</tr>' +
                        '<tr><th>Analiz Başlangıç Tarihi</th><th>Analiz Tipi</th></th><th>Raporu Yazan Kişi</th>' +
                        '</tr>' +
                        '</thead>' +
                        '<tbody>' +
                        '<tr>' +
                        '<td colspan="1" rowspan="1"><input id="analizBasTarih" type="text" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;"></td>' +
                        '<td colspan="1" rowspan="1"><input id="analizTip" type="select"  style="resize:none;width:100%;"></td>' +
                        // '<td colspan="1" rowspan="1"><input id="analizSonucNotu" type="textarea" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;"></td>' +
                        '<td colspan="1" rowspan="1"><input id="raporYazanKisi" type="select"  style="resize:none;width:100%;"></td>' +
                        '</tr>' +
                        '</tbody>' +
                        '</table>' +

                        '<table class="table tableXF" style="width: 100%">' +
                        '<thead>' +
                        '<tr>' + '<th>Tüketici/Müşteri haklı mıdır?<i class="fa fa-asterisk text-danger" title="" data-original-title="Zorunlu Alan" aria-describedby="tooltip916361"></i></th>' +
                        '<th>Fabrika hedeflerini etkileyecek mi? <i class="fa fa-asterisk urun-grubu-diaego-hide text-danger" title="" data-original-title="Zorunlu Alan" aria-describedby="tooltip916361"></i></th>' +
                        '</tr>' +
                        '</thead>' +
                        '<tbody>' +
                        '<tr>' +
                        '<td colspan="1" rowspan="1"><input id="musteriHakliMi" type="select"  style="resize:none;width:100%;"></td>' +
                        '<td colspan="1" rowspan="1"><input id="fabrikaHedefleriEtkilerMi" type="select"  style="resize:none;width:100%;"></td>' +
                        '</tr>' +
                        '</tbody>' +
                        '</table>' +

                        '<table class="table table1" style="width: 100%">' +
                        '<thead>' +
                        '<tr>' +
                        '<th>Fabrika kaynaklı mıdır?<i class="fa fa-asterisk text-danger urun-grubu-diaego-hide" title="" data-original-title="Zorunlu Alan" aria-describedby="tooltip916361"></i></th>' +
                        '<th>Yasal speklere uygun mudur?<i class="fa fa-asterisk text-danger urun-grubu-diaego-hide" title="" data-original-title="Zorunlu Alan" aria-describedby="tooltip916361"></i></th>' +
                        '<th>Mey ürün speklerine uygun mudur?<i class="fa fa-asterisk  urun-grubu-diaego-hide text-danger" title="" data-original-title="Zorunlu Alan" aria-describedby="tooltip916361"></i></th>' +
                        '<th>Şartlı Kabul(Ürün)<i class="fa fa-asterisk text-danger urun-grubu-diaego-hide"  title="" data-original-title="Zorunlu Alan" aria-describedby="tooltip916361"></i></th>' +
                        '</tr>' +
                        '</thead>' +
                        '<tbody>' +
                        '<tr>' +
                        '<td colspan="1" rowspan="1"><input id="fabrikaKaynaklıMıdır" type="select"  style="resize:none;width:100%;"></td>' +
                        '<td colspan="1" rowspan="1"><input id="yasalUygunMu" type="select"  style="resize:none;width:100%;"></td>' +
                        '<td colspan="1" rowspan="1"><input id="meyUrunUygun" type="select"  style="resize:none;width:100%;"></td>' +
                        '<td colspan="1" rowspan="1"><input id="sartliKabulUrun" class="form-check-input" type="checkbox" value=""></td>' +
                        '</tr>' +
                        '</tbody>' +
                        '</table>' +

                        '<table class="table table2" style="width: 100%">' +
                        '<thead>' +
                        '<tr>' +
                        '<th>Mey ambalaj speklerine uygun mudur?<i class="fa fa-asterisk text-danger urun-grubu-diaego-hide" title="" data-original-title="Zorunlu Alan" aria-describedby="tooltip916361"></i></th>' +
                        '<th>Şartlı Kabul (Ambalaj) <i class="fa fa-asterisk text-danger urun-grubu-diaego-hide" title="" data-original-title="Zorunlu Alan" aria-describedby="tooltip916361"></i></th>' +
                        '<th>Saklama koşulu kaynaklı haklı şikayet midir?<i class="fa fa-asterisk text-danger urun-grubu-diaego-hide" title="" data-original-title="Zorunlu Alan" aria-describedby="tooltip916361"></i></th>' +
                        '<th>Şahit Numune <i class="fa fa-asterisk text-danger urun-grubu-diaego-hide" title="" data-original-title="Zorunlu Alan" aria-describedby="tooltip916361"></i></th>' +
                        '</tr>' +
                        '</thead>' +
                        '<tbody>' +
                        '<tr>' +
                        '<td colspan="1" rowspan="1"><input id="meyAmbalaj" type="select"  style="resize:none;width:100%;"></td>' +
                        '<td colspan="1" rowspan="1"><input id="sartliKabulAmbalaj"  class="form-check-input" type="checkbox" value=""></td>' +
                        '<td colspan="1" rowspan="1"><input id="saklamaKosul" type="select"  style="resize:none;width:100%;"></td>' +
                        '<td colspan="1" rowspan="1"><input id="sahitNumune" type="select"  style="resize:none;width:100%;"></td>' +
                        '</tr>' +
                        '</tbody>' +
                        '</table>' +
                        '<table class="table table3" style="width: 100%">' +
                        '<thead>' +
                        '<tr>' +
                        '<th>Şikayetli Ürün<i class="fa fa-asterisk text-danger urun-grubu-diaego-hide" title="" data-original-title="Zorunlu Alan" aria-describedby="tooltip916361"></i></th>' +
                        '<th>QDMS Düzeltici Faaliyet No<i class="fa fa-asterisk text-danger urun-grubu-diaego-hide" title="" data-original-title="Zorunlu Alan" aria-describedby="tooltip916361"></i></th>' +
                        '</tr>' +
                        '</thead>' +
                        '<tbody>' +
                        '<tr>' +
                        '<td colspan="1" rowspan="1"><input id="sikayetliUrun" type="select"  style="resize:none;width:100%;"></td>' +
                        '<td colspan="1" rowspan="1"><input id="qdmsDuzenleyici" type="text" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;"></td>' +
                        '</tr>' +
                        '</tbody>' +
                        '</table>' +
                        '<table class="table table4" style="width: 100%">' +
                        '<thead>' +
                        '<tr>' +
                        '<th>Analiz Sonuç Notu<i class="fa fa-asterisk text-danger urun-grubu-diaego-hide" title="" data-original-title="Zorunlu Alan" aria-describedby="tooltip916361"></i></th>' +
                        '</tr>' +
                        '</thead>' +
                        '<tbody>' +
                        '<tr>' +
                        '<td colspan="1" rowspan="1"><textarea rows="5" cols="150" id="sonucNotu" type="text" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;" /></td>' +
                        '</tr>' +
                        '</tbody>' +
                        '</table>',
                    footer: '<button id="btnKaydetVeRapor" type="button" class="btn btn-sm btn-success" >Kaydet ve Rapor Oluştur</button>' + '<button type="button" class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>'
                },
                settings: {
                    widthClass: 'modal-full-width'
                }
            });
            if (urunGrubuDieago) {
                $('.urun-grubu-diaego-hide').remove();
                $('#sartliKabulUrun, #sartliKabulAmbalaj, #qdmsDuzenleyici, #sonucNotu').prop('disabled', true);
            }
            $('#modalSablon .modal-body').css('max-height', '');
            $('#modalSablon .modal-body').css('height', '750px');
            // $('#modalSablon .modal-dialog').css('width', '50%');
            $('#modalSablon').modal('toggle');

            prepareSelect2('#sikayetliUrun', '/summary/fielditems', {
                id: '6FCF0086E70045C8BEA98FF546B3DF60'
            }, null, null);
            SetSelect("#sikayetliUrun", '6FCF0086E70045C8BEA98FF546B3DF60');
            if (urunGrubuDieago) {
                $("#sikayetliUrun").select2('enable', false);
            }

            prepareSelect2('#meyAmbalaj', '/summary/fielditems', {
                id: '3D382452110B49998E207898022DB8FE'
            }, null, null);
            SetSelect("#meyAmbalaj", '3D382452110B49998E207898022DB8FE');
            if (urunGrubuDieago) {
                $("#meyAmbalaj").select2('enable', false);
            }

            prepareSelect2('#saklamaKosul', '/summary/fielditems', {
                id: 'CA3F3BFD24994F9FBBD0A46DC8790278'
            }, null, null);
            SetSelect("#saklamaKosul", 'CA3F3BFD24994F9FBBD0A46DC8790278');
            if (urunGrubuDieago) {
                $("#saklamaKosul").select2('enable', false);
            }

            prepareSelect2('#sahitNumune', '/summary/fielditems', {
                id: 'ED9E92F8910A49778CC19F0C39FBE63F'
            }, null, null);
            SetSelect("#sahitNumune", 'ED9E92F8910A49778CC19F0C39FBE63F');
            if (urunGrubuDieago) {
                $("#sahitNumune").select2('enable', false);
            }

            prepareSelect2('#fabrikaKaynaklıMıdır', '/summary/fielditems', {
                id: '58B55D96C5984A95873EC628A8F562FD'
            }, null, null);
            SetSelect("#fabrikaKaynaklıMıdır", '58B55D96C5984A95873EC628A8F562FD');
            if (urunGrubuDieago) {
                $("#fabrikaKaynaklıMıdır").select2('enable', false);
            }

            prepareSelect2('#yasalUygunMu', '/summary/fielditems', {
                id: 'A1DA686AE380440E853F6B2E1A04E251'
            }, null, null);
            SetSelect("#yasalUygunMu", 'A1DA686AE380440E853F6B2E1A04E251');
            if (urunGrubuDieago) {
                $("#yasalUygunMu").select2('enable', false);
            }

            prepareSelect2('#meyUrunUygun', '/summary/fielditems', {
                id: '09E52735369F441EBF51D114A6F23480'
            }, null, null);
            SetSelect("#meyUrunUygun", '09E52735369F441EBF51D114A6F23480');
            if (urunGrubuDieago) {
                $("#meyUrunUygun").select2('enable', false);
            }

            prepareSelect2('#musteriHakliMi', '/summary/fielditems', {
                id: '0BD929E121DF4A99B535C14B20D2A4DD'
            }, null, null);
            SetSelect("#musteriHakliMi", '0BD929E121DF4A99B535C14B20D2A4DD');


            prepareSelect2('#fabrikaHedefleriEtkilerMi', '/summary/fielditems', {
                id: 'D42408F877A9472B82C3656F59918D07'
            }, null, null);
            SetSelect("#fabrikaHedefleriEtkilerMi", 'D42408F877A9472B82C3656F59918D07');
            if (urunGrubuDieago) {
                $("#fabrikaHedefleriEtkilerMi").select2('enable', false);
            }

            var qdms = $('label[for=4FEA9EBCB7564301B93AC3200CEE53AB]').parent().data('value');
            $('#qdmsDuzenleyici').val(qdms);

            prepareSelect2('#raporYazanKisi', '/summary/organizationalunititems', {
                publicId: '779FA103EB6049AE9F7C596A37BF7175',
                name: 'User',
                filterType: 'User',
                groupIds: null,
                depth: 1,
                includeItSelf: false
            }, null, false);

            $('#raporTarihi').datetimepicker({
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

            $('#talepTarihi').datetimepicker({
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
            $('#analizBasTarih').datetimepicker({
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
            var rapTarihi = $('label[for=9883FFF358244365A5A19B96EC2FF6A6 ]').parent().data('value').split(' ')[0];
            var analizTalpTarihi = $('label[for=6D2E7C8FB88E4D69AABFDC3D9EEDDF81]').parent().data('value').split(' ')[0];
            var analizBaslangicTarihi = $('label[for=6DD30E3FC96F4A4BA26370135B1811D1]').parent().data('value').split(' ')[0];
            var kapakKod = $('label[for=4ED12005859C4538BEFBE2BAFC1E2C41]').parent().data('value');
            var raporNumarasi = $('label[for=C664FCCF22C745AD96A8B72D96958046]').parent().data('value');
            var analizTipVal = $('label[for=F9E2A2C19C1E40AFA314022E1E227CD4]').parent().data('value');
            var analizTipId = $('label[for=F9E2A2C19C1E40AFA314022E1E227CD4]').parent().data('publicids');
            var analizSonucNot = $('label[for=658742A5AF564962891775A07618F5E1]').parent().data('value');
            var sonucNotu = $('label[for=658742A5AF564962891775A07618F5E1]').parent().data('value');
            $('#sonucNotu').val(sonucNotu);

            $('#analizBasTarih').attr('disabled', true);
            $('#raporYazanKisi').select2('enable', false).removeAttr('disabled');
            prepareSelect2('#analizTip', '/summary/fielditems', {
                id: 'F9E2A2C19C1E40AFA314022E1E227CD4'
            }, null, null);

            var s = $('label[for=F28147C42AE644F899574E07E16A69C7]').parent().data('value');
            if (s !== "False") {
                $('#sartliKabulUrun').prop('checked', true);
            }
            var s = $('label[for=A706DD4C7D324BFAB59E31F005AE1973]').parent().data('value');
            if (s !== "False") {
                $('#sartliKabulAmbalaj').prop('checked', true);
            }
            $('#raporTarihi').val(rapTarihi);
            $('#kapakKodu').val(kapakKod);
            $('#raporNo').val(raporNumarasi);
            $('#talepTarihi').val(analizTalpTarihi);
            $('#analizBasTarih').val(analizBaslangicTarihi);
            if (!String.isNullOrWhiteSpace(analizTipId) && !String.isNullOrWhiteSpace(analizTipVal)) {
                $('#analizTip').select2('data', {
                    id: analizTipId,
                    text: analizTipVal
                }).trigger('change');
            }
            // $('#analizSonucNotu').val(analizSonucNot);
            $('#raporYazanKisi').select2('data', {
                id: userData.id,
                text: userData.name
            }).trigger('change');

            // $('.table1').hide();
            // $('.table2').hide();
            // $('.table3').hide();

            // $('body').on('change', '#musteriHakliMi', function () {
            //     var musteriId = $('#musteriHakliMi').val();
            //     var fabrikaId = $('#fabrikaHedefleriEtkilerMi').val();
            //     if (musteriId === "8225D5943054473987899FC5ADBCED0D" && fabrikaId === "C440E14B22864EBF841F40CF514B4185") {
            //         $('.table1').show();
            //         $('.table2').show();
            //         $('.table3').show();
            //         $('#modalSablon .modal-body').css('max-height', '');
            //         $('#modalSablon .modal-body').css('height', '750px');
            //     } else {
            //         $('.table1').hide();
            //         $('.table2').hide();
            //         $('.table3').hide();
            //         $('#modalSablon .modal-body').css('max-height', '');
            //         $('#modalSablon .modal-body').css('height', '300px');
            //     }
            // });
            // $('body').on('change',
            //     '#fabrikaHedefleriEtkilerMi',
            //     function () {
            //         var fabrikaId = $('#fabrikaHedefleriEtkilerMi').val();
            //         var musteriId = $('#musteriHakliMi').val();
            //         if (musteriId === "8225D5943054473987899FC5ADBCED0D" && fabrikaId === "C440E14B22864EBF841F40CF514B4185") {
            //             $('.table1').show();
            //             $('.table2').show();
            //             $('.table3').show();
            //             $('#modalSablon .modal-body').css('max-height', '');
            //             $('#modalSablon .modal-body').css('height', '750px');
            //         } else {
            //             $('.table1').hide();
            //             $('.table2').hide();
            //             $('.table3').hide();
            //             $('#modalSablon .modal-body').css('max-height', '');
            //             $('#modalSablon .modal-body').css('height', '300px');
            //         }
            //     });
        }
    });

    function SetSelect(id, fieldId) {
        var r = $('label[for=' + fieldId + ']').parent().data('value');
        var rId = $('label[for=' + fieldId + ']').parent().data('publicids');
        if (r === "" || rId == "") {
            // $(id).select2('data', {
            //     id: "",
            //     text: "Seçiniz."
            // }).trigger('change');
        } else {
            $(id).select2('data', {
                id: rId,
                text: r
            }).trigger('change');
        }
    }

    $('body').on('click',
        '#btnKaydetVeRapor',
        function() {
            debugger;
            var musteriId = $('#musteriHakliMi').val();
            var fabrikaId = $('#fabrikaHedefleriEtkilerMi').val();

            if (!urunGrubuDieago && $('#sonucNotu').val() === "") {
                setUtil.alert({
                    container: '#modalSablon .modal-body #msg',
                    message: 'Lütfen Analiz Sonuç Notu Alanını Doldurdunuz.',
                    alertClass: 'alert-danger',
                    autoClose: true
                });
            } else if ($('#musteriHakliMi').val() === "" && !$('#raporNo').val().toLowerCase().contains('fb')) {
                setUtil.alert({
                    container: '#modalSablon .modal-body #msg',
                    message: 'Lütfen Müşteri Haklı Mı Seçimini Yapınız.',
                    alertClass: 'alert-danger',
                    autoClose: true
                });
            } else if (!urunGrubuDieago && $('#fabrikaHedefleriEtkilerMi').val() === "" && !$('#raporNo').val().toLowerCase().contains('fb')) {
                setUtil.alert({
                    container: '#modalSablon .modal-body #msg',
                    message: 'Lütfen Fabrika Hedeflerini Etkiler Mi Seçimini Yapınız.',
                    alertClass: 'alert-danger',
                    autoClose: true
                });
            } else if (musteriId === "8225D5943054473987899FC5ADBCED0D" && fabrikaId === "C440E14B22864EBF841F40CF514B4185") {

                if (!urunGrubuDieago && $('#sikayetliUrun').val() === "") {
                    setUtil.alert({
                        container: '#modalSablon .modal-body #msg',
                        message: 'Lütfen Şikayet Ürün Seçimini Yapınız.',
                        alertClass: 'alert-danger',
                        autoClose: true
                    });
                } else if (!urunGrubuDieago && $('#meyAmbalaj').val() === "") {
                    setUtil.alert({
                        container: '#modalSablon .modal-body #msg',
                        message: 'Lütfen Mey ambalaj speklerine uygun mudur Seçimini Yapınız.',
                        alertClass: 'alert-danger',
                        autoClose: true
                    });
                } else if (!urunGrubuDieago && $('#saklamaKosul').val() === "") {
                    setUtil.alert({
                        container: '#modalSablon .modal-body #msg',
                        message: 'Lütfen Saklama koşulu kaynaklı haklı şikayet midir Seçimini Yapınız.',
                        alertClass: 'alert-danger',
                        autoClose: true
                    });
                } else if (!urunGrubuDieago && $('#sahitNumune').val() === "") {
                    setUtil.alert({
                        container: '#modalSablon .modal-body #msg',
                        message: 'Lütfen Şahit NumuneSeçimini Yapınız.',
                        alertClass: 'alert-danger',
                        autoClose: true
                    });
                } else if (!urunGrubuDieago && $('#fabrikaKaynaklıMıdır').val() === "") {
                    setUtil.alert({
                        container: '#modalSablon .modal-body #msg',
                        message: 'Lütfen Fabrika kaynaklı mıdır.',
                        alertClass: 'alert-danger',
                        autoClose: true
                    });
                } else if (!urunGrubuDieago && $('#yasalUygunMu').val() === "") {
                    setUtil.alert({
                        container: '#modalSablon .modal-body #msg',
                        message: 'Lütfen Yasal speklere uygun mudur seçimini yapınız..',
                        alertClass: 'alert-danger',
                        autoClose: true
                    });
                } else if (!urunGrubuDieago && $('#meyUrunUygun').val() === "") {
                    setUtil.alert({
                        container: '#modalSablon .modal-body #msg',
                        message: 'Lütfen Mey ürün speklerine uygun mudur.',
                        alertClass: 'alert-danger',
                        autoClose: true
                    });
                } else if (!urunGrubuDieago && $('#qdmsDuzenleyici').val() === "") {
                    setUtil.alert({
                        container: '#modalSablon .modal-body #msg',
                        message: 'Lütfen QDMS Düzeltici Faaliyet No Giriniz.',
                        alertClass: 'alert-danger',
                        autoClose: true
                    });
                } else {
                    var sikayetTipi = $('label[for=84730B09AE774494BA6C828AEFD44877]').parent().data('value');
                    var urunGrubu = $('label[for=6D9879D0584744F7B7C883E3914065BE]').parent().data('publicids');
                    var sikayetTuru = $('label[for=5A381475F8464FED8427883999EFCF18]').parent().data('value');
                    var talepFormu = $('label[for=EB6FDB451D614101BF1DB6D07F680991]').parent().data('value');
                    var data = {
                        RecordId: $('#RecordPublicId').val(),
                        RaporTarihi: $('#raporTarihi').val(),
                        KapakKodu: $('#kapakKodu').val(),
                        RaporNumarasi: $('#raporNo').val(),
                        AnalizTalepTarihi: $('#talepTarihi').val(),
                        AnalizBaslangicTarihi: $('#analizBasTarih').val(),
                        AnalizTipi: $('#analizTip').val(),
                        // AnalizSonucNotu: $('#analizSonucNotu').val(),
                        RaporYazanKisi: userData.id,
                        SikayetTipi: sikayetTipi,
                        SikayetTuru: sikayetTuru,
                        TalepFormu: talepFormu,
                        QDMS: $('#qdmsDuzenleyici').val(),
                        MeyUygun: $('#meyUrunUygun').val(),
                        YasalUygun: $('#yasalUygunMu').val(),
                        FabrikaKaynakli: $('#fabrikaKaynaklıMıdır').val(),
                        SahitNumune: $('#sahitNumune').val(),
                        FabrikaKaynakli: $('#FabrikaKaynakli').val(),
                        SaklamaKosul: $('#saklamaKosul').val(),
                        MeyAmbalaj: $('#meyAmbalaj').val(),
                        SikayetliUrun: $('#sikayetliUrun').val(),
                        SartliKabulUrun: $('#sartliKabulUrun').prop('checked').toString(),
                        SartliKabulambalaj: $('#sartliKabulAmbalaj').prop('checked').toString(),
                        MusteriHakliMi: $('#musteriHakliMi').val(),
                        FabrikaEtkilerMi: $('#fabrikaHedefleriEtkilerMi').val(),
                        SonucNotu: $('#sonucNotu').val(),
                        TuketiciVeFabrikaMi: "evet",
                    }
                    var url = 'https://meyicki2.setcrm.com/api/data/RaporGuncelle';
                    var url2 = 'http://localhost:11456/api/data/RaporGuncelle';
                    $('#modalSablon .modal-body').html('<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>');
                    $.post(url2, data, function(r) {
                        if (r.Status) {
                            $('#modalSablon').modal('toggle');

                            if (r.formType === 0) {
                                window.open(' https://meydiageo.setcrm.com/formtemplate/get/?id=D1E77B206774406899F00F9EFFCDDD84&coId=85DA4222C20E45329815EE7D0AA14C1E&recordId=' + $('#RecordPublicId').val(), "_blank");
                            } else if (r.formType === 1) {
                                window.open('https://meydiageo.setcrm.com/formtemplate/get/?id=F5E8E977072743F4B063ECF2C92646D4&coId=85DA4222C20E45329815EE7D0AA14C1E&recordId=' + $('#RecordPublicId').val(), "_blank");
                            } else if (r.formType === 2) {
                                window.open('https://meydiageo.setcrm.com/formtemplate/get/?id=F5E8E977072743F4B063ECF2C92646D4&coId=85DA4222C20E45329815EE7D0AA14C1E&recordId=' + $('#RecordPublicId').val(), "_blank");
                            } else if (r.formType === 3) {
                                window.open(' https://meydiageo.setcrm.com/formtemplate/get/?id=AFE0D2BAED724E5092E988B3024F1490&coId=85DA4222C20E45329815EE7D0AA14C1E&recordId=' + $('#RecordPublicId').val(), "_blank");
                            }
                            // }
                            setTimeout(() => {
                                window.location.reload();
                            }, 3000);

                        } else {
                            setUtil.alert({
                                container: '#modalSablon .modal-body #msg',
                                message: r.Message,
                                alertClass: 'alert-danger',
                                autoClose: true
                            });
                        }
                    });
                }
            } else {
                var sikayetTipi = $('label[for=84730B09AE774494BA6C828AEFD44877]').parent().data('value');
                var urunGrubu = $('label[for=6D9879D0584744F7B7C883E3914065BE]').parent().data('publicids');
                var sikayetTuru = $('label[for=5A381475F8464FED8427883999EFCF18]').parent().data('value');
                var talepFormu = $('label[for=EB6FDB451D614101BF1DB6D07F680991]').parent().data('value');
                var data = {
                    RecordId: $('#RecordPublicId').val(),
                    RaporTarihi: $('#raporTarihi').val(),
                    KapakKodu: $('#kapakKodu').val(),
                    RaporNumarasi: $('#raporNo').val(),
                    AnalizTalepTarihi: $('#talepTarihi').val(),
                    AnalizBaslangicTarihi: $('#analizBasTarih').val(),
                    AnalizTipi: $('#analizTip').val(),
                    // AnalizSonucNotu: $('#analizSonucNotu').val(),
                    RaporYazanKisi: userData.id,
                    SikayetTipi: sikayetTipi,
                    SikayetTuru: sikayetTuru,
                    TalepFormu: talepFormu,
                    QDMS: $('#qdmsDuzenleyici').val(),
                    MeyUygun: $('#meyUrunUygun').val(),
                    YasalUygun: $('#yasalUygunMu').val(),
                    FabrikaKaynakli: $('#fabrikaKaynaklıMıdır').val(),
                    SahitNumune: $('#sahitNumune').val(),
                    FabrikaKaynakli: $('#FabrikaKaynakli').val(),
                    SaklamaKosul: $('#saklamaKosul').val(),
                    MeyAmbalaj: $('#meyAmbalaj').val(),
                    SikayetliUrun: $('#sikayetliUrun').val(),
                    SartliKabulUrun: $('#sartliKabulUrun').prop('checked').toString(),
                    SartliKabulambalaj: $('#sartliKabulAmbalaj').prop('checked').toString(),
                    MusteriHakliMi: $('#musteriHakliMi').val(),
                    FabrikaEtkilerMi: $('#fabrikaHedefleriEtkilerMi').val(),
                    SonucNotu: $('#sonucNotu').val(),
                    TuketiciVeFabrikaMi: "evet",
                }
                var url = 'https://meyicki2.setcrm.com/api/data/RaporGuncelle';
                var url2 = 'http://localhost:11456/api/data/RaporGuncelle';
                $('#modalSablon .modal-body').html('<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>');
                $.post(url2, data, function(r) {
                    if (r.Status) {
                        $('#modalSablon').modal('toggle');

                        if (r.formType === 0) {
                            window.open(' https://meydiageo.setcrm.com/formtemplate/get/?id=D1E77B206774406899F00F9EFFCDDD84&coId=85DA4222C20E45329815EE7D0AA14C1E&recordId=' + $('#RecordPublicId').val(), "_blank");
                        } else if (r.formType === 1) {
                            window.open('https://meydiageo.setcrm.com/formtemplate/get/?id=F5E8E977072743F4B063ECF2C92646D4&coId=85DA4222C20E45329815EE7D0AA14C1E&recordId=' + $('#RecordPublicId').val(), "_blank");
                        } else if (r.formType === 2) {
                            window.open('https://meydiageo.setcrm.com/formtemplate/get/?id=F5E8E977072743F4B063ECF2C92646D4&coId=85DA4222C20E45329815EE7D0AA14C1E&recordId=' + $('#RecordPublicId').val(), "_blank");
                        } else if (r.formType === 3) {
                            window.open(' https://meydiageo.setcrm.com/formtemplate/get/?id=AFE0D2BAED724E5092E988B3024F1490&coId=85DA4222C20E45329815EE7D0AA14C1E&recordId=' + $('#RecordPublicId').val(), "_blank");
                        }
                        // }
                        setTimeout(() => {
                            window.location.reload();
                        }, 3000);

                    } else {
                        setUtil.alert({
                            container: '#modalSablon .modal-body #msg',
                            message: r.Message,
                            alertClass: 'alert-danger',
                            autoClose: true
                        });
                    }
                });
            }

        });
});