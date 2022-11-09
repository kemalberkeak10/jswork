//detay
$(function () {

    var d = $('label[for=2BA52957BE8B4C45A5D2FB35567FE819]').parent().data('publicids');
    if (d !== "" && d === "C280593BBDFE47C0BA6FBD0FA73DF131") {
    $('div[data-id=CA7390436F934D7D8C2CD40FAB304A15]').closest('td').hide();
    } else {
    $('div[data-id=CA7390436F934D7D8C2CD40FAB304A15]').closest('td').show();
    }
    
    var sartliKabul = $('label[for=83ED42FE73284EB2A5DAA02C510DA906]').parent().data('publicids');
    if (sartliKabul === "C5C7DB1E16F845EAAD7B940168292779") {
    $('[data-id="E9314822297F4DE387C817CDC55BA8E6"]').hide();
    } else {
    $('[data-id="E9314822297F4DE387C817CDC55BA8E6"]').show();
    }
    
    var numuneKabul = $('label[for=5000ECEAFDA0489F9D659449B7FEB4C6]').parent().data('publicids');
    
    
    if (numuneKabul == '4CE37A1548324846811E9A7FC850B732') {
    $($('.custom-panel').find('.panel-heading')).each(function (i, v) {
    var a = $(v).text().trim();
    if (a === 'Dış Laboratuvar Bilgileri' || a === 'Dış Laboratuvar Analizleri') {
    $(v).closest('td').hide();
    }
    
    });
    } else if (numuneKabul == 'FD08D623CFCB4EECA4C003E4C2D5043D') {
    //dış
    $($('.custom-panel').find('.panel-heading')).each(function (i, v) {
    var b = $(v).text().trim();
    if (b === 'İç Laboratuvar Bilgileri' || b === 'İç Laboratuvar Analizleri') {
    $(v).closest('td').hide();
    }
    });
    }

    var gonderimNedeni = $('label[for=866C7EAF865B4D3495660079CF3781B1]').parent().data('publicids');
    if(gonderimNedeni !== '5F5F70CFF8444BB5841BD1700AD028DD') {
        $('div[data-id=296E8C1BA68F4709A1506CB4CCCF8C5D]').closest('td').hide();
    }
    else {
        $('div[data-id=296E8C1BA68F4709A1506CB4CCCF8C5D]').closest('td').show();
    }
    
    });

//new
$(function () {

    $('body').on('change',
    '#2BA52957BE8B4C45A5D2FB35567FE819',
    function () {
    var id = $('#2BA52957BE8B4C45A5D2FB35567FE819').val();
    if (id !== "" && id === "C280593BBDFE47C0BA6FBD0FA73DF131") {
    $('#CA7390436F934D7D8C2CD40FAB304A15').parent().hide();
    } else {
    $('#CA7390436F934D7D8C2CD40FAB304A15').parent().show();
    }
    
    });
    $('body').on('change',
    '#83ED42FE73284EB2A5DAA02C510DA906',
    function() {
    if ($("#83ED42FE73284EB2A5DAA02C510DA906").val() == 'C5C7DB1E16F845EAAD7B940168292779') {
    $('[data-publicid="E9314822297F4DE387C817CDC55BA8E6"]').hide();
    $("#E9314822297F4DE387C817CDC55BA8E6").val('');
    
    } else {
    $('[data-publicid="E9314822297F4DE387C817CDC55BA8E6"]').show();
    }
    });
    $('body').on('change',
    '#5000ECEAFDA0489F9D659449B7FEB4C6',
    function() {
    if ($("#5000ECEAFDA0489F9D659449B7FEB4C6").val() == '4CE37A1548324846811E9A7FC850B732') {
        $($('.custom-panel').find('.panel-heading')).each(function (i, v) {
            var a = $(v).text().trim();
            if (a === 'Dış Laboratuvar Bilgileri' || a === 'Dış Laboratuvar Analizleri') {
            $(v).closest('td').hide();
            }
            
            });
    
    } else if ($("#5000ECEAFDA0489F9D659449B7FEB4C6").val() == 'FD08D623CFCB4EECA4C003E4C2D5043D') {
        $($('.custom-panel').find('.panel-heading')).each(function (i, v) {
            var b = $(v).text().trim();
            if (b === 'İç Laboratuvar Bilgileri' || b === 'İç Laboratuvar Analizleri') {
            $(v).closest('td').hide();
            }
            });
    }
    });

    $('body').on('change',
    '#866C7EAF865B4D3495660079CF3781B1',
    function() {
    if ($("#866C7EAF865B4D3495660079CF3781B1").val() !== '5F5F70CFF8444BB5841BD1700AD028DD') {
        $('#296E8C1BA68F4709A1506CB4CCCF8C5D').parent().hide();
    } else {
        $('#296E8C1BA68F4709A1506CB4CCCF8C5D').parent().show();
    }
    });
    $('#866C7EAF865B4D3495660079CF3781B1').trigger('change');
    });


