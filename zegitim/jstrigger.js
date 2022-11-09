$(function() {
    var filterName = $('#FilterButtonWrapper span').text();

    if (filterName == 'Tümü') {
        $(".table-bordered tbody tr").each(function(i, v) {
            var rowCihazKonumu = $(v).find('td[data-id=152F37799D9D4AF3BB7AD4586AFEA37B]').data('value');
            if (rowCihazKonumu == "3DC9B8597A6E4EB1ABF783631EBBDE6F" || rowCihazKonumu == "F0959ABDDD91465F8852FA10102A9CD8 ") {
                if (rowCihazKonumu == "1414315949B249D28A1B4FBBAA322748")
                    $(v).css('background-color', '#FFFB81');
            } else {
                $(v).css('background-color', '#FF7456');
            }
        });
    }
});