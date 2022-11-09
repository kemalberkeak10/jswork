$(function() {
    //var traxAktarildi = $('label[for=13AF0B9E7E56407DA58CB3656E8EC719]').parent().data('value');
    var traxGeldi = $('label[for=377B036520D0409A919F2D8CDAEBD46E]').parent().data('value');
    if (traxGeldi != 'True') {
        $('.well .pull-right:eq(0)').prepend('<a id="btnCalibrasyonTraxCreate" class="btn btn-sm btn-warning"  style="margin-right:10px;" title=""><span> Trax\'a Aktar</a>');
        $('body').on('click', '#btnCalibrasyonTraxCreate', function() {
            $('#modalCalibrasyonCreate').remove();
            window.setModal.Create({
                id: 'modalCalibrasyonCreate',
                html: {
                    header: 'Trax Calibrasyon No Create',
                    body: '<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>' +
                        '<div id="msg" style="margin:0 0 5px; width: 100%;"></div>',
                    footer: '<button id="btnToReceingClose" data-dismiss="modal" class="btn btn-success btn-sm">Kapat</button>'
                }
            });
            $('#txt').show();
            $('#modalCalibrasyonCreate').modal('toggle');
            var localUrl = String.format('http://localhost:65474/api/data/CreateCalibrasyonTraxBtn?recordId={0}', $('#RecordPublicId').val()),
                realUrl = String.format('https://thywebapi.setcrm.com/api/data/CreateCalibrasyonTraxBtn?recordId={0}', $('#RecordPublicId').val());
            $.post(realUrl, function(r) {
                if (r.Status) {
                    $('#txt').hide();
                    notify("success", "Calibration Tools başarıyla Traxa aktarıldı.");
                    window.location.reload();
                } else {
                    $('#txt').hide();
                    setUtil.alert({
                        container: '#modalCalibrasyonCreate .modal-body #msg',
                        message: r.Message,
                        alertClass: 'alert-danger',
                        autoClose: false
                    });
                }
            });
        });
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