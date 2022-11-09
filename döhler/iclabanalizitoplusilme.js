$(function() {
    $('body').on('lookupRelationLoadTriggerEvent', function(e, relationId) {
        if (relationId == '93744A13074A4C0BB1C2387074711FE4') {
            var $relation = $(String.format('div[data-id={0}]', relationId));
            $relation.find('#btnTopluIcAnalizSil').remove();
            $(('div[data-id=93744A13074A4C0BB1C2387074711FE4]')).prepend('<a id="btnTopluIcAnalizSil" class="btn btn-sm btn-danger pull-right"  style="margin-right:10px;" >Toplu Sil</a>');
            var DOFPanel = $('[data-id=93744A13074A4C0BB1C2387074711FE4]');
            var trList = DOFPanel.find('.no-more-table tbody tr');
            $.each(trList, function(i, el) {
                $(this).find('td:eq(0)').prepend('<input type="checkbox" class="form-check-input sec"/>');
            });
            $('#modalTopluIcLabAnaliziSil').remove();
            window.setModal.Create({
                id: 'modalTopluIcLabAnaliziSil',
                html: {
                    header: 'Toplu Sil',

                    body: '<div id="loading" style="margin:0 0 5px; width: 100%;display:none;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>',
                    footer: ''
                },
                settings: {
                    widthClass: 'modal-lg'
                },
            });
            $("#modalTopluIcLabAnaliziSil .modal-body").find('#loading').show();
            $('#btnTopluIcAnalizSil').on('click', function() {
                var checkedList = $('.sec');
                var recordList = [];
                $.each(checkedList, function(i, el) {
                    if ($(this).prop('checked')) {
                        var recordId = $(this).parents('tr').attr('data-id');
                        recordList.push({ recordId: recordId });
                    }
                });
                if (recordList.length < 1) {
                    notify('warning', 'Lütfen silinecek kayıt seçiniz.');
                } else {
                    $('#modalTopluIcLabAnaliziSil').modal('toggle');
                    $('#btnTopluIcAnalizSil').hide();
                    var localUrl = 'http://localhost:55073/api/data/IcAnalizTopluSil';
                    var url = 'https://dohlerwebapi.setcrm.com/api/data/IcAnalizTopluSil';
                    data = {}
                    data.DeletedRecordsList = recordList
                    $.post(url, data, function(result) {
                        if (result.Status) {
                            $('#modalTopluIcLabAnaliziSil').modal('toggle');
                            notify("success", "İşlem başarıyla tamamlandı.Sayfa yenileniyor lütfen bekleyiniz...");
                            setTimeout(() => {
                                window.location.reload();
                            }, 500);
                        } else {
                            $('#modalTopluIcLabAnaliziSil').modal('toggle');
                            notify("danger", result.Message);
                        }
                    });
                }
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