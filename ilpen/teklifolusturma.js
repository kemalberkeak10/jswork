$(function() {
    $("body").append('<style>@-webkit-keyframes spinner-grow {0% { -webkit-transform: scale(0);transform: scale(0);}50% { opacity: 1; } }@keyframes spinner-grow { 0% {-webkit-transform: scale(0);transform: scale(0);}50% {opacity: 1;}}.spinner-grow {display: inline-block;width: 2rem;height: 2rem;vertical-align: text-bottom;background-color: currentColor;border-radius: 50%;opacity: 0;-webkit-animation: spinner-grow.75s linear infinite;animation: spinner-grow.75s linear infinite;}.spinner-grow-sm {width: 1rem;height: 1rem;}.spinner-grow-lg {width: 3rem;height: 3rem;} .mr-10{margin-right:10px; .w-300{width: 300px;} </style>');

    var tableParentDiv = $("table[data-id=679D6FB684814B4EB9ABA6F778D7D25E]"),
        fieldset = tableParentDiv.parents('fieldset'),
        td = fieldset.closest('td'),
        trParentBorderCss = 'border:2px solid black';

    fieldset.hide().find('table').remove();
    td.append('<div id="newTable" data-tableid="679D6FB684814B4EB9ABA6F778D7D25E" data-coid="78467F08C95E462EA74DD9B55FD8A6B9" data-rid="E2DEC87CBC804BAE8780D6E6EE4DD070" data-lid="AF456E9C62424F6E9FCBDDAAECBC1B0C"> <div class="panel-group d-accordion"><div class="panel panel-default"><div class="panel-heading" data-toggle="collapse" data-parent=".d-accordion" href="#producttable"> <h4 class="panel-title"><i class="fas fa-table mr-10"></i>Ürün Tablosu <i class="fa fa-chevron-up pull-right"></i></h4></div><div id="producttable" class="panel-collapse collapse in"><div class="panel-body"></div></div></div></div></div>');

    var newTable = $("#newTable[data-tableid=679D6FB684814B4EB9ABA6F778D7D25E]"),
        newPanel = newTable.find('.d-accordion'),
        newPanelBody = newPanel.find('.panel-body'),
        prefix = "ffd70f23",
        printPrefix = "ffog90a2",
        prefixClass = "new-table-page-item",
        printPrefixClass = "new-table-print-page-item",
        pageCustomObjectId = "78467F08C95E462EA74DD9B55FD8A6B9",
        baskiModalElements = [{
                "type": "select",
                "id": String.format("#{0}-60B3EB130A714053B8F95D4998B7190A", printPrefix)
            },
            {
                "type": "select",
                "id": String.format("#{0}-DF75AF67CE0C4C6CAD7CC5BA759E9823", printPrefix)
            },
            {
                "type": "text",
                "id": String.format("#{0}-14BC27B7F17745E5B2C0676085BEB543", printPrefix)
            },
            {
                "type": "text",
                "id": String.format("#{0}-E7744E5F4D1C4B078DDDCAFA9888C22E", printPrefix)
            },
            {
                "type": "text",
                "id": String.format("#{0}-8E9BD6BD7BD34FED97E8FA811DEF6C7A", printPrefix)
            },
            {
                "type": "text",
                "id": String.format("#{0}-DC072FF5D76A4E9E922D3020C182E90A", printPrefix)
            },
        ];

    prepareFirstRowTable(fieldset, newPanelBody);

    function prepareFirstRowTable($fieldset, $body) {

        var firstRowHeaders = [{
                index: 99,
                id: '',
                text: 'CHECKBOX',
                width: 'auto'
            },
            {
                index: 0,
                id: 'CD160BA3C8634693949612B47F04E4EC',
                text: 'Sıra No',
                newHtml: '',
                width: '100px'
            },
            {
                index: 1,
                id: 'B961CD1891B84EAF981DD75F5C287196',
                text: 'Ürün',
                newHtml: '<a class="open-new-lookup-tab" data-id="C0971B09F50945C3BEBF8EEE4F36F3FD" data-href="/set/new/urun-karti-artikel?pageLayoutId=7E40B907AC1F43F6941E47ABAE5347B6" title="Yeni Ürün"><i class="fa fa-plus pointer"></i></a><a style="margin-left: 10px;display:none;" id="label-detail-link" href="/set/urun-karti-artikel/detail/ID" title="Ürün Görüntüleme" target="_blank"><i class="fas fa-external-link-alt"></i></a><a style="margin-left: 10px;display:none;" class="stok-sorgula" title="Stok Sorgula"><i class="fa fa-search pointer"></i></a><a style="margin-left: 10px;display:none;" class="stok-description-add" title="Açıklama Ekle"><i class="fa fa-comment-alt pointer"></i></a>',
                width: '300px'
            },
            {
                index: 2,
                id: '694AEFD22A054E63BB42DC9FF50C94F1',
                text: 'Adet',
                newHtml: '',
                width: 'auto'
            },
            {
                index: 3,
                id: 'EA0CD301669E4911BACC03F3E371F083',
                text: 'Liste Fiyatı',
                newHtml: '',
                width: 'auto'
            },
            {
                index: 4,
                id: '8E9BD6BD7BD34FED97E8FA811DEF6C7A',
                text: 'İskonto Oranı',
                newHtml: '',
                width: 'auto'
            },
            {
                index: 5,
                id: 'E07E26850A4745819C4BCD6E9E68993F',
                text: 'İskontolu Birim Fiyat',
                newHtml: '',
                width: 'auto'
            },
            {
                index: 6,
                id: '9DF93E4F54E74F4BA3B80C6E2A47F962',
                text: 'Ara Toplam',
                newHtml: '',
                width: 'auto'
            },
            {
                index: 7,
                id: 'C841EF9FC7C947B99F297A914E538BDA',
                text: 'KDV',
                newHtml: '',
                width: 'auto'
            },
            {
                index: 8,
                id: 'DC072FF5D76A4E9E922D3020C182E90A',
                text: 'Toplam Fiyat',
                newHtml: '',
                width: 'auto'
            },
            {
                index: 9,
                id: '',
                text: 'ISLEMLER',
                width: '115px'
            },
        ];

        var summaryRows = [{
                index: 0,
                id: '0F78F88DA91F4F1682C722D416596CA0',
                text: 'Ara Toplam ( İskontolu Toplam )',
                width: '25%'
            },
            {
                index: 1,
                id: '663C0C71F59D4968B7A44F212773CEFE',
                text: 'KDV Toplam',
                width: '25%'
            },
            {
                index: 2,
                id: 'F1A79558217D4ADB8F75EA6E69557A35',
                text: 'Genel Toplam',
                width: '25%'
            },
        ];

        var secondRowHeadersTable = [{
                index: 99,
                id: '',
                text: 'CHECKBOX',
                width: '100px'
            },
            {
                index: 1,
                id: 'CD160BA3C8634693949612B47F04E4EC',
                text: 'Sıra No',
                width: '100px'
            },
            {
                index: 2,
                id: 'B961CD1891B84EAF981DD75F5C287196',
                text: 'Ürün Kodu',
                width: '200px'
            },
            {
                index: 3,
                id: 'C0971B09F50945C3BEBF8EEE4F36F3FD',
                text: 'Ürün',
                width: '500px',
                newHtml: '<a style="margin-left: 10px;" id="label-detail-link" href="/set/urun-karti-artikel/detail/ID" title="Ürün Görüntüleme" target="_blank"><i class="fas fa-external-link-alt"></i></a><a style="margin-left: 10px;" class="stok-sorgula" title="Stok Sorgula"><i class="fa fa-search pointer"></i></a>'
            },
            {
                index: 4,
                id: 'BASKI_ACIKLAMASI',
                text: 'Baskı Açıklaması',
                width: '400px'
            },
            {
                index: 5,
                id: '694AEFD22A054E63BB42DC9FF50C94F1',
                text: 'Adet',
                width: '150px'
            },
            {
                index: 6,
                id: 'BIRIM',
                text: 'Birim',
                width: '150px'
            },
            {
                index: 7,
                id: 'EA0CD301669E4911BACC03F3E371F083',
                text: 'Liste Fiyatı',
                width: '150px'
            },
            {
                index: 8,
                id: '8E9BD6BD7BD34FED97E8FA811DEF6C7A',
                text: 'İskonto',
                width: '150px'
            },
            {
                index: 9,
                id: 'E07E26850A4745819C4BCD6E9E68993F',
                text: 'Net Fiyat',
                width: '150px'
            },

            {
                index: 10,
                id: '9DF93E4F54E74F4BA3B80C6E2A47F962',
                text: 'Ara Toplam',
                width: '150px'
            },
            {
                index: 11,
                id: 'C841EF9FC7C947B99F297A914E538BDA',
                text: 'KDV Oranı',
                width: '150px'
            },
            {
                index: 12,
                id: 'C841EF9FC7C947B99F297A914E538BDA',
                text: 'KDV',
                width: '150px'
            },
            {
                index: 13,
                id: 'DC072FF5D76A4E9E922D3020C182E90A',
                text: 'Toplam',
                width: '150px'
            },
            {
                index: 14,
                id: '',
                text: 'ISLEMLER',
                width: '100px'
            },
        ];

        $body.append(
            $("<div/>", {
                class: "table-responsive table-field"
            })
            .append($('<table/>', {
                    class: 'table table-hover',
                    "data-id": "679D6FB684814B4EB9ABA6F778D7D25E",
                    "style": "overflow:hidden !important"
                })
                .append($('<thead/>').append($('<tr/>')).append($('<tr/>')))
                .append($('<tbody/>', {
                    class: ''
                }))).append($('<table/>', {
                class: 'table table-hover append-table-items',
                "data-id": "679D6FB684814B4EB9ABA6F778D7D25E",
                "style": "overflow:hidden !important;"
            })).append($('<table/>', {
                class: "table sum-row pull-right"
            })));

        var thead = $body.find('.table-responsive table thead'),
            theadTr = thead.find('tr:first'),
            theadTrSecond = thead.find('tr:last'),
            tbody = $body.find('.append-table-items'),
            summaryRow = $body.find('.table-responsive .sum-row');

        $.each(firstRowHeaders, function(o, g) {
            if (g.text === "DETAILROW" || g.text === "CHECKBOX") {
                theadTr.append($('<th/>', {
                    width: g.width
                }));
                theadTrSecond.append($('<th/>'));
                return;
            }

            if (g.text === "ISLEMLER") {
                theadTr.append($('<th/>', {
                    width: g.width
                }));
                theadTrSecond.append($('<th/>').append('<div class="form-group" style="float: right"><div class="btn-group"><a class="btn btn-sm btn-success new-table-add-row" style="width: 29px; height: 30px; padding: 4px;"><i class="fas fa-plus" title="Ekle"></i></a><a class="btn btn-sm btn-danger new-table-reset" style="width: 29px; height: 30px; padding: 4px;"><i class="fas fa-redo" title="Temizle"></i></a></div></div>'));
                return;
            }

            theadTr.append($('<th/>', {
                'style': String.format('text-align:center;width:{0};', g.width)
            }).append($('<label/>', {
                for: g.id
            }).append(String.format("{0} {1}", g.text, g.newHtml))));

            switch (g.index) {
                case 0:
                    theadTrSecond.append($('<td/>').append(String.format('<div class="form-group {0}" data-istable="True" data-tableid="679D6FB684814B4EB9ABA6F778D7D25E" data-fieldtype="Number" data-inputtype="text" data-maxlength="12" data-decimalplaces="0" data-inputmaskpattern="099999999999" data-controllingpublicid="" data-lookupobjectid="" data-lookupobjectname="" data-lookupobjecturl="" data-lookupfieldids="" data-selecteditempublicids="" data-organizationalunitname="" data-organizationalunitfiltertype="" data-organizationalunitgrouppublicids="" data-organizationalunitdepth="0" data-organizationalunitincludeitself="False" data-ismultiplevalue="False" data-isradio="False" data-isrequired="True" data-isunique="False" data-isuniqueintable="False" data-isactive="True" data-isdisabled="True" data-isclientcalculate="False" data-iscalculateonclientchange="False" data-ischeckunchanged="False" data-isuniquecheckclientcalculate="False" data-calculatetriggerfieldpublicids="" data-isthousandseparator="False" data-formulaname="SIRA_NO" data-formulatext="" data-predefinedpublicid="" data-predefineddependencypublicid="" data-viewfilterpublicid="" data-publicid="{1}-CD160BA3C8634693949612B47F04E4EC" data-value="1"></div>',
                        prefixClass,
                        prefix)));
                    break;
                case 1:
                    theadTrSecond.append($('<td/>').append(String.format('<input type="hidden" class="productCode"><input type="hidden" class="productDescription"><input type="hidden" class="unitCode"><div class="form-group {0}" data-istable="True" data-tableid="679D6FB684814B4EB9ABA6F778D7D25E" data-fieldtype="Lookup" data-inputtype="select" data-maxlength="0" data-decimalplaces="0" data-inputmaskpattern="" data-controllingpublicid="" data-lookupobjectid="C0971B09F50945C3BEBF8EEE4F36F3FD" data-lookupobjectname="Ürün Kartı (Artikel)" data-lookupobjecturl="urun-karti-artikel" data-lookupfieldids="816AFC53305745F199A244B500F32C7F|A43BA5E165D143ECAE5A2A98C32F2A6E" data-selecteditempublicids="" data-organizationalunitname="" data-organizationalunitfiltertype="" data-organizationalunitgrouppublicids="" data-organizationalunitdepth="0" data-organizationalunitincludeitself="False" data-ismultiplevalue="False" data-isradio="False" data-isrequired="True" data-isunique="False" data-isuniqueintable="False" data-isactive="True" data-isclientcalculate="False" data-iscalculateonclientchange="False" data-ischeckunchanged="False" data-isuniquecheckclientcalculate="False" data-calculatetriggerfieldpublicids="" data-isthousandseparator="False" data-formulaname="URUN" data-formulatext="" data-predefinedpublicid="" data-predefineddependencypublicid="" data-viewfilterpublicid="BDFAC2A5F73A43D39D2AD90DCB2D8DE1" data-publicid="{1}-B961CD1891B84EAF981DD75F5C287196" data-value=""></div>',
                        prefixClass,
                        prefix)));
                    break;
                case 2:
                    theadTrSecond.append($('<td/>').append(String.format('<div class="form-group {0}" data-istable="True" data-tableid="679D6FB684814B4EB9ABA6F778D7D25E" data-fieldtype="Number" data-inputtype="text" data-maxlength="12" data-decimalplaces="0" data-inputmaskpattern="###.###.###.##0" data-controllingpublicid="" data-lookupobjectid="" data-lookupobjectname="" data-lookupobjecturl="" data-lookupfieldids="" data-selecteditempublicids="" data-organizationalunitname="" data-organizationalunitfiltertype="" data-organizationalunitgrouppublicids="" data-organizationalunitdepth="0" data-organizationalunitincludeitself="False" data-ismultiplevalue="False" data-isradio="False" data-isrequired="False" data-isunique="False" data-isuniqueintable="False" data-isactive="True" data-isclientcalculate="False" data-iscalculateonclientchange="False" data-ischeckunchanged="False" data-isuniquecheckclientcalculate="False" data-calculatetriggerfieldpublicids="" data-isthousandseparator="True" data-formulaname="ADET" data-formulatext="" data-predefinedpublicid="" data-predefineddependencypublicid="" data-viewfilterpublicid="" data-publicid="{1}-694AEFD22A054E63BB42DC9FF50C94F1" data-value="0"></div>',
                        prefixClass,
                        prefix)));
                    break;
                case 3:
                    theadTrSecond.append($('<td/>').append(String.format('<div class="form-group {0}" data-istable="True" data-tableid="679D6FB684814B4EB9ABA6F778D7D25E" data-fieldtype="Number" data-inputtype="text" data-maxlength="12" data-decimalplaces="2" data-inputmaskpattern="###.###.###.##0,00" data-controllingpublicid="" data-lookupobjectid="" data-lookupobjectname="" data-lookupobjecturl="" data-lookupfieldids="" data-selecteditempublicids="" data-isdisabled="True" data-organizationalunitname="" data-organizationalunitfiltertype="" data-organizationalunitgrouppublicids="" data-organizationalunitdepth="0" data-organizationalunitincludeitself="False" data-ismultiplevalue="False" data-isradio="False" data-isrequired="False" data-isunique="False" data-isuniqueintable="False" data-isactive="True" data-isclientcalculate="False" data-iscalculateonclientchange="False" data-ischeckunchanged="False" data-isuniquecheckclientcalculate="False" data-calculatetriggerfieldpublicids="" data-isthousandseparator="True" data-formulaname="BIRIM_FIYATT" data-formulatext="URUN_KDV_DAHIL_SATIS_FIYATI" data-predefinedpublicid="" data-predefineddependencypublicid="" data-viewfilterpublicid="" data-publicid="{1}-EA0CD301669E4911BACC03F3E371F083" data-value="0,00"></div>',
                        prefixClass,
                        prefix)));
                    break;
                case 4:
                    theadTrSecond.append($('<td/>').append(String.format('<div class="form-group {0}" data-istable="True" data-tableid="679D6FB684814B4EB9ABA6F778D7D25E" data-fieldtype="Number" data-inputtype="text" data-maxlength="4" data-decimalplaces="2"  data-inputmaskpattern="#0,00" data-controllingpublicid="" data-lookupobjectid="" data-lookupobjectname="" data-lookupobjecturl="" data-lookupfieldids="" data-selecteditempublicids="" data-organizationalunitname="" data-organizationalunitfiltertype="" data-organizationalunitgrouppublicids="" data-organizationalunitdepth="0" data-organizationalunitincludeitself="False" data-ismultiplevalue="False" data-isradio="False" data-isrequired="False" data-isunique="False" data-isuniqueintable="False" data-isactive="True" data-isclientcalculate="False" data-iscalculateonclientchange="False" data-ischeckunchanged="False" data-isuniquecheckclientcalculate="False" data-calculatetriggerfieldpublicids="" data-isthousandseparator="True" data-formulaname="ISKONTO" data-formulatext="0" data-predefinedpublicid="" data-predefineddependencypublicid="" data-viewfilterpublicid="" data-publicid="{1}-8E9BD6BD7BD34FED97E8FA811DEF6C7A" data-value="0"></div>',
                        prefixClass,
                        prefix)));
                    break;
                case 5:
                    theadTrSecond.append($('<td/>').append(String.format('<div class="form-group {0}" data-istable="True" data-tableid="679D6FB684814B4EB9ABA6F778D7D25E" data-fieldtype="Number" data-inputtype="text" data-maxlength="12" data-decimalplaces="4" data-inputmaskpattern="###.###.###.##0,00" data-controllingpublicid="" data-lookupobjectid="" data-lookupobjectname="" data-lookupobjecturl="" data-lookupfieldids="" data-selecteditempublicids="" data-organizationalunitname="" data-organizationalunitfiltertype="" data-organizationalunitgrouppublicids="" data-organizationalunitdepth="0" data-organizationalunitincludeitself="False" data-ismultiplevalue="False" data-isradio="False" data-isrequired="False" data-isunique="False" data-isuniqueintable="False" data-isactive="True" data-isclientcalculate="False" data-iscalculateonclientchange="False" data-ischeckunchanged="False" data-isuniquecheckclientcalculate="False" data-calculatetriggerfieldpublicids="" data-isthousandseparator="True" data-formulaname="ISKONTOLU_BIRIM_FIYAT" data-formulatext="ISKONTOLU_BIRIM_FIYAT" data-predefinedpublicid="" data-predefineddependencypublicid="" data-viewfilterpublicid="" data-publicid="{1}-E07E26850A4745819C4BCD6E9E68993F" data-value="0,00"></div>',
                        prefixClass,
                        prefix)));
                    break;
                case 6:
                    theadTrSecond.append($('<td/>').append(String.format('<div class="form-group {0}" data-istable="True" data-tableid="679D6FB684814B4EB9ABA6F778D7D25E" data-fieldtype="FormulaNumber" data-inputtype="text" data-maxlength="12" data-decimalplaces="2" data-inputmaskpattern="###.###.###.##0,00" data-controllingpublicid="" data-lookupobjectid="" data-lookupobjectname="" data-lookupobjecturl="" data-lookupfieldids="" data-selecteditempublicids="" data-organizationalunitname="" data-organizationalunitfiltertype="" data-organizationalunitgrouppublicids="" data-organizationalunitdepth="0" data-organizationalunitincludeitself="False" data-ismultiplevalue="False" data-isradio="False" data-isrequired="False" data-isunique="False" data-isuniqueintable="False" data-isactive="True" data-isclientcalculate="False" data-iscalculateonclientchange="False" data-ischeckunchanged="False" data-isuniquecheckclientcalculate="False" data-calculatetriggerfieldpublicids="" data-publicid="{1}-9DF93E4F54E74F4BA3B80C6E2A47F962" data-isthousandseparator="True" data-formulaname="ARA_TOPLAM_ISKONTOLU_TOPLAM_T" data-formulatext="" data-value="0,00"></div>',
                        prefixClass,
                        prefix)));
                    break;
                case 7:
                    theadTrSecond.append($('<td/>').append(String.format('<div class="form-group {0}" data-istable="True" data-tableid="679D6FB684814B4EB9ABA6F778D7D25E" data-fieldtype="Number" data-inputtype="text" data-maxlength="2" data-decimalplaces="0" data-inputmaskpattern="#0" data-controllingpublicid="" data-lookupobjectid="" data-lookupobjectname="" data-lookupobjecturl="" data-lookupfieldids="" data-selecteditempublicids="" data-organizationalunitname="" data-organizationalunitfiltertype="" data-organizationalunitgrouppublicids="" data-organizationalunitdepth="0" data-organizationalunitincludeitself="False" data-ismultiplevalue="False" data-isradio="False" data-isrequired="False" data-isunique="False" data-isuniqueintable="False" data-isactive="True" data-isclientcalculate="False" data-iscalculateonclientchange="False" data-ischeckunchanged="False" data-isuniquecheckclientcalculate="False" data-calculatetriggerfieldpublicids="" data-isthousandseparator="True" data-formulaname="KDV_ORANI" data-formulatext="URUN_KDV_O" data-predefinedpublicid="" data-predefineddependencypublicid="" data-viewfilterpublicid="" data-publicid="{1}-C841EF9FC7C947B99F297A914E538BDA" data-value="0"></div>',
                        prefixClass,
                        prefix)));
                    break;
                case 8:
                    theadTrSecond.append($('<td/>').append(String.format('<div class="form-group {0}" data-istable="True" data-tableid="679D6FB684814B4EB9ABA6F778D7D25E" data-fieldtype="Number" data-inputtype="text" data-maxlength="12" data-decimalplaces="2" data-inputmaskpattern="###.###.###.##0,00" data-controllingpublicid="" data-lookupobjectid="" data-lookupobjectname="" data-lookupobjecturl="" data-lookupfieldids="" data-selecteditempublicids="" data-organizationalunitname="" data-organizationalunitfiltertype="" data-organizationalunitgrouppublicids="" data-organizationalunitdepth="0" data-organizationalunitincludeitself="False" data-ismultiplevalue="False" data-isradio="False" data-isrequired="False" data-isunique="False" data-isuniqueintable="False" data-isactive="True" data-isdisabled="True" data-isclientcalculate="False" data-iscalculateonclientchange="False" data-ischeckunchanged="False" data-isuniquecheckclientcalculate="False" data-calculatetriggerfieldpublicids="" data-isthousandseparator="True" data-formulaname="TOPLAM_FIYAT" data-formulatext="" data-predefinedpublicid="" data-predefineddependencypublicid="" data-viewfilterpublicid="" data-publicid="{1}-DC072FF5D76A4E9E922D3020C182E90A" data-value="0,00"></div>',
                        prefixClass,
                        prefix)));
                    break;
                default:
                    break;
            }

        });

        var table2 = $('.append-table-items');
        table2.append($('<thead/>', {
            style: 'background: #5BC0DE !important;'
        }).append($('<tr/>'))).append($('<tbody/>').append($('<tr/>', {
            'class': 'record-notfound detail-row'
        }).append($('<td/>', {
            colspan: '15'
        }).text("Gösterilecek kayıt(lar) bulunamadı."))));
        var table2Thead = table2.find('thead tr');
        $.each(secondRowHeadersTable, function(o, g) {
            var textIsEmpty = g.text === "CHECKBOX" || g.text === "ISLEMLER";
            if (textIsEmpty) {
                table2Thead.append($("<th/>", {
                    style: String.format('padding:5px !important;width:{0}', g.width)
                }));
            } else {
                table2Thead.append($("<td/>", {
                    style: String.format('padding:5px !important;width:{0}', g.width),
                    'data-columnid': g.id
                }).text(g.text));
            }

        });

        tbody = tbody.find('tbody')

        $.each(summaryRows,
            function(i, v) {
                switch (v.index) {
                    case 0:
                        summaryRow.append($('<tr/>', {
                            "data-i": 0
                        }));
                        var inTr = summaryRow.find('tr[data-i=0]');
                        inTr.append('<td colspan="1" rowspan="1" class="empty" style="width: 23%"></td><td colspan="1" rowspan="1" class="empty" style="width: 23%"></td><td colspan="1" rowspan="1" class="empty" style="width: 24%"></td>');
                        inTr.append($('<td/>', {
                            width: v.width
                        }).append(String.format('<div class="form-group {0}" data-istable="False" data-tableid="679D6FB684814B4EB9ABA6F778D7D25E" data-fieldtype="FormulaNumber" data-inputtype="text" data-maxlength="12" data-decimalplaces="2" data-inputmaskpattern="###.###.###.##0,00" data-controllingpublicid="" data-lookupobjectid="" data-lookupobjectname="" data-lookupobjecturl="" data-lookupfieldids="" data-selecteditempublicids="" data-organizationalunitname="" data-organizationalunitfiltertype="" data-organizationalunitgrouppublicids="" data-organizationalunitdepth="0" data-organizationalunitincludeitself="False" data-ismultiplevalue="False" data-isradio="False" data-isrequired="False" data-isunique="False" data-isactive="True" data-isdisabled="False" data-isclientcalculate="False" data-iscalculateonclientchange="False" data-ischeckunchanged="False" data-isuniquecheckclientcalculate="False" data-istablerollup="False" data-isnoteditable="True" data-rolluptable="" data-rollupfield="" data-rollupformula="" data-calculatetriggerfieldpublicids="" data-isthousandseparator="True" data-formulaname="ARA_TOPLAMM" data-formulatext="" data-predefinedpublicid="" data-predefineddependencypublicid="" data-viewfilterpublicid="" data-publicid="{1}-0F78F88DA91F4F1682C722D416596CA0" data-value="" data-property=""><label for="{1}-0F78F88DA91F4F1682C722D416596CA0">{2}</label></div>', prefixClass, prefix, v.text)));
                        $('.page-item[data-publicid=0F78F88DA91F4F1682C722D416596CA0]').remove();
                        break;
                    case 1:
                        summaryRow.append($('<tr/>', {
                            "data-i": 1
                        }));
                        var inTr = summaryRow.find('tr[data-i=1]');
                        inTr.append('<td colspan="1" rowspan="1" class="empty" style="width: 23%"></td><td colspan="1" rowspan="1" class="empty" style="width: 23%"></td><td colspan="1" rowspan="1" class="empty" style="width: 24%"></td>');
                        inTr.append($('<td/>', {
                            width: v.width
                        }).append(String.format('<div class="form-group {0}" data-istable="False" data-tableid="679D6FB684814B4EB9ABA6F778D7D25E" data-fieldtype="FormulaNumber" data-inputtype="text" data-maxlength="12" data-decimalplaces="2" data-inputmaskpattern="###.###.###.##0,00" data-controllingpublicid="" data-lookupobjectid="" data-lookupobjectname="" data-lookupobjecturl="" data-lookupfieldids="" data-selecteditempublicids="" data-organizationalunitname="" data-organizationalunitfiltertype="" data-organizationalunitgrouppublicids="" data-organizationalunitdepth="0" data-organizationalunitincludeitself="False" data-ismultiplevalue="False" data-isradio="False" data-isrequired="False" data-isunique="False" data-isactive="True" data-isdisabled="False" data-isclientcalculate="False" data-iscalculateonclientchange="False" data-ischeckunchanged="False" data-isuniquecheckclientcalculate="False" data-istablerollup="False" data-isnoteditable="True" data-rolluptable="" data-rollupfield="" data-rollupformula="" data-calculatetriggerfieldpublicids="" data-isthousandseparator="True" data-formulaname="KDV_TOPLAMM" data-formulatext="" data-predefinedpublicid="" data-predefineddependencypublicid="" data-viewfilterpublicid="" data-publicid="{1}-663C0C71F59D4968B7A44F212773CEFE" data-value="" data-property=""><label for="{1}-663C0C71F59D4968B7A44F212773CEFE">{2}</label></div>', prefixClass, prefix, v.text)));
                        $('.page-item[data-publicid=663C0C71F59D4968B7A44F212773CEFE]').remove();
                        break;
                    case 2:
                        summaryRow.append($('<tr/>', {
                            "data-i": 2
                        }));
                        var inTr = summaryRow.find('tr[data-i=2]');
                        inTr.append('<td colspan="1" rowspan="1" class="empty" style="width: 23%"></td><td colspan="1" rowspan="1" class="empty" style="width: 23%"></td><td colspan="1" rowspan="1" class="empty" style="width: 24%"></td>');
                        inTr.append($('<td/>', {
                            width: v.width
                        }).append(String.format('<div class="form-group {0}" data-istable="False" data-tableid="679D6FB684814B4EB9ABA6F778D7D25E" data-fieldtype="FormulaNumber" data-inputtype="text" data-maxlength="12" data-decimalplaces="2" data-inputmaskpattern="###.###.###.##0,00" data-controllingpublicid="" data-lookupobjectid="" data-lookupobjectname="" data-lookupobjecturl="" data-lookupfieldids="" data-selecteditempublicids="" data-organizationalunitname="" data-organizationalunitfiltertype="" data-organizationalunitgrouppublicids="" data-organizationalunitdepth="0" data-organizationalunitincludeitself="False" data-ismultiplevalue="False" data-isradio="False" data-isrequired="False" data-isunique="False" data-isactive="True" data-isdisabled="False" data-isclientcalculate="False" data-iscalculateonclientchange="False" data-ischeckunchanged="False" data-isuniquecheckclientcalculate="False" data-istablerollup="True" data-isnoteditable="False" data-rolluptable="" data-rollupfield="" data-rollupformula="" data-calculatetriggerfieldpublicids="" data-isthousandseparator="True" data-formulaname="GENEL_TOPLAM" data-formulatext="" data-predefinedpublicid="" data-predefineddependencypublicid="" data-viewfilterpublicid="" data-publicid="{1}-F1A79558217D4ADB8F75EA6E69557A35" data-value="" data-property=""><label for="{1}-F1A79558217D4ADB8F75EA6E69557A35">{2}</label></div>', prefixClass, prefix, v.text)));
                        $('.page-item[data-publicid=F1A79558217D4ADB8F75EA6E69557A35]').remove();
                        break;
                    default:
                        break;
                }
            });

        $('.new-table-page-item').setForm({
            prefix: '.new-table-page-item',
            customObjectId: '78467F08C95E462EA74DD9B55FD8A6B9',
            isEditForm: false
        });

        var jsonString = $(".jsonData[id=679D6FB684814B4EB9ABA6F778D7D25E]").val();
        prepareEditTable(tbody,
            JSON.parse(jsonString));
    }

    function prepareEditTable(tBody, data) {

        var secondRowHeadersTable2 = ["Ürün", "Baskı Açıklaması", "Koli Ürün Text", "Adet", "Liste Fiyatı", "İskonto", "Net Fiyat", "Ara Toplam", "Kdv Oranı", "KDV", "KDV Dahil Toplam", ""];

        var rows = {
                Products: {}
            },
            products = {};

        $.each(data,
            function(rowIndex, rowColumns) {

                var siraNo = rowColumns.RowRecord.find(f => f.FormulaName === "SIRA_NO"),
                    sira = siraNo.Value;

                if (!rows.Products[sira]) {
                    rows.Products[sira] = [];
                }

                rows.Products[sira].push(rowColumns);

            });

        $.each(rows.Products,
            function(i, v) {

                if (!products[i]) {
                    products[i] = [];
                }

                $.each(v, function(o, g) {

                    if (o == 0) {
                        products[i].Info = [];
                        products[i].Prints = [];
                    }

                    if (String.isNullOrWhiteSpace(g.RowRecord.find(f => f.FormulaName === "URUN_GORSEL").Value)) {
                        products[i].Info.push(g);
                    }

                    if (!String.isNullOrWhiteSpace(g.RowRecord.find(f => f.FormulaName === "URUN_GORSEL").Value)) {
                        products[i].Prints.push(g);
                    }
                });
            });

        if (Object.keys(products).length > 0) {
            $(String.format("#{0}-CD160BA3C8634693949612B47F04E4EC", prefix)).val(Object.keys(products).length + 1);
            $(".record-notfound").hide();
        }

        $.each(products, function(o, a) {

            var parentTempId = "";

            $.each(a.Info, function(i, v) {
                parentTempId = v.TempId;
                var tr = $('<tr/>', {
                    "data-id": v.TempId,
                    'style': trParentBorderCss
                });

                var firstRowValues = [];
                firstRowValues.push("CHECKBOX");
                // firstRowValues.push("ISLEM");
                firstRowValues.push(v.RowRecord.find(f => f.FormulaName === "SIRA_NO"));
                firstRowValues.push(v.RowRecord.find(f => f.FormulaName === "URUN_KODU_FS"));
                firstRowValues.push(v.RowRecord.find(f => f.FormulaName === "URUN"));
                firstRowValues.push("BASKI_ACIKLAMASI");
                firstRowValues.push(v.RowRecord.find(f => f.FormulaName === "ADET"));
                firstRowValues.push(v.RowRecord.find(f => f.FormulaName === "BIRIM_SETI_FS"));
                firstRowValues.push(v.RowRecord.find(f => f.FormulaName === "BIRIM_FIYATT"));
                firstRowValues.push(v.RowRecord.find(f => f.FormulaName === "ISKONTO"));
                firstRowValues.push(v.RowRecord.find(f => f.FormulaName === "ISKONTOLU_BIRIM_FIYAT"));
                firstRowValues.push(v.RowRecord.find(f => f.FormulaName === "ARA_TOPLAM_ISKONTOLU_TOPLAM_T"));
                firstRowValues.push(v.RowRecord.find(f => f.FormulaName === "KDV_ORANI"));
                firstRowValues.push("KDV");
                firstRowValues.push(v.RowRecord.find(f => f.FormulaName === "TOPLAM_FIYAT"));
                $.each(firstRowValues, function(colIndex, rec) {
                    switch (rec) {
                        case "CHECKBOX":
                            tr.append($('<th/>').append('<input type="checkbox" class="product" data-tempid="' + v.TempId + '"/>'));
                            break;
                        case "BASKI_ACIKLAMASI":
                            tr.append($('<td/>', {
                                'data-key': 'BASKI_ACIKLAMASI'
                            }).text(''));
                            break;
                        case "KDV":
                            tr.append($('<td/>', {
                                'data-key': 'KDV'
                            }).append(''));
                            break;
                        default:

                            var val = rec.Value,
                                txt = rec.Txt,
                                type = rec.Type,
                                items;

                            if (colIndex === 4) {
                                //adet
                                var align = 'left';
                                var recFieldPublicId = rec.PublicId;
                                var label = $("label[for='" + recFieldPublicId + "']");
                                var acss = label.closest('th').data("align");
                                if (!String.isNullOrWhiteSpace(acss)) {
                                    align = acss;
                                }
                                var el = $('<td/>', {
                                    'data-id': String.format("{0}-{1}", prefix, rec.PublicId),
                                    'data-key': rec.FormulaName
                                }).append(turkishLanguagePriceFormatedOutput(txt, 0)).css('text-align', align);
                                tr.append(el);
                                break;
                            }

                            if (!String.isNullOrWhiteSpace(val)) {
                                if (type == 'Checkbox') {
                                    if (JSON.parse(val.toLowerCase())) {
                                        txt = '<i class="far fa-check-square"></i>';
                                    } else {
                                        txt = '<i class="far fa-square"></i>';
                                    }
                                } else if (type == 'SelectList' || type == 'Lookup' || type == 'OrganizationalUnit' || type == 'Predefined') {
                                    items = txt.split(window.systemSperator).map(function(x) {
                                        return x;
                                    });
                                    txt = items.join(', ');
                                } else if (type == 'File' || type == 'Image') {
                                    function fileFormat() {
                                        var ctx = $('<ul/>', {
                                                'class': 'list-inline'
                                            }),
                                            filesKeys = val.split(window.systemSperator),
                                            filesVals = txt.split(window.systemSperator);

                                        if (filesKeys.length == filesVals.length) {
                                            $.each(filesKeys, function(k, v) {
                                                ctx.append($('<li/>').append($('<a/>', {
                                                    href: '/document/get/' + v,
                                                    target: '_blank'
                                                }).append(filesVals[k])));
                                            });
                                        }
                                        var append = $('<div/>').append(ctx);
                                        txt = append.html();
                                    }
                                    fileFormat();
                                }
                            }
                            var align = 'left';
                            var recFieldPublicId = rec.PublicId;
                            var label = $("label[for='" + recFieldPublicId + "']");
                            var acss = label.closest('th').data("align");
                            if (!String.isNullOrWhiteSpace(acss)) {
                                align = acss;
                            }
                            var el = $('<td/>', {
                                'data-id': String.format("{0}-{1}", prefix, rec.PublicId),
                                'data-key': rec.FormulaName
                            }).append(txt).css('text-align', align);
                            tr.append(el);
                            break;
                    }
                });

                tr.append($('<td/>')
                    .append($('<div/>', {
                            'class': 'text-right'
                        })
                        .append($('<a/>', {
                            'class': 'btn btn-xs btn-info new-table-prints-row'
                        }).append('<i title="BG">BG</i>'))
                    ));

                tBody.append(tr);
            });
            tBody.append($("<tr/>", {
                id: String.format('detailrow_{0}', parentTempId),
                "style": "display:none;background: rgb(101 101 101);",
                'class': 'detail-row'
            }).append($("<td/>", {
                colspan: "15",
                style: "padding-left: 6%;padding-bottom: 0;"
            }).append($("<table/>", {
                class: 'table table-bordered table-hover',
                style: 'margin-bottom: 8px !important;table-layout:fixed',
                "data-id": "679D6FB684814B4EB9ABA6F778D7D25E"
            }))));

            var detailRow = $(String.format("#detailrow_{0} td table",
                    parentTempId)),
                detailRowThead = $("<thead/>"),
                detailRowTbody = $("<tbody/>");

            detailRow.append(detailRowThead.append($('<tr/>', {
                class: 'detail-row'
            }))).append(detailRowTbody);

            var appendThead = detailRow.find('thead'),
                appendTbody = detailRow.find('tbody');
            $.each(secondRowHeadersTable2, function(index,
                val) {
                var width = "auto";
                if (index === 0) {
                    width = "300px";
                } else if (index == secondRowHeadersTable2.length - 2) {
                    width = "135px";
                } else if (index == secondRowHeadersTable2.length - 1) {
                    width = "105px";
                }
                appendThead.find('tr').append($('<th/>', {
                        'data-index': index,
                        'style': String.format('padding:5px;width:{0}', width)
                    })
                    .append(val));
            });

            $.each(a.Info,
                function(i,
                    v) {

                    var firstRowValues = [];
                    firstRowValues.push(v.RowRecord.find(f => f.FormulaName === "URUN"));
                    firstRowValues.push("BASKI_ACIKLAMASI");
                    firstRowValues.push("KOLI_URUN_TEXT");
                    firstRowValues.push(v.RowRecord.find(f => f.FormulaName === "ADET"));
                    firstRowValues.push(v.RowRecord.find(f => f.FormulaName === "BIRIM_FIYATT"));
                    firstRowValues.push(v.RowRecord.find(f => f.FormulaName === "ISKONTO"));
                    firstRowValues.push(v.RowRecord.find(f => f.FormulaName === "ISKONTOLU_BIRIM_FIYAT"));
                    firstRowValues.push(v.RowRecord.find(f => f.FormulaName === "ARA_TOPLAM_ISKONTOLU_TOPLAM_T"));
                    firstRowValues.push(v.RowRecord.find(f => f.FormulaName === "KDV_ORANI"));
                    firstRowValues.push("KDV");
                    firstRowValues.push(v.RowRecord.find(f => f.FormulaName === "TOPLAM_FIYAT"));
                    firstRowValues.push("ISLEM");

                    var $tr = $('<tr/>', {
                        'data-id': v.TempId,
                        'class': 'detail-row'
                    });
                    $.each(firstRowValues,
                        function(colIndex, rec) {
                            switch (rec) {
                                case "ISLEM":
                                    $tr.append($('<td/>')
                                        .append($('<div/>', {
                                                'class': 'text-right'
                                            })
                                            .append($('<a/>', {
                                                'class': 'btn btn-xs btn-primary new-table-product-description-edit-row',
                                                'style': 'margin-right:4px;'
                                            }).append('<i class="fas fa-comment-alt"></i>'))
                                            .append($('<a/>', {
                                                'class': 'btn btn-xs btn-warning new-table-edit-row'
                                            }).append('<i class="fas fa-edit"></i>'))
                                            .append(' ')
                                            .append($('<a/>', {
                                                'class': 'btn btn-xs btn-danger new-table-remove-row'
                                            }).append('<i class="fas fa-trash"></i>'))
                                        ));
                                    break;
                                case "BASKI_ACIKLAMASI":
                                    var el = $('<td/>', {
                                        'data-key': "BASKI_ACIKLAMASI"
                                    }).append('');
                                    $tr.append(el);
                                    break;
                                case "KOLI_URUN_TEXT":
                                    var el = $('<td/>', {
                                        'data-key': "KOLI_URUN_TEXT"
                                    }).append('');
                                    $tr.append(el);
                                    break;
                                case "KDV":
                                    var araToplam = calcSeparatorRemove(v.RowRecord.find(f => f.FormulaName === "ARA_TOPLAM_ISKONTOLU_TOPLAM_T").Value),
                                        kdvOrani = calcSeparatorRemove(v.RowRecord.find(f => f.FormulaName === "KDV_ORANI").Value),
                                        sonuc = araToplam * kdvOrani / 100;

                                    var el = $('<td/>', {
                                        'data-key': "KDV"
                                    }).append(turkishLanguagePriceFormatedOutput(sonuc.toString().replace(/,/g, "")));
                                    $tr.append(el);
                                    break;
                                default:
                                    var val = rec.Value,
                                        txt = rec.Txt,
                                        type = rec.Type,
                                        items;

                                    if (!String.isNullOrWhiteSpace(val)) {
                                        if (type == 'Checkbox') {
                                            if (JSON.parse(val.toLowerCase())) {
                                                txt = '<i class="far fa-check-square"></i>';
                                            } else {
                                                txt = '<i class="far fa-square"></i>';
                                            }
                                        } else if (type == 'SelectList' || type == 'Lookup' || type == 'OrganizationalUnit' || type == 'Predefined') {
                                            items = txt.split(window.systemSperator).map(function(x) {
                                                return x;
                                            });
                                            txt = items.join(', ');
                                        } else if (type == 'File' || type == 'Image') {
                                            function fileFormat() {
                                                var ctx = $('<ul/>', {
                                                        'class': 'list-inline'
                                                    }),
                                                    filesKeys = val.split(window.systemSperator),
                                                    filesVals = txt.split(window.systemSperator);

                                                if (filesKeys.length == filesVals.length) {
                                                    $.each(filesKeys, function(k, v) {
                                                        ctx.append($('<li/>').append($('<a/>', {
                                                            href: '/document/get/' + v,
                                                            target: '_blank'
                                                        }).append(filesVals[k])));
                                                    });
                                                }
                                                var append = $('<div/>').append(ctx);
                                                txt = append.html();
                                            }
                                            fileFormat();
                                        }
                                    }
                                    var align = 'left';
                                    var recFieldPublicId = rec.PublicId;
                                    var label = $("label[for='" + recFieldPublicId + "']");
                                    var acss = label.closest('th').data("align");
                                    if (!String.isNullOrWhiteSpace(acss)) {
                                        align = acss;
                                    }
                                    var el = $('<td/>', {
                                        'data-id': String.format("{0}-{1}", printPrefix, rec.PublicId),
                                        'data-key': rec.FormulaName
                                    }).append(txt).css('text-align', align);
                                    $tr.append(el);
                                    break;
                            }
                        });
                    appendTbody.append($tr);
                });

            $.each(a.Prints, function(i,
                v) {

                var printRowValues = [];
                printRowValues.push(v.RowRecord.find(f => f.FormulaName === "URUN_GORSEL"));
                printRowValues.push(v.RowRecord.find(f => f.FormulaName === "BASKI_ACIKLAMASI"));
                printRowValues.push(v.RowRecord.find(f => f.FormulaName === "KOLI_URUN_TEXT"));
                printRowValues.push(v.RowRecord.find(f => f.FormulaName === "BASKI_ADETI"));
                printRowValues.push(v.RowRecord.find(f => f.FormulaName === "BASKI_BIRIM_FIYATI"));
                printRowValues.push(v.RowRecord.find(f => f.FormulaName === "ISKONTO"));
                printRowValues.push("NET_FIYAT");
                printRowValues.push("ARA_TOPLAM");
                printRowValues.push(v.RowRecord.find(f => f.FormulaName === "KDV_ORANI"));
                printRowValues.push("KDV");
                printRowValues.push(v.RowRecord.find(f => f.FormulaName === "TOPLAM_FIYAT"));
                printRowValues.push("ISLEM");

                var $trSecond = $('<tr/>', {
                    'data-id': v.TempId,
                    'class': 'detail-row',
                    'data-relationid': a.Info[0].TempId
                });
                $.each(printRowValues,
                    function(colIndex, rec) {
                        switch (rec) {
                            case "ISLEM":
                                $trSecond.append($('<td/>')
                                    .append($('<div/>', {
                                            'class': 'text-right'
                                        })
                                        .append($('<a/>', {
                                            'class': 'btn btn-xs btn-warning new-table-print-edit-row'
                                        }).append('<i class="fas fa-edit"></i>'))
                                        .append(' ')
                                        .append($('<a/>', {
                                            'class': 'btn btn-xs btn-danger new-table-print-remove-row'
                                        }).append('<i class="fas fa-trash"></i>'))
                                    ));
                                break;
                            case "NET_FIYAT":
                                var baskiBirimFiyati = calcSeparatorRemove(v.RowRecord.find(f => f.FormulaName === "BASKI_BIRIM_FIYATI").Value),
                                    iskonto = calcSeparatorRemove(v.RowRecord.find(f => f.FormulaName === "ISKONTO").Value),
                                    sonuc = (baskiBirimFiyati * (1 - parseFloat(iskonto).toFixed(2) / 100));
                                var el = $('<td/>', {
                                    'data-key': "NET_FIYAT"
                                }).append(turkishLanguagePriceFormatedOutput(sonuc, 4));
                                $trSecond.append(el);
                                break;
                            case "ARA_TOPLAM":
                                var baskiBirimFiyati = calcSeparatorRemove(v.RowRecord.find(f => f.FormulaName === "BASKI_BIRIM_FIYATI").Value),
                                    iskonto = calcSeparatorRemove(v.RowRecord.find(f => f.FormulaName === "ISKONTO").Value),
                                    sonuc = (baskiBirimFiyati * (1 - parseFloat(iskonto).toFixed(2) / 100));
                                var araToplam = sonuc * calcSeparatorRemove(v.RowRecord.find(f => f.FormulaName === "BASKI_ADETI").Value);
                                $trSecond.append($("<td/>", {
                                    'data-key': 'ARA_TOPLAM'
                                }).text(turkishLanguagePriceFormatedOutput(araToplam)));
                                break;
                            case "KDV":
                                var baskiBirimFiyati = calcSeparatorRemove(v.RowRecord.find(f => f.FormulaName === "BASKI_BIRIM_FIYATI").Value),
                                    iskonto = calcSeparatorRemove(v.RowRecord.find(f => f.FormulaName === "ISKONTO").Value),
                                    sonuc = (baskiBirimFiyati * (1 - parseFloat(iskonto).toFixed(2) / 100));

                                var araToplam = sonuc * calcSeparatorRemove(v.RowRecord.find(f => f.FormulaName === "BASKI_ADETI").Value);
                                var kdvToplam = araToplam * calcSeparatorRemove(v.RowRecord.find(f => f.FormulaName === "KDV_ORANI").Value) / 100;

                                var el = $('<td/>', {
                                    'data-key': "KDV"
                                }).append(turkishLanguagePriceFormatedOutput(kdvToplam));
                                $trSecond.append(el);
                                break;
                            default:
                                var val = rec.Value,
                                    txt = rec.Txt,
                                    type = rec.Type,
                                    items;

                                if (!String.isNullOrWhiteSpace(val)) {
                                    if (type == 'Checkbox') {
                                        if (JSON.parse(val.toLowerCase())) {
                                            txt = '<i class="far fa-check-square"></i>';
                                        } else {
                                            txt = '<i class="far fa-square"></i>';
                                        }
                                    } else if (type == 'SelectList' || type == 'Lookup' || type == 'OrganizationalUnit' || type == 'Predefined') {
                                        items = txt.split(window.systemSperator).map(function(x) {
                                            return x;
                                        });
                                        txt = items.join(', ');
                                    } else if (type == 'File' || type == 'Image') {
                                        function fileFormat() {
                                            var ctx = $('<ul/>', {
                                                    'class': 'list-inline'
                                                }),
                                                filesKeys = val.split(window.systemSperator),
                                                filesVals = txt.split(window.systemSperator);

                                            if (filesKeys.length == filesVals.length) {
                                                $.each(filesKeys, function(k, v) {
                                                    ctx.append($('<li/>').append($('<a/>', {
                                                        href: '/document/get/' + v,
                                                        target: '_blank'
                                                    }).append(filesVals[k])));
                                                });
                                            }
                                            var append = $('<div/>').append(ctx);
                                            txt = append.html();
                                        }
                                        fileFormat();
                                    }
                                }
                                var align = 'left';
                                var recFieldPublicId = rec.PublicId;
                                var label = $("label[for='" + recFieldPublicId + "']");
                                var acss = label.closest('th').data("align");
                                if (!String.isNullOrWhiteSpace(acss)) {
                                    align = acss;
                                }
                                var el = $('<td/>', {
                                    'data-id': String.format("{0}-{1}", printPrefix, rec.PublicId),
                                    'data-key': rec.FormulaName
                                }).append(txt).css('text-align', align);
                                $trSecond.append(el);
                                break;
                        }
                    });

                appendTbody.append($trSecond);
                // func_parentRecordUpdate(v.TempId);
            });
            func_parentRecordUpdate(a.Info[0].TempId);
            textAlignRight();
        });

        function func_baskiekle(guid, relationId, arr, karmaKoli) {
            var newRow = $('<tr/>', {
                    'data-id': guid,
                    'class': 'detail-row',
                    'data-relationid': relationId
                }),
                detailRow = $(String.format("#detailrow_{0} td table", relationId));

            if (karmaKoli) {
                var karmaKoliValue = arr[7],
                    baski = arr[0],
                    baskiAciklamasi = arr[1],
                    baskiBirimFiyati = arr[2],
                    baskiAdeti = arr[3],
                    baskiIskonto = arr[4],
                    baskiKdv = arr[5],
                    baskiToplamFiyat = arr[6],
                    netFiyatBaski = "",
                    araToplamBaski = "",
                    kdvBaski = "";

                var y;
                for (y = 0; y < 11; y++) {
                    switch (y) {
                        case 0: //Ürün
                            newRow.append(baski);
                            break;
                        case 1: //Adet
                            // newRow.append(baskiAdeti);
                            newRow.append(baskiAciklamasi);
                            break;
                        case 2: //baskiAciklamasi
                            newRow.append(karmaKoliValue);
                            break;
                        case 3: //karmaKoliValue
                            newRow.append($("<td/>", {
                                'data-id': baskiAdeti.attr('data-id'),
                                'data-key': baskiAdeti.attr('data-key'),
                                'style': baskiAdeti.attr('style')
                            }).text(turkishLanguagePriceFormatedOutput(baskiAdeti.text(), 0)));
                            break;
                        case 4: //baskiBirimFiyati
                            // newRow.append(baskiBirimFiyati);
                            newRow.append($("<td/>", {
                                'data-id': baskiBirimFiyati.attr('data-id'),
                                'data-key': baskiBirimFiyati.attr('data-key'),
                                'style': baskiBirimFiyati.attr('style')
                            }).text(turkishLanguagePriceFormatedOutput(baskiBirimFiyati.text(), 2)));
                            break;
                        case 5: //baskiIskonto
                            newRow.append(baskiIskonto);
                            break;
                        case 6: //Net fiyat
                            var birimFiyatiS = calcSeparatorRemove(baskiBirimFiyati.text()),
                                iskontoS = calcSeparatorRemove(baskiIskonto.text());
                            sonuc = (parseFloat(birimFiyatiS).toFixed(2) * (1 - parseFloat(iskontoS).toFixed(2) / 100));

                            // var netFiyatVariable = parseFloat(calcSeparatorRemove(sonuc.toString())).toFixed(4);
                            newRow.append($("<td/>", {
                                'data-key': 'NET_FIYAT'
                            }).text(turkishLanguagePriceFormatedOutput(parseFloat(sonuc).toFixed(4), 4)));
                            netFiyatBaski = sonuc.toFixed(4);
                            break;
                        case 7: //Ara Toplam
                            var birimFiyatiS = calcSeparatorRemove(baskiBirimFiyati.text()),
                                iskontoS = calcSeparatorRemove(baskiIskonto.text()),
                                sonuc = (birimFiyatiS - (birimFiyatiS * iskontoS / 100));

                            var araToplam = parseFloat(sonuc).toFixed(2) * calcSeparatorRemove(baskiAdeti.text());
                            newRow.append($("<td/>", {
                                'data-key': 'ARA_TOPLAM'
                            }).text(turkishLanguagePriceFormatedOutput(araToplam.toString().replace(/,/g, ""))));
                            araToplamBaski = parseFloat(araToplam).toFixed(2);
                            break;
                        case 8: //Kdv Oranı
                            newRow.append(baskiKdv);
                            break;
                        case 9: //KDV
                            var birimFiyatiS = calcSeparatorRemove(baskiBirimFiyati.text()),
                                iskontoS = calcSeparatorRemove(baskiIskonto.text()),
                                sonuc = (birimFiyatiS * (1 - parseFloat(iskontoS).toFixed(2) / 100));

                            var araToplam = sonuc * calcSeparatorRemove(baskiAdeti.text());
                            var kdvToplam = araToplam * calcSeparatorRemove(baskiKdv.text()) / 100;
                            newRow.append($("<td/>", {
                                'data-key': 'KDV'
                            }).text(turkishLanguagePriceFormatedOutput(kdvToplam)));
                            kdvBaski = parseFloat(kdvToplam).toFixed(2);
                            break;
                        case 10: //Toplam
                            var toplamVariable = parseFloat(calcSeparatorRemove(baskiToplamFiyat.text())).toFixed(2);
                            newRow.append($("<td/>", {
                                'data-id': baskiToplamFiyat.attr('data-id'),
                                'data-key': baskiToplamFiyat.attr('data-key'),
                                'style': baskiToplamFiyat.attr('style')
                            }).text(turkishLanguagePriceFormatedOutput(toplamVariable.toString().replace(/,/g, ""), 2)));
                            // newRow.append(baskiToplamFiyat);
                            break;
                        default:
                            break;
                    }
                }
            } else {
                var baski = arr[0],
                    baskiAciklamasi = arr[1],
                    baskiBirimFiyati = arr[2],
                    baskiAdeti = arr[3],
                    baskiIskonto = arr[4],
                    baskiKdv = arr[5],
                    baskiToplamFiyat = arr[6],
                    netFiyatBaski = "",
                    araToplamBaski = "",
                    kdvBaski = "";;

                var y;
                for (y = 0; y < 11; y++) {
                    switch (y) {
                        case 0: //Ürün
                            newRow.append(baski);
                            break;
                        case 1: //Baskı Açıklaması
                            newRow.append(baskiAciklamasi);
                            break;
                        case 2: //Koli Ürün Text
                            newRow.append($("<td/>").text(''));
                            break;
                        case 3: //Adet
                            newRow.append($("<td/>", {
                                'data-id': baskiAdeti.attr('data-id'),
                                'data-key': baskiAdeti.attr('data-key'),
                                'style': baskiAdeti.attr('style')
                            }).text(turkishLanguagePriceFormatedOutput(baskiAdeti.text(), 0)));
                            break;
                        case 4: //birim fiyat
                            newRow.append($("<td/>", {
                                'data-id': baskiBirimFiyati.attr('data-id'),
                                'data-key': baskiBirimFiyati.attr('data-key'),
                                'style': baskiBirimFiyati.attr('style')
                            }).text(turkishLanguagePriceFormatedOutput(baskiBirimFiyati.text(), 2)));
                            // newRow.append(baskiBirimFiyati);
                            break;
                        case 5: //iskonto
                            newRow.append(baskiIskonto);
                            break;
                        case 6: //net-fiyat
                            var birimFiyatiS = calcSeparatorRemove(baskiBirimFiyati.text()),
                                iskontoS = calcSeparatorRemove(baskiIskonto.text());
                            sonuc = (parseFloat(birimFiyatiS).toFixed(2) * (1 - parseFloat(iskontoS).toFixed(2) / 100));

                            // var netFiyatVariable = parseFloat(calcSeparatorRemove(sonuc.toString())).toFixed(4);
                            newRow.append($("<td/>", {
                                'data-key': 'NET_FIYAT'
                            }).text(turkishLanguagePriceFormatedOutput(parseFloat(sonuc).toFixed(4), 4)));
                            netFiyatBaski = sonuc.toFixed(4);
                            break;
                        case 7: //Ara Toplam

                            var birimFiyatiS = calcSeparatorRemove(baskiBirimFiyati.text()),
                                iskontoS = calcSeparatorRemove(baskiIskonto.text()),
                                sonuc = (birimFiyatiS - (birimFiyatiS * iskontoS / 100));

                            var araToplam = parseFloat(sonuc).toFixed(2) * calcSeparatorRemove(baskiAdeti.text());
                            newRow.append($("<td/>", {
                                'data-key': 'ARA_TOPLAM'
                            }).text(turkishLanguagePriceFormatedOutput(araToplam.toString().replace(/,/g, ""))));
                            araToplamBaski = parseFloat(araToplam).toFixed(2);
                            break;
                        case 8: //Kdv Oranı
                            newRow.append(baskiKdv);
                            break;
                        case 9: //KDV
                            var birimFiyatiS = calcSeparatorRemove(baskiBirimFiyati.text()),
                                iskontoS = calcSeparatorRemove(baskiIskonto.text()),
                                sonuc = (birimFiyatiS * (1 - parseFloat(iskontoS).toFixed(2) / 100));

                            var araToplam = sonuc * calcSeparatorRemove(baskiAdeti.text());
                            var kdvToplam = araToplam * calcSeparatorRemove(baskiKdv.text()) / 100
                            newRow.append($("<td/>", {
                                'data-key': 'KDV'
                            }).text(turkishLanguagePriceFormatedOutput(kdvToplam.toString().replace(/,/g, ""))));
                            kdvBaski = parseFloat(kdvToplam).toFixed(2);
                            break;
                        case 10: //Toplam
                            // newRow.append(baskiToplamFiyat);
                            var toplamVariable = parseFloat(calcSeparatorRemove(baskiToplamFiyat.text())).toFixed(2);
                            newRow.append($("<td/>", {
                                'data-id': baskiToplamFiyat.attr('data-id'),
                                'data-key': baskiToplamFiyat.attr('data-key'),
                                'style': baskiToplamFiyat.attr('style')
                            }).text(turkishLanguagePriceFormatedOutput(toplamVariable.toString().replace(/,/g, ""), 2)));
                            break;
                        default:
                            break;
                    }
                }
            }
            newRow.append($('<td/>')
                .append($('<div/>', {
                        'class': 'text-right'
                    })
                    .append($('<a/>', {
                        'class': 'btn btn-xs btn-warning new-table-print-edit-row'
                    }).append('<i class="fas fa-edit"></i>'))
                    .append(' ')
                    .append($('<a/>', {
                        'class': 'btn btn-xs btn-danger new-table-print-remove-row'
                    }).append('<i class="fas fa-trash"></i>'))
                ));

            detailRow.find('tbody').append(newRow);
            textAlignRight();
            func_parentRecordUpdate(relationId);
        }

        function turkishLanguagePriceFormatedOutput(price, digit) {

            if (String.isNullOrWhiteSpace(digit)) {
                digit = 2;
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

        $('body').on('click',
            '.stok-description-add',
            function() {

                $("#modalUrunAciklama").remove();
                window.setModal.Create({
                    id: 'modalUrunAciklama',
                    html: {
                        header: 'Ürün Açıklaması',
                        body: '<textarea class="form-control stock-description" rows="3" style="resize:vertical;" onkeypress="if (this.value.length >= 450) { return false; }"i maxlength="450"></textarea>',
                        footer: '<button class="btn btn-sm btn-success btn-stock-description-add" data-dismiss="modal">Kaydet</button><button class="btn btn-sm btn-danger" data-dismiss="modal">Kapat</button>'
                    }
                });
                $(".stock-description").val($('.productDescription').val());
                $("#modalUrunAciklama").modal("toggle");

            });

        $("body").on("click", '.btn-stock-description-add', function() {
            $('.productDescription').val($('.stock-description').val());
        });

        $(String.format("#{0}-B961CD1891B84EAF981DD75F5C287196", prefix)).on("change",
            function() {
                var type = 'product',
                    value = $(this).val(),
                    valueIsEmpty = String.isNullOrWhiteSpace(value),
                    detailLink = $('#label-detail-link'),
                    stokSorgula = $('.stok-sorgula'),
                    stokAciklama = $('.stok-description-add'),
                    companyName = $("#073007518CCE4C7FB3D748B1C47EFA27").select2('data') !== null ? $("#073007518CCE4C7FB3D748B1C47EFA27").select2('data').text : '',
                    companyId = $("#073007518CCE4C7FB3D748B1C47EFA27").select2('data') !== null ? $("#073007518CCE4C7FB3D748B1C47EFA27").select2('data').id : '';

                $('.productDescription').val('');
                if (valueIsEmpty) {
                    detailLink.attr('href', '').hide();
                    stokSorgula.attr('data-id', '').hide();
                    stokAciklama.hide();
                } else {
                    detailLink.attr('href', String.format('/set/urun-karti-artikel/detail/{0}', value)).show();
                    stokSorgula.attr('data-id', value).show();
                    stokAciklama.show();
                }
                getDefaultValue(valueIsEmpty ? 'product-relation-empty' : type, false, valueIsEmpty ? '' : value, companyName, companyId);
                getDefaultValue(valueIsEmpty ? 'product-relation-empty' : 'info', false, valueIsEmpty ? '' : value);
            });

        function nullRecordReturnWhiteSpace(text) {
            return String.isNullOrWhiteSpace(text) ? '' : text;
        }

        $('body').on('click',
            '.stok-sorgula',
            function() {
                var button = $(this),
                    urunKodu = button.attr('data-id');

                if (String.isNullOrWhiteSpace(urunKodu)) return;

                $("#modalStokSorgula").remove();
                window.setModal.Create({
                    id: 'modalStokSorgula',
                    html: {
                        header: 'Stok Bilgileri',
                        body: 'Lütfen bekleyin...',
                        footer: '<button class="btn btn-sm btn-danger" data-dismiss="modal">Kapat</button>'
                    },
                    settings: {
                        widthClass: 'modal-lg'
                    }
                });
                $("#modalStokSorgula").modal("toggle");

                var localUrl = String.format('http://localhost:55062/api/data/GetStokByUrunId?urunId={0}',
                        urunKodu),
                    realUrl = String.format('https://ilpenwebapi.setcrm.com/api/data/GetStokByUrunId?urunId={0}',
                        urunKodu);

                $.get(realUrl,
                    function(r) {
                        if (r.Status) {

                            var newTbl = $('<table id="newTbl" class="table table-bordered table-hover"/>');
                            var thead = $('<thead />');
                            var newRow = $('<tr/>');
                            newRow.append($('<th style="text-align: center;white-space: pre; background-color:#a7d927;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('FABRİKA'));
                            newRow.append($('<th style="text-align: center;white-space: pre; background-color:#a7d927;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('İSTOÇ'));
                            newRow.append($('<th style="text-align: center;white-space: pre; background-color:#a7d927;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('BASKI'));
                            newRow.append($('<th style="text-align: center;white-space: pre; background-color:#a7d927;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('ARIZALI ÜRÜNLER'));
                            newRow.append($('<th style="text-align: center;white-space: pre; background-color:#a7d927;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('TOPKAPI'));
                            newRow.append($('<th style="text-align: center;white-space: pre; background-color:#a7d927;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('DIŞ TEDARİK'));
                            newRow.append($('<th style="text-align: center;white-space: pre; background-color:#a7d927;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('ANTREPO'));
                            thead.append(newRow);
                            newTbl.append(thead);
                            var tbody = $('<tbody />');

                            var newTbodyRow = $('<tr/>');

                            newTbodyRow.append($('<td style="text-align: center;" class="col-md-2"/>').append('<label class="text-center">' + nullRecordReturnWhiteSpace(r.stok.Fabrika) + '</label>'));
                            newTbodyRow.append($('<td style="text-align: center;" class="col-md-2"/>').append('<label class="text-center">' + nullRecordReturnWhiteSpace(r.stok.Istoc) + '</label>'));
                            newTbodyRow.append($('<td style="text-align: center;" class="col-md-2"/>').append('<label class="text-center">' + nullRecordReturnWhiteSpace(r.stok.Baski) + '</label>'));
                            newTbodyRow.append($('<td style="text-align: center;" class="col-md-2"/>').append('<label class="text-center">' + nullRecordReturnWhiteSpace(r.stok.ArizaliUrun) + '</label>'));
                            newTbodyRow.append($('<td style="text-align: center;" class="col-md-2"/>').append('<label class="text-center">' + nullRecordReturnWhiteSpace(r.stok.Topkapi) + '</label>'));
                            newTbodyRow.append($('<td style="text-align: center;" class="col-md-2"/>').append('<label class="text-center">' + nullRecordReturnWhiteSpace(r.stok.DisTedarik) + '</label>'));
                            newTbodyRow.append($('<td style="text-align: center;" class="col-md-2"/>').append('<label class="text-center">' + nullRecordReturnWhiteSpace(r.stok.Antrepo) + '</label>'));

                            tbody.append(newTbodyRow);
                            newTbl.append(tbody);

                            $('#modalStokSorgula .modal-body').html(newTbl);

                            if (r.subProducts.length > 0) {
                                $.each(r.subProducts, function(i, v) {
                                    var newTbl = $('<table id="newTbl" class="table table-bordered table-hover"/>');
                                    var thead = $('<thead />');

                                    var newRow = $('<tr/>');
                                    newRow.append($('<th style="text-align: center;white-space: pre; background-color:#a7d927;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('FABRİKA'));
                                    newRow.append($('<th style="text-align: center;white-space: pre; background-color:#a7d927;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('İSTOÇ'));
                                    newRow.append($('<th style="text-align: center;white-space: pre; background-color:#a7d927;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('BASKI'));
                                    newRow.append($('<th style="text-align: center;white-space: pre; background-color:#a7d927;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('ARIZALI ÜRÜNLER'));
                                    newRow.append($('<th style="text-align: center;white-space: pre; background-color:#a7d927;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('TOPKAPI'));
                                    newRow.append($('<th style="text-align: center;white-space: pre; background-color:#a7d927;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('DIŞ TEDARİK'));
                                    newRow.append($('<th style="text-align: center;white-space: pre; background-color:#a7d927;position: sticky;top: 0;z-index: 5;" class="col-md-2"/>').text('ANTREPO'));
                                    thead.append(newRow);
                                    newTbl.append(thead);
                                    var tbody = $('<tbody />');

                                    var newTbodyRow = $('<tr/>');

                                    newTbodyRow.append($('<td style="text-align: center;" class="col-md-2"/>').append('<label class="text-center">' + nullRecordReturnWhiteSpace(v.m_Item2.Fabrika) + '</label>'));
                                    newTbodyRow.append($('<td style="text-align: center;" class="col-md-2"/>').append('<label class="text-center">' + nullRecordReturnWhiteSpace(v.m_Item2.Istoc) + '</label>'));
                                    newTbodyRow.append($('<td style="text-align: center;" class="col-md-2"/>').append('<label class="text-center">' + nullRecordReturnWhiteSpace(v.m_Item2.Baski) + '</label>'));
                                    newTbodyRow.append($('<td style="text-align: center;" class="col-md-2"/>').append('<label class="text-center">' + nullRecordReturnWhiteSpace(v.m_Item2.ArizaliUrun) + '</label>'));
                                    newTbodyRow.append($('<td style="text-align: center;" class="col-md-2"/>').append('<label class="text-center">' + nullRecordReturnWhiteSpace(v.m_Item2.Topkapi) + '</label>'));
                                    newTbodyRow.append($('<td style="text-align: center;" class="col-md-2"/>').append('<label class="text-center">' + nullRecordReturnWhiteSpace(v.m_Item2.DisTedarik) + '</label>'));
                                    newTbodyRow.append($('<td style="text-align: center;" class="col-md-2"/>').append('<label class="text-center">' + nullRecordReturnWhiteSpace(v.m_Item2.Antrepo) + '</label>'));

                                    tbody.append(newTbodyRow);
                                    newTbl.append(tbody);
                                    $('#modalStokSorgula .modal-body').append(String.format("<h5>{0}</h5>", v.m_Item1));
                                    $('#modalStokSorgula .modal-body').append(newTbl);
                                });
                            }

                        } else {
                            $('#modalStokSorgula .modal-body').html('<div class="alert alert-warning">' + r.Message + '</div>');
                        }
                    });
            });

        $("body").on("change", String.format("#{0}-60B3EB130A714053B8F95D4998B7190A",
            printPrefix), function() {
            var value = $(this).val(),
                valueIsEmpty = String.isNullOrWhiteSpace(value),
                detailLink = $('#label-baski-detail-link');

            if (valueIsEmpty) {
                detailLink.attr('href', '').hide();
            } else {
                detailLink.attr('href', String.format('/set/baski/detail/{0}', value)).show();
            }
        });

        $("body").on("change",
            String.format("#{0}-DF75AF67CE0C4C6CAD7CC5BA759E9823", printPrefix),
            function() {
                var value = $(this).val(),
                    valueIsEmpty = String.isNullOrWhiteSpace(value),
                    detailLink = $('#label-baski-aciklama-detail-link');

                if (valueIsEmpty) {
                    detailLink.attr('href', '').hide();
                } else {
                    detailLink.attr('href', String.format('/set/baski-aciklamasi/detail/{0}', value)).show();
                }
            });

        $("body").on("change",
            String.format("#edit{0}-B961CD1891B84EAF981DD75F5C287196", prefix),
            function() {
                var type = 'product',
                    value = $(this).val(),
                    valueIsEmpty = String.isNullOrWhiteSpace(value);

                getDefaultValue(valueIsEmpty ? 'product-relation-empty' : type, true, valueIsEmpty ? '' : value);
            });

        $("body").on("click",
            ".new-table-prints-row",
            function() {
                var btn = $(this),
                    rId = btn.closest('td tr').attr('data-id');

                if (String.isNullOrWhiteSpace(rId)) return;

                var jsonItem = JSON.parse($(".jsonData").val()).first('TempId', rId),
                    urunId = jsonItem.RowRecord.find(f => f.PublicId === "B961CD1891B84EAF981DD75F5C287196").Value;

                getProductInformation(urunId);
                var $body = "<div class='row'><div class='col-md-12'><div id='message-block'></div></div></div>";

                $body += String.format('<div class="row" id="div-karma-koli"><div class="col-md-12"><label>Karma Koli</label><div id="karma-koli"></div></div></div>');

                $body += String.format('<div class="row"><div class="col-md-12"><div class="form-group {0}" data-istable="True" data-tableid="679D6FB684814B4EB9ABA6F778D7D25E" data-fieldtype="Lookup" data-inputtype="select" data-maxlength="0" data-decimalplaces="0" data-inputmaskpattern="" data-controllingpublicid="" data-lookupobjectid="DB31FD34203D4EFCBB06E1AB70A1F613" data-lookupobjectname="Baskı" data-lookupobjecturl="baski" data-lookupfieldids="01E14A5348CB4D598BB62D8479BA200B" data-selecteditempublicids="" data-organizationalunitname="" data-organizationalunitfiltertype="" data-organizationalunitgrouppublicids="" data-organizationalunitdepth="0" data-organizationalunitincludeitself="False" data-ismultiplevalue="False" data-isradio="False" data-isrequired="True" data-isunique="False" data-isuniqueintable="False" data-isactive="True" data-isclientcalculate="False" data-iscalculateonclientchange="False" data-ischeckunchanged="False" data-isuniquecheckclientcalculate="False" data-calculatetriggerfieldpublicids="" data-isthousandseparator="False" data-formulaname="URUN_GORSEL" data-formulatext="" data-predefinedpublicid="" data-predefineddependencypublicid="" data-viewfilterpublicid="75254FEECC1E4B378FED370BE42F3A23" data-publicid="{1}-60B3EB130A714053B8F95D4998B7190A" data-value=""><label for="{1}-60B3EB130A714053B8F95D4998B7190A">Baskı <a class="open-new-lookup-tab" data-id="DB31FD34203D4EFCBB06E1AB70A1F613" data-href="/set/new/baski" title="Yeni Baskı"><i class="fa fa-plus pointer"></i></a><a style="margin-left: 5px;" href="" title="Baskı Görüntüle" id="label-baski-detail-link" target="_blank"><i class="fas fa-external-link-alt"></i></a></label></div></div></div>', printPrefixClass, printPrefix);

                $body += String.format('<div class="row"><div class="col-md-12"><div class="form-group {0}" data-istable="True" data-tableid="679D6FB684814B4EB9ABA6F778D7D25E" data-fieldtype="Lookup" data-inputtype="select" data-maxlength="0" data-decimalplaces="0" data-inputmaskpattern="" data-controllingpublicid="" data-lookupobjectid="76408E9E4C594AEBB608FF26850B16F1" data-lookupobjectname="Baskı Açıklaması" data-lookupobjecturl="baski-aciklamasi" data-lookupfieldids="7889F039B4014A39B8BF36FF8B1F1CA7" data-selecteditempublicids="" data-organizationalunitname="" data-organizationalunitfiltertype="" data-organizationalunitgrouppublicids="" data-organizationalunitdepth="0" data-organizationalunitincludeitself="False" data-ismultiplevalue="False" data-isradio="False" data-isrequired="False" data-isunique="False" data-isuniqueintable="False" data-isactive="True" data-isclientcalculate="False" data-iscalculateonclientchange="False" data-ischeckunchanged="False" data-isuniquecheckclientcalculate="False" data-calculatetriggerfieldpublicids="" data-isthousandseparator="False" data-formulaname="BASKI_ACIKLAMASI" data-formulatext="" data-predefinedpublicid="" data-predefineddependencypublicid="" data-viewfilterpublicid="DAF6C17ED0E64517A714D9BFF67D4B85" data-publicid="{1}-DF75AF67CE0C4C6CAD7CC5BA759E9823" data-value=""><label for="{1}-DF75AF67CE0C4C6CAD7CC5BA759E9823">Baskı Açıklaması <a class="open-new-lookup-tab" data-id="76408E9E4C594AEBB608FF26850B16F1" data-href="/set/new/baski-aciklamasi" title="Yeni Baskı"><i class="fa fa-plus pointer"></i></a><a style="margin-left: 5px;" href="" title="Baskı Görüntüle" id="label-baski-aciklama-detail-link" target="_blank"><i class="fas fa-external-link-alt"></i></a></label></div></div></div>', printPrefixClass, printPrefix);

                $body += String.format('<div class="row"><div class="col-md-12"><div class="form-group {0}" data-istable="True" data-tableid="679D6FB684814B4EB9ABA6F778D7D25E" data-fieldtype="Number" data-inputtype="text" data-maxlength="12" data-decimalplaces="3" data-inputmaskpattern="###.###.###.##0,000" data-controllingpublicid="" data-lookupobjectid="" data-lookupobjectname="" data-lookupobjecturl="" data-lookupfieldids="" data-selecteditempublicids="" data-organizationalunitname="" data-organizationalunitfiltertype="" data-organizationalunitgrouppublicids="" data-organizationalunitdepth="0" data-organizationalunitincludeitself="False" data-ismultiplevalue="False" data-isradio="False" data-isrequired="True" data-isunique="False" data-isuniqueintable="False" data-isactive="True" data-isclientcalculate="False" data-iscalculateonclientchange="False" data-ischeckunchanged="False" data-isuniquecheckclientcalculate="False" data-calculatetriggerfieldpublicids="" data-isthousandseparator="True" data-formulaname="BASKI_BIRIM_FIYATI" data-formulatext="" data-predefinedpublicid="" data-predefineddependencypublicid="" data-viewfilterpublicid="" data-publicid="{1}-14BC27B7F17745E5B2C0676085BEB543" data-value="0"><label for="{1}-14BC27B7F17745E5B2C0676085BEB543">Baskı Birim Fiyatı</label></div></div></div>', printPrefixClass, printPrefix);

                $body += String.format('<div class="row"><div class="col-md-12"><div class="form-group {0}" data-istable="True" data-tableid="679D6FB684814B4EB9ABA6F778D7D25E" data-fieldtype="Number" data-inputtype="text" data-maxlength="12" data-decimalplaces="2" data-inputmaskpattern="###.###.###.##0,00" data-controllingpublicid="" data-lookupobjectid="" data-lookupobjectname="" data-lookupobjecturl="" data-lookupfieldids="" data-selecteditempublicids="" data-organizationalunitname="" data-organizationalunitfiltertype="" data-organizationalunitgrouppublicids="" data-organizationalunitdepth="0" data-organizationalunitincludeitself="False" data-ismultiplevalue="False" data-isradio="False" data-isrequired="True" data-isunique="False" data-isuniqueintable="False" data-isactive="True" data-isclientcalculate="False" data-iscalculateonclientchange="False" data-ischeckunchanged="False" data-isuniquecheckclientcalculate="False" data-calculatetriggerfieldpublicids="" data-isthousandseparator="True" data-formulaname="BASKI_ADETI" data-formulatext="" data-predefinedpublicid="" data-predefineddependencypublicid="" data-viewfilterpublicid="" data-publicid="{1}-E7744E5F4D1C4B078DDDCAFA9888C22E" data-value="0"><label for="{1}-E7744E5F4D1C4B078DDDCAFA9888C22E">Baskı Adeti</label></div></div></div>', printPrefixClass, printPrefix);

                $body += String.format('<div class="row"><div class="col-md-12"><div class="form-group {0}" data-istable="True" data-tableid="679D6FB684814B4EB9ABA6F778D7D25E" data-fieldtype="Number" data-inputtype="text" data-maxlength="4" data-decimalplaces="2" data-inputmaskpattern="#0,00" data-controllingpublicid="" data-lookupobjectid="" data-lookupobjectname="" data-lookupobjecturl="" data-lookupfieldids="" data-selecteditempublicids="" data-organizationalunitname="" data-organizationalunitfiltertype="" data-organizationalunitgrouppublicids="" data-organizationalunitdepth="0" data-organizationalunitincludeitself="False" data-ismultiplevalue="False" data-isradio="False" data-isrequired="True" data-isunique="False" data-isuniqueintable="False" data-isactive="True" data-isclientcalculate="False" data-iscalculateonclientchange="False" data-ischeckunchanged="False" data-isuniquecheckclientcalculate="False" data-calculatetriggerfieldpublicids="" data-isthousandseparator="True" data-formulaname="ISKONTO" data-formulatext="0" data-predefinedpublicid="" data-predefineddependencypublicid="" data-viewfilterpublicid="" data-publicid="{1}-8E9BD6BD7BD34FED97E8FA811DEF6C7A" data-value="0"><label for="{1}-8E9BD6BD7BD34FED97E8FA811DEF6C7A">Baskı İskonto</label></div></div></div>', printPrefixClass, printPrefix);

                $body += String.format('<div class="row"><div class="col-md-12"><div class="form-group {0}" data-istable="True" data-tableid="679D6FB684814B4EB9ABA6F778D7D25E" data-fieldtype="Number" data-inputtype="text" data-maxlength="2" data-decimalplaces="0" data-inputmaskpattern="#0" data-controllingpublicid="" data-lookupobjectid="" data-lookupobjectname="" data-lookupobjecturl="" data-lookupfieldids="" data-selecteditempublicids="" data-organizationalunitname="" data-organizationalunitfiltertype="" data-organizationalunitgrouppublicids="" data-organizationalunitdepth="0" data-organizationalunitincludeitself="False" data-ismultiplevalue="False" data-isradio="False" data-isrequired="True" data-isunique="False" data-isuniqueintable="False" data-isactive="True" data-isclientcalculate="False" data-iscalculateonclientchange="False" data-ischeckunchanged="False" data-isdisabled="False" data-isuniquecheckclientcalculate="False" data-calculatetriggerfieldpublicids="" data-isthousandseparator="False" data-formulaname="KDV_ORANI" data-formulatext="URUN_KDV_O" data-predefinedpublicid="" data-predefineddependencypublicid="" data-viewfilterpublicid="" data-publicid="{1}-C841EF9FC7C947B99F297A914E538BDA" data-value="18"><label for="{1}-C841EF9FC7C947B99F297A914E538BDA">Baskı KDV Oranı</label></div></div></div>', printPrefixClass, printPrefix);

                $body += String.format('<div class="row"><div class="col-md-12"><div class="form-group {0}" data-istable="True" data-tableid="679D6FB684814B4EB9ABA6F778D7D25E" data-fieldtype="Number" data-inputtype="text" data-maxlength="12" data-decimalplaces="2" data-inputmaskpattern="###.###.###.##0,00" data-controllingpublicid="" data-lookupobjectid="" data-lookupobjectname="" data-lookupobjecturl="" data-lookupfieldids="" data-selecteditempublicids="" data-organizationalunitname="" data-organizationalunitfiltertype="" data-organizationalunitgrouppublicids="" data-organizationalunitdepth="0" data-organizationalunitincludeitself="False" data-ismultiplevalue="False" data-isradio="False" data-isrequired="True" data-isunique="False" data-isuniqueintable="False" data-isactive="True" data-isclientcalculate="False" data-iscalculateonclientchange="False" data-ischeckunchanged="False" data-isuniquecheckclientcalculate="False" data-calculatetriggerfieldpublicids="" data-isdisabled="True" data-isthousandseparator="True" data-formulaname="TOPLAM_FIYAT" data-formulatext="" data-predefinedpublicid="" data-predefineddependencypublicid="" data-viewfilterpublicid="" data-publicid="{1}-DC072FF5D76A4E9E922D3020C182E90A" data-value=""><label for="{1}-DC072FF5D76A4E9E922D3020C182E90A">Baskı Toplam Fiyat</label></div></div></div>', printPrefixClass, printPrefix);

                $("#modalPrintAdd").remove();
                window.setModal.Create({
                    id: 'modalPrintAdd',
                    html: {
                        header: 'Baskı Ekle',
                        body: $body,
                        footer: '<button class="btn btn-sm btn-success" id="btn-baski-ekle" data-pid="' + rId + '">Baskı Ekle</button><button class="btn btn-sm btn-danger" data-dismiss="modal">Kapat</button>'
                    }
                });

                $('.new-table-print-page-item').setForm({
                    prefix: '.new-table-print-page-item',
                    customObjectId: '78467F08C95E462EA74DD9B55FD8A6B9',
                    isEditForm: false
                });
                $('#modalPrintAdd').find('.modal-body').css({
                    padding: 0
                });
                $('#modalPrintAdd').modal({
                    backdrop: 'static',
                    keyboard: false
                });
            });

        $("body").on("click",
            "#btn-baski-ekle",
            function() {
                var btn = $(this),
                    pid = btn.data("pid"),
                    rowRecord = new Array(),
                    guid = String.newGuid(),
                    items = $(String.format(".{0}", printPrefixClass)),
                    // newRow = ,
                    tableId = "679D6FB684814B4EB9ABA6F778D7D25E";

                if ($("#ffog90a2-60B3EB130A714053B8F95D4998B7190A").select2('data') === null || String.isNullOrWhiteSpace($("#ffog90a2-14BC27B7F17745E5B2C0676085BEB543").val()) ||
                    String.isNullOrWhiteSpace($("#ffog90a2-E7744E5F4D1C4B078DDDCAFA9888C22E").val()) || String.isNullOrWhiteSpace($("#ffog90a2-8E9BD6BD7BD34FED97E8FA811DEF6C7A").val())) {
                    setUtil.alert({
                        container: '#modalPrintAdd .modal-body #message-block',
                        message: 'Lütfen zorunlu alanları kontrol edip tekrar deneyiniz!',
                        alertClass: 'alert-danger',
                        autoClose: true
                    });
                    return;
                }

                var newRowArray = [];
                items.each(function(i, v) {

                    var input = $(this).find('input[name]:not(:file), textarea'),
                        parents = input.closest(String.format('div.{0}', printPrefixClass)),
                        $parent = {
                            publicId: parents.data('publicid'),
                            isActive: parents.data('isactive').toLowerCase() === 'true',
                            isUnique: parents.data('isunique').toLowerCase() === 'true',
                            isUniqueInTable: parents.data('isuniqueintable').toLowerCase() === 'true',
                            isMultiple: parents.data('ismultiplevalue').toLowerCase() === 'true',
                            fieldType: parents.data('fieldtype'),
                            inputType: parents.data('inputtype'),
                            formula: parents.data('formulaname'),
                            key: parents.data('lookupobjecturl'),
                        };

                    input.parent().removeClass('has-error');

                    var value = input.val() != null ? input.val() : '',
                        string = value,
                        txt = value;

                    if ($parent.inputType === 'select') {
                        var s2Json = input.select2('data');
                        if ($parent.isMultiple && s2Json != null) {
                            var txts = $.map(s2Json, function(x) {
                                return x.text;
                            });
                            txt = txts.join(window.systemSperator);
                            string = txts.join(', ');
                        } else {
                            txt = s2Json ? s2Json.text : '';
                            string = txt;
                        }
                    } else if ($parent.inputType === 'checkbox') {
                        if (JSON.parse(value.toLowerCase())) {
                            string = '<i class="far fa-check-square"></i>';
                        } else {
                            string = '<i class="far fa-square"></i>';
                        }
                    } else if ($parent.inputType === 'file') {
                        function fileFormat() {
                            var ul = parents.find('.form-file-list ul li a');
                            if (ul.length > 0) {
                                var files = $.map(ul, function(x) {
                                    return $(x).text();
                                });
                                txt = files.join(window.systemSperator);
                            }
                            var ctx = $('<ul/>', {
                                    'class': 'list-inline'
                                }),
                                filesKeys = value.split(window.systemSperator),
                                filesVals = txt.split(window.systemSperator);

                            if (!String.isNullOrWhiteSpace(value) && filesKeys.length == filesVals.length) {
                                $.each(filesKeys, function(i, v) {
                                    ctx.append($('<li/>').append($('<a/>', {
                                        href: '/document/get/' + v,
                                        target: '_blank'
                                    }).append(filesVals[i])));
                                });
                                var append = $('<div/>').append(ctx);
                                string = append.html();
                            }
                        }
                        fileFormat();
                    } else if ($parent.inputType === 'email' && !String.isNullOrWhiteSpace(input.val()) && !validations.EmailValidate(input.val())) {
                        input.val(null).prop('placeholder', window.notValidEmailTxt).parent().addClass('has-error');
                        input.blur(function() {
                            $(this).parent().removeClass('has-error');
                        });
                        isValid = false;
                        if (!isValid) return false;
                    } else if ($parent.inputType === 'url' && !String.isNullOrWhiteSpace(input.val()) && !validations.UrlValidate(input.val())) {
                        input.val(null).prop('placeholder', window.notValidUrlTxt).parent().addClass('has-error');
                        input.blur(function() {
                            $(this).parent().removeClass('has-error');
                        });
                        isValid = false;
                        if (!isValid) return false;
                    }

                    if (input.hasClass('required') && String.isNullOrWhiteSpace(string) && $parent.isActive) {
                        isValid = false;
                        input.closest('.form-group').addClass('has-error');
                        if (!isValid) return false;
                    }

                    // tablodaki kayıtlarda uniq kontrol
                    if ($parent.isUniqueInTable && !String.isNullOrWhiteSpace(string) && $parent.isActive) {
                        isValid = validations.UniqInTableValidate($parent.publicId, string);
                        if (!isValid) return false;
                    }

                    // önceki kayıtlarda uniq kontrol
                    if ($parent.isUnique && !String.isNullOrWhiteSpace(string) && $parent.isActive) {
                        isValid = validations.UniqOldDataValidate($parent.publicId, value, parents, $btn);
                        if (!isValid) return false;
                    }

                    // 99 row kontrol
                    var jsonTableData = $(String.format('#{0}', tableId));
                    var tableItem = new Array();
                    if (!String.isNullOrWhiteSpace(jsonTableData.val())) {
                        tableItem = JSON.parse(jsonTableData.val());
                    }

                    if (tableItem.length >= window.maxTableRowCount) {
                        $('#errorModalMsg').text(window.tableHasMaximumRows);
                        $('#error-modal').modal('toggle');
                        return false;
                    }

                    rowRecord.push({
                        Key: $parent.key,
                        PublicId: $parent.publicId,
                        Value: value,
                        Txt: txt,
                        Type: $parent.fieldType
                    });

                    var align = 'left';
                    var recFieldPublicId = $parent.publicId;
                    var label = $('#' + recFieldPublicId);
                    var acss = label.closest('td').css("text-align");
                    if (!String.isNullOrWhiteSpace(acss)) {
                        align = acss;
                    }
                    var el = $('<td/>', {
                        'data-id': $parent.publicId,
                        'data-key': $parent.formula
                    }).append(string).css('text-align', align);
                    // newRow.append(el);
                    newRowArray.push(el);
                });

                if (toBool($("#karmaKoliSection").val())) {
                    rowRecord.push({
                        Key: "KOLI_URUN_TEXT",
                        PublicId: "7FE38737CD694FC9BF7050D7917566EF",
                        Value: $("#karma-koli").select2('data') != null ? $("#karma-koli").select2('data').text : '',
                        Txt: $("#karma-koli").select2('data') != null ? $("#karma-koli").select2('data').text : '',
                        Type: "Text"
                    });
                    newRowArray.push($("<td/>").text($("#karma-koli").select2('data') != null ? $("#karma-koli").select2('data').text : ''));
                } else {
                    rowRecord.push({
                        Key: "KOLI_URUN_TEXT",
                        PublicId: "7FE38737CD694FC9BF7050D7917566EF",
                        Value: '',
                        Txt: '',
                        Type: "Text"
                    });
                }

                rowRecord.push({
                    FormulaName: "LOGOYA_AKTAR",
                    Key: "",
                    PublicId: "AC234FA7432945E9B9DDAC4A43FF0B69",
                    Value: 'False',
                    Txt: 'False',
                    Type: "Checkbox"
                });

                func_baskiekle(guid, pid, newRowArray, toBool($("#karmaKoliSection").val()));

                var dataInput = $(String.format('#{0}', tableId));

                if (String.isNullOrWhiteSpace(dataInput.val())) return;

                var parentRecord = JSON.parse(dataInput.val()).first('TempId', pid),
                    parentProduct = parentRecord.RowRecord.find(f => f.Key === "urun-karti-artikel"),
                    parentSiraNo = parentRecord.RowRecord.find(f => f.PublicId === "CD160BA3C8634693949612B47F04E4EC");

                rowRecord.push(parentProduct);
                rowRecord.push(parentSiraNo);

                var jsonData = $(String.format('#{0}', tableId));

                var data = new Array();
                if (!String.isNullOrWhiteSpace(jsonData.val())) {
                    data = JSON.parse(jsonData.val());
                }

                //prefix remove
                $.each(rowRecord, function(i, v) {
                    v.PublicId = v.PublicId.replace(String.format("{0}-", printPrefix), "");
                });

                data.push({
                    TempId: guid,
                    RowRecord: rowRecord
                });
                jsonData.val(JSON.stringify(data)).trigger('change');
                var changed = $(String.format('.table-field .{0}[data-value=""] input[name].form-control', printPrefix)).filter(function() {
                    return !String.isNullOrWhiteSpace($(this).val());
                });
                isChanged = changed.length > 0;

                calcTotal();

                emptyModalBlock();
            });

        $('body').on('click',
            '.new-table-add-row',
            function() {

                var $btn = $(this),
                    rowRecord = new Array(),
                    isValid = true,
                    guid = String.newGuid(),
                    // newRow = $('<tr/>', { 'data-id': guid, 'style': trParentBorderCss }),
                    currentTable = $(this).closest('table'),
                    $table = {
                        id: currentTable.data('id'),
                        cols: currentTable.find('thead tr td'),
                        dependencyInputs: currentTable.find('thead tr td [data-inputtype="select"][data-controllingpublicid!=""] input[name]:not(:file)'),
                        tbody: currentTable.children('tbody'),
                        inputsFormulaValue: currentTable.find(String.format('div.{0}[data-fieldtype^="Formula"] input', prefixClass)),
                        inputsNotDefaultValue: currentTable.find(String.format('div.{0}[data-value=""] input:enabled', prefixClass)),
                        inputsWithDefaultValue: currentTable.find(String.format('div.{0}[data-value!=""] input:enabled:visible', prefixClass))
                    };

                var newRowArray = [];
                $table.cols.each(function(i) {
                    var input = $(this).find('input[name]:not(:file), textarea'),
                        parents = input.closest(String.format('div.{0}', prefixClass)),
                        $parent = {
                            publicId: parents.data('publicid'),
                            isActive: parents.data('isactive').toLowerCase() === 'true',
                            isUnique: parents.data('isunique').toLowerCase() === 'true',
                            isUniqueInTable: parents.data('isuniqueintable').toLowerCase() === 'true',
                            isMultiple: parents.data('ismultiplevalue').toLowerCase() === 'true',
                            fieldType: parents.data('fieldtype'),
                            inputType: parents.data('inputtype'),
                            formula: parents.data('formulaname'),
                            key: parents.data('lookupobjecturl'),
                        };

                    input.parent().removeClass('has-error');

                    var value = input.val() != null ? input.val() : '',
                        string = value,
                        txt = value;

                    if ($parent.inputType === 'select') {
                        var s2Json = input.select2('data');
                        if ($parent.isMultiple && s2Json != null) {
                            var txts = $.map(s2Json, function(x) {
                                return x.text;
                            });
                            txt = txts.join(window.systemSperator);
                            string = txts.join(', ');
                        } else {
                            txt = s2Json ? s2Json.text : '';
                            string = txt;
                        }
                    } else if ($parent.inputType === 'checkbox') {
                        if (JSON.parse(value.toLowerCase())) {
                            string = '<i class="far fa-check-square"></i>';
                        } else {
                            string = '<i class="far fa-square"></i>';
                        }
                    } else if ($parent.inputType === 'file') {
                        function fileFormat() {
                            var ul = parents.find('.form-file-list ul li a');
                            if (ul.length > 0) {
                                var files = $.map(ul, function(x) {
                                    return $(x).text();
                                });
                                txt = files.join(window.systemSperator);
                            }
                            var ctx = $('<ul/>', {
                                    'class': 'list-inline'
                                }),
                                filesKeys = value.split(window.systemSperator),
                                filesVals = txt.split(window.systemSperator);

                            if (!String.isNullOrWhiteSpace(value) && filesKeys.length == filesVals.length) {
                                $.each(filesKeys, function(i, v) {
                                    ctx.append($('<li/>').append($('<a/>', {
                                        href: '/document/get/' + v,
                                        target: '_blank'
                                    }).append(filesVals[i])));
                                });
                                var append = $('<div/>').append(ctx);
                                string = append.html();
                            }
                        }
                        fileFormat();
                    } else if ($parent.inputType === 'email' && !String.isNullOrWhiteSpace(input.val()) && !validations.EmailValidate(input.val())) {
                        input.val(null).prop('placeholder', window.notValidEmailTxt).parent().addClass('has-error');
                        input.blur(function() {
                            $(this).parent().removeClass('has-error');
                        });
                        isValid = false;
                        if (!isValid) return false;
                    } else if ($parent.inputType === 'url' && !String.isNullOrWhiteSpace(input.val()) && !validations.UrlValidate(input.val())) {
                        input.val(null).prop('placeholder', window.notValidUrlTxt).parent().addClass('has-error');
                        input.blur(function() {
                            $(this).parent().removeClass('has-error');
                        });
                        isValid = false;
                        if (!isValid) return false;
                    }

                    if (input.hasClass('required') && String.isNullOrWhiteSpace(string) && $parent.isActive) {
                        isValid = false;
                        input.closest('.form-group').addClass('has-error');
                        if (!isValid) return false;
                    }

                    // tablodaki kayıtlarda uniq kontrol
                    if ($parent.isUniqueInTable && !String.isNullOrWhiteSpace(string) && $parent.isActive) {
                        isValid = validations.UniqInTableValidate($parent.publicId, string);
                        if (!isValid) return false;
                    }

                    // önceki kayıtlarda uniq kontrol
                    if ($parent.isUnique && !String.isNullOrWhiteSpace(string) && $parent.isActive) {
                        isValid = validations.UniqOldDataValidate($parent.publicId, value, parents, $btn);
                        if (!isValid) return false;
                    }

                    // 99 row kontrol
                    var jsonTableData = $(String.format('#{0}', $table.id));
                    var tableItem = new Array();
                    if (!String.isNullOrWhiteSpace(jsonTableData.val())) {
                        tableItem = JSON.parse(jsonTableData.val());
                    }

                    if (tableItem.length >= window.maxTableRowCount) {
                        $('#errorModalMsg').text(window.tableHasMaximumRows);
                        $('#error-modal').modal('toggle');
                        return false;
                    }

                    rowRecord.push({
                        Key: $parent.key,
                        PublicId: $parent.publicId,
                        Value: value,
                        Txt: txt,
                        Type: $parent.fieldType
                    });

                    var align = 'left';
                    var recFieldPublicId = $parent.publicId;
                    var label = $('#' + recFieldPublicId);
                    var acss = label.closest('td').css("text-align");
                    if (!String.isNullOrWhiteSpace(acss)) {
                        align = acss;
                    }
                    var el = $('<td/>', {
                        'data-id': $parent.publicId,
                        'data-key': $parent.formula
                    }).append(string).css('text-align', align);
                    // newRow.append(el);
                    newRowArray.push(el);

                    return true;
                });

                // var tdStatus = false;
                // $.each($(newRow).children("td"), function() {
                //     if (!tdStatus && !String.isNullOrWhiteSpace($(this).text())) {
                //         tdStatus = true;
                //         return;
                //     }
                // });

                // if (!tdStatus) return;

                var nullColumns = [{
                        FormulaName: "URUN_ACIKLAMASI",
                        Key: "",
                        PublicId: "959881D672F24C74B2F889973230ADFD",
                        Txt: "",
                        Type: "Text",
                        Value: ""
                    },
                    {
                        FormulaName: "URUN_GORSEL",
                        Key: "baski",
                        PublicId: "60B3EB130A714053B8F95D4998B7190A",
                        Txt: "",
                        Type: "Lookup",
                        Value: ""
                    },
                    {
                        FormulaName: "BASKI_ACIKLAMASI",
                        Key: "baski-aciklamasi",
                        PublicId: "DF75AF67CE0C4C6CAD7CC5BA759E9823",
                        Txt: "",
                        Type: "Lookup",
                        Value: ""
                    },
                    {
                        FormulaName: "BASKI_BIRIM_FIYATI",
                        Key: "",
                        PublicId: "14BC27B7F17745E5B2C0676085BEB543",
                        Txt: "",
                        Type: "Number",
                        Value: ""
                    },
                    {
                        FormulaName: "BASKI_ADETI",
                        Key: "",
                        PublicId: "E7744E5F4D1C4B078DDDCAFA9888C22E",
                        Txt: "",
                        Type: "Number",
                        Value: ""
                    },
                    {
                        FormulaName: "ARA_TOPLM",
                        Key: "",
                        PublicId: "8E0D2767E8FD4BB5BED54F321FCF7DB5",
                        Txt: "0,00",
                        Type: "FormulaNumber",
                        Value: "0,00"
                    },
                    {
                        FormulaName: "ISKONTOLU_TOPLAM",
                        Key: "",
                        PublicId: "3ACF1BD758974A6AA72ABFE8972B596B",
                        Txt: "",
                        Type: "Number",
                        Value: "",
                    },
                    {
                        FormulaName: "KDV_TOP",
                        Key: "",
                        PublicId: "64DC354C12D54607A9600560E5E52BE9",
                        Txt: "",
                        Type: "FormulaNumber",
                        Value: ""
                    },
                    {
                        FormulaName: "LOGOYA_AKTAR",
                        Key: "",
                        PublicId: "AC234FA7432945E9B9DDAC4A43FF0B69",
                        Txt: "False",
                        Type: "Checkbox",
                        Value: "False"
                    },
                    {
                        FormulaName: "URUN_KODU_FS",
                        Key: "",
                        PublicId: "1F8CEEB0C6B148F990763974794D3464",
                        Txt: "",
                        Type: "FormulaString",
                        Value: ""
                    },
                    {
                        FormulaName: "BIRIM_SETI_FS",
                        Key: "",
                        PublicId: "E4E7FBA00D1849A3B1F371C920F40831",
                        Txt: "",
                        Type: "FormulaString",
                        Value: ""
                    },
                    {
                        FormulaName: "ACIKLAMA",
                        Key: "",
                        PublicId: "B6B9E95E4B404F6AA917B57D63149FCA",
                        Txt: $('.productDescription').val(),
                        Type: "Text",
                        Value: $('.productDescription').val()
                    }
                ];

                $.each(nullColumns,
                    function(i, v) {
                        rowRecord.push(v);
                    });

                if (isValid) {

                    func_ekle(guid, newRowArray);

                    $table.inputsFormulaValue.val(null);

                    $table.inputsNotDefaultValue.each(function() {
                        var input = $(this),
                            inputType = $(this).closest(String.format('div.{0}', prefixClass)).data('inputtype');
                        if (inputType == 'select') {
                            input.select2('data', null).trigger('change');
                        } else if (inputType == 'checkbox') {
                            input.val(false).removeAttr('checked');
                        } else if (inputType == 'file') {
                            var pageItem = input.closest(String.format('.{0}', prefixClass));
                            pageItem.find('.form-file-list ul').empty();
                            pageItem.find('.file-browser').removeClass('btn-success').addClass('btn-default');
                            input.val(null);
                        } else {
                            input.val(null);
                        }
                    });
                    $table.inputsWithDefaultValue.each(function() {
                        var input = $(this),
                            parent = $(this).closest(String.format('div.{0}', prefixClass)),
                            inputType = $(this).closest(String.format('div.{0}', prefixClass)).data('inputtype');
                        var defaultValue = parent.data('value');
                        defaultValue = defaultValue != '#error' ? defaultValue : '';
                        if (inputType == 'select') {
                            prepareSelect2SelectedOneItem('#' + parent.data('publicid'), parent.data('selecteditempublicids'), defaultValue, parent.data('ismultiplevalue').toLowerCase() === 'true');
                        } else if (inputType == 'checkbox') {
                            var cbval = defaultValue.toLowerCase();
                            input.val(cbval).removeAttr('checked');;
                            if (JSON.parse(cbval)) {
                                input.prop('checked', true);
                            }
                        } else {
                            input.val(defaultValue);
                        }
                    });

                    $table.dependencyInputs.each(function() {
                        //$(this).select2("enable", false);
                    });

                    var jsonData = $(String.format('#{0}', $table.id));

                    var data = new Array();
                    if (!String.isNullOrWhiteSpace(jsonData.val())) {
                        data = JSON.parse(jsonData.val());
                    }

                    //prefix remove
                    $.each(rowRecord, function(i, v) {
                        v.PublicId = v.PublicId.replace(String.format("{0}-", prefix), "");
                    });

                    data.push({
                        TempId: guid,
                        RowRecord: rowRecord
                    });
                    jsonData.val(JSON.stringify(data)).trigger('change');
                    var changed = $(String.format('.table-field .{0}[data-value=""] input[name].form-control', prefixClass)).filter(function() {
                        return !String.isNullOrWhiteSpace($(this).val());
                    });
                    isChanged = changed.length > 0;
                    $(String.format('#{0}-CD160BA3C8634693949612B47F04E4EC', prefix)).val($("table[data-id=679D6FB684814B4EB9ABA6F778D7D25E]").find('tbody tr:not(.detail-row)').length + 1);
                }

                // $('body').trigger('roolupTriggerEvent', $table.id);
                calcTotal();
            });

        function func_ekle(guid, arr) {

            var appendTable = $('.append-table-items tbody:first'),
                newRow = $('<tr/>', {
                    'data-id': guid,
                    'style': trParentBorderCss
                });

            appendTable.find('.record-notfound').hide();

            newRow.append($('<th/>').append('<input type="checkbox" class="product" data-tempid="' + guid + '"/>'));
            // newRow.append($('<td/>').append('<button type="button" class="btn btn-info btn-sm detail-row" data-type="0" style="width:26px;height:26px;padding:0;margin-top:3px" data-target="#detailrow_' + guid + '"><i class="fa fa-chevron-down"></i></button>'));

            var siraNo = arr[0],
                urun = arr[1],
                listeFiyati = arr[3],
                iskonto = arr[4],
                netFiyat = arr[5],
                adet = arr[2],
                araToplam = arr[6],
                kdvOrani = arr[7],
                kdvToplam = calcSeparatorRemove($(arr[6]).text()) * calcSeparatorRemove($(arr[7]).text()) / 100,
                toplam = arr[8];

            var i;
            for (i = 0; i < 13; i++) {
                switch (i) {
                    case 0: //Sıra No
                        newRow.append(siraNo);
                        break;
                    case 1: //Ürün Kodu
                        newRow.append($("<td/>", {
                            'data-key': 'URUN_KODU'
                        }).text($(".productCode").val()));
                        break;
                    case 2: //Ürün
                        newRow.append(urun);
                        break;
                    case 3: //Adet
                        newRow.append($("<td/>", {
                            'data-key': 'BASKI_ACIKLAMASI'
                        }).text(''));
                        break;
                    case 4: //Birim
                        newRow.append($("<td/>", {
                            'data-id': adet.attr('data-id'),
                            'data-key': adet.attr('data-key'),
                            'style': adet.attr('style')
                        }).text(turkishLanguagePriceFormatedOutput(adet.text(), 0)));
                        break;
                    case 5: //Baskı Açıklaması
                        newRow.append($("<td/>", {
                            'data-key': 'BIRIM_SETI'
                        }).text($(".unitCode").val()));
                        break;
                    case 6: //Liste Fiyatı
                        newRow.append(listeFiyati);
                        break;
                    case 7: //İskonto
                        newRow.append(iskonto);
                        break;
                    case 8: //Net Fiyat
                        // newRow.append(netFiyat);,
                        var netFiyatVariable = parseFloat(calcSeparatorRemove(netFiyat.text())).toFixed(4);
                        newRow.append($("<td/>", {
                            'data-id': netFiyat.attr('data-id'),
                            'data-key': netFiyat.attr('data-key'),
                            'style': netFiyat.attr('style')
                        }).text(turkishLanguagePriceFormatedOutput(netFiyatVariable.toString().replace(/,/g, ""), 4)));
                        break;
                    case 9: //Ara Toplam
                        // newRow.append(araToplam);
                        var araToplamVariable = parseFloat(calcSeparatorRemove(araToplam.text())).toFixed(2);
                        newRow.append($("<td/>", {
                            'data-id': araToplam.attr('data-id'),
                            'data-key': araToplam.attr('data-key'),
                            'style': araToplam.attr('style')
                        }).text(turkishLanguagePriceFormatedOutput(araToplamVariable.toString().replace(/,/g, ""), 2)));
                        break;
                    case 10: //Kdv Oranı
                        newRow.append(kdvOrani);
                        break;
                    case 11: //KDV
                        newRow.append($("<td/>", {
                            'data-key': 'KDV'
                        }).text(turkishLanguagePriceFormatedOutput(kdvToplam.toString().replace(/,/g, ""))));
                        break;
                    case 12: //Toplam
                        // newRow.append(toplam);
                        var toplamVariable = parseFloat(calcSeparatorRemove(toplam.text())).toFixed(2);
                        newRow.append($("<td/>", {
                            'data-id': toplam.attr('data-id'),
                            'data-key': toplam.attr('data-key'),
                            'style': toplam.attr('style')
                        }).text(turkishLanguagePriceFormatedOutput(toplamVariable.toString().replace(/,/g, ""), 2)));
                        // newRow.append($("<td/>").text(turkishLanguagePriceFormatedOutput(toplam.text(), 2)));
                        break;
                    default:
                        break;
                }
            }

            newRow = newRow.append($('<td/>')
                .append($('<div/>', {
                        'class': 'text-right'
                    })
                    .append($('<a/>', {
                        'class': 'btn btn-xs btn-info new-table-prints-row'
                    }).append('<i>BG</i>'))
                ));

            appendTable.append(newRow);
            appendTable.append($("<tr/>", {
                id: String.format('detailrow_{0}', guid),
                "style": "display:none;background: rgb(101 101 101);",
                'class': 'detail-row'
            }).append($("<td/>", {
                colspan: "15",
                style: "padding-left: 6%;padding-bottom: 0;"
            }).append($("<table/>", {
                class: 'table table-bordered table-hover',
                style: 'margin-bottom: 8px !important;table-layout:fixed',
                "data-id": "679D6FB684814B4EB9ABA6F778D7D25E"
            }))));

            var detailRow = $(String.format("#detailrow_{0} td table", guid));

            detailRow.append($("<thead/>").append($('<tr/>', {
                class: 'detail-row'
            }))).append($('<tbody/>'));

            var appendThead = detailRow.find('thead'),
                appendTbody = detailRow.find('tbody')

            $.each(secondRowHeadersTable2, function(index, val) {
                var width = "auto";
                if (index === 0) {
                    width = "300px";
                } else if (index == secondRowHeadersTable2.length - 2) {
                    width = "135px";
                } else if (index == secondRowHeadersTable2.length - 1) {
                    width = "105px";
                }
                appendThead.find('tr').append($('<th/>', {
                        'data-index': index,
                        'style': String.format('padding:5px;width:{0}', width)
                    })
                    .append(val));
            });

            var infoRow = $("<tr/>", {
                'data-id': guid,
                'class': 'info-print detail-row'
            });
            var y;
            for (y = 0; y < 11; y++) {
                switch (y) {
                    case 0: //Ürün
                        infoRow.append(urun.clone());
                        break;
                    case 1: //Adet
                        // infoRow.append(adet.clone());
                        infoRow.append($("<td/>", {
                            'data-key': 'BASKI_ACIKLAMASI'
                        }).text(''));
                        break;
                    case 2: //Baskı Açıklaması
                        infoRow.append($("<td/>", {
                            'data-key': 'KOLI_URUN_TEXT'
                        }).text(''));
                        break;
                    case 3: //Koli Ürün Text
                        infoRow.append($("<td/>", {
                            'data-id': adet.attr('data-id'),
                            'data-key': adet.attr('data-key'),
                            'style': adet.attr('style')
                        }).text(turkishLanguagePriceFormatedOutput(adet.text(), 0)));
                        break;
                    case 4: //listeFiyati
                        infoRow.append(listeFiyati.clone());
                        break;
                    case 5: //iskonto
                        infoRow.append(iskonto.clone());
                        break;
                    case 6: //netFiyat
                        // infoRow.append($("<td/>").text(turkishLanguagePriceFormatedOutput(netFiyat.text(), 4)));
                        var netFiyatVariable = parseFloat(calcSeparatorRemove(netFiyat.text())).toFixed(4);
                        infoRow.append($("<td/>", {
                            'data-id': netFiyat.attr('data-id'),
                            'data-key': netFiyat.attr('data-key'),
                            'style': netFiyat.attr('style')
                        }).text(turkishLanguagePriceFormatedOutput(netFiyatVariable.toString().replace(/,/g, ""), 4)));
                        break;
                    case 7: //Ara Toplam
                        // infoRow.append($("<td/>").text(turkishLanguagePriceFormatedOutput(araToplam.text(), 2)));
                        var araToplamVariable = parseFloat(calcSeparatorRemove(araToplam.text())).toFixed(2);
                        infoRow.append($("<td/>", {
                            'data-id': araToplam.attr('data-id'),
                            'data-key': araToplam.attr('data-key'),
                            'style': araToplam.attr('style')
                        }).text(turkishLanguagePriceFormatedOutput(araToplamVariable.toString().replace(/,/g, ""), 2)));
                        break;
                    case 8: //Kdv Oranı
                        infoRow.append(kdvOrani.clone());
                        break;
                    case 9: //KDV
                        infoRow.append($("<td/>", {
                            'data-key': 'KDV'
                        }).text(turkishLanguagePriceFormatedOutput(kdvToplam.toString().replace(/,/g, ""))));
                        break;
                    case 10: //Toplam
                        // infoRow.append(toplam.clone());
                        var toplamVariable = parseFloat(calcSeparatorRemove(toplam.text())).toFixed(2);
                        infoRow.append($("<td/>", {
                            'data-id': toplam.attr('data-id'),
                            'data-key': toplam.attr('data-key'),
                            'style': toplam.attr('style')
                        }).text(turkishLanguagePriceFormatedOutput(toplamVariable.toString().replace(/,/g, ""), 2)));
                        break;
                    default:
                        break;
                }
            }

            infoRow.append($('<td/>')
                .append($('<div/>', {
                        'class': 'text-right'
                    })
                    .append($('<a/>', {
                        'class': 'btn btn-xs btn-primary new-table-product-description-edit-row',
                        'style': 'margin-right:4px;'
                    }).append('<i class="fas fa-comment-alt"></i>'))
                    .append($('<a/>', {
                        'class': 'btn btn-xs btn-warning new-table-edit-row'
                    }).append('<i class="fas fa-edit"></i>'))
                    .append(' ')
                    .append($('<a/>', {
                        'class': 'btn btn-xs btn-danger new-table-remove-row'
                    }).append('<i class="fas fa-trash"></i>'))
                ));

            appendTbody.append(infoRow);
            textAlignRight();
        }

        $("body").on("click", ".new-table-product-description-edit-row", function() {
            var button = $(this),
                table = $("table[data-id=679D6FB684814B4EB9ABA6F778D7D25E]").first(),
                tableId = table.data('id'),
                currentRow = button.closest('tr'),
                dataInput = $(String.format('#{0}', tableId));

            if (String.isNullOrWhiteSpace(dataInput.val())) return;

            var jsonItem = JSON.parse(dataInput.val()).first('TempId', currentRow.data('id'));

            if (jsonItem === undefined) {
                return;
            }

            $("#modalUrunAciklama").remove();
            window.setModal.Create({
                id: 'modalUrunAciklama',
                html: {
                    header: 'Ürün Açıklaması',
                    body: '<textarea class="form-control stock-description" rows="3" style="resize:vertical;" onkeypress="if (this.value.length >= 450) { return false; }"i maxlength="450"></textarea>',
                    footer: '<button class="btn btn-sm btn-success btn-stock-description-update" data-dismiss="modal" data-tempid="' + currentRow.data('id') + '">Kaydet</button><button class="btn btn-sm btn-danger" data-dismiss="modal">Kapat</button>'
                }
            });
            $(".stock-description").val(jsonItem.RowRecord.find(f => f.PublicId === "B6B9E95E4B404F6AA917B57D63149FCA").Value);
            $("#modalUrunAciklama").modal("toggle");
        });

        var descUpdate = true;
        $("body").on("click",
            ".btn-stock-description-update",
            function() {
                var jsonDataInput = $(String.format('#{0}', "679D6FB684814B4EB9ABA6F778D7D25E")),
                    jsonArr = JSON.parse(jsonDataInput.val()),
                    jsonItem = jsonArr.first('TempId', $(this).data('tempid')),
                    desciption = jsonItem.RowRecord.find(f => f.PublicId === "B6B9E95E4B404F6AA917B57D63149FCA"),
                    newGuid = String.newGuid();

                desciption.Txt = $('.stock-description').val();
                desciption.Value = $('.stock-description').val();

                if (jsonArr.length > 0 && descUpdate) {
                    descUpdate = false;
                    var jsonItem = jsonArr.first();
                    jsonItem.TempId = newGuid;
                    $(String.format("tr[data-id={0}]", $(this).data('tempid'))).attr('data-id', newGuid);
                    $(String.format("input[data-tempid={0}]", $(this).data('tempid'))).attr('data-tempid', newGuid);
                    $(String.format("tr[id=detailrow_{0}]", $(this).data('tempid'))).attr('id', String.format("detailrow_{0}", newGuid));
                    $(String.format("tr[data-relationid={0}]", $(this).data('tempid'))).attr('data-relationid', newGuid);
                }

                jsonDataInput.val(JSON.stringify(jsonArr)).trigger('change');
            });

        function func_parentRecordUpdate(recordId, parentRecordUpdate) {
            var parentRecord = $(String.format('tr[data-id={0}]:first',
                    recordId)),
                detailRows = $(String.format('tr[id=detailrow_{0}] td table tbody tr',
                    recordId));
            var netFiyatToplam = 0,
                adetToplam = 0,
                araToplam = 0,
                kdvToplam = 0,
                toplamFiyat = 0,
                baskiAciklamasi = "",
                recordListeFiyati = 0,
                recordIskonto = 0,
                recordKdv = 0,
                recordAdet = 0;

            detailRows.each(function(i,
                v) {
                var netFiyatFormula = "NET_FIYAT",
                    adetFormula = "BASKI_ADETI",
                    araFormula = "ARA_TOPLAM";
                if (i === 0) {
                    netFiyatFormula = "ISKONTOLU_BIRIM_FIYAT";
                    adetFormula = "ADET";
                    araFormula = "ARA_TOPLAM_ISKONTOLU_TOPLAM_T";
                    recordListeFiyati = $(v).find(String.format('td[data-key=BIRIM_FIYATT]')).text().trim();
                    recordIskonto = $(v).find(String.format('td[data-key=ISKONTO]')).text().trim();
                    recordKdv = $(v).find(String.format('td[data-key=KDV_ORANI]')).text().trim();
                    recordAdet = $(v).find(String.format('td[data-key=ADET]')).text().trim();
                }

                var netFiyat = calcSeparatorRemove($(v).find(String.format('td[data-key={0}]', netFiyatFormula)).text().trim()),
                    adet = $(v).find(String.format('td[data-key={0}]', adetFormula)).text().trim(),
                    iskontoluAra = calcSeparatorRemove($(v).find(String.format('td[data-key={0}]', araFormula)).text().trim()),
                    kdv = calcSeparatorRemove($(v).find('td[data-key=KDV]').text().trim()),
                    toplam = calcSeparatorRemove($(v).find('td[data-key=TOPLAM_FIYAT]').text().trim()),
                    baski = $(v).find('td[data-key=URUN_GORSEL]').text().trim(),
                    bAciklama = $(v).find('td[data-key=BASKI_ACIKLAMASI]').text().trim();

                netFiyatToplam += parseFloat(iskontoluAra);
                adetToplam += parseInt(adet);
                araToplam += parseFloat(iskontoluAra);
                kdvToplam += parseFloat(kdv);
                toplamFiyat += parseFloat(toplam);
                if (!String.isNullOrWhiteSpace(baski) || !String.isNullOrWhiteSpace(bAciklama)) {
                    baskiAciklamasi += String.format("{0} / {1} <br>", baski, bAciklama);
                }
            });

            if (parentRecordUpdate) {
                parentRecord.find('td[data-key=BIRIM_FIYATT]').text(recordListeFiyati);
                parentRecord.find('td[data-key=ISKONTO]').text(recordIskonto);
                parentRecord.find('td[data-key=KDV_ORANI]').text(recordKdv);
                parentRecord.find('td[data-key=ADET]').text(recordAdet);
            }

            if (detailRows.length > 1) {
                parentRecord.find("th:first #parentArrowIcon").remove();
                parentRecord.find("th:first").prepend('<span id="parentArrowIcon" style="float: left;"><i class="fa fa-arrow-circle-down fa-2x" title="' + detailRows.length + ' adet ürün" style="font-size: 25px;margin:4px 4px 0 0"></i></span>');
            } else {
                parentRecord.find("th:first #parentArrowIcon").remove();
            }

            // parentRecord.find('td[data-key=ADET]').text(adetToplam);
            var urunAdi = $(String.format('tr[id=detailrow_{0}] td table tbody tr:first td[data-key=URUN]', recordId)).text();
            parentRecord.find('td[data-key=URUN]').text(urunAdi);
            parentRecord.find('td[data-key=URUN_KODU_FS]').text(urunAdi.contains("-") ? urunAdi.split(' - ').first() : "");
            parentRecord.find('td[data-key=ARA_TOPLAM_ISKONTOLU_TOPLAM_T]').text(turkishLanguagePriceFormatedOutput(araToplam));
            parentRecord.find('td[data-key=KDV]').text(turkishLanguagePriceFormatedOutput(kdvToplam));
            parentRecord.find('td[data-key=TOPLAM_FIYAT]').text(turkishLanguagePriceFormatedOutput(toplamFiyat));
            parentRecord.find('td[data-key=BASKI_ACIKLAMASI]').html(baskiAciklamasi);
            var netFiyatFormula = parseFloat(calcSeparatorRemove(parentRecord.find('td[data-key=ARA_TOPLAM_ISKONTOLU_TOPLAM_T]').text())) /
                parseFloat(calcSeparatorRemove(parentRecord.find('td[data-key=ADET]').text()));
            parentRecord.find('td[data-key=ISKONTOLU_BIRIM_FIYAT]').text(turkishLanguagePriceFormatedOutput(netFiyatFormula, 4));

        }

        $('body').on('click', '.new-table-edit-row', function() {
            var button = $(this),
                table = $("table[data-id=679D6FB684814B4EB9ABA6F778D7D25E]").first(),
                tableId = table.data('id'),
                currentRow = button.closest('tr'),
                ths = table.find('thead:first').last('tr').find('td'),
                tds = currentRow.find('td'),
                dataInput = $(String.format('#{0}', tableId));

            if (String.isNullOrWhiteSpace(dataInput.val())) return;

            isChanged = true;
            var jsonItem = JSON.parse(dataInput.val()).first('TempId', currentRow.attr('data-id'));

            currentRow.addClass('info');
            table.find('.btn').addClass('disabled');

            //delete button to cancel button
            var removeRow = button.parent().find('.new-table-remove-row');
            removeRow.removeClass('disabled').removeClass('new-table-remove-row').addClass('new-table-cancel-row');
            removeRow.find('i.fa').removeClass().addClass('far fa-times-circle');

            //edit button to save button
            button.removeClass().addClass('btn btn-xs btn-success new-table-save-row');
            button.find('i.fa').removeClass().addClass('fas fa-save');

            var i;
            for (i = 0; i < 11; i++) {

                var td = $(tds[i]),
                    th = '',
                    rec = '';

                if (i === 0) {
                    th = $(ths[1]);
                    rec = jsonItem.RowRecord.find(f => f.PublicId === "B961CD1891B84EAF981DD75F5C287196");
                } else if (i === 1 || i === 2) {
                    //baskiAciklamasi - koli ürün text
                    rec = null;
                } else if (i === 3) {
                    //adet
                    th = $(ths[2]);
                    rec = jsonItem.RowRecord.find(f => f.PublicId === "694AEFD22A054E63BB42DC9FF50C94F1");
                } else if (i === 4) {
                    //listeFiyati
                    th = $(ths[3]);
                    rec = jsonItem.RowRecord.find(f => f.PublicId === "EA0CD301669E4911BACC03F3E371F083");
                } else if (i === 5) {
                    //iskonto
                    th = $(ths[4]);
                    rec = jsonItem.RowRecord.find(f => f.PublicId === "8E9BD6BD7BD34FED97E8FA811DEF6C7A");
                } else if (i === 6) {
                    th = $(ths[5]);
                    rec = jsonItem.RowRecord.find(f => f.PublicId === "E07E26850A4745819C4BCD6E9E68993F");
                } else if (i === 7) {
                    //Ara Toplam
                    th = $(ths[6]);
                    rec = jsonItem.RowRecord.find(f => f.PublicId === "9DF93E4F54E74F4BA3B80C6E2A47F962");
                } else if (i === 8) {
                    //Kdv Oranı
                    th = $(ths[7]);
                    rec = jsonItem.RowRecord.find(f => f.PublicId === "C841EF9FC7C947B99F297A914E538BDA");
                } else if (i === 9) {
                    //Kdv
                    rec = null;
                } else if (i === 10) {
                    //KDV Toplam Fiyat
                    th = $(ths[8]);
                    rec = jsonItem.RowRecord.find(f => f.PublicId === "DC072FF5D76A4E9E922D3020C182E90A");
                }

                txt = td.html();
                td.html($('<div/>', {
                    'class': 'hidden'
                }).append(txt));

                if (rec === null) continue;

                var pageItem = $(th.children(String.format('.{0}', prefixClass))).clone().removeClass(String.format('{0}', prefixClass)).addClass('editable-page-item').empty(),
                    editId = 'edit' + pageItem.data('publicid');

                pageItem.data('publicid', editId);
                pageItem.data('selecteditempublicids', rec.Value || '');
                pageItem.data('value', rec.Txt || '');

                if (pageItem.data('controllingpublicid')) {
                    pageItem.data('controllingpublicid', 'edit' + pageItem.data('controllingpublicid'));
                }

                td.append(pageItem);
            }

            currentRow.find('.editable-page-item').setForm({
                prefix: '.editable-page-item',
                customObjectId: $('#CustomObjectPublicId').val(),
                recordPublicId: $('#RecordPublicId').val()
            });
            $('.table-field table input[required]').removeAttr('required').addClass('required');
        });

        $("body").on("click",
            "table[data-id=679D6FB684814B4EB9ABA6F778D7D25E] tbody tr:not(.record-notfound) td",
            function() {
                var id = $(this).closest('tr').attr('data-id'),
                    tr = $(this).closest('tr');
                if (tr.hasClass("info-print") || tr.hasClass("detail-row") || $(this).find('a.btn').hasClass("new-table-prints-row")) return;
                $(String.format("#detailrow_{0}", id)).toggle();
            });

        function textAlignRight() {
            $(".detail-row").find('td[data-key=ADET], td[data-key=BIRIM_FIYATT], td[data-key=ISKONTO], td[data-key=ISKONTOLU_BIRIM_FIYAT], td[data-key=ARA_TOPLAM_ISKONTOLU_TOPLAM_T], td[data-key=KDV_ORANI], td[data-key=KDV], td[data-key=TOPLAM_FIYAT], td[data-key=BASKI_ADETI], td[data-key=BASKI_BIRIM_FIYATI],  td[data-key=NET_FIYAT],  td[data-key=ARA_TOPLAM], td[data-key=ARA_TOPLAM]').css("text-align",
                "right");
        }

        var arrUpdate = true;
        $('body').on('click',
            '.new-table-save-row',
            function() {
                var button = $(this),
                    table = button.closest('table'),
                    tableId = table.data('id'),
                    currentRow = button.closest('tr'),
                    jsonDataInput = $(String.format('#{0}', tableId)),
                    elementIds = currentRow.find('.editable-page-item input, .editable-page-item textarea').map(function() {
                        if (!String.isNullOrWhiteSpace(this.id)) return this.id
                    }),
                    isValid = true,
                    guid = currentRow.attr('data-id'),
                    newGuid = String.newGuid();

                if (String.isNullOrWhiteSpace(jsonDataInput.val())) return;

                var jsonArr = JSON.parse(jsonDataInput.val()),
                    jsonItem = jsonArr.first('TempId', guid);

                // validations
                currentRow.find('td .editable-page-item').each(function() {
                    var panel = $(this),
                        id = panel.data('publicid').contains('edit') ? panel.data('publicid').replace('edit', '') : panel.data('publicid'),
                        input = panel.find('[name="edit' + id + '"]'),
                        val = input.val() || '',
                        $parent = {
                            isActive: panel.data('isactive').toLowerCase() === 'true',
                            isUnique: panel.data('isunique').toLowerCase() === 'true',
                            isUniqueInTable: panel.data('isuniqueintable').toLowerCase() === 'true',
                            inputType: panel.data('inputtype')
                        };

                    if (id.contains('-')) {
                        // Table field satır editleme anında edit-{id} prefix i, Table field toplu satır eklemede {index}-{id} prefix i alır. İlgili durum kontrolü.
                        id = id.split('-')[1];
                    }

                    // tablodaki kayıtlarda uniq kontrol
                    if ($parent.isUniqueInTable && !String.isNullOrWhiteSpace(val) && input.closest('td').find('div.hidden').html() != val && $parent.isActive) {
                        isValid = validations.UniqInTableValidate(id, val);
                        if (!isValid) return false;
                    }

                    // önceki kayıtlarda uniq kontrol
                    if ($parent.isUnique && !String.isNullOrWhiteSpace(val) && $parent.isActive) {
                        isValid = validations.UniqOldDataValidate(id, val, panel, button);
                        if (!isValid) return false;
                    }

                    if ($parent.inputType === 'email' && !String.isNullOrWhiteSpace(val) && !validations.EmailValidate(val)) {
                        input.val(null).prop('placeholder', window.notValidEmailTxt).parent().addClass('has-error');
                        isValid = false;
                        if (!isValid) return false;
                    }

                    if ($parent.inputType === 'url' && !String.isNullOrWhiteSpace(val) && !validations.UrlValidate(val)) {
                        input.val(null).prop('placeholder', window.notValidUrlTxt).parent().addClass('has-error');
                        isValid = false;
                        if (!isValid) return false;
                    }

                    if (input.hasClass('required') && String.isNullOrWhiteSpace(val) && $parent.isActive) {
                        isValid = false;
                        input.parent().addClass('has-error');
                        if (!isValid) return false;
                    }

                    return true;
                });

                if (!isValid) {
                    return;
                }

                isChanged = false;

                currentRow.find('td .editable-page-item').each(function(i) {
                    var panel = $(this),
                        id = panel.data('publicid') ? panel.data('publicid').replace('edit', '') : '',
                        input = panel.find('[name="edit' + id + '"]');

                    if (String.isNullOrWhiteSpace(id)) {
                        input.closest('td').html(input.closest('td').children('div.hidden').html());
                        return true;
                    }
                    var rec = ""; //jsonItem.RowRecord[i];
                    var urunSiraNo = null;
                    switch (i) {
                        case 0: //urun
                            rec = jsonItem.RowRecord.find(f => f.PublicId === "B961CD1891B84EAF981DD75F5C287196");
                            urunSiraNo = jsonItem.RowRecord.find(f => f.PublicId == "CD160BA3C8634693949612B47F04E4EC").Value;
                            break;
                        case 1: //adet
                            rec = jsonItem.RowRecord.find(f => f.PublicId === "694AEFD22A054E63BB42DC9FF50C94F1");
                            break;
                        case 2: //lf
                            rec = jsonItem.RowRecord.find(f => f.PublicId === "EA0CD301669E4911BACC03F3E371F083");
                            break;
                        case 3: //iskonto
                            rec = jsonItem.RowRecord.find(f => f.PublicId === "8E9BD6BD7BD34FED97E8FA811DEF6C7A");
                            break;
                        case 4:
                            rec = jsonItem.RowRecord.find(f => f.PublicId === "E07E26850A4745819C4BCD6E9E68993F");
                            break;
                        case 5:
                            rec = jsonItem.RowRecord.find(f => f.PublicId === "9DF93E4F54E74F4BA3B80C6E2A47F962");
                            break;
                        case 6:
                            rec = jsonItem.RowRecord.find(f => f.PublicId === "C841EF9FC7C947B99F297A914E538BDA");
                            break;
                        case 7:
                            rec = jsonItem.RowRecord.find(f => f.PublicId === "DC072FF5D76A4E9E922D3020C182E90A");
                            break;
                        default:
                            break;
                    }

                    var type = rec.Type,
                        val = input.val(),
                        txt = '',
                        string = '';

                    if (type == 'SelectList' || type == 'Lookup' || type == 'OrganizationalUnit' || type == 'Predefined') {
                        var s2Json = input.select2('data');
                        if (s2Json == null) s2Json = new Array();
                        if (JSON.parse(panel.data('ismultiplevalue').toLowerCase())) {
                            var txts = $.map(s2Json, function(x) {
                                return x.text;
                            });
                            txt = txts.join(window.systemSperator);
                            string = txt;
                        } else {
                            txt = s2Json.text;
                            string = txt;
                        }

                        if (i == 0 && val !== rec.Value) {
                            $.each(jsonArr, function(i, v) {
                                var siraNo = v.RowRecord.find(f => f.PublicId == "CD160BA3C8634693949612B47F04E4EC").Value;
                                if (siraNo === urunSiraNo) {
                                    $.each(v.RowRecord, function(o, g) {
                                        if (g.PublicId === "B961CD1891B84EAF981DD75F5C287196") {
                                            g.Value = s2Json.id;
                                            g.Txt = s2Json.text;
                                        }
                                    });
                                }
                            });
                        }

                    } else if (type == 'File' || type == 'Image') {
                        function fileFormat() {
                            var ul = panel.find('.form-file-list ul li a');
                            if (ul.length > 0) {
                                var files = $.map(ul, function(x) {
                                    return $(x).text();
                                });
                                txt = files.join(window.systemSperator);
                                var fileLi = ul.closest('.form-file-list');
                                fileLi.find('.file-browser-remove').remove();
                                string = fileLi.html();
                            }
                        }
                        fileFormat();
                    } else if (type == 'Checkbox') {
                        txt = input.val();
                        if (JSON.parse(txt.toLowerCase())) {
                            string = '<i class="far fa-check-square"></i>';
                        } else {
                            string = '<i class="far fa-square"></i>';
                        }
                    } else {
                        txt = input.val();
                        string = txt;
                    }

                    rec.Type = panel.data('fieldtype');

                    rec.Value = val || '';
                    rec.Txt = txt || '';

                    string = string || '';

                    if (i == 1) {
                        //adet
                        var changedString = parseFloat(calcSeparatorRemove(string));
                        panel.closest('td').html(turkishLanguagePriceFormatedOutput(changedString.toString(), 0));
                    } else if (i === 4) {
                        //net Fiyat
                        var changedString = parseFloat(calcSeparatorRemove(string)).toFixed(4);
                        panel.closest('td').html(turkishLanguagePriceFormatedOutput(changedString.toString().replace(/,/g, ""), 4));
                    } else if (i === 5 || i === 7) {
                        //aratoplam - toplam fiyat
                        var changedString = parseFloat(calcSeparatorRemove(string)).toFixed(2);
                        panel.closest('td').html(turkishLanguagePriceFormatedOutput(changedString.toString().replace(/,/g, ""), 2));
                    } else {
                        panel.closest('td').html(string.split(window.systemSperator).join(', '));
                    }
                    return true;
                });

                currentRow.removeClass('info');
                table.find('.btn').removeClass('disabled');

                var araToplam = calcSeparatorRemove(currentRow.find('td[data-key=ARA_TOPLAM_ISKONTOLU_TOPLAM_T]').text()),
                    kdvOrani = calcSeparatorRemove(currentRow.find('td[data-key=KDV_ORANI]').text()),
                    sonuc = araToplam * kdvOrani / 100;

                currentRow.find('td[data-key=KDV]').html(turkishLanguagePriceFormatedOutput(parseFloat(sonuc).toFixed(2)));

                if (jsonArr.length > 0 && arrUpdate) {
                    arrUpdate = false;
                    var jsonItem = jsonArr.first();
                    jsonItem.TempId = newGuid;
                    $(String.format("tr[data-id={0}]", guid)).attr('data-id', newGuid);
                    $(String.format("input[data-tempid={0}]", guid)).attr('data-tempid', newGuid);
                    $(String.format("tr[id=detailrow_{0}]", guid)).attr('id', String.format("detailrow_{0}", newGuid));
                    $(String.format("tr[data-relationid={0}]", guid)).attr('data-relationid', newGuid);
                    func_parentRecordUpdate(newGuid, true);
                } else {
                    currentRow.data('id',
                        guid);
                    jsonItem.TempId = guid;
                    func_parentRecordUpdate(guid, true);
                }

                jsonDataInput.val(JSON.stringify(jsonArr)).trigger('change');

                //cancel button to delete button
                var removeRow = button.parent().find('.new-table-cancel-row');
                removeRow.removeClass('new-table-cancel-row').addClass('new-table-remove-row');
                removeRow.find('i.fa').removeClass().addClass('fas fa-trash');

                //save button to edit button
                button.removeClass().addClass('btn btn-xs btn-warning new-table-edit-row');
                button.find('i.fa').removeClass().addClass('fas fa-edit');

                // $('body').trigger('roolupTriggerEvent', tableId);
                calcTotal();

                $(".new-table-add-row, .new-table-reset").removeClass("disabled");
                // $('body').trigger('clearChangeEvents', [{ ids: elementIds }]);
            });

        $('body').on('click',
            '.new-table-print-save-row',
            function() {
                var button = $(this),
                    table = button.closest('table'),
                    tableId = table.data('id'),
                    currentRow = button.closest('tr'),
                    jsonDataInput = $(String.format('#{0}', tableId)),
                    elementIds = currentRow.find('.editable-page-item input, .editable-page-item textarea').map(function() {
                        if (!String.isNullOrWhiteSpace(this.id)) return this.id
                    }),
                    isValid = true,
                    guid = String.newGuid();

                if (String.isNullOrWhiteSpace(jsonDataInput.val())) return;

                var jsonArr = JSON.parse(jsonDataInput.val()),
                    jsonItem = jsonArr.first('TempId', currentRow.attr('data-id'));

                // validations
                currentRow.find('td .editable-page-item').each(function() {
                    var panel = $(this),
                        id = panel.data('publicid').contains('edit') ? panel.data('publicid').replace('edit', '') : panel.data('publicid'),
                        input = panel.find('[name="edit' + id + '"]'),
                        val = input.val() || '',
                        $parent = {
                            isActive: panel.data('isactive').toLowerCase() === 'true',
                            isUnique: panel.data('isunique').toLowerCase() === 'true',
                            isUniqueInTable: panel.data('isuniqueintable').toLowerCase() === 'true',
                            inputType: panel.data('inputtype')
                        };

                    if (id.contains('-')) {
                        // Table field satır editleme anında edit-{id} prefix i, Table field toplu satır eklemede {index}-{id} prefix i alır. İlgili durum kontrolü.
                        id = id.split('-')[1];
                    }

                    // tablodaki kayıtlarda uniq kontrol
                    if ($parent.isUniqueInTable && !String.isNullOrWhiteSpace(val) && input.closest('td').find('div.hidden').html() != val && $parent.isActive) {
                        isValid = validations.UniqInTableValidate(id, val);
                        if (!isValid) return false;
                    }

                    // önceki kayıtlarda uniq kontrol
                    if ($parent.isUnique && !String.isNullOrWhiteSpace(val) && $parent.isActive) {
                        isValid = validations.UniqOldDataValidate(id, val, panel, button);
                        if (!isValid) return false;
                    }

                    if ($parent.inputType === 'email' && !String.isNullOrWhiteSpace(val) && !validations.EmailValidate(val)) {
                        input.val(null).prop('placeholder', window.notValidEmailTxt).parent().addClass('has-error');
                        isValid = false;
                        if (!isValid) return false;
                    }

                    if ($parent.inputType === 'url' && !String.isNullOrWhiteSpace(val) && !validations.UrlValidate(val)) {
                        input.val(null).prop('placeholder', window.notValidUrlTxt).parent().addClass('has-error');
                        isValid = false;
                        if (!isValid) return false;
                    }

                    if (input.hasClass('required') && String.isNullOrWhiteSpace(val) && $parent.isActive) {
                        isValid = false;
                        input.parent().addClass('has-error');
                        if (!isValid) return false;
                    }

                    return true;
                });
                if (!isValid) {
                    return;
                }

                isChanged = false;

                currentRow.find('td .editable-page-item').each(function(i) {
                    var panel = $(this),
                        id = panel.data('publicid') ? panel.data('publicid').replace('edit', '') : '',
                        input = panel.find('[name="edit' + id + '"]');

                    if (String.isNullOrWhiteSpace(id)) {
                        input.closest('td').html(input.closest('td').children('div.hidden').html());
                        return true;
                    }

                    var rec = "";
                    switch (i) {
                        case 0:
                            rec = jsonItem.RowRecord.find(f => f.PublicId === "60B3EB130A714053B8F95D4998B7190A");
                            break;
                        case 1:
                            rec = jsonItem.RowRecord.find(f => f.PublicId === "DF75AF67CE0C4C6CAD7CC5BA759E9823");
                            break;
                        case 2:
                            rec = jsonItem.RowRecord.find(f => f.PublicId === "E7744E5F4D1C4B078DDDCAFA9888C22E");
                            break;
                        case 3:
                            rec = jsonItem.RowRecord.find(f => f.PublicId === "14BC27B7F17745E5B2C0676085BEB543");
                            break;
                        case 4:
                            rec = jsonItem.RowRecord.find(f => f.PublicId === "8E9BD6BD7BD34FED97E8FA811DEF6C7A");
                            break;
                        case 5:
                            rec = jsonItem.RowRecord.find(f => f.PublicId === "C841EF9FC7C947B99F297A914E538BDA");
                            break;
                        case 6:
                            rec = jsonItem.RowRecord.find(f => f.PublicId === "DC072FF5D76A4E9E922D3020C182E90A");
                            break;
                        default:
                            break;
                    }

                    var type = rec.Type,
                        val = input.val(),
                        txt = '',
                        string = '';

                    if (type == 'SelectList' || type == 'Lookup' || type == 'OrganizationalUnit' || type == 'Predefined') {
                        var s2Json = input.select2('data');
                        if (s2Json == null) s2Json = new Array();
                        if (JSON.parse(panel.data('ismultiplevalue').toLowerCase())) {
                            var txts = $.map(s2Json, function(x) {
                                return x.text;
                            });
                            txt = txts.join(window.systemSperator);
                            string = txt;
                        } else {
                            txt = s2Json.text;
                            string = txt;
                        }
                    } else if (type == 'File' || type == 'Image') {
                        function fileFormat() {
                            var ul = panel.find('.form-file-list ul li a');
                            if (ul.length > 0) {
                                var files = $.map(ul, function(x) {
                                    return $(x).text();
                                });
                                txt = files.join(window.systemSperator);
                                var fileLi = ul.closest('.form-file-list');
                                fileLi.find('.file-browser-remove').remove();
                                string = fileLi.html();
                            }
                        }
                        fileFormat();
                    } else if (type == 'Checkbox') {
                        txt = input.val();
                        if (JSON.parse(txt.toLowerCase())) {
                            string = '<i class="far fa-check-square"></i>';
                        } else {
                            string = '<i class="far fa-square"></i>';
                        }
                    } else {
                        txt = input.val();
                        string = txt;
                    }

                    rec.Type = panel.data('fieldtype');

                    rec.Value = val || '';
                    rec.Txt = txt || '';

                    string = string || '';

                    if (i === 2) {
                        //adet
                        var changedString = parseFloat(calcSeparatorRemove(string));
                        panel.closest('td').html(turkishLanguagePriceFormatedOutput(changedString.toString(), 0));
                    } else if (i === 3 || i === 6) {
                        //liste fiyat  - toplam fiyat
                        var changedString = parseFloat(calcSeparatorRemove(string)).toFixed(2);
                        panel.closest('td').html(turkishLanguagePriceFormatedOutput(changedString.toString().replace(/,/g, ""), 2));
                    } else {
                        panel.closest('td').html(string.split(window.systemSperator).join(', '));
                    }
                    return true;
                });

                var listeFiyati = calcSeparatorRemove(currentRow.find('td[data-key=BASKI_BIRIM_FIYATI]').text()),
                    iskonto = calcSeparatorRemove(currentRow.find('td[data-key=ISKONTO]').text()),
                    adet = calcSeparatorRemove(currentRow.find('td[data-key=BASKI_ADETI]').text()),
                    netFiyat = (listeFiyati * (1 - parseFloat(iskonto).toFixed(2) / 100)),
                    kdvOrani = currentRow.find('td[data-key=KDV_ORANI]').text(),
                    araToplam = parseFloat(netFiyat).toFixed(4) * adet,
                    kdvToplam = araToplam * kdvOrani / 100;

                currentRow.find('td[data-key=NET_FIYAT]').html(turkishLanguagePriceFormatedOutput(parseFloat(netFiyat).toFixed(4), 4));
                currentRow.find('td[data-key=ARA_TOPLAM]').html(turkishLanguagePriceFormatedOutput(parseFloat(araToplam).toFixed(2)));
                currentRow.find('td[data-key=KDV]').html(turkishLanguagePriceFormatedOutput(parseFloat(kdvToplam).toFixed(2)));

                currentRow.removeAttr('data-id').attr('data-id',
                    guid);
                jsonItem.TempId = guid;
                jsonDataInput.val(JSON.stringify(jsonArr)).trigger('change');

                currentRow.removeClass('info');
                table.find('.btn').removeClass('disabled');

                //cancel button to delete button
                var removeRow = button.parent().find('.new-table-print-cancel-row');
                removeRow.removeClass('new-table-cancel-row').addClass('new-table-print-remove-row');
                removeRow.find('i').removeClass('fa-times').addClass('fa-trash');

                //save button to edit button
                button.removeClass().addClass('btn btn-xs btn-warning new-table-print-edit-row');
                button.find('i.fa').removeClass().addClass('fas fa-edit');

                func_parentRecordUpdate(currentRow.attr('data-relationid'));
                // $('body').trigger('roolupTriggerEvent', tableId);
                calcTotal();
                $(".new-table-add-row, .new-table-reset").removeClass("disabled");
                // $('body').trigger('clearChangeEvents', [{ ids: elementIds }]);
            });

        $('body').on('click', '.new-table-remove-row', function() {
            var button = $(this),
                table = button.closest('table'),
                tableId = table.data('id'),
                currentRow = button.closest('tr'),
                parentRecord = $(String.format("tr[data-id={0}]", currentRow.data('id'))),
                relationRecords = $(String.format("tr[id=detailrow_{0}]", currentRow.data('id'))), //currentRow.closest('tbody').find(String.format('tr[id="detailrow_{0}"]', currentRow.data('id'))),
                dataInput = $(String.format('#{0}', tableId)),
                newGuid = String.newGuid();;

            var data = JSON.parse(dataInput.val());
            if (!String.isNullOrWhiteSpace(dataInput.val())) {
                data.removeItem('TempId', currentRow.data('id'));
                currentRow.fadeOut(function() {
                    $(this).remove();
                    // $('body').trigger('roolupTriggerEvent', tableId);
                });
                currentRow.remove();
                parentRecord.remove();
                relationRecords.find('.new-table-print-remove-row').each(function(i, v) {
                    var tempId = $(v).closest('tr').data('id');
                    data.removeItem('TempId', tempId);
                });
                relationRecords.remove();

                // dataInput.val(JSON.stringify(data)).trigger('change');
                if (data.length > 0) {
                    var jsonItem = data.first();
                    $(String.format("tr[data-id={0}]", jsonItem.TempId)).attr('data-id', newGuid);
                    $(String.format("input[data-tempid={0}]", jsonItem.TempId)).attr('data-tempid', newGuid);
                    $(String.format("tr[id=detailrow_{0}]", jsonItem.TempId)).attr('id', String.format("detailrow_{0}", newGuid));
                    $(String.format("tr[data-relationid={0}]", jsonItem.TempId)).attr('data-relationid', newGuid);
                    jsonItem.TempId = newGuid;
                    dataInput.val(JSON.stringify(data)).trigger('change');
                }

                calcTotal();
                siraNoUpdate();

                $(String.format('#{0}-CD160BA3C8634693949612B47F04E4EC', prefix)).val($("table[data-id=679D6FB684814B4EB9ABA6F778D7D25E]").find('tbody tr:not(.detail-row)').length + 1);
                if ($(".append-table-items tbody tr").length === 1) {
                    $(".record-notfound").show();
                }
            }
        });

        $('body').on('click',
            ".btn-product-delete",
            function() {
                var count = $("table[data-id=679D6FB684814B4EB9ABA6F778D7D25E]").find('tbody tr input[type=checkbox]:checked').length;
                if (count === 0) return;

                var deletedTempIds = [];
                $('input.product:checked').each(function(i, v) {
                    var tempId = $(v).closest('tr').attr('data-id');
                    deletedTempIds.push(tempId);

                    $(String.format('tr[id="detailrow_{0}"] td table tbody tr', tempId)).each(function(o, g) {
                        deletedTempIds.push($(g).attr('data-id'));
                    });
                });

                if (deletedTempIds.length > 0) {
                    var tableId = "679D6FB684814B4EB9ABA6F778D7D25E",
                        dataInput = $(String.format('#{0}', tableId)),
                        guid = String.newGuid(),
                        table = $(String.format('table[data-id={0}]:first', tableId));

                    var data = JSON.parse(dataInput.val());
                    $(deletedTempIds).each(function(i, v) {
                        data.removeItem('TempId', v);
                        $(String.format('tr[data-id="{0}"], tr[id="detailrow_{0}"]', v)).remove();
                    });

                    if (data.length > 0) {
                        var jsonItem = data.first();
                        jsonItem.TempId = guid;
                        table.find('tbody tr:eq(0)').attr("data-id", guid);
                        table.find('tbody tr:eq(0) td:eq(0) button').attr("data-target", String.format("#detailrow_{0}", guid));
                        table.find('tbody tr:eq(1)').attr("id", String.format("detailrow_{0}", guid));
                    }

                    dataInput.val(JSON.stringify(data)).trigger('change');
                    $(String.format('#{0}-CD160BA3C8634693949612B47F04E4EC', prefix)).val($("table[data-id=679D6FB684814B4EB9ABA6F778D7D25E]").find('tbody tr:not(.detail-row)').length + 1);
                    siraNoUpdate();
                    calcTotal();
                }
            });

        $('body').on('click',
            '.btn-product-logo',
            function() {
                var btn = $(this),
                    count = $("table[data-id=679D6FB684814B4EB9ABA6F778D7D25E]").find('tbody tr input[type=checkbox]:checked').length,
                    saveRowButton = $(".new-table-save-row").length,
                    printSaveRowButton = $(".new-table-print-save-row").length,
                    tableId = "679D6FB684814B4EB9ABA6F778D7D25E",
                    guid = String.newGuid(),
                    table = $("table[data-id=679D6FB684814B4EB9ABA6F778D7D25E]:first"),
                    statu = $("#C6913162911E4612BD19F21E8DA6506A").val();

                if (count === 0 || saveRowButton > 0 || printSaveRowButton > 0 || statu !== "C7C9BE41661E455B9010D795C64F3BC5") return;

                btn.empty().html('İşleminiz yapılıyor...').attr('disabled', 'disabled');

                var productTempIds = [];
                $('input.product:checked').each(function(i, v) {
                    var tempId = $(v).closest('tr').attr('data-id');
                    productTempIds.push(tempId);

                    $(String.format('tr[id="detailrow_{0}"] td table tbody tr', tempId)).each(function(o, g) {
                        productTempIds.push($(g).attr('data-id'));
                    });
                });

                var dataInput = $(String.format('#{0}', "679D6FB684814B4EB9ABA6F778D7D25E")),
                    data = JSON.parse(dataInput.val());

                $.each(productTempIds, function(i, v) {
                    $.each(data, function(o, g) {
                        if (v === g.TempId) {
                            var logoyaAktar = g.RowRecord.find(f => f.FormulaName === "LOGOYA_AKTAR");
                            logoyaAktar.Value = "True";
                            logoyaAktar.Txt = "True";
                        }
                    });
                });

                if (data.length > 0) {
                    var jsonItem = data.first();
                    jsonItem.TempId = guid;
                    table.find('tbody tr:eq(0)').attr("data-id", guid);
                    table.find('tbody tr:eq(0) td:eq(0) button').attr("data-target", String.format("#detailrow_{0}", guid));
                    table.find('tbody tr:eq(1)').attr("id", String.format("detailrow_{0}", guid));
                }

                dataInput.val(JSON.stringify(data)).trigger('change');

                setTimeout(() => {
                    btn.empty().html('İşaretlileri Logoya Aktar').removeAttr('disabled');
                }, 1000);
            });

        function sort_by_key(array, key) {
            return array.sort(function(a, b) {
                var x = a.RowRecord.find(f => f.PublicId === key).Value;
                var y = b.RowRecord.find(f => f.PublicId === key).Value;
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        }

        function siraNoUpdate() {
            var dataInput = $(String.format('#{0}', "679D6FB684814B4EB9ABA6F778D7D25E")),
                data = JSON.parse(dataInput.val()),
                siraNo = 0;
            $.each(sort_by_key(data, 'CD160BA3C8634693949612B47F04E4EC'),
                function(i, v) {

                    if (String.isNullOrWhiteSpace(v.RowRecord.find(f => f.PublicId === "60B3EB130A714053B8F95D4998B7190A").Value)) {
                        ++siraNo;
                    }

                    $.each(v.RowRecord, function(o, g) {
                        if (g.PublicId === "CD160BA3C8634693949612B47F04E4EC") {
                            $(String.format("tr[data-id='{0}']", v.TempId)).find(String.format('td[data-id="{0}-CD160BA3C8634693949612B47F04E4EC"]', prefix)).text(siraNo);
                            g.Txt = siraNo.toString();
                            g.Value = siraNo.toString();
                        }
                    });
                });
            dataInput.val(JSON.stringify(data)).trigger('change');
        }

        $('body').on('click', '.new-table-print-edit-row', function() {
            var button = $(this),
                table = button.closest('table'),
                tableId = table.data('id'),
                currentRow = button.closest('tr'),
                tds = currentRow.find('td'),
                dataInput = $(String.format('#{0}', tableId));

            if (String.isNullOrWhiteSpace(dataInput.val())) return;

            isChanged = true;
            var jsonItem = JSON.parse(dataInput.val()).first('TempId', currentRow.attr('data-id'));

            currentRow.addClass('info');
            table.find('.btn').addClass('disabled');


            var removeRow = button.parent().find('.new-table-print-remove-row');
            removeRow.removeClass('disabled').removeClass('new-table-print-remove-row').addClass('new-table-print-cancel-row');
            removeRow.find('i').removeClass("fa-trash").addClass('fa-times');

            //edit button to save button
            button.removeClass().addClass('btn btn-xs btn-success new-table-print-save-row');
            button.find('i.fa').removeClass().addClass('fas fa-save');

            //i = 0 length-1
            var i;
            for (i = 0; i < 11; i++) {
                var td = $(tds[i]),
                    txt = td.html(),
                    rec = '';

                td.html($('<div/>', {
                    'class': 'hidden'
                }).append(txt));
                var pageItem = "";
                switch (i) {
                    case 0:
                        rec = jsonItem.RowRecord.find(f => f.PublicId === "60B3EB130A714053B8F95D4998B7190A");
                        pageItem = String.format('<div class="form-group editable-page-item" data-istable="True" data-tableid="679D6FB684814B4EB9ABA6F778D7D25E" data-fieldtype="Lookup" data-inputtype="select" data-maxlength="0" data-decimalplaces="0" data-inputmaskpattern="" data-controllingpublicid="" data-lookupobjectid="DB31FD34203D4EFCBB06E1AB70A1F613" data-lookupobjectname="Baskı" data-lookupobjecturl="baski" data-lookupfieldids="01E14A5348CB4D598BB62D8479BA200B" data-selecteditempublicids="{0}" data-organizationalunitname="" data-organizationalunitfiltertype="" data-organizationalunitgrouppublicids="" data-organizationalunitdepth="0" data-organizationalunitincludeitself="False" data-ismultiplevalue="False" data-isradio="False" data-isrequired="False" data-isunique="False" data-isuniqueintable="False" data-isactive="True" data-isclientcalculate="False" data-iscalculateonclientchange="False" data-ischeckunchanged="False" data-isuniquecheckclientcalculate="False" data-calculatetriggerfieldpublicids="" data-isthousandseparator="False" data-formulaname="URUN_GORSEL" data-formulatext="" data-predefinedpublicid="" data-predefineddependencypublicid="" data-viewfilterpublicid="75254FEECC1E4B378FED370BE42F3A23" data-publicid="edit{1}-60B3EB130A714053B8F95D4998B7190A" data-value="{2}"></div>', (rec.Value || ''), printPrefix, (rec.Txt || ''));
                        break;
                    case 1:
                        rec = jsonItem.RowRecord.find(f => f.PublicId === "DF75AF67CE0C4C6CAD7CC5BA759E9823");
                        pageItem = String.format('<div class="form-group editable-page-item" data-istable="True" data-tableid="679D6FB684814B4EB9ABA6F778D7D25E" data-fieldtype="Lookup" data-inputtype="select" data-maxlength="0" data-decimalplaces="0" data-inputmaskpattern="" data-controllingpublicid="" data-lookupobjectid="76408E9E4C594AEBB608FF26850B16F1" data-lookupobjectname="Baskı Açıklaması" data-lookupobjecturl="baski-aciklamasi" data-lookupfieldids="7889F039B4014A39B8BF36FF8B1F1CA7" data-selecteditempublicids="{0}" data-organizationalunitname="" data-organizationalunitfiltertype="" data-organizationalunitgrouppublicids="" data-organizationalunitdepth="0" data-organizationalunitincludeitself="False" data-ismultiplevalue="False" data-isradio="False" data-isrequired="False" data-isunique="False" data-isuniqueintable="False" data-isactive="True" data-isclientcalculate="False" data-iscalculateonclientchange="False" data-ischeckunchanged="False" data-isuniquecheckclientcalculate="False" data-calculatetriggerfieldpublicids="" data-isthousandseparator="False" data-formulaname="BASKI_ACIKLAMASI" data-formulatext="" data-predefinedpublicid="" data-predefineddependencypublicid="" data-viewfilterpublicid="DAF6C17ED0E64517A714D9BFF67D4B85" data-publicid="edit{1}-DF75AF67CE0C4C6CAD7CC5BA759E9823" data-value="{2}"></div>', (rec.Value || ''), printPrefix, (rec.Txt || ''));
                        break;
                    case 2:
                        rec = null;
                        pageItem = txt;
                        break;
                    case 3:
                        rec = jsonItem.RowRecord.find(f => f.PublicId === "E7744E5F4D1C4B078DDDCAFA9888C22E");
                        pageItem = String.format('<div class="form-group editable-page-item" data-istable="True" data-tableid="679D6FB684814B4EB9ABA6F778D7D25E" data-fieldtype="Number" data-inputtype="text" data-maxlength="12" data-decimalplaces="2" data-inputmaskpattern="###.###.###.##0,00" data-controllingpublicid="" data-lookupobjectid="" data-lookupobjectname="" data-lookupobjecturl="" data-lookupfieldids="" data-selecteditempublicids="{0}" data-organizationalunitname="" data-organizationalunitfiltertype="" data-organizationalunitgrouppublicids="" data-organizationalunitdepth="0" data-organizationalunitincludeitself="False" data-ismultiplevalue="False" data-isradio="False" data-isrequired="False" data-isunique="False" data-isuniqueintable="False" data-isactive="True" data-isclientcalculate="False" data-iscalculateonclientchange="False" data-ischeckunchanged="False" data-isuniquecheckclientcalculate="False" data-calculatetriggerfieldpublicids="" data-isthousandseparator="True" data-formulaname="BASKI_ADETI" data-formulatext="" data-predefinedpublicid="" data-predefineddependencypublicid="" data-viewfilterpublicid="" data-publicid="edit{1}-E7744E5F4D1C4B078DDDCAFA9888C22E" data-value="{2}"></div>', (rec.Value || ''), printPrefix, (rec.Txt || ''));
                        break;
                    case 4: //lf
                        rec = jsonItem.RowRecord.find(f => f.PublicId === "14BC27B7F17745E5B2C0676085BEB543");
                        pageItem = String.format('<div class="form-group editable-page-item" data-istable="True" data-tableid="679D6FB684814B4EB9ABA6F778D7D25E" data-fieldtype="Number" data-inputtype="text" data-maxlength="12" data-decimalplaces="3" data-inputmaskpattern="###.###.###.##0,000" data-controllingpublicid="" data-lookupobjectid="" data-lookupobjectname="" data-lookupobjecturl="" data-lookupfieldids="" data-selecteditempublicids="{0}" data-organizationalunitname="" data-organizationalunitfiltertype="" data-organizationalunitgrouppublicids="" data-organizationalunitdepth="0" data-organizationalunitincludeitself="False" data-ismultiplevalue="False" data-isradio="False" data-isrequired="False" data-isunique="False" data-isuniqueintable="False" data-isactive="True" data-isclientcalculate="False" data-iscalculateonclientchange="False" data-ischeckunchanged="False" data-isuniquecheckclientcalculate="False" data-calculatetriggerfieldpublicids="" data-isthousandseparator="True" data-formulaname="BASKI_BIRIM_FIYATI" data-formulatext="" data-predefinedpublicid="" data-predefineddependencypublicid="" data-viewfilterpublicid="" data-publicid="edit{1}-14BC27B7F17745E5B2C0676085BEB543" data-value="{2}"></div>', (rec.Value || ''), printPrefix, (rec.Txt || ''));
                        break;
                    case 5: //netfiyat
                        rec = jsonItem.RowRecord.find(f => f.PublicId === "8E9BD6BD7BD34FED97E8FA811DEF6C7A");
                        pageItem = String.format('<div class="form-group editable-page-item" data-istable="True" data-tableid="679D6FB684814B4EB9ABA6F778D7D25E" data-fieldtype="Number" data-inputtype="text" data-maxlength="4" data-decimalplaces="2" data-inputmaskpattern="#0,00" data-controllingpublicid="" data-lookupobjectid="" data-lookupobjectname="" data-lookupobjecturl="" data-lookupfieldids="" data-selecteditempublicids="{0}" data-organizationalunitname="" data-organizationalunitfiltertype="" data-organizationalunitgrouppublicids="" data-organizationalunitdepth="0" data-organizationalunitincludeitself="False" data-ismultiplevalue="False" data-isradio="False" data-isrequired="False" data-isunique="False" data-isuniqueintable="False" data-isactive="True" data-isclientcalculate="False" data-iscalculateonclientchange="False" data-ischeckunchanged="False" data-isuniquecheckclientcalculate="False" data-calculatetriggerfieldpublicids="" data-isthousandseparator="True" data-formulaname="ISKONTO" data-formulatext="0" data-predefinedpublicid="" data-predefineddependencypublicid="" data-viewfilterpublicid="" data-publicid="edit{1}-8E9BD6BD7BD34FED97E8FA811DEF6C7A" data-value="{2}"></div>', (rec.Value || ''), printPrefix, (rec.Txt || ''));
                        break;
                    case 6: //adet
                        rec = null;
                        pageItem = "";
                        break;
                    case 7: //araToplam
                        rec = null;
                        pageItem = "";
                        break;
                    case 8:
                        rec = jsonItem.RowRecord.find(f => f.PublicId === "C841EF9FC7C947B99F297A914E538BDA");
                        pageItem = String.format('<div class="form-group editable-page-item" data-istable="True" data-tableid="679D6FB684814B4EB9ABA6F778D7D25E" data-fieldtype="Number" data-inputtype="text" data-maxlength="2" data-decimalplaces="0" data-inputmaskpattern="#0" data-controllingpublicid="" data-lookupobjectid="" data-lookupobjectname="" data-lookupobjecturl="" data-lookupfieldids="" data-selecteditempublicids="{0}" data-organizationalunitname="" data-organizationalunitfiltertype="" data-organizationalunitgrouppublicids="" data-organizationalunitdepth="0" data-organizationalunitincludeitself="False" data-ismultiplevalue="False" data-isradio="False" data-isrequired="False" data-isunique="False" data-isuniqueintable="False" data-isactive="True" data-isclientcalculate="False" data-iscalculateonclientchange="False" data-ischeckunchanged="False" data-isdisabled="False"  data-isuniquecheckclientcalculate="False" data-calculatetriggerfieldpublicids="" data-isthousandseparator="False" data-formulaname="KDV_ORANI" data-formulatext="URUN_KDV_O" data-predefinedpublicid="" data-predefineddependencypublicid="" data-viewfilterpublicid="" data-publicid="edit{1}-C841EF9FC7C947B99F297A914E538BDA" data-value="{2}"></div>', (rec.Value || ''), printPrefix, (rec.Txt || ''));
                        break;
                    case 9: //kdv
                        rec = null;
                        pageItem = "";
                        break;
                    case 10:
                        rec = jsonItem.RowRecord.find(f => f.PublicId === "DC072FF5D76A4E9E922D3020C182E90A");
                        pageItem = String.format('<div class="form-group editable-page-item" data-istable="True" data-tableid="679D6FB684814B4EB9ABA6F778D7D25E" data-fieldtype="Number" data-inputtype="text" data-maxlength="12" data-decimalplaces="2" data-inputmaskpattern="###.###.###.##0,00" data-controllingpublicid="" data-lookupobjectid="" data-lookupobjectname="" data-lookupobjecturl="" data-lookupfieldids="" data-selecteditempublicids="{0}" data-organizationalunitname="" data-organizationalunitfiltertype="" data-organizationalunitgrouppublicids="" data-organizationalunitdepth="0" data-organizationalunitincludeitself="False" data-ismultiplevalue="False" data-isradio="False" data-isrequired="False" data-isunique="False" data-isuniqueintable="False" data-isactive="True" data-isclientcalculate="False" data-iscalculateonclientchange="False" data-ischeckunchanged="False" data-isuniquecheckclientcalculate="False" data-calculatetriggerfieldpublicids="" data-isdisabled="True" data-isthousandseparator="True" data-formulaname="TOPLAM_FIYAT" data-formulatext="" data-predefinedpublicid="" data-predefineddependencypublicid="" data-viewfilterpublicid="" data-publicid="edit{1}-DC072FF5D76A4E9E922D3020C182E90A" data-value="{2}"></div>', (rec.Value || ''), printPrefix, (rec.Txt || ''));
                        break;
                    default:
                        break;
                }

                td.append(pageItem);

            }

            currentRow.find('.editable-page-item').setForm({
                prefix: '.editable-page-item',
                customObjectId: $('#CustomObjectPublicId').val(),
                recordPublicId: $('#RecordPublicId').val()
            });
            $('.table-field table input[required]').removeAttr('required').addClass('required');

        });

        $('body').on('click',
            '.new-table-print-remove-row',
            function() {
                var button = $(this),
                    table = button.closest('table'),
                    tableId = table.data('id'),
                    currentRow = button.closest('tr'),
                    dataInput = $(String.format('#{0}', tableId)),
                    newGuid = String.newGuid();

                if (!String.isNullOrWhiteSpace(dataInput.val())) {
                    var data = JSON.parse(dataInput.val()).removeItem('TempId', currentRow.attr('data-id'));
                    currentRow.fadeOut(function() {
                        $(this).remove();
                        dataInput.val(JSON.stringify(data)).trigger('change');
                        // $('body').trigger('roolupTriggerEvent', tableId);
                        // calcTotal();
                    });
                    currentRow.remove();
                    if (data.length > 0) {
                        var jsonItem = data.first();
                        $(String.format("tr[data-id={0}]", jsonItem.TempId)).attr('data-id', newGuid);
                        $(String.format("input[data-tempid={0}]", jsonItem.TempId)).attr('data-tempid', newGuid);
                        $(String.format("tr[id=detailrow_{0}]", jsonItem.TempId)).attr('id', String.format("detailrow_{0}", newGuid));
                        $(String.format("tr[data-relationid={0}]", jsonItem.TempId)).attr('data-relationid', newGuid);
                        jsonItem.TempId = newGuid;
                        dataInput.val(JSON.stringify(data)).trigger('change');
                    }
                    func_parentRecordUpdate(currentRow.attr('data-relationid'), false);
                    calcTotal();
                }
            });

        $('body').on('click',
            '.new-table-cancel-row',
            function() {
                var button = $(this),
                    table = button.closest('table'),
                    currentRow = button.closest('tr'),
                    elementIds = currentRow.find('.editable-page-item input, .editable-page-item textarea').map(function() {
                        if (!String.isNullOrWhiteSpace(this.id)) return this.id
                    });

                isChanged = false;

                currentRow.find('td').each(function() {
                    var html = $(this).find('.hidden').html();
                    $(this).html(html);
                });

                currentRow.removeClass('info');
                table.find('.btn').removeClass('disabled');

                button.removeClass('new-table-save-row').addClass('new-table-remove-row');
                button.find('i').removeClass("fa-times").addClass('fa-trash');

                var saveRow = button.parent().find('.new-table-save-row');
                saveRow.removeClass().addClass('btn btn-xs btn-warning new-table-edit-row');
                saveRow.find('i.fa').removeClass().addClass('fas fa-edit');

                $('body').trigger('clearChangeEvents', [{
                    ids: elementIds
                }]);
            });

        $('body').on('click', '.new-table-print-cancel-row', function() {
            var button = $(this),
                table = button.closest('table'),
                currentRow = button.closest('tr'),
                elementIds = currentRow.find('.editable-page-item input, .editable-page-item textarea').map(function() {
                    if (!String.isNullOrWhiteSpace(this.id)) return this.id
                });

            isChanged = false;

            currentRow.find('td').each(function() {
                var html = $(this).find('.hidden').html();
                $(this).html(html);
            });

            currentRow.removeClass('info');
            table.find('.btn').removeClass('disabled');

            button.removeClass('new-table-save-row').addClass('new-table-print-remove-row');
            button.find('i').removeClass('fa-times').addClass('fa-trash');

            var saveRow = button.parent().find('.new-table-print-save-row');
            saveRow.removeClass().addClass('btn btn-xs btn-warning new-table-print-edit-row');
            saveRow.find('i.fa').removeClass().addClass('fas fa-edit');

            $('body').trigger('clearChangeEvents', [{
                ids: elementIds
            }]);
        });

        function getProductInformationDiscount(value, companyId, companyName) {
            if (String.isNullOrWhiteSpace(value)) {
                $(String.format('#{0}-8E9BD6BD7BD34FED97E8FA811DEF6C7A', prefix)).val(0);
                return;
            }

            $(String.format('#{0}-8E9BD6BD7BD34FED97E8FA811DEF6C7A', prefix)).css('background', 'url(/public/img/spinner.gif) no-repeat center center');
            $.get("https://ilpenwebapi.setcrm.com/api/data/GetCompanyDiscount?productId=" + value + "&companyId=" + companyId + "&companyName=" + companyName, "",
                function(r) {
                    $(String.format('#{0}-8E9BD6BD7BD34FED97E8FA811DEF6C7A', prefix)).css('background', '');
                    if (r.Status && r.List.length > 0) {
                        var discount = r.List[0].m_Item2;
                        $(String.format('#{0}-8E9BD6BD7BD34FED97E8FA811DEF6C7A', prefix)).val(discount).trigger('keyup');
                    } else if (r.Status && !String.isNullOrWhiteSpace(r.CompanyDiscount)) {
                        $(String.format('#{0}-8E9BD6BD7BD34FED97E8FA811DEF6C7A', prefix)).val(r.CompanyDiscount).trigger('keyup');
                    } else {
                        $(String.format('#{0}-8E9BD6BD7BD34FED97E8FA811DEF6C7A', prefix)).val(0).trigger('keyup');
                    }
                }
            );
        }

        function getProductInformation(id) {
            if (String.isNullOrWhiteSpace(id)) return;

            $.get("https://ilpenwebapi.setcrm.com/api/data/GetProductInformation?productId=" + id, "",
                function(r) {
                    if (r.Status && r.List.length > 0) {
                        var pushedList = [];
                        $.each(r.List, function(i, v) {
                            pushedList.push({
                                id: v.m_Item1,
                                text: v.m_Item2
                            })
                        });

                        prepareSelect2WithData("#karma-koli", pushedList, false);
                        $("#div-karma-koli").append('<input type="hidden" id="karmaKoliSection" value="true" />');
                    } else {
                        $("#div-karma-koli").append('<input type="hidden" id="karmaKoliSection" value="false" />');
                        $("#div-karma-koli").hide();
                    }
                }
            );
        }

        function getDefaultValue(type, rowEdit, value, companyName, companyId) {
            var req = {
                PublicId: '',
                FieldsValues: new Array(),
                TablesValues: new Array()
            };

            switch (type) {
                case 'product':
                    req.PublicId = "EA0CD301669E4911BACC03F3E371F083";
                    var $relationInputListeFiyat = $(String.format("#{0}-{1}, #{0}-{2}", prefix, req.PublicId, "E07E26850A4745819C4BCD6E9E68993F"));
                    if (rowEdit) {
                        $relationInputListeFiyat = $(String.format("#edit{0}-{1}, #edit{0}-{2}", prefix, req.PublicId, "E07E26850A4745819C4BCD6E9E68993F"));
                    }

                    $relationInputListeFiyat.val('');
                    $relationInputListeFiyat.css('background', 'url(/public/img/spinner.gif) no-repeat center center');
                    req.FieldsValues.push({
                        Key: "B961CD1891B84EAF981DD75F5C287196",
                        Value: value
                    });
                    $.post('/Set/GetFieldDefaultValue', {
                        coId: pageCustomObjectId,
                        data: JSON.stringify(req)
                    }, function(r) {
                        if (r === 'the_field_not_exist') return;

                        $relationInputListeFiyat.css('background', '').val(r).trigger('change');
                        $(String.format("#edit{0}-8E9BD6BD7BD34FED97E8FA811DEF6C7A", prefix)).trigger("keyup");
                        if (!String.isNullOrWhiteSpace(companyName)) {
                            getProductInformationDiscount(value, companyId, companyName)
                        }
                    });

                    req.PublicId = "C841EF9FC7C947B99F297A914E538BDA";
                    var $relationInputListeKdv = $(String.format("#{0}-{1}", prefix, req.PublicId));
                    if (rowEdit) {
                        $relationInputListeKdv = $(String.format("#edit{0}-{1}", prefix, req.PublicId));
                    }

                    $relationInputListeKdv.val('');
                    $relationInputListeKdv.css('background', 'url(/public/img/spinner.gif) no-repeat center center');
                    req.FieldsValues.push({
                        Key: "B961CD1891B84EAF981DD75F5C287196",
                        Value: value
                    });
                    $.post('/Set/GetFieldDefaultValue', {
                        coId: pageCustomObjectId,
                        data: JSON.stringify(req)
                    }, function(r) {
                        if (r === 'the_field_not_exist') return;

                        $relationInputListeKdv.css('background', '').val(r).trigger('change');
                        $(String.format("#edit{0}-C841EF9FC7C947B99F297A914E538BDA", prefix)).trigger("keyup");
                    });
                    break;
                case 'info':
                    $.get("https://ilpenwebapi.setcrm.com/api/data/GetProductInformation?productId=" + $(String.format('#{0}-B961CD1891B84EAF981DD75F5C287196', prefix)).val() + "&firstRow=true",
                        "",
                        function(r) {
                            if (r.Status) {
                                $('.productCode').val(r.ProductCode);
                                $('.unitCode').val(r.UnitCode);
                            }
                        });
                    break;
                case 'product-relation-empty':
                    if (rowEdit) {
                        $(String.format("#edit{0}-{1}, #edit{0}-{2}", prefix, "EA0CD301669E4911BACC03F3E371F083", "C841EF9FC7C947B99F297A914E538BDA")).val('');
                    } else {
                        $(String.format("#{0}-{1}, #{0}-{2}", prefix, "EA0CD301669E4911BACC03F3E371F083", "C841EF9FC7C947B99F297A914E538BDA")).val('');
                    }
                    $('.productCode, .unitCode').val('');
                    break;
                default:
                    break;
            }
        }

        function emptyModalBlock() {
            setUtil.alert({
                container: '#modalPrintAdd .modal-body #message-block',
                message: 'Baskı başarıyla eklendi.',
                alertClass: 'alert-success',
                autoClose: true
            });
            $.each(baskiModalElements, function(i, v) {
                if (v.type === "select") {
                    $(v.id).select2('data', null).trigger("change");
                } else if (v.type === "text") {
                    $(v.id).val(0);
                }
            });
        }

        $('body').on("keyup",
            String.format("#{0}-EA0CD301669E4911BACC03F3E371F083, #{0}-694AEFD22A054E63BB42DC9FF50C94F1, #{0}-8E9BD6BD7BD34FED97E8FA811DEF6C7A, #{0}-C841EF9FC7C947B99F297A914E538BDA, #{0}-E07E26850A4745819C4BCD6E9E68993F", prefix),
            function() {
                var $this = $(this);
                if ($this.attr('id') === String.format("{0}-E07E26850A4745819C4BCD6E9E68993F", prefix)) {
                    calc(prefix, 'birimfiyat');
                } else if ($this.attr('id') === String.format("{0}-8E9BD6BD7BD34FED97E8FA811DEF6C7A", prefix)) {
                    calc(prefix, 'iskonto');
                } else {
                    calc(prefix, '');
                }
            });

        $('body').on("keyup",
            String.format("#edit{0}-EA0CD301669E4911BACC03F3E371F083, #edit{0}-694AEFD22A054E63BB42DC9FF50C94F1, #edit{0}-8E9BD6BD7BD34FED97E8FA811DEF6C7A, #edit{0}-C841EF9FC7C947B99F297A914E538BDA, #edit{0}-E07E26850A4745819C4BCD6E9E68993F", prefix),
            function() {
                var $this = $(this);
                if ($this.attr('id') === String.format("edit{0}-E07E26850A4745819C4BCD6E9E68993F", prefix)) {
                    calc(String.format("edit{0}", prefix), 'birimfiyat');
                } else if ($this.attr('id') === String.format("edit{0}-8E9BD6BD7BD34FED97E8FA811DEF6C7A", prefix)) {
                    calc(String.format("edit{0}", prefix), 'iskonto');
                } else {
                    calc(String.format("edit{0}", prefix), '');
                }
            });

        $('body').on("keyup",
            String.format("#{0}-14BC27B7F17745E5B2C0676085BEB543, #{0}-E7744E5F4D1C4B078DDDCAFA9888C22E, #{0}-8E9BD6BD7BD34FED97E8FA811DEF6C7A, #{0}-C841EF9FC7C947B99F297A914E538BDA", printPrefix),
            function() {
                calcBaski(printPrefix);
            });

        $('body').on("keyup",
            String.format("#edit{0}-14BC27B7F17745E5B2C0676085BEB543, #edit{0}-E7744E5F4D1C4B078DDDCAFA9888C22E, #edit{0}-8E9BD6BD7BD34FED97E8FA811DEF6C7A, #edit{0}-C841EF9FC7C947B99F297A914E538BDA", printPrefix),
            function() {
                calcBaski(String.format("edit{0}", printPrefix));
            });

        function calcSeparatorRemove(value) {
            var returnedString = String.isNullOrWhiteSpace(value) ? "0" : value.replace(".",
                "").replace(",",
                ".");
            return returnedString;
        }

        function calc($prefix, type) {

            var birimFiyat = calcSeparatorRemove($(String.format("#{0}-EA0CD301669E4911BACC03F3E371F083", $prefix)).val()),
                iskontoluBirimFiyat = calcSeparatorRemove($(String.format("#{0}-E07E26850A4745819C4BCD6E9E68993F", $prefix)).val()),
                adet = calcSeparatorRemove($(String.format("#{0}-694AEFD22A054E63BB42DC9FF50C94F1", $prefix)).val()),
                iskonto = calcSeparatorRemove($(String.format("#{0}-8E9BD6BD7BD34FED97E8FA811DEF6C7A", $prefix)).val()),
                kdvOrani = calcSeparatorRemove($(String.format("#{0}-C841EF9FC7C947B99F297A914E538BDA", $prefix)).val()),
                iskontoInput = $(String.format("#{0}-8E9BD6BD7BD34FED97E8FA811DEF6C7A", $prefix)),
                iskontoluToplamInput = $(String.format("#{0}-9DF93E4F54E74F4BA3B80C6E2A47F962", $prefix)),
                iskontoluBirimFiyatInput = $(String.format("#{0}-E07E26850A4745819C4BCD6E9E68993F", $prefix)),
                toplamFiyatInput = $(String.format("#{0}-DC072FF5D76A4E9E922D3020C182E90A", $prefix));

            if (parseFloat(iskonto) > 100) {
                iskontoInput.val(0);
                iskonto = 0;
            }

            if (type === 'birimfiyat') {

                var iskontoYuzdesi = 100 - (parseFloat(iskontoluBirimFiyat).toFixed(4) * 100 / parseFloat(birimFiyat).toFixed(2));
                iskontoInput.val(parseFloat(iskontoYuzdesi).toFixed(2));
                iskonto = iskontoYuzdesi;

                if (parseFloat(iskontoluBirimFiyat) > parseFloat(birimFiyat)) {
                    iskontoInput.val(0);
                    iskonto = 0;
                    birimFiyat = iskontoluBirimFiyat;
                }

                var iskontoluBirimFiyatFormula = (birimFiyat * (1 - parseFloat(iskonto).toFixed(2) / 100));
                iskontoluBirimFiyat = iskontoluBirimFiyatFormula;

            } else if (type === 'iskonto') {

                var iskontoluBirimFiyatFormula = (birimFiyat * (1 - iskonto / 100));
                iskontoluBirimFiyatInput.val(parseFloat(iskontoluBirimFiyatFormula).toFixed(4));
                iskontoluBirimFiyat = iskontoluBirimFiyatFormula;

            }

            var iskontoluToplam = parseFloat(iskontoluBirimFiyat).toFixed(4) * adet;
            iskontoluToplamInput.val(parseFloat(iskontoluToplam).toFixed(2));

            var kdv = iskontoluToplam * kdvOrani / 100;
            var toplamFiyat = iskontoluToplam + kdv;
            toplamFiyatInput.val(parseFloat(toplamFiyat).toFixed(2));
        }


        function calcBaski($prefix) {
            var birimFiyat = calcSeparatorRemove($(String.format("#{0}-14BC27B7F17745E5B2C0676085BEB543", $prefix)).val()),
                adet = calcSeparatorRemove($(String.format("#{0}-E7744E5F4D1C4B078DDDCAFA9888C22E", $prefix)).val()),
                iskonto = calcSeparatorRemove($(String.format("#{0}-8E9BD6BD7BD34FED97E8FA811DEF6C7A", $prefix)).val()),
                kdvOrani = calcSeparatorRemove($(String.format("#{0}-C841EF9FC7C947B99F297A914E538BDA", $prefix)).val()),
                iskontoInput = $(String.format("#{0}-8E9BD6BD7BD34FED97E8FA811DEF6C7A", $prefix)),
                baskiToplamFiyatInput = $(String.format("#{0}-DC072FF5D76A4E9E922D3020C182E90A", $prefix));

            if (parseFloat(iskonto) > 100) {
                iskontoInput.val(0);
                iskonto = 0;
            }

            var iskontoluBirimFiyat = (birimFiyat * (1 - iskonto / 100));
            var iskontoluToplam = parseFloat(iskontoluBirimFiyat).toFixed(2) * adet;

            var kdv = iskontoluToplam * kdvOrani / 100;
            var toplamFiyat = iskontoluToplam + kdv;
            baskiToplamFiyatInput.val(parseFloat(toplamFiyat).toFixed(2));

        }

        calcTotal();

        function calcTotal() {
            var toplamFiyat = 0,
                kdvToplam = 0,
                araToplam = 0;

            $('.append-table-items tbody tr').each(function(i, v) {
                if ($(v).attr('data-id') && !$(v).hasClass("detail-row")) {
                    var toplamTutarStringValue = $(v).find(String.format('td[data-id="{0}-DC072FF5D76A4E9E922D3020C182E90A"]', prefix)).text().trim(),
                        kdvStringValue = $(v).find(String.format('td[data-key="KDV"]')).text().trim(),
                        araToplamStringValue = $(v).find(String.format('td[data-id="{0}-9DF93E4F54E74F4BA3B80C6E2A47F962"]', prefix)).text().trim();

                    if (!String.isNullOrWhiteSpace(araToplamStringValue)) {
                        araToplamStringValue = calcSeparatorRemove(araToplamStringValue);
                    } else {
                        araToplamStringValue = 0;
                    }

                    if (!String.isNullOrWhiteSpace(kdvStringValue)) {
                        kdvStringValue = calcSeparatorRemove(kdvStringValue);
                    } else {
                        kdvStringValue = 0;
                    }

                    kdvToplam += parseFloat(kdvStringValue);

                    araToplam += parseFloat(araToplamStringValue);

                    if (!String.isNullOrWhiteSpace(toplamTutarStringValue)) {
                        toplamTutarStringValue = calcSeparatorRemove(toplamTutarStringValue);
                    } else {
                        toplamTutarStringValue = 0;
                    }

                    toplamFiyat += parseFloat(toplamTutarStringValue);
                }
            });

            $(String.format("#{0}-0F78F88DA91F4F1682C722D416596CA0", prefix)).val(parseFloat(araToplam).toFixed(2));
            $(String.format("#{0}-663C0C71F59D4968B7A44F212773CEFE", prefix)).val(parseFloat(kdvToplam).toFixed(2));
            $(String.format("#{0}-F1A79558217D4ADB8F75EA6E69557A35", prefix)).val(parseFloat(toplamFiyat).toFixed(2));
        }
    }
});