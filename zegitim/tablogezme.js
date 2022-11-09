    $(function() {
        var datas = $('.table-bordered tbody tr');
        if (datas.length > 0) {
            datas.each(function(i, v) {
                var urunTipi = $(v).find('td[data-id=82E2FCF1E737478E90A93F1946E6D2B9]');
                //var yakitLimitDeger = parseFloat(yakitLimitiTd[0].innerText);
                var tur = $(v).find('td[data-id=2EE1842C98F14CDB9DB9C59596E1DCD6]');
                var turVal = tur.text();

                var id = $(v).closest('tr').data('id');
                var text = $(v).closest('tr').data('id');
                console.log(id);
                if (turVal == "REG") {
                    // tur.css('color', 'red');
                    $(this).closest('tr').find('a').css('color', 'blue'); //kutuyu
                    // $(this).closest('tr').css('background-color', 'red').css('color', 'yellow'); //satırı
                    $(this).closest('tr').css('color', 'yellow');
                }
            });
        }

    });


    $(function() {
        $(".table-bordered tbody tr td").filter(function() {
            if ($(this).text().trim() === 'A') {
                // $(this).closest('tr').css('background-color', 'red');
                $(this).css('background-color', '#2196f3');
            } else if ($(this).text().trim() === 'G') {
                $(this).css('background-color', '#fb8c00');
                // $(this).closest('tr').css('background-color', 'red');
            } else if ($(this).text().trim() === 'N') {
                $(this).css('background-color', '#ab47bc');
            } else if ($(this).text().trim() === 'İ') {
                $(this).css('background-color', '#f44336');
            }
        }).parent('tr').css('color', 'red');
    });