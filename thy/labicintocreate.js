$(function() {
    var filterId = $("#FilterId").val();
    if (filterId === "7F1638FB2A1143368CFC138519DE62C1") {

        $(".well-xxs:first .pull-right").prepend("<button type='button' class='btn btn-info btn-sm btn-create-transfer-order'>Create Transfer Order</button>");

        $(".btn-create-transfer-order").hover(
            function() {
                var count = $(".vf-check:checked").length;
                if (count === 0) {
                    $(".btn-create-transfer-order").attr({
                        "data-toggle": "tooltip",
                        "data-placement": "top",
                        "data-original-title": String.format("You must choose at least one record!")
                    });
                    $(".btn-create-transfer-order").tooltip('show');
                }
                $(".btn-create-transfer-order").removeAttr("data-toggle data-placement data-original-title");
            }
        );

        $(".table-responsive table thead tr").each(function(i, v) {
            $(v).prepend("<th><input type='checkbox' class='vf-all-check-toggle' style='margin-left:3px;margin-right:3px;'></th>");
        });

        $(".table-responsive table tbody tr").each(function(i, v) {
            $(v).prepend("<td><input type='checkbox' class='vf-check' style='margin-left:3px;margin-right:3px;'></td>");
        });

        $(".vf-all-check-toggle").on("change",
            function() {
                var checkBoxes = $(".vf-check");
                checkBoxes.prop("checked", !checkBoxes.prop("checked"));
            });

        $("body").on("click",
            ".btn-create-transfer-order",
            function() {
                var button = $(this),
                    records = $('.vf-check:checked').map(function() {
                        return $(this).closest('tr').data('id')
                    }).toArray();

                if (records.length <= 0) return;

                $('#modalCreateTransferOrder').remove();
                window.setModal.Create({
                    id: 'modalCreateTransferOrder',
                    html: {
                        header: 'Create Transfer Order',
                        body: "<iframe src='/set/new/transfer-order?pageLayoutId=73584897E57247B6B9D7E69EB8ADE6DB' id='frameTransferOrder' style='width:100%;height:500px;border:none;' frameborder='0'></iframe>",
                        footer: ''
                    },
                    settings: {
                        widthClass: 'modal-full-width'
                    }
                });
                $('#modalCreateTransferOrder').modal("toggle");

                var recordId = "";
                $('#frameTransferOrder').on("load", function() {
                    recordId = $("#frameTransferOrder").contents().find('#RecordPublicId').val();
                    if (!String.isNullOrWhiteSpace(recordId)) {
                        $("#modalCreateTransferOrder .modal-body").find('#frameTransferOrder, .alert-warning').remove();
                        $("#modalCreateTransferOrder .modal-body").prepend('<div id="txt" style="margin:0 0 5px; width: 100%;">Transfer Order has been created, remaining transactions are being completed...<br/> <img src="/Public/img/loading_bar.gif"></div><br><a target="_blank" class="btn btn-success btn-sm" href="/set/transfer-order/detail/' + recordId + '"><i class="fas fa-external-link-alt"></i> View Transfer Order</a>');

                        var model = {
                            TransferOrderId: recordId,
                            CalibrationToolItems: records
                        };

                        var realUrl = String.format("https://thywebapi.setcrm.com/api/data/UpdateCalibrationTools"),
                            localUrl = String.format("http://localhost:65474//api/data/UpdateCalibrationTools");
                        $.post(realUrl, model,
                            function(r) {
                                $("#modalCreateTransferOrder .modal-body #txt").hide();
                                $('#modalCreateTransferOrder').find('.modal-body #msg').remove();
                                $('#modalCreateTransferOrder').find('.modal-body').prepend('<div id="msg"></div>');
                                if (r.Status) {
                                    setUtil.alert({
                                        container: '#modalCreateTransferOrder #msg',
                                        message: "The transaction is successful!",
                                        alertClass: 'alert-success',
                                        autoClose: false
                                    });
                                } else {
                                    setUtil.alert({
                                        container: '#modalCreateTransferOrder #msg',
                                        message: r.Message,
                                        alertClass: 'alert-danger',
                                        autoClose: false
                                    });
                                }
                            }
                        );

                    }
                    $("#frameTransferOrder").contents().find('#navbarmenu, #btn_save_and_new, footer').remove();
                    $("#frameTransferOrder").contents().find('.well-xxs:first').hide();
                    $("#frameTransferOrder").contents().find('body').attr("style",
                        "padding-top:0 !important");
                });

            });
    }
});
/////////////////////////////////////////
$(function() {
    $('#btn_save').parent().prepend('<a id="btnNewKaydet" class="btn btn-primary">Kaydet</a>')
    $('#btn_save').hide();


    $('body').on('click', '#btnNewKaydet', function() {
        $('#modalLoading').remove();
        window.setModal.Create({
            id: 'modalLoading',
            html: {
                header: 'Bilgi',
                body: ' <div> <img src="/Public/img/loading_bar.gif"></div><div id="msg" style="color:red;font-size:20px;">İşleminiz yapılıyor.. Lütfen Bekleyiniz..</div>',
                footer: ''
            }
        });

        var toNo = $('#A7C529565E684A548B63B33C2AC648AA').val();
        var localUrl = String.format('http://localhost:65474/api/data/CheckToNo?toNo={0}', toNo),
            realUrl = String.format('https://thywebapi.setcrm.com/api/data/CheckToNo?toNo={0}', toNo);

        if (!String.isNullOrWhiteSpace(toNo)) {
            $('#modalLoading').modal('toggle');
            $.get(realUrl, function(r) {
                if (r.Status) {
                    $('#modalLoading').modal('toggle');
                    $('#btn_save').trigger('click');
                } else {
                    $('#modalLoading .modal-body').html('');
                    setUtil.alert({
                        container: '#modalLoading .modal-body',
                        message: r.Message,
                        alertClass: 'alert-danger',
                        autoClose: false
                    });

                    $('#modalLoading footer').append('<a class="btn btn-danger btn-sm pull-right" data-dismiss="modal">Kapat</a>');
                }
            });
        } else {
            $('#btn_save').trigger('click');
        }

    });
});