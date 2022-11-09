$(function() {
    var odemeSekli = $('label[for=3A958E190AE54C1E8FC808681F7585A1]').parent().data('publicids');
    if (odemeSekli != "6F4AE761A77148EDA2B53D77F40A00D6") {
        $('.well .pull-right:eq(0)').prepend('<a id="btnsenet" class="btn btn-sm "  style="margin-right:10px;background-color: #d20000; color: beige""><i class="fa fa-file" aria-hidden="true"></i> Senet Oluştur</a>');
    }

    var recordId = $('#RecordPublicId').val();
    var yetkiGrubu = $('label[for=627A12569CFB42689D1CD33677F5786F]').parent().data('value');
    var isPermission = false;
    if (yetkiGrubu == "6FA828BDE2654F74B451F2F656ED76AD") {
        isPermission = true;
    }
    $('body').on('click', '#btnsenet', function() {
        ModalFormCreate();
        $("#modalSablon2 .modal-body ol, .alert-info").hide();
        $("#modalSablon2 .modal-body").append('<style>.call-animation{background:#1f8acb;width:135px;text-align: center;font-size: 16px;height:135px;position:relative;margin:0 auto;border-radius:100%;border:solid 5px #1F8ACB;animation:play 2s ease infinite;-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden;-ms-backface-visibility:hidden;backface-visibility:hidden}.call-animation i{font-size: 80px;display: flex;justify-content: center;margin-top: 19px;}@keyframes play{0%{transform:scale(1)}15%{box-shadow:0 0 0 5px #1F8ACB}25%{box-shadow:0 0 0 10px #1F8ACB,0 0 0 20px #1F8ACB}25%{box-shadow:0 0 0 15px #1F8ACB,0 0 0 30px #1F8ACB}}</style><div class="call-animation"><i class="fa fa-file-word img-circle" style="color:white;"></i></div><br><div id="response-message" style="margin:10px 0 0 0;">Form oluşturuluyor, lütfen bekleyiniz.</div>');
        $('.getTemplate').hide();
        $('.modal-footer').hide();
        var recordId = $('#RecordPublicId').val();
        var localUrl = "https://localhost:44305/api/data/SenetWord?recordId=" + recordId;
        var realurl = "https://nefwebapi.setcrm.com/api/data/SenetWord?recordId=" + recordId;
        $.get(realurl, function(r) {
            if (r !== null) {
                debugger;
                var fileArray = r;
                var urls = [];
                if (String.isNullOrWhiteSpace(r)) return;
                urls.push('https://nefwebapi.setcrm.com/api/Data/GetFileyeni?fileName=' + fileArray + '&isPermission=' + isPermission);
                if (urls.length > 0) {
                    debugger;
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
                            $("#modalSablon2").modal('hide')
                        }
                    }
                }
            }
        });

    });

    function ModalFormCreate() {
        $('#modalSablon2').remove();
        window.setModal.Create({
            id: 'modalSablon2',
            html: {
                header: '<i class="fa fa-file"></i> Form Oluştur',
                body: '<div id="msg"> </div>',
                footer: '<button type="button" class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>'
            }
        });

        $('#modalSablon2 .modal-body').css('height',
            'auto');
        $('#modalSablon2').modal('toggle');
    }
});