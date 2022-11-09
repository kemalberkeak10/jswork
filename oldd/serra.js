$('.pull-right').prepend('<a id="btnIskontoHesapla" class="btn btn-sm btn-warning"  style="margin-right:10px;" >Hesaplama</a>');
$('body').on('click', '#btnIskontoHesapla', function() {
    $('#modelIskonto').remove();
    window.setModal.Create({
        id: 'modelIskonto',
        html: {
            content: 'style="width:900px !important"',
            header: 'Hesapla',
            body: '<div id="msg" style="margin:0 23px 5px; width: 80%;font-size:15px;"></div>' +
                '<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>',
            footer: '<button type="button" class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>'
        }
    });
    $('#modelIskonto').modal('toggle');
    var data = {
        RecordId: $('#RecordPublicId').val(),
    }
    var url = 'https://maya.setcrm.com/api/data/IskontoHesaplama?recordId=' + RecordId;
    var url2 = 'http://localhost:64038/api/data/IskontoHesaplama?recordId=' + RecordId;

    $.get(url2, data, function(r) {
        if (r.Status) {
            $('#modelIskonto').modal('toggle');
            location.reload();
        } else {
            setUtil.alert({
                container: '#modelIskonto .modal-body #msg',
                message: r.Message,
                alertClass: 'alert-danger',
                autoClose: true
            });
        }
    });
});