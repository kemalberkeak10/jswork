$('.table-bordered tbody tr').each(function (i, v) {
    if ($(v).find('td:eq(0) input:checked').length > 0) {
    veri.push($(v).closest('tr').data('id'));
    if ($(v).closest('tr').find('td:eq(1)').find('a').length > 0) {
    firma.push($(v).closest('tr').find('td:eq(1)').find('a').justText());
    }
    else {
    firma.push($(v).closest('tr').find('td:eq(1)').justText());
    }
    }
    });