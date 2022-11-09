$(function() {
    var userGroup = $('#D80430FDFFCA4505A5DF98D70FD30EE9').select2('data').id;
    switchuserGroup(userGroup);
    switchTip($('#4D21CB7383224C3080821B0ADB6AFE24').select2('data').id);

    $('body').on('change', "#D80430FDFFCA4505A5DF98D70FD30EE9", function() {
        userGroup = $('#D80430FDFFCA4505A5DF98D70FD30EE9').select2('data').id;
        switchuserGroup(userGroup);
    });
    $('body').on('change', "#4D21CB7383224C3080821B0ADB6AFE24", function() {
        var tip = $(this).val();
        switchTip(tip);
    });
})

function switchuserGroup(userGroup) {
    switch (userGroup) {
        case "DF55DE8E54C3458BB19A12822DCFCADC":
            $('#4D21CB7383224C3080821B0ADB6AFE24').select2('data', {
                id: "AB35DB317D364FC4B0FEAFFA67E90001",
                text: "	DİKİŞ MAKİNELERİ"
            });
            $('#4D21CB7383224C3080821B0ADB6AFE24').trigger('change');
            break;
        case "4CD1A50CC40F4208B0CDD372F88B538F":
            $('#4D21CB7383224C3080821B0ADB6AFE24').select2('data', {
                id: "BA36632D93544B4085190EDC8670E722",
                text: "	MOTOSİKLET"
            });
            $('#4D21CB7383224C3080821B0ADB6AFE24').trigger('change');
            break;
        case "F943D206B2EE44F6BFB1D16C92C10E4F":
            $('#4D21CB7383224C3080821B0ADB6AFE24').select2('data', {
                id: "CF7282B26F7440C8B5239D4348E305F2",
                text: "MAKİNE YEDEK PARÇA"
            });
            $('#4D21CB7383224C3080821B0ADB6AFE24').trigger('change');
            break;
        case "549BC5ECC32F47AE9D3A2CED498378FA":
            $('#4D21CB7383224C3080821B0ADB6AFE24').select2('data', {
                id: "EC4CDD2137AA4464BCBBDBFED7F93FDD",
                text: "MOTOSİKLET YEDEK PARÇA"
            });
            $('#4D21CB7383224C3080821B0ADB6AFE24').trigger('change');
            break;
    }
}

function switchTip(tip) {
    switch (tip) {
        case "AB35DB317D364FC4B0FEAFFA67E90001":
            $('#A09B790CA60C41DF88FF360E6AE317DE').select2('data', {
                id: "CF0D6D1BFDC64EC1963243088ECD61FD",
                text: "US Dollar (USD)"
            });
            $('#A09B790CA60C41DF88FF360E6AE317DE').trigger('change');
            break;
        case "BA36632D93544B4085190EDC8670E722":
            $('#A09B790CA60C41DF88FF360E6AE317DE').select2('data', {
                id: "6829514F0D0C4EA5A2577FAAB56AD1F7",
                text: "Turkish Lira (TRY)"
            });
            $('#A09B790CA60C41DF88FF360E6AE317DE').trigger('change');
            break;
        case "CF7282B26F7440C8B5239D4348E305F2":
            $('#A09B790CA60C41DF88FF360E6AE317DE').select2('data', {
                id: "CF0D6D1BFDC64EC1963243088ECD61FD",
                text: "US Dollar (USD)"
            });
            $('#A09B790CA60C41DF88FF360E6AE317DE').trigger('change');
            break;
        case "EC4CDD2137AA4464BCBBDBFED7F93FDD":
            $('#A09B790CA60C41DF88FF360E6AE317DE').select2('data', {
                id: "CF0D6D1BFDC64EC1963243088ECD61FD",
                text: "US Dollar (USD)"
            });
            $('#A09B790CA60C41DF88FF360E6AE317DE').trigger('change');
            break;
    }
}