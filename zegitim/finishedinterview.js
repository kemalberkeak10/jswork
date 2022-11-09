$(function() {
    $('.btn-br-actions[data-publicid=746DA67F0C814DBF889B29C3FCEDB0FA]').hide();
    //$('[data-publicid=746DA67F0C814DBF889B29C3FCEDB0FA]').prepend('<a id="btnFinishedInterview" class="btn btn-warning btn-sm" style="margin-right: 5px;">Finished Interview</a>');
    $('.btn-br-actions[data-publicid=746DA67F0C814DBF889B29C3FCEDB0FA]').closest('td').prepend('<a id="btnFinishedInterview" class="btn btn-sm btn-warning"style="margin-right:10px;" >Finished Interview</a>');


    var photosYesNo = $('label[for=64C64B127D8F486E832BC9DF9BC94906]').parent().data('publicids');
    if (photosYesNo == "0798D291BC5C488ABEED43CBD5A5CC08") {
        photosYesNo = "Yes"
        $('.btn-br-actions[data-publicid=5627B7E24F2C42DCBC0D41C066DEF8F9]').show();
        $('.btn-br-actions[data-publicid=247960BC33AE4BB185B409EEC0BDD612]').show();
        $('a[data-publicid= 5D269E9A16584586A01EB885CBD639BE]').closest('td').hide(); //open medical Form
        $('a[data-publicid= 3A5CDF27A8EA4B6F8CD41FB50F0F9EF1]').closest('td').hide(); //With Accounted
        $('a[data-publicid= 0D4FC71E01144AB3A16390000F649098]').closest('td').hide(); //Medication Check
        $('a[data-publicid= 16879AF614434B98AC2E94C12DFBF09E]').closest('td').hide(); //X-Ray
        $('a[data-publicid= 6F694F6DBD304745A64F539E7DB7A62F]').closest('td').hide(); //We Took Payment
        $('a[data-publicid= E850A6F8CEF24F148C4995570191802E]').closest('td').hide();
        $('a[data-publicid= E850A6F8CEF24F148C4995570191802E]').hide(); //Take Him To The Next Doctor
        $('a[data-publicid= 602A8C560FD04F6796159E78C0A18B21]').closest('td').hide(); //Send To Interview
        $('a[data-publicid= 247960BC33AE4BB185B409EEC0BDD612]').closest('td').show(); //With Photographer
        $('a[data-publicid= 6D20E2A9E73A43B59DB3ACDD47F951B7]').closest('td').hide(); //Request A Car
        $('a[data-publicid= 83DFA5803998437BA0C6779C1F81DFA5]').closest('td').hide(); //Inter Interview
        $('a[data-publicid= 5627B7E24F2C42DCBC0D41C066DEF8F9]').closest('td').show(); //Finished Photographer
        $('a[data-publicid= E14C74E8A64F4BBD983234B6CC85E6F6]').closest('td').hide(); //Next Visit Day
        $('a[data-publicid= 746DA67F0C814DBF889B29C3FCEDB0FA]').closest('td').hide(); //Finished Interview
        $('a[data-publicid= E02BD894B0394EADB9AAF19A1EF8FD20]').closest('td').hide(); //Waiting The Doctor
        $('a[data-publicid= 432A1F3EA144450298897FF6ACD2B2B2]').closest('td').hide(); //Accounted today
        $('a[data-publicid= 17855BD0A233480FAD4C3F77C25B85CF]').closest('td').hide(); //With the doctor
    } else {
        photosYesNo = "No"
        $('.btn-br-actions[data-publicid=5627B7E24F2C42DCBC0D41C066DEF8F9]').hide();
        $('.btn-br-actions[data-publicid=247960BC33AE4BB185B409EEC0BDD612]').hide();
        $('a[data-publicid= 5D269E9A16584586A01EB885CBD639BE]').closest('td').hide(); //open medical Form
        $('a[data-publicid= 3A5CDF27A8EA4B6F8CD41FB50F0F9EF1]').closest('td').hide(); //With Accounted
        $('a[data-publicid= 0D4FC71E01144AB3A16390000F649098]').closest('td').hide(); //Medication Check
        $('a[data-publicid= 16879AF614434B98AC2E94C12DFBF09E]').closest('td').hide(); //X-Ray
        $('a[data-publicid= 6F694F6DBD304745A64F539E7DB7A62F]').closest('td').hide(); //We Took Payment
        $('a[data-publicid= E850A6F8CEF24F148C4995570191802E]').closest('td').hide();
        $('a[data-publicid= E850A6F8CEF24F148C4995570191802E]').hide(); //Take Him To The Next Doctor
        $('a[data-publicid= 602A8C560FD04F6796159E78C0A18B21]').closest('td').hide(); //Send To Interview
        $('a[data-publicid= 247960BC33AE4BB185B409EEC0BDD612]').closest('td').hide(); //With Photographer
        $('a[data-publicid= 6D20E2A9E73A43B59DB3ACDD47F951B7]').closest('td').hide(); //Request A Car
        $('a[data-publicid= 83DFA5803998437BA0C6779C1F81DFA5]').closest('td').hide(); //Inter Interview
        $('a[data-publicid= 5627B7E24F2C42DCBC0D41C066DEF8F9]').closest('td').hide(); //Finished Photographer
        $('a[data-publicid= E14C74E8A64F4BBD983234B6CC85E6F6]').closest('td').hide(); //Next Visit Day
        $('a[data-publicid= 746DA67F0C814DBF889B29C3FCEDB0FA]').closest('td').hide(); //Finished Interview
        $('a[data-publicid= E02BD894B0394EADB9AAF19A1EF8FD20]').closest('td').hide(); //Waiting The Doctor
        $('a[data-publicid= 432A1F3EA144450298897FF6ACD2B2B2]').closest('td').hide(); //Accounted today
        $('a[data-publicid= 17855BD0A233480FAD4C3F77C25B85CF]').closest('td').hide(); //With the doctor
    }
    $("#64C64B127D8F486E832BC9DF9BC94906").on('change', function() {
        var photosYesNo = $('label[for=64C64B127D8F486E832BC9DF9BC94906]').parent().data('publicids');
        if (photosYesNo == "0798D291BC5C488ABEED43CBD5A5CC08") {
            photosYesNo = "Yes"
            $('.btn-br-actions[data-publicid=5627B7E24F2C42DCBC0D41C066DEF8F9]').show();
            $('.btn-br-actions[data-publicid=247960BC33AE4BB185B409EEC0BDD612]').show();
            $('a[data-publicid= 5D269E9A16584586A01EB885CBD639BE]').closest('td').hide(); //open medical Form
            $('a[data-publicid= 3A5CDF27A8EA4B6F8CD41FB50F0F9EF1]').closest('td').hide(); //With Accounted
            $('a[data-publicid= 0D4FC71E01144AB3A16390000F649098]').closest('td').hide(); //Medication Check
            $('a[data-publicid= 16879AF614434B98AC2E94C12DFBF09E]').closest('td').hide(); //X-Ray
            $('a[data-publicid= 6F694F6DBD304745A64F539E7DB7A62F]').closest('td').hide(); //We Took Payment
            $('a[data-publicid= E850A6F8CEF24F148C4995570191802E]').closest('td').hide();
            $('a[data-publicid= E850A6F8CEF24F148C4995570191802E]').hide(); //Take Him To The Next Doctor
            $('a[data-publicid= 602A8C560FD04F6796159E78C0A18B21]').closest('td').hide(); //Send To Interview
            $('a[data-publicid= 247960BC33AE4BB185B409EEC0BDD612]').closest('td').show(); //With Photographer
            $('a[data-publicid= 6D20E2A9E73A43B59DB3ACDD47F951B7]').closest('td').hide(); //Request A Car
            $('a[data-publicid= 83DFA5803998437BA0C6779C1F81DFA5]').closest('td').hide(); //Inter Interview
            $('a[data-publicid= 5627B7E24F2C42DCBC0D41C066DEF8F9]').closest('td').show(); //Finished Photographer
            $('a[data-publicid= E14C74E8A64F4BBD983234B6CC85E6F6]').closest('td').hide(); //Next Visit Day
            $('a[data-publicid= 746DA67F0C814DBF889B29C3FCEDB0FA]').closest('td').hide(); //Finished Interview
            $('a[data-publicid= E02BD894B0394EADB9AAF19A1EF8FD20]').closest('td').hide(); //Waiting The Doctor
            $('a[data-publicid= 432A1F3EA144450298897FF6ACD2B2B2]').closest('td').hide(); //Accounted today
            $('a[data-publicid= 17855BD0A233480FAD4C3F77C25B85CF]').closest('td').hide(); //With the doctor
        } else {
            photosYesNo = "No"
            $('.btn-br-actions[data-publicid=5627B7E24F2C42DCBC0D41C066DEF8F9]').hide();
            $('.btn-br-actions[data-publicid=247960BC33AE4BB185B409EEC0BDD612]').hide();
            $('a[data-publicid= 5D269E9A16584586A01EB885CBD639BE]').closest('td').hide(); //open medical Form
            $('a[data-publicid= 3A5CDF27A8EA4B6F8CD41FB50F0F9EF1]').closest('td').hide(); //With Accounted
            $('a[data-publicid= 0D4FC71E01144AB3A16390000F649098]').closest('td').hide(); //Medication Check
            $('a[data-publicid= 16879AF614434B98AC2E94C12DFBF09E]').closest('td').hide(); //X-Ray
            $('a[data-publicid= 6F694F6DBD304745A64F539E7DB7A62F]').closest('td').hide(); //We Took Payment
            $('a[data-publicid= E850A6F8CEF24F148C4995570191802E]').closest('td').hide();
            $('a[data-publicid= E850A6F8CEF24F148C4995570191802E]').hide(); //Take Him To The Next Doctor
            $('a[data-publicid= 602A8C560FD04F6796159E78C0A18B21]').closest('td').hide(); //Send To Interview
            $('a[data-publicid= 247960BC33AE4BB185B409EEC0BDD612]').closest('td').hide(); //With Photographer
            $('a[data-publicid= 6D20E2A9E73A43B59DB3ACDD47F951B7]').closest('td').hide(); //Request A Car
            $('a[data-publicid= 83DFA5803998437BA0C6779C1F81DFA5]').closest('td').hide(); //Inter Interview
            $('a[data-publicid= 5627B7E24F2C42DCBC0D41C066DEF8F9]').closest('td').hide(); //Finished Photographer
            $('a[data-publicid= E14C74E8A64F4BBD983234B6CC85E6F6]').closest('td').hide(); //Next Visit Day
            $('a[data-publicid= 746DA67F0C814DBF889B29C3FCEDB0FA]').closest('td').hide(); //Finished Interview
            $('a[data-publicid= E02BD894B0394EADB9AAF19A1EF8FD20]').closest('td').hide(); //Waiting The Doctor
            $('a[data-publicid= 432A1F3EA144450298897FF6ACD2B2B2]').closest('td').hide(); //Accounted today
            $('a[data-publicid= 17855BD0A233480FAD4C3F77C25B85CF]').closest('td').hide(); //With the doctor
        }
    });
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
                    footer: '<button id="btnKaydetOlustur" type="button" class="btn btn-sm btn-primary">Kaydet</button><button class="btn btn-danger btn-sm" data-dismiss="modal"">Kapat</button>'
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
            }).append("<thead><tr><th>Photos</th><th>Payment Date</th><th>Agreed Currency</th></tr></thead><tbody style='background:white !important'><tr><td style='width:350px;'><div><fielset style='font-size: 15px; text-align:center;'><input type='radio' value=0 name='Yes' id=yes style='width:15px;height:15px;margin-right:20px;margin-left:20px;'><label for='yes'> YES </label><input type='radio' value=1 name='No' id=no style='width:15px;height:15px;margin-right:20px;margin-left:20px;'><label for='no'> NO </label></fielset></div></td><td><input id='date' type='text' ></td><td><div id='agreedCurrency' ></div></td></tr></tbody>"));

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

            $(document).on('click', 'input[type="radio"]', function() {
                $(this).closest('td').find('input[type="radio"]').not(this).prop('checked', false);
            });

            bodyNewRow.append($('<table/>', {
                class: 'table table-bordered table-hover',
                'style': 'margin-bottom:0;'
            }).append("<thead><tr><th>Office Sold Products</th><th>Quantity 2</th><th>Doctor</th><th>List Price 2</th><th>Euro Price 2</th><th>Discount 2</th><th>Amount 2</th><th>Discount Rate 2</th><th>Total 2</th><th>Product Note 2</th><th>Euro Value</th><th style='width: 100px !important;text-align: center;'>İşlem</th></tr></thead><tbody style='background:white !important'><tr><td><div id='officeSoldPruduct' class=''></div></td><td><input type='text' id='quantity' class='form-control '></td><td><div id='doctor'class=''></div></td><td><input id='listPrice' type='text' class='form-control '></td><td><input id='euroPrice' type='text' class='form-control '></td><td><input type='text' id='discounted' class='form-control '></td><td><input type='text' id='amount' class='form-control '></td><td><input type='text' id='discountRate' class='form-control '></td><td><input type='text' id='total' class='form-control '></td><td><textarea rows='1' id='productNote' class='form-control ' style='resize:vertical'></textarea></td><td><input type='text' id='euroValue' class='form-control '></td><td style='text-align:center;'><a class='btn btn-success btn-sm btn-hizli-save-row' style='margin-right:5px;'><i class='fas fa-plus'></i></a><a class='btn btn-danger btn-sm btn-hizli-cancel-row' href='#'><i class='fas fa-times-circle'></i></a></td></tr></tbody>"));

            prepareSelect2('#officeSoldPruduct',
                '/Summary/LookupFieldValues', {
                    coId: '013CAAAE47B6475E9FE3396E0E32CA54',
                    id: 'BB58CAD5D03B45C1A3751CBC48E4A000',
                    viewFilterId: '62E047B81B3C4DC7B10F8C55EFA2597D'
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

            bodyRecords.append($('<table/>', {
                class: 'table table-bordered table-hover',
                'style': 'margin-bottom:0;table-layout: fixed;'
            }).append($("<thead/>").html('<tr><th>Office Sold Products</th><th>Quantity 2</th><th>Doctor</th><th>List Price 2</th><th>Euro Price 2</th><th>Discount 2</th><th>Amount 2</th><th>Discount Rate 2</th><th>Total 2</th><th>Product Note 2</th><th>Euro Value</th></tr>')).append($('<tbody/>')));

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
                                } else if (l.PublicId == 'C8896B286E9043AE902AD9A254D1F913') {
                                    quantity = l.Value;
                                } else if (l.PublicId == 'E6FC933B161249AEA60EF4ECCDC4D395') {
                                    doctorId = l.Value;
                                    doctorName = l.Txt;
                                } else if (l.PublicId == '9BDFBEDF59634911BF98DC58DC1C0F97') {
                                    listPrice = l.Value;
                                } else if (l.PublicId == 'FFD6B1571A394D94ADF8112BCF419926') {
                                    euroPrice = l.Value;
                                } else if (l.PublicId == '0015A0599C724F17959CC41E86F45BA5') {
                                    discounted = l.Value;
                                } else if (l.PublicId == '733EFD3F51604BC5A5FFC4FC3D8A4A76') {
                                    amount = l.Value;
                                } else if (l.PublicId == '3D9602D0870D447E9EE8F975133B9424') {
                                    discountRate = l.Value;
                                } else if (l.PublicId == '192CD8BFF546403FA15B6D925555DEFD') {
                                    total = l.Value;
                                } else if (l.PublicId == 'D43E22B1284C4E9F91CF9F81373F6973') {
                                    productNote = l.Value;
                                } else if (l.PublicId == '41CD02E6272F4560ACA9F6728E1BF123') {
                                    euroValue = l.Value;
                                }
                            });

                            tbody.append(String.format("<tr data-id='{0}'><td><div id='officeSoldPruduct_{0}'></div></td><td><textarea rows='1' id='quantity_{0}' class='form-control quantity' style='resize:vertical'>{9}</textarea></td><td><div id='doctor_{0}'></div></td></div></td><td><textarea rows='1' id='listPrice_{0}' class='form-control listPrice' style='resize:vertical'>{1}</textarea></td><td><input type='text' id='euroPrice_{0}' class='form-control euroPrice' value='{2}' ></td><td><textarea rows='1' id='discounted_{0}' class='form-control discounted' style='resize:vertical'>{3}</textarea></td><td><textarea rows='1' id='amount_{0}' class='form-control amount' style='resize:vertical'>{4}</textarea></td><td><textarea rows='1' id='discounted_Rate_{0}' class='form-control discounted_Rate' style='resize:vertical'>{5}</textarea></td><td><textarea rows='1' id='total_{0}' class='form-control total' style='resize:vertical'>{6}</textarea></div></td><td><textarea rows='1' id='productNote_{0}' class='form-control productNote' style='resize:vertical'>{7}</textarea></div></td><td><textarea rows='1' id='euroValue_{0}' class='form-control euroValue' style='resize:vertical'>{8}</textarea></div></td></tr>", sira, listPrice, euroPrice, discounted, amount, discountRate, total, productNote, euroValue, quantity));

                            prepareSelect2('#officeSoldPruduct_' + i,
                                '/Summary/LookupFieldValues', {
                                    coId: '013CAAAE47B6475E9FE3396E0E32CA54',
                                    id: 'BB58CAD5D03B45C1A3751CBC48E4A000',
                                    viewFilterId: '62E047B81B3C4DC7B10F8C55EFA2597D'
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
                    discounted = tr.find(String.format("#discounted")).val(),
                    discountRate = tr.find(String.format("#discountRate")).val(),
                    amount = tr.find(String.format("#amount")).val(),
                    productNote = tr.find(String.format("#productNote")).val(),
                    total = tr.find(String.format("#total")).val(),
                    euroPrice = tr.find(String.format("#euroPrice")).val(),
                    euroValue = tr.find(String.format("#euroValue")).val();

                if (product == null) {
                    notify("danger", "Lütfen Office Sold Product alanını doldurup tekrar deneyiniz!");
                    return;
                }

                $('.btn-hizli-save-row').addClass('disabled');

                var model = {
                    ProductId: product.id,
                    ProductName: product.text,
                    DoctorId: doctor.id,
                    DoctorName: doctor.text,
                    Quantity: quantity,
                    ListPrice: listPrice,
                    Discounted: discounted,
                    DiscountRate: discountRate,
                    Amount: amount,
                    ProductNote: productNote,
                    Total: total,
                    UsdPrice: euroPrice,
                    UsdValue: euroValue,
                };

                newRow(model);
                $('.btn-hizli-cancel-row').trigger('click');

            });

            $('body').off('click',
                '#btnKaydetOlustur').on('click',
                '#btnKaydetOlustur',
                function() {
                    var photo = $('#yes').prop('checked');
                    if (photo) {
                        var data3 = {
                            customObjectId: $('#CustomObjectPublicId').val(),
                            recordId: $('#RecordPublicId').val(),
                            fieldId: '64C64B127D8F486E832BC9DF9BC94906',
                            value: "0798D291BC5C488ABEED43CBD5A5CC08"
                        };
                        $.post('/Set/UpdateFieldValue', data3, function(r) {
                            if (r.IsOk) {
                                setTimeout(() => {
                                    // window.location.reload();
                                }, 500);
                            }
                        });

                        $('.btn-br-actions[data-publicid=5627B7E24F2C42DCBC0D41C066DEF8F9]').show();
                        $('.btn-br-actions[data-publicid=247960BC33AE4BB185B409EEC0BDD612]').show();
                        var data6 = {
                            customObjectId: $('#CustomObjectPublicId').val(),
                            recordId: $('#RecordPublicId').val(),
                            fieldId: '477E9D8D67D04824A6B0C0227CD22891',
                            value: "62BCBBDE4AAA41D18DFC27DF84E9E931"
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
                            value: "A7D8750BD7A84419BC9F29B4AD64A9C0"
                        };
                        $.post('/Set/UpdateFieldValue', data4, function(r) {
                            if (r.IsOk) {
                                setTimeout(() => {
                                    // window.location.reload();
                                }, 500);
                            }
                        });
                        $('.btn-br-actions[data-publicid=5627B7E24F2C42DCBC0D41C066DEF8F9]').hide();
                        $('.btn-br-actions[data-publicid=247960BC33AE4BB185B409EEC0BDD612]').hide();
                        var data7 = {
                            customObjectId: $('#CustomObjectPublicId').val(),
                            recordId: $('#RecordPublicId').val(),
                            fieldId: '477E9D8D67D04824A6B0C0227CD22891',
                            value: "E7F9399E59F9451A9ABDC12BA0F911AD"
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



                    CreateNewOrder()
                });

            function CreateNewOrder() {
                debugger;
                var modelList = [];
                var trList = $('.hizli-ekle-records tbody tr');
                var recordId = $('#RecordPublicId').val();
                debugger;
                $.each(trList,
                    function(i,
                        el) {
                        debugger;
                        var rowId = $(this).closest('tr').data('id');
                        var quantity = $('#quantity_' + rowId).text();
                        if ($('#officeSoldPruduct_' + rowId).select2('data') != null || $('#officeSoldPruduct_' + rowId).select2('data') != undefined) {
                            var product = $('#officeSoldPruduct_' + rowId).select2('data');
                        }

                        if ($('#doctor_' + rowId).select2('data') != null || $('#doctor_' + rowId).select2('data') != undefined) {
                            var doctor = $('#doctor_' + rowId).select2('data');
                        }

                        var listPrice = $('#listPrice_' + rowId).val();
                        var euroPrice = $('#euroPrice_' + rowId).val();
                        var discounted = $('#discounted_' + rowId).val();
                        var discountRate = $('#discountRate_' + rowId).val();
                        var amount = $('#amount_' + rowId).val();
                        var euroValue = $('#euroValue_' + rowId).val();
                        var productNote = $('#productNote_' + rowId).val();
                        var total = $('#total_' + rowId).val();
                        var photos = $(el).find("td input[type=radio]:checked").val();
                        var paymentDate = $('#date').val();

                        var model = {
                            RecordId: recordId,
                            ProductId: product.id,
                            ProductName: product.text,
                            DoctorId: doctor.id,
                            DoctorName: doctor.text,
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

                        if (i == (trList.length - 1)) {
                            $("#modalNewOrder").modal("toggle");
                        }
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

            $("body").on("keyup",
                '#quantity',
                function(e) {
                    if ((e.keyCode > 31 && (e.keyCode < 48 || e.keyCode > 57)) || e.keyCode == 8 || e.keyCode == 46 || e.keyCode == 13) {
                        var quantity = $('#quantity').val();
                        if (quantity != "") {
                            var listPrice = $('#listPrice').val();
                            if (listPrice != "") {
                                $('#amount').val(parseInt(listPrice) * parseInt(quantity));
                            }

                        }
                    }
                });

            $("body").on("keyup",
                '#discounted',
                function(e) {
                    if ((e.keyCode > 31 && (e.keyCode < 48 || e.keyCode > 57)) || e.keyCode == 8 || e.keyCode == 46 || e.keyCode == 13) {
                        var discounted = $('#discounted').val();
                        if (discounted != "") {
                            var amount = $('#amount').val();
                            if (amount != "") {
                                $('#total').val(parseInt(amount) - ((parseInt(amount) * parseInt(discounted)) / 100));
                            }

                        }
                    }
                });

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
                    euroValue = String.isNullOrWhiteSpace(model.UsdValue) ? '' : model.UsdValue;

                var sira = 1;
                $(".hizli-ekle-records table tbody").prepend(String.format("<tr data-id='{0}'><td><div id='officeSoldPruduct_{0}'></div></td><td><textarea rows='1' id='quantity_{0}' class='form-control quantity' style='resize:vertical'>{9}</textarea></td><td><div id='doctor_{0}'></div></td></div></td><td><textarea rows='1' id='listPrice_{0}' class='form-control listPrice' style='resize:vertical'>{1}</textarea></td><td><input type='text' id='euroPrice_{0}' class='form-control euroPrice' value='{2}' ></td><td><textarea rows='1' id='discounted_{0}' class='form-control discounted' style='resize:vertical'>{3}</textarea></td><td><textarea rows='1' id='amount_{0}' class='form-control amount' style='resize:vertical'>{4}</textarea></td><td><textarea rows='1' id='discounted_Rate_{0}' class='form-control discounted_Rate' style='resize:vertical'>{5}</textarea></td><td><textarea rows='1' id='total_{0}' class='form-control total' style='resize:vertical'>{6}</textarea></div></td><td><textarea rows='1' id='productNote_{0}' class='form-control productNote' style='resize:vertical'>{7}</textarea></div></td><td><textarea rows='1' id='euroValue_{0}' class='form-control euroValue' style='resize:vertical'>{8}</textarea></div></td></tr>", sira, listPrice, euroPrice, discounted, amount, discountRate, total, productNote, euroValue, quantity));

                setTimeout(() => {
                        $(".hizli-ekle-records table tbody tr:first").removeAttr('style');
                    },
                    2000);

                prepareSelect2('#officeSoldPruduct_' + sira,
                    '/Summary/LookupFieldValues', {
                        coId: '013CAAAE47B6475E9FE3396E0E32CA54',
                        id: 'BB58CAD5D03B45C1A3751CBC48E4A000',
                        viewFilterId: '62E047B81B3C4DC7B10F8C55EFA2597D'
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

                // $('body').on('change', '#firma_' + recordId, function() {
                //     if (String.isNullOrWhiteSpace($(this).val())) {
                //         $(String.format('#bagliOlduguProje_{0}, #bagliOlduguProjeAdimi_{0}, #bagliOlduguMira_{0}', recordId)).select2('data', null).select2('enable', false);
                //     } else {
                //         $(String.format('#bagliOlduguProje_{0}', recordId)).select2('enable', true);
                //         prepareSelect2('#bagliOlduguProje_' + recordId, '/Summary/LookupFieldValues', {
                //             coId: '32654333EF6045E1BDE5716552775C33',
                //             id: '5121456B7A7040F591331F1B1D6B027B',
                //             viewFilterId: 'EF792B24BFF64E4BB7222686307B0E37',
                //             controllingRecordId: $(this).val(),
                //             itemId: '5121456B7A7040F591331F1B1D6B027B',
                //             groupIds: $(this).val()
                //         }, null, false);
                //     }
                // });

                // $('body').on('change',
                //     '#bagliOlduguProje_' + recordId,
                //     function() {
                //         if (String.isNullOrWhiteSpace($(this).val())) {
                //             $(String.format('#bagliOlduguProjeAdimi_{0}, #bagliOlduguMira_{0}', recordId)).select2('data', null).select2('enable', false);
                //         } else {
                //             $(String.format('#bagliOlduguProjeAdimi_{0}', recordId)).select2('enable', true);
                //             prepareSelect2('#bagliOlduguProjeAdimi_' + recordId, '/Summary/LookupFieldValues', {
                //                 coId: '32654333EF6045E1BDE5716552775C33',
                //                 id: 'CA5097550E8146D2A1467A53FF915B66',
                //                 viewFilterId: '24913400CF2A41A898B0E12D5D1D9E01',
                //                 controllingRecordId: $(this).val(),
                //                 itemId: 'CA5097550E8146D2A1467A53FF915B66',
                //                 groupIds: $(this).val()
                //             }, null, false);
                //         }
                //     });

                // $('body').on('change',
                //     '#bagliOlduguProjeAdimi_' + recordId,
                //     function() {
                //         if (String.isNullOrWhiteSpace($(this).val())) {
                //             $('#bagliOlduguMira_' + recordId).select2('data', null).select2('enable', false);
                //         } else {
                //             $('#bagliOlduguMira_' + recordId).select2('enable', true);
                //             prepareSelect2('#bagliOlduguMira_' + recordId, '/Summary/LookupFieldValues', {
                //                 coId: '32654333EF6045E1BDE5716552775C33',
                //                 id: '7A6BBA5586844954B3AF9EAF3217420B',
                //                 viewFilterId: '15376C0D5705496998C7D0BEFD98F179',
                //                 controllingRecordId: $(this).val(),
                //                 itemId: '7A6BBA5586844954B3AF9EAF3217420B',
                //                 groupIds: $(this).val()
                //             }, null, false);
                //         }
                //     });
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
                        $('#listPrice').val("");
                        $('#euroPrice').val("");
                        $('#euroValue').val("");
                        $('#amount').val("");

                    } else {
                        var url = '/set/product/detail/' + $(this).val();
                        $.get(url, function(sdata) {
                            var elem = $('<div/>').html(sdata);
                            var listPrice = elem.find('label[for=8FF8EEE3ECF84EF68861269C83B494C4]').parent().data('value');
                            $('#listPrice').val(listPrice);
                        });
                    }
                });
            $('body').on('change',
                '#quantity',
                function() {

                    var val = parseInt($(this).val());
                    var price = parseInt($('#euroPrice').val());

                    var amount2 = val * price;
                    if (isNaN(amount2)) {
                        amount2 = " ";
                    }
                    $('#amount').val(amount2).trigger('change');
                    $('#euroValue').val(amount2).trigger('change');

                });
            $('body').on('change',
                '.quantity',
                function() {
                    debugger;
                    var tr = $(this).closest('tr');
                    var val = parseInt(tr.find('.quantity').val());
                    var price = parseInt(tr.find('.euroPrice').val());

                    var amount2 = val * price;
                    if (isNaN(amount2)) {
                        amount2 = " ";
                    }
                    tr.find('.amount').val(amount2).trigger('change');
                    tr.find('.euroValue').val(amount2).trigger('change');

                });

            $('body').on('change',
                '#euroPrice',
                function() {

                    var val = parseInt($(this).val());
                    var miktar = parseInt($('#quantity').val());

                    var amount2 = val * miktar;
                    if (isNaN(amount2)) {
                        amount2 = " ";
                    }
                    $('#amount').val(amount2).trigger('change');
                    $('#euroValue').val(amount2).trigger('change');

                });
            $('body').on('change',
                '.euroPrice',
                function() {
                    var tr = $(this).closest('tr');
                    var val = parseInt(tr.find('.euroPrice').val());
                    var miktar = parseInt(tr.find('.quantity').val());

                    var amount2 = val * miktar;
                    if (isNaN(amount2)) {
                        amount2 = " ";
                    }
                    tr.find('.amount').val(amount2).trigger('change');
                    tr.find('.euroValue').val(amount2).trigger('change');

                });

            $('body').on('change',
                '#listPrice',
                function() {
                    var currency = $('#agreedCurrency').select2('data');
                    var kur = $('label[for=25473509DFC4430D99243EC3FD949886]').parent().data('value'); //euro/tl
                    if (currency.id == 'A79964CCBBFC4007A26FAEA1E190EC0D') {
                        //euroysa
                        kur = "1";
                    } else if (currency.id == 'CC7FE6A5B53E4F4493F70F008A3F15AF') {
                        kur = (parseFloat($('label[for=638398BB24454FCD86857A64A5FDBB76]').parent().data('value')) / parseFloat($('label[for=6EA9D01488324F19B16CB6C15EE8CEF4]').parent().data('value')).toString()); //usd/euro
                    }
                    var val = parseFloat($(this).val());
                    var euroPrice = val * parseFloat(kur);

                    $('#euroPrice').val(euroPrice).trigger('change');

                    var tr = $(this).closest('tr');
                    var val = parseFloat(tr.find('#listPrice').val());
                    var miktar = parseInt(tr.find('#quantity').val());
                    var amount = val * parseFloat(miktar);
                    tr.find('#amount').val(amount).trigger('change');
                });
            $('body').on('change',
                '.listPrice',
                function() {
                    debugger;
                    var currency = $('#agreedCurrency').select2('data');
                    var kur = $('label[for=25473509DFC4430D99243EC3FD949886]').parent().data('value'); //euro/tl
                    if (currency.id == 'A79964CCBBFC4007A26FAEA1E190EC0D') {
                        //euroysa
                        kur = "1";
                    } else if (currency.id == 'CC7FE6A5B53E4F4493F70F008A3F15AF') {
                        kur = (parseFloat($('label[for=638398BB24454FCD86857A64A5FDBB76]').parent().data('value')) / parseFloat($('label[for=6EA9D01488324F19B16CB6C15EE8CEF4]').parent().data('value')).toString()); //usd/euro
                    }
                    var tr = $(this).closest('tr');
                    var val = parseFloat(tr.find('.listPrice').val());
                    var miktar = parseInt(tr.find('.quantity').val());
                    var amount = val * parseFloat(miktar);

                    var tr = $(this).closest('tr');
                    var val2 = parseFloat(tr.find('.listPrice').val());
                    var euroPrice = val2 * parseFloat(kur);

                    tr.find('.euroPrice').val(euroPrice).trigger('change');
                    tr.find('.amount').val(amount).trigger('change');
                });


            $('body').on('click',
                '.btn-hizli-cancel-row',
                function() {
                    $('#officeSoldPruduct, #doctor').select2('data', null).trigger('change');
                    $('.btn-hizli-cancel-row').parents('tr').find('#listPrice, #discounted, #discountRate, #amount, #total, #euroPrice, #euroValue, #productNote, #quantity').val('');
                });

            $('#modalFinishedInterview').modal({
                backdrop: 'static',
                keyboard: false
            });

        });
});