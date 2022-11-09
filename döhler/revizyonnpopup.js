$(function() {
    $('.well .pull-right').prepend('<a id="btnRevize" class="btn btn-sm btn-warning"style="margin-right:10px;" >Revizyon</a>');
    $('body').on('click', '#btnRevize', function() {
        var revNo = $('label[for=DE3FE63C838B4290BBB38C628F800493]').parent().data('value');
        var revNeden = $('label[for=72DC012BF2E14245AF3D5E74EA9393FD]').parent().data('value');
        var revNedenEng = $('label[for=C6CC664B6C4549688B51CD74F11C9352]').parent().data('value');
        $('#modalSablon').remove();
        window.setModal.Create({
            id: 'modalSablon',
            html: {
                header: 'Revizyon',
                body: '<div id="msg" style="margin:0 23px 5px; font-size:15px;"></div>' +
                    '<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>' +
                    '<table class="table revizetable" style="width: 100%">' +
                    '<thead>' +
                    '<tr><th>Revizyon No</th></tr>' +
                    '<tbody>' +
                    '<tr>' +
                    '<td colspan="1" rowspan="1"><input id="revizyonNo" type="text" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;"></td>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>' +
                    '<table class="table table2 revizetable" style="width: 100%">' +
                    '<thead>' +
                    '<tr>' +
                    '<th>Revizyon Nedeni</th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody>' +
                    '<tr>' +
                    '<td colspan="1" rowspan="1"><textarea rows="5" cols="150" id="revizyonNeden" type="text" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;" /></td>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>' +
                    '<table class="table table3 revizetable" style="width: 100%">' +
                    '<thead>' +
                    '<tr>' +
                    '<th>Revizyon Nedeni(Eng)</th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody>' +
                    '<tr>' +
                    '<td colspan="1" rowspan="1"><textarea rows="5" cols="150" id="revizyonNedenEng" type="text" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;" /></td>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>',
                footer: '<button id="btnKaydetRevize" type="button" class="btn btn-sm btn-success" >Kaydet</button>' + '<button type="button" class="btn btn-sm btn-default" onclick="window.location.reload()" data-dismiss="modal">İptal</button>'
            },
            settings: {
                widthClass: 'modal-md'
            }
        });
        $('#revizyonNo').val(revNo);
        $('#revizyonNeden').val(revNeden);
        $('#revizyonNedenEng').val(revNedenEng);
        $('#txt').hide();
        $('#modalSablon').modal('toggle');
    });

    $('body').on('click',
        '#btnKaydetRevize',
        function() {
            $('#txt').show();
            $('.revizetable').hide();
            var data = {
                RecordPublicId: $('#RecordPublicId').val(),
                RevizyonNo: $('#revizyonNo').val(),
                RevizyonNedeni: $('#revizyonNeden').val(),
                RevizyonNedeniEng: $('#revizyonNedenEng').val(),
            }
            var url = 'https://dohlerwebapi.setcrm.com/api/data/RevizyonBilgileriGuncelle';
            var localUrl = 'http://localhost:55073/api/data/RevizyonBilgileriGuncelle';
            $.post(url, data, function(r) {
                if (r.Status) {
                    $('#modalSablon').modal('toggle');
                    notify("success", "İşlem başarıyla tamamlandı. Sayfa yenileniyor lütfen bekleyiniz...");
                    window.location.reload();

                } else {
                    setUtil.alert({
                        container: '#modalSablon .modal-body #msg',
                        message: r.Message,
                        alertClass: 'alert-danger',
                        autoClose: true
                    });
                }
            });
        });

    function notify(type, message) {
        $.notify({
            icon: type === "success" ? 'fas fa-check-double' : 'fas fa-times-circle',
            message: message
        }, {
            z_index: '9999999',
            type: type,
            placement: {
                from: "top",
                align: "right"
            },
            offset: 50,
            animate: {
                enter: 'animated flipInY',
                exit: 'animated flipOutX'
            },
        });
    }
});