$(function() {
    getValues();

    setInterval(getValues, 300000);

    function turkishLanguagePriceFormatedOutput(price) {
        //metoda gelicek değerin , kısımların replace edilip gönderilmesi gerekiyor. /,/g kısmı , replace ediyorum.
        var oldPrice = price;
        if (String.isNullOrWhiteSpace(price)) {
            price = "0";
        }
        var currency_symbol = "₺";
        var formattedOutput = new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'TRY',
            minimumFractionDigits: 2,
        });
        return isNaN(price) ? oldPrice : formattedOutput.format(price).replace(currency_symbol, '');
    }

    function getValues() {
        var url = '/set/list/aktivite/?filter=A4265F47A33F479AA4E9C37985897954';
        $.get(url, function(sdata) {
            var elem = $('<div/>').html(sdata);
            var count = elem.find('#itemCount').text();
            $('#alacatiOnline').html(count);
        });
        var url = '/set/list/aktivite/?filter=7273FF71B7324FFCA590D3DC9F61C908';
        $.get(url, function(sdata) {
            var elem = $('<div/>').html(sdata);
            var count = elem.find('#itemCount').text();
            $('#alacatiYuzyuze').html(count);
        });
        var url = '/set/list/v-club/?filter=F728D6B879724AF8A480122D735E07FE';
        $.get(url, function(sdata) {
            var elem = $('<div/>').html(sdata);
            var count = elem.find('#itemCount').text();
            $('#alacatiAdet').html(count);
        });

        var url = '/set/list/aktivite/?filter=3C6854EAA4E14B7A809FFE6BFB872DDE';
        $.get(url, function(sdata) {
            var elem = $('<div/>').html(sdata);
            var count = elem.find('#itemCount').text();
            $('#torbaOnline').html(count);
        });
        var url = '/set/list/aktivite/?filter=FE6A998E54384B0BA7C77E22E742B2DF';
        $.get(url, function(sdata) {
            var elem = $('<div/>').html(sdata);
            var count = elem.find('#itemCount').text();
            $('#torbaYuzyuze').html(count);
        });
        var url = '/set/list/v-club/?filter=3410626E5BCD4147A39439C11B4FFB75';
        $.get(url, function(sdata) {
            var elem = $('<div/>').html(sdata);
            var count = elem.find('#itemCount').text();
            $('#torbaAdet').html(count);
        });

        $.get("https://nefwebapi.setcrm.com/api/data/AlacatiCiroMiktar", {},
            function(r) {
                if (r.Status) {
                    // var count = numberWithCommas(r.toplamSatisCirosu) + " ₺"
                    var count = turkishLanguagePriceFormatedOutput(r.toplamSatisCirosu) + " ₺"
                    $('#alacati').html(count);
                } else {
                    $('#alacati').html("0 ₺");
                }
            });
        $.get("https://nefwebapi.setcrm.com/api/data/TorbaCiroMiktar", {},
            function(r) {
                if (r.Status) {
                    //var count = numberWithCommas(r.toplamSatisCirosu) + " ₺"
                    var count = turkishLanguagePriceFormatedOutput(r.toplamSatisCirosu) + " ₺"
                    $('#torba').html(count);
                } else {
                    $('#torba').html("0 ₺");
                }
            });
    }
});