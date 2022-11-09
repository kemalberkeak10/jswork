$(function() {
    $('body').on('lookupRelationLoadTriggerEvent', function(e, relationId) {
        if (relationId == 'CA3C7BECD0374FB99803C5B4C301FD3D') {
            var AltParametrePanel = $('[data-id=CA3C7BECD0374FB99803C5B4C301FD3D]');
            var trList = AltParametrePanel.find('.no-more-table tbody tr');
            $.each(trList, function(i, el) {
                $(this).find('td:last').prepend("<button type='button' data-recordId='" + $(this).attr('data-id') + "' class='btn btn-success btn-sm lbtn' style='margin-right:5px;margin-top: 3px;'>L</button>");
            });
            $('#modalLButton').remove();
            window.setModal.Create({
                id: 'modalLButton',
                html: {
                    header: 'Limit Çekme',

                    body: '<div id="loading" style="margin:0 0 5px; width: 100%;display:none;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>',
                    footer: ''
                },
                settings: {
                    widthClass: 'modal-lg'
                },
            });
            $("#modalLButton .modal-body").find('#loading').show();
            $('.lbtn').on('click', function() {
                var recordId = $(this).attr('data-recordId');
                $('#modalLButton').modal('toggle');
                data = {};
                var localUrl = 'http://localhost:55073/api/data/LButtonLimitCekme?recordId=' + recordId;
                var url = 'https://dohlerwebapi.setcrm.com/api/data/LButtonLimitCekme?recordId=' + recordId;
                $.post(localUrl, data, function(result) {
                    if (result.Status) {
                        $('#modalLButton').modal('toggle');
                        notify("success", "İşlem başarıyla tamamlandı.Sayfa yenileniyor lütfen bekleyiniz...");
                        setTimeout(() => {
                            window.location.reload();
                        }, 500);
                    } else {
                        $('#modalLButton').modal('toggle');
                        notify("danger", result.Message);
                    }
                });
            });
        }
    });

    function notify(type, message) {
        $.notify({
            icon: type === "success" ? 'fas fa-check-double' : 'fas fa-times-circle',
            message: message
        }, {
            z_index: '9999999',
            type: type,
            placement: {
                from: "top",
                align: "right"
            },
            offset: 50,
            animate: {
                enter: 'animated flipInY',
                exit: 'animated flipOutX'
            },
        });
    }
});