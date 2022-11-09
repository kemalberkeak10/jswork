$(function() {
    var eskiKayitlar = $("label[for=44BF4D0C76544AAA9CF439D56598B611]").parent().data("value");
    if (!String.isNullOrWhiteSpace(eskiKayitlar)) {
        $('.pull-right').prepend('<a id="btnMukerrerKayitKontrol" class="btn btn-sm btn-primary"  style="margin-right:10px;" >Mükerrer Kayıt Görüntüle</a>');
    }
    $('body').on('click', '#btnMukerrerKayitKontrol', function() {
        $('#modelEskiKayit').remove();
        window.setModal.Create({
            id: 'modelEskiKayit',
            html: {
                header: 'Mükerrer Kayıt Görüntüleme',
                body: '',
                footer: '<button type="button" class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>',
            }
        });
        $('#modelEskiKayit').modal('toggle');
        $('#modelEskiKayit .modal-body').append(String.format('<a href="https://sdm.setcrm.com/set/musteri/detail/{0}" target="_blank" class="btn btn-primary btn-sm"><i class="fas fa-external-link-alt"></i> Görüntüleme</a>', eskiKayitlar));
    });
});

$(function() {

    var eskiKayitlar = $("label[for=44BF4D0C76544AAA9CF439D56598B611]").parent().data("value");
    if (!String.isNullOrWhiteSpace(eskiKayitlar)) {
        var eskiKayitlarList = eskiKayitlar.split(' ');
        $.each(eskiKayitlarList, function(i, v) {
            if (i == eskiKayitlarList.length - 1) {

            } else {
                $('.pull-right').prepend('<a href="https://sdm.setcrm.com/set/musteri/detail/' + v + '" target="_blank" class="btn btn-primary btn-sm"><i class="fas fa-external-link-alt"></i> Mükerrer Kayıt Görüntüle</a>');
            }

        })
    }
});