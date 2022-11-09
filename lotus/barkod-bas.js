$(function() {
    var url = 'http://localhost:55910/';
    var statu = $('body').find('label[for=E2FA31F1EB2C4ED28B2480CAE9F114E9]').parent().find('a').justText();
    if ($('#LayoutPublicId').val() === '421EC88AF0C14C44883BD55FC73C4B00' && statu === 'Kabul Bekliyor') {
        $('.well .pull-right').prepend('<a id="modalOpen" class="btn btn-sm btn-warning" style="margin-right: 8px;" >Numune Kabulü YapTes</a>');
    }
    $('body').on('click', '#modalOpen', function() {
        $('#bilgi').remove();
        window.setModal.Create({
            id: 'bilgi',
            html: {
                header: 'Uyarı',
                body: 'İşleminiz Yapılıyor. Lütfen Bekleyiniz.',
                footer: ''
            }
        });
        $('#bilgi').modal('toggle');
        $.get(url + '/api/data/NumuneKabuluYap?numunerecordid=' + $('#RecordPublicId').val(), function(result) {
            if (result.Status === false) {
                $('#bilgi .modal-body').html(result.Message);
            } else {
                // $.get('/set/list/kabul-edilen-numuneler/?filter=25E8E1F8A6DF4A758B8CB2B9C4B82D8A', function (sdata) {
                //     var elem = $('<div />').html(sdata);
                //     var numunesayisi = parseInt($(elem.find('#itemCount')[0]).text());
                //     var sayi = parseInt(numunesayisi).toString().length;
                //     if (sayi === 1)
                //         numunesayisi = '0000' + numunesayisi;
                //     else if (sayi === 2)
                //         numunesayisi = '000' + numunesayisi;
                //     else if (sayi === 3)
                //         numunesayisi = '00' + numunesayisi;
                //     else if (sayi === 4)
                //         numunesayisi = '0' + numunesayisi;
                //     var datatarih = {
                //         customObjectId: '1179945DEDF64D5DAE33843614E8B8D4',
                //         recordId: $('#RecordPublicId').val(),
                //         fieldId: '5C41720F11FA487894C3923CBDDEA4FC',
                //         value: moment().format('YYYY') + numunesayisi,
                //         __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val()
                //     };
                // $.get(url + '/api/data/SayacNumarasiAta?recordId=' + $('#RecordPublicId').val(), function (result) {
                //     if (result.Status !== true) {

                //         $('#bilgi .modal-body').html(result.Message);
                //     } else {
                $.get(url + '/api/data/IlgiliNumuneGuncelleme?recordId=' + $('#RecordPublicId').val(), function(result) {
                    if (result.Message === 'true') {
                        window.location.reload();
                    } else {
                        $('#bilgi .modal-body').html('');
                        $('#bilgi .modal-body').html(result.Message);
                    }
                });
                //     }
                // });

                // $.post('/Set/UpdateFieldValue', datatarih, function (r) {
                //     if (r.IsOk) {
                //         $.get(url + '/api/data/IlgiliNumuneGuncelleme?recordId=' + $('#RecordPublicId').val(), function (result) {
                //             if (result.Message === 'true') {
                //                 window.location.reload();
                //             } else {
                //                 $('#bilgi .modal-body').html('');
                //                 $('#bilgi .modal-body').html(result.Message);
                //             }
                //         });
                //     }
                // });
                // });
            }
        });
    });
    $('#bilgi').on('hide.bs.modal', function(e) {
        return false;
    });
});