$(function() {
    debugger;
    var sikayetTipi = $('label[for=03F8D372A1C54CFAB9B6822D89652732]').parent().data('publicids');
    if (sikayetTipi == "63E0E6295EBF4460B56E0CA2EC26E1D5") {
        var id = $('label[for=663DD58F66B04DF29C4E0B880A4A7CE3]').parent().data('publicids');
        var permissionGroup = userData.permissionGroupIds.split("|");
        debugger;

        // $('#btnDiageoSonuc').hide();
        // $("#referToSalesSupervisor").hide();
        // $("#btnMSGonder").hide();
        // $('#btnSatisOnayy').hide();
        // $("[data-publicid=05C1537B55D04820BB14725A592FB74E]").show();
        // $("[data-publicid=D6DFFB35042946E08E1DEE4655408FB8]").show();
        // $("[data-publicid=28B6CB4751AB4D5FAF30C02286CC6A63]").show();
        // $('#btnIptalTalepEt').hide();
        // $("#btnSatisOnayy").hide();
        // $("#btnIptalEt").hide();

        if (id == "5ED97796B49B481684C94603B6B32F59") {
            permissionGroup.forEach((element) => {
                if (element.includes("60EF5C52265A478FB3765E63900A6EEF")) {
                    $('#btnDiageoSonuc').hide();
                } else {
                    $('#btnDiageoSonuc').show();
                }
            });
        } else if (id == "97C329DDBE5D462AAB20EF4C1CBCA5CE") {
            permissionGroup.forEach((element) => {
                if (element.includes("60EF5C52265A478FB3765E63900A6EEF")) {
                    $("#referToSalesSupervisor").hide();
                    $("#btnMSGonder").hide();
                } else {
                    $("#referToSalesSupervisor").show();
                    $("#btnMSGonder").show();
                }
            });
        } else if (id == "D50E6E12D74840E9B5AF7072F1603093") {
            permissionGroup.forEach((element) => {
                if (element.includes("1B15D0D25F744E1E889936F00256A3A1")) {
                    $('#btnSatisOnayy').hide();
                    $("[data-publicid=05C1537B55D04820BB14725A592FB74E]").hide();
                    $("[data-publicid=D6DFFB35042946E08E1DEE4655408FB8]").hide();
                    $("[data-publicid=28B6CB4751AB4D5FAF30C02286CC6A63]").hide();
                    $('#btnIptalTalepEt ').hide();
                } else {
                    $('#btnSatisOnayy').show();
                    $("[data-publicid=05C1537B55D04820BB14725A592FB74E]").show();
                    $("[data-publicid=D6DFFB35042946E08E1DEE4655408FB8]").show();
                    $("[data-publicid=28B6CB4751AB4D5FAF30C02286CC6A63]").show();
                    $('#btnIptalTalepEt').show();
                }
            });
        } else if (id == "A05FAF0B4CC14E5BB387E876E804B3B4" || id == "134A2D94A3464BBFA0B57BA3C7824708") {
            permissionGroup.forEach((element) => {
                if (element.includes("1B15D0D25F744E1E889936F00256A3A1")) {
                    $('.fa-edit').parent().hide();
                } else {
                    $('.fa-edit').parent().show();
                }
            });
        } else if (id == "E3DAF3B4D3994E19BBAD2451E3C5B062") {
            debugger;
            var ad = $('label[for=21BE0EC3719B4378B3A1710663F7FE75]').parent().data('publicids');
            var satisSorumlusu = $('label[for=EB645D6C559F4FF5873609BA52E07CA4]').parent().data('publicids');
            var user = userData.id;
            if (ad == user || satisSorumlusu == user) {
                $("[data-publicid=05C1537B55D04820BB14725A592FB74E]").show();
                $("[data-publicid=D6DFFB35042946E08E1DEE4655408FB8]").show();
                $("#btnSatisOnayy").show();
                $("#btnIptalEt").show();
                $("[data-publicid=28B6CB4751AB4D5FAF30C02286CC6A63]").show();

            } else {
                $("[data-publicid=05C1537B55D04820BB14725A592FB74E]").hide();
                $("[data-publicid=D6DFFB35042946E08E1DEE4655408FB8]").hide();
                $("#btnSatisOnayy").hide();
                $("#btnIptalEt").hide();
                $("[data-publicid=28B6CB4751AB4D5FAF30C02286CC6A63]").hide();
            }
        }
        //else {
        //     $('#btnDiageoSonuc').show();
        //     $("[data-publicid=referToSalesSupervisor]").show();
        //     $("[data-publicid=btnMSGonder]").show();
        //     $('#btnSatisOnayy').show();
        //     $("[data-publicid=05C1537B55D04820BB14725A592FB74E]").hide();
        //     $("[data-publicid=D6DFFB35042946E08E1DEE4655408FB8]").hide();
        //     $("[data-publicid=28B6CB4751AB4D5FAF30C02286CC6A63]").hide();
        //     $('#btnIptalTalepEt').show();
        //     $("[data-publicid=btnSatisOnayy]").show();
        //     $("[data-publicid=btnIptalEt]").show();
        // }
    }
});