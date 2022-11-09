$(function() {
    $('.pull-right').prepend('<a id="btnTeklifKopyala" class="btn btn-sm btn-warning"  style="margin-right:10px;" >Teklif Kopyala</a>');
    $('body').on('click', '#btnTeklifKopyala', function() {
        $('#modalTeklif').remove();
        window.setModal.Create({
            id: 'modalTeklif',
            html: {
                content: 'style="width:900px !important"',
                header: 'Teklif Kopyala',
                body: '<table class="table" style="width: 100%">' +
                    '<thead>' +
                    '<tr><th>Cari Bilgisi</th><th>İlgili Kişi</th></tr>' +
                    '</thead>' +
                    '<tbody>' +
                    '<tr>' +
                    '<td colspan="1" rowspan="1"><input id="cariBilgisi" type="select"  style="resize:none;width:100%;"></td>' +
                    '<td colspan="1" rowspan="1"><input id="ilgiliKisi" type="select"  style="resize:none;width:100%;"></td>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>',
                footer: '<button id="btnTeklifOlustur" type="button" class="btn btn-sm btn-success" >Teklif Oluştur</button>' + '<button type="button" class="btn btn-sm btn-default" data-dismiss="modal">İptal Et</button>'
            }
        });
        $('#modalTeklif .modal-dialog').css('width', '50%');
        $('#modalTeklif .modal-dialog').css('height', '50%');
        $('#modalTeklif').modal('toggle');

        prepareSelect2('#cariBilgisi', '/Summary/LookupFieldValues', { coId: 'AEC97DC92AF74EEB9249121CCD79058F', id: 'C8F239834AC44322B84EA1D1B776A18A', viewFilterId: '23955B5D9FB74E6C841BDEFEBB30B34E' }, null, false);
        var cariBilgisiVal = $('label[for=C8F239834AC44322B84EA1D1B776A18A]').parent().data('value');
        var cariBilgisiId = $('label[for=C8F239834AC44322B84EA1D1B776A18A]').parent().data('publicids');

        $('#cariBilgisi').select2('data', {
            id: cariBilgisiId,
            text: cariBilgisiVal,
        }).trigger('change');

        prepareSelect2('#ilgiliKisi', '/Summary/LookupFieldValues', { coId: 'AEC97DC92AF74EEB9249121CCD79058F', id: '60942809A4E245B0A06E2EFD7F303BBE', viewFilterId: '283CB9F179254DCC943199A8F6AFBDBA' }, null, false);
        var ilgiliKisiVal = $('label[for=60942809A4E245B0A06E2EFD7F303BBE]').parent().data('value');
        var ilgiliKisiId = $('label[for=60942809A4E245B0A06E2EFD7F303BBE]').parent().data('publicids');

        $('#ilgiliKisi').select2('data', {
            id: ilgiliKisiId,
            text: ilgiliKisiVal
        }).trigger('change');


    });


    $('body').on('click', '#btnTeklifOlustur', function() {
        var data = {
                RecordId: $('#RecordPublicId').val(),
                IlgiliKisi: $('#ilgiliKisi').val(),
                CariBilgisi: $('#cariBilgisi').val(),
            }
            // var url = 'https://maya.setcrm.com/api/data/TeklifKopyala?=recordId' + data.RecordId + "&musteri=" + data.CariBilgisi + "&ilgiliKisi=" + data.IlgiliKisi;
        var url2 = 'http://localhost:64038/api/data/TeklifKopyala?=recordId' + data.RecordId + "&musteri=" + data.CariBilgisi + "&ilgiliKisi=" + data.IlgiliKisi;
        $('#modalTeklif .modal-body').html('<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>');

        $.get(url2, data, function(r) {
            if (r.Status) {
                $('#modalTeklif').modal('toggle');


            } else {
                setUtil.alert({
                    container: '#modalTeklif .modal-body #msg',
                    message: r.Message,
                    alertClass: 'alert-danger',
                    autoClose: true
                });
            }
        });
    });

});