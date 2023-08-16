$(function () {
  var activePage = 0;
  var maxPage = 0;
  $(".btn-br-actions[data-publicid=969042CF0BB049CDB84A6332AED29E55]").hide();
  $(".btn-br-actions[data-publicid=969042CF0BB049CDB84A6332AED29E55]")
    .closest("td")
    .prepend(
      '<a id="btnKiyasTablosu" class="btn btn-sm btn-warning"  style="margin-right:10px;" >Kıyas Tablosu</a>'
    );
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
          '<a id="prev_button" style="border-radius: 50%;background-color: #f1f1f1;color: black;text-decoration: none;display: inline-block;padding: 8px 16px;">&#8249;</a>' +
          '<a id="next_button" style="border-radius: 50%;background-color: #04AA6D;color: white;text-decoration: none;display: inline-block;padding: 8px 16px;">&#8250;</a>',
        //  '<button class="btn btn-danger btn-sm" data-dismiss="modal">Kapat</button>',
        // "",
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
    $("#prev_button").hide();
    $("#next_button").hide();
    $("#txt").show();
    createTables();

    $("#next_button").on("click", function () {
      if (activePage < maxPage) {
        $(".page_" + activePage).hide();
        $(".headerPage_" + activePage).hide();
        activePage++;
        $(".page_" + activePage).show();
        $(".headerPage_" + activePage).show();
      }
    });

    $("#prev_button").on("click", function () {
      if (activePage > 0) {
        $(".page_" + activePage).hide();
        $(".headerPage_" + activePage).hide();
        activePage--;
        $(".page_" + activePage).show();
        $(".headerPage_" + activePage).show();
      }
    });
  });
  // $('<td style="text-align: center;" class="col-md-2" />').text(
  //         moment(new Date()).format("DD.MM.YYYY")
  //       )

  function createTables() {
    var localUrl =
      "https://localhost:44348/api/data/GetTeklifKiyasTableInfos?recordId=" +
      $("#RecordPublicId").val();

    var realUrl =
      "https://farmakodwebapi.setcrm.com/api/data/GetTeklifKiyasTableInfos?recordId=" +
      $("#RecordPublicId").val();
    $.get(localUrl, function (r) {
      if (r.Status) {
        var headerPage = 0;
        if (r.KiyasTableResponse.TalepUrunleriList.length > 0) {
          //header olusturulması
          // var headerRow = $(
          //   '<div id="headerRow" class="row" style="margin:0px!important;border:1px solid">'
          // );
          var headerRow = $(
            '<div id="headerRow" class="row" style="margin:0px!important;border-right:1px solid">'
          );
          var emptyHeader = $("<h5 style='color:white;'> Tedarikçiler ></h5>");
          // var headerColumn = $(
          //   '<div class="col-md-3 " style="padding:0px!;border:1px solid" >'
          // );
          var headerColumn = $(
            '<div class="col-md-3 " style="padding:0px!;border-right:1px solid" >'
          );
          headerColumn.append(emptyHeader);
          headerRow.append(headerColumn);
          $.each(r.KiyasTableResponse.TedarikciList, function (i, v) {
            if (i % 3 == 0 && i != 0) {
              headerPage++;
            }
            var headerColumn = $(
              '<div class="col-md-3" style="padding:0px!important;border:1px solid">'
            ).addClass("headerPage_" + headerPage);
            var header = $("<h5 class='text-center' />").text(v);
            headerColumn.append(header);
            headerRow.append(headerColumn);
          });
          $("#DivKiyasTabloHtml").append(headerRow);

          var mainRow = $(
            '<div id="mainRow" class="row" style="margin:0px!important">'
          );
          var column = $(
            '<div class="col-md-3" style="padding:0px!important">'
          );
          var talepUrunTable = $(
            '<table id="tedarikciTable" style="width:100%">'
          );
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
                '<td style="text-align: center;" class="col-md-4 urunAdi"/>'
              ).text(v.UrunAdi)
            );
            if (!String.isNullOrWhiteSpace(v.Miktar)) {
              newRow.append(
                $(
                  '<td style="text-align: center;" class="col-md-4 miktar"/>'
                ).text(parseInt(v.Miktar).toFixed(2))
              );
            } else {
              newRow.append(
                $(
                  '<td style="text-align: center;" class="col-md-4 miktar"/>'
                ).text(v.Miktar)
              );
            }

            newRow.append(
              $(
                '<td style="text-align: center;" class="col-md-4 birim"/>'
              ).text(v.Birim)
            );

            tbody.append(newRow);
            talepUrunTable.append(tbody);
            column.append(talepUrunTable);
            mainRow.append(column);
            $("#DivKiyasTabloHtml").append(mainRow);
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

          subRow = $('<tr class="table table-bordered table-hover"/>');
          subRow.append(
            $('<td colspan="3" style="text-align: right;" />').text(
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
          talepUrunTable.append(tbody);
          column.append(talepUrunTable);
          mainRow.append(column);
        }
        var page = 0;
        if (r.KiyasTableResponse.TedarikciList.length > 0) {
          $.each(r.KiyasTableResponse.TedarikciList, function (i, v) {
            if (i % 3 == 0 && i != 0) {
              page++;
              maxPage = page;
              $("#prev_button").show();
              $("#next_button").show();
            }
            var column = $(
              '<div class="col-md-3" style="padding:0px!important"> '
            ).addClass("page_" + page);
            var tedarikciTable = $("<table style='width:100%';>")
              .addClass("tedarikci_" + v.turkishtoEnglish())
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
                    "tedarikci_" + v.turkishtoEnglish() + "_birimFiyat_" + index
                  )
                  .text("-")
              );
              newRow.append(
                $(
                  '<td style="text-align: center;" class="col-md-3" style="padding:0px!important;"/>'
                )
                  .addClass(
                    "tedarikci_" +
                      v.turkishtoEnglish() +
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
                      v.turkishtoEnglish() +
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
                .addClass("tedarikci_" + v.turkishtoEnglish() + "_toplamFiyat")
                .text("-")
            );
            tbody.append(subRow);

            subRow = $('<tr class="table table-bordered table-hover "/>');
            subRow.append(
              $('<td colspan="3" style="text-align: center;" />')
                .addClass("tedarikci_" + v.turkishtoEnglish() + "_iskonto")
                .text("-")
            );
            tbody.append(subRow);
            subRow = $(
              '<tr class="table table-bordered table-hover text-right"/>'
            );
            subRow.append(
              $('<td colspan="3" style="text-align: center;" />')
                .addClass("tedarikci_" + v.turkishtoEnglish() + "_genelToplam")
                .text("-")
            );
            tbody.append(subRow);
            subRow = $(
              '<tr class="table table-bordered table-hover text-right"/>'
            );
            subRow.append(
              $('<td colspan="3" style="text-align: center;" />')
                .addClass(
                  "tedarikci_" + v.turkishtoEnglish() + "_odemeSartlari"
                )
                .text("-")
            );
            tbody.append(subRow);

            subRow = $(
              '<tr class="table table-bordered table-hover text-right"/>'
            );
            subRow.append(
              $('<td colspan="3" style="text-align: center;" />')
                .addClass("tedarikci_" + v.turkishtoEnglish() + "_teslimYeri")
                .text("-")
            );
            tbody.append(subRow);

            tedarikciTable.append(tbody);
            column.append(tedarikciTable);
            $("#mainRow").append(column);
            $("#DivKiyasTabloHtml").append(mainRow);
          });
        }
        if (r.KiyasTableResponse.TeklifToplamaUrunleriList.length > 0) {
          $.each(
            r.KiyasTableResponse.TeklifToplamaUrunleriList,
            function (i, v) {
              if (!String.isNullOrWhiteSpace(v.BirimFiyat)) {
                $(
                  ".tedarikci_" +
                    v.TedarikciName.turkishtoEnglish() +
                    "_birimFiyat_" +
                    v.Index
                ).text(parseInt(v.BirimFiyat).toFixed(2));
              }
              if (!String.isNullOrWhiteSpace(v.ToplamFiyat)) {
                $(
                  ".tedarikci_" +
                    v.TedarikciName.turkishtoEnglish() +
                    "_toplamFiyat_" +
                    v.Index
                ).text(parseInt(v.ToplamFiyat).toFixed(2));
              }

              $(
                ".tedarikci_" +
                  v.TedarikciName.turkishtoEnglish() +
                  "_teslimatTarihi_" +
                  v.Index
              ).text(v.TeslimatTarihi);

              if (v.isMinimum) {
                $(
                  ".tedarikci_" +
                    v.TedarikciName.turkishtoEnglish() +
                    "_birimFiyat_" +
                    v.Index
                ).css("background-color", "yellow");
                $(
                  ".tedarikci_" +
                    v.TedarikciName.turkishtoEnglish() +
                    "_toplamFiyat_" +
                    v.Index
                ).css("background-color", "yellow");
              }
              if (v.isClosestDate) {
                $(
                  ".tedarikci_" +
                    v.TedarikciName.turkishtoEnglish() +
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
                v.TedarikciName.turkishtoEnglish() +
                "_toplamFiyat"
            ).text(checkEmpty(v.ToplamFiyat));
            $(
              ".tedarikci_" + v.TedarikciName.turkishtoEnglish() + "_iskonto"
            ).text(checkEmpty(v.Iskonto));
            $(
              ".tedarikci_" +
                v.TedarikciName.turkishtoEnglish() +
                "_genelToplam"
            ).text(checkEmpty(v.GenelToplam));
            $(
              ".tedarikci_" +
                v.TedarikciName.turkishtoEnglish() +
                "_odemeSartlari"
            ).text(checkEmpty(v.OdemeSartlari));
            $(
              ".tedarikci_" + v.TedarikciName.turkishtoEnglish() + "_teslimYeri"
            ).text(checkEmpty(v.TeslimYeri));
          });
        }
        while (page > 0) {
          $(".page_" + page).hide();
          $(".headerPage_" + page).hide();
          page--;
          headerPage--;
        }

        $("#modalKiyasTablosu td").css("border", "1px solid#0d0d0d");
        $("#modalKiyasTablosu th").css("border", "1px solid#0d0d0d");

        //    $("#modalKiyasTablosu .modal-body").css("padding", "0px");
        $("#txt").hide();

        // window.setTimeout(function () {
        //   var contentWindow = window.open();
        //   var modalBodyHtml = $("#modalKiyasTablosu").html();
        //   contentWindow.document.write(modalBodyHtml);
        //   contentWindow.print();
        //   contentWindow.close();
        // }, 0);
      } else {
        $("#DivKiyasTabloHtml").html("");
        setUtil.alert({
          container: "#modalKiyasTablosu .modal-body #msg",
          message: "Listelenecek kayıt bulunamadı.",
          alertClass: "alert-danger",
          autoClose: false,
        });
      }
    });
  }
  function createEmptyTable(count) {}

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
      .replace(" ", "_");
  };
  function checkEmpty(text) {
    if (String.isNullOrWhiteSpace(text)) {
      return "-";
    }
    return text;
  }
});
