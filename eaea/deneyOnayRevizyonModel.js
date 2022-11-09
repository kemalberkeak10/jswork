$(function() {
    $('.btn-br-actions[data-publicid=0C8E506106E847B2BE07516084D5CEBD]').hide();
    $('.btn-br-actions[data-publicid=0C8E506106E847B2BE07516084D5CEBD]').closest('td').prepend('<a id="btnRevizyon" class="btn btn-sm btn-warning"  style="margin-right:10px;" >Revize Edildi</a>');
    $('body').on('click', '#btnRevizyon', function() {
        $('#modalRevizyon').remove();
        window.setModal.Create({
            id: 'modalRevizyon',
            html: {
                header: 'Revizyon',
                body: '<div id="msg" style="margin:0 23px 5px; width: 80%;font-size:15px;"></div>' +
                    '<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>',
                footer: '<button type="button" class="btn btn-sm btn-default" onclick="window.location.reload()" data-dismiss="modal">Kapat</button>'
            },
            settings: {
                widthClass: 'modal-md'
            }
        });
        $('#modalRevizyon').modal('toggle');
        var data = {
            RecordId: $('#RecordPublicId').val(),
            UserId: userData.id,
            DeneyTalepFormuId: "",
            SorumlulukBilgisi: "",
            Aciklama: "",
        }
        var localUrl = String.format('https://localhost:44328/api/data/DeneyOnayRevizyon');
        var realUrl = String.format('https://eaewebapi.setcrm.com/api/data/DeneyOnayRevizyon');
        $.post(localUrl, data, function(r) {
            if (r.Status) {
                $('#modalRevizyon').modal('toggle');
                $('.btn-br-actions[data-publicid=0C8E506106E847B2BE07516084D5CEBD]').trigger('click');
            } else {
                setUtil.alert({
                    container: '#modalRevizyon .modal-body #msg',
                    message: r.Message,
                    alertClass: 'alert-danger',
                    autoClose: true
                });
            }
        });
    });

});