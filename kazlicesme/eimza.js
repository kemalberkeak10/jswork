$(function() {
    $('.btn-br-actions[data-publicid=93F471AAED774943992A0CCD00DB020D]').hide();
    $('.btn-br-actions[data-publicid=93F471AAED774943992A0CCD00DB020D]').closest('td').prepend('<a id="btnEimza" class="btn btn-sm btn-success"  style="margin-right:10px;" >E-imza Gönder</a>');

    $('body').on('click', '#btnEimza', function() {
        $('#modelEimza').remove();
        window.setModal.Create({
            id: 'modelEimza',
            html: {
                header: 'E-imza Gönder',
                body: '<div id="txt" style="margin:0 0 5px; width: 100%;"></div>' +
                    '<div id="msg" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>',
            }
        });
        $('#modelEimza').modal('toggle');
        var data = {
            recordId: $('#RecordPublicId').val(),
            pageLayoutId: $('#LayoutPublicId').val()
        }
        var localUrl = String.format('http://localhost:44358/api/data/EimzaGonder');
        var realUrl = String.format('https://kazlicesmewebapi.setcrm.com/api/data/EimzaGonder');
        $.get(realUrl, data, function(r) {
            if (r.Status) {
                $('#msg').hide();
                setUtil.alert({
                    container: '#modelEimza .modal-body #txt',
                    message: "İşleminiz başarılı .Sayfa yenileniyor lütfen bekleyiniz.",
                    alertClass: 'alert-danger',
                    autoClose: false
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                $('#msg').hide();
                setUtil.alert({
                    container: '#modelEimza .modal-body #txt',
                    message: "Islem başarısız! Sayfa yenileniyor lütfen bekleyiniz.",
                    alertClass: 'alert-danger',
                    autoClose: false
                });
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        });

    });




});