$(function() {
    $('.pull-right:first').prepend('<a id="btnTeklifKopyala" class="btn btn-sm btn-primary"  style="margin-right:10px;" >Teklif Kopyala</a>');
    $('body').on('click', '#btnTeklifKopyala', function() {
        $('#modalTeklif').remove();
        window.setModal.Create({
            id: 'modalTeklif',
            html: {
                content: 'style="width:900px !important"',
                header: 'Teklif Kopyala',
                body: '<div id="msg"></div><table class="table" style="width: 100%">' +
                    '<thead>' +
                    '<tr><th>Cari Bilgisi</th><th>İlgili Kişi <a style="display:none;position: absolute;margin-left: 5px;" class="btn btn-xs btn-primary open-new-lookup-tab" data-id="AFB64DE218C5408899EEFFE855ECB536" data-href="/set/new/ilgili-kisi" title="Yeni İlgili Kişi"><i class="fa fa-plus pointer"></i></a></th></tr>' +
                    '</thead>' +
                    '<tbody>' +
                    '<tr>' +
                    '<td colspan="1" rowspan="1"><div id="cariBilgisi"></div></td>' +
                    '<td colspan="1" rowspan="1"><div id="ilgiliKisi"></div></td>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>',
                footer: '<button id="btnTeklifOlustur" type="button" class="btn btn-sm btn-success" >Teklif Oluştur</button>' + '<button type="button" class="btn btn-sm btn-default" data-dismiss="modal">İptal Et</button>'
            }
        });
        $('#modalTeklif .modal-dialog').css('width', '50%');
        $('#modalTeklif').modal('toggle');

        prepareSelect2('#cariBilgisi', '/Summary/LookupFieldValues', {
            coId: 'AEC97DC92AF74EEB9249121CCD79058F',
            id: 'C8F239834AC44322B84EA1D1B776A18A',
            viewFilterId: '23955B5D9FB74E6C841BDEFEBB30B34E'
        }, null, false);

        prepareSelect2('#ilgiliKisi', '/Summary/LookupFieldValues', {
            coId: 'AEC97DC92AF74EEB9249121CCD79058F',
            id: '60942809A4E245B0A06E2EFD7F303BBE',
            viewFilterId: '283CB9F179254DCC943199A8F6AFBDBA',
        }, null, false);

        $('#ilgiliKisi').select2('enable', false);

    });
    $('body').on('change', '#cariBilgisi', function() {
        var cariBilgisi = $(this).val();
        if (String.isNullOrWhiteSpace(cariBilgisi)) {
            $('#ilgiliKisi').select2('data', null).select2('enable', false);
            $("#modalTeklif .open-new-lookup-tab").hide();
        } else {
            prepareSelect2('#ilgiliKisi', '/Summary/LookupFieldValues', {
                coId: 'AEC97DC92AF74EEB9249121CCD79058F',
                id: '60942809A4E245B0A06E2EFD7F303BBE',
                viewFilterId: '283CB9F179254DCC943199A8F6AFBDBA',
                controllingRecordId: $(this).val()
            }, null, false);
            $('#ilgiliKisi').select2('enable', true);
            $("#modalTeklif .open-new-lookup-tab").show();
        }
    })
    $('body').on('click',
        '#btnTeklifOlustur',
        function() {
            var data = {
                RecordId: $('#RecordPublicId').val(),
                IlgiliKisi: $('#ilgiliKisi').val(),
                CariBilgisi: $('#cariBilgisi').val(),
            }
            if (String.isNullOrWhiteSpace(data.IlgiliKisi) || String.isNullOrWhiteSpace(data.CariBilgisi)) {
                setUtil.alert({
                    container: '#modalTeklif .modal-body #msg',
                    message: "Lütfen Cari Bilgisi ve İlgili Kişi alanlarını kontrol edip tekrar deneyiniz.",
                    alertClass: 'alert-warning',
                    autoClose: true
                });
                return;
            }
            $("#btnTeklifOlustur").hide();
            var url = 'https://serrasungerwebapi.setcrm.com/api/data/TeklifKopyala?=recordId' + data.RecordId + "&musteri=" + data.CariBilgisi + "&ilgiliKisi=" + data.IlgiliKisi;
            $("#modalTeklif .modal-body").find('table').hide();
            //var url2 = 'http://localhost:64038/api/data/TeklifKopyala?=recordId' + data.RecordId + "&musteri=" + data.CariBilgisi + "&ilgiliKisi=" + data.IlgiliKisi;
            $('#modalTeklif .modal-body').append('<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>');
            $('#btnTeklifOlustur').addClass('disabled');
            $.get(url, data, function(r) {
                $("#txt").hide();
                if (r.Status) {
                    setUtil.alert({
                        container: '#modalTeklif .modal-body #msg',
                        message: "Teklifiniz kopyalanmıştır.",
                        alertClass: 'alert-success',
                        autoClose: false
                    });
                    $('#modalTeklif .modal-body').append(String.format('<a href="https://maya.setcrm.com/set/genel-teklif/detail/{0}" target="_blank" class="btn btn-primary btn-sm"><i class="fas fa-external-link-alt"></i> Görüntüleme</a>', r.NewOfferRecordId));
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