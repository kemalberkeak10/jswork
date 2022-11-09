$(function() {
    $('body').on('change', '#449A85BF043445EEBC25E2BA694AFED9', function() {
        var id = $('#449A85BF043445EEBC25E2BA694AFED9').val();
        if (id == "DDB93777446445E8B2F18FEFAAD519D4" || id == "005BCB4DBC914EE2B7406730BFD54A86" || id == "") {
            $('#D349E1519DD5463D8200FD72C6088F42').select2('enable', false);
        } else {
            $('#D349E1519DD5463D8200FD72C6088F42').select2('enable', true);
        }
    });
    $('#449A85BF043445EEBC25E2BA694AFED9').trigger('change');
});