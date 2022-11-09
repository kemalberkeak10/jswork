$(function() {
    $('.btn-br-actions[data-publicid=DFB95E59060047D181CCCAC54D3CC654]').hide();
    $('.btn-br-actions[data-publicid=DFB95E59060047D181CCCAC54D3CC654]').closest('td').prepend('<a id="btnAnalizMixle" class="btn btn-sm btn-danger"  style="margin-right:10px;" >Analiz Mixle</a>');
    $('body').on('click', '#btnAnalizMixle', function() {
        $('#modalYapilacakAnalizler').remove();
        window.setModal.Create({
            id: 'modalYapilacakAnalizler',
            html: {
                header: 'Analiz Mixle',
                body: '<div id="txt" style="margin:0 0 5px; width: 100%;"></div>' +
                    '<table id="analizTable" class="table" style="width: 100%">' +
                    '<thead>' +
                    '<tr><th>Analiz Tanımı</th></tr>' +
                    '</thead>' +
                    '<tbody>' +
                    '<tr>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>' +
                    '<table id="numuneTable" class="table" style="width: 100%">' +
                    '<thead>' +
                    '<tr><th><input id=selectAll class="form-check" type="checkbox"></th><th>Kısım Numarası</th><th>Kısım Tanımı</th></tr>' +
                    '</thead>' +
                    '<tbody>' +
                    '<tr>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>' +
                    '<table id="analizMix" class="table" style="width: 100%">' +
                    '<thead>' +
                    '<tr><th>Kısım Numarası</th><th>Analiz Adı</th><th>  </th></tr>' +
                    '</thead>' +
                    '<tbody>' +
                    '<tr>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>',
                footer: '<button id="btnMixAnaliz" type="button" class="btn btn-sm btn-success" >Analiz Mixle</button>' + '<button class="btn btn-sm btn-default" data-dismiss="modal" onclick="window.location.reload()" >Kaydet</button>'
            },
            settings: {
                widthClass: 'modal-lg'
            }
        });
        $('#modalYapilacakAnalizler').modal('toggle');
        var yapilacakAnalizlerList = [];
        GetYapilacakAnalizler();
        GetNumuneKisimlari();

        $('body').on('click', '#btnMixAnaliz', function() {
                if (String.isNullOrWhiteSpace($('#AnalizTanimi_').select2('data'))) {
                    setUtil.alert({
                        container: '#modalYapilacakAnalizler .modal-body #txt',
                        message: "Lütfen Analiz kaydı seçiniz",
                        alertClass: 'alert-warning',
                        autoClose: true
                    });
                    return;
                } else {
                    var selectedAnalizId = $('#AnalizTanimi_').select2('data').id;
                    var selectedAnalizText = $('#AnalizTanimi_').select2('data').text
                }
                var bagliOlduguNumuneId = $('#RecordPublicId').val();
                var checkedList = [];
                var kisimNumaralari = "";
                var trList = $('.form-check-input:checked');
                if (trList.length === 0) {
                    setUtil.alert({
                        container: '#modalYapilacakAnalizler .modal-body #txt',
                        message: "Lütfen numune kısmı seçiniz",
                        alertClass: 'alert-warning',
                        autoClose: true
                    });
                    return;
                } else if (trList.length > 0) {
                    $.each(trList,
                        function(i, el) {
                            var tr = $(el).parents('tr')
                            var kisimNumarasi, kisimTanimi
                            var rowId = $(this).closest('tr').data('rowid');
                            var recordId = $(this).closest('tr').data('recordid');
                            kisimNumarasi = $('#KisimNo_' + rowId).html();
                            kisimTanimi = $('#KisimTanimi_' + rowId).html();
                            var model = {
                                KisimNumarasi: kisimNumarasi,
                                KisimTanimi: kisimTanimi,
                                RecordId: recordId,
                                BagliOlduguNumuneId: bagliOlduguNumuneId,
                                AnalizRecordId: selectedAnalizId
                            }
                            checkedList.push(model);
                            kisimNumaralari += kisimNumarasi + ','
                        });
                    var localUrl = String.format('http://localhost:44358/api/data/AnalizMixOlustur');
                    var realUrl = String.format('https://kazlicesmewebapi.setcrm.com/api/data/AnalizMixOlustur');
                    $.ajax({
                        contentType: 'application/json',
                        type: "POST",
                        url: realUrl,
                        dataType: "json",
                        data: JSON.stringify(checkedList),
                        async: true,
                        success: function(r) {
                            if (r.Status) {
                                var newRow = $('<tr/>');
                                newRow.append('<td><div id="MixKisimNo_" class="form-control">' + kisimNumaralari + '</div></td>');
                                newRow.append('<td><div id="MixAnalizAdi_" class="form-control">' + selectedAnalizText + '</div></td>');
                                newRow.append(String.format('<td><div><input id="{0}" class="form-control btn btn-danger btnAnalizSil" type="button" value="{1}" ></div></td>', r.analizMixRecordId, "Sil"));
                                $('#analizMix tbody').append(newRow);
                            } else {
                                setUtil.alert({
                                    container: '#modalYapilacakAnalizler .modal-body #txt',
                                    message: r.Message,
                                    alertClass: 'alert-danger',
                                    autoClose: false
                                });
                            }
                        }
                    });
                }
            })
            //silme islemi
        $('body').on('click', '.btnAnalizSil', function() {
            var deletedRow = $(this).closest('tr')
            var mixRecordId = $(this).attr('id');
            var data = {
                recordId: mixRecordId,
            }
            var localUrl = String.format('http://localhost:44358/api/data/AnalizMixSil');
            var realUrl = String.format('https://kazlicesmewebapi.setcrm.com/api/data/AnalizMixSil');
            $.get(realUrl, data, function(r) {
                if (r.Status == true) {
                    $(deletedRow).remove();
                } else {
                    setUtil.alert({
                        container: '#modalYapilacakAnalizler .modal-body #txt',
                        message: "Analiz Mixi silinirken bir hata olustu!",
                        alertClass: 'alert-danger',
                        autoClose: false
                    });
                }
            })
        });
        $('body').on('click',
            '#selectAll',
            function() {
                if ($('#selectAll').is(':checked')) {
                    $('.form-check-input').prop('checked', true);
                } else {
                    $('.form-check-input').prop('checked', false);
                }
            })

        function GetNumuneKisimlari() {
            var data = {
                RecordId: $('#RecordPublicId').val(),
            }
            var localUrl = String.format('http://localhost:44358/api/data/GetNumuneKisimlariList');
            var realUrl = String.format('https://kazlicesmewebapi.setcrm.com/api/data/GetNumuneKisimlariList');
            $.get(realUrl,
                data,
                function(r) {
                    $('#numuneTable tbody').html('');
                    if (r.Status) {
                        $.each(r.modelList, function(i, v) {
                            var kisimNo = parseInt(v.KisimNo);
                            var newRow = $('<tr/>', {
                                'data-rowid': i,
                                'data-recordId': v.RecordId
                            });
                            newRow.append('<td><input class="form-check-input" type="checkbox" ></td>');
                            newRow.append(String.format('<td><div id="KisimNo_{0}" class="form-control">' + kisimNo + '</div></td>', i));
                            newRow.append(String.format('<td><div id="KisimTanimi_{0}" class="form-control">' + v.KisimTanimi + '</div></td>', i));
                            $('#numuneTable tbody').append(newRow);


                        });
                    }
                })
        }

        function GetYapilacakAnalizler() {
            var data = {
                RecordId: $('#RecordPublicId').val(),
            }
            var localUrl = String.format('http://localhost:44358/api/data/GetYapilacakAnalizlerList');
            var realUrl = String.format('https://kazlicesmewebapi.setcrm.com/api/data/GetYapilacakAnalizlerList');
            $.get(realUrl,
                data,
                function(r) {
                    if (r.Status) {
                        var newRow = $('<tr/>');
                        newRow.append('<td><div id="AnalizTanimi_" class="form-control"></div></td>');
                        $('#analizTable tbody').append(newRow);
                        $.each(r.modelList, function(i, v) {
                            yapilacakAnalizlerList.push({
                                id: v.RecordId,
                                text: v.AnalizTanimi
                            });
                        });
                        prepareSelect2WithData('#AnalizTanimi_', yapilacakAnalizlerList);
                    }
                })
        }
    });
});