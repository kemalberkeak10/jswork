$(function() {
    $('#177FD1E3AD434C798FC5235B851338CD').hide();

    $('.btn-br-actions[data-publicid=68C88B96C3CE4A4E913143F0C264371A]').hide();
    $('.btn-br-actions[data-publicid=68C88B96C3CE4A4E913143F0C264371A]').closest('td').prepend('<a id="btnQualified" class="btn btn-sm btn-warning"style="margin-right:10px;" >Qualified</a>');


    $('#btnSoldUnsold').closest('table').hide();
    var isQualified = $('label[for=6A98D9987CB84A19B2773A93F1F11222]').parent().data('value');
    $('body').on('change', '#6A98D9987CB84A19B2773A93F1F11222', function() {


        //if (isQualified == "False" || isQualified == "false") {
        //$('#btnSonucmgm').closest('table').show();
        //$('#btnSoldUnsold').closest('table').hide();
        //}
        //});
        //if (isQualified == "True" || isQualified == "true") {
        //$('div[id=8F0B928B76BF483B97D06881D24B4804]').closest('tr').hide();
        //$('div[id=43C7D2DFA053443F9882ACB030611F3B]').closest('tr').hide();
        //$('#btnSonucmgm').closest('table').hide();
        //$('#btnSoldUnsold').closest('table').show();
        //} else {
        //$('div[id=8F0B928B76BF483B97D06881D24B4804]').closest('tr').show();
        //$('div[id=43C7D2DFA053443F9882ACB030611F3B]').closest('tr').show();
        //$('#btnSonucmgm').closest('table').show();
        //$('#btnSoldUnsold').closest('table').hide();
        //}
        //$('.btn-br-actions[data-publicid=68C88B96C3CE4A4E913143F0C264371A]').hide();
        //$('.btn-br-actions[data-publicid=68C88B96C3CE4A4E913143F0C264371A]').closest('td').prepend('<a id="btnQualified" class="btn btn-sm btn-warning"style="margin-right:10px;" >Qualified</a>');

    });

    $('body').on('click', '#btnQualified', function() {
        //$('#11F03CE33050472C95FCE3D37422857F').hide();
        //$('#177FD1E3AD434C798FC5235B851338CD').show();
        $('#modalQualified').remove();
        window.setModal.Create({
            id: 'modalQualified',
            html: {
                content: 'style="width:900px !important"',
                header: 'Qualified',
                body: '<div id="msg" style="margin:0 23px 5px; width: 80%;font-size:15px;"></div>' +
                    '<table class="table" style="width: 100%">' +
                    '<thead>' +
                    '<tr><th>Name</th><th>Patient Category</th></tr>' +
                    '</thead>' +
                    '<tbody>' +
                    '<tr>' +
                    '<td colspan="1" rowspan="1"><input id="nameQualified" placeholder="Full Name" type="text" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;"></td>' +
                    '<td colspan="1" rowspan="1"><input id="patientCategory" type="select"  style="resize:none;width:100%;"></td>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>',
                footer: '<button id="btnKaydetQualified" type="button" class="btn btn-sm btn-success" >Kaydet</button>' + '<button type="button" class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>'
            }
        });
        $('#modalQualified .modal-body').css('max-height', '');
        $('#modalQualified .modal-body').css('height', '150px');
        $('#modalQualified .modal-dialog').css('width', '50%');
        $('#modalQualified').modal('toggle');

        var nameQualified = $('label[for=CC91A13828A648E79DE9A320CE91B35E]').parent().data('value');
        $('#nameQualified').val(nameQualified);
        prepareSelect2('#patientCategory', '/summary/fielditems', {
            id: '41E0DE95AA76463FB0BFEC9B5A09F3B4'
        }, null, null);
        var patientCategoryVal = $('label[for=41E0DE95AA76463FB0BFEC9B5A09F3B4]').parent().data('value');
        var patientCategoryId = $('label[for=41E0DE95AA76463FB0BFEC9B5A09F3B4]').parent().data('publicids');
        $('#patientCategory').select2('data', {
            id: patientCategoryId,
            text: patientCategoryVal
        }).trigger('change');
    });

    $('body').on('click', '#btnKaydetQualified', function() {
        if (String.isNullOrWhiteSpace($('#nameQualified').val())) {
            notify("warning", "Please fill the blank area!");
        } else if (String.isNullOrWhiteSpace($('#patientCategory').val())) {
            notify("warning", "Please fill the blank area!");
        } else {
            var model = {
                RecordId: $('#RecordPublicId').val(),
                Name: $('#nameQualified').val(),
                PatientCategory: $('#patientCategory').val(),
                IsQualified: "True",
            }

            $('#modalQualified .modal-body').html('<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>');
            $('#modalQualified .modal-body').css('max-height', '');
            $('#modalQualified .modal-body').css('height', '150px');
            $('#modalQualified .modal-dialog').css('width', '50%');
            var url = 'https://saphirewebapi.setcrm.com/api/data/QualifiedUpdate';
            var url2 = 'https://localhost:44378/api/data/QualifiedUpdate';
            $.post(url, model, function(r) {
                if (r.Status) {
                    $('.btn-br-actions[data-publicid=68C88B96C3CE4A4E913143F0C264371A]').trigger('click');
                    $('#modalQualified').modal('toggle');
                } else {
                    setUtil.alert({
                        container: '#modalQualified .modal-body #msg',
                        message: r.Message,
                        alertClass: 'alert-danger',
                        autoClose: true
                    });
                }
            });
        }
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