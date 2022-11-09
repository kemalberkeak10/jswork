$(function() {
    $('.well:first .pull-right').prepend('<a id="btnRaporYazdir" class="btn btn-danger btn-sm" style="margin-right: 5px;">Rapor Yazdır</a>');
    $('body').on('click', '#btnRaporYazdir', function() {
        $('#modalRaporYazdir').remove();
        window.setModal.Create({
            id: 'modalRaporYazdir',
            html: {
                header: 'Rapor Yazdır',
                body: '<div id="msg" style="margin:0px auto; width: 100%;font-size:15px;"></div>' +
                    '<div id="txt" style="margin:0 auto;width: 100%;color:black">İşleminiz yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>' +
                    '<div id="inputkararkurali" colspan="1" rowspan="1"><textarea rows="3" id="kararKurali" type="text" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;"/></div>',
                footer: '<button id="btnRaporOlustur" type="button" class="btn btn-sm btn-success" >Kaydet</button>' + '<button type="button" class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>'
            }
        });
        $('#txt').hide();
        $('#modalRaporYazdir').modal('toggle');
        var kararKurali = $('label[for=39ABAC034CD141E49433165A01CCAE0E]').parent().data('value');
        $('#kararKurali').val(kararKurali);
    });
    $('body').on('click', '#btnRaporOlustur', function() {
        $('#txt').show();
        $('#inputkararkurali').hide();
        var recordId = $('#RecordPublicId').val();
        var kararKurali = $('#kararKurali').val();

        var url = 'https://betalabwebapi.setcrm.com/api/data/RaporYazdir?recordId=' + recordId + '&kararKurali=' + kararKurali;
        var url2 = 'https://localhost:44303/api/data/RaporYazdir?recordId=' + recordId + '&kararKurali=' + kararKurali;;
        $.get(url, function(r) {
            if (r.Status) {
                $('#txt').hide();
                setUtil.alert({
                    container: '#modalRaporYazdir .modal-body #msg',
                    message: "İşleminiz başarıyla gerçekleşti.Sayfa yenileniyor lütfen bekleyiniz.",
                    alertClass: 'alert-success',
                    autoClose: true
                });
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                $('#txt').hide();
                setUtil.alert({
                    container: '#modalRaporYazdir .modal-body #msg',
                    message: r.Message,
                    alertClass: 'alert-danger',
                    autoClose: false
                });
            }
        });
    });

});