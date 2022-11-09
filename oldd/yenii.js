$(function() {
    $('#modalKisiler1').remove();
    window.setModal.Create({
        id: 'modalKisiler1',
        html: {
            header: 'Firma Arama',
            body: '<div id="swapMessage" style="margin:0 0 5px"></div>' + '<tr id="trgiris1">' +
                '<td ><input id="izinliOnay" name="39C710BF0AA24B0694111D5020B7E531" type="select" value="" required="" tabindex="-1" title="Firma" style="display: none; margin-left: 2px"></td>',
            footer: '<button id="btnFirmaGetir" type="button" data-dismiss="modal" class="btn btn-sm btn-danger">Firma Getir</button>'
        }
    });


    if ($('#FilterId').val() === 'D73FC6EF902E4DCAA507D3AB20FC2A56' || $('#FilterId').val() === '70550F5DD2794DCDA92960E258B9967A' || $('#FilterId').val() === '0686474AB9DE4EBB925083DF9896118C') {
        $('.well .pull-right:eq(0)').prepend('<a id="btnFirmaAra" class="btn btn-sm btn-warning" >Firma Ara</a>');
    }
    $('#btnFirmaAra').on('click', function() {
        $('#modalKisiler1').modal('toggle');
        if ($(window).width() > 1500) {
            $('#modalKisiler1 .modal-content').css('width', '800px').css('height', '300px');
        }
        $('#btnFirmaGetir').attr('disabled', true);
        $('#modalKisiler1 .modal-body #swapMessage').html(' ');
        $('#modalKisiler1 .modal-body #swapMessage').append('<label style= "color:red">Yeni müşteri eklemeden önce firma ara buttonunu kullanarak ekleyecek olduğunuz firmayı kontrol ediniz. Arama sırasında müşterinin tüm adı yazılmak zorunda değildir. Örneğin Argeset Yazılım müşterisinin araması yapılırken "Arge" veya "Argeset" yazmak yeterli olacaktır.</label>');
        $('#modalKisiler1 .modal-body #swapMessage').append('<label>Aranacak Kelime : </label>').append($('<input/>', {
            'type': 'text',
            'id': 'ad',
            'name': 'txtswapno',
            'class': 'row',
            'width': '65%',
            'value': ''
        }));
        $('#ad').on('blur', function() {
            if ($('#ad').val().length > 2) {
                $('#btnFirmaGetir').attr('disabled', false);
            } else {
                $('#btnFirmaGetir').attr('disabled', true);
            }
        });
    });

    $('body').on('click', '#btnFirmaGetir', function() {

        $('#modalKisiler').remove();
        window.setModal.Create({
            id: 'modalKisiler',
            html: {
                header: 'Firmalar',
                body: '<div id="SubelerMesaj" style="margin:0 0 5px;width: 100%">' +
                    '<table id="tableSubeler" class="table table-striped table-hover">' +
                    '<thead>' +
                    '<tr>' +
                    '<th>Firma</th>' +
                    '<th>Detay</th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody></tbody>' +
                    '</table></td>',
                footer: '<button id="btnYeniMust" type="button" data-dismiss="modal" class="btn btn-sm btn-danger">Yeni Müşteri Oluştur</button>'
            }
        });



        var ad = $('#ad').val();
        $('#modalKisiler1').modal('hide');
        $('#modalKisiler').modal('toggle');
        if ($(window).width() > 1500) {
            $('#modalKisiler .modal-content').css('width', '800px');
        }
        $.get('https://templateprocess.setcrm.com/api/helmet/GetCompanies?deger=' + ad + '&coId=' + '9E0BD4212F974A00BED4A3C2D41E1BFC' + '&filterId=' + '5D1F1F9601B84C4E9D29674748A9FA09' + '&aramafieldId=' + '1D75F4BDF363412EA0F1A8103501F2B6', function(result) {
            if ($(result.documentElement).html() === 'false') {} else {
                if (result.Message === '') {
                    $('#tableSubeler').find('tbody').html('Aradığınız müşteri bulunamamıştır. Yeni müşteri eklemek için aşağıdaki butona tıklayınız.');
                } else {
                    var q = 0;
                    $('#tableSubeler').find('tbody').html('');
                    $('#modalKisiler .modal-body #SubelerMesaj').append('<label style= "color:blue">Yukarıdaki kayıtlar harici yeni müşteri eklemek için tıklayınız.. </label>');
                    $.each(result.Message.split(','), function(i, v) {
                        var newRow = $('<tr class="trdetay_' + q + '"/>');
                        newRow.append($('<td data-id="' + v.split('|')[0] + '"/><input style="display: none;">').text(v.split('|')[1]));
                        newRow.append($('<td/>')
                            .append($('<div/>', {
                                    'class': 'btn-group'
                                })
                                .append($('<a/>', {
                                    'data-id': v.split('|')[0],
                                    'target': '_blank',
                                    'class': 'btn btn-primary btn-actions btn-sm',
                                    'href': '/set/firma/detail/' + v.split('|')[0]
                                }).append('<i class="fas fa-external-link-alt"></i>'))
                            ));

                        $('#tableSubeler').find('tbody').append(newRow);
                        q = q + 1;
                    });
                }
            }
        });
    });
    $('body').on('click', '#btnYeniMust', function() {
        window.location.href = '/set/new/firma';
    });
});