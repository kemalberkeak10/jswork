$(function() {
    $('.btn-br-actions[data-publicid=746DA67F0C814DBF889B29C3FCEDB0FA]').hide();
    //$('[data-publicid=746DA67F0C814DBF889B29C3FCEDB0FA]').prepend('<a id="btnFinishedInterview" class="btn btn-warning btn-sm" style="margin-right: 5px;">Finished Interview</a>');
    $('.btn-br-actions[data-publicid=746DA67F0C814DBF889B29C3FCEDB0FA]').closest('td').prepend('<a id="btnFinishedInterview" class="btn btn-sm btn-warning"style="margin-right:10px;" >Finished Interview</a>');
    var guncelleyebilirMi = true;
    var olusturabilirMi = true;

    var permissionGroup = userData.permissionGroupIds.split("|");
    var string = "<tr data-id='{0}'><td><div id='officeSoldPruduct_{0}' class='officeSoldPruduct'></div></td><td><textarea rows='1' id='quantity_{0}' class='form-control quantity' style='resize:vertical'>{9}</textarea></td><td><div id='doctor_{0}'></div></td></div></td><td><textarea rows='1' id='listPrice_{0}' class='form-control listPrice' style='resize:vertical'>{1}</textarea></td><td><input type='text' id='euroPrice_{0}' class='form-control euroPrice' value='{2}' ></td><td><textarea rows='1' id='amount_{0}' class='form-control amount' style='resize:vertical'>{4}</textarea></td><td><textarea rows='1' id='productNote_{0}' class='form-control productNote' style='resize:vertical'>{7}</textarea></div></td><td><textarea rows='1' id='euroValue_{0}' class='form-control euroValue' style='resize:vertical'>{8}</textarea></div></td><td style='text-align:center;'><a rows='1' class='btn btn-danger btn-sm btn-delete'><i class='fas fa-times-circle'></i></div></td></tr>";

    var string2 = "<thead><tr><th>Office Sold Products</th><th>Quantity 2</th><th>Doctor</th><th>List Price 2</th><th>Euro Price 2</th><th>Amount 2</th><th>Product Note 2</th><th>Euro Value</th><th style='width: 100px !important;text-align: center;'>İşlem</th></tr></thead><tbody style='background:white !important'><tr><td><div id='officeSoldPruduct' class=''></div></td><td><input type='text' id='quantity' class='form-control '></td><td><div id='doctor'class=''></div></td><td><input id='listPrice' type='text' class='form-control '></td><td><input id='euroPrice' type='text' class='form-control '></td><td><input type='text' id='amount' class='form-control '></td><td><textarea rows='1' id='productNote' class='form-control ' style='resize:vertical'></textarea></td><td><input type='text' id='euroValue' class='form-control '></td><td style='text-align:center;'><a class='btn btn-success btn-sm btn-hizli-save-row' style='margin-right:5px;'><i class='fas fa-plus'></i></a><a class='btn btn-danger btn-sm btn-hizli-cancel-row' href='#'><i class='fas fa-times-circle'></i></a></td></tr></tbody>";

    if (!permissionGroup.includes("9F3097BBDAA44380A8C3BFD517A2110E")) {
        string = "<tr data-id='{0}'><td><div id='officeSoldPruduct_{0}' class='officeSoldPruduct'></div></td><td><textarea rows='1' disabled='disabled' id='quantity_{0}' class='form-control quantity' style='resize:vertical'>{9}</textarea></td><td><div id='doctor_{0}' disabled='disabled'></div></td></div></td><td><textarea rows='1' disabled='disabled' id='listPrice_{0}' class='form-control listPrice' style='resize:vertical'>{1}</textarea></td><td><input type='text' disabled='disabled' id='euroPrice_{0}' class='form-control euroPrice' value='{2}' ></td><td><textarea rows='1' disabled='disabled' id='amount_{0}' class='form-control amount' style='resize:vertical'>{4}</textarea></td><td><textarea rows='1' disabled='disabled' id='productNote_{0}' class='form-control productNote' style='resize:vertical'>{7}</textarea></div></td><td><textarea rows='1' disabled='disabled' id='euroValue_{0}' class='form-control euroValue' style='resize:vertical'>{8}</textarea></div></td><td style='text-align:center;'></div></td></tr>";
        guncelleyebilirMi = false;

        if (!permissionGroup.includes("12953EDF1C914343992E9B03988D10C3")) {
            string2 = "<thead><tr><th>Office Sold Products</th><th>Quantity 2</th><th>Doctor</th><th>List Price 2</th><th>Euro Price 2</th><th>Amount 2</th><th>Product Note 2</th><th>Euro Value</th><th style='width: 100px !important;text-align: center;'>İşlem</th></tr></thead><tbody style='background:white !important'><tr><td><div id='officeSoldPruduct' class=''></div></td><td><input type='text' disabled='disabled' id='quantity' class='form-control '></td><td><div id='doctor'class=''></div></td><td><input id='listPrice' type='text' disabled='disabled' class='form-control '></td><td><input id='euroPrice' type='text' disabled='disabled' class='form-control'></td><td><input type='text' disabled='disabled' id='amount' class='form-control '></td><td><textarea rows='1' id='productNote' disabled='disabled' class='form-control ' style='resize:vertical'></textarea></td><td><input type='text' disabled='disabled' id='euroValue' class='form-control '></td><td style='text-align:center;'><a class='btn btn-success btn-sm btn-hizli-save-row' disabled='disabled' style='margin-right:5px;'><i class='fas fa-plus'></i></a><a class='btn btn-danger btn-sm btn-hizli-cancel-row' disabled='disabled' href='#'><i class='fas fa-times-circle'></i></a></td></tr></tbody>";
            olusturabilirMi = false;
        }
    }
    $("body").off('click',
        '#btnFinishedInterview').on('click',
        '#btnFinishedInterview',
        function() {
            var table = $('.table-responsive table');
            var sira = 0;

            $('#modalFinishedInterview').remove();
            window.setModal.Create({
                id: 'modalFinishedInterview',
                html: {
                    header: '<i class="fa-solid fa-clipboard-question"></i> Finished Interview',
                    body: String.format('<div class="sabit-fields"></div><div class="hizli-ekle-new-row"><h4 style="margin-top:10px"><i class="fa fa-info"></i> Yeni Kayıt Ekle</h4></div><hr><div class="hizli-ekle-records"><h4 style="margin-top:0"><i class="fa fa-info"></i> Kayıt(lar)ı Güncelle</h4></div>'),
                    footer: '<button id="btnKaydetOlustur" type="button" class="btn btn-sm btn-primary">Kaydet</button><button class="btn btn-danger btn-sm" data-dismiss="modal" onclick="window.location.reload();" ">Kapat</button>'
                },
                settings: {
                    widthClass: 'modal-full-width'
                }
            });

            var modalBody = $('#modalFinishedInterview .modal-body'),
                bodySabitFields = modalBody.find('.sabit-fields'),
                bodyNewRow = modalBody.find('.hizli-ekle-new-row'),
                bodyRecords = modalBody.find('.hizli-ekle-records');

            bodySabitFields.append($('<table/>', {
                class: 'table table-bordered table-hover',
                'style': 'margin-bottom:0;'
            }).append("<thead><tr><th>Photos</th><th>Payment Date</th><th>Agreed Currency</th><th>Currency Rate</th></tr></thead><tbody style='background:white !important'><tr><td style='width:350px;'><div><fielset style='font-size: 15px; text-align:center;'><input type='radio' value=0 name='Yes' id=yes style='width:15px;height:15px;margin-right:20px;margin-left:20px;'><label for='yes'> YES </label><input type='radio' value=1 name='No' id=no style='width:15px;height:15px;margin-right:20px;margin-left:20px;'><label for='no'> NO </label></fielset></div></td><td><input id='date' type='text' ></td><td><div id='agreedCurrency' ></div></td><td><input id='kur' type='text' disabled ></td></tr></tbody>"));

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
            prepareSelect2('#agreedCurrency',
                '/Summary/LookupFieldValues', {
                    coId: '013CAAAE47B6475E9FE3396E0E32CA54',
                    id: '6EA9D01488324F19B16CB6C15EE8CEF4',
                    viewFilterId: 'F0EA08321C204C728211ABB7192E2B8A'
                },
                null,
                false);
            var agreed = $('label[for=6EA9D01488324F19B16CB6C15EE8CEF4]').parent().data();

            if (agreed != null || agreed != undefined) {
                setTimeout(function() {
                    prepareSelect2SelectedOneItem(String.format('#agreedCurrency'), agreed.publicids, agreed.value, false);
                    $('#agreedCurrency').trigger('change');
                }, 1000);

            }


            $(document).on('click', 'input[type="radio"]', function() {
                $(this).closest('td').find('input[type="radio"]').not(this).prop('checked', false);
            });

            bodyNewRow.append($('<table/>', {
                class: 'table table-bordered table-hover',
                'style': 'margin-bottom:0;'
            }).append(string2));

            prepareSelect2('#officeSoldPruduct',
                '/Summary/LookupFieldValues', {
                    coId: '013CAAAE47B6475E9FE3396E0E32CA54',
                    id: 'BB58CAD5D03B45C1A3751CBC48E4A000',
                    viewFilterId: '93151793288F47CDA2ACA86575AB889B'
                },
                null,
                false);

            prepareSelect2('#doctor',
                '/Summary/LookupFieldValues', {
                    coId: '013CAAAE47B6475E9FE3396E0E32CA54',
                    id: 'E6FC933B161249AEA60EF4ECCDC4D395',
                    viewFilterId: '3798E1B3E59B4E24805C067496BA0317'
                },
                null,
                false);

            if (!olusturabilirMi) {
                $('#officeSoldPruduct').select2('enable', false);
                $('#doctor').select2('enable', false);

            }

            bodyRecords.append($('<table/>', {
                class: 'table table-bordered table-hover',
                'style': 'margin-bottom:0;table-layout: fixed;'
            }).append($("<thead/>").html('<tr><th>Office Sold Products</th><th>Quantity 2</th><th>Doctor</th><th>List Price 2</th><th>Euro Price 2</th><th>Amount 2</th><th>Product Note 2</th><th>Euro Value</th><th style="width: 100px !important;text-align: center;">İşlem</th></tr>')).append($('<tbody/>')));

            var tbody = bodyRecords.find('tbody'),
                thead = bodyRecords.find('thead'),
                coId = "013CAAAE47B6475E9FE3396E0E32CA54",
                tableId = "3171872DB927452399450B0E1DF4BA82";

            tbody.attr('style',
                'background:white !important');
            var url = 'https://saphirewebapi.setcrm.com/api/data/TabloOkuma?coId=' + coId + '&tableId=' + tableId + '&recordId=' + $('#RecordPublicId').val();
            var url2 = 'https://localhost:44378/api/data/TabloOkuma?coId=' + coId + '&tableId=' + tableId + '&recordId=' + $('#RecordPublicId').val();

            var productId = "",
                productName = "",
                quantity = "",
                doctorId = "",
                doctorName = "",
                listPrice = "",
                euroPrice = "",
                discounted = "",
                amount = "",
                discountRate = "",
                total = "",
                productNote = "",
                euroValue = "";
            $.get(url,
                function(r) {
                    if (r) {
                        $.each(r, function(i, v) {
                            $.each(v, function(k, l) {

                                if (l.PublicId == 'BB58CAD5D03B45C1A3751CBC48E4A000') {
                                    productId = l.Value;
                                    productName = l.Txt;
                                } else if (l.PublicId == '9BEEAFA2D063494BB616458B97CEB7B7') {
                                    quantity = l.Value;
                                } else if (l.PublicId == 'E6FC933B161249AEA60EF4ECCDC4D395') {
                                    doctorId = l.Value;
                                    doctorName = l.Txt;
                                } else if (l.PublicId == 'CC55CE01006048468A6357A71DF1C01E') {
                                    listPrice = l.Value;
                                } else if (l.PublicId == 'BB399AC8EB0346E1BB9D93A0AF38D5C3') {
                                    euroPrice = l.Value;
                                } else if (l.PublicId == '42F852A787104204A7ACD6CF76BF8B3A') {
                                    amount = l.Value;
                                } else if (l.PublicId == 'A33CDFDAC3864F9D9204E5948BCE022C') {
                                    productNote = l.Value;
                                } else if (l.PublicId == 'A73ACA6798B94BA48F18F940CD3812A1') {
                                    euroValue = l.Value;
                                }
                            });

                            tbody.append(String.format(string, sira, listPrice, euroPrice, discounted, amount, discountRate, total, productNote, euroValue, quantity));

                            prepareSelect2('#officeSoldPruduct_' + i,
                                '/Summary/LookupFieldValues', {
                                    coId: '013CAAAE47B6475E9FE3396E0E32CA54',
                                    id: 'BB58CAD5D03B45C1A3751CBC48E4A000',
                                    viewFilterId: '93151793288F47CDA2ACA86575AB889B'
                                },
                                null,
                                false);

                            if (!String.isNullOrWhiteSpace(productId) && !String.isNullOrWhiteSpace(productName)) {
                                prepareSelect2SelectedOneItem('#officeSoldPruduct_' + i, productId, productName, false);
                            }

                            prepareSelect2('#doctor_' + i, '/Summary/LookupFieldValues', {
                                coId: '013CAAAE47B6475E9FE3396E0E32CA54',
                                id: 'E6FC933B161249AEA60EF4ECCDC4D395',
                                viewFilterId: '3798E1B3E59B4E24805C067496BA0317'
                            }, null, false);

                            if (!String.isNullOrWhiteSpace(doctorId) && !String.isNullOrWhiteSpace(doctorName)) {
                                prepareSelect2SelectedOneItem('#doctor_' + i, doctorId, doctorName, false);
                            }

                            if (!guncelleyebilirMi) {
                                $('#officeSoldPruduct_' + i).select2('enable', false);
                                $('#doctor_' + i).select2('enable', false);

                            }
                            sira = i + 1;

                        });


                    } else {
                        setUtil.alert({
                            container: '#modalBakiye .modal-body #msg',
                            message: r.Message,
                            alertClass: 'alert-danger',
                            autoClose: false
                        });
                    }
                });

            $('.table-responsive table tbody tr').each(function(i, v) {

                $('body').on('change', '#firma_' + recordId, function() {
                    if (String.isNullOrWhiteSpace($(this).val())) {
                        $(String.format('#bagliOlduguProje_{0}, #bagliOlduguProjeAdimi_{0}, #bagliOlduguMira_{0}', recordId)).select2('data', null).select2('enable', false);
                    } else {
                        $(String.format('#bagliOlduguProje_{0}', recordId)).select2('enable', true);
                        prepareSelect2('#bagliOlduguProje_' + recordId, '/Summary/LookupFieldValues', {
                            coId: '32654333EF6045E1BDE5716552775C33',
                            id: '5121456B7A7040F591331F1B1D6B027B',
                            viewFilterId: 'EF792B24BFF64E4BB7222686307B0E37',
                            controllingRecordId: $(this).val(),
                            itemId: '5121456B7A7040F591331F1B1D6B027B',
                            groupIds: $(this).val()
                        }, null, false);
                    }
                });


            });

            $('body').off('click', '.btn-hizli-save-row').on('click', '.btn-hizli-save-row', function() {
                var $this = $(this),
                    tr = $this.parents('tr');

                var product = tr.find(String.format("#officeSoldPruduct")).select2('data'),
                    doctor = tr.find(String.format("#doctor")).select2('data'),
                    quantity = tr.find(String.format("#quantity")).val(),
                    listPrice = tr.find(String.format("#listPrice")).val(),
                    discounted = "",
                    discountRate = "",
                    amount = tr.find(String.format("#amount")).val(),
                    productNote = tr.find(String.format("#productNote")).val(),
                    total = "",
                    euroPrice = tr.find(String.format("#euroPrice")).val(),
                    euroValue = tr.find(String.format("#euroValue")).val(),
                    agreed = tr.find(String.format("#agreedCurrency")).val();

                if (product == null) {
                    notify("danger", "Lütfen Office Sold Product alanını doldurup tekrar deneyiniz!");
                    return;
                }
                var doctorid = "";
                var doctortext = "";

                if (doctor != null) {
                    doctorid = doctor.id;
                    doctortext = doctor.text;
                }

                $('.btn-hizli-save-row').addClass('disabled');

                var model = {
                    ProductId: product.id,
                    ProductName: product.text,
                    DoctorId: doctorid,
                    DoctorName: doctortext,
                    Quantity: quantity,
                    ListPrice: listPrice,
                    Discounted: discounted,
                    DiscountRate: discountRate,
                    Amount: amount,
                    ProductNote: productNote,
                    Total: total,
                    UsdPrice: euroPrice,
                    UsdValue: euroValue,
                    AgreedCurrency: agreed
                };

                newRow(model);
                $('.btn-hizli-cancel-row').trigger('click');


            });

            $('body').off('click',
                '#btnKaydetOlustur').on('click',
                '#btnKaydetOlustur',
                function() {
                    var photo = $('#yes').prop('checked');
                    var agreed = $('#agreedCurrency').val();
                    // var data3 = {
                    //     customObjectId: $('#CustomObjectPublicId').val(),
                    //     recordId: $('#RecordPublicId').val(),
                    //     fieldId: '6EA9D01488324F19B16CB6C15EE8CEF4',
                    //     value: agreed
                    // };
                    // $.post('/Set/UpdateFieldValue', data3, function(r) {
                    //     if (r.IsOk) {}
                    // });

                    var url = 'https://saphirewebapi.setcrm.com/api/data/AgreedUpdate?recordId=' + $('#RecordPublicId').val() + '&val=' + agreed;
                    var url2 = 'https://localhost:44378/api/data/AgreedUpdate?recordId=' + $('#RecordPublicId').val() + '&val=' + agreed;

                    $.get(url,
                        function(r) {});

                    if (photo) {

                        var data3 = {
                            customObjectId: $('#CustomObjectPublicId').val(),
                            recordId: $('#RecordPublicId').val(),
                            fieldId: '64C64B127D8F486E832BC9DF9BC94906',
                            value: "DE2D5A7B38124F0A893CFF7CEF60A339"
                        };
                        $.post('/Set/UpdateFieldValue', data3, function(r) {
                            if (r.IsOk) {
                                setTimeout(() => {
                                    // window.location.reload();
                                }, 500);
                            }
                        });

                        //   $('.btn-br-actions[data-publicid=5627B7E24F2C42DCBC0D41C066DEF8F9]').show();
                        //   $('.btn-br-actions[data-publicid=247960BC33AE4BB185B409EEC0BDD612]').show();
                        var data6 = {
                            customObjectId: $('#CustomObjectPublicId').val(),
                            recordId: $('#RecordPublicId').val(),
                            fieldId: '477E9D8D67D04824A6B0C0227CD22891',
                            // value: "62BCBBDE4AAA41D18DFC27DF84E9E931"
                            value: "5B0F5E6225C44F1C9CD70F44C09E5B62"
                        };
                        $.post('/Set/UpdateFieldValue',
                            data6,
                            function(r) {
                                if (r.IsOk) {}
                            });
                    } else {

                        var data4 = {
                            customObjectId: $('#CustomObjectPublicId').val(),
                            recordId: $('#RecordPublicId').val(),
                            fieldId: '64C64B127D8F486E832BC9DF9BC94906',
                            value: "88751E9493654585B0F42BD2CDC051F9"
                        };
                        $.post('/Set/UpdateFieldValue', data4, function(r) {
                            if (r.IsOk) {
                                setTimeout(() => {
                                    // window.location.reload();
                                }, 500);
                            }
                        });
                        //  $('.btn-br-actions[data-publicid=5627B7E24F2C42DCBC0D41C066DEF8F9]').hide();
                        //  $('.btn-br-actions[data-publicid=247960BC33AE4BB185B409EEC0BDD612]').hide();
                        var data7 = {
                            customObjectId: $('#CustomObjectPublicId').val(),
                            recordId: $('#RecordPublicId').val(),
                            fieldId: '477E9D8D67D04824A6B0C0227CD22891',
                            // value: "E7F9399E59F9451A9ABDC12BA0F911AD"
                            value: "5B0F5E6225C44F1C9CD70F44C09E5B62"

                        };
                        $.post('/Set/UpdateFieldValue',
                            data7,
                            function(r) {
                                if (r.IsOk) {}
                            });
                    }
                    var data = {
                        customObjectId: $('#CustomObjectPublicId').val(),
                        recordId: $('#RecordPublicId').val(),
                        fieldId: '6C950659E83A4E57B4222F40509B5685',
                        value: $('#date').val()
                    };
                    $.post('/Set/UpdateFieldValue',
                        data,
                        function(r) {
                            if (r.IsOk) {
                                return
                            }
                        });


                    CreateNewOrder();

                });

            function CreateNewOrder() {
                var modelList = [];
                var trList = $('.hizli-ekle-records tbody tr');
                var recordId = $('#RecordPublicId').val();
                var top = parseFloat(0);
                var Etop = parseFloat(0);

                $.each(trList,
                    function(i,
                        el) {
                        var rowId = $(this).closest('tr').data('id');
                        var quantity = $('#quantity_' + rowId).val();
                        var doctorid = "";
                        var doctorText = "";
                        var productid = "";
                        var producttext = "";


                        var doctor = $('#doctor_' + rowId).select2('data');
                        if (doctor != null || doctor != undefined) {
                            doctorid = doctor.id;
                            doctorText = doctor.text
                        }

                        var product = $('#officeSoldPruduct_' + rowId).select2('data');
                        if (product != null || product != undefined) {
                            productid = product.id;
                            producttext = product.text
                        }

                        var listPrice = $('#listPrice_' + rowId).val();
                        var euroPrice = $('#euroPrice_' + rowId).val();
                        var discounted = "";
                        var discountRate = "";
                        var amount = $('#amount_' + rowId).val();
                        var euroValue = $('#euroValue_' + rowId).val();
                        var productNote = $('#productNote_' + rowId).val();
                        var total = "";
                        var photos = $(el).find("td input[type=radio]:checked").val();
                        var paymentDate = $('#date').val();

                        var euroVal = euroValue;

                        var model = {
                            RecordId: recordId,
                            ProductId: productid,
                            ProductName: producttext,
                            DoctorId: doctorid,
                            DoctorName: doctorText,
                            Quantity: quantity,
                            ListPrice: listPrice,
                            Discounted: discounted,
                            DiscountRate: discountRate,
                            Amount: amount,
                            ProductNote: productNote,
                            Total: total,
                            UsdPrice: euroPrice,
                            UsdValue: euroValue,
                            Photo: photos,
                            PaymentDate: paymentDate
                        };
                        modelList.push(model);

                        // if (euroVal.toString().includes('.')) {
                        //     euroVal.replace('.', ',');
                        // }
                        // if (euroVal.toString().includes(',')) {
                        //     euroVal.replace(',', '.');
                        // }
                        // euroVal = calcSeparatorRemove(euroVal);
                        // top = turkishLanguagePriceFormatedOutput(parseFloat(top) + parseFloat(euroVal));

                        top += parseFloat(euroVal);
                        Etop += parseFloat(listPrice);



                        if (i == (trList.length - 1)) {
                            $("#modalNewOrder").modal("toggle");
                        }
                    });

                var dataa = {
                    customObjectId: $('#CustomObjectPublicId').val(),
                    recordId: $('#RecordPublicId').val(),
                    fieldId: '9F2B1BDA82F743E695AC18B85FE4C559',
                    value: turkishLanguagePriceFormatedOutput(calcSeparatorRemove(top.toString()))
                };
                $.post('/Set/UpdateFieldValue',
                    dataa,
                    function(r) {
                        if (r.IsOk) {}
                    });
                var dataaE = {
                    customObjectId: $('#CustomObjectPublicId').val(),
                    recordId: $('#RecordPublicId').val(),
                    fieldId: '5C260D69AC034E17AC1BA1B00BDDA031',
                    value: turkishLanguagePriceFormatedOutput(calcSeparatorRemove(Etop.toString()))
                };
                $.post('/Set/UpdateFieldValue',
                    dataaE,
                    function(r) {
                        if (r.IsOk) {}
                    });

                var url = 'https://saphirewebapi.setcrm.com/api/data/CreateTable';
                var url2 = 'https://localhost:44378/api/data/CreateTable';
                $('#modalLoading').remove();
                window.setModal.Create({
                    id: 'modalLoading',
                    html: {
                        header: 'Bilgi',
                        body: '<div class="msg"></div><div id="txt" style="margin:0 0 5px; width: 100%;">İşlem biraz uzun sürebilir, lütfen bekleyiniz..<br/><img src="/Public/img/loading_bar.gif"></div>',
                    }
                });
                $('#modalLoading').modal('toggle');
                $.ajax({
                    contentType: 'application/json',
                    type: "POST",
                    url: url,
                    dataType: "json",
                    data: JSON.stringify(modelList),
                    async: true,
                    success: function(r) {
                        if (r.Status) {
                            $('#modalFinishedInterview').hide();
                            $('#modalLoading').hide();
                            $('#modalLoading').modal('toggle');
                            $('.btn-br-actions[data-publicid=746DA67F0C814DBF889B29C3FCEDB0FA]').trigger('click');
                        } else {
                            $('#modalLoading .modal-body').html(r.Message);
                        }
                    }
                });

            }

            function newRow(model) {
                var productId = model.ProductId,
                    productName = model.ProductName,
                    doctorId = model.DoctorId,
                    doctorName = model.DoctorName,
                    quantity = String.isNullOrWhiteSpace(model.Quantity) ? '' : model.Quantity,
                    listPrice = String.isNullOrWhiteSpace(model.ListPrice) ? '' : model.ListPrice,
                    discounted = String.isNullOrWhiteSpace(model.Discounted) ? '' : model.Discounted,
                    discountRate = String.isNullOrWhiteSpace(model.DiscountRate) ? '' : model.DiscountRate,
                    amount = String.isNullOrWhiteSpace(model.Amount) ? '' : model.Amount,
                    productNote = String.isNullOrWhiteSpace(model.ProductNote) ? '' : model.ProductNote,
                    total = String.isNullOrWhiteSpace(model.Total) ? '' : model.Total,
                    euroPrice = String.isNullOrWhiteSpace(model.UsdPrice) ? '' : model.UsdPrice,
                    euroValue = String.isNullOrWhiteSpace(model.UsdValue) ? '' : model.UsdValue,
                    agreed = String.isNullOrWhiteSpace(model.AgreedCurrency) ? '' : model.AgreedCurrency;

                $(".hizli-ekle-records table tbody").prepend(String.format("<tr data-id='{0}'><td><div id='officeSoldPruduct_{0}' class = 'officeSoldPruduct' ></div></td><td><textarea rows='1' id='quantity_{0}' class='form-control quantity' style='resize:vertical'>{9}</textarea></td><td><div id='doctor_{0}'></div></td></div></td><td><textarea rows='1' id='listPrice_{0}' class='form-control listPrice' style='resize:vertical'>{1}</textarea></td><td><input type='text' id='euroPrice_{0}' class='form-control euroPrice' value='{2}' ></td><td><textarea rows='1' id='amount_{0}' class='form-control amount' style='resize:vertical'>{4}</textarea></td><td><textarea rows='1' id='productNote_{0}' class='form-control productNote' style='resize:vertical'>{7}</textarea></div></td><td><textarea rows='1' id='euroValue_{0}' class='form-control euroValue' style='resize:vertical'>{8}</textarea></div></td><td style='text-align:center;'><a rows='1' class='btn btn-danger btn-sm btn-delete'><i class='fas fa-times-circle'></i></div></td></tr>", sira, listPrice, euroPrice, discounted, amount, discountRate, total, productNote, euroValue, quantity));

                setTimeout(() => {
                        $(".hizli-ekle-records table tbody tr:first").removeAttr('style');
                    },
                    2000);

                prepareSelect2('#officeSoldPruduct_' + sira,
                    '/Summary/LookupFieldValues', {
                        coId: '013CAAAE47B6475E9FE3396E0E32CA54',
                        id: 'BB58CAD5D03B45C1A3751CBC48E4A000',
                        viewFilterId: '93151793288F47CDA2ACA86575AB889B'
                    },
                    null,
                    false);

                if (!String.isNullOrWhiteSpace(productId) && !String.isNullOrWhiteSpace(productName)) {
                    prepareSelect2SelectedOneItem('#officeSoldPruduct_' + sira, productId, productName, false);
                }

                prepareSelect2('#doctor_' + sira, '/Summary/LookupFieldValues', {
                    coId: '013CAAAE47B6475E9FE3396E0E32CA54',
                    id: 'E6FC933B161249AEA60EF4ECCDC4D395',
                    viewFilterId: '3798E1B3E59B4E24805C067496BA0317'
                }, null, false);

                if (!String.isNullOrWhiteSpace(doctorId) && !String.isNullOrWhiteSpace(doctorName)) {
                    prepareSelect2SelectedOneItem('#doctor_' + sira, doctorId, doctorName, false);
                }
                sira++;
                $('.btn-hizli-save-row').removeClass('disabled');
            }

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

            $('body').on('change',
                '#officeSoldPruduct',
                function() {
                    if (String.isNullOrWhiteSpace($(this).val())) {
                        //$('.listPrice').select2('data', null).select2('enable', false);
                        $('#listPrice').val("").trigger('change');

                    } else {
                        var url = '/set/product/detail/' + $(this).val();
                        $.get(url, function(sdata) {
                            var elem = $('<div/>').html(sdata);
                            var listPrice = elem.find('label[for=8FF8EEE3ECF84EF68861269C83B494C4]').parent().data('value');
                            $('#listPrice').val(listPrice).trigger('change');
                        });
                    }
                });

            $('body').on('change',
                '.officeSoldPruduct',
                function() {

                    var tr = $(this).closest('tr');

                    if (String.isNullOrWhiteSpace($(this).val())) {
                        //$('.listPrice').select2('data', null).select2('enable', false);
                        $('#listPrice').val("").trigger('change');

                    } else {
                        var url = '/set/product/detail/' + $(this).val();
                        $.get(url, function(sdata) {
                            var elem = $('<div/>').html(sdata);
                            var listPrice = elem.find('label[for=8FF8EEE3ECF84EF68861269C83B494C4]').parent().data('value');
                            tr.find('.listPrice').val(listPrice).trigger('change');
                        });
                    }
                });
            $('body').on('keyup',
                '#quantity',
                function() {
                    var val = $('#listPrice').val();
                    if (val.toString().includes('.')) {
                        val.replace('.', ',');
                    }
                    var miktar = $('#quantity').val();
                    if (miktar.toString().includes('.')) {
                        miktar.replace('.', ',');
                    }
                    var euroVal = $('#euroPrice').val();
                    if (euroVal.toString().includes('.')) {
                        euroVal.replace('.', ',');
                    }

                    if (!String.isNullOrWhiteSpace(val) && !String.isNullOrWhiteSpace(miktar)) {
                        val = calcSeparatorRemove(val);
                        miktar = calcSeparatorRemove(miktar);

                        var amount2 = turkishLanguagePriceFormatedOutput(parseFloat(val) * parseFloat(miktar));
                        $('#amount').val(amount2).trigger('change');
                    } else {
                        $('#amount').val('').trigger('change');
                    }


                    if (!String.isNullOrWhiteSpace(euroVal) && !String.isNullOrWhiteSpace(miktar)) {
                        euroVal = calcSeparatorRemove(euroVal);
                        miktar = calcSeparatorRemove(miktar);

                        var euroVal2 = turkishLanguagePriceFormatedOutput(parseFloat(euroVal) * parseFloat(miktar));
                        $('#euroValue').val(euroVal2).trigger('change');
                    } else {
                        $('#euroValue').val('').trigger('change');
                    }

                });

            $('body').on('keyup',
                '.quantity',
                function() {
                    var tr = $(this).closest('tr');
                    var val = tr.find('.listPrice').val();
                    if (val.toString().includes('.')) {
                        val.replace('.', ',');
                    }
                    var miktar = tr.find('.quantity').val();
                    if (miktar.toString().includes('.')) {
                        miktar.replace('.', ',');
                    }

                    var euroVal = $('.euroPrice').val();
                    if (euroVal.toString().includes('.')) {
                        euroVal.replace('.', ',');
                    }

                    if (!String.isNullOrWhiteSpace(val) && !String.isNullOrWhiteSpace(miktar)) {
                        val = calcSeparatorRemove(val);
                        miktar = calcSeparatorRemove(miktar);

                        var amount2 = turkishLanguagePriceFormatedOutput(parseFloat(val) * parseFloat(miktar));
                        tr.find('.amount').val(amount2).trigger('change');
                    } else {
                        tr.find('.amount').val('').trigger('change');
                    }

                    if (!String.isNullOrWhiteSpace(euroVal) && !String.isNullOrWhiteSpace(miktar)) {
                        euroVal = calcSeparatorRemove(euroVal);
                        miktar = calcSeparatorRemove(miktar);

                        var euroVal2 = turkishLanguagePriceFormatedOutput(parseFloat(euroVal) * parseFloat(miktar));
                        tr.find('.euroValue').val(euroVal2).trigger('change');
                    } else {
                        tr.find('.euroValue').val('').trigger('change');
                    }

                });

            $('body').on('change',
                '#euroPrice',
                function() {
                    var val = $('#euroPrice').val();
                    if (val.toString().includes('.')) {
                        val.replace('.', ',');
                    }
                    var miktar = $('#quantity').val();
                    if (miktar.toString().includes('.')) {
                        miktar.replace('.', ',');
                    }

                    if (!String.isNullOrWhiteSpace(val) && !String.isNullOrWhiteSpace(miktar)) {
                        val = calcSeparatorRemove(val);
                        miktar = calcSeparatorRemove(miktar);

                        var amount2 = turkishLanguagePriceFormatedOutput(parseFloat(val) * parseFloat(miktar));
                        $('#euroValue').val(amount2).trigger('change');
                    } else {
                        $('#euroValue').val('').trigger('change');
                    }

                });
            $('body').on('change',
                '.euroPrice',
                function() {
                    var tr = $(this).closest('tr');
                    var val = tr.find('.euroPrice').val();
                    if (val.toString().includes('.')) {
                        val.replace('.', ',');
                    }
                    var miktar = tr.find('.quantity').val();
                    if (miktar.toString().includes('.')) {
                        miktar.replace('.', ',');
                    }

                    if (!String.isNullOrWhiteSpace(val) && !String.isNullOrWhiteSpace(miktar)) {
                        val = calcSeparatorRemove(val);
                        miktar = calcSeparatorRemove(miktar);

                        var amount2 = turkishLanguagePriceFormatedOutput(parseFloat(val) * parseFloat(miktar));
                        tr.find('.euroValue').val(amount2).trigger('change');
                    } else {
                        tr.find('.euroValue').val('').trigger('change');
                    }

                });

            $('body').on('change',
                '#listPrice',
                function() {

                    if (!String.isNullOrWhiteSpace($(this).val())) {
                        dovizliTutarHesaplamaNew();
                    } else {
                        $('#euroPrice').val('').trigger('change');
                    }
                });

            $('body').on('change',
                '#agreedCurrency',
                function() {
                    var agreedCurrency = $('#agreedCurrency').val();
                    if (!String.isNullOrWhiteSpace(agreedCurrency)) {
                        kurHesapla(agreedCurrency);
                    } else {
                        $('#kur').val('').trigger('change');
                    }
                });

            $('body').on('change',
                '#kur',
                function() {
                    $('#listPrice').trigger('change');
                    $('.listPrice').trigger('change');

                });

            $('body').on('change',
                '.listPrice',
                function() {
                    var tr = $(this).closest('tr');

                    if (!String.isNullOrWhiteSpace($(this).val())) {
                        dovizliTutarHesaplamaTr(tr);
                    } else {
                        tr.find('.euroPrice').val('').trigger('change');
                    }

                });


            $('body').on('click',
                '.btn-hizli-cancel-row',
                function() {
                    $('#officeSoldPruduct, #doctor').select2('data', null).trigger('change');
                    $('.btn-hizli-cancel-row').parents('tr').find('#listPrice, #amount, #euroPrice, #euroValue, #productNote, #quantity').val('');
                });

            $('body').on('click',
                '.btn-delete',
                function() {
                    $(this).closest('tr').remove();
                });
            $('#modalFinishedInterview').modal({
                backdrop: 'static',
                keyboard: false
            });

        });

    function turkishLanguagePriceFormatedOutput(price, digit) {
        //metoda gelicek değerin , kısımların replace edilip gönderilmesi gerekiyor. /,/g kısmı , replace ediyorum.

        if (String.isNullOrWhiteSpace(digit)) {
            digit = 2;
        }
        var oldPrice = price;
        if (String.isNullOrWhiteSpace(price)) {
            price = "0";
        }

        var currency_symbol = "₺";
        var formattedOutput = new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'TRY',
            minimumFractionDigits: digit,
        });
        return isNaN(price) ? oldPrice : formattedOutput.format(price).replace(currency_symbol, '');

    }

    function calcSeparatorRemove(value) {
        var returnedString = String.isNullOrWhiteSpace(value) ? "0" : value.replace(".",
            "").replace(",",
            ".");
        return returnedString;
    }

    function dovizliTutarHesaplamaNew() {
        var listPrice = $('#listPrice').val();
        var kur = $('#kur').val();
        if (listPrice.toString().includes('.')) {
            listPrice.replace('.', ',');
        }
        if (kur.toString().includes('.')) {
            kur.replace('.', ',');
        }
        var miktar = $('#quantity').val();
        if (miktar.toString().includes('.')) {
            miktar.replace('.', ',');
        }
        var dovizli = "";
        if (!String.isNullOrWhiteSpace(listPrice) && !String.isNullOrWhiteSpace(kur)) {
            listPrice = calcSeparatorRemove(listPrice);
            kur = calcSeparatorRemove(kur);

            dovizli = (parseFloat(listPrice) * parseFloat(kur)).toString();
            dovizli = turkishLanguagePriceFormatedOutput(dovizli).toString();
        }
        $('#euroPrice').val(dovizli).trigger('change');

        if (!String.isNullOrWhiteSpace(listPrice) && !String.isNullOrWhiteSpace(miktar)) {
            listPrice = calcSeparatorRemove(listPrice);
            miktar = calcSeparatorRemove(miktar);

            var amount2 = turkishLanguagePriceFormatedOutput(parseFloat(listPrice) * parseFloat(miktar));
            $('#amount').val(amount2).trigger('change');
        } else {
            $('#amount').val('').trigger('change');
        }
    }

    function kurHesapla(val) {
        var kur = "";
        var euro = $('label[for=25473509DFC4430D99243EC3FD949886]').parent().data('value');
        if (euro.toString().includes(',')) {
            euro.replace(',', '.');
        }
        var dolar = $('label[for=638398BB24454FCD86857A64A5FDBB76]').parent().data('value');
        if (dolar.toString().includes(',')) {
            dolar.replace(',', '.');
        }

        if (!String.isNullOrWhiteSpace(euro) && !String.isNullOrWhiteSpace(dolar)) {
            euro = calcSeparatorRemove(euro);
            dolar = calcSeparatorRemove(dolar);
        }

        if (val == "A79964CCBBFC4007A26FAEA1E190EC0D") {
            //euro
            kur = "1";
        } else if (val.trimEnd() == "CC7FE6A5B53E4F4493F70F008A3F15AF") {
            //dolar
            kur = (parseFloat(euro) / parseFloat(dolar)).toString();

        } else if (val.trimEnd() == "13619C0E9001490593930F1B8E19B158") {
            //tl
            kur = euro;
        }

        if (kur.toString().includes(',')) {
            kur.replace(',', '.');
        }

        $('#kur').val(turkishLanguagePriceFormatedOutput(kur)).trigger('change');
    }

    function dovizliTutarHesaplamaTr(tr) {
        var listPrice = tr.find('.listPrice').val();
        var kur = $('#kur').val();

        if (listPrice.toString().includes('.')) {
            listPrice.replace('.', ',');
        }
        if (kur.toString().includes('.')) {
            kur.replace('.', ',');
        }
        var miktar = $('.quantity').val();
        if (miktar.toString().includes('.')) {
            miktar.replace('.', ',');
        }
        var dovizli = "";
        if (!String.isNullOrWhiteSpace(listPrice) && !String.isNullOrWhiteSpace(kur)) {
            listPrice = calcSeparatorRemove(listPrice);
            kur = calcSeparatorRemove(kur);

            dovizli = (parseFloat(listPrice) * parseFloat(kur)).toString();
            dovizli = turkishLanguagePriceFormatedOutput(dovizli).toString();
        }
        tr.find('.euroPrice').val(dovizli).trigger('change');
        if (!String.isNullOrWhiteSpace(listPrice) && !String.isNullOrWhiteSpace(miktar)) {
            listPrice = calcSeparatorRemove(listPrice);
            miktar = calcSeparatorRemove(miktar);

            var amount2 = turkishLanguagePriceFormatedOutput(parseFloat(listPrice) * parseFloat(miktar));
            tr.find('.amount').val(amount2).trigger('change');
        } else {
            tr.find('.amount').val('').trigger('change');
        }
    }
});