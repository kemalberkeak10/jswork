$(function() {
    if (!String.isNullOrWhiteSpace($('label[for=67C6359CEAC649AC900400E99226AA27]').parent().data('publicids'))) {
        var entegrasyonStatu = $('label[for=67C6359CEAC649AC900400E99226AA27]').parent().data('publicids');
        if (entegrasyonStatu == "467476F71CB8442AA92F6F81D0F28B1D") {
            $('.well .pull-right:eq(0)').prepend('<a id="btnCalibrasyonToReceiving" class="btn btn-sm btn-info"  style="margin-right:10px;" title=""><span>Trax Üzerinen Receiving Control</a>');
        }
    }
    $('body').on('click', '#btnCalibrasyonToReceiving', function() {
        $('#modalCalibrasyonToReceiving').remove();
        window.setModal.Create({
            id: 'modalCalibrasyonToReceiving',
            html: {
                header: 'Trax ToReceiving',
                body: 'İşleminiz yapılıyor, lütfen bekleyiniz.. <br/> <img src="/Public/img/loading_bar.gif',
                footer: '<button id="btnToReceingClose" data-dismiss="modal" class="btn btn-success btn-sm">Kapat</button>'
            }
        });
        $('#modalCalibrasyonToReceiving').modal('toggle');
        var localUrl = String.format('http://localhost:65474/api/data/CalibrationToReceiving?recordId={0}', $('#RecordPublicId').val()),
            realUrl = String.format('https://thywebapi.setcrm.com/api/data/CalibrationToReceiving?recordId={0}', $('#RecordPublicId').val());
        $('#modalCalibrasyonToReceiving .modal-body').html('');
        $('#modalCalibrasyonToReceiving .modal-body').html('İşleminiz yapılıyor, lütfen bekleyiniz.. <br/> <img src="/Public/img/loading_bar.gif">');
        $.get(realUrl, function(r) {
            if (r.Status) {
                window.location.reload();
            } else {
                $('#modalCalibrasyonToReceiving .modal-body').html(r.Message);
            }
        });
    });
});