//edit
$(function () {

    var d = $('#2BA52957BE8B4C45A5D2FB35567FE819').val();
    if (d !== "" && d === "C280593BBDFE47C0BA6FBD0FA73DF131") {
    $('#CA7390436F934D7D8C2CD40FAB304A15').parent().hide();
    } else {
    $('#CA7390436F934D7D8C2CD40FAB304A15').parent().show();
    }
    
    $('body').on('change',
    '#2BA52957BE8B4C45A5D2FB35567FE819',
    function () {
    var id = $('#2BA52957BE8B4C45A5D2FB35567FE819').val();
    if (id !== "" && id === "C280593BBDFE47C0BA6FBD0FA73DF131") {
    $('#CA7390436F934D7D8C2CD40FAB304A15').parent().hide();
    } else {
    $('#CA7390436F934D7D8C2CD40FAB304A15').parent().show();
    }
    
    });
    $('body').on('change',
    '#83ED42FE73284EB2A5DAA02C510DA906',
    function() {
    if ($("#83ED42FE73284EB2A5DAA02C510DA906").val() == 'C5C7DB1E16F845EAAD7B940168292779') {
    $('[data-publicid="E9314822297F4DE387C817CDC55BA8E6"]').hide();
    $("#E9314822297F4DE387C817CDC55BA8E6").val('');
    
    } else {
    $('[data-publicid="E9314822297F4DE387C817CDC55BA8E6"]').show();
    }
    });
    $('#83ED42FE73284EB2A5DAA02C510DA906').trigger('change');
    
    $('body').on('change','#5000ECEAFDA0489F9D659449B7FEB4C6',function() {
    if ($("#5000ECEAFDA0489F9D659449B7FEB4C6").val() == '4CE37A1548324846811E9A7FC850B732') {
        $($('.custom-panel').find('.panel-heading')).each(function (i, v) {
            var a = $(v).text().trim();
            if (a === 'Dış Laboratuvar Bilgileri' || a === 'Dış Laboratuvar Analizleri') {
            $(v).closest('td').hide();
            }
            
            });
    
    } else if ($("#5000ECEAFDA0489F9D659449B7FEB4C6").val() == 'FD08D623CFCB4EECA4C003E4C2D5043D') {
        $($('.custom-panel').find('.panel-heading')).each(function (i, v) {
            var b = $(v).text().trim();
            if (b === 'İç Laboratuvar Bilgileri' || b === 'İç Laboratuvar Analizleri') {
            $(v).closest('td').hide();
            }
            });
    }
    });
    $('#5000ECEAFDA0489F9D659449B7FEB4C6').trigger('change');

    $('body').on('change',
    '#866C7EAF865B4D3495660079CF3781B1',
    function() {
    if ($("#866C7EAF865B4D3495660079CF3781B1").val() !== '5F5F70CFF8444BB5841BD1700AD028DD') {
        $('#296E8C1BA68F4709A1506CB4CCCF8C5D').parent().hide();
    } else {
        $('#296E8C1BA68F4709A1506CB4CCCF8C5D').parent().show();
    }
    });
    $('#866C7EAF865B4D3495660079CF3781B1').trigger('change');
    
    });


    

