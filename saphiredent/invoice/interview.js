$(function() {
    $('.btn-br-actions[data-publicid=746DA67F0C814DBF889B29C3FCEDB0FA]').hide();
    $('.btn-br-actions[data-publicid=746DA67F0C814DBF889B29C3FCEDB0FA]').closest('td').prepend('<a id="btnFinishedInterview" class="btn btn-sm btn-warning"style="margin-right:10px;" >Finished Interview</a>');
    // var guncelleyebilirMi = true;
    // var olusturabilirMi = true;

    // var permissionGroup = userData.permissionGroupIds.split("|");

    // if (!permissionGroup.includes("9F3097BBDAA44380A8C3BFD517A2110E")) {
    //     guncelleyebilirMi = false;

    //     if (!permissionGroup.includes("12953EDF1C914343992E9B03988D10C3")) {
    //         olusturabilirMi = false;
    //     }
    // }

    $("body").off('click',
        '#btnFinishedInterview').on('click',
        '#btnFinishedInterview',
        function() {
            $('#modalFinishedInterview').remove();
            window.setModal.Create({
                id: 'modalFinishedInterview',
                html: {
                    header: '<i class="fa-solid fa-clipboard-question"></i> Finished Interview',
                    body: String.format('<div class="sabit-fields"></div>') +
                        '<div id="txt" style="margin:0 0 5px; width: 100%;">İşlem biraz uzun sürebilir, lütfen bekleyiniz..<br/><img src="/Public/img/loading_bar.gif"></div>',
                    footer: '<button id="btnKaydetOlustur" type="button" class="btn btn-sm btn-primary">Kaydet</button><button class="btn btn-danger btn-sm" data-dismiss="modal" onclick="window.location.reload();" ">Kapat</button>'
                },
                settings: {
                    widthClass: 'modal-md',
                }
            });
            $('#txt').hide();
            var modalBody = $('#modalFinishedInterview .modal-body'),
                bodySabitFields = modalBody.find('.sabit-fields');

            bodySabitFields.append($('<table/>', {
                class: 'table table-bordered table-hover',
                'style': 'margin-bottom:0;'
            }).append("<thead><tr><th>Photos</th><th>Payment Date</th></tr></thead><tbody style='background:white !important'><tr><td style='width:350px;'><div><fielset style='font-size: 15px; text-align:center;'><input type='radio' value=0 name='Yes' id=yes style='width:15px;height:15px;margin-right:20px;margin-left:20px;'><label for='yes'> YES </label><input type='radio' value=1 name='No' id=no style='width:15px;height:15px;margin-right:20px;margin-left:20px;'><label for='no'> NO </label></fielset></div></td><td><input id='date' type='text' ></td></tr></tbody>"));

            $('#date').datetimepicker({
                inline: false,
                closeOnDateSelect: true,
                timepicker: false,
                format: 'd.m.Y',
                mask: false,
                scrollMonth: false,
                scrollTime: false,
                scrollInput: false,
                dayOfWeekStart: 1
            });
            $("#date").val(moment(new Date).format('DD.MM.YYYY'));

            $(document).on('click', 'input[type="radio"]', function() {
                $(this).closest('td').find('input[type="radio"]').not(this).prop('checked', false);
                console.log($('#date').val());
                console.log($('#yes').prop('checked'));
            });
            $('#modalFinishedInterview').modal('toggle');
        });
    $("body").off('click',
        '#btnKaydetOlustur').on('click', '#btnKaydetOlustur',
        function() {
            var photo = $('#yes').prop('checked');
            if (photo) {

                var photoData = {
                    customObjectId: $('#CustomObjectPublicId').val(),
                    recordId: $('#RecordPublicId').val(),
                    fieldId: '64C64B127D8F486E832BC9DF9BC94906',
                    value: "DE2D5A7B38124F0A893CFF7CEF60A339"
                };
                $.post('/Set/UpdateFieldValue', photoData, function(r) {
                    if (r.IsOk) {}
                });
            } else {

                var photoData = {
                    customObjectId: $('#CustomObjectPublicId').val(),
                    recordId: $('#RecordPublicId').val(),
                    fieldId: '64C64B127D8F486E832BC9DF9BC94906',
                    value: "88751E9493654585B0F42BD2CDC051F9"
                };
                $.post('/Set/UpdateFieldValue', photoData, function(r) {
                    if (r.IsOk) {}
                });

            }

            var paymentDate = $('#date').val();
            var paymentDateData = {
                customObjectId: $('#CustomObjectPublicId').val(),
                recordId: $('#RecordPublicId').val(),
                fieldId: '6C950659E83A4E57B4222F40509B5685',
                value: paymentDate
            };
            $.post('/Set/UpdateFieldValue',
                paymentDateData,
                function(r) {
                    if (r.IsOk) {}
                });
            $('.sabit-fields').hide();
            $('#txt').show();
            $('.btn-br-actions[data-publicid=746DA67F0C814DBF889B29C3FCEDB0FA]').trigger('click');
        });

    function notify(type, message) {
        $.notify({
            icon: type === "success" ? 'fas fa-check-double' : 'fas fa-times-circle',
            message: message
        }, {
            z_index: '9999999',
            type: type,
            placement: {
                from: "top",
                align: "right"
            },
            offset: 50,
            animate: {
                enter: 'animated flipInY',
                exit: 'animated flipOutX'
            },
        });
    }
});