$(function() {
    $('.btn-br-actions[data-publicid=0227FB9A463F48739951E62C92C7B0C9]').hide();
    $('.btn-br-actions[data-publicid=0227FB9A463F48739951E62C92C7B0C9]').closest('td').prepend('<a id="btnNumuneKabul" class="btn btn-sm btn-warning"  style="margin-right:10px;" >Satış Onay</a>');
    $('body').on('click', '#btnSatisOnayy', function() {

        $('#modalNumuneKabul').remove();
        window.setModal.Create({
            id: 'modalNumuneKabul',
            html: {
                header: 'Numune Kabul',
                body: '<div id="msg" style="margin:0 23px 5px; width: 80%;font-size:15px;"></div>' +
                    '<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>',
                footer: '<button type="button" class="btn btn-sm btn-default" onclick="window.location.reload()" data-dismiss="modal">Kapat</button>'
            },
            settings: {
                widthClass: 'modal-md'
            }
        });
        $('#modalNumuneKabul').modal('toggle');
    });
    // var data = {
    //     RecordId: $('#RecordPublicId').val(),
    //     ZiyaretTarihi: $('#ziyaretTarihi').val(),
    //     KargoTarihi: $('#kargoTarihi').val(),
    //     KargoNo: $('#kargoNo').val(),
    //     MusteriTalebi: $('#musteriTalebi').val(),
    //     DigerTalep: $('#digerTalepler').val(),
    //     Aciklama: $('#aciklama').val(),
    //     GonderimAdresi: $('#gonderimaAdresi').val(),
    //     DigerSonucMetni: $('#diageoSonucMetni').val(),
    // }
    // var url = 'https://meyicki.setcrm.com/api/data/SatisOnayGuncelle';
    // var url2 = 'http://localhost:50058/api/data/SatisOnayGuncelle';
    // $.post(url, data, function(r) {
    //     if (r.Status) {
    //         $('#modalNumuneKabul').modal('toggle');
    //         $('.btn-br-actions[data-publicid=0227FB9A463F48739951E62C92C7B0C9]').trigger('click');
    //     } else {
    //         setUtil.alert({
    //             container: '#modalNumuneKabul .modal-body #msg',
    //             message: r.Message,
    //             alertClass: 'alert-danger',
    //             autoClose: true
    //         });
    //     }
    // });

});