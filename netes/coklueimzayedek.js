$(function() {
    if (filter === "56BEAEC24BF640E3B33F5A990C2AF783") {
        $('.well .pull-right:eq(0)').prepend('<a id="eimzaOlustur" class="btn btn-sm btn-danger " >E-imza Gönder</a>');
        $('.table-bordered tbody tr').each(function(i, v) {
            if ($(v).find('td[data-id=7E5414B1581541F99D0F10EE6B2FDB24]').data('value') !== "") {
                $(v).find('td:eq(0)').html('');
                $('<input />', { type: 'checkbox', value: name, checked: false }).appendTo($(v).find('td:eq(0)')).attr('data-id', $(v).data('id'));
            }
        });
    }
    $('body').on('click', '#eimzaOlustur', function() {
        var imzalar = [];
        $('#modalEimza').remove();
        window.setModal.Create({
            id: 'modalEimza',
            html: {
                header: 'İşlem Bilgisi',
                body: 'İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif">',
                footer: ''
            }
        });
        $('#modalEimza').modal('toggle');
        $('.table-bordered tbody tr').find('td:eq(0) input:checked').each(function(i, v) {
            imzalar.push($(v).closest('tr').data('id'));
        });
        var url = 'https://neteswebapilocal.setcrm.com/api/data/TopluSertifikaImzala1?imzalar=' + imzalar;
        //var url = 'http://localhost:58305/api/data/TopluSertifikaImzala1?imzalar=' + imzalar;
        $('#modalEimza').modal('toggle');
        window.open(url);
    });
    if (filter === "6E8A6C695AE04B82A941664B8B96A51E") {
        $('.well .pull-right:eq(0)').prepend('<a id="eimzaOlustur2" class="btn btn-sm btn-danger " >E-imza Gönder</a>');
        $('.table-bordered tbody tr').each(function(i, v) {
            if ($(v).find('td[data-id=40464FFA0B3945C6A180A8746CDD742B]').data('value') !== "") {
                $(v).find('td:eq(0)').html('');
                $('<input />', { type: 'checkbox', value: name, checked: false }).appendTo($(v).find('td:eq(0)')).attr('data-id', $(v).data('id'));
            }
        });
    }
    $('body').on('click', '#eimzaOlustur2', function() {
        var imzalar = [];
        $('#modalEimza').remove();
        window.setModal.Create({
            id: 'modalEimza',
            html: {
                header: 'İşlem Bilgisi',
                body: 'İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif">',
                footer: ''
            }
        });
        $('#modalEimza').modal('toggle');
        $('.table-bordered tbody tr').find('td:eq(0) input:checked').each(function(i, v) {
            imzalar.push($(v).closest('tr').data('id'));
        });
        // var url = 'https://neteswebapilocal.setcrm.com/api/data/TopluSertifikaImzala2?imzalar=' + imzalar;
        var url = 'https://neteswebapilocal.setcrm.com/api/data/TopluSertifikaImzala2?imzalar=' + imzalar;
        $('#modalEimza').modal('toggle');
        window.open(url);
    });
});