$(function () {
  var isEmirleriList = [];
  $(".btn-br-actions[data-publicid=7F7AE18DD7E14B2CA4CD4117DF861088]").hide();
  $(".btn-br-actions[data-publicid=7F7AE18DD7E14B2CA4CD4117DF861088]")
    .closest("td")
    .prepend(
      '<a id="btnTalepOlustur" class="btn btn-sm btn-warning"  style="margin-right:10px;" >Satınalma Talebi Olustur</a>'
    );
  $("body").on("click", "#btnTalepOlustur", function () {
    var table = $(".table-responsive table");
    $("#modalTalepOlustur").remove();
    window.setModal.Create({
      id: "modalTalepOlustur",
      html: {
        header: "Talep Oluştur",
        body:
          '<div id="msg" style="margin:0 23px 5px; width: 80%;font-size:15px;"></div>' +
          '<div id="modalTalepOlusturLoadingBar1" style="margin:0 0 5px; width: 100%;display:none;">İşlem yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>' +
          '<table class="tblProjeAdimi" style="width: 75%">' +
          "<thead>" +
          "<th>Proje Adımı</th><th>Proje Alt Adımı</th>" +
          "</thead>" +
          "<tbody>" +
          "<tr>" +
          "<td>" +
          '<input id="selectProjeAdimi" type="text" style="width:80%;border-radius: 3px; border: 1px solid ;"></td>' +
          "<td>" +
          '<input id="selectProjeAltAdimi" type="text" style="width:80%;border-radius: 3px; border: 1px solid ;"></td>' +
          "</tr>" +
          "</tbody>" +
          "</table>" +
          '<div class="row" style="display:flex;"><table id="tblIsEmri" style="display:none;width: 30%;width: 30%;margin-right:10px;"><thead><th>İş Emri</th></thead><tbody><tr><td><input id="selectIsEmri" class="form-control selects"></td></tr></tbody></table>' +
          '<table id="tblMarkaModel" class="table table-bordered" style="display:none;width: 50%;"><thead style="background-color:white"><th>Ürün/Hizmet</th><th>Marka</th><th>Model</th><th></th></thead><tbody><tr><td><input id="selectStokKarti" class="form-control"></td><td><input id="txtMarka" class="form-control" type="text"></td><td><input id="txtModel" class="form-control" type="text"></td><td><button class="btn btn-sm btn-success newModel"><i class="fa fa-plus" ></i></td></tr></tbody></table>' +
          "</div>" +
          "<hr>" +
          String.format(
            '<div class="divIsEmirleri" style="width:100%;"><div class="hizli-ekle-records" style="width: 100%;overflow-y: auto;height: 300px;"><h4 style="margin-top:0">İş Emirleri</h4></div><div class="selected-records" style="width: 100%;"><h4 style="margin-top:0">Oluşturulan Satın Alma Talebi</h4></div></div>'
          ) +
          String.format(
            '<div class="divTalepUrunleri" style="width:100%"><div class="hizli-ekle-talep-urunleri" style="width: 100%;"><h3 style="margin-top:5px;font-size:17px;">Talep Ürünleri</h3></div><div class="selected-talep-urunleri" style="width: 100%;"><h4 style="margin-top:0">Eklenen Talep Ürünleri</h4></div></div>'
          ),
        footer:
          '<button id="btn-ileri-satin-alma-talep" type="button" class="btn btn-sm btn-success " >İleri</button><button id="btnGeri" type="button" class="btn btn-sm btn-warning " style="display:none;" >Geri</button><button id="btn-create-talep-form" type="button" class="btn btn-sm btn-success " style="display:none;" >Kaydet</button>' +
          '<button id="btnKapat" class="btn btn-danger btn-sm" data-dismiss="modal" onclick="window.location.reload()">İptal Et</button>',
      },
    });
    $("#modalTalepOlustur .modal-dialog").css({
      width: "60%",
    });
    $(".divTalepUrunleri").hide();
    var modalBody = $("#modalTalepOlustur .modal-body"),
      bodyRecords = modalBody.find(".hizli-ekle-records");
    selectedRecords = modalBody.find(".selected-records");
    talepUrunleri = modalBody.find(".hizli-ekle-talep-urunleri");
    selectedTalepUrunleri = modalBody.find(".selected-talep-urunleri");
    bodyRecords.append(
      $("<table/>", {
        class: "table table-bordered table-hover",
        style: "background-color:#b1d3cc; ",
      })
        .append(
          $("<thead style='background-color:#b1d3cc;' />").html(
            '<tr><th><input id="selectAll" type="checkbox" class="form-check"></th><th style="text-align: center; vertical-align:middle;">İş Emri</th><th style="text-align: center; vertical-align:middle;">Teknik Şartname Açıklaması</th><th style="text-align: center; vertical-align:middle;">Proje Adım</th><th style="text-align: center; vertical-align:middle;">Proje Alt Adım</th></tr>'
          )
        )
        .append($("<tbody/>"))
    );

    selectedRecords.append(
      $("<table/>", {
        class: "table table-bordered table-hover",
        style: "height: 30px;",
      })
        .append(
          $("<thead style='background-color:#b1d3cc;' />").html(
            '<tr><th></th><th style="text-align: center; vertical-align:middle;">İş Emirleri</th><th style="text-align: center; vertical-align:middle;">Teknik Şartname Açıklaması</th><th style="text-align: center; vertical-align:middle;">Proje Adım</th><th style="text-align: center; vertical-align:middle;">Proje Alt Adım</th></tr>'
          )
        )
        .append($("<tbody/>"))
    );
    $("#modalTalepOlustur")
      .find(".modal-header button:first")
      .attr("onclick", "window.location.reload()");
    $("#modalTalepOlustur").modal({
      backdrop: "static",
      keyboard: false,
    });
    prepareSelect2(
      "#selectProjeAdimi",
      "/Summary/LookupFieldValues",
      {
        coId: "48AB9369AAAB46169D7CCB7A13E8C08F",
        id: "D5182E4C3F084936929861E534028D6F",
        viewFilterId: "23BFB1B70D95455EAD15922B2BA2AC31",
        controllingRecordId: $("#RecordPublicId").val(),
        controllingId: "6E9C7DC995B64409A78A9D9566C7EDDA",
        groupIds: $("#RecordPublicId").val(),
        itemId: "D5182E4C3F084936929861E534028D6F",
      },
      null,
      false
    );
    prepareSelect2(
      "#selectProjeAltAdimi",
      "/Summary/LookupFieldValues",
      {
        coId: "48AB9369AAAB46169D7CCB7A13E8C08F",
        id: "91DC47974A134127860A3AE3F83865B6",
        viewFilterId: "D5246B6B13914083AEEAA5E701D8417A",
        controllingRecordId: $("#selectProjeAdimi").val(),
        controllingId: "D5182E4C3F084936929861E534028D6F",
        groupIds: $("#selectProjeAdimi").val(),
        itemId: "91DC47974A134127860A3AE3F83865B6",
      },
      null,
      false
    );
    $("#selectProjeAltAdimi").select2("enable", false);

    talepUrunleri.append(
      $("<table/>", {
        class: "table table-bordered table-hover",
        style: "background-color:#b1d3cc; ",
      })
        .append(
          $("<thead style='background-color:#b1d3cc;' />").html(
            '<tr><th style="text-align: center; vertical-align:middle;">İş Emri</th><th style="text-align: center; vertical-align:middle;"><i class="fas fa-asterisk text-danger" ></i>Ürün/Hizmet</th><th style="text-align: center; vertical-align:middle;"><i class="fas fa-asterisk text-danger" ></i>Marka</th><th style="text-align: center; vertical-align:middle;"><i class="fas fa-asterisk text-danger" ></i>Model</th><th style="text-align: center; vertical-align:middle;width:10%;"><i class="fas fa-asterisk text-danger" ></i>Miktar</th><th style="text-align: center; vertical-align:middle;">Birim</th><th style="text-align: center; vertical-align:middle;width:18%;">Talep Edilen Teslim Tarihi</th><th style="text-align: center; vertical-align:middle;width:18%;">Açıklama</th><th style="text-align: center; vertical-align:middle;">Doküman</th><th></th></tr>'
          )
        )
        .append($("<tbody/>"))
    );

    selectedTalepUrunleri.append(
      $("<table/>", {
        class: "table table-bordered table-hover",
        style: "height: 30px;",
      })
        .append(
          $("<thead style='background-color:#b1d3cc;' />").html(
            '<tr><th style="text-align: center; vertical-align:middle;">Proje Adımı</th><th style="text-align: center; vertical-align:middle;">İş Emri</th><th style="text-align: center; vertical-align:middle;">Ürün/Hizmet</th><th style="text-align: center; vertical-align:middle;">Marka</th><th style="text-align: center; vertical-align:middle;">Model</th><th style="text-align: center; vertical-align:middle;">Miktar</th><th style="text-align: center; vertical-align:middle;">Birim</th><th style="text-align: center; vertical-align:middle;">Talep Edilen Teslim Tarihi</th><th style="text-align: center; vertical-align:middle;">Açıklama</th><th style="text-align: center; vertical-align:middle;">Doküman</th><th></th></tr>'
          )
        )
        .append($("<tbody/>"))
    );
    prepareSelect2WithData("#selectIsEmri", isEmirleriList);
    prepareSelect2(
      "#selectStokKarti",
      "/Summary/LookupFieldValues",
      {
        coId: "550F4ECD8F244AD18FDC3C1665F3A6EF",
        id: "460D00465F94400F8FF18F7FDEA4BC34",
        viewFilterId: "3109EE3FF7C24B51A50C760243F056A1",
      },
      null,
      false
    );
    $("#txtMarka").prop("disabled", true);
    $("#txtModel").prop("disabled", true);
  });
  $("body").on("change", "#selectProjeAdimi", function (e) {
    if (String.isNullOrWhiteSpace($("#selectProjeAdimi").select2("data"))) {
      $("#selectProjeAltAdimi").select2("enable", false);
      $("#selectProjeAltAdimi").select2("data", null);
    } else {
      $("#selectProjeAltAdimi").select2("enable", true);
      prepareSelect2(
        "#selectProjeAltAdimi",
        "/Summary/LookupFieldValues",
        {
          coId: "48AB9369AAAB46169D7CCB7A13E8C08F",
          id: "91DC47974A134127860A3AE3F83865B6",
          viewFilterId: "D5246B6B13914083AEEAA5E701D8417A",
          controllingRecordId: $("#selectProjeAdimi").val(),
          controllingId: "D5182E4C3F084936929861E534028D6F",
          groupIds: $("#selectProjeAdimi").val(),
          itemId: "91DC47974A134127860A3AE3F83865B6",
        },
        null,
        false
      );
      getİsEmirleri();
    }
  });
  $("body").on("change", "#selectStokKarti", function (e) {
    if (String.isNullOrWhiteSpace($(this).select2("data"))) {
      $("#txtMarka").prop("disabled", true);
      $("#txtModel").prop("disabled", true);
    } else {
      $("#txtMarka").prop("disabled", false);
      $("#txtModel").prop("disabled", false);
    }
  });
  $("body").on("change", ".selectStokKarti", function (e) {
    var id = $(this).closest("tr").data("id");
    if (String.isNullOrWhiteSpace($(this).select2("data"))) {
      $("#selectMarka_" + id).select2("enable", false);
      $("#selectMarka_" + id).select2("data", null);
      $("#selectModel_" + id).select2("enable", false);
      $("#selectModel_" + id).select2("data", null);
      $("#txtMarka").prop("disabled", true);
      $("#txtModel").prop("disabled", true);
    } else {
      $("#selectMarka_" + id).select2("enable", true);
      $("#txtMarka").prop("disabled", false);
      $("#txtModel").prop("disabled", false);
      prepareSelect2(
        "#selectMarka_" + id,
        "/Summary/LookupFieldValues",
        {
          coId: "48AB9369AAAB46169D7CCB7A13E8C08F",
          id: "F8FE622B17F44D42BCEA95562C3B5186",
          viewFilterId: "D8536649B6124F14930A60A8E50D7A24",
          controllingRecordId: $("#selectStokKarti_" + id).val(),
          controllingId: "460D00465F94400F8FF18F7FDEA4BC34",
          groupIds: $("#selectStokKarti_" + id).val(),
          itemId: "F8FE622B17F44D42BCEA95562C3B5186",
        },
        null,
        false
      );
    }
  });
  $("body").on("change", ".selectMarka", function (e) {
    var id = $(this).closest("tr").data("id");
    if (String.isNullOrWhiteSpace($(this).select2("data"))) {
      $("#selectModel_" + id).select2("enable", false);
      $("#selectModel_" + id).select2("data", null);
    } else {
      $("#selectModel_" + id).select2("enable", true);
      prepareSelect2(
        "#selectModel_" + id,
        "/Summary/LookupFieldValues",
        {
          coId: "550F4ECD8F244AD18FDC3C1665F3A6EF",
          id: "531BB3401BF4404499AECEA034ED6BD6",
          viewFilterId: "17CED6AB177548D7A984C8AA087A88E6",
          controllingRecordId: $("#selectMarka_" + id).val(),
          controllingId: "F8FE622B17F44D42BCEA95562C3B5186",
          groupIds: $("#selectMarka_" + id).val(),
          itemId: "531BB3401BF4404499AECEA034ED6BD6",
        },
        null,
        false
      );
    }
  });
  $("body").on("change", "#selectProjeAltAdimi", function (e) {
    getİsEmirleri();
  });
  $("body").on("change", "#selectIsEmri", function (e) {
    if (!String.isNullOrWhiteSpace($(this).select2("data"))) {
      var data = $(this).select2("data");
      TalepHizmetOkuma($(this).select2("data"));
    }
  });
  $("body").on("click", ".newModel", function () {
    var valMarka = $("#txtMarka").val();
    var valModel = $("#txtModel").val();
    var stokKarti = $("#selectStokKarti").select2("data");
    if (
      String.isNullOrWhiteSpace(valMarka) ||
      String.isNullOrWhiteSpace(valModel)
    ) {
      notify("warning", "Marka ve Model Alanı Boş Olamaz");
      return;
    } else if (
      !String.isNullOrWhiteSpace(valModel) ||
      !String.isNullOrWhiteSpace(valMarka)
    ) {
      var localUrl = String.format(
        "https://localhost:44348/api/data/CreateMarkaModel"
      );
      var realUrl = String.format(
        "https://farmakodwebapi.setcrm.com/api/data/CreateMarkaModel"
      );
      var model = {
        Model: valModel,
        Marka: valMarka,
        StokKartiPublicId: stokKarti.id,
      };
      $.post(realUrl, model, function (r) {
        if (r.Status) {
          notify("success", "Marka ve Model Başarıyla Eklendi");
        } else {
          notify("danger", "Model Eklenemedi");
        }
      });
    }
  });
  $("body").on("click", "#selectAll", function () {
    if ($("#selectAll").is(":checked")) {
      $(".filtre-check").prop("checked", true);
    } else {
      $(".filtre-check").prop("checked", false);
    }
  });
  $("body").on("click", ".add-row-talep-urun", function () {
    var addedRow = $(this).closest("tr");
    var stokKarti = addedRow.find(".selectStokKarti").select2("data");
    var stokKartiId, markaId, modelId, birimId, isEmriId;
    var isEmri = addedRow.find(".selectIsEmri").select2("data");
    if (!String.isNullOrWhiteSpace(isEmri)) {
      isEmriId = isEmri.id;
      isEmri = isEmri.text;
    } else {
      setUtil.alert({
        container: "#modalTalepOlustur .modal-body #msg",
        message: "Lütfen İş Emri Alanını Doldurunuz!",
        alertClass: "alert-warning",
        autoClose: true,
      });
      return;
    }
    if (!String.isNullOrWhiteSpace(stokKarti)) {
      stokKartiId = stokKarti.id;
      stokKarti = stokKarti.text;
    } else {
      setUtil.alert({
        container: "#modalTalepOlustur .modal-body #msg",
        message: "Lütfen Ürün/Hizmet Alanını Doldurunuz!",
        alertClass: "alert-warning",
        autoClose: true,
      });
      return;
    }
    var marka = addedRow.find(".selectMarka").select2("data");
    if (!String.isNullOrWhiteSpace(marka)) {
      markaId = marka.id;
      marka = marka.text;
    } else {
      setUtil.alert({
        container: "#modalTalepOlustur .modal-body #msg",
        message: "Lütfen Marka Alanını Doldurunuz!",
        alertClass: "alert-warning",
        autoClose: true,
      });
      return;
    }
    var model = addedRow.find(".selectModel").select2("data");
    if (!String.isNullOrWhiteSpace(model)) {
      modelId = model.id;
      model = model.text;
    } else {
      setUtil.alert({
        container: "#modalTalepOlustur .modal-body #msg",
        message: "Lütfen Model Alanını Doldurunuz!",
        alertClass: "alert-warning",
        autoClose: true,
      });
      return;
    }
    var miktar = addedRow.find(".miktar").text();
    if (String.isNullOrWhiteSpace(miktar)) {
      setUtil.alert({
        container: "#modalTalepOlustur .modal-body #msg",
        message: "Lütfen Zorunlu Alanları Doldurunuz",
        alertClass: "alert-warning",
        autoClose: true,
      });
      return;
    }
    var birim = addedRow.find(".selectBirim").select2("data");
    if (!String.isNullOrWhiteSpace(birim)) {
      birimId = birim.id;
      birim = birim.text;
    } else {
      birim = "";
    }
    var modalBody = $("#modalTalepOlustur .modal-body"),
      selectedRecords = modalBody.find(".selected-talep-urunleri");
    var tbody = selectedRecords.find("tbody");
    var cloneRow = addedRow.clone();
    tbody.append(cloneRow);
    cloneRow.find(".add-row-talep-urun").remove();
    cloneRow.find(".selects").remove();
    cloneRow.find(".selectMarka").remove();
    cloneRow.find(".selectModel").remove();
    cloneRow.find(".selectBirim").remove();

    cloneRow
      .find("td:eq(0)")
      .append(
        String.format(
          "<div data-id='{1}' class='selectIsEmiri'>{0}</div>",
          isEmri,
          isEmriId
        )
      );
    cloneRow
      .find("td:eq(1)")
      .append(
        String.format(
          "<div data-id='{1}' class='stokKarti' >{0}</div>",
          stokKarti,
          stokKartiId
        )
      );
    cloneRow
      .find("td:eq(2)")
      .append(
        String.format(
          "<div data-id='{1}' class='marka'>{0}</div>",
          marka,
          markaId
        )
      );
    cloneRow
      .find("td:eq(3)")
      .append(
        String.format(
          "<div data-id='{1}' class='model'>{0}</div>",
          model,
          modelId
        )
      );
    cloneRow
      .find("td:eq(5)")
      .append(
        String.format(
          "<div data-id='{1}' class='birim'>{0}</div>",
          birim,
          birimId
        )
      );
    cloneRow
      .find("td:eq(9)")
      .append(
        "<button class='btn btn-sm btn-danger deleteTalep'><i class='fa fa-minus' ></i>"
      );

    var projeAdimi = addedRow.data("proje-adim");
    cloneRow
      .find("td:eq(0)")
      .parent()
      .prepend(
        String.format("<td><div class='proje-adimi'>{0}</div></td>", projeAdimi)
      );
    addedRow.find(".fields").val("");
    cloneRow.find(".fields").prop("disabled", true);
  });
  $("body").on("click", ".deleteTalep", function () {
    var deletedRow = $(this).closest("tr");
    deletedRow.remove();
  });

  $("body").on("click", ".isemri-sil", function () {
    var deletedRow = $(this).closest("tr");
    var isEmirleri = deletedRow.find(".isEmirleri tr");
    var id = $(this).closest("tr").data("id");
    isEmirleri.each(function (i, v) {
      isEmirleriList = isEmirleriList.filter(function (el) {
        return el.id != $(v).data("id");
      });
    });
    deletedRow.remove();
  });
  var a = 0;
  $("body").on("click", "#btn-add-selected", function (e) {
    var isExist = false;
    var counter = 0;
    var kayitlar = [];
    var data = $("input#filtreCheck:checked");
    if (data.length > 0) {
      var modal = $("#modalTalepOlustur"),
        modalBody = modal.find(".modal-body");
      divAnalizler = modalBody.find(".hizli-ekle-records");
      tbody = divAnalizler.find("tbody");
      selectedRecords = modalBody.find(".selected-records");
      trsSelected = selectedRecords.find("tbody tr[data-value=list]");
      trsSelected.each(function (i, v) {
        if (
          tbody.find("tr:eq(0)").data("projealtadim") ==
            $(v).find(".pAltAdim").data("id") &&
          tbody.find("tr:eq(0)").data("projeadim") ==
            $(v).find(".pAdim").data("id")
        ) {
          isExist = true;
          counter++;
          repeatIndex = i;
          kayitlar.push({
            IsEmriId: tbody.find("tr:eq(0)").data("id"),
          });
        } else {
        }
      });
      //tbody.html('');
      if (isExist == false) {
        var modalBody = $("#modalTalepOlustur .modal-body"),
          selectedRecords = modalBody.find(".selected-records");
        var tbody = selectedRecords.find("tbody");
        tbody.append(
          String.format(
            '<tr data-value="list"><td><button class="btn btn-sm btn-danger isemri-sil" style="height:40px;" ><i class="fa fa-minus"></i></td><td id="isEmirleriListesi_{0}" class="isEmirleri" ></td><td class="teknikSartname_{0}" ><div></div></td><td data-id="" id="pAdim_{0}" class="pAdim"></td><td id="pAltAdim_{0}" class="pAltAdim" data-id=""></td></tr>',
            a
          )
        );
        data.each(function (i, v) {
          var tr = $(this).closest("tr");
          var projeAdim = tr.find(".projeAdim")[0].innerText;
          var projeAltAdim = tr.find(".projeAltAdim")[0].innerText;
          var teknikSartname = tr.find(".teknikSartname")[0].innerText;
          isEmirleriList.push({
            id: tr.data("id"),
            text: tr.find(".isEmri")[0].innerText,
            tarih: tr.data("isemritarih"),
            talepEdilenTeslimTarihi: tr.data("talepedilenteslimtarihi"),
            projeAdim: projeAdim,
          });
          $("#pAdim_" + a)[0].innerText = projeAdim;
          $("#pAltAdim_" + a)[0].innerText = projeAltAdim;
          document
            .getElementById("pAdim_" + a)
            .setAttribute("data-id", tr.data("projeadim"));
          document
            .getElementById("pAltAdim_" + a)
            .setAttribute("data-id", tr.data("projealtadim"));
          $(".teknikSartname_" + a)[0].innerText = teknikSartname;
          $("#isEmirleriListesi_" + a).append(
            String.format(
              '<tr data-id="{0}"><td>{1}</td></tr>',
              tr.data("id"),
              tr.find(".isEmri")[0].innerText
            )
          );
        });
        a++;
        $(".filtre-check").prop("checked", false);
      } else if (isExist == true) {
        data.each(function (i, v) {
          var tr = $(this).closest("tr");
          if (
            !isEmirleriList.some(function (el) {
              return el.id == tr.data("id");
            })
          ) {
            isEmirleriList.push({
              id: tr.data("id"),
              text: tr.find(".isEmri")[0].innerText,
              tarih: tr.data("isemritarih"),
              talepEdilenTeslimTarihi: tr.data("talepedilenteslimtarihi"),
              projeAdim: tr.find(".projeAdim")[0].innerText,
            });

            trsSelected
              .find(".isEmirleri")
              .find(String.format("[data-id={0}]", kayitlar[0].IsEmriId))
              .after(
                String.format(
                  '<tr data-id="{0}"><td>{1}</td></tr>',
                  tr.data("id"),
                  tr.find(".isEmri")[0].innerText
                )
              );
          }
        });
        $(".filtre-check").prop("checked", false);
      }
    } else {
      setUtil.alert({
        container: "#modalTalepOlustur .modal-body #msg",
        message: "Lütfen En Az Bir Tane İş Emri Seçiniz",
        alertClass: "alert-warning",
        autoClose: true,
      });
    }
  });
  $("body").on("click", "#btn-ileri-satin-alma-talep", function (e) {
    $(this).hide();
    $("#btnGeri").show();
    $("#btn-create-talep-form").show();
    $(".tblProjeAdimi").hide();
    $(".divIsEmirleri").hide();
    $(".divTalepUrunleri").show();
    $("#tblIsEmri").show();
    $("#tblMarkaModel").show();
    $("#modalTalepOlustur .modal-dialog").animate(
      {
        width: "80%",
      },
      400
    );
  });
  $("body").on("click", "#btnGeri", function (e) {
    $("#btn-ileri-satin-alma-talep").show();
    $("#btnGeri").hide();
    $("#btn-create-talep-form").hide();
    $(".tblProjeAdimi").show();
    $(".divIsEmirleri").show();
    $(".divTalepUrunleri").hide();
    $("#tblIsEmri").hide();
    $("#tblMarkaModel").hide();
    $("#modalTalepOlustur .modal-dialog").animate(
      {
        width: "60%",
      },
      400
    );
  });

  function getİsEmirleri(q) {
    var coId = "5B070F759DD141E5ABBEDD427834B3FC";
    var vfId = "18BEE9CE43C749BDAFF16399F3F4E3D8";
    var modal = $("#modalTalepOlustur"),
      modalBody = modal.find(".modal-body");
    divAnalizler = modalBody.find(".hizli-ekle-records");
    divMain = modalBody.find(".divIsEmirleri");
    divAnalizler.find("#btn-add-selected").remove();
    tbody = divAnalizler.find("tbody");
    var projeAltAdim = $("#selectProjeAltAdimi").select2("data");
    if (String.isNullOrWhiteSpace(projeAltAdim)) {
      projeAltAdim = "";
    } else {
      projeAltAdim = projeAltAdim.id;
    }
    var localUrl =
      "https://localhost:44348/api/data/IsEmriVfOkuma?projeAdim=" +
      $("#selectProjeAdimi").select2("data").id +
      "&projeAltAdim=" +
      projeAltAdim +
      "&proje=" +
      $("#RecordPublicId").val();
    var realUrl =
      "https://farmakodwebapi.setcrm.com/api/data/IsEmriVfOkuma?projeAdim=" +
      $("#selectProjeAdimi").select2("data").id +
      "&projeAltAdim=" +
      projeAltAdim +
      "&proje=" +
      $("#RecordPublicId").val();
    $.get(realUrl, function (r) {
      if (r.Status === true) {
        tbody.html("");
        $("#btn-add-selected").remove();
        if (r.list.Items.length > 0) {
          $.each(r.list.Items, function (i, v) {
            var isEmriKonusu = v.Values.first(
              "FieldPublicId",
              "9A6A2DE678FD45F990656DA600844144"
            ).Value;
            var projeAdim = v.Values.first(
              "FieldPublicId",
              "D5182E4C3F084936929861E534028D6F"
            ).Value;
            var projeAltAdim = v.Values.first(
              "FieldPublicId",
              "91DC47974A134127860A3AE3F83865B6"
            ).Value;
            var projeAdimId = v.Values.first(
              "FieldPublicId",
              "D5182E4C3F084936929861E534028D6F"
            ).SelectedItemPublicIds;
            var projeAltAdimId = v.Values.first(
              "FieldPublicId",
              "91DC47974A134127860A3AE3F83865B6"
            ).SelectedItemPublicIds;
            var teknikSartname = v.Values.first(
              "FieldPublicId",
              "A8A68A5551E04E6FBE34E80D0D948FC5"
            ).Value;
            var baslangicTarihi = v.Values.first(
              "FieldPublicId",
              "F6EA77E175F94C698BC7AC08CD0EC5B6"
            ).Value;
            //todo
            var talepEdilenTeslimTarihi = v.Values.first(
              "FieldPublicId",
              "7EB88DA929094B528106D819F9788699"
            ).Value;
            tbody.append(
              String.format(
                "<tr style='background-color:white' data-id='{0}' data-projeadim='{4}' data-projealtadim='{5}' data-isemritarih='{7}' data-talepEdilenTeslimTarihi='{8}'><td><input id='filtreCheck' type='checkbox' class='filtre-check'></td><td class='isEmri' ><div>{1}</div></td><td class='teknikSartname' ><div>{6}</div></td><td class='projeAdim' ><div>{2}</div></td><td class='projeAltAdim' ><div>{3}</div></td></tr>",
                v.PublicId,
                isEmriKonusu,
                projeAdim,
                projeAltAdim,
                projeAdimId,
                projeAltAdimId,
                teknikSartname,
                baslangicTarihi.split(" ")[0],
                talepEdilenTeslimTarihi.split(" ")[0]
              )
            );
          });
          divAnalizler.after(
            '<button id="btn-add-selected" type="button" class="btn btn-sm btn-success pull-right ">Seçilenleri Ekle</button>'
          );
        }
      } else {
        tbody.html("");
        setUtil.alert({
          container: "#modalTalepOlustur .modal-body #msg",
          message: "Bu adıma bağlı iş emri bulunamadı",
          alertClass: "alert-warning",
          autoClose: true,
        });
      }
    });
  }

  function TalepHizmetOkuma(isEmri) {
    var projeAdim = isEmri.projeAdim;
    var talepEdilenTeslimTarihi = isEmri.talepEdilenTeslimTarihi;
    var modal = $("#modalTalepOlustur"),
      modalBody = modal.find(".modal-body");
    (talepUrunleri = modalBody.find(".hizli-ekle-talep-urunleri")),
      (tbody = talepUrunleri.find("tbody"));
    var url =
      "https://farmakodwebapi.setcrm.com/api/data/LrOkuma?recordId=" +
      isEmri.id +
      "&lrId=26EAA6168F0A4E329D8C55985CA686C8&q=";

    $.get(url, function (r) {
      if (r.IsOk === true) {
        if (r.Records.length > 0) {
          tbody.html("");
          $.each(r.Records, function (i, v) {
            var urunHizmetId = v.Values.first(
              "FieldPublicId",
              "F9B57BCBE0CF4BAAA31A32DC76E7C83F"
            ).SelectedItemPublicIds;
            var urunHizmetText = v.Values.first(
              "FieldPublicId",
              "F9B57BCBE0CF4BAAA31A32DC76E7C83F"
            ).Value;
            // var markaId = v.Values.first(
            //   "FieldPublicId",
            //   "F9B57BCBE0CF4BAAA31A32DC76E7C83F"
            // ).SelectedItemPublicIds;
            // var markaText = v.Values.first(
            //   "FieldPublicId",
            //   "F9B57BCBE0CF4BAAA31A32DC76E7C83F"
            // ).Value;
            // var modelId = v.Values.first(
            //   "FieldPublicId",
            //   "F9B57BCBE0CF4BAAA31A32DC76E7C83F"
            // ).SelectedItemPublicIds;
            // var modelText = v.Values.first(
            //   "FieldPublicId",
            //   "F9B57BCBE0CF4BAAA31A32DC76E7C83F"
            // ).Value;
            var miktar = v.Values.first(
              "FieldPublicId",
              "774C7CDCD11447B59EFC27D8F05348DA"
            ).Value;
            var birimId = v.Values.first(
              "FieldPublicId",
              "1EE3B6A6F400432B9909968C400614A6"
            ).SelectedItemPublicIds;
            var birimText = v.Values.first(
              "FieldPublicId",
              "1EE3B6A6F400432B9909968C400614A6"
            ).Value;
            miktar = miktar.split(",")[0];
            var aciklama = v.Values.first(
              "FieldPublicId",
              "CF742F5D5E37449C90749CC2F67392B9"
            ).Value;
            var dosyaId = v.Values.first(
              "FieldPublicId",
              "0A81923884BB49559E2FA93E264AB4F9"
            ).SelectedItemPublicIds;
            var dosya = v.Values.first(
              "FieldPublicId",
              "0A81923884BB49559E2FA93E264AB4F9"
            ).Value;
            tbody.append(
              String.format(
                "<tr style='background-color:white' data-id='{0}' data-proje-adim='{6}'><td><input id='selectIsEmri_{0}' class='form-control selects selectIsEmri'></td><td><input id='selectStokKarti_{0}' class='form-control selects selectStokKarti'></td><td><input id='selectMarka_{0}' class='form-control selectMarka'></td><td><input id='selectModel_{0}' class='form-control selects selectModel'></td><td id='miktar' class='miktar' >{1}</td><td><input id='selectBirim_{0}' class='form-control selects selectBirim'></td><td id='teslimTarihi'>{2}</td><td id='aciklama'>{3}</td><td id='dosya' data-docId='{4}'><a target='_blank' href='/document/Viewer/{4}'>{5}</a><a target='_blank' href='/document/get/{4}'><i class='fas fa-download'></i></a></td><td><button class='btn btn-sm btn-success add-row-talep-urun'><i class='fa fa-plus' ></i></td></tr>",
                v.PublicId,
                miktar,
                isEmri.talepEdilenTeslimTarihi,
                aciklama,
                dosyaId,
                dosya,
                projeAdim
              )
            );
            prepareSelect2WithData(
              "#selectIsEmri_" + v.PublicId,
              isEmirleriList
            );
            $("#selectIsEmri_" + v.PublicId).select2("enable", false);
            $("#selectIsEmri_" + v.PublicId).select2("data", {
              id: isEmri.id,
              text: isEmri.text,
            });
            prepareSelect2(
              "#selectStokKarti_" + v.PublicId,
              "/Summary/LookupFieldValues",
              {
                coId: "550F4ECD8F244AD18FDC3C1665F3A6EF",
                id: "460D00465F94400F8FF18F7FDEA4BC34",
                viewFilterId: "3109EE3FF7C24B51A50C760243F056A1",
              },
              null,
              false
            );
            prepareSelect2(
              "#selectMarka_" + v.PublicId,
              "/Summary/LookupFieldValues",
              {
                coId: "48AB9369AAAB46169D7CCB7A13E8C08F",
                id: "F8FE622B17F44D42BCEA95562C3B5186",
                viewFilterId: "D8536649B6124F14930A60A8E50D7A24",
                controllingRecordId: $("#selectStokKarti_" + v.PublicId).val(),
                controllingId: "460D00465F94400F8FF18F7FDEA4BC34",
                groupIds: $("#selectStokKarti_" + v.PublicId).val(),
                itemId: "F8FE622B17F44D42BCEA95562C3B5186",
              },
              null,
              false
            );
            prepareSelect2(
              "#selectModel_" + v.PublicId,
              "/Summary/LookupFieldValues",
              {
                coId: "550F4ECD8F244AD18FDC3C1665F3A6EF",
                id: "531BB3401BF4404499AECEA034ED6BD6",
                viewFilterId: "17CED6AB177548D7A984C8AA087A88E6",
                controllingRecordId: $("#selectMarka_" + v.PublicId).val(),
                controllingId: "F8FE622B17F44D42BCEA95562C3B5186",
                groupIds: $("#selectMarka_" + v.PublicId).val(),
                itemId: "531BB3401BF4404499AECEA034ED6BD6",
              },
              null,
              false
            );
            prepareSelect2(
              "#selectBirim_" + v.PublicId,
              "/Summary/LookupFieldValues",
              {
                coId: "6F597CCD82F84A6DB07826B170668DE8",
                id: "1EE3B6A6F400432B9909968C400614A6",
                viewFilterId: "E874DCFE76934CA982E48868DC972B1F",
              },
              null,
              false
            );
            $("#selectStokKarti_" + v.PublicId).select2("enable", false);
            // $("#selectMarka_" + v.PublicId).select2("enable", false);
            // $("#selectModel_" + v.PublicId).select2("enable", false);
            $("#selectStokKarti_" + v.PublicId).select2("data", {
              id: urunHizmetId,
              text: urunHizmetText,
            });
            // $("#selectMarka_" + v.PublicId).select2("data", {
            //   id: markaId,
            //   text: markaText,
            // });
            // $("#selectModel_" + v.PublicId).select2("data", {
            //   id: modelId,
            //   text: modelText,
            // });
            $("#selectBirim_" + v.PublicId).select2("data", {
              id: birimId,
              text: birimText,
            });
          });
        }
      }
    });
  }
  $("body")
    .off("click", "#btn-create-talep-form")
    .on("click", "#btn-create-talep-form", function () {
      var talepFormlari = [];

      var newList = [];
      var modalBody = $("#modalTalepOlustur .modal-body");

      var talepUrunleri = [];
      var selectedRecords = modalBody.find(".selected-talep-urunleri");
      var tbody = selectedRecords.find("tbody");
      var trList = tbody.find("tr");
      if (trList.length > 0) {
        $("#btnKapat").prop("disabled", true);
        $(this).prop("disabled", true);
        modalBody.find("#modalTalepOlusturLoadingBar1").show();
        trList.each(function (i, v) {
          var docId = "";
          var modalBody = $("#modalTalepOlustur .modal-body");
          var selectedRecords = modalBody.find(".selected-talep-urunleri");
          var tbody = selectedRecords.find("tbody");
          // var dosya = tbody.find("#dosya");
          var model2 = {
            StokKarti: $(v).find(".stokKarti").data("id"),
            Marka: $(v).find(".marka").data("id"),
            Model: $(v).find(".model").data("id"),
            Birim: $(v).find(".birim").data("id"),
            Miktar: $(v).find(".miktar").text(),
            TeslimTarihi: $(v).find("#teslimTarihi").text(),
            Aciklama: $(v).find("#aciklama").text(),
            DosyaId: $(v).find("#dosya").data("docId"),
            // Dosya: docId,
            IsEmiri: $(v).find(".selectIsEmiri").data("id"),
            RecordId: $(v).data("id"),
          };
          talepUrunleri.push(model2);
        });
        selectedRecords = modalBody.find(".selected-records");
        tbody = selectedRecords.find("tbody");
        trList = tbody.find("tr");
        trList.each(function (i, v) {
          var isEmriList = [];
          var pAdim = $(v).find(".pAdim").data("id");
          if (!String.isNullOrWhiteSpace(pAdim)) {
            var pAltAdim = $(v).find(".pAltAdim").data("id");
            var isEmirleri = $(v).find(".isEmirleri tr");
            isEmirleri.each(function (j, x) {
              var model2 = {
                RecordId: $(x).data("id"),
              };
              isEmriList.push(model2);
            });

            talepFormlari.push({
              ProjeAdim: pAdim,
              ProjeAltAdim: pAltAdim,
              IsEmirleri: isEmriList,
              TalepUrunleri: talepUrunleri,
            });
          }
        });

        var model = {
          TalepFormlari: talepFormlari,
          RecordId: $("#RecordPublicId").val(),
          User: userData.id,
        };

        var localUrl = String.format(
          "https://localhost:44348/api/data/TalepFormuOlustur"
        );
        var realUrl = String.format(
          "https://farmakodwebapi.setcrm.com/api/data/TalepFormuOlustur"
        );
        $.post(realUrl, model, function (r) {
          if (r.Status) {
            $("#modalTalepOlustur").modal("hide");
            $(
              ".btn-br-actions[data-publicid=7F7AE18DD7E14B2CA4CD4117DF861088]"
            ).trigger("click");
          } else {
            setUtil.alert({
              container: "#modalTalepOlustur .modal-body #msg",
              message: r.Message,
              alertClass: "alert-danger",
              autoClose: true,
            });
            $("#btn-create-talep-form").prop("disabled", false);
            modalBody.find("#modalTalepOlusturLoadingBar1").hide();
          }
        });
      } else {
        notify("warning", "Ekleme yapılmadan kaydetme işlemi yapılamaz.");
      }
    });

  function notify(type, message) {
    $.notify(
      {
        icon:
          type === "success" ? "fas fa-check-double" : "fas fa-times-circle",
        message: message,
      },
      {
        z_index: "9999999",
        type: type,
        placement: {
          from: "top",
          align: "right",
        },
        offset: 50,
        animate: {
          enter: "animated flipInY",
          exit: "animated flipOutX",
        },
      }
    );
  }
});
