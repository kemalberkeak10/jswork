$(function() {
    $('body').on('change', '#240FE209B09F4D98B7EC276AB8B3C02F', function() {
        var rezervationType = $('#240FE209B09F4D98B7EC276AB8B3C02F').select2('data');
        if (!String.isNullOrWhiteSpace(rezervationType)) {
            if (rezervationType.id == "561F00D5CA60470BAAAB7E94E2D4FEB8") {
                $("#7BE8FEED77A44FC18CC572C9687EBC4D").prop('disabled', true);
            } else {
                $("#7BE8FEED77A44FC18CC572C9687EBC4D").prop('disabled', false);
            }
        }
    });
});