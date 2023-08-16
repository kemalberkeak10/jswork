(function ($) {
  function appendContent($el, content) {
    if (!content) return;

    // Simple test for a jQuery element
    $el.append(content.jquery ? content.clone() : content);
  }

  function appendBody($body, $element, opt) {
    // Clone for safety and convenience
    // Calls clone(withDataAndEvents = true) to copy form values.
    var $content = $element.clone(opt.formValues);

    if (opt.formValues) {
      // Copy original select and textarea values to their cloned counterpart
      // Makes up for inability to clone select and textarea values with clone(true)
      copyValues($element, $content, "select, textarea");
    }

    if (opt.removeScripts) {
      $content.find("script").remove();
    }

    if (opt.printContainer) {
      // grab $.selector as container
      $content.appendTo($body);
    } else {
      // otherwise just print interior elements of container
      $content.each(function () {
        $(this).children().appendTo($body);
      });
    }
  }

  // Copies values from origin to clone for passed in elementSelector
  function copyValues(origin, clone, elementSelector) {
    var $originalElements = origin.find(elementSelector);

    clone.find(elementSelector).each(function (index, item) {
      $(item).val($originalElements.eq(index).val());
    });
  }

  var opt;
  $.fn.printThis = function (options) {
    opt = $.extend({}, $.fn.printThis.defaults, options);
    var $element = this instanceof jQuery ? this : $(this);

    var strFrameName = "printThis-" + new Date().getTime();

    if (
      window.location.hostname !== document.domain &&
      navigator.userAgent.match(/msie/i)
    ) {
      // Ugly IE hacks due to IE not inheriting document.domain from parent
      // checks if document.domain is set by comparing the host name against document.domain
      var iframeSrc =
        'javascript:document.write("<head><script>document.domain=\\"' +
        document.domain +
        '\\";</s' +
        'cript></head><body></body>")';
      var printI = document.createElement("iframe");
      printI.name = "printIframe";
      printI.id = strFrameName;
      printI.className = "MSIE";
      document.body.appendChild(printI);
      printI.src = iframeSrc;
    } else {
      // other browsers inherit document.domain, and IE works if document.domain is not explicitly set
      var $frame = $("<iframe id='" + strFrameName + "' name='printIframe' />");
      $frame.appendTo("body");
    }

    var $iframe = $("#" + strFrameName);

    // show frame if in debug mode
    if (!opt.debug)
      $iframe.css({
        position: "absolute",
        width: "0px",
        height: "0px",
        left: "-600px",
        top: "-600px",
      });

    // before print callback
    if (typeof opt.beforePrint === "function") {
      opt.beforePrint();
    }

    // $iframe.ready() and $iframe.load were inconsistent between browsers
    setTimeout(function () {
      // Add doctype to fix the style difference between printing and render
      function setDocType($iframe, doctype) {
        var win, doc;
        win = $iframe.get(0);
        win = win.contentWindow || win.contentDocument || win;
        doc = win.document || win.contentDocument || win;
        doc.open();
        doc.write(doctype);
        doc.close();
      }

      if (opt.doctypeString) {
        setDocType($iframe, opt.doctypeString);
      }

      var $doc = $iframe.contents(),
        $head = $doc.find("head"),
        $body = $doc.find("body"),
        $base = $("base"),
        baseURL;

      // add base tag to ensure elements use the parent domain
      if (opt.base === true && $base.length > 0) {
        // take the base tag from the original page
        baseURL = $base.attr("href");
      } else if (typeof opt.base === "string") {
        // An exact base string is provided
        baseURL = opt.base;
      } else {
        // Use the page URL as the base
        baseURL = document.location.protocol + "//" + document.location.host;
      }

      $head.append('<base href="' + baseURL + '">');

      // import page stylesheets
      if (opt.importCSS)
        $("link[rel=stylesheet]").each(function () {
          var href = $(this).attr("href");
          if (href) {
            var media = $(this).attr("media") || "all";
            $head.append(
              "<link type='text/css' rel='stylesheet' href='" +
                href +
                "' media='" +
                media +
                "'>"
            );
          }
        });

      // import style tags
      if (opt.importStyle)
        $("style").each(function () {
          $head.append(this.outerHTML);
        });

      // add title of the page
      if (opt.pageTitle) $head.append("<title>" + opt.pageTitle + "</title>");

      // import additional stylesheet(s)
      if (opt.loadCSS) {
        if ($.isArray(opt.loadCSS)) {
          jQuery.each(opt.loadCSS, function (index, value) {
            $head.append(
              "<link type='text/css' rel='stylesheet' href='" + this + "'>"
            );
          });
        } else {
          $head.append(
            "<link type='text/css' rel='stylesheet' href='" + opt.loadCSS + "'>"
          );
        }
      }

      var pageHtml = $("html")[0];

      // CSS VAR in html tag when dynamic apply e.g.  document.documentElement.style.setProperty("--foo", bar);
      $doc.find("html").prop("style", pageHtml.style.cssText);

      // copy 'root' tag classes
      var tag = opt.copyTagClasses;
      if (tag) {
        tag = tag === true ? "bh" : tag;
        if (tag.indexOf("b") !== -1) {
          $body.addClass($("body")[0].className);
        }
        if (tag.indexOf("h") !== -1) {
          $doc.find("html").addClass(pageHtml.className);
        }
      }

      // print header
      appendContent($body, opt.header);

      if (opt.canvas) {
        // add canvas data-ids for easy access after cloning.
        var canvasId = 0;
        // .addBack('canvas') adds the top-level element if it is a canvas.
        $element
          .find("canvas")
          .addBack("canvas")
          .each(function () {
            $(this).attr("data-printthis", canvasId++);
          });
      }

      appendBody($body, $element, opt);

      if (opt.canvas) {
        // Re-draw new canvases by referencing the originals
        $body.find("canvas").each(function () {
          var cid = $(this).data("printthis"),
            $src = $('[data-printthis="' + cid + '"]');

          this.getContext("2d").drawImage($src[0], 0, 0);

          // Remove the markup from the original
          if ($.isFunction($.fn.removeAttr)) {
            $src.removeAttr("data-printthis");
          } else {
            $.each($src, function (i, el) {
              el.removeAttribute("data-printthis");
            });
          }
        });
      }

      // remove inline styles
      if (opt.removeInline) {
        // Ensure there is a selector, even if it's been mistakenly removed
        var selector = opt.removeInlineSelector || "*";
        // $.removeAttr available jQuery 1.7+
        if ($.isFunction($.removeAttr)) {
          $body.find(selector).removeAttr("style");
        } else {
          $body.find(selector).attr("style", "");
        }
      }

      // print "footer"
      appendContent($body, opt.footer);

      // attach event handler function to beforePrint event
      function attachOnBeforePrintEvent($iframe, beforePrintHandler) {
        var win = $iframe.get(0);
        win = win.contentWindow || win.contentDocument || win;

        if (typeof beforePrintHandler === "function") {
          if ("matchMedia" in win) {
            win.matchMedia("print").addListener(function (mql) {
              if (mql.matches) beforePrintHandler();
            });
          } else {
            win.onbeforeprint = beforePrintHandler;
          }
        }
      }
      attachOnBeforePrintEvent($iframe, opt.beforePrintEvent);

      setTimeout(function () {
        if ($iframe.hasClass("MSIE")) {
          // check if the iframe was created with the uglyhack
          // and perform another ugly hack out of neccessity
          window.frames["printIframe"].focus();
          $head.append("<script>  window.print(); </s" + "cript>");
        } else {
          // proper method
          if (document.queryCommandSupported("print")) {
            $iframe[0].contentWindow.document.execCommand("print", false, null);
          } else {
            $iframe[0].contentWindow.focus();
            $iframe[0].contentWindow.print();
          }
        }

        // remove iframe after print
        if (!opt.debug) {
          setTimeout(function () {
            $iframe.remove();
          }, 1000);
        }

        // after print callback
        if (typeof opt.afterPrint === "function") {
          opt.afterPrint();
        }
      }, opt.printDelay);
    }, 333);
  };

  // defaults
  $.fn.printThis.defaults = {
    debug: false, // show the iframe for debugging
    importCSS: true, // import parent page css
    importStyle: true, // import style tags
    printContainer: true, // print outer container/$.selector
    loadCSS: "", // path to additional css file - use an array [] for multiple
    pageTitle: "", // add title to print page
    removeInline: false, // remove inline styles from print elements
    removeInlineSelector: "*", // custom selectors to filter inline styles. removeInline must be true
    printDelay: 333, // variable print delay
    header: null, // prefix to html
    footer: null, // postfix to html
    base: false, // preserve the BASE tag or accept a string for the URL
    formValues: true, // preserve input/form values
    canvas: true, // copy canvas content
    doctypeString: "<!DOCTYPE html>", // enter a different doctype for older markup
    removeScripts: false, // remove script tags from print content
    copyTagClasses: false, // copy classes from the html & body tag
    beforePrintEvent: null, // callback function for printEvent in iframe
    beforePrint: false, // function called before iframe is filled
    afterPrint: false, // function called before iframe is removed
  };
})(jQuery);
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
    // window.setTimeout(function () {
    //     var contentWindow = window.open();
    //     contentWindow.document.write($("#modalKiyasTablosu").find(".modal-body #DivKiyasTabloHtml").html());
    //     contentWindow.print();
    //     contentWindow.close();

    // }, 500);
    var printWindow = window.open("");
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
        //   printWindow = window.open("");

        //.html("<img id='Image' src=" + dataURL + " style='" + width + "'></img>")

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
        // var groupCount = 0;
        if (r.KiyasTableResponse.TalepUrunleriList.length > 0) {
          //header olusturulması
          var headerRow = $('<div  class="row" style="margin:0px!important;">');
          var emptyHeader = $("<h5 style='color:white;'> Tedarikçiler ></h5>");
          var headerColumn = $(
            '<div class="col-md-3 " style="padding:0px!;border-right:1px solid" >'
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
                '<div class="col-md-3 " style="padding:0px!;border-right:1px solid" >'
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
                '<td style="text-align: center;" class="col-md-4 urunAdi"/>'
              ).text(v.UrunAdi)
            );
            if (!String.isNullOrWhiteSpace(v.Miktar)) {
              newRow.append(
                $(
                  '<td rowspan="1" style="text-align: center;" class="col-md-4 miktar"/>'
                ).text(parseInt(v.Miktar).toFixed(2))
              );
            } else {
              newRow.append(
                $(
                  '<td rowspan="1" style="text-align: center;" class="col-md-4 miktar"/>'
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
            $(".groupRow_" + page).append(column);
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

        $("#modalKiyasTablosu td").css("border", "1px solid#0d0d0d");
        $("#modalKiyasTablosu th").css("border", "1px solid#0d0d0d");
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
