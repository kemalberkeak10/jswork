$(function() {
    var deneyTalepFormuId = $('label[for=C609FE79F3BD45238960D3D20FC4FFE5]').parent().data('publicids');
    var sorumlulukBilgisi = $('label[for=B4D0978F487D46E28CE155B05C416308]').parent().data('value');
    $('.btn-br-actions[data-publicid=2F97EB34A79A40679D6FFAEFD32CB277]').hide();
    $('.btn-br-actions[data-publicid=2F97EB34A79A40679D6FFAEFD32CB277]').closest('td').prepend('<a id="btnReddedildi" class="btn btn-sm btn-warning"style="margin-right:10px;" >Reddedildi</a>');
    $('body').on('click', '#btnReddedildi', function() {
        $('#modalRedBtn').remove();
        window.setModal.Create({
            id: 'modalRedBtn',
            html: {
                header: 'Red Nedeni',
                body: '<div id="msg" style="margin:0 23px 5px; font-size:15px;"></div>' +
                    '<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>' +
                    '<table class="table redtable" style="width: 100%">' +
                    // '<thead>' +
                    // '<th>Ret Nedeni</th>' +
                    // '</tr>' +
                    // '</thead>' +
                    '<tbody>' +
                    '<tr>' +
                    '<td colspan="1" rowspan="1"><textarea rows="5" cols="150" id="redNeden" placeholder="Açıklama:" type="text" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;"/></td>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>',
                footer: '<button id="btnKaydetRed" type="button" class="btn btn-sm btn-success" >Kaydet</button>' + '<button type="button" class="btn btn-sm btn-default" onclick="window.location.reload()" data-dismiss="modal">İptal</button>'
            },
            settings: {
                widthClass: 'modal-md'
            }
        });
        $('#redNeden').val("");
        $('#txt').hide();
        $('#modalRedBtn').modal('toggle');
    });
    $('body').on('click',
        '#btnKaydetRed',
        function() {
            $('#txt').show();
            $('.redtable').hide();
            var data = {
                RecordId: $('#RecordPublicId').val(),
                Aciklama: $('#redNeden').val(),
                UserId: userData.id,
                DeneyTalepFormuId: deneyTalepFormuId,
                SorumlulukBilgisi: sorumlulukBilgisi,
            }
            var localUrl = String.format('https://localhost:44328/api/data/DeneyOnayRed');
            var realUrl = String.format('https://eaewebapi.setcrm.com/api/data/DeneyOnayRed');
            $.post(localUrl, data, function(r) {
                if (r.Status) {
                    $('#modalRedBtn').modal('toggle');
                    window.location.reload();
                    $('.btn-br-actions[data-publicid=2F97EB34A79A40679D6FFAEFD32CB277]').trigger('click');
                } else {
                    setUtil.alert({
                        container: '#modalRedBtn .modal-body #msg',
                        message: r.Message,
                        alertClass: 'alert-danger',
                        autoClose: true
                    });
                }
            });
        });
});