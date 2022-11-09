$(function() {
    var laborant = $("label[for=29361EBA2E0649F5B5D9B9A9C628F7CA]").closest('div').data('publicids'),
        authorized = laborant === userData.id ? true : false;

    $('body').on('lookupRelationLoadTriggerEvent', function(e, relationId) {
        if (relationId === 'C5565F406F454279AA7E46DB748018BA' && authorized) {
            $('.panel[data-id=C5565F406F454279AA7E46DB748018BA]').find('table thead tr:first th:last')
                .append("<button type='button' class='btn btn-warning btn-sm' title='Toplu Sonuç Gir' id='toplu-sonuc'><i class='fa fa-binoculars'></i></button>");
        }

        if (relationId === 'E5F4A0D88E5A4D0D9F113722BF879E52' && authorized) {
            $('.panel[data-id=E5F4A0D88E5A4D0D9F113722BF879E52]').find('table thead tr:first th:last')
                .append("<button type='button' class='btn btn-warning btn-sm' title='Toplu Sonuç Gir' id='toplu-sonuc-other-lr'><i class='fa fa-binoculars'></i></button>");
        }
    });

    $("body").on("click",
        "#toplu-sonuc",
        function() {
            $("#modalSonucGir").remove();
            window.setModal.Create({
                id: 'modalSonucGir',
                html: {
                    header: 'Toplu Sonuç Girişi',
                    body: '<div id="error-message" style="font-size:15px;"></div>' +
                        '<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor.. Lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>' +
                        '<div id="sonucGirTbl" style="width: 100%;"></div>',
                    footer: '<button type="button" id="btn-sonuc-gir" style="display:none;" class="btn btn-sm btn-info">Kaydet</button>' +
                        '<button type="button" data-dismiss="modal" class="btn btn-sm btn-default">Kapat</button>'
                },
                settings: {
                    widthClass: 'modal-full-width',
                }
            });

            var lrRealUrl = "https://meyicki.setcrm.com/api/data/LrOkuma?recordId=" + $("#RecordPublicId").val() + "&lrId=C5565F406F454279AA7E46DB748018BA";
            var localUrl = "http://localhost:50058/api/data/LrOkuma?recordId=" + $("#RecordPublicId").val() + "&lrId=C5565F406F454279AA7E46DB748018BA";
            $.get(lrRealUrl, function(r) {
                if (r.IsOk) {
                    if (r.Records.length === 0) {
                        $("#modalSonucGir").find("#txt, #tbl").hide();
                        setUtil.alert({
                            container: '#modalSonucGir .modal-body #error-message',
                            message: 'Kayıt(lar) bulunamadı, lütfen daha sonra tekrar deneyiniz!',
                            alertClass: 'alert-danger',
                            autoClose: false
                        });
                        return;
                    }
                    $("#sonucGirTbl").find('table').remove();
                    var newTbl = $('<table class="table table-bordered table-hover" id="newTbl" style="width: 100%;overflow-x: scroll;table-layout: fixed" />');
                    var thead = $('<thead />');
                    var newRow = $('<tr style="background-color:lightblue;"/>');
                    newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;width: 41px" class="col-md-2"/>').text('Sıra'));
                    newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Analiz Adı'));
                    newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Kaynak'));
                    newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Method Kodu'));
                    newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Parametre'));
                    newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Birim Seti'));
                    newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Cihaz'));
                    newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('LOD'));
                    newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('LOQ'));
                    newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Ölçüm Belirsizliği'));
                    newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Değer'));
                    newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Sonuç'));
                    newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Analiz Tarihi'));
                    newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Analizi Yapan'));
                    newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Analiz Statüsü'));
                    thead.append(newRow);
                    newTbl.append(thead);
                    var tbody = $('<tbody />');
                    $.each(r.Records, function(i, v) {

                        var satirId = v.PublicId,
                            newRow = $('<tr/>').attr('data-id', satirId),
                            // analiz = v.Values.first('FieldPublicId', 'C5665DCB18774D66856DD29E831D2032').SelectedItemPublicIds,
                            analizAdi = v.Values.first('FieldPublicId', 'C5665DCB18774D66856DD29E831D2032').Value,
                            // kaynak = v.Values.first('FieldPublicId', '54A8FF1E9C9D4D67BD7AE3C478F16669').SelectedItemPublicIds,
                            kaynakAdi = v.Values.first('FieldPublicId', '54A8FF1E9C9D4D67BD7AE3C478F16669').Value,
                            methodKodu = v.Values.first('FieldPublicId', '9D224C32FAE6423E97ADDB165A6D1272').SelectedItemPublicIds,
                            methodKoduAdi = v.Values.first('FieldPublicId', '9D224C32FAE6423E97ADDB165A6D1272').Value,
                            // parametre = v.Values.first('FieldPublicId', 'D861A394FEDE4AE3835C8CD231DA7BF5').SelectedItemPublicIds,
                            parametreAdi = v.Values.first('FieldPublicId', 'D861A394FEDE4AE3835C8CD231DA7BF5').Value,
                            // birimSeti = v.Values.first('FieldPublicId', 'D7523D0C0DE34333972443BC585DE68F').SelectedItemPublicIds,
                            birimSetiAdi = v.Values.first('FieldPublicId', 'D7523D0C0DE34333972443BC585DE68F').Value,
                            birimSetiId = v.Values.first('FieldPublicId', 'D7523D0C0DE34333972443BC585DE68F').SelectedItemPublicIds,
                            lod = v.Values.first('FieldPublicId', '74BF0A0256B24FCF99736D4CAC875BD9').Value,
                            loq = v.Values.first('FieldPublicId', '6A37A64B6C664236A8DC63E79BA517C6').Value,
                            // olcumBelirsizligi = v.Values.first('FieldPublicId', 'F3E3952C11E04443B6C414D8F9A1F650').Value,
                            olcumBelirsizligi = v.Values.first('FieldPublicId', '88109E68C3E84D078E5D3F80194CCF48').Value,
                            deger = v.Values.first('FieldPublicId', '94C10199C0644120B3F0D79685F08F40').Value,
                            // sonuc = v.Values.first('FieldPublicId', 'AB6B948D94C04C1684526F0A2A452E69').Value,
                            sonuc = v.Values.first('FieldPublicId', '4B167135C0BA49ACA987DCFC821017F2').Value,
                            analizTarihi = v.Values.first('FieldPublicId', '627B610D5292469AA531592C029F6096').Value,
                            analiziYapan = v.Values.first('FieldPublicId', 'E7A7D5ABC5664D6B8CB8818C072D515A').SelectedItemPublicIds,
                            analiziYapanlar = v.Values.first('FieldPublicId', 'E7A7D5ABC5664D6B8CB8818C072D515A').Value,
                            analizStatu = v.Values.first('FieldPublicId', '9003BE1F18884767A35F7C061F2BB56E').SelectedItemPublicIds,
                            analizStatuAdi = v.Values.first('FieldPublicId', '9003BE1F18884767A35F7C061F2BB56E').Value;
                        // cihazId = v.Values.first('FieldPublicId', 'DCC84C555DAA4CA5BFD13F97B0B3251F').SelectedItemPublicIds,
                        // cihaz = v.Values.first('FieldPublicId', 'DCC84C555DAA4CA5BFD13F97B0B3251F').Value;

                        var cihazId = v.Values.first('FieldPublicId', 'BADDEC1A5D8144B6B43F5AF877CF4BA8') !== null ? v.Values.first('FieldPublicId', 'BADDEC1A5D8144B6B43F5AF877CF4BA8').SelectedItemPublicIds : "",
                            cihaz = v.Values.first('FieldPublicId', 'BADDEC1A5D8144B6B43F5AF877CF4BA8') !== null ? v.Values.first('FieldPublicId', 'BADDEC1A5D8144B6B43F5AF877CF4BA8').Value : "";

                        // newRow.append($('<td style="text-align: left;" class="col-md-2"/>')
                        //     .text(++i));
                        // newRow.append($('<td style="text-align: left;" class="col-md-2"/>')
                        //     .append('<div id="analiz_' + satirId + '" style="width:100%;" class="analiz"></div>'));
                        // newRow.append($('<td style="text-align: left;" class="col-md-2"/>')
                        //     .append('<div id="kaynak_' + satirId + '" style="width:100%;" class="kaynak"></div>'));
                        // newRow.append($('<td style="text-align: left;" class="col-md-2"/>')
                        //     .append('<div id="methodKodu_' + satirId + '" style="width:100%;" class="methodKodu"></div>'));
                        // newRow.append($('<td style="text-align: left;" class="col-md-2"/>')
                        //     .append('<div id="parametre_' + satirId + '" style="width:100%;" class="parametre"></div>'));
                        // newRow.append($('<td style="text-align: left;" class="col-md-2"/>')
                        //     .append('<div id="birimSeti_' + satirId + '" style="width:100%;" class="birimSeti"></div>'));
                        newRow.append($('<td style="text-align: left;" class="col-md-2"/>')
                            .text(++i));
                        newRow.append($('<td style="text-align: left;" class="col-md-2"/>')
                            .text(analizAdi));
                        newRow.append($('<td style="text-align: left;" class="col-md-2"/>')
                            .text(kaynakAdi));
                        newRow.append($('<td style="text-align: left;" class="col-md-2"/>')
                            .text(methodKoduAdi));
                        newRow.append($('<td style="text-align: left;" class="col-md-2"/>')
                            .text(parametreAdi));

                        newRow.append($('<td style="text-align: left;" class="col-md-2"/>')
                            .append('<div id="birimSeti_' + satirId + '" style="width:100%;" class="birimSeti"></div>'));

                        newRow.append($('<td style="text-align: left;" class="col-md-2"/>')
                            .append('<div id="cihaz_' + satirId + '" style="width:100%;" class="cihaz"></div>'));

                        newRow.append($('<td style="text-align: left;" class="col-md-2"/>')
                            .append('<input data-mouseleave="true" type="text" id="lod_' + satirId + '" style="width:100%;" value="' + lod + '" placeholder="099,99" maxlength="6" style="text-align: right;" class="lod form-control"></div>'));
                        newRow.append($('<td style="text-align: left;" class="col-md-2"/>')
                            .append('<input data-mouseleave="true" type="text" id="loq_' + satirId + '" style="width:100%;" value="' + loq + '" placeholder="099999999999" maxlength="12" style="text-align: right;" class="loq form-control"></div>'));
                        newRow.append($('<td style="text-align: left;" class="col-md-2"/>')
                            .append('<input data-mouseleave="true" type="text" id="olcumBelirsizligi_' + satirId + '" style="width:100%;" value="' + olcumBelirsizligi + '" maxlength="450" class="olcumBelirsizligi form-control"></div>'));
                        newRow.append($('<td style="text-align: left;" class="col-md-2"/>')
                            .append('<input data-mouseleave="true" type="text" id="deger_' + satirId + '" style="width:100%;" value="' + (deger !== '' ? deger : '') + '" data-old-value="' + (deger !== '' ? deger : '') + '" placeholder="099999999999" maxlength="12" style="text-align: right;" class="deger form-control"></div>'));
                        newRow.append($('<td style="text-align: left;" class="col-md-2"/>')
                            .append('<input data-mouseleave="true" type="text" id="sonuc_' + satirId + '" style="width:100%;" value="' + sonuc + '" maxlength="450" class="sonuc form-control"></div>'));
                        newRow.append($('<td style="text-align: left;" class="col-md-2"/>')
                            .append('<input data-mouseleave="true" type="text" id="analizTarihi_' + satirId + '" style="width:100%;" value="' + analizTarihi + '" autocomplete="off" class="analizTarihi form-control"></div>'));
                        newRow.append($('<td style="text-align: left;" class="col-md-2"/>')
                            .append('<div id="analiziYapan_' + satirId + '" style="width:100%;" class="analiziYapan"></div>'));
                        newRow.append($('<td style="text-align: left;" class="col-md-2"/>')
                            .append('<div id="analizStatu_' + satirId + '" style="width:100%;" class="analizStatu"></div>'));


                        tbody.append(newRow);
                        newTbl.append(tbody);
                        $('#modalSonucGir .modal-body #sonucGirTbl').append(newTbl);

                        // prepareSelect2('#analiz_' + satirId, '/Summary/LookupFieldValues', {
                        //     coId: '76CE86534F3A4DD29EF9FB54003E836C',
                        //     id: 'C5665DCB18774D66856DD29E831D2032',
                        //     viewFilterId: 'F6A5DF2953AD44629FBCFE92A26B23F7',
                        // }, null, false);

                        // prepareSelect2('#kaynak_' + satirId, '/Summary/LookupFieldValues', {
                        //     coId: '76CE86534F3A4DD29EF9FB54003E836C',
                        //     id: '54A8FF1E9C9D4D67BD7AE3C478F16669',
                        //     viewFilterId: 'E44ED85EB063410C91CA2FEFD0DED224',
                        // }, null, false);

                        // prepareSelect2('#methodKodu_' + satirId, '/Summary/LookupFieldValues', {
                        //     coId: '76CE86534F3A4DD29EF9FB54003E836C',
                        //     id: '9D224C32FAE6423E97ADDB165A6D1272',
                        //     viewFilterId: 'B27A9EE4838B4A8E869C6BA647CAA16B',
                        // }, null, false);

                        // prepareSelect2('#parametre_' + satirId, '/Summary/LookupFieldValues', {
                        //     coId: '76CE86534F3A4DD29EF9FB54003E836C',
                        //     id: 'D861A394FEDE4AE3835C8CD231DA7BF5',
                        //     viewFilterId: 'FCA85BB6BCC04F658E6C343BC6027696',
                        // }, null, false);

                        // prepareSelect2('#birimSeti_' + satirId, '/Summary/LookupFieldValues', {
                        //     coId: '76CE86534F3A4DD29EF9FB54003E836C',
                        //     id: 'D7523D0C0DE34333972443BC585DE68F',
                        //     viewFilterId: 'AD5B6930403D4944BC01967D31D72C4D',
                        // }, null, false);

                        prepareSelect2('#analiziYapan_' + satirId, '/Summary/organizationalunititems', {
                            publicId: 'E7A7D5ABC5664D6B8CB8818C072D515A',
                            name: 'User',
                            filterType: 'User',
                        }, null, true);

                        prepareSelect2('#analizStatu_' + satirId, '/Summary/fielditems', {
                            id: '9003BE1F18884767A35F7C061F2BB56E'
                        }, null, false);

                        // prepareSelect2('#cihaz_' + satirId, '/Summary/LookupFieldValues', {
                        //     coId: '76CE86534F3A4DD29EF9FB54003E836C',
                        //     id: 'DCC84C555DAA4CA5BFD13F97B0B3251F',
                        //     viewFilterId: '8F65C01AFC7A453580D36D2C2C1B3C5C'
                        // }, null, false);
                        prepareSelect2('#cihaz_' + satirId, '/Summary/LookupFieldValues', {
                            coId: '76CE86534F3A4DD29EF9FB54003E836C',
                            id: 'BADDEC1A5D8144B6B43F5AF877CF4BA8',
                            viewFilterId: '8655119F79D04840A101B95E7FD2242F',
                            controllingRecordId: methodKodu,
                            itemId: 'BADDEC1A5D8144B6B43F5AF877CF4BA8',
                            groupIds: methodKodu
                        }, null, false);

                        prepareSelect2('#birimSeti_' + satirId, '/Summary/LookupFieldValues', {
                            coId: '76CE86534F3A4DD29EF9FB54003E836C',
                            id: 'D7523D0C0DE34333972443BC585DE68F',
                            viewFilterId: 'AD5B6930403D4944BC01967D31D72C4D'
                        }, null, false);


                        // if (analiz !== '') {
                        //     prepareSelect2SelectedOneItem('#analiz_' + satirId, analiz, analizAdi, false);
                        // }

                        // if (kaynak !== '') {
                        //     prepareSelect2SelectedOneItem('#kaynak_' + satirId, kaynak, kaynakAdi, false);
                        // }

                        // if (methodKodu !== '') {
                        //     prepareSelect2SelectedOneItem('#methodKodu_' + satirId, methodKodu, methodKoduAdi, false);
                        // }

                        // if (parametre !== '') {
                        //     prepareSelect2SelectedOneItem('#parametre_' + satirId, parametre, parametreAdi, false);
                        // }

                        // if (birimSeti !== '') {
                        //     prepareSelect2SelectedOneItem('#birimSeti_' + satirId, birimSeti, birimSetiAdi, false);
                        // }

                        if (analiziYapan !== '') {
                            prepareSelect2SelectedOneItem('#analiziYapan_' + satirId, analiziYapan, analiziYapanlar, true);
                        }

                        if (analizStatu !== '') {
                            prepareSelect2SelectedOneItem('#analizStatu_' + satirId, analizStatu, analizStatuAdi, false);
                        }
                        if (cihaz !== '') {
                            prepareSelect2SelectedOneItem('#cihaz_' + satirId, cihazId, cihaz, false);
                        }

                        if (birimSetiAdi !== '') {
                            prepareSelect2SelectedOneItem('#birimSeti_' + satirId, birimSetiId, birimSetiAdi, false);
                        }

                    });

                    $("#modalSonucGir").find("#txt, #tbl").hide();
                    $("#btn-sonuc-gir").show();
                    $('.analizTarihi').datetimepicker({
                        inline: false,
                        closeOnDateSelect: true,
                        timepicker: true,
                        format: 'd.m.Y H:i:s',
                        mask: false,
                        scrollMonth: false,
                        scrollTime: false,
                        scrollInput: false
                    });
                    $("#modalSonucGir .modal-body input[type=text]").attr("style",
                        "transition: transform 0.2s ease 0s;");
                    $("input[data-mouseleave=true]").mouseenter(function() {
                        $(this).css({
                            "transform": "scale(1.5)",
                            "z-index": "9999",
                            "width": "200px",
                            "position": "absolute",
                            "font-size": "12px",
                        });
                    }).mouseleave(function() {
                        $(this).css({
                            "transform": "",
                            "z-index": "",
                            "width": "100%",
                            "position": "",
                            "font-size": "",
                        });
                        if ($(this).hasClass('deger')) {
                            var val = parseInt($(this).val()),
                                oldValue = parseInt($(this).data('old-value')),
                                tr = $(this).closest('tr'),
                                analizStatu = tr.find('.analizStatu'),
                                analiziYapan = tr.find('.analiziYapan');
                            if (val !== oldValue) {
                                $(this).attr('data-old-value', val);
                                prepareSelect2SelectedOneItem(analizStatu, "1D6A7EEA24F34A818D34DAFFFA2C3FBA", "Analiz Tamamlandı", false);
                                var columns = [];
                                var value = analiziYapan.select2('data');
                                $.each(value, function(i, v) {
                                    columns.push({
                                        id: v.id,
                                        text: v.text
                                    });
                                });
                                columns.push({
                                    id: userData.id,
                                    text: userData.name
                                });
                                analiziYapan.select2('data', columns).trigger('change');
                            }
                        }
                    });

                    // $('.analiz, .kaynak, .methodKodu, .parametre, .birimSeti').select2('enable',
                    //     false);
                    $('.lod, .loq, .olcumBelirsizligi').prop("disabled",
                        true);
                } else {
                    $("#modalSonucGir").find("#txt, #tbl").hide();
                    setUtil.alert({
                        container: '#modalSonucGir .modal-body #error-message',
                        message: 'Kayıt(lar) getirelemedi, lütfen daha sonra tekrar deneyiniz!',
                        alertClass: 'alert-danger',
                        autoClose: false
                    });
                }
            });
            $("#modalSonucGir").modal("toggle");
        });

    $("body").on("click",
        "#toplu-sonuc-other-lr",
        function() {
            $("#modalSonucGir").remove();
            window.setModal.Create({
                id: 'modalSonucGir',
                html: {
                    header: 'Toplu Sonuç Girişi',
                    body: '<div id="error-message" style="font-size:15px;"></div>' +
                        '<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor.. Lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>' +
                        '<div id="sonucGirTbl" style="width: 100%;"></div>',
                    footer: '<button type="button" id="btn-sonuc-gir-other-lr" style="display:none;" class="btn btn-sm btn-info">Kaydet</button>' +
                        '<button type="button" data-dismiss="modal" class="btn btn-sm btn-default">Kapat</button>'
                },
                settings: {
                    widthClass: 'modal-full-width',
                }
            });

            var lrRealUrl = "https://meyicki.setcrm.com/api/data/LrOkuma?recordId=" + $("#RecordPublicId").val() + "&lrId=E5F4A0D88E5A4D0D9F113722BF879E52";
            var localUrl = "http://localhost:50058/api/data/LrOkuma?recordId=" + $("#RecordPublicId").val() + "&lrId=E5F4A0D88E5A4D0D9F113722BF879E52";
            $.get(lrRealUrl,
                function(r) {
                    if (r.IsOk) {
                        if (r.Records.length === 0) {
                            $("#modalSonucGir").find("#txt, #tbl").hide();
                            setUtil.alert({
                                container: '#modalSonucGir .modal-body #error-message',
                                message: 'Kayıt(lar) bulunamadı, lütfen daha sonra tekrar deneyiniz!',
                                alertClass: 'alert-danger',
                                autoClose: false
                            });
                            return;
                        }
                        $("#sonucGirTbl").find('table').remove();
                        var newTbl = $('<table class="table table-bordered table-hover" id="newTbl" style="width: 100%;overflow-x: scroll;table-layout: fixed" />');
                        var thead = $('<thead />');
                        var newRow = $('<tr style="background-color:lightblue;"/>');
                        newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;width: 41px" class="col-md-2"/>').text('Sıra'));
                        newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Analiz Adı'));
                        newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Kaynak'));
                        newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Method Kodu'));
                        newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Parametre'));
                        newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Birim Seti'));
                        newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Cihaz'));
                        // newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('LOD'));
                        // newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('LOQ'));
                        newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Ölçüm Belirsizliği'));
                        newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Değer'));
                        newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Rapor Değeri'));
                        // newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Sonuç Text'));
                        newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Sonuç'));
                        newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Analiz Tarihi'));
                        newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Analizi Yapan'));
                        newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('Analiz Statüsü'));

                        thead.append(newRow);
                        newTbl.append(thead);
                        var tbody = $('<tbody />');
                        $.each(r.Records, function(i, v) {

                            var satirId = v.PublicId,
                                newRow = $('<tr/>').attr('data-id', satirId),
                                // analiz = v.Values.first('FieldPublicId', 'C5665DCB18774D66856DD29E831D2032').SelectedItemPublicIds,
                                analizAdi = v.Values.first('FieldPublicId', 'C5665DCB18774D66856DD29E831D2032').Value,
                                // kaynak = v.Values.first('FieldPublicId', '54A8FF1E9C9D4D67BD7AE3C478F16669').SelectedItemPublicIds,
                                kaynakAdi = v.Values.first('FieldPublicId', '54A8FF1E9C9D4D67BD7AE3C478F16669').Value,
                                methodKodu = v.Values.first('FieldPublicId', '9D224C32FAE6423E97ADDB165A6D1272').SelectedItemPublicIds,
                                methodKoduAdi = v.Values.first('FieldPublicId', '9D224C32FAE6423E97ADDB165A6D1272').Value,
                                // parametre = v.Values.first('FieldPublicId', 'D861A394FEDE4AE3835C8CD231DA7BF5').SelectedItemPublicIds,
                                parametreAdi = v.Values.first('FieldPublicId', 'D861A394FEDE4AE3835C8CD231DA7BF5').Value,
                                // birimSeti = v.Values.first('FieldPublicId', 'D7523D0C0DE34333972443BC585DE68F').SelectedItemPublicIds,
                                birimSetiAdi = v.Values.first('FieldPublicId', 'D7523D0C0DE34333972443BC585DE68F').Value,
                                birimSetiId = v.Values.first('FieldPublicId', 'D7523D0C0DE34333972443BC585DE68F').SelectedItemPublicIds,
                                // lod = v.Values.first('FieldPublicId', '74BF0A0256B24FCF99736D4CAC875BD9').Value,
                                // loq = v.Values.first('FieldPublicId', '6A37A64B6C664236A8DC63E79BA517C6').Value,
                                olcumBelirsizligi = v.Values.first('FieldPublicId', '88109E68C3E84D078E5D3F80194CCF48').Value,
                                raporDegeri = v.Values.first('FieldPublicId', '78B14D497CFA41508ACC70B5FE9CBE18').Value,
                                deger = v.Values.first('FieldPublicId', '94C10199C0644120B3F0D79685F08F40').Value,
                                //sonucText = v.Values.first('FieldPublicId', '4B167135C0BA49ACA987DCFC821017F2').Value,
                                sonuc = v.Values.first('FieldPublicId', '4B167135C0BA49ACA987DCFC821017F2').Value,
                                analizTarihi = v.Values.first('FieldPublicId', '627B610D5292469AA531592C029F6096').Value,
                                analiziYapan = v.Values.first('FieldPublicId', 'E7A7D5ABC5664D6B8CB8818C072D515A').SelectedItemPublicIds,
                                analiziYapanlar = v.Values.first('FieldPublicId', 'E7A7D5ABC5664D6B8CB8818C072D515A').Value,
                                analizStatu = v.Values.first('FieldPublicId', '9003BE1F18884767A35F7C061F2BB56E').SelectedItemPublicIds,
                                analizStatuAdi = v.Values.first('FieldPublicId', '9003BE1F18884767A35F7C061F2BB56E').Value;

                            var cihazId = v.Values.first('FieldPublicId', 'BADDEC1A5D8144B6B43F5AF877CF4BA8') !== null ? v.Values.first('FieldPublicId', 'BADDEC1A5D8144B6B43F5AF877CF4BA8').SelectedItemPublicIds : "",
                                cihaz = v.Values.first('FieldPublicId', 'BADDEC1A5D8144B6B43F5AF877CF4BA8') !== null ? v.Values.first('FieldPublicId', 'BADDEC1A5D8144B6B43F5AF877CF4BA8').Value : "";

                            newRow.append($('<td style="text-align: left;" class="col-md-2"/>')
                                .text(++i));
                            newRow.append($('<td style="text-align: left;" class="col-md-2"/>')
                                .text(analizAdi));
                            newRow.append($('<td style="text-align: left;" class="col-md-2"/>')
                                .text(kaynakAdi));
                            newRow.append($('<td style="text-align: left;" class="col-md-2"/>')
                                .text(methodKoduAdi));
                            newRow.append($('<td style="text-align: left;" class="col-md-2"/>')
                                .text(parametreAdi));

                            newRow.append($('<td style="text-align: left;" class="col-md-2"/>')
                                .append('<div id="birimSeti_' + satirId + '" style="width:100%;" class="birimSeti"></div>'));
                            newRow.append($('<td style="text-align: left;" class="col-md-2"/>')
                                .append('<div id="cihaz_' + satirId + '" style="width:100%;" class="cihaz"></div>'));
                            // newRow.append($('<td style="text-align: left;" class="col-md-2"/>')
                            //     .append('<input data-mouseleave="true" type="text" id="lod_' + satirId + '" style="width:100%;" value="' + lod + '" placeholder="099,99" maxlength="6" style="text-align: right;" class="lod form-control"></div>'));
                            // newRow.append($('<td style="text-align: left;" class="col-md-2"/>')
                            //     .append('<input data-mouseleave="true" type="text" id="loq_' + satirId + '" style="width:100%;" value="' + loq + '" placeholder="099999999999" maxlength="12" style="text-align: right;" class="loq form-control"></div>'));
                            newRow.append($('<td style="text-align: left;" class="col-md-2"/>')
                                .append('<input data-mouseleave="true" type="text" id="olcumBelirsizligi_' + satirId + '" style="width:100%;" value="' + olcumBelirsizligi + '" maxlength="450" class="olcumBelirsizligi form-control"></div>'));
                            newRow.append($('<td style="text-align: left;" class="col-md-2"/>')
                                .append('<input data-mouseleave="true" type="text" id="deger_' + satirId + '" style="width:100%;" value="' + (deger !== '' ? deger : '') + '" data-old-value="' + (deger !== '' ? deger : '') + '" placeholder="099999999999" maxlength="12" style="text-align: right;" class="deger form-control"></div>'));
                            newRow.append($('<td style="text-align: left;" class="col-md-2"/>')
                                .append('<input data-mouseleave="true" type="text" id="raporDegeri_' + satirId + '" style="width:100%;" value="' + raporDegeri + '" maxlength="450" class="sonuc form-control"></div>'));
                            // newRow.append($('<td style="text-align: left;" class="col-md-2"/>')
                            //     .append('<input data-mouseleave="true" type="text" id="sonucText_' + satirId + '" style="width:100%;" value="' + sonucText + '" maxlength="450" class="sonuc form-control"></div>'));
                            newRow.append($('<td style="text-align: left;" class="col-md-2"/>')
                                .append('<input data-mouseleave="true" type="text" id="sonuc_' + satirId + '" style="width:100%;" value="' + sonuc + '" maxlength="450" class="sonuc form-control"></div>'));
                            newRow.append($('<td style="text-align: left;" class="col-md-2"/>')
                                .append('<input data-mouseleave="true" type="text" id="analizTarihi_' + satirId + '" style="width:100%;" value="' + analizTarihi + '" autocomplete="off" class="analizTarihi form-control"></div>'));
                            newRow.append($('<td style="text-align: left;" class="col-md-2"/>')
                                .append('<div id="analiziYapan_' + satirId + '" style="width:100%;" class="analiziYapan"></div>'));
                            newRow.append($('<td style="text-align: left;" class="col-md-2"/>')
                                .append('<div id="analizStatu_' + satirId + '" style="width:100%;" class="analizStatu"></div>'));

                            tbody.append(newRow);
                            newTbl.append(tbody);
                            $('#modalSonucGir .modal-body #sonucGirTbl').append(newTbl);


                            prepareSelect2('#analiziYapan_' + satirId, '/Summary/organizationalunititems', {
                                publicId: 'E7A7D5ABC5664D6B8CB8818C072D515A',
                                name: 'User',
                                filterType: 'User',
                            }, null, true);

                            // prepareSelect2('#cihaz_' + satirId, '/Summary/LookupFieldValues', {
                            //     coId: '76CE86534F3A4DD29EF9FB54003E836C',
                            //     id: 'DCC84C555DAA4CA5BFD13F97B0B3251F',
                            //     viewFilterId: '8F65C01AFC7A453580D36D2C2C1B3C5C'
                            // }, null, false);

                            prepareSelect2('#analizStatu_' + satirId, '/Summary/fielditems', {
                                id: '9003BE1F18884767A35F7C061F2BB56E'
                            }, null, false);
                            prepareSelect2('#cihaz_' + satirId, '/Summary/LookupFieldValues', {
                                coId: '76CE86534F3A4DD29EF9FB54003E836C',
                                id: 'BADDEC1A5D8144B6B43F5AF877CF4BA8',
                                viewFilterId: '8655119F79D04840A101B95E7FD2242F',
                                controllingRecordId: methodKodu,
                                itemId: 'BADDEC1A5D8144B6B43F5AF877CF4BA8',
                                groupIds: methodKodu
                            }, null, false);

                            prepareSelect2('#birimSeti_' + satirId, '/Summary/LookupFieldValues', {
                                coId: '76CE86534F3A4DD29EF9FB54003E836C',
                                id: 'D7523D0C0DE34333972443BC585DE68F',
                                viewFilterId: 'AD5B6930403D4944BC01967D31D72C4D'
                            }, null, false);


                            if (analiziYapan !== '') {
                                prepareSelect2SelectedOneItem('#analiziYapan_' + satirId, analiziYapan, analiziYapanlar, true);
                            }

                            if (analizStatu !== '') {
                                prepareSelect2SelectedOneItem('#analizStatu_' + satirId, analizStatu, analizStatuAdi, false);
                            }

                            if (cihaz !== '') {
                                prepareSelect2SelectedOneItem('#cihaz_' + satirId, cihazId, cihaz, false);
                            }

                            if (birimSetiAdi !== '') {
                                prepareSelect2SelectedOneItem('#birimSeti_' + satirId, birimSetiId, birimSetiAdi, false);
                            }

                        });

                        $("#modalSonucGir").find("#txt, #tbl").hide();
                        $("#btn-sonuc-gir-other-lr").show();
                        $('.analizTarihi').datetimepicker({
                            inline: false,
                            closeOnDateSelect: true,
                            timepicker: true,
                            format: 'd.m.Y H:i:s',
                            mask: false,
                            scrollMonth: false,
                            scrollTime: false,
                            scrollInput: false
                        });
                        $("#modalSonucGir .modal-body input[type=text]").attr("style",
                            "transition: transform 0.2s ease 0s;");
                        $("input[data-mouseleave=true]").mouseenter(function() {
                            $(this).css({
                                "transform": "scale(1.5)",
                                "z-index": "9999",
                                "width": "200px",
                                "position": "absolute",
                                "font-size": "12px",
                            });
                        }).mouseleave(function() {
                            $(this).css({
                                "transform": "",
                                "z-index": "",
                                "width": "100%",
                                "position": "",
                                "font-size": "",
                            });
                            if ($(this).hasClass('deger')) {
                                var val = parseInt($(this).val()),
                                    oldValue = parseInt($(this).data('old-value')),
                                    tr = $(this).closest('tr'),
                                    sonuc = tr.find('.sonuc'),
                                    //zeynep deniyor.
                                    analizStatu = tr.find('.analizStatu'),
                                    analiziYapan = tr.find('.analiziYapan');
                                if (val !== oldValue) {
                                    $(this).attr('data-old-value', val);
                                    prepareSelect2SelectedOneItem(analizStatu, "1D6A7EEA24F34A818D34DAFFFA2C3FBA", "Analiz Tamamlandı", false);
                                    var columns = [];
                                    var value = analiziYapan.select2('data');
                                    $.each(value, function(i, v) {
                                        columns.push({
                                            id: v.id,
                                            text: v.text
                                        });
                                    });
                                    columns.push({
                                        id: userData.id,
                                        text: userData.name
                                    });
                                    analiziYapan.select2('data', columns).trigger('change');
                                }
                            }
                        });

                        // $('.analiz, .kaynak, .methodKodu, .parametre, .birimSeti').select2('enable',
                        //     false);
                        //$('.sonuc').prop("disabled",
                        //true);
                    } else {
                        $("#modalSonucGir").find("#txt, #tbl").hide();
                        setUtil.alert({
                            container: '#modalSonucGir .modal-body #error-message',
                            message: 'Kayıt(lar) getirelemedi, lütfen daha sonra tekrar deneyiniz!',
                            alertClass: 'alert-danger',
                            autoClose: false
                        });
                    }
                });
            $("#modalSonucGir").modal("toggle");
        });

    $("body").on("click", "#btn-sonuc-gir", function() {
        var btn = $(this);

        btn.prop('disabled',
            true).hide();
        $("#sonucGirTbl").hide();
        $("#txt").show();

        var model = {
            TopluSonucGirList: []
        };

        $("#newTbl tbody tr").each(function(i, v) {
            var $this = $(this),
                recordId = $this.data('id'),
                deger = $("#deger_" + recordId).val(),
                sonuc = $("#sonuc_" + recordId).val(),
                //zeynep deniyor.
                analizTarihi = $("#analizTarihi_" + recordId).val(),
                analiziYapan = $("#analiziYapan_" + recordId).val(),
                analizStatusu = $("#analizStatu_" + recordId).val(),
                birimSeti = $("#birimSeti_" + recordId).val(),
                cihaz = $("#cihaz_" + recordId).val();

            model.TopluSonucGirList.push({
                RecordId: recordId,
                Deger: deger,
                Sonuc: sonuc, //zeynep deniyor.
                AnalizTarihi: analizTarihi, //erkan bekliyor.
                AnaliziYapan: analiziYapan,
                AnalizStatu: analizStatusu,
                Cihaz: cihaz,
                BirimSeti: birimSeti
            });
        });


        var url = "https://meyicki.setcrm.com/api/data/AnalizTopluSonucGir";
        var localUrl = "http://localhost:50058/api/data/AnalizTopluSonucGir";
        $.post(url,
            model,
            function(r) {
                $("#txt").hide();
                if (r.Status) {
                    // setUtil.alert({
                    //     container: '#modalSonucGir .modal-body #error-message',
                    //     message: "İşlem başarıyla gerçekleştirildi.",
                    //     alertClass: 'alert-success',
                    //     autoClose: false
                    // });
                    window.location.reload();
                } else {
                    setUtil.alert({
                        container: '#modalSonucGir .modal-body #error-message',
                        message: r.Message,
                        alertClass: 'alert-danger',
                        autoClose: false
                    });
                    $("#sonucGirTbl").show();
                    btn.prop('disabled', false).show();
                }
            }
        );
    });

    $("body").on("click", "#btn-sonuc-gir-other-lr", function() {
        var btn = $(this);

        btn.prop('disabled',
            true).hide();
        $("#sonucGirTbl").hide();
        $("#txt").show();

        var model = {
            TopluSonucGirList: []
        };

        $("#newTbl tbody tr").each(function(i, v) {
            var $this = $(this),
                recordId = $this.data('id'),
                deger = $("#deger_" + recordId).val(),
                sonuc = $("#sonuc_" + recordId).val(),
                //sonucText = $("#sonucText_" + recordId).val(),
                olcumBelirsizligi = $("#olcumBelirsizligi_" + recordId).val(),
                analizTarihi = $("#analizTarihi_" + recordId).val(),
                analiziYapan = $("#analiziYapan_" + recordId).val(),
                analizStatusu = $("#analizStatu_" + recordId).val(),
                birimSeti = $("#birimSeti_" + recordId).val(),
                cihaz = $("#cihaz_" + recordId).val(),
                raporDegeri = $("#raporDegeri_" + recordId).val()

            model.TopluSonucGirList.push({
                RecordId: recordId,
                Deger: deger,
                Sonuc: sonuc, //zeynep deniyor.
                //SonucText: sonucText,
                AnalizTarihi: analizTarihi,
                AnaliziYapan: analiziYapan,
                AnalizStatu: analizStatusu,
                Cihaz: cihaz,
                BirimSeti: birimSeti,
                OlcumBelirsizligi: olcumBelirsizligi,
                RaporDegeri: raporDegeri
            });
        });


        var url = "https://meyicki.setcrm.com/api/data/AnalizTopluSonucGir";
        var localUrl = "http://localhost:50058/api/data/AnalizTopluSonucGir";
        $.post(localUrl,
            model,
            function(r) {
                $("#txt").hide();
                if (r.Status) {
                    // setUtil.alert({
                    //     container: '#modalSonucGir .modal-body #error-message',
                    //     message: "İşlem başarıyla gerçekleştirildi.",
                    //     alertClass: 'alert-success',
                    //     autoClose: false
                    // });
                    window.location.reload();
                } else {
                    setUtil.alert({
                        container: '#modalSonucGir .modal-body #error-message',
                        message: r.Message,
                        alertClass: 'alert-danger',
                        autoClose: false
                    });
                    $("#sonucGirTbl").show();
                    btn.prop('disabled', false).show();
                }
            }
        );
    });
});