$(function() {

    $('body').on('lookupRelationLoadTriggerEvent', function(e, relationId) {
        if (relationId === '6B5CDFE0C28C498DB18487C554605798') {
            var $relation = $(String.format('div[data-id={0}]', relationId));
            $relation.find('.btn-analiz-ekle').remove();
            $relation.prepend('<div><button type="button" class="btn btn-info btn-sm pull-right btn-analiz-ekle" style="margin-right:5px;margin-top: 2px;"><i class="fas fa-plus"></i>Alt Parametre Seçimi</button></div>');

        }
    });

    $('body').on('click',
        '.btn-analiz-ekle',
        function() {

            $('#modalLoading').remove();
            window.setModal.Create({
                id: 'modalLoading',
                html: {
                    header: ' ',
                    body: '<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>',
                    footer: ''
                }
            });
            $('#modalLoading').modal('toggle');
            $('#analizEkleModal').remove();

            window.setModal.Create({
                id: 'analizEkleModal',
                html: {
                    header: 'Analiz Ekle',
                    body: '',
                    footer: '<button type="button" class="btn btn-default  btn-xl pull-right"  data-dismiss="modal" >Kapat</button>' +
                        '<button type="button" id="analizEkle" class="btn btn-xl btn-success pull-right">Seçilen Alt Parametreleri Ekle</button>'
                }
            });
            $('#analizEkleModal .modal-dialog').css('width', '50%');

            var coId = "C74B84F68CE245C3962DC2771006C25C";
            var vfId = "98EEBB01E5214618B1A8D0B903715480";
            var url = 'https://betalabwebapi.setcrm.com/api/data/VfOkuma?coId=' + coId + '&vfId=' + vfId;
            var localurl = 'https://localhost:44303/api/data/VfOkuma?coId=' + coId + '&vfId=' + vfId;

            $('#analizEkleModal .modal-body').html('<div id="msg" style="margin:0 0 5px"></div>' +
                '<input id="inputRiskSearch" type="text" value="" tabindex="-1" style="margin-left: 25px;" placeholder="Ara">' +
                '<div id="cihazlar" style="margin:0 23px 5px; width: 100%;"></div>');
            $.get(url, function(r) {
                if (r.IsOk) {
                    $('#newTbl thead').html('');
                    $('#newTbl tbody').html('');
                    var newTbl = $('<table id="newTbl" style="width: 100%;overflow-x: scroll" />');
                    var thead = $('<thead />');
                    var newRow = $('<tr class="table table-bordered table-hover" style="background-color:lightblue;"/>');
                    newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-1"/>').text(''));
                    newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-1"/>').text('No'));
                    newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-4 "/>').text('Referans'));
                    newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-1 "/>').text('Sonuç'));
                    newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-1"/>').text('ABMRL'));
                    newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-1"/>').text('TRMRL'));
                    newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-1"/>').text('D.Limiti'));
                    newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-1"/>').text('Ölçüm belirsizliği Miktarı'));
                    newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-1"/>').text('Ölçüm belirsizliği Birimi'));
                    newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-1"/>').text('Raporlama Limiti'));
                    newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-1"/>').text('Ö.B.'));
                    newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-1"/>').text('G.K.'));
                    newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-1"/>').text('Analiz Cihazı'));
                    newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-1"/>').text('Analiz Metodu'));
                    newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-1"/>').text('D. Mevzuatı'));
                    thead.append(newRow);
                    newTbl.append(thead);
                    var tbody = $('<tbody />');
                    $.each(r.Records, function(i, v) {
                        var refNo = v.Values.first('FieldPublicId', '9CBE6AA5DDAE40E3B8C0CA991187AD44').Value;
                        var refIsmi = v.Values.first('FieldPublicId', 'CB16F832A9124BB3BCE27E787576D909').Value;
                        var sonuc = v.Values.first('FieldPublicId', '23A05CFF26CA41A8957660075B7EE31F').Value;
                        var dLimiti = v.Values.first('FieldPublicId', '0D3D2E688A9346B0911798BDDBC28028').Value;
                        var oBelirsizligiMiktari = v.Values.first('FieldPublicId', '544993C1FD3D4EFF8DA51D0F4AB0F40A').Value;
                        var oBelirsizligiBirimi = v.Values.first('FieldPublicId', 'D6D8931B94EF4E5B9F9D3013BD182CEA').Value;
                        var oBelirsizligiBirimiId = v.Values.first('FieldPublicId', 'D6D8931B94EF4E5B9F9D3013BD182CEA').SelectedItemPublicIds;
                        var raporlamaLimiti = v.Values.first('FieldPublicId', '6A457D2FC899416D8E5A35FB9CAF9853').Value;
                        var oB = v.Values.first('FieldPublicId', '170A49DA200941D380B5ED46A9AD503B').Value;
                        var gK = v.Values.first('FieldPublicId', '9E86775A397B40DC816F63E2931D9E65').Value;
                        var eAnalizCihazi = v.Values.first('FieldPublicId', '281558A615A84C94BC36D5A1B17074F8').Value;
                        var eAnalizCihaziId = v.Values.first('FieldPublicId', '281558A615A84C94BC36D5A1B17074F8').SelectedItemPublicIds;
                        var analizMetodu = v.Values.first('FieldPublicId', '1E4DD8C647F34B2297F0A853EB28BDA4').Value;
                        var dMevzuati = v.Values.first('FieldPublicId', '32430F2F9E5F4F6593144518CBE9F7E9').Value;
                        var dMevzuatiId = v.Values.first('FieldPublicId', '32430F2F9E5F4F6593144518CBE9F7E9').SelectedItemPublicIds;
                        var newRow = $('<tr class="table table-bordered table-hover"/>').attr('data-id', v.PublicId);
                        newRow.append($('<td style="text-align: left;" class="col-md-1"/>').append($('<input />', {
                            'id': 'chkTablo',
                            'name': 'chkTablo',
                            'value': '',
                            'type': 'checkbox',
                            'style': 'margin; auto;'
                        })));
                        newRow.append($('<td style="text-align: left;" class="col-md-3 alt-parametre"/>').text(refNo));
                        newRow.append($('<td style="text-align: left;" class="col-md-3 alt-parametre"/>').text(refIsmi));
                        newRow.append($('<td style="text-align: left;" class="col-md-3 alt-parametre"/>').text(sonuc));
                        newRow.append($('<td style="text-align: left;" class="col-md-3 alt-parametre"/>').text(dLimiti));
                        newRow.append($('<td style="text-align: left;" class="col-md-3 alt-parametre"/>').text(oBelirsizligiMiktari));
                        newRow.append($('<td style="text-align: left;" class="col-md-3 alt-parametre"/>').text(oBelirsizligiBirimi).attr('data-id', oBelirsizligiBirimiId));
                        newRow.append($('<td style="text-align: left;" class="col-md-3 alt-parametre"/>').text(raporlamaLimiti));
                        newRow.append($('<td style="text-align: left;" class="col-md-3 alt-parametre"/>').text(oB));
                        newRow.append($('<td style="text-align: left;" class="col-md-3 alt-parametre"/>').text(gK));
                        newRow.append($('<td style="text-align: left;" class="col-md-1 birim"/>').text(eAnalizCihazi).attr('data-id', eAnalizCihaziId));
                        newRow.append($('<td style="text-align: left;" class="col-md-3 alt-parametre"/>').text(analizMetodu));
                        newRow.append($('<td style="text-align: left;" class="col-md-1 birim"/>').text(dMevzuati).attr('data-id', dMevzuatiId));
                        tbody.append(newRow);
                        newTbl.append(tbody);
                    });
                    $('#modalLoading').modal('toggle');
                    $('#analizEkleModal').modal('toggle');
                    $('#analizEkleModal').find('.modal-body #cihazlar').append(newTbl);
                } else {
                    $('#analizEkleModal').find('#msg').text(r.Message);
                }
                $('#analizEkleModal .modal-body').css('max-height', '');
                $('#analizEkleModal .modal-body').css('height', '600px');
                $('#analizEkleModal .modal-dialog').css('width', '75%');
            });

            $("body").on("keyup",
                '#inputRiskSearch',
                function() {
                    var trList = $('#newTbl tbody tr');
                    var value = $(this).val().toLowerCase();
                    trList.filter(function() {
                        $(this).toggle($(this).find('td:eq(1)').text().trim().toLowerCase().indexOf(value) > -1);
                    });

                });
        });

    $('body').on('click', '#analizEkle', function() {
        // var items = [];
        // var tblData = $('#analizEkleModal tbody tr input#chkTablo:checked');
        // if (tblData.length > 0) {
        //     tblData.each(function(i, v) {
        //         var tr = $(this).closest('tr');
        //         items.push({
        //             AnalizTanimiId: tr.data('id'),
        //         });
        //     });
        //     $('#modalLoading').modal('toggle');
        //     $('#analizEkleModal').modal('toggle');
        //     var model = {
        //         Items: items,
        //         RecordPublicId: $('#RecordPublicId').val()
        //     };

        //     var url = 'https://dohlerwebapi.setcrm.com/api/data/AltParametreKayit';
        //     var localurl = 'http://localhost:55073/api/data/AltParametreKayit';
        //     $.post(url, model,
        //         function(r) {
        //             if (r.Status) {
        //                 window.location.reload();
        //             } else {
        //                 $('#modalLoading .modal-body').html(r.Message);
        //             }
        //         }
        //     );
        // } else {
        //     alert('En az 1 tane Kayıt Seçmelisiniz.');
        // }
    });
});