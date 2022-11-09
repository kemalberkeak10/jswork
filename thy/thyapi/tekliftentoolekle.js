$(function() {

    function isUnique(obj) {
        var unique = obj.filter(function(itm, i, a) {
            return i == a.indexOf(itm);
        });
        return unique.length == obj.length ? true : false;
    }

    var filterId = $("#FilterId").val(),
        seperator = "|";
    if (filterId === "2506B470683143828B69F6239A67BBA9") {

        $(".well-xxs:first .pull-right").prepend("<button type='button' class='btn btn-info btn-sm btn-create-transfer-order'>Create Transfer Order</button>");

        $(".btn-create-transfer-order").hover(
            function() {
                var count = $(".vf-check:checked").length;
                if (count === 0) {
                    $(".btn-create-transfer-order").attr({
                        "data-toggle": "tooltip",
                        "data-placement": "top",
                        "data-original-title": String.format("En az 1 adet kayıt seçmelisiniz!")
                    });
                    $(".btn-create-transfer-order").tooltip('show');
                }
                $(".btn-create-transfer-order").removeAttr("data-toggle data-placement data-original-title");
            }
        );

        $(".table-responsive table thead tr").each(function(i, v) {
            $(v).prepend("<th><input type='checkbox' class='vf-all-check-toggle' style='margin-left:3px;margin-right:3px;'></th>");
        });

        $(".table-responsive table tbody tr").each(function(i, v) {
            $(v).prepend("<td><input type='checkbox' class='vf-check' style='margin-left:3px;margin-right:3px;'></td>");
        });

        $(".vf-all-check-toggle").on("change",
            function() {
                var checkBoxes = $(".vf-check");
                checkBoxes.prop("checked", !checkBoxes.prop("checked"));
            });

        $("body").on("click",
            ".btn-create-transfer-order",
            function() {
                var button = $(this),
                    records = $('.vf-check:checked').map(function() {
                        return $(this).closest('tr').data('id')
                    }).toArray();

                if (records.length <= 0) return;

                $('#modalCreateTransferOrder').remove();
                window.setModal.Create({
                    id: 'modalCreateTransferOrder',
                    html: {
                        header: 'Create Transfer Order',
                        body: '<div id="msg"></div><div id="tbl-transfer-order"><table class="table table-bordered table-striped table-hover"><thead></thead><tbody></tbody></table></div>',
                        footer: '<button class="btn btn-success btn-sm" id="btnCreateTransferOrderSubmitButton">Create Transfer Order</button><button data-dismiss="modal" class="btn btn-danger btn-sm">Close</button>'
                    },
                    settings: {
                        widthClass: 'modal-full-width'
                    }
                });
                $('#modalCreateTransferOrder').modal("toggle");

                var clonedThead = $(".table-responsive table thead[class=tableFloatingHeader] tr:first").clone();
                clonedThead.find('th:eq(0), th:last, .btn-column-filter').remove();
                clonedThead.find('th').removeAttr('class');

                var table = $("#tbl-transfer-order table"),
                    thead = table.find('thead'),
                    tbody = table.find('tbody');
                thead.append(clonedThead);
                $.each(records, function(i, v) {
                    var clonedTr = $(String.format('tr[data-id={0}]', v)).clone();
                    clonedTr.find('td:eq(0), td:last').remove();
                    tbody.append(clonedTr);

                    var max = 0,
                        adet = clonedTr.find('td[data-id=F634DC4B60424F64883C5FE622BBCDCF]').text().trim(),
                        kalanAdet = clonedTr.find('td[data-id=883AEC54A8EC4E5992455193E4169048]').text().trim(),
                        sn = clonedTr.find('td[data-id=ADDB52CF8FCE4827872B015A6E57185F]').data("value");

                    if (String.isNullOrWhiteSpace(adet.replace("-", ""))) {
                        adet = 0;
                    }

                    if (String.isNullOrWhiteSpace(kalanAdet.replace("-", ""))) {
                        max = adet;
                    } else {
                        max = kalanAdet;
                        // max = max - kalanAdet;
                    }

                    clonedTr.find('td:first').removeAttr("onclick class").html(++i);

                    clonedTr.find('td[data-id=E6642C1996A749889CA33FB2BAA9F9E9]').html(String.format('<input type="number" class="form-control gelen-adet" min="0" max="{0}" {1} value="{0}">', max, (parseInt(max) === 0 ? "disabled" : "")));
                    if (String.isNullOrWhiteSpace(sn)) {
                        clonedTr.find('td[data-id=C3537E5811624C879B77898D64160097]').html(String.format('<textarea type="text" class="form-control gelen-sn" rows="2" {0} style="resize:vertical;min-height:50px;"></textarea><button type="button" class="btn btn-warning btn-sm btn-expand-gelen-sn" data-rowid="{2}" {0} style="width: 230px;white-space: normal;"><i class="fa fa-expand-arrows-alt"></i> <b>{1} tane yazı kutusu aç</b></button>', (parseInt(max) === 0 || !String.isNullOrWhiteSpace(sn) ? "disabled" : ""), max, v));
                    } else {
                        clonedTr.find('td[data-id=C3537E5811624C879B77898D64160097]').html(String.format('<textarea type="text" class="form-control gelen-sn" rows="1" {0} style="resize:none;min-height:50px;"></textarea>', (parseInt(max) === 0 || !String.isNullOrWhiteSpace(sn) ? "disabled" : "")));
                    }

                    var guid = v;
                    tbody.append($("<tr/>", {
                        id: String.format('detailrow_{0}', guid),
                        class: 'detail-rows',
                        "style": "display:none;background: rgb(138 195 251);"
                    }).append($("<td/>", {
                        colspan: "12",
                        style: "padding-left: 2%;padding-bottom: 0;border:1px solid black"
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
                    detailRow.append(detailRowThead.append('<tr class="detail-rows"/>')).append(detailRowTbody);

                    var appendThead = detailRow.find('thead'),
                        appendTbody = detailRow.find('tbody');

                    $.each(["", "Döküman", "Evet", "Hayır"], function(index,
                        val) {
                        appendThead.find('tr').append($('<th/>', {
                                'data-index': index,
                                'style': 'padding:5px'
                            })
                            .append(val));
                    });

                    detailRow.append(appendThead);

                    $.get(String.format("https://thywebapi.setcrm.com/api/data/TabloOkuma?coId={0}&tableId={1}&recordId={2}", "3AF4653F6DCF4A5384F1233D328024D2", "7D7D6D8510BE4DF78BD6C5909F23DB2D", v), "",
                        function(r) {
                            var index = 0;
                            $.each(r, function(o, g) {
                                var newRow = $('<tr/>', {
                                    "data-recordid": v,
                                    "data-index": o,
                                    "class": "detail-rows"
                                });
                                var veriler = $(g);
                                newRow.append($('<td/>').text(++index));
                                for (var k = 0; k < veriler.length; k++) {
                                    if (k == 0) {
                                        //Döküman
                                        newRow.attr("data-documentid", veriler[k].Value);
                                        newRow.append($('<td/>')
                                            .append($('<a href="/set/tesellum-sorulari/detail/' + veriler[k].Value + '" target="_blank">' + veriler[k].Txt + '</a>')));
                                    } else if (k === 1) {
                                        //Evet
                                        newRow.append($('<td/>')
                                            .append(String.format('<input type="radio" {0} class="document-yes-check document-check" name="documentyesorno-{1}-{2}" style="width:20px;height:20px;">', toBool(veriler[k].Value) ? "checked" : "", v, o)));
                                    } else if (k === 2) {
                                        //Hayır
                                        newRow.append($('<td/>')
                                            .append(String.format('<input type="radio" {0} class="document-no-check document-check" name="documentyesorno-{1}-{2}" style="width:20px;height:20px;">', toBool(veriler[k].Value) ? "checked" : "", v, o)));
                                    }
                                }
                                appendTbody.append(newRow);
                            });
                            if (r.length <= 0) {
                                appendTbody.append($("<tr/>", {
                                    'class': 'detail-rows not-found-documents'
                                }).append($("<td/>", {
                                    colspan: "4"
                                }).text("Ek Döküman tablosunda kayıt(lar) bulunamadı!")));
                            }
                        }
                    );
                    detailRow.append(appendTbody);
                });

                $("body").on("keyup change", ".gelen-adet", function() {
                    var el = this,
                        gelenSn = $(el).closest('tr').find('.gelen-sn'),
                        gelenSnSplitLength = gelenSn.val().split(seperator).length;

                    if (el.value != "") {

                        if (gelenSnSplitLength > parseInt(el.value)) {
                            gelenSn.val('');
                        }

                        if (parseInt(el.value) < parseInt(el.min)) {
                            el.value = el.min;
                        }
                        if (parseInt(el.value) > parseInt(el.max)) {
                            el.value = el.max;
                        }
                        if (el.value > 0) {
                            $(el).closest('tr').find('.btn-expand-gelen-sn b').text(String.format("{0} tane yazı kutusu aç", el.value));
                        } else {
                            $(el).closest('tr').find('.btn-expand-gelen-sn b').text(String.format("Lütfen gelen adeti sıfırdan büyük olucak şekilde ayarlayınız!", el.value));
                        }
                    } else {
                        $(el).closest('tr').find('.btn-expand-gelen-sn b').text(String.format("Lütfen gelen adeti doldurunuz!"));
                        gelenSn.val('');
                    }
                });

                $("body").on("click",
                    ".btn-expand-gelen-sn",
                    function() {
                        var $this = $(this),
                            rowId = $this.data('rowid'),
                            tr = $(String.format("tr[data-id={0}]", rowId)),
                            gelenSnAdet = tr.find('.gelen-adet').val(),
                            gelenSn = tr.find('.gelen-sn').val();

                        if (gelenSnAdet == 0 || String.isNullOrWhiteSpace(gelenSnAdet)) {
                            tr.find('.gelen-adet').focus();
                            return;
                        }

                        $('#modalGelenSn').remove();
                        window.setModal.Create({
                            id: 'modalGelenSn',
                            html: {
                                header: 'Gelen Seri Numaralar',
                                body: '<div class="form-group msg"></div>',
                                footer: '<button class="btn btn-success btn-gelen-sn-kaydet-bitir btn-sm" data-rowid="' + rowId + '">Kaydet ve Bitir</button><button data-dismiss="modal" class="btn btn-danger btn-sm btn-modal-close">Vazgeç</button>'
                            }
                        });

                        $('#modalGelenSn').find('.modal-header button.close').remove();
                        var i = 1;
                        var modalBody = $("#modalGelenSn").find('.modal-body'),
                            gelenSnSplitted = gelenSn.split(seperator),
                            gelenSnLength = gelenSnSplitted.length;

                        for (let index = 0; index < parseInt(gelenSnAdet); index++) {
                            modalBody.append($("<div/>", {
                                class: 'form-group'
                            }).append($('<label/>').append($("<i/>", {
                                class: 'fas fa-asterisk text-danger',
                                title: 'Zorunlu Alan'
                            })).append(String.format(" {0}. Seri Numarası", i++))).append($("<input/>", {
                                "type": "text",
                                "class": "form-control",
                                value: (gelenSnLength - 1 >= index) ? gelenSnSplitted[index] : ''
                            })));
                        }

                        $('.modal-backdrop').remove();
                        $('#modalGelenSn').modal({
                            backdrop: 'static',
                            keyboard: false
                        });
                    });

                $("body").on("click",
                    ".btn-gelen-sn-kaydet-bitir",
                    function() {
                        var $this = $(this),
                            rowId = $this.data('rowid'),
                            tr = $(String.format("tr[data-id={0}]", rowId));

                        var gelenSnArray = [],
                            gelenSnIsNullOrEmpty = false;
                        $("#modalGelenSn .modal-body input").each(function(i, v) {
                            var value = $(v).val();
                            if (String.isNullOrWhiteSpace(value)) {
                                gelenSnIsNullOrEmpty = true;
                                return;
                            }
                            gelenSnArray.push(value);
                        });

                        if (!isUnique(gelenSnArray)) {
                            setUtil.alert({
                                container: '#modalGelenSn .msg',
                                message: "Lütfen gelen seri numaralarını aynı olmayacak şekilde giriş yapınız!",
                                alertClass: 'alert-danger',
                                autoClose: true
                            });
                            return;
                        }

                        if (gelenSnIsNullOrEmpty) {
                            setUtil.alert({
                                container: '#modalGelenSn .msg',
                                message: "Lütfen tüm yıldızlı alanları doldurup tekrar deneyiniz!",
                                alertClass: 'alert-danger',
                                autoClose: true
                            });
                            return;
                        }

                        tr.find('.gelen-sn').val(gelenSnArray.join(seperator));
                        $('#modalGelenSn').modal("toggle");
                    });

                $("body").on("keyup",
                    ".gelen-sn",
                    function() {
                        var textarea = $(this),
                            value = textarea.val(),
                            max = $(this).closest('td').closest('tr').find('.gelen-adet').val();
                        if (value.split(seperator).length > max) {
                            textarea.val(textarea.val().substring(0, textarea.val().length - 1));
                        }
                    });

                $("body").off("click",
                    "#tbl-transfer-order table tbody tr td").on("click",
                    "#tbl-transfer-order table tbody tr td",
                    function() {
                        var id = $(this).closest('tr').data('id'),
                            tr = $(this).closest('tr');
                        if (tr.hasClass("detail-row") || $(this).find('input').hasClass('form-control') || $(this).find('textarea').hasClass('form-control')) return;
                        $(String.format("#detailrow_{0}", id)).toggle();
                    });

                $("body").on("change",
                    ".document-check",
                    function() {
                        $(".document-check").prop('disabled', true);

                        var model = {
                            RecordId: '',
                            AdditionalDocuments: []
                        };

                        $(this).closest('tr').parent('tbody').find('tr').each(function(i, v) {
                            model.RecordId = $(v).data('recordid')
                            model.AdditionalDocuments.push({
                                DocumentId: $(v).data('documentid'),
                                Yes: $(v).find('.document-yes-check').is(':checked'),
                                No: $(v).find('.document-no-check').is(':checked')
                            });
                        });

                        var realUrl = String.format("https://thywebapi.setcrm.com/api/data/UpdateDocumentYesOrNoToOffer"),
                            localUrl = String.format("http://localhost:65474//api/data/UpdateDocumentYesOrNoToOffer");
                        $.post(realUrl, model,
                            function(r) {
                                $(".document-check").prop('disabled', false);
                                if (r.Status) {
                                    postMessageNotify("success");
                                } else {
                                    postMessageNotify("error");
                                }
                            }
                        );
                    });
            });

        function validation() {
            var validation = true;
            var y = 1;
            $("#tbl-transfer-order table tbody tr:not(.detail-rows)").each(function(i, v) {
                var gelenAdet = $(v).find('td[data-id=E6642C1996A749889CA33FB2BAA9F9E9] input').val(),
                    gelenSn = $(v).find('td[data-id=C3537E5811624C879B77898D64160097] textarea').val(),
                    sn = $(v).find('td[data-id=ADDB52CF8FCE4827872B015A6E57185F]').data("value");

                if (parseInt(gelenAdet) === 0 || String.isNullOrWhiteSpace(gelenAdet)) {
                    setUtil.alert({
                        container: '#modalCreateTransferOrder #msg',
                        message: String.format("Satır: {0} - Gelen adet sıfırdan büyük olmalıdır. Lütfen kontrol edin.", y),
                        alertClass: 'alert-danger',
                        autoClose: true
                    });
                    validation = false;
                    $(v).find('td[data-id=E6642C1996A749889CA33FB2BAA9F9E9] input').css({
                        "border": "1px solid red"
                    });
                    setTimeout(function() {
                        $(v).find('td[data-id=E6642C1996A749889CA33FB2BAA9F9E9] input').css({
                            "border": ""
                        });
                    }, 1000);
                    return validation;
                }

                if (String.isNullOrWhiteSpace(sn)) {

                    if (gelenSn.split(seperator).length === 1) {
                        if (gelenSn.split(seperator)[0] === "") {
                            setUtil.alert({
                                container: '#modalCreateTransferOrder #msg',
                                message: String.format("Satır: {0} - Seri numarası girişi yapmadınız. Lütfen kontrol edin.", y),
                                alertClass: 'alert-danger',
                                autoClose: true
                            });
                            validation = false;
                            $(v).find('td[data-id=C3537E5811624C879B77898D64160097] textarea').css({
                                "border": "1px solid red"
                            });
                            setTimeout(function() {
                                $(v).find('td[data-id=C3537E5811624C879B77898D64160097] textarea').css({
                                    "border": ""
                                });
                            }, 1000);
                        } else if (parseInt(gelenAdet) !== gelenSn.split(seperator).length) {
                            setUtil.alert({
                                container: '#modalCreateTransferOrder #msg',
                                message: String.format("Satır: {0} - Gelen adetten fazla/eksik seri numarası girişi yaptınız. Lütfen kontrol edin.", y),
                                alertClass: 'alert-danger',
                                autoClose: true
                            });
                            validation = false;
                            $(v).find('td[data-id=C3537E5811624C879B77898D64160097] textarea').css({
                                "border": "1px solid red"
                            });
                            setTimeout(function() {
                                $(v).find('td[data-id=C3537E5811624C879B77898D64160097] textarea').css({
                                    "border": ""
                                });
                            }, 1000);
                        } else if (String.isNullOrWhiteSpace(gelenSn.split(seperator)[parseInt(gelenAdet) - 1])) {
                            setUtil.alert({
                                container: '#modalCreateTransferOrder #msg',
                                message: String.format("Satır: {0} - Eksik seri numarası girdiniz. Lütfen kontrol edin. Satır: {0}", y),
                                alertClass: 'alert-danger',
                                autoClose: true
                            });
                            validation = false;
                            $(v).find('td[data-id=C3537E5811624C879B77898D64160097] textarea').css({
                                "border": "1px solid red"
                            });
                            setTimeout(function() {
                                $(v).find('td[data-id=C3537E5811624C879B77898D64160097] textarea').css({
                                    "border": ""
                                });
                            }, 1000);
                        }
                    } else if (parseInt(gelenAdet) !== gelenSn.split(seperator).length) {
                        setUtil.alert({
                            container: '#modalCreateTransferOrder #msg',
                            message: String.format("Satır: {0} - Gelen adetten fazla/eksik seri numarası girişi yaptınız. Lütfen kontrol edin.", y),
                            alertClass: 'alert-danger',
                            autoClose: true
                        });
                        validation = false;
                        $(v).find('td[data-id=C3537E5811624C879B77898D64160097] textarea').css({
                            "border": "1px solid red"
                        });
                        setTimeout(function() {
                            $(v).find('td[data-id=C3537E5811624C879B77898D64160097] textarea').css({
                                "border": ""
                            });
                        }, 1000);
                    } else if (String.isNullOrWhiteSpace(gelenSn.split(seperator)[parseInt(gelenAdet) - 1])) {
                        setUtil.alert({
                            container: '#modalCreateTransferOrder #msg',
                            message: String.format("Satır: {0} - Eksik seri numarası girdiniz. Lütfen kontrol ediniz!", y),
                            alertClass: 'alert-danger',
                            autoClose: true
                        });
                        validation = false;
                        $(v).find('td[data-id=C3537E5811624C879B77898D64160097] textarea').css({
                            "border": "1px solid red"
                        });
                        setTimeout(function() {
                            $(v).find('td[data-id=C3537E5811624C879B77898D64160097] textarea').css({
                                "border": ""
                            });
                        }, 1000);
                    } else {
                        var arr = gelenSn.split(seperator);
                        if (!isUnique(arr)) {
                            setUtil.alert({
                                container: '#modalCreateTransferOrder #msg',
                                message: String.format("Satır: {0} - Belirtilen satır da aynı seri numaraları tespit edildi. Lütfen kontrol edin.", y),
                                alertClass: 'alert-danger',
                                autoClose: true
                            });
                            validation = false;
                            $(v).find('td[data-id=C3537E5811624C879B77898D64160097] textarea').css({
                                "border": "1px solid red"
                            });
                            setTimeout(function() {
                                $(v).find('td[data-id=C3537E5811624C879B77898D64160097] textarea').css({
                                    "border": ""
                                });
                            }, 1000);
                        }
                    }
                }
                y++;
            });
            return validation;
        }

        $("body").on("click",
            "#btnCreateTransferOrderSubmitButton",
            function() {
                var button = $(this);

                if (!validation()) return;

                button.hide();

                $("#modalCreateTransferOrder .modal-body").find('#tbl-transfer-order').hide();
                $("#modalCreateTransferOrder .modal-body").prepend("<iframe src='/set/new/transfer-order?pageLayoutId=73584897E57247B6B9D7E69EB8ADE6DB' id='frameTransferOrder' style='width:100%;height:500px;border:none;' frameborder='0'></iframe>");

                var recordId = "";
                $('#frameTransferOrder').on("load", function() {
                    recordId = $("#frameTransferOrder").contents().find('#RecordPublicId').val();
                    if (!String.isNullOrWhiteSpace(recordId)) {
                        $("#modalCreateTransferOrder .modal-body").find('#frameTransferOrder, .alert-warning').remove();
                        $("#modalCreateTransferOrder .modal-body").prepend('<div id="txt" style="margin:0 0 5px; width: 100%;">Transfer Order oluşturuldu, kalan işlemler tamamlanıyor...<br/> <img src="/Public/img/loading_bar.gif"></div><br><a target="_blank" class="btn btn-success btn-sm" href="/set/transfer-order/detail/' + recordId + '"><i class="fas fa-external-link-alt"></i> Transfer Order Görüntüle</a>');

                        var model = {
                            TransferOrderId: recordId,
                            TransferOrderItems: []
                        };

                        $("#tbl-transfer-order table tbody tr:not(.detail-rows)").each(function(i, v) {

                            var recordId = $(v).data('id');
                            var additionalDocuments = [];
                            $(String.format("#detailrow_{0} td table tbody tr:not(.not-found-documents)", recordId)).each(function(i, v) {
                                additionalDocuments.push({
                                    DocumentId: $(v).data('documentid'),
                                    Yes: $(v).find('.document-yes-check').is(':checked'),
                                    No: $(v).find('.document-no-check').is(':checked')
                                });
                            });

                            model.TransferOrderItems.push({
                                RecordId: recordId,
                                OfferId: $(v).find('td[data-id=8C6E8290375940D195ACDA1746675430]').data("value"),
                                GelenAdet: $(v).find('td[data-id=E6642C1996A749889CA33FB2BAA9F9E9] input').val(),
                                GelenSN: $(v).find('td[data-id=C3537E5811624C879B77898D64160097] textarea').val(),
                                AdditionalDocuments: additionalDocuments
                            });

                        });

                        var realUrl = String.format("https://thywebapi.setcrm.com/api/data/CreateTransferOrder"),
                            localUrl = String.format("http://localhost:65474//api/data/CreateTransferOrder");
                        $.post(realUrl, model,
                            function(r) {
                                $("#modalCreateTransferOrder .modal-body #txt").hide();
                                $('#modalCreateTransferOrder').find('.modal-body #msg').remove();
                                $('#modalCreateTransferOrder').find('.modal-body').prepend('<div id="msg"></div>');
                                if (r.Status) {
                                    setUtil.alert({
                                        container: '#modalCreateTransferOrder #msg',
                                        message: "İşlem başarılı!",
                                        alertClass: 'alert-success',
                                        autoClose: false
                                    });

                                    setTimeout(function() {
                                        window.location.reload();
                                    }, 1500);
                                } else {
                                    setUtil.alert({
                                        container: '#modalCreateTransferOrder #msg',
                                        message: r.Message,
                                        alertClass: 'alert-danger',
                                        autoClose: false
                                    });
                                }
                            }
                        );

                    }
                    $("#frameTransferOrder").contents().find('#navbarmenu, #btn_save_and_new, footer').remove();
                    $("#frameTransferOrder").contents().find('.well-xxs:first').hide();
                    $("#frameTransferOrder").contents().find('body').attr("style",
                        "padding-top:0 !important");
                });
            });

        function postMessageNotify(type) {
            $.notify({
                icon: type === "success" ? 'fas fa-check' : 'fas fa-times-circle',
                message: type === "success" ? 'Başarılı!' : 'Bir hata oluştu!'
            }, {
                z_index: '9999999',
                type: type === "success" ? "success" : "danger",
                placement: {
                    from: "bottom",
                    align: "right"
                },
                offset: 50,
                animate: {
                    enter: 'animated flipInY',
                    exit: 'animated flipOutX'
                },
            });
        }
    }
});