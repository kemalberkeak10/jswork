$(function() {
    $("body").append(
        "<style> .hizli-ekle-new-row, .hizli-ekle-records{padding: 10px;} .hizli-ekle-new-row:hover{background: #e4e4e4;}  .hizli-ekle-records:hover{background: #e4e4e4;}</style>"
    );
    $(".well-xxs .col-md-4").removeClass("col-md-4").addClass("col-md-3");
    $(".well .pull-right:eq(0)").prepend(
        '<a id="btnHizliZamanGirisi" class="btn btn-sm btn-primary"  style="margin-right:3px;"><i class="fa fa-clock"></i> Hızlı Zaman Girişi</a>'
    );

    $("body")
        .off("click", "#btnHizliZamanGirisi")
        .on("click", "#btnHizliZamanGirisi", function() {
            var table = $(".table-responsive table");
            if (table.find("tbody tr").length == 0) {
                return;
            }

            $("#modalHizliZamanGirisi").remove();
            window.setModal.Create({
                id: "modalHizliZamanGirisi",
                html: {
                    header: '<i class="fa fa-clock"></i> Hızlı Zaman Girişi',
                    body: String.format(
                        '<div class="hizli-ekle-new-row"><h4 style="margin-top:0"><i class="fa fa-info"></i> Yeni Kayıt Ekle</h4></div><hr><div class="hizli-ekle-records"><h4 style="margin-top:0"><i class="fa fa-info"></i> Kayıt(lar)ı Güncelle</h4></div>'
                    ),
                    footer: '<button class="btn btn-danger btn-sm" data-dismiss="modal">Kapat</button>',
                },
                settings: {
                    widthClass: "modal-full-width",
                },
            });

            var modalBody = $("#modalHizliZamanGirisi .modal-body"),
                bodyNewRow = modalBody.find(".hizli-ekle-new-row"),
                bodyRecords = modalBody.find(".hizli-ekle-records");

            bodyNewRow.append(
                $("<table/>", {
                    class: "table table-bordered table-hover",
                    style: "margin-bottom:0",
                }).append(
                    "<thead><tr><th>Firma</th><th>İş Tanımı</th><th>Çalışan Açıklama</th><th>Efor / Dk</th><th>Bağlı Olduğu Proje</th><th>Bağlı Olduğu Proje Adımı</th><th>Bağlı Olduğu Mira Kaydı</th><th>Durum</th><th>İşlem</th></tr></thead><tbody style='background:white !important'><tr><td><div class='firma'></div></td><td><div class='isTanimi'></div></td><td><textarea rows='1' class='form-control calisan-aciklama' style='resize:vertical'></textarea></td><td><input type='text' class='form-control efor'></td><td><div class='bagliOlduguProje'></div></td><td><div class='bagliOlduguProjeAdimi'></div></td><td><div class='bagliOlduguMira'></div></td><td><div class='durum'></div></td><td style='text-align:center;'><a class='btn btn-success btn-sm btn-hizli-save-row' style='margin-right:5px;'><i class='fas fa-plus'></i></a><a class='btn btn-danger btn-sm btn-hizli-cancel-row' href='#'><i class='fas fa-times-circle'></i></a></td></tr></tbody>"
                )
            );

            bodyRecords.append(
                $("<table/>", {
                    class: "table table-bordered table-hover",
                    style: "margin-bottom:0;table-layout: fixed;",
                })
                .append(
                    $("<thead/>").html(
                        '<tr><th>Firma</th><th>İş Tanımı</th><th>Çalışan Açıklama</th><th>Efor / Dk</th><th>Bağlı Olduğu Proje</th><th>Bağlı Olduğu Proje Adımı</th><th>Bağlı Olduğu Mira Kaydı</th><th>Durum</th><th  style="width: 55px;text-align: center;">İşlem</th></tr>'
                    )
                )
                .append($("<tbody/>"))
            );

            var tbody = bodyRecords.find("tbody");
            tbody.attr("style", "background:white !important");
            $(".table-responsive table tbody tr").each(function(i, v) {
                var recordId = $(v).d
                ata("id"),
                    siraNo = ++i,
                    firmaId = $(v)
                    .find("td[data-id=AA748BEBFA754466B19842924B2359F9]")
                    .data("value"),
                    firmaText = $(v)
                    .find("td[data-id=AA748BEBFA754466B19842924B2359F9]")
                    .data("text"),
                    isTanimiId = $(v)
                    .find("td[data-id=25666A8D6DD1414787C82152F5E0B079]")
                    .data("value"),
                    isTanimiText = $(v)
                    .find("td[data-id=25666A8D6DD1414787C82152F5E0B079]")
                    .data("text"),
                    calisanAciklama = $(v)
                    .find("td[data-id=ABA25CA1D4644F9685E99538C7ADD522]")
                    .data("text"),
                    efor = $(v)
                    .find("td[data-id=10C693C486DD4E19813879064B993926]")
                    .data("text"),
                    bagliOlduguProjeId = $(v)
                    .find("td[data-id=5121456B7A7040F591331F1B1D6B027B]")
                    .data("value"),
                    bagliOlduguProjeText = $(v)
                    .find("td[data-id=5121456B7A7040F591331F1B1D6B027B]")
                    .data("text"),
                    bagliOlduguProjeAdimiId = $(v)
                    .find("td[data-id=CA5097550E8146D2A1467A53FF915B66]")
                    .data("value"),
                    bagliOlduguProjeAdimiText = $(v)
                    .find("td[data-id=CA5097550E8146D2A1467A53FF915B66]")
                    .data("text"),
                    bagliOlduguMiraKaydiId = $(v)
                    .find("td[data-id=7A6BBA5586844954B3AF9EAF3217420B]")
                    .data("value"),
                    bagliOlduguMiraKaydiText = $(v)
                    .find("td[data-id=7A6BBA5586844954B3AF9EAF3217420B]")
                    .data("text"),
                    durumId = $(v)
                    .find("td[data-id=15065A3DB46B4117944F4F07DAF2887B]")
                    .data("value"),
                    durumText = $(v)
                    .find("td[data-id=15065A3DB46B4117944F4F07DAF2887B]")
                    .data("text");
                tbody.append(
                    String.format(
                        "<tr data-id='{0}'><td style='display:none'>{1}</td><td><div id='firma_{0}'></div></td><td><div id='isTanimi_{0}'></div></td><td><textarea rows='1' class='form-control calisan-aciklama' style='resize:vertical'>{2}</textarea></td><td><input type='text' class='form-control efor' value='{3}'></td><td><div id='bagliOlduguProje_{0}'></div></td><td><div id='bagliOlduguProjeAdimi_{0}'></div></td><td><div id='bagliOlduguMira_{0}'></div></td><td><div id='durum_{0}'></div></td><td><a class='btn btn-success btn-sm btn-hizli-edit-row' style='margin-right:5px;'><i class='fas fa-save'></i></a></td></tr>",
                        recordId,
                        siraNo,
                        calisanAciklama,
                        efor
                    )

                );

                prepareSelect2(
                    "#durum_" + recordId,
                    "/Summary/LookupFieldValues", {
                        coId: "32654333EF6045E1BDE5716552775C33",
                        id: "15065A3DB46B4117944F4F07DAF2887B",
                        viewFilterId: "0CDF9E405A9748F7B13E94EEC4B1A8AA",
                    },
                    null,
                    false
                );

                if (!String.isNullOrWhiteSpace(durumId) &&
                    !String.isNullOrWhiteSpace(durumText)
                ) {
                    prepareSelect2SelectedOneItem(
                        "#durum_" + recordId,
                        durumId,
                        durumText,
                        false
                    );
                }

                prepareSelect2(
                    "#firma_" + recordId,
                    "/Summary/LookupFieldValues", {
                        coId: "32654333EF6045E1BDE5716552775C33",
                        id: "AA748BEBFA754466B19842924B2359F9",
                        viewFilterId: "495573AFA7C64709AB6E093A7D0CD7C3",
                    },
                    null,
                    false
                );

                prepareSelect2(
                    "#isTanimi_" + recordId,
                    "/Summary/fielditems", {
                        id: "25666A8D6DD1414787C82152F5E0B079",
                    },
                    null,
                    false
                );

                if (!String.isNullOrWhiteSpace(isTanimiId) &&
                    !String.isNullOrWhiteSpace(isTanimiText)
                ) {
                    prepareSelect2SelectedOneItem(
                        "#isTanimi_" + recordId,
                        isTanimiId,
                        isTanimiText,
                        false
                    );
                }
                if (!String.isNullOrWhiteSpace(firmaId) &&
                    !String.isNullOrWhiteSpace(firmaText)
                ) {
                    prepareSelect2SelectedOneItem(
                        "#firma_" + recordId,
                        firmaId,
                        firmaText,
                        false
                    );
                    prepareSelect2(
                        "#bagliOlduguProje_" + recordId,
                        "/Summary/LookupFieldValues", {
                            coId: "32654333EF6045E1BDE5716552775C33",
                            id: "5121456B7A7040F591331F1B1D6B027B",
                            viewFilterId: "EF792B24BFF64E4BB7222686307B0E37",
                            controllingRecordId: firmaId,
                            itemId: "5121456B7A7040F591331F1B1D6B027B",
                            groupIds: firmaId,
                        },
                        null,
                        false
                    );

                    if (!String.isNullOrWhiteSpace(bagliOlduguProjeId) &&
                        !String.isNullOrWhiteSpace(bagliOlduguProjeText)
                    ) {
                        prepareSelect2SelectedOneItem(
                            "#bagliOlduguProje_" + recordId,
                            bagliOlduguProjeId,
                            bagliOlduguProjeText,
                            false
                        );
                        prepareSelect2(
                            "#bagliOlduguProjeAdimi_" + recordId,
                            "/Summary/LookupFieldValues", {
                                coId: "32654333EF6045E1BDE5716552775C33",
                                id: "CA5097550E8146D2A1467A53FF915B66",
                                viewFilterId: "24913400CF2A41A898B0E12D5D1D9E01",
                                controllingRecordId: bagliOlduguProjeId,
                                itemId: "CA5097550E8146D2A1467A53FF915B66",
                                groupIds: bagliOlduguProjeId,
                            },
                            null,
                            false
                        );

                        if (!String.isNullOrWhiteSpace(bagliOlduguProjeAdimiId) &&
                            !String.isNullOrWhiteSpace(bagliOlduguProjeAdimiText)
                        ) {
                            prepareSelect2SelectedOneItem(
                                "#bagliOlduguProjeAdimi_" + recordId,
                                bagliOlduguProjeAdimiId,
                                bagliOlduguProjeAdimiText,
                                false
                            );
                            prepareSelect2(
                                "#bagliOlduguMira_" + recordId,
                                "/Summary/LookupFieldValues", {
                                    coId: "32654333EF6045E1BDE5716552775C33",
                                    id: "7A6BBA5586844954B3AF9EAF3217420B",
                                    viewFilterId: "15376C0D5705496998C7D0BEFD98F179",
                                    controllingRecordId: bagliOlduguProjeAdimiId,
                                    itemId: "7A6BBA5586844954B3AF9EAF3217420B",
                                    groupIds: bagliOlduguProjeAdimiId,
                                },
                                null,
                                false
                            );

                            if (!String.isNullOrWhiteSpace(bagliOlduguMiraKaydiId) &&
                                !String.isNullOrWhiteSpace(bagliOlduguMiraKaydiText)
                            ) {
                                prepareSelect2SelectedOneItem(
                                    "#bagliOlduguMira_" + recordId,
                                    bagliOlduguMiraKaydiId,
                                    bagliOlduguMiraKaydiText,
                                    false
                                );
                            } else {
                                prepareSelect2WithData(
                                    "#bagliOlduguMira_" + recordId,
                                    "0",
                                    "Seçiniz",
                                    false
                                );
                                $("#bagliOlduguMira_" + recordId).select2("enable", false);
                            }
                        } else {
                            prepareSelect2WithData(
                                "#bagliOlduguMira_" + recordId,
                                "0",
                                "Seçiniz",
                                false
                            );
                            $("#bagliOlduguMira_" + recordId).select2("enable", false);
                        }
                    } else {
                        prepareSelect2WithData(
                            "#bagliOlduguProjeAdimi_" + recordId,
                            "0",
                            "Seçiniz",
                            false
                        );
                        $("#bagliOlduguProjeAdimi_" + recordId).select2("enable", false);
                        prepareSelect2WithData(
                            "#bagliOlduguMira_" + recordId,
                            "0",
                            "Seçiniz",
                            false
                        );
                        $("#bagliOlduguMira_" + recordId).select2("enable", false);
                    }
                } else {
                    prepareSelect2WithData(
                        "#bagliOlduguProje_" + recordId,
                        "0",
                        "Seçiniz",
                        false
                    );
                    $("#bagliOlduguProje_" + recordId).select2("enable", false);
                    prepareSelect2WithData(
                        "#bagliOlduguProjeAdimi_" + recordId,
                        "0",
                        "Seçiniz",
                        false
                    );
                    $("#bagliOlduguProjeAdimi_" + recordId).select2("enable", false);
                    prepareSelect2WithData(
                        "#bagliOlduguMira_" + recordId,
                        "0",
                        "Seçiniz",
                        false
                    );
                    $("#bagliOlduguMira_" + recordId).select2("enable", false);
                }

                $("body").on("change", "#firma_" + recordId, function() {
                    if (String.isNullOrWhiteSpace($(this).val())) {
                        $(
                                String.format(
                                    "#bagliOlduguProje_{0}, #bagliOlduguProjeAdimi_{0}, #bagliOlduguMira_{0}",
                                    recordId
                                )
                            )
                            .select2("data", null)
                            .select2("enable", false);
                    } else {
                        $(String.format("#bagliOlduguProje_{0}", recordId)).select2(
                            "enable",
                            true
                        );
                        prepareSelect2(
                            "#bagliOlduguProje_" + recordId,
                            "/Summary/LookupFieldValues", {
                                coId: "32654333EF6045E1BDE5716552775C33",
                                id: "5121456B7A7040F591331F1B1D6B027B",
                                viewFilterId: "EF792B24BFF64E4BB7222686307B0E37",
                                controllingRecordId: $(this).val(),
                                itemId: "5121456B7A7040F591331F1B1D6B027B",
                                groupIds: $(this).val(),
                            },
                            null,
                            false
                        );
                    }
                });

                $("body").on("click", ".btn-hizli-edit-row", function() {
                    $(".btn-hizli-edit-row").prop("disabled", true);
                });

                $("body").on("change", "#bagliOlduguProje_" + recordId, function() {
                    if (String.isNullOrWhiteSpace($(this).val())) {
                        $(
                                String.format(
                                    "#bagliOlduguProjeAdimi_{0}, #bagliOlduguMira_{0}",
                                    recordId
                                )
                            )
                            .select2("data", null)
                            .select2("enable", false);
                    } else {
                        $(String.format("#bagliOlduguProjeAdimi_{0}", recordId)).select2(
                            "enable",
                            true
                        );
                        prepareSelect2(
                            "#bagliOlduguProjeAdimi_" + recordId,
                            "/Summary/LookupFieldValues", {
                                coId: "32654333EF6045E1BDE5716552775C33",
                                id: "CA5097550E8146D2A1467A53FF915B66",
                                viewFilterId: "24913400CF2A41A898B0E12D5D1D9E01",
                                controllingRecordId: $(this).val(),
                                itemId: "CA5097550E8146D2A1467A53FF915B66",
                                groupIds: $(this).val(),
                            },
                            null,
                            false
                        );
                    }
                });

                $("body").on(
                    "change",
                    "#bagliOlduguProjeAdimi_" + recordId,
                    function() {
                        if (String.isNullOrWhiteSpace($(this).val())) {
                            $("#bagliOlduguMira_" + recordId)
                                .select2("data", null)
                                .select2("enable", false);
                        } else {
                            $("#bagliOlduguMira_" + recordId).select2("enable", true);
                            prepareSelect2(
                                "#bagliOlduguMira_" + recordId,
                                "/Summary/LookupFieldValues", {
                                    coId: "32654333EF6045E1BDE5716552775C33",
                                    id: "7A6BBA5586844954B3AF9EAF3217420B",
                                    viewFilterId: "15376C0D5705496998C7D0BEFD98F179",
                                    controllingRecordId: $(this).val(),
                                    itemId: "7A6BBA5586844954B3AF9EAF3217420B",
                                    groupIds: $(this).val(),
                                },
                                null,
                                false
                            );
                        }
                    }
                );
            });

            prepareSelect2(
                ".firma",
                "/Summary/LookupFieldValues", {
                    coId: "32654333EF6045E1BDE5716552775C33",
                    id: "AA748BEBFA754466B19842924B2359F9",
                    viewFilterId: "495573AFA7C64709AB6E093A7D0CD7C3",
                },
                null,
                false
            );

            prepareSelect2(
                ".isTanimi",
                "/Summary/fielditems", {
                    id: "25666A8D6DD1414787C82152F5E0B079",
                },
                null,
                false
            );

            prepareSelect2(
                ".durum",
                "/Summary/LookupFieldValues", {
                    coId: "32654333EF6045E1BDE5716552775C33",
                    id: "15065A3DB46B4117944F4F07DAF2887B",
                    viewFilterId: "0CDF9E405A9748F7B13E94EEC4B1A8AA",
                },
                null,
                false
            );

            prepareSelect2WithData(".bagliOlduguProje", "0", "Seçiniz", false);
            $(".bagliOlduguProje").select2("enable", false);
            prepareSelect2WithData(".bagliOlduguProjeAdimi", "0", "Seçiniz", false);
            $(".bagliOlduguProjeAdimi").select2("enable", false);
            prepareSelect2WithData(".bagliOlduguMira", "0", "Seçiniz", false);
            $(".bagliOlduguMira").select2("enable", false);

            $("body").on("change", ".firma", function() {
                if (String.isNullOrWhiteSpace($(this).val())) {
                    $(".bagliOlduguProje, .bagliOlduguProjeAdimi, .bagliOlduguMira")
                        .select2("data", null)
                        .select2("enable", false);
                } else {
                    $(".bagliOlduguProje").select2("enable", true);
                    prepareSelect2(
                        ".bagliOlduguProje",
                        "/Summary/LookupFieldValues", {
                            coId: "32654333EF6045E1BDE5716552775C33",
                            id: "5121456B7A7040F591331F1B1D6B027B",
                            viewFilterId: "EF792B24BFF64E4BB7222686307B0E37",
                            controllingRecordId: $(this).val(),
                            itemId: "5121456B7A7040F591331F1B1D6B027B",
                            groupIds: $(this).val(),
                        },
                        null,
                        false
                    );
                }
            });

            $("body").on("change", ".bagliOlduguProje", function() {
                if (String.isNullOrWhiteSpace($(this).val())) {
                    $(".bagliOlduguProjeAdimi,.bagliOlduguMira")
                        .select2("data", null)
                        .select2("enable", false);
                } else {
                    $(".bagliOlduguProjeAdimi").select2("enable", true);
                    prepareSelect2(
                        ".bagliOlduguProjeAdimi",
                        "/Summary/LookupFieldValues", {
                            coId: "32654333EF6045E1BDE5716552775C33",
                            id: "CA5097550E8146D2A1467A53FF915B66",
                            viewFilterId: "24913400CF2A41A898B0E12D5D1D9E01",
                            controllingRecordId: $(this).val(),
                            itemId: "CA5097550E8146D2A1467A53FF915B66",
                            groupIds: $(this).val(),
                        },
                        null,
                        false
                    );
                }
            });

            $("body").on("change", ".bagliOlduguProjeAdimi", function() {
                if (String.isNullOrWhiteSpace($(this).val())) {
                    $(".bagliOlduguMira").select2("data", null).select2("enable", false);
                } else {
                    $(".bagliOlduguMira").select2("enable", true);
                    prepareSelect2(
                        ".bagliOlduguMira",
                        "/Summary/LookupFieldValues", {
                            coId: "32654333EF6045E1BDE5716552775C33",
                            id: "7A6BBA5586844954B3AF9EAF3217420B",
                            viewFilterId: "15376C0D5705496998C7D0BEFD98F179",
                            controllingRecordId: $(this).val(),
                            itemId: "7A6BBA5586844954B3AF9EAF3217420B",
                            groupIds: $(this).val(),
                        },
                        null,
                        false
                    );
                }
            });

            $("body").on("click", ".btn-hizli-cancel-row", function() {
                $(".firma, .isTanimi").select2("data", null).trigger("change");
                $(".calisan-aciklama, .efor").val("");
            });

            $("#modalHizliZamanGirisi").modal({
                backdrop: "static",
                keyboard: false,
            });

            $('body').on('click', '.btn-hizli-edit-row', function() {
                var $this = $(this),
                    tr = $this.parents('tr');

                //tr.find(String.format('#firma_{0}',tr.data('id'))).select2('data');
                debugger;
                var model = {
                    FirmaId: tr.find()

                };

            });
        });
});