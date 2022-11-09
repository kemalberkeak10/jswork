$(function() {

    if ($('#FilterId').val() === '385021EDAB1F46EABF5E425F1CA56DD8' || $('#FilterId').val() === '72797139A36D4EA3A2B567585E03044E' || $('#FilterId').val() === '6D01D6E0D1824C8385C5CD63D8437F15' || $('#FilterId').val() === 'AE62ECB9F8AE46FFB4D01AF519F9014F' || $('#FilterId').val() === 'A3C8FF164CEC4062915419F471A1F18B' || $('#FilterId').val() === '4691028456554848B9D218E718941639' || $('#FilterId').val() === '64552BC5FCBF4B9C92C91D543D22C007' || $('#FilterId').val() === '96040F567E44486D901E7679CC4CC785' || $('#FilterId').val() === '99DB50D110E946CCBF59F78215129D04') {
        $('.well .pull-right:eq(0)').prepend('<a id="eimzaOlusturtest" class="btn btn-sm btn-info " >E-imza Programına Gönder</a>');

        $('.table-bordered').find('tbody tr').each(function(i, v) {
            $('<div class="custom-control custom-radio custom-control-inline">' +
                '<input id="chkTeklifAl" name="chk_' + i + '" value="2" type="checkbox" class="custom-control-input chk" /><label class="custom-control-label" style="margin-left:8px">E-İmzaya Gönder</label>' +
                '</div>').appendTo($(this).find('.text-center')).attr('data-publicId', $(this).data('id'));
        });

        $('body').on('click', '#eimzaOlusturtest', function() {
            var sayi = $('.table-bordered tbody tr').find('.text-center').find('div input:checked').length;
            if (sayi > 3) {
                alert("3 den fazla kayıt E imzaya gönderilemez. Seçim sayısı : " + sayi);
            } else if (sayi === 0) {
                alert("Lütfen En Az 1 Tane Kayıt Seçiniz.");
            } else {
                var imzalar = [];
                $('.table-bordered tbody tr').find('.text-center').find('div input:checked').each(function(i, v) {
                    imzalar.push($(v).closest('tr').data('id'));
                });

                var localKontrol = "http://localhost:11456/api/data/EGuvenImzaDenemed?imzalar=" + imzalar + "&id=" + userData.id;
                var realKontrol = "https://meyicki.setcrm.com/api/data/EGuvenImzaDenemed?imzalar=" + imzalar + "&id=" + userData.id;
                if ($('#FilterId').val() === '6D01D6E0D1824C8385C5CD63D8437F15' || $('#FilterId').val() === '4691028456554848B9D218E718941639' || $('#FilterId').val() === '99DB50D110E946CCBF59F78215129D04') {
                    localKontrol = "http://localhost:11456/api/data/EGuvenImzaDenemed?imzalar=" + imzalar + "&id=" + userData.id + "&en=1";
                    realKontrol = "https://meyicki.setcrm.com/api/data/EGuvenImzaDenemed?imzalar=" + imzalar + "&id=" + userData.id + "&en=1";
                }


                window.setModal.Create({
                    id: 'modalLoadingx',
                    html: {
                        header: ' ',
                        body: '<div id="txt" style="margin:0 0 5px; width: 100%;">Kontrol ediliyor Lütfen Bekleyiniz .<br/> <img src="/Public/img/loading_bar.gif"></div>',
                        footer: ''
                    }
                });
                $('#modalLoadingx').modal('toggle');
                window.open(localKontrol, '_blank');
                // $.get(realUrl, function (result) {
                //     if (result.Status) {
                //         $('#modalLoadingx .modal-body').html('<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>');

                //     } else {
                //         $('#modalLoadingx .modal-body').html(result.Message);
                //     }
                // });
            }
        });
    }
});