$(function() {

    var gorusmeSonucAyrintisi = $('label[for=4BF9E6F77B974843A2730F89F060A1B9]').closest('div').data('publicids');
    if (gorusmeSonucAyrintisi == "BADDE7137437415BBEF41BB181EFA9DA") {
        $('.well .pull-right:eq(0)').prepend('<a id="btnSatisaCevir" class="btn btn-sm btn-warning" style="margin-right:5px;background:purple;border-color:purple"><i class="fa fa-file-alt"></i> Satışa Çevir</a>');

        $('#btnSatisaCevir').on('click', function() {
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
        });


        function iframe() {
            $("#modalSatisaCevir .modal-body").html("<iframe src='/set/new/v-club?pageLayoutId=DF9742B43E66441AB95CB064A49BF86A' id='frameSatisaCevir' style='width:100%;height:700px;border:none;' frameborder='0'></iframe>");
            var musteri = $('label[for=1D8939CC75F74984A413394625B3A5E5]').closest('div');
            musteriVal = musteri.data('value');
            musteriId = musteri.data('publicids');
            sistemNo = $('label[for=013D61F891A34DAE875610D45C944AEA]').closest('div').data('value');
            var recordId = $('#RecordPublicId').val();
            $('#frameSatisaCevir').on("load", function() {
                var recordFrameId = $('iframe').contents().find('#RecordPublicId').val();
                //$('iframe').contents().find('footer').hide();
                if (!String.isNullOrWhiteSpace(recordFrameId)) {
                    window.open(String.format('/set/v-club/detail/{0}?pageLayoutId=DF9742B43E66441AB95CB064A49BF86A&isForward=True', recordFrameId), '_blank');

                    var localUrl = "https://localhost:44305/api/data/AktiviteyiSatisaBagla?aktiviteId=" + recordId + "&vClubId=" + recordFrameId;
                    var realurl = "https://nefwebapi.setcrm.com/api/data/AktiviteyiSatisaBagla?aktiviteId=" + recordId + "&vClubId=" + recordFrameId;
                    $.get(localUrl, function(r) {
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

    }
});