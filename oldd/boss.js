$(function() {
    $('.well .pull-right:eq(0)').prepend('<a id="btnBaslatEgitim" class="btn btn-sm btn-success"  style="margin-right:10px;" >Test Eğitim</a>');
    window.setModal.Create({
        id: 'modalEgitimBilgi',
        html: {
            header: 'Test Eğitim',
            body: '<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>',
            footer: '<button class="btn btn-sm btn-default" data-dismiss="modal" >Kapat</button>'
        }
    });

    $('body').on('click', '#btnBaslatEgitim', function() {

        var recordPublicId = $('#RecordPublicId').val();

        $('#modalEgitimBilgi').modal('toggle');
        var localurl = "http://localhost:11174/api/data/AsansorRecord?recordId=" + recordPublicId;
        $.get(localurl, function(result) {
            if (result.Status) {
                window.location.reload(true);
            } else {
                $('#modalEgitimBilgi .modal-body').html('');
                $('#modalEgitimBilgi .modal-body').html(result.Message);
            }
        });
    });
});