$(function() {

    var laborant = $("label[for=29361EBA2E0649F5B5D9B9A9C628F7CA]").parent().data("publicids"),
        currentUserId = userData.id,
        arrayPermissions = userData.permissionGroupIds.split('|');
    currentUserAdmin = arrayPermissions.some(s => s == "A739A97236BB424ABEA283D3F43EBF24" || s == "60EF5C52265A478FB3765E63900A6EEF") ? true : false;
    currentUserAuthorized = arrayPermissions.some(s => s == "B7BAEDD464C24980A4BA54715382487E" || s == "E09FE2B3E8684A25881B47BB29EF919E" || s == "B45DF21A043246B39615319E34D2C95F" ||
        s == "EEADDFE4337C4A3CBD02BF9257F1CDE8" || s == "DDF9BE226FFB4200806BD915FC5F2127" || s == "F004324FEB934DFB967BDC4EB25D856A") ? true : false;
    var lrRealUrl = "https://meyicki.setcrm.com/api/data/LrOkuma?recordId=" + $("#RecordPublicId").val() + "&lrId=8A9DDB2E3E874097AA08D1782E4E62B7";
    // var localUrl = "http://localhost:50058/api/data/LrOkuma?recordId=" + $("#RecordPublicId").val() + "&lrId=8A9DDB2E3E874097AA08D1782E4E62B7";
    var imzaci1 = "";
    var imzaci2 = "";
    var imzaci3 = "";
    $.get(lrRealUrl, function(r) {
        if (r.IsOk) {
            if (r.Records.length === 0) {
                return;
            } else {
                $.each(r.Records, function(i, v) {
                    if (i == 0) {
                        imzaci1 = v.Values.first('FieldPublicId', '291A8E6EAD8A4742955E8C95DBB5FC58').SelectedItemPublicIds;
                    }
                    if (i == 1) {
                        imzaci2 = v.Values.first('FieldPublicId', '291A8E6EAD8A4742955E8C95DBB5FC58').SelectedItemPublicIds;
                    }
                    if (i == 2) {
                        imzaci3 = v.Values.first('FieldPublicId', '291A8E6EAD8A4742955E8C95DBB5FC58').SelectedItemPublicIds;
                    }
                });
            }
            if (laborant !== "") {
                if (laborant !== currentUserId) {
                    if (!currentUserAdmin) {
                        if (currentUserAuthorized) {
                            interval = setInterval(updateDivExceptEimza, 10);
                        } else {
                            interval = setInterval(updateDiv, 10);
                        }

                    }

                }
            }
        }
    });

    function updateDiv() {
        $('.pull-right a').addClass('disabled');
        $('.pull-right button').addClass('disabled');
        if ($('.pull-right button, .pull-right a').length == $('.pull-right button.disabled, .pull-right a.disabled').length) {
            clearInterval(interval);
        }
    }

    function updateDivExceptEimza() {
        $('.pull-right a').addClass('disabled');
        $('.pull-right button').addClass('disabled');
        if ($('.pull-right button, .pull-right a').length == $('.pull-right button.disabled, .pull-right a.disabled').length) {
            $('#btnImzabaslat').removeClass('disabled');
            clearInterval(interval);
        }
    }
});