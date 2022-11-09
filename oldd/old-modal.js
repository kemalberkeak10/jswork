$(function() {
    $('.btn-br-actions[data-publicid=AE3A3FCDA8CF460CACA7CF2ACC88DE38]').hide();
    $('.btn-br-actions[data-publicid=AE3A3FCDA8CF460CACA7CF2ACC88DE38]').closest('td').prepend('<a id="btnSatisOnayy" class="btn btn-sm btn-warning"  style="margin-right:10px;" >Satış Onay</a>');
    $('body').on('click', '#btnSatisOnayy', function() {
        $('#modalSablon').remove();
        window.setModal.Create({
            id: 'modalSablon',
            html: {
                content: 'style="width:900px !important"',
                header: 'Satış Onay',
                body: '<div id="msg" style="margin:0 23px 5px; width: 80%;font-size:15px;"></div>' +
                    '<table class="table" style="width: 100%">' +
                    '<thead>' +
                    '<tr><th>Ziyaret Tarihi</th><th>Kargo Gönderim Tarihi</th><th>Kargo Numarası</th><th>Müşteri Talebi</th></tr>' +
                    '</thead>' +
                    '<tbody>' +
                    '<tr>' +
                    '<td colspan="1" rowspan="1"><input id="ziyaretTarihi" type="text" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;"></td>' +
                    '<td colspan="1" rowspan="1"><input id="kargoTarihi" type="text" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;"></td>' +
                    '<td colspan="1" rowspan="1"><input id="kargoNo" placeholder="Kargo Numarası" type="text" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;"></td>' +
                    '<td colspan="1" rowspan="1"><input id="musteriTalebi" type="select"  style="resize:none;width:100%;"></td>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>' +
                    '<table class="table table4" style="width: 100%">' +
                    '<thead>' +
                    '<tr>' +
                    '<th>Diğer Talepler</th>' +
                    '<th>Açıklama</th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody>' +
                    '<tr>' +
                    '<td colspan="1" rowspan="1"><textarea rows="3" cols="70" id="digerTalepler" type="text" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;" /></td>' +
                    '<td colspan="1" rowspan="1"><textarea rows="3" cols="70" id="aciklama" type="text" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;" /></td>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>' +
                    '<table class="table table4" style="width: 100%">' +
                    '<thead>' +
                    '<tr>' +
                    '<th>Gonderim Adresi</th>' +
                    '<th>Diageo Sonuç Metni</th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody>' +
                    '<tr>' +
                    '<td colspan="1" rowspan="1"><textarea rows="3" cols="70" id="gonderimaAdresi" type="text" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;" /></td>' +
                    '<td colspan="1" rowspan="1"><textarea rows="3" cols="70" id="diageoSonucMetni" type="text" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;" /></td>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>',
                footer: '<button id="btnKaydetSatis" type="button" class="btn btn-sm btn-success" >Kaydet ve Rapor Oluştur</button>' + '<button type="button" class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>'
            }
        });
        $('#modalSablon .modal-body').css('max-height', '');
        $('#modalSablon .modal-body').css('height', '450px');
        $('#modalSablon .modal-dialog').css('width', '50%');
        $('#modalSablon').modal('toggle');

        $('#ziyaretTarihi').datetimepicker({
            inline: false,
            closeOnDateSelect: true,
            timepicker: false,
            format: 'd.m.Y',
            mask: false,
            scrollMonth: false,
            scrollTime: false,
            scrollInput: false,
            dayOfWeekStart: 1
        });
        $('#kargoTarihi').datetimepicker({
            inline: false,
            closeOnDateSelect: true,
            timepicker: false,
            format: 'd.m.Y',
            mask: false,
            scrollMonth: false,
            scrollTime: false,
            scrollInput: false,
            dayOfWeekStart: 1
        });
        var ziyaretTarihi = $('label[for=BF49F1BC877B45909CF63089D5826DBB ]').parent().data('value').split(' ')[0];
        $('#ziyaretTarihi').val(ziyaretTarihi);
        var kargoTarihi = $('label[for=0A827334EA7D4D1C9A69F6615909F6A5]').parent().data('value').split(' ')[0];
        $('#kargoTarihi').val(kargoTarihi);
        var kargoNo = $('label[for=F0C3A072BF6E4260BB9862B069163766]').parent().data('value');
        $('#kargoNo').val(kargoNo);

        prepareSelect2('#musteriTalebi', '/summary/fielditems', {
            id: 'F28119829332417CA4951AB3C27698CA'
        }, null, null);
        var musteriTalebiVal = $('label[for=F28119829332417CA4951AB3C27698CA]').parent().data('value');
        var musteriTalebiId = $('label[for=F28119829332417CA4951AB3C27698CA]').parent().data('publicids');

        $('#musteriTalebi').select2('data', {
            id: musteriTalebiId,
            text: musteriTalebiVal
        }).trigger('change');

        var digerTalep = $('label[for=50FB99D287884620B019C69E41EB1BB5]').parent().data('value');
        $('#digerTalepler').val(digerTalep);

        var aciklama = $('label[for=A4DAB95FF01341A4BB152917DD97BDFA]').parent().data('value');
        $('#aciklama').val(aciklama);

        var gonderimaAdresi = $('label[for=4F0D2231555E406A903A735D1638BD42]').parent().data('value');
        $('#gonderimaAdresi').val(gonderimaAdresi);
        var diageoSonucMetni = $('label[for=640F6A9C34AC40BC897FDA439B9919F1]').parent().data('value');
        $('#diageoSonucMetni').val(diageoSonucMetni);

    });


    $('body').on('click', '#btnKaydetSatis', function() {
        var data = {
            RecordId: $('#D91AE774A0554BE1B0E55BC2FD12E750').val(),
            ZiyaretTarihi: $('#ziyaretTarihi').val(),
            KargoTarihi: $('#kargoTarihi').val(),
            KargoNo: $('#kargoNo').val(),
            MusteriTalebi: $('#musteriTalebi').val(),
            DigerTalep: $('#digerTalepler').val(),
            Aciklama: $('#aciklama').val(),
            GonderimAdresi: $('#gonderimaAdresi').val(),
            DigerSonucMetni: $('#diageoSonucMetni').val(),
        }
        var url = 'https://meyicki.setcrm.com/api/data/SatisOnayGuncelle';
        //var url2 = 'http://localhost:50058/api/data/SatisOnayGuncelle';
        $('#modalSablon .modal-body').html('<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>');
        $('#modalSablon .modal-body').css('max-height', '');
        $('#modalSablon .modal-body').css('height', '150px');
        $('#modalSablon .modal-dialog').css('width', '50%');
        $.get(url, data, function(r) {
            if (r.Status) {
                $('#modalSablon').modal('toggle');
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

});