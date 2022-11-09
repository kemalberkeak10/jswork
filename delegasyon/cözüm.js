$(function () {
    $('[data-publicid=BC5390F8B2E04D9A9A90BE9DA5334700]').hide();
    var url = '/set/musteri-urun-sikayet-formu/detail/' + $('label[for=6301D6FC5EDA4EA7A9776E63BF0A0860]').parent().data('publicids');
    $.get(url, function (sdata) {
        var elem = $('<div/>').html(sdata);
        var Text = elem.find('label[for=03F8D372A1C54CFAB9B6822D89652732]').parent().data('value');
        var Id = elem.find('label[for=03F8D372A1C54CFAB9B6822D89652732]').parent().data('publicids');
        if (Id === '3DFEFFFA7C4D4857886AF637AFE4CB43') { //tüketici
            $('[data-publicid=BC5390F8B2E04D9A9A90BE9DA5334700]').text("Call Centera Gönder");
            $('[data-publicid=BC5390F8B2E04D9A9A90BE9DA5334700]').show();
        } else if (Id === '63E0E6295EBF4460B56E0CA2EC26E1D5') { //müşteri
            $('[data-publicid=BC5390F8B2E04D9A9A90BE9DA5334700]').text("Kaydı Açana Gönder");
            $('[data-publicid=BC5390F8B2E04D9A9A90BE9DA5334700]').show();
        }
    });

});