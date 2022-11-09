$(function() {
    var calibrationDueDate = $('label[for=10B77C83A12E4D8C82DC8BDDB1806A54]').parent().data();
    var dateOfCalibration = $('label[for=4B953A07DF7548E49D8F216950073BDC]').parent().data();
    if (!String.isNullOrWhiteSpace(calibrationDueDate) && !String.isNullOrWhiteSpace(dateOfCalibration)) {
        $('.well:first .pull-right').prepend('<a id="btnEtiketOlustur" class="btn btn-warning btn-sm" style="margin-right: 5px;"> Etiket Oluştur</a>');
    }
    $('body').on('click', '#btnEtiketOlustur', function() {
        $('#modalEtiketOlustur').remove();
        window.setModal.Create({
            id: 'modalEtiketOlustur',
            html: {
                header: 'Etiket Oluştur',
                body: '<div id="msg" style="margin:0px auto; width: 100%;font-size:15px;"></div>' +
                    '<div id="txt" style="margin:0 auto;width: 100%;color:black">İşleminiz yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>' +
                    '<div id="printerSelect"></div>' +
                    '<div id ="etiketDiv" class="d-flex aligns-items-center justify-content-center">' +
                    '<div><a id="standart24" class = "btn btn-md btn-primary etiket-download" style = "margin-right:10px;" > Standart_24X24 </a></div > ' +
                    '<div><a id="standart16"  class = "btn btn-md btn-success etiket-download" style = "margin-right:10px;" > Standart_16X16 </a></div > ' +
                    '<div><a id="limcal24" class = "btn btn-md btn-danger etiket-download" style = "margin-right:10px;" > Limcal_24X24 </a></div > ' +
                    '<div><a id="limcal16" class = "btn btn-md btn-info etiket-download" style = "margin-right:10px;" > Limcal_16X16 </a></div > ' +
                    '</div>',
                footer: '<button  type="button" class="btn btn-sm btn-default" data-dismiss="modal" onclick="window.location.reload()">Kapat</button>'
            },
        });
        $('#modalEtiketOlustur .modal-dialog').css('width', '35%');
        $('#txt').hide();
        $('#modalEtiketOlustur').modal('toggle');
        var printerData = [{
                id: "Printer_1",
                text: "Printer 1",
            },
            {
                id: "Printer_2",
                text: "Printer 2",
            },
            {
                id: "Printer_3",
                text: "Printer 3",
            },
            {
                id: "Printer_4",
                text: "Printer 4",
            },
            {
                id: "Printer_5",
                text: "Printer 5",
            }, {
                id: "Printer_6",
                text: "Printer 6",
            }
        ]
        prepareSelect2WithData('#printerSelect', printerData, false);
    });
    $('body').on('click', '.etiket-download', function() {
        $('#txt').show();
        $('#etiketDiv').hide();
        $(".etiket-download").prop("disabled", true);
        var etiketButtonId = $(this).prop("id");
        var recordId = $('#RecordPublicId').val();
        if (etiketButtonId.contains('standart')) {
            var etiket = 'standart';
        } else if (etiketButtonId.contains('limcal')) {
            var etiket = 'limcal';
        }

        var localUrl = String.format('http://localhost:65474/api/data/EtiketOlusturPrinter?recordId={0}&etiket={1}&etiketButtonId={2}&printer={3}', recordId, etiket, etiketButtonId, printerVal);
        realUrl = String.format('https://thywebapi.setcrm.com/api/data/EtiketOlusturPrinter?recordId={0}&etiket={1}&etiketButtonId={2}&printer={3}', recordId, etiket, etiketButtonId, printerVal);
        $.get(realUrl, function(r) {
            if (r.Status) {
                $('#txt').hide();
                notify("success", "Etiket oluşturuldu.Sayfa yenileniyor lütfen bekleyiniz ...");
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                $('#txt').hide();
                setUtil.alert({
                    container: '#modalEtiketOlustur .modal-body #msg',
                    message: r.Message,
                    alertClass: 'alert-danger',
                    autoClose: false
                });
            }
        });
    });

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