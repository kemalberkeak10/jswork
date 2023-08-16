$(function() {
    $(".pull-right").prepend(
        '<a id="btnResetSignProcess" class="btn btn-sm btn-primary"  style="margin-right:10px;" >E-imza sürecini baştan başlat</a>'
    );
    $("body").on("click", "#btnResetSignProcess", function() {
        var recordId = $("#RecordPublicId").val();
        $("#esignResetModal").remove();
        window.setModal.Create({
            id: "esignResetModal",
            html: {
                header: "E-imza sürecini baştan başlat",
                body: '<div id="msg" style="margin:0 23px 5px; width: 80%;font-size:15px;"></div>' +
                    '<div id="txt" style="margin:0 auto;width: 100%;color:black"> E-imza süreci baştan başlatılıyor lütfen bekleyiniz...<br/> <img src="/Public/img/loading_bar.gif"></div>',
                footer: '<button class="btn btn-danger btn-sm" data-dismiss="modal">Kapat</button>',
            },
            settings: {
                widthClass: "modal-md",
            },
        });
        $("#esignResetModal").modal({
            backdrop: "static",
            keyboard: false,
        });

        var localUrl =
            "http://localhost:65474/api/data/ResetSignProcess?recordId=" + recordId;
        var projeUrl =
            "https://thywebapi.setcrm.com/api/data/ResetSignProcess?recordId=" +
            recordId;
        var realUrl =
            "https://kalibrasyonwebapi.thyteknik.com/api/data/ResetSignProcess?recordId=" +
            recordId;
        $.get(localUrl, {}, function(r) {
            if (r.Status) {
                window.location.reload();
            } else {
                $("#txt").hide();
                setUtil.alert({
                    container: "#esignResetModal .modal-body #msg",
                    message: r.Message,
                    alertClass: "alert-danger",
                    autoClose: false,
                });
            }
        });
    });
});