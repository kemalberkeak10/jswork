$(function() {
    $('.well .pull-right:eq(0)').prepend('<a id="btnServisDevret" class="btn btn-sm btn-success"  style="margin-right:10px;" >Çağrıyı Devret</a>');
    var status = $('label[for=DD3EDB92E3914A58BCD9C88C908C694D]').parent().data();
    if ($('label[for=BC9926716A98435792F37B92D11E13F5]').parent().data().value) {
        $('#btnServisDevret').hide;
    }
    $('body').on('click', '#btnServisDevret', function() {
        $('#modelServisDevret').remove();
        window.setModal.Create({
            id: 'modelServisDevret',
            html: {
                header: 'Çağrıyı Devret',
                body: '<div id="txt" style="margin:0 0 5px; width: 100%;"></div>' +
                    '<div id="msg" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>' +
                    '<table class="table" style="width: 100%">' +
                    '<thead>' +
                    '<tr><th>Servis Teknisyeni 1</th><th>Servis Teknisyeni 2</th><th>Devreden Kişi 1</th><th>Devreden Kişi 2</th></tr>' +
                    '</thead>' +
                    '<tbody>' +
                    '<tr>' +
                    '<td colspan="1" rowspan="1" ><input id="servisTeknisyeni1" class="form-control popupselectlist" type="select"></td>' +
                    '<td colspan="1" rowspan="1" ><input id="servisTeknisyeni2" class="form-control popupselectlist" type="select"></td>' +
                    '<td colspan="1" rowspan="1" ><input id="devredenKisi1" class="form-control popupselectlist" type="select" disabled></td>' +
                    '<td colspan="1" rowspan="1" ><input id="devredenKisi2" class="form-control popupselectlist" type="select" disabled></td>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>',
                footer: '<button id="btnDevret" type="button" class="btn btn-sm btn-success" >Çağrıyı Devret</button>' + '<button type="button" class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>'
            }
        });
        $('#modelServisDevret .modal-dialog').css('width', '50%');
        $('#modelServisDevret').modal('toggle');
        $('#msg').hide();


        prepareSelect2('#servisTeknisyeni1', '/summary/organizationalunititems', { publicId: 'E70081EB5F9E4970A9B556DB7467FC4F', name: 'User', filterType: 'User', groupIds: null, depth: 1, includeItSelf: false }, null, false);
        var servisTeknisyeni1Val = $('label[for=E70081EB5F9E4970A9B556DB7467FC4F]').parent().data('value');
        var servisTeknisyeni1Id = $('label[for=E70081EB5F9E4970A9B556DB7467FC4F]').parent().data('publicids');
        $('#servisTeknisyeni1').select2('data', {
            id: servisTeknisyeni1Id,
            text: servisTeknisyeni1Val
        }).trigger('change');

        prepareSelect2('#servisTeknisyeni2', '/summary/organizationalunititems', { publicId: '510666169526497685FC978A5608C4B6', name: 'User', filterType: 'User', groupIds: null, depth: 1, includeItSelf: false }, null, false);
        var servisTeknisyeni2Val = $('label[for=510666169526497685FC978A5608C4B6]').parent().data('value');
        var servisTeknisyeni2Id = $('label[for=510666169526497685FC978A5608C4B6]').parent().data('publicids');
        $('#servisTeknisyeni2').select2('data', {
            id: servisTeknisyeni2Id,
            text: servisTeknisyeni2Val
        }).trigger('change');

        prepareSelect2('#devredenKisi1', '/summary/organizationalunititems', { publicId: 'F8130232D8C54A0EB88D8356ADCC826D', name: 'User', filterType: 'User', groupIds: null, depth: 1, includeItSelf: false }, null, false);
        var devredenKisi1Val = $('label[for=F8130232D8C54A0EB88D8356ADCC826D]').parent().data('value');
        var devredenKisi1Id = $('label[for=F8130232D8C54A0EB88D8356ADCC826D]').parent().data('publicids');
        $('#devredenKisi1').select2('data', {
            id: servisTeknisyeni1Id,
            text: servisTeknisyeni1Val
        }).trigger('change');

        prepareSelect2('#devredenKisi2', '/summary/organizationalunititems', { publicId: '0AABBA74023E406D8FDF31A022746BA3', name: 'User', filterType: 'User', groupIds: null, depth: 1, includeItSelf: false }, null, false);
        var devredenKisi2Val = $('label[for=0AABBA74023E406D8FDF31A022746BA3]').parent().data('value');
        var devredenKisi2Id = $('label[for=0AABBA74023E406D8FDF31A022746BA3]').parent().data('publicids');
        $('#devredenKisi2').select2('data', {
            id: servisTeknisyeni2Id,
            text: servisTeknisyeni2Val
        }).trigger('change');

        if ($('label[for=510666169526497685FC978A5608C4B6]').parent().data('value') == '') {
            $('#servisTeknisyeni2').select2('enable', false).removeAttr('disabled');
        }
        if ($('label[for=E70081EB5F9E4970A9B556DB7467FC4F]').parent().data('value') == '') {
            $('#servisTeknisyeni1').select2('enable', false).removeAttr('disabled');
        }
    });
    $('body').on('click', '#btnDevret', function() {
        $('#msg').show();
        $('#btnDevret').attr('disabled', true);
        var hasError = false;
        RecordId = $('#RecordPublicId').val();
        teknisyen1Id = $('#servisTeknisyeni1').select2('data').id;
        teknisyen2Id = $('#servisTeknisyeni2').select2('data').id;
        devreden1Id = $('#devredenKisi1').select2('data').id;
        devreden2Id = $('#devredenKisi2').select2('data').id;


        if (!String.isNullOrWhiteSpace($('label[for=E70081EB5F9E4970A9B556DB7467FC4F]').parent().data('publicids'))) {
            if ($('label[for=E70081EB5F9E4970A9B556DB7467FC4F]').parent().data('publicids') !== $('#servisTeknisyeni1').select2('data').id) {
                var teknisyen1data = { customObjectId: "43170E7ED4E641C98B067B41AA42076D", recordId: RecordId, fieldId: 'E70081EB5F9E4970A9B556DB7467FC4F', value: teknisyen1Id };
                var servisTeknisyeni1Id = $('label[for=E70081EB5F9E4970A9B556DB7467FC4F]').parent().data('publicids');
                $.post('/Set/UpdateFieldValue', teknisyen1data, function(r) {
                    if (!r.IsOk) {
                        setUtil.alert({
                            container: '#modelServisDevret .modal-body #txt',
                            message: "Servis Teknisyeni 1 Güncellenirken hata! Lütfen tekrar deneyiniz.",
                            alertClass: 'alert-danger',
                            autoClose: false
                        });
                        hasError = true;
                    }

                    var devredilen1data = { customObjectId: "43170E7ED4E641C98B067B41AA42076D", recordId: RecordId, fieldId: 'F8130232D8C54A0EB88D8356ADCC826D', value: servisTeknisyeni1Id };
                    $.post('/Set/UpdateFieldValue', devredilen1data, function(r) {
                        if (!r.IsOk) {
                            setUtil.alert({
                                container: '#modelServisDevret .modal-body #txt',
                                message: "Devredilen Kişi 1 Güncellenirken hata! Lütfen tekrar deneyiniz.",
                                alertClass: 'alert-danger',
                                autoClose: false
                            });
                            hasError = true;
                        }
                    });

                });
            }
        }
        if (!String.isNullOrWhiteSpace($('label[for=510666169526497685FC978A5608C4B6]').parent().data('publicids'))) {
            if ($('label[for=510666169526497685FC978A5608C4B6]').parent().data('publicids') !== $('#servisTeknisyeni2').select2('data').id) {
                var teknisyen2data = { customObjectId: "43170E7ED4E641C98B067B41AA42076D", recordId: RecordId, fieldId: '510666169526497685FC978A5608C4B6', value: teknisyen2Id };
                var servisTeknisyeni2Id = $('label[for=510666169526497685FC978A5608C4B6]').parent().data('publicids');
                $.post('/Set/UpdateFieldValue', teknisyen2data, function(r) {
                    if (!r.IsOk) {
                        setUtil.alert({
                            container: '#modelServisDevret .modal-body #txt',
                            message: "Servis Teknisyeni 2 Güncellenirken hata! Lütfen tekrar deneyiniz.",
                            alertClass: 'alert-danger',
                            autoClose: false
                        });
                        hasError = true;
                    }
                    var devredilen2data = { customObjectId: "43170E7ED4E641C98B067B41AA42076D", recordId: RecordId, fieldId: '0AABBA74023E406D8FDF31A022746BA3', value: servisTeknisyeni2Id };
                    $.post('/Set/UpdateFieldValue', devredilen2data, function(r) {
                        if (!r.IsOk) {
                            setUtil.alert({
                                container: '#modelServisDevret .modal-body #txt',
                                message: "Devredilen Kişi 2 Güncellenirken hata! Lütfen tekrar deneyiniz.",
                                alertClass: 'alert-danger',
                                autoClose: false
                            });
                            hasError = true;
                        }
                    });
                });
            }
        }
        if (!hasError && $('label[for=510666169526497685FC978A5608C4B6]').parent().data('publicids') !== $('#servisTeknisyeni2').select2('data').id && $('label[for=E70081EB5F9E4970A9B556DB7467FC4F]').parent().data('publicids') !== $('#servisTeknisyeni1').select2('data').id) {
            var checkboxData = { customObjectId: "43170E7ED4E641C98B067B41AA42076D", recordId: RecordId, fieldId: 'BC9926716A98435792F37B92D11E13F5', value: true };
            $.post('/Set/UpdateFieldValue', checkboxData, function(r) {
                if (!r.IsOk) {
                    setUtil.alert({
                        container: '#modelServisDevret .modal-body #txt',
                        message: "Devredildi alanı güncellenirken hata! Lütfen tekrar deneyiniz.",
                        alertClass: 'alert-danger',
                        autoClose: false
                    });
                }
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            });
            $('#msg').hide();
            setUtil.alert({
                container: '#modelServisDevret .modal-body #txt',
                message: "İşleminiz başarıyla gerçekleşti. Sayfa yenileniyor lütfen bekleyiniz",
                alertClass: 'alert-success',
                autoClose: true
            });
        }
        if ($('label[for=510666169526497685FC978A5608C4B6]').parent().data('publicids') !== $('#servisTeknisyeni2').select2('data').id && $('label[for=E70081EB5F9E4970A9B556DB7467FC4F]').parent().data('publicids') !== $('#servisTeknisyeni1').select2('data').id) {
            $('#msg').hide();
            setUtil.alert({
                container: '#modelServisDevret .modal-body #txt',
                message: "Lütfen devredilecek kişi seçiniz!",
                alertClass: 'alert-warning',
                autoClose: true
            });
            $('#btnDevret').attr('disabled', false);
        }

    });
});