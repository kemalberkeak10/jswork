$(function() {
    $('body').on('change', '#449A85BF043445EEBC25E2BA694AFED9', function() {
        var icLabAdData = $('#449A85BF043445EEBC25E2BA694AFED9').select2('data');
        if (icLabAdData != null) {
            var icLabId = $('#449A85BF043445EEBC25E2BA694AFED9').select2('data').id;
            if (icLabId == "9D1C3BE5D4A1420AB615F1AFB86E24CD") {
                setAGUrunGrubu();
            }
        }
    });

    function setAGUrunGrubu() {
        $.get("https://maya.setcrm.com/Summary/LookupFieldValues", {
                id: 'D349E1519DD5463D8200FD72C6088F42',
                viewFilterId: '187130E9D5ED401DA7239EE25C7F59AF',
                controllingRecordId: $('#5AFA62276DE74CEDACF22C1F49BABC48').val(),
                coId: '283FD563B0BC4BF0BE50BE1126538CEE',
                itemId: "D349E1519DD5463D8200FD72C6088F42",
                groupIds: "9860784453FF4F65A62E74247A374B13",
                controllingId: "5AFA62276DE74CEDACF22C1F49BABC48",
                q: "",
                pageSize: 8
            },
            function(data) {
                if (data !== null) {
                    var urunGrubuAGData = data.Items.find(x => x.Value == 'AG');
                    if (urunGrubuAGData != null) {
                        $('#D349E1519DD5463D8200FD72C6088F42').select2('data', {
                            id: urunGrubuAGData.Key,
                            text: urunGrubuAGData.Value
                        });
                        $('#D349E1519DD5463D8200FD72C6088F42').trigger('change');
                        setAGProssesBasamagi();
                    }
                }
            }
        );
    }

    function setAGProssesBasamagi() {
        $.get("https://maya.setcrm.com/Summary/LookupFieldValues", {
                id: '5610B85C662F486FB6C378712F8C0536',
                viewFilterId: 'FE8BFD57D5AA4F79B2EAC67FC073F23E',
                controllingRecordId: $('#D349E1519DD5463D8200FD72C6088F42').val(),
                coId: '283FD563B0BC4BF0BE50BE1126538CEE',
                itemId: "5610B85C662F486FB6C378712F8C0536",
                groupIds: $('#D349E1519DD5463D8200FD72C6088F42').val(),
                controllingId: "D349E1519DD5463D8200FD72C6088F42",
                q: "",
                pageSize: 8
            },
            function(data) {
                if (data !== null) {
                    var prossesBasamagiAGData = data.Items.find(x => x.Value == 'AG');
                    if (prossesBasamagiAGData != null) {
                        $('#5610B85C662F486FB6C378712F8C0536').select2('data', {
                            id: prossesBasamagiAGData.Key,
                            text: prossesBasamagiAGData.Value
                        }).trigger('Change');
                    }
                }
            }
        );
    }
});