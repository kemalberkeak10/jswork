$(function() {

    $("body").on("click",
        "#btnWoStatuUpdate",
        function() {
            var woRecordId = $('#9AC1207C317244D2BBB69F198821D7CC').val();
            $("#woStatusUpdateModal").remove();
            window.setModal.Create({
                id: "woStatusUpdateModal",
                html: {
                    header: "Dış İstayona Aktar",
                    body: '<div id="msg" style="margin:0 23px 5px; width: 80%;font-size:15px;"></div>' +
                        '<div id="txt" style="margin:0 auto;width: 100%;color:black"> Dış İstasyona aktarılıyor , lütfen bekleyiniz...<br/> <img src="/Public/img/loading_bar.gif"></div>',
                    footer: '<button class="btn btn-danger btn-sm" data-dismiss="modal">Kapat</button>',
                },
                settings: {
                    widthClass: "modal-md",
                },
            });
            $("#woStatusUpdateModal").modal({
                backdrop: "static",
                keyboard: false,
            });

            var localUrl = "http://localhost:65474/api/data/WoDisFirmaStatuUpdate?recordId=" + woRecordId;
            var projeUrl = "https://thywebapi.setcrm.com/api/data/WoDisFirmaStatuUpdate?recordId=" + woRecordId;
            var realUrl = "https://kalibrasyonwebapi.thyteknik.com/api/data/WoDisFirmaStatuUpdate?recordId=" + woRecordId;
            $.get(projeUrl, {},
                function(r) {
                    if (r.Status) {
                        $('#btn_save').click();
                    } else {
                        $("#txt").hide();
                        setUtil.alert({
                            container: '#modalDisIstasyon .modal-body #msg',
                            message: r.Message,
                            alertClass: 'alert-danger',
                            autoClose: false
                        });
                    }
                }
            );
        });
});


$(function() {
    $("body").on("click",
        "#btnWoStatuUpdate",
        function() {
            var woRecordId = $('#DCD5A4EC3877479FA4960219C0AA2927').val();
            $("#woStatusUpdateModal").remove();
            window.setModal.Create({
                id: "woStatusUpdateModal",
                html: {
                    header: "Kod Atama",
                    body: '<div id="msg" style="margin:0 23px 5px; width: 80%;font-size:15px;"></div>' +
                        '<div id="txt" style="margin:0 auto;width: 100%;color:black"> Dış İstasyona aktarılıyor , lütfen bekleyiniz...<br/> <img src="/Public/img/loading_bar.gif"></div>',
                    footer: '<button class="btn btn-danger btn-sm" data-dismiss="modal">Kapat</button>',
                },
                settings: {
                    widthClass: "modal-md",
                },
            });
            $("#woStatusUpdateModal").modal({
                backdrop: "static",
                keyboard: false,
            });

            var localUrl = "http://localhost:65474/api/data/WoDisFirmaStatuUpdate?recordId=" + woRecordId;
            var projeUrl = "https://thywebapi.setcrm.com/api/data/WoDisFirmaStatuUpdate?recordId=" + woRecordId;
            var realUrl = "https://kalibrasyonwebapi.thyteknik.com/api/data/WoDisFirmaStatuUpdate?recordId=" + woRecordId;
            $.get(realUrl, {},
                function(r) {
                    if (r.Status) {
                        $('#btn_save').click();
                    } else {
                        $("#txt").hide();
                        setUtil.alert({
                            container: '#modalDisIstasyon .modal-body #msg',
                            message: r.Message,
                            alertClass: 'alert-danger',
                            autoClose: false
                        });
                    }
                }
            );
        });
});