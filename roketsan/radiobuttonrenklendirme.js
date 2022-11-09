$(function() {
    $('label[for="DFCB13B680AB4F1181938D17D17E0C27"]').closest('div').find('.btn-group .btn [value="81C91F5E6A0B4A798678E05F9167C1F5"]').closest('label').css('background-color', '#208b22fa');
    $('label[for="DFCB13B680AB4F1181938D17D17E0C27"]').closest('div').find('.btn-group .btn [value="0DBACA17841D45B89F5FDC4FF3EE7118"]').closest('label').css('background-color', '#dd6363');
});
$(function() {
    var radioButtonValue = $('label[for="DFCB13B680AB4F1181938D17D17E0C27"]').closest('div').data('publicids');
    if (radioButtonValue == "81C91F5E6A0B4A798678E05F9167C1F5") {
        $('label[for="DFCB13B680AB4F1181938D17D17E0C27"]').closest('div').css('color', '#1fde1f');
    } else if (radioButtonValue == "0DBACA17841D45B89F5FDC4FF3EE7118") {
        $('label[for="DFCB13B680AB4F1181938D17D17E0C27"]').closest('div').css('color', '#dd6363');
    }
});