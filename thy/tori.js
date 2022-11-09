$(function() {
    if (!String.isNullOrWhiteSpace($('label[for=67C6359CEAC649AC900400E99226AA27]').parent().data('publicids'))) {
        var entegrasyonStatu = $('label[for=67C6359CEAC649AC900400E99226AA27]').parent().data('publicids');
        if (entegrasyonStatu == "6D96708470B548348D766366904B9870") {
            $('.well .pull-right:eq(0)').prepend('<a id="btnCalibrasyonToReceiving" class="btn btn-sm btn-info"  style="margin-right:10px;" title=""><span>Trax R\I control</a>');
        }
    }
    $('body').on('click', '#btnCalibrasyonToriInfo', function() {
        $('#modalCalibrasyonXTori').remove();
        window.setModal.Create({
            id: 'modalCalibrasyonXTori',
            html: {
                header: 'Trax OrderNo Giriniz',
                body: 'İşleminiz yapılıyor, lütfen bekleyiniz.. <br/> <img src="/Public/img/loading_bar.gif',
                footer: '<button id="btnKaynakClose" data-dismiss="modal" class="btn btn-success btn-sm">Kapat</button>'
            }
        });
        $('#modalCalibrasyonXTori').modal('toggle');
        // $('body').on('click', '#btnEvetCalibrasyon', function () {
        var localUrl = String.format('http://localhost:65474/api/data/CalibrationToTori?recordId={0}', $('#RecordPublicId').val()),
            realUrl = String.format('https://thywebapi.setcrm.com/api/data/CalibrationToTori?recordId={0}', $('#RecordPublicId').val());
        $('#modalCalibrasyonXTori .modal-body').html('');
        $('#modalCalibrasyonXTori .modal-body').html('İşleminiz yapılıyor, lütfen bekleyiniz.. <br/> <img src="/Public/img/loading_bar.gif">');
        $.get(realUrl, function(r) {
            if (r.Status) {
                window.location.reload();
            } else {
                $('#modalCalibrasyonXTori .modal-body').html(r.Message);
            }
        });
        // });
    });
});