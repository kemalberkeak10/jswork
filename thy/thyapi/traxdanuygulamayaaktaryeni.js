$(function() {
    if ($('#ViewFilterPublicId').val() === "C24126D50EB14979B8EEA13167260C12" || $('#ViewFilterPublicId').val() === "574A986BBA8645FC9A04999232F65283") {

        $('.well .pull-right:eq(0)').prepend('<a id="btnTraxTOAktar" class="btn btn-sm btn-warning"  style="margin-right:10px;" title=""><span>Traxdan Uygulamaya Aktar Yeni</a>');
        var model = {};
        $('body').on('click', '#btnTraxTOAktar', function() {
            $('#modelTraxTOList').remove();
            window.setModal.Create({
                id: 'modelTraxTOList',
                html: {
                    header: '<i class="fas fa-check-circle"></i> Trax Location Giriniz',
                    body: '<input type="text" class="form-control" placeholder="Trax Location" style="text-transform: uppercase;" id="traxLocation" name="traxLocation">' +
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
            $('#modelTraxTOList').modal('toggle');

        });
        $('body').on('click', '#btnLocationSearch', function() {
            if ($('#traxLocation').val() === "") {
                alert("Lütfen Lokasyon giriniz!");
            } else {
                $('#btnLocationSearch').hide();
                $('#txt').show();
                var localUrl = String.format('http://localhost:65474/api/data/TraxTransferOrderList?location={0}', $('#traxLocation').val().toUpperCase()),
                    realUrl = String.format('https://thywebapi.setcrm.com/api/data/TraxTransferOrderList?location={0}', $('#traxLocation').val().toUpperCase());
                $.get(localUrl, function(r) {
                    if (r.Status) {

                        $('#modelTraxTOList .modal-body').append(String.format('<div class="trax-location-new-row mt-2"><h4 style="margin-top:0"><i class="fa fa-info"></i> KAYITLAR</h4></div><hr>'));
                        $('#modelTraxTOList .modal-body').append('<div id="Ekstre" style="width: 100%;">');
                        $('#txt').hide();
                        if (r.InfoLocationList.length > 0) {
                            $('#newTbl thead').html('');
                            $('#newTbl tbody').html('');
                            var newTbl = $('<table id="newTbl" style="width: 100%" />');
                            var thead = $('<thead/>');
                            var newRow = $('<tr class="table table-bordered table-hover" style="background-color:lightblue"/>');
                            newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('Choose'));
                            newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('Calibration No'));
                            newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('SN'));
                            newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('TO Type'));
                            newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('Order Number'));
                            newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('Priority'));
                            newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('Shiped From Locations'));
                            newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('To Location'));
                            newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('Delivery Date'));
                            thead.append(newRow);
                            newTbl.append(thead);
                            var tbody = $('<tbody />');
                            $.each(r.InfoLocationList, function(i, v) {
                                var newRow = $('<tr class="table table-bordered table-hover"/>').attr('data-invoiceRef', i + "," + v.toolCalibrationNo);
                                newRow.append('<td style="text-align: center;" class="col-md-1"><input type="checkbox" class="sec" id="tr_' + i + '"></td>');
                                newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(v.toolCalibrationNo));
                                newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(v.sn));
                                newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(v.lastTransactionType));
                                newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(v.orderNo));
                                newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(v.priority));
                                newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(v.shippedFromLocation));
                                newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(v.toLocation));
                                newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(v.deliveryDate));
                                v.status = 'false';
                                tbody.append(newRow);
                                newTbl.append(tbody);
                                $('#Ekstre').append(newTbl);
                            });
                        }
                        model.info = r.InfoLocationList;
                        $('#btnLocationKaydet').show();
                    } else {
                        $('#txt').hide();
                        setUtil.alert({
                            container: '#modelTraxTOList .modal-body #msg',
                            message: r.Message,
                            alertClass: 'alert-danger',
                            autoClose: false
                        });
                    }
                });
            }
        });
        $("body").on("keyup",
            '#traxLocation',
            function(e) {
                if (e.key === 'Enter' || e.keyCode === 13) {
                    if ($('#traxLocation').val() === "") {
                        alert("Lütfen Lokasyon giriniz!");
                    } else {
                        $('input').attr('disabled', 'disabled');
                        $('#btnLocationSearch').hide();
                        $('#txt').show();
                        var localUrl = String.format('http://localhost:65474/api/data/TraxTransferOrderList?location={0}', $('#traxLocation').val().toUpperCase()),
                            realUrl = String.format('https://thywebapi.setcrm.com/api/data/TraxTransferOrderList?location={0}', $('#traxLocation').val().toUpperCase());
                        $.get(localUrl, function(r) {
                            if (r.Status) {

                                $('#modelTraxTOList .modal-body').append(String.format('<div class="trax-location-new-row mt-2"><h4 style="margin-top:0"><i class="fa fa-info"></i> KAYITLAR</h4></div><hr>'));
                                $('#modelTraxTOList .modal-body').append('<div id="Ekstre" style="width: 100%;">');
                                $('#txt').hide();
                                if (r.InfoLocationList.length > 0) {
                                    $('#newTbl thead').html('');
                                    $('#newTbl tbody').html('');
                                    var newTbl = $('<table id="newTbl" style="width: 100%" />');
                                    var thead = $('<thead/>');
                                    var newRow = $('<tr class="table table-bordered table-hover" style="background-color:lightblue"/>');
                                    newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('Choose'));
                                    newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('Calibration No'));
                                    newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('SN'));
                                    newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('TO Type'));
                                    newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('Order Number'));
                                    newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('Priority'));
                                    newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('Shiped From Locations'));
                                    newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('To Location'));
                                    newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('Delivery Date'));
                                    thead.append(newRow);
                                    newTbl.append(thead);
                                    var tbody = $('<tbody />');
                                    $.each(r.InfoLocationList, function(i, v) {
                                        var newRow = $('<tr class="table table-bordered table-hover"/>').attr('data-invoiceRef', i + "," + v.toolCalibrationNo);
                                        newRow.append('<td style="text-align: center;" class="col-md-1"><input type="checkbox" class="sec" id="tr_' + i + '"></td>');
                                        newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(v.toolCalibrationNo));
                                        newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(v.sn));
                                        newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(v.lastTransactionType));
                                        newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(v.orderNo));
                                        newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(v.priority));
                                        newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(v.shippedFromLocation));
                                        newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(v.toLocation));
                                        newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(v.deliveryDate));
                                        v.status = 'false';
                                        tbody.append(newRow);
                                        newTbl.append(tbody);
                                        $('#Ekstre').append(newTbl);

                                    });
                                    $('#btnLocationKaydet').show();
                                }
                                model.info = r.InfoLocationList;
                            } else {
                                $('#txt').hide();
                                setUtil.alert({
                                    container: '#modelTraxTOList .modal-body #msg',
                                    message: r.Message,
                                    alertClass: 'alert-danger',
                                    autoClose: false
                                });
                            }
                        });
                    }
                }
            });
        $('body').on('click', '#btnLocationKaydet', function() {
            $('#Ekstre').hide();
            $('.trax-location-new-row').hide();
            $('#traxLocation').hide();
            $('#txt').show();
            var trList = $('#newTbl tbody tr input:checked');
            if (trList.length == 0) {
                $('#txt').hide();
                setUtil.alert({
                    container: '#modelTraxTOList .modal-body #msg',
                    message: "Lütfen en az bir tane ürün seçiniz.",
                    alertClass: 'alert-danger',
                    autoClose: false
                });

            } else {
                $('#btnLocationKaydet').hide();
                $.each(trList, function(i, v) {
                    var invRef = $(v).closest('tr').attr('data-invoiceRef').split(',')[1];
                    var index = $(v).closest('tr').attr('data-invoiceRef').split(',')[0];
                    var jsonObject = model.info.filter(function(i, n) {
                        return n.toolCalibrationNo === invRef;
                    });
                    if (jsonObject != null) {
                        model.info[index].status = true;
                    }

                    if (i == trList.length - 1) {
                        var localUrl = String.format('http://localhost:65474/api/data/CreateTransferOrderTrax'),
                            realUrl = String.format('https://thywebapi.setcrm.com/api/data/CreateTransferOrderTrax')

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
                                    $('#msg').show();
                                    setUtil.alert({
                                        container: '#modelTraxTOList .modal-body #msg',
                                        message: "İşlem başarıyla gerçekleşti.",
                                        alertClass: 'alert-success',
                                        autoClose: false
                                    });
                                    setTimeout(() => {
                                        window.location.reload();
                                    }, 500);
                                } else {
                                    $('#txt').hide();
                                    $('#msg').show();
                                    setUtil.alert({
                                        container: '#modelTraxTOList .modal-body #msg',
                                        message: r.Message,
                                        alertClass: 'alert-danger',
                                        autoClose: false
                                    });
                                }
                            }
                        });
                    }
                });
            }

        });

    }
});