$(function() {

    $(String.format('div[id={0}]', "D11016A697FB406294A62F9D8832E0CF")).closest('div').prepend('<button type="button" id="btnTopluNumune" class="btn btn-info btn-sm pull-right" style="margin-right:5px;margin-top:2px;"><i class="fas fa-plus"></i>Toplu Numune Kaydı Açma</button>');
    if ($('div[data-id=3DF8F019800E40FB92358904AFAB53AB]').data().value === "True") {
        $('#btnTopluNumune').hide();
    } else {
        $('#btnTopluNumune').show();
    }
    $('body').on('click', '#btnTopluNumune', function() {
        $('#modalTopluNumune').remove();
        window.setModal.Create({
            id: 'modalTopluNumune',
            html: {
                header: ' ',
                body: '<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>' +
                    '<div id="msg" style="margin:0 0 5px; width: 100%;"></div>',
                footer: '<button id="btnKapat" type="button" class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>',
            }
        });
        $('#modalTopluNumune').modal('toggle');
        var url = 'https://dohlerwebapi.setcrm.com/api/data/TopluNumuneKaydiAcma?recordId=' + $('#RecordPublicId').val();
        var localurl = 'http://localhost:55073/api/data/TopluNumuneKaydiAcma?recordId=' + $('#RecordPublicId').val();
        $.post(url, function(r) {
            if (r.IsOk === true) {
                $('#txt').hide();
                $('#btnTopluNumune').hide();
                setUtil.alert({
                    container: '#modalTopluNumune .modal-body #msg',
                    message: r.Message,
                    alertClass: 'alert-success',
                    autoClose: false
                });
            } else {
                $('#txt').hide();
                setUtil.alert({
                    container: '#modalTopluNumune .modal-body #msg',
                    message: r.Message,
                    alertClass: 'alert-danger',
                    autoClose: false
                });
            }
        });

    });
});