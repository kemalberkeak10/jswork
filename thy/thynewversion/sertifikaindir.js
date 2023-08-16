$(function() {
    $(".well .pull-right:eq(0)").prepend(
        '<a id="sertifikaIndir" class="btn btn-sm btn-warning"  style="margin-right:10px;" >Sertifika İndir</a>'
    );
    var calibratedTechnicianId = $("label[for=229E6919177C49229ADC807F42F67E94]")
        .parent()
        .data("publicids");
    var theScopeResponsibleId = $("label[for=ADF4F8BC81294E2AB8E20C2EC1AF1175]")
        .parent()
        .data("publicids");
    var headOfCalibrationId = $("label[for=16FDBE7D7AEE4DE2BEE137F82A59653C]")
        .parent()
        .data("publicids");
    var certificateId = $("label[for=142B5E3478094A99B1BB65C1AECA3D62]")
        .parent()
        .data("publicids");
    $("body").on("click", "#sertifikaIndir", function() {
        if (
            calibratedTechnicianId === "" ||
            theScopeResponsibleId === "" ||
            headOfCalibrationId === ""
        ) {
            $("#sertifikaModalUyari").remove();
            window.setModal.Create({
                id: "sertifikaModalUyari",
                html: {
                    header: "Uyarı",
                    body: '<div class="row">' +
                        "<p>Lütfen E-imza Kişilerini Doldurunuz.</p>" +
                        "</div>",
                    footer: '<a class="btn btn-sm btn-danger pull-right" data-dismiss="modal">Kapat</a>',
                },
            });
            $("#sertifikaModalUyari").modal("toggle");
        } else if (certificateId != "") {
            $("#sertifikaModalUyari").remove();
            window.setModal.Create({
                id: "sertifikaModalUyari",
                html: {
                    header: "Uyarı",
                    body: '<div class="row">' +
                        "<p>Sertifika zaten oluşturulmuş . Tekrar oluşturmak istiyor musunuz ?</p>" +
                        "</div>" +
                        '<div class="text-center d-block"><td id="pageCountTd"><label class="text-center" style="width:100%;border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;">Sayfa Sayısı </label> <br><input id="pageCount" type="number" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;text-align:center;"></td></div>',
                    footer: '<button id="btnTekrarSertifikaIndir" class="btn btn-success btn-sm" >Evet</button><a class="btn btn-sm btn-danger pull-right" data-dismiss="modal">Hayır</a>',
                },
            });
            $("#sertifikaModalUyari").modal("toggle");
        } else {
            $("#sertifikaModalUyari").remove();
            window.setModal.Create({
                id: "sertifikaModalUyari",
                html: {
                    header: "Sertifika İndir",
                    body: '<div class="text-center d-block"><div id="pageCountTd"><label class="text-center" style="width:100%;border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;">Sayfa Sayısı </label><br><input id="pageCount" type="number" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;text-align:center;"></div></div>' +
                        '<div id="txt" style="margin:0 0 5px; width: 100%;display:none">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>',
                    footer: '<button id="btnCertificateDownload" class="btn btn-success btn-sm" >İndir</button> <button type="button" id="btnKapatx" class="btn btn-sm btn-default" data-dismiss="modal" >Kapat</button>',
                },
            });
            $("#sertifikaModalUyari").modal("toggle");
        }
    });
    $("body").on("click", "#btnTekrarSertifikaIndir", function() {
        var pageCount = $('#pageCount').val();
        if (pageCount > 0) {
            $("#sertifikaModalUyari")
                .find(".modal-body")
                .html(
                    '<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>'
                );
            validatePageCountForDownload(pageCount);
        } else {
            notify("warning", "Lütfen sayfa sayısını giriniz !");
        }
    });
    $("body").on("click", "#btnCertificateDownload", function() {
        var pageCount = $('#pageCount').val();
        if (pageCount > 0) {
            $('#pageCountTd').hide();
            $('#txt').show();
            validatePageCountForDownload(pageCount);
        } else {
            notify("warning", "Lütfen sayfa sayısını giriniz !");
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

    function validatePageCountForDownload(pageCount) {
        if (pageCount > 0) {

            var localUrl = String.format(
                "http://localhost:65474/api/data/CertificateTemplateWithDevExpress?recordId={0}&dokuman={1}&pageCount={2}",
                $("#RecordPublicId").val(),
                "ThyWord.docx",
                pageCount
            );
            var url = String.format(
                "https://thywebapi.setcrm.com/api/data/CertificateTemplateWithDevExpress?recordId={0}&dokuman={1}&pageCount={2}",
                $("#RecordPublicId").val(),
                "ThyWord.docx",
                pageCount
            );
            var realUrl = String.format(
                "https://kalibrasyonwebapi.thyteknik.com/api/data/CertificateTemplateWithDevExpress?recordId={0}&dokuman={1}&pageCount={2}",
                $("#RecordPublicId").val(),
                "ThyWord.docx",
                pageCount
            );
            $.get(realUrl, function(r) {
                //window.location = "http://localhost:65474/api/data/getFile?fileName=" + r;
                //   window.location = "https://thywebapi.setcrm.com/api/data/getFile?fileName=" + r;
                window.location =
                    "https://kalibrasyonwebapi.thyteknik.com/api/data/getFile?fileName=" +
                    r;
                $("#sertifikaModalUyari").modal("toggle");
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            });

        } else {
            notify("warning", "Lütfen sayfa sayısını giriniz !");
        }
    }
});