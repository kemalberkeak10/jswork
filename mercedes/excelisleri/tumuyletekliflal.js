$(function() {
    var topluFiltreId = $('#ViewFilterPublicId').val();
    if (topluFiltreId == '873FDD4124E343EDBE8EF0221CCDC7E1' || topluFiltreId == "5D7E7F6B58BB4B379C654FFBDAEC54AB" || topluFiltreId == "84620E952CBE4698BB295FDB61C001F9") {
        $('.well .pull-right:eq(0)').prepend('<a id="btnTopluExcel" class="btn btn-sm btn-success pull-left"  style="margin-right:10px;"><i class="fas fa-fw fa-2xl fa-file-excel"></i> Tümünü Excel Al</a>');

        var fileName = "";
        $('body').on('click', '#btnTopluExcel', function() {
            $('#modalAllRecordsLoadingExcel').remove();
            window.setModal.Create({
                id: 'modalAllRecordsLoadingExcel',
                html: {
                    header: 'Tümüyle Excel Al',
                    body: '<div id="txt" style="margin:0 0 5px; width: 100%;"></div>' +
                        '<style>.call-animation{background:#fff;width:135px;text-align: center;font-size: 16px;height:135px;position:relative;margin:0 auto;border-radius:100%;border:solid 5px #82b74b;animation:play 2s ease infinite;-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden;-ms-backface-visibility:hidden;backface-visibility:hidden}.call-animation i{font-size: 80px;display: flex;justify-content: center;margin-top: 19px;}@keyframes play{0%{transform:scale(1)}15%{box-shadow:0 0 0 5px ##82b74b}25%{box-shadow:0 0 0 10px #82b74b,0 0 0 20px #82b74b}25%{box-shadow:0 0 0 15px #82b74b,0 0 0 30px #82b74b}}</style><div class="call-animation"><i class="fa fa-file-excel img-circle" style="color:#82b74b"></i></div><br><div id="msg" style="margin:10px 0 0 0;text-align:center;">Excel oluşturuluyor, lütfen bekleyiniz...</div>',
                    footer: ''
                },
            });
            $('#modalAllRecordsLoadingExcel').modal('toggle');
            if (topluFiltreId == "873FDD4124E343EDBE8EF0221CCDC7E1") {
                fileName = "Takibe Alınan Cihazlar Listesi";
            } else if (topluFiltreId == "5D7E7F6B58BB4B379C654FFBDAEC54AB") {
                fileName = "Tüm Cihaz Listesi";
            } else if (topluFiltreId == "84620E952CBE4698BB295FDB61C001F9") {
                fileName = "Aktif Cihaz Kapsamı Listesi";
            }
            var data = {
                vfId: topluFiltreId,
                fileName: fileName,
            }
            var url = 'https://webapi-inklab.tr152.corpintra.net/api/data/TumuyleTeklifAlExcelIndir?vfId=' + data.vfId + "&fileName=" + data.fileName;
            $.post(url, data, function(r) {
                if (r.Status) {
                    window.location = 'https://webapi-inklab.tr152.corpintra.net/api/data/getFile?fileName=' + r.DocName;
                    $('#modalAllRecordsLoadingExcel').modal('toggle');
                } else {
                    $('.call-animation').hide()
                    $('#msg').hide()
                    setUtil.alert({
                        container: '#modalAllRecordsLoadingExcel .modal-body #txt',
                        message: r.Message,
                        alertClass: 'alert-danger',
                        autoClose: false
                    });
                }
            });
        });
    }
});