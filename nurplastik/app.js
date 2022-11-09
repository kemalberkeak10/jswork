$(function() {
    $('.well .pull-right:eq(0)').prepend("<a id='btnIsEmri' class='btn btn-sm btn-info pull-left'  style='margin-right:10px;'>İş Emri Tamamlandı</a>");

    $('body').on('click', '#btnIsEmri', function() {
        $('#modalChangeStatus').remove();
        window.setModal.Create({
            id: 'modalChangeStatus',
            html: {
                header: 'Change Status',
                body: '<div id="msg" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>',
                footer: '<button class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>',
            }
        });
        $('#modalChangeStatus').modal('toggle');
        var data = {
            RecordId: $('#RecordPublicId').val(),
            SiparisRecordId: $('label[for=B59293F804074B40AC8D137B3E9B7971]').closest('div').data('publicids'),

        }
        var url = 'https://meyicki.setcrm.com/api/data/SatisOnayGuncelle';
        var url2 = 'http://localhost:50058/api/data/SatisOnayGuncelle';
        $.post(url2, data, function(r) {
            if (r.Status) {
                setUtil.alert({
                    container: '#modalSablon .modal-body #msg',
                    message: "işleminiz başarıyla tamamlandı",
                    alertClass: 'alert-success',
                    autoClose: false
                });
            } else {
                setUtil.alert({
                    container: '#modalSablon .modal-body #msg',
                    message: r.Message,
                    alertClass: 'alert-danger',
                    autoClose: false
                });
            }
        });
    });

});