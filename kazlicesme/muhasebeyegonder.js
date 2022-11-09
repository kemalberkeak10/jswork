$(function() {
    $(String.format('div[data-id={0}]', "DF1F667C34F9489CADEC0B6BA63A875E")).closest('div').prepend('<button type="button" class="btn btn-warning btn-sm pull-right btn-muhasebeye-gonder" style="margin-right:5px;margin-top:2px;"><i class="fas fa-plus"></i> Muhasebeye Gönder</button>');

    $('body').on('click', '.btn-muhasebeye-gonder', function() {
        $('#loadingMuhasebeyeGonder').remove();
        window.setModal.Create({
            id: 'loadingMuhasebeyeGonder',
            html: {
                header: ' ',
                body: '<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>' +
                    '<div id="msg" style="margin:0 0 5px; width: 100%;"></div>',
                footer: ''
            }
        });

        $('#muhasabeyeGonderModal').remove();
        window.setModal.Create({
            id: 'muhasabeyeGonderModal',
            html: {
                header: 'Muhasebeye Gönder',
                body: '',
                footer: '<button type="button" class="btn btn-default  btn-xl pull-right"  data-dismiss="modal" >Kapat</button>' +
                    '<button type="button" id="btnMuhasebeGonder" class="btn btn-xl btn-success pull-right">Muhasebeye Gönder</button>'
            }
        });

        var lrId = "DF1F667C34F9489CADEC0B6BA63A875E";
        var url = 'https://kazlicesmewebapi.setcrm.com/api/data/LrOkuma?recordId=' + $('#RecordPublicId').val() + '&lrId=' + lrId;
        var localurl = 'http://localhost:44358/api/data/LrOkuma?recordId=' + $('#RecordPublicId').val() + '&lrId=' + lrId;

        $('#muhasabeyeGonderModal .modal-body').html('<div id="msg" ></div>' +
            '<div id="firmaDosyalari" ></div>');
        // $('#muhasabeyeGonderModal .modal-dialog').css('width', '50%');
        $.get(url, function(r) {
            if (r.IsOk === true) {
                $('#newTbl thead').html('');
                $('#newTbl tbody').html('');
                var newTbl = $('<table id="newTbl" class="table table-bordered table-hover" style="width: 100%;overflow-x: scroll" />');
                var thead = $('<thead />');
                var newRow = $('<tr  style="background-color:lightblue;"/>');
                newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" "/>').text(''));
                newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" "/>').text('Dosya Tipi'));
                newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" "/>').text('Açıklama'));
                newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" "/>').text('Dosya'));
                thead.append(newRow);
                newTbl.append(thead);
                var tbody = $('<tbody />');
                $.each(r.Records, function(i, v) {
                    var analizAdi = v.Values.first('FieldPublicId', '7D8B9BA24BE242D986C1C198EAEC0A04').Value;
                    var analizCesidi = v.Values.first('FieldPublicId', 'CF9867808B6D4543B0944210A2EF3842').Value;
                    var analizSonucu = v.Values.first('FieldPublicId', '604F37AED48C4D3C8BB403BCF70B0747').Value;
                    var newRow = $('<tr />').attr('data-id', v.PublicId);
                    newRow.append($('<td style="text-align: left;" />').append($('<input />', {
                        'id': 'chkTablo',
                        'name': 'chkTablo',
                        'value': '',
                        'type': 'checkbox',
                        'style': 'margin; auto;',
                    })));
                    newRow.append($('<td style="text-align: left;" />').text(analizAdi));
                    newRow.append($('<td style="text-align: left;" />').text(analizCesidi));
                    newRow.append($('<td style="text-align: left;" />').text(analizSonucu));
                    tbody.append(newRow);
                    newTbl.append(tbody);
                });
                $('#muhasabeyeGonderModal').find('.modal-body #firmaDosyalari').append(newTbl);
                $('#muhasabeyeGonderModal').modal('toggle');
            } else {
                $('#muhasabeyeGonderModal').find('#msg').text(r.Message);
            }
        });
    });

    $('body').on('click', '#btnMuhasebeGonder', function() {

        var model = {
            RecordPublicId: $('#RecordPublicId').val(),
            User: userData.id,
            CheckedItems: $('#muhasabeyeGonderModal tbody tr input#chkTablo:checked').map(function() {
                return $(this).parents('tr').data('id')
            }).toArray()
        };
        console.log(model);
        if (model.CheckedItems.length > 0) {
            $('#muhasabeyeGonderModal').modal('toggle');
            $('#loadingMuhasebeyeGonder').modal('toggle');
            console.log(model.CheckedItems);
            var url = 'https://kazlicesmewebapi.setcrm.com/api/data/MuhasebeyeGonder';
            var localurl = 'http://localhost:44358/api/data/MuhasebeyeGonder';
            $.post(localurl, model, function(r) {
                if (r.Status) {
                    $('#loadingMuhasebeyeGonder .modal-body #txt').hide();
                    setUtil.alert({
                        container: '#loadingMuhasebeyeGonder .modal-body #msg',
                        message: 'İşleminiz başarıyla tamamlandı. Sayfa yenileniyor lütfen bekleyiniz.',
                        alertClass: 'alert-success',
                        autoClose: true
                    });
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                } else {
                    $('#loadingMuhasebeyeGonder .modal-body #txt').hide();
                    setUtil.alert({
                        container: '#loadingMuhasebeyeGonder .modal-body #msg',
                        message: r.Message,
                        alertClass: 'alert-danger',
                        autoClose: false
                    });
                }
            });
        }
        setUtil.alert({
            container: '#muhasabeyeGonderModal .modal-body #msg',
            message: 'En az 1 tane Kayıt Seçmelisiniz.',
            alertClass: 'alert-danger',
            autoClose: true
        });

    });

});