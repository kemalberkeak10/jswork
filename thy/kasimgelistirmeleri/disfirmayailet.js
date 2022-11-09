$(function() {
    $('.well .pull-right:eq(0)').prepend('<a id="btn-disIstasyon" class="btn btn-success btn-sm btn-disIstasyon"  style="margin-right:10px;" title=""><span> Dış İstasyona Gönder</a>');
    var recordId = $('#RecordPublicId').val();
    var woVal = $('label[for=47204496EF8947C9BE9F974185796E1D]').parent().data('value');
    var calibrationToolId = $('label[for=484A6B929BF646539D4FEC4BB787B52B]').parent().data('publicids');
    var calibrationToolVal = $('label[for=484A6B929BF646539D4FEC4BB787B52B]').parent().data('value');

    $("body").off("click",
        ".btn-disIstasyon").on("click",
        ".btn-disIstasyon",
        function() {
            $('#modalDisIstasyon').remove();
            window.setModal.Create({
                id: 'modalDisIstasyon',
                html: {
                    header: 'Dış İstasyona Gönder',
                    body: '<div id="txt" style="margin:0 auto;width: 100%;color:black">Sayfa yükleniyor, lütfen bekleyiniz...<br/> <img src="/Public/img/loading_bar.gif"></div>',
                    // footer: '<button type="button" class="btn btn-sm btn-default" data-dismiss="modal" onClick="window.location.reload()">Kapat</button>',
                    footer: '',
                },
                settings: {
                    widthClass: 'modal-full-width'
                }
            });
            $('#modalDisIstasyon .modal-footer').hide();
            $('#modalDisIstasyon .modal-body').css('padding', '0');
            $('#modalDisIstasyon').modal({
                backdrop: 'static',
                keyboard: false
            });
            //("#modalDisIstasyon .modal-body").html("<iframe src='/set/new/dis-istasyona-gonderim?pageLayoutId=2FA29FE0BD8C46CD85C799FB5B2E4CBD' id='frameDisIstasyon' style='width:100%;height:700px;border:none;' frameborder='0'></iframe>");
            // $('iframe').on('load', function() {
            //     $('iframe').contents().find('footer').hide();
            //     $('iframe').contents().find('#btn_save').parent().prepend('<a id="btnWoStatuUpdate" class="btn btn-primary">Kaydet</a>')
            //     $('iframe').contents().find('#btn_save').hide();
            //     $("#frameDisIstasyon").contents().find('#navbarmenu,  #btn_save_and_new, footer').remove();
            //     $("#frameDisIstasyon").contents().find('body').attr("style", "padding-top:0 !important");
            //     $('iframe').contents().find('body').append(String.format('<script>$(function() {$("#9AC1207C317244D2BBB69F198821D7CC").select2("data", {id:"{0}", text:"{1}"}).trigger("change");});<\/script>', recordId, woVal));
            //     $('iframe').contents().find('body').append(String.format('<script>$(function() {$("#D26B3FD74ACB43DF9D07B1B931CC5B12").select2("data", {id:"{0}", text:"{1}"}).trigger("change");});<\/script>', calibrationToolId, calibrationToolVal));
            // });

            //canli 
            ("#modalDisIstasyon .modal-body").html("<iframe src='/set/new/dis-istasyona-gonderim?pageLayoutId=73DEB249C69E4F98AA36E08391E1D97A' id='frameDisIstasyon' style='width:100%;height:700px;border:none;' frameborder='0'></iframe>");
            $('iframe').on('load', function() {
                $('iframe').contents().find('footer').hide();
                $('iframe').contents().find('#btn_save').parent().prepend('<a id="btnWoStatuUpdate" class="btn btn-primary">Kaydet</a>')
                $('iframe').contents().find('#btn_save').hide();
                $("#frameDisIstasyon").contents().find('#navbarmenu,  #btn_save_and_new, footer').remove();
                $("#frameDisIstasyon").contents().find('body').attr("style", "padding-top:0 !important");
                $('iframe').contents().find('body').append(String.format('<script>$(function() {$("#DCD5A4EC3877479FA4960219C0AA2927").select2("data", {id:"{0}", text:"{1}"}).trigger("change");});<\/script>', recordId, woVal));
                $('iframe').contents().find('body').append(String.format('<script>$(function() {$("#8127B13B35EB400EB69EF2505116A510").select2("data", {id:"{0}", text:"{1}"}).trigger("change");});<\/script>', calibrationToolId, calibrationToolVal));
            });

        });
    $("body").on("click",
        ".close",
        function() {
            window.location.reload();
        });

});