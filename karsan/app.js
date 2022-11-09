$(function() {
    $('body').on('change', '#964A917701CC43D2BC5C1789DC6E6147', function() {
        console.log('change');
        if ($('#964A917701CC43D2BC5C1789DC6E6147').val() === '00C6E272BB3D4ECE86277115C46D8F24') {
            $("input[name='CHECKBOX-83B01488ABAD4A2C9FA1584CE93BE44D']").attr('checked', true);
            $("input[name='CHECKBOX-83B01488ABAD4A2C9FA1584CE93BE44D']").prop('value', true);
            $("input[id='83B01488ABAD4A2C9FA1584CE93BE44D']").prop('value', true)
        } else {
            $("input[name='CHECKBOX-83B01488ABAD4A2C9FA1584CE93BE44D']").removeAttr('checked');
            $("input[name='CHECKBOX-83B01488ABAD4A2C9FA1584CE93BE44D']").prop('value', false);
            $("input[id='83B01488ABAD4A2C9FA1584CE93BE44D']").prop('value', false)
        }
    });
    $('#964A917701CC43D2BC5C1789DC6E6147').trigger('change');

});