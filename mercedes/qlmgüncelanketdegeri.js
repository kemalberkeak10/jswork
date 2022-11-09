$(function() {
    $('.pull-right').prepend('<a id="btnGuncelDegerGetir" class="btn btn-sm btn-primary"  style="margin-right:10px;" >Güncel Değerleri Getir</a>');
    $('body').on('click', '#btnGuncelDegerGetir', function() {
        var firmaRecordId = $('#3D480F4A0D314876BF6C2D7E41DF8652').val();
        $('#modalGuncelDeger').remove();
        window.setModal.Create({
            id: 'modalGuncelDeger',
            html: {
                header: 'Guncel Degerleri Getir',
                body: '<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>',
                footer: '<button id="btnKapat" type="button" class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>',
            }
        });
        //$('#modalGuncelDeger .modal-dialog').css('height', '50%');
        $('#modalGuncelDeger').modal('toggle');


        var url = 'https://webapi-inklab.tr152.corpintra.net/api/data/GuncelAnketDegerleriGetir?recordId=' + firmaRecordId;
        $.get(url, function(r) {
            var siraNo = 0;
            if (r.Status) {
                $.each(r.AnketListe, function(i, v) {
                    $('input[id=C519A78E710147B795D245E77ADD6737]').val(siraNo);
                    $('#F85893ABAD4F491C8D58ECEAF28B6B9A').select2('data', { id: v.SoruId, text: v.SoruText }).trigger('change');
                    $('input[id=956896F0AD6D4B1AA0D4E9D7208CF3F8]').val(v.Puan).trigger('change');
                    $('input[id=A4E2F01969EC4CF98FF2BEA7F2145353]').val(v.Aciklama);
                    siraNo = siraNo + 1;
                    $('.add-row').trigger('click');
                });
                $('input[id=C519A78E710147B795D245E77ADD6737]').val(siraNo);
                $('#modalGuncelDeger').modal('toggle');
            } else {
                $('#txt').hide();
                setUtil.alert({
                    container: '#modalGuncelDeger .modal-body #msg',
                    message: r.Message,
                    alertClass: 'alert-danger',
                    autoClose: false
                });
            }
        });
        $('body').on('click', 'btnKapat', function() {
            window.location.reload();
        })
    });
});