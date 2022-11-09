$(function() {
    $('.btn-br-actions[data-publicid=0C8E506106E847B2BE07516084D5CEBD]').hide();
    $('.btn-br-actions[data-publicid=0C8E506106E847B2BE07516084D5CEBD]').closest('td').prepend('<a id="btnRevize" class="btn btn-sm btn-warning"style="margin-right:10px;" >Revize Edildi</a>');
    $('body').on('click', '#btnRevize', function() {
        $('#modalRevizeBtn').remove();
        window.setModal.Create({
            id: 'modalRevizeBtn',
            html: {
                header: 'REVİZE TALEBİ',
                body: '<div id="msg" style="margin:0 23px 5px; font-size:15px;"></div>' +
                    '<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>' +
                    '<table class="table revizetable" style="width: 100%">' +
                    '<tbody>' +
                    '<tr>' +
                    '<td colspan="1" rowspan="1"><textarea rows="5" cols="150" id="revizeNeden" placeholder="Açıklama:" type="text" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;" /></td>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>',
                footer: '<button id="btnKaydetRevize" type="button" class="btn btn-sm btn-success" >Kaydet</button>' + '<button type="button" class="btn btn-sm btn-default" onclick="window.location.reload()" data-dismiss="modal">İptal</button>'
            },
            settings: {
                widthClass: 'modal-md'
            }
        });
        $('#revizeNeden').val("");
        $('#txt').hide();
        $('#modalRevizeBtn').modal('toggle');
    });

    $('body').on('click',
        '#btnKaydetRevize',
        function() {
            $('#txt').show();
            $('.revizetable').hide();
            var data = {
                RecordId: $('#RecordPublicId').val(),
                Aciklama: $('#revizeNeden').val(),
                UserId: userData.id,
                DeneyTalepFormuId: $('label[for=C609FE79F3BD45238960D3D20FC4FFE5]').parent().data('publicids'),
                SorumlulukBilgisi: $('label[for=B4D0978F487D46E28CE155B05C416308]').parent().data('value'),

            }
            var localUrl = String.format('https://localhost:44328/api/data/DeneyOnayRevizyon');
            var realUrl = String.format('https://eaewebapi.setcrm.com/api/data/DeneyOnayRevizyon');
            $.post(localUrl, data, function(r) {
                if (r.Status) {
                    $('#modalRevizeBtn').modal('toggle');
                    window.location.reload();
                    $('.btn-br-actions[data-publicid=0C8E506106E847B2BE07516084D5CEBD]').trigger('click');
                } else {
                    setUtil.alert({
                        container: '#modalRevizeBtn .modal-body #msg',
                        message: r.Message,
                        alertClass: 'alert-danger',
                        autoClose: true
                    });
                }
            });
        });
});