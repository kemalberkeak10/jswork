$(function() {
    $('.well:first .pull-right').prepend('<a id="btnChangeBin" class="btn btn-sm btn-success" style="margin-right:10px;">Change Bin</a>');
    var locationData = $('label[for=56A811DE60824088A5D8283CC1B695AF]').parent().data();
    var model = {};
    $('body').on('click', '#btnChangeBin', function() {
        $('#modalBins').remove();
        window.setModal.Create({
            id: 'modalBins',
            html: {
                header: 'Change Bin',
                body: '<input id="binlocationselect" type="select" style="resize:none;width:100%; tabindex="-1" >' +
                    '<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>' +
                    '<div id="msg" style="margin:0 0 5px; width: 100%;"></div>',
                footer: '<button class="btn btn-danger btn-sm" data-dismiss="modal" onclick="window.location.reload()">Kapat</button>'
            },
            settings: {
                widthClass: "modal-md",
            }
        });
        prepareSelect2('#binlocationselect', '/Summary/LookupFieldValues', {
            coId: 'F9128BC1343446E5BA6F7E223866B016',
            id: '56A811DE60824088A5D8283CC1B695AF',
            viewFilterId: 'B4EE5931504F4A03BF55738AE654B78D'
        }, null, false);
        if (!String.isNullOrWhiteSpace(locationData)) {
            $('#binlocationselect').select2('data', {
                id: locationData.publicids,
                text: locationData.value
            })
        };
        $('#modalBins .modal-body').append(String.format('<div id="searchDiv"; style="width:100%;margin-bottom:10px;"><label style="font-size:15px;">Ara: </label><input id="searchBin" type="text"  class="form-control"></div><hr id="searchHr";><div class="hizli-ekle-records"><h4 style="margin-top:0"><i class="fa fa-edit"></i> Bin Listesi</h4></div>'));
        $('#modalBins .modal-body').append('<div id="Ekstre" style="width: 100%;">');
        $('#searchDiv').hide();
        $('#Ekstre').hide();
        $('#txt').hide();
        $('.hizli-ekle-records').hide();
        $('#binlocationselect').trigger('change');
        $('#modalBins').modal('toggle');
    });

    $('body').on('change', '#binlocationselect', function() {
        $('#searchDiv').hide();
        $('#Ekstre').hide();
        $('#txt').hide();
        $('.hizli-ekle-records').hide();
        var binLocationSelect2Data = $('#binlocationselect').select2('data');
        if (!String.isNullOrWhiteSpace(binLocationSelect2Data)) {
            traxBins(binLocationSelect2Data.text);
        }
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
            location: $('#binlocationselect').val(),
            user: userData.id
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

function traxBins(traxBinlocation) {
    if (traxBinlocation === "") {

        alert("Lütfen Lokasyon giriniz!");
    } else {
        // var traxBinlocation = $('label[for=56A811DE60824088A5D8283CC1B695AF]').parent().data('value');
        $('#txt').show();
        var localUrl = String.format('http://localhost:65474/api/data/CalibrationBins?location={0}', traxBinlocation),
            realUrl = String.format('https://thywebapi.setcrm.com/api/data/CalibrationBins?location={0}', traxBinlocation);
        $.get(realUrl, function(r) {
            if (r.Status) {
                //    $('#binlocationselect').prop('disabled', false);
                $('#searchDiv').show();
                $('#Ekstre').show();
                // $('#modalBins .modal-body').append(String.format('<div class="trax-location-new-row mt-2"><h4 style="margin-top:0"><i class="fa fa-info"></i> KAYITLAR</h4></div><hr>'));

                $('#txt').hide();
                $('#Ekstre').html('');
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