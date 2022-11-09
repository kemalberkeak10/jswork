$(function() {

    var satisCevrildimi = $('label[for=22F9D6C90F7246D79C6F8A82425925F3]').closest('div').data('value');
    satisCevrildimi = String.isNullOrWhiteSpace(satisCevrildimi) ? false : toBool(satisCevrildimi);

    var urunRecordId = $('#RecordPublicId').val();
    var currentCustomObjectId = $("#CustomObjectPublicId").val();
    if (!satisCevrildimi) {
        var durum = $("label[for=9C33EE79A8294DECB329827D5D661319]").closest('div').data('publicids');
        if (durum === "A05F1EC4CFD64368BA9CA7B723AA6A53" || durum === "27D97C7DFAA748CBB5E743F5E1634E45" || durum === "5558D703006A4D92AD704F041B95C703") {
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
        }

        function iframe() {
            $("#modalSatisaCevir .modal-body").html("<iframe src='/set/new/arsa-satislari?pageLayoutId=3CFCF1ADFB494F2E92268A1BD60AE4D1' id='frameSatisaCevir' style='width:100%;height:700px;border:none;' frameborder='0'></iframe>");
            var proje = $('label[for=C768EE91B2414605BB417EC0D3C15AD0]').closest('div'),
                projeAdi = proje.data('value'),
                projeId = proje.data('publicids'),
                projeTipi = $('label[for=252B13F94FC7485ABC34FE8155253821]').closest('div'),
                projeTipiAdi = projeTipi.data('value'),
                projeTipiId = projeTipi.data('publicids');

            var newProjeTipiId = "";
            if (projeTipiId == "C3700F4BF63C4687A97531B5533D2AB1") {
                //arsa
                newProjeTipiId = "84CDE8C51FE347A995ED3F2B97140965";
            } else if (projeTipiId == "A9EA28D1C2DF42C1986AA798C40C165C") {
                //konut
                newProjeTipiId = "A6B8EE8F2C0B427B98390ECC040AD133";
            } else if (projeTipiId == "6BEB7644266D4CF7B412E0ED6828DB36") {
                //devremulk
                newProjeTipiId = "97B3178CA8D14BE888121C39F65DE9B8";
            }
            var recordId = "";
            $('#frameSatisaCevir').on("load", function() {

                recordId = $("#frameSatisaCevir").contents().find('#RecordPublicId').val();
                var customObjectId = $("#frameSatisaCevir").contents().find('#CustomObjectPublicId').val();
                if (!String.isNullOrWhiteSpace(recordId) && customObjectId === "DDF9378A6DF14348BC574C3DCE4A63E2") {
                    $.get("https://nefwebapi.setcrm.com/api/data/UrunSatisaCevrildi", {
                        urunId: urunRecordId,
                        satisId: recordId
                    }, function() {});
                }

                if (customObjectId === "DDF9378A6DF14348BC574C3DCE4A63E2") {
                    $('.btn-prev').hide();
                } else {
                    $('.btn-prev').prop('disabled', false).show();
                }

                $("#frameSatisaCevir").contents().find('#navbarmenu,  #btn_save_and_new, footer').remove();
                // $("#frameSatisaCevir").contents().find('.well-xxs:first').hide();
                $("#frameSatisaCevir").contents().find('body').attr("style", "padding-top:0 !important");
                $("#frameSatisaCevir").contents().find('body').append(String.format('<script>$("#AB38D08A4C104CE5B0B842D1DF29E48B").select2("data", {id:"{0}", text:"{1}"}).trigger("change");$("#F1EE94ECDE124EA09D919332621C712A").select2("data", {id:"{2}", text:"{3}"}).trigger("change")<\/script>', projeId, projeAdi, newProjeTipiId, projeTipiAdi));
                if (newProjeTipiId == "84CDE8C51FE347A995ED3F2B97140965") {
                    //arsa
                    var arsa = $('label[for=AD35CF146D7F49A597B4BADD0728C401]').closest('div'),
                        arsaId = arsa.data('publicids'),
                        arsaText = arsa.data('value');
                    if (!String.isNullOrWhiteSpace(arsaId) && !String.isNullOrWhiteSpace(arsaText)) {
                        $("#frameSatisaCevir").contents().find('body').append(String.format('<script>$("#FC5EAC3CB09D487E850F12A76589CC25").select2("data", {id:"{0}", text:"{1}"}).trigger("change");<\/script>', arsaId, arsaText));
                    }

                    var parsel = $('label[for=683B097A28E14833BAFE05FFF1A99935]').closest('div'),
                        parselId = parsel.data('publicids'),
                        parselText = parsel.data('value');
                    if (!String.isNullOrWhiteSpace(parselId) && !String.isNullOrWhiteSpace(parselText)) {
                        $("#frameSatisaCevir").contents().find('body').append(String.format('<script>$("#7D349DBF43D74CC787A0553AE78DABF3").select2("data", {id:"{0}", text:"{1}"}).trigger("change");<\/script>', parselId, parselText));
                    }

                    var arsa2 = $('label[for=C5810546A9B34DB78520B37CC9C87F62]').closest('div'),
                        arsa2Id = arsa2.data('publicids'),
                        arsa2Text = arsa2.data('value');
                    if (!String.isNullOrWhiteSpace(arsa2Id) && !String.isNullOrWhiteSpace(arsa2Text)) {
                        $("#frameSatisaCevir").contents().find('body').append(String.format('<script>$("#0A0066A1E992451BBBAB6732A8318B60").select2("data", {id:"{0}", text:"{1}"}).trigger("change");<\/script>', arsa2Id, arsa2Text));
                    }

                    var hisse = $('label[for=5CDE92627AEE43E7B76E9CB11ED00746]').closest('div'),
                        hisseText = hisse.data('value'),
                        hisseId = hisse.data('publicids');
                    if (!String.isNullOrWhiteSpace(hisseText)) {
                        $("#frameSatisaCevir").contents().find('body').append(String.format('<script>$("#8C1A9BB4F56E4B1FA7A18A0BADC6783A").select2("data", {id:"{0}", text:"{1}"}).trigger("change");<\/script>', urunRecordId, hisseText));
                    }

                } else if (newProjeTipiId == "A6B8EE8F2C0B427B98390ECC040AD133" || newProjeTipiId == "97B3178CA8D14BE888121C39F65DE9B8") {
                    //konut & devremulk

                    var kat = $('label[for=7B3CBAF907D9430BB9C710A4D94987BB]').closest('div').data('value');
                    var daire = $('label[for=40EAE78930B1428DBB08FC708109466B]').closest('div').data('value');
                    var odasayisi = $('label[for=ED77ED828D2340ACA4EE98BBA4BA297C]').closest('div').data('value');
                    var banyosayisi = $('label[for=F2D62A70B8014BFB98EC4FC665E154FA]').closest('div').data('value');
                    var cephe = $('label[for=7E42D1F91C574CC1B99500232A408F58]').closest('div').data('value');
                    var blok = $('label[for=AB07D1F36566496B89CAFFD560801D50]').closest('div').data('value');
                    var brutnm2 = $('label[for=7EB7F65FC2BC4EDAB97E627857FFE658]').closest('div').data('value');

                    $("#frameSatisaCevir").contents().find('body').append(String.format('<script>$(function(){$("#85BBECBE354D47F78351E5F95685AB4B").val("{0}");$("#B7D74A090DB04F84AB4F7C212B47D992").val("{1}");$("#2ABEE0F1AE9D4AE3881E90DE0A5300BF").val("{2}");$("#E5C7C045D11C4417A206941D7AED367E").val("{3}");$("#866F87E3200B47478F9FE9B2A1E66BF5").val("{4}");$("#FB97DA1F2A2643E0AF43476805BABB09").val("{5}");});<\/script>', odasayisi, brutnm2, kat, daire, banyosayisi, cephe));

                    var listeFiyati = $('label[for=46DB5FD922A44F2CBBEA20D9E3098B77]').closest('div').data('value');
                    var satisFiyati = $('label[for=4F02F3B57D784AA0AEADAD2824BDC96E]').closest('div').data('value');
                    var satisPesinatOrani = $('label[for=259F9CF8F0B34F5F96631FA6CEAEE49A]').closest('div').data('value');
                    var pesinat = $('label[for=3A1CBC755B884994B8C0376DF22AC530]').closest('div').data('value');
                    var vadeyeBolunecekTutar = $('label[for=7A03D14401B24BF9B52A6E6B16F27CF1]').closest('div').data('value');

                    $("#frameSatisaCevir").contents().find('body').append(String.format('<script>$(function(){$("#050D19DE706A41C1A3F0A6E636B11587").val("{0}");$("#B7E08083E97B46CFBE5CD657691D7CB1").val("{1}");$("#9D1CAE36E83B413C8619735A40E676CE").val("{2}");$("#5C96C1CE429041F9BAD876A5728C970C").val("{3}");$("#BA6D3B1D05CE47708D9FE811B55EE61B").val("{4}");});<\/script>', listeFiyati, satisFiyati, satisPesinatOrani, pesinat, vadeyeBolunecekTutar));
                }
            });
        }
    }
});