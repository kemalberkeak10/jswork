$(function() {
    var traxBinlocation = $('label[for=56A811DE60824088A5D8283CC1B695AF]').parent().data('value');
    if (!String.isNullOrWhiteSpace(location)) {
        $('label[for=02E371EAB6894F26A93FF0FBC306AD5A]').parents('div:eq(0)').append('<a id="btnChangeBin" class="btn btn-xs btn-warning" style="">Bin<i class="fas fa-arrow-circle-right" style="margin-left:5px;"></i></a>')
    }
    var model = {};
    $('body').on('click', '#btnChangeBin', function() {
        $('#modalBins').remove();
        window.setModal.Create({
            id: 'modalBins',
            html: {
                header: 'Change Bin',
                body:
                // '<label type="text" class="form-control" id="traxLocation" name="traxLocation">Location:' + traxBinlocation + '</label>' +
                    '<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>' +
                    '<div id="msg" style="margin:0 0 5px; width: 100%;"></div>',
                footer: '<button class="btn btn-danger btn-sm" data-dismiss="modal" onclick="window.location.reload()">Kapat</button>'
            },
            settings: {
                widthClass: "modal-md",
            }
        });
        $('#txt').hide();
        traxBins();
        $('#modalBins').modal('toggle');
    });

    $('body').on('click', '.btn-bin-loc-update-row', function() {
        $('#Ekstre').hide();
        //$('.trax-location-new-row').hide();
        //$('#traxLocation').hide();
        $('#searchBin').hide();
        $('.hizli-ekle-records').hide();
        $('#searchDiv').hide();
        $('#searchHr').hide();
        $('#txt').show();
        var binText = $(this).closest('tr').find('td:eq(0)').text();

        data = {
            bin: binText,
            recordId: $('#RecordPublicId').val(),
        }
        var localUrl = String.format('http://localhost:65474/api/data/UpdateBin'),
            realUrl = String.format('https://thywebapi.setcrm.com/api/data/UpdateBin')
        $.get(realUrl, data, function(r) {
            if (r.Status) {
                $('#txt').hide();
                notify("success", "Kayıt başarıyla güncellendi.Sayfa yenileniyor lütfen bekleyiniz..");
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                $('#txt').hide();
                notify("danger", r.Message);
            }
        });
    });

    $("body").on("keyup", '#searchBin',
        function(e) {
            var trList = $('#modalBins .modal-body #Ekstre #newTbl tbody tr');
            var value = $(this).val().toLowerCase();
            trList.filter(function() {
                $(this).toggle($(this).find('td:eq(0)').text().trim().toLowerCase().indexOf(value) != -1);
            });
        });
});

function traxBins() {
    if (traxBinlocation === "") {

        alert("Lütfen Lokasyon giriniz!");
    } else {
        var traxBinlocation = $('label[for=56A811DE60824088A5D8283CC1B695AF]').parent().data('value');
        $('#txt').show();
        var localUrl = String.format('http://localhost:65474/api/data/CalibrationBins?location={0}', traxBinlocation),
            realUrl = String.format('https://thywebapi.setcrm.com/api/data/CalibrationBins?location={0}', traxBinlocation);
        $.get(realUrl, function(r) {
            if (r.Status) {

                // $('#modalBins .modal-body').append(String.format('<div class="trax-location-new-row mt-2"><h4 style="margin-top:0"><i class="fa fa-info"></i> KAYITLAR</h4></div><hr>'));
                $('#modalBins .modal-body').append(String.format('<div id="searchDiv"; style="width:100%;margin-bottom:10px;"><label style="font-size:15px;">Ara: </label><input id="searchBin" type="text"  class="form-control"></div><hr id="searchHr";><div class="hizli-ekle-records"><h4 style="margin-top:0"><i class="fa fa-edit"></i> Bin Listesi</h4></div>'));
                $('#modalBins .modal-body').append('<div id="Ekstre" style="width: 100%;">');
                $('#txt').hide();
                if (r.binList.bins.length > 0) {
                    $('#newTbl thead').html('');
                    $('#newTbl tbody').html('');
                    var newTbl = $('<table id="newTbl" style="width: 100%" />');
                    var thead = $('<thead/>');
                    var newRow = $('<tr class="table table-bordered table-hover" style="background-color:lightblue"/>');
                    newRow.append($('<th style="text-align: left;" class="col-md-2"/>').text('Bin'));
                    newRow.append($('<th style="text-align: left;" class="col-md-1"/>').text(' '));
                    thead.append(newRow);
                    newTbl.append(thead);
                    var tbody = $('<tbody />');
                    $.each(r.binList.bins, function(i, v) {
                        var newRow = $('<tr class="table table-bordered table-hover"/>').attr('data-invoiceRef', v);
                        newRow.append($('<td style="text-align: left;" class="col-md-1" />').text(v));
                        newRow.append(String.format("<td style='text-align:right;padding: 8px 12px;' ><a class='btn btn-success btn-m btn-bin-loc-update-row' value={0} ><i class='fas fa-save'></i></a></td>", v));
                        tbody.append(newRow);
                        newTbl.append(tbody);
                        $('#Ekstre').append(newTbl);
                    });
                }
            } else {
                $('#txt').hide();
                setUtil.alert({
                    container: '#modalBins .modal-body #msg',
                    message: r.Message,
                    alertClass: 'alert-danger',
                    autoClose: false
                });

            }
        });
    }
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