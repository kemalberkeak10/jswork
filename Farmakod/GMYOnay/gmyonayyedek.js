$(function () {
  $(".btn-br-actions[data-publicid=526FB8067B834D70B8A2E6C6444C61ED]").hide();
  $(".btn-br-actions[data-publicid=526FB8067B834D70B8A2E6C6444C61ED]")
    .closest("td")
    .prepend(
      '<a id="btnGmyOnay" class="btn btn-sm btn-warning"  style="margin-right:10px;" >GMY Onay</a>'
    );
  $("body").on("click", "#btnGmyOnay", function () {
    $("#modalGmyOnay").remove();
    window.setModal.Create({
      id: "modalGmyOnay",
      html: {
        header: "GMY Onay",
        body:
          '<div id="msg3" style="margin:0 23px 5px; width: 80%;font-size:15px;"></div>' +
          '<div id="txt3" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>' +
          '<div style="display:flex;justify-content: space-evenly;"><button id="btnOnay" type="button" class="btn btn-ms btn-success" >Onay</button><button id="btnRet" type="button" class="btn btn-ms btn-danger" >Ret</button><button id="btnRevizyon" type="button" class="btn btn-ms btn-warning" >Revizyon</button></div>' +
          '<table class="table tblGmy" style="display:none;max-width: 90%;margin-top:10px;margin-left:20px;">' +
          "<thead>" +
          "<tr>" +
          "<th>Açıklama</th>" +
          "</tr>" +
          "</thead>" +
          "<tbody>" +
          "<tr>" +
          '<td colspan="1" rowspan="1"><textarea rows="2" cols="70" id="aciklamaGmyOnay" type="text" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;" /></td>' +
          "</tr>" +
          "</tbody>" +
          "</table>",
        footer:
          '<button id="btnGmyOnayKaydet" type="button" class="btn btn-sm btn-success" disabled>Kaydet</button>' +
          '<button type="button" class="btn btn-sm btn-default" data-dismiss="modal" onclick="window.location.reload();">Kapat</button>',
      },
    });
    $("#modalGmyOnay .modal-dialog").css("height", "30%");
    $("#modalGmyOnay .modal-dialog").css("width", "30%");
    $("#modalGmyOnay").modal({
      backdrop: false,
    });
    $("#modalGmyOnay").find("#txt3").hide();
  });
  var aciklama, recordId, islemiYapan;
  var durum = "";
  var islemTipi = "";
  $("body").on("click", "#btnOnay", function () {
    durum = "onay";
    islemTipi = "GMY talebi onayladı.";
    $(".tblGmy").show();
    $(".tblGmy").find("thead th")[0].innerHTML = "Onay Açıklaması";
    $("#btnGmyOnayKaydet").prop("disabled", false);
  });
  $("body").on("click", "#btnRet", function () {
    durum = "ret";
    islemTipi = "GMY talebi reddetti.";
    $(".tblGmy").show();
    $(".tblGmy").find("thead th")[0].innerHTML = "Ret Açıklaması";
    $("#btnGmyOnayKaydet").prop("disabled", false);
  });
  $("body").on("click", "#btnRevizyon", function () {
    durum = "revizyon";
    islemTipi = "GMY revize talep etti.";
    $(".tblGmy").show();
    $(".tblGmy").find("thead th")[0].innerHTML = "Revizyon Açıklaması";
    $("#btnGmyOnayKaydet").prop("disabled", false);
  });
  $("body").on("click", "#btnGmyOnayKaydet", function () {
    aciklama = $("#aciklamaGmyOnay").val();
    if (durum == "ret" || durum == "revizyon") {
      if (String.isNullOrWhiteSpace(aciklama)) {
        setUtil.alert({
          container: "#modalGmyOnay .modal-body #msg3",
          message: "Lütfen açıklama alanını doldurunuz.",
          alertClass: "alert-danger",
          autoClose: true,
        });
        return;
      }
    }
    recordId = $("#RecordPublicId").val();
    islemiYapan = userData.id;
    var localUrl =
      "https://localhost:44348/api/data/GmyOnay?recordId=" +
      recordId +
      "&aciklama=" +
      aciklama +
      "&islemiYapan=" +
      islemiYapan +
      "&islemTipi=" +
      islemTipi;
    var realUrl =
      "https://farmakodwebapi.setcrm.com//api/data/GmyOnay?recordId=" +
      recordId +
      "&aciklama=" +
      aciklama +
      "&islemiYapan=" +
      islemiYapan +
      "&islemTipi=" +
      islemTipi;
    $.post(realUrl, function (r) {
      if (r.Status) {
        $("#modalGmyOnay").find("#txt3").hide();
        notify(
          "success",
          "İşlem başarılı. Sayfa yenileniyor lütfen bekleyiniz..."
        );
        setTimeout(() => {
          $(
            ".btn-br-actions[data-publicid=526FB8067B834D70B8A2E6C6444C61ED]"
          ).trigger("click");
          window.location.reload();
        }, 1000);
      } else {
        $("#msg3").show();
        setUtil.alert({
          container: "#modalGmyOnay .modal-body #msg3",
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
