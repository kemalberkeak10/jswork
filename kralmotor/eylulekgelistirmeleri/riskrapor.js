$(function() {
    $('.well .pull-right:eq(0)').prepend('<a id="btnSipariseDonustur" class="btn btn-sm btn-success"  style="margin-right:10px;" title=""><span> Siparişe Dönüştür</a>');
    $('body').on('click', '#btnSipariseDonustur', function() {
        var localUrl = String.format("http://localhost:54779/api/logo/SipariseDonustur?servisIslemiId={0}", $('#RecordPublicId').val()),
            realUrl = String.format("https://krallogowebapi.setcrm.com/api/logo/SipariseDonustur?servisIslemiId={0}", $('#RecordPublicId').val());
        $('#modalLoading').remove();
        window.setModal.Create({
            id: 'modalLoading',
            html: {
                header: '<i class="fa fa-share-square"></i> Siparişe Dönüştür',
                body: '<div id="sipariseDonusturMsg"></div><div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>',
                footer: '<button data-dismiss="modal" class="btn btn-default btn-sm">Kapat</button>'
            },
            settings: {
                widthClass: 'modal-md'
            }
        });
        $('#modalLoading').modal("toggle");
        $.get(localUrl, "", function(r) {
            if (r.Status) {
                $('#modalLoading').find('#txt').hide();
                notify('success', 'İşleminiz başarıyla tamamlandı. ');
                $('#modalLoading .modal-body').append(String.format('<a href="https://maya.setcrm.com/set/teklif/detail/{0}" target="_blank" class="btn btn-primary btn-sm"><i class="fas fa-external-link-alt"></i> Görüntüleme</a>', r.TeklifRecordId));
            } else {
                $('#modalLoading').find('#txt').hide();
                $('#modalLoading .modal-body #sipariseDonusturMsg').html(r.Message);
            }
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
});