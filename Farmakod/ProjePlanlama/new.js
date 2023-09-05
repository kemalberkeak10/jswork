$(function () {
  var count = 0;
  var countTalep = 0;
  var urunHizmetList = [];
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
          '<table class="tblProjeAdimi" style="width: 75%;font-size:12px;">' +
          "<thead>" +
          "<th>Ara</th>" +
          "</thead>" +
          "<tbody>" +
          "<tr>" +
          "<td>" +
          '<input class="modal-search" id="searchUrun" type="text" style="margin-right:10px;font-size:12px;width: 30%;border-radius: 3px;border: 1px solid;height: 30px;"></td>' +
          "</tr>" +
          "</tbody>" +
          "</table>" +
          String.format(
            '<div style="width:100%"><div class="hizli-ekle-records" style="width: 100%;overflow-y: auto;height: 300px;"><h5 style="margin-top:5px;">Teknik Şartname Maddeleri</h5></div><div class="selected-records panel panel-lookup" style="width: 100%;border:0 !important;"><div class="panel-heading headingPnl pointer" style="margin-top:15px;color: #ffffff;background-color: #58cbb4;border-color: #58cbb4;font-size:12px;"><span>Yeni Eklenen İş Emirleri</span></div><div class="panel-body" hidden style="display: none;"></div></div><div id="divPlanlananlar" class="divPlanlananlar panel panel-lookup" style="width: 100%;border:0 !important;" ><div class="panel-heading headingPnl pointer" style="margin-top:15px;color: #ffffff;background-color: #1a242f;border-color: #1a242f;font-size:12px;"><span>Planlanmış İş Emirleri</span></div><div class="panel-body" hidden style="display: none;"></div></div><div id="divTalepHizmet" class="divTalepHizmet panel panel-lookup" style="width: 100%;border:0 !important;" ><div class="panel-heading headingPnl pointer" style="margin-top:15px;color: #ffffff;background-color: #58cbb4;border-color: #58cbb4;font-size:12px;"><span>Yeni Talep Edilecek Ürün/Hizmetler</span></div><div class="panel-body" hidden style="display: none;"></div></div><div id="divTalepPlanlananlar" class="divTalepPlanlananlar panel panel-lookup" style="width: 100%;border:0 !important;" ><div class="panel-heading headingPnl pointer" style="margin-top:15px;color: #ffffff;background-color: #1a242f;border-color: #1a242f;font-size:12px;"><span>Planlanmış Talepler</span></div><div class="panel-body" hidden style="display: none;"></div></div></div>'
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
    divPlanlananlar = modalBody.find(".divPlanlananlar");
    divTalepPlanlananlar = modalBody.find(".divTalepPlanlananlar");
    talepRecords = modalBody.find(".hizli-ekle-talep");
    selectedTalepRecords = modalBody.find(".divTalepHizmet");
    bodyRecords.append(
      $("<table/>", {
        class: "table table-bordered",
        style: "background-color:#b1d3cc;font-size:12px;",
      })
        .append(
          $("<thead style='background-color:#b1d3cc;' />").html(
            '<tr><th style="text-align: center; vertical-align:middle;width:2%">Sıra Numarası</th><th style="text-align: center; vertical-align:middle;width:20%">Madde Açıklaması</th><th style="text-align: center; vertical-align:middle;width:10%">Proje Adımı</th><th style="text-align: center; vertical-align:middle;width:20%">Açıklama/Not</th><th style="width:5%"></th></tr>'
          )
        )
        .append($("<tbody/>"))
    );

    selectedRecords.find(".panel-body").append(
      $("<table/>", {
        class: "table table-bordered table-hover tblSelected",
        style: "height: 30px;font-size:12px;",
      })
        .append(
          $("<thead style='background-color:#58cbb4;' />").html(
            '<tr><th style="text-align: center; vertical-align:middle;width:25%">Bağlı Olduğu Teknik Şartname Maddesi</th><th>Proje Adımı</th><th>Proje Alt Adımı</th><th>Konu</th><th>Açıklama</th><th></th></tr>'
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

    $("#modalProjePlanlama")
      .find(".modal-header button:first")
      .attr("onclick", "window.location.reload()");
    $("#modalProjePlanlama").modal({
      backdrop: "static",
      keyboard: false,
    });
    divPlanlananlar.find(".panel-body").append(
      $("<table/>", {
        class: "table table-bordered table-hover",
        style: "height: 30px;font-size:12px;",
      })
        .append(
          $("<thead style='background-color:#1a242f;color:white;' />").html(
            '<tr><th>Bağlı Olduğu Teknik Şartname Maddesi</th><th>Proje Adımı</th><th>Proje Alt Adımı</th><th>Konu</th><th>Açıklama</th><th style="width:7%;"></th></tr>'
          )
        )
        .append($("<tbody/>"))
    );
    divTalepPlanlananlar.find(".panel-body").append(
      $("<table/>", {
        class: "table table-bordered table-hover",
        style: "height: 30px;font-size:12px;",
      })
        .append(
          $("<thead style='background-color:#1a242f;color:white;' />").html(
            '<tr><th>Bağlı Olduğu İş Emri</th><th>Ürün/Hizmet Adı</th><th>Miktar</th><th>Açıklama</th><th style="text-align: center; vertical-align:middle;width:5%;">Görev</th><th style="width:5%"></th></tr>'
          )
        )
        .append($("<tbody/>"))
    );
    // talepRecords.append($('<table/>', {
    //     class: 'table table-bordered',
    //     'style': 'background-color:#b1d3cc;'
    // }).append($("<thead style='background-color:#b1d3cc;' />").html('<tr><th style="text-align: center; vertical-align:middle;width:2%">Sıra No</th><th style="text-align: center; vertical-align:middle;width:20%">Bağlı olduğu Teknik Şartname Maddesi</th><th style="text-align: center; vertical-align:middle;width:10%">Proje Adımı</th><th style="text-align: center; vertical-align:middle;width:10%">Proje Alt Adımı</th><th style="text-align: center; vertical-align:middle;width:20%">Konu</th><th style="width:5%"></th></tr>')).append($('<tbody/>')));

    selectedTalepRecords.find(".panel-body").append(
      $("<table/>", {
        class: "table table-bordered table-hover",
        style: "height: 30px;font-size:12px;",
      })
        .append(
          $("<thead style='background-color:#58cbb4;' />").html(
            '<tr><th style="text-align: center; vertical-align:middle;width:2%">Bağlı Olduğu İş Emri</th><th style="text-align: center; vertical-align:middle;width:20%">Ürün/Hizmet Adı</th><th style="text-align: center; vertical-align:middle;width:10%">Miktar</th><th>Birim</th><th style="text-align: center; vertical-align:middle;width:10%">Açıklama</th><th style="text-align: center; vertical-align:middle;width:5%">Görev</th><th style="text-align: center; vertical-align:middle;">Doküman</th><th style="width:5%"></th></tr>'
          )
        )
        .append($("<tbody/>"))
    );
    LrOkuma();
  });
  $("body").on("change", ".selectProjeAdimi", function (e) {
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
    var trList = $(".hizli-ekle-records .table tbody tr");
    var value = $(this).val().toLowerCase();
    trList.filter(function () {
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
  $("body").on("click", ".headingPnl", function () {
    $(this).parent().find(".panel-body").toggle();
  });
  $("body").on("click", ".row-ekle", function () {
    var id = $(this).closest("tr").data("id");
    var addedRow = $(this).closest("tr");
    var tsMaddesi = addedRow.find(".tsMaddesi")[0].innerHTML;
    var siraNo = addedRow.find(".siraNo")[0].innerHTML;
    var projeAdim = addedRow.find(".selectProjeAdimi").select2("data");
    var projeAdimId = "";
    if (!String.isNullOrWhiteSpace(projeAdim)) {
      projeAdimId = projeAdim.id;
      projeAdim = projeAdim.text;
      ModalCreate(tsMaddesi, id, siraNo, projeAdim, projeAdimId);
    } else {
      notify("warning", "Lütfen Proje Adım Alanını Doldurunuz");
    }
  });

  var goruntuleMi = false;
  $("body").on("click", ".row-goruntule", function () {
    goruntuleMi = "";
    var id = $(this).closest("tr").data("id");

    IsEmriKriterleme(id, goruntuleMi);
    $(".divPlanlananlar").find(".panel-body").css({
      display: "block",
    });
  });
  $("body").on("click", ".row-save", function () {
    count++;
    var id = $(this).closest("tr").data("id");
    var addedRow = $(this).closest("tr");
    var tsMaddesi = addedRow.data("value");
    var modalBody = $("#modalProjePlanlama .modal-body"),
      selectedRecords = modalBody.find(".tblSelected");
    bodyRecords = modalBody.find(".hizli-ekle-records");
    var tbody = selectedRecords.find("tbody");
    var tbodyRecords = bodyRecords.find("tbody");
    var cloneRow = addedRow.clone();
    cloneRow.find(".siraNo").remove();
    // tbody.append(String.format('<tr data-id="{0}"><td><div>{1}</div></td><td><input class="selectProjeAdimi" type="select" /></td><td><input class="selectProjeAltAdimi" type="select" /></td><td><input class="konu form-control" type="text" /></td><td><input class="terminTarihi form-control" type="text" /></td><td><input class=" planlanmaTarihi form-control" type="text" /></td><td><input class="form-control tamamlanmaTarihi" type="text" /></td><td><input class="form-control durum" type="text" /></td><td><input class="form-control aciklama" type="text" /></td><td><button class="btn btn-sm btn-danger row-sil" style="" ><i class="fa fa-minus"></i></button></td></tr>', id, tsMaddesi));
    tbody.append(cloneRow);
    tbody.find(".row-ekle").hide();
    tbody.find(".row-save").hide();
    tbody.find(".btnIsEmriKapat").hide();
    tbody.find(".row-sil").show();
    tbody.find(".row-talep-ekle").show();
    tbodyRecords.find("#selectProjeAdimi_" + id).select2("enable", false);
    $(".selected-records").find(".panel-body").css({
      display: "block",
    });
  });
  $("body").on("click", ".row-sil", function () {
    var deletedRow = $(this).closest("tr");
    var id = $(this).closest("tr").data("id");

    var b = 0;
    var count = 0;

    goruntuleMi = true;
    IsEmriKriterleme(id, goruntuleMi, deletedRow);
  });
  $("body").on("click", ".row-talep-goruntule", function () {
    goruntuleMi = "";
    var id = $(this).closest("tr").data("id");

    TalepHizmetLrOkuma(id);
    $(".divTalepPlanlananlar").find(".panel-body").css({
      display: "block",
    });
  });
  $("body").on("click", ".row-talep-ekle", function () {
    var id = $(this).closest("tr").data("id");
    var addedRow = $(this).closest("tr");
    var isEmri = addedRow.find(".konu").val();
    if (isEmri == undefined) {
      id = $(this).closest("tr").data("id");
      isEmri = addedRow.find(".bagliOlduguIsEmri")[0].innerText;
    } else {
      id = addedRow.find(".konu").val();
    }
    var projeAdim = addedRow.find(".selectProjeAdimi").select2("data");
    var projeAdimId = "";
    if (!String.isNullOrWhiteSpace(projeAdim)) {
      projeAdimId = projeAdim.id;
      projeAdim = projeAdim.text;
      ModalTalepCreate(isEmri, id);
    } else {
      notify("warning", "Lütfen Proje Adım Alanını Doldurunuz");
    }
  });
  $("body").on("click", ".row-talep-save", function () {
    countTalep++;
    var id = $(this).closest("tr").data("id");
    var addedRow = $(this).closest("tr");
    var isEmri = addedRow.find(".isEmri");
    var modalBody = $("#modalProjePlanlama .modal-body"),
      selectedTalepRecords = modalBody.find(".divTalepHizmet");
    var tbody = selectedTalepRecords.find("tbody");
    var cloneRow = addedRow.clone();
    // tbody.append(String.format('<tr data-id="{0}"><td><div>{1}</div></td><td><input class="selectProjeAdimi" type="select" /></td><td><input class="selectProjeAltAdimi" type="select" /></td><td><input class="konu form-control" type="text" /></td><td><input class="terminTarihi form-control" type="text" /></td><td><input class=" planlanmaTarihi form-control" type="text" /></td><td><input class="form-control tamamlanmaTarihi" type="text" /></td><td><input class="form-control durum" type="text" /></td><td><input class="form-control aciklama" type="text" /></td><td><button class="btn btn-sm btn-danger row-sil" style="" ><i class="fa fa-minus"></i></button></td></tr>', id, tsMaddesi));
    tbody.append(cloneRow);
    tbody.find(".row-talep-ekle").hide();
    tbody.find(".row-talep-save").hide();
    tbody.find(".btnTalepKapat").hide();
    tbody.find(".row-talep-sil").show();
    tbody.find(".row-talep-goruntule").show();
    $(".divTalepHizmet").find(".panel-body").css({
      display: "block",
    });
  });
  $("body").on("click", ".row-talep-sil", function () {
    var deletedRow = $(this).closest("tr");
    var id = $(this).closest("tr").find("isEmri");
    deletedRow.remove();
    //goruntuleMi = true;
    //TalepHizmetLrOkuma(id, goruntuleMi, deletedRow);
  });
  var isEmirleriList = [];
  var a = 0;
  // $("body").on("click",
  //     '#btnEkle',
  //     function(e) {
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
      "&lrId=04D8A068792944ACBBDC9B76AC6C3B0E&q=";
    var url2 =
      "http://localhost:44358/api/data/LrOkuma?recordId=" +
      $("#RecordPublicId").val() +
      "&lrId=04D8A068792944ACBBDC9B76AC6C3B0E&q=";

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
            var projeAdim = v.Values.first(
              "FieldPublicId",
              "F0530E7B06C74870B03E17A8BA022C85"
            ).SelectedItemPublicIds;
            var projeAdimText = v.Values.first(
              "FieldPublicId",
              "F0530E7B06C74870B03E17A8BA022C85"
            ).Value;
            var aciklamaNot = v.Values.first(
              "FieldPublicId",
              "4180B6F6432B492FA554AD0F9F3204A8"
            ).Value;
            tbody.append(
              String.format(
                "<tr style='background-color:white' data-id='{0}'><td><div class='siraNo' >{1}</div></td><td><div class='tsMaddesi' >{2}</div></td><td><input id='selectProjeAdimi_{0}' class='selectProjeAdimi' type='select' /></td><td><div>{3}</div></td><td><a class='btn btn-sm btn-primary row-goruntule' style='height:40px;' title='Planlanmış İş Emirleri'><i class='fas fa-external-link-alt'></i></a><a class='btn btn-sm btn-success row-ekle' style='height:40px;' ><i class='fa fa-plus' title='Yeni İş Emri'></i></a></td></tr>",
                v.PublicId,
                siraNo,
                maddeAciklamasi,
                aciklamaNot
              )
            );
            //goruntuleMi = false;
            prepareSelect2(
              "#selectProjeAdimi_" + v.PublicId,
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
            if (!String.isNullOrWhiteSpace(projeAdim)) {
              $("#selectProjeAdimi_" + v.PublicId).select2("data", {
                id: projeAdim,
                text: projeAdimText,
              });
              $("#selectProjeAdimi_" + v.PublicId).select2("enable", false);
            } else {
              $("#selectProjeAdimi_" + v.PublicId).select2("enable", true);
            }

            //IsEmriKriterleme(v.PublicId, goruntuleMi);
          });
        }
      }
    });
  }

  function TalepHizmetLrOkuma(id) {
    var modal = $("#modalProjePlanlama"),
      modalBody = modal.find(".modal-body");
    divAnalizler = modalBody.find(".divTalepPlanlananlar");
    tbody = divAnalizler.find("tbody");
    var url =
      "https://farmakodwebapi.setcrm.com/api/data/LrOkuma?recordId=" +
      $("#RecordPublicId").val() +
      "&lrId=28070330DE1E4AB488AE276FF191A207&q=";
    var url2 =
      "http://localhost:44358/api/data/LrOkuma?recordId=" +
      $("#RecordPublicId").val() +
      "&lrId=28070330DE1E4AB488AE276FF191A207&q=";

    $.get(url, function (r) {
      if (r.IsOk === true) {
        if (r.Records.length > 0) {
          $.each(r.Records, function (i, v) {
            var bagliOlduguIsEmriId = v.Values.first(
              "FieldPublicId",
              "F6A47897F4E6419CAC5B644A6BFDFF84"
            ).SelectedItemPublicIds;
            if (bagliOlduguIsEmriId == id) {
              var bagliOlduguIsEmri = v.Values.first(
                "FieldPublicId",
                "F6A47897F4E6419CAC5B644A6BFDFF84"
              ).Value;
              var urunHizmetAdi = v.Values.first(
                "FieldPublicId",
                "F9B57BCBE0CF4BAAA31A32DC76E7C83F"
              ).Value;
              var miktar = v.Values.first(
                "FieldPublicId",
                "774C7CDCD11447B59EFC27D8F05348DA"
              ).Value;
              var aciklama = v.Values.first(
                "FieldPublicId",
                "CF742F5D5E37449C90749CC2F67392B9"
              ).Value;
              var gorev = v.Values.first(
                "FieldPublicId",
                "8D4469E344C349BDBD5A034357E0505B"
              ).Value;
              tbody.append(
                String.format(
                  "<tr style='background-color:white' data-id='{0}'><td><div class='bagliOlduguIsEmri' >{1}</div></td><td><div class='urunHizmet' >{2}</div></td><td><div>{3}</div></td><td><div>{4}</div></td><td id='gorevChk_{0}' ></td></tr>",
                  v.PublicId,
                  bagliOlduguIsEmri,
                  urunHizmetAdi,
                  miktar,
                  aciklama
                )
              );
              $("gorevChk_" + v.PublicId).addClass("fa-check-square");
              if (gorev == "True" || gorev == "true") {
                $("#gorevChk_" + v.PublicId).append(
                  "<i class='far fa-check-square'></i>"
                );
              } else {
                $("#gorevChk_" + v.PublicId).append(
                  "<i class='far fa-square'></i>"
                );
              }
            }
          });
        }
      }
    });
  }

  function IsEmriKriterleme(id, goruntuleMi, deletedRow) {
    var a = 0;
    var deger = "";
    var modal = $("#modalProjePlanlama"),
      modalBody = modal.find(".modal-body");
    var divPlan = modalBody.find(".divPlanlananlar");

    var localUrl =
      "https://localhost:44348/api/data/IsEmriVfKriterleme?tsMaddesi=" + id;
    var realUrl =
      "https://farmakodwebapi.setcrm.com/api/data/IsEmriVfKriterleme?tsMaddesi=" +
      id;
    $.get(realUrl, function (r) {
      var tbody = divPlan.find("tbody");
      if (r.Status === true) {
        if (r.list.Items.length > 0) {
          if (goruntuleMi == "") {
            deger = true;
            tbody.html("");

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
                  "<tr style='background-color:white' data-id='{0}'><td class='bagliOlduguIsEmri'><div>{1}</div></td><td><div>{2}</div></td><td><div>{3}</div></td><td><div>{4}</div></td><td><div>{5}</div></td><td><a class='btn btn-sm btn-primary row-talep-goruntule' style='height:40px;' title='Planlanmış Talepler'><i class='fas fa-external-link-alt'></i></a><a class='btn btn-sm btn-success row-talep-ekle' style='height:40px;' title='Yeni Talep'><i class='fas fa-plus'></i></a></td></tr>",
                  v.PublicId,
                  teknikSartname,
                  projeAdim,
                  projeAltAdim,
                  isEmriKonusu,
                  aciklama
                )
              );
            });
          } else {
            var modalBody = $("#modalProjePlanlama .modal-body"),
              bodyRecords = modalBody.find(".hizli-ekle-records");
            var tbody = bodyRecords.find("tbody");
            tbody.find("#selectProjeAdimi_" + id).select2("enable", false);
            deletedRow.remove();
          }
        }
      } else {
        if (goruntuleMi == "") {
          tbody.html("");
          notify("warning", "Bu adıma bağlı iş emri bulunamadı");
        } else {
          var modalBody = $("#modalProjePlanlama .modal-body"),
            selectedRecords = modalBody.find(".selected-records");
          $.each(selectedRecords.find("tbody tr"), function (i, v) {
            if ($(v).data("id") == id) {
              a++;
            }
          });
          var modalBody = $("#modalProjePlanlama .modal-body"),
            bodyRecords = modalBody.find(".hizli-ekle-records");
          var tbody = bodyRecords.find("tbody");
          if (a == 1) {
            tbody.find("#selectProjeAdimi_" + id).select2("enable", true);
          }
          deletedRow.remove();
        }

        // setUtil.alert({
        //     container: '#modalProjePlanlama .modal-body #msg',
        //     message: "Bu adıma bağlı iş emri bulunamadı",
        //     alertClass: 'alert-warning',
        //     autoClose: true
        // });
        deger = false;
      }

      return deger;
    });
  }

  function ModalCreate(tsMaddesi, id, siraNo, projeAdim, projeAdimId) {
    $("#modalEdit").remove();
    window.setModal.Create({
      id: "modalEdit",
      html: {
        header: "Yeni İş Emri",
        body:
          '<div id="sonucMsg"></div>' +
          String.format(
            '<table class="table table-bordered table-hover" ><thead style="background-color:#58cbb4;"><th style="text-align: center; vertical-align:middle;width:5%" >Sıra Numarası</th><th>Bağlı Olduğu Teknik Şartname</th><th>Proje Adımı</th><th>Proje Alt Adımı</th><th>Konu</th><th>Açıklama</th><th></th></thead><tbody><tr data-id="{0}" data-value="{1}" data-count="{2}"><td class="siraNo"><div>{3}</div></td><td><div>{1}</div></td><td><input id="selectProjeAdimi_{2}" class="selectProjeAdimi" type="select" /></td><td><input id="selectProjeAltAdimi_{2}" class="selectProjeAltAdimi" type="select" /></td><td><input class="konu form-control" type="text" /></td><td><input class="form-control aciklama" type="text" /></td><td style="text-align: center; vertical-align:middle;width:8%"><button class="btn btn-sm btn-danger row-sil" style="display:none;" ><i class="fa fa-minus"></i></button><a class="btn btn-sm btn-success row-talep-ekle" title="Yeni Talep" style="display:none;" ><i class="fa fa-plus"></i></a><a id="btnIsEmriKaydet" type="button" data-dismiss="modal" class="btn btn-sm btn-success row-save" title="Kaydet"><i class="fas fa-save"></i></a>' +
              '<a id="btnIsEmriKapat" title="Kapat" class="btn btn-danger btn-sm btnIsEmriKapat" data-dismiss="modal"><i class="far fa-times-circle"></i></a></td></tr></tbody></table>',
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
    $("#selectProjeAdimi_" + count).select2("data", {
      id: projeAdimId,
      text: projeAdim,
    });

    $("#selectProjeAdimi_" + count).select2("enable", false);
    // $('.selectProjeAdimi').trigger("change");
    prepareSelect2(
      "#selectProjeAltAdimi_" + count,
      "/Summary/LookupFieldValues",
      {
        coId: "48AB9369AAAB46169D7CCB7A13E8C08F",
        id: "91DC47974A134127860A3AE3F83865B6",
        viewFilterId: "D5246B6B13914083AEEAA5E701D8417A",
        controllingRecordId: $("#selectProjeAdimi_" + count).val(),
        controllingId: "D5182E4C3F084936929861E534028D6F",
        groupIds: $("#selectProjeAdimi_" + count).val(),
        itemId: "91DC47974A134127860A3AE3F83865B6",
      },
      null,
      false
    );
    $(".selectProjeAltAdimi").select2("enable", true);
  }

  function ModalTalepCreate(isEmri, id) {
    $("#modalTalepEdit").remove();
    window.setModal.Create({
      id: "modalTalepEdit",
      html: {
        header: "Yeni Talep Edilecek Ürün/Hizmet",
        body:
          '<div id="sonucMsg"></div>' +
          '<table class="tblUrunEkle" style="width: 30%;font-size:12px;">' +
          "<thead>" +
          "<th>Yeni Ürün</th><th></th>" +
          "</thead>" +
          "<tbody>" +
          "<tr>" +
          "<td>" +
          '<input class="txtUrunHizmet" id="txtUrunHizmet" type="text" style="margin-right:10px;font-size:17px;width: 90%;border-radius: 3px;border: 1px solid;height: 38px;"></td>' +
          "<td>" +
          '<a class="btn btn-sm btn-success new-urun" style="height:40px;" ><i class="fa fa-plus" title="Yeni Ekle"></i></a></td>' +
          "</tr>" +
          "</tbody>" +
          "</table>" +
          String.format(
            '<table class="table table-bordered table-hover" ><thead style="background-color:#58cbb4;"><th style="text-align: center; vertical-align:middle;width:2%">Bağlı Olduğu İş Emri</th><th style="text-align: center; vertical-align:middle;width:20%">Ürün/Hizmet Adı</th><th style="text-align: center; vertical-align:middle;width:10%">Miktar</th><th style="text-align: center; vertical-align:middle;width:10%">Birim</th><th style="text-align: center; vertical-align:middle;width:10%">Açıklama</th><th style="text-align: center; vertical-align:middle;width:5%">Görev</th><th style="text-align: center; vertical-align:middle;width:10%">Doküman</th><th style="width:5%"></th></thead><tbody><tr data-id="{0}" data-value="{1}" data-counttalep="{2}"><td><div>{1}</div></td><td><input id="selectUrunAdi_{2}" class="selectUrunAdi" type="select" /></td><td><input class="miktar form-control" type="number" /></td><td><input id="selectBirim_{2}" class="selectBirim" type="select" /></td><td><input class="form-control aciklama" type="text" /></td><td><input id="filtreCheck" type="checkbox" class="chk-gorev"></td><td><input id="newTalepFile" type="file"style="width:150px;"></td><td style="text-align: center; vertical-align:middle;width:8%"><button class="btn btn-sm btn-danger row-talep-sil" style="display:none;" ><i class="fa fa-minus"></i></button><a id="btnTalepUrunuKaydet" type="button" data-dismiss="modal" class="btn btn-sm btn-success row-talep-save" title="Kaydet"><i class="fas fa-save"></i></a>' +
              '<a id="btnTalepKapat" title="Kapat" class="btn btn-danger btn-sm btnTalepKapat" data-dismiss="modal"><i class="far fa-times-circle"></i></a></td></tr></tbody></table>',
            id,
            isEmri,
            countTalep
          ),
        footer: "",
      },
    });
    $("#modalTalepEdit").modal({
      backdrop: "static",
      keyboard: false,
    });
    $("#modalTalepEdit .modal-dialog").css({
      width: "80%",
      margin: "200px 0 0 150px ",
    });
    prepareSelect2(
      "#selectUrunAdi_" + countTalep,
      "/Summary/LookupFieldValues",
      {
        coId: "6F597CCD82F84A6DB07826B170668DE8",
        id: "F9B57BCBE0CF4BAAA31A32DC76E7C83F",
        viewFilterId: "3109EE3FF7C24B51A50C760243F056A1",
      },
      null,
      false
    );

    prepareSelect2(
      "#selectBirim_" + countTalep,
      "/Summary/LookupFieldValues",
      {
        coId: "6F597CCD82F84A6DB07826B170668DE8",
        id: "1EE3B6A6F400432B9909968C400614A6",
        viewFilterId: "E874DCFE76934CA982E48868DC972B1F",
      },
      null,
      false
    );
  }
  $("body").on("click", ".new-urun", function (e) {
    var urunHizmet = $(this).closest("tr").find("#txtUrunHizmet").val();
    if (!String.isNullOrWhiteSpace(urunHizmet)) {
      var localUrl = String.format(
        "https://localhost:44348/api/data/UrunHizmetEkle?urun=" + urunHizmet
      );
      var realUrl = String.format(
        "https://farmakodwebapi.setcrm.com/api/data/UrunHizmetEkle?urun=" +
          urunHizmet
      );
      $.post(realUrl, function (r) {
        if (r.Status) {
          notify("success", "Ürün Başarıyla Eklendi");
          prepareSelect2(
            ".selectBirim" + countTalep,
            "/Summary/LookupFieldValues",
            {
              coId: "6F597CCD82F84A6DB07826B170668DE8",
              id: "1EE3B6A6F400432B9909968C400614A6",
              viewFilterId: "E874DCFE76934CA982E48868DC972B1F",
            },
            null,
            false
          );
        } else {
          notify("danger", "Ürün Eklenemedi");
        }
      });
    } else {
      notify("warning", "Lütfen Eklemeden Önce Ürün Alanını Doldurunuz");
    }
  });
  $("body")
    .off("click", "#btnProjePlanKaydet")
    .on("click", "#btnProjePlanKaydet", function () {
      var isEmriList = [];
      var plananTalepEdilecekUrunler = [];
      var modalBody = $("#modalProjePlanlama .modal-body"),
        selectedRecords = modalBody.find(".selected-records");
      var selectedUrunCount = $(".divTalepHizmet").find("tbody tr").length;

      var tbody = selectedRecords.find("tbody");
      var trList = tbody.find("tr");
      if (trList.length > 0 || selectedUrunCount > 0) {
        modalBody.find("#modalProjePlanlamaLoadingBar1").show();
        $("#btnKapat").prop("disabled", true);
        $("#btnProjePlanKaydet").prop("disabled", true);

        trList.each(function (i, v) {
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
            TalepEdilecekUrunler: [],
          };
          var modalBody = $("#modalProjePlanlama .modal-body"),
            selectedRecords = modalBody.find(".divTalepHizmet");
          var tbody = selectedRecords.find("tbody");
          var trList = tbody.find("tr");
          if (trList.length > 0) {
            trList.each(function (i, v) {
              var docId = "";
              var countTalep = $(v).data("counttalep");
              var isEmri = $(v).data("id");
              var value = $(v).data("value");
              var urunAdi = $(v)
                .find("#selectUrunAdi_" + countTalep)
                .val();
              var miktar = $(v).find(".miktar").val();
              var birim = $(v)
                .find("#selectBirim_" + countTalep)
                .val();
              var aciklama = $(v).find(".aciklama").val();
              var gorev = $(v).find(".chk-gorev").is(":checked");
              var dosya = $(v).find("#newTalepFile");
              if (dosya != null) {
                var files = dosya[0].files;
                if (files != null || files != undefined) {
                  if (files.length > 0) {
                    var list = new Array();
                    for (let index = 0; index < files.length; index++) {
                      const file = files[index];
                      var formData = new FormData();
                      formData.append("id", "C3D27922D43D4D13B39562C3E6F0348A");
                      formData.append(
                        "fieldId",
                        "BE508B4B3FEF4794800E4709646A29C1"
                      );
                      formData.append("files[]", file, file.name);
                      var ajax = new XMLHttpRequest();
                      ajax.open("POST", "/Document/Upload", false);
                      ajax.onloadend = function () {
                        if (ajax.status == 200) {
                          var result = JSON.parse(ajax.response).Result;
                          docId = result.DocumentId;
                          list.push(docId);
                        }
                      };
                      ajax.send(formData);
                    }
                  }
                }
              }
              if (isEmri == value && value == konu) {
                var model2 = {
                  BagliOlduguIsEmri: "",
                  UrunHizmetAdi: urunAdi,
                  Miktar: miktar,
                  Birim: birim,
                  Aciklama: aciklama,
                  Gorev: gorev,
                  Dosya: docId,
                };
                model.TalepEdilecekUrunler.push(model2);
              }
              if (isEmri != value) {
                var model2 = {
                  BagliOlduguIsEmri: isEmri,
                  UrunHizmetAdi: urunAdi,
                  Miktar: miktar,
                  Birim: birim,
                  Aciklama: aciklama,
                  Gorev: gorev,
                  Dosya: docId,
                };
                plananTalepEdilecekUrunler.push(model2);
              }
            });
          }

          isEmriList.push(model);
        });
        // var modalBody = $('#modalProjePlanlama .modal-body'),
        //     selectedRecords = modalBody.find('.divTalepHizmet');
        // var tbody = selectedRecords.find('tbody');
        // var trList = tbody.find('tr');
        // if (trList.length > 0) {
        //     trList.each(function(i, v) {
        //         cont = 0;
        //         var isEmri = $(v).data('id');
        //         var value = $(v).data('value');
        //         var urunAdi = $(v).find('#selectUrunAdi_' + count).val();
        //         var miktar = $(v).find('.miktar').val();
        //         var aciklama = $(v).find('.aciklama').val();
        //         var gorev = $(v).find('.chk-gorev').is(":checked");
        //         if (isEmri != value) {
        //             var model2 = {
        //                 BagliOlduguIsEmri: isEmri,
        //                 UrunHizmetAdi: urunAdi,
        //                 Miktar: miktar,
        //                 Aciklama: aciklama,
        //                 Gorev: gorev
        //             }
        //             plananTalepEdilecekUrunler.push(model2);
        //         }
        //     });
        // }
        var model = {
          IsEmirleri: isEmriList,
          RecordId: $("#RecordPublicId").val(),
          User: userData.id,
          PlanlanmisIsEmriTalepEdilecekUrunler: plananTalepEdilecekUrunler,
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
      } else if (selectedUrunCount < 1 && trList.length < 1) {
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
