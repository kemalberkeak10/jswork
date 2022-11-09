$(function() {


    $('.well .pull-right:eq(0)').prepend('<a id="btnSatisTemsilcisiDegistir" class="btn btn-sm btn-info"  style="margin-right:10px;">Satış Temsilcisi Değiştir</a>');


    $('body').on('click', '#btnSatisTemsilcisiDegistir', function() {
        $('#modalSatisTemsilcisiDegistir').remove();
        window.setModal.Create({
            id: 'modalSatisTemsilcisiDegistir',
            html: {
                header: 'Satış Temsilcisi Değiştir',
                body: '<div id="msg" style="margin:0 23px 5px; width: 80%;font-size:15px;"></div>' +
                    '<table class="table" style="width: 100%">' +
                    '<thead>' +
                    '<tr><th style="color:white;" class="info" >Atanan Satışçı</th"></tr>' +
                    '</thead>' +
                    '<tbody>' +
                    '<tr>' +
                    '<td colspan="1" rowspan="1" style="padding:0px;"><input id="satisTemsilcisi" type="select"  style="resize:none;width:100%;"></td>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>',
                footer: '<button id="btnOnaylaSatisTemsilcisi" type="button" class="btn btn-sm btn-info" >Kaydet</button>' + '<button type="button" class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>'
            },
            settings: {
                widthClass: 'modal-md'
            }
        });
        $('#modalSatisTemsilcisiDegistir').modal('toggle');


        var atananSatisci = $('label[for=39FDF2A698D746299C9D356C8A91D660]').parent().data('publicids');
        prepareSelect2('#satisTemsilcisi', '/Summary/organizationalunititems', {
            publicId: '39FDF2A698D746299C9D356C8A91D660',
            name: 'User',
            filterType: 'UserGroup',
            groupIds: "2928DC9AB5FF409CBABC7777F738E91A",
            depth: 2,
            includeItSelf: false
        }, null, false);
        var satisTemsilcisi = $('label[for=39FDF2A698D746299C9D356C8A91D660]').parent().data();
        if (!String.isNullOrWhiteSpace(satisTemsilcisi)) {
            var satisTemsilcisiVal = $('label[for=39FDF2A698D746299C9D356C8A91D660]').parent().data('value');
            var satisTemsilcisiId = $('label[for=39FDF2A698D746299C9D356C8A91D660]').parent().data('publicids');
            $('#satisTemsilcisi').select2('data', {
                id: satisTemsilcisiId,
                text: satisTemsilcisiVal
            }).trigger('change');
        }
    });

    $('body').on('click', '#btnOnaylaSatisTemsilcisi', function() {
        var url = 'https://nefwebapi.setcrm.com/api/data/ChangeAtananSatisci?recordId=' + $('#RecordPublicId').val() + '&atananSatisci=' + $('#satisTemsilcisi').val();
        var url2 = 'https://localhost:44305/api/data/ChangeAtananSatisci?recordId=' + $('#RecordPublicId').val() + '&atananSatisci=' + $('#satisTemsilcisi').val();
        $('#modalSatisTemsilcisiDegistir .modal-body').html('<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>');
        $.get(url, function(r) {
            if (r.IsOk) {
                debugger;
                $('#modalSatisTemsilcisiDegistir').modal('toggle');
                notify("success", "Temsilci başarıyla değiştirildi.Sayfa Yenileniyor..");
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                setUtil.alert({
                    container: '#modalSatisTemsilcisiDegistir .modal-body #msg',
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