$(function() {
    if ($('#ViewFilterPublicId').val() === "C24126D50EB14979B8EEA13167260C12") {

        $('.well .pull-right:eq(0)').prepend('<a id="btnCalibrasyonToinfoLocation" class="btn btn-sm btn-warning"  style="margin-right:10px;" title=""><span>Location</a>');
        var model = {};
        $('body').on('click', '#btnCalibrasyonToinfoLocation', function() {
            $('#modalTraxLocation').remove();
            window.setModal.Create({
                id: 'modalTraxLocation',
                html: {
                    header: '<i class="fas fa-check-circle"></i> Trax Location Giriniz',
                    body: '<input type="text" class="form-control" placeholder="Trax Location" id="traxLocation" name="traxLocation">' +
                        '<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>' +
                        '<div id="msg" style="margin:0 0 5px; width: 100%;"></div>',
                    footer: '<button id="btnLocationSearch"  class="btn btn-success btn-sm">Ara</button>' +
                        '<button id="btnLocationKaydet" type="button" class="btn btn-sm btn-success" >Oluştur</button>' +
                        '<button class="btn btn-danger btn-sm" data-dismiss="modal" onclick="window.location.reload()">Kapat</button>'
                },
                settings: {
                    widthClass: 'modal-full-width'
                }
            });
            $('#txt').hide();
            $('#btnLocationKaydet').hide();
            $('#modalTraxLocation').modal('toggle');

        });
        $('body').on('click', '#btnLocationSearch', function() {
            if ($('#traxLocation').val() === "") {
                alert("Lütfen Lokasyon giriniz!");
            } else {
                $('#btnLocationSearch').hide();
                $('#txt').show();
                var localUrl = String.format('http://localhost:65474/api/data/CalibrationToCreateInfoLocation?location={0}', $('#traxLocation').val()),
                    realUrl = String.format('https://thywebapi.setcrm.com/api/data/CalibrationToCreateInfoLocation?location={0}', $('#traxLocation').val());
                $.get(localUrl, function(r) {
                    if (r.Status) {

                        $('#modalTraxLocation .modal-body').append(String.format('<div class="trax-location-new-row mt-2"><h4 style="margin-top:0"><i class="fa fa-info"></i> KAYITLAR</h4></div><hr>'));
                        $('#modalTraxLocation .modal-body').append('<div id="Ekstre" style="width: 100%;">');
                        $('#txt').hide();
                        if (r.infoLocationList.length > 0) {
                            $('#newTbl thead').html('');
                            $('#newTbl tbody').html('');
                            var newTbl = $('<table id="newTbl" style="width: 100%" />');
                            var thead = $('<thead/>');
                            var newRow = $('<tr class="table table-bordered table-hover" style="background-color:lightblue"/>');
                            newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('TO Type'));
                            newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('Order Number'));
                            newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('Priority'));
                            newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('Shiped From Locations'));
                            newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('To Location'));
                            newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('Delivery Date'));
                            thead.append(newRow);
                            newTbl.append(thead);
                            var tbody = $('<tbody />');
                            $.each(r.infoLocationList, function(i, v) {
                                var newRow = $('<tr class="table table-bordered table-hover"/>').attr('data-invoiceRef', v.InvoiceRef);
                                newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(v.lastTransactionType));
                                newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(v.orderNo));
                                newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(v.priority));
                                newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(v.shippedFromLocation));
                                newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(v.toLocation));
                                newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(v.deliveryDate));
                                tbody.append(newRow);
                                newTbl.append(tbody);
                                $('#Ekstre').append(newTbl);
                            });
                        }
                        model.info = r.infoLocationList;
                        console.log(model);
                        $('#btnLocationKaydet').show();
                    } else {
                        $('#txt').hide();
                        setUtil.alert({
                            container: '#modalTraxLocation .modal-body #msg',
                            message: r.Message,
                            alertClass: 'alert-danger',
                            autoClose: false
                        });
                    }
                });
            }
        });
        $('body').on('click', '#btnLocationKaydet', function() {
            $('#Ekstre').hide();
            $('.trax-location-new-row').hide();
            $('#traxLocation').hide();
            $('#txt').show();

            var localUrl = String.format('http://localhost:65474/api/data/CreateTransferOrderTrax'),
                realUrl = String.format('https://thywebapi.setcrm.com/api/data/CreateTransferOrderTrax')
                // $.get(localUrl, data, function(r) {
                //     if (r.Status) {

            //     } else {
            //         $('#txt').hide();
            //         setUtil.alert({
            //             container: '#modalTraxLocation .modal-body #msg',
            //             message: r.Message,
            //             alertClass: 'alert-danger',
            //             autoClose: false
            //         });
            //     }
            // });
            $.ajax({
                contentType: 'application/json',
                type: "POST",
                url: localUrl,
                dataType: "json",
                data: JSON.stringify(model),
                async: true,
                success: function(r) {
                    if (r.Status) {
                        $('#txt').hide();
                    } else {
                        $('#txt').hide();
                        setUtil.alert({
                            container: '#modalTraxLocation .modal-body #msg',
                            message: r.Message,
                            alertClass: 'alert-danger',
                            autoClose: false
                        });
                    }
                }
            });
        });

    }
});