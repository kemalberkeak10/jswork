$(function() {
    $(".well .pull-right:eq(0)").prepend(
        '<a id="sertifikaBilgileriniGetir" class="btn btn-sm btn-primary"  style="margin-right:10px;" >Sertifika Bilgilerini Getir</a>'
    );
    var calibrationNo = $("label[for=11898EA4FA584B4B8B3149D5C5ECD1EE]").parent().data("value");
    var recordId = $("#RecordPublicId").val();
    var orderNumber = $("label[for=0A4421AEB7E247B7A2DD841ACDD63F0B]")
        .parent()
        .data("value");
    $("body").on("click", "#sertifikaBilgileriniGetir", function() {
        $("#uyariModal").remove();
        window.setModal.Create({
            id: "uyariModal",
            html: {
                header: "İşlem Bilgisi",
                body: '<div id="txt" style="margin:0 0 5px; width: 100%;"></div>' +
                    'İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif">',
                footer: '<button type="button"  class="btn btn-sm btn-default" data-dismiss="modal" >Kapat</button>',
            },
        });
        $("#modalIhtiyac")
            .find(".modal-body #step1")
            .append('<div id="message-block" style="margin-top:10px;"></div>');
        $("#uyariModal").modal("toggle");
        var localUrl = String.format(
            "http://localhost:65474/api/data/TransferOrderSertificateInfoWithoutTO?recordId={0}&pn={1}&sn={2}",
            $("#RecordPublicId").val(),
            orderNumber,
            calibrationNo
        );
        var url = String.format(
            "https://kalibrasyonwebapi.thyteknik.com/api/data/TransferOrderSertificateInfoWithoutTO?recordId={0}&pn={1}&sn={2}",
            $("#RecordPublicId").val(),
            orderNumber,
            calibrationNo
        );
        $.get(url, function(r) {
            if (r.Status) {
                notify(
                    "success",
                    "İşlem başarıyla tamamlandı. Sayfa yenileniyor lütfen bekleyiniz ..."
                );
                window.location.reload();
                $("#uyariModal").modal("toggle");
            } else {
                $("#uyariModal")
                    .find(".modal-body")
                    .html('<div id="txt" style="margin:0 0 5px; width: 100%;"></div>');
                setUtil.alert({
                    container: "#uyariModal .modal-body #txt",
                    message: "Sertifika bilgileri getirilirken bir hata oluştu!",
                    alertClass: "alert-danger",
                    autoClose: false,
                });
            }
        });
    });
});

function notify(type, message) {
    $.notify({
        icon: type === "success" ? "fas fa-check-double" : "fas fa-times-circle",
        message: message,
    }, {
        z_index: "9999999",
        type: type,
        placement: {
            from: "top",
            align: "right",
        },
        offset: 50,
        animate: {
            enter: "animated flipInY",
            exit: "animated flipOutX",
        },
    });
}