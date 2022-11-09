$(function() {
    $('body').on('change',
        '#7DF51D42E1B34E05BD3F5CCB0B34CF31',
        function() {
            var LokasyonTipi = $('#F8DFD79106C44812A06BCA46DE4B34B6').val();
            if (LokasyonTipi == "71DB1351579C4993A65FB0F17ADEDF25") {
                $('#405A5597DBC446BEA1879A2DC2F40F6B').trigger('change');
            } else if (LokasyonTipi == "998A6494818A4A7F967816DA197CAE2D") {
                $('#E1B97A29DC4444C784691FC06ECDA0BE').trigger('change');
            }
        });
});

$(function() {
    var araOdeme = $('#7DF51D42E1B34E05BD3F5CCB0B34CF31').val();
    if (araOdeme == "") {
        $('label[for=F748F70DBB9F45268C9DEAF1CF61C887]').closest('td').hide();
    }

    $('body').on('change',
        '#7DF51D42E1B34E05BD3F5CCB0B34CF31',
        function() {
            var araOdemeSayisi = $('#7DF51D42E1B34E05BD3F5CCB0B34CF31').val();
            if (araOdemeSayisi != "8CAADBA9C29D44B890761DE79DAA691C" || araOdemeSayisi != "0911250EA3244BCDB8C2DE5BECB89A41" || araOdemeSayisi != "") {
                $('label[for=F748F70DBB9F45268C9DEAF1CF61C887]').closest('td').show();
                setTimeout(() => {
                    $('#D50EDC3D814E48CFA717F34FF29BC83C').trigger('change');
                }, 1000);
            } else {
                $('label[for=F748F70DBB9F45268C9DEAF1CF61C887]').closest('td').hide();
            }
        });
});