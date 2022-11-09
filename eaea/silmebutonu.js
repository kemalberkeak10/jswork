$(function() {
    var recordId = "";
    $('body').on('lookupRelationLoadTriggerEvent', function(e, relationId) {
        if ((relationId === 'FD63BF12694C48A69034A72E5E358108')) {
            var datas = $('.panel-lookup[data-id=FD63BF12694C48A69034A72E5E358108] tbody tr');
            if (datas.length > 0) {
                datas.each(function(i, v) {
                    $(v).find('.btn-group').append('<a data-id="' + $(v).attr('data-id') + '" class="btn btn-danger btn-sm btnAnalizSil" title="Sil"><i class="far fa-trash-alt"></i></a>');
                });
            }
        }
    });

    $('body').on("click",
        ".btnAnalizSil",
        function() {
            recordId = "";
            recordId = $(this).data("id");

            $('#modalCustomDelete').remove();
            window.setModal.Create({
                id: 'modalCustomDelete',
                html: {
                    header: 'Silme Uyarısı',
                    body: '<div id="errorMessage" style="width:100%;color:red;font-size:15px;"></div>' +
                        '<div id="loading" style="margin:0 0 5px; width: 100%;display:none;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>' +
                        '<span class="text-danger info-message"><i class="fas fa-exclamation-circle"></i> Kaydı silmek istediğinizden emin misiniz?</span>',
                    footer: '<a class="btn btn-danger btn-delete-confirm-custom"><i class="fas fa-trash-alt"></i> Sil</a><button type="button" class="btn btn-success" data-dismiss="modal"><i class="fas fa-times"></i> Kapat</button>'
                }
            });
            $('#modalCustomDelete').modal('toggle');

        });

    $("body").on("click",
        ".btn-delete-confirm-custom",
        function() {
            $("#modalCustomDelete .btn-delete-confirm-custom, #modalCustomDelete .info-message").hide();
            $("#modalCustomDelete #loading").show();

            var urlLocal = String.format("https://localhost:44328/api/data/SecilenDeneySil?recordPublicId={0}&sayfaRecordId={1}", recordId, $("#RecordPublicId").val()),
                urlReal = String.format("https://eaewebapi.setcrm.com/api/data/SecilenDeneySil?recordPublicId={0}&sayfaRecordId={1}", recordId, $("#RecordPublicId").val());
            $.get(urlReal, function(r) {
                if (r.Status) {
                    window.location.reload();
                } else {
                    $("#modalCustomDelete .btn-delete-confirm-custom, #modalCustomDelete .info-message").show();
                    $("#modalCustomDelete #loading").hide();
                    setUtil.alert({
                        container: '#modalCustomDelete .modal-body #errorMessage',
                        message: r.Message,
                        alertClass: 'alert-danger',
                        autoClose: false
                    });
                }
            });
        });
});