$(function() {
    var vfId = $('#ViewFilterPublicId').val();
    if (vfId = "EB9655458FEE42F9BE80C1376F59E8B3") {
        $('.well .pull-right:eq(0)').prepend('<a id="btnTopluRaporIndir" class="btn btn-sm btn-warning pull-left" style="margin-right: 3px;">Toplu Rapor İndir</a>');
        var trList = $('.table-responsive tbody tr');
        $.each(trList, function(i, v) {
            $(v).find('td:eq(0)').prepend('<input type="checkbox" class="form-check pull-left topluRaporIndir-check">')

        });
    }
    $('body').on('click',
        '#btnTopluRaporIndir',
        function() {
            //var recordPublicId = $("#RecordPublicId").val(),
            tblCheckeds = $('.topluRaporIndir-check:checked');
            if (tblCheckeds.length == 0) {
                notify('warning', 'İşleme devam etmek için en az bir tane kayıt seçmelisiniz.');
                return;
            }
            // var model = {
            //     RecordPublicId: recordPublicId,
            //     Items: []
            // };
            var urls = [];
            var error = false;

            tblCheckeds.each(function(i, v) {
                debugger;
                var tr = $(v).parents('tr');
                //records.push(tr.data('id'));
                var degerlendirmeYapilacakMi = tr.find('[data-id=BFDE401079C34F8F82411FF35E1B31A0]').data('value');
                if (degerlendirmeYapilacakMi == "") {
                    notify('warning', 'Lütfen değerlendirme yapılacak mı alanını doldurunuz.');
                } else {
                    var traceButtonName = "";
                    var pesticideButtonName = "";
                    var traceTemplateId = "";
                    var pesticideTemplateId = "";

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
                    var recordId = tr.data('id');
                    var customObjectId = $('#CustomObjectPublicId').val();
                    var traceUrl = '/formtemplate/get/?id=' + traceTemplateId + '&coId=' + customObjectId + '&recordId=' + recordId;
                    var pesticideUrl = '/formtemplate/get/?id=' + pesticideTemplateId + '&coId=' + customObjectId + '&recordId=' + recordId;
                    urls.push(traceUrl);
                    urls.push(pesticideUrl);
                }
            });
            var zip = new JSZip();
            var count = 0;
            var zipFilename = "zipFilename.zip";
            urls.forEach(function(url) {
                var filename = "filename";
                // loading a file and add it in a zip file
                JSZipUtils.getBinaryContent(url, function(err, data) {
                    if (err) {
                        throw err; // or handle the error
                    }
                    zip.file(filename, data, {
                        binary: true
                    });
                    count++;
                    if (count == urls.length) {
                        var zipFile = zip.generate({
                            type: "blob"
                        });
                        saveAs(zipFile, zipFilename);
                    }
                });
            });
            //window.location.reload();
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