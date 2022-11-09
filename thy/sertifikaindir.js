$(function() {
    $('.well .pull-right:eq(0)').prepend('<a id="sertifikaIndir" class="btn btn-sm btn-warning"  style="margin-right:10px;" >Sertifika İndir</a>');
    var calibratedTechnicianId = $('label[for=229E6919177C49229ADC807F42F67E94]').parent().data('publicids');
    var theScopeResponsibleId = $('label[for=ADF4F8BC81294E2AB8E20C2EC1AF1175]').parent().data('publicids');
    var headOfCalibrationId = $('label[for=16FDBE7D7AEE4DE2BEE137F82A59653C]').parent().data('publicids');
    var certificateId = $('label[for=142B5E3478094A99B1BB65C1AECA3D62]').parent().data('publicids');
    $('body').on('click', '#sertifikaIndir', function() {
        if (calibratedTechnicianId === "" || theScopeResponsibleId === "" || headOfCalibrationId === "") {
            $('#sertifikaModalUyari').remove();
            window.setModal.Create({
                id: 'sertifikaModalUyari',
                html: {
                    header: 'Uyarı',
                    body: '<div class="row">' +
                        '<p>Lütfen E-imza Kişilerini Doldurunuz.</p>' +
                        '</div>',
                    footer: '<a class="btn btn-sm btn-danger pull-right" data-dismiss="modal">Kapat</a>'
                }
            });
            $('#sertifikaModalUyari').modal('toggle');
        } else if (certificateId != "") {
            $('#sertifikaModalUyari').remove();
            window.setModal.Create({
                id: 'sertifikaModalUyari',
                html: {
                    header: 'Uyarı',
                    body: '<div class="row">' +
                        '<p>Sertifika zaten oluşturulmuş . Tekrar oluşturmak istiyor musunuz ?</p>' +
                        '</div>',
                    footer: '<button id="btnTekrarSertifikaIndir" class="btn btn-success btn-sm" >Evet</button><a class="btn btn-sm btn-danger pull-right" data-dismiss="modal">Hayır</a>'
                }
            });
            $('#sertifikaModalUyari').modal('toggle');
        } else {
            $('#uyariModal').remove();
            window.setModal.Create({
                id: 'uyariModal',
                html: {
                    header: 'İşlem Bilgisi',
                    body: 'İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif">',
                    footer: '<button type="button" id="btnKapatx" class="btn btn-sm btn-default" data-dismiss="modal" >Kapat</button>'
                }
            });
            $('#uyariModal').modal('toggle');

            var localUrl = String.format("http://localhost:65474/api/data/SertifikaBasTemplateDevExpressSon?recordId={0}&dokuman={1}", $('#RecordPublicId').val(), 'ThyWord.docx');
            var url = String.format("https://thywebapi.setcrm.com/api/data/SertifikaBasTemplateDevExpressSon?recordId={0}&dokuman={1}", $('#RecordPublicId').val(), 'ThyWord.docx');
            $.get(url, function(r) {
                window.location = "https://thywebapi.setcrm.com/api/data/getFile?fileName=" + r;
                $('#uyariModal').modal('toggle');
            });
        }

    });
    $('body').on('click', '#btnTekrarSertifikaIndir', function() {
        $('#sertifikaModalUyari').find('.modal-body').html('<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>');
        var localUrl = String.format("http://localhost:65474/api/data/SertifikaBasTemplateDevExpressSon?recordId={0}&dokuman={1}", $('#RecordPublicId').val(), 'ThyWord.docx');
        var url = String.format("https://thywebapi.setcrm.com/api/data/SertifikaBasTemplateDevExpressSon?recordId={0}&dokuman={1}", $('#RecordPublicId').val(), 'ThyWord.docx');
        $.get(url, function(r) {
            window.location = "https://thywebapi.setcrm.com/api/data/getFile?fileName=" + r;
            $('#sertifikaModalUyari').modal('toggle');
        });
    });
});




$(function() {
    $('.well .pull-right:eq(0)').prepend('<a id="sertifikaIndir" class="btn btn-sm btn-warning"  style="margin-right:10px;" >Sertifika İndir</a>');
    var calibratedTechnicianId = $('label[for=229E6919177C49229ADC807F42F67E94]').parent().data('publicids');
    var theScopeResponsibleId = $('label[for=ADF4F8BC81294E2AB8E20C2EC1AF1175]').parent().data('publicids');
    var headOfCalibrationId = $('label[for=16FDBE7D7AEE4DE2BEE137F82A59653C]').parent().data('publicids');
    $('body').on('click', '#sertifikaIndir', function() {
        if (calibratedTechnicianId === "" || theScopeResponsibleId === "" || headOfCalibrationId === "") {
            window.setModal.Create({
                id: 'sertifikaModalUyari',
                html: {
                    header: 'Uyarı',
                    body: '<div class="row">' +
                        '<p>Lütfen E-imza Kişilerini Doldurunuz.</p>' +
                        '</div>',
                    footer: '<a class="btn btn-sm btn-danger pull-right" data-dismiss="modal">Kapat</a>'
                }
            });
            $('#sertifikaModalUyari').modal('toggle');
        } else {
            $('#uyariModal').remove();
            window.setModal.Create({
                id: 'uyariModal',
                html: {
                    header: 'İşlem Bilgisi',
                    body: 'İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif">',
                    footer: '<button type="button" id="btnKapatx" class="btn btn-sm btn-default" data-dismiss="modal" >Kapat</button>'
                }
            });
            $('#uyariModal').modal('toggle');

            var localUrl = String.format("http://localhost:65474/api/data/SertifikaBasTemplateDevExpressSon?recordId={0}&dokuman={1}", $('#RecordPublicId').val(), 'ThyWord.docx');
            var url = String.format("https://thywebapi.setcrm.com/api/data/SertifikaBasTemplateDevExpressSon?recordId={0}&dokuman={1}", $('#RecordPublicId').val(), 'ThyWord.docx');
            $.get(url, function(r) {
                window.location = "https://thywebapi.setcrm.com/api/data/getFile?fileName=" + r;
                $('#uyariModal').modal('toggle');
            });
        }

    });
});