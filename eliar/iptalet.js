$(function() {
    $('.btn-br-actions[data-publicid=C7176C827C3F4C9DB69370A0DA7D674D]').hide();
    $('.btn-br-actions[data-publicid=C7176C827C3F4C9DB69370A0DA7D674D]').closest('td').prepend('<a id="btnIptalet" class="btn btn-sm btn-warning"  style="margin-right:10px;" >İptal Et</a>');
    $('body').on('click', '#btnIptalet', function() {
        $('#modalIptalEt').remove();
        window.setModal.Create({
            id: 'modalIptalEt',
            html: {
                header: 'İptal Et',
                body: '<div id="msg" style="margin:0 23px 5px; width: 80%;font-size:15px;"></div>' +
                    '<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>' +
                    '<table class="table popup-table" style="width: 100%">' +
                    '<thead>' +
                    '<tr><th>İşlem Zamanı</th><th>İşlemi Yapan</th></tr>' +
                    '</thead>' +
                    '<tbody>' +
                    '<tr>' +
                    '<td style="width: 50%;" ><input id="islemZamani" type="text" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;"></td>' +
                    '<td  style="width: 50%;"><input id="islemiYapan" type="select"  style="resize:none;width:100%;"></td>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>' +
                    '<table class="table popup-table" style="width: 100%">' +
                    '<thead>' +
                    '<tr>' +
                    '<th>Açıklama</th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody>' +
                    '<tr>' +
                    '<td colspan="1" rowspan="1"><textarea rows="3" cols="70" id="aciklama" type="text" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;" /></td>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>',
                footer: '<button id="btnKaydetSatis" type="button" class="btn btn-sm btn-success" >Kaydet</button>' + '<button type="button" class="btn btn-sm btn-default" data-dismiss="modal" onclick="window.location.reload();">Kapat</button>'
            },
            settings: {
                widthClass: 'modal-lg'
            }
        });

        $('#modalIptalEt').modal({
            backdrop: false
        });
        $('#txt').hide();
        $('#islemZamani').datetimepicker({
            inline: false,
            closeOnDateSelect: true,
            timepicker: false,
            format: 'd.m.Y',
            mask: false,
            scrollMonth: false,
            scrollTime: false,
            scrollInput: false,
            dayOfWeekStart: 1,
        });
        $('#islemZamani').val(moment(new Date).format('DD.MM.YYYY'));
        prepareSelect2('#islemiYapan',
            '/summary/organizationalunititems', {
                publicId: 'B5B856FF73FB49F1811217107E7BB0AF',
                name: 'User',
                filterType: 'User',
                groupIds: null,
                depth: 1,
                includeItSelf: false
            },
            null,
            false);
        $('#islemiYapan').select2('data', {
            id: userData.id,
            text: userData.name
        }).trigger('change');
    });
    $('body').on('click', '#btnKaydetSatis', function() {
        $('#txt').show();
        $('.popup-table').hide();
        setTimeout(() => {
            $('#txt').hide();
        }, 2000);
        notify("success", "İşlem başarılı. Sayfa yenileniyor lütfen bekleyiniz...");
        setTimeout(() => {
            window.location.reload();
        }, 1000);
        // var data = {
        //         RecordId: $('#D91AE774A0554BE1B0E55BC2FD12E750').val(),
        //         IslemZamani: $('#islemZamani').val(),
        //         IslemiYapan: $('#islemiYapan').val(),
        //         Aciklama: $('#aciklama').val(),

        //     }
        //     //var url = 'https://.setcrm.com/api/data/';
        //     //var url2 = 'http://localhost:/api/data/';
        // $.get(url, data, function(r) {
        //     if (r.Status) {} else {
        //         setUtil.alert({
        //             container: '#modalIptalEt .modal-body #msg',
        //             message: r.Message,
        //             alertClass: 'alert-danger',
        //             autoClose: true
        //         });
        //     }
        // });
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