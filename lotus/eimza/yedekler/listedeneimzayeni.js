$(function() {
    // var url = '';
    // if (window.location.href.contains('lotuslab')) {
    //     url = 'https://lotuslabservice.setxrm.com';
    // } else {
    //     url = 'http://xrmserver:8086';
    // }
    if ($('#FilterId').val() === '3E199A13F9C742739BDC5F1A7B7C4BD3' || $('#FilterId').val() === '0EA243DAD5134BB0AAA6E2103F812DA5' || $('#FilterId').val() === '8031D291FD42486CBD0F18E73C3D334C' || $('#FilterId').val() === '0B5F9F7E9B4C45A28D99A5E7860E89FC') {
        $('.well .pull-right:eq(0)').prepend('<a id="eimzaOlusturYeni" class="btn btn-sm btn-danger " >E-imza Programına Gönder Yeni</a>');
        $('.table-bordered tbody tr').each(function(i, v) {
            // if ($(v).find('td[data-id=7E5414B1581541F99D0F10EE6B2FDB24]').data('value') !== "") {
            $(v).find('td:eq(0)').html('');
            $('<input />', { type: 'checkbox', value: name, checked: false }).appendTo($(v).find('td:eq(0)')).attr('data-id', $(v).data('id'));
            // }
        });
    }
    $('body').on('click', '#eimzaOlusturYeni', function() {
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
        //var url = 'https://neteswebapilocal.setcrm.com/api/data/TopluSertifikaImzala1YeniEtugra?imzalar=' + imzalar;
        var url = 'http://localhost:55910/api/templatelotus/TopluImzalaETugra?imzalar=' + imzalar;
        $('#modalEimza').modal('toggle');
        window.open(url);
    });
});