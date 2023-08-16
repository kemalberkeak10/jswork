$(function () {
  $(".btn-br-actions[data-publicid=0AB4512A5C6042769EE91027266E66FE]").hide();
  $(".btn-br-actions[data-publicid=0AB4512A5C6042769EE91027266E66FE]")
    .closest("td")
    .prepend(
      '<a id="btnTeklifDuzenle" class="btn btn-sm btn-warning"  style="margin-right:10px;" >Teklif Düzenle</a>'
    );
  var productList = [];
  var teslimatList = [];
  $("body").on("click", "#btnTeklifDuzenle", function () {
    $("#modalTeklifDuzenle").remove();
    window.setModal.Create({
      id: "modalTeklifDuzenle",
      html: {
        header: "Teklif Düzenle",
        body:
          '<div id="msg" style="margin:0 0 5px; width: 100%;"></div>' +
          '<div id="div_tab_1" style="width: 100%;"><div class="row" style="margin-left:0px;"><div class="col-md-4" style="padding-left:0px;"><button id="btn_tab_1" type="button" class="btn btn-sm btn-warning" style="width:100%;text-align:left;">1) Teklif Bilgisi</button><br></div></div><div class="content_tab1" style="display:none;"></div></div>' +
          '<div id="div_tab_2" style="width: 100%;"><div class="row" style="margin-left:0px;"><div class="col-md-4" style="padding-left:0px;"><button id="btn_tab_2" type="button" class="btn btn-sm btn-warning" style="width:100%;text-align:left;">2) Ürün Fiyatları</button><br></div></div><div class="content_tab2" style="display:none;"></div></div>' +
          '<div id="div_tab_3" style="width: 100%;"><div class="row" style="margin-left:0px;"><div class="col-md-4" style="padding-left:0px;"><button id="btn_tab_3" type="button" class="btn btn-sm btn-warning" style="width:100%;text-align:left;">3) Teslimat Detayları</button><br></div></div><div class="content_tab3" style="display:none;"></div></div>' +
          '<div id="div_tab_4" style="width: 100%;"><div class="row" style="margin-left:0px;"><div class="col-md-4" style="padding-left:0px;"><button id="btn_tab_4" type="button" class="btn btn-sm btn-warning" style="width:100%;text-align:left;">4) İskonto</button><br></div></div><div class="content_tab4" style="display:none;"></div></div>',
        footer:
          '<button class="btn btn-danger btn-sm" onclick="window.location.reload()" data-dismiss="modal">Kapat</button>',
      },
      settings: {
        widthClass: "modal-lg",
      },
    });
    $("#modalTeklifDuzenle .modal-dialog").css("width", "66%");
    $(".modal-header").addClass("text-center");
    $(".content_tab1").append(
      '<div class="row" style="margin-left:0px;"><div class="col-md-4" style="padding-left:0px;"><label class="form-control text-center">Ödeme Şartları:  </label></div><div class="col-md-8"><input id="odemeSartlari" type="text"  class="form-control"></div></div>' +
        '<div class="row" style="margin-left:0px;"><div class="col-md-4" style="padding-left:0px;"><label class="form-control text-center">Tedarikçi Açıklaması:  </label></div><div class="col-md-8"><input id="tedarikciAciklamasi" type="text"  class="form-control"></div></div>' +
        '<div class="row" style="text-align:right;width:100%;"><div class="col-md-12"><button id="save_content1" type="button" class="btn btn-md btn-success"><i class="fa fa-save"></i></button></div></div>'
    );
    productList = [];
    teslimatList = [];
    getProductInfos();
    getTeslimatDetaylari();

    $(".content_tab4").append(
      '<div class="row" style="margin-left:0px;"><div class="col-md-4" style="padding-left:0px;"><label class="form-control text-center">İskonto:  </label></div>' +
        '<div class="col-md-8"><input id="iskonto" type="number" min="0" class="form-control"></div></div>' +
        '<div class="row" style="text-align:right;width:100%"><div class="col-md-12"><button id="save_content4" type="button" class="btn btn-md btn-success"><i class="fa fa-save"></i></button></div></div>'
    );
    getInfoFromPage();
    $("#modalTeklifDuzenle").modal({
      backdrop: false,
    });
    $();
  });

  $("body").on("click", "#btn_tab_1", function () {
    $(".content_tab1").toggle();
    $(".content_tab2").hide();
    $(".content_tab3").hide();
    $(".content_tab4").hide();
  });
  $("body").on("click", "#btn_tab_2", function () {
    $(".content_tab2").toggle();
    $(".content_tab1").hide();
    $(".content_tab3").hide();
    $(".content_tab4").hide();
  });
  $("body").on("click", "#btn_tab_3", function () {
    $(".content_tab3").toggle();
    $(".content_tab1").hide();
    $(".content_tab2").hide();
    $(".content_tab4").hide();
  });
  $("body").on("click", "#btn_tab_4", function () {
    $(".content_tab4").toggle();
    $(".content_tab1").hide();
    $(".content_tab2").hide();
    $(".content_tab3").hide();
  });

  $("body").on("click", "#save_content1", function () {
    $("#save_content1").prop("disabled", true);

    var localUrl = "https://localhost:44348/api/data/TeklifUpdateFromModal";
    var realUrl =
      "https://farmakodwebapi.setcrm.com/api/data/TeklifUpdateFromModal";

    var data = {
      RecordId: $("#RecordPublicId").val(),
      OdemeSartlari: $("#odemeSartlari").val(),
      TedarikciAciklama: $("#tedarikciAciklamasi").val(),
      Iskonto: "",
    };
    $.post(realUrl, data, function (r) {
      if (r.Status) {
        $("#save_content1").prop("disabled", false);
        notify("success", "İşlem başarıyla gerçekleşti...");
      } else {
        notify("danger", r.Message);
      }
    });
  });
  $("body").on("click", "#save_content2", function () {
    $("#save_content2").prop("disabled", true);
    var rows = $("#subUrunTable tbody tr");

    $.each(rows, function (i, v) {
      var urunId = $(this).data("recordid");
      var birimFiyatVal = $(this).find(".birimFiyat").val();
      var kdvVal = $(this).find(".kdv").val();

      var nakliyeTd = $(this).find(".nakliye");
      var nakliyeId = "";
      if (
        $(nakliyeTd).select2("data") != null ||
        $(nakliyeTd).select2("data") != undefined
      ) {
        nakliyeId = nakliyeTd.select2("data").id;
      }

      var paraBirimiTd = $(this).find(".paraBirimi");
      var paraBirimiId = "";
      if (
        $(paraBirimiTd).select2("data") != null ||
        $(paraBirimiTd).select2("data") != undefined
      ) {
        paraBirimiId = paraBirimiTd.select2("data").id;
      }

      var model = {
        UrunId: urunId,
        BirimFiyat: birimFiyatVal,
        Kdv: kdvVal,
        NakliyeId: nakliyeId,
        ParaBirimiId: paraBirimiId,
      };
      productList.push(model);
    });

    var localUrl = "https://localhost:44348/api/data/UpdateUrunTeklifFromModal";
    var realUrl =
      "https://farmakodwebapi.setcrm.com/api/data/UpdateUrunTeklifFromModal";
    $.ajax({
      contentType: "application/json",
      type: "POST",
      url: realUrl,
      dataType: "json",
      data: JSON.stringify(productList),
      async: true,
      success: function (r) {
        if (r.Status) {
          $("#urunTable").append(rows);
          $("#subUrunTable").hide();
          $(".delete-product").hide();
          $(".add-product").show();
          $("#save_content2").prop("disabled", false);
          notify("success", "İşlem başarıyla gerçekleşti...");
        } else {
          notify("danger", r.Message);
        }
      },
    });
  });
  $("body").on("click", "#save_content3", function () {
    $("#save_content3").prop("disabled", true);
    var rows = $("#subTeslimatDetayTable tbody tr");

    $.each(rows, function (i, v) {
      var urunId = $(this).data("recordid");
      var miktarVal = $(this).find(".miktar").val();
      var terminTarihi = $(this).find(".terminTarihi").val();
      var stok = $(this).find(".stok").is(":checked"); //todo

      var model = {
        TeklifId: $("#RecordPublicId").val(),
        UrunId: urunId,
        Miktar: miktarVal,
        TerminTarihi: terminTarihi,
        Stok: stok,
      };
      teslimatList.push(model);
    });

    var localUrl = "https://localhost:44348/api/data/CreateUrunTeklifFromModal";
    var realUrl =
      "https://farmakodwebapi.setcrm.com/api/data/CreateUrunTeklifFromModal";
    $.ajax({
      contentType: "application/json",
      type: "POST",
      url: realUrl,
      dataType: "json",
      data: JSON.stringify(teslimatList),
      async: true,
      success: function (r) {
        if (r.Status) {
          $("#teslimatDetayTable").append(rows);
          $("#subTeslimatDetayTable").hide();
          $(".delete-teslimat").hide();
          $(".add-teslimat").show();
          $("#save_content3").prop("disabled", false);
          notify("success", "İşlem başarıyla gerçekleşti...");
        } else {
          notify("danger", r.Message);
        }
      },
    });
  });
  $("body").on("click", "#save_content4", function () {
    $("#save_content4").prop("disabled", true);

    var localUrl = "https://localhost:44348/api/data/TeklifUpdateFromModal";
    var realUrl =
      "https://farmakodwebapi.setcrm.com/api/data/TeklifUpdateFromModal";

    var data = {
      RecordId: $("#RecordPublicId").val(),
      OdemeSartlari: "",
      TedarikciAciklama: "",
      Iskonto: $("#iskonto").val(),
    };
    $.post(realUrl, data, function (r) {
      if (r.Status) {
        $("#save_content4").prop("disabled", false);
        notify("success", "İşlem başarıyla gerçekleşti...");
      } else {
        notify("danger", r.Message);
      }
    });
  });

  $("body").on("click", ".add-product", function () {
    $(this).toggle();
    $(this).parent().find(".delete-product").show();
    var row = $(this).closest("tr");
    $("#subUrunTable").append(row);
    $("#subUrunTable").show();
  });
  $("body").on("click", ".delete-product", function () {
    $(this).toggle();
    $(this).parent().find(".add-product").show();
    var row = $(this).closest("tr");
    $("#urunTable").append(row);
  });

  $("body").on("click", ".add-teslimat", function () {
    $(this).toggle();
    $(this).parent().find(".delete-teslimat").show();
    var row = $(this).closest("tr");
    $("#subTeslimatDetayTable").append(row);
    $("#subTeslimatDetayTable").show();
  });
  $("body").on("click", ".delete-teslimat", function () {
    $(this).toggle();
    $(this).parent().find(".add-teslimat").show();
    var row = $(this).closest("tr");
    $("#teslimatDetayTable").append(row);
  });

  function getInfoFromPage() {
    $("#odemeSartlari").val(
      $("label[for=C9D9D88F341740D582B9D47543BD6E94]").parent().data("value")
    );
    $("#tedarikciAciklamasi").val(
      $("label[for=9E55AE3A515E4C609DF51F00587BCB11]").parent().data("value")
    );
    var iskonto = $("label[for=81C68755302A4DD098FC8ED1FF79BDC6]")
      .parent()
      .data("value");
    if (!String.isNullOrWhiteSpace(iskonto)) {
      $("#iskonto").val(parseInt(iskonto));
    }
  }
  function getProductInfos() {
    var localUrl =
      "https://localhost:44348/api/data/TeklifUrunList?recordId=" +
      $("#RecordPublicId").val();

    var realUrl =
      "https://farmakodwebapi.setcrm.com/api/data/TeklifUrunList?recordId=" +
      $("#RecordPublicId").val();
    $.get(realUrl, function (r) {
      if (r.Status) {
        if (r.UrunList.length > 0) {
          // var urunTable = $(
          //   '<table id="urunTable" class="table" style="width:100%">'
          // );
          var urunTable = $(
            '<table id="urunTable" class="table" style="width:100%;table-layout:fixed;">'
          );
          var thead = urunTable.append("<thead/>");
          // var newRow = $('<tr class="table table-bordered table-hover"/>');
          var newRow = $('<tr class=""/>');
          newRow.append(
            $('<th style="text-align:center;width:35%;"/>').text("Ürün")
          );
          newRow.append(
            $('<th style="text-align:center;width:15%;"/>').text("Birim Fiyat")
          );
          newRow.append(
            $('<th style="text-align:center;width:12%;"/>').text("KDV")
          );
          newRow.append(
            $('<th style="text-align:center;width:17%;"/>').text("Nakliye")
          );
          newRow.append(
            $('<th style="text-align:center;width:21%;"/>').text("Para Birimi")
          );
          newRow.append($('<th style="text-align:center;width:7%;"/>'));
          thead.append(newRow);
          urunTable.append(thead);
          var tbody = $("<tbody />");

          $.each(r.UrunList, function (i, v) {
            var newRow = $('<tr class=" table-bordered table-hover"/>').attr(
              "data-recordId",
              v.UrunId
            );
            newRow.append(
              String.format(
                '<td class="urunAdi"><input type="text" class="urun text-center" style="border-radius:3px;border: 1px solid #cccccc;padding: 8px 12px;width:100%;" value="{0}" disabled></input></td>',
                v.TalepUrun
              )
            );
            newRow.append(
              String.format(
                '<td ><input type="number" min="0" class="birimFiyat text-center" style="border-radius:3px;border: 1px solid #cccccc;padding: 8px 12px;width:100%;" value="{0}"></input></td>',
                parseInt(v.BirimFiyat)
              )
            );

            newRow.append(
              String.format(
                '<td ><input type="number" min="0" style="border-radius: 3px;border: 1px solid #cccccc;padding: 8px 12px;width:100%;" class="kdv text-center" value="{0}"></input></td>',
                parseInt(v.Kdv)
              )
            );
            newRow.append(
              String.format(
                '<td ><input type="select"  class="nakliye" id="nakliye_{0}"></input></td>',
                i
              )
            );
            newRow.append(
              String.format(
                '<td ><input type="select"  class="paraBirimi" id="paraBirimi_{0}"></input></td>',
                i
              )
            );
            newRow.append(
              String.format(
                '<td style="text-align:center;"><button id="product_{0}" type="button" class="btn btn-sm btn-success add-product"><i class="fas fa-plus"></i></button>' +
                  '<button id="delete-product_{0}" type="button" class="btn btn-sm btn-danger delete-product" style="display:none"><i class="fa fa-minus"></i></button></td>',
                i
              )
            );
            tbody.append(newRow);
            urunTable.append(tbody);
            $(".content_tab2").append(urunTable);
          });
          createProductSubTable();
          $(".content_tab2").append(
            '<div class="row" style="text-align:right;width:100%;"><div class="col-md-12"><button id="save_content2" type="button" class="btn btn-md btn-success"><i class="fa fa-save"></i></button></div></div>'
          );
          var nakliyeDatalist = [
            {
              id: "CEB4D320C0374822847A58CEC385AB96",
              text: "Dahil",
            },
            {
              id: "9465DE8785F44969881F4B1505954A41",
              text: "Dahil Değil",
            },
          ];
          prepareSelect2WithData(".nakliye", nakliyeDatalist);
          prepareSelect2(
            ".paraBirimi",
            "/summary/PredefinedItems",
            {
              parentId: "65274AE7E3AB455B977C4306177B656C",
            },
            null,
            false
          );
          $.each(r.UrunList, function (i, v) {
            if (!String.isNullOrWhiteSpace(v.NakliyeId)) {
              $("#nakliye_" + i).select2("data", {
                id: v.NakliyeId,
                text: v.Nakliye,
              });
            }
            if (!String.isNullOrWhiteSpace(v.ParaBirimiId)) {
              $("#paraBirimi_" + i).select2("data", {
                id: v.ParaBirimiId,
                text: v.ParaBirimi,
              });
            }
          });
        }
      }
    });
  }

  function getTeslimatDetaylari() {
    var localUrl =
      "https://localhost:44348/api/data/TeslimatDetayList?recordId=" +
      $("#RecordPublicId").val();

    var realUrl =
      "https://farmakodwebapi.setcrm.com/api/data/TeslimatDetayList?recordId=" +
      $("#RecordPublicId").val();
    $.get(realUrl, function (r) {
      if (r.Status) {
        if (r.TeslimatDetayList.length > 0) {
          var teslimatDetayTable = $(
            '<table id="teslimatDetayTable" class="table" style="width:100%">'
          );
          var thead = teslimatDetayTable.append("<thead/>");
          var newRow = $('<tr class="table-hover"/>');
          newRow.append(
            $('<th style="text-align:center;width:50px;"/>').text("Ürün")
          );
          newRow.append(
            $('<th style="text-align:center;width:19%;"/>').text("Miktar")
          );
          newRow.append(
            $('<th style="text-align:center;width:19%;"/>').text(
              "Termin Tarihi"
            )
          );
          newRow.append(
            $('<th style="text-align:center;width:6%;"/>').text("Stok")
          );
          newRow.append(
            $('<th style="text-align:center;width:6%;"/>').text(" ")
          );
          thead.append(newRow);
          teslimatDetayTable.append(thead);
          var tbody = $("<tbody />");
          $.each(r.TeslimatDetayList, function (i, v) {
            var newRow = $(
              '<tr class="table table-bordered table-hover"/>'
            ).attr("data-recordId", v.UrunId);
            newRow.append(
              String.format(
                '<td  urunAdi"><input type="text" class="urun text-center" style="border-radius:3px;border: 1px solid #cccccc;padding: 8px 12px;width:100%;" value="{0}" disabled></input></td>',
                v.TalepUrun
              )
            );
            newRow.append(
              String.format(
                '<td "><input style="border-radius:3px;border: 1px solid #cccccc;padding: 8px 12px;width:100%;" type="number" class="miktar text-center" value="{0}"></input></td>',
                parseInt(v.Miktar).toFixed(0)
              )
            );
            newRow.append(
              String.format(
                '<td ><input class="text-center terminTarihi" id="terminTarihi_{0}" type="text" style="border-radius:3px;border: 1px solid #cccccc;padding: 8px 12px;width:100%;"></td>',
                i
              )
            );
            newRow.append(
              String.format(
                '<td style="vertical-align: middle;text-align: center;"><input type="checkbox" class="stok" style="margin:0px!important" id=stok_{0}/></td>',
                i
              )
            );
            newRow.append(
              String.format(
                '<td ><button type="button" class="btn btn-sm btn-success add-teslimat" id="teslimat_{0}"><i class="fas fa-plus"></i></button>' +
                  '<button id="delete-teslimat_{0}" type="button" class="btn btn-sm btn-danger delete-teslimat" style="display:none"><i class="fa fa-minus"></i></button></td>',
                i
              )
            );

            tbody.append(newRow);
            teslimatDetayTable.append(tbody);
            $(".content_tab3").append(teslimatDetayTable);

            $(String.format("#terminTarihi_{0}", i)).datetimepicker({
              inline: false,
              closeOnDateSelect: true,
              timepicker: false,
              format: "d.m.Y",
              mask: false,
              scrollMonth: false,
              scrollTime: false,
              scrollInput: false,
              dayOfWeekStart: 1,
            });
          });
          createTeslimatSubTable();
          $(".content_tab3").append(
            '<div class="row" style="text-align:right;width:100%;"><div class="col-md-12"><button id="save_content3" type="button" class="btn btn-md btn-success"><i class="fa fa-save"></i></button></div></div>'
          );
          $.each(r.TeslimatDetayList, function (i, v) {
            if (!String.isNullOrWhiteSpace(v.TerminTarihi)) {
              $("#terminTarihi_" + i).val(v.TerminTarihi);
            }
          });

          $("#teslimatDetayTable tbody tr td").css("padding", "0px!important;");
        }
      }
    });
  }

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
  function createProductSubTable() {
    var subUrunTable = $(
      '<table id="subUrunTable" class="table" style="width:100%;table-layout:fixed;display:none;">'
    );
    var thead = subUrunTable.append("<thead/>");
    // var newRow = $('<tr class="table table-bordered table-hover"/>');
    var newRow = $('<tr class=""/>');
    newRow.append($('<th style="text-align:center;width:35%;"/>').text("Ürün"));
    newRow.append(
      $('<th style="text-align:center;width:15%;"/>').text("Birim Fiyat")
    );
    newRow.append($('<th style="text-align:center;width:12%;"/>').text("KDV"));
    newRow.append(
      $('<th style="text-align:center;width:17%;"/>').text("Nakliye")
    );
    newRow.append(
      $('<th style="text-align:center;width:21%;"/>').text("Para Birimi")
    );
    newRow.append($('<th style="text-align:center;width:7%;"/>'));
    thead.append(newRow);
    subUrunTable.append(thead);
    var tbody = $("<tbody />");
    subUrunTable.append(tbody);
    $(".content_tab2").append(
      "<hr style='width:100%;border-top:3px dashed #8c8b8b'>"
    );
    $(".content_tab2").append(subUrunTable);
  }
  function createTeslimatSubTable() {
    var subTeslimatDetayTable = $(
      '<table id="subTeslimatDetayTable" class="table" style="width:100%;display:none;">'
    );
    var thead = subTeslimatDetayTable.append("<thead/>");
    var newRow = $('<tr class="table-hover"/>');
    newRow.append(
      $('<th style="text-align:center;width:50px;"/>').text("Ürün")
    );
    newRow.append(
      $('<th style="text-align:center;width:19%;"/>').text("Miktar")
    );
    newRow.append(
      $('<th style="text-align:center;width:19%;"/>').text("Termin Tarihi")
    );
    newRow.append($('<th style="text-align:center;width:6%;"/>').text("Stok"));
    newRow.append($('<th style="text-align:center;width:6%;"/>').text(" "));
    thead.append(newRow);
    subTeslimatDetayTable.append(thead);
    var tbody = $("<tbody />");
    subTeslimatDetayTable.append(tbody);
    $(".content_tab3").append(
      "<hr style='width:100%;border-top:3px dashed #8c8b8b'>"
    );
    $(".content_tab3").append(subTeslimatDetayTable);
  }
});
