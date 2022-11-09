$(function() {
    var filterId = window.location.href.split('filter=')[1];
    var recordId;
    if ($('#clearAdHocFilter').length > 0) {
        var dataViewFilterId = $('#clearAdHocFilter').data('viewfilterpublicid');

        if ((filterId.contains('84620E952CBE4698BB295FDB61C001F9') || dataViewFilterId.contains('84620E952CBE4698BB295FDB61C001F9')) || !(window.location.href.contains('filter')) || (filterId.contains('5D7E7F6B58BB4B379C654FFBDAEC54AB')) || dataViewFilterId.contains('5D7E7F6B58BB4B379C654FFBDAEC54AB')) {
            $(".table-responsive table tbody tr").each(function(i, v) {
                $(v).find('td:last').prepend("<a class='btn btn-primary btn-actions btn-sm btnKartKopyala' style='background-color: #7a378b; border-color: #7a378b;' type='button'><i class='fa fa-copy'></i></button>");
            });
        }
    } else {
        if (filterId.contains('84620E952CBE4698BB295FDB61C001F9') || !(window.location.href.contains('filter')) || filterId.contains('5D7E7F6B58BB4B379C654FFBDAEC54AB')) {
            $(".table-responsive table tbody tr").each(function(i, v) {
                $(v).find('td:last').prepend("<a class='btn btn-primary btn-actions btn-sm btnKartKopyala' style='background-color: #7a378b; border-color: #7a378b;' type='button'><i class='fa fa-copy'></i></button>");
            });
        }
    }

    var createCORSRequestModel = function(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            // Most browsers.
            xhr.open(method, url, true);
        } else if (typeof XDomainRequest != "undefined") {
            // IE8 & IE9
            xhr = new XDomainRequest();
            xhr.open(method, url);
        } else {
            // CORS not supported.
            xhr = null;
        }
        return xhr;
    };
    $('body').on('click',
        '.btnKartKopyala ',
        function() {
            recordId = $(this).parents('tr').data('id');
            $('#modalCopy').remove();
            window.setModal.Create({
                id: 'modalCopy',
                html: {
                    header: 'Kart Cihazı Kopyala',
                    body: '<div id="txt" style="margin:0 auto;width: 100%;color:black">Sayfa yükleniyor, lütfen bekleyiniz...<br/> <img src="/Public/img/loading_bar.gif"></div>',
                    footer: '<button type="button" class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>',
                },
            });
            $('#modalCopy').modal('toggle');
            // ?iframe=true&tipId={0}&tip
            $('#modalCopy .modal-body').append(String.format('<iframe src="/set/new/kalibrasyon-cihaz-karti" frameborder="0" style="overflow: hidden;height:{0}px;width:100%;display:none;" height="800px" width="100%"></iframe>', $(window).height() - 50));
            // var model = {
            //     Tip : { id : "C942CE26FEEF40FB8EBB5820A51745A4", text : "18,6 Nm" },
            //     Akreditasyon : { id : "FC89F4AC012C4B48B63FF4D9D449DA49", text : "Hayır" },
            //     CihazGrup : { id : "", text : "" },
            //     Status : { id : "FA8AD74181A14C779E846E0FE2DF0157", text : "Kullanımda" },
            //     Aktif : { id : "155BF4B98E7544E4B1307A008AAD0242", text : "Aktif" },
            //     CihazKonum :  { id : "9F69886C3CD84472B4EB50C2F2B0D291", text : "00 - Belirsiz" },
            //     Dahili : { id : "06B711E274AC4F888A748F7D9BB25DD4", text : "Dahili" },
            //     KalibrasyonFirma : { id : "6B4BC98C28334B0885757E4301809B69", text : "PETES" },
            //     Marka : "ssd",
            //     Model : "asd",
            //     KapasiteDegerleri : kapasiteDegerList
            // };
            $('iframe').on('load', function() {
                var recordFrameId = $('iframe').contents().find('#RecordPublicId').val();
                $('iframe').contents().find('footer').hide();
                if (!String.isNullOrWhiteSpace(recordFrameId)) {
                    window.open(String.format('/set/kalibrasyon-cihaz-karti/detail/{0}?pageLayoutId=98341E38B9E142DB8F9D36DADE9B6DE4&isForward=True', recordFrameId), '_blank');
                    $('#modalCopy').modal('toggle');
                    window.location.reload();
                }
                var apiFormLinkUrlForLocal = "http://localhost:60643/api/data/GetKartBilgileri?recordId=" + recordId;
                var apiFormLinkUrlForReal = "https://webapi-inklab.tr152.corpintra.net/api/data/GetKartBilgileri?recordId=" + recordId;
                var method = 'GET';
                var xhr = createCORSRequestModel(method, apiFormLinkUrlForReal);
                xhr.onload = function(r) {
                    let response = JSON.parse(r.srcElement.response);
                    if (response.Status) {
                        var model = response.Model;

                        $('#modalCopy #txt').hide();
                        $("#modalCopy .modal-dialog").animate({
                            width: "98%",
                        }, 400);
                        //if (!String.isNullOrWhiteSpace(model.Tip.id)) {
                        //$('iframe').contents().find('body').append('<script>$("#s2id_D02FEF288528491EB0839BCEFD989D76").select2("data", {id:"' + model.Tip.id + '", text:"' + model.Tip.text + '"});<\/script>');
                        //}
                        if (!String.isNullOrWhiteSpace(model.CihazGrup.id)) {
                            $('iframe').contents().find('body').append('<script>$("#s2id_EBC03D56372548BA89A96DF7CED390E4").select2("data", {id:"' + model.CihazGrup.id + '", text:"' + model.CihazGrup.text + '"})<\/script>');
                        }
                        if (!String.isNullOrWhiteSpace(model.Akreditasyon.id)) {
                            $('iframe').contents().find('body').append('<script>$("#s2id_2E957529032746D4ADED3BC6840A14E6").select2("data", {id:"' + model.Akreditasyon.id + '", text:"' + model.Akreditasyon.text + '"})<\/script>');
                        }
                        if (!String.isNullOrWhiteSpace(model.Status.id)) {
                            $('iframe').contents().find('body').append(String.format('<script>$("#s2id_FA8AD74181A14C779E846E0FE2DF0157").select2("data", {id:"{0}", text:"{1}"})<\/script>', model.Status.id, model.Status.text));
                        }
                        if (!String.isNullOrWhiteSpace(model.Aktif.id)) {
                            $('iframe').contents().find('body').append(String.format('<script>$("#s2id_1105BB24AE49422F83D26E9C78057EEC").select2("data", {id:"{0}", text:"{1}"})<\/script>', model.Aktif.id, model.Aktif.text));
                        }
                        if (!String.isNullOrWhiteSpace(model.CihazKonum.id)) {
                            $('iframe').contents().find('body').append(String.format('<script>$("#s2id_6434502A462D41E0B1BC84CB00B0EC58").select2("data", {id:"{0}", text:"{1}"})<\/script>', model.CihazKonum.id, model.CihazKonum.text));
                        }
                        if (!String.isNullOrWhiteSpace(model.Dahili.id)) {
                            $('iframe').contents().find('body').append(String.format('<script>$("#s2id_740F3F9AA4D740DDA7375D1AB71A4E6E").select2("data", {id:"{0}", text:"{1}"})<\/script>', model.Dahili.id, model.Dahili.text));
                        }
                        if (!String.isNullOrWhiteSpace(model.KalibrasyonFirma.id)) {
                            $('iframe').contents().find('body').append(String.format('<script>$("#s2id_6868AB9F12A24DB8A5BDC5CCED6AA506").select2("data", {id:"{0}", text:"{1}"})<\/script>', model.KalibrasyonFirma.id, model.KalibrasyonFirma.text));
                        }
                        if (!String.isNullOrWhiteSpace(model.MasrafYeri.id)) {
                            $('iframe').contents().find('body').append(String.format('<script>$("#s2id_B3864F30E4D84505B8E0ECC2D74C1112").select2("data", {id:"{0}", text:"{1}"})<\/script>', model.MasrafYeri.id, model.MasrafYeri.text));
                            $('iframe').contents().find('body').append('<script>$("#B3864F30E4D84505B8E0ECC2D74C1112").trigger("change")<\/script>');
                        }
                        if (!String.isNullOrWhiteSpace(model.Marka)) {
                            $('iframe').contents().find('#09DFBA2FBB1945249C4B31694B952096').val(model.Marka);
                        }
                        if (!String.isNullOrWhiteSpace(model.Model)) {
                            $('iframe').contents().find('#4225FDB790CD4D82B2403C18908D4563').val(model.Model);
                        }
                        // if (!String.isNullOrWhiteSpace(model.AletTanimi)) {
                        //     $('iframe').contents().find('#53BA8CE3AFBE47C49F789C8D47ABCC17').val(model.AletTanimi);
                        // }
                        // if (!String.isNullOrWhiteSpace(model.Periyot)) {
                        //     $('iframe').contents().find('#CBB19FAFD34949AA96A5A988F81C43A7').val(model.Periyot);
                        // }


                        if (model.KapasiteDegerleri.length > 0) {
                            $.each(model.KapasiteDegerleri, function(i, v) {
                                $('iframe').contents().find('#B4EE6E43453044C88D8CE63A54214F1E').val(v.MinOlcu);
                                $('iframe').contents().find('#B3679B5C6B8D4D59A4A902CB146A025A').val(v.MaxOlcu);
                                $('iframe').contents().find('#808664B6E4514596946224E4BBE66ECD').val(v.Cozunurluk);
                                $('iframe').contents().find('body').append(String.format('<script>$("#s2id_B31A00DA75DB4800AE59E841B098B9F0").select2("data", {id:"{0}", text:"{1}"})<\/script>', v.BirimId, v.Birim));
                                $('iframe').contents().find('body').append('<script>$(".add-row").trigger("click")<\/script>');
                            });
                        }
                        $('iframe').show();
                        $('iframe').contents().find('body').css('padding-top', 0);
                        $('iframe').contents().find('#navbarmenu, .well-xxs:first').remove();
                        $('iframe').contents().find('#btnMenuAc').remove();
                    } else {
                        $('#modalCopy .modal-body').html(r.Message);
                    }
                };
                // if (r.srcElement.response.length > 2) {
                //     //  hata var
                //     $('#modaluyari1 .modal-body #txt').html('');
                //     $('#modaluyari1 .modal-body #txt').html(r.srcElement.response);
                // } else {
                //     window.location.reload();
                // }
                xhr.onerror = function(r) {
                    debugger;
                    $('#modalCopy .modal-body').html("Hata Oluştu : " + r.srcElement.response);
                };
                xhr.send();

            });
        });
});