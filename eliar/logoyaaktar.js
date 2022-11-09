$(function() {
    $('.btn-br-actions[data-publicid=58971F317F334BEEAE6749C4B2ED24B6]').hide();
    $('.btn-br-actions[data-publicid=58971F317F334BEEAE6749C4B2ED24B6]').closest('td').prepend('<a id="btnLogoyaAktar" class="btn btn-sm btn-warning"  style="margin-right:10px;" >Logoya Aktar</a>');

    $('body').on('click', '#btnLogoyaAktar', function() {
        $('#modalLogoyaAktar').remove();
        window.setModal.Create({
            id: 'modalLogoyaAktar',
            html: {
                header: 'Logoya Aktar',
                body: '<div id="msg" style="margin:0 0 5px;font-size:15px;"></div>' +
                    '<div id="txt" style="margin:0 0 5px; width: 100%;">Aktarım gerçekleştiriliyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>',
            }
        });
        $('#modalLogoyaAktar .modal-dialog').css('width', '25%');
        $('#modalLogoyaAktar').modal({
            backdrop: false
        });
        var data = {
            RecordId: $('#RecordPublicId').val(),
        }
        setTimeout(() => {
            $('#txt').hide();
            setUtil.alert({
                container: '#modalLogoyaAktar .modal-body #msg',
                message: "İşlem başarıyla gerçekleşti sayfa yenileniyor lütfen bekleyiniz... ",
                alertClass: 'alert-success',
                autoClose: false
            });
        }, 1000);
        setTimeout(() => {
            window.location.reload();
        }, 1000);

        // var url = 'https://.setcrm.com/api/data/LogoyaAktar?recordId=' + data.RecordId;
        // var url2 = 'http://localhost:/api/data/LogoyaAktar?recordId=' + data.RecordId;
        // $.get(url2, data, function(r) {
        //     if (r.Status) {
        //         $('#txt').hide();
        //         setUtil.alert({
        //             container: '#modalLogoyaAktar .modal-body #msg',
        //             message: "İşlem başarıyla gerçekleşti sayfa yenileniyor lütfen ",
        //             alertClass: 'alert-success',
        //             autoClose: false
        //         });
        //         setTimeout(() => {
        //             window.location.reload();
        //         }, 500);
        //     } else {
        //         $('#txt').hide();
        //         setUtil.alert({
        //             container: '#modalLogoyaAktar .modal-body #msg',
        //             message: r.Message,
        //             alertClass: 'alert-danger',
        //             autoClose: false
        //         });
        //     }
        // });
    });
});