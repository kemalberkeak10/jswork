$(function() {
    $('.btn-br-actions[data-publicid=9A4A6ABD7F2A48099922DE84EF49AC96]').hide();
    $('.btn-br-actions[data-publicid=9A4A6ABD7F2A48099922DE84EF49AC96]').closest('td').prepend('<a id="btnWaitingForDetails" class="btn btn-sm btn-warning"style="margin-right:10px;" >Waiting For Details</a>');

    $('body').on('click', '#btnWaitingForDetails', function() {
        $('#modalWaitingForDetails').remove();
        window.setModal.Create({
            id: 'modalWaitingForDetails',
            html: {
                content: 'style="width:900px !important"',
                header: 'Waiting For Details',
                body: '<div id="msg" style="margin:0 23px 5px; width: 80%;font-size:15px;"></div>' +
                    '<table class="table" style="width: 100%">' +
                    '<thead>' +
                    '<tr><th>Reason for New Begining</th></tr>' +
                    '</thead>' +
                    '<tbody>' +
                    '<tr>' +
                    '<td colspan="1" rowspan="1"><input id="waitingForDetails" type="select"  style="resize:none;width:100%;"></td>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>',
                footer: '<button id="btnWaitingForDetailsKyt" type="button" class="btn btn-sm btn-success" >Kaydet</button>' + '<button type="button" class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>'
            }
        });
        $('#modalWaitingForDetails .modal-body').css('max-height', '');
        $('#modalWaitingForDetails .modal-body').css('height', '150px');
        $('#modalWaitingForDetails .modal-dialog').css('width', '30%');
        $('#modalWaitingForDetails').modal('toggle');

        prepareSelect2('#waitingForDetails', '/summary/fielditems', {
            id: '1F00AF8E893D41AB879A96C4255C0FD8'
        }, null, null);
        var waitingForDetailsVal = $('label[for=1F00AF8E893D41AB879A96C4255C0FD8]').parent().data('value');
        var waitingForDetailsId = $('label[for=1F00AF8E893D41AB879A96C4255C0FD8]').parent().data('publicids');
        $('#waitingForDetails').select2('data', {
            id: waitingForDetailsId,
            text: waitingForDetailsVal
        }).trigger('change');
    });

    $('body').on('click', '#btnWaitingForDetailsKyt', function() {
        var url = 'https://saphirewebapi.setcrm.com/api/data/WaitingForDetailsUpdate?recordId=' + $('#RecordPublicId').val() + '&waitingForDetailsId=' + $('#waitingForDetails').val();
        var url2 = 'https://localhost:44378/api/data/WaitingForDetailsUpdate?recordId=' + $('#RecordPublicId').val() + '&waitingForDetailsId=' + $('#waitingForDetails').val();

        $('#modalWaitingForDetails .modal-body').html('<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>');
        $('#modalWaitingForDetails .modal-body').css('max-height', '');
        $('#modalWaitingForDetails .modal-body').css('height', '150px');
        $('#modalWaitingForDetails .modal-dialog').css('width', '30%');
        $.get(url, function(r) {
            if (r.Status) {
                //$('#modalWaitingForDetails').modal('toggle');
                var data3 = {
                    customObjectId: $('#CustomObjectPublicId').val(),
                    recordId: $('#RecordPublicId').val(),
                    fieldId: '37BA8E5CBDB6446FBDFFA9D5B2FC3C68',
                    value: "2CC0ADFABEF94DD7A8EEC7F2C4952A6F"
                };
                $.post('/Set/UpdateFieldValue', data3, function(r) {
                    if (r.IsOk) {
                        setTimeout(() => {
                            window.location.reload();
                        }, 500);
                    }
                });
            } else {
                setUtil.alert({
                    container: '#modalWaitingForDetails .modal-body #msg',
                    message: r.Message,
                    alertClass: 'alert-danger',
                    autoClose: true
                });
            }
        });
    });
});