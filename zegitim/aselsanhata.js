$(function() {
    $("body").append("<style>@-webkit-keyframes spinner-grow {0% { -webkit-transform: scale(0);transform: scale(0);}50% { opacity: 1; } }@keyframes spinner-grow { 0% {-webkit-transform: scale(0);transform: scale(0);}50% {opacity: 1;}}.spinner-grow {display: inline-block;width: 2rem;height: 2rem;vertical-align: text-bottom;background-color: currentColor;border-radius: 50%;opacity: 0;-webkit-animation: spinner-grow.75s linear infinite;animation: spinner-grow.75s linear infinite;}.spinner-grow-sm {width: 1rem;height: 1rem;}.spinner-grow-lg {width: 3rem;height: 3rem;}</style>");
    var labName = $('label[for=8AC9B459D6CD4DC3A748070B763F2FCF]').closest('div').data('value'),
        labId = $('label[for=8AC9B459D6CD4DC3A748070B763F2FCF]').closest('div').data('publicids'),
        talepId = $('#RecordPublicId').val(),
        talepNo = $('label[for=3F412EF574914A8F92A0FB7643E55D87]').closest('div').data('value'),
        newTalepIndex = 0,
        windowHeight = window.innerHeight,
        talepDurumu = $('label[for=0B07D48739AD4F28BA1AB27CD5647AF7]').closest('div').data('publicids'),
        talepSahibi = $('label[for=7212449A3B444F04BEF9200D41432A15]').closest('div').data('publicids'),
        talepSorumlulari = $('label[for=AE1B79A07E624E649013B68848D81971]').closest('div').data('publicids');

    var isAuth = true;
    if (talepDurumu === "B91A7D0045EE499AB6531B1B835624B9" && userData.id === talepSahibi) {
        isAuth = false;
    } else if (talepDurumu === "F211B95BDD704FB1B9A0EDA62FCB21AD" && userData.id !== talepSahibi) {
        isAuth = false;
    } else if (userData.id !== talepSahibi && !talepSorumlulari.contains(userData.id)) {
        //!String.isNullOrWhiteSpace(talepSorumlulari) &&
        isAuth = false;
    } else if ((talepDurumu === "777D0C27DA2B48DEBE4FA3F8CC767244" || talepDurumu === "5E558CD0C45443E09C833A937AEBDCC9")) {
        isAuth = false;
    }

    if (talepDurumu === "9AF9082E07AB429C9B81996C3244D7DA" || talepDurumu === "07A680E30C804FE9B84D7EEDCB40EB5F" || talepDurumu === "1D29412649E8412796D60E3B0BA09198") {
        isAuth = false;
    }

    if (userData.permissionGroupIds.contains('1D3A27754E8E40308C9D96B4AB76365A')) {
        isAuth = true;
    }

    var maxTalepSayisi = $("label[for=B119445F152940FD9A171BADB80FFF0C]").closest('div').data('value');
    var maxUrunSayisi = $("label[for=8A1CCEF0DFF04021AF3C4F0CE0B72DAB]").closest('div').data('value');
    var labName = $("label[for=8AC9B459D6CD4DC3A748070B763F2FCF]").closest('div').data('value');

    var talepButtonDisabled = false;
    if (!String.isNullOrWhiteSpace(maxTalepSayisi)) {
        var lrId = labName.toUpperCase().contains('EMC') ? "E1AEB5D8A9464EDD91CC4C598A9A16A1" : "85E22189C2484D93B91D02AAB297BFB9";
        $.get("https://aselsanwebapi.setcrm.com/api/data/GetLookupRelationItemCount", {
                recordId: $("#RecordPublicId").val(),
                lrId: lrId
            },
            function(r) {
                if (parseInt(r) >= parseInt(maxTalepSayisi)) {
                    talepButtonDisabled = true;
                }
            }
        );
    }

    var urunButtonDisabled = false;
    if (!String.isNullOrWhiteSpace(maxUrunSayisi)) {
        $.get("https://aselsanwebapi.setcrm.com/api/data/GetLookupRelationItemCount", {
                recordId: $("#RecordPublicId").val(),
                lrId: "8BAFAB92C33544E08D8348DC35392078"
            },
            function(r) {
                if (parseInt(r) >= parseInt(maxUrunSayisi)) {
                    urunButtonDisabled = true;
                }
            }
        );
    }

    $('body').on('lookupRelationLoadTriggerEvent',
        function(e, relationId) {
            if (relationId === '8BAFAB92C33544E08D8348DC35392078') {
                var pageLayoutId = labName.contains('EMC') ? $('label[for=D67D5FCABDB044028FC689935A0BC9E9]').closest('div').data('value') :
                    $('label[for=0C8AEB1DF93E442C8D3B220BBDB81EDC]').closest('div').data('value');
                //Test Edilecek Ürün Bilgileri
                $(String.format('div[data-id={0}]', relationId)).find('.btn-urun-bilgisi, .btn-urunBilgisiDisabled').remove();
                if (urunButtonDisabled) {
                    $(String.format('div[data-id={0}]', relationId)).prepend('<a type="button" disabled class="btn btn-warning btn-sm pull-right btn-urunBilgisiDisabled" data-pagelayoutid="' + pageLayoutId + '" style="margin-right:5px;margin-top:2px;"><i class="fas fa-plus"></i> Ekle</a>');
                    $(".btn-urunBilgisiDisabled").hover(
                        function() {
                            $(this).tooltip('hide');
                            $(this).attr({
                                "data-toggle": "tooltip",
                                "data-placement": "top",
                                "data-html": 'true',
                                "data-original-title": "Maksimum ürün sayısına ulaştınız!"
                            });
                            $(this).tooltip('show');
                            $(this).removeAttr("data-toggle data-placement data-original-title");
                        }
                    );
                } else {
                    $(String.format('div[data-id={0}]', relationId)).prepend('<button type="button" class="btn btn-warning btn-sm pull-right btn-urun-bilgisi" data-pagelayoutid="' + pageLayoutId + '" style="margin-right:5px;margin-top:2px;"><i class="fas fa-plus"></i> Ekle</button>');
                }

                $(String.format('div[data-id={0}]', relationId)).find('.edit-lookuprow').attr('data-pagelayoutid', pageLayoutId).addClass('edit-lookupiframerow').removeClass('edit-lookuprow');
                var detailButton = $(String.format('div[data-id={0}]', relationId)).find('.panel-body .btn-primary');
                detailButton.each(function(i, v) {
                    var href = $(v).attr('href');
                    $(v).attr('data-pagelayoutid', pageLayoutId).attr('data-href', href).addClass('detail-lookupiframerow').removeAttr('href')
                });

                if (!isAuth) {
                    $(String.format('div[data-id={0}]', relationId)).find('.edit-lookupiframerow, .btn-urun-bilgisi, .detail-lookupiframerow, .btn-primary, .btn-delete').remove();
                }
            } else if (relationId === '199867B5A3634B88B8EFCBC7973FBF93') {
                var pageLayoutId = labName.contains('EMC') ? $('label[for=D67D5FCABDB044028FC689935A0BC9E9]').closest('div').data('value') :
                    $('label[for=0C8AEB1DF93E442C8D3B220BBDB81EDC]').closest('div').data('value');
                //Test Edilecek Cihaz Bilgileri
                $(String.format('div[data-id={0}]', relationId)).find('.btn-cihaz-bilgisi').remove();
                $(String.format('div[data-id={0}]', relationId)).prepend('<button type="button" class="btn btn-warning btn-sm pull-right btn-cihaz-bilgisi" data-pagelayoutid="' + pageLayoutId + '" style="margin-right:5px;margin-top:2px;"><i class="fas fa-plus"></i> Ekle</button>');
                // var detailButton = $(String.format('div[data-id={0}]', relationId)).find('.btn-primary:first'),
                //     href = detailButton.attr('href');
                // detailButton.attr('data-pagelayoutid', pageLayoutId).attr('data-href', href).addClass('detail-lookupiframerow').removeAttr('href');
                var detailButton = $(String.format('div[data-id={0}]', relationId)).find('.panel-body .btn-primary');
                detailButton.each(function(i, v) {
                    var href = $(v).attr('href');
                    $(v).attr('data-pagelayoutid', pageLayoutId).attr('data-href', href).addClass('detail-lookupiframerow').removeAttr('href')
                });

                $(String.format('div[data-id={0}]', relationId)).find('.edit-lookuprow').attr('data-pagelayoutid', pageLayoutId).addClass('edit-lookupiframerow').removeClass('edit-lookuprow');

                if (!isAuth) {
                    $(String.format('div[data-id={0}]', relationId)).find('.edit-lookupiframerow, .btn-cihaz-bilgisi, .detail-lookupiframerow, .btn-delete').remove();
                }
            } else if (relationId === 'E1AEB5D8A9464EDD91CC4C598A9A16A1' || relationId === "85E22189C2484D93B91D02AAB297BFB9") {
                var pageLayoutId = labName.contains('EMC') ? $('label[for=4337478036A04984A7802AC3991A41CA]').closest('div').data('value') :
                    $('label[for=2FA4AFC37A3A459083567BE3CA54ABB6]').closest('div').data('value');

                newTalepIndex = parseInt($(String.format(".panel[data-id={0}]", relationId)).find('#itemCount').text()) + 1;

                //Talep Kalemleri
                $(String.format('div[data-id={0}]', relationId)).find('.btn-talep-kalemi, .btn-talepKalemDisabled').remove();
                if (talepButtonDisabled) {
                    $(String.format('div[data-id={0}]', relationId)).prepend('<a type="button" class="btn btn-warning btn-sm pull-right btn-talepKalemDisabled" data-pagelayoutid="' + pageLayoutId + '" disabled style="margin-right:5px;margin-top:2px;"><i class="fas fa-plus"></i> Ekle</a>');
                    $(".btn-talepKalemDisabled").hover(
                        function() {
                            $(this).tooltip('hide');
                            $(this).attr({
                                "data-toggle": "tooltip",
                                "data-placement": "top",
                                "data-html": 'true',
                                "data-original-title": "Maksimum talep sayısına ulaştınız!"
                            });
                            $(this).tooltip('show');
                            $(this).removeAttr("data-toggle data-placement data-original-title");
                        }
                    );
                } else {
                    $(String.format('div[data-id={0}]', relationId)).prepend('<button type="button" class="btn btn-warning btn-sm pull-right btn-talep-kalemi" data-pagelayoutid="' + pageLayoutId + '" style="margin-right:5px;margin-top:2px;"><i class="fas fa-plus"></i> Ekle</button>');
                }
                $(String.format('div[data-id={0}]', relationId)).find('.edit-lookuprow').attr('data-pagelayoutid', pageLayoutId).addClass('edit-lookupiframerow').removeClass('edit-lookuprow');
                if (!isAuth) {
                    $(String.format('div[data-id={0}]', relationId)).find('.edit-lookupiframerow, .btn-talep-kalemi, .btn-delete').remove();
                }

                if (talepSahibi === userData.id && talepDurumu === "F211B95BDD704FB1B9A0EDA62FCB21AD") {
                    $(String.format('div[data-id={0}]', relationId)).find('.btn-talep-kalemi').remove();
                }
            } else if (relationId === "E13933124C694BDD9191C780B2ED5933" || relationId === "C66C318CC8A3489EBF885E3395F0E84B" || relationId === "B8C927A65DD647F0B999F3746F052447") {
                if (!isAuth) {
                    $(String.format('div[data-id={0}]', relationId)).find('.new-lookuprow, .edit-lookuprow, .btn-primary, .btn-delete').remove();
                }
            } else if (relationId == "2AC1B73431D44FDB90A1365258C312DB") {
                if (!isAuth) {
                    $(String.format('div[data-id={0}]', relationId)).find('.new-lookuprow, .edit-lookuprow, .btn-primary, .btn-delete').remove();
                } else if (talepDurumu === "F211B95BDD704FB1B9A0EDA62FCB21AD" && talepSahibi === userData.id) {
                    $(String.format('div[data-id={0}]', relationId)).find('.new-lookuprow, .edit-lookuprow, .btn-primary, .btn-delete').remove();
                }
            }
        });

    $('body').on('click',
        '.btn-cihaz-bilgisi',
        function() {

            var pageLayoutId = labName.contains('EMC') ? $('label[for=D67D5FCABDB044028FC689935A0BC9E9]').closest('div') :
                $('label[for=0C8AEB1DF93E442C8D3B220BBDB81EDC]').closest('div');

            $('#modalCihazBilgisi').remove();
            window.setModal.Create({
                id: 'modalCihazBilgisi',
                html: {
                    // header: 'Test Edilecek Cihazla İlgili Bilgiler',
                    body: String.format("<div style='margin:15px auto;text-align: center;' id='spinner'><div class='spinner-grow spinner-grow-lg text-danger' role='status'><span class='sr-only'></span></div><div class='spinner-grow spinner-grow-lg text-warning' role='status'><span class='sr-only'></span></div><div class='spinner-grow spinner-grow-lg text-success' role='status'><span class='sr-only'></span></div><br><b style='font-size:15px;letter-spacing:1px;font-weight:normal;'>Yükleniyor, Lütfen bekleyiniz...</b></div><div style='padding-left: 15px;'></div><iframe src='/set/new/talep-cihazlari?pageLayoutId={0}&talepId={1}&talepNo={2}' id='frameCihazBilgisi' style='width:100%;height:{3}px;border:none;display:none;' frameborder='0'></iframe>", pageLayoutId.data('value'), talepId, talepNo, windowHeight - 150),
                    footer: '<button type="button" class="btn btn-sm btn-default btn-close-custom-modal" data-dismiss="modal">Kapat</button>'
                },
                settings: {
                    widthClass: 'modal-full-width'
                }
            });

            if (String.isNullOrWhiteSpace(pageLayoutId.data('value'))) {
                $('#modalCihazBilgisi').find('.modal-body').html('');
                setUtil.alert({
                    container: '#modalCihazBilgisi .modal-body',
                    message: String.format("{0} alanı boş olduğundan dolayı işleme devam edilemez!", pageLayout.find('label').text()),
                    alertClass: 'alert-warning',
                    autoClose: false
                });
            } else {
                $('#modalCihazBilgisi').find('.modal-body').css('padding', "0");

                $('.btn-close-custom-modal').on('click', function() {
                    window.location.reload();
                });

                $('#frameCihazBilgisi').on("load", function() {
                    $('#frameCihazBilgisi').show();
                    $('#spinner').remove();
                    $('#modalCihazBilgisi').find('.modal-body').css('padding', '0');
                    $("#frameCihazBilgisi").contents().find('#navbarmenu').remove();
                    $("#frameCihazBilgisi").contents().find('footer').hide();
                    $("#frameUrunBilgisi").contents().find('#btn_save_and_new').text("Kaydet ve Yeni Cihaz Ekle");
                    // $("#frameCihazBilgisi").contents().find('.well-xxs:first').hide();
                    $("#frameCihazBilgisi").contents().find('body').attr("style",
                        "padding-top:0 !important");
                    $("#frameCihazBilgisi").contents().find('#btn_save').text('Kaydet ve İlerle');
                });
            }

            $('#modalCihazBilgisi').modal({
                backdrop: 'static',
                keyboard: false
            });
        });

    $('body').on('click',
        '.btn-urun-bilgisi',
        function() {
            var pageLayoutId = labName.contains('EMC') ? $('label[for=D67D5FCABDB044028FC689935A0BC9E9]').closest('div') :
                $('label[for=0C8AEB1DF93E442C8D3B220BBDB81EDC]').closest('div');

            $('#modalUrunBilgisi').remove();
            window.setModal.Create({
                id: 'modalUrunBilgisi',
                html: {
                    // header: 'Test Edilecek Ürün Bilgileri',
                    body: String.format("<div style='margin:15px auto;text-align: center;' id='spinner'><div class='spinner-grow spinner-grow-lg text-danger' role='status'><span class='sr-only'></span></div><div class='spinner-grow spinner-grow-lg text-warning' role='status'><span class='sr-only'></span></div><div class='spinner-grow spinner-grow-lg text-success' role='status'><span class='sr-only'></span></div><br><b style='font-size:15px;letter-spacing:1px;font-weight:normal;'>Yükleniyor, Lütfen bekleyiniz...</b></div><div style='padding-left: 15px;'></div><iframe src='/set/new/talep-birimleri?pageLayoutId={0}&talepId={1}&talepNo={2}' id='frameUrunBilgisi' style='width:100%;height:{3}px;border:none;display:none;' frameborder='0'></iframe>", pageLayoutId.data('value'), talepId, talepNo, windowHeight - 150),
                    footer: '<button type="button" class="btn btn-sm btn-default btn-close-custom-modal" data-dismiss="modal">Kapat</button>'
                },
                settings: {
                    widthClass: 'modal-full-width'
                }
            });

            if (String.isNullOrWhiteSpace(pageLayoutId.data('value'))) {
                $('#modalUrunBilgisi').find('.modal-body').html('');
                setUtil.alert({
                    container: '#modalUrunBilgisi .modal-body',
                    message: String.format("{0} alanı boş olduğundan dolayı işleme devam edilemez!", pageLayout.find('label').text()),
                    alertClass: 'alert-warning',
                    autoClose: false
                });
            } else {
                $('#modalUrunBilgisi').find('.modal-body').css('padding', "0");

                $('.btn-close-custom-modal').on('click', function() {
                    window.location.reload();
                });

                $('#frameUrunBilgisi').on("load", function() {
                    $('#modalUrunBilgisi').find('.modal-body').css('padding', '0');
                    if (!String.isNullOrWhiteSpace($("#frameUrunBilgisi").contents().find('#RecordPublicId').val())) {
                        $("#frameUrunBilgisi").contents().find('.row:first .col-lg-12').prepend('<div class="alert alert-success" role="alert">Kayıt başarılı, sayfa yenileniyor. Lütfen bekleyiniz.</div>');
                        setTimeout(function() {
                            window.location.reload();
                        }, 1000);
                    }
                    $('#frameUrunBilgisi').show();
                    $('#spinner').remove();
                    $("#frameUrunBilgisi").contents().find('#navbarmenu').remove();
                    $("#frameUrunBilgisi").contents().find('footer').hide();
                    $("#frameUrunBilgisi").contents().find('#btn_save_and_new').text("Kaydet ve Yeni Cihaz Ekle");
                    // $("#frameUrunBilgisi").contents().find('.well-xxs:first').hide();
                    $("#frameUrunBilgisi").contents().find('body').attr("style",
                        "padding-top:0 !important");
                    $("#frameUrunBilgisi").contents().find('#btn_save').text('Kaydet ve Kapat');
                });
            }

            $('#modalUrunBilgisi').modal({
                backdrop: 'static',
                keyboard: false
            });
        });

    $('body').on('click',
        '.btn-talep-kalemi',
        function() {
            var pageLayoutId = labName.contains('EMC') ? $('label[for=4337478036A04984A7802AC3991A41CA]').closest('div') :
                $('label[for=2FA4AFC37A3A459083567BE3CA54ABB6]').closest('div'),
                isEmc = labName.contains('EMC') ? true : false;

            $('#modalTalepKalemleri').remove();
            window.setModal.Create({
                id: 'modalTalepKalemleri',
                html: {
                    // header: 'Talep Kalemleri',
                    body: String.format("<div style='margin:15px auto;text-align: center;' id='spinner'><div class='spinner-grow spinner-grow-lg text-danger' role='status'><span class='sr-only'></span></div><div class='spinner-grow spinner-grow-lg text-warning' role='status'><span class='sr-only'></span></div><div class='spinner-grow spinner-grow-lg text-success' role='status'><span class='sr-only'></span></div><br><b style='font-size:15px;letter-spacing:1px;font-weight:normal;'>Yükleniyor, Lütfen bekleyiniz...</b></div><div style='padding-left: 15px;'></div><iframe src='/set/new/talep-kalemleri?pageLayoutId={0}&talepId={1}&talepNo={2}&labId={3}&labName={4}&talepNo={5}&talepIndex={6}&talepIframe=true' id='frameTalepKalemleri' style='width:100%;height:{7}px;border:none;display:none;' frameborder='0'></iframe>", pageLayoutId.data('value'), talepId, talepNo, labId, labName, talepNo, newTalepIndex, windowHeight - 150),
                    footer: '<button type="button" class="btn btn-sm btn-default btn-close2-custom-modal" data-dismiss="modal">Kapat</button>'
                },
                settings: {
                    widthClass: 'modal-full-width'
                }
            });

            if (String.isNullOrWhiteSpace(pageLayoutId.data('value'))) {
                $('#modalTalepKalemleri').find('.modal-body').html('');
                setUtil.alert({
                    container: '#modalTalepKalemleri .modal-body',
                    message: String.format("{0} alanı boş olduğundan dolayı işleme devam edilemez!", pageLayoutId.find('label').text()),
                    alertClass: 'alert-warning',
                    autoClose: false
                });
            } else {

                localStorage.setItem("talepKalemDetail", true);

                $('.btn-close2-custom-modal').on('click', function() {
                    window.location.reload();
                });

                $('#frameTalepKalemleri').on("load", function() {
                    if (!String.isNullOrWhiteSpace($("#frameTalepKalemleri").contents().find('#RecordPublicId').val())) {
                        $("#frameTalepKalemleri").contents().find('.panel-heading:contains(Yapılacak İşlemler)').parents('tr').hide();
                        $("#frameTalepKalemleri").contents().find("[data-id=7CCA095A5CD448FEB6DFFD0805ED93B6], [data-id=1E8959F3DB2544D09FCF473AEB7D8661]").hide(); //rezervasyon-talep hareket
                    }
                    $('#modalTalepKalemleri').find('.modal-body').css('padding', '0');
                    $('#frameTalepKalemleri').show();
                    $('#spinner').remove();
                    $("#frameTalepKalemleri").contents().find('#navbarmenu').remove();
                    $("#frameTalepKalemleri").contents().find('footer').hide();
                    // $("#frameTalepKalemleri").contents().find('.well-xxs:first').hide();
                    $("#frameTalepKalemleri").contents().find('body').attr("style",
                        "padding-top:0 !important");
                    if (isEmc) {
                        $("#frameTalepKalemleri").contents().find('#btn_save').text('Kaydet');
                        $("#frameTalepKalemleri").contents().find('#btn_save_and_new').text('Kaydet ve Yeni Kalem Ekle');
                    } else {
                        $("#frameTalepKalemleri").contents().find('#btn_save').text('Kaydet ve İlerle');
                        $("#frameTalepKalemleri").contents().find('#btn_save_and_new').remove();
                    }
                });
            }

            $('#modalTalepKalemleri').modal({
                backdrop: 'static',
                keyboard: false
            });
        });

    $('body').on('click',
        '.edit-lookupiframerow',
        function() {
            var href = $(this).data('href'),
                pageLayoutId = $(this).data('pagelayoutid');

            $('#modalEditIFrame').remove();
            window.setModal.Create({
                id: 'modalEditIFrame',
                html: {
                    // header: 'Güncelle',
                    body: String.format("<div style='margin:15px auto;text-align: center;' id='spinner'><div class='spinner-grow spinner-grow-lg text-danger' role='status'><span class='sr-only'></span></div><div class='spinner-grow spinner-grow-lg text-warning' role='status'><span class='sr-only'></span></div><div class='spinner-grow spinner-grow-lg text-success' role='status'><span class='sr-only'></span></div><br><b style='font-size:15px;letter-spacing:1px;font-weight:normal;'>Yükleniyor, Lütfen bekleyiniz...</b></div><div style='padding-left: 15px;'></div><iframe src='{0}?pageLayoutId={1}' id='frameEditRow' style='width:100%;height:{2}px;border:none;display:none;' frameborder='0'></iframe>", href, pageLayoutId, windowHeight - 150),
                    footer: '<button type="button" class="btn btn-sm btn-default btn-close-edit-custom-modal" data-dismiss="modal">Kapat</button>'
                },
                settings: {
                    widthClass: 'modal-full-width'
                }
            });

            if (String.isNullOrWhiteSpace(pageLayoutId)) {
                $('#modalEditIFrame').find('.modal-body').html('');
                setUtil.alert({
                    container: '#modalEditIFrame .modal-body',
                    message: String.format("Sayfa tasarımı alanı boş olduğundan dolayı işleme devam edilemez!"),
                    alertClass: 'alert-warning',
                    autoClose: false
                });
            } else {
                $('#modalEditIFrame').find('.modal-body').css('padding', "0");

                $('.btn-close-edit-custom-modal').on('click', function() {
                    window.location.reload();
                });

                $('#frameEditRow').on("load", function() {
                    $('#modalEditIFrame').find('.modal-body').css('padding', '0');
                    $('#frameEditRow').show();
                    $('#spinner').remove();
                    $("#frameEditRow").contents().find('#navbarmenu, #btn_save_and_new').remove();
                    $("#frameEditRow").contents().find('footer').hide();
                    $("#frameEditRow").contents().find('.well-xxs:first').hide();
                    $("#frameEditRow").contents().find('body').attr("style",
                        "padding-top:0 !important");
                });

            }

            $('#modalEditIFrame').modal({
                backdrop: 'static',
                keyboard: false
            });

        });

    $('body').on('click',
        '.detail-lookupiframerow',
        function() {
            var href = $(this).data('href'),
                pageLayoutId = $(this).data('pagelayoutid');

            $('#modalDetailIFrame').remove();
            window.setModal.Create({
                id: 'modalDetailIFrame',
                html: {
                    // header: 'Güncelle',
                    body: String.format("<div style='margin:15px auto;text-align: center;' id='spinner'><div class='spinner-grow spinner-grow-lg text-danger' role='status'><span class='sr-only'></span></div><div class='spinner-grow spinner-grow-lg text-warning' role='status'><span class='sr-only'></span></div><div class='spinner-grow spinner-grow-lg text-success' role='status'><span class='sr-only'></span></div><br><b style='font-size:15px;letter-spacing:1px;font-weight:normal;'>Yükleniyor, Lütfen bekleyiniz...</b></div><div style='padding-left: 15px;'></div><iframe src='{0}?pageLayoutId={1}' id='frameDetailRow' style='width:100%;height:{2}px;border:none;display:none;' frameborder='0'></iframe>", href, pageLayoutId, windowHeight - 150),
                    footer: '<button type="button" class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>'
                },
                settings: {
                    widthClass: 'modal-full-width'
                }
            });

            $('#modalDetailIFrame').find('.modal-body').css('padding', "0");

            $('#frameDetailRow').on("load", function() {
                $('#modalDetailIFrame').find('.modal-body').css('padding', '0');
                $('#frameDetailRow').show();
                $('#spinner').remove();
                $("#frameDetailRow").contents().find('#navbarmenu').remove();
                $("#frameDetailRow").contents().find('footer').hide();
                $("#frameDetailRow").contents().find('.well-xxs:first').hide();
                $("#frameDetailRow").contents().find('body').attr("style", "padding-top:0 !important");
            });

            $('#modalDetailIFrame').modal({
                backdrop: 'static',
                keyboard: false
            });

        });
});