$(function() {
    $('.btn-br-actions[data-publicid=BFC70ADB670044DEADAF56B8260F0BAD]').hide();
    $('.btn-br-actions[data-publicid=BFC70ADB670044DEADAF56B8260F0BAD]').closest('td').prepend('<a id="btnTesteGonder" class="btn btn-sm btn-warning"  style="margin-right:10px;" >Test Edilmesi Bekleniyor</a>');
    $('body').on('click', '#btnTesteGonder', function() {
        $('#modalHarcananZaman').remove();
        window.setModal.Create({
            id: 'modalHarcananZaman',
            html: {
                header: 'Harcanan Zaman',
                content: 'style="width:%20!important"',
                body: '<div id="msg" style="width: 100%;font-size:15px;"></div>' +
                    '<label>Harcanan Zamanı Giriniz:</label><input id="harcananZaman" type="number" min="0" class="form-control">',
                footer: '<button id="btnKaydetZaman" type="button" class="btn btn-sm btn-success" ><i class="fa fa-save"></i> Kaydet</button><button type="button" class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>'
            }
        });
        // $('#modalHarcananZaman .modal-dialog').css('width', '15%');
        $('#modalHarcananZaman').modal('toggle');

        var harcananZaman = $('label[for=AB531C78EDBF438A9BD8660899C0F8A3]').parent().data('value');
        $('#harcananZaman').val(harcananZaman);

    });

    $('body').on('click', '#btnKaydetZaman', function() {
        var data = {
            RecordId: $('#RecordPublicId').val(),
            HarcananZaman: $('#harcananZaman').val(),

        }
        if (data.HarcananZaman === '') {
            setUtil.alert({
                container: '#modalHarcananZaman .modal-body #msg',
                message: "Lütfen değer giriniz",
                alertClass: 'alert-warning',
                autoClose: true
            });
        } else if (parseInt(data.HarcananZaman) < 0) {
            setUtil.alert({
                container: '#modalHarcananZaman .modal-body #msg',
                message: "Harcanan Zaman negatif olamaz",
                alertClass: 'alert-danger',
                autoClose: true
            });
        } else if (parseInt(data.HarcananZaman)) {
            var url = "https://templateprocess.setcrm.com/api/maya/HarcananZamanUpdate?recordId=" + data.RecordId + "&harcananZaman=" + data.HarcananZaman;
            var url2 = "http://localhost:52129/api/maya/HarcananZamanUpdate?recordId=" + data.RecordId + "&harcananZaman=" + data.HarcananZaman;
            $('#modalHarcananZaman .modal-body #msg').append('<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>');
            $.post(url, data, function(r) {
                if (r.Status) {
                    $('#modalHarcananZaman').modal('toggle');
                    $('.btn-br-actions[data-publicid=BFC70ADB670044DEADAF56B8260F0BAD]').trigger('click');
                } else {
                    setUtil.alert({
                        container: '#modalHarcananZaman .modal-body #msg',
                        message: r.Message,
                        alertClass: 'alert-danger',
                        autoClose: true
                    });
                }
            });
        }

    });

});