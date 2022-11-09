$(function() {
    //var filtreId = $('#ViewFilterPublicId').val();
    var filterName = $('#FilterButtonWrapper span').text();
    var fileName = "";
    if (filterName.includes('Takibe Alınan Cihazlar Listesi')) {
        $('.well .pull-right:eq(0)').prepend('<a id="btnExcelMercedes" class="btn btn-sm btn-success pull-left"  style="margin-right:10px;"><i class="fas fa-fw fa-2xl fa-file-excel"></i>Excel Al</a>');
        fileName = "Takibe Alınan Cihazlar Listesi";
    } else if (filterName.includes('Tümü')) {
        $('.well .pull-right:eq(0)').prepend('<a id="btnExcelMercedes" class="btn btn-sm btn-success pull-left"  style="margin-right:10px;"><i class="fas fa-fw fa-2xl fa-file-excel"></i>Excel Al</a>');
        fileName = "Tüm Cihaz Listesi";
    } else if (filterName.includes('Aktif Cihaz Kapsamı')) {
        $('.well .pull-right:eq(0)').prepend('<a id="btnExcelMercedes" class="btn btn-sm btn-success pull-left"  style="margin-right:10px;"><i class="fas fa-fw fa-2xl fa-file-excel"></i>Excel Al</a>');
        fileName = "Aktif Cihaz Kapsamı Listesi";
    }
    // if (filtreId == '873FDD4124E343EDBE8EF0221CCDC7E1' || filtreId == "5D7E7F6B58BB4B379C654FFBDAEC54AB" || filtreId == "84620E952CBE4698BB295FDB61C001F9") {
    //     $('.well .pull-right:eq(0)').prepend('<a id="btnExcelMercedes" class="btn btn-sm btn-success pull-left"  style="margin-right:10px;"><i class="fas fa-fw fa-2xl fa-file-excel"></i>Excel Al</a>');
    var recordListTopluTeklifExcel = [];

    $('body').on('click', '#btnExcelMercedes', function() {
        var isExistTeklifExcel = false;
        var chcListTeklif = $('.sec');
        $.each(chcListTeklif, function(i, el) {
            if ($(this).prop('checked')) {
                isExistTeklifExcel = true;
                var recordId = $(this).parents('tr').attr('data-id');
                recordListTopluTeklifExcel.push(recordId);
            }
        });
        if (!isExistTeklifExcel) {
            alert("Bu işlemi gerçekleştirmek için en az bir kayıt seçmelisiniz.");
        } else {
            $('#modalLoadingHExcel').remove();
            window.setModal.Create({
                id: 'modalLoadingHExcel',
                html: {
                    header: 'Excel Al',
                    body: '<div id="txt" style="margin:0 0 5px; width: 100%;"></div>' +
                        '<style>.call-animation{background:#fff;width:135px;text-align: center;font-size: 16px;height:135px;position:relative;margin:0 auto;border-radius:100%;border:solid 5px #82b74b;animation:play 2s ease infinite;-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden;-ms-backface-visibility:hidden;backface-visibility:hidden}.call-animation i{font-size: 80px;display: flex;justify-content: center;margin-top: 19px;}@keyframes play{0%{transform:scale(1)}15%{box-shadow:0 0 0 5px ##82b74b}25%{box-shadow:0 0 0 10px #82b74b,0 0 0 20px #82b74b}25%{box-shadow:0 0 0 15px #82b74b,0 0 0 30px #82b74b}}</style><div class="call-animation"><i class="fa fa-file-excel img-circle" style="color:#82b74b"></i></div><br><div id="msg" style="margin:10px 0 0 0;text-align:center;">Excel oluşturuluyor, lütfen bekleyiniz...</div>',
                    footer: ''
                },
            });
            $('#modalLoadingHExcel').modal('toggle');
            // if (filtreId == "873FDD4124E343EDBE8EF0221CCDC7E1") {
            //     fileName = "Takibe Alınan Cihazlar Listesi";
            // } else if (filtreId == "5D7E7F6B58BB4B379C654FFBDAEC54AB") {
            //     fileName = "Tüm Cihaz Listesi";
            // } else if (filtreId == "84620E952CBE4698BB295FDB61C001F9") {
            //     fileName = "Aktif Cihaz Kapsamı Listesi";
            // }
            var data = {
                CustomObjectId: $('#CustomObjectPublicId').val(),
                UserId: userData.id,
                FileName: fileName,
                Fields: recordListTopluTeklifExcel,
            }
            var url = 'https://webapi-inklab.tr152.corpintra.net/api/data/TeklifAlExcelIndir';
            $.post(url, data, function(r) {
                if (r.Status) {
                    window.location = 'https://webapi-inklab.tr152.corpintra.net/api/data/getFile?fileName=' + r.DocName;
                    $('#modalLoadingHExcel').modal('toggle');
                } else {
                    $('.call-animation').hide()
                    $('#msg').hide()
                    setUtil.alert({
                        container: '#modalLoadingHExcel .modal-body #txt',
                        message: r.Message,
                        alertClass: 'alert-danger',
                        autoClose: false
                    });
                }
            });
        }
    });
    //}
});