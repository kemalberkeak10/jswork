$(function() {
    $('.pull-right').prepend('<a id="btnKesifKopyala" class="btn btn-sm btn-primary"  style="margin-right:10px;" >Keşif Kopyala</a>');
    $('body').on('click', '#btnKesifKopyala', function() {
        $('#modalKesif').remove();
        window.setModal.Create({
            id: 'modalKesif',
            html: {
                content: 'style="width:900px !important"',
                header: 'Keşif Kopyala',
                body: '<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>',
                footer: '<button id="btnKapat" type="button" class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>',
            }
        });
        $('#modalKesif .modal-dialog').css('height', '50%');
        $('#modalKesif').modal('toggle');

        var data = {
            RecordId: $('#RecordPublicId').val(),
        }

        var url2 = 'http://localhost:11174/api/data/KesifKopyala?recordId=' + data.RecordId;
        $.get(url2, data, function(r) {
            if (r.Status) {
                $('#txt').hide();
                setUtil.alert({
                    container: '#modalKesif .modal-body #msg',
                    message: r.Message,
                    alertClass: 'alert-success',
                    autoClose: true
                });
                $('#modalKesif .modal-body').append(String.format('<a href="https://maya.setcrm.com/set/kesif/detail/{0}" target="_blank" class="btn btn-primary btn-sm"><i class="fas fa-external-link-alt"></i> Görüntüleme</a>', r.NewOfferRecordId));
            } else {
                $('#txt').hide();
                setUtil.alert({
                    container: '#modalKesif .modal-body #msg',
                    message: r.Message,
                    alertClass: 'alert-danger',
                    autoClose: false
                });
            }
        });
        $('body').on('click',
            'btnKapat',
            function() {
                window.location.reload();
            })
    });
});