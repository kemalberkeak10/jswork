$(function() {
    var yapilacakAnalizlerLr = $('[data-id=8666B4E380484315A810BA0742F2851E]').find('table tbody tr');
    $(yapilacakAnalizlerLr).each(function(i, v) {
        $(v).find('td:last .btn-group').prepend('<button class="btn btn-sm btn-info ebutton"> E </button>');
    });
    var analizId = "";
    $('#modalEtkenMaddeler').remove();
    window.setModal.Create({
        id: 'modalEtkenMaddeler',
        html: {
            header: 'Etken Maddeler',
            body: '<div id="txt" style="margin:0 0 5px; width: 100%;"></div>' +
                '<div id="msg" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>' +
                '<table id="etkenMaddelerTable" class="table" style="width: 100%">' +
                '<thead>' +
                '<tr><th><input id=selectAll class="form-check" type="checkbox"></th><th>Etken Madde Adı</th></tr>' +
                '</thead>' +
                '<tbody>' +
                '<tr>' +
                '</tr>' +
                '</tbody>' +
                '</table>',
            footer: '<button id="btnEtkenMaddeEkle" type="button" class="btn btn-sm btn-success" >Ekle</button>' + '<button type="button" class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>'
        }
    });
    $('body').on('click', '#btnEtkenMaddeEkle', function() {
        var checkedList = [];
        var trList = $('.form-check-input:checked');
        if (trList.length === 0) {
            setUtil.alert({
                container: '#modalEtkenMaddeler .modal-body #txt',
                message: "Lütfen etken madde seçiniz",
                alertClass: 'alert-warning',
                autoClose: true
            });
            return;
        } else if (trList.length > 0) {
            $('#msg').show();
            var bagliOlduguNumuneId = $('#RecordPublicId').val();
            $.each(trList,
                function(i, el) {
                    var tr = $(el).parents('tr')
                    var etkenMaddeText;
                    var rowId = $(this).closest('tr').data('rowid');
                    var recordId = $(this).closest('tr').data('recordid');
                    etkenMaddeText = $('#EtkenMadde_' + rowId).html();
                    var model = {
                        EtkenMadde: etkenMaddeText,
                        EtkenMaddeId: recordId,
                        BagliOlduguNumuneId: bagliOlduguNumuneId,
                        AnalizRecordId: analizId
                    }
                    checkedList.push(model);
                });
            var localUrl = String.format('http://localhost:44358/api/data/EButonuAnalizMixOlustur');
            var realUrl = String.format('https://kazlicesmewebapi.setcrm.com/api/data/EButonuAnalizMixOlustur');
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
                        $('#modalEtkenMaddeler .modal-body').html('');
                        $('#modalEtkenMaddeler .modal-body').append('<div id="txt" style="margin:0 0 5px; width: 100%;"></div>')
                        setUtil.alert({
                            container: '#modalEtkenMaddeler .modal-body #txt',
                            message: "İşleminiz başarıyla gerçekleşti.Sayfa yenileniyor lütfen bekleyiniz.",
                            alertClass: 'alert-success',
                            autoClose: false
                        });
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                    } else {
                        $('#msg').hide();
                        setUtil.alert({
                            container: '#modalEtkenMaddeler .modal-body #txt',
                            message: r.Message,
                            alertClass: 'alert-danger',
                            autoClose: false
                        });
                    }
                }
            });
        }
    });
    $('body').on('click', '.ebutton', function() {
        var row = $(this).closest('tr').find('td:eq(1)');
        analizId = row.data().value;
        GetEtkenMaddeler(analizId);
        $('#msg').hide();
        $('#modalEtkenMaddeler').modal('toggle');
    })

    function GetEtkenMaddeler(analizId) {
        var etkenMaddeList = [];
        var data = {
            RecordId: analizId,
        }
        var localUrl = String.format('http://localhost:44358/api/data/GetAnalizEtkenMaddeler');
        var realUrl = String.format('https://kazlicesmewebapi.setcrm.com/api/data/GetAnalizEtkenMaddeler');
        $.get(realUrl, data, function(r) {
            $('#etkenMaddelerTable tbody').html('');
            if (r.Status) {
                $.each(r.modelList, function(i, v) {
                    var newRow = $('<tr/>', {
                        'data-rowid': i,
                        'data-recordId': v.EtkenMaddeId
                    });
                    newRow.append('<td><input class="form-check-input" type="checkbox" ></td>');
                    newRow.append(String.format('<td><div id="EtkenMadde_{0}" class="form-control">' + v.EtkenMadde + '</div></td>', i));
                    $('#etkenMaddelerTable tbody').append(newRow);
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
});