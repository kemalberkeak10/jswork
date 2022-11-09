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
            if (!String.isNullOrWhiteSpace(rowDate)) {
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
            }

        });
    }
});