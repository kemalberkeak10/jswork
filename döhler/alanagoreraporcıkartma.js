$(function() {
    $('.well .pull-right:eq(0)').prepend('<a id="btnRaporOlustur" class="btn btn-sm btn-primary"  style="margin-right:10px;" >Rapor Oluştur</a>');
    $('body').on('click', '#btnRaporOlustur', function() {
        if ($('label[for=BFDE401079C34F8F82411FF35E1B31A0]').closest('div').data('publicids') == "") {
            notify('warning', 'Lütfen değerlendirme yapılacak mı alanını doldurunuz.');
        } else {
            var traceButtonName = "";
            var pesticideButtonName = "";
            var traceTemplateId = "";
            var pesticideTemplateId = "";
            var degerlendirmeYapilacakMi = $('label[for=BFDE401079C34F8F82411FF35E1B31A0]').closest('div').data('publicids');
            if (degerlendirmeYapilacakMi == "B20E79E55FED41C0A1AB9CE1873C46B7") {
                traceTemplateId = "EB0BB9F9511A4F6FA03639D1E887CA66";
                pesticideTemplateId = "69D05F8D54164E07AC905802AA779153"
                traceButtonName = "Trace Değerlendirme Evet ";
                pesticideButtonName = "Pesticide Değerlendirme Evet"
            } else if (degerlendirmeYapilacakMi == "ADD7E9BB10E64710B8589CECB19BB349") {
                traceTemplateId = "C3B91725108E4DBEB26E02E637BB3BE8";
                pesticideTemplateId = "CF48597DAFB14D6FBA98294A76C818AC"
                traceButtonName = "Trace Değerlendirme Hayır ";
                pesticideButtonName = "Pesticide Değerlendirme Hayır"
            }
            var recordId = $('#RecordPublicId').val();
            var customObjectId = $('#CustomObjectPublicId').val();
            var traceUrl = '/formtemplate/get/?id=' + traceTemplateId + '&coId=' + customObjectId + '&recordId=' + recordId;
            var pesticideUrl = '/formtemplate/get/?id=' + pesticideTemplateId + '&coId=' + customObjectId + '&recordId=' + recordId;

            $('#modalRaporOlustur').remove();
            window.setModal.Create({
                id: 'modalRaporOlustur',
                html: {
                    header: 'Rapor Oluştur',
                    body: '<div id="msg" style="margin:0px auto; width: 100%;font-size:15px;"></div>' +
                        '<div id ="etiketDiv" class="d-flex aligns-items-center justify-content-center">' +
                        '</div>',
                    footer: '<button type="button" class="btn btn-sm btn-default" data-dismiss="modal" onclick="window.location.reload()">Kapat</button>'
                },
            });
            $('#modalRaporOlustur .modal-body #etiketDiv').append('<div><a href="' + traceUrl + '"  id="btnTrace" class="btn btn-md btn-primary "  style="margin-right:10px;">' + traceButtonName + '</a></div>')
            $('#modalRaporOlustur .modal-body #etiketDiv').append('<div><a href="' + pesticideUrl + '"  id="btnPesticide" class="btn btn-md btn-info "  style="margin-right:10px;">' + pesticideButtonName + '</a></div>')
            $('#modalRaporOlustur').modal('toggle');
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