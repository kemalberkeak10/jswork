$(function() {

    $('.well .pull-right:eq(0)').prepend('<a id="btnCalibrationToolsCreateTrax" class="btn btn-sm btn-warning"  style="margin-right:10px;" title=""><span>TO Çıkış Yap</a>');
    var ctlocmodel = {};
    $('body').on('click', '#btnCalibrationToolsCreateTrax', function() {
        $('#modalTraxCTLocationUpdate').remove();
        window.setModal.Create({
            id: 'modalTraxCTLocationUpdate',
            html: {
                header: '<i class="fas fa-check-circle"></i> Trax Calibration Tools Location Update',
                body: '<input id="CTshipLoc" type="select" value="" tabindex="-1" style="display: none;">' +
                    '<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>' +
                    '<div id="msg" style="margin:0 0 5px; width: 100%;"></div>',
                footer: '<button id="btnCTLocationUpdate" type="button" class="btn btn-sm btn-success" >Location Update</button>' +
                    '<button class="btn btn-danger btn-sm" data-dismiss="modal" onclick="window.location.reload()">Kapat</button>'
            },
            settings: {
                widthClass: 'modal-lg',
            }

        });
        prepareSelect2('#CTshipLoc',
            '/Summary/LookupFieldValues', {
                coId: '38E8056D4DCF4F9E889666A4C9ADE2E7',
                id: '5D6884586ADE49A1B52836BAC41CB83C',
                viewFilterId: 'B4EE5931504F4A03BF55738AE654B78D'
            },
            null,
            false);
        // $('#CTshipLoc').select2('data', {
        //     id: $('label[for=5D6884586ADE49A1B52836BAC41CB83C]').parent().data().publicids, text: $('label[for=5D6884586ADE49A1B52836BAC41CB83C]').parent().data().value
        // }).trigger('Change');
        $('#txt').hide();
        $('#btnCTLocationUpdate').hide();
        var lrId = "70CFE8035D1C4BD6BADB551268A1513F";
        var localUrl = String.format('http://localhost:65474/api/data/TraxCalibrationToolsLrOkuma?recordId={0}&lrId={1}', $('#RecordPublicId').val(), lrId),
            realUrl = String.format('https://thywebapi.setcrm.com/api/data/TraxCalibrationToolsLrOkuma?recordId={0}&lrId={1}', $('#RecordPublicId').val(), lrId);
        $.get(realUrl, function(r) {
            if (r.IsOk) {
                $('#modalTraxCTLocationUpdate .modal-body').append(String.format('<div class="trax-ct-location-new-row mt-2"><h4 style="margin-top:0"><i class="fa fa-info"></i>CALIBRATION TOOLS</h4></div><hr>'));
                $('#modalTraxCTLocationUpdate .modal-body').append('<div id="CTRecords" style="width: 100%;">');
                $('#txt').hide();
                if (r.Records.length > 0) {
                    $('#newCTLocationTbl thead').html('');
                    $('#newCTLocationTbl tbody').html('');
                    var newCTLocationTbl = $('<table id="newCTLocationTbl" style="width: 100%" />');
                    var thead = $('<thead/>');
                    var newRow = $('<tr class="table table-bordered table-hover" style="background-color:lightblue"/>');
                    newRow.append('<th style="text-align: left;" class="col-md-1"><input id="selectAll" style="text-align:center" type="checkbox" ></th>');
                    newRow.append($('<th style="text-align: left;" class="col-md-1"/>').text('Status'));
                    newRow.append($('<th style="text-align: left;" class="col-md-1"/>').text('PN'));
                    newRow.append($('<th style="text-align: left;" class="col-md-1"/>').text('SN'));
                    newRow.append($('<th style="text-align: left;" class="col-md-1"/>').text('U/S Code'));
                    thead.append(newRow);
                    newCTLocationTbl.append(thead);
                    var tbody = $('<tbody />');
                    $.each(r.Records, function(i, v) {
                        var newRow = $('<tr class="table table-bordered table-hover"/>').attr('data-recordid', v.RecordId);
                        newRow.append('<td style="text-align: left;" class="col-md-1"><input class="form-check-input" type="checkbox" ></td>');
                        newRow.append($('<td style="text-align: left;" class="col-md-1" />').text(v.TransactionType));
                        newRow.append($('<td style="text-align: left;" class="col-md-1" />').text(v.Pn));
                        newRow.append($('<td style="text-align: left;" class="col-md-1" />').text(v.Sn));
                        newRow.append($('<td style="text-align: left;" class="col-md-1" />').text(v.UsCode));
                        tbody.append(newRow);
                        newCTLocationTbl.append(tbody);
                        $('#CTRecords').append(newCTLocationTbl);
                    });
                    $('#btnCTLocationUpdate').show();
                } else {
                    $('#btnCTLocationUpdate').hide()
                    $('#modalTraxCTLocationUpdate .modal-body').html("<h4>To Çıkış yapılacak cihaz bulunamadı.<h4/>");
                }
                ctlocmodel.info = r.infoLocationList;
            } else {
                $('#txt').hide();
                setUtil.alert({
                    container: '#modalTraxCTLocationUpdate .modal-body #msg',
                    message: "Transfer Ordera bağlı Calibration Tool Mevcut değil!",
                    alertClass: 'alert-danger',
                    autoClose: false
                });
            }
        });

        $('#modalTraxCTLocationUpdate').modal('toggle');


    });
    $('body').on('click',
        '#selectAll',
        function() {
            if ($('#selectAll').is(':checked')) {
                $('.form-check-input').prop('checked', true);
            } else {
                $('.form-check-input').prop('checked', false);
            }
        });
    $('body').on('click',
        '#btnCTLocationUpdate',
        function() {
            var RecordList = [];
            if (String.isNullOrWhiteSpace($('#CTshipLoc').val())) {
                setUtil.alert({
                    container: '#modalTraxCTLocationUpdate .modal-body #msg',
                    message: "Lütfen Lokasyon Alanını Doldurun!",
                    alertClass: 'alert-danger',
                    autoClose: true
                });
            } else {
                $('#CTRecords').hide();
                $('.trax-ct-location-new-row').hide();
                $('#btnCTLocationUpdate').hide();
                $('#txt').show();

                var trList = $('.form-check-input:checked');
                $.each(trList,
                    function(i, el) {
                        var tr = $(el).parents('tr')
                        var recordId = $(this).closest('tr').data('recordid');
                        var ToCikisYapModel = {
                            TORecordId: $('#RecordPublicId').val(),
                            ToolRecordId: recordId,
                            ShipAdressId: $('#CTshipLoc').val()
                        }
                        RecordList.push(ToCikisYapModel);
                    });
                var localUrl = String.format('http://localhost:65474/api/data/TOCikisYap'),
                    realUrl = String.format('https://thywebapi.setcrm.com/api/data/TOCikisYap')
                $.ajax({
                    contentType: 'application/json',
                    type: "POST",
                    url: realUrl,
                    dataType: "json",
                    data: JSON.stringify(RecordList),
                    async: true,
                    success: function(r) {
                        if (r.Status) {
                            $('#txt').hide();
                            notify("success", "Kayıt başarıyla oluşturuldu");
                            $('#modalTraxCTLocationUpdate .modal-body').append(String.format('<a href="https://proje.setcrm.com/set/transfer-order/detail/{0}" target="_blank" class="btn btn-primary btn-sm"><i class="fas fa-external-link-alt"></i> Görüntüleme</a>', r.NewRecord));
                        } else {
                            $('#txt').hide();
                            setUtil.alert({
                                container: '#modalTraxCTLocationUpdate .modal-body #msg',
                                message: r.Message,
                                alertClass: 'alert-danger',
                                autoClose: false
                            });
                        }
                    }
                });
            }
        });
    //}
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