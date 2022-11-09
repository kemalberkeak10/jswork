$(function() {

    $(String.format('div[data-id={0}]', "93744A13074A4C0BB1C2387074711FE4")).closest('div').prepend('<button type="button" class="btn btn-danger btn-sm pull-right btn-analizleri-aktar" style="margin-right:5px;margin-top:2px;"><i class="fas fa-plus"></i> Analizleri Aktar</button>');

    $('body').on('click', '.btn-analizleri-aktar', function() {
        $('#modalLoadingAnalizleriAktar').remove();
        window.setModal.Create({
            id: 'modalLoadingAnalizleriAktar',
            html: {
                header: ' ',
                body: '<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>',
                footer: ''
            }
        });

        $('#analizAktarModal').remove();
        window.setModal.Create({
            id: 'analizAktarModal',
            html: {
                header: 'Analizleri Aktar',
                body: '',
                footer: '<button type="button" class="btn btn-default  btn-xl pull-right"  data-dismiss="modal" >Kapat</button>' +
                    '<button type="button" id="btnBaslikEkleX" class="btn btn-xl btn-success pull-right">Başlıkları Düzenle</button>'
            }
        });

        var lrId = "93744A13074A4C0BB1C2387074711FE4";
        var url = 'https://dohlerwebapi.setcrm.com/api/data/LrOkuma?recordId=' + $('#RecordPublicId').val() + '&lrId=' + lrId;
        var localurl = 'http://localhost:55073/api/data/LrOkuma?recordId=' + $('#RecordPublicId').val() + '&lrId=' + lrId;

        $('#analizAktarModal .modal-body').html('<div id="msg" ></div>' +
            '<input id="inputRiskSearch" class="form-control" type="text" style="margin-bottom:10px;" value="" tabindex="-1" placeholder="Analiz Ara">' +
            '<div id="cihazlar" ></div>');
        $('#analizAktarModal .modal-body').css('max-height', '');
        $('#analizAktarModal .modal-body').css('height', '600px');
        $('#analizAktarModal .modal-dialog').css('width', '50%');

        $.get(url, function(r) {
            if (r.IsOk === true) {
                $('#newTbl thead').html('');
                $('#newTbl tbody').html('');
                var newTbl = $('<table id="newTbl" class="table table-bordered table-hover" style="width: 100%;overflow-x: scroll" />');
                var thead = $('<thead />');
                var newRow = $('<tr  style="background-color:lightblue;"/>');
                newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;"><input id=selectAll class="form-check" type="checkbox"></th>'));
                newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" "/>').text('Analiz Adı'));
                newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" "/>').text('Analiz Çeşidi'));
                newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" "/>').text('Analiz Sonucu'));
                newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" "/>').text('Proses Başlığı'));
                thead.append(newRow);
                newTbl.append(thead);
                var tbody = $('<tbody />');
                $.each(r.Records, function(i, v) {
                    var analizAdi = v.Values.first('FieldPublicId', 'AB618B6E18F34CB3BDA6044723674C59').Value;
                    var analizCesidi = v.Values.first('FieldPublicId', '044029FE584A4DFD8D405EC8BD03116D').Value;
                    var analizSonucu = v.Values.first('FieldPublicId', 'F09AB4E8CB0147F4A445EFDF3FB4D02E').Value;
                    var prosesBasligi = (v.Values.first('FieldPublicId', '912947AD929743DA8F89E844862D7643') !== null) ? v.Values.first('FieldPublicId', '912947AD929743DA8F89E844862D7643').Value : "";
                    var analizSecildiMi = (v.Values.first('FieldPublicId', 'AFB9DDE9A035441A9FE9D19DDAA00D14') !== null) ? v.Values.first('FieldPublicId', 'AFB9DDE9A035441A9FE9D19DDAA00D14').Value : false;
                    var newRow = $('<tr />').attr('data-id', v.PublicId);

                    if (toBool(analizSecildiMi)) {
                        newRow.append($('<td style="text-align: left;" />').append(''));
                    } else {
                        newRow.append($('<td style="text-align: left;" />').append($('<input />', {
                            'id': 'chkTablo',
                            'name': 'chkTablo',
                            'value': '',
                            'class': 'form-check-input',
                            'type': 'checkbox',
                            'style': 'margin; auto;',
                        })));
                    }
                    newRow.append($('<td style="text-align: left;" />').text(analizAdi));
                    newRow.append($('<td style="text-align: left;" />').text(analizCesidi));
                    newRow.append($('<td style="text-align: left;" />').text(analizSonucu));
                    newRow.append($('<td style="text-align: left;" />').text(prosesBasligi));
                    tbody.append(newRow);
                    newTbl.append(tbody);
                });
                $('#analizAktarModal').find('.modal-body #cihazlar').append(newTbl);
                $('#analizAktarModal').modal('toggle');
            } else {
                $('#analizAktarModal').find('#msg').text(r.Message);
            }

        });

        $('body').on('click', '#selectAll', function() {
            if ($('#selectAll').is(':checked')) {
                $('.form-check-input').prop('checked', true);
            } else {
                $('.form-check-input').prop('checked', false);
            }

        })

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

    $('body').on('click', '#btnProsesBasamagıSave', function() {

        var items = [];
        for (let i = 0; i < 32; i++) {
            items.push(
                $('#baslik_' + i + '').val()
            );
        }

        $('#BaslikEkleModallTest').modal('toggle');
        $('#modalLoadingAnalizleriAktar').modal('toggle');
        var model = {
            Items: items,
            RecordPublicId: $('#RecordPublicId').val(),
            UrunCesidiId: $('label[for=5AFA62276DE74CEDACF22C1F49BABC48]').parent().data('publicids'),
            UrunGrubuId: $('label[for=D349E1519DD5463D8200FD72C6088F42]').parent().data('publicids'),
            ProssesId: $('label[for=5610B85C662F486FB6C378712F8C0536]').parent().data('publicids'),
            CheckedItems: $('#analizAktarModal tbody tr input#chkTablo:checked').map(function() {
                return $(this).parents('tr').data('id')
            }).toArray()
        };

        var url = 'https://dohlerwebapi.setcrm.com/api/data/ProssesBasamagiVerileriOlustur';
        var localurl = 'http://localhost:55073/api/data/ProssesBasamagiVerileriOlustur';
        $.post(url, model, function(r) {
            if (r.Status) {
                window.location.reload();
            } else {
                $('#modalLoadingAnalizleriAktar .modal-body').html(r.Message);
            }
        });
    });

    $('body').on('click', '#btnBaslikEkleX', function() {
        var items = [];
        var itemsChecked = [];
        var tblData2 = $('#analizAktarModal tbody tr input#chkTablo:checked');
        var tblData = $('#analizAktarModal tbody tr');
        if (tblData2.length > 0) {

            tblData2.each(function(i, v) {
                var tr = $(this).closest('tr');
                itemsChecked.push(
                    tr.data('id')
                );
            });

            if (tblData.length > 0) {

                tblData.each(function(i, v) {
                    var tr = $(this).closest('tr');
                    items.push(
                        tr.data('id')
                    );
                });

                console.log(itemsChecked);

                $('#analizAktarModal').modal('toggle');
                $('#BaslikEkleModallTest').remove();
                window.setModal.Create({
                    id: 'BaslikEkleModallTest',
                    html: {
                        header: '',
                        body: '',
                        footer: '<button type="button" class="btn btn-default  btn-xl pull-right"  data-dismiss="modal" >Kapat</button>' +
                            '<button type="button" id="btnProsesBasamagıSave" class="btn btn-xl btn-success pull-right">Ekle</button>'
                    }
                });
                $('#BaslikEkleModallTest .modal-dialog').css('width', '90%');
                var html = '';
                var idSayi = 0;
                var baslikSayi = 0;
                var url = 'https://dohlerwebapi.setcrm.com/api/data/BaslikBilgileriniGetir?recordId=' + $('label[for=5610B85C662F486FB6C378712F8C0536]').parent().data('publicids');
                var localurl = 'http://localhost:55073/api/data/BaslikBilgileriniGetir?recordId=' + $('label[for=5610B85C662F486FB6C378712F8C0536]').parent().data('publicids');
                $.get(url, function(r) {
                    if (r.Status) {
                        for (let j = 0; j < 32; j++) {
                            if (j == 0 || j == 8 || j == 16 || j == 24) {
                                html += '<tr>';
                                html += '<td colspan="1" rowspan="1" style="width: 12%"><div><label> ' + (r.List[j].Value) + '</label><input id=baslik_' + (idSayi++) + ' type="text" class="form-control baslik' + (++baslikSayi) + ' " value="" data-mask="" placeholder="" maxlength="450" /></div></td>';
                            } else if (j == 7 || j == 15 || j == 23 || j == 31) {
                                html += '<td colspan="1" rowspan="1" style="width: 12%"><div><label> ' + (r.List[j].Value) + '</label><input id=baslik_' + (idSayi++) + ' type="text" class="form-control baslik' + (++baslikSayi) + ' "value="" data-mask="" placeholder="" maxlength="450" /></div></td>';
                                html += '</tr>';
                            } else {
                                html += '<td colspan="1" rowspan="1" style="width: 12%"><div><label>' + (r.List[j].Value) + '</label><input id=baslik_' + (idSayi++) + ' type="text" class="form-control baslik' + (++baslikSayi) + ' " value="" data-mask="" placeholder="" maxlength="450" /></div></td>';
                            }
                        }

                        $('#BaslikEkleModallTest .modal-body').html('<div id="msg" style="margin:0 0 5px"></div>' +
                            '<table class="table">' +
                            '<tbody>' +
                            '</tbody>' +
                            '</table>'
                        );
                        $('#BaslikEkleModallTest').modal('toggle');
                        $('#BaslikEkleModallTest .modal-body .table tbody ').append(html);

                        for (let index = 0; index < 32; index++) {
                            var input = $('#baslik_' + index + '');
                            if (input.closest('div').find('label').text().length === 1 || input.closest('div').find('label').text().length === 0) {
                                input.attr('disabled', true);
                            } else {}
                        }
                        var localUrl = 'http://localhost:55073/api/data/AnalizVerileriniGetir';
                        var real = 'https://dohlerwebapi.setcrm.com/api/data/AnalizVerileriniGetir';
                        $.ajax({
                            contentType: 'application/json',
                            type: "POST",
                            url: real,
                            dataType: "json",
                            data: JSON.stringify(items),
                            async: true,
                            success: function(r) {
                                if (r.Status) {
                                    $.each(r.AnalizData, function(i, v) {
                                        $('.' + v.Baslik + '').val(v.Sonuc);
                                        $('.' + v.Baslik + '').attr('disabled', true);
                                    });
                                } else {
                                    $('#BaslikEkleModallTest .modal-body').html(r.Message);
                                }
                            }
                        });
                    } else {
                        $('#modalLoading .modal-body').html(r.Message);
                    }
                });
            }
        } else {
            setUtil.alert({
                container: '#analizAktarModal .modal-body #msg',
                message: 'En az 1 tane Analiz Seçmelisiniz..',
                alertClass: 'alert-danger',
                autoClose: true
            });
        }
    });
});