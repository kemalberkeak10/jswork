$(function() {
    var laborant = $("label[for=29361EBA2E0649F5B5D9B9A9C628F7CA]").parent().data("publicids"),
        currentUserId = userData.id,
        arrayPermissions = userData.permissionGroupIds.split('|'),
        currentUserAuthorized = arrayPermissions.some(s => s == "A739A97236BB424ABEA283D3F43EBF24" || s == "60EF5C52265A478FB3765E63900A6EEF") ? true : false; // || "60EF5C52265A478FB3765E63900A6EEF" !== undefined

    if (laborant !== "") {
        if (laborant !== currentUserId) {
            if (!currentUserAuthorized) {
                interval = setInterval(updateDiv, 10);
            }
        }
    }


    function updateDiv() {
        $('.pull-right a').addClass('disabled');
        $('.pull-right button').addClass('disabled');
        if ($('.pull-right button, .pull-right a').length == $('.pull-right button.disabled, .pull-right a.disabled').length) {
            clearInterval(interval);
        }

    }
});