$(function() {
    $('.well .pull-right:eq(0)').prepend('<a id="btnExcelDownload" class="btn btn-sm btn-info"  style="margin-right:10px;" >Talep Formu</a>');

    $('body').on('click', '#btnExcelDownload', function() {
        var realUrl = String.format("https://kalibrasyonwebapi.thyteknik.com/api/data/GetTalepFormu?recordId={0}", $("#RecordPublicId").val());
        var testUrl = String.format("https://thywebapi.setcrm.com/api/data/GetTalepFormu?recordId={0}", $("#RecordPublicId").val());
        var localUrl = String.format("http://localhost:65474/api/data/GetTalepFormu?recordId={0}", $("#RecordPublicId").val());
        $.get(testUrl, function(r) {
            if (r.Status) {
                getFileExcel(r.ExcelPath);
            }
        });
    });

    function getFileExcel(fileName) {
        var localUrl = 'http://localhost:65474/api/data/GetFile?fileName=' + fileName;
        var testUrl = 'https://thywebapi.setcrm.com/api/data/GetFile?fileName=' + fileName;
        var realUrl = 'https://kalibrasyonwebapi.thyteknik.com/api/data/GetFile?fileName=' + fileName;
        window.open(testUrl, '_blank');
    }
});