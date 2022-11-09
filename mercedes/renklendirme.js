$(function() {
    var nowDate = moment();
    var vfID = $('#ViewFilterPublicId').val();
    if (vfID == '873FDD4124E343EDBE8EF0221CCDC7E1') {
        $(".table-bordered thead tr").each(function(i, v) {
            $(v).find('th[data-id=5A96B54CF9DA4E6A9C9E44CED9D70799]').hide();
        });
        $(".table-bordered tbody tr").each(function(i, v) {
            $(v).find('td[data-id=5A96B54CF9DA4E6A9C9E44CED9D70799]').hide();
        });
        $(".table-bordered tbody tr").each(function(i, v) {
            var rowDate = $(v).find('td[data-id=5A96B54CF9DA4E6A9C9E44CED9D70799]').data('value');
            var rowCihazKonumu = $(v).find('td[data-id=6434502A462D41E0B1BC84CB00B0EC58]').data('value');
            if (!String.isNullOrWhiteSpace(rowDate) && rowCihazKonumu != "15A27AF2A08F498AA27FBDD1B0511DC3") {
                rowDate = moment(rowDate, 'DD.MM.YYYY').format();
                var diff = nowDate.diff(rowDate, 'days', true);
                if (diff < 0) {
                    debugger;
                    if (diff >= -30 || diff <= 0) {
                        $(v).css('background-color', '#FFFB81');
                    }
                } else {
                    $(v).css('background-color', '#FF7456');
                }
            } else if (rowCihazKonumu == "15A27AF2A08F498AA27FBDD1B0511DC3") {
                $(v).css('background-color', '#7aff91');
            }
        });
    }
});
$(function() {
    var filterName = $('#FilterButtonWrapper span').text();
    var nowDate = moment();
    // var vfID = $('#ViewFilterPublicId').val();
    if (filterName == 'Takibe Alınan Cihazlar Listesi') {
        $(".table-bordered thead tr").each(function(i, v) {
            $(v).find('th[data-id=5A96B54CF9DA4E6A9C9E44CED9D70799]').hide();
        });
        $(".table-bordered tbody tr").each(function(i, v) {
            $(v).find('td[data-id=5A96B54CF9DA4E6A9C9E44CED9D70799]').hide();
        });
        $(".table-bordered tbody tr").each(function(i, v) {
            var rowDate = $(v).find('td[data-id=5A96B54CF9DA4E6A9C9E44CED9D70799]').data('value');
            var rowCihazKonumu = $(v).find('td[data-id=6434502A462D41E0B1BC84CB00B0EC58]').data('value');
            if (!String.isNullOrWhiteSpace(rowDate) && rowCihazKonumu != "15A27AF2A08F498AA27FBDD1B0511DC3") {
                rowDate = moment(rowDate, 'DD.MM.YYYY').format();
                var diff = nowDate.diff(rowDate, 'days', true);
                if (rowCihazKonumu == "9F69886C3CD84472B4EB50C2F2B0D291" || rowCihazKonumu == "39F4C65F4DD64F88B2B4CEFCB37B0BE9") {
                    if (diff < 0) {
                        if (diff >= -30 || diff <= 0) {
                            $(v).css('background-color', '#FFFB81');
                        }
                    } else {
                        $(v).css('background-color', '#FF7456');
                    }
                }
            }
        });
    }
});