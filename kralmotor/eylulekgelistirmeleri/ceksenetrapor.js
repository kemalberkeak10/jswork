$(function() {
    var cariKod = $('label[for=5FC1C22310924945B865217AB3EAFC00]').parent().data('value');
    if (!String.isNullOrWhiteSpace(cariKod)) {
        $('.well .pull-right:eq(0)').prepend('<a id="btnCekSenetRapor" class="btn btn-sm btn-success"  style="margin-right:10px;" title=""><span> Müşteri Çek Senet Raporu</a>');
    }
    $('body').on('click', '#btnCekSenetRapor', function() {
        var localUrl = String.format("http://localhost:54779/api/logo/GetCekSenetRapor?carikod={0}", cariKod),
            realUrl = String.format("https://krallogowebapi.setcrm.com/api/logo/GetCekSenetRapor?carikod={0}", cariKod);
        $('#modalLoading').remove();
        window.setModal.Create({
            id: 'modalLoading',
            html: {
                header: '<i class="fa fa-share-square"></i> Müşteri Çek Senet Raporu',
                body: '<div id="cekSenetRaporMsg"></div><div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>',
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
            } else {
                $('#modalLoading').find('#txt').hide();
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