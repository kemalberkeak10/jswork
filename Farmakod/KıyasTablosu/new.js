$(function () {
  $(".btn-br-actions[data-publicid=969042CF0BB049CDB84A6332AED29E55]").hide();
  $(".btn-br-actions[data-publicid=969042CF0BB049CDB84A6332AED29E55]")
    .closest("td")
    .prepend(
      '<a id="btnKiyasTablosu" class="btn btn-sm btn-warning"  style="margin-right:10px;" >Kıyas Tablosu</a>'
    );
  var groupCount = 0;
  $("body").on("click", "#btnKiyasTablosu", function () {
    $("#modalKiyasTablosu").remove();
    window.setModal.Create({
      id: "modalKiyasTablosu",
      html: {
        header: "Kıyas Tablosu",
        body:
          '<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>' +
          '<div id="msg" style="margin:0 0 5px; width: 100%;"></div>' +
          '<div class="row" style="display:flex;"><table id="tblIsEmri" style="display:none;width: 30%;width: 30%;margin-right:10px;"><thead><th>İş Emri</th></thead><tbody><tr><td><input id="selectIsEmri" class="form-control selects"></td></tr></tbody></table>' +
          '<table id="tblMarkaModel" class="table table-bordered" style="display:none;width: 50%;"><thead style="background-color:white"><th>Ürün/Hizmet</th><th>Marka</th><th>Model</th><th></th></thead><tbody><tr><td><input id="selectStokKarti" class="form-control"></td><td><input id="txtMarka" class="form-control" type="text"></td><td><input id="txtModel" class="form-control" type="text"></td><td><button class="btn btn-sm btn-success newModel"><i class="fa fa-plus" ></i></td></tr></tbody></table>' +
          "</div>" +
          "<hr>" +
          String.format(
            '<div class="divIsEmirleri" style="width:100%;"><div class="hizli-ekle-records" style="width: 100%;overflow-y: auto;height: 300px;"><h4 style="margin-top:0">İş Emirleri</h4></div><div class="selected-records" style="width: 100%;"><h4 style="margin-top:0">Oluşturulan Satın Alma Talebi</h4></div></div>'
          ) +
          String.format(
            '<div class="divTalepUrunleri" style="width:100%"><div class="hizli-ekle-talep-urunleri" style="width: 100%;"><h3 style="margin-top:5px;font-size:17px;">Talep Ürünleri</h3></div><div class="selected-talep-urunleri" style="width: 100%;"><h4 style="margin-top:0">Eklenen Talep Ürünleri</h4></div></div>'
          ) +
          '<div id="DivKiyasTabloHtml" style="width: 100%;">',
        footer:
          '<button id="btn-ileri-satin-alma-talep" type="button" class="btn btn-sm btn-success " >İleri</button><button id="btnGeri" type="button" class="btn btn-sm btn-warning " style="display:none;" >Geri</button><button id="btn-create-talep-form" type="button" class="btn btn-sm btn-success " style="display:none;" >Kaydet</button>' +
          '<button class="btn btn-primary btn-sm btn-print" ><i class="fa fa-print" aria-hidden="true"></i> Yazdır</button>',
      },
      settings: {
        widthClass: "modal-full-width",
      },
    });
    $(".divTalepUrunleri").hide();
    var modalBody = $("#modalKiyasTablosu .modal-body"),
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
    $("#modalKiyasTablosu")
      .find(".modal-header button:first")
      .attr("onclick", "window.location.reload()");
    $("#modalKiyasTablosu").modal({
      backdrop: "static",
      keyboard: false,
    });

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

    $(".modal-header").addClass("text-center");
    $("#modalKiyasTablosu").modal({
      backdrop: false,
    });
    $(".modalKiyasTablosu").css("padding", "0px!important");
    $("#txt").show();
    // createTables();
  });

  $("body").on("click", ".btn-print", function () {
    printWindow = window.open("");

    var style = `<style type="text/css" media="print">
    
    @page {
    size: A4 landscape;
    margin:10px;
    max-height:99%; max-width:85%
    }
    @media print {
    body {
    zoom: 92%;
    }
    }
    
    </style>`;
    $(printWindow.document.body).append(style);

    for (let index = 0; index <= groupCount; index++) {
      html2canvas(
        document.querySelector(
          "#modalKiyasTablosu .modal-body #DivKiyasTabloHtml .group_" + index
        ),
        {
          allowTaint: true,
          useCORS: true,
          logging: true,
          width: 9000,
        }
      ).then(function (canvas) {
        var dataURL = canvas.toDataURL();

        $(printWindow.document.body).append(
          "<img id='Image_" +
            index +
            "'+ src=" +
            dataURL +
            "></img>" +
            "<p style='page-break-after:always;'></p>"
        );
      });
    }
    setTimeout(() => {
      $(printWindow.document).ready(function () {
        printWindow.focus();
        printWindow.print();
      });
    }, 2000);
  });

  function createTables() {
    var localUrl =
      "https://localhost:44348/api/data/GetTeklifKiyasTableInfos?recordId=" +
      $("#RecordPublicId").val();

    var realUrl =
      "https://farmakodwebapi.setcrm.com/api/data/GetTeklifKiyasTableInfos?recordId=" +
      $("#RecordPublicId").val();
    $.get(realUrl, function (r) {
      if (r.Status) {
        var groupDiv = $("<div class='group_0'> </div>");

        var headerPage = 0;
        groupCount = 0;
        if (r.KiyasTableResponse.TalepUrunleriList.length > 0) {
          //header olusturulması
          var headerRow = $('<div  class="row" style="margin:0px!important;">');
          var emptyHeader = $("<h5 style='color:white;'> Tedarikçiler ></h5>");
          var headerColumn = $(
            '<div class="col-md-3 " style="padding:0px!important;border-right:1px solid" >'
          );
          headerColumn.append(emptyHeader);
          headerRow.append(headerColumn);
          $.each(r.KiyasTableResponse.TedarikciList, function (i, v) {
            if (i % 3 == 0 && i != 0) {
              headerPage++;
              groupCount += 1;
              groupDiv = $("<div> </div>").addClass("group_" + groupCount);
              var breakLine = $("</br>");
              groupDiv.append(breakLine);
              headerRow = $('<div  class="row" style="margin:0px!important;">');
              var emptyHeader = $(
                "<h5 style='color:white;'> Tedarikçiler ></h5>"
              );
              var headerColumnEmpty = $(
                '<div class="col-md-3 " style="padding:0px!important;border-right:1px solid" >'
              );
              headerColumnEmpty.append(emptyHeader);
              headerRow.append(headerColumnEmpty);
            }
            var headerColumn = $(
              '<div class="col-md-3" style="padding:0px!important;border:1px solid">'
            ).addClass("headerPage_" + headerPage);
            var header = $("<h5 class='text-center' />").text(v);
            headerColumn.append(header);
            headerRow.append(headerColumn);
            if (
              i % 3 == 2 ||
              r.KiyasTableResponse.TedarikciList.length - 1 == i
            ) {
              groupDiv.append(headerRow);
              $("#DivKiyasTabloHtml").append(groupDiv);
            }
          });
          for (let index = 0; index <= groupCount; index++) {
            var newEmptyRow = $(
              '<div  class="row"  style="margin:0px!important">'
            ).addClass("groupRow_" + index);
            $(".group_" + index).append(newEmptyRow);
          }
          var talepUrunTablecolumn = $(
            '<div class="col-md-3 talepUrunColumn" style="padding:0px!important">'
          );
          var talepUrunTable = $(
            '<table  style="width:100%;background: lightgrey;">'
          ).addClass("talepUrunTable");
          var thead = talepUrunTable.append("<thead/>");
          var newRow = $('<tr class="table table-bordered table-hover"/>');
          newRow.append(
            $('<th style="text-align: center;" class="col-md-1"/>').text(
              "Ürün Adı"
            )
          );
          newRow.append(
            $('<th style="text-align: center;" class="col-md-1"/>').text(
              "Miktar"
            )
          );
          newRow.append(
            $('<th style="text-align: center;" class="col-md-1"/>').text(
              "Birim"
            )
          );
          thead.append(newRow);
          talepUrunTable.append(thead);
          var tbody = $("<tbody />");
          $.each(r.KiyasTableResponse.TalepUrunleriList, function (i, v) {
            var newRow = $('<tr class="table table-bordered table-hover"/>')
              .attr("data-recordId", v.UrunRecordId)
              .attr("data-index", v.Index);
            newRow.append(
              $(
                '<td style="text-align: center;" class="col-md-8 urunAdi"/>'
              ).text(v.UrunAdi)
            );
            if (!String.isNullOrWhiteSpace(v.Miktar)) {
              newRow.append(
                $(
                  '<td rowspan="1" style="text-align: center;" class="col-md-2 miktar"/>'
                ).text(v.Miktar)
              );
            } else {
              newRow.append(
                $(
                  '<td rowspan="1" style="text-align: center;" class="col-md-2 miktar"/>'
                ).text(v.Miktar)
              );
            }

            newRow.append(
              $(
                '<td style="text-align: center;" class="col-md-2 birim"/>'
              ).text(v.Birim)
            );

            tbody.append(newRow);
            talepUrunTable.append(tbody);
            talepUrunTablecolumn.append(talepUrunTable);
          });

          var subRow = $('<tr class="table table-bordered table-hover"/>');
          subRow.append(
            $('<td colspan="3" style="text-align: right;" />').text(
              "TOPLAM FİYAT "
            )
          );
          tbody.append(subRow);

          subRow = $('<tr class="table table-bordered table-hover"/>');
          subRow.append(
            $('<td colspan="3" style="text-align: right;" />').text("İSKONTO ")
          );
          tbody.append(subRow);

          var subRow = $('<tr class="table table-bordered table-hover"/>');
          subRow.append(
            $('<td colspan="3" style="text-align: right;width:100%" />').text(
              "GENEL TOPLAM "
            )
          );
          tbody.append(subRow);

          subRow = $(
            '<tr  class="table table-bordered table-hover odemeSartlari"/>'
          );
          subRow.append(
            $('<td  colspan="3" style="text-align: right;" />').text(
              "ÖDEME ŞARTLARI "
            )
          );
          tbody.append(subRow);
          subRow = $(
            '<tr class="table table-bordered table-hover text-right"/>'
          );
          subRow.append(
            $('<td colspan="3" style="text-align: right;" />').text(
              "TESLİM YERİ "
            )
          );
          tbody.append(subRow);

          subRow = $(
            '<tr class="table table-bordered table-hover text-right"/>'
          );
          subRow.append(
            $('<td colspan="3" style="text-align: right;" />').text(
              "FARMAKOD AÇIKLAMASI"
            )
          );
          tbody.append(subRow);

          subRow = $(
            '<tr class="table table-bordered table-hover text-right"/>'
          );
          subRow.append(
            $('<td colspan="3" style="text-align: right;" />').text(
              "TEDARİKÇİ AÇIKLAMASI"
            )
          );
          tbody.append(subRow);
          subRow = $(
            '<tr class="table table-bordered table-hover text-right"/>'
          );
          subRow.append(
            $('<td colspan="3" style="text-align: right;" />').text(
              "OPSİYON TARİHİ"
            )
          );
          tbody.append(subRow);

          talepUrunTable.append(tbody);
          talepUrunTablecolumn.append(talepUrunTable);
        }
        for (let index = 0; index <= groupCount; index++) {
          let clonetalepUrunTableCol = talepUrunTablecolumn;
          clonetalepUrunTableCol.addClass("table_" + index);
          $(clonetalepUrunTableCol)
            .clone()
            .appendTo(".groupRow_" + index);
        }
        var page = 0;
        if (r.KiyasTableResponse.TedarikciList.length > 0) {
          $.each(r.KiyasTableResponse.TedarikciList, function (i, v) {
            if (i % 3 == 0 && i != 0) {
              page++;
              maxPage = page;
            }
            var column = $(
              '<div class="col-md-3" style="padding:0px!important"> '
            ).addClass("page_" + page);
            var tedarikciTable = $("<table style='width:100%';>")
              .addClass("tedarikci_" + v.replace(" ", "_").turkishtoEnglish())
              .addClass("page_" + page);

            var thead = tedarikciTable.append("<thead/>");
            var newRow = $('<tr class="table table-bordered table-hover" />');
            newRow.append(
              $('<th style="text-align: center;" class="col-md-1"/>').text(
                "Birim Fiyat"
              )
            );
            newRow.append(
              $('<th style="text-align: center;" class="col-md-1"/>').text(
                "Toplam Fiyat"
              )
            );
            newRow.append(
              $('<th style="text-align: center;" class="col-md-1"/>').text(
                "Teslimat Tarihi"
              )
            );
            thead.append(newRow);
            tedarikciTable.append(thead);
            var tbody = $("<tbody />");
            for (
              let index = 0;
              index < r.KiyasTableResponse.RowCount;
              index++
            ) {
              var newRow = $(
                '<tr class="table table-bordered table-hover"/>'
              ).attr("data-index", v.index);
              newRow.append(
                $(
                  '<td style="text-align: center;" class="col-md-3" style="padding:0px!important;"/>'
                )
                  .addClass(
                    "tedarikci_" +
                      v.replace(" ", "_").turkishtoEnglish() +
                      "_birimFiyat_" +
                      index
                  )
                  .text("-")
              );
              newRow.append(
                $(
                  '<td style="text-align: center;" class="col-md-3" style="padding:0px!important;"/>'
                )
                  .addClass(
                    "tedarikci_" +
                      v.replace(" ", "_").turkishtoEnglish() +
                      "_toplamFiyat_" +
                      index
                  )
                  .text("-")
              );
              newRow.append(
                $(
                  '<td style="text-align: center;" class="col-md-3" style="padding:0px!important;"/>'
                )
                  .addClass(
                    "tedarikci_" +
                      v.replace(" ", "_").turkishtoEnglish() +
                      "_teslimatTarihi_" +
                      index
                  )
                  .text("-")
              );
              tbody.append(newRow);
            }

            //alt tabloların olusturulması
            var subRow = $('<tr class="table table-bordered table-hover "/>');
            subRow.append(
              $('<td colspan="3" style="text-align: center;" />')
                .addClass(
                  "tedarikci_" +
                    v.replace(" ", "_").turkishtoEnglish() +
                    "_toplamFiyat"
                )
                .text("-")
            );
            tbody.append(subRow);

            subRow = $('<tr class="table table-bordered table-hover "/>');
            subRow.append(
              $('<td colspan="3" style="text-align: center;" />')
                .addClass(
                  "tedarikci_" +
                    v.replace(" ", "_").turkishtoEnglish() +
                    "_iskonto"
                )
                .text("-")
            );
            tbody.append(subRow);
            subRow = $(
              '<tr class="table table-bordered table-hover text-right"/>'
            );
            subRow.append(
              $('<td colspan="3" style="text-align: center;" />')
                .addClass(
                  "tedarikci_" +
                    v.replace(" ", "_").turkishtoEnglish() +
                    "_genelToplam"
                )
                .text("-")
            );
            tbody.append(subRow);
            subRow = $(
              '<tr  class="table table-bordered table-hover text-right odemeSartlari"/>'
            );
            subRow.append(
              $('<td colspan="3" style="text-align: center;" />')
                .addClass(
                  "tedarikci_" +
                    v.replace(" ", "_").turkishtoEnglish() +
                    "_odemeSartlari"
                )
                .text("-")
            );
            tbody.append(subRow);

            subRow = $(
              '<tr class="table table-bordered table-hover text-right"/>'
            );
            subRow.append(
              $('<td colspan="3" style="text-align: center;" />')
                .addClass(
                  "tedarikci_" +
                    v.replace(" ", "_").turkishtoEnglish() +
                    "_teslimYeri"
                )
                .text("-")
            );
            tbody.append(subRow);

            subRow = $(
              '<tr class="table table-bordered table-hover text-right"/>'
            );
            subRow.append(
              $('<td colspan="3" style="text-align: center;" />')
                .addClass(
                  "tedarikci_" +
                    v.replace(" ", "_").turkishtoEnglish() +
                    "_farmakodAciklamasi"
                )
                .text("-")
            );
            tbody.append(subRow);

            subRow = $(
              '<tr class="table table-bordered table-hover text-right"/>'
            );
            subRow.append(
              $('<td colspan="3" style="text-align: center;" />')
                .addClass(
                  "tedarikci_" +
                    v.replace(" ", "_").turkishtoEnglish() +
                    "_tedarikciAciklamasi"
                )
                .text("-")
            );
            tbody.append(subRow);

            subRow = $(
              '<tr class="table table-bordered table-hover text-right"/>'
            );
            subRow.append(
              $('<td colspan="3" style="text-align: center;" />')
                .addClass(
                  "tedarikci_" +
                    v.replace(" ", "_").turkishtoEnglish() +
                    "_opsiyonTarihi"
                )
                .text("-")
            );
            tbody.append(subRow);

            tedarikciTable.append(tbody);
            column.append(tedarikciTable);
            $(".groupRow_" + page).append(column);
          });
        }
        if (r.KiyasTableResponse.TeklifToplamaUrunleriList.length > 0) {
          $.each(
            r.KiyasTableResponse.TeklifToplamaUrunleriList,
            function (i, v) {
              if (!String.isNullOrWhiteSpace(v.BirimFiyat)) {
                if (v.IsUygun) {
                  $(
                    ".tedarikci_" +
                      v.TedarikciName.replace(" ", "_").turkishtoEnglish() +
                      "_birimFiyat_" +
                      v.Index
                  ).text("** " + v.BirimFiyat);
                  $(
                    ".tedarikci_" +
                      v.TedarikciName.replace(" ", "_").turkishtoEnglish() +
                      "_birimFiyat_" +
                      v.Index
                  ).css("font-weight", "bold");
                } else {
                  $(
                    ".tedarikci_" +
                      v.TedarikciName.replace(" ", "_").turkishtoEnglish() +
                      "_birimFiyat_" +
                      v.Index
                  ).text(v.BirimFiyat);
                }
              }
              if (!String.isNullOrWhiteSpace(v.ToplamFiyat)) {
                $(
                  ".tedarikci_" +
                    v.TedarikciName.replace(" ", "_").turkishtoEnglish() +
                    "_toplamFiyat_" +
                    v.Index
                ).text(v.ToplamFiyat);
              }

              $(
                ".tedarikci_" +
                  v.TedarikciName.replace(" ", "_").turkishtoEnglish() +
                  "_teslimatTarihi_" +
                  v.Index
              ).text(v.TeslimatTarihi);

              if (v.isMinimum) {
                $(
                  ".tedarikci_" +
                    v.TedarikciName.replace(" ", "_").turkishtoEnglish() +
                    "_birimFiyat_" +
                    v.Index
                ).css("background-color", "yellow");
                $(
                  ".tedarikci_" +
                    v.TedarikciName.replace(" ", "_").turkishtoEnglish() +
                    "_toplamFiyat_" +
                    v.Index
                ).css("background-color", "yellow");
              }
              if (v.isClosestDate) {
                $(
                  ".tedarikci_" +
                    v.TedarikciName.replace(" ", "_").turkishtoEnglish() +
                    "_teslimatTarihi_" +
                    v.Index
                ).css("background-color", "orange");
              }
            }
          );
        }

        if (r.KiyasTableResponse.TeklifToplamaList.length > 0) {
          $.each(r.KiyasTableResponse.TeklifToplamaList, function (i, v) {
            $(
              ".tedarikci_" +
                v.TedarikciName.replace(" ", "_").turkishtoEnglish() +
                "_toplamFiyat"
            ).text(checkEmpty(v.ToplamFiyat));
            $(
              ".tedarikci_" +
                v.TedarikciName.replace(" ", "_").turkishtoEnglish() +
                "_iskonto"
            ).text(checkEmpty(v.Iskonto));
            $(
              ".tedarikci_" +
                v.TedarikciName.replace(" ", "_").turkishtoEnglish() +
                "_genelToplam"
            ).text(checkEmpty(v.GenelToplam));
            $(
              ".tedarikci_" +
                v.TedarikciName.replace(" ", "_").turkishtoEnglish() +
                "_odemeSartlari"
            ).text(checkEmpty(v.OdemeSartlari));
            $(
              ".tedarikci_" +
                v.TedarikciName.replace(" ", "_").turkishtoEnglish() +
                "_teslimYeri"
            ).text(checkEmpty(v.TeslimYeri));
            $(
              ".tedarikci_" +
                v.TedarikciName.replace(" ", "_").turkishtoEnglish() +
                "_farmakodAciklamasi"
            ).text(checkEmpty(v.FarmakodAciklamasi));
            $(
              ".tedarikci_" +
                v.TedarikciName.replace(" ", "_").turkishtoEnglish() +
                "_tedarikciAciklamasi"
            ).text(checkEmpty(v.TedarikciAciklamasi));
            $(
              ".tedarikci_" +
                v.TedarikciName.replace(" ", "_").turkishtoEnglish() +
                "_opsiyonTarihi"
            ).text(checkEmpty(v.OpsiyonTarihi));
          });
        }

        $("#modalKiyasTablosu td").css("border", "1px solid#0d0d0d");
        $("#modalKiyasTablosu th").css("border", "1px solid#0d0d0d");
        $("tr").css("height", "50px");
        $(".odemeSartlari").css("height", "100px");
        $("body").css("font-size", "18px");
        $("h5").css("font-size", "18px");
        $("#txt").hide();
        $("body").append("<style>@page{size: landscape;}</style>");
      } else {
        $("#DivKiyasTabloHtml").html("");
        $("#txt").hide();
        setUtil.alert({
          container: "#modalKiyasTablosu .modal-body #msg",
          message: "Listelenecek kayıt bulunamadı.",
          alertClass: "alert-danger",
          autoClose: false,
        });
      }
    });
  }
  String.prototype.turkishtoEnglish = function () {
    return this.replace("Ğ", "g")
      .replace("Ü", "u")
      .replace("Ş", "s")
      .replace("I", "i")
      .replace("İ", "i")
      .replace("Ö", "o")
      .replace("Ç", "c")
      .replace("ğ", "g")
      .replace("ü", "u")
      .replace("ş", "s")
      .replace("ı", "i")
      .replace("ö", "o")
      .replace("ç", "c")
      .replace(" ", "_")
      .replace(" ", "_")
      .replace(" ", "_")
      .replace(" ", "_")
      .replace(" ", "_")
      .replace(" ", "_")
      .replace(" ", "_")
      .replace(" ", "_")
      .replace(" ", "_")
      .replace(" ", "_")
      .replace(" ", "_")
      .replace(" ", "_")
      .replace(" ", "_");
  };

  function checkEmpty(text) {
    if (String.isNullOrWhiteSpace(text)) {
      return "-";
    }
    return text;
  }

  function GetTedarikciler() {
    var modal = $("#modalKiyasTablosu"),
      modalBody = modal.find(".modal-body");
    divAnalizler = modalBody.find(".hizli-ekle-records");
    divMain = modalBody.find(".divIsEmirleri");
    divAnalizler.find("#btn-add-selected").remove();
    tbody = divAnalizler.find("tbody");
    var url =
      "https://farmakodwebapi.setcrm.com/api/data/LrOkuma?recordId=" +
      $("#RecordPublicId").val() +
      "&lrId=5DC26FD7E4CB41B0B840FF2DFBB7B509&q=";
    var localUrl =
      "http://localhost:44358/api/data/LrOkuma?recordId=" +
      $("#RecordPublicId").val() +
      "&lrId=5DC26FD7E4CB41B0B840FF2DFBB7B509&q=";
    $.get(realUrl, function (r) {
      if (r.Status === true) {
        tbody.html("");
        $("#btn-add-selected").remove();
        if (r.Records.length > 0) {
          $.each(r.Records, function (i, v) {
            var tedarikci = v.Values.first(
              "FieldPublicId",
              "48603E185F12485889CB30609FE93BA3"
            ).Value;
            tbody.append(
              String.format(
                "<tr style='background-color:white' data-id='{0}' ><td style='text-align:center'><div class='tedarikci' >{1}</div></td><td><<td style='text-align:center;'><button class='btn btn-sm btn-success add-row-gmyOnayi' style='height:40px;' ><i class='fa fa-plus'></i></button><button class='btn btn-sm btn-danger delete-row-gmyOnayi' style='height:40px;display:none;' ><i class='fa fa-minus'></i></button></td></tr>",
                v.PublicId,
                tedarikci
              )
            );
          });
        }
        divAnalizler.after(
          '<button id="btn-add-selected" type="button" class="btn btn-sm btn-success pull-right ">Seçilenleri Ekle</button>'
        );
      } else {
        tbody.html("");
        setUtil.alert({
          container: "#modalKiyasTablosu .modal-body #msg",
          message: "Bu adıma bağlı iş emri bulunamadı",
          alertClass: "alert-warning",
          autoClose: true,
        });
      }
    });
  }
});
