$(function() {
    $('.well .pull-right:eq(0)').prepend('<a id="btnFormOlustur" class="btn btn-sm btn-success"  style="margin-right:10px;"><i class="fa fa-file" aria-hidden="true"></i> Form Oluştur</a>');
    var recordId = $('#RecordPublicId').val();
    var odemeSekli = $('label[for=3A958E190AE54C1E8FC808681F7585A1]').parent().data('publicids');
    var dosyaTipi = "";
    var lokasyonlar = $('label[for=3939D860753C4F3DB9A91C2926C981CD]').parent().data('value');
    var listUrunler = [];
    var yetkiGrubu = $('label[for=627A12569CFB42689D1CD33677F5786F]').parent().data('value');
    var isPermission = false;
    if (yetkiGrubu == "6FA828BDE2654F74B451F2F656ED76AD") {
        isPermission = true;
    }
    if (lokasyonlar.includes('/')) {
        listUrunler = lokasyonlar.split('/');
    } else {
        listUrunler.push(lokasyonlar);
    }
    $('body').on('click', '#btnFormOlustur', function() {
        ModalFormCreate();
        var lokasyonTipi = $('label[for=F8DFD79106C44812A06BCA46DE4B34B6]').parent().data('publicids');
        if (listUrunler.includes('Alaçatı')) {
            dosyaTipi = "alacati";
            $('#modalSablon .gradient-list').append('<div><a class="getTemplate form-control" style="border: 2px solid #18BC9C;cursor:pointer;">Alaçatı</a></div>');
        } else {
            dosyaTipi = "torba";
            $('#modalSablon .gradient-list').append('<div><a class="getTemplate form-control" style="border: 2px solid #18BC9C;cursor:pointer;">Torba</a></div>');
        }
    });
    $("body").on("click",
        ".getTemplate",
        function() {
            $("#modalSablon .modal-body ol, .alert-info").hide();
            $("#modalSablon .modal-body").append('<style>.call-animation{background:#1f8acb;width:135px;text-align: center;font-size: 16px;height:135px;position:relative;margin:0 auto;border-radius:100%;border:solid 5px #1F8ACB;animation:play 2s ease infinite;-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden;-ms-backface-visibility:hidden;backface-visibility:hidden}.call-animation i{font-size: 80px;display: flex;justify-content: center;margin-top: 19px;}@keyframes play{0%{transform:scale(1)}15%{box-shadow:0 0 0 5px #1F8ACB}25%{box-shadow:0 0 0 10px #1F8ACB,0 0 0 20px #1F8ACB}25%{box-shadow:0 0 0 15px #1F8ACB,0 0 0 30px #1F8ACB}}</style><div class="call-animation"><i class="fa fa-file-word img-circle" style="color:white;"></i></div><br><div id="response-message" style="margin:10px 0 0 0;">Form oluşturuluyor, lütfen bekleyiniz.</div>');
            $('.getTemplate').hide();
            $('.modal-footer').hide();
            var recordId = $('#RecordPublicId').val();
            var localUrl = "https://localhost:44305/api/data/FormOlusturAlacati?recordId=" + recordId + "&dosyaTipi=" + dosyaTipi + "&odemeSekli=" + odemeSekli;
            var realurl = "https://nefwebapi.setcrm.com/api/data/FormOlusturAlacati?recordId=" + recordId + "&dosyaTipi=" + dosyaTipi + "&odemeSekli=" + odemeSekli;
            $.get(realurl, function(r) {
                $('#txt').hide();
                if (r !== null) {
                    var fileArray = r.split('|');
                    var urls = [];
                    $.each(fileArray, function(i, v) {
                        if (String.isNullOrWhiteSpace(v)) return;
                        urls.push('https://nefwebapi.setcrm.com/api/Data/getFile?fileName=' + v + '&isPermission=' + isPermission);
                        //urls.push('https://localhost:44305/api/Data/getFile?fileName=' + v + '&isPermission=' + isPermission);
                    })
                    if (urls.length > 0) {
                        var interval = setInterval(download, 300, urls);

                        function download(urls) {
                            var url = urls.pop();
                            var a = document.createElement("a");
                            a.setAttribute('href', url);
                            a.setAttribute('download', '');
                            a.setAttribute('target', '_blank');
                            a.click();
                            if (urls.length == 0) {
                                clearInterval(interval);
                                $("#modalSablon").modal('hide')
                                    // window.location.reload();
                            }
                        }
                    }
                }
            });
        });

    function ModalFormCreate() {
        $('#modalSablon').remove();
        window.setModal.Create({
            id: 'modalSablon',
            html: {
                header: '<i class="fa fa-file"></i> Form Oluştur',
                body: '<div id="msg"> </div>' +
                    '<div class="gradient-list">' +
                    '</div>',
                footer: '<button type="button" class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>'
            }
        });
        // $('#modalSablon .modal-dialog').css('width', '25%');
        $('#modalSablon .modal-body').css('height',
            'auto');
        $('#modalSablon').modal('toggle');
    }
});