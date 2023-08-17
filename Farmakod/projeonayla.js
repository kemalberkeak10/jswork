$(function () {
  var count = 0;
  $(".btn-br-actions[data-publicid=331D2B1DCB7D4EA98BECB910A90DA647]").hide();
  $(".btn-br-actions[data-publicid=331D2B1DCB7D4EA98BECB910A90DA647]")
    .closest("td")
    .prepend(
      '<a id="btnProjeOnayi" class="btn btn-sm btn-warning"  style="margin-right:10px;" >Proje Onayı</a>'
    );
  $("body").on("click", "#btnProjeOnayi", function () {
    var table = $(".table-responsive table");
    $("#modalProjeOnayi").remove();
    window.setModal.Create({
      id: "modalProjeOnayi",
      html: {
        header: "Proje Onayı",
        body:
          '<div id="msg" style="margin:0 23px 5px; width: 80%;font-size:15px;"></div>' +
          '<div id="modalProjeOnayiLoadingBar" style="margin:0 0 5px; width: 100%;display:none;">İşlem yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>' +
          '<table class="" style="width: 75%">' +
          "<thead>" +
          "<th>Ara <i class='fa fa-search'></i></th>" +
          "</thead>" +
          "<tbody>" +
          "<tr>" +
          "<td>" +
          '<input class="modal-search-projeOnayi" id="searchUrun" type="text" style="margin-right:10px;font-size:17px;width: 50%;border-radius: 3px;border: 1px solid;height: 38px;"></td>' +
          "</tr>" +
          "</tbody>" +
          "</table>" +
          String.format(
            '<div style="width:100%"><div class="projeOnayiModal-lr-records" style="width: 100%;overflow-y: auto;height: 300px;"><h4 class="mt-2" style="margin-top:5px;">Teknik Şartname Madde Listesi</h4></div><div class="proje-onay-selected-records" style="width: 100%;"><h4 class="mt-2">Onaya Gönderilecek Teknik Şartname Madde Listesi</h4></div><hr><div id="divProjeOnayiPlanlananlar" class="divProjeOnayiPlanlananlar" ></div></div>'
          ),
        footer:
          '<button id="btnAcceptProjeOnayi" type="button" class="btn btn-sm btn-success " >Seçilenlere Onay Ver</button>' +
          '<button id="btnRejectProjeOnayi" type="button" class="btn btn-sm btn-danger " >Seçilenlere Red Ver</button>' +
          '<button id="btnCancel" class="btn btn-primary btn-sm" data-dismiss="modal" onclick="window.location.reload()">İptal</button>',
      },
    });
    $("#modalProjeOnayi .modal-dialog").css({
      width: "80%",
    });

    var modalBody = $("#modalProjeOnayi .modal-body"),
      bodyRecords = modalBody.find(".projeOnayiModal-lr-records");
    selectedRecords = modalBody.find(".proje-onay-selected-records");
    bodyRecords.append(
      $("<table/>", {
        class: "table table-bordered",
        style: "background-color:#b1d3cc;",
      })
        .append(
          $("<thead style='background-color:#b1d3cc;' />").html(
            '<tr><th style="text-align: center; vertical-align:middle;width:10%">Sıra Numarası</th><th style="text-align: center; vertical-align:middle;width:80%">Madde Açıklaması</th><th style="width:10%;text-align:center;"><button class="btn btn-sm btn-success select-all-rows-projeOnay"><i class="fa fa-check"></i></button></th></tr>'
          )
        )
        .append($("<tbody/>"))
    );

    selectedRecords.append(
      $("<table/>", {
        class: "table table-bordered table-hover proje-onay-table-selected",
        style: "height: 30px;",
      })
        .append(
          $("<thead style='background-color:#58cbb4;' />").html(
            '<tr><th style="text-align: center; vertical-align:middle;width:10%">Sıra Numarası</th><th style="width:80%;text-align: center; vertical-align:middle;">Madde Açıklaması</th><th style="width:10%;text-align:center;"><button class="btn btn-sm btn-danger discard-all-rows-projeOnay"><i class="fas fa-undo"></i></button></th>'
          )
        )
        .append($("<tbody/>"))
    );
    $("#modalProjeOnayi")
      .find(".modal-header button:first")
      .attr("onclick", "window.location.reload()");
    $("#modalProjeOnayi").modal({
      backdrop: "static",
      keyboard: false,
    });
    LrOkumaOnayaGonder();
  });
  $("body").on("keyup", ".modal-search-projeOnayi", function () {
    var trList = $(".projeOnayiModal-lr-records .table tbody tr");
    var value = $(this).val().toLowerCase();
    trList.filter(function () {
      $(this).toggle(
        $(this)
          .find("td:eq(1) div")[0]
          .innerHTML.trim()
          .toLowerCase()
          .indexOf(value) > -1
      );
    });
  });

  $("body").on("click", ".add-row-projeOnayi", function () {
    var id = $(this).closest("tr").data("id");
    var addedRow = $(this).closest("tr");
    var modalBody = $("#modalProjeOnayi .modal-body"),
      selectedRecords = modalBody.find(".proje-onay-table-selected");
    var tbody = selectedRecords.find("tbody");
    $(this).closest("tr").find(".add-row-projeOnayi").hide();
    $(this).closest("tr").find(".delete-row-projeOnayi").show();
    tbody.append(addedRow);
  });
  $("body").on("click", ".delete-row-projeOnayi", function () {
    var id = $(this).closest("tr").data("id");
    var deletedRow = $(this).closest("tr");
    var modalBody = $("#modalProjeOnayi .modal-body"),
      records = modalBody.find(".projeOnayiModal-lr-records");
    var tbody = records.find("tbody");
    $(this).closest("tr").find(".add-row-projeOnayi").show();
    $(this).closest("tr").find(".delete-row-projeOnayi").hide();
    tbody.append(deletedRow);
  });

  $("body").on("click", ".select-all-rows-projeOnay", function () {
    var modalBody = $("#modalProjeOnayi .modal-body"),
      selectedTable = modalBody.find(".proje-onay-table-selected");
    records = modalBody.find(".projeOnayiModal-lr-records");
    var rowRecords = records.find("tbody tr");
    var tbody = selectedTable.find("tbody");
    $(".add-row-projeOnayi").hide();
    $(".delete-row-projeOnayi").show();
    tbody.append(rowRecords);
  });

  $("body").on("click", ".discard-all-rows-projeOnay", function () {
    var modalBody = $("#modalProjeOnayi .modal-body"),
      selectedTable = modalBody.find(".proje-onay-table-selected");
    records = modalBody.find(".projeOnayiModal-lr-records");
    var rowRecords = selectedTable.find("tbody tr");
    var tbody = records.find("tbody");
    $(".add-row-projeOnayi").show();
    $(".delete-row-projeOnayi").hide();
    tbody.append(rowRecords);
  });

  $("body").on("click", ".row-detail-projeOnay", function () {
    var id = $(this).closest("tr").data("id");
    IsEmriKriterlemeProjeOnayi(id);
  });
  function LrOkumaOnayaGonder() {
    var modal = $("#modalProjeOnayi"),
      modalBody = modal.find(".modal-body");
    divTeknikSartnameMaddeleri = modalBody.find(".projeOnayiModal-lr-records");
    tbody = divTeknikSartnameMaddeleri.find("tbody");
    var url =
      "https://farmakodwebapi.setcrm.com/api/data/LrOkuma?recordId=" +
      $("#RecordPublicId").val() +
      "&lrId=E8406A5C99EE4E2F9FCBD3A4783D2528&q=";
    var localUrl =
      "http://localhost:44358/api/data/LrOkuma?recordId=" +
      $("#RecordPublicId").val() +
      "&lrId=E8406A5C99EE4E2F9FCBD3A4783D2528&q=";

    $.get(url, function (r) {
      if (r.IsOk === true) {
        if (r.Records.length > 0) {
          $.each(r.Records, function (i, v) {
            var siraNo = v.Values.first(
              "FieldPublicId",
              "8D2F6D0E30FB42599E4D91E585CF5E50"
            ).Value;
            siraNo = siraNo.split(",")[0];
            var maddeAciklamasi = v.Values.first(
              "FieldPublicId",
              "097F370B073543BCBCD175A62D2320B1"
            ).Value;
            tbody.append(
              String.format(
                "<tr style='background-color:white' data-id='{0}'  data-aciklama='{2}'><td style='text-align:center'><div class='siraNo' >{1}</div></td><td><div class='tsMaddesi' >{2}</div></td><td style='text-align:center;'><button class='btn btn-sm btn-primary row-detail-projeOnay' style='height:40px;' ><i class='fas fa-external-link-alt'></i></button><button class='btn btn-sm btn-success add-row-projeOnayi' style='height:40px;' ><i class='fa fa-plus'></i></button><button class='btn btn-sm btn-danger delete-row-projeOnayi' style='height:40px;display:none;' ><i class='fa fa-minus'></i></button></td></tr>",
                v.PublicId,
                siraNo,
                maddeAciklamasi
              )
            );
          });
        }
      }
    });
  }

  function IsEmriKriterlemeProjeOnayi(id) {
    var modal = $("#modalProjeOnayi"),
      modalBody = modal.find(".modal-body");
    div = modalBody.find(".divProjeOnayiPlanlananlar");

    var localUrl =
      "https://localhost:44348/api/data/IsEmriVfKriterleme?tsMaddesi=" + id;
    var realUrl =
      "https://farmakodwebapi.setcrm.com/api/data/IsEmriVfKriterleme?tsMaddesi=" +
      id;
    $.get(realUrl, function (r) {
      if (r.Status === true) {
        if (r.list.Items.length > 0) {
          div.html("");
          document.getElementById("divProjeOnayiPlanlananlar").style.border =
            "thin solid rgb(209 209 209)";
          div.append(
            '<h4 style="margin-top:10px;margin-left:5px;">Planlanan İş Emirleri</h4><table class="table table-bordered table-hover"><thead style="background-color:#1a242f;color:white;"><tr><th>Bağlı Olduğu Teknik Şartname Maddesi</th><th>Proje Adımı</th><th>Proje Alt Adımı</th><th>Konu</th><th>Açıklama</th></tr></thead><tbody></tbody></table>'
          );
          tbody = div.find("tbody");
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
            var aciklama = v.Values.first(
              "FieldPublicId",
              "3347DDE78C8C47149CF3B74750239C80"
            ).Value;
            tbody.append(
              String.format(
                "<tr style='background-color:white' data-id='{0}'><td><div>{1}</div></td><td><div>{2}</div></td><td><div>{3}</div></td><td><div>{4}</div></td><td><div>{5}</div></td></tr>",
                v.PublicId,
                teknikSartname,
                projeAdim,
                projeAltAdim,
                isEmriKonusu,
                aciklama
              )
            );
          });
        }
      } else {
        div.html("");
        notify("warning", "Bu adıma bağlı iş emri bulunamadı");
      }
    });
  }

  $("body")
    .off("click", "#btnAcceptProjeOnayi")
    .on("click", "#btnAcceptProjeOnayi", function () {
      $("#btnCancel").prop("disabled", true);
      $("#btnAcceptProjeOnayi").prop("disabled", true);
      $("#btnRejectProjeOnayi").prop("disabled", true);
      var projectRecords = [];
      var modalBody = $("#modalProjeOnayi .modal-body"),
        selectedRecords = modalBody.find(".proje-onay-selected-records");
      var tbody = selectedRecords.find("tbody");
      var trList = tbody.find("tr");
      trList.each(function (i, v) {
        var id = $(v).data("id");
        var aciklama = $(v).data("aciklama");
        var model = {
          MaddeAciklamasi: aciklama,
          RecordId: id,
        };

        projectRecords.push(model);
      });
      var model = {
        ProjectRecords: projectRecords,
        CurrentUserId: userData.id,
        ProjectRecordId: $("#RecordPublicId").val(),
        IsAccept: true,
      };
      var localUrl = String.format(
        "https://localhost:44348/api/data/ProjeOnayla"
      );
      var realUrl = String.format(
        "https://farmakodwebapi.setcrm.com/api/data/ProjeOnayla"
      );
      $.post(realUrl, model, function (r) {
        if (r.Status) {
          //   $(
          //     ".btn-br-actions[data-publicid=331D2B1DCB7D4EA98BECB910A90DA647]"
          //   ).trigger("click");
          notify(
            "success",
            "İşlem başarıyla gerçekleşti. Sayfa yenileniyor lütfen bekleyiniz..."
          );
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        } else {
          setUtil.alert({
            container: "#modalProjeOnayi .modal-body #msg",
            message: r.Message,
            alertClass: "alert-danger",
            autoClose: true,
          });
          $("#btnAcceptProjeOnayi").prop("disabled", false);
          // modalBody.find("#modalProjeOnayiLoadingBar").hide();
        }
      });
    });

  $("body")
    .off("click", "#btnRejectProjeOnayi")
    .on("click", "#btnRejectProjeOnayi", function () {
      $("#btnCancel").prop("disabled", true);
      $("#btnAcceptProjeOnayi").prop("disabled", true);
      $("#btnRejectProjeOnayi").prop("disabled", true);
      var projectRecords = [];
      var modalBody = $("#modalProjeOnayi .modal-body"),
        selectedRecords = modalBody.find(".proje-onay-selected-records");
      var tbody = selectedRecords.find("tbody");
      var trList = tbody.find("tr");
      trList.each(function (i, v) {
        var id = $(v).data("id");
        var aciklama = $(v).data("aciklama");
        var model = {
          MaddeAciklamasi: aciklama,
          RecordId: id,
        };

        projectRecords.push(model);
      });
      var model = {
        ProjectRecords: projectRecords,
        CurrentUserId: userData.id,
        ProjectRecordId: $("#RecordPublicId").val(),
        IsAccept: false,
      };
      var localUrl = String.format(
        "https://localhost:44348/api/data/ProjeOnayla"
      );
      var realUrl = String.format(
        "https://farmakodwebapi.setcrm.com/api/data/ProjeOnayla"
      );
      $.post(realUrl, model, function (r) {
        if (r.Status) {
          //   $(
          //     ".btn-br-actions[data-publicid=331D2B1DCB7D4EA98BECB910A90DA647]"
          //   ).trigger("click");
          notify(
            "success",
            "İşlem başarıyla gerçekleşti. Sayfa yenileniyor lütfen bekleyiniz..."
          );
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        } else {
          setUtil.alert({
            container: "#modalProjeOnayi .modal-body #msg",
            message: r.Message,
            alertClass: "alert-danger",
            autoClose: true,
          });
          $("#btnAcceptProjeOnayi").prop("disabled", false);
          // modalBody.find("#modalProjeOnayiLoadingBar").hide();
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
