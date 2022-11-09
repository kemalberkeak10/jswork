$(function() {
    var data = [{
        id: 'D83F9661762242F98DBEA70AF364FB39',
        text: '24 Ay'
    }];
    prepareSelect2WithData('#C74AD9F0EBB14636913F4593941118F0', data);
    prepareSelect2SelectedOneItem('#C74AD9F0EBB14636913F4593941118F0', "D83F9661762242F98DBEA70AF364FB39", "24 Ay", false);
});


$(function() {
    // $('#C74AD9F0EBB14636913F4593941118F0').select2('data', {
    //     id: "D83F9661762242F98DBEA70AF364FB39",
    //     text: "24 Ay"
    // }).trigger('change');
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
});