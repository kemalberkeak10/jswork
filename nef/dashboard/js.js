$(function() {
    $('.row:eq(0)').parent().prepend('<a id="btnMenuAc" class="btn btn-xs btn-primary" style="position:fixed;z-index: 99;"><i class="fa fa-arrow-circle-right" aria-hidden="true"></i></a>');
    $('#btnMenuAc').on('click', function() {
        $('.well-xxs').toggle();
    });
    $('.well-xxs').toggle();
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
        var url = '/set/list/aktivite/?filter=59A5D4497258435E9B09F6EACCA92BDE';
        $.get(url, function(sdata) {
            var elem = $('<div/>').html(sdata);
            var count = elem.find('#itemCount').text();
            $('#alacatigorusme').html(count);
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
        var url = '/set/list/aktivite/?filter=9823575DABB44DAAACD8548DD2D729B7';
        $.get(url, function(sdata) {
            var elem = $('<div/>').html(sdata);
            var count = elem.find('#itemCount').text();
            $('#torbaGorusme').html(count);
        });
        var url = '/set/list/v-club/?filter=3410626E5BCD4147A39439C11B4FFB75';
        $.get(url, function(sdata) {
            var elem = $('<div/>').html(sdata);
            var count = elem.find('#itemCount').text();
            $('#torbaAdet').html(count);
        });

        var url = '/set/list/aktivite/?filter=816D754FA0DA4534BABD75C7A8456C37';
        $.get(url, function(sdata) {
            var elem = $('<div/>').html(sdata);
            var count = elem.find('#itemCount').text();
            $('#vclubOnline').html(count);
        });

        var url = '/set/list/aktivite/?filter=96405F6307EB46289EB22E49EAEFD11C';
        $.get(url, function(sdata) {
            var elem = $('<div/>').html(sdata);
            var count = elem.find('#itemCount').text();
            $('#vclubYuzyuze').html(count);
        });

        var url = '/set/list/aktivite/?filter=DE8B6701F09C49BB80402F04036C7A9D';
        $.get(url, function(sdata) {
            var elem = $('<div/>').html(sdata);
            var count = elem.find('#itemCount').text();
            $('#vclubGorusme').html(count);
        });

        var url = '/set/list/v-club/?filter=0ED5AD0F5C45403496C4D297277C92F1';
        $.get(url, function(sdata) {
            var elem = $('<div/>').html(sdata);
            var count = elem.find('#itemCount').text();
            $('#duoAdet').html(count);
        });

        var url = '/set/list/aktivite/?filter=9AC2E79B3BFD4E9680F7C61AE26A1BCD';
        $.get(url, function(sdata) {
            var elem = $('<div/>').html(sdata);
            var count = elem.find('#itemCount').text();
            $('#duogorusme').html(count);
        });

        var url = '/set/list/aktivite/?filter=A1AB4E3DC42242CA961420A0A0AE3F06';
        $.get(url, function(sdata) {
            var elem = $('<div/>').html(sdata);
            var count = elem.find('#itemCount').text();
            $('#duoOnline').html(count);
        });

        var url = '/set/list/aktivite/?filter=E1B8166033E94A61B531BD12798C345A';
        $.get(url, function(sdata) {
            var elem = $('<div/>').html(sdata);
            var count = elem.find('#itemCount').text();
            $('#duoYuzyuze').html(count);
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

        $.get("https://nefwebapi.setcrm.com/api/data/DuoCiroMiktar", {},
            function(r) {
                if (r.Status) {
                    // var count = numberWithCommas(r.toplamSatisCirosu) + " ₺"
                    var count = turkishLanguagePriceFormatedOutput(r.toplamSatisCirosu) + " ₺"
                    $('#duo').html(count);
                } else {
                    $('#duo').html("0 ₺");
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