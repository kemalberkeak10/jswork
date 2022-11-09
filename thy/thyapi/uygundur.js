$(function() {
    // $(".btn-br-actions[data-publicid=04F796D2246A4A0DAB99402A946C3432]").hide()
    $(".btn-br-actions[data-publicid=04F796D2246A4A0DAB99402A946C3432]").hide()
        .closest('td').append('<a class="btn btn-sm btn-info btn-br-actions" id="btn-uygundur">Uygundur</a>');

    $('body').on('click', '#btn-uygundur', function() {
        var localUrlU = String.format("http://localhost:65474/api/data/CheckCihazList?recordId={0}", $('#RecordPublicId').val());
        var realUrlU = String.format("https://thywebapi.setcrm.com/api/data/CheckCihazList?recordId={0}", $('#RecordPublicId').val());
        $.get(realUrlU, function(r) {
            if (r.Status && r.List.length > 0) {
                $('#modalUygundurBr').remove();
                window.setModal.Create({
                    id: 'modalUygundurBr',
                    html: {
                        header: 'Laboratuvar Seçimi',
                        body: '<div id="msg"></div>' +
                            '<div id="kp"></div>',
                        footer: '<button id="btnLabKaydet" class="btn btn-success btn-sm" >Kaydet</button><button data-dismiss="modal" class="btn btn-success btn-sm">Kapat</button>'
                    }
                });
                $('#newTbl thead').html('');
                $('#newTbl tbody').html('');
                var newTbl = $('<table id="newTbl" class="table table-bordered table-hover" style="table-layout:fixed" />'),
                    thead = $('<thead class="table" style="background-color:#5BC0DE" />'),
                    newRow = $('<tr />'),
                    tbody = $('<tbody />');
                thead.append($("<th/>").text("Pn"));
                thead.append($("<th/>").text("Tool Name"));
                thead.append($("<th/>").text("Laboratuvar"));
                thead.append($("<th/>").text("Tool Code"));
                thead.append(newRow);
                newTbl.append(thead);
                $.each(r.List, function(i, v) {
                    newRow = $('<tr/>').attr('data-id', v.ToolRecordId);
                    newRow.append($('<td style="text-align: left;padding-top: 17px;" />').text(v.Pn));
                    newRow.append($('<td style="text-align: left;padding-top: 17px;" />').text(v.ToolName));
                    newRow.append($('<td style="text-align: left;" class="col-md-2"/>').append($('<input id="s1' + i + '" type="select" value="" tabindex="-1" style="display:inline-block;text-align: left; auto;" class="laboratuvarSelect" >')));
                    newRow.append($('<td style="text-align: left;" class="col-md-2"/>').append($('<input id="c1' + i + '" type="select" value="" tabindex="-1" style="display:inline-block;text-align: left; auto;" class="kodAtamaSelect" >')));
                    tbody.append(newRow);
                    newTbl.append(tbody);
                });
                $('#modalUygundurBr').find('.modal-body #kp').html(newTbl);
                $.each(r.List, function(i, v) {

                    prepareSelect2(
                        '#s1' + i,
                        "/Summary/LookupFieldValues", {
                            coId: "367D656CABEA4DD7B9EA88E95DF687CE",
                            id: "6A1C5ABDDD33471583600B21351641B0",
                            viewFilterId: "1FA850625B0C4FD8BF1B49346C84B724",
                        },
                        null,
                        false
                    );
                    prepareSelect2(
                        '#c1' + i,
                        "/Summary/LookupFieldValues", {
                            coId: "367D656CABEA4DD7B9EA88E95DF687CE",
                            id: "6A1C5ABDDD33471583600B21351641B0",
                            viewFilterId: "1FA850625B0C4FD8BF1B49346C84B724",
                        },
                        null,
                        false
                    );

                });
                $('#modalUygundurBr').modal('toggle');
                $('#modalUygundurBr .modal-dialog').css('width', '60%');

                $('body').on('change', '.laboratuvarSelect', function() {
                    var analizId = $(this).val();
                    if (analizId !== '') {
                        var kodAtamaId = $($(this).closest("tr").find("td:eq(3)")[0]).find('input[class=kodAtamaSelect]').attr('id');
                        prepareSelect2('#' + kodAtamaId, '/Summary/LookupFieldValues', {
                            coId: '367D656CABEA4DD7B9EA88E95DF687CE',
                            controllingId: '2BEF9640A13546F0A8C86FD0BDBDF579',
                            controllingRecordId: analizId,
                            id: 'FFB6A044CEA940C4A9B80A656935F87C',
                            viewFilterId: '5EF36F6AF8574A6F9F35C3244DDC4963'
                        }, null, false);
                    }
                    $("#" + kodAtamaId).select2('data', {
                        id: '',
                        text: 'Seçiniz'
                    });
                });

                // $('body').on('change', '.kodAtamaSelect', function () {
                //     var kodAtama = $(this).val();
                //     if (kodAtama === '') {
                //         $("#" + kodAtama).select2('data', { id: '', text: 'Seçiniz' });
                //     }
                // });

                $('body').on('click',
                    '#btnLabKaydet',
                    function() {
                        var labBosVarmi = false;
                        var labKodBosVarmi = false;
                        $('#newTbl tbody tr .laboratuvarSelect:input').each(function(i, v) {
                            if ($(v).val() == "") {
                                labBosVarmi = true;
                            }
                        });
                        $('#newTbl tbody tr .kodAtamaSelect:input').each(function(i, v) {
                            if ($(v).val() == "") {
                                labKodBosVarmi = true;
                            }
                        });
                        if (!labBosVarmi && !labKodBosVarmi) {
                            var data = {};
                            var parametreList = [];
                            $('#newTbl tbody tr').each(function(i, v) {
                                parametre = {
                                    ToolRecordId: $(v).attr('data-id'),
                                    LabId: $(v).find('.laboratuvarSelect').select2('data').id,
                                    KodAtamaId: $(v).find('.kodAtamaSelect').select2('data').id,
                                    KodAtamaText: $(v).find('.kodAtamaSelect').select2('data').text,
                                };
                                parametreList.push(parametre);
                            });
                            $('#modalUygundurBr').find('.modal-body').html('<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>');

                            var localUrlU = "http://localhost:65474/api/data/ToolsUpdate";
                            var realUrlU = "https://thywebapi.setcrm.com/api/data/ToolsUpdate";
                            $('#btnLabKaydet').hide();
                            $.ajax({
                                contentType: 'application/json',
                                type: "POST",
                                url: realUrlU,
                                dataType: "json",
                                data: JSON.stringify(parametreList),
                                async: true,
                                success: function(r) {
                                    if (r.Status) {
                                        $('#modalUygundurBr').modal('toggle');
                                        $('.btn-br-actions[data-publicid=04F796D2246A4A0DAB99402A946C3432]').trigger('click');
                                        // window.location.reload();
                                    } else {
                                        $('#modalUygundurBr .modal-body').html(result.Message);
                                    }
                                }
                            });

                        } else {
                            setUtil.alert({
                                container: '#modalUygundurBr .modal-body #msg',
                                message: 'Lütfen Tüm Laboratuvar ve Kod Atama Seçimlerini Yapınız.',
                                alertClass: 'alert-danger',
                                autoClose: true
                            });
                        }
                    });
            } else if (r.Status && r.List.length <= 0) {
                $('.btn-br-actions[data-publicid=04F796D2246A4A0DAB99402A946C3432]').trigger('click');
            } else {
                $('#modalUygundurBr').remove();
                window.setModal.Create({
                    id: 'modalUygundurBr',
                    html: {
                        header: 'Uyarı',
                        body: String.format('<div style="font-size: 15px;"><p><span  style="font-weight:bold">{0}</span></div></br>',
                            r.Message),
                        footer: '<button id="btnUpdateFileDevices" type="button" class="btn btn-sm btn-success">Kaydet</button><button type="button" class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>'
                    }
                });
                $('#modalUygundurBr').modal('toggle');
            }
        });
    });
});