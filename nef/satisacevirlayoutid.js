$(function() {

    var teyitSonucuAyrintisi2 = $('label[for=FD814BD2559544DBB8B1D68987389AAB]').closest('div').data('value');
    var ikinciTeyitSonucuAyrintisi2 = $('label[for=2092D6259B404310BD2AE41E27381738]').closest('div').data('value');

    var gorusmeSonucAyrintisi = $('label[for=4BF9E6F77B974843A2730F89F060A1B9]').closest('div').data('publicids');
    var satisaCevrildiMi = $('label[for=387A675F5637410F92438D625244751D]').parent().data('value');

    satisaCevrildiMi = String.isNullOrWhiteSpace(satisaCevrildiMi) ? false : toBool(satisaCevrildiMi);

    if (gorusmeSonucAyrintisi == "BADDE7137437415BBEF41BB181EFA9DA" &&
        (
            userData.permissionGroupIds.contains('EF322367A0894E0BAB8D7B0DAFF4AC04') ||
            userData.permissionGroupIds.contains('17C43C6CADB048E4B326E047A80017A5') ||
            userData.permissionGroupIds.contains('C7CA606119D8414F96388826FEED88DC') ||
            userData.permissionGroupIds.contains('A597DBB556524D7196A57C3597530060') ||
            userData.permissionGroupIds.contains('6FA828BDE2654F74B451F2F656ED76AD') ||
            userData.permissionGroupIds.contains('58BDE2E653E3441D9078E4168AF9F414')
        )) {
        $('.well .pull-right:eq(0)').prepend('<a id="btnSatisaCevir" class="btn btn-sm btn-warning" style="margin-right:5px;background:purple;border-color:purple"><i class="fa fa-file-alt"></i> Satışa Çevir</a>');

        $('#btnSatisaCevir').on('click', function() {
            if (String.isNullOrWhiteSpace(teyitSonucuAyrintisi2) && String.isNullOrWhiteSpace(ikinciTeyitSonucuAyrintisi2)) {
                notify("warning", "Lütfen aktiviteye ait teyit bilgilerini doldurunuz. Bu bilgiler doldurulmadan satışa izin verilmemektedir.");
                return;
            } else {
                $('#modalSatisaCevir').remove();
                window.setModal.Create({
                    id: 'modalSatisaCevir',
                    html: {
                        header: 'Satışa Çevir',
                        body: '',
                        footer: '<button class="btn btn-info btn-sm btn-prev" style="display:none;"><i class="fas fa-arrow-circle-left"></i> Satış Ekranına Geri Dön</button><button data-dismiss="modal" class="btn btn-danger btn-sm" onclick="window.location.reload()">Kapat</button>'
                    },
                    settings: {
                        widthClass: 'modal-full-width'
                    }
                });
                $('#modalSatisaCevir .modal-body').css('padding', '0');
                $('#modalSatisaCevir .modal-header button').remove();
                $('#modalSatisaCevir').modal({
                    backdrop: 'static',
                    keyboard: false
                });

                $('.btn-prev').on('click', function() {
                    $('.btn-prev').prop('disabled', true);
                    iframe();
                });
                iframe();
            }

        });

    }

    function iframe() {
        if (userData.id == "F2824CB7C7AD45F0AD5E8894F72F587A") {
            $("#modalSatisaCevir .modal-body").html("<iframe src='/set/new/v-club?pageLayoutId=F380110B58AD45A99E1A10D48EF42641' id='frameSatisaCevir' style='width:100%;height:700px;border:none;' frameborder='0'></iframe>");
        } else {
            $("#modalSatisaCevir .modal-body").html("<iframe src='/set/new/v-club?pageLayoutId=DF9742B43E66441AB95CB064A49BF86A' id='frameSatisaCevir' style='width:100%;height:700px;border:none;' frameborder='0'></iframe>");
        }
        var musteri = $('label[for=1D8939CC75F74984A413394625B3A5E5]').closest('div');
        musteriVal = musteri.data('value');
        musteriId = musteri.data('publicids');
        sistemNo = $('label[for=013D61F891A34DAE875610D45C944AEA]').closest('div').data('value');
        var recordId = $('#RecordPublicId').val();
        $('#frameSatisaCevir').on("load",
            function() {
                var recordFrameId = $('iframe').contents().find('#RecordPublicId').val();
                //$('iframe').contents().find('footer').hide();
                if (!String.isNullOrWhiteSpace(recordFrameId)) {
                    window.open(String.format('/set/v-club/detail/{0}?pageLayoutId=DF9742B43E66441AB95CB064A49BF86A&isForward=True', recordFrameId), '_blank');

                    var localUrl = "https://localhost:44305/api/data/AktiviteyiSatisaBagla?aktiviteId=" + recordId + "&vClubId=" + recordFrameId;
                    var realurl = "https://nefwebapi.setcrm.com/api/data/AktiviteyiSatisaBagla?aktiviteId=" + recordId + "&vClubId=" + recordFrameId;
                    $.get(realurl, function(r) {
                        if (r.IsOk) {
                            window.location.reload();
                        }
                    });
                }
                // recordId = $("#frameSatisaCevir").contents().find('#RecordPublicId').val();
                var customObjectId = $("#frameSatisaCevir").contents().find('#CustomObjectPublicId').val();
                if (customObjectId === "EE7B2B2CDD97429399D39EF521B16ED9") {
                    $('.btn-prev').hide();
                } else {
                    $('.btn-prev').prop('disabled', false).show();
                }
                $("#frameSatisaCevir").contents().find('#navbarmenu,  #btn_save_and_new, footer').remove();
                // $("#frameSatisaCevir").contents().find('.well-xxs:first').hide();
                $("#frameSatisaCevir").contents().find('body').attr("style", "padding-top:0 !important");
                $("#frameSatisaCevir").contents().find('body').append(String.format('<script>$("#83779721FB37432FB10BEBD630E319F1").select2("data", {id:"{0}", text:"{1}"}).trigger("change");<\/script>', musteriId, musteriVal));
                $("#frameSatisaCevir").contents().find('body').append(String.format('<script>$("#AEF64FE51FE84A1F845FF6BCA5FB35CF").select2("data", {id:"{0}", text:"{1}"}).trigger("change");<\/script>', recordId, sistemNo));
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
            offset: 100,
            animate: {
                enter: 'animated flipInY',
                exit: 'animated flipOutX'
            },
        });
    }
});