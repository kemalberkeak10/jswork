$(function() {
    $('.btn-br-actions[data-publicid=224352DF707441AEA6FC8918D80DC048]').hide();
    $('.btn-br-actions[data-publicid=224352DF707441AEA6FC8918D80DC048]').closest('td').prepend('<a id="btnDetailsReceiev" class="btn btn-sm btn-warning"style="margin-right:10px;" >Details Received</a>');
    var selectList = [];
    $('body').on('click', '#btnDetailsReceiev', function() {
        $('#modalSablon').remove();
        window.setModal.Create({
            id: 'modalSablon',
            html: {
                content: 'style="width:900px !important"',
                header: 'Details Received',
                body: '<div id="msg" style="margin:0 23px 5px; width: 80%;font-size:15px;"></div>' +
                    '<table id="dtTable" class="table" style="width: 100%">' +
                    '<thead>' +
                    '<tr><th>Medical Situation</th><th>Birthday</th></tr>' +
                    '</thead>' +
                    '<tbody>' +
                    '<tr>' +
                    '<td colspan="1" rowspan="1"><input id="medicalSituation" type="select" style="border: 1px solid #5BC0DE; "></td>' +
                    '<td style="width: 50%;" ><input id="birthday" type="date" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;"></td>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>',
                footer: '<button id="btnKaydetSatis" type="button" class="btn btn-sm btn-success" >Kaydet</button>' + '<button type="button" class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>'
            }
        });
        $('#modalSablon .modal-body').css('max-height', '');
        $('#modalSablon .modal-body').css('height', '150px');
        $('#modalSablon .modal-dialog').css('width', '50%');
        $('#modalSablon').modal('toggle');

        // var name = $('label[for=CC91A13828A648E79DE9A320CE91B35E]').parent().data('value');
        // $('#name').val(name);

        prepareSelect2('#medicalSituation', '/summary/fielditems', {
            id: '63C0DF3D635A4A58B70C4B85159D928F'
        }, null, true);
        var medicalSituationVal = $('label[for=63C0DF3D635A4A58B70C4B85159D928F]').parent().data('value');
        var medicalSituationId = $('label[for=63C0DF3D635A4A58B70C4B85159D928F]').parent().data('publicids');
        if (!String.isNullOrWhiteSpace(medicalSituationVal)) {
            $('#medicalSituation').select2('data', {
                id: medicalSituationId,
                text: medicalSituationVal
            }).trigger('change');
        }
    });
    $('#birthday').datetimepicker({
        inline: false,
        closeOnDateSelect: true,
        timepicker: true,
        format: 'd.m.Y',
        mask: false,
        scrollMonth: false,
        scrollTime: false,
        scrollInput: false,
        dayOfWeekStart: 1
    });
    $('body').on('click', '#btnKaydetSatis', function() {
        var data = {
            RecordId: $('#RecordPublicId').val(),
            MedicalSituation: $('#medicalSituation').val(),
            BirthdayId: $('#birthday').val(),
        }

        var url = 'https://saphirewebapi.setcrm.com/api/data/DetailsReceivedUpdate?recordId=' + $('#RecordPublicId').val() + '&birthday=' + $('#birthday').val() + '&situationId=' + $('#medicalSituation').val();
        var url2 = 'https://localhost:44378/api/data/DetailsReceivedUpdate?recordId=' + $('#RecordPublicId').val() + '&birthday=' + $('#birthday').val() + '&situationId=' + $('#medicalSituation').val();

        $('#modalSablon .modal-body').html('<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>');
        $('#modalSablon .modal-body').css('max-height', '');
        $('#modalSablon .modal-body').css('height', '150px');
        $('#modalSablon .modal-dialog').css('width', '50%');
        $.get(url, function(r) {
            if (r.Status) {
                var data3 = {
                    customObjectId: $('#CustomObjectPublicId').val(),
                    recordId: $('#RecordPublicId').val(),
                    fieldId: '37BA8E5CBDB6446FBDFFA9D5B2FC3C68',
                    value: "DBC909DAFE8D46D68418868807F3CA7E"
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
                    container: '#modalSablon .modal-body #msg',
                    message: r.Message,
                    alertClass: 'alert-danger',
                    autoClose: true
                });
            }
        });
    });
});