$(function() {
    window.setModal.Create({
        id: 'modalStokDetay',
        settings: {
            widthClass: 'modal-full-width',
        },
        html: {
            header: 'Cari Ekstre',
            body: '<div id="stokDetaymessage" style="margin:0 0 5px;width: 100%">' +
                '<table id="tblpaket" class="table table-bordered table-striped table-hover no-more-table" style="width: 100%">' +
                '<tr id="trurun1" style="width: 100%">' +
                '<td><label>Cari Referans</label></td>' +
                '<td><label>Cari Kod</label></td>' +
                '<td><label>Cari Unvan</label></td>' +
                '<td><label>Odeme Plan Kodu</label></td>' +
                '<td><label>Odeme Plan Adi</label></td>' +
                '<td><label>Acik Hesap Risk Limit</label></td>' +
                '<td><label>Borc</label></td>' +
                '<td><label>Alacak</label></td>' +
                '<td><label>Bakiye</label></td>' +
                '</tr>' +
                '</table></div>',
            footer: '<button id="btnPdfBas" type="button" class="btn btn-sm btn-info">PDF</button><button id="btnKapat" type="button" class="btn btn-sm btn-info" data-dismiss="modal">Kapat</button>'
        }
    });
    $('.well .pull-right').prepend('<a id="btnStokDetay" class="btn btn-sm btn-success" style="margin-right: 3px;">Cari Ekstre</a>');
    var control1 = $('label[for=76EA70E6449D4605919AFD5BFF689109]').parent().data('value');

    if (control1 == "True") {
        var urunid = $('label[for=073007518CCE4C7FB3D748B1C47EFA27]').closest('div').find('a').attr('href').split('/')[4]
        $.get('https://ilpenwebapi.setcrm.com/api/data/GetAcikFaturalarMaya?carirecordID=' + urunid, function(result) {
            doWork.tableData = [];
            doWork.loopSerialNumbers(result);
            $('#modalStokDetay').modal('toggle');
            if (result.acikFatura.length > 0) {
                if (result.acikFatura[0].Bakiye.includes('-')) {
                    BorcAlert();
                }
            }
        });
    } else {
        var urunid = $('label[for=073007518CCE4C7FB3D748B1C47EFA27]').closest('div').find('a').attr('href').split('/')[4]
        $.get('https://ilpenwebapi.setcrm.com/api/data/GetAcikFaturalarMaya?carirecordID=' + urunid, function(result) {
            if (result.acikFatura.length > 0) {
                if (result.acikFatura[0].Bakiye.includes('-')) {
                    BorcAlert();
                }
            }
        });
    }
    var doWork = {
        tableData: [],
        loopSerialNumbers: function(result) {
            var $this = this;
            var tBody = $('#tblpaket');
            $('#tblpaket tbody tr').remove()
            var tr2 = $('<tr/>', {
                'data-id': 'tr2',
            });
            tr2.append($('<td/>').append('<label>Cari Referans</label>'));
            tr2.append($('<td/>').append('<label>Cari Kod</label>'));
            tr2.append($('<td/>').append('<label>Cari Unvan</label>'));
            tr2.append($('<td/>').append('<label>Odeme Plan Kodu</label>'));
            tr2.append($('<td/>').append('<label>Odeme Plan Adi</label>'));
            tr2.append($('<td/>').append('<label>Acik Hesap Risk Limit</label>'));
            tr2.append($('<td/>').append('<label>Borc</label>'));
            tr2.append($('<td/>').append('<label>Alacak</label>'));
            tr2.append($('<td/>').append('<label>Bakiye</label>'));
            tBody.append(tr2);

            var tr = $('<tr/>', {
                'data-id': 'tr2',
            });
            tr.append($('<td/>').append(result.acikFatura[0].CariReferans));
            tr.append($('<td/>').append(result.acikFatura[0].CariKod));
            tr.append($('<td/>').append(result.acikFatura[0].CariUnvan));
            tr.append($('<td/>').append(result.acikFatura[0].OdemePlanKodu));
            tr.append($('<td/>').append(result.acikFatura[0].OdemePlanAdi));
            tr.append($('<td/>').append(result.acikFatura[0].AcikhesapRiskLimit));
            tr.append($('<td/>').append(result.acikFatura[0].Borc));
            tr.append($('<td/>').append(result.acikFatura[0].Alacak));
            tr.append($('<td/>').append(result.acikFatura[0].Bakiye));
            tBody.append(tr);


            return;
        }
    };
    $('body').on('click', '#btnStokDetay', function() {
        var urunid = $('label[for=073007518CCE4C7FB3D748B1C47EFA27]').closest('div').find('a').attr('href').split('/')[4]
        $('#modalStokDetay').modal('toggle');
        $.get('https://ilpenwebapi.setcrm.com/api/data/GetAcikFaturalarMaya?carirecordID=' + urunid, function(result) {
            doWork.tableData = [];
            doWork.loopSerialNumbers(result);
        });

    });
    $('body').on('click', '#btnPdfBas', function() {
        var urunid = $('label[for=073007518CCE4C7FB3D748B1C47EFA27]').closest('div').find('a').attr('href').split('/')[4]
        var url = "https://ilpenwebapi.setcrm.com/api/data/CariPdf?carirecordID=" + urunid;
        $.get(url, function(data) {
            if (data !== null) {
                var dosyayolu = data.split('|')[0];
                window.location = 'https://ilpenwebapi.setcrm.com/api/data/GetFilePdf?fileName=' + dosyayolu;
            }
        });

    });

    function BorcAlert() {
        const Toast = Swal.mixin({
            toast: false,
            position: 'center',
            showConfirmButton: true,
            // timer: 2000,
            // timerProgressBar: false,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        Toast.fire({
            icon: 'warning',
            title: 'Bu firmanın borcu bulunmaktadır.',
            width: 1000,
        })
    }
});