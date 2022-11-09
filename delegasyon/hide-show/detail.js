$(function() {
    var userPermissionGroups = userData.permissionGroupIds;
    if (userPermissionGroups != "") {
        var userPermissionGroupArray = userPermissionGroups.split('|');
        if (userPermissionGroupArray.includes("A739A97236BB424ABEA283D3F43EBF24") || userPermissionGroupArray.includes("permissiongroup idler buraya eklenecek")) {
            // kullanici ekledigin yetki grubunlarından herhangi birine sahipse buraya girer
            $('label[for=7C0CA8FF7BE4403F8427FE13D3790085]').closest('td').hide(); // gizlenecek field idsi
            $('label[for=5000ECEAFDA0489F9D659449B7FEB4C6]').closest('td').show(); //gösterilecek field idsi
            $('#btnImzabaslat').show(); //br butonları
            $('#gizlenecekbutonid').hide(); //br butonları
        } else {

        }
    }

});