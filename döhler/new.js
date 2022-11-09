$(function() {
    $('.well .pull-right:eq(0)').prepend('<a id="btnPoVerisi" class="btn btn-sm btn-success " >PO Verisi Getir</a>');
    $('body').on('click', '#btnPoVerisi', function() {
        var url = 'https://mayawebapi.denizbank.com/api/data/PoKayit?recordId=' + $('#RecordPublicId').val();
        // var url3 = '//dbankblinkent.setcrm.com/api/data/PoKayitTEstProje?recordId=' + $('#RecordPublicId').val();
        // var url2 = 'http://localhost:29914/api/data/PoKayitTEstProje?recordId=' + $('#RecordPublicId').val();
        window.setModal.Create({
            id: 'modalBilgi',
            html: {
                header: ' ',
                body: '<div id="msg" style="margin:0 0 5px; width: 100%;;">Isleminiz Yapiliyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>',
                footer: '<button class="btn btn-sm btn-default" style="display:none;" id="btnKapatP" >Kapat</button>'
            }
        });
        $('#modalBilgi').modal('toggle');
        $.get(url, function(result) {
            $('#btnKapatP').show();
            if (result.Status == true) {
                $('#modalBilgi #msg').html(result.Message);
            } else {
                $('#modalBilgi #msg').html('Isleminiz Yapilirken Hata Olustu : ' + result.Message);
            }
        });
        $('body').on('click', '#btnKapatP', function() {
            window.location.reload(true);
        });
    })
});