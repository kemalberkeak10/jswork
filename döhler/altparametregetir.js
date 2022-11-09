$(function() {

    $('body').on('lookupRelationLoadTriggerEvent', function(e, relationId) {
        if (relationId === '2BFD6F812B624D2FB9F0031511C3807D') {
            var $relation = $(String.format('div[data-id={0}]', relationId));
            $relation.find('.btn-analiz-ekle').remove();

            if (window.activeLanguage == "en") {
                $relation.prepend('<div><button type="button" class="btn btn-info btn-sm pull-right btn-analiz-ekle" style="margin-right:5px;margin-top: 2px;"><i class="fas fa-plus"></i>Sub-Parameter Selection</button></div>');
            } else {
                $relation.prepend('<div><button type="button" class="btn btn-info btn-sm pull-right btn-analiz-ekle" style="margin-right:5px;margin-top: 2px;"><i class="fas fa-plus"></i>Alt Parametre Seçimi</button></div>');
            }
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

            var coId = "BB922060B74149A794E1884DDD56A761";
            var vfId = "BBF1ED8B549C4AC28E8ABE88B18D5A45";
            var url = 'https://dohlerwebapi.setcrm.com/api/data/VfOkuma?coId=' + coId + '&vfId=' + vfId;
            var localurl = 'http://localhost:55073/api/data/VfOkuma?coId=' + coId + '&vfId=' + vfId;

            $('#analizEkleModal .modal-body').html('<div id="msg" style="margin:0 0 5px"></div>' +
                '<input id="inputRiskSearch" type="text" value="" tabindex="-1" style="margin-left: 25px;" placeholder="Ara">' +
                '<div id="cihazlar" style="margin:0 23px 5px; width: 100%;"></div>');
            $.get(url, function(r) {
                if (r.IsOk === true) {
                    $('#newTbl thead').html('');
                    $('#newTbl tbody').html('');
                    var newTbl = $('<table id="newTbl" style="width: 100%;overflow-x: scroll" />');
                    var thead = $('<thead />');
                    var newRow = $('<tr class="table table-bordered table-hover" style="background-color:lightblue;"/>');
                    newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-1"/>').text('Seçim'));
                    newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" class="col-md-4 "/>').text('Alt Parametre'));
                    thead.append(newRow);
                    newTbl.append(thead);
                    var tbody = $('<tbody />');
                    $.each(r.Records, function(i, v) {
                        var altParametre = v.Values.first('FieldPublicId', 'E5D83805ED8D4F31A8ACDE7F80951647').Value;
                        var altParametreId = v.Values.first('FieldPublicId', 'E5D83805ED8D4F31A8ACDE7F80951647').SelectedItemPublicIds;

                        var newRow = $('<tr class="table table-bordered table-hover"/>').attr('data-id', v.PublicId);
                        newRow.append($('<td style="text-align: left;" class="col-md-1"/>').append($('<input />', {
                            'id': 'chkTablo',
                            'name': 'chkTablo',
                            'value': '',
                            'type': 'checkbox',
                            'style': 'margin; auto;'
                        })));
                        newRow.append($('<td style="text-align: left;" class="col-md-3 alt-parametre"/>').text(altParametre).attr('data-id', altParametreId));
                        newRow.append($('<td style="text-align: left;" class="col-md-1 birim"/>').text("mg/kg"));
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
        var items = [];
        var tblData = $('#analizEkleModal tbody tr input#chkTablo:checked');
        if (tblData.length > 0) {
            tblData.each(function(i, v) {
                var tr = $(this).closest('tr');
                items.push({
                    AnalizTanimiId: tr.data('id'),
                });
            });
            $('#modalLoading').modal('toggle');
            $('#analizEkleModal').modal('toggle');
            var model = {
                Items: items,
                RecordPublicId: $('#RecordPublicId').val()
            };

            var url = 'https://dohlerwebapi.setcrm.com/api/data/AltParametreKayitYeni';
            var localurl = 'http://localhost:55073/api/data/AltParametreKayitYeni';
            $.post(localurl, model,
                function(r) {
                    if (r.Status) {
                        window.location.reload();
                    } else {
                        $('#modalLoading .modal-body').html(r.Message);
                    }
                }
            );
        } else {
            alert('En az 1 tane Analiz Seçmelisiniz.');
        }
    });
});