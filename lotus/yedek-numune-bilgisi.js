$(function() {
    var url = '';
    if (window.location.href.contains('lotuslab')) {
        url = 'https://lotuslabservice.setxrm.com';
    } else {
        url = 'http://xrmserver:8086';
    }

    window.setModal.Create({
        id: 'modalKisiler',
        html: {
            header: 'Bilgiler',
            body: '<div id="SubelerMesaj" style="margin:0 0 5px;width: 100%">' +
                '<tr id="trAltParametreGrupgiris" style="width: 100%"><td id="tdAltParametreGrup" colspan="20"><table id="tableSubeler" class="table table-striped table-hover">' +
                '<thead>' +
                '<tr>' +
                '<th>Raporda Değerlendirme</th>' +
                '<th>Açıklama</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody></tbody>' +
                '</table></td>',
            footer: '<button id="btnKapat" type="button" class="btn btn-sm btn-info">Kapat</button>'
        }
    });

    $('.table tbody tr').find('td:last .btn-danger').closest('tr').each(function() {
        var numune = $(this);
        var publicid = numune.find('td:last a').attr("href").split('/')[4];
        $(this).find('td:eq(0)').html(' ');
        numune.find('td:eq(0)').prepend($('<a/>', {
            'href': "/formtemplate/get/?id=814FA60982AF46D195638BA71013A45B&coId=6B0A1857D3A14CD2B327B1EA69E85C72&recordId=" + publicid,
            'class': 'btn btn-warning btn-actions btn-sm',
            'style': 'margin-right:3px'
        }).text('Detay Formu'));
        $(this).find('td:eq(0)').prepend('<a id="numuneBilgi" class="btn btn-primary btn-actions btn-sm" style="margin-right: 8px;" >Numune Bilgisi</a>');
    });

    //      $('.table-responsive tbody tr').each(function () {


    //       });
    $('body').on('click', '#numuneBilgi', function() {
        var id = $(this).closest('tr').find('td:eq(1)').find('a').attr('href').split('/')[4];
        $.get(url + '/api/data/NumunedenBilgiGetir?ilgiliNumune=' + id, function(result) {
            $('#modalKisiler').modal('toggle');
            $('#modalKisiler #SubelerMesaj').find('tbody').html('');
            if ($(result.documentElement).html() === 'false') {
                $('#mesage1').html('Atama İşleminde Hata Oldu');
            } else {
                if (result.Message === '') {
                    $('#tableSubeler').find('tbody').html('Bilgiler Bulunamamıştır.');
                } else {
                    var q = 0;
                    $.each(result.Message.split(','), function(i, v) {
                        var newRow = $('<tr class="trdetay_' + q + '"/>');
                        newRow.append($('<td data-id=""/><input style="display: none;">').text(v.split('|')[0]));
                        newRow.append($('<td data-id=""/><input style="display: none;">').text(v.split('|')[1]));
                        $('#tableSubeler').find('tbody').append(newRow);
                        q = q + 1;
                    });
                }
            }
        });
    });
    $('body').on('click', '#btnKapat', function() {
        $('#modalKisiler').modal('hide');
    });
});