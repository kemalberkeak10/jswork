$(function() {
    if ($('#LayoutPublicId').val() === '9374D4370BAF48F58536C854F817C23F') {
        var url = '';
        if (window.location.href.contains('lotuslab')) {
            url = 'https://lotuslabservice.setxrm.com';
        } else {
            url = 'http://xrmserver:8086';
        }
        $('.well .pull-right').prepend('<a id="btnSonucFormuEimza" class="btn btn-sm btn-warning" > Analiz Sonuç Bildirim Formu Eimza Gönder</a>');
        $('body').on('click', '#btnSonucFormuEimza', function() {
            $.get('/list/imza-listesi/?filter=F0BD916B6CAC4DB796B050C0D23B07C9', function(result) {
                var elem = $('<div />').html(result);
                var eimzaSurec = 0;
                var imzaTop = $(elem.find('#itemCount')[0]).text();
                if (imzaTop != "") {
                    eimzaSurec = imzaTop;
                }
                if (parseFloat(eimzaSurec) === 0) {
                    $.get(url + '/api/data/LabIdBul?user=' + userData.name + '&filterId=' + '2A8E00E92EA14793BD4D423C097B3048', function(result) {
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
                } else {
                    alert('E-imza bekleyen işleriniz vardır. Kontrol ediniz..');
                }
            });
        });
    }
});