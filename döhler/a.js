$(function() {
    var filterId = $("#FilterId").val();
    if (filterId === "75FF181EDDCC46DF847E3C7CE44BA4D5" || filterId === "9AD5D4DA1CA044F6966EAD014EC7934E" || filterId === "24488F67820641D8ABE75A7864F297B0") {
        $(".table-responsive table tbody tr").each(function(i, v) {
            var id = $(v).data('id'),
                labName = $(v).find('td[data-id=843415DD7DF2465F80A915432F0865D7]').data('text'),
                lrId = labName.toUpperCase().contains('EMC') ? 'E1AEB5D8A9464EDD91CC4C598A9A16A1' : '85E22189C2484D93B91D02AAB297BFB9',
                baglioldugutaleptext = $(v).find('td[data-id=193FB611ED6E4DFD920E436A6AFF605A]').data('text'),
                status = $(v).find('td[data-id=81D93DC6EC8B4C15A4845597578634A7]').data('value'),
                testId = $(v).find('td[data-id=416924DDDABE497A82BCC55E6A2CC2B0]').data('value'),
                test2Id = $(v).find('td[data-id=FB9B43C19AEE4C7EB2980BA2E12211FD]').data('value');

            if (status !== "CD1E15D0BD874433B22AD4C315058684" && status !== "8C06ED85533044E2B464EC8FBC123C91" && status !== "84FEE6CD58DA4D3596DA14986A93D732") {
                $(v).find('td:last').prepend("<button type='button' class='btn btn-success btn-sm btn-kayit-rapor' style='margin-right:5px;margin-top: 3px;'>K</button><button style='margin-right:5px;margin-top: 3px;' class='btn btn-info btn-reservation btn-sm' data-testid='" + testId + "'  data-test2id='" + test2Id + "' data-id='" + id + "' title='Rezervasyon'>R</button><button style='margin-top:4px;' type='button' class='btn btn-warning btn-sm btn-list-talep-aksiyonlari' data-baglioldugutalep='" + baglioldugutaleptext + "' data-recordid='" + id + "' data-lrid='" + lrId + "' title='Yapılacak İşlemler'  data-status='" + status + "' data-talepsorumlusu='" + $(v).find('td[data-id=6B625C7A483B4603A8618644A7DD5C83]').data('value') + "' data-baglioldugutalepid='" + $(v).find('td[data-id=193FB611ED6E4DFD920E436A6AFF605A]').data('value') + "' data-onaygorusistenenkisi='" + $(v).find('td[data-id=A6C44FAB4E014B3480AC771C80584B52]').data('value') + "'><i class='fa fa-bolt'></i></button>");
            } else {
                $(v).find('td:last').prepend("<button type='button' class='btn btn-success btn-sm btn-kayit-rapor' style='margin-right:5px;margin-top: 3px;'>K</button><button style='margin-top:4px;' type='button' class='btn btn-warning btn-sm btn-list-talep-aksiyonlari' data-baglioldugutalep='" + baglioldugutaleptext + "' data-recordid='" + id + "' data-lrid='" + lrId + "' title='Yapılacak İşlemler'  data-status='" + status + "' data-talepsorumlusu='" + $(v).find('td[data-id=6B625C7A483B4603A8618644A7DD5C83]').data('value') + "' data-baglioldugutalepid='" + $(v).find('td[data-id=193FB611ED6E4DFD920E436A6AFF605A]').data('value') + "' data-onaygorusistenenkisi='" + $(v).find('td[data-id=A6C44FAB4E014B3480AC771C80584B52]').data('value') + "'><i class='fa fa-bolt'></i></button>");
            }
        });
        $("body").on("click", ".btn-kayit-rapor", function() {
            url = "";

        });

        var bagliOlduguTalepValue = "",
            bagliOlduguTalepIdValue = "",
            talepKalemIdValue = "",
            talepKalemTextValue = "",
            //boş gönderiliyor.
            surveys = [];
        $("body").off('click',
            '.btn-list-talep-aksiyonlari').on('click',
            '.btn-list-talep-aksiyonlari',
            function() {
                bagliOlduguTalep = "";
                bagliOlduguTalepId = "";
                talepKalemId = "";
                var button = $(this),
                    status = button.data('status'),
                    recordId = button.data('recordid'),
                    tr = button.closest('tr');

                if (String.isNullOrWhiteSpace(recordId)) return;

                talepKalemIdValue = recordId;
                bagliOlduguTalepValue = button.data('baglioldugutalep');
                bagliOlduguTalepIdValue = button.data('baglioldugutalepid');

                $('#modalYapilacakIslemler').remove();
                window.setModal.Create({
                    id: 'modalYapilacakIslemler',
                    html: {
                        header: 'Yapılacak İşlemler',
                        body: '<div id="txt" style="margin:0 auto;width: 100%;color:black">Aksiyonlar getiriliyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>',
                        footer: '<button data-dismiss="modal" class="btn btn-danger btn-sm">Kapat</button>'
                    },
                    settings: {
                        widthClass: 'modal-full-width'
                    }
                });

                var model = {
                    Statu: status,
                    PermissionGroupIds: userData.permissionGroupIds,
                    PermissionGroupNames: userData.permissionGroups,
                    CurrentUserId: userData.id,
                    TalepKalemId: button.data('recordid')
                }

                var actionsData = [];
                $.post("https://aselsanwebapi.setcrm.com/api/data/GetRequestActions", model,
                    function(r) {
                        if (r.Status && r.Actions.length > 0) {
                            $("#modalYapilacakIslemler .modal-body").css('padding', '0').html('<div class=""><div id="msg2" class="col-xs-12" style="width:100%"></div><div class="row form-group" style="display:none;"> <div class="col-xs-12"> <ul style="display:none;border: 1px solid #000;" class="nav nav-pills nav-justified thumbnail setup-panel"> <li class="active"><a href="#step-1" style="text-decoration:none;"> <h4 class="list-group-item-heading">Tip</h4> <p class="list-group-item-text">Aksiyon tipini seçiniz</p></a></li><li class="disabled"><a href="#step-2" style="text-decoration:none;"> <button class="btn btn-warning btn-sm btn-reload" style="float: left;z-index: 9999999;position: absolute;right: 0;height: 100%;display:none;top:0;" onclick="window.location.reload();">Sayfayı Yenile</button><h4 class="list-group-item-heading">Aksiyon Detayı</h4> <p class="list-group-item-text">Talep Hareket kaydını oluşturun</p></a></li></ul> </div></div><div class="row setup-content" id="step-1"> <div class="col-xs-12" style="display: flex;align-items: center;justify-content: center;"> <div class="col-md-5 well" style="margin-bottom: 0;display: flex;justify-content: center;align-items: center;"><label style="font-size: 17px;letter-spacing: 1px;">Aksiyon Tipi: </label> <div id="actions" style="float:left;width: 55%;margin: 0 auto;"></div><div id="actionItems" style="display:none;width: 50%;margin: 0 auto;"></div><button class="btn btn-success btn-sm btn-action-rule" style="display:none;"><i class="fa fa-step-forward"></i> Devam Et</button></div></div></div><div id="msg" class="col-xs-12" style="width:100%;display:none;"></div><div class="row setup-content" id="step-2" style="display:none;"> <div class="col-xs-12"> <div class="col-md-12"></div></div> </div></div>');

                            $.each(r.Actions, function(i, v) {
                                actionsData.push({
                                    MultipleSelect: v.MultipleSelect,
                                    id: v.RecordId,
                                    text: v.ButtonName,
                                    PageLayoutId: v.PageLayoutId,
                                    Description: v.Description,
                                    PermissionGroup: v.PermissionGroup,
                                    UpdatedStatus: v.UpdatedStatus,
                                    UpdatedStatusName: v.UpdatedStatusName,
                                    ActionType: v.ActionType,
                                    ActionTypeName: v.ActionTypeName,
                                    ButtonColor: v.ButtonColor,
                                    RecordId: v.RecordId,
                                    IframeSubmitButtonName: v.IframeSubmitButtonName
                                });
                                if (v.LaboratorySurvey.length > 0) {
                                    surveys.push({
                                        name: v.SurveyName,
                                        list: v.LaboratorySurvey
                                    });
                                }
                            });

                            prepareSelect2WithData('#actions',
                                actionsData);
                            if (actionsData.length === 1) {
                                data = actionsData.first();
                                $("#actions").select2('data', data);
                                $('.btn-action-rule').trigger('click');
                            }

                            $("#actions").on('change', function() {
                                $('#step-2').hide();
                                if ($(this).val() !== "") {
                                    $('.btn-action-rule').trigger('click');
                                }
                            });
                        } else {
                            $("#modalYapilacakIslemler .modal-body").html('');
                            setUtil.alert({
                                container: "#modalYapilacakIslemler .modal-body",
                                message: "Yapılacak işlem bulunamadı.",
                                alertClass: 'alert-warning',
                                autoClose: false
                            });
                            $("#modalYapilacakIslemler .modal-body .alert").css('margin-bottom', "0");
                        }
                    });

                $('#modalYapilacakIslemler').modal("toggle");
            });

        $("body").off('click', '.btn-action-rule').on('click', '.btn-action-rule', function() {
            var action = $("#actions").select2('data');
            if (action == null) return;
            var btn = $(this),
                pageLayoutId = action.PageLayoutId,
                // desc = $(this).data('desc'),
                // permissionGroup = $(this).data('permissiongroup'),
                recordId = action.RecordId,
                updatedstatus = action.UpdatedStatus,
                updatedStatusName = action.UpdatedStatusName,
                isMultiple = action.MultipleSelect,
                buttonName = action.IframeSubmitButtonName;

            if (String.isNullOrWhiteSpace(pageLayoutId)) {
                setUtil.alert({
                    container: '#msg',
                    message: "<u>" + action.text + "</u> adlı aksiyonun sayfa tasarımı seçilememiş görünmektedir. Lütfen kontrol ediniz.",
                    alertClass: 'alert-danger',
                    autoClose: true
                });
                $("#msg").show();
                return;
            };

            btn.prop('disabled', true);
            $("#actions").select2('enable', false);

            var bagliOlduguTalepId = bagliOlduguTalepIdValue,
                bagliOlduguTalepText = bagliOlduguTalepValue,
                talepKalemId = talepKalemIdValue,
                talepKalemText = talepKalemTextValue;

            if (isMultiple) {
                return;
            }

            $('#step-2 .col-xs-12 .col-md-12').html(String.format('<div id="txt2" style="margin:0 auto;width: 100%;">Aksiyon detayı getiriliyor, lütfen bekleyiniz...<br/> <img src="/Public/img/loading_bar.gif"></div><iframe src="/set/new/talep-hareket?pageLayoutId={0}&bagliOlduguTalep={1}|{2}&talepKalem={3}|{4}&durum={5}&durumText={6}&aksiyonId={7}&aksiyonText={8}" id="frameTalepHareketleri" style="width:100%;height: 320px;border:none;display:none;" frameborder="0"></iframe>', pageLayoutId, bagliOlduguTalepId, bagliOlduguTalepText, talepKalemId, talepKalemText, updatedstatus, updatedStatusName, recordId, action.text)).show();

            $("#step-2").show();

            var recordPublicId = "";
            $('#frameTalepHareketleri').on("load", function() {

                if (recordId === "A2E0DE9E9B234EEF8E8AFCA2D33C9426" && surveys.length > 0 && String.isNullOrWhiteSpace(recordPublicId)) {
                    var surveyIsRequired = surveys[0].list[0].LabSurveyIsRequired;
                    var table = $("<table/>", {
                        'class': 'table table-hover table-bordered',
                        'id': 'talepSurvey'
                    });
                    table.append('<thead><tr><th>No</th><th>Soru</th><th>Cevap (1:En Düşük, 5:En Yüksek)</th><th>Açıklama</th></tr></thead><tbody></tbody>');
                    var groupIndex = 0;
                    var surveyQuestionDescriptionIsRequired = surveys[0].list[0].LabSurveyQuestionDescriptionIsRequired;
                    $.each(surveys[0].list, function(i, v) {
                        var tip = v.SoruTipiId;
                        var cevapTextBoxHtml = "<input type='text' class='form-control' style='width:100%'>";
                        if (tip === "3DD35534A2E7419D8CDFB18A772ED8CA") {
                            cevapTextBoxHtml = "";
                            var indexLoop = 0;
                            groupIndex = groupIndex + 1;
                            for (let index = 0; index < 5; index++) {
                                var text = "";
                                indexLoop = indexLoop + 1;
                                if (indexLoop == 1) {
                                    text = "1 (En Düşük)";
                                } else if (indexLoop == 5) {
                                    text = "5 (En Yüksek)";
                                } else {
                                    text = indexLoop;
                                }
                                cevapTextBoxHtml += String.format('<input type="radio" value="{0}" name="group_{2}" style="margin-left:10px"> {1}', indexLoop, text, groupIndex);
                            }
                            cevapTextBoxHtml = "<fielset style='font-size: 15px;'>" + cevapTextBoxHtml + "</fielset>";
                        }
                        table.find('tbody').append(String.format('<tr data-id="{3}" data-surveyid="{4}" data-sorutipi="{7}" data-talep="{5}" data-talepkalemi="{6}"><td style="vertical-align: middle;">{0}</td><td style="vertical-align: middle;">{1}</td><td style="text-align: center;vertical-align: middle;">{2}</td><td><input type="text" class="form-control subway-description"></td></tr>', ++i, v.SoruMetni, cevapTextBoxHtml, v.RecordId, v.RelationId, bagliOlduguTalepId, talepKalemId, v.SoruTipiId));
                    });
                    if (!String.isNullOrWhiteSpace(table)) {
                        $('#frameTalepHareketleri').contents().find('.panel:last').closest('td').prepend(table);
                        $('#frameTalepHareketleri').contents().find('.panel:last').closest('td').prepend("<div class='subway-msg'></div>");
                        $('#frameTalepHareketleri').css('height', '550px');
                    }
                } else {
                    $("#step-1 #msg3").html('');
                }

                $('#frameTalepHareketleri').contents().find('.row').css('margin', '0');
                $('#frameTalepHareketleri').contents().find('#newFormTable').css('margin-bottom', '0');
                btn.prop('disabled', false);
                $("#actions").select2('enable', true);
                $('#frameTalepHareketleri').contents().find('.panel:last').hide();

                $("#frameTalepHareketleri").contents().find('button[type=submit]').addClass('frame-save');
                $("#frameTalepHareketleri").contents().find('.frame-save').on("click", function() {

                    var realUrl = String.format("https://aselsanwebapi.setcrm.com/api/data/TalepKalemGuncelle"),
                        localUrl = String.format("http://localhost:53510/api/data/TalepKalemGuncelle");
                    $.ajax({
                        type: "GET",
                        url: realUrl,
                        async: false,
                        data: {
                            recordId: talepKalemId,
                            durum: updatedstatus,
                            talepAksiyonId: recordId
                        },
                        success: function(r) {}
                    });

                    if (recordId === "A2E0DE9E9B234EEF8E8AFCA2D33C9426" && surveys.length > 0) {

                        var table = $("#frameTalepHareketleri").contents().find('#talepSurvey tbody tr');
                        var validation = true;
                        var answeredSurveyList = [];
                        var errors = [];
                        $.each(table, function(i, v) {
                            var tr = $(v);
                            if (!$(v).find('td input[type=radio]').is(":checked")) {
                                validation = false;
                                if (surveyIsRequired) {
                                    $(v).css('background', '#e74c3c');
                                    $(v).css('color', '#fff');
                                    setTimeout(() => {
                                        $(v).css('background', '#fff');
                                        $(v).css('color', '#000');
                                    }, 2000);
                                }
                                errors.push(
                                    String.format("{0} numaralı sorunun puanı seçilmedi.", $(v).find('td:first').text())
                                );
                            } else if (surveyQuestionDescriptionIsRequired && parseInt(tr.find('td input[type=radio]:checked').val()) <= 3 && String.isNullOrWhiteSpace(tr.find('.subway-description').val())) {
                                validation = false;
                                if (surveyIsRequired) {
                                    $(v).css('background', '#e74c3c');
                                    $(v).css('color', '#fff');
                                    setTimeout(() => {
                                        $(v).css('background', '#fff');
                                        $(v).css('color', '#000');
                                    }, 2000);
                                }
                                errors.push(
                                    String.format("{0} numaralı sorunun puanı {1} olduğu için açıklama girilmelidir.", $(v).find('td:first').text(), parseInt(tr.find('td input[type=radio]:checked').val()))
                                );
                            } else {
                                answeredSurveyList.push({
                                    TalepId: tr.data('talep'),
                                    TalepKalemId: tr.data('talepkalemi'),
                                    RecordId: tr.data('id'),
                                    RelationId: tr.data('surveyid'),
                                    SoruTipiId: tr.data('sorutipi'),
                                    Cevap: tr.find('input[type=radio]:checked').val(),
                                    Aciklama: tr.find('.subway-description').val(),
                                    CurrentUserId: userData.id
                                });
                            }
                        });

                        if (!surveyIsRequired) {
                            validation = true;
                        }

                        if (!validation) {
                            var msg = "";
                            $.each(errors, function(i, v) {
                                msg += v + "<br>";
                            });
                            setUtil.alert({
                                container: $('#frameTalepHareketleri').contents().find('.panel:last').closest('td').find('.subway-msg'),
                                message: msg,
                                alertClass: 'alert-warning',
                                autoClose: true
                            });
                            return;
                        }

                        button.prop('disabled', true);

                        if (answeredSurveyList.length > 0) {
                            $.ajax({
                                type: "POST",
                                url: "https://aselsanwebapi.setcrm.com/api/data/SaveLaboratorySurvey",
                                async: false,
                                data: {
                                    LaboratorySurveys: answeredSurveyList,
                                },
                                success: function(r) {}
                            });
                        }
                    }

                    if (pageLayoutId === "A1B86DE938F84C7595C30DA7D6BDDE3A" || pageLayoutId === "8850E5834BAF4B2F86093F9120A9C398") {
                        var realUrl = String.format("https://aselsanwebapi.setcrm.com/api/data/TalepKalemTalepSorumlusuAta"),
                            localUrl = String.format("http://localhost:53510/api/data/TalepKalemTalepSorumlusuAta");
                        var member = $("#frameTalepHareketleri").contents().find('#623A624BAA284E2AB9DFECF2962E7B86').val();
                        $.ajax({
                            type: "GET",
                            url: realUrl,
                            async: false,
                            data: {
                                recordId: talepKalemId,
                                memberId: String.isNullOrWhiteSpace(member) ? '' : member
                            },
                            success: function(r) {}
                        });
                    }

                    if (pageLayoutId === "EAC3838359094ADD87A41B83629106E5" || pageLayoutId === "CC869D44CC4D45BE8D23FFC2F73F8D8A") {
                        var realUrl = String.format("https://aselsanwebapi.setcrm.com/api/data/OnayGorusIstenenKisiGuncelle"),
                            localUrl = String.format("http://localhost:53510/api/data/OnayGorusIstenenKisiGuncelle");
                        $.ajax({
                            type: "GET",
                            url: realUrl,
                            async: false,
                            data: {
                                recordId: talepKalemId,
                                onayGorusIstenenKisiId: $('iframe').contents().find('#7FEE8A93B3724D4EA2510E998FE6740D').val()
                            },
                            success: function(r) {}
                        });
                    }
                });

                $("#frameTalepHareketleri").show();
                $("#txt2").hide();
                recordPublicId = $("#frameTalepHareketleri").contents().find('#RecordPublicId').val();
                if (!String.isNullOrWhiteSpace(recordPublicId)) {
                    setUtil.alert({
                        container: '#msg2',
                        message: "İşlem başarılı, sayfa yenileniyor. Lütfen bekleyiniz.",
                        alertClass: 'alert-info',
                        autoClose: true
                    });
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }
                if (!String.isNullOrWhiteSpace(buttonName)) {
                    $("#frameTalepHareketleri").contents().find('#btn_save').text(buttonName);
                }
                $("#frameTalepHareketleri").contents().find('#navbarmenu, #btn_save_and_new').remove();
                $("#frameTalepHareketleri").contents().find('.well-xxs:first, footer').hide();
                $("#frameTalepHareketleri").contents().find('body').attr("style",
                    "padding-top:0 !important");
            });
        });

        $("body").off('click', '.btn-reservation').on("click", ".btn-reservation", function() {
            var recordId = $(this).data('id'),
                test = $(this).data('testid'),
                test2 = $(this).data('test2id');

            if (String.isNullOrWhiteSpace(test)) {
                test = test2;
            }

            if (String.isNullOrWhiteSpace(recordId) || String.isNullOrWhiteSpace(test)) return;

            $('#modalRezervasyon').remove();
            window.setModal.Create({
                id: 'modalRezervasyon',
                html: {
                    header: '',
                    body: '<div id="txt" style="margin:0 auto;width: 100%;color:black">Takvim yükleniyor, lütfen bekleyiniz...<br/> <img src="/Public/img/loading_bar.gif"></div>',
                    footer: '<button class="btn btn-danger btn-sm btn-rezv-modal-close" data-dismiss="modal">Kapat</button>'
                },
                settings: {
                    widthClass: 'modal-full-width'
                }
            });

            $('#modalRezervasyon').modal({
                backdrop: 'static',
                keyboard: false
            });
            $('#modalRezervasyon .modal-body').append(String.format('<iframe src="/report/viewergantt?redirectUrl=index/ViewerReservationInventoryCalendar/{0}/{1}" frameborder="0" style="overflow: hidden;height:{3}px;width:100%;display:none;" height="800px" width="100%"></iframe>', recordId, test, $(window).height() - 50));
            $('iframe').on('load', function() {
                $('#txt').hide();
                $('iframe').show();
            });
        });
    }
});