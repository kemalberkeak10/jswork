$('#mySelect2').trigger('change'); 

$(['data-id=663DD58F66B04DF29C4E0B880A4A7CE3']).parent().data();


var permissionGroup = userData.permissionGroupIds.split('|');
   permissionGroup.forEach(element => {
       if(element.includes('60EF5C52265A478FB3765E63900A6EEF')){
        $('[data-publicid=83B9DA455B2F4E409A9AC9611B044244]').hide();
        $('[data-publicid=966E755346864330A3D8153CD587B29A]').hide();
       }
       else{
        $('[data-publicid=83B9DA455B2F4E409A9AC9611B044244]').show();
        $('[data-publicid=966E755346864330A3D8153CD587B29A]').show();
       }
   });