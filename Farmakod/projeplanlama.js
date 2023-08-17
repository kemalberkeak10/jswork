$(function () {
  var count = 0;
  $(".btn-br-actions[data-publicid=3945F9B8BA6148019C627CCADDEA0CE8]").hide();
  $(".btn-br-actions[data-publicid=3945F9B8BA6148019C627CCADDEA0CE8]")
    .closest("td")
    .prepend(
      '<a id="btnProjePlanlama" class="btn btn-sm btn-warning"  style="margin-right:10px;" >Proje Planlama</a>'
    );
  $("body").on("click", "#btnProjePlanlama", function () {
    var table = $(".table-responsive table");
    $("#modalProjePlanlama").remove();
    window.setModal.Create({
      id: "modalProjePlanlama",
      html: {
        header: "Proje Planlama",
        body:
          '<div id="msg" style="margin:0 23px 5px; width: 80%;font-size:15px;"></div>' +
          '<div id="modalProjePlanlamaLoadingBar1" style="margin:0 0 5px; width: 100%;display:none;">İşlem yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>' +
          '<table class="tblProjeAdimi" style="width: 75%">' +
          "<thead>" +
          "<th>Ara</th>" +
          "</thead>" +
          "<tbody>" +
          "<tr>" +
          "<td>" +
          '<input class="modal-search" id="searchUrun" type="text" style="margin-right:10px;font-size:17px;width: 50%;border-radius: 3px;border: 1px solid;height: 38px;"></td>' +
          "</tr>" +
          "</tbody>" +
          "</table>" +
          String.format(
            '<div style="width:100%"><div class="hizli-ekle-records" style="width: 100%;overflow-y: auto;height: 300px;"><h4 style="margin-top:5px;">Teknik Şartname Maddeleri</h4></div><div class="selected-records" style="width: 100%;"><h4 style="margin-top:15px;">Eklenen İş Emirleri</h4></div><hr><div id="divPlanlananlar" class="divPlanlananlar" ></div></div>'
          ),
        footer:
          '<button id="btnProjePlanKaydet" type="button" class="btn btn-sm btn-success " >Kaydet</button>' +
          '<button id="btnKapat" class="btn btn-danger btn-sm" data-dismiss="modal" onclick="window.location.reload()">İptal Et</button>',
      },
    });
    $("#modalProjePlanlama .modal-dialog").css({
      width: "80%",
    });

    var modalBody = $("#modalProjePlanlama .modal-body"),
      bodyRecords = modalBody.find(".hizli-ekle-records");
    selectedRecords = modalBody.find(".selected-records");
    bodyRecords.append(
      $("<table/>", {
        class: "table table-bordered",
        style: "background-color:#b1d3cc;",
      })
        .append(
          $("<thead style='background-color:#b1d3cc;' />").html(
            '<tr><th style="text-align: center; vertical-align:middle;width:5%">Sıra Numarası</th><th style="text-align: center; vertical-align:middle;width:10%">Madde Açıklaması</th><th style="text-align: center; vertical-align:middle;width:20%">Açıklama/Not</th><th style="width:2%"></th></tr>'
          )
        )
        .append($("<tbody/>"))
    );

    selectedRecords.append(
      $("<table/>", {
        class: "table table-bordered table-hover tblSelected",
        style: "height: 30px;",
      })
        .append(
          $("<thead style='background-color:#58cbb4;' />").html(
            '<tr><th style="text-align: center; vertical-align:middle;width:15%">Bağlı Olduğu Teknik Şartname Maddesi</th><th>Proje Adımı</th><th>Proje Alt Adımı</th><th>Konu</th><th>Açıklama</th><th></th></tr>'
          )
        )
        .append($("<tbody/>"))
    );
    $("#modalProjePlanlama")
      .find(".modal-header button:first")
      .attr("onclick", "window.location.reload()");
    $("#modalProjePlanlama").modal({
      backdrop: "static",
      keyboard: false,
    });
    LrOkuma();
    $("#selectProjeAltAdimi").select2("enable", false);
  });
  $("body").on("change", ".selectProjeAdimi", function (e) {
    debugger;
    var id = $(this).closest("tr").data("count");
    if (String.isNullOrWhiteSpace($(this).select2("data"))) {
      $("#selectProjeAltAdimi_" + id).select2("enable", false);
      $("#selectProjeAltAdimi_" + id).select2("data", null);
    } else {
      $("#selectProjeAltAdimi_" + id).select2("enable", true);
      prepareSelect2(
        "#selectProjeAltAdimi_" + id,
        "/Summary/LookupFieldValues",
        {
          coId: "48AB9369AAAB46169D7CCB7A13E8C08F",
          id: "91DC47974A134127860A3AE3F83865B6",
          viewFilterId: "D5246B6B13914083AEEAA5E701D8417A",
          controllingRecordId: $(this).val(),
          controllingId: "D5182E4C3F084936929861E534028D6F",
          groupIds: $(this).val(),
          itemId: "91DC47974A134127860A3AE3F83865B6",
        },
        null,
        false
      );
    }
  });
  $("body").on("keyup", ".modal-search", function () {
    debugger;
    var trList = $(".hizli-ekle-records .table tbody tr");
    var value = $(this).val().toLowerCase();
    trList.filter(function () {
      debugger;
      // $(this).toggle($(this).find('td:eq(2) input').val().trim().toLowerCase().indexOf(value) > -1);
      $(this).toggle(
        $(this)
          .find("td:eq(1) div")[0]
          .innerHTML.trim()
          .toLowerCase()
          .indexOf(value) > -1
      );

      //var column1Value = $(this).find('td:eq(1) textarea').val().trim().toLowerCase();
      //var column2Value = $(this).find('td:eq(0) input').val().trim().toLowerCase();
      // $(this).toggle(column1Value.indexOf(value) > -1 ||
      //     column2Value.indexOf(value) > -1)
    });
  });

  $("body").on("click", ".row-ekle", function () {
    debugger;
    var id = $(this).closest("tr").data("id");
    var addedRow = $(this).closest("tr");
    var tsMaddesi = addedRow.find(".tsMaddesi")[0].innerHTML;
    var siraNo = addedRow.find(".siraNo")[0].innerHTML;
    debugger;
    ModalCreate(tsMaddesi, id, siraNo);
  });
  $("body").on("click", ".row-goruntule", function () {
    debugger;
    var id = $(this).closest("tr").data("id");
    IsEmriKriterleme(id);
  });
  $("body").on("click", ".row-save", function () {
    debugger;
    count++;
    var id = $(this).closest("tr").data("id");
    var addedRow = $(this).closest("tr");
    var tsMaddesi = addedRow.data("value");
    var modalBody = $("#modalProjePlanlama .modal-body"),
      selectedRecords = modalBody.find(".tblSelected");
    var tbody = selectedRecords.find("tbody");
    var cloneRow = addedRow.clone();
    debugger;
    // tbody.append(String.format('<tr data-id="{0}"><td><div>{1}</div></td><td><input class="selectProjeAdimi" type="select" /></td><td><input class="selectProjeAltAdimi" type="select" /></td><td><input class="konu form-control" type="text" /></td><td><input class="terminTarihi form-control" type="text" /></td><td><input class=" planlanmaTarihi form-control" type="text" /></td><td><input class="form-control tamamlanmaTarihi" type="text" /></td><td><input class="form-control durum" type="text" /></td><td><input class="form-control aciklama" type="text" /></td><td><button class="btn btn-sm btn-danger row-sil" style="" ><i class="fa fa-minus"></i></button></td></tr>', id, tsMaddesi));
    tbody.append(cloneRow);
    cloneRow.find(".row-ekle").hide();
    cloneRow.find(".row-save").hide();
    cloneRow.find("#btnIsEmriKapat").hide();
    cloneRow.find(".row-sil").show();
  });
  $("body").on("click", ".row-sil", function () {
    debugger;
    var deletedRow = $(this).closest("tr");
    var id = $(this).closest("tr").data("id");
    deletedRow.remove();
    // var modalBody = $('#modalProjePlanlama .modal-body'),
    //     bodyRecords = modalBody.find('.hizli-ekle-records');
    // var tbody = bodyRecords.find('tbody');
    // tbody.append(deletedRow);
    // tbody.find('.row-ekle').show();
    // tbody.find('.row-sil').hide();
  });
  var isEmirleriList = [];
  var a = 0;
  // $("body").on("click",
  //     '#btnEkle',
  //     function(e) {
  //         debugger;
  //         var isExist = false;
  //         var data = $('input#filtreCheck:checked');
  //         if (data.length > 0) {
  //             var modal = $('#modalProjePlanlama'),
  //                 modalBody = modal.find('.modal-body');
  //             divAnalizler = modalBody.find('.hizli-ekle-records');
  //             tbody = divAnalizler.find('tbody');
  //             selectedRecords = modalBody.find('.selected-records');
  //             trsSelected = selectedRecords.find('tbody tr');
  //             trsSelected.each(function(i, v) {
  //                 if (tbody.find('tr:eq(0)').data('projealtadim') == $(v).find('.pAltAdim').data('id')) {
  //                     setUtil.alert({
  //                         container: '#modalProjePlanlama .modal-body #msg',
  //                         message: "Bu Proje Alt Adımı Daha Önce Eklenmiştir",
  //                         alertClass: 'alert-warning',
  //                         autoClose: true
  //                     });
  //                     isExist = true;
  //                 }
  //             });
  //             //tbody.html('');
  //             if (isExist == false) {

  //                 var projeAdim = $('#selectProjeAdimi').select2('data').text;
  //                 var projeAltAdim = $('#selectProjeAltAdimi').select2('data').text;
  //                 var modalBody = $('#modalProjePlanlama .modal-body'),
  //                     selectedRecords = modalBody.find('.selected-records');
  //                 var tbody = selectedRecords.find('tbody');
  //                 tbody.append(String.format('<tr><td><button class="btn btn-sm btn-danger row-sil" style="height:40px;" ><i class="fa fa-minus"></i></td><td data-id="{2}" class="pAdim" >{0}</td><td class="pAltAdim" data-id="{3}">{1}</td><td id="isEmirleriListesi_{4}" class="isEmirleri" ></td></tr>', projeAdim, projeAltAdim, $('#selectProjeAdimi').select2('data').id, $('#selectProjeAltAdimi').select2('data').id, a));
  //                 data.each(function(i, v) {
  //                     var tr = $(this).closest('tr');
  //                     isEmirleriList.push({
  //                         id: tr.data('id'),
  //                         text: tr.find('.isEmri')[0].innerText
  //                     });
  //                     $('#isEmirleriListesi_' + a).append(String.format('<tr data-id="{0}"><td>{1}</td></tr>', tr.data('id'), tr.find('.isEmri')[0].innerText));
  //                 });
  //                 a++;
  //                 $('.filtre-check').prop('checked', false);

  //             }
  //         } else {
  //             setUtil.alert({
  //                 container: '#modalProjePlanlama .modal-body #msg',
  //                 message: "Lütfen En Az Bir Tane İş Emri Seçiniz",
  //                 alertClass: 'alert-warning',
  //                 autoClose: true
  //             });
  //         }

  //     });

  function LrOkuma() {
    var modal = $("#modalProjePlanlama"),
      modalBody = modal.find(".modal-body");
    divAnalizler = modalBody.find(".hizli-ekle-records");
    tbody = divAnalizler.find("tbody");
    var url =
      "https://farmakodwebapi.setcrm.com/api/data/LrOkuma?recordId=" +
      $("#RecordPublicId").val() +
      "&lrId=7E261562B4534877B668313BD2D9FAF3&q=";
    var url2 =
      "http://localhost:44358/api/data/LrOkuma?recordId=" +
      $("#RecordPublicId").val() +
      "&lrId=7E261562B4534877B668313BD2D9FAF3&q=";

    $.get(url, function (r) {
      debugger;
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
            var aciklamaNot = v.Values.first(
              "FieldPublicId",
              "4180B6F6432B492FA554AD0F9F3204A8"
            ).Value;
            tbody.append(
              String.format(
                "<tr style='background-color:white' data-id='{0}'><td><div class='siraNo' >{1}</div></td><td><div class='tsMaddesi' >{2}</div></td><td><div>{3}</div></td><td><button class='btn btn-sm btn-primary row-goruntule' style='height:40px;' ><i class='fas fa-external-link-alt'></i></button><button class='btn btn-sm btn-success row-ekle' style='height:40px;' ><i class='fa fa-plus'></i></button></td></tr>",
                v.PublicId,
                siraNo,
                maddeAciklamasi,
                aciklamaNot
              )
            );
          });
        }
      }
    });
  }

  function IsEmriKriterleme(id) {
    var modal = $("#modalProjePlanlama"),
      modalBody = modal.find(".modal-body");
    div = modalBody.find(".divPlanlananlar");

    var localUrl =
      "https://localhost:44348/api/data/IsEmriVfKriterleme?tsMaddesi=" + id;
    var realUrl =
      "https://farmakodwebapi.setcrm.com/api/data/IsEmriVfKriterleme?tsMaddesi=" +
      id;
    $.get(realUrl, function (r) {
      debugger;
      if (r.Status === true) {
        if (r.list.Items.length > 0) {
          div.html("");
          document.getElementById("divPlanlananlar").style.border =
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
        // setUtil.alert({
        //     container: '#modalProjePlanlama .modal-body #msg',
        //     message: "Bu adıma bağlı iş emri bulunamadı",
        //     alertClass: 'alert-warning',
        //     autoClose: true
        // });
      }
    });
  }

  function ModalCreate(tsMaddesi, id, siraNo) {
    $("#modalEdit").remove();
    window.setModal.Create({
      id: "modalEdit",
      html: {
        header: "Yeni İş Emri",
        body:
          '<div id="sonucMsg"></div>' +
          String.format(
            '<table class="table table-bordered table-hover" ><thead style="background-color:#58cbb4;"><th style="text-align: center; vertical-align:middle;width:5%">Sıra Numarası</th><th>Bağlı Olduğu Teknik Şartname</th><th>Proje Adımı</th><th>Proje Alt Adımı</th><th>Konu</th><th>Açıklama</th><th></th></thead><tbody><tr data-id="{0}" data-value="{1}" data-count="{2}"><td><div>{3}</div></td><td><div>{1}</div></td><td><input id="selectProjeAdimi_{2}" class="selectProjeAdimi" type="select" /></td><td><input id="selectProjeAltAdimi_{2}" class="selectProjeAltAdimi" type="select" /></td><td><input class="konu form-control" type="text" /></td><td><input class="form-control aciklama" type="text" /></td><td style="text-align: center; vertical-align:middle;width:8%"><button class="btn btn-sm btn-danger row-sil" style="display:none;" ><i class="fa fa-minus"></i></button><a id="btnIsEmriKaydet" type="button" data-dismiss="modal" class="btn btn-sm btn-success row-save" title="Kaydet"><i class="fas fa-save"></i></a>' +
              '<a id="btnIsEmriKapat" title="Kapat" class="btn btn-danger btn-sm" data-dismiss="modal"><i class="far fa-times-circle"></i></a></td></tr></tbody></table>',
            id,
            tsMaddesi,
            count,
            siraNo
          ),
        footer: "",
      },
    });
    $("#modalEdit").modal({
      backdrop: "static",
      keyboard: false,
    });
    $("#modalEdit .modal-dialog").css({
      width: "80%",
      margin: "200px 0 0 150px ",
    });
    prepareSelect2(
      "#selectProjeAdimi_" + count,
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
      "#selectProjeAltAdimi_" + count,
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
    $(".selectProjeAltAdimi").select2("enable", false);
  }
  $("body")
    .off("click", "#btnProjePlanKaydet")
    .on("click", "#btnProjePlanKaydet", function () {
      $("#btnKapat").prop("disabled", true);
      $("#btnProjePlanKaydet").prop("disabled", true);
      var talepFormlari = [];
      var isEmriList = [];
      var newList = [];
      var modalBody = $("#modalProjePlanlama .modal-body"),
        selectedRecords = modalBody.find(".selected-records");
      var tbody = selectedRecords.find("tbody");
      modalBody.find("#modalProjePlanlamaLoadingBar1").show();
      var trList = tbody.find("tr");
      trList.each(function (i, v) {
        debugger;
        var id = $(v).data("id");
        var count = $(v).data("count");
        var projeAdim = $(v)
          .find("#selectProjeAdimi_" + count)
          .val();
        var projeAltAdim = $(v)
          .find("#selectProjeAltAdimi_" + count)
          .val();
        var konu = $(v).find(".konu").val();
        var aciklama = $(v).find(".aciklama").val();
        var model = {
          TeknikSartname: id,
          ProjeAdim: projeAdim,
          ProjeAltAdim: projeAltAdim,
          Konu: konu,
          TerminTarihi: "",
          PlanlanmaTarihi: "",
          TamamlanmaTarihi: "",
          Durum: "",
          Aciklama: aciklama,
        };

        isEmriList.push(model);
      });
      var model = {
        IsEmirleri: isEmriList,
        RecordId: $("#RecordPublicId").val(),
        User: userData.id,
      };
      var localUrl = String.format(
        "https://localhost:44348/api/data/ProjePlanlamaIsEmri"
      );
      var realUrl = String.format(
        "https://farmakodwebapi.setcrm.com/api/data/ProjePlanlamaIsEmri"
      );
      $.post(realUrl, model, function (r) {
        if (r.Status) {
          $(
            ".btn-br-actions[data-publicid=3945F9B8BA6148019C627CCADDEA0CE8]"
          ).trigger("click");
          notify("success", "Kayıt oluşturuldu.");
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        } else {
          setUtil.alert({
            container: "#modalProjePlanlama .modal-body #msg",
            message: r.Message,
            alertClass: "alert-danger",
            autoClose: true,
          });
          $("#btnProjePlanKaydet").prop("disabled", false);
          modalBody.find("#modalProjePlanlamaLoadingBar1").hide();
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
