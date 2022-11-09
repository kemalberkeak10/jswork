$(function() {
    $('#177FD1E3AD434C798FC5235B851338CD').hide();

    $('#btnSoldUnsold').closest('table').hide();
    var isQualified = $('label[for=6A98D9987CB84A19B2773A93F1F11222 ]').parent().data('value');
    $('body').on('change', '#6A98D9987CB84A19B2773A93F1F11222', function() {


        if (isQualified == "False" || isQualified == "false") {
            $('#btnSonucmgm').closest('table').show();
            $('#btnSoldUnsold').closest('table').hide();
        }
    });
    if (isQualified == "True" || isQualified == "true") {
        $('#btnSonucmgm').closest('table').hide();
        $('#btnSoldUnsold').closest('table').show();
    } else {
        $('#btnSonucmgm').closest('table').show();
        $('#btnSoldUnsold').closest('table').hide();
    }
    $('.btn-br-actions[data-publicid=68C88B96C3CE4A4E913143F0C264371A]').hide();
    $('.btn-br-actions[data-publicid=68C88B96C3CE4A4E913143F0C264371A]').closest('td').prepend('<a id="btnQualified" class="btn btn-sm btn-warning"style="margin-right:10px;" >Qualified</a>');

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
                //$('#modalQualified').modal('toggle');
                $('.btn-br-actions[data-publicid=68C88B96C3CE4A4E913143F0C264371A]').trigger('click');
            } else {
                setUtil.alert({
                    container: '#modalQualified .modal-body #msg',
                    message: r.Message,
                    alertClass: 'alert-danger',
                    autoClose: true
                });
            }
        });
    });
});


$(function() {
    var stagesPanelStage = $('label[for=37BA8E5CBDB6446FBDFFA9D5B2FC3C68]').parent().data('publicids');

    if (stagesPanelStage == "" || stagesPanelStage == "343B5102AA454C60861F431696D6DB3C") {

        //waitingfordetails
        $('#btnDetailsReceiev').hide();
        $('#requestdiagnosis').hide();
        $('#btnNegotiation').hide();
        $('#btnDecision').hide();
        $('#btnOfferStage').hide();
    } else if (stagesPanelStage == 'F2FA63A7FEDE4E93A5B65CF48DBFF179') {
        $('#btnDetailsReceiev').hide();
        $('#requestdiagnosis').hide();
        $('#btnNegotiation').hide();
        $('#btnDecision').hide();
        $('#btnOfferStage').hide();
    } else if (stagesPanelStage == "2CC0ADFABEF94DD7A8EEC7F2C4952A6F") {
        //detailsreceived
        $('#btnWaitingForDetails').hide();
        $('#requestdiagnosis').hide();
        $('#btnNegotiation').hide();
        $('#btnDecision').hide();
        $('#btnOfferStage').hide();
    } else if (stagesPanelStage == "DBC909DAFE8D46D68418868807F3CA7E") {
        //requestdiagnosis
        $('#btnWaitingForDetails').hide();
        $('#btnDetailsReceiev').hide();
        $('#btnNegotiation').hide();
        $('#btnDecision').hide();
        $('#btnOfferStage').hide();
    } else if (stagesPanelStage == "58156FDCF1E74006ADFD89A037E3872B") {
        //offerstage
        $('#btnWaitingForDetails').hide();
        $('#btnDetailsReceiev').hide();
        $('#requestdiagnosis').hide();
        $('#btnNegotiation').hide();
        $('#btnDecision').hide();
    } else if (stagesPanelStage == "094A3B6806994EBABB4D0EE4A4C2F1B6") {
        //negation
        $('#btnWaitingForDetails').hide();
        $('#btnDetailsReceiev').hide();
        $('#requestdiagnosis').hide();
        $('#btnDecision').hide();
        $('#btnOfferStage').hide();
    } else if (stagesPanelStage == "8A3EA0E7DCE041458EBF59FCE50F9CBE") {
        //decision
        $('#btnWaitingForDetails').hide();
        $('#btnDetailsReceiev').hide();
        $('#requestdiagnosis').hide();
        $('#btnNegotiation').hide();
        $('#btnOfferStage').hide();
    } else if (stagesPanelStage == "D02E48FED56141A4A73CCBCEE024414B") {
        //allhide
        $('#btnWaitingForDetails').hide();
        $('#btnDetailsReceiev').hide();
        $('#requestdiagnosis').hide();
        $('#btnNegotiation').hide();
        $('#btnOfferStage').hide();
        $('#btnDecision').hide();
    } else if (stagesPanelStage == "31FF0A893CFE49F98F1AA0A1FC0F9B94") {
        $('#btnWaitingForDetails').hide();
        $('#btnQualified').hide();
        $('#D86FFA0CE485438FB03938C648413536').closest('td').hide();
        $('#8F0B928B76BF483B97D06881D24B4804').closest('td').hide();
    }
});