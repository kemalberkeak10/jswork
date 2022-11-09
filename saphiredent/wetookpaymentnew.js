$(function() {
    var genelToplam = $('label[for=E29CF24E053B4FF2B4498F80A616623C]').parent().data('value');
    if (!String.isNullOrWhiteSpace(genelToplam)) {
        genelToplam = genelToplam.replace('.', '');
        genelToplam = genelToplam.replace(',', '.');
        genelToplam = parseFloat(genelToplam);
    } else {
        genelToplam = 0.00;
    }
    var invoiceId = $('label[for=FB7662D67CD845029F7634F9474A3398]').parent().data('value');
    var odemesekli = $('label[for=DE5439FD79334996B0496E0322488E93]').parent().data('value');
    var odemeAlan = $('label[for=B15FAAC2F4174A738712B7F52E237D40]').parent().data('value');

    $('[data-publicid=6F694F6DBD304745A64F539E7DB7A62F]').hide().after('<a id="btnTookPayment" class="btn btn-warning btn-sm" style="margin-right: 5px;">We Took Payment</a>');
    $('body').on('click', '#btnTookPayment', function() {
        ModalCreate();
    });


    $('body').on('click', '#btnTookPaymentSave', function() {
        var errors = [];
        var amount = $('#paymentAmount').val();
        if (String.isNullOrWhiteSpace(amount)) {
            errors.push('Lütfen payment amount alanını kontrol ediniz!');
        }
        var date = $('#paymentDate').val();
        if (String.isNullOrWhiteSpace(date)) {
            errors.push('Lütfen payment date alanını kontrol ediniz!');
        }

        if (errors.length > 0) {
            var errorMessage = "";
            $.each(errors, function(i, v) {
                if (i == (errors.length - 1)) {
                    errorMessage += v;
                } else {
                    errorMessage += v + "<br/>";
                }
            });
            setUtil.alert({
                container: '#modalTookPayment .modal-body #modalTookPaymentMessage',
                message: errorMessage,
                alertClass: 'alert-danger',
                autoClose: true
            });
            return false;
        } else {
            $('#modalTookPaymentLoadingBar').show();
            $('#modalTookPayment .modal-dialog').css('width', '30%');
            $('#table').hide();

            $('#modalTookPaymentLoadingBar').show();
            if ($('#currency').select2('data') != null || $('#currency').select2('data') != undefined) {
                var currencyId = $('#currency').select2('data').id;
            };
            // if ($('#contact').select2('data') != null || $('#contact').select2('data') != undefined) {
            //     var contactId = $('#contact').select2('data').id;
            // };
            var paymentAmount = $('#paymentAmount').val();
            var slipNo = $('#slipNo').val();
            var paymentDate = $('#paymentDate').val();

            if ($('#odemeSekli').select2('data') != null || $('#odemeSekli').select2('data') != undefined) {
                var odemeninSekli = $('#odemeSekli').select2('data').id;
            };
            if ($('#odemeyiAlan').select2('data') != null || $('#odemeyiAlan').select2('data') != undefined) {
                var odemeyiAlan = $('#odemeyiAlan').select2('data').id;
            };

            var model = {
                RecordId: $('#RecordPublicId').val(),
                CurrencyId: currencyId,
                ContactId: $('label[for=33D1D146351242A2979BFE5D646F12DF]').parent().data('publicids'),
                PaymentAmount: paymentAmount,
                SlipNo: slipNo,
                PaymentDate: paymentDate,
                CurrentUser: userData.id,
                OdemeSekli: odemeninSekli,
                OdemeAlan: odemeyiAlan,
            }
            var url = 'https://saphirewebapi.setcrm.com/api/data/ContactOlustur';
            var localUrl = 'https://localhost:44378/api/data/ContactOlustur';
            $.post(url, model, function(r) {
                if (r.Status) {
                    var floatRemainingBalance = $('#remainingBalance').val().replace('.', ',')
                    var data3 = {
                        customObjectId: $('#CustomObjectPublicId').val(),
                        recordId: $('#RecordPublicId').val(),
                        fieldId: 'C88D127000304609ADBE5EAC50C66759',
                        value: floatRemainingBalance
                    };
                    $.post('/Set/UpdateFieldValue',
                        data3,
                        function(r) {
                            if (r.IsOk) {

                                var dataweTook = {
                                    customObjectId: $('#CustomObjectPublicId').val(),
                                    recordId: $('#RecordPublicId').val(),
                                    fieldId: '477E9D8D67D04824A6B0C0227CD22891',
                                    value: "7637719C85E844AD909E2B01BD9C1170"
                                };
                                $.post('/Set/UpdateFieldValue',
                                    dataweTook,
                                    function(r) {
                                        if (r.IsOk) {

                                            $('#modalTookPaymentLoadingBar').hide();
                                            setUtil.alert({
                                                container: '#modalTookPayment .modal-body #modalTookPaymentMessage',
                                                message: "İşlem başarılı, sayfa yeniliyor. Lütfen bekleyiniz.",
                                                alertClass: 'alert-success',
                                                autoClose: false
                                            });

                                            setTimeout(() => {
                                                window.location.reload();
                                            }, 500);
                                        }
                                    });
                            }
                        });
                } else {
                    setUtil.alert({
                        container: '#modalTookPayment .modal-body #modalTookPaymentMessage',
                        message: r.Message,
                        alertClass: 'alert-danger',
                        autoClose: false
                    });
                }
            });
        }



    });

    function ModalCreate() {
        $('#modalTookPayment').remove();
        window.setModal.Create({
            id: 'modalTookPayment',
            html: {
                header: ' <h3 class="text-center"><strong>Contact Payment</strong></h3>',
                body: '<div id="modalTookPaymentMessage"></div>' +
                    '<div id="modalTookPaymentLoadingBar" style="margin:0 0 5px; width: 100%;display:none;">İşlem yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>' +
                    '<table class="table" id="table" style="width: 100%">' +
                    '<thead>' +
                    '<tr><th>Payment Amount</th><th>Remaining Balance</th></tr>' +
                    '</thead>' +
                    '<tbody>' +
                    '<tr>' +
                    '<td colspan="1" rowspan="1"><input id="paymentAmount" autocomplete="off" type="number" class="form-control"></td>' +
                    '<td colspan="1" rowspan="1"><input id="remainingBalance" autocomplete="off" type="number" disabled class="form-control"></td>' +
                    '</tr>' +
                    '</tbody>' +
                    '<thead>' +
                    '<tr><th>Currency</th><th>Contact</th></tr>' +
                    '</thead>' +
                    '<tbody>' +
                    '<tr>' +
                    '<td colspan="1" rowspan="1"><input id="currency" autocomplete="off" type="select" class="form-control"></td>' +
                    '<td colspan="1" rowspan="1"><input id="contact" autocomplete="off" type="text" class="form-control" disabled></td>' +
                    '</tr>' +
                    '</tbody>' +
                    '<thead>' +
                    '<tr><th>Payment Date</th><th>Slip No</th></tr>' +
                    '</thead>' +
                    '<tbody>' +
                    '<tr>' +
                    '<td colspan="1" rowspan="1"><input id="paymentDate" autocomplete="off" type="text" class="form-control"></td>' +
                    '<td colspan="1" rowspan="1"><input id="slipNo" autocomplete="off" type="number" class="form-control"></td>' +
                    '</tbody>' +
                    '<thead>' +
                    '<tr><th>Ödeme Şekli</th><th>Ödemeyi Alan Kişi/Kurum</th></tr>' +
                    '</thead>' +
                    '<tbody>' +
                    '<tr>' +
                    '<td colspan="1" rowspan="1"><input id="odemeSekli" autocomplete="off" type="select" class="form-control"></td>' +
                    '<td colspan="1" rowspan="1"><input id="odemeyiAlan" autocomplete="off" type="select" class="form-control"></td>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>',
                footer: '<button id="btnTookPaymentSave" type="button" class="btn btn-sm btn-success" >Kaydet</button>' + '<button type="button" class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>'
            },
            settings: {
                widthClass: 'modal-lg'
            },
        });

        prepareSelect2('#currency', '/Summary/LookupFieldValues', {
            coId: '8836FB24F9DC4D1EA80C609870BB5CFA',
            id: 'B8996D41D5A94FF49CD95584B31BDA1F',
            viewFilterId: 'F0EA08321C204C728211ABB7192E2B8A'
        }, null, false);

        $('#currency').select2('data', {
            id: "A79964CCBBFC4007A26FAEA1E190EC0D",
            text: "Euro - 1"
        }).trigger('change');


        prepareSelect2('#odemeyiAlan', '/summary/fielditems', {
            id: 'B15FAAC2F4174A738712B7F52E237D40'
        }, null, null);

        prepareSelect2('#odemeSekli', '/Summary/fielditems', {
            id: 'DE5439FD79334996B0496E0322488E93'
        }, null, null);

        // prepareSelect2('#odemeSekli', '/Summary/DependencyItems', {
        //     coId: '013CAAAE47B6475E9FE3396E0E32CA54',
        //     itemId: "B15FAAC2F4174A738712B7F52E237D40",
        //     groupIds: $('#odemeSekli').select2('data').id,
        //     controllingId: 'DE5439FD79334996B0496E0322488E93',
        //     controllingRecordId: $('#odemeSekli').select2('data').id,
        // }, null, false);

        $('#contact').val(invoiceId);
        $('#odemeyiAlan').val(odemeAlan);
        $('#odemeSekli').val(odemesekli);

        var discountedPrice = $('label[for=E29CF24E053B4FF2B4498F80A616623C]').parent().data().value;
        if (!String.isNullOrWhiteSpace(discountedPrice)) {
            discountedPrice = discountedPrice.replace('.', '');
            discountedPrice = discountedPrice.replace(',', '.');
            discountedPrice = parseFloat(discountedPrice);
            $('#paymentAmount').val(discountedPrice.toFixed(2));
            $('#remainingBalance').val((genelToplam - discountedPrice).toFixed(2));
        } else {
            discountedPrice = 0.00;
        };
        $('#paymentDate').datetimepicker({
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

        $('#paymentDate').val(moment().format('DD.MM.YYYY'));

        $('#modalTookPayment').modal('toggle');
    }
    $("body").on("change", '#odemeSekli', function() {
        if (!String.isNullOrWhiteSpace($('#odemeSekli').val())) {
            prepareSelect2('#odemeyiAlan', '/Summary/DependencyItems', {
                coId: '013CAAAE47B6475E9FE3396E0E32CA54',
                itemId: "B15FAAC2F4174A738712B7F52E237D40",
                groupIds: $('#odemeSekli').select2('data').id,
                controllingId: 'DE5439FD79334996B0496E0322488E93',
                controllingRecordId: $('#odemeSekli').select2('data').id,
            }, null, false);
        } else {
            prepareSelect2('#odemeyiAlan', '/Summary/DependencyItems', {
                id: 'DE5439FD79334996B0496E0322488E93'
            }, null, null);
        }
    });
    $("body").on("keyup",
        '#paymentAmount',
        function() {
            var paymentAmount = $('#paymentAmount').val();
            if (!String.isNullOrWhiteSpace(paymentAmount)) {
                paymentAmount = parseFloat(paymentAmount)

            } else {
                paymentAmount = 0;
            }
            var remainingBalance = genelToplam - paymentAmount
            $('#remainingBalance').val(remainingBalance.toFixed(2));
        });
});