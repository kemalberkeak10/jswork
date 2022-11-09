$(function() {
    if (($('label[for=C4C047E9EA0A4BA1AB8549A916070A36]').parent().data('publicids') === userData.id && $('label[for=7E15D927BF6C45ED92911772D4D97748]').parent().data('value').toLowerCase() === "false") || ($('label[for=A128BD2689704B50BB3DC26E14B63D02]').parent().data('publicids') === userData.id && $('label[for=40464FFA0B3945C6A180A8746CDD742B]').parent().data('publicids') !== "" &&
            $('label[for=855E49A22AC34D8192CD36BEA4B0E44B]').parent().data('value').toLowerCase() === "false") || userData.id === "6C39A6B78A2E46968AEE0ECA35576FF6") {
        $('.well .pull-right:eq(0)').prepend('<a id="btnEimzaTest" class="btn btn-sm btn-info"  style="margin-right:10px;" >E-imzaya Gönder Test</a>');
    }
    $('body').on('click', '#btnEimzaTest', function() {
        var imzalar = [];
        $('#modalEimzaTest').remove();
        window.setModal.Create({
            id: 'modalEimzaTest',
            html: {
                header: 'İşlem Bilgisi',
                body: 'İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif">',
                footer: ''
            }
        });
        $('#modalEimzaTest').modal('toggle');
        // imzalar.push($('#RecordPublicId').val());
        var recordId = $('#RecordPublicId').val();
        var userId = userData.id;
        var imzsertifika = $('label[for=40464FFA0B3945C6A180A8746CDD742B]').parent().data('publicids');
        var url = 'https://neteswebapilocal.setcrm.com/api/data/TopluSertifikaImzala1YeniEtugra?imzalar=' + recordId + '&userId=' + userId;
        var testurl = 'http://localhost:58305/api/data/TopluSertifikaImzala1YeniEtugra?imzalar=' + recordId + '&userId=' + userId;
        if (imzsertifika !== "") {
            url = 'https://neteswebapilocal.setcrm.com/api/data/TopluSertifikaImzala2YeniEtugra?imzalar=' + recordId + '&userId=' + userId;
            testurl = 'http://localhost:58305/api/data/TopluSertifikaImzala2YeniEtugra?imzalar=' + recordId + '&userId=' + userId;
        }
        $('#modalEimzaTest').modal('toggle');
        window.open(url);
    });
});