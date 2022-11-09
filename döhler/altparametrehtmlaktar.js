$(function() {

    var $relation = $(String.format('div[data-id={0}]', '2BFD6F812B624D2FB9F0031511C3807D'));
    $relation.find('.btn-alttest-parametre-html-aktar').remove();

    if (window.activeLanguage == "en") {
        $relation.prepend('<div><button type="button" class="btn btn-warning btn-sm pull-right btn-alttest-parametre-html-aktar" style="margin-right:5px;margin-top:2px;"><i class="fas fa-table"></i> Export HTML</button></div>');
    } else {
        $relation.prepend('<div><button type="button" class="btn btn-warning btn-sm pull-right btn-alttest-parametre-html-aktar" style="margin-right:5px;margin-top:2px;"><i class="fas fa-table"></i> Html Aktar</button></div>');
    }



    $('body').on('click',
        '.btn-alttest-parametre-html-aktar',
        function() {

            $('#modalAltTestParametreHtmlAktar').remove();
            window.setModal.Create({
                id: 'modalAltTestParametreHtmlAktar',
                html: {
                    header: 'Html Aktar',
                    body: '<div id="msg"></div>' +
                        '<div id="loading" style="margin:0 0 5px; width: 100%;">İşleminiz yapılıyor, lütfen bekleyiniz...<br> <img src="/Public/img/loading_bar.gif"></div>',
                    footer: '<button type="button" class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>',
                }
            });
            $('#modalAltTestParametreHtmlAktar').modal("toggle");
            var url = "https://dohlerwebapi.setcrm.com/api/data/AltParametreHtmlAktar";
            var local = "http://localhost:55073/api/data/AltParametreHtmlAktar";
            $.get(local, {
                analizTanimiId: $('#RecordPublicId').val()
            }, function(r) {
                $('#modalAltTestParametreHtmlAktar').find('#loading').hide();
                if (r.Status) {
                    setUtil.alert({
                        container: '#modalAltTestParametreHtmlAktar .modal-body #msg',
                        message: "İşlem başarılı, sayfa yenileniyor...",
                        alertClass: 'alert-success',
                        autoClose: false
                    });
                    setTimeout(function() {
                        window.location.reload();
                    }, 1000);
                } else {
                    setUtil.alert({
                        container: '#modalAltTestParametreHtmlAktar .modal-body #msg',
                        message: r.Message,
                        alertClass: 'alert-danger',
                        autoClose: false
                    });
                }
            });
        });
});