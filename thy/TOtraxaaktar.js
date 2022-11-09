$(function() {
    if ($('label[for=0E0BAAE467E44BADA6515B03AACE24E3]').parent().data('publicids') != "395487E2C90D4B9DAB348F498555FE18") {
        $('.well .pull-right:eq(0)').prepend('<a id="btnCalibrasyonToinfo" class="btn btn-sm btn-success"  style="margin-right:10px;" title=""><span>Trax\'a Aktar</a>');
    }
    $('body').on('click', '#btnCalibrasyonToinfo', function() {
        $('#modalCalibrasyonX').remove();
        window.setModal.Create({
            id: 'modalCalibrasyonX',
            html: {
                header: 'Uyarı',
                body: ' <label style="color:red;font-size:15px;">Transfer Order Trax\'a Aktarılsın mı ?</label>',
                footer: '<button id="btnEvetCalibrasyon"  class="btn btn-success btn-sm btnXC">Evet</button>' + '<button id="btnKaynakClose" data-dismiss="modal" class="btn btn-success btn-sm">Hayır</button>'
            }
        });
        $('#modalCalibrasyonX').modal('toggle');
        $('body').on('click', '#btnEvetCalibrasyon', function() {
            $('#modalCalibrasyonX .modal-footer').hide();
            var localUrl = String.format('http://localhost:65474/api/data/CalibrationToCreateTest?recordId={0}', $('#RecordPublicId').val()),
                realUrl = String.format('https://thywebapi.setcrm.com/api/data/CalibrationToCreateTest?recordId={0}', $('#RecordPublicId').val());
            $('#modalCalibrasyonX .modal-body').html('');
            $('#modalCalibrasyonX .modal-body').html('İşleminiz yapılıyor, lütfen bekleyiniz.. <br/> <img src="/Public/img/loading_bar.gif">');
            $.get(localUrl, function(r) {
                if (r.Status) {
                    window.location.reload();
                } else {
                    $('#modalCalibrasyonX .modal-body').html(r.Message);
                    $('#modalCalibrasyonX .modal-body').append(String.format('<a href="https://proje.setcrm.com/set/transfer-order/detail/EB78DB65A05847B2A2D5E340EF9DFC4F" target="_blank" class="btn btn-primary btn-sm"><i class="fas fa-external-link-alt"></i> Görüntüleme</a>', r.Message));
                }
            });
        });
    });
});