$(function() {
    if ($('#ViewFilterPublicId').val() === "574A986BBA8645FC9A04999232F65283") {

        $('.well .pull-right:eq(0)').prepend('<a id="btnCalibrasyonToinfoRes" class="btn btn-sm btn-warning"  style="margin-right:10px;" title=""><span>Traxdan Uygulamaya Aktar</a>');

        $('body').on('click', '#btnCalibrasyonToinfoRes', function() {
            $('#modalCalibrasyonXX').remove();
            window.setModal.Create({
                id: 'modalCalibrasyonXX',
                html: {
                    header: 'Trax OrderNo Giriniz',
                    body: '<input type="text" class="form-control" placeholder="Trax Order Number" id="traxNoRes" name="traxNoRes">',
                    footer: '<button id="btnEvetCalibrasyonRes"  class="btn btn-success btn-sm">Ara</button>' + '<button id="btnKaynakClose" data-dismiss="modal" class="btn btn-success btn-sm">Kapat</button>'
                }
            });
            $('#modalCalibrasyonXX').modal('toggle');
            $('body').on('click', '#btnEvetCalibrasyonRes', function() {

                if ($('#traxNoRes').val() === "") {
                    alert("Lütfen Order Numarasını Giriniz.");
                } else {
                    var localUrl = String.format('http://localhost:65474/api/data/CalibrationToReceivingInfo?orderNo={0}', $('#traxNoRes').val()),
                        realUrl = String.format('https://thywebapi.setcrm.com/api/data/CalibrationToReceivingInfo?orderNo={0}', $('#traxNoRes').val());
                    $('#modalCalibrasyonXX .modal-body').html('');
                    $('#modalCalibrasyonXX .modal-body').html('İşleminiz yapılıyor, lütfen bekleyiniz.. <br/> <img src="/Public/img/loading_bar.gif">');
                    $.get(realUrl, function(r) {
                        if (r.Status) {
                            window.location.reload();
                        } else {
                            $('#modalCalibrasyonXX .modal-body').html(r.Message);
                        }
                    });
                }
            });
        });
    }
});