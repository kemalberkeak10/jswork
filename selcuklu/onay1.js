$(function() {
    var onayla1 = $(".btn-br-actions[data-publicid=AB4CDAC5275A46A4BB99465A64D4E1E0]");
    onayla1.hide();
    onayla1.closest('td').append('<a class="btn btn-sm btn-warning btn-onayla-1" data-type="1">Onayla 1</a>');

    $("body").on("click", ".btn-onayla-1", function() {
        $('#onayla1Modal').remove();
        window.setModal.Create({
            id: 'onayla1Modal',
            html: {
                header: 'Onayla 1',
                body: '<div id="msg"></div>',
                footer: '<button data-dismiss="modal" class="btn btn-primary btn-sm">Vazgeç</button>'
            }
        });
        $('#onayla1Modal').modal("toggle");

        var onay1 = $('label[for=281D0F6F66A5478AACC41526DB4D5F28]').parent().data('publicids');
        //var onayBelgesiDurum = $("label[for=9666C67310FB4374BCCE42F6A2B140C2]").closest('div').data("publicids");
        //if (onayBelgesiDurum === "B9E35F5F6E8440AAADD2A30B3AE56122") {
        //B10F1A8EECB44571B7578394E2A93C17
        if (onay1 !== "B10F1A8EECB44571B7578394E2A93C17") {
            //onaylandı
            $("#onayla1Modal .modal-body").html('<div id="loading" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>');
            $("#onayla1Modal .modal-footer").hide();
            var url = 'https://selcuklukentapi.setcrm.com/api/data/Approve';
            var urlLocal = 'http://localhost:61802/api/data/Approve';
            $.post(url, {
                    Type: $(this).data("type"),
                    RecordId: $("#RecordPublicId").val()
                },
                function(r) {
                    if (r.IsOk) {
                        $('#onayla1Modal').modal("toggle");
                        onayla1.trigger('click');
                    } else {
                        $("#onayla1Modal .modal-body").html('<div id="msg"></div>');
                        $("#onayla1Modal .modal-footer").show();
                        setUtil.alert({
                            container: '#onayla1Modal .modal-body #msg',
                            message: r.Message,
                            alertClass: 'alert-danger',
                            autoClose: false
                        });
                    }
                }
            );
        } else {
            setUtil.alert({
                container: '#onayla1Modal .modal-body #msg',
                message: 'Zaten onaylanmıştır. Lütfen kontrol ediniz!',
                alertClass: 'alert-danger',
                autoClose: false
            });

            setTimeout(() => {
                $('#onayla1Modal').modal("toggle");
            }, 2000);
        }
        // } else {
        //     setUtil.alert({
        //         container: '#onayla1Modal .modal-body #msg',
        //         message: 'Onay belgesi durumu talep edildi olması gerekmektedir. Lütfen kontrol ediniz!',
        //         alertClass: 'alert-danger',
        //         autoClose: false
        //     });
        // }
    });
});