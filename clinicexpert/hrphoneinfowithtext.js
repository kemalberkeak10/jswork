$(function () {
  $(".well .pull-right:eq(0)").prepend(
    '<a id="btnWorkMobileInfoWithText" class="btn btn-sm btn-success"  style="margin-right:10px;" title=""><span>HR Work Mobile With Name</a>'
  );
  $("body").on("click", "#btnWorkMobileInfoWithText", function () {
    $("#modalHRMobileInfo").remove();
    window.setModal.Create({
      id: "modalHRMobileInfo",
      html: {
        header: '<i class="fas fa-check-circle"></i> Contact Owner',
        body:
          '<input type="text" class="form-control" placeholder="Contact Owner" style="text-transform: uppercase;" id="contactOwnerSearch" name="contactOwnerSearch">' +
          '<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>' +
          '<div id="msg" style="margin:0 0 5px; width: 100%;"></div>',
        footer:
          '<button id="btnContactOwnerSearch"  class="btn btn-success btn-sm">Ara</button>' +
          '<button class="btn btn-danger btn-sm" data-dismiss="modal" onclick="window.location.reload()">Kapat</button>',
      },
      settings: {
        widthClass: "modal-lg",
      },
    });
    $("#txt").hide();
    $("#btnLocationKaydet").hide();
    $("#modalHRMobileInfo").modal("toggle");
  });
  $("body").on("click", "#btnContactOwnerSearch", function () {
    if ($("#contactOwnerSearch").val() === "") {
      alert("Lütfen Lokasyon giriniz!");
    } else {
      $("#btnContactOwnerSearch").hide();
      $("#txt").show();
      var localUrl = String.format(
          "http://localhost:62896/api/data/HRPhoneInfoWithText?contactOwnerName={0}",
          contactOwnerName
        ),
        realUrl = String.format(
          "https://clinicexpertwebapi.setcrm.com/api/data/HRPhoneInfoWithText?contactOwnerName={0}",
          contactOwnerName
        );
      $.get(realUrl, function (r) {
        if (r.Status) {
          $("#modalHRMobileInfo .modal-body").append(
            String.format(
              '<div class="contact-owner-new-row mt-2"><h4 style="margin-top:0"><i class="fa fa-info"></i> KAYITLAR</h4></div><hr>'
            )
          );
          $("#modalHRMobileInfo .modal-body").append(
            '<div id="ContactOwnerRecords" style="width: 100%;">'
          );
          $("#txt").hide();
          if (r.infoLocationList.length > 0) {
            $("#newTbl thead").html("");
            $("#newTbl tbody").html("");
            var newTbl = $('<table id="newTbl" style="width: 100%" />');
            var thead = $("<thead/>");
            var newRow = $(
              '<tr class="table table-bordered table-hover" style="background-color:lightblue"/>'
            );
            newRow.append(
              $('<th style="text-align: center;" class="col-md-1"/>').text(
                "Contact Owner"
              )
            );
            newRow.append(
              $('<th style="text-align: center;" class="col-md-1"/>').text(
                "Mobile Phone"
              )
            );
            thead.append(newRow);
            newTbl.append(thead);
            var tbody = $("<tbody />");
            $.each(r.infoLocationList, function (i, v) {
              var newRow = $('<tr class="table table-bordered table-hover"/>');
              newRow.append(
                $('<td style="text-align: center;" class="col-md-1" />').text(
                  v.toolCalibrationNo
                )
              );
              newRow.append(
                $('<td style="text-align: center;" class="col-md-1" />').text(
                  v.sn
                )
              );
              v.status = "false";
              tbody.append(newRow);
              newTbl.append(tbody);
              $("#ContactOwnerRecords").append(newTbl);
            });
          }
        } else {
          $("#txt").hide();
          setUtil.alert({
            container: "#modalHRMobileInfo .modal-body #msg",
            message: r.Message,
            alertClass: "alert-danger",
            autoClose: false,
          });
        }
      });
    }
  });
  $("body").on("keyup", "#contactOwnerSearch", function (e) {
    if (e.key === "Enter" || e.keyCode === 13) {
      if ($("#contactOwnerSearch").val() === "") {
        alert("Lütfen Lokasyon giriniz!");
      } else {
        $("input").attr("disabled", "disabled");
        $("#btnContactOwnerSearch").hide();
        $("#txt").show();
        var localUrl = String.format(
            "http://localhost:62896/api/data/HRPhoneInfoWithText?contactOwnerName={0}",
            $("#contactOwnerSearch").val().toUpperCase()
          ),
          realUrl = String.format(
            "https://clinicexpertwebapi.setcrm.com/api/data/HRPhoneInfoWithText?contactOwnerName={0}",
            $("#contactOwnerSearch").val().toUpperCase()
          );
        $.get(realUrl, function (r) {
          if (r.Status) {
            $("#modalHRMobileInfo .modal-body").append(
              String.format(
                '<div class="contact-owner-new-row mt-2"><h4 style="margin-top:0"><i class="fa fa-info"></i> KAYITLAR</h4></div><hr>'
              )
            );
            $("#modalHRMobileInfo .modal-body").append(
              '<div id="ContactOwnerRecords" style="width: 100%;">'
            );
            $("#txt").hide();
            if (r.infoLocationList.length > 0) {
              $("#newTbl thead").html("");
              $("#newTbl tbody").html("");
              var newTbl = $('<table id="newTbl" style="width: 100%" />');
              var thead = $("<thead/>");
              var newRow = $(
                '<tr class="table table-bordered table-hover" style="background-color:lightblue"/>'
              );
              newRow.append(
                $('<th style="text-align: center;" class="col-md-1"/>').text(
                  "Contact Owner"
                )
              );
              newRow.append(
                $('<th style="text-align: center;" class="col-md-1"/>').text(
                  "Mobile Phone"
                )
              );
              thead.append(newRow);
              newTbl.append(thead);
              var tbody = $("<tbody />");
              $.each(r.infoLocationList, function (i, v) {
                var newRow = $(
                  '<tr class="table table-bordered table-hover"/>'
                );
                newRow.append(
                  $('<td style="text-align: center;" class="col-md-1" />').text(
                    v.toolCalibrationNo
                  )
                );
                newRow.append(
                  $('<td style="text-align: center;" class="col-md-1" />').text(
                    v.sn
                  )
                );
                tbody.append(newRow);
                newTbl.append(tbody);
                $("#ContactOwnerRecords").append(newTbl);
              });
              $("#btnLocationKaydet").show();
            }
          } else {
            $("#txt").hide();
            setUtil.alert({
              container: "#modalHRMobileInfo .modal-body #msg",
              message: r.Message,
              alertClass: "alert-danger",
              autoClose: false,
            });
          }
        });
      }
    }
  });

    '<tr class="summary-block" style="background-color: #e4e4e4;"><td align="center"><b> <span class="badge badge-{0}" style="font-size:14px; ">{0}</span> </b> </td>',
 
});
