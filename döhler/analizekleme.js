$(function() {
    $('body').on('lookupRelationLoadTriggerEvent', function(e, relationId) {
        if (relationId == '93744A13074A4C0BB1C2387074711FE4' || relationId == '5CF07948584F4A99933BAE1B557C736E') {
            var $relation = $(String.format('div[data-id={0}]', relationId));
            $relation.find('.btn-tablo-aktar, .btn-analiz-ekle').remove();
            $relation.prepend('<div><button type="button" class="btn btn-warning btn-sm pull-right btn-analiz-ekle" style="margin-right:5px;margin-top:2px;"><i class="fas fa-plus"></i> Analizleri Getir</button></div>');
        }
    });

    $('body').on('click',
        '.btn-analiz-ekle',
        function() {
            if ($('label[for=191D19E13C3E44A487099187704BC394]').parent().data('value').toLowerCase() === 'true') {
                alert('Analizler Getirildi. Tekrar Getiremezsiniz.')
            } else {
                $('#modalLoading').remove();
                window.setModal.Create({
                    id: 'modalLoading',
                    html: {
                        header: ' ',
                        body: '<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>',
                        footer: ''
                    }
                });
                $('#modalLoading').modal('toggle');
                var url = String.format('https://dohlerwebapi.setcrm.com/api/data/AnalizEkle?recordId={0}', $('#RecordPublicId').val()),
                    localurl = String.format('http://localhost:55073/api/data/AnalizEkle?recordId={0}', $('#RecordPublicId').val());

                $.get(url, function(r) {
                    if (r.Status) {
                        window.location.reload();
                    } else {
                        $('#modalLoading .modal-body').html(r.Message);
                    }
                });
            }
        });

    // $('body').on('click', '.btn-tablo-aktar', function () {
    //     $('#modalLoading').remove();
    //     window.setModal.Create({
    //         id: 'modalLoading',
    //         html: {
    //             header: ' ',
    //             body: '<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>',
    //             footer: ''
    //         }
    //     });
    //     $('#modalLoading').modal('toggle');
    //     var url = String.format('https://dohlerwebapi.setcrm.com/api/data/HtmlTablo?recordId={0}',
    //             $('#RecordPublicId').val()),
    //         localurl = String.format('http://localhost:55073/api/data/HtmlTablo?recordId={0}',
    //             $('#RecordPublicId').val());

    //     $.get(url,
    //         function (r) {
    //             if (r.Status) {
    //                 window.location.reload();
    //             } else {
    //                 $('#modalLoading .modal-body').html(r.Message);
    //             }
    //         });
    // });
});