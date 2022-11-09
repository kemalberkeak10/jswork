$(function() {
    $('.btn-br-actions[data-publicid=CFE0653A92BC4D8EBC0929BAA85B91C3]').hide();
    $('.btn-br-actions[data-publicid=CFE0653A92BC4D8EBC0929BAA85B91C3]').closest('td').prepend('<a id="btnTalepFormuOlustur" class="btn btn-sm btn-warning"  style="margin-right:10px;" >Talep Formu Oluştur</a>');

    $('body').on('click', '#btnTalepFormuOlustur', function() {
        $('#modelTalepForm').remove();
        window.setModal.Create({
            id: 'modelTalepForm',
            html: {
                header: 'Talep Formu Oluştur',
                body: '<div id="txt" style="margin:0 0 5px; width: 100%;"></div>' +
                    '<div id="msg" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>' +
                    '<table id="analizTable" class="table" style="width: 100%">' +
                    '<thead>' +
                    '<tr><th><input id=selectAll class="form-check" type="checkbox"></th><th>Analiz Adı</th><th>Birim</th><th>Adet</th></tr>' +
                    '</thead>' +
                    '<tbody>' +
                    '<tr>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>',
                footer: '<button id="btnTalepForm" type="button" class="btn btn-sm btn-success" >Talep Formu Oluştur</button>' + '<button type="button" class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>'
            }
        });
        $('#msg').hide();
        $('#modelTalepForm').modal('toggle');
        var modelList = [];
        GetTeklifAnalizleri();

        $('body').on('click', '#btnTalepForm', function() {
            TalepFormOlustur();
        })

        function GetTeklifAnalizleri() {
            var data = {
                RecordId: $('#RecordPublicId').val(),
            }
            var localUrl = String.format('http://localhost:44358/api/data/GetTeklifAnaliziList');
            var realUrl = String.format('https://kazlicesmewebapi.setcrm.com/api/data/GetTeklifAnaliziList');
            $.get(realUrl, data, function(r) {
                $('#analizTable tbody').html('');
                if (r.Status) {
                    $.each(r.modelList, function(i, v) {
                        var adetMiktar = parseInt(v.Adet);
                        var newRow = $('<tr/>', {
                            'data-rowid': i
                        });
                        newRow.append('<td><input class="form-check-input" type="checkbox" ></td>');
                        newRow.append(String.format('<td><div id="AnalizAdi_{0}" class="form-control"></div></td>', i));
                        newRow.append(String.format('<td><div id="Birim_{0}" class="form-control"></div></td>', i));
                        newRow.append(String.format('<td><div><input id="Adet_{0}" class="form-control" type="number" value="{1}" ></div></td>', i, adetMiktar));
                        $('#analizTable tbody').append(newRow);
                        prepareSelect2(String.format('#AnalizAdi_{0}', i), '/Summary/LookupFieldValues', {
                            coId: '4D371C695BA446C3AC9774B1A7D8F740',
                            id: '08DE71E247164A9F826A5BF67C20C77D',
                            viewFilterId: '7A866F0934634917ACB7025012BBBEA6',
                        }, null, false);
                        prepareSelect2(String.format('#Birim_{0}', i), '/Summary/LookupFieldValues', {
                            coId: '4D371C695BA446C3AC9774B1A7D8F740',
                            id: '9DC81E1E0F174218B5DC38EDC214F4AA',
                            viewFilterId: '9B360CA2D9ED4010986467956838BB62',
                        }, null, false);
                        prepareSelect2SelectedOneItem(String.format('#AnalizAdi_{0}', i), v.AnalizAdiValues[0].id, v.AnalizAdiValues[0].text, false);
                        prepareSelect2SelectedOneItem(String.format('#Birim_{0}', i), v.BirimValues[0].id, v.BirimValues[0].text, false);
                    });
                }
            })
        }
        $('body').on('click', '#selectAll', function() {
            if ($('#selectAll').is(':checked')) {
                $('.form-check-input').prop('checked', true);
            } else {
                $('.form-check-input').prop('checked', false);
            }

        })

        function TalepFormOlustur() {
            $('#msg').show();
            var trList = $('.form-check-input:checked');
            if (trList.length === 0) {
                setUtil.alert({
                    container: '#modalTeklif .modal-body #txt',
                    message: "Lütfen kayıt seçiniz",
                    alertClass: 'alert-warning',
                    autoClose: true
                });
                return;
            }
            $.each(trList,
                function(i, el) {
                    var tr = $(el).parents('tr')
                    var analizAdiId, analizAdiIdVal, birimId, birimVal, adet;
                    var rowId = $(this).closest('tr').data('rowid');
                    if ($('#AnalizAdi_' + rowId).select2('data') != null || $('#AnalizAdi_' + rowId).select2('data') != undefined) {
                        analizAdiId = $('#AnalizAdi_' + rowId).select2('data').id;
                        // analizAdiIdVal = $('#AnalizAdi_' + rowId).select2('data').text;

                    }
                    if ($('#Birim_' + rowId).select2('data') != null || $('#Birim_' + rowId).select2('data') != undefined) {
                        birimId = $('#Birim_' + rowId).select2('data').id;
                        // birimVal = $('#Birim_' + rowId).select2('data').text;
                    }
                    adet = $('#Adet_' + rowId).val();
                    var model = {
                        Adet: adet,
                        AnalizAdi: analizAdiId,
                        Birim: birimId,
                        RecordId: $('#RecordPublicId').val(),
                    }
                    modelList.push(model);

                });
            var localUrl = String.format('http://localhost:44358/api/data/TalepFormuOlustur');
            var realUrl = String.format('https://kazlicesmewebapi.setcrm.com/api/data/TalepFormuOlustur');
            $.ajax({
                contentType: 'application/json',
                type: "POST",
                url: realUrl,
                dataType: "json",
                data: JSON.stringify(modelList),
                async: true,
                success: function(r) {
                    if (r.Status) {
                        $('#msg').hide();
                        $('#modelTalepForm .modal-body').html('');
                        setUtil.alert({
                            container: '#modelTalepForm .modal-body #txt',
                            message: "İşleminiz başarıyla gerçekleşti",
                            alertClass: 'alert-success',
                            autoClose: true
                        });
                        $('#modelTalepForm .modal-body').append(String.format('<a href="https://proje.setcrm.com/set/talep-formu/detail/{0}" target="_blank" class="btn btn-primary btn-sm"><i class="fas fa-external-link-alt"></i> Görüntüleme</a>', r.talepFormRecordId));
                    } else {
                        setUtil.alert({
                            container: '#modelTalepForm .modal-body #txt',
                            message: r.Message,
                            alertClass: 'alert-danger',
                            autoClose: false
                        });
                    }
                }
            });


        }
    });





});