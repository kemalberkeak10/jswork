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
          '<div id="DivKiyasTabloHtml" style="width: 100%;">',
        footer:
          '<button class="btn btn-primary btn-sm btn-print" ><i class="fa fa-print" aria-hidden="true"></i> Yazdır</button>',
        //"",
      },
      settings: {
        widthClass: "modal-full-width",
      },
    });
    $(".modal-header").addClass("text-center");
    $("#modalKiyasTablosu").modal({
      backdrop: false,
    });
    $(".modalKiyasTablosu").css("padding", "0px!important");
    $("#txt").show();
    createTables();
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
});
