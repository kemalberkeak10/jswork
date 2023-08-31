$(function () {
  $(".btn-br-actions[data-publicid=526FB8067B834D70B8A2E6C6444C61ED]").hide();
  $(".btn-br-actions[data-publicid=526FB8067B834D70B8A2E6C6444C61ED]")
    .closest("td")
    .prepend(
      '<a id="btnGmyOnay" class="btn btn-sm btn-warning"  style="margin-right:10px;" >GMY Onay</a>'
    );
  $("body").on("click", "#btnGmyOnay", function () {
    var table = $(".table-responsive table");
    $("#modalGmyOnay").remove();
    window.setModal.Create({
      id: "modalGmyOnay",
      html: {
        header: "GMY Onay",
        body:
          '<div id="msg" style="margin:0 23px 5px; width: 80%;font-size:15px;"></div>' +
          '<div id="modalGmyOnayLoadingBar" style="margin:0 0 5px; width: 100%;display:none;">İşlem yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>' +
          String.format(
            '<div style="width:100%"><div class="gmyOnayiModal-lr-records" style="width: 100%;overflow-y: auto;height: 350px;"><h4 class="mt-2" style="margin-top:5px;">Talep Edilen Ürünler LR Maddeleri </h4></div><div class="gmy-onay-selected-records" style="width: 100%;"><h4 class="mt-2">Onaya Gönderilen Ürünler Listesi</h4></div><hr><div id="divGmyOnayiPlanlananlar" class="divGmyOnayiPlanlananlar" ></div></div>'
          ),
        footer:
          '<button id="btnAcceptGmyOnayi" type="button" class="btn btn-sm btn-success " >ONAYLA</button>' +
          '<button id="btnRejectGmyOnayi" type="button" class="btn btn-sm btn-danger " >RET</button>' +
          '<button id="btnRevizyonGmyOnayi" type="button" class="btn btn-sm btn-primary " >REVİZYON</button>',
      },
      settings: {
        widthClass: "modal-full-width",
      },
    });
    $("#modalGmyOnay .close span").css("font-size", "2.5em");
    $("#modalGmyOnay .close span").css("color", "black");

    var modalBody = $("#modalGmyOnay .modal-body"),
      bodyRecords = modalBody.find(".gmyOnayiModal-lr-records");
    selectedRecords = modalBody.find(".gmy-onay-selected-records");
    bodyRecords.append(
      $("<table/>", {
        class: "table table-bordered",
        style: "background-color:#b1d3cc;",
      })
        .append(
          $("<thead style='background-color:#b1d3cc;' />").html(
            '<tr><th style="text-align: center; vertical-align:middle;width:15%">Stok Kartı</th><th style="text-align: center; vertical-align:middle;width:10%">Marka</th><th style="text-align: center; vertical-align:middle;width:10%">Model</th><th style="text-align: center; vertical-align:middle;width:10%">Miktar</th><th style="text-align: center; vertical-align:middle;width:10%">Birim</th><th style="text-align: center; vertical-align:middle;width:10%">Talep Edilen Teslim Tarihi</th><th style="text-align: center; vertical-align:middle;width:10%">Ürün Açıklaması</th><th style="text-align: center; vertical-align:middle;width:10%">Not</th><th style="width:5%;text-align:center;"><button class="btn btn-sm btn-success select-all-rows-projeOnay"><i class="fa fa-check"></i></button></th></tr>'
          )
        )
        .append($("<tbody/>"))
    );

    selectedRecords.append(
      $("<table/>", {
        class: "table table-bordered table-hover gmy-onay-table-selected",
        style: "height: 30px;",
      })
        .append(
          $("<thead style='background-color:#58cbb4;' />").html(
            '<tr><th style="text-align: center; vertical-align:middle;width:15%">Stok Kartı</th><th style="text-align: center; vertical-align:middle;width:10%">Marka</th><th style="text-align: center; vertical-align:middle;width:10%">Model</th><th style="text-align: center; vertical-align:middle;width:10%">Miktar</th><th style="text-align: center; vertical-align:middle;width:10%">Birim</th><th style="text-align: center; vertical-align:middle;width:10%">Talep Edilen Teslim Tarihi</th><th style="text-align: center; vertical-align:middle;width:10%">Ürün Açıklaması</th><th style="text-align: center; vertical-align:middle;width:10%">Not</th><th style="width:5%;text-align:center;"><button class="btn btn-sm btn-danger discard-all-rows-projeOnay"><i class="fas fa-undo"></i></button></th>'
          )
        )
        .append($("<tbody/>"))
    );
    $("#modalGmyOnay")
      .find(".modal-header button:first")
      .attr("onclick", "window.location.reload()");
    $("#modalGmyOnay").modal({
      backdrop: "static",
      keyboard: false,
    });
    LrOkumaOnayaGonder();
  });

  $("body").on("click", ".add-row-gmyOnayi", function () {
    var id = $(this).closest("tr").data("id");
    var addedRow = $(this).closest("tr");
    var modalBody = $("#modalGmyOnay .modal-body"),
      selectedRecords = modalBody.find(".gmy-onay-table-selected");
    var tbody = selectedRecords.find("tbody");
    $(this).closest("tr").find(".add-row-gmyOnayi").hide();
    $(this).closest("tr").find(".delete-row-gmyOnayi").show();
    $(this).closest("tr").find(".comment-input").show();
    tbody.append(addedRow);
  });
  $("body").on("click", ".delete-row-gmyOnayi", function () {
    var id = $(this).closest("tr").data("id");
    var deletedRow = $(this).closest("tr");
    var modalBody = $("#modalGmyOnay .modal-body"),
      records = modalBody.find(".gmyOnayiModal-lr-records");
    var tbody = records.find("tbody");
    $(this).closest("tr").find(".add-row-gmyOnayi").show();
    $(this).closest("tr").find(".delete-row-gmyOnayi").hide();
    var comment = $(this).closest("tr").find(".comment-input");
    comment.hide();
    comment.val("");
    tbody.append(deletedRow);
  });

  $("body").on("click", ".select-all-rows-projeOnay", function () {
    var modalBody = $("#modalGmyOnay .modal-body"),
      selectedTable = modalBody.find(".gmy-onay-table-selected");
    records = modalBody.find(".gmyOnayiModal-lr-records");
    var rowRecords = records.find("tbody tr");
    var tbody = selectedTable.find("tbody");
    $(".add-row-gmyOnayi").hide();
    $(".delete-row-gmyOnayi").show();
    tbody.append(rowRecords);
  });

  $("body").on("click", ".discard-all-rows-projeOnay", function () {
    var modalBody = $("#modalGmyOnay .modal-body"),
      selectedTable = modalBody.find(".gmy-onay-table-selected");
    records = modalBody.find(".gmyOnayiModal-lr-records");
    var rowRecords = selectedTable.find("tbody tr");
    var tbody = records.find("tbody");
    $(".add-row-gmyOnayi").show();
    $(".delete-row-gmyOnayi").hide();
    tbody.append(rowRecords);
  });

  function LrOkumaOnayaGonder() {
    var modal = $("#modalGmyOnay"),
      modalBody = modal.find(".modal-body");
    divTalepUrunleri = modalBody.find(".gmyOnayiModal-lr-records");
    tbody = divTalepUrunleri.find("tbody");
    var url =
      "https://farmakodwebapi.setcrm.com/api/data/LrOkuma?recordId=" +
      $("#RecordPublicId").val() +
      "&lrId=880100E6202E469BA244A8DD89B9D5C4&q=";
    var localUrl =
      "http://localhost:44358/api/data/LrOkuma?recordId=" +
      $("#RecordPublicId").val() +
      "&lrId=880100E6202E469BA244A8DD89B9D5C4&q=";

    $.get(url, function (r) {
      if (r.IsOk === true) {
        if (r.Records.length > 0) {
          $.each(r.Records, function (i, v) {
            var stokKarti = v.Values.first(
              "FieldPublicId",
              "460D00465F94400F8FF18F7FDEA4BC34"
            ).Value;
            var marka = v.Values.first(
              "FieldPublicId",
              "F8FE622B17F44D42BCEA95562C3B5186"
            ).Value;
            var model = v.Values.first(
              "FieldPublicId",
              "531BB3401BF4404499AECEA034ED6BD6"
            ).Value;
            var miktar = v.Values.first(
              "FieldPublicId",
              "6626C58CDADC4C89A9F832F655F36B5C"
            ).Value.split(" ")[0];
            var birim = v.Values.first(
              "FieldPublicId",
              "D9F4184E3A7A4EC78E12C88146154076"
            ).Value;
            var talepEdilenTeslimTarihi = v.Values.first(
              "FieldPublicId",
              "0BB25562A8EA40E5BE956D222071D0CC"
            ).Value.split(" ")[0];
            var aciklama = v.Values.first(
              "FieldPublicId",
              "0D0C9F6CE4F74CF1B33A7E747CD596F2"
            ).Value;
            tbody.append(
              String.format(
                "<tr style='background-color:white' data-id='{0}'  data-aciklama='{2}'><td style='text-align:center'><div class='stokKarti' >{1}</div></td><td><div class='marka' style='text-align:center;vertical-align:middle;' >{2}</div></td><td style='text-align:center;vertical-align:middle;'><div class='model' >{3}</div></td><td style='text-align:center;vertical-align:middle;'><div class='miktar' >{4}</div></td><td style='text-align:center;vertical-align:middle;''><div class='birim' >{5}</div></td><td style='text-align:center;vertical-align:middle;''><div class='talep-edilen-teslim-tarihi' >{6}</div></td><td style='text-align:center;vertical-align:middle;''><div class='urun-aciklama' >{7}</div></td><td class='comment'><div><input class='comment-input' type='text' style='width:100%; border-radius: 3px; border: 1px solid #a1f6ff; padding: 8px 12px;display:none;'></div><td style='text-align:center;'><button class='btn btn-sm btn-success add-row-gmyOnayi' style='height:40px;' ><i class='fa fa-plus'></i></button><button class='btn btn-sm btn-danger delete-row-gmyOnayi' style='height:40px;display:none;' ><i class='fa fa-minus'></i></button></td></tr>",
                v.PublicId,
                stokKarti,
                marka,
                model,
                miktar,
                birim,
                talepEdilenTeslimTarihi,
                aciklama
              )
            );
          });
        }
      }
    });
  }

  $("body")
    .off("click", "#btnAcceptGmyOnayi")
    .on("click", "#btnAcceptGmyOnayi", function () {
      $("#btnRevizyonGmyOnayi").prop("disabled", true);
      $("#btnAcceptGmyOnayi").prop("disabled", true);
      $("#btnRejectGmyOnayi").prop("disabled", true);
      var talepUrunleriRecords = [];
      var modalBody = $("#modalGmyOnay .modal-body"),
        selectedRecords = modalBody.find(".gmy-onay-selected-records");
      var tbody = selectedRecords.find("tbody");
      var trList = tbody.find("tr");
      trList.each(function (i, v) {
        var id = $(v).data("id");
        // var aciklama = $(v).data("aciklama");
        var comment = $(v).find(".comment-input").val();
        var model = {
          RecordId: id,
          Comment: comment,
        };

        talepUrunleriRecords.push(model);
      });
      var model = {
        TalepUrunleriRecords: talepUrunleriRecords,
        CurrentUserId: userData.id,
        MalzemeTalepFormuRecordId: $("#RecordPublicId").val(),
        Status: "Accept",
      };
      var localUrl = String.format(
        "https://localhost:44348/api/data/GmyOnayButton"
      );
      var realUrl = String.format(
        "https://farmakodwebapi.setcrm.com/api/data/GmyOnayButton"
      );
      $.post(realUrl, model, function (r) {
        if (r.Status) {
          notify(
            "success",
            "İşlem başarıyla gerçekleşti. Sayfa yenileniyor lütfen bekleyiniz..."
          );
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        } else {
          setUtil.alert({
            container: "#modalGmyOnay .modal-body #msg",
            message: r.Message,
            alertClass: "alert-danger",
            autoClose: true,
          });
        }
      });
    });

  $("body")
    .off("click", "#btnRejectGmyOnayi")
    .on("click", "#btnRejectGmyOnayi", function () {
      $("#btnRevizyonGmyOnayi").prop("disabled", true);
      $("#btnAcceptGmyOnayi").prop("disabled", true);
      $("#btnRejectGmyOnayi").prop("disabled", true);
      var talepUrunleriRecords = [];
      var modalBody = $("#modalGmyOnay .modal-body"),
        selectedRecords = modalBody.find(".gmy-onay-selected-records");
      var tbody = selectedRecords.find("tbody");
      var trList = tbody.find("tr");
      trList.each(function (i, v) {
        var id = $(v).data("id");
        // var aciklama = $(v).data("aciklama");
        var comment = $(v).find(".comment-input").val();
        var model = {
          // marka: aciklama,
          RecordId: id,
          Comment: comment,
        };

        talepUrunleriRecords.push(model);
      });
      var model = {
        TalepUrunleriRecords: talepUrunleriRecords,
        CurrentUserId: userData.id,
        MalzemeTalepFormuRecordId: $("#RecordPublicId").val(),
        Status: "Reject",
      };
      var localUrl = String.format(
        "https://localhost:44348/api/data/GmyOnayButton"
      );
      var realUrl = String.format(
        "https://farmakodwebapi.setcrm.com/api/data/GmyOnayButton"
      );
      $.post(realUrl, model, function (r) {
        if (r.Status) {
          notify(
            "success",
            "İşlem başarıyla gerçekleşti. Sayfa yenileniyor lütfen bekleyiniz..."
          );
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        } else {
          setUtil.alert({
            container: "#modalGmyOnay .modal-body #msg",
            message: r.Message,
            alertClass: "alert-danger",
            autoClose: true,
          });
        }
      });
    });

  $("body")
    .off("click", "#btnRevizyonGmyOnayi")
    .on("click", "#btnRevizyonGmyOnayi", function () {
      $("#btnRevizyonGmyOnayi").prop("disabled", true);
      $("#btnAcceptGmyOnayi").prop("disabled", true);
      $("#btnRejectGmyOnayi").prop("disabled", true);
      var talepUrunleriRecords = [];
      var modalBody = $("#modalGmyOnay .modal-body"),
        selectedRecords = modalBody.find(".gmy-onay-selected-records");
      var tbody = selectedRecords.find("tbody");
      var trList = tbody.find("tr");
      trList.each(function (i, v) {
        var id = $(v).data("id");
        // var aciklama = $(v).data("aciklama");
        var comment = $(v).find(".comment-input").val();
        var model = {
          // marka: aciklama,
          RecordId: id,
          Comment: comment,
        };
        talepUrunleriRecords.push(model);
      });
      var model = {
        TalepUrunleriRecords: talepUrunleriRecords,
        CurrentUserId: userData.id,
        MalzemeTalepFormuRecordId: $("#RecordPublicId").val(),
        Status: "Revision",
      };
      var localUrl = String.format(
        "https://localhost:44348/api/data/GmyOnayButton"
      );
      var realUrl = String.format(
        "https://farmakodwebapi.setcrm.com/api/data/GmyOnayButton"
      );
      $.post(realUrl, model, function (r) {
        if (r.Status) {
          notify(
            "success",
            "İşlem başarıyla gerçekleşti. Sayfa yenileniyor lütfen bekleyiniz..."
          );
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        } else {
          setUtil.alert({
            container: "#modalGmyOnay .modal-body #msg",
            message: r.Message,
            alertClass: "alert-danger",
            autoClose: true,
          });
        }
      });
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
