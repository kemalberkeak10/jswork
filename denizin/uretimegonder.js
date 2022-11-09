$(function() {
    $('body').on('lookupRelationLoadTriggerEvent', function(e, relationId) {
        if (relationId === '9B2A92D690244D4AA44AD4DA07C61936') {
            var $relation = $(String.format('div[data-id={0}]', relationId));
            $relation.find('.btn-uretime-gonder').remove();
            $relation.prepend('<div><button type="button" class="btn btn-info btn-sm pull-right btn-uretime-gonder" style="margin-right:5px;margin-top: 2px;"><i class="fas fa-plus"></i>Seçilenleri Üretime Gönder</button></div>');
        }
    });
    $('body').on('click',
        '.btn-uretime-gonder',
        function() {
            $('#modalUretimeGonderLoading').remove();
            window.setModal.Create({
                id: 'modalUretimeGonderLoading',
                html: {
                    header: ' ',
                    body: '<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>',
                    footer: ''
                }
            });
            $('#modalUretimeGonderLoading').modal('toggle');
            var recordId = $('#RecordPublicId').val();
            var url = 'https://templateprocess.setcrm.com/api/dataDenizin/UretimeGonder?recordId=' + recordId;
            var localurl = 'http://localhost:52129/api/dataDenizin/UretimeGonder?recordId=' + recordId;
            $.get(url, function(r) {
                if (r.Status) {
                    notify('success', 'İşlem Başarılı . Sayfa yenileniyor lütfen bekleyiniz...');
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                } else {
                    notify('danger', r.Message + 'Sayfa yenileniyor lütfen bekleyiniz...');
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                }
            });
        });

    function notify(type, message) {
        $.notify({
            icon: type === "success" ? 'fas fa-check-double' : 'fas fa-times-circle',
            message: message
        }, {
            z_index: '9999999',
            type: type,
            placement: {
                from: "top",
                align: "right"
            },
            offset: 50,
            animate: {
                enter: 'animated flipInY',
                exit: 'animated flipOutX'
            },
        });
    }
});


$(function() {
    $('body').on('lookupRelationLoadTriggerEvent', function(e, relationId) {
        if (relationId === '9B2A92D690244D4AA44AD4DA07C61936') {
            var urunlerRelation = $(String.format('div[data-id={0}]', relationId));
            urunlerRelation.find('.table tbody tr').each(function() {
                var $tr = $(this);
                var depoIstekTd = $tr.find('td:eq(4)');
                var sevkTd = $tr.find('td:eq(5)');
                var depoVal = parseFloat(depoIstekTd.text().replace(',', '.'));
                var sevkVal = parseFloat(sevkTd.text().replace(',', '.'));
                if (depoVal < sevkVal) {
                    depoIstekTd.css('background-color', 'red');
                }
            });
        }
    });
});

// $('div[data-id=9B2A92D690244D4AA44AD4DA07C61936]').find('.table tbody tr');