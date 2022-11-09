$(function() {

    if ($('#FilterId').val() === 'A8096C8AC75B460B865A7FE3E7113821') {
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
                var realKontrol = "https://meyicki2.setcrm.com/api/data/EGuvenImzaDenemed?imzalar=" + imzalar + "&id=" + userData.id;
                if ($('#FilterId').val() === '6D01D6E0D1824C8385C5CD63D8437F15' || $('#FilterId').val() === '4691028456554848B9D218E718941639' || $('#FilterId').val() === '99DB50D110E946CCBF59F78215129D04') {
                    localKontrol = "http://localhost:11456/api/data/EGuvenImzaDenemed?imzalar=" + imzalar + "&id=" + userData.id + "&en=1";
                    realKontrol = "https://meyicki2.setcrm.com/api/data/EGuvenImzaDenemed?imzalar=" + imzalar + "&id=" + userData.id + "&en=1";
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
                window.open(realKontrol, '_blank');
            }
        });
    }
});