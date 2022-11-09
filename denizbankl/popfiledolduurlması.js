$(function() {
    window.setModal.Create({
        id: 'mailModal',
        html: {
            header: 'Mail için gerekli bilgiler',
            body: '<div id="msg" style="margin:0 0 5px"></div>',
            footer: '<button id="btnkayit" class="btn btn-success btn-sm">Kaydet</button>' +
                '<button class="btn btn-primary btn-sm" data-dismiss="modal" >Kapat</button>'
        }
    });
    $('.btn-br-actions[data-publicid=F5667B7022B4459E9E3A49FE37B802E5]').hide();
    //if ($('label[for=91E2EBEFAC224C079EBE9A7DBFA16EE4]').parent().data('publicids') !== '') { //atanan firma doluysa
    $('.btn-br-actions[data-publicid=F5667B7022B4459E9E3A49FE37B802E5]').closest('td').prepend('<a id="firmaMailGonder" class="btn btn-sm btn-warning" style="margin-right:10px;" >Firmaya Mail Gönder</a>');
    var filesList = "";
    //}
    $('body').on('click', '#firmaMailGonder', function() {
        filesList = "";

        $('#mailModal .modal-body').html('<div id="msg" style="margin:0 0 5px"></div>' +
            '<table id="tblilk" class="table table-striped table-hover">' +
            '<thead>' +
            '<tr><th>Kisiler</th><th>Yeni Kisi Ekle</th></tr>' +
            '</thead>' +
            '<tbody>' +
            '<tr>' +
            '<td><input id="kisi" type="select" value="" tabindex="-1" style="display: none;"></td><td><button id="btnHariciPers" class="btn btn-warning btn-sm">Harici Personel</button></td>' +
            '</tr>' +
            '</tbody>' +
            '</table>' +
            '<table id="tblAta" class="table table-striped table-hover">' +
            '<thead>' +
            '<tr><th>Sistem Kullanicilari</th></tr>' +
            '</thead>' +
            '<tbody>' +
            '<tr><td style="width: 15%"><input id="sistemKul" type="select" value="" tabindex="-1" style="display: none;"></td></tr>' +
            '</tbody>' +
            '<thead>' +
            '<tr><th>Mail Metni </th></tr>' +
            '</thead>' +
            '<tbody>' +
            '<tr><td style="width: 15%"><div id="atamaMessage" style="margin:0 0 5px; width: 100%;"></div></div></td></tr>' +
            '</tbody>' +
            '<thead>' +
            '<tr><th>Dosya Seçimi </th></tr>' +
            '</thead>' +
            '<tbody data-id="document">' +
            '<tr class="dosya-block"><td style="width: 15%"><div id="dosya" style="margin:0 0 5px; width: 100%;"></div></div></td></tr>' +
            '</tbody>' +
            '</table>');
        $('#mailModal').modal('toggle');
        $('#tblAta tbody[data-id="document"] tr:not(.dosya-block)').html('');
        var documentUrls = '/set/cagri/detail/' + $('label[for=F555098E62D24B82A6F2A7F254A9DB5C]').parent().data('publicids');
        $.get(documentUrls, function(sdata) {
            var elem = $('<div/>').html(sdata);
            var documentValues = elem.find('label[for=9A1F16A4311D49CE95C1E8CCF8780E63]').parent().data('value');
            var documentPublicIds = elem.find('label[for=9A1F16A4311D49CE95C1E8CCF8780E63]').parent().data('publicids');
            if (!String.isNullOrWhiteSpace(documentValues)) {
                if (documentValues.includes("|")) {
                    var documentValue = documentValues.split("|");
                    var documentPublicId = documentPublicIds.split("|");
                    filesList = documentPublicIds.split("|");
                    for (i = 0; i < documentValue.length; ++i) {
                        var newRow = $('<tr/>', {
                            'data-id': i + 1,
                            'data-rowid': i
                        });
                        newRow.append('<td><a style="height:40px;" href="http://mayareport.denizbank.com/setdocument/viewer/' + documentPublicId[i] + '" id="' + String.format('document_{0}', i) + '"class="form-control document" target="_blank"">' + documentValue[i] + '</a></td>');
                        $('#tblAta tbody[data-id="document"').append(newRow);
                    }
                } else {
                    filesList = documentPublicIds.split("|");
                    var newRow = $('<tr/>', {
                        'data-id': 1,
                        'data-rowid': 0
                    });
                    newRow.append('<td><a style="height:40px;" href="http://mayareport.denizbank.com/setdocument/viewer/' + documentPublicIds + '" id="' + String.format('document_{0}', 0) + '"class="form-control document" target="_blank"">' + documentValues + '</a></td>');
                    $('#tblAta tbody[data-id="document"').append(newRow);
                }
            }
        });
        var personNames = [];
        var sisKullanici = [];
        prepareSelect2('#kisi',
            '/Summary/LookupFieldValues', {
                coId: '35190EC2469C4BEC97349EAFE0F68E54',
                id: '2F9753EB832D423F97C67E8E02CC0D54',
                viewFilterId: '3C0CEDF4201B4C80800AAF2CECC19F33'
            },
            null,
            true);
        prepareSelect2('#sistemKul',
            '/summary/organizationalunititems', {
                publicId: '1783EA5A3A724DDFA9964EED1BFFF614',
                name: 'User',
                filterType: 'User',
                groupIds: null,
                depth: 1,
                includeItSelf: false
            },
            null,
            true);
        $('#sistemKul').select2('data', { id: userData.id, text: userData.name }).trigger('Change');

        $('#mailModal .modal-body #atamaMessage').append($('<textarea/>', {
            'type': 'textarea',
            'id': 'mailMetni',
            'name': 'mailMetni',
            'class': 'row',
            'width': '95%',
            'value': '',
            'height': '220px'
        }));
        $('#mailModal .modal-body #dosya').append($('<input/>', {
            'type': 'file',
            'id': 'file1',
            'class': 'file',
            'width': '95%',
            'multiple': 'multiple'
        }));
        $('#mailModal .modal-body #dosya').append($('<ul/>', {
            'class': 'list-group file-list'
        }));

    });
    $('body').on('click', '#btnkayit', function() {
        var uploadedFile = "";
        var docId1 = $('label[for=98E5CEB054D34EE4809FF44EE6B40561]').parent().data('publicids');
        var docId2 = $('label[for=2C348FCBB0B54BF59718B459E203E736]').parent().data('publicids');
        var mail = $('#mailMetni').val();
        var kisi = $('#kisi').val();
        var sisK = $('#sistemKul').val();
        var setUrl = '/set/new/mail-tarihcesi';
        var ajax = new XMLHttpRequest();
        var files = document.getElementById("file1").files;
        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                var formData = new FormData();
                formData.append('id', '81BD7B96E83B47CB83F13528842D996F');
                formData.append('fieldId', 'file1');
                formData.append('files[]', file, file.name);
                var docId = "";
                ajax.open('POST', '/Document/Upload', false);
                ajax.onloadend = function() {
                    if (ajax.status == 200) {
                        var result = JSON.parse(ajax.response).Result;
                        if (i + 1 !== files.length) {
                            docId = result.DocumentId;

                        } else {
                            docId = result.DocumentId;
                        }
                        uploadedFile = docId;
                    }
                }
                ajax.send(formData);
            }
        } else {
            uploadedFile = filesList[0];
        }

        var requestVerificationToken = $('input[name=__RequestVerificationToken]').val();
        var postdata = {
            __RequestVerificationToken: requestVerificationToken,
            'E6ED8721BC6B4E9CB454A116DF58DF79': $('#RecordPublicId').val(),
            'AF993BB3C5F647DC91155401E5BA0E63': userData.id,
            'B30CC8A6DCA3402FB0E9312FFBAB0591': mail,
            '416CA6ED79AF4F3EAC8020EB472B2CBA': $('label[for=91E2EBEFAC224C079EBE9A7DBFA16EE4]').parent().data('publicids'),
            '221AEB4DC4264E118FD22EDAE96486A2': kisi,
            '0FE88399226C4B07BCDC427F8FA7AA91': docId1,
            '20F9913220A447369431DF153AC5B613': docId2,
            'FA9A456F59CA44CE8B95A0D12A2E966D': sisK,
            'AA0984D670374A39A7B0CD191C928AEE': uploadedFile
        }
        $.post(setUrl, postdata).done(function(r) {
            var msg = $(r).find('#__Msg');
            if (msg.length <= 0) {
                window.location.reload();
            }
        });
        $('#mailModal .modal-body').html('Isleminiz yapiliyor, lütfen bekleyiniz..');

    });
    $('body').on('click', '#btnHariciPers', function() {
        window.open('/set/new/harici-personel');
    });
});