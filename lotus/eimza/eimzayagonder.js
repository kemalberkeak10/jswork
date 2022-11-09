$(function() {
    var url = '';
    if (window.location.href.contains('lotuslab')) {
        url = 'https://lotuslabservice.setxrm.com';
    } else {
        url = 'http://xrmserver:8086';
    }
    var pageid = $('#LayoutPublicId').val();
    var statu = $('label[for=E2FA31F1EB2C4ED28B2480CAE9F114E9]').closest('div').data('publicids');
    // if((pageid === '421EC88AF0C14C44883BD55FC73C4B00' || pageid === '44EBE47755E54E94ACD64699139DC689') && statu === '816E077F5DAB408CAD0038F18FCE0094'){
    if (pageid === '421EC88AF0C14C44883BD55FC73C4B00' || pageid === '44EBE47755E54E94ACD64699139DC689') {
        $('.well .pull-right:eq(0)').prepend('<a id="imzaGonder" class="btn btn-sm btn-danger" ><i class="fa fa-file-excel-o"/>E-imza ya Gönder</a>');
    }
    $('body').on('click', '#imzaGonder', function() {
        window.setModal.Create({
            id: 'mdlEimza',
            html: {
                header: 'E-imza Şablon Seçimi',
                body: '<div id="msg" style="margin:0 0 5px;width: 100%">' +
                    '<table id="tblzaman" style="width: 100%" >' +
                    '<tr id="sablonSecenek"><td><input id="Views" name="Views" type="select2view" value="" title="Sablon" tabindex="0"></td></tr>' +
                    '<tr id="trgiris" style="width: 100%">' +
                    '</table></div>',
                footer: '<button id="btnKapat" type="button" class="btn btn-sm btn-info" data-dismiss="modal" >Kapat</button><button id="btnOlustur" type="button" class="btn btn-sm btn-warning">Oluştur</button>'
            }
        });
        var headerViewData = [{
                id: 'AC67F34DB3DD45E1AB476F735AA8AA13',
                text: 'E-imza Türkçe'
            },
            {
                id: '6C5999056C724D6F908141CA7340AA6C',
                text: 'E-imza İngilizce'
            },
            {
                id: '010E48450BCB4ACD975117642A2A867D',
                text: 'E-imza Türkçe(ing)'
            },
            {
                id: 'AC67F34DB3DD45E1AB476F735AA8AA13',
                text: 'E-imza Türkçe Kapaksız'
            },
            {
                id: '6C5999056C724D6F908141CA7340AA6C',
                text: 'E-imza İngilizce Kapaksız'
            },
            {
                id: '010E48450BCB4ACD975117642A2A867D',
                text: 'E-imza Türkçe(ing) Kapaksız'
            }
        ];
        prepareSelect2WithData('#Views', headerViewData);
        $('#mdlEimza').modal('toggle');
    });
    $('body').on('click', '#btnOlustur', function() {
        var tip = $('#Views').val();
        var kapaksiz = "false";
        if ($('#Views').select2('data').text.contains('Kapaksız')) {
            kapaksiz = "true";
        }
        $('#mdlEimza .modal-body').html('Lütfen bekleyiniz..');
        $.get(url + '/api/data/EImzayaGonder?recordId=' + $('#RecordPublicId').val() + '&tip=' + tip + "&kapaksiz=" + kapaksiz, function(result) {
            if (result.Status) {
                var rTarih = $('label[for=5E8F9B8392724DF7A44BFEC80ACD6599]').parent().data('value');
                if (rTarih === "") {
                    var setUrl = '/set/numune/edit/' + $('#RecordPublicId').val();
                    var requestVerificationToken = $('input[name=__RequestVerificationToken]').val();
                    var postdata = {
                        __RequestVerificationToken: requestVerificationToken,
                        '5E8F9B8392724DF7A44BFEC80ACD6599': moment().format('DD.MM.YYYY HH:mm:ss')
                    }
                    $.post(setUrl, postdata).done(function(r) {
                        var msg = $(r).find('#__Msg');
                        if (msg.length <= 0) {
                            window.location.reload();
                        } else {
                            console.log(r);
                        }
                    });
                } else {
                    window.location.reload();
                }
            }
        });
    });
});