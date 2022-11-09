$(function () {

    var d = $('label[for=2BA52957BE8B4C45A5D2FB35567FE819]').parent().data('publicids');
    if (d !== "" && d === "C280593BBDFE47C0BA6FBD0FA73DF131") {
    $('div[data-id=CA7390436F934D7D8C2CD40FAB304A15]').closest('td').hide();
    } else if (d === "C280593BBDFE47C0BA6FBD0FA73DF131") {
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
    $('.panel-lookup[data-id=159B1679F04E4412ADA9D7A79045646A]').closest('tr').hide();
    $('div[id=0E99B32607804E1092BC275D9968896B]').parent().hide();
    } else if (numuneKabul == 'FD08D623CFCB4EECA4C003E4C2D5043D') {
    $('.panel-lookup[data-id=93744A13074A4C0BB1C2387074711FE4]').closest('tr').hide(); //iç
    $('div[id=CE6833209FDC4E9D990C8CA7AD7A48CB]').parent().hide();
    }
    });

    //new 

    $(function () {

        $('body').on('change',
        '#2BA52957BE8B4C45A5D2FB35567FE819',
        function () {
        var id = $('#2BA52957BE8B4C45A5D2FB35567FE819').val();
        if (id !== "" && id === "521B620352884572A2DD80A9D7ED9786") {
        $('#CA7390436F934D7D8C2CD40FAB304A15').parent().hide();
        } else if (id === "C280593BBDFE47C0BA6FBD0FA73DF131") {
        $('#CA7390436F934D7D8C2CD40FAB304A15').parent().show();
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
        $('.panel-lookup[data-id=159B1679F04E4412ADA9D7A79045646A]').closest('tr').hide();
        $('div[id=0E99B32607804E1092BC275D9968896B]').parent().hide();
        
        } else if ($("#5000ECEAFDA0489F9D659449B7FEB4C6").val() == 'FD08D623CFCB4EECA4C003E4C2D5043D') {
        $('.panel-lookup[data-id=93744A13074A4C0BB1C2387074711FE4]').closest('tr').hide(); //iç
        $('div[id=CE6833209FDC4E9D990C8CA7AD7A48CB]').parent().hide();
        }
        });
        
        });

        //update

        $(function () {

            var d = $('#2BA52957BE8B4C45A5D2FB35567FE819').val();
            if (d !== "" && d === "521B620352884572A2DD80A9D7ED9786") {
            $('#CA7390436F934D7D8C2CD40FAB304A15').parent().hide();
            } else if (d === "C280593BBDFE47C0BA6FBD0FA73DF131") {
            $('#CA7390436F934D7D8C2CD40FAB304A15').parent().show();
            } else {
            $('#CA7390436F934D7D8C2CD40FAB304A15').parent().show();
            }
            
            $('body').on('change',
            '#2BA52957BE8B4C45A5D2FB35567FE819',
            function () {
            var id = $('#2BA52957BE8B4C45A5D2FB35567FE819').val();
            if (id !== "" && id === "521B620352884572A2DD80A9D7ED9786") {
            $('#CA7390436F934D7D8C2CD40FAB304A15').parent().hide();
            } else if (id === "C280593BBDFE47C0BA6FBD0FA73DF131") {
            $('#CA7390436F934D7D8C2CD40FAB304A15').parent().show();
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
            
            $('body').on('change',
            '#5000ECEAFDA0489F9D659449B7FEB4C6',
            function() {
            if ($("#5000ECEAFDA0489F9D659449B7FEB4C6").val() == '4CE37A1548324846811E9A7FC850B732') {
            $('.panel-lookup[data-id=159B1679F04E4412ADA9D7A79045646A]').closest('tr').hide();
            $('div[id=0E99B32607804E1092BC275D9968896B]').parent().hide();
            
            } else if ($("#5000ECEAFDA0489F9D659449B7FEB4C6").val() == 'FD08D623CFCB4EECA4C003E4C2D5043D') {
            $('.panel-lookup[data-id=93744A13074A4C0BB1C2387074711FE4]').closest('tr').hide(); //iç
            $('div[id=CE6833209FDC4E9D990C8CA7AD7A48CB]').parent().hide();
            }
            });
            $('#5000ECEAFDA0489F9D659449B7FEB4C6').trigger('change');
            
            });