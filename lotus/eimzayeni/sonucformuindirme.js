$(function() {
    if ($('#LayoutPublicId').val() === '9374D4370BAF48F58536C854F817C23F') {
        var url = '';
        if (window.location.href.contains('lotuslab')) {
            url = 'https://lotuslabservice.setxrm.com';
        } else {
            url = 'http://xrmserver:8086';
        }
        $('.well .pull-right').prepend('<a id="btnSonucFormuKontrolIndir" class="btn btn-sm btn-success" ><i class="fa fa-file-excel-o"/> Analiz Sonuç Bildirim Formu İndir</a>');
        $('#btnSonucFormuKontrolIndir').on('click', function() {
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
                    var urls = String.format(url + "/api/TemplateLotus/SonucFormuKontrolIcin?recordId=" + recordId + '&lab=' + lab);
                    $.get(urls, function(data) {
                        if (data == null) {
                            $('#modalSonucBildirim').find('.modal-body').html("Excel İşlenemedi.");
                        } else {
                            var datass = data;
                            if (data == "Error") {
                                $('#modalSonucBildirim').find('.modal-body').html("Excel İşlenirken bir hata ile karşılaşıldı.");
                            } else {
                                $('#modalSonucBildirim').find('.modal-body').html("Başarılı.");
                                window.location = url + '/api/TemplateLotus/getFile?sistemNo=' + $('label[for=5C41720F11FA487894C3923CBDDEA4FC]').parent().data('value') + '&fileName=' + datass;
                            }
                            $('#modalSonucBildirim').show();
                        }
                    });
                } else {
                    alert('Laboratuvar Bulunamamıştır !');
                }
            });
        });
    }
});