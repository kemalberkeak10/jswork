$(function() {

    $('#3A958E190AE54C1E8FC808681F7585A1').on('change', function() {
        method();

        var id = $('#3A958E190AE54C1E8FC808681F7585A1').val();
        if (id === "79DD511FDB5A4015ACDE900F61DEC409") {
            $('#C74AD9F0EBB14636913F4593941118F0').select2('data', {
                id: "D83F9661762242F98DBEA70AF364FB39",
                text: "24 Ay"
            }).trigger('change');
        } else {
            $("#C74AD9F0EBB14636913F4593941118F0").select2("val", "");
        }
    });
    $('#3A958E190AE54C1E8FC808681F7585A1').trigger('change');

    method();

    function method() {
        var odemeSekli = $('#3A958E190AE54C1E8FC808681F7585A1').val();
        if (String.isNullOrWhiteSpace(odemeSekli)) {
            $('label[for=C74AD9F0EBB14636913F4593941118F0]').parent().show();
            $('label[for=1C41CF171C32431B8CBCCDA1F6185E6D]').parent().show();
            $('label[for=B5FF10B707D44690BB84092CB7E251ED]').parent().show();
            $('label[for=7DF51D42E1B34E05BD3F5CCB0B34CF31]').parent().show();
            $('label[for=D50EDC3D814E48CFA717F34FF29BC83C]').parent().show();
            $('label[for=F748F70DBB9F45268C9DEAF1CF61C887]').parent().show();

            return;
        }

        if (odemeSekli == '79DD511FDB5A4015ACDE900F61DEC409') {
            $('label[for=C74AD9F0EBB14636913F4593941118F0]').parent().show();
            $('label[for=1C41CF171C32431B8CBCCDA1F6185E6D]').parent().show();
            $('label[for=B5FF10B707D44690BB84092CB7E251ED]').parent().show();
            $('label[for=7DF51D42E1B34E05BD3F5CCB0B34CF31]').parent().show();
            $('label[for=D50EDC3D814E48CFA717F34FF29BC83C]').parent().show();
            $('label[for=F748F70DBB9F45268C9DEAF1CF61C887]').parent().show();
            $('label[for=C9BBC090DE384DD481982919D44246A9]').parent().show();
            $('label[for=99461E8E060C469DA1C25EA4AF6F8A11]').parent().show();

        } else {
            $('label[for=C74AD9F0EBB14636913F4593941118F0]').parent().hide();
            $('label[for=1C41CF171C32431B8CBCCDA1F6185E6D]').parent().hide();
            $('label[for=B5FF10B707D44690BB84092CB7E251ED]').parent().hide();
            $('label[for=7DF51D42E1B34E05BD3F5CCB0B34CF31]').parent().hide();
            $('label[for=D50EDC3D814E48CFA717F34FF29BC83C]').parent().hide();
            $('label[for=F748F70DBB9F45268C9DEAF1CF61C887]').parent().hide();
            $('label[for=C9BBC090DE384DD481982919D44246A9]').parent().hide();
            $('label[for=99461E8E060C469DA1C25EA4AF6F8A11]').parent().hide();
        }
    }
});