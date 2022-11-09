$(function() {
    $('.btn-br-actions[data-publicid=13CAC8197A274EE792BA1CD772594F39]').hide();
    $('.btn-br-actions[data-publicid=13CAC8197A274EE792BA1CD772594F39]').closest('td').prepend('<a id="btnNotGir" class="btn btn-sm btn-warning"  style="margin-right:10px;" >Rapor İçin Not Gir</a>');
    $('body').on('click', '#btnNotGir', function() {
        $('#modalRaporNot').remove();
        window.setModal.Create({
            id: 'modalRaporNot',
            html: {
                content: 'style="width:900px !important"',
                header: 'Rapor İçin Not',
                body: '<div id="msg" style="margin:0 23px 5px; width: 80%;font-size:15px;"></div>' +
                    '<table class="table" style="width: 100%">' +
                    '<thead>' +
                    '<tr><th>Rapor İçin Not</th></tr>' +
                    '</thead>' +
                    '<tbody>' +
                    '<tr>' +
                    '<td colspan="1" rowspan="1"><input id="raporNotu"  type="text" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;"></td>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>',
                footer: '<button id="btnKaydetNot" type="button" class="btn btn-sm btn-success" >Kaydet ve Rapor Oluştur</button>' + '<button type="button" class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>'
            }
        });
        // $('#modalRaporNot .modal-body').css('height', '450px');
        $('#modalRaporNot .modal-dialog').css('width', '50%');
        $('#modalRaporNot').modal('toggle');
        var raporNotu = $('label[for=01CD54C4C3C44F1A9C294839FED66BB4]').parent().data('value');
        $('#raporNotu').val(raporNotu);

    });
    $('body').on('click', '#btnKaydetNot', function() {
        var data = {
            raporNotuVal: $('#raporNotu').val(),
            recordId: $('#RecordPublicId').val(),
        }
        var url = "https://meyicki.setcrm.com/api/data/RaporNotuGir?raporNotuVal=" + data.raporNotuVal + "&recordId=" + data.recordId;
        var localUrl = "http://localhost:11456/api/data/RaporNotuGir?raporNotuVal=" + data.raporNotuVal + "&recordId=" + data.recordId;

        $('#modalRaporNot .modal-body').html('<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>');
        $('#modalRaporNot .modal-dialog').css('width', '50%');
        $.post(url, data, function(r) {
            if (r.Status) {
                $('#modalRaporNot').modal('toggle');
                $('.btn-br-actions[data-publicid=13CAC8197A274EE792BA1CD772594F39]').trigger('click');

            } else {
                setUtil.alert({
                    container: '#modalRaporNot .modal-body #msg',
                    message: r.Message,
                    alertClass: 'alert-danger',
                    autoClose: true
                });
            }
        });
    });

});