//list
$(function() {

    var vfId = $('#ViewFilterPublicId').val();
    if (vfId == "705D059365044042942E1AC7D1A10AA7" || vfId == "FBB62351D56246BAA7F5B668258F14D5" || vfId == "420445EE74014CFB8BE0B8843984A792") {
        $('.new-row:eq(0)').text('Yeni Kalibrasyon Şablon Kartı')
    }
});


$(function() {
    $('body').on('change', '#DED81FC0E7724E469F20FC2FFCDD4E9C', function() {
        var tip = $('#DED81FC0E7724E469F20FC2FFCDD4E9C').val();
        if (tip == "2E3A885CCE264F3FB04BFFB95BDD0D01") { //sablon
            $('#DED81FC0E7724E469F20FC2FFCDD4E9C').select2('disable');

            prepareSelect2SelectedOneItem('#1105BB24AE49422F83D26E9C78057EEC', "155BF4B98E7544E4B1307A008AAD0242", "Aktif", false);
            prepareSelect2SelectedOneItem('#6868AB9F12A24DB8A5BDC5CCED6AA506', "4BAE2BDED33747318F6F83D03CC274D3", "MBT DAHİLİ ŞABLON KONTROL MERKEZİ", false);
            var cihazGrupData = [
                { id: '074132C1BCA14A9B80A6E168E0AD0EF6', text: '900 - Muhtelif Şablonlar' },
            ];
            prepareSelect2WithData('#EBC03D56372548BA89A96DF7CED390E4', cihazGrupData);
            prepareSelect2SelectedOneItem('#EBC03D56372548BA89A96DF7CED390E4', "074132C1BCA14A9B80A6E168E0AD0EF6", "900 - Muhtelif Şablonlar", false);
            var cihazKonumuData = [
                { id: '9F69886C3CD84472B4EB50C2F2B0D291', text: 'Belirsiz' },
                { id: '39F4C65F4DD64F88B2B4CEFCB37B0BE9', text: 'Kullanıcıda' },
                { id: 'C35192666A5F431FA8281E21E845A0F6', text: 'Şablon Kontrol Merkezi' },
            ];
            prepareSelect2WithData('#6434502A462D41E0B1BC84CB00B0EC58', cihazKonumuData);
            var dahiliData = [
                { id: '06B711E274AC4F888A748F7D9BB25DD4', text: 'Dahili' },
            ];
            prepareSelect2WithData('#740F3F9AA4D740DDA7375D1AB71A4E6E', dahiliData);
            var statuData = [
                { id: '1E6A5B548D0A4D878DD9813E98D897C1', text: 'Kullanımda' },
                { id: '3A9EFC51F7C54EC08DED58EF557B690C ', text: 'Arızalı' }
            ];
            prepareSelect2WithData('#FA8AD74181A14C779E846E0FE2DF0157', statuData);
            prepareSelect2SelectedOneItem('#FA8AD74181A14C779E846E0FE2DF0157', "1E6A5B548D0A4D878DD9813E98D897C1", "Kullanımda", false);

        }
    });
});


$(function() {

    var tip = $('#DED81FC0E7724E469F20FC2FFCDD4E9C').val();
    if (tip == "2E3A885CCE264F3FB04BFFB95BDD0D01") {

        prepareSelect2SelectedOneItem('#1105BB24AE49422F83D26E9C78057EEC', "155BF4B98E7544E4B1307A008AAD0242", "Aktif", false);
        var cihazGrupData = [
            { id: '074132C1BCA14A9B80A6E168E0AD0EF6', text: '900 - Muhtelif Şablonlar' },
        ];
        prepareSelect2WithData('#EBC03D56372548BA89A96DF7CED390E4', cihazGrupData);
        prepareSelect2SelectedOneItem('#EBC03D56372548BA89A96DF7CED390E4', "074132C1BCA14A9B80A6E168E0AD0EF6", "900 - Muhtelif Şablonlar", false);
        var dahiliData = [{
            id: '06B711E274AC4F888A748F7D9BB25DD4',
            text: 'Dahili'
        }, ];
        prepareSelect2WithData('#740F3F9AA4D740DDA7375D1AB71A4E6E', dahiliData);
        prepareSelect2SelectedOneItem('#6868AB9F12A24DB8A5BDC5CCED6AA506', "4BAE2BDED33747318F6F83D03CC274D3", "MBT DAHİLİ ŞABLON KONTROL MERKEZİ", false);
        var cihazKonumuData = [{
                id: '9F69886C3CD84472B4EB50C2F2B0D291',
                text: 'Belirsiz'
            },
            {
                id: '39F4C65F4DD64F88B2B4CEFCB37B0BE9',
                text: 'Kullanıcıda'
            },
            {
                id: 'C35192666A5F431FA8281E21E845A0F6',
                text: 'Şablon Kontrol Merkezi'
            },
        ];
        prepareSelect2WithData('#6434502A462D41E0B1BC84CB00B0EC58', cihazKonumuData);

        var statuData = [{
                id: '1E6A5B548D0A4D878DD9813E98D897C1',
                text: 'Kullanımda'
            },
            {
                id: '3A9EFC51F7C54EC08DED58EF557B690C ',
                text: 'Arızalı'
            }
        ];
        prepareSelect2WithData('#FA8AD74181A14C779E846E0FE2DF0157', statuData);
        prepareSelect2SelectedOneItem('#FA8AD74181A14C779E846E0FE2DF0157', "1E6A5B548D0A4D878DD9813E98D897C1", "Kullanımda", false);

    }

});