$(function() {
    $('.btn-br-actions[data-publicid=58971F317F334BEEAE6749C4B2ED24B6]').hide();
    $('.btn-br-actions[data-publicid=58971F317F334BEEAE6749C4B2ED24B6]').closest('td').prepend('<a id="btnLogoyaAktar" class="btn btn-sm btn-warning"  style="margin-right:10px;" >Logoya Aktar</a>');
    $('body').on('click', '#btnLogoyaAktar', function() {
        //$('#modalLogoyaAktar').remove();
        window.setModal.Create({
            id: 'modalLogoyaAktar',
            html: {
                header: 'Logoya Aktar',
                body: '<div id="msg" style="margin:0px auto; width: 100%;font-size:15px;"></div>' +
                    '<div id="txt" style="margin:0 auto;width: 100%;color:black">Aktarım gerçekleştirilyor, lütfen bekleyiniz...<br/> <img src="/Public/img/loading_bar.gif"></div>',

                footer: '<button  type="button" class="btn btn-sm btn-default" data-dismiss="modal" >Kapat</button>'
            },
            // settings: {
            //     widthClass: "modal-lg",
            // }
        });
        $('#modalLogoyaAktar .modal-dialog').css('width', '25%');
        $('#modalLogoyaAktar').modal('toggle');
        $('#modalLogoyaAKtar').modal({
            backdrop: "static",
            keyboard: false,
        });
        $('#txt').show();
        setTimeout(() => {
            $('#txt').hide();
            setUtil.alert({
                container: '#modalLogoyaAktar .modal-body #msg',
                message: "İşlem başarıyla gerçekleşti sayfa yenileniyor lütfen bekleyiniz... ",
                alertClass: 'alert-success',
                autoClose: false
            });
        }, 5000);
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    });


});