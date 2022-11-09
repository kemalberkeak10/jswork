$(function() {
    $('.well .pull-right:eq(0)').prepend('<a id="btnFormOlustur" class="btn btn-sm btn-success"  style="margin-right:10px;"><i class="fa fa-file" aria-hidden="true"></i> Form Oluştur</a>');
    $('body').on('click', '#btnFormOlustur', function() {
        $('#modalSablon').remove();
        window.setModal.Create({
            id: 'modalSablon',
            html: {
                header: '<i class="fa fa-file"></i> Form Oluştur',
                body: '<div id="msg"> </div>' +
                    '<style>.call-animation{background:#1f8acb;width:135px;text-align: center;font-size: 16px;height:135px;position:relative;margin:0 auto;border-radius:100%;border:solid 5px #1F8ACB;animation:play 2s ease infinite;-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden;-ms-backface-visibility:hidden;backface-visibility:hidden}.call-animation i{font-size: 80px;display: flex;justify-content: center;margin-top: 19px;}@keyframes play{0%{transform:scale(1)}15%{box-shadow:0 0 0 5px #1F8ACB}25%{box-shadow:0 0 0 10px #1F8ACB,0 0 0 20px #1F8ACB}25%{box-shadow:0 0 0 15px #1F8ACB,0 0 0 30px #1F8ACB}}</style><div class="call-animation"><i class="fa fa-file-word img-circle" style="color:white;"></i></div><br><div id="response-message" style="margin:10px 0 0 0;" class="text-center">Form oluşturuluyor, lütfen bekleyiniz...</div>',
                footer: '<button type="button" class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>'
            }
        });
        // $('#modalSablon .modal-dialog').css('width', '25%');
        $('#modalSablon .modal-body').css('height',
            'auto');
        $('.modal-footer').hide();
        $('#modalSablon').modal('toggle');
        var lokasyonTipi = $('label[for=F8DFD79106C44812A06BCA46DE4B34B6]').parent().data('publicids');
        var recordId = $('#RecordPublicId').val();
        var localUrl = "https://localhost:44305/api/data/FormOlusturAlacati?recordId=" + recordId + "&dosyaTipi=" + dosyaTipi + "&odemeSekli=" + odemeSekli;
        var realurl = "https://nefwebapi.setcrm.com/api/data/FormOlusturAlacati?recordId=" + recordId + "&dosyaTipi=" + dosyaTipi + "&odemeSekli=" + odemeSekli;
        $.get(realurl, function(r) {
            $('#txt').hide();
            if (r !== null) {

                $.get('https://nefwebapi.setcrm.com/api/Data/getFile?fileName=' + v + '&isPermission=' + isPermission, function(r) {
                    if (r.success) {
                        window.open(r.result.filePath, '_blank');
                        $('#modalSablon').toggle();
                    } else {
                        $('#msg').html('<div class="alert alert-danger">' + r.message + '</div>');
                    }
                });

            }
        });
    });
});