$(function() {
    $('.pull-right').prepend('<a id="btnTeklifKopyala" class="btn btn-sm btn-primary"  style="margin-right:10px;" >Teklif Kopyala</a>');
    $('body').on('click', '#btnTeklifKopyala', function() {
        $('#modalTeklif').remove();
        window.setModal.Create({
            id: 'modalTeklif',
            html: {
                content: 'style="width:900px !important"',
                header: 'Teklif Kopyala',
                body: '<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>',
                footer: '<button type="button" class="btn btn-sm btn-default" data-dismiss="modal">İptal Et</button>',
            }
        });
        $('#modalTeklif .modal-dialog').css('height', '50%');
        $('#modalTeklif').modal('toggle');

        var data = {
            RecordId: $('#RecordPublicId').val()
        }
        var url = 'https://templateprocess.setcrm.com/api/AirPlus/TeklifKopyala?recordId=' + data.RecordId;
        var url2 = 'http://localhost:52129/api/AirPlus/TeklifKopyala?recordId=' + data.RecordId;
        $.get(url2, data, function(r) {
            if (r.Status) {
                $('#txt').hide();
                setUtil.alert({
                    container: '#modalTeklif .modal-body #msg',
                    message: r.Message,
                    alertClass: 'alert-success',
                    autoClose: false
                });

                $('#modalTeklif .modal-body').append(String.format('<a href="https://maya.setcrm.com/set/teklif/detail/{0}" target="_blank" class="btn btn-primary btn-sm"><i class="fas fa-external-link-alt"></i> Görüntüleme</a>', r.NewOfferRecordId));
            } else {
                $('#txt').hide();
                setUtil.alert({
                    container: '#modalTeklif .modal-body #msg',
                    message: r.Message,
                    alertClass: 'alert-danger',
                    autoClose: false
                });
            }
        });
    });


});