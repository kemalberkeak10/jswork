$(function() {

    $('.btn-br-actions[data-publicid=479A696994A9406D9DD7589BCB5047CB]').hide();
    $('.btn-br-actions[data-publicid=479A696994A9406D9DD7589BCB5047CB]').closest('td').prepend('<a id="btnDiageoSonuc" class="btn btn-sm btn-warning btn-br-actions" style="margin-right:10px;" >Diageo Sonuç Metni Gir</a>');

    var urungrubu = $("label[for=EF1A5028CBBD4AC09AD4D263F6FBBB72]").parent().data("publicids");
    if (urungrubu != "0387CC0842FC427EA88B11E1C5041475") {
        //15.10.2021 İf alanı buraya eklendi.
        $('#btnDiageoSonuc').hide();
    }

    $('body').on('click', '#btnDiageoSonuc', function() {
        $('#modalSonucMetni').remove();
        window.setModal.Create({
            id: 'modalSonucMetni',
            html: {
                header: 'Sonuç Metni',
                body: '<div id="iptalMsg" style="margin:0 0 5px; width: 100%;">' +
                    '<div>' +
                    '<table class="table" style="width: 100%">' +
                    '<thead>' +
                    '<tr><th>Numune Kabul Tarihi</th><th>Diageo Mail Tarihi</th><th>Referans Kodu</th><th>Numune Yurtdışı Gönderim Tarihi</th></tr>' +
                    '</thead>' +
                    '<tbody>' +
                    '<tr>' +
                    '<td colspan="1" rowspan="1"><input id="numuneKabulTarihi" type="text" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;"></td>' +
                    '<td colspan="1" rowspan="1"><input id="diageoMailTarihi" type="text" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;"></td>' +
                    '<td colspan="1" rowspan="1"><input id="referansKodu"  type="text" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;"></td>' +
                    '<td colspan="1" rowspan="1"><input id="numuneYurtDisiGönderimTarihi" type="text" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;"></td>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>' +
                    '<table class="table" style="width: 100%">' +
                    '<thead>' +
                    '<tr><th>AWB Numarası</th><th>Diageo Sonuç Bildirim Tarihi</th><th>Sonuç Raporu</th><th>Ürün Parti Numarası</th></tr>' +
                    '</thead>' +
                    '<tbody>' +
                    '<tr>' +
                    '<td colspan="1" rowspan="1"><input id="awbNumarasi"  type="text" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;"></td>' +
                    '<td colspan="1" rowspan="1"><input id="diageoSonucBildirimTarihi" type="text" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;"></td>' +
                    '<td colspan="1" rowspan="1"><input type="file" class="file" id="file1"/></td>' +
                    '<td colspan="1" rowspan="1"><input id="urunPartiNumarasi" disabled="disabled" type="text" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;"></td>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>' +
                    '<table class="table table4" style="width: 100%">' +
                    '<thead>' +
                    '<tr>' +
                    '<th>Diageo Sonuç Metni</th>' +
                    '<th>Sonuç Bilgilendirme Metni</th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody>' +
                    '<tr>' +
                    '<td colspan="1" rowspan="1"><textarea rows="3" cols="70" id="diageoSonucMetni" type="text" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;" /></td>' +
                    '<td colspan="1" rowspan="1"><textarea rows="3" cols="70" id="sonucBilgilendirmeMetni" type="text" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;" /></td>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>',

                footer: '<button id="btnKaydet" type="button" class="btn btn-sm btn-success">Kaydet</button><button id="btnKapat" type="button" class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>'
            },
            settings: {
                widthClass: 'modal-lg'
            },
        });
        $('#modalSonucMetni .modal-body').css('height', '60%');
        $('#modalSonucMetni').modal('toggle');
        $('#numuneKabulTarihi').datetimepicker({
            inline: false,
            closeOnDateSelect: true,
            timepicker: false,
            format: 'd.m.Y',
            mask: false,
            scrollMonth: false,
            scrollTime: false,
            scrollInput: false,
            dayOfWeekStart: 1
        });
        $('#diageoMailTarihi').datetimepicker({
            inline: false,
            closeOnDateSelect: true,
            timepicker: false,
            format: 'd.m.Y',
            mask: false,
            scrollMonth: false,
            scrollTime: false,
            scrollInput: false,
            dayOfWeekStart: 1
        });
        $('#numuneYurtDisiGönderimTarihi').datetimepicker({
            inline: false,
            closeOnDateSelect: true,
            timepicker: false,
            format: 'd.m.Y',
            mask: false,
            scrollMonth: false,
            scrollTime: false,
            scrollInput: false,
            dayOfWeekStart: 1
        });
        $('#diageoSonucBildirimTarihi').datetimepicker({
            inline: false,
            closeOnDateSelect: true,
            timepicker: false,
            format: 'd.m.Y',
            mask: false,
            scrollMonth: false,
            scrollTime: false,
            scrollInput: false,
            dayOfWeekStart: 1
        });
        var numuneKabulTarihi = $('label[for=BD0F0CD07DBF4F57A80F279866B31AD6 ]').parent().data('value').split(' ')[0];
        $('#numuneKabulTarihi').val(numuneKabulTarihi);
        var diageoMailTarihi = $('label[for=2F91815A380B4563950FDA9DDA6961EF ]').parent().data('value').split(' ')[0];
        $('#diageoMailTarihi').val(diageoMailTarihi);
        var numuneYurtDisiGönderimTarihi = $('label[for=548B344B21E845C884A97AA47FDA045E ]').parent().data('value').split(' ')[0];
        $('#numuneYurtDisiGönderimTarihi').val(numuneYurtDisiGönderimTarihi);
        var diageoSonucBildirimTarihi = $('label[for=3727C3863DA34D79B28AA743CD381A04 ]').parent().data('value').split(' ')[0];
        $('#diageoSonucBildirimTarihi').val(diageoSonucBildirimTarihi);
        var referansKodu = $('label[for=F973C608C6A64C0D83C43C5B9A40F863]').parent().data('value');
        $('#referansKodu').val(referansKodu);
        var awbNumarasi = $('label[for=E6425991554B434BA1DFA976C2AC70D1]').parent().data('value');
        $('#awbNumarasi').val(awbNumarasi);
        var urunPartiNumarasi = $('label[for=05E0DA64166241FB8A3FBA93C65B2330]').parent().data('value');
        $('#urunPartiNumarasi').val(urunPartiNumarasi);
        var diageoSonucMetni = $('label[for=640F6A9C34AC40BC897FDA439B9919F1]').parent().data('value');
        $('#diageoSonucMetni').val(diageoSonucMetni);
        var sonucBilgilendirmeMetni = $('label[for=CCBA82158C504BC9BED96C3253C7F92D]').parent().data('value');
        $('#sonucBilgilendirmeMetni').val(sonucBilgilendirmeMetni);




    });
    $('body').on('click', '#btnKaydet', function() {
        var metin = $('#sonucBilgilendirmeMetni').val();
        var docId = "";
        var files = document.getElementById("file1").files;
        if (files.length > 0) {
            var list = new Array();
            for (let index = 0; index < files.length; index++) {
                const file = files[index];
                var formData = new FormData();
                formData.append('id', '89ECE5DC19094878A4E75B4F1B68C6D7');
                formData.append('fieldId', 'A420816383D546449B226B8116C6146D');
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
                CustomObjectId: $('#CustomObjectPublicId').val(),
                RecordId: $('#RecordPublicId').val(),
                NumuneKabulTarihi: $('#numuneKabulTarihi').val(),
                DiageoMailTarihi: $('#diageoMailTarihi').val(),
                NumuneYurtDisiGönderimTarihi: $('#numuneYurtDisiGönderimTarihi').val(),
                DiageoSonucBildirimTarihi: $('#diageoSonucBildirimTarihi').val(),
                ReferansKodu: $('#referansKodu').val(),
                AwbNumarasi: $('#awbNumarasi').val(),
                SonucRaporu: docId,
                UrunPartiNumarasi: $('#urunPartiNumarasi').val(),
                DiageoSonucMetni: $('#diageoSonucMetni').val(),
                SonucBilgilendirmeMetni: $('#sonucBilgilendirmeMetni').val(),
            };
            var url = 'https://meyicki.setcrm.com/api/data/DiageoSonucMetni';
            var url2 = 'http://localhost:11456/api/data/DiageoSonucMetni';
            $.post(url, data, function(r) {
                if (r.Status) {
                    // başarılı dönüş
                    $('.btn-br-actions[data-publicid=479A696994A9406D9DD7589BCB5047CB]').trigger('click');
                    $('#modalSonucMetni').modal('toggle');
                } else {
                    setUtil.alert({
                        container: '#modalSonucMetni .modal-body #iptalMsg',
                        message: r.Message,
                        alertClass: 'alert-danger',
                        autoClose: true
                    });
                }
            });
        } else {
            setUtil.alert({
                container: '#modalSonucMetni .modal-body #iptalMsg',
                message: 'Sonuç metni girişi yapınız.',
                alertClass: 'alert-info',
                autoClose: true
            });
        }

    });
});