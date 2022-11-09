$(function() {
    $('.btn-br-actions[data-publicid=DFB95E59060047D181CCCAC54D3CC654]').hide();
    $('.btn-br-actions[data-publicid=DFB95E59060047D181CCCAC54D3CC654]').closest('td').prepend('<a id="btnAnalizMixle" class="btn btn-sm btn-warning"  style="margin-right:10px;" >Analiz Mixle</a>');
    $('body').on('click', '#btnAnalizMixle', function() {
        $('#modalYapilacakAnalizler').remove();
        window.setModal.Create({
            id: 'modalYapilacakAnalizler',
            html: {
                header: 'Yapılacak Analiz',
                body: '<table id="analizTable" class="table" style="width: 100%">' +
                    '<thead>' +
                    '<tr><th>Sıra No</th><th>Analiz Tanımı</th><th>Seçim</th></tr>' +
                    '</thead>' +
                    '<tbody>' +
                    '<tr>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>',
                footer: '<button type="button" class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>'
            }
        });
        $('#modalYapilacakAnalizler').modal('toggle');
        GetYapilacakAnalizler();


        $('body').on('click', '.btnAnalizSec', function() {
            var selectedAnalizId = $(this).attr('id');
            var bagliOlduguNumuneId = $('#RecordPublicId').val();
            $('#modalYapilacakAnalizler').modal('toggle');
            $('#modalNumuneKisimlari').remove();
            window.setModal.Create({
                id: 'modalNumuneKisimlari',
                html: {
                    header: 'Numune Kısımları',
                    body: '<div id="txt" style="margin:0 0 5px; width: 100%;"></div>' +
                        '<div id="msg" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>' +
                        '<table id="numuneTable" class="table" style="width: 100%">' +
                        '<thead>' +
                        '<tr><th><input id=selectAll class="form-check" type="checkbox"></th><th>Kısım Numarası</th><th>Kısım Tanımı</th></tr>' +
                        '</thead>' +
                        '<tbody>' +
                        '<tr>' +
                        '</tr>' +
                        '</tbody>' +
                        '</table>',
                    footer: '<button id="btnAnalizMix" type="button" class="btn btn-sm btn-success" >Analiz Mixle</button>' + '<button type="button" class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>'
                }
            });
            $('#msg').hide();
            $('#modalNumuneKisimlari').modal('toggle');

            GetNumuneKisimlari();
            $('body').on('click', '#btnAnalizMix', function() {
                AnalizMixOlustur();
            })

            function AnalizMixOlustur() {
                var checkedList = [];
                var trList = $('.form-check-input:checked');
                if (trList.length === 0) {
                    setUtil.alert({
                        container: '#modalNumuneKisimlari .modal-body #txt',
                        message: "Lütfen kayıt seçiniz",
                        alertClass: 'alert-warning',
                        autoClose: true
                    });
                    return;
                } else if (trList.length > 0) {
                    $('#msg').show();
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
                                $('#msg').hide();
                                $('#modalNumuneKisimlari .modal-body').html('');
                                $('#modalNumuneKisimlari .modal-body').append('<div id="txt" style="margin:0 0 5px; width: 100%;"></div>')
                                setUtil.alert({
                                    container: '#modalNumuneKisimlari .modal-body #txt',
                                    message: "İşleminiz başarıyla gerçekleşti.Sayfa yenileniyor lütfen bekleyiniz.",
                                    alertClass: 'alert-success',
                                    autoClose: false
                                });
                                setTimeout(() => {
                                    window.location.reload();
                                }, 1000);
                            } else {
                                setUtil.alert({
                                    container: '#modalNumuneKisimlari .modal-body #txt',
                                    message: r.Message,
                                    alertClass: 'alert-danger',
                                    autoClose: false
                                });
                            }
                        }
                    });
                }

            }

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
            $('body').on('click',
                '#selectAll',
                function() {
                    if ($('#selectAll').is(':checked')) {
                        $('.form-check-input').prop('checked', true);
                    } else {
                        $('.form-check-input').prop('checked', false);
                    }
                })

        })

        function GetYapilacakAnalizler() {
            var data = {
                RecordId: $('#RecordPublicId').val(),
            }
            var localUrl = String.format('http://localhost:44358/api/data/GetYapilacakAnalizlerList');
            var realUrl = String.format('https://kazlicesmewebapi.setcrm.com/api/data/GetYapilacakAnalizlerList');
            $.get(realUrl, data, function(r) {
                $('#analizTable tbody').html('');
                if (r.Status) {
                    $.each(r.modelList, function(i, v) {
                        var siraNo = parseInt(v.SiraNo);
                        var newRow = $('<tr/>', {
                            'data-rowid': i
                        });
                        newRow.append(String.format('<td><div id="SiraNo_{0}" class="form-control">' + siraNo + '</div></td>', i));
                        newRow.append(String.format('<td><div id="AnalizTanimi_{0}" class="form-control">' + v.AnalizTanimi + '</div></td>', i));
                        newRow.append(String.format('<td><div><input id="{0}" class="form-control btn btn-info btnAnalizSec" type="button" value="{1}" ></div></td>', v.RecordId, "Analizi Seç"));
                        $('#analizTable tbody').append(newRow);
                    });
                }
            })
        }
    });
});