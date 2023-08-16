$(function() {
    if ($('#LayoutPublicId').val() === '9374D4370BAF48F58536C854F817C23F') {
        var url = '';
        if (window.location.href.contains('lotuslab')) {
            url = 'https://lotuslabservice.setxrm.com';
        } else {
            url = 'http://xrmserver:8086';
        }
        $.get('/set/list/personel-analiz-yetkilendirme/?filter=7C8AF72CE4B54EB5A743BA99A773B063', function(data) {
            var elem = $('<div />').html(data);
            var musteriToplam = $(elem.find('#itemCount')[0]).text();
            if (parseFloat(musteriToplam) > 0) {
                $('.well .pull-right:eq(0)').prepend('<a id="btnSonucFormuVekileimza" class="btn btn-sm btn-danger" ><i class="fa fa-file-excel-o"/>Vekil İçin Sonuç Bildirim Formu Eimza Gönder</a>');
            }
        });
        $('body').on('click',
            '#btnSonucFormuVekileimza',
            function() {
                $.get(url + '/api/data/LabIdBul?user=' + userData.name + '&filterId=' + '3146395084E44DC09ED330989A7745CC', function(result) {
                    if (result.Message !== '') {
                        $('#modalSonucBildirim').remove();
                        $('body').append('<div class="modal fade in" id="modalSonucBildirim" tabindex="-1" style="display: none; padding-right: 17px;">' +
                            '<div class="modal-dialog" style=" width: 40%;">' +
                            '<div class="modal-content">' +
                            '<div class="modal-header">' +
                            '<a class="closeAktiviteRaporu" data-dismiss="modal" aria-hidden="true">×</a>' +
                            '<h4 class="modal-title"><i class="fa fa-hourglass-half"></i>Rapor İşleniyor </h4>' +
                            '</div>' +
                            '<div class="modal-body">Lütfen bekleyiniz.. <br/> <img src="/Public/img/loading_bar.gif"></div>' +
                            '<div class="modal-footer">' +
                            '<a id="closeAktiviteRaporu" class="btn btn-sm btn-danger">Kapat</a>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>');
                        $('#modalSonucBildirim').show();
                        $('.closeAktiviteRaporu, #closeAktiviteRaporu').click(function() {
                            $('#modalSonucBildirim').hide();
                        });
                        var lab = result.Message;
                        var recordId = $('#RecordPublicId').val();
                        var urls = String.format(url + "/api/TemplateLotus/SonucFormuSon?recordId=" + recordId + '&lab=' + lab);
                        $('#modalSonucBildirim').find('.modal-body').html("Lütfen e-imza listenizi kontrol ediniz.");
                        window.open(urls);
                    } else {
                        alert('Laboratuvar Bulunamamıştır !');
                    }
                });
            });
    }
});