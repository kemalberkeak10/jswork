var ako = (function() {
    console.log("AKO Function Ready!");
    return {
        uploadUrl: "https://api.setcrm.com/v1/Upload",
        url1: "http://localhost:52129/api/ako/KazaBilgisiGuncelleme",
        url2: "http://localhost:52129/api/ako/KazaBilgisiOlustur",
        realUrl1: "https://templateprocess.setcrm.com/api/ako/KazaBilgisiGuncelleme",
        realUrl2: "https://templateprocess.setcrm.com/api/ako/KazaBilgisiOlustur",
        // Get Form Data
        login: function(email, password) {
            var isLoginBtn = false;
            var url =
                "http://localhost:52129/api/ako/Authenticate?email=" +
                email +
                "&password=" +
                password;
            var realUrl =
                "https://templateprocess.setcrm.com/api/ako/Authenticate?email=" +
                email +
                "&password=" +
                password;
            Swal.fire({
                title: "Please Wait!",
                html: "Loading..",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            $.get(realUrl, function(r) {
                if (r.Status) {
                    Swal.close();
                    setTimeout(function() {
                        Swal.close();
                        isLoginBtn = true;
                        var eksperRecordId = r.RecordId;
                        localStorage.setItem("eksperRecordId", eksperRecordId);
                        localStorage.setItem("isLoginBtn", isLoginBtn);
                        $("#dashboard").trigger("click");
                        $("#login").hide();
                        $("#dashboard").show();
                        $("#auftrag").show();
                        $("#auftraege").show();
                        $("#logout").show();
                        $(".bottom-menu").show();

                        //Auftraege başlangıç
                        $(".hizli-ekle-new-row").html("");
                        var div = $("#divAuftraege");
                        var divSabitFields = div.find(".sabit-fields");
                        var divNewRow = div.find(".hizli-ekle-new-row");
                        //var url = 'https://saphirewebapi.setcrm.com/api/data/TabloOkuma?coId=' + coId + '&tableId=' + tableId + '&recordId=' + $('#RecordPublicId').val();
                        var url = "http://localhost:52129/api/ako/KazaBilgisiStatuGnuncelleme";
                        var url2 =
                            "http://localhost:52129/api/ako/KazaBilgisiVfOkuma?email=" + email;

                        var realUrl3 =
                            "https://templateprocess.setcrm.com/api/ako/KazaBilgisiStatuGnuncelleme";
                        var realUrl2 =
                            "https://templateprocess.setcrm.com/api/ako/KazaBilgisiVfOkuma?email=" +
                            email;

                        var realUrl3 =
                            "https://templateprocess.setcrm.com/api/ako/KazaBilgisiStatuGnuncelleme";
                        var recordId;
                        $.get(realUrl3, function(r) {
                            if (r.Status) {
                                console.log(r);
                                history.go(0);
                            }
                        });
                        var url4 = "http://localhost:52129/api/ako/AracVfOkuma";
                        var realUrl4 = "https://templateprocess.setcrm.com/api/ako/AracVfOkuma";
                        $.get(realUrl4, function(r) {
                            if (r.Status) {
                                console.log(r.modelList);
                                var r = r.modelList;
                                console.log(r);
                                var item;
                                item += "<option value=''>Choose...</option>";
                                $.each(r, function(i, v) {
                                    item += '<option value="' + v.Key + '">' + v.Value + "</option>";
                                    $("#autoMarke").html(item);
                                });
                            }
                        });
                        var url5 = "http://localhost:52129/api/ako/SigortaFirmasiVfOkuma";
                        var realUrl5 =
                            "https://templateprocess.setcrm.com/api/ako/SigortaFirmasiVfOkuma";
                        $.get(realUrl5, function(r) {
                            if (r.Status) {
                                console.log(r.modelList);
                                var r = r.modelList;
                                console.log(r);
                                var item;
                                item += "<option value=''>Choose...</option>";
                                $.each(r, function(i, v) {
                                    item += '<option value="' + v.Key + '">' + v.Value + "</option>";
                                    $("#versicherungUnfalgegner").html(item);
                                });
                            }
                        });
                        var editKayitListesi = [];

                        $.get(realUrl2, function(r) {
                            if (r.Status) {
                                console.log(r.modelList);

                                if (r.modelList.length > 0) {
                                    editKayitListesi = r.modelList;
                                    var auftragTable = divNewRow.append(
                                        '<table id="auftragTable" style="width: 100%" />'
                                    );
                                    var thead = auftragTable.append("<thead/>");
                                    var tbody = auftragTable.append("<tbody/>");
                                    var newRow = $(
                                        '<tr class="table table-bordered table-hover" style="background-color:lightblue"/>'
                                    );
                                    newRow.append(
                                        $('<th style="text-align: left;" class="col-md-1"/>').text(
                                            "Driver's name"
                                        )
                                    );
                                    newRow.append(
                                        $('<th style="text-align: left;" class="col-md-1"/>').text("Case No")
                                    );
                                    newRow.append(
                                        $('<th style="text-align: left;" class="col-md-1"/>').text("")
                                    );
                                    thead.append(newRow);
                                    auftragTable.append(thead);
                                    var tbody = $("<tbody />");
                                    $.each(r.modelList, function(i, v) {
                                        console.log(v, i);

                                        var newRow = $('<tr class="table table-bordered table-hover"/>').attr(
                                            "data-recordId",
                                            v.RecordId
                                        );
                                        var araciKullananinAdi =
                                            '<td id="servisAdi" servisAdi="' +
                                            v.DosyaNo +
                                            '" araciKullananinAdi="' +
                                            v.AraciKullananinAdi +
                                            '" araciKullananinSoyadi="' +
                                            v.AraciKullananinSoyadi +
                                            '" style="text-align: left;" class="col-md-3" data-id="" />';
                                        newRow.append($(araciKullananinAdi).text(v.AraciKullananinAdi));

                                        newRow.append(
                                            $(
                                                '<td id="dosyaNo" style="text-align: left;" class="col-md-3" data-id="" />'
                                            ).text(v.DosyaNo)
                                        );
                                        newRow.append(
                                            '<td style="text-align: left;" class="col-md-3" data-id=""><a type="button" class="btn btn-secondary btnEditRow btn-sm">Edit</a></td>'
                                        );
                                        tbody.append(newRow);
                                        auftragTable.append(tbody);
                                        $(".hizli-ekle-new-row").append(auftragTable);
                                    });
                                }
                            } else {
                                divSabitFields.append('<div id="message{0}"/>', r.Message);
                            }
                        });
                        //Augtrage bitiş
                    }, 500);
                } else {
                    Swal.close();
                    Swal.fire({
                        title: "Error!",
                        html: r.Message,
                        allowOutsideClick: false
                    });
                }
            });
        },
        dataURLtoFile: function(dataurl, filename) {
            var arr = dataurl.split(","),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, { type: mime });
        },
        sendFile: function(files) {
            var returnId;
            var files = [];
            var docId = "";
            var ruhsatDocId = "";
            var listDocId = "";
            var list = new Array();
            if (files.length > 0) {
                for (let index = 0; index < files.length; index++) {
                    if (files[index] != undefined) {
                        //console.log(files[index].name);
                        //console.log(files[index]);
                        const file = files[index];
                        var data = new FormData();
                        //data.append("fieldId", "CD2512F177B54742A58FE6C9F6CE97D5");
                        //data.append("file", file[0], file[0].name);
                        data.append("file", file, file.name);
                        var xhr = new XMLHttpRequest();
                        xhr.withCredentials = true;

                        xhr.addEventListener("readystatechange", function() {
                            if (this.readyState === 4) {
                                console.log(this.responseText);
                                result = JSON.parse(this.responseText);
                                if (result.IsOk) {
                                    returnId = result.Result.DocumentId;
                                    list.push(returnId);
                                    localStorage.setItem("listDocId", list);
                                    listDocId = localStorage.getItem("listDocId") ?
                                        localStorage.getItem("listDocId").split(",") :
                                        "";
                                    console.log("Gorseller: " + listDocId);
                                }
                            }
                        });

                        xhr.open("POST", ako.uploadUrl + "?id=203AD852CC9B4254A47C99CE1E839EDF");

                        //xhr.setRequestHeader("Access-Control-Request-Headers", "*");
                        //xhr.setRequestHeader("Access-Control-Request-Method", "*");

                        xhr.setRequestHeader("Authorization", "DD07191C25A54A558F1BADC35BE61D62");
                        xhr.send(data);
                    } else {
                        files[index] = "";
                    }
                }
            }
        },
        sendFile1: function(file) {
            var returnId;
            if (file.length > 0) {
                console.log(file[0].name);
                console.log(file[0]);
                var data = new FormData();
                //data.append("fieldId", "CD2512F177B54742A58FE6C9F6CE97D5");
                //data.append("file", file[0], file[0].name);
                data.append("file", file[0], file[0].name);
                var xhr = new XMLHttpRequest();
                xhr.withCredentials = true;

                xhr.addEventListener("readystatechange", function() {
                    if (this.readyState === 4) {
                        //console.log(this.responseText);
                        result = JSON.parse(this.responseText);
                        if (result.IsOk) {
                            returnId = result.Result.DocumentId;
                            localStorage.setItem("resultDocId", returnId);
                        }
                    }
                });

                xhr.open("POST", ako.uploadUrl + "?id=203AD852CC9B4254A47C99CE1E839EDF");

                //xhr.setRequestHeader("Access-Control-Request-Headers", "*");
                //xhr.setRequestHeader("Access-Control-Request-Method", "*");

                xhr.setRequestHeader("Authorization", "DD07191C25A54A558F1BADC35BE61D62");
                xhr.send(data);
            } else {
                nullId = "";
                localStorage.setItem("resultDocId", nullId);
            }
        },
        sendFile2: function() {
            var returnId;
            var i = 0;
            var filename = "Signature" + i + ".png";
            var file1 = undefined;
            i++;
            var sigFile = $("#sig-dataUrl").val();
            console.log(sigFile);
            if (sigFile != "Data URL for your signature will go here!") {
                file1 = ako.dataURLtoFile(sigFile, filename);
                console.log("sendFile2 funct: " + file1);
                console.log(file1.name);
                console.log(file1);
            }
            if (file1 != undefined) {
                var data = new FormData();
                //data.append("fieldId", "CD2512F177B54742A58FE6C9F6CE97D5");
                //data.append("file", file[0], file[0].name);
                data.append("file1", file1, file1.name);
                var xhr = new XMLHttpRequest();
                xhr.withCredentials = true;

                xhr.addEventListener("readystatechange", function() {
                    if (this.readyState === 4) {
                        //console.log(this.responseText);
                        result = JSON.parse(this.responseText);
                        if (result.IsOk) {
                            returnId = result.Result.DocumentId;
                            localStorage.setItem("sigId", returnId);
                        }
                    }
                });

                xhr.open("POST", ako.uploadUrl + "?id=203AD852CC9B4254A47C99CE1E839EDF");

                //xhr.setRequestHeader("Access-Control-Request-Headers", "*");
                //xhr.setRequestHeader("Access-Control-Request-Method", "*");

                xhr.setRequestHeader("Authorization", "DD07191C25A54A558F1BADC35BE61D62");
                xhr.send(data);
            }
        },
        getFormData: function(form) {
            var unindexed_array = form.serializeArray();
            var indexed_array = {};
            $.map(unindexed_array, function(n, i) {
                indexed_array[n["name"]] = n["value"];
            });
            return indexed_array;
        },
        getRecordData: function(url, element) {
            $.get(url, function(r) {
                if (r.Status) {
                    console.log(r);
                    //details
                    document.getElementById("flexCheckChecked").checked =
                        r.model.SorumlulukHasari;
                    $("#kennzeichenUnfallgegner").val(r.model.details.kennzeichenUnfallgegner);
                    $("#damageNumber").val(r.model.details.damageNumber);
                    $("#versicherungUnfalgegner").val(r.model.details.versicherungUnfalgegner);
                    $("#versicherungsnummer").val(r.model.details.versicherungsnummer);
                    var datetime = r.model.details.schadenstag;
                    var dateFormated = moment(datetime, "YYYY-MM-DD").format();
                    var myDate = dateFormated.split("T")[0];
                    $("#schadenstag").val(myDate);
                    var datetime1 = r.model.details.auftragsdatum;
                    var dateFormated1 = moment(datetime1, "YYYY-MM-DD").format();
                    var myDate1 = dateFormated1.split("T")[0];
                    $("[name=auftragsdatum]").val(myDate1);

                    //new ve edit sayfalarındaki cardlara değer atama
                    var sigortaKarsi = $("#versicherungUnfalgegner :selected").text();
                    if (sigortaKarsi == "Choose...") {
                        sigortaKarsi = "-";
                    }
                    document.getElementById(
                        "cardVersicherungUnfallgegner"
                    ).innerHTML = sigortaKarsi;
                    var kazaGunu = $("#schadenstag").val();
                    if (kazaGunu == "") {
                        kazaGunu = "-";
                    }
                    document.getElementById("cardSchadenstag").innerHTML = kazaGunu;
                    var plakaKarsi = $("#kennzeichenUnfallgegner").val();
                    if (plakaKarsi == "") {
                        plakaKarsi = "-";
                    }
                    document.getElementById(
                        "cardKennzeichenUnfallgegner"
                    ).innerHTML = plakaKarsi;

                    //vehicleOwner
                    $("#nameVehicleOwner").val(r.model.vehicleOwner.nameVehicleOwner);
                    $("#surnameVehicleOwner").val(r.model.vehicleOwner.surnameVehicleOwner);
                    console.log("lalalall: " + r.model.vehicleOwner.nationalityVehicleOwner);
                    $("#nationalityVehicleOwner").val(
                        r.model.vehicleOwner.nationalityVehicleOwner
                    );
                    $("#identityVehicleOwner").val(r.model.vehicleOwner.identityVehicleOwner);
                    $("#emailVehicleOwner").val(r.model.vehicleOwner.emailVehicleOwner);
                    $("#adressVehicleOwner").val(r.model.vehicleOwner.adressVehicleOwner);
                    $("#phoneNoVehicleOwner").val(r.model.vehicleOwner.phoneNoVehicleOwner);

                    //anspruchsteller
                    $("#nameAnspruchsteller").val(r.model.anspruchsteller.nameAnspruchsteller);
                    $("#surnameAnspruchsteller").val(
                        r.model.anspruchsteller.surnameAnspruchsteller
                    );
                    $("#emailAnspruchsteller").val(
                        r.model.anspruchsteller.emailAnspruchsteller
                    );
                    $("#adressAnspruchsteller").val(
                        r.model.anspruchsteller.adressAnspruchsteller
                    );
                    $("#phoneNoAnspruchsteller").val(
                        r.model.anspruchsteller.phoneNoAnspruchsteller
                    );
                    //auftraggeber
                    $("#nameAuftraggeber").val(r.model.auftraggeber.nameAuftraggeber);
                    $("#surnameAuftraggeber").val(r.model.auftraggeber.surnameAuftraggeber);
                    $("#emailAuftraggeber").val(r.model.auftraggeber.emailAuftraggeber);
                    $("#adressAuftraggeber").val(r.model.auftraggeber.adressAuftraggeber);
                    $("#phoneNoAuftraggeber").val(r.model.auftraggeber.phoneNoAuftraggeber);
                    //rechtsanwalt
                    $("#nameRechtsanwalt").val(r.model.rechtsanwalt.nameRechtsanwalt);
                    $("#surnameRechtsanwalt").val(r.model.rechtsanwalt.surnameRechtsanwalt);
                    $("#emailRechtsanwalt").val(r.model.rechtsanwalt.emailRechtsanwalt);
                    $("#phoneNoRechtsanwalt").val(r.model.rechtsanwalt.phoneNoRechtsanwalt);
                    $("#adressRechtsanwalt").val(r.model.rechtsanwalt.adressRechtsanwalt);
                    //reperaturFirma
                    $("#nameReperaturFirma").val(r.model.reperaturFirma.nameReperaturFirma);
                    $("#emailReperaturFirma").val(r.model.reperaturFirma.emailReperaturFirma);
                    $("#phoneNoReperaturFirma").val(
                        r.model.reperaturFirma.phoneNoReperaturFirma
                    );
                    $("#adressReperaturFirma").val(
                        r.model.reperaturFirma.adressReperaturFirma
                    );
                    //unfallgegner
                    $("#nameUnfallgegner").val(r.model.unfallgegner.nameUnfallgegner);
                    $("#surnameUnfallgegner").val(r.model.unfallgegner.surnameUnfallgegner);
                    $("#emailUnfallgegner").val(r.model.unfallgegner.emailUnfallgegner);
                    $("#phoneNoUnfallgegner").val(r.model.unfallgegner.phoneNoUnfallgegner);
                    $("#adressUnfallgegner").val(r.model.unfallgegner.adressUnfallgegner);
                    //new ve edit sayfalarındaki cardlara değer atama
                    var aracSahibi =
                        $("#nameVehicleOwner").val() + " " + $("#surnameVehicleOwner").val();
                    if (aracSahibi == "") {
                        aracSahibi = "-";
                    }
                    document.getElementById("cardFahrzeughalter").innerHTML = aracSahibi;
                    var tamirciFirma = $("#nameReperaturFirma").val();
                    if (tamirciFirma == "") {
                        tamirciFirma = "-";
                    }
                    document.getElementById("cardReperaturfirma").innerHTML = tamirciFirma;
                    var avukat =
                        $("#nameRechtsanwalt").val() + " " + $("#surnameRechtsanwalt").val();
                    if (avukat == "" && avukat == undefined) {
                        avukat = "-";
                    }
                    document.getElementById("cardRechtsanwalt").innerHTML = avukat;
                    //vehicleData
                    $("#VehicleDismantled").val(r.model.vehicleData.VehicleDismantled);
                    $("#VehicleExistingOldDamage").val(
                        r.model.vehicleData.VehicleExistingOldDamage
                    );
                    $("#VehicleInterior").val(r.model.vehicleData.VehicleInterior);
                    $("#VehiclePaint").val(r.model.vehicleData.VehiclePaint);
                    $("#VehicleReadyForDriving").val(
                        r.model.vehicleData.VehicleReadyForDriving
                    );
                    $("#VehicleRepairedPreviousDamage").val(
                        r.model.vehicleData.VehicleRepairedPreviousDamage
                    );
                    $("#VehicleTrafficSafe").val(r.model.vehicleData.VehicleTrafficSafe);
                    $("#Vehiclebody").val(r.model.vehicleData.Vehiclebody);
                    $("#vehicleGeneral").val(r.model.vehicleData.vehicleGeneral);

                    //vehicleGeneral
                    $("#VehicleDueDateHU").val(r.model.vehicleGeneral.VehicleDueDateHU);
                    var datetime1 = r.model.vehicleGeneral.VehicleFirstRegistration;
                    var dateFormated1 = moment(datetime1, "YYYY-MM-DD").format();
                    var myDate1 = dateFormated1.split("T")[0];
                    $("[name=VehicleFirstRegistration]").val(myDate1);

                    $("#VehicleLicensePlate").val(r.model.vehicleGeneral.VehicleLicensePlate);
                    $("#VehicleMileage").val(r.model.vehicleGeneral.VehicleMileage);
                    $("#autoMarke").val(r.model.vehicleGeneral.autoMarke);
                    $("#vehicleVin").val(r.model.vehicleGeneral.vehicleVin);
                    //new ve edit sayfalarındaki cardlara değer atama
                    var plaka = $("#VehicleLicensePlate").val();
                    if (plaka == "") {
                        plaka = "-";
                    }
                    document.getElementById("cardKennzeichen").innerHTML = plaka;
                    var ilkKayit = $("#VehicleFirstRegistration").val();
                    if (ilkKayit == "") {
                        ilkKayit = "-";
                    }
                    document.getElementById("cardErstzulassung").innerHTML = ilkKayit;
                    var km = $("#VehicleMileage").val();
                    if (km == "") {
                        km = "-";
                    }
                    document.getElementById("cardLaufleistung").innerHTML = km;
                    //vehicleTires
                    $("#VehicleProDepthInFrontL").val(
                        r.model.vehicleTires.VehicleProDepthInFrontL
                    );
                    $("#VehicleProDepthInFrontR").val(
                        r.model.vehicleTires.VehicleProDepthInFrontR
                    );
                    $("#VehicleRearProDepthL").val(r.model.vehicleTires.VehicleRearProDepthL);
                    $("#VehicleRearProDepthR").val(r.model.vehicleTires.VehicleRearProDepthR);
                    $("#VehicleTireType").val(r.model.vehicleTires.VehicleTireType);
                    $("#VehicleTiresDamaged").val(r.model.vehicleTires.VehicleTiresDamaged);
                    $("#vehicleTires").val(r.model.vehicleTires.vehicleTires);
                    //new ve edit sayfalarındaki cardlara değer atama
                    var lastikler = $("#vehicleTires").val();
                    if (lastikler == "") {
                        lastikler = "-";
                    }
                    document.getElementById("cardReifen").innerHTML = lastikler;
                    var on =
                        $("#VehicleProDepthInFrontL").val() +
                        "-" +
                        $("#VehicleProDepthInFrontR").val();
                    if (on == "") {
                        on = "-";
                    }
                    document.getElementById("cardProfitiefeVorne").innerHTML = on;
                    var arka =
                        $("#VehicleRearProDepthL").val() + "-" + $("#VehicleRearProDepthR").val();
                    if (arka == "") {
                        arka = "-";
                    }
                    document.getElementById("cardProfitiefeHinten").innerHTML = arka;
                    //images
                    $("#Gorsel1").val(r.model.images.Gorsel1);
                    $("#Gorsel2").val(r.model.images.Gorsel2);
                    $("#Gorsel3").val(r.model.images.Gorsel3);
                    $("#Gorsel4").val(r.model.images.Gorsel4);
                    $("#Gorsel5").val(r.model.images.Gorsel5);
                    $("#Gorsel6").val(r.model.images.Gorsel6);
                    $("#Gorsel7").val(r.model.images.Gorsel7);
                    $("#Gorsel8").val(r.model.images.Gorsel8);
                    $("#RuhsatGorseli").val(r.model.images.RuhsatGorseli);
                    $("#SignatureId").val(r.model.images.SignatureId);
                    //noten
                    $("#gorusAciklama").val(r.model.noten.gorusAciklama);
                    var not = $("#gorusAciklama").val();
                    if (not == "") {
                        not = "Es ist keine Schadensbeschreibung vorhanden.";
                    }
                    document.getElementById("cardSchadensbeschreibung").innerHTML = not;
                    //kaydetme butonlarını tetikleme
                    $('[name="fertigDetails"]').trigger("click");
                    console.log("ilk önce bura");
                    $("#fertigVehicleOwner").trigger("click");
                    $("#fertigAuftraggeber").trigger("click");
                    $("#fertigAnspruchsteller").trigger("click");
                    $("#fertigReperaturFirma").trigger("click");
                    $("#fertigUnfallgegner").trigger("click");
                    $("#fertigRechtsanwalt").trigger("click");
                    $("#fertigSignature").trigger("click");
                    $("#fertigVehicleGeneral").trigger("click");
                    $("#fertigVehicleData").trigger("click");
                    $("#fertigReifen").trigger("click");
                    $("#saveFiles").trigger("click");
                    $("#saveFiles1").trigger("click");
                    $('[name="fertigSchadensbeschreibung"]').trigger("click");

                    setTimeout(function() {
                        console.log("sonra bura");
                        $("#fertigAdresses").trigger("click");
                        $("#fertigVehicleTotalDaten").trigger("click");
                    }, 500);
                }
            });
        },
        postFormData: function(model, url) {
            console.log(model);
            $.post(url, model, function(result) {
                if (result.IsOk) {
                    $("#btnSenden").prop("disabled", false);
                    Swal.close();
                    Swal.fire({
                        title: "Sending successful!",
                        html: result.Message,
                        allowOutsideClick: false
                    });
                    $("#dashboard").trigger("click");
                } else {
                    $("#btnSenden").prop("disabled", false);
                    Swal.close();
                    Swal.fire({
                        title: "Error. Send failed!",
                        html: result.Message,
                        allowOutsideClick: false
                    });
                }
            });
            /*$.post(
            	ako.url + "?form",
            	{
            		form
            	},
            	function (result) {
            		if (result.isOk) {
            			Swal.close();
            			Swal.fire({
            				icon: "success",
            				title: "Request Form",
            				html: "The request form has been successfully saved.",
            				allowOutsideClick: false
            			}).then((result) => {
            				/* Read more about isConfirmed, isDenied below */
            /*if (result.isConfirmed) {
            					localStorage.clear();
            					location.reload();
            				}
            			});
            		} else /*{
            		}*/
            /*}*/
            /*);*/
        },

        // FETCH SELECTBOX DATA
        fetchData: function(element, url) {
            //Seleclist doldurma
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function() {
                if (this.readyState === 4) {
                    var r = JSON.parse(this.responseText);
                    console.log(r.Items);
                    var item;
                    item += "<option value=''>Choose...</option>";
                    $.each(r.Items, function(i, v) {
                        item += '<option value="' + v.Key + '">' + v.Value + "</option>";
                        $(element).html(item);
                    });
                }
            });

            xhr.open("GET", url);
            xhr.setRequestHeader("Authorization", "	DD07191C25A54A558F1BADC35BE61D62");
            xhr.setRequestHeader("309F695FCA094748B2D03AE74EB26AF0", "");

            xhr.send();
        },
        // Text Data
        // getElevatorData: function(keyword, model, element) {
        //     Swal.showLoading();
        //     var model_image =
        //         model.toLowerCase().split(" ")[0] + "_" + model.toLowerCase().split(" ")[1];
        //     $.post(
        //         peform.url + "?getElevatorData", {
        //             keyword: keyword
        //         },
        //         function(result) {
        //             if (result.isOk) {
        //                 $(".roping").html(result.data[0].B2B_ROPING ? ? "NULL");
        //                 $("#roping").val(result.data[0].B2B_ROPING_PublicId);
        //                 $(".mroom").html(result.data[0].MACHINE_ROOM ? ? "NULL");
        //                 $("#mroom").val(result.data[0].MACHINE_ROOM_PublicId);
        //                 $(".drive").html(result.data[0].DRIVE ? ? "NULL");
        //                 $("#drive").val(result.data[0].DRIVE_PublicId);
        //                 $(".mmotor").html(result.data[0].BBMACHINE_MOTOR ? ? "NULL");
        //                 $("#mmotor").val(result.data[0].BBMACHINE_MOTOR_PublicId);
        //                 $(".controller").html(result.data[0].CONTROLLER ? ? "NULL");
        //                 $("#controller").val(result.data[0].CONTROLLER_PublicId);
        //                 $(".cop-model").html(result.data[0].COP_MARKA ? ? "NULL");
        //                 $("#cop-model").val(result.data[0].COP_MARKA_PublicId);
        //                 $(".lop-model").html(result.data[0].LOP_MODEL ? ? "NULL");
        //                 $("#lop-model").val(result.data[0].LOP_MARKA_PublicId);
        //                 $(".lip-model").html(result.data[0].LIP_MODEL ? ? "NULL");
        //                 $("#lip-model").val(result.data[0].LIP_MARKA_PublicId);
        //                 $(".grail").html(result.data[0].RAY_OLCUSU ? ? "NULL");
        //                 $("#grail").val(result.data[0].RAY_OLCUSU_PublicId);
        //                 $(".cgrail").html(result.data[0].CWT_RAY_OLCULERI ? ? "NULL");
        //                 $("#cgrail").val(result.data[0].CWT_RAY_OLCULERI_PublicId);
        //                 $(".buffer").html(result.data[0].BUFFERR ? ? "NULL");
        //                 $("#buffer").val(result.data[0].BUFFERR_PublicId);
        //                 $(".ropes").html(result.data[0].ROPE ? ? "NULL");
        //                 $("#ropes").val(result.data[0].ROPE_PublicId);
        //                 $(".ogover").html(result.data[0].OVERSPEEDGOVERNOR ? ? "NULL");
        //                 $("#ogover").val(result.data[0].OVERSPEEDGOVERNOR_PublicId);
        //                 $(".sgear").html(result.data[0].SAFETYGEAR ? ? "NULL");
        //                 $("#sgear").val(result.data[0].SAFETYGEAR_PublicId);
        //                 $(".col-md-2.image.pr-m > a:eq(0)").attr(
        //                     "data-src",
        //                     peform.url + "assets/image/" + model_image + "_1.jpg"
        //                 );
        //                 $(".col-md-2.image.pr-m > a:eq(0)").attr("data-caption", model);
        //                 $(".col-md-2.image.pr-m > a:eq(1)").attr(
        //                     "data-src",
        //                     peform.url + "assets/image/" + model_image + "_2.jpg"
        //                 );
        //                 $(".col-md-2.image.pr-m > a:eq(1)").attr("data-caption", model);
        //                 $(".col-md-2.image.pr-m > a > img").attr(
        //                     "src",
        //                     peform.url + "assets/image/" + model_image + "_1.jpg"
        //                 );
        //                 $(".col-md-2.image.pr-m > a > img").attr("alt", model);
        //                 $(".message-box").hide();
        //                 $(".pr-m").show();
        //                 $(".components").show();
        //                 $(".accordion-button").prop("disabled", false);
        //                 $("#options").collapse("toggle");
        //             } else {
        //                 $(".pr-m").hide();
        //                 $(".message-box").show();
        //                 $(".components").hide();
        //             }
        //             Swal.close();
        //             $(element).focus();
        //         }
        //     );
        // },
        //Select Id eşleştirme
        getDataInput: function() {
            // Input and Select Fetch Data

            peform.fetchData("getElevatorCapacity", "#elevator_capacity");
            peform.fetchData("getElevatorSpeed", "#elevator_speed");
            peform.fetchData("getElevatorStops", "#elevator_stops");
            peform.fetchData("getElevatorReducedpitOH", "#reduced_pit");
            peform.fetchData("getElevatorCabinModel", "#cabin_model");
            peform.fetchData("getElevatorDoorModel", "#door_model");
            peform.fetchData("getElevatorFloorModel", "#floor_model");
            peform.fetchData("getElevatorLOPModel", "#lop_model");
            peform.fetchData("getElevatorLIPModel", "#lip_model");
            peform.fetchData("getElevatorCOPModel", "#cop_model");
            peform.fetchData("getElevatorCabinDoorSize", "#cabin_door_size");
            peform.fetchData("getElevatorCabinDoorModel", "#cabin_door_model");
            peform.fetchData("getElevatorCabinDoorFinish", "#cabin_door_finish");
            peform.fetchData("getElevatorShaftDoorSize", "#shaft_door_size");
            peform.fetchData("getElevatorShaftDoorModel", "#shaft_door_model");
            peform.fetchData("getElevatorShaftDoorFinish", "#shaft_door_finish");
            peform.fetchData("getElevatorShaftFireResistance", "#shaft_door_fire_res");
            peform.fetchData("getElevatorCounterWeight", "#counter_weight");
            peform.fetchData("getElevatorControllerCabinet", "#controller_cabinet");
        }
    };
})();
//gravatar
$("#email").on("keyup", function() {
    var email = $(this).val();
    var hash = md5(email);
    var src =
        email == "" ? "" : "https://secure.gravatar.com/avatar/" + hash + "?d=mp";
    $("#gravatar")
        .attr({
            alt: email,
            src: src
        })
        .css({
            width: "100px",
            height: "auto",
            "border-radius": "50%"
        });
});
//gravatar bitiş
//değişkenler
var isNewCase = false;

//navbar yönlendirmeler başlangıç
//navbar butonlar hide
$("#dashboard").hide();
$("#auftrag").hide();
$("#auftraege").hide();
$("#logout").hide();
$(".bottom-menu").hide();

$("body").on("click", "#login", function() {
    $(".dashboard").hide();
    $(".overview").hide();
    $(".login").show();
    $(".auftrag").hide();
    $(".auftraege").hide();
    $(".order-details").hide();
    $(".order-adresses").hide();
    $(".abtretungs-erklaerung").hide();
    $(".abtretungs-erklaerung-signature").hide();
    $(".order-adresses-vehicleOwner").hide();
    $(".order-adresses-auftraggeber").hide();
    $(".order-adresses-anspruchsteller").hide();
    $(".order-adresses-reperaturfirma").hide();
    $(".order-adresses-unfallgegner").hide();
    $(".order-adresses-rechtsanwalt").hide();
    $(".vehicle-info").hide();
    $(".vehicle-information-allgemein").hide();
    $(".vehicle-information-fahrzeugdaten").hide();
    $(".vehicle-information-reifen").hide();
    $(".vehicle-license").hide();
    $(".vehicle-image").hide();
    $(".schadensbeschreibung").hide();
    $(".fehler").hide();
    $(".navbar-toggler").trigger("click");
    document.getElementById("dashboardBottom").classList.remove("active");
    document.getElementById("auftraegeBottom").classList.remove("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
});
var email;
var isLoginBtn;
$("body").on("click", "#loginBtn", function() {
    isLoginBtn = localStorage.getItem("isLoginBtn");
    email = $("#mail").val();
    localStorage.setItem("email", email);
    var password = $("#password").val();
    ako.login(email, password);
});

$("body").on("click", "#logout", function() {
    localStorage.clear();
    $("#login").trigger("click");
    $("#login").show();
    $("#dashboard").hide();
    $("#auftrag").hide();
    $("#auftraege").hide();
    $("#logout").hide();
    $(".bottom-menu").hide();
    isDash = false;
});

$("body").on("click", "#dashboard", function() {
    isDash = true;
    $(".dashboard").show();
    $(".overview").hide();
    $(".login").hide();
    $(".auftrag").hide();
    $(".auftraege").hide();
    $(".order-details").hide();
    $(".order-adresses").hide();
    $(".abtretungs-erklaerung").hide();
    $(".abtretungs-erklaerung-signature").hide();
    $(".order-adresses-vehicleOwner").hide();
    $(".order-adresses-auftraggeber").hide();
    $(".order-adresses-anspruchsteller").hide();
    $(".order-adresses-reperaturfirma").hide();
    $(".order-adresses-unfallgegner").hide();
    $(".order-adresses-rechtsanwalt").hide();
    $(".vehicle-info").hide();
    $(".vehicle-information-allgemein").hide();
    $(".vehicle-information-fahrzeugdaten").hide();
    $(".vehicle-information-reifen").hide();
    $(".vehicle-license").hide();
    $(".vehicle-image").hide();
    $(".schadensbeschreibung").hide();
    $(".fehler").hide();
    if (isBottom == "false" && isLoginBtn == false && isSenden == false) {
        $(".navbar-toggler").trigger("click");
    }
    document.getElementById("dashboardBottom").classList.add("active");
    document.getElementById("auftraegeBottom").classList.remove("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
    isBottom = "false";
    isLoginBtn = false;
});
var b = 0;
$("body").on("click", "#auftrag", function() {
    isDash = false;
    var name = "New Case";
    $(".dashboard").hide();
    $(".overview").show();
    $(".login").hide();
    $(".auftraege").hide();
    $(".order-details").hide();
    $(".order-adresses").hide();
    $(".abtretungs-erklaerung").hide();
    $(".abtretungs-erklaerung-signature").hide();
    $(".order-adresses-vehicleOwner").hide();
    $(".order-adresses-auftraggeber").hide();
    $(".order-adresses-anspruchsteller").hide();
    $(".order-adresses-reperaturfirma").hide();
    $(".order-adresses-unfallgegner").hide();
    $(".order-adresses-rechtsanwalt").hide();
    $(".vehicle-info").hide();
    $(".vehicle-information-allgemein").hide();
    $(".vehicle-information-fahrzeugdaten").hide();
    $(".vehicle-information-reifen").hide();
    $(".vehicle-license").hide();
    $(".vehicle-image").hide();
    $(".schadensbeschreibung").hide();
    $(".fehler").hide();
    if (isEdit == true) {
        b = 0;
        isNewCase = false;
    } else {
        isNewCase = true;
        $("#ubersicht").text(name);
    }
    b++;
    if (isBottom == "false" && isEdit2 == false && isBack == "false") {
        if (b == 1) {
            console.log("yeni case tiklanma:" + a);
            document.getElementById("orderDetails").reset();
            document.getElementById("vehicleOwner").reset();
            document.getElementById("auftraggeber").reset();
            document.getElementById("anspruchsteller").reset();
            document.getElementById("reperaturFirma").reset();
            document.getElementById("unfallgegner").reset();
            document.getElementById("rechtsanwalt").reset();
            document.getElementById("vehicleGeneral").reset();
            document.getElementById("vehicleData").reset();
            document.getElementById("vehicleTires").reset();
            document.getElementById("ruhsat").reset();
            document.getElementById("gorseller").reset();
            document.getElementById("schadensbeschreibung").reset();
        }
        $(".navbar-toggler").trigger("click");
    }
    isBack = "false";
    document.getElementById("dashboardBottom").classList.remove("active");
    document.getElementById("auftraegeBottom").classList.remove("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
    isBottom = "false";
});
$("body").on("click", "#auftraege", function() {
    isDash = false;
    $(".dashboard").hide();
    $(".overview").hide();
    $(".login").hide();
    $(".auftraege").show();
    $(".order-details").hide();
    $(".order-adresses").hide();
    $(".abtretungs-erklaerung").hide();
    $(".abtretungs-erklaerung-signature").hide();
    $(".order-adresses-vehicleOwner").hide();
    $(".order-adresses-auftraggeber").hide();
    $(".order-adresses-anspruchsteller").hide();
    $(".order-adresses-reperaturfirma").hide();
    $(".order-adresses-unfallgegner").hide();
    $(".order-adresses-rechtsanwalt").hide();
    $(".vehicle-info").hide();
    $(".vehicle-information-allgemein").hide();
    $(".vehicle-information-fahrzeugdaten").hide();
    $(".vehicle-information-reifen").hide();
    $(".vehicle-license").hide();
    $(".vehicle-image").hide();
    $(".schadensbeschreibung").hide();
    $(".fehler").hide();
    if (isBottom == "false") {
        $(".navbar-toggler").trigger("click");
    }
    document.getElementById("dashboardBottom").classList.remove("active");
    document.getElementById("auftraegeBottom").classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
    isBottom = "false";
});

$("#auftragsDetailsCard").click(function() {
    isDash = false;
    $(".dashboard").hide();
    $(".overview").hide();
    $(".login").hide();
    $(".auftraege").hide();
    $(".order-details").show();
    $(".order-adresses").hide();
    $(".abtretungs-erklaerung").hide();
    $(".abtretungs-erklaerung-signature").hide();
    $(".order-adresses-vehicleOwner").hide();
    $(".order-adresses-auftraggeber").hide();
    $(".order-adresses-anspruchsteller").hide();
    $(".order-adresses-reperaturfirma").hide();
    $(".order-adresses-unfallgegner").hide();
    $(".order-adresses-rechtsanwalt").hide();
    $(".vehicle-info").hide();
    $(".vehicle-information-allgemein").hide();
    $(".vehicle-information-fahrzeugdaten").hide();
    $(".vehicle-information-reifen").hide();
    $(".vehicle-license").hide();
    $(".vehicle-image").hide();
    $(".schadensbeschreibung").hide();
    $(".fehler").hide();
    window.scrollTo({ top: 0, behavior: "smooth" });
});
$("#auftragsAdressenCard").click(function() {
    isDash = false;
    $(".dashboard").hide();
    $(".overview").hide();
    $(".login").hide();
    $(".auftraege").hide();
    $(".order-details").hide();
    $(".order-adresses").show();
    $(".abtretungs-erklaerung").hide();
    $(".abtretungs-erklaerung-signature").hide();
    $(".order-adresses-vehicleOwner").hide();
    $(".order-adresses-auftraggeber").hide();
    $(".order-adresses-anspruchsteller").hide();
    $(".order-adresses-reperaturfirma").hide();
    $(".order-adresses-unfallgegner").hide();
    $(".order-adresses-rechtsanwalt").hide();
    $(".vehicle-info").hide();
    $(".vehicle-information-allgemein").hide();
    $(".vehicle-information-fahrzeugdaten").hide();
    $(".vehicle-information-reifen").hide();
    $(".vehicle-license").hide();
    $(".vehicle-image").hide();
    $(".schadensbeschreibung").hide();
    $(".fehler").hide();
    window.scrollTo({ top: 0, behavior: "smooth" });
});
$("#vehicleOwnerCard").click(function() {
    $(".dashboard").hide();
    $(".overview").hide();
    $(".login").hide();
    $(".auftraege").hide();
    $(".order-details").hide();
    $(".order-adresses").hide();
    $(".abtretungs-erklaerung").hide();
    $(".abtretungs-erklaerung-signature").hide();
    $(".order-adresses-vehicleOwner").show();
    $(".order-adresses-auftraggeber").hide();
    $(".order-adresses-anspruchsteller").hide();
    $(".order-adresses-reperaturfirma").hide();
    $(".order-adresses-unfallgegner").hide();
    $(".order-adresses-rechtsanwalt").hide();
    $(".vehicle-info").hide();
    $(".vehicle-information-allgemein").hide();
    $(".vehicle-information-fahrzeugdaten").hide();
    $(".vehicle-information-reifen").hide();
    $(".vehicle-license").hide();
    $(".vehicle-image").hide();
    $(".schadensbeschreibung").hide();
    $(".fehler").hide();
    window.scrollTo({ top: 0, behavior: "smooth" });
    //select alan doldurma
});
$("#auftraggeberCard").click(function() {
    $(".dashboard").hide();
    $(".overview").hide();
    $(".login").hide();
    $(".auftraege").hide();
    $(".order-details").hide();
    $(".order-adresses").hide();
    $(".abtretungs-erklaerung").hide();
    $(".abtretungs-erklaerung-signature").hide();
    $(".order-adresses-vehicleOwner").hide();
    $(".order-adresses-auftraggeber").show();
    $(".order-adresses-anspruchsteller").hide();
    $(".order-adresses-reperaturfirma").hide();
    $(".order-adresses-unfallgegner").hide();
    $(".order-adresses-rechtsanwalt").hide();
    $(".vehicle-info").hide();
    $(".vehicle-information-allgemein").hide();
    $(".vehicle-information-fahrzeugdaten").hide();
    $(".vehicle-information-reifen").hide();
    $(".vehicle-license").hide();
    $(".vehicle-image").hide();
    $(".schadensbeschreibung").hide();
    $(".fehler").hide();
    window.scrollTo({ top: 0, behavior: "smooth" });
});
$("#anspruchstellerCard").click(function() {
    $(".dashboard").hide();
    $(".overview").hide();
    $(".login").hide();
    $(".auftraege").hide();
    $(".order-details").hide();
    $(".order-adresses").hide();
    $(".abtretungs-erklaerung").hide();
    $(".abtretungs-erklaerung-signature").hide();
    $(".order-adresses-vehicleOwner").hide();
    $(".order-adresses-auftraggeber").hide();
    $(".order-adresses-anspruchsteller").show();
    $(".order-adresses-reperaturfirma").hide();
    $(".order-adresses-unfallgegner").hide();
    $(".order-adresses-rechtsanwalt").hide();
    $(".vehicle-info").hide();
    $(".vehicle-information-allgemein").hide();
    $(".vehicle-information-fahrzeugdaten").hide();
    $(".vehicle-information-reifen").hide();
    $(".vehicle-license").hide();
    $(".vehicle-image").hide();
    $(".schadensbeschreibung").hide();
    $(".fehler").hide();
    window.scrollTo({ top: 0, behavior: "smooth" });
});
$("#reperaturfirmaCard").click(function() {
    $(".dashboard").hide();
    $(".overview").hide();
    $(".login").hide();
    $(".auftraege").hide();
    $(".order-details").hide();
    $(".order-adresses").hide();
    $(".abtretungs-erklaerung").hide();
    $(".abtretungs-erklaerung-signature").hide();
    $(".order-adresses-vehicleOwner").hide();
    $(".order-adresses-auftraggeber").hide();
    $(".order-adresses-anspruchsteller").hide();
    $(".order-adresses-reperaturfirma").show();
    $(".order-adresses-unfallgegner").hide();
    $(".order-adresses-rechtsanwalt").hide();
    $(".vehicle-info").hide();
    $(".vehicle-information-allgemein").hide();
    $(".vehicle-information-fahrzeugdaten").hide();
    $(".vehicle-information-reifen").hide();
    $(".vehicle-license").hide();
    $(".vehicle-image").hide();
    $(".schadensbeschreibung").hide();
    $(".fehler").hide();
    window.scrollTo({ top: 0, behavior: "smooth" });
});
$("#unfallgegnerCard").click(function() {
    $(".dashboard").hide();
    $(".overview").hide();
    $(".login").hide();
    $(".auftraege").hide();
    $(".order-details").hide();
    $(".order-adresses").hide();
    $(".abtretungs-erklaerung").hide();
    $(".abtretungs-erklaerung-signature").hide();
    $(".order-adresses-vehicleOwner").hide();
    $(".order-adresses-auftraggeber").hide();
    $(".order-adresses-anspruchsteller").hide();
    $(".order-adresses-reperaturfirma").hide();
    $(".order-adresses-unfallgegner").show();
    $(".order-adresses-rechtsanwalt").hide();
    $(".vehicle-info").hide();
    $(".vehicle-information-allgemein").hide();
    $(".vehicle-information-fahrzeugdaten").hide();
    $(".vehicle-information-reifen").hide();
    $(".vehicle-license").hide();
    $(".vehicle-image").hide();
    $(".schadensbeschreibung").hide();
    $(".fehler").hide();
    window.scrollTo({ top: 0, behavior: "smooth" });
});
$("#rechtsanwaltCard").click(function() {
    $(".dashboard").hide();
    $(".overview").hide();
    $(".login").hide();
    $(".auftraege").hide();
    $(".order-details").hide();
    $(".order-adresses").hide();
    $(".abtretungs-erklaerung").hide();
    $(".abtretungs-erklaerung-signature").hide();
    $(".order-adresses-vehicleOwner").hide();
    $(".order-adresses-auftraggeber").hide();
    $(".order-adresses-anspruchsteller").hide();
    $(".order-adresses-reperaturfirma").hide();
    $(".order-adresses-unfallgegner").hide();
    $(".order-adresses-rechtsanwalt").show();
    $(".vehicle-info").hide();
    $(".vehicle-information-allgemein").hide();
    $(".vehicle-information-fahrzeugdaten").hide();
    $(".vehicle-information-reifen").hide();
    $(".vehicle-license").hide();
    $(".vehicle-image").hide();
    $(".schadensbeschreibung").hide();
    $(".fehler").hide();
    window.scrollTo({ top: 0, behavior: "smooth" });
});
$("#abtretungsErklaerungCard").click(function() {
    $(".dashboard").hide();
    $(".overview").hide();
    $(".login").hide();
    $(".auftraege").hide();
    $(".order-details").hide();
    $(".order-adresses").hide();
    $(".abtretungs-erklaerung").show();
    $(".abtretungs-erklaerung-signature").hide();
    $(".order-adresses-vehicleOwner").hide();
    $(".order-adresses-auftraggeber").hide();
    $(".order-adresses-anspruchsteller").hide();
    $(".order-adresses-reperaturfirma").hide();
    $(".order-adresses-unfallgegner").hide();
    $(".order-adresses-rechtsanwalt").hide();
    $(".vehicle-info").hide();
    $(".vehicle-information-allgemein").hide();
    $(".vehicle-information-fahrzeugdaten").hide();
    $(".vehicle-information-reifen").hide();
    $(".vehicle-license").hide();
    $(".vehicle-image").hide();
    $(".schadensbeschreibung").hide();
    $(".fehler").hide();
    window.scrollTo({ top: 0, behavior: "smooth" });
});
$("body").on("click", "#btnSignature", function() {
    $(".dashboard").hide();
    $(".overview").hide();
    $(".login").hide();
    $(".auftraege").hide();
    $(".order-details").hide();
    $(".order-adresses").hide();
    $(".abtretungs-erklaerung").hide();
    $(".abtretungs-erklaerung-signature").show();
    $(".order-adresses-vehicleOwner").hide();
    $(".order-adresses-auftraggeber").hide();
    $(".order-adresses-anspruchsteller").hide();
    $(".order-adresses-reperaturfirma").hide();
    $(".order-adresses-unfallgegner").hide();
    $(".order-adresses-rechtsanwalt").hide();
    $(".vehicle-info").hide();
    $(".vehicle-information-allgemein").hide();
    $(".vehicle-information-fahrzeugdaten").hide();
    $(".vehicle-information-reifen").hide();
    $(".vehicle-license").hide();
    $(".vehicle-image").hide();
    $(".schadensbeschreibung").hide();
    $(".fehler").hide();
    window.scrollTo({ top: 0, behavior: "smooth" });
});
$("#vehicleInfoCard").click(function() {
    $(".dashboard").hide();
    $(".overview").hide();
    $(".login").hide();
    $(".auftraege").hide();
    $(".order-details").hide();
    $(".order-adresses").hide();
    $(".abtretungs-erklaerung").hide();
    $(".abtretungs-erklaerung-signature").hide();
    $(".order-adresses-vehicleOwner").hide();
    $(".order-adresses-auftraggeber").hide();
    $(".order-adresses-anspruchsteller").hide();
    $(".order-adresses-reperaturfirma").hide();
    $(".order-adresses-unfallgegner").hide();
    $(".order-adresses-rechtsanwalt").hide();
    $(".vehicle-info").show();
    $(".vehicle-information-allgemein").hide();
    $(".vehicle-information-fahrzeugdaten").hide();
    $(".vehicle-information-reifen").hide();
    $(".vehicle-license").hide();
    $(".vehicle-image").hide();
    $(".schadensbeschreibung").hide();
    $(".fehler").hide();
    window.scrollTo({ top: 0, behavior: "smooth" });
});
$("#vehicleInformationFahrzeugdatenCard").click(function() {
    $(".dashboard").hide();
    $(".overview").hide();
    $(".login").hide();
    $(".auftraege").hide();
    $(".order-details").hide();
    $(".order-adresses").hide();
    $(".abtretungs-erklaerung").hide();
    $(".abtretungs-erklaerung-signature").hide();
    $(".order-adresses-vehicleOwner").hide();
    $(".order-adresses-auftraggeber").hide();
    $(".order-adresses-anspruchsteller").hide();
    $(".order-adresses-reperaturfirma").hide();
    $(".order-adresses-unfallgegner").hide();
    $(".order-adresses-rechtsanwalt").hide();
    $(".vehicle-info").hide();
    $(".vehicle-information-allgemein").hide();
    $(".vehicle-information-fahrzeugdaten").show();
    $(".vehicle-information-reifen").hide();
    $(".vehicle-license").hide();
    $(".vehicle-image").hide();
    $(".schadensbeschreibung").hide();
    $(".fehler").hide();
    window.scrollTo({ top: 0, behavior: "smooth" });
});
$("#vehicleInformationAllgemeinCard").click(function() {
    $(".dashboard").hide();
    $(".overview").hide();
    $(".login").hide();
    $(".auftraege").hide();
    $(".order-details").hide();
    $(".order-adresses").hide();
    $(".abtretungs-erklaerung").hide();
    $(".abtretungs-erklaerung-signature").hide();
    $(".order-adresses-vehicleOwner").hide();
    $(".order-adresses-auftraggeber").hide();
    $(".order-adresses-anspruchsteller").hide();
    $(".order-adresses-reperaturfirma").hide();
    $(".order-adresses-unfallgegner").hide();
    $(".order-adresses-rechtsanwalt").hide();
    $(".vehicle-info").hide();
    $(".vehicle-information-allgemein").show();
    $(".vehicle-information-fahrzeugdaten").hide();
    $(".vehicle-information-reifen").hide();
    $(".vehicle-license").hide();
    $(".vehicle-image").hide();
    $(".schadensbeschreibung").hide();
    $(".fehler").hide();
    window.scrollTo({ top: 0, behavior: "smooth" });
});
$("#vehicleInformationReifenCard").click(function() {
    $(".dashboard").hide();
    $(".overview").hide();
    $(".login").hide();
    $(".auftraege").hide();
    $(".order-details").hide();
    $(".order-adresses").hide();
    $(".abtretungs-erklaerung").hide();
    $(".abtretungs-erklaerung-signature").hide();
    $(".order-adresses-vehicleOwner").hide();
    $(".order-adresses-auftraggeber").hide();
    $(".order-adresses-anspruchsteller").hide();
    $(".order-adresses-reperaturfirma").hide();
    $(".order-adresses-unfallgegner").hide();
    $(".order-adresses-rechtsanwalt").hide();
    $(".vehicle-info").hide();
    $(".vehicle-information-allgemein").hide();
    $(".vehicle-information-fahrzeugdaten").hide();
    $(".vehicle-information-reifen").show();
    $(".vehicle-license").hide();
    $(".vehicle-image").hide();
    $(".schadensbeschreibung").hide();
    $(".fehler").hide();
    window.scrollTo({ top: 0, behavior: "smooth" });
});
$("#vehicleLicenseCard").click(function() {
    $(".dashboard").hide();
    $(".overview").hide();
    $(".login").hide();
    $(".auftraege").hide();
    $(".order-details").hide();
    $(".order-adresses").hide();
    $(".abtretungs-erklaerung").hide();
    $(".abtretungs-erklaerung-signature").hide();
    $(".order-adresses-vehicleOwner").hide();
    $(".order-adresses-auftraggeber").hide();
    $(".order-adresses-anspruchsteller").hide();
    $(".order-adresses-reperaturfirma").hide();
    $(".order-adresses-unfallgegner").hide();
    $(".order-adresses-rechtsanwalt").hide();
    $(".vehicle-info").hide();
    $(".vehicle-information-allgemein").hide();
    $(".vehicle-information-fahrzeugdaten").hide();
    $(".vehicle-information-reifen").hide();
    $(".vehicle-license").show();
    $(".vehicle-image").hide();
    $(".schadensbeschreibung").hide();
    $(".fehler").hide();
    window.scrollTo({ top: 0, behavior: "smooth" });
});
$("#vehicleImageCard").click(function() {
    $(".dashboard").hide();
    $(".overview").hide();
    $(".login").hide();
    $(".auftraege").hide();
    $(".order-details").hide();
    $(".order-adresses").hide();
    $(".abtretungs-erklaerung").hide();
    $(".abtretungs-erklaerung-signature").hide();
    $(".order-adresses-vehicleOwner").hide();
    $(".order-adresses-auftraggeber").hide();
    $(".order-adresses-anspruchsteller").hide();
    $(".order-adresses-reperaturfirma").hide();
    $(".order-adresses-unfallgegner").hide();
    $(".order-adresses-rechtsanwalt").hide();
    $(".vehicle-info").hide();
    $(".vehicle-information-allgemein").hide();
    $(".vehicle-information-fahrzeugdaten").hide();
    $(".vehicle-information-reifen").hide();
    $(".vehicle-license").hide();
    $(".vehicle-image").show();
    $(".schadensbeschreibung").hide();
    $(".fehler").hide();
    window.scrollTo({ top: 0, behavior: "smooth" });
});
$("#schadensbeschreibungCard").click(function() {
    $(".dashboard").hide();
    $(".overview").hide();
    $(".login").hide();
    $(".auftraege").hide();
    $(".order-details").hide();
    $(".order-adresses").hide();
    $(".abtretungs-erklaerung").hide();
    $(".abtretungs-erklaerung-signature").hide();
    $(".order-adresses-vehicleOwner").hide();
    $(".order-adresses-auftraggeber").hide();
    $(".order-adresses-anspruchsteller").hide();
    $(".order-adresses-reperaturfirma").hide();
    $(".order-adresses-unfallgegner").hide();
    $(".order-adresses-rechtsanwalt").hide();
    $(".vehicle-info").hide();
    $(".vehicle-information-allgemein").hide();
    $(".vehicle-information-fahrzeugdaten").hide();
    $(".vehicle-information-reifen").hide();
    $(".vehicle-license").hide();
    $(".vehicle-image").hide();
    $(".schadensbeschreibung").show();
    $(".fehler").hide();
    window.scrollTo({ top: 0, behavior: "smooth" });
});

var isBottom = "false";
var a = 0;

$("#dashboardBottom").click(function() {
    isBottom = "true";
    $("#dashboard").trigger("click");
});
$(".navbar-logo").click(function() {
    isBottom = "true";
    $("#dashboard").trigger("click");
});
// Veri Gönderme İşlemleri
var form1,
    form2,
    form3,
    form4,
    form5,
    form6,
    form7,
    form8,
    form9,
    form10,
    form11;
var dataList = new Array();
var form = {};
var forms = [];
$("#addNewCase").click(function() {
    isBottom = "true";
    document.getElementById("orderDetails").reset();
    document.getElementById("vehicleOwner").reset();
    document.getElementById("auftraggeber").reset();
    document.getElementById("anspruchsteller").reset();
    document.getElementById("reperaturFirma").reset();
    document.getElementById("unfallgegner").reset();
    document.getElementById("rechtsanwalt").reset();
    document.getElementById("vehicleGeneral").reset();
    document.getElementById("vehicleData").reset();
    document.getElementById("vehicleTires").reset();
    document.getElementById("ruhsat").reset();
    document.getElementById("gorseller").reset();
    document.getElementById("schadensbeschreibung").reset();
    $("#abtretungsErklaerungCard").find(".progress-pie-chart").data("percent", 0);
    $("#auftragsDetailsCard").find(".progress-pie-chart").data("percent", 0);
    $("#auftragsAdressenCard").find(".progress-pie-chart").data("percent", 0);
    $("#allgemein").find(".progress-pie-chart").data("percent", 0);
    $("#fahrzeugzustand").find(".progress-pie-chart").data("percent", 0);
    $("#reifen").find(".progress-pie-chart").data("percent", 0);
    pieChart();
    document.getElementById("cardUnterschrift").innerHTML = "-";
    //new ve edit sayfalarındaki cardlara değer atama
    var sigortaKarsi = $("#versicherungUnfalgegner :selected").text();
    if (sigortaKarsi == "Choose...") {
        sigortaKarsi = "-";
    }
    document.getElementById(
        "cardVersicherungUnfallgegner"
    ).innerHTML = sigortaKarsi;
    var kazaGunu = $("#schadenstag").val();
    if (kazaGunu == "") {
        kazaGunu = "-";
    }
    document.getElementById("cardSchadenstag").innerHTML = kazaGunu;
    var plakaKarsi = $("#kennzeichenUnfallgegner").val();
    if (plakaKarsi == "") {
        plakaKarsi = "-";
    }
    //new ve edit sayfalarındaki cardlara değer atama
    var aracSahibi =
        $("#nameVehicleOwner").val() + " " + $("#surnameVehicleOwner").val();
    if (aracSahibi == "") {
        aracSahibi = "-";
    }
    document.getElementById("cardFahrzeughalter").innerHTML = aracSahibi;
    var tamirciFirma = $("#nameReperaturFirma").val();
    if (tamirciFirma == "") {
        tamirciFirma = "-";
    }
    document.getElementById("cardReperaturfirma").innerHTML = tamirciFirma;
    var avukatAd = $("#nameRechtsanwalt").val();
    var avukatSoyad = $("#surnameRechtsanwalt").val();
    if (
        (avukatAd == undefined && avukatSoyad == undefined) ||
        (avukatAd == "" && avukatSoyad == "")
    ) {
        var avukat = avukatAd + " " + avukatSoyad;
        avukat = "-";
    }
    var avukat = avukatAd + " " + avukatSoyad;

    document.getElementById("cardRechtsanwalt").innerHTML = avukat;
    //new ve edit sayfalarındaki cardlara değer atama
    var plaka = $("#VehicleLicensePlate").val();
    if (plaka == "") {
        plaka = "-";
    }
    document.getElementById("cardKennzeichen").innerHTML = plaka;
    var ilkKayit = $("#VehicleFirstRegistration").val();
    if (ilkKayit == "") {
        ilkKayit = "-";
    }
    document.getElementById("cardErstzulassung").innerHTML = ilkKayit;
    var km = $("#VehicleMileage").val();
    if (km == "") {
        km = "-";
    }
    document.getElementById("cardLaufleistung").innerHTML = km;
    //new ve edit sayfalarındaki cardlara değer atama
    var lastikler = $("#vehicleTires").val();
    if (lastikler == "") {
        lastikler = "-";
    }
    document.getElementById("cardReifen").innerHTML = lastikler;
    var on =
        $("#VehicleProDepthInFrontL").val() +
        "-" +
        $("#VehicleProDepthInFrontR").val();
    if (on == "") {
        on = "-";
    }
    document.getElementById("cardProfitiefeVorne").innerHTML = on;
    var arka =
        $("#VehicleRearProDepthL").val() + "-" + $("#VehicleRearProDepthR").val();
    if (arka == "") {
        arka = "-";
    }
    document.getElementById("cardProfitiefeHinten").innerHTML = arka;
    document.getElementById("cardKennzeichenUnfallgegner").innerHTML = plakaKarsi;
    document.getElementsByClassName("image1")[0].style = "";
    document.getElementsByClassName("image2")[0].style = "";
    document.getElementsByClassName("image3")[0].style = "";
    document.getElementsByClassName("image4")[0].style = "";
    document.getElementsByClassName("image5")[0].style = "";
    document.getElementsByClassName("image6")[0].style = "";
    document.getElementsByClassName("image7")[0].style = "";
    document.getElementsByClassName("image8")[0].style = "";
    document.getElementsByClassName("image9")[0].style = "";
    $(".image1").find("input").val("");
    $(".image2").find("input").val("");
    $(".image3").find("input").val("");
    $(".image4").find("input").val("");
    $(".image5").find("input").val("");
    $(".image6").find("input").val("");
    $(".image7").find("input").val("");
    $(".image8").find("input").val("");
    $(".image9").find("input").val("");
    $(".imagePick1").find("input").val("");
    $(".imagePick2").find("input").val("");
    $(".imagePick3").find("input").val("");
    $(".imagePick4").find("input").val("");
    $(".imagePick5").find("input").val("");
    $(".imagePick6").find("input").val("");
    $(".imagePick7").find("input").val("");
    $(".imagePick8").find("input").val("");
    $(".imagePick9").find("input").val("");
    $(".takePhoto1").find("input").val("");
    $(".takePhoto2").find("input").val("");
    $(".takePhoto3").find("input").val("");
    $(".takePhoto4").find("input").val("");
    $(".takePhoto5").find("input").val("");
    $(".takePhoto6").find("input").val("");
    $(".takePhoto7").find("input").val("");
    $(".takePhoto8").find("input").val("");
    $(".takePhoto9").find("input").val("");
    var not = $("#gorusAciklama").val();
    if (not == "") {
        not = "Es ist keine Schadensbeschreibung vorhanden.";
    }
    document.getElementById("cardSchadensbeschreibung").innerHTML = not;
    //Fehler sayfası verileri default hale getirme
    document.getElementById("fehlerDetails").innerHTML = "6 Probleme";
    document.getElementById("fehlerAdressen").innerHTML = "31 Probleme";
    document.getElementById("fehlerAbtretungserklärung").innerHTML = "1 Problem";
    document.getElementById("fehlerFahrzeugdaten").innerHTML = "22 Probleme";
    document.getElementById("fehlerFahrzeugschein").innerHTML = "1 Problem";
    document.getElementById("fehlerFahrzeugbilder").innerHTML = "8 Probleme";
    document.getElementById("fehlerSchadensbeschreibung").innerHTML = "1 Problem";

    if (isEdit2 == true) {
        isEdit2 = false;
    }
    a++;
    if (a == 1) {
        console.log("Bottom menu yeni case tiklanma:" + a);
        form1 = ako.getFormData($("#orderDetails"));
        console.log(form1);
        form2 = ako.getFormData($("#vehicleOwner"));
        console.log(form2);
        form3 = ako.getFormData($("#auftraggeber"));
        console.log(form3);
        form4 = ako.getFormData($("#anspruchsteller"));
        console.log(form4);
        form5 = ako.getFormData($("#reperaturFirma"));
        console.log(form5);
        form6 = ako.getFormData($("#unfallgegner"));
        console.log(form6);
        form7 = ako.getFormData($("#rechtsanwalt"));
        console.log(form7);
        form8 = ako.getFormData($("#vehicleGeneral"));
        console.log(form8);
        form9 = ako.getFormData($("#vehicleData"));
        console.log(form9);
        form10 = ako.getFormData($("#vehicleTires"));
        console.log(form10);
        form11 = ako.getFormData($("#schadensbeschreibung"));
        console.log(form11);
        form12 = {
            RuhsatGorseli: "",
            Gorsel1: "",
            Gorsel2: "",
            Gorsel3: "",
            Gorsel4: "",
            Gorsel5: "",
            Gorsel6: "",
            Gorsel7: "",
            Gorsel8: ""
        };
        console.log(form12);
        forms[0] = form1;
        forms[1] = form2;
        forms[2] = form3;
        forms[3] = form4;
        forms[4] = form5;
        forms[5] = form6;
        forms[6] = form7;
        forms[7] = form8;
        forms[8] = form9;
        forms[9] = form10;
        forms[10] = form11;
        forms[11] = form12;
    }
    var name = "New Case";
    $("#ubersicht").text(name);
    $("#auftrag").trigger("click");
});
$("#auftraegeBottom").click(function() {
    isBottom = "true";
    $("#auftraege").trigger("click");
});
//turn back başlangıç
var isBack = "false";
$("#btnBack1").click(function() {
    isBack = "true";
    $("#auftrag").trigger("click");
});
$("#btnBack2").click(function() {
    isBack = "true";
    $("#auftrag").trigger("click");
});
$("#btnBack3").click(function() {
    isBack = "true";
    $("#auftrag").trigger("click");
});
$("#btnBack4").click(function() {
    $("#auftragsAdressenCard").trigger("click");
});
$("#btnBack5").click(function() {
    $("#auftragsAdressenCard").trigger("click");
});
$("#btnBack6").click(function() {
    $("#auftragsAdressenCard").trigger("click");
});
$("#btnBack7").click(function() {
    $("#auftragsAdressenCard").trigger("click");
});
$("#btnBack8").click(function() {
    $("#auftragsAdressenCard").trigger("click");
});
$("#btnBack9").click(function() {
    $("#auftragsAdressenCard").trigger("click");
});
$("#btnBack10").click(function() {
    isBack = "true";
    $("#auftrag").trigger("click");
});
$("#btnBack11").click(function() {
    isBack = "true";
    $("#auftrag").trigger("click");
});
$("#btnBack12").click(function() {
    isBack = "true";
    $("#auftrag").trigger("click");
});
$("#btnBack13").click(function() {
    isBack = "true";
    $("#auftrag").trigger("click");
});
$("#btnBack14").click(function() {
    isBack = "true";
    $("#auftrag").trigger("click");
});
$("#btnBack15").click(function() {
    isBack = "true";
    $("#vehicleInfoCard").trigger("click");
});
$("#btnBack16").click(function() {
    isBack = "true";
    $("#vehicleInfoCard").trigger("click");
});
$("#btnBack17").click(function() {
    isBack = "true";
    $("#vehicleInfoCard").trigger("click");
});
//turn back bitiş
// Fehler Page Yönlendirmeler başlangıç
$("#goAuftragsdetailsPage").click(function() {
    isBack = "true";
    $("#auftragsDetailsCard").trigger("click");
});
$("#goAuftragsadressenPage").click(function() {
    isBack = "true";
    $("#auftragsAdressenCard").trigger("click");
});
$("#goAbtretungserklärungPage").click(function() {
    isBack = "true";
    $("#abtretungsErklaerungCard").trigger("click");
});
$("#goFahrzeugdatenaPage").click(function() {
    isBack = "true";
    $("#vehicleInfoCard").trigger("click");
});
$("#goFahrzeugscheinPage").click(function() {
    isBack = "true";
    $("#vehicleLicenseCard").trigger("click");
});
$("#goFahrzeugbilderPage").click(function() {
    isBack = "true";
    $("#vehicleImageCard").trigger("click");
});
$("#goNotenPage").click(function() {
    isBack = "true";
    $("#schadensbeschreibungCard").trigger("click");
});
$("#closeFehler").click(function() {
    isBack = "true";
    $("#auftrag").trigger("click");
});
// Fehler Page Yönlendirmeler başlangıç bitiş
//navbar yönlendirmeler bitiş
//take or select photo başlangıç
("use strict");

var setEventListeners = function(uploadBox) {
    var previewContainer = uploadBox.querySelectorAll(".jst-preview")[0];
    var fileInputs = uploadBox.querySelectorAll('[type="file"]');

    var previewImage = function(event) {
        var file = event.target.files[0];
        var imageType = /image.*/;

        if (typeof FileReader !== "undefined" && file.type.match(imageType)) {
            var reader = new FileReader();

            reader.onload = function() {
                previewContainer.style.backgroundImage = "url(" + reader.result + ")";
            };

            reader.readAsDataURL(file);
        }
    };

    for (var k = 0; k < fileInputs.length; k++) {
        fileInputs[k].addEventListener("change", previewImage);
    }
};

var uploadBoxes = document.querySelectorAll(".js-fileupload");

for (var j = 0; j < uploadBoxes.length; j++) {
    var uploadBox = uploadBoxes[j];

    setEventListeners(uploadBox);
}

//take or select photo bitiş

/* , switcher 
	var langs = getParameterValue("lang");
	langs != "" ? langs : "";
	$("[data-localize]").localize("lang", {
		language: langs,
		pathPrefix: "lang",
		skipLanguage: /^en/,
		defaultLanguage: "tr",
		callback: function (data, defaultCallback) {
			document.title = data.name.name_light + " " + data.name.name_dark;
			defaultCallback(data);
			window.lName = data.name.name_light;
		}
	});
	function getParameterValue(parameter) {
		parameter = parameter.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regexS = "[\\?&]" + parameter + "=([^&#]*)";
		var regex = new RegExp(regexS);
		var results = regex.exec(window.location.href);
		if (results == null) return "";
		else return results[1];
	}*/
// ---------Responsive-navbar-active-animation-----------
function test() {
    var tabsNewAnim = $("#navbarSupportedContent");
    var selectorNewAnim = $("#navbarSupportedContent").find("li").length;
    var activeItemNewAnim = tabsNewAnim.find(".active");
    var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
    var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
    var itemPosNewAnimTop = activeItemNewAnim.position();
    var itemPosNewAnimLeft = activeItemNewAnim.position();
    $(".hori-selector").css({
        top: itemPosNewAnimTop.top + "px",
        left: itemPosNewAnimLeft.left + "px",
        height: activeWidthNewAnimHeight + "px",
        width: activeWidthNewAnimWidth + "px"
    });
    $("#navbarSupportedContent").on("click", "li", function(e) {
        $("#navbarSupportedContent ul li").removeClass("active");
        $(this).addClass("active");
        var activeWidthNewAnimHeight = $(this).innerHeight();
        var activeWidthNewAnimWidth = $(this).innerWidth();
        var itemPosNewAnimTop = $(this).position();
        var itemPosNewAnimLeft = $(this).position();
        $(".hori-selector").css({
            top: itemPosNewAnimTop.top + "px",
            left: itemPosNewAnimLeft.left + "px",
            height: activeWidthNewAnimHeight + "px",
            width: activeWidthNewAnimWidth + "px"
        });
    });
}
$(document).ready(function() {
    setTimeout(function() {
        test();
    });
});
$(window).on("resize", function() {
    setTimeout(function() {
        test();
    }, 500);
});
$(".navbar-toggler").click(function() {
    $(".navbar-collapse").slideToggle(300);
    setTimeout(function() {
        test();
    });
});

// --------------add active class-on another-page move----------
jQuery(document).ready(function($) {
    // Get current path and find target link
    var path = window.location.pathname.split("/").pop();

    // Account for home page with empty path
    if (path == "") {
        path = "index.html";
    }

    var target = $('#navbarSupportedContent ul li a[href="' + path + '"]');
    // Add active class to target link
    target.parent().addClass("active");
});

// Add active class on another page linked
// ==========================================
// $(window).on('load',function () {
//     var current = location.pathname;
//     console.log(current);
//     $('#navbarSupportedContent ul li a').each(function(){
//         var $this = $(this);
//         // if the current path is like this link, make it active
//         if($this.attr('href').indexOf(current) !== -1){
//             $this.parent().addClass('active');
//             $this.parents('.menu-submenu').addClass('show-dropdown');
//             $this.parents('.menu-submenu').parent().addClass('active');
//         }else{
//             $this.parent().removeClass('active');
//         }
//     })
// });
//----------------E-signature js başlangıç
(function() {
    window.requestAnimFrame = (function(callback) {
        return (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimaitonFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            }
        );
    })();

    var canvas = document.getElementById("sig-canvas");
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#222222";
    ctx.lineWidth = 4;

    var drawing = false;
    var mousePos = {
        x: 0,
        y: 0
    };
    var lastPos = mousePos;

    canvas.addEventListener(
        "mousedown",
        function(e) {
            drawing = true;
            lastPos = getMousePos(canvas, e);
        },
        false
    );

    canvas.addEventListener(
        "mouseup",
        function(e) {
            drawing = false;
        },
        false
    );

    canvas.addEventListener(
        "mousemove",
        function(e) {
            mousePos = getMousePos(canvas, e);
        },
        false
    );

    // Add touch event support for mobile
    canvas.addEventListener("touchstart", function(e) {}, false);

    canvas.addEventListener(
        "touchmove",
        function(e) {
            var touch = e.touches[0];
            var me = new MouseEvent("mousemove", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(me);
        },
        false
    );

    canvas.addEventListener(
        "touchstart",
        function(e) {
            mousePos = getTouchPos(canvas, e);
            var touch = e.touches[0];
            var me = new MouseEvent("mousedown", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(me);
        },
        false
    );

    canvas.addEventListener(
        "touchend",
        function(e) {
            var me = new MouseEvent("mouseup", {});
            canvas.dispatchEvent(me);
        },
        false
    );

    function getMousePos(canvasDom, mouseEvent) {
        var rect = canvasDom.getBoundingClientRect();
        return {
            x: mouseEvent.clientX - rect.left,
            y: mouseEvent.clientY - rect.top
        };
    }

    function getTouchPos(canvasDom, touchEvent) {
        var rect = canvasDom.getBoundingClientRect();
        return {
            x: touchEvent.touches[0].clientX - rect.left,
            y: touchEvent.touches[0].clientY - rect.top
        };
    }

    function renderCanvas() {
        if (drawing) {
            ctx.moveTo(lastPos.x, lastPos.y);
            ctx.lineTo(mousePos.x, mousePos.y);
            ctx.stroke();
            lastPos = mousePos;
        }
    }

    // Prevent scrolling when touching the canvas
    document.body.addEventListener(
        "touchstart",
        function(e) {
            if (e.target == canvas) {
                e.preventDefault();
            }
        },
        false
    );
    document.body.addEventListener(
        "touchend",
        function(e) {
            if (e.target == canvas) {
                e.preventDefault();
            }
        },
        false
    );
    document.body.addEventListener(
        "touchmove",
        function(e) {
            if (e.target == canvas) {
                e.preventDefault();
            }
        },
        false
    );

    (function drawLoop() {
        requestAnimFrame(drawLoop);
        renderCanvas();
    })();

    function clearCanvas() {
        canvas.width = canvas.width;
    }

    // Set up the UI
    var sigText = document.getElementById("sig-dataUrl");
    var sigImage = document.getElementById("sig-image");
    var clearBtn = document.getElementById("sig-clearBtn");
    var submitBtn = document.getElementById("sig-submitBtn");
    clearBtn.addEventListener(
        "click",
        function(e) {
            clearCanvas();
            sigText.innerHTML = "Data URL for your signature will go here!";
            sigImage.setAttribute("src", "");
        },
        false
    );
    submitBtn.addEventListener(
        "click",
        function(e) {
            var dataUrl = canvas.toDataURL();
            sigText.innerHTML = dataUrl;
            sigImage.setAttribute("src", dataUrl);
        },
        false
    );
})();
//----------------E-Signature js son

/// -------- Pie Chart başlangıç
$(".progress-pie-chart").each(function() {
    var $ppc = $(this),
        percent = parseInt($ppc.data("percent")),
        deg = (360 * percent) / 100;
    if (percent > 50) {
        $ppc.addClass("gt-50");
    }
    if (percent <= 25) {
        $ppc.addClass("red");
    } else if (percent >= 25 && percent <= 90) {
        $ppc.addClass("orange");
    } else if (percent >= 90) {
        $ppc.addClass("green");
    }

    $ppc.find(".ppc-progress-fill").css("transform", "rotate(" + deg + "deg)");
    $ppc.find(".ppc-percents span").html("<cite>" + percent + "</cite>" + "%");
});

function pieChart() {
    $(".progress-pie-chart").each(function() {
        var $ppc = $(this),
            percent = parseInt($ppc.data("percent")),
            deg = (360 * percent) / 100;
        if (percent > 50) {
            $ppc.addClass("gt-50");
        }
        if (percent <= 25 && percent > 0) {
            $ppc.addClass("red");
            $ppc.removeClass("green");
        } else if (percent >= 25 && percent <= 90) {
            $ppc.addClass("orange");
        } else if (percent >= 90) {
            $ppc.addClass("green");
        } else if (percent == 0) {
            $ppc.addClass("red");
            $ppc.removeClass("green");
            $ppc.removeClass("orange");
            $ppc.removeClass("gt-50");
        }

        $ppc.find(".ppc-progress-fill").css("transform", "rotate(" + deg + "deg)");
        $ppc.find(".ppc-percents span").html("<cite>" + percent + "</cite>" + "%");
    });
}

/// -------- Pie Chart bitiş

var isEdit = false;
var isEdit2 = false;

$("body").on("click", ".btnEditRow", function() {
    document.getElementsByClassName("image1")[0].style = "";
    document.getElementsByClassName("image2")[0].style = "";
    document.getElementsByClassName("image3")[0].style = "";
    document.getElementsByClassName("image4")[0].style = "";
    document.getElementsByClassName("image5")[0].style = "";
    document.getElementsByClassName("image6")[0].style = "";
    document.getElementsByClassName("image7")[0].style = "";
    document.getElementsByClassName("image8")[0].style = "";
    document.getElementsByClassName("image9")[0].style = "";
    $(".image1").find("input").val("");
    $(".image2").find("input").val("");
    $(".image3").find("input").val("");
    $(".image4").find("input").val("");
    $(".image5").find("input").val("");
    $(".image6").find("input").val("");
    $(".image7").find("input").val("");
    $(".image8").find("input").val("");
    $(".image9").find("input").val("");
    $(".imagePick1").find("input").val("");
    $(".imagePick2").find("input").val("");
    $(".imagePick3").find("input").val("");
    $(".imagePick4").find("input").val("");
    $(".imagePick5").find("input").val("");
    $(".imagePick6").find("input").val("");
    $(".imagePick7").find("input").val("");
    $(".imagePick8").find("input").val("");
    $(".imagePick9").find("input").val("");
    $(".takePhoto1").find("input").val("");
    $(".takePhoto2").find("input").val("");
    $(".takePhoto3").find("input").val("");
    $(".takePhoto4").find("input").val("");
    $(".takePhoto5").find("input").val("");
    $(".takePhoto6").find("input").val("");
    $(".takePhoto7").find("input").val("");
    $(".takePhoto8").find("input").val("");
    $(".takePhoto9").find("input").val("");
    var eksperRecordId = localStorage.getItem("eksperRecordId", eksperRecordId);
    localStorage.clear();
    localStorage.setItem("eksperRecordId", eksperRecordId);
    //var imageRuhsat = $(".image9").find("input").prop("files");
    var dosyaNo = "",
        sigortaEksperi = "",
        servisAdi = "",
        servisTelNo = "",
        araciKullananinAdi = "",
        recordId = "";
    var $this = $(this);
    var tr = $this.parents("tr");

    var dosyaNo = tr.find("td[id=dosyaNo]").text();
    var servisAdi = tr.find("td[id=servisAdi]").attr("servisAdi");
    recordId = tr.data("recordid");
    console.log(recordId);
    localStorage.setItem("recordId", recordId);
    localStorage.setItem("dosyaNo", dosyaNo);
    var url3 =
        "http://localhost:52129/api/ako/KazaBilgisiGetir?recordId=" + recordId;
    var realUrl3 =
        "https://templateprocess.setcrm.com/api/ako/KazaBilgisiGetir?recordId=" +
        recordId;
    ako.getRecordData(realUrl3);

    //debugger;

    //servisAdi = tr.find().val();
    isEdit = true;
    isEdit2 = true;
    $("#auftrag").trigger("click");
    $("#ubersicht").text("Case: " + dosyaNo);
});

// Veri Gönderme İşlemleri
$("#orderDetails").on("submit", function(event) {
    event.preventDefault();
    form1 = ako.getFormData($("#orderDetails"));
    console.log(form1);
    var i,
        emptyCounter = 0,
        fullCounter = 0,
        procent = 0;
    for (var i in form1) {
        if (form1[i] != "") {
            fullCounter++;
        } else {
            emptyCounter++;
        }
    }
    console.log(emptyCounter);
    document.getElementById("fehlerDetails").innerHTML =
        emptyCounter + " Probleme";
    console.log(fullCounter);
    procent = fullCounter / (emptyCounter + fullCounter);
    procent = procent * 100;
    console.log(procent);
    //procent = procent.toString();
    $("#auftragsDetailsCard").find(".progress-pie-chart").data("percent", procent);
    forms[0] = form1;
    isBack = "true";
    pieChart();
    //new ve edit sayfalarındaki cardlara değer atama
    var sigortaKarsi = $("#versicherungUnfalgegner :selected").text();
    if (sigortaKarsi == "Choose...") {
        sigortaKarsi = "-";
    }
    document.getElementById(
        "cardVersicherungUnfallgegner"
    ).innerHTML = sigortaKarsi;
    var kazaGunu = $("#schadenstag").val();
    if (kazaGunu == "") {
        kazaGunu = "-";
    }
    document.getElementById("cardSchadenstag").innerHTML = kazaGunu;
    var plakaKarsi = $("#kennzeichenUnfallgegner").val();
    if (plakaKarsi == "") {
        plakaKarsi = "-";
    }
    document.getElementById("cardKennzeichenUnfallgegner").innerHTML = plakaKarsi;
    $("#auftrag").trigger("click");
});
var p1 = 0,
    p2 = 0,
    p3 = 0,
    p4 = 0,
    p5 = 0,
    p6 = 0,
    e1 = 0,
    e2 = 0,
    e3 = 0,
    e4 = 0,
    e5 = 0,
    e6 = 0;
$("#fertigAdresses").click(function() {
    console.log(p1 + p2 + p3 + p4 + p5 + p6);
    var totalProcent = (p1 + p2 + p3 + p4 + p5 + p6) / 6;
    console.log(totalProcent);
    var totalEmptyField = e1 + e2 + e3 + e4 + e5 + e6;
    document.getElementById("fehlerAdressen").innerHTML =
        totalEmptyField + " Probleme";
    $("#auftragsAdressenCard")
        .find(".progress-pie-chart")
        .data("percent", totalProcent);
    isBack = "true";
    pieChart();
    $("#auftrag").trigger("click");
});
var isSignaSave = false;
var isClear = false;
$("#sig-submitBtn").click(function() {
    isSignaSave = true;
    if (isClear == true) {
        $("#abtretungsErklaerungCard").find(".progress-pie-chart").data("percent", 0);
        document.getElementById("cardUnterschrift").innerHTML = "-";
        document.getElementById("fehlerAbtretungserklärung").innerHTML = "1 Problem";
    } else {
        $("#abtretungsErklaerungCard")
            .find(".progress-pie-chart")
            .data("percent", 100);
        document.getElementById("cardUnterschrift").innerHTML = "Komplett";
        document.getElementById("fehlerAbtretungserklärung").innerHTML =
            "Kein Problem";
    }
    isBack = "true";
    pieChart();
    $("#auftrag").trigger("click");
    Toast.fire({
        icon: "success",
        title: "Saved in successfully"
    });
    document.getElementById("fehlerAbtretungserklärung").innerHTML =
        "Kein Problem";
    isSignaSave = false;
    isClear = false;
});
const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    }
});
$("#cancelSigna").click(function() {
    Swal.fire({
        title: "Warning!",
        html: "If you exit without saving. Are you sure?",
        allowOutsideClick: false,
        showDenyButton: true
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire("Changes are not saved", "", "info");
            pieChart();
            isClear = false;
            document.getElementById("fehlerAbtretungserklärung").innerHTML = "1 Problem";
            $("#auftrag").trigger("click");
        }
    });
    isBack = "true";
});
$("#sig-clearBtn").click(function() {
    isClear = true;
});
$("#vehicleOwner").on("submit", function(event) {
    event.preventDefault();
    form2 = ako.getFormData($("#vehicleOwner"));
    console.log(form2);
    var i,
        emptyCounter = 0,
        fullCounter = 0;
    for (var i in form2) {
        if (form2[i] != "") {
            fullCounter++;
        } else {
            emptyCounter++;
        }
    }
    console.log(emptyCounter);
    e1 = emptyCounter;
    console.log(fullCounter);
    p1 = fullCounter / (emptyCounter + fullCounter);
    p1 = p1 * 100;
    console.log(p1);
    forms[1] = form2;
    isBack = "true";
    //new ve edit sayfalarındaki cardlara değer atama
    var aracSahibi =
        $("#nameVehicleOwner").val() + " " + $("#surnameVehicleOwner").val();
    if (aracSahibi == "") {
        aracSahibi = "-";
    }
    document.getElementById("cardFahrzeughalter").innerHTML = aracSahibi;
    $("#btnBack4").trigger("click");
});
$("#auftraggeber").on("submit", function(event) {
    event.preventDefault();
    form3 = ako.getFormData($("#auftraggeber"));
    console.log(form3);
    var i,
        emptyCounter = 0,
        fullCounter = 0;
    for (var i in form3) {
        if (form3[i] != "") {
            fullCounter++;
        } else {
            emptyCounter++;
        }
    }
    console.log(emptyCounter);
    e2 = emptyCounter;
    console.log(fullCounter);
    p2 = fullCounter / (emptyCounter + fullCounter);
    p2 = p2 * 100;
    console.log(p2);
    forms[2] = form3;
    isBack = "true";
    $("#btnBack5").trigger("click");
});
$("#anspruchsteller").on("submit", function(event) {
    event.preventDefault();
    form4 = ako.getFormData($("#anspruchsteller"));
    console.log(form4);
    var i,
        emptyCounter = 0,
        fullCounter = 0;
    for (var i in form4) {
        if (form4[i] != "") {
            fullCounter++;
        } else {
            emptyCounter++;
        }
    }
    console.log(emptyCounter);
    e3 = emptyCounter;
    console.log(fullCounter);
    p3 = fullCounter / (emptyCounter + fullCounter);
    p3 = p3 * 100;
    console.log(p3);
    forms[3] = form4;
    isBack = "true";
    $("#btnBack6").trigger("click");
});
$("#reperaturFirma").on("submit", function(event) {
    event.preventDefault();
    form5 = ako.getFormData($("#reperaturFirma"));
    console.log(form5);
    var i,
        emptyCounter = 0,
        fullCounter = 0;
    for (var i in form5) {
        if (form5[i] != "") {
            fullCounter++;
        } else {
            emptyCounter++;
        }
    }
    console.log(emptyCounter);
    e4 = emptyCounter;
    console.log(fullCounter);
    p4 = fullCounter / (emptyCounter + fullCounter);
    p4 = p4 * 100;
    console.log(p4);
    forms[4] = form5;
    isBack = "true";
    var tamirciFirma = $("#nameReperaturFirma").val();
    if (tamirciFirma == "") {
        tamirciFirma = "-";
    }
    document.getElementById("cardReperaturfirma").innerHTML = tamirciFirma;

    $("#btnBack7").trigger("click");
});
$("#unfallgegner").on("submit", function(event) {
    event.preventDefault();
    form6 = ako.getFormData($("#unfallgegner"));
    console.log(form6);
    var i,
        emptyCounter = 0,
        fullCounter = 0;
    for (var i in form6) {
        if (form6[i] != "") {
            fullCounter++;
        } else {
            emptyCounter++;
        }
    }
    console.log(emptyCounter);
    e5 = emptyCounter;
    console.log(fullCounter);
    p5 = fullCounter / (emptyCounter + fullCounter);
    p5 = p5 * 100;
    console.log(p5);
    forms[5] = form6;
    isBack = "true";
    $("#btnBack8").trigger("click");
});
$("#rechtsanwalt").on("submit", function(event) {
    event.preventDefault();
    form7 = ako.getFormData($("#rechtsanwalt"));
    console.log(form7);
    var i,
        emptyCounter = 0,
        fullCounter = 0;
    for (var i in form7) {
        if (form7[i] != "") {
            fullCounter++;
        } else {
            emptyCounter++;
        }
    }
    console.log(emptyCounter);
    e6 = emptyCounter;
    console.log(fullCounter);
    p6 = fullCounter / (emptyCounter + fullCounter);
    p6 = p6 * 100;
    console.log(p6);
    forms[6] = form7;
    isBack = "true";
    var avukat =
        $("#nameRechtsanwalt").val() + " " + $("#surnameRechtsanwalt").val();
    if (avukat == "" && avukat == undefined) {
        avukat = "-";
    }
    document.getElementById("cardRechtsanwalt").innerHTML = avukat;
    $("#btnBack9").trigger("click");
});
var empty1 = 0,
    empty2 = 0,
    empty3 = 0;
$("#vehicleTotalDaten").on("submit", function(event) {
    event.preventDefault();
    var totalEmptyField = empty1 + empty2 + empty3;
    document.getElementById("fehlerFahrzeugdaten").innerHTML =
        totalEmptyField + " Probleme";
    $("#auftrag").trigger("click");
});
$("#vehicleGeneral").on("submit", function(event) {
    event.preventDefault();
    form8 = ako.getFormData($("#vehicleGeneral"));
    console.log(form8);
    var i,
        emptyCounter = 0,
        fullCounter = 0,
        procent = 0;
    for (var i in form8) {
        if (form8[i] != "") {
            fullCounter++;
        } else {
            emptyCounter++;
        }
    }
    console.log("vehicleGenaral: " + emptyCounter);
    empty1 = emptyCounter;
    console.log(fullCounter);
    procent = fullCounter / (emptyCounter + fullCounter);
    procent = procent * 100;
    console.log(procent);
    //procent = procent.toString();
    $("#allgemein").find(".progress-pie-chart").data("percent", procent);
    forms[7] = form8;
    console.log(form[7]);
    isBack = "true";
    pieChart();
    //new ve edit sayfalarındaki cardlara değer atama
    var plaka = $("#VehicleLicensePlate").val();
    if (plaka == "") {
        plaka = "-";
    }
    document.getElementById("cardKennzeichen").innerHTML = plaka;
    var ilkKayit = $("#VehicleFirstRegistration").val();
    if (ilkKayit == "") {
        ilkKayit = "-";
    }
    document.getElementById("cardErstzulassung").innerHTML = ilkKayit;
    var km = $("#VehicleMileage").val();
    if (km == "") {
        km = "-";
    }
    document.getElementById("cardLaufleistung").innerHTML = km;
    $("#btnBack15").trigger("click");
});
$("#vehicleData").on("submit", function(event) {
    event.preventDefault();
    form9 = ako.getFormData($("#vehicleData"));
    console.log(form9);

    var i,
        emptyCounter = 0,
        fullCounter = 0,
        procent = 0;
    for (var i in form9) {
        if (form9[i] != "") {
            fullCounter++;
        } else {
            emptyCounter++;
        }
    }
    console.log("vehicleData: " + emptyCounter);
    empty2 = emptyCounter;
    console.log(fullCounter);
    procent = fullCounter / (emptyCounter + fullCounter);
    procent = procent * 100;
    console.log(procent);
    //procent = procent.toString();
    $("#fahrzeugzustand").find(".progress-pie-chart").data("percent", procent);
    forms[8] = form9;
    isBack = "true";
    //new ve edit sayfalarındaki cardlara değer atama
    var per = $("#fahrzeugzustand").find(".progress-pie-chart").data("percent");
    if (per == 100) {
        per = "Ja";
    } else {
        per = "-";
    }
    document.getElementById("cardFelderAusgefühlt").innerHTML = per;
    pieChart();
    $("#btnBack16").trigger("click");
});
$("#vehicleTires").on("submit", function(event) {
    event.preventDefault();
    form10 = ako.getFormData($("#vehicleTires"));
    console.log(form10);
    var i,
        emptyCounter = 0,
        fullCounter = 0,
        procent = 0;
    for (var i in form10) {
        if (form10[i] != "") {
            fullCounter++;
        } else {
            emptyCounter++;
        }
    }
    console.log("vehicleTires: " + emptyCounter);
    empty3 = emptyCounter;
    console.log(fullCounter);
    procent = fullCounter / (emptyCounter + fullCounter);
    procent = procent * 100;
    console.log(procent);
    //procent = procent.toString();
    $("#reifen").find(".progress-pie-chart").data("percent", procent);
    forms[9] = form10;
    isBack = "true";
    pieChart();
    //new ve edit sayfalarındaki cardlara değer atama
    var lastikler = $("#vehicleTires").val();
    if (lastikler == "") {
        lastikler = "-";
    }
    document.getElementById("cardReifen").innerHTML = lastikler;
    var on =
        $("#VehicleProDepthInFrontL").val() +
        "-" +
        $("#VehicleProDepthInFrontR").val();
    if (on == "") {
        on = "-";
    }
    document.getElementById("cardProfitiefeVorne").innerHTML = on;
    var arka =
        $("#VehicleRearProDepthL").val() + "-" + $("#VehicleRearProDepthR").val();
    if (arka == "") {
        arka = "-";
    }
    document.getElementById("cardProfitiefeHinten").innerHTML = arka;
    $("#btnBack17").trigger("click");
});
//ruhsat viewe tıkladığında diğer butonlardan tıklayıp seçtiğindeki inputların değerlerini siliyor
$("#ul-button-viewClick1").click(function() {
    $(".imagePick9").find("input").val("");
    $(".takePhoto9").find("input").val("");
});
$("#ul-button-viewClick2").click(function() {
    $(".imagePick1").find("input").val("");
    $(".takePhoto1").find("input").val("");
});
$("#ul-button-viewClick3").click(function() {
    $(".imagePick2").find("input").val("");
    $(".takePhoto2").find("input").val("");
});
$("#ul-button-viewClick4").click(function() {
    $(".imagePick3").find("input").val("");
    $(".takePhoto3").find("input").val("");
});
$("#ul-button-viewClick5").click(function() {
    $(".imagePick4").find("input").val("");
    $(".takePhoto4").find("input").val("");
});
$("#ul-button-viewClick6").click(function() {
    $(".imagePick5").find("input").val("");
    $(".takePhoto5").find("input").val("");
});
$("#ul-button-viewClick7").click(function() {
    $(".imagePick6").find("input").val("");
    $(".takePhoto6").find("input").val("");
});
$("#ul-button-viewClick8").click(function() {
    $(".imagePick7").find("input").val("");
    $(".takePhoto7").find("input").val("");
});
$("#ul-button-viewClick9").click(function() {
    $(".imagePick8").find("input").val("");
    $(".takePhoto8").find("input").val("");
});
//galeriye tıkladığında diğer butonlardan tıklayıp seçtiğindeki inputlarımn değerlerini siliyor
$("#ul-button-1").click(function() {
    $(".image9").find("input").val("");
    $(".takePhoto9").find("input").val("");
});
$("#ul-button-3").click(function() {
    $(".image1").find("input").val("");
    $(".takePhoto1").find("input").val("");
});
$("#ul-button-5").click(function() {
    $(".image2").find("input").val("");
    $(".takePhoto2").find("input").val("");
});
$("#ul-button-7").click(function() {
    $(".image3").find("input").val("");
    $(".takePhoto3").find("input").val("");
});
$("#ul-button-9").click(function() {
    $(".image4").find("input").val("");
    $(".takePhoto4").find("input").val("");
});
$("#ul-button-11").click(function() {
    $(".image5").find("input").val("");
    $(".takePhoto5").find("input").val("");
});
$("#ul-button-13").click(function() {
    $(".image6").find("input").val("");
    $(".takePhoto6").find("input").val("");
});
$("#ul-button-15").click(function() {
    $(".image7").find("input").val("");
    $(".takePhoto7").find("input").val("");
});
$("#ul-button-19").click(function() {
    $(".image8").find("input").val("");
    $(".takePhoto8").find("input").val("");
    //kameraya tıkladığında diğer butonlardan tıklayıp seçtiğindeki inputlarımn değerlerini siliyor
    $("#ul-button-2").click(function() {
        $(".image9").find("input").val("");
        $(".imagePick9").find("input").val("");
    });
    $("#ul-button-4").click(function() {
        $(".image1").find("input").val("");
        $(".imagePick1").find("input").val("");
    });
    $("#ul-button-6").click(function() {
        $(".image2").find("input").val("");
        $(".imagePick2").find("input").val("");
    });
    $("#ul-button-8").click(function() {
        $(".image3").find("input").val("");
        $(".imagePick3").find("input").val("");
    });
    $("#ul-button-10").click(function() {
        $(".image4").find("input").val("");
        $(".imagePick4").find("input").val("");
    });
    $("#ul-button-12").click(function() {
        $(".image5").find("input").val("");
        $(".imagePick5").find("input").val("");
    });
    $("#ul-button-14").click(function() {
        $(".image6").find("input").val("");
        $(".imagePick6").find("input").val("");
    });
    $("#ul-button-16").click(function() {
        $(".image7").find("input").val("");
        $(".imagePick7").find("input").val("");
    });
    $("#ul-button-20").click(function() {
        $(".image8").find("input").val("");
        $(".imagePick8").find("input").val("");
        $("#vehicleLicense").on("submit", function(event) {
            event.preventDefault();
            isBack = "true";
            document.getElementById("fehlerFahrzeugschein").innerHTML = "1 Problem";
            //TO-DO:resim yüklenmediyse ve fertig butonuna basarsa şartı yaz
            var file1 = $(".image9").find("input").prop("files")[0];
            var file2 = $(".imagePick9").find("input").prop("files")[0];
            var file3 = $(".takePhoto9").find("input").prop("files")[0];
            var file;
            setTimeout(() => {
                if (file1 != undefined) {
                    file = file1;
                } else if (file2 != undefined) {
                    file = file2;
                } else if (file3 != undefined) {
                    file = file3;
                }
                console.log(file);
                if (file != undefined) {
                    document.getElementById("fehlerFahrzeugschein").innerHTML = "Kein Problem";
                }
            }, 500);

            $("#auftrag").trigger("click");
        });
        var files = [];

        function controlFile(img) {
            console.log(img);
            if (img != undefined) {
                console.log("lalalala" + img);
                files.push(img);
            }
        }
        $("#vehicleImages").on("submit", function(event) {
            event.preventDefault();
            isBack = "true";
            files.length = 0;
            //TO-DO:resim yüklenmediyse ve fertig butonuna basarsa şartı yaz
            document.getElementById("fehlerFahrzeugbilder").innerHTML = "1 Problem";
            controlf($(".image1").find("input").prop("files")[0]);
            controlFile($(".image2").find("input").prop("files")[0]);
            controlFile($(".image3").find("input").prop("files")[0]);
            controlFile($(".image4").find("input").prop("files")[0]);
            controlFile($(".image5").find("input").prop("files")[0]);
            controlFile($(".image6").find("input").prop("files")[0]);
            controlFile($(".image7").find("input").prop("files")[0]);
            controlFile($(".image8").find("input").prop("files")[0]);
            controlFile($(".imagePick1").find("input").prop("files")[0]);
            controlFile($(".imagePick2").find("input").prop("files")[0]);
            controlFile($(".imagePick3").find("input").prop("files")[0]);
            controlFile($(".imagePick4").find("input").prop("files")[0]);
            controlFile($(".imagePick5").find("input").prop("files")[0]);
            controlFile($(".imagePick6").find("input").prop("files")[0]);
            controlFile($(".imagePick7").find("input").prop("files")[0]);
            controlFile($(".imagePick8").find("input").prop("files")[0]);
            controlFile($(".takePhoto1").find("input").prop("files")[0]);
            controlFile($(".takePhoto2").find("input").prop("files")[0]);
            controlFile($(".takePhoto3").find("input").prop("files")[0]);
            controlFile($(".takePhoto4").find("input").prop("files")[0]);
            controlFile($(".takePhoto5").find("input").prop("files")[0]);
            controlFile($(".takePhoto6").find("input").prop("files")[0]);
            controlFile($(".takePhoto7").find("input").prop("files")[0]);
            controlFile($(".takePhoto8").find("input").prop("files")[0]);
            console.log(files);
            if (files.length > 0) {
                var filesLength = files.length;
                document.getElementById("fehlerFahrzeugbilder").innerHTML =
                    8 - filesLength + " Problem";
                document.getElementById("cardErforderlich").innerHTML = filesLength + "/8";
            } else if (files.length == 8) {
                document.getElementById("fehlerFahrzeugbilder").innerHTML = "Kein Problem";
            }
            $("#auftrag").trigger("click");
        });
        $("#schadensbeschreibung").on("submit", function(event) {
            event.preventDefault();
            form11 = ako.getFormData($("#schadensbeschreibung"));
            console.log(form11);
            forms[10] = form11;
            isBack = "true";
            var not = $("#gorusAciklama").val();
            if (not == "") {
                not = "Es ist keine Schadensbeschreibung vorhanden.";
                document.getElementById("fehlerSchadensbeschreibung").innerHTML = "1 Problem";
            }
            document.getElementById("fehlerSchadensbeschreibung").innerHTML =
                "Kein Problem";
            document.getElementById("cardSchadensbeschreibung").innerHTML = not;
            $("#auftrag").trigger("click");
        });

        $("#btnPrufenAll").click(function() {
            $(".dashboard").hide();
            $(".overview").hide();
            $(".login").hide();
            $(".auftraege").hide();
            $(".order-details").hide();
            $(".order-adresses").hide();
            $(".abtretungs-erklaerung").hide();
            $(".abtretungs-erklaerung-signature").hide();
            $(".order-adresses-vehicleOwner").hide();
            $(".order-adresses-auftraggeber").hide();
            $(".order-adresses-anspruchsteller").hide();
            $(".order-adresses-reperaturfirma").hide();
            $(".order-adresses-unfallgegner").hide();
            $(".order-adresses-rechtsanwalt").hide();
            $(".vehicle-info").hide();
            $(".vehicle-information-allgemein").hide();
            $(".vehicle-information-fahrzeugdaten").hide();
            $(".vehicle-information-reifen").hide();
            $(".vehicle-license").hide();
            $(".vehicle-image").hide();
            $(".schadensbeschreibung").hide();
            $(".fehler").show();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
        var isSenden = false;
        $("#btnSenden").click(function() {
            $("#btnSenden").prop("disabled", true);
            Swal.fire({
                title: "Please Wait!",
                html: "Sending form data...",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            var sorumlulukHasari = $("#flexCheckChecked")[0].checked;
            var recordId = localStorage.getItem("recordId");
            var eksperRecordId = localStorage.getItem("eksperRecordId", eksperRecordId);
            console.log("isEdit:" + isEdit);
            console.log("isNewCase:" + isNewCase);
            console.log(files);
            console.log(file);
            ako.sendFile(files);
            ako.sendFile1(file);
            ako.sendFile2();
            if (isEdit == true) {
                setTimeout(() => {
                    var resultDocId = localStorage.getItem("resultDocId"); //ruhsat id
                    var sigId = localStorage.getItem("sigId"); //signature id
                    var listDocId = localStorage.getItem("listDocId") ?
                        localStorage.getItem("listDocId").split(",") :
                        "";
                    console.log("Gorseller222: " + listDocId);
                    console.log("RuhsatID: " + resultDocId);
                    console.log("SigId: " + sigId);
                    form1 = ako.getFormData($("#orderDetails"));
                    forms[0] = form1;
                    form2 = ako.getFormData($("#vehicleOwner"));
                    forms[1] = form2;
                    form3 = ako.getFormData($("#auftraggeber"));
                    forms[2] = form3;
                    form4 = ako.getFormData($("#anspruchsteller"));
                    forms[3] = form4;
                    form5 = ako.getFormData($("#reperaturFirma"));
                    forms[4] = form5;
                    form6 = ako.getFormData($("#unfallgegner"));
                    forms[5] = form6;
                    form7 = ako.getFormData($("#rechtsanwalt"));
                    forms[6] = form7;
                    form8 = ako.getFormData($("#vehicleGeneral"));
                    forms[7] = form8;
                    form9 = ako.getFormData($("#vehicleData"));
                    forms[8] = form9;
                    form10 = ako.getFormData($("#vehicleTires"));
                    forms[9] = form10;
                    form11 = ako.getFormData($("#schadensbeschreibung"));
                    forms[10] = form11;
                    forms[11] = {
                        RuhsatGorseli: resultDocId,
                        SignatureId: sigId,
                        Gorsel1: listDocId[0],
                        Gorsel2: listDocId[1],
                        Gorsel3: listDocId[2],
                        Gorsel4: listDocId[3],
                        Gorsel5: listDocId[4],
                        Gorsel6: listDocId[5],
                        Gorsel7: listDocId[6],
                        Gorsel8: listDocId[7]
                    };
                    console.log(forms[7]);
                    var model = {
                        EksperEmail: eksperRecordId,
                        RecordId: recordId,
                        SorumlulukHasari: sorumlulukHasari,
                        details: forms[0],
                        vehicleOwner: forms[1],
                        auftraggeber: forms[2],
                        anspruchsteller: forms[3],
                        reperaturFirma: forms[4],
                        unfallgegner: forms[5],
                        rechtsanwalt: forms[6],
                        vehicleGeneral: forms[7],
                        vehicleData: forms[8],
                        vehicleTires: forms[9],
                        noten: forms[10],
                        images: forms[11]
                    };
                    ako.postFormData(model, ako.realUrl1);
                    isSenden = true;
                    //btn.prop("disabled", true);
                }, 5000);
            } else if (isNewCase == true) {
                setTimeout(() => {
                    var resultDocId = localStorage.getItem("resultDocId"); //ruhsat id
                    var sigId = localStorage.getItem("sigId"); //signature id
                    var listDocId = localStorage.getItem("listDocId") ?
                        localStorage.getItem("listDocId").split(",") :
                        "";
                    console.log("Gorseller222: " + listDocId);
                    console.log("RuhsatID: " + resultDocId);
                    console.log("SigId: " + sigId);
                    form1 = ako.getFormData($("#orderDetails"));
                    forms[0] = form1;
                    form2 = ako.getFormData($("#vehicleOwner"));
                    forms[1] = form2;
                    form3 = ako.getFormData($("#auftraggeber"));
                    forms[2] = form3;
                    form4 = ako.getFormData($("#anspruchsteller"));
                    forms[3] = form4;
                    form5 = ako.getFormData($("#reperaturFirma"));
                    forms[4] = form5;
                    form6 = ako.getFormData($("#unfallgegner"));
                    forms[5] = form6;
                    form7 = ako.getFormData($("#rechtsanwalt"));
                    forms[6] = form7;
                    form8 = ako.getFormData($("#vehicleGeneral"));
                    forms[7] = form8;
                    form9 = ako.getFormData($("#vehicleData"));
                    forms[8] = form9;
                    form10 = ako.getFormData($("#vehicleTires"));
                    forms[9] = form10;
                    form11 = ako.getFormData($("#schadensbeschreibung"));
                    forms[10] = form11;
                    forms[11] = {
                        RuhsatGorseli: resultDocId,
                        SignatureId: sigId,
                        Gorsel1: listDocId[0],
                        Gorsel2: listDocId[1],
                        Gorsel3: listDocId[2],
                        Gorsel4: listDocId[3],
                        Gorsel5: listDocId[4],
                        Gorsel6: listDocId[5],
                        Gorsel7: listDocId[6],
                        Gorsel8: listDocId[7]
                    };
                    console.log(forms[11]);
                    var model = {
                        EksperEmail: eksperRecordId,
                        SorumlulukHasari: sorumlulukHasari,
                        details: forms[0],
                        vehicleOwner: forms[1],
                        auftraggeber: forms[2],
                        anspruchsteller: forms[3],
                        reperaturFirma: forms[4],
                        unfallgegner: forms[5],
                        rechtsanwalt: forms[6],
                        vehicleGeneral: forms[7],
                        vehicleData: forms[8],
                        vehicleTires: forms[9],
                        noten: forms[10],
                        images: forms[11]
                    };
                    ako.postFormData(model, ako.realUrl2);
                    isSenden = true;
                    //ako.postFormData(data);
                    //btn.prop("disabled", true);
                }, 5000);
            }
        });
    });
});