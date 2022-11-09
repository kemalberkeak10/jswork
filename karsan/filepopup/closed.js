$(function() {

    $('.btn-br-actions[data-publicid=170560C4980748D38800BFA98BEB908B]').hide();
    $('.btn-br-actions[data-publicid=170560C4980748D38800BFA98BEB908B]').closest('td').prepend('<a id="closedTamamlandi" class="btn btn-sm btn-warning btn-br-actions" style="margin-right:10px;" >Closed (Tamamlandı)</a>');

    $('body').on('click', '#closedTamamlandi', function() {
        $('#modalClosed').remove();
        window.setModal.Create({
            id: 'modalClosed',
            html: {
                header: 'Closed (Tamamlandı)',
                body: '<div id="msg" style="margin:0 0 5px; width: 100%;">' +
                    '</div>' +
                    '<table class="table table4" style="width: 100%">' +
                    '<thead>' +
                    '<tr>' +
                    '<th>Açıklama</th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody>' +
                    '<tr>' +
                    '<td colspan="1" rowspan="1"><textarea rows="3" cols="70" id="closedTextArea" type="text" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;" /></td>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>' +
                    '<table class="table" style="width: 100%">' +
                    '<thead>' +
                    '<tr><th>Dosya</th></tr>' +
                    '</thead>' +
                    '<tbody>' +
                    '<tr>' +
                    '<td colspan="1" rowspan="1"><input type="file" class="file" id="fileClosed"/></td>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>',


                footer: '<button id="btnClosedKaydet" type="button" class="btn btn-sm btn-success">Kaydet</button><button id="btnKapat" type="button" class="btn btn-sm btn-default" data-dismiss="modal" onclick="window.location.reload()">Kapat</button>'
            },
            settings: {
                widthClass: 'modal-lg'
            },
        });
        $('#modalClosed').modal('toggle');
    });
    $('body').on('click', '#btnClosedKaydet', function() {
        var metin = $('#closedTextArea').val();
        var docId = "";
        var files = document.getElementById("fileClosed").files;
        if (files.length > 0) {
            var list = new Array();
            for (let index = 0; index < files.length; index++) {
                const file = files[index];
                var formData = new FormData();
                formData.append('id', '13D758C3C5D444AEB8E83FDA9BDBF7EA');
                formData.append('fieldId', '1C5AF870204C479699CAB4BB00007F04');
                formData.append('files[]', file, file.name);
                var ajax = new XMLHttpRequest();
                ajax.open('POST', '/Document/Upload', false);
                ajax.onloadend = function() {
                    if (ajax.status == 200) {
                        var result = JSON.parse(ajax.response).Result;
                        docId = result.DocumentId;
                        list.push(docId);
                    }
                }
                ajax.send(formData);
            }
        }
        if (metin !== "") {
            var data = {
                RecordId: $('#RecordPublicId').val(),
                AciklamaText: $('#closedTextArea').val(),
                KayitOlusturan: userData.id,
                DosyaId: docId,
            };
            var url = 'https://karsanservice.setcrm.com/api/asdadasdasdas';
            var url2 = 'http://localhost:53015/api/data/asdasdasdas';
            $.get(url, data, function(r) {
                if (r.Status) {
                    $('#modalClosed').modal('toggle');
                    notify('success', 'İşlem başarılı sayfa yenileniyor lütfen bekleyiniz...');
                    window.location.reload();
                } else {
                    setUtil.alert({
                        container: '#modalClosed .modal-body #msg',
                        message: r.Message,
                        alertClass: 'alert-danger',
                        autoClose: true
                    });
                }
            });
        } else {
            setUtil.alert({
                container: '#modalClosed .modal-body #msg',
                message: 'Lütfen Açıklama alanını doldurunuz.',
                alertClass: 'alert-warning',
                autoClose: true
            });
        }

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
});