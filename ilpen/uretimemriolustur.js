$(function() {
    var filterId = $("#FilterId").val();
    if (filterId === "F2C0F857F7F34957973F0015FD3CCF91") {
        $(".well-xxs:first .pull-right").prepend("<button type='button' class='btn btn-info btn-sm btn-malzeme-ihtiyac-listesi'>Malzeme ihtiyaç Listesi Görüntüle</button>");
        $(".btn-malzeme-ihtiyac-listesi").hover(
            function() {
                var count = $(".vf-check:checked").length;
                if (count === 0) {
                    $(".btn-malzeme-ihtiyac-listesi").attr({
                        "data-toggle": "tooltip",
                        "data-placement": "top",
                        "data-original-title": String.format("En az 1 adet kayıt seçmelisiniz!")
                    });
                    $(".btn-malzeme-ihtiyac-listesi").tooltip('show');
                }
                $(".btn-malzeme-ihtiyac-listesi").removeAttr("data-toggle data-placement data-original-title");
            }
        );

        $(".table-responsive table thead tr").each(function(i, v) {
            $(v).prepend("<th><input type='checkbox' class='vf-all-check-toggle' style='margin-left:3px;margin-right:3px;'></th>");
            $(v).find('th[data-id=5950EFF620F04CC9A136E331824913A1]').text('Onaylanan Limit');
        });

        $(".table-responsive table tbody tr").each(function(i, v) {
            $(v).prepend("<th><input type='checkbox' class='vf-check' data-id='" + $(v).data('id') + "' style='margin-left:3px;margin-right:3px;'></th>");
            //<input type="number" class="form-control" min="0">
            $(v).find('td[data-id=5950EFF620F04CC9A136E331824913A1]').html(String.format('<div class="form-group vf-custom-page-item" data-istable="True" data-tableid="" data-fieldtype="Number" data-inputtype="text" data-maxlength="12" data-decimalplaces="0" data-inputmaskpattern="###.###.###.##0" data-controllingpublicid="" data-lookupobjectid="" data-lookupobjectname="" data-lookupobjecturl="" data-lookupfieldids="" data-selecteditempublicids="" data-organizationalunitname="" data-organizationalunitfiltertype="" data-organizationalunitgrouppublicids="" data-organizationalunitdepth="0" data-organizationalunitincludeitself="False" data-ismultiplevalue="False" data-isradio="False" data-isrequired="False" data-isunique="False" data-isuniqueintable="False" data-isactive="True" data-isclientcalculate="False" data-iscalculateonclientchange="False" data-ischeckunchanged="False" data-isuniquecheckclientcalculate="False" data-calculatetriggerfieldpublicids="" data-isthousandseparator="True" data-formulaname="" data-formulatext="" data-predefinedpublicid="" data-predefineddependencypublicid="" data-viewfilterpublicid="" data-publicid="adet_{0}" data-value="{1}"></div>', i, $(v).find('td[data-id=E986875FBF874C24965C6B7F24960C15]').data("value")));
        });

        $('.vf-custom-page-item').setForm({
            prefix: '.vf-custom-page-item',
            customObjectId: '047B88C719DC4B3190147F7DB8191939',
            recordPublicId: ''
        });

        $(".vf-all-check-toggle").on("change",
            function() {
                var checkBoxes = $(".vf-check");
                checkBoxes.prop("checked", !checkBoxes.prop("checked"));
            });

        var groupProducts = [],
            loopProducts = [],
            nongroupProducts = [],
            uretimTalepleri = [],
            uretimTalepleriIds = [],
            siraNo = 0,
            records = [],
            malzemeIhtiyacListesi = [];
        $("body").on("click",
            ".btn-malzeme-ihtiyac-listesi",
            function() {

                if ($(".vf-check:checked").length === 0) {
                    return;
                }

                $('#modalIhtiyac').remove();
                window.setModal.Create({
                    id: 'modalIhtiyac',
                    html: {
                        header: '<i class="fa fa-search"></i> Malzeme İhtiyaç Listesi',
                        body: '<div id="step1"></div><div id="step2" style="display:none;"></div>',
                        footer: '<button type="button" class="btn btn-sm btn-success" style="display:none;" id="btnUretimEmriOlustur">Üretim Emri Oluştur</button><button data-dismiss="modal" class="btn btn-danger btn-sm">Kapat</button>'
                    },
                    settings: {
                        widthClass: 'modal-full-width'
                    }
                });
                $('#modalIhtiyac').modal("toggle");

                // $('#modalIhtiyac .modal-dialog').css('width', '80%');

                $(".table-responsive table tbody tr").each(function(index, v) {
                    if (!$(v).find('th:first input').is(':checked')) return;

                    records.push($(v).data('id'));

                    var urunKodu = $(v).find('td[data-id=FDF78B61FCF44F1AB2605AD09DF410FE]').data('value'),
                        adet = $(v).find('td[data-id=5950EFF620F04CC9A136E331824913A1] input').val(),
                        uretimtalepId = $(v).find('td[data-id=605ED0B982854A8DBEA75EAE48F07A07]').data('value'),
                        uretimtalepText = $(v).find('td[data-id=605ED0B982854A8DBEA75EAE48F07A07]').data('text'),
                        toplamTalepEdilenMiktar = 0;

                    var x = loopProducts.find(f => f.urunKodu == urunKodu);
                    loopProducts.push({
                        index: siraNo,
                        urunKodu: urunKodu
                    });

                    if (!String.isNullOrWhiteSpace(uretimtalepId)) {
                        if ($.inArray(uretimtalepId, uretimTalepleriIds) > -1) {} else {
                            uretimTalepleriIds.push(uretimtalepId);
                            uretimTalepleri.push({
                                id: uretimtalepId,
                                text: uretimtalepText
                            });
                        }
                    }

                    nongroupProducts.push({
                        id: $(v).data('id'),
                        urun: $(v).find('td[data-id=FDF78B61FCF44F1AB2605AD09DF410FE]').text().trim(),
                        urunKodu: $(v).find('td[data-id=FDF78B61FCF44F1AB2605AD09DF410FE]').text().trim().split('-').first().trim(),
                        toplam: adet,
                        talepEdildi: $(v).find('td[data-id=E986875FBF874C24965C6B7F24960C15]').data('value')
                    });

                    if (String.isNullOrWhiteSpace(x)) {
                        groupProducts[siraNo] = [];
                        groupProducts[siraNo].push({
                            id: $(v).data('id'),
                            urun: $(v).find('td[data-id=FDF78B61FCF44F1AB2605AD09DF410FE]').text().trim(),
                            urunKodu: $(v).find('td[data-id=FDF78B61FCF44F1AB2605AD09DF410FE]').data("value"),
                            toplam: adet,
                            itemCount: 1,
                            isChanged: false,
                            Products: []
                        });
                        groupProducts[siraNo].Products = [];
                    } else {
                        toplamTalepEdilenMiktar = parseFloat(groupProducts[x.index][0].toplam.toString().replace('.', '')) + parseFloat(adet.toString().replace('.', ''));
                        groupProducts[x.index][0].toplam = toplamTalepEdilenMiktar;
                        groupProducts[x.index][0].isChanged = true;
                        groupProducts[x.index][0].id += "|" + $(v).data('id');
                        groupProducts[x.index][0].itemCount = groupProducts[x.index][0].itemCount + 1;
                    }
                    groupProducts[(x === undefined ? siraNo : x.index)].Products.push({
                        talepEdildi: $(v).find('td[data-id=E986875FBF874C24965C6B7F24960C15]').data('value'),
                        recordId: $(v).data('id'),
                        onaylanan: adet
                    });

                    if (String.isNullOrWhiteSpace(x)) {
                        siraNo++;
                    }
                });
                var container = $('#step1'),
                    newTbl = $('<table id="newTbl" class="table table-bordered table-hover" style="font-size:15px;" />'),
                    thead = $('<thead class="table" style="background-color:#5BC0DE" />'),
                    tbody = $('<tbody />');
                container.append(newTbl);

                thead.append($('<tr/>', {
                    style: 'background: #5BC0DE;font-weight:bold;'
                }));
                var theadTr = thead.find('tr');
                theadTr.append($("<th style='width:40px;'/>"));
                theadTr.append($("<th/>", {
                    style: 'padding:5px;'
                }).text("Ürün"));
                theadTr.append($("<th/>").text("Toplam"));

                newTbl.append(theadTr);
                $.each(groupProducts,
                    function(i, v) {

                        malzemeIhtiyacListesi.push({
                            parentGroupProduct: v,
                            urunKodu: v[0].urun.split('-').first().trim(),
                            urun: v[0].urun
                        });

                        var newRow = $('<tr />', {
                            'data-id': i
                        });
                        newRow.append($("<td/>").text(i + 1));
                        if (v[0].itemCount > 1) {
                            newRow.append($("<td/>").html(String.format('{0} <span class="badge badge-warning" style="margin-left:10px;"><i class="fa fa-info-circle"></i> {1} adet ürün otomatik olarak gruplandı.</span>', v[0].urun, v[0].itemCount)));
                        } else {
                            newRow.append($("<td/>").text(v[0].urun));
                        }

                        newRow.append($("<td/>").text(turkishLanguagePriceFormatedOutput(parseFloat(v[0].toplam.toString().replace('.', '')))));
                        tbody.append(newRow);

                        var guid = i;
                        tbody.append($("<tr/>", {
                            id: String.format('detailrow_{0}', guid),
                            "style": "display:none;background: rgb(212 190 35);"
                        }).append($("<td/>", {
                            colspan: "3",
                            style: "padding-left: 2%;padding-bottom: 0;"
                        }).append($("<table/>", {
                            class: 'table table-bordered table-hover',
                            style: 'margin-bottom: 8px !important;'
                        }))));

                        var detailRow = tbody.find(String.format("#detailrow_{0} td table",
                                guid)),
                            detailRowThead = $("<thead/>", {
                                'style': 'background:#a5d9e8 !important'
                            }),
                            detailRowTbody = $("<tbody/>");
                        detailRow.append(detailRowThead.append('<tr/>')).append(detailRowTbody);

                        var appendThead = detailRow.find('thead'),
                            appendTbody = detailRow.find('tbody');

                        $.each(["", "Talep Edildi", "Onaylanan"], function(indx,
                            val) {
                            appendThead.find('tr').append($('<th/>', {
                                    'data-index': indx,
                                    'style': 'padding:5px'
                                })
                                .append(val));
                        });

                        $.each(v.Products, function(o, y) {
                            var $tr = $('<tr/>', {
                                'data-index': o,
                                'data-id': v[0].id
                            });
                            appendTbody.append($tr.append($("<td/>", {
                                width: 50
                            }).html(String.format("{0}.{1}", i + 1, o + 1))).append($("<td/>").html('<div class="form-group page-item2 left-column" data-istable="False" data-tableid="" data-fieldtype="Number" data-inputtype="text" data-maxlength="12" data-decimalplaces="0" data-inputmaskpattern="###.###.###.##0" data-controllingpublicid="" data-lookupobjectid="" data-lookupobjectname="" data-lookupobjecturl="" data-lookupfieldids="" data-selecteditempublicids="" data-organizationalunitname="" data-organizationalunitfiltertype="" data-organizationalunitgrouppublicids="" data-organizationalunitdepth="0" data-organizationalunitincludeitself="False" data-ismultiplevalue="False" data-isradio="False" data-isrequired="True" data-isunique="False" data-isactive="True" data-isdisabled="True" data-isclientcalculate="False" data-iscalculateonclientchange="False" data-ischeckunchanged="False" data-isuniquecheckclientcalculate="False" data-istablerollup="False" data-isnoteditable="False" data-rolluptable="" data-rollupfield="" data-rollupformula="" data-calculatetriggerfieldpublicids="" data-isthousandseparator="True" data-formulaname="TALEP_EDILEN_ADET" data-formulatext="" data-predefinedpublicid="" data-predefineddependencypublicid="" data-viewfilterpublicid="" data-publicid="' + String.format("{0}_{1}_left", i, o) + '" data-value="' + y.talepEdildi + '" data-property="">')).append($("<td/>").append('<div class="form-group page-item2 right-column" data-istable="False" data-tableid="" data-fieldtype="Number" data-inputtype="text" data-maxlength="12" data-decimalplaces="0" data-inputmaskpattern="###.###.###.##0" data-controllingpublicid="" data-lookupobjectid="" data-lookupobjectname="" data-lookupobjecturl="" data-lookupfieldids="" data-selecteditempublicids="" data-organizationalunitname="" data-organizationalunitfiltertype="" data-organizationalunitgrouppublicids="" data-organizationalunitdepth="0" data-organizationalunitincludeitself="False" data-ismultiplevalue="False" data-isradio="False" data-isrequired="True" data-isunique="False" data-isactive="True" data-isdisabled="True" data-isclientcalculate="False" data-iscalculateonclientchange="False" data-ischeckunchanged="False" data-isuniquecheckclientcalculate="False" data-istablerollup="False" data-isnoteditable="False" data-rolluptable="" data-rollupfield="" data-rollupformula="" data-calculatetriggerfieldpublicids="" data-isthousandseparator="True" data-formulaname="TALEP_EDILEN_ADET" data-formulatext="" data-predefinedpublicid="" data-predefineddependencypublicid="" data-viewfilterpublicid="" data-publicid="' + String.format("{0}_{1}_right", i, o) + '" data-productid="' + v[0].urunKodu + '" data-recordid="' + y.recordId + '" data-parentid="' + v[0].id + '" data-talepedildi="' + y.talepEdildi + '" data-value="' + y.onaylanan + '" data-property="">')));
                        });

                        detailRow.append(appendTbody);

                        newTbl.append(tbody);

                    });
                newTbl.append(tbody);

                var urunKodlari = "";
                $.each(nongroupProducts,
                    function(i, v) {

                        if (i === (nongroupProducts.length - 1)) {
                            urunKodlari += v.urunKodu;
                            var localUrl = "http://localhost:5555/api/data/GetRecete?urunKodlari=" + urunKodlari;
                            var realUrl = "https://ilpenwebapi.setcrm.com/api/data/GetRecete?urunKodlari=" + urunKodlari;
                            $.get(realUrl, "",
                                function(r) {
                                    $(".btn-stok-adeti").show();
                                    $('#modalIhtiyac').find('.modal-body #txt').hide();
                                    if (r.Status) {
                                        $("#btnUretimEmriOlustur").show();
                                        if (r.list.length > 0) {

                                            var appendDiv = $('#malzemeIhtiyacBilgisi');
                                            appendDiv.append('<table class="table table-bordered table-hover" style="font-size:15px;"><thead><tr style="background: #5BC0DE;font-weight:bold;"><td style="padding:5px;width:40px"></td><td>Yarı Mamül</td><td>İhtiyaç Adedi</td><td>Stok Adedi</td><td>Gelecek Adet</td></tr></thead><tbody></tbody></table>');
                                            var loopYariMamulArray = [],
                                                groupYariMamul = [],
                                                indexno = "";

                                            $.each(r.list, function(i, v) {

                                                var malzemeIhtiyac = nongroupProducts.find(f => f.urunKodu == v.m_Item1),
                                                    urunText = malzemeIhtiyac.urun,
                                                    bg = getRandomLightColor();


                                                if (i > 0) {
                                                    indexno = indexno;
                                                } else {
                                                    indexno = 0;
                                                }
                                                $.each(v.m_Item2, function(o, g) {
                                                    var y = loopYariMamulArray.find(f => f.girdiKodu == g.GirdiKodu);
                                                    loopYariMamulArray.push({
                                                        index: indexno,
                                                        girdiKodu: g.GirdiKodu
                                                    });

                                                    if (y === undefined) {
                                                        groupYariMamul[indexno] = [];
                                                        groupYariMamul[indexno].push({
                                                            id: String.newGuid(),
                                                            itemCount: 1,
                                                            background: bg
                                                        });
                                                        groupYariMamul[indexno].Products = [];
                                                    }

                                                    groupYariMamul[(y === undefined ? indexno : y.index)].Products.push(g);

                                                    if (y === undefined) {
                                                        indexno++;
                                                    }
                                                });
                                            });

                                            $.each(groupYariMamul, function(p,
                                                l) {

                                                var toplam = 0,
                                                    kullanilanUrunler = "",
                                                    kullanilanUrunId = "",
                                                    ischangedCount = 0,
                                                    loopIsChanged = false;

                                                const key = 'CiktiKodu';
                                                const arrayUniqueByKey = [...new Map(l.Products.map(item => [item[key], item])).values()];
                                                $.each(arrayUniqueByKey,
                                                    function(i, v) {
                                                        var product = malzemeIhtiyacListesi.find(f => f.urunKodu === v.CiktiKodu),
                                                            urun = "";
                                                        kullanilanUrunId += product.parentGroupProduct[0].urunKodu + "|";

                                                        if (product.parentGroupProduct[0].isChanged) {
                                                            loopIsChanged = true;
                                                        } else {
                                                            ischangedCount = 0;
                                                        }

                                                        if (ischangedCount > 2) {
                                                            return;
                                                        }
                                                        var xyz = parseFloat(product.parentGroupProduct[0].toplam.toString().replace('.', ''));
                                                        toplam += xyz * parseFloat(v.GirdiMiktari.replace('.', ''));
                                                        $.each(product.parentGroupProduct.Products, function(s, x) {
                                                            if (s === 0) urun += v.CiktiKodu + ",";
                                                        });
                                                        kullanilanUrunler += urun;
                                                    });

                                                kullanilanUrunler = kullanilanUrunler.substring(0, kullanilanUrunler.length - 1);
                                                kullanilanUrunId = kullanilanUrunId.substring(0, kullanilanUrunId.length - 1);
                                                appendDiv.find('tbody').append($("<tr/>", {
                                                        'style': String.format('background-color:{0}', l[0].background)
                                                    })
                                                    .append($("<td/>").text(String.format("{0}", p + 1)))
                                                    .append($("<td/>", {
                                                        'data-name': l.Products[0].GirdiAdi,
                                                        'data-girdiozelkod': l.Products[0].GirdiOzelKod,
                                                        'data-girdiozelkod2': l.Products[0].GirdiOzelKod2,
                                                        'data-girdiozelkod3': l.Products[0].GirdiOzelKod3,
                                                        'data-products': kullanilanUrunId,
                                                        'data-girdikodu': l.Products[0].GirdiKodu,
                                                    }).html(l.Products.length > 1 ? String.format('{0} - {1} <span class="badge badge-info" style="margin-left:10px;"><i class="fa fa-border-all"></i> {2}</span> <span class="badge badge-warning" style="margin-left:10px;"><i class="fa fa-info-circle"></i> {3} adet yarı mamül otomatik olarak gruplandı.</span>', l.Products[0].GirdiKodu, l.Products[0].GirdiAdi, kullanilanUrunler, l.Products.length) : String.format('{0} - {1} <span class="badge badge-info" style="margin-left:10px;"><i class="fa fa-border-all"></i> {2}</span> ', l.Products[0].GirdiKodu, l.Products[0].GirdiAdi, kullanilanUrunler)))
                                                    .append($("<td/>").text(turkishLanguagePriceFormatedOutput(toplam)))
                                                    .append($("<td/>").text(l.Products[0].StokAdedi))
                                                    .append($("<td/>").text(l.Products[0].GelecekAdet)));
                                            });
                                        } else {
                                            setUtil.alert({
                                                container: '#modalIhtiyac .modal-body #message-block',
                                                message: 'Seçtiğiniz ürün(ler)e ait recete bulunamadı!',
                                                alertClass: 'alert-danger',
                                                autoClose: false
                                            });
                                        }
                                    } else {
                                        setUtil.alert({
                                            container: '#modalIhtiyac .modal-body #message-block',
                                            message: 'Malzeme ihtiyaç listesi getirilirken bir hata oluştu!',
                                            alertClass: 'alert-danger',
                                            autoClose: false
                                        });
                                    }
                                }
                            );
                        } else {
                            urunKodlari += v.urunKodu + "|";
                        }
                    });

                $('#modalIhtiyac').find('.modal-body #step1').html(newTbl);
                $('#modalIhtiyac').find('.modal-body #step1').append('<div class="green-banner" style="background-color: green;color: white;padding: 8px;font-weight: bold;letter-spacing: 0.5px;/* float: left; */height: 50px;vertical-align: middle;display: flex;justify-content: space-between;align-items: center;"><div><i class="fa fa-search" style="margin-right: 5px;"></i> Malzeme İhtiyaç Listesi</div><div class="pull-right"><button type="button" class="btn btn-warning btn-sm btn-stok-adeti" style="display:none;"><i class="fa fa-sync"></i> Stok Adedi ve Gelecek Adet Değerlerini Getir</button></div></div>');
                $('#modalIhtiyac').find('.modal-body #step1').append('<div id="message-block" style="margin-top:10px;"><div><div id="malzemeIhtiyacBilgisi"></div><div id="txt" style="margin:0 0 5px; width: 100%;margin-top: 10px;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div><div id="txt2" style="margin:0 0 5px; width: 100%;margin-top: 10px;display:none;">Yarı mamüllerin Stok Adetleri ve Gelecek Adetleri getiriliyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>');
                var arr = [];
                $.each(uretimTalepleri,
                    function(i, v) {
                        arr.push(v);
                    });
                localStorage.setItem('arr',
                    JSON.stringify(arr));
                $('#modalIhtiyac').find('.modal-body #step2').html('<iframe src="/set/new/uretim-emirleri?iframe=true" id="frameUretimEmirleri" style="width:100%;height:450px;border:none;" frameborder="0"></iframe>');
                var recordId = "";
                $('#frameUretimEmirleri').on("load",
                    function() {
                        recordId = $("#frameUretimEmirleri").contents().find('#RecordPublicId').val();
                        if (!String.isNullOrWhiteSpace(recordId)) {
                            // $('#modalIhtiyac .modal-dialog').removeClass('modal-full-width').addClass('modal-md');
                            $("#modalIhtiyac .modal-dialog").animate({
                                width: '30%'
                            }, 400);
                            $("#modalIhtiyac .modal-body #step1, #modalIhtiyac .modal-body #step2, #btnUretimEmriOlustur").hide();
                            $("#modalIhtiyac .modal-body").prepend('<div id="txt" style="margin:0 0 5px; width: 100%;">Üretim Emri tanımı oluşturuldu, kalan işlemler tamamlanıyor. Lütfen bekleyiniz.<br/> <img src="/Public/img/loading_bar.gif"></div><br><a target="_blank" class="btn btn-success btn-sm" href="/set/uretim-emirleri/detail/' + recordId + '"><i class="fas fa-external-link-alt"></i> Üretim Emri </a>');
                            var onaylananLimitListesi = [],
                                yariMamulListesi = [];
                            $(".page-item2:not(.left-column)").each(function(i, v) {
                                var parentIds = $(v).data('parentid');
                                onaylananLimitListesi.push({
                                    UrunKodu: $(v).data('productid'),
                                    OnaylananLimit: String.isNullOrWhiteSpace($(v).find('input').val()) ? "0" : $(v).find('input').val(),
                                    TalepEdilenLimit: $(v).data('talepedildi'),
                                    UrunTalebiUrunId: $(v).data('parentid'),
                                    RecordId: $(v).data('recordid')
                                });
                            });

                            $("#malzemeIhtiyacBilgisi table tbody tr").each(function(i, v) {
                                yariMamulListesi.push({
                                    Sira: $(v).find('td:eq(0)').text().trim(),
                                    UrunIds: $(v).find('td:eq(1)').data('products'),
                                    UrunKod: $(v).find('td:eq(1) span:first').text().trim(),
                                    YariMamul: $(v).find('td:eq(1)').data('name'),
                                    YariMamulKod: $(v).find('td:eq(1)').text().split('-').first().trim(),
                                    IhtiyacAdedi: $(v).find('td:eq(2)').text().trim(),
                                    StokAdedi: $(v).find('td:eq(3)').text().trim(),
                                    GelecekAdet: $(v).find('td:eq(3)').text().trim(),
                                    GirdiOzelKod: $(v).find('td:eq(1)').data('girdiozelkod'),
                                    GirdiOzelKod2: $(v).find('td:eq(1)').data('girdiozelkod2'),
                                    GirdiOzelKod3: $(v).find('td:eq(1)').data('girdiozelkod3')
                                });
                            });

                            var model = {
                                UretimEmriId: recordId,
                                Records: records,
                                OnaylananLimitListesi: onaylananLimitListesi,
                                YariMamulListesi: yariMamulListesi,
                                CurrentUserId: userData.id
                            };

                            var realUrl = String.format("https://ilpenwebapi.setcrm.com/api/data/UretimEmriGuncelle"),
                                localUrl = String.format("http://localhost:55062/api/data/UretimEmriGuncelle");
                            $.post(realUrl, model,
                                function(r) {
                                    $("#modalIhtiyac .modal-body #txt").hide();
                                    $('#modalIhtiyac').find('.modal-body #msg').remove();
                                    $('#modalIhtiyac').find('.modal-body').prepend('<div id="msg"></div>');
                                    if (r.Status) {
                                        setUtil.alert({
                                            container: '#modalIhtiyac #msg',
                                            message: "İşlem başarılı",
                                            alertClass: 'alert-success',
                                            autoClose: false
                                        });
                                    } else {
                                        setUtil.alert({
                                            container: '#modalIhtiyac #msg',
                                            message: r.Message,
                                            alertClass: 'alert-danger',
                                            autoClose: false
                                        });
                                    }
                                }
                            );

                        }
                        $("#frameUretimEmirleri").contents().find('#navbarmenu, #btn_save_and_new').remove();
                        $("#frameUretimEmirleri").contents().find('.well-xxs:first, footer').hide();
                        $("#frameUretimEmirleri").contents().find('body').attr("style",
                            "padding-top:0 !important");
                    });
                $('.page-item2').setForm({
                    prefix: '.page-item2',
                    customObjectId: '047B88C719DC4B3190147F7DB8191939',
                    recordPublicId: ''
                });
            });


        function getRandomLightColor() {
            var letters = 'BCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * letters.length)];
            }
            return color;
        }


        $("body").on("click", ".btn-stok-adeti", function() {
            var butt = $(this),
                text = butt.text();
            $('#malzemeIhtiyacBilgisi').html('');
            butt.remove();
            $('.green-banner').css('height', 'auto');
            $('#modalIhtiyac').find('.modal-body #txt2').show();
            var urunKodlari = "";
            $.each(nongroupProducts,
                function(i, v) {

                    if (i === (nongroupProducts.length - 1)) {
                        urunKodlari += v.urunKodu;
                        var localUrl = "http://localhost:5555/api/data/GetReceteDetay?urunKodlari=" + urunKodlari;
                        var realUrl = "https://ilpenwebapi.setcrm.com/api/data/GetReceteDetay?urunKodlari=" + urunKodlari;
                        $.get(realUrl, "",
                            function(r) {
                                $('#modalIhtiyac').find('.modal-body #txt2').hide();
                                if (r.Status) {
                                    $("#btnUretimEmriOlustur").show();
                                    if (r.list.length > 0) {

                                        var appendDiv = $('#malzemeIhtiyacBilgisi');
                                        appendDiv.append('<table class="table table-bordered table-hover" style="font-size:15px;"><thead><tr style="background: #5BC0DE;font-weight:bold;"><td style="padding:5px;width:40px"></td><td>Yarı Mamül</td><td>İhtiyaç Adedi</td><td>Stok Adedi</td><td>Gelecek Adet</td></tr></thead><tbody></tbody></table>');
                                        var loopYariMamulArray = [],
                                            groupYariMamul = [],
                                            indexno = "";

                                        $.each(r.list, function(i, v) {

                                            var malzemeIhtiyac = nongroupProducts.find(f => f.urunKodu == v.m_Item1),
                                                urunText = malzemeIhtiyac.urun,
                                                bg = getRandomLightColor();


                                            if (i > 0) {
                                                indexno = indexno;
                                            } else {
                                                indexno = 0;
                                            }
                                            $.each(v.m_Item2, function(o, g) {
                                                var y = loopYariMamulArray.find(f => f.girdiKodu == g.GirdiKodu);
                                                loopYariMamulArray.push({
                                                    index: indexno,
                                                    girdiKodu: g.GirdiKodu
                                                });

                                                if (y === undefined) {
                                                    groupYariMamul[indexno] = [];
                                                    groupYariMamul[indexno].push({
                                                        id: String.newGuid(),
                                                        itemCount: 1,
                                                        background: bg
                                                    });
                                                    groupYariMamul[indexno].Products = [];
                                                }

                                                groupYariMamul[(y === undefined ? indexno : y.index)].Products.push(g);

                                                if (y === undefined) {
                                                    indexno++;
                                                }
                                            });
                                        });

                                        $.each(groupYariMamul, function(p,
                                            l) {

                                            var toplam = 0,
                                                kullanilanUrunler = "",
                                                kullanilanUrunId = "",
                                                ischangedCount = 0,
                                                loopIsChanged = false;

                                            const key = 'CiktiKodu';
                                            const arrayUniqueByKey = [...new Map(l.Products.map(item => [item[key], item])).values()];
                                            $.each(arrayUniqueByKey,
                                                function(i, v) {
                                                    var product = malzemeIhtiyacListesi.find(f => f.urunKodu === v.CiktiKodu),
                                                        urun = "";
                                                    kullanilanUrunId += product.parentGroupProduct[0].urunKodu + "|";

                                                    if (product.parentGroupProduct[0].isChanged) {
                                                        loopIsChanged = true;
                                                    } else {
                                                        ischangedCount = 0;
                                                    }

                                                    if (ischangedCount > 2) {
                                                        return;
                                                    }
                                                    var xyz = parseFloat(product.parentGroupProduct[0].toplam.toString().replace('.', ''));
                                                    toplam += xyz * parseFloat(v.GirdiMiktari.replace('.', ''));
                                                    $.each(product.parentGroupProduct.Products, function(s, x) {
                                                        if (s === 0) urun += v.CiktiKodu + ",";
                                                    });
                                                    kullanilanUrunler += urun;
                                                });

                                            kullanilanUrunler = kullanilanUrunler.substring(0, kullanilanUrunler.length - 1);
                                            kullanilanUrunId = kullanilanUrunId.substring(0, kullanilanUrunId.length - 1);
                                            appendDiv.find('tbody').append($("<tr/>", {
                                                    'style': String.format('background-color:{0}', l[0].background)
                                                })
                                                .append($("<td/>").text(String.format("{0}", p + 1)))
                                                .append($("<td/>", {
                                                    'data-name': l.Products[0].GirdiAdi,
                                                    'data-girdiozelkod': l.Products[0].GirdiOzelKod,
                                                    'data-girdiozelkod2': l.Products[0].GirdiOzelKod2,
                                                    'data-girdiozelkod3': l.Products[0].GirdiOzelKod3,
                                                    'data-products': kullanilanUrunId,
                                                    'data-girdikodu': l.Products[0].GirdiKodu,
                                                }).html(l.Products.length > 1 ? String.format('{0} - {1} <span class="badge badge-info" style="margin-left:10px;"><i class="fa fa-border-all"></i> {2}</span> <span class="badge badge-warning" style="margin-left:10px;"><i class="fa fa-info-circle"></i> {3} adet yarı mamül otomatik olarak gruplandı.</span>', l.Products[0].GirdiKodu, l.Products[0].GirdiAdi, kullanilanUrunler, l.Products.length) : String.format('{0} - {1} <span class="badge badge-info" style="margin-left:10px;"><i class="fa fa-border-all"></i> {2}</span> ', l.Products[0].GirdiKodu, l.Products[0].GirdiAdi, kullanilanUrunler)))
                                                .append($("<td/>").text(turkishLanguagePriceFormatedOutput(toplam)))
                                                .append($("<td/>").text(l.Products[0].StokAdedi))
                                                .append($("<td/>").text(l.Products[0].GelecekAdet)));
                                        });
                                    } else {
                                        setUtil.alert({
                                            container: '#modalIhtiyac .modal-body #message-block',
                                            message: 'Seçtiğiniz ürün(ler)e ait recete bulunamadı!',
                                            alertClass: 'alert-danger',
                                            autoClose: false
                                        });
                                    }
                                } else {
                                    setUtil.alert({
                                        container: '#modalIhtiyac .modal-body #message-block',
                                        message: 'Malzeme ihtiyaç listesi getirilirken bir hata oluştu!',
                                        alertClass: 'alert-danger',
                                        autoClose: false
                                    });
                                }
                            }
                        );
                    } else {
                        urunKodlari += v.urunKodu + "|";
                    }
                });
        });

        $("body").on("click", "#btnUretimEmriOlustur", function() {
            var x = $(this).text();
            if (x === "Üretim Emri Oluştur") {
                $(this).text("Malzeme İhtiyaç Listesi");
            } else {
                $(this).text("Üretim Emri Oluştur");
            }
            $(this).toggleClass('btn-success btn-warning')
            $("#step1").toggle();
            $("#step2").toggle();
        });

        $("body").on("click",
            "#newTbl tbody tr td",
            function() {
                var id = $(this).closest('tr').data('id'),
                    tr = $(this).closest('tr');
                if ($(this).find('input').hasClass("tool-check-package") || tr.hasClass("detail-row") || $(this).find('input').hasClass("tool-check")) return;
                $(String.format("#detailrow_{0}", id)).toggle();
            });

        function turkishLanguagePriceFormatedOutput(price, digit) {
            if (String.isNullOrWhiteSpace(digit)) {
                digit = 0;
            }

            var oldPrice = price;
            if (String.isNullOrWhiteSpace(price)) {
                price = "0";
            }

            var currency_symbol = "₺";
            var formattedOutput = new Intl.NumberFormat('tr-TR', {
                style: 'currency',
                currency: 'TRY',
                minimumFractionDigits: digit,
            });

            return isNaN(price) ? oldPrice : formattedOutput.format(price).replace(currency_symbol, '');
        }
    }
});