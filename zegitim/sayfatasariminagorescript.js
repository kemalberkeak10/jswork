$(function() {
    var pageLayoutId = $('#LayoutPublicId').val();
    if (pageLayoutId == "66AA357D93AF42E3B8D7E69F553CD9E2") {
        var leadStatus = $('label[for=AD89469AB88A4450A90683DD12BCDAE8]').parent().data('publicids');
        if (leadStatus == "E80E5A23C4854BA4AC39853FFF9140E2") {
            //pool hide
            $('#btnPool').hide();
        } else {
            $('#btnNewBeggining').hide();
        }
    }
});


$(function() {

    $('.btn-br-actions[data-publicid=602A8C560FD04F6796159E78C0A18B21]').hide();
    $('.btn-br-actions[data-publicid=602A8C560FD04F6796159E78C0A18B21]').closest('td').prepend('<a id="btnSendToInterview" class="btn btn-sm btn-warning btn-br-actions" style="margin-right:10px;" >Send To Interview</a>');

    $('body').on('click', '#btnSendToInterview', function() {
        $('#modelSendToInterview').remove();
        window.setModal.Create({
            id: 'modelSendToInterview',
            html: {
                header: 'Send To Interview',
                body: '<div id="msg" style="margin:0 0 5px; width: 100%;">' +
                    '</div>' +
                    '<table class="table" style="width: 100%">' +
                    '<thead>' +
                    '<tr><th>X-RAY PHOTO</th></tr>' +
                    '</thead>' +
                    '<tbody>' +
                    '<tr>' +
                    '<td colspan="1" rowspan="1"><input type="file" multiple="multiple" accept="image/*" class="file" id="fileXrayPhoto"/></td>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>',

                footer: '<button id="btnXrayKaydet" type="button" class="btn btn-sm btn-success">Kaydet</button><button id="btnKapat1" type="button" class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>'
            },

        });
        $('#modelSendToInterview .modal-body').css('max-height', '');
        $('#modelSendToInterview .modal-body').css('height', '150px');
        $('#modelSendToInterview .modal-dialog').css('width', '30%');
        $('#modelSendToInterview').modal('toggle');


    });

    $('body').on('click', '#btnXrayKaydet', function() {
        $(this).prop('disabled', true);
        var xRayKayıtlı = $('label[for=BDBE3284272D41F0B5DEF0DDC0FCD8CF]').parent().data('publicids');
        var docId = "";
        var files = document.getElementById("fileXrayPhoto").files;
        if (files.length > 0) {
            var list = new Array();
            for (let index = 0; index < files.length; index++) {
                const file = files[index];
                var formData = new FormData();
                formData.append('id', 'EF573DB00D0D411ABC60A5425DFAFF93');
                formData.append('fieldId', 'BDBE3284272D41F0B5DEF0DDC0FCD8CF');
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

        var doc = xRayKayıtlı;
        //debugger;
        if (list != null) {
            if (list.length > 0) {
                $.each(list, function(i, el) {
                    //debugger;

                    doc = doc + "|" + list[i];

                });
            }
        }
        console.log(doc);
        data = {
            customObjectId: $('#CustomObjectPublicId').val(),
            recordId: $('#RecordPublicId').val(),
            fieldId: 'BDBE3284272D41F0B5DEF0DDC0FCD8CF',
            value: doc
        };
        $.post('/Set/UpdateFieldValue',
            data,
            function(r) {
                if (r.IsOk) {
                    $('#modelSendToInterview').modal('hide');
                    //     setTimeout(() => {
                    //         window.location.reload();
                    //     }, 500);
                    $('.btn-br-actions[data-publicid=602A8C560FD04F6796159E78C0A18B21]').trigger('click');
                }

            });
    });
});

$(function() {
    if ($('div [for=185A50CA4B1649D48D464E09318DFDEF]').parent().data().publicids !== null) {
        var statu = $('div [for=185A50CA4B1649D48D464E09318DFDEF]').parent().data().publicids;
    }

    if (statu == "17F52A54D9C64256BBB9BB80304122BE") /*draft/taslak statu*/ {
        $('a[data-publicid= 0E9E642F7A394E52899A19266E774378]').closest('td').show(); //open
        $('a[data-publicid= 5C9804145B30456793ACCE670345CAE7]').closest('td').hide(); //Convert Request Back to Karsan Service
        $('a[data-publicid= 296EE96733A04FA394C9809FD69D1095]').closest('td').hide(); //In Process(servis)
        $('a[data-publicid= C11844B612FF4CCDAAB5DE33A8821896]').closest('td').hide(); //In Process(karsan-Spare parts)
        $('a[data-publicid= 170560C4980748D38800BFA98BEB908B]').closest('td').hide(); //Closed
        $('a[data-publicid= 262734490DE64B8B9133166A0484678B]').closest('td').hide(); //Cancel
        $('a[data-publicid= DA12335DF9A74395B4AD6918173D89F4]').closest('td').hide(); //Recomend as solution to other servis

    }

    if (statu == "F4503C0F99184EC89ED0C82F7538194C") /*In Process(servis) statu*/ {
        $('a[data-publicid= 0E9E642F7A394E52899A19266E774378]').closest('td').hide(); //open
        $('a[data-publicid= 5C9804145B30456793ACCE670345CAE7]').closest('td').hide(); //Convert Request Back to Karsan Service
    }

    if (statu == "9694D1F4C29140B0A92F80D9045FFC30") /*open statu*/ {
        $('a[data-publicid= 0E9E642F7A394E52899A19266E774378]').closest('td').hide(); //open
        $('a[data-publicid= 5C9804145B30456793ACCE670345CAE7]').closest('td').hide(); //Convert Request Back to Karsan Service
    }

});


$(function() {

    $('.btn-br-actions[data-publicid=5C9804145B30456793ACCE670345CAE7]').hide();
    if (window.activeLanguage == "en") {

        $('.btn-br-actions[data-publicid=5C9804145B30456793ACCE670345CAE7]').closest('td').prepend('<a id="tekrarKarsanServisedonustur" class="btn btn-sm btn-warning btn-br-actions" style="margin-right:10px;" >Convert Request Back to Karsan Service</a>');

    } else {

        $('.btn-br-actions[data-publicid=5C9804145B30456793ACCE670345CAE7]').closest('td').prepend('<a id="tekrarKarsanServisedonustur" class="btn btn-sm btn-warning btn-br-actions" style="margin-right:10px;" >Talebi Tekrar Karsan Servise Dönüştür</a>');

    }

    $('body').on('click', '#tekrarKarsanServisedonustur', function() {
        $('#modalTalebiTekrarServiseDonustur').remove();
        window.setModal.Create({
            id: 'modalTalebiTekrarServiseDonustur',
            html: {
                header: 'Talebi Tekrar Karsan Servise Dönüştür',
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
                    '<td colspan="1" rowspan="1"><textarea rows="3" cols="70" id="serviseTekrarDonusturTextArea" type="text" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;" /></td>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>' +
                    '<table class="table" style="width: 100%">' +
                    '<thead>' +
                    '<tr><th>Dosya</th></tr>' +
                    '</thead>' +
                    '<tbody>' +
                    '<tr>' +
                    '<td colspan="1" rowspan="1"><input type="file" class="file" id="fileTekrarServiseDonustur"/></td>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>',


                footer: '<button id="btnTekrarServiseDonusturKaydet" type="button" class="btn btn-sm btn-success">Kaydet</button><button id="btnKapat1" type="button" class="btn btn-sm btn-default" data-dismiss="modal" onclick="window.location.reload()">Kapat</button>'
            },
            settings: {
                widthClass: 'modal-lg'
            },
        });
        // $('#modalTalebiTekrarServiseDonustur').modal('toggle');
        $('#modalTalebiTekrarServiseDonustur').modal({
            backdrop: false
        });
    });

    $('body').on('click', '#btnTekrarServiseDonusturKaydet', function() {
        $(this).prop('disabled', true);
        var metin = $('#serviseTekrarDonusturTextArea').val();
        var docId = "";
        var files = document.getElementById("fileTekrarServiseDonustur").files;
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
        // if (metin !== "") {
        var data = {
            RecordId: $('#RecordPublicId').val(),
            KayitOlusturan: userData.id,
            AciklamaText: $('#serviseTekrarDonusturTextArea').val(),
            DosyaId: docId,
            Statu: 6,
        };
        var url = 'https://karsanservice.setcrm.com/api/data/TeknikDestekSureciOlustur';
        var url2 = 'http://localhost:53015/api/data/TeknikDestekSureciOlustur';
        $.post(url, data, function(r) {
            if (r.Status) {
                $('#modalTalebiTekrarServiseDonustur').modal('toggle');
                notify('success', 'İşlem başarılı sayfa yenileniyor lütfen bekleyiniz...');
                window.location.reload();
            } else {
                setUtil.alert({
                    container: '#modalTalebiTekrarServiseDonustur .modal-body #msg',
                    message: r.Message,
                    alertClass: 'alert-danger',
                    autoClose: true
                });
                $(this).prop('disabled', false);
            }
        });

        // // } else {
        //     setUtil.alert({
        //         container: '#modalTalebiTekrarServiseDonustur .modal-body #msg',
        //         message: 'Lütfen Açıklama alanını doldurunuz.',
        //         alertClass: 'alert-warning',
        //         autoClose: true
        //     });
        // }

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