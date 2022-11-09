$(function() {
    var onayla2 = $(".btn-br-actions[data-publicid=EC0E1842D3C746BEAA00FF210C4CAE82]");
    onayla2.hide();
    onayla2.closest('td').append('<a class="btn btn-sm btn-warning btn-onayla-2" data-type="2">Onayla2</a>');

    $("body").on("click", ".btn-onayla-2", function() {
        $('#onayla2Modal').remove();
        window.setModal.Create({
            id: 'onayla2Modal',
            html: {
                header: 'Onayla 2',
                body: '<div id="msg"></div>',
                footer: '<button data-dismiss="modal" class="btn btn-primary btn-sm">Vazgeç</button>'
            }
        });
        $('#onayla2Modal').modal("toggle");

        //var onayBelgesiDurum = $("label[for=9666C67310FB4374BCCE42F6A2B140C2]").closest('div').data("publicids"),
        //var  onay2 = $("label[for=230C53439203499AAFC9184A170F9355]").closest('div').data("publicids");
        var onay2 = $('label[for=230C53439203499AAFC9184A170F9355]').parent().data('publicids');
        if (onay2 !== "59FAF36A0D054A6BB19DD1E5FAD26E0F") {
            //onaylandı
            $("#onayla2Modal .modal-body").html('<div id="loading" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>');
            $("#onayla2Modal .modal-footer").hide();
            var url = 'https://selcuklukentapi.setcrm.com/api/data/Approve';
            var urlLocal = 'http://localhost:61802/api/data/Approve';
            $.post(url, {
                    Type: $(this).data("type"),
                    RecordId: $("#RecordPublicId").val()
                },
                function(r) {
                    if (r.IsOk) {
                        $('#onayla2Modal').modal("toggle");
                        onayla2.trigger('click');
                    } else {
                        $("#onayla2Modal .modal-body").html('<div id="msg"></div>');
                        $("#onayla2Modal .modal-footer").show();
                        setUtil.alert({
                            container: '#onayla2Modal .modal-body #msg',
                            message: r.Message,
                            alertClass: 'alert-danger',
                            autoClose: false
                        });
                    }
                }
            );
        } else {
            setUtil.alert({
                container: '#onayla2Modal .modal-body #msg',
                message: 'Zaten onaylanmıştır. Lütfen kontrol ediniz!',
                alertClass: 'alert-danger',
                autoClose: false
            });
            setTimeout(() => {
                $('#onayla2Modal').modal("toggle");
            }, 2000);
        }
    });
});