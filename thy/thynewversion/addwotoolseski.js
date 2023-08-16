$(function () {
  var panelBody = $(
    ".panel-lookup[data-id=8356D494FCD24EE093E94C50AFA2A4AF] .panel-body"
  );
  panelBody.prepend(
    '<a id="btnToolsCheckOut" class="btn btn-sm btn-primary pull-right" style="margin-right:5px;margin-bottom:5px;">All Check Out</a>'
  );
  panelBody.prepend(
    "<button type='button' class='btn btn-warning btn-sm pull-right btn-tool-package-add' style='margin-bottom:5px;'>Tool Package Adds</button>"
  );

  $("body").on("click", ".btn-tool-package-add", function () {
    var button = $(this);

    $("#modalToolPackageAdd").remove();
    window.setModal.Create({
      id: "modalToolPackageAdd",
      html: {
        header: "Tool Package Adds",
        body: '<div id="txt" style="margin:0 0 5px; width: 100%;">Please Wait..<br/> <img src="/Public/img/loading_bar.gif"></div>',
        footer:
          '<button id="btnToolPackageAddSubmitButton" style="display:none" class="btn btn-success btn-sm">Tool Package Add</button><button data-dismiss="modal" class="btn btn-danger btn-sm">Close</button>',
      },
      settings: {
        widthClass: "modal-full-width",
      },
    });
    $("#modalToolPackageAdd").modal("toggle");

    modalLrRefresh();
  });

  function modalLrRefresh() {
    var realUrlVf = String.format(
        "https://kalibrasyonwebapi.thyteknik.com/api/data/MyToolPackages?userId={0}&userName={1}",
        userData.id,
        userData.name
      ),
      localUrlVf = String.format(
        "http://localhost:65474//api/data/MyToolPackages?userId={0}&userName={1}",
        userData.id,
        userData.name
      );
    $.get(realUrlVf, "", function (r) {
      if (r.Status) {
        if (r.List.length > 0) {
          var newTbl = $(
              '<table id="newTbl" class="table table-bordered table-hover" style="table-layout:fixed" />'
            ),
            thead = $(
              '<thead class="table" style="background-color:#5BC0DE" />'
            ),
            newRow = $("<tr />"),
            tbody = $("<tbody />");

          thead.append($("<th style='width:64px;'/>"));
          thead.append($("<th style='width:64px;height:35px'/>"));
          thead.append($("<th/>").text("Technician"));
          thead.append($("<th/>").text("Created at"));
          thead.append($("<th/>").text("Status"));
          thead.append($("<th/>").text("Tools Package List"));
          thead.append($("<th/>").text("Explanation"));
          thead.append(newRow);
          newTbl.append(thead);

          var block = 0;
          $.each(r.List, function (i, v) {
            block++;
            var newRow = $("<tr/>", {
              "data-id": v.RecordId,
            });
            // detailRow = $("<tr/>", { "id": String.format("tools_{0}", i) });
            newRow.append(
              $(
                '<td><input class="tool-check-package" style="width:20px;height:20px;" name="tool-check-package" type="radio" data-id="' +
                  v.RecordId +
                  '"></td>'
              )
            );
            newRow.append($('<td style="text-align: left;" />').text(++i));
            newRow.append(
              $('<td style="text-align: left;" />').text(v.Technician)
            );
            newRow.append(
              $('<td style="text-align: left;" />').text(v.CreatedAt)
            );
            newRow.append($('<td style="text-align: left;" />').text(v.Status));
            newRow.append(
              $('<td style="text-align: left;" />').text(v.ToolPackageList)
            );
            newRow.append(
              $('<td style="text-align: left;" />').text(v.Explanation)
            );
            tbody.append(newRow);

            var guid = v.RecordId;
            tbody.append(
              $("<tr/>", {
                id: String.format("detailrow_{0}", guid),
                style: "display:none;background: rgb(212 190 35);",
              }).append(
                $("<td/>", {
                  colspan: "7",
                  style: "padding-left: 2%;padding-bottom: 0;",
                }).append(
                  $("<table/>", {
                    class: "table table-bordered table-hover",
                    style: "margin-bottom: 8px !important;",
                  })
                )
              )
            );

            var detailRow = tbody.find(
                String.format("#detailrow_{0} td table", guid)
              ),
              detailRowThead = $("<thead/>", {
                style: "background:#a5d9e8 !important",
              }),
              detailRowTbody = $("<tbody/>");
            detailRow
              .append(detailRowThead.append("<tr/>"))
              .append(detailRowTbody);

            var appendThead = detailRow.find("thead"),
              appendTbody = detailRow.find("tbody");

            $.each(
              ["", "", "Tool", "Status", "Related Person"],
              function (index, val) {
                appendThead.find("tr").append(
                  $("<th/>", {
                    "data-index": index,
                    style: "padding:5px",
                  }).append(val)
                );
              }
            );

            detailRow.append(appendThead);

            if (v.Tools.length === 0) {
              var $tr = $("<tr/>", {
                "data-index": "0",
              });
              appendTbody.append(
                $tr.append(
                  $("<td/>", {
                    colspan: "5",
                  }).html(
                    '<a class="btn btn-sm btn-primary btn-add-tool-package" style="width:100%" href="/set/tools-package/detail/' +
                      guid +
                      '" target="_blank">Add Tools to Package</a>'
                  )
                )
              );
            }
            $.each(v.Tools, function (o, g) {
              var $tr = $("<tr/>", {
                "data-index": o,
                "data-id": g.RecordId,
              });
              appendTbody.append(
                $tr
                  .append(
                    $("<td/>").html(
                      "<input type='checkbox' class='tool-check' data-block='" +
                        block +
                        "' data-parentid='" +
                        v.RecordId +
                        "' data-id='" +
                        g.ToolId +
                        "'>"
                    )
                  )
                  .append($("<td/>").text(String.format("{0}.{1}", i, ++o)))
                  .append($("<td/>").text(g.Tool))
                  .append($("<td/>").text(g.Status))
                  .append($("<td/>").text(g.RelatedPerson))
              );
            });
            detailRow.append(appendTbody);

            newTbl.append(tbody);
          });
          $("#modalToolPackageAdd").find(".modal-body").html(newTbl);
          $("#modalToolPackageAdd")
            .find(".modal-body")
            .prepend(
              "<a type='button' class='btn btn-primary btn-sm pull-right btn-new-package' style='margin-bottom:10px;' href='/set/new/tools-package' target='_blank'>New Package</a><a class='btn btn-warning btn-modal-refresh btn-sm pull-right' style='display:none;margin-right:10px;'><i class='fa fa-sync'></i> Yenile</a>"
            );

          $(".btn-new-package, .btn-add-tool-package").on("click", function () {
            setTimeout(() => {
              $(".btn-modal-refresh").show();
            }, 1000);
          });

          $(".btn-modal-refresh").on("click", function () {
            $("#modalToolPackageAdd")
              .find(".modal-body")
              .html(
                '<div id="txt" style="margin:0 0 5px; width: 100%;">Please Wait..<br/> <img src="/Public/img/loading_bar.gif"></div>'
              );
            modalLrRefresh();
          });

          $(".tool-check").on("change", function () {
            if ($(this).is(":checked")) {
              if (
                $(".tool-check:checked:first").data("block") !==
                $(".tool-check:checked:last").data("block")
              ) {
                $(".tool-check").prop("checked", false);
                $(this).prop("checked", true);

                $(".tool-check-package").prop("checked", false);
                $(
                  String.format(
                    ".tool-check-package[data-id={0}]",
                    $(this).data("parentid")
                  )
                ).prop("checked", true);
              } else {
                $(
                  String.format(
                    ".tool-check-package[data-id={0}]",
                    $(this).data("parentid")
                  )
                ).prop("checked", true);
              }
            }

            if ($(".tool-check:checked").length > 0) {
              $("#btnToolPackageAddSubmitButton").show();
            } else {
              $("#btnToolPackageAddSubmitButton").hide();
            }
          });
          $(".tool-check-package").on("change", function () {
            var id = $(this).data("id");
            $(".tool-check").prop("checked", false);
            $(String.format("#detailrow_{0}", id))
              .find("input[type=checkbox]")
              .prop("checked", true);
            $("#btnToolPackageAddSubmitButton").show();
          });

          $("body")
            .off("click", "#newTbl tbody tr td")
            .on("click", "#newTbl tbody tr td", function () {
              var id = $(this).closest("tr").data("id"),
                tr = $(this).closest("tr");
              if (
                $(this).find("input").hasClass("tool-check-package") ||
                tr.hasClass("detail-row") ||
                $(this).find("input").hasClass("tool-check")
              )
                return;
              $(String.format("#detailrow_{0}", id)).toggle();
            });
        } else {
          $("#modalToolPackageAdd").find(".modal-body #txt").hide();
          $("#modalToolPackageAdd")
            .find(".modal-body")
            .prepend(
              "<a type='button' class='btn btn-primary btn-sm pull-right btn-new-package' style='margin-bottom:10px;' href='/set/new/tools-package' target='_blank'>New Package</a><a class='btn btn-warning btn-modal-refresh btn-sm pull-right' style='display:none;margin-right:10px;'><i class='fa fa-sync'></i> Yenile</a>"
            );

          $(".btn-new-package, .btn-add-tool-package").on("click", function () {
            setTimeout(() => {
              $(".btn-modal-refresh").show();
            }, 1000);
          });

          $(".btn-modal-refresh").on("click", function () {
            $("#modalToolPackageAdd")
              .find(".modal-body")
              .html(
                '<div id="txt" style="margin:0 0 5px; width: 100%;">Please Wait..<br/> <img src="/Public/img/loading_bar.gif"></div>'
              );
            modalLrRefresh();
          });

          $(".tool-check").on("change", function () {
            if ($(this).is(":checked")) {
              if (
                $(".tool-check:checked:first").data("block") !==
                $(".tool-check:checked:last").data("block")
              ) {
                $(".tool-check").prop("checked", false);
                $(this).prop("checked", true);

                $(".tool-check-package").prop("checked", false);
                $(
                  String.format(
                    ".tool-check-package[data-id={0}]",
                    $(this).data("parentid")
                  )
                ).prop("checked", true);
              } else {
                $(
                  String.format(
                    ".tool-check-package[data-id={0}]",
                    $(this).data("parentid")
                  )
                ).prop("checked", true);
              }
            }

            if ($(".tool-check:checked").length > 0) {
              $("#btnToolPackageAddSubmitButton").show();
            } else {
              $("#btnToolPackageAddSubmitButton").hide();
            }
          });
          $(".tool-check-package").on("change", function () {
            var id = $(this).data("id");
            $(".tool-check").prop("checked", false);
            $(String.format("#detailrow_{0}", id))
              .find("input[type=checkbox]")
              .prop("checked", true);
            $("#btnToolPackageAddSubmitButton").show();
          });

          $("body")
            .off("click", "#newTbl tbody tr td")
            .on("click", "#newTbl tbody tr td", function () {
              var id = $(this).closest("tr").data("id"),
                tr = $(this).closest("tr");
              if (
                $(this).find("input").hasClass("tool-check-package") ||
                tr.hasClass("detail-row") ||
                $(this).find("input").hasClass("tool-check")
              )
                return;
              $(String.format("#detailrow_{0}", id)).toggle();
            });
          // $('#modalToolPackageAdd').find('.modal-body').prepend('<div id="msg"></div>');
          // setUtil.alert({
          //     container: '#modalToolPackageAdd #msg',
          //     message: "Filtrede kayıt(lar) bulunamadı!",
          //     alertClass: 'alert-danger',
          //     autoClose: false
          // });
        }
      } else {
        $("#modalToolPackageAdd").find(".modal-body #txt").hide();
        $("#modalToolPackageAdd")
          .find(".modal-body")
          .prepend('<div id="msg"></div>');
        setUtil.alert({
          container: "#modalToolPackageAdd #msg",
          message: r.Message,
          alertClass: "alert-danger",
          autoClose: false,
        });
      }
    });

    $("body").on("click", "#btnToolPackageAddSubmitButton", function () {
      var button = $(this),
        changedToolPackage = $(".tool-check-package:checked")
          .closest("tr")
          .data("id"),
        changedTool = $(".tool-check:checked")
          .map(function () {
            return $(this).data("id").toString();
          })
          .get()
          .join(",");

      $("#modalToolPackageAdd")
        .find(".modal-body")
        .prepend('<div id="msg"></div>');
      if (
        String.isNullOrWhiteSpace(changedToolPackage) ||
        changedToolPackage === undefined ||
        String.isNullOrWhiteSpace(changedTool)
      ) {
        setUtil.alert({
          container: "#modalToolPackageAdd #msg",
          message: "Please select tool package.",
          alertClass: "alert-danger",
          autoClose: true,
        });
        return;
      }

      button.prop("disabled", true).hide();
      $("#modalToolPackageAdd").find(".modal-body #newTbl").hide();
      $("#modalToolPackageAdd .modal-body").prepend(
        '<div id="txt" style="margin:0 0 5px; width: 100%;">Please Wait..<br/> <img src="/Public/img/loading_bar.gif"></div>'
      );

      var model = {
        RecordPublicId: $("#RecordPublicId").val(),
        ToolPackageId: changedToolPackage,
        Tools: changedTool,
      };

      var realUrl = String.format(
          "https://kalibrasyonwebapi.thyteknik.com/api/data/AddWOTools"
        ),
        localUrl = String.format("http://localhost:65474//api/data/AddWOTools");
      $.post(realUrl, model, function (r) {
        $("#modalToolPackageAdd").find(".modal-body #txt").hide();
        if (r.Status) {
          if (
            !String.isNullOrWhiteSpace(r.Tool) |
            !String.isNullOrWhiteSpace(r.ToolId) |
            !String.isNullOrWhiteSpace(r.RelatedPerson)
          ) {
            // setUtil.alert({
            //     container: '#modalToolPackageAdd #msg',
            //     message: "İşlem başarılı! " + r.Tool + " adlı cihaz " + r.RelatedPerson + "'dan alınıp size verilmiştir.",
            //     alertClass: 'alert-success',
            //     autoClose: false
            // });
            setUtil.alert({
              container: "#modalToolPackageAdd #msg",
              message: "İşlem başarılı!",
              alertClass: "alert-success",
              autoClose: false,
            });
            $("#modalToolPackageAdd .modal-body").append(
              String.format(
                '<a href="https://kalibrasyon.thyteknik.com/set/cihaz/detail/{0}" target="_blank" class="btn btn-primary btn-sm"><i class="fas fa-external-link-alt"></i>Cihazı Görüntüle</a>',
                r.ToolId
              )
            );
            $("#modalToolPackageAdd .modal-body").append(
              String.format(
                "<div id='alertDiv' style='padding:20px;background-color:#f44336;color:white;margin-bottom:15px'><strong>Uyarı! </strong>{0} adlı cihaz {1}'dan alınıp size verilmiştir.</div>",
                r.Tool,
                r.RelatedPerson
              )
            );
            RenkDegistir(0);
          } else {
            setUtil.alert({
              container: "#modalToolPackageAdd #msg",
              message: "İşlem başarılı!",
              alertClass: "alert-success",
              autoClose: false,
            });
            setTimeout(function () {
              window.location.reload();
            }, 1000);
          }
        } else {
          button.prop("disabled", false).show();
          $("#modalToolPackageAdd").find(".modal-body #newTbl").show();
          setUtil.alert({
            container: "#modalToolPackageAdd #msg",
            message: r.Message,
            alertClass: "alert-danger",
            autoClose: false,
          });
        }
      });
    });
  }

  function RenkDegistir(sayi) {
    if (sayi % 2 == 1) {
      setTimeout(() => {
        $("#alertDiv").css("color", "white");
        // $("#alertDiv").animate({
        //     "background-color": "#EAD945",
        // }, 200);
        sayi++;
        RenkDegistir(sayi);
      }, 400);
    } else {
      setTimeout(() => {
        $("#alertDiv").css("color", "black");
        // $("#alertDiv").animate({
        //     "background-color": "#A259C3",
        // }, 200);
        sayi = 1;
        RenkDegistir(sayi);
      }, 800);
    }
  }
});
