$(function() {
    $('body').on('click',
        '#satinalmadagit',
        function() {
            var dagitildiKontrol = $('label[for=D03C9022DFA4491E96178905C24000E1]').parent().data().value
            if (dagitildiKontrol) {
                $('#modalDagitAlert').remove();
                window.setModal.Create({
                    id: 'modalDagitAlert',
                    html: {
                        body: '<div id="msgAlert" style="margin:0 0 5px; width: 100%;">Daha önce dağıtım yapıldı . Bu işlemi tekrar yapmak istiyor musunuz?</div>',
                        footer: '<button id="btnApprove" type="button" class="btn btn-sm btn-success" >Evet</button> <button class="btn btn-danger btn-sm" data-dismiss="modal" onclick="window.location.reload()">Hayır</button>'
                    },
                    settings: {
                        widthClass: 'modal-md'
                    }
                });
                $('#modalDagitAlert').modal({
                    backdrop: false
                });

            } else {
                SatinAlimDagit()
            }
        });

    $('body').on('click',
        '#btnApprove',
        function() {
            $('#modalDagitAlert').remove();
            SatinAlimDagit()
        });

    function SatinAlimDagit() {
        $('#modalUretimeGonderLoading').remove();
        window.setModal.Create({
            id: 'modalUretimeGonderLoading',
            html: {
                header: ' ',
                body: '<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>',
                footer: ''
            }
        });
        $('#modalUretimeGonderLoading').modal('toggle');
        var recordId = $('#RecordPublicId').val();
        var musteriId = $('label[for=579D79E674824E53A654D397B1F7C64A]').parent().data().publicids;
        var url = 'https://templateprocess.setcrm.com/api/dataDenizin/SatinAlimDagit?recordId=' + recordId + '&musteriId=' + musteriId;
        var localurl = 'http://localhost:52129/api/dataDenizin/SatinAlimDagit?recordId=' + recordId + '&musteriId=' + musteriId;
        $.get(url, function(r) {
            if (r.Status) {
                notify('success', 'İşlem Başarılı . Sayfa yenileniyor lütfen bekleyiniz...');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                notify('danger', r.Message + 'Sayfa yenileniyor lütfen bekleyiniz...');
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
        });
    }

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