$(function() {
    $('.row:eq(0)').parent().prepend('<a id="btnMenuAc" class="btn btn-xs btn-primary" style="position:absolute;z-index: 99;"><i class="fa fa-arrow-circle-right" aria-hidden="true"></i></a>');
    $('.row:eq(0)').parent().prepend('<a class="btn btn-xs btn-warning btn-refresh" style="position:absolute;z-index: 99;margin-top:30px"><i class="fas fa-sync"></i> <b class="lastUpdatedDate" style="display:none">Son güncelleme <label id="minutes">00</label> dakika <label id="seconds">00</label> saniye önce</b></a>');
    $('#btnMenuAc').on('click', function() {
        $('.well-xxs').toggle();
    });
    $('.well-xxs').toggle();

    var intervalId = "";

    function timer() {
        var minutesLabel = document.getElementById("minutes");
        var secondsLabel = document.getElementById("seconds");
        var totalSeconds = 0;
        clearInterval(intervalId);
        intervalId = setInterval(setTime, 1000);

        function setTime() {
            ++totalSeconds;
            secondsLabel.innerHTML = pad(totalSeconds % 60);
            minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60), true);
        }

        function pad(val, isMinutes) {
            var valString = val + "";
            if (valString.length < 2 && !isMinutes) {
                return "0" + valString;
            } else {
                return valString;
            }
        }
    }

    var loadingBlockHtml = '<div style="margin:15px auto;text-align: center;" class="spinner-notifications"> <div class="spinner-grow spinner-grow-lg text-danger" role="status"> <span class="sr-only"></span> </div><div class="spinner-grow spinner-grow-lg text-warning" role="status"> <span class="sr-only"></span> </div><div class="spinner-grow spinner-grow-lg text-success" role="status"> <span class="sr-only"></span> </div><br><b style="font-size:15px;letter-spacing:1px;font-weight:normal;">Yükleniyor, Lütfen bekleyiniz...</b> </div>';
    $('.btn-refresh').on('click', function() {
        $("table tbody tr:not(.loading-block)").remove();
        $('.loading-block').show().find('td').html(loadingBlockHtml);
        refresh();
    });

    function turkishLanguagePriceFormatedOutput(price) {
        //metoda gelicek değerin , kısımların replace edilip gönderilmesi gerekiyor. /,/g kısmı , replace ediyorum.
        var oldPrice = price;
        if (String.isNullOrWhiteSpace(price)) {
            price = "0";
        }

        var currency_symbol = "₺";
        var formattedOutput = new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'TRY',
            minimumFractionDigits: 2,
        });

        return isNaN(price) ? oldPrice : formattedOutput.format(price).replace(currency_symbol, '');
    }

    $.getScript('/public/plugins/select2/select2.min.js').done(function() {});

    $('body').on('click', '.btn-call', function() {
        $('#modalCall').remove();
        window.setModal.Create({
            id: 'modalCall',
            html: {
                header: '<i class="fa fa-phone"></i> Arama Başlat',
                body: String.format('<style>.call-animation{background:#fff;width:135px;text-align: center;font-size: 16px;height:135px;position:relative;margin:0 auto;border-radius:100%;border:solid 5px #88c149;animation:play 2s ease infinite;-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden;-ms-backface-visibility:hidden;backface-visibility:hidden}.call-animation i{font-size: 44px;display: flex;justify-content: center;margin-top: 18px;padding-bottom: 9px;}@keyframes play{0%{transform:scale(1)}15%{box-shadow:0 0 0 5px #88c149}25%{box-shadow:0 0 0 10px #88c149,0 0 0 20px #88c149}25%{box-shadow:0 0 0 15px #88c149,0 0 0 30px #88c149}}</style><div class="call-animation"><i class="fa fa-mobile-alt img-circle"></i><text id="callling">Aranıyor...</text></div><div class="well" style="margin-top:20px"><label class="form-label" id="musteriAdiveSoyadi"></label><br><label class="form-label">Metin Seçiniz</label><br> <div id="selectText"></div></div><div class="well" style="margin-top:5px;display:none;" id="metinBox"></div>'),
                footer: ''
            },
            settings: {
                widthClass: 'modal-full-width'
            }
        });

        var table = $(this).closest('table'),
            searchIndex = table.find('thead input').data('searchindex'),
            adSoyad = $(this).closest('tr').find(String.format('td:eq({0})', searchIndex)).text(),
            recordPublicId = $(this).closest('tr').data('id');

        if (recordPublicId == "") {
            return;
        }

        $('#musteriAdiveSoyadi').html('<b class="badge badge-warning">' + adSoyad + '</b> adlı müşteriyi aramaktasınız.');
        $('#modalCall').modal({
            backdrop: 'static',
            keyboard: false
        });

        var urlCall = "https://nefwebapi.setcrm.com/api/data/Call?recordId=" + recordPublicId + "&userId=" + userData.id;
        $.get(urlCall, "", function(r) {
            if (r.Status) {
                $('#callling').text('Çağrı iletildi.')
            } else {
                $('#calling').text(r.Message);
            }
        });

        var url = 'https://nefwebapi.setcrm.com/api/data/VfOkuma?coId=30A754759225463894FA7132F494C7E5&vfId=E1730FE4479449538AA52AC355B9B656';
        var localUrl = 'https://localhost:44305/api/data/VfOkuma?coId=30A754759225463894FA7132F494C7E5&vfId=E1730FE4479449538AA52AC355B9B656';

        var xx = [];
        $.get(url,
            function(r) {
                if (r.IsOk) {
                    $.each(r.Records, function(i, v) {
                        var projeId = String.newGuid(),
                            proje = v.Values.first('FieldPublicId', 'A05105B1F3914F048180C5CC9EA95D88').Value,
                            projeBilgilendirmeMetni = v.Values.first('FieldPublicId', 'E561D54F253447E3B98C1143B38D303A').Value;

                        xx.push({
                            id: projeId,
                            text: proje,
                            metin: projeBilgilendirmeMetni
                        });
                    });
                    prepareSelect2WithData('#selectText', xx, false);
                }
            });

        $('#selectText').on('change',
            function() {
                if (String.isNullOrWhiteSpace($(this).val())) {
                    $('#metinBox').hide();
                } else {
                    $('#metinBox').html($.parseHTML($('#selectText').select2('data').metin)[0]['wholeText']).show();
                }
            });
    });

    $(".search-table").on("keyup",
        function() {
            var value = $(this).val().toLowerCase();
            var searchIndex = $(this).data('searchindex');
            var selector = $(this).data('selector');
            $(selector).filter(function() {
                $(this).toggle($(this).find(String.format('td:eq({0})', searchIndex)).text().trim().toLowerCase().indexOf(value) > -1);
            });
        });

    $('body').on('click', '.btn-primary[title="Görüntüleme"]', function() {
        var href = $(this).data('href');

        $('#modalDetail').remove();
        window.setModal.Create({
            id: 'modalDetail',
            html: {
                header: 'Detay',
                body: String.format("<div style='margin:15px auto;text-align: center;' id='spinner'><div class='spinner-grow spinner-grow-lg text-danger' role='status'><span class='sr-only'></span></div><div class='spinner-grow spinner-grow-lg text-warning' role='status'><span class='sr-only'></span></div><div class='spinner-grow spinner-grow-lg text-success' role='status'><span class='sr-only'></span></div><br><b style='font-size:15px;letter-spacing:1px;font-weight:normal;'>Yükleniyor, Lütfen bekleyiniz...</b></div><div style='padding-left: 15px;'></div><iframe src='{0}' id='frameDetail' style='width:100%;height:{1}px;border:none;display:none;' frameborder='0'></iframe>", href, window.innerHeight - 200),
                footer: '<button type="button" class="btn btn-sm btn-default btn-close2-custom-modal" data-dismiss="modal">Kapat</button>'
            },
            settings: {
                widthClass: 'modal-full-width'
            }
        });

        $('#frameDetail').on("load",
            function() {
                if (!String.isNullOrWhiteSpace($("#frameDetail").contents().find('#RecordPublicId').val())) {}
                $('#modalDetail').find('.modal-body').css('padding', '0');
                $('#frameDetail').show();
                $('#spinner').remove();
                $("#frameDetail").contents().find('#navbarmenu').remove();
                $("#frameDetail").contents().find('footer').hide();
                $("#frameDetail").contents().find('body').attr("style",
                    "padding-top:0 !important");
            });

        $('#modalDetail').modal({
            backdrop: 'static',
            keyboard: false
        });
    });

    $('body').on('click', '.edit-row', function() {
        var href = $(this).data('href');

        $('#modalEdit').remove();
        window.setModal.Create({
            id: 'modalEdit',
            html: {
                header: 'Güncelle',
                body: String.format("<div style='margin:15px auto;text-align: center;' id='spinner'><div class='spinner-grow spinner-grow-lg text-danger' role='status'><span class='sr-only'></span></div><div class='spinner-grow spinner-grow-lg text-warning' role='status'><span class='sr-only'></span></div><div class='spinner-grow spinner-grow-lg text-success' role='status'><span class='sr-only'></span></div><br><b style='font-size:15px;letter-spacing:1px;font-weight:normal;'>Yükleniyor, Lütfen bekleyiniz...</b></div><div style='padding-left: 15px;'></div><iframe src='{0}' id='frameEdit' style='width:100%;height:{1}px;border:none;display:none;' frameborder='0'></iframe>", href, window.innerHeight - 200),
                footer: '<button type="button" class="btn btn-sm btn-default btn-close2-custom-modal" data-dismiss="modal">Kapat</button>'
            },
            settings: {
                widthClass: 'modal-full-width'
            }
        });

        $('#frameEdit').on("load",
            function() {
                if (!String.isNullOrWhiteSpace($("#frameEdit").contents().find('#RecordPublicId').val())) {}
                $('#modalEdit').find('.modal-body').css('padding', '0');
                $('#frameEdit').show();
                $('#spinner').remove();
                $("#frameEdit").contents().find('#navbarmenu').remove();
                $("#frameEdit").contents().find('footer').hide();
                $("#frameEdit").contents().find('body').attr("style",
                    "padding-top:0 !important");
            });

        $('#modalEdit').modal({
            backdrop: 'static',
            keyboard: false
        });
    });

    refresh();

    function refresh() {
        timer();
        $('.tfoot').hide();

        //Yeni Leadler
        $.get(String.format("https://nefwebapi.setcrm.com/api/data/VfOkuma?coId={0}&vfId={1}",
                "133335DAB87346F1B2A6AF043F82FC6A",
                "7906289C5D614F8384EFE9A1D9F79CA8"),
            "",
            function(r) {
                if (r.IsOk) {
                    if (r.Records.length > 0) {
                        $("#yeni_leads").closest('table').find('.tfoot tr td').html('Toplam ' + r.Records.length + " kayıt");
                        $("#yeni_leads tr:first").hide();
                        $.each(r.Records, function(i, v) {
                            var newRow = $('<tr/>', {
                                    "data-id": v.PublicId
                                }),
                                olusturulmaTarihi = v.Values.first('FieldPublicId', 'BF4467135D5245E8B6AF3D312C430FA7'),
                                proje = v.Values.first('FieldPublicId', 'E54A861EAE3646BDB6BE309C8C783BC0'),
                                musteriAdayi = v.Values.first('FieldPublicId', '388BDB8901654D97A5CDEBE871F84C2F'),
                                utm = v.Values.first('FieldPublicId', 'DB89784B2DE745C591067DE24E49B361'),
                                leadVK = v.Values.first('FieldPublicId', '71F6907724CD4081A77A393E213C5DBE'),
                                il = v.Values.first('FieldPublicId', 'A6BC1937559448288CF226C081E32DF8');

                            newRow.append($("<td/>").text(olusturulmaTarihi != null ? olusturulmaTarihi.Value.split(' ')[0] : '-')).append($("<td/>").text(proje != null ? proje.Value : '')).append($("<td/>").text(musteriAdayi != null ? musteriAdayi.Value : '-')).append($("<td/>").text(utm != null ? utm.Value : '-')).append($("<td/>").text(leadVK != null ? leadVK.Value : '-')).append($("<td/>").text(il != null ? il.Value : '-')).append($("<td/>").html('<a class="btn  btn-primary btn-actions btn-xs" data-href="/set/lead/detail/' + v.PublicId + '" title="Görüntüleme"><i class="fas fa-external-link-alt"></i></a><a class="btn btn-warning btn-actions btn-xs edit-row" data-href="/set/lead/edit/' + v.PublicId + '" title="Güncelle"><i class="fas fa-edit"></i></a>'));

                            $("#yeni_leads").append(newRow);
                            $("#yeni_leads").closest('div').find('.tfoot').show();
                        });
                    } else {
                        $("#yeni_leads tr:first td").html('');
                        setUtil.alert({
                            container: '#yeni_leads tr:first td',
                            message: "Kayıt bulunamadı.",
                            alertClass: 'alert-warning',
                            autoClose: false
                        });
                    }
                } else {
                    $("#yeni_leads tr:first td").html('');
                    setUtil.alert({
                        container: '#yeni_leads tr:first td',
                        message: "Kayıt bulunamadı.",
                        alertClass: 'alert-warning',
                        autoClose: false
                    });
                }
            });

        //Tekrar Aranacaklar
        $.get(String.format("https://nefwebapi.setcrm.com/api/data/VfOkuma?coId={0}&vfId={1}", "542C60816E884E958D0B7D2B379D79F2", "815DECADD7064B6787B3703D3ADB90F6"),
            "",
            function(r) {
                if (r.IsOk) {
                    if (r.Records.length > 0) {
                        $("#tekrar_aranacaklar").closest('table').find('.tfoot tr td').html('Toplam ' + r.Records.length + " kayıt");
                        $("#tekrar_aranacaklar tr:first").hide();
                        $.each(r.Records, function(i, v) {
                            var newRow = $('<tr/>', {
                                    "data-id": v.PublicId
                                }),
                                olusturulmaTarihi = v.Values.first('FieldPublicId', 'DEA0F897431642C88AD834166BC68C41'),
                                ilkAranmaTarihi = v.Values.first('FieldPublicId', '95676950E8734638949B01B1C5173EE1'),
                                tekrarAramaTarih = v.Values.first('FieldPublicId', 'A5E9B5085E234217977BFE304741C0C6'),
                                proje = v.Values.first('FieldPublicId', '1922A54CBA2549FDA8163EE182E400E0'),
                                musteriAdayi = v.Values.first('FieldPublicId', '692C6197C07F4B8A840046432C57F0D6'),
                                leadVeriKaynagi = v.Values.first('FieldPublicId', 'D91E54C73FE34219B3FF1A2E53539D18'),
                                utm = v.Values.first('FieldPublicId', 'A38BE9ED1CBF43E387648CE75959B60F'),
                                il = v.Values.first('FieldPublicId', '2AEA8C9F9C674C8AA72FD971421E30E3');

                            newRow.append($("<td/>").text(olusturulmaTarihi != null ? olusturulmaTarihi.Value : '-')).append($("<td/>").text(ilkAranmaTarihi != null ? ilkAranmaTarihi.Value : '-')).append($("<td/>").text(tekrarAramaTarih != null ? tekrarAramaTarih.Value : '-')).append($("<td/>").text(proje != null ? proje.Value : '-')).append($("<td/>").text(musteriAdayi != null ? musteriAdayi.Value : '-')).append($("<td/>").text(leadVeriKaynagi != null ? leadVeriKaynagi.Value : '-')).append($("<td/>").text(utm != null ? utm.Value : '-')).append($("<td/>").text(il != null ? il.Value : '-')).append($("<td/>").html(' <a class="btn btn-primary btn-actions btn-xs" data-href="/set/aktivite/detail/' + v.PublicId + '" title="Görüntüleme"><i class="fas fa-external-link-alt"></i></a><a class="btn btn-warning btn-actions btn-xs edit-row" data-href="/set/aktivite/edit/' + v.PublicId + '" title="Güncelle"><i class="fas fa-edit"></i></a><a type="button" class="btn btn-info btn-xs btn-call mt-1"><i class="fa fa-phone"></i></a>'));

                            $("#tekrar_aranacaklar").append(newRow);
                            $("#tekrar_aranacaklar").closest('div').find('.tfoot').show();
                        });
                    } else {
                        $("#tekrar_aranacaklar tr:first td").html('');
                        setUtil.alert({
                            container: '#tekrar_aranacaklar tr:first td',
                            message: "Kayıt bulunamadı.",
                            alertClass: 'alert-warning',
                            autoClose: false
                        });
                    }
                } else {
                    $("#tekrar_aranacaklar tr:first td").html('');
                    setUtil.alert({
                        container: '#tekrar_aranacaklar tr:first td',
                        message: "Kayıt bulunamadı.",
                        alertClass: 'alert-warning',
                        autoClose: false
                    });
                }
            });

        //Ulaşılamadı 1
        $.get(String.format("https://nefwebapi.setcrm.com/api/data/VfOkuma?coId={0}&vfId={1}", "542C60816E884E958D0B7D2B379D79F2", "5FFC7110A18347B686EAB2E1396704E0"),
            "",
            function(r) {
                if (r.IsOk) {
                    if (r.Records.length > 0) {
                        $("#ulasilamadi_1").closest('table').find('.tfoot tr td').html('Toplam ' + r.Records.length + " kayıt");
                        $("#ulasilamadi_1 tr:first").hide();
                        $.each(r.Records, function(i, v) {
                            var newRow = $('<tr/>', {
                                    "data-id": v.PublicId
                                }),
                                olusturulmaTarihi = v.Values.first('FieldPublicId', 'DEA0F897431642C88AD834166BC68C41'),
                                ilkAranmaTarihi = v.Values.first('FieldPublicId', '95676950E8734638949B01B1C5173EE1'),
                                tekrarAramaTarih = v.Values.first('FieldPublicId', 'A5E9B5085E234217977BFE304741C0C6'),
                                proje = v.Values.first('FieldPublicId', '1922A54CBA2549FDA8163EE182E400E0'),
                                musteriAdayi = v.Values.first('FieldPublicId', '692C6197C07F4B8A840046432C57F0D6'),
                                leadVeriKaynagi = v.Values.first('FieldPublicId', 'D91E54C73FE34219B3FF1A2E53539D18'),
                                utm = v.Values.first('FieldPublicId', 'A38BE9ED1CBF43E387648CE75959B60F'),
                                il = v.Values.first('FieldPublicId', '2AEA8C9F9C674C8AA72FD971421E30E3');

                            newRow.append($("<td/>").text(olusturulmaTarihi != null ? olusturulmaTarihi.Value : '-')).append($("<td/>").text(ilkAranmaTarihi != null ? ilkAranmaTarihi.Value : '-')).append($("<td/>").text(proje != null ? proje.Value : '-')).append($("<td/>").text(musteriAdayi != null ? musteriAdayi.Value : '-')).append($("<td/>").text(leadVeriKaynagi != null ? leadVeriKaynagi.Value : '-')).append($("<td/>").text(utm != null ? utm.Value : '-')).append($("<td/>").text(il != null ? il.Value : '-')).append($("<td/>").html(' <a class="btn btn-primary btn-actions btn-xs" data-href="/set/aktivite/detail/' + v.PublicId + '" title="Görüntüleme"><i class="fas fa-external-link-alt"></i></a><a class="btn btn-warning btn-actions btn-xs edit-row" data-href="/set/aktivite/edit/' + v.PublicId + '" title="Güncelle"><i class="fas fa-edit"></i></a><a type="button" class="btn btn-info btn-xs btn-call mt-1"><i class="fa fa-phone"></i></a>'));

                            $("#ulasilamadi_1").append(newRow);
                            $("#ulasilamadi_1").closest('div').find('.tfoot').show();
                        });
                    } else {
                        $("#ulasilamadi_1 tr:first td").html('');
                        setUtil.alert({
                            container: '#ulasilamadi_1 tr:first td',
                            message: "Kayıt bulunamadı.",
                            alertClass: 'alert-warning',
                            autoClose: false
                        });
                    }
                } else {
                    $("#ulasilamadi_1 tr:first td").html('');
                    setUtil.alert({
                        container: '#ulasilamadi_1 tr:first td',
                        message: "Kayıt bulunamadı.",
                        alertClass: 'alert-warning',
                        autoClose: false
                    });
                }
            });

        //Ulaşılamadı 2
        $.get(String.format("https://nefwebapi.setcrm.com/api/data/VfOkuma?coId={0}&vfId={1}", "542C60816E884E958D0B7D2B379D79F2", "90D2193126E743B896CE607CFA552F32"),
            "",
            function(r) {
                if (r.IsOk) {
                    if (r.Records.length > 0) {
                        $("#ulasilamadi_2").closest('table').find('.tfoot tr td').html('Toplam ' + r.Records.length + " kayıt");
                        $("#ulasilamadi_2 tr:first").hide();
                        $.each(r.Records, function(i, v) {
                            var newRow = $('<tr/>', {
                                    "data-id": v.PublicId
                                }),
                                olusturulmaTarihi = v.Values.first('FieldPublicId', 'DEA0F897431642C88AD834166BC68C41'),
                                ilkAranmaTarihi = v.Values.first('FieldPublicId', '95676950E8734638949B01B1C5173EE1'),
                                tekrarAramaTarih = v.Values.first('FieldPublicId', 'A5E9B5085E234217977BFE304741C0C6'),
                                proje = v.Values.first('FieldPublicId', '1922A54CBA2549FDA8163EE182E400E0'),
                                musteriAdayi = v.Values.first('FieldPublicId', '692C6197C07F4B8A840046432C57F0D6'),
                                leadVeriKaynagi = v.Values.first('FieldPublicId', 'D91E54C73FE34219B3FF1A2E53539D18'),
                                utm = v.Values.first('FieldPublicId', 'A38BE9ED1CBF43E387648CE75959B60F'),
                                il = v.Values.first('FieldPublicId', '2AEA8C9F9C674C8AA72FD971421E30E3');

                            newRow.append($("<td/>").text(olusturulmaTarihi != null ? olusturulmaTarihi.Value : '-')).append($("<td/>").text(ilkAranmaTarihi != null ? ilkAranmaTarihi.Value : '-')).append($("<td/>").text(proje != null ? proje.Value : '-')).append($("<td/>").text(musteriAdayi != null ? musteriAdayi.Value : '-')).append($("<td/>").text(leadVeriKaynagi != null ? leadVeriKaynagi.Value : '-')).append($("<td/>").text(utm != null ? utm.Value : '-')).append($("<td/>").text(il != null ? il.Value : '-')).append($("<td/>").html(' <a class="btn btn-primary btn-actions btn-xs" data-href="/set/aktivite/detail/' + v.PublicId + '" title="Görüntüleme"><i class="fas fa-external-link-alt"></i></a><a class="btn btn-warning btn-actions btn-xs edit-row" data-href="/set/aktivite/edit/' + v.PublicId + '" title="Güncelle"><i class="fas fa-edit"></i></a><a type="button" class="btn btn-info btn-xs btn-call mt-1"><i class="fa fa-phone"></i></a>'));

                            $("#ulasilamadi_2").append(newRow);
                            $("#ulasilamadi_2").closest('div').find('.tfoot').show();
                        });
                    } else {
                        $("#ulasilamadi_2 tr:first td").html('');
                        setUtil.alert({
                            container: '#ulasilamadi_2 tr:first td',
                            message: "Kayıt bulunamadı.",
                            alertClass: 'alert-warning',
                            autoClose: false
                        });
                    }
                } else {
                    $("#ulasilamadi_2 tr:first td").html('');
                    setUtil.alert({
                        container: '#ulasilamadi_2 tr:first td',
                        message: "Kayıt bulunamadı.",
                        alertClass: 'alert-warning',
                        autoClose: false
                    });
                }
            });

        //Ulaşılamadı 3
        $.get(String.format("https://nefwebapi.setcrm.com/api/data/VfOkuma?coId={0}&vfId={1}", "542C60816E884E958D0B7D2B379D79F2", "ADC7117039D64210AC480D68CE0EE29B"),
            "",
            function(r) {
                if (r.IsOk) {
                    if (r.Records.length > 0) {
                        $("#ulasilamadi_3 tr:first").hide();
                        $("#ulasilamadi_3").closest('table').find('.tfoot tr td').html('Toplam ' + r.Records.length + " kayıt");
                        $.each(r.Records, function(i, v) {
                            var newRow = $('<tr/>', {
                                    "data-id": v.PublicId
                                }),
                                olusturulmaTarihi = v.Values.first('FieldPublicId', 'DEA0F897431642C88AD834166BC68C41'),
                                ilkAranmaTarihi = v.Values.first('FieldPublicId', '95676950E8734638949B01B1C5173EE1'),
                                tekrarAramaTarih = v.Values.first('FieldPublicId', 'A5E9B5085E234217977BFE304741C0C6'),
                                proje = v.Values.first('FieldPublicId', '1922A54CBA2549FDA8163EE182E400E0'),
                                musteriAdayi = v.Values.first('FieldPublicId', '692C6197C07F4B8A840046432C57F0D6'),
                                leadVeriKaynagi = v.Values.first('FieldPublicId', 'D91E54C73FE34219B3FF1A2E53539D18'),
                                utm = v.Values.first('FieldPublicId', 'A38BE9ED1CBF43E387648CE75959B60F'),
                                il = v.Values.first('FieldPublicId', '2AEA8C9F9C674C8AA72FD971421E30E3');

                            newRow.append($("<td/>").text(olusturulmaTarihi != null ? olusturulmaTarihi.Value : '-')).append($("<td/>").text(ilkAranmaTarihi != null ? ilkAranmaTarihi.Value : '-')).append($("<td/>").text(proje != null ? proje.Value : '-')).append($("<td/>").text(musteriAdayi != null ? musteriAdayi.Value : '-')).append($("<td/>").text(leadVeriKaynagi != null ? leadVeriKaynagi.Value : '-')).append($("<td/>").text(utm != null ? utm.Value : '-')).append($("<td/>").text(il != null ? il.Value : '-')).append($("<td/>").html(' <a class="btn btn-primary btn-actions btn-xs" data-href="/set/aktivite/detail/' + v.PublicId + '" title="Görüntüleme"><i class="fas fa-external-link-alt"></i></a><a class="btn btn-warning btn-actions btn-xs edit-row" data-href="/set/aktivite/edit/' + v.PublicId + '" title="Güncelle"><i class="fas fa-edit"></i></a><a type="button" class="btn btn-info btn-xs btn-call mt-1"><i class="fa fa-phone"></i></a>'));

                            $("#ulasilamadi_3").append(newRow);
                            $("#ulasilamadi_3").closest('div').find('.tfoot').show();
                        });
                    } else {
                        $("#ulasilamadi_3 tr:first td").html('');
                        setUtil.alert({
                            container: '#ulasilamadi_3 tr:first td',
                            message: "Kayıt bulunamadı.",
                            alertClass: 'alert-warning',
                            autoClose: false
                        });
                    }
                } else {
                    $("#ulasilamadi_3 tr:first td").html('');
                    setUtil.alert({
                        container: '#ulasilamadi_3 tr:first td',
                        message: "Kayıt bulunamadı.",
                        alertClass: 'alert-warning',
                        autoClose: false
                    });
                }
            });

        //Randevularım
        $.get(String.format("https://nefwebapi.setcrm.com/api/data/GetDashboardFilterRecords?coId={0}&vfId={1}&userId={2}&userName={3}&filterFieldId={4}&operatorId={5}", "542C60816E884E958D0B7D2B379D79F2", "C862B81A6BE7409290D539781CF24E5B", userData.specificCode3, userData.name, "9F04A3ADD65248DB98E2A182AEA2BDFC", "00E35E3A9B7E414697EFF6661FFE0310"),
            "",
            function(r) {
                if (r.IsOk) {
                    if (r.Records.length > 0) {
                        $("#randevularim").closest('table').find('.tfoot tr td').html('Toplam ' + r.Records.length + " kayıt");
                        $("#randevularim tr:first").hide();
                        $.each(r.Records, function(i, v) {
                            var newRow = $('<tr/>', {
                                    "data-id": v.PublicId
                                }),
                                randevuTarihi = v.Values.first('FieldPublicId', '477EDB479DB44FABB26CD8BE8796418C'),
                                yatirimUzmani = v.Values.first('FieldPublicId', 'A3C3EBF4D2D548E08CD855290BD38012'),
                                randevuOfisi = v.Values.first('FieldPublicId', 'A7A4CE24D0A44122A5289DE318601602'),
                                randevuProjesi = v.Values.first('FieldPublicId', 'F212D00826734D6EB3DBD67F2F6AE6D1'),
                                musteriAdayi = v.Values.first('FieldPublicId', '692C6197C07F4B8A840046432C57F0D6'),
                                il = v.Values.first('FieldPublicId', '2AEA8C9F9C674C8AA72FD971421E30E3'),
                                teyit1 = v.Values.first('FieldPublicId', '48D9F47D79AD440384A867EE0D3EF735'),
                                teyit2 = v.Values.first('FieldPublicId', '6B530CA33A6A4C58A025BF1544C93674');

                            newRow.append($("<td/>").text(randevuTarihi != null ? randevuTarihi.Value : '-')).append($("<td/>").text(yatirimUzmani != null ? yatirimUzmani.Value : '-')).append($("<td/>").text(randevuOfisi != null ? randevuOfisi.Value : '-')).append($("<td/>").text(randevuProjesi != null ? randevuProjesi.Value : '-')).append($("<td/>").text(musteriAdayi != null ? musteriAdayi.Value : '-')).append($("<td/>").text(il != null ? il.Value : '-')).append($("<td/>").text(teyit1 != null ? teyit1.Value : '-')).append($("<td/>").text(teyit2 != null ? teyit2.Value : '-')).append($("<td/>").html(' <a class="btn btn-primary btn-actions btn-xs" data-href="/set/aktivite/detail/' + v.PublicId + '" title="Görüntüleme"><i class="fas fa-external-link-alt"></i></a><a class="btn btn-warning btn-actions btn-xs edit-row" data-href="/set/aktivite/edit/' + v.PublicId + '" title="Güncelle"><i class="fas fa-edit"></i></a><a type="button" class="btn btn-info btn-xs btn-call mt-1"><i class="fa fa-phone"></i></a>'));

                            $("#randevularim").append(newRow);
                            $("#randevularim").closest('div').find('.tfoot').show();
                        });
                    } else {
                        $("#randevularim tr:first td").html('');
                        setUtil.alert({
                            container: '#randevularim tr:first td',
                            message: "Kayıt bulunamadı.",
                            alertClass: 'alert-warning',
                            autoClose: false
                        });
                    }
                } else {
                    $("#randevularim tr:first td").html('');
                    setUtil.alert({
                        container: '#randevularim tr:first td',
                        message: "Kayıt bulunamadı.",
                        alertClass: 'alert-warning',
                        autoClose: false
                    });
                }
            });

        //Randevusuna Gelmeyenler
        $.get(String.format("https://nefwebapi.setcrm.com/api/data/VfOkuma?coId={0}&vfId={1}", "542C60816E884E958D0B7D2B379D79F2", "9396246695EA446C9C1CD6790AD8E782"),
            "",
            function(r) {
                if (r.IsOk) {
                    if (r.Records.length > 0) {
                        $("#randevusuna_gelmeyenler").closest('table').find('.tfoot tr td').html('Toplam ' + r.Records.length + " kayıt");
                        $("#randevusuna_gelmeyenler tr:first").hide();
                        $.each(r.Records, function(i, v) {
                            var newRow = $('<tr/>', {
                                    "data-id": v.PublicId
                                }),
                                randevuTarihi = v.Values.first('FieldPublicId', '477EDB479DB44FABB26CD8BE8796418C'),
                                yatirimUzmani = v.Values.first('FieldPublicId', 'A3C3EBF4D2D548E08CD855290BD38012'),
                                randevuOfisi = v.Values.first('FieldPublicId', 'A7A4CE24D0A44122A5289DE318601602'),
                                randevuProjesi = v.Values.first('FieldPublicId', 'F212D00826734D6EB3DBD67F2F6AE6D1'),
                                musteriAdayi = v.Values.first('FieldPublicId', '692C6197C07F4B8A840046432C57F0D6'),
                                leadVeriKaynagi = v.Values.first('FieldPublicId', 'D91E54C73FE34219B3FF1A2E53539D18'),
                                utm = v.Values.first('FieldPublicId', 'A38BE9ED1CBF43E387648CE75959B60F'),
                                il = v.Values.first('FieldPublicId', '2AEA8C9F9C674C8AA72FD971421E30E3');

                            newRow.append($("<td/>").text(randevuTarihi != null ? randevuTarihi.Value : '-')).append($("<td/>").text(yatirimUzmani != null ? yatirimUzmani.Value : '-')).append($("<td/>").text(randevuOfisi != null ? randevuOfisi.Value : '-')).append($("<td/>").text(randevuProjesi != null ? randevuProjesi.Value : '-')).append($("<td/>").text(musteriAdayi != null ? musteriAdayi.Value : '-')).append($("<td/>").text(leadVeriKaynagi != null ? leadVeriKaynagi.Value : '-')).append($("<td/>").text(utm != null ? utm.Value : '-')).append($("<td/>").text(il != null ? il.Value : '-')).append($("<td/>").html(' <a class="btn btn-primary btn-actions btn-xs" data-href="/set/aktivite/detail/' + v.PublicId + '" title="Görüntüleme"><i class="fas fa-external-link-alt"></i></a><a class="btn btn-warning btn-actions btn-xs edit-row" data-href="/set/aktivite/edit/' + v.PublicId + '" title="Güncelle"><i class="fas fa-edit"></i></a><a type="button" class="btn btn-info btn-xs btn-call mt-1"><i class="fa fa-phone"></i></a>'));

                            $("#randevusuna_gelmeyenler").append(newRow);
                            $("#randevusuna_gelmeyenler").closest('div').find('.tfoot').show();
                        });
                    } else {
                        $("#randevusuna_gelmeyenler tr:first td").html('');
                        setUtil.alert({
                            container: '#randevusuna_gelmeyenler tr:first td',
                            message: "Kayıt bulunamadı.",
                            alertClass: 'alert-warning',
                            autoClose: false
                        });
                    }
                } else {
                    $("#randevusuna_gelmeyenler tr:first td").html('');
                    setUtil.alert({
                        container: '#randevusuna_gelmeyenler tr:first td',
                        message: "Kayıt bulunamadı.",
                        alertClass: 'alert-warning',
                        autoClose: false
                    });
                }
            });

        //Satışlarım
        $.get(String.format("https://nefwebapi.setcrm.com/api/data/GetDashboardFilterRecords?coId={0}&vfId={1}&userId={2}&userName={3}&filterFieldId={4}&operatorId={5}", "EE7B2B2CDD97429399D39EF521B16ED9", "14492E3BF65545BD82179A90A53E3073", userData.specificCode3, userData.specificCode3, "F7FC8660000B4EF588E3E2992D291D4B", "62B97F15C15B85AF3880A1B4D18C21CD"),
            "",
            function(r) {
                if (r.IsOk) {
                    if (r.Records.length > 0) {
                        $("#satislarim").closest('table').find('.tfoot tr td').html('Toplam ' + r.Records.length + " kayıt");
                        $("#satislarim tr:first").hide();
                        $.each(r.Records, function(i, v) {
                            var newRow = $('<tr/>', {
                                    "data-id": v.PublicId
                                }),
                                satisTarihi = v.Values.first('FieldPublicId', 'E346E90C1EE74011AC4C87F15D02928E'),
                                yatirimUzmani = v.Values.first('FieldPublicId', 'B21F2B3C8FE74673AD9984CDB9183A1F'),
                                randevuProjesi = v.Values.first('FieldPublicId', '4115D82215384A38947FDCF47C13AD02'),
                                toplamSatisFiyati = v.Values.first('FieldPublicId', '345C494105424121BBF5B5012107473E'),
                                musteriAdayi = v.Values.first('FieldPublicId', '692C6197C07F4B8A840046432C57F0D6'),
                                randevuOfisi = v.Values.first('FieldPublicId', '583AD476E3084ECA9E1F0B7B6BF31B22');

                            newRow.append($("<td/>").text(satisTarihi != null ? satisTarihi.Value.split(' ')[0] : '-')).append($("<td/>").text(yatirimUzmani != null ? yatirimUzmani.Value : '-')).append($("<td/>").text(randevuOfisi != null ? randevuOfisi.Value : '-')).append($("<td/>").text(toplamSatisFiyati != null ? turkishLanguagePriceFormatedOutput(toplamSatisFiyati.Value) : '-')).append($("<td/>").text(randevuOfisi != null ? randevuOfisi.Value : '-')).append($("<td/>").html(' <a class="btn btn-primary btn-actions btn-xs" data-href="/set/v-club/detail/' + v.PublicId + '" title="Görüntüleme"><i class="fas fa-external-link-alt"></i></a><a class="btn btn-warning btn-actions btn-xs edit-row" data-href="/set/v-club/edit/' + v.PublicId + '" title="Güncelle"><i class="fas fa-edit"></i></a>'));

                            $("#satislarim").append(newRow);
                            $("#satislarim").closest('div').find('.tfoot').show();
                        });
                    } else {
                        $("#satislarim tr:first td").html('');
                        setUtil.alert({
                            container: '#satislarim tr:first td',
                            message: "Kayıt bulunamadı.",
                            alertClass: 'alert-warning',
                            autoClose: false
                        });
                    }
                } else {
                    $("#satislarim tr:first td").html('');
                    setUtil.alert({
                        container: '#satislarim tr:first td',
                        message: "Kayıt bulunamadı.",
                        alertClass: 'alert-warning',
                        autoClose: false
                    });
                }
            });
    }
});