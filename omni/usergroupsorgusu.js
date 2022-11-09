$(function() {
    var userGroups = userData.userGroups;
    var userGroupList = userGroups.split('|');
    $.each(userGroupList, function(index, value) {
        if (value.length == 32) {
            if (value.contains('1') || value.contains('2') || value.contains('3') || value.contains('4') || value.contains('5') ||
                value.contains('6') || value.contains('7') || value.contains('8') || value.contains('9') || value.contains('0')) {
                $('#FD45548F4A044E1B895C5E07709B1F72').select2('data', { id: value, text: "" }).trigger('change');
            }
        }
    });
});