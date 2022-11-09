$(function() {
    $('body').on('lookupRelationLoadTriggerEvent', function(e, relationId) {
        if (relationId == '7F53942A006F4196B6C781417FAD08F2') {
            var $relation = $(String.format('div[data-id={0}]', relationId));
            $relation.find('#btnTopluSil').remove();
            $(('div[data-id=7F53942A006F4196B6C781417FAD08F2]')).prepend('<a id="btnTopluSil" class="btn btn-sm btn-danger pull-right"  style="margin-right:10px;" >Toplu Sil</a>');
            var DOFPanel = $('[data-id=7F53942A006F4196B6C781417FAD08F2]');
            var trList = DOFPanel.find('.no-more-table tbody tr');
            $.each(trList, function(i, el) {
                $(this).find('td:eq(0)').prepend('<input type="checkbox" class="form-check-input sec"/>');
            });
            $('#btnTopluSil').on('click', function() {
                var checkedList = $('.sec');
                var recordList = [];
                $.each(checkedList, function(i, el) {
                    if ($(this).prop('checked')) {
                        var recordId = $(this).parents('tr').attr('data-id');
                        recordList.push({
                            recordId: recordId
                        });
                    }
                });
                console.log(recordList);
                if (recordList.length < 1) {
                    notify('warning', 'Lütfen silinecek kayıt seçiniz.');
                } else {
                    $('#btnTopluSil').hide();
                    var localUrl = 'http://localhost:55073/api/data/DofTopluSilme';
                    var url = 'https://dohlerwebapi.setcrm.com/api/data/DofTopluSilme';
                    data = {}
                    data.DeletedRecordsList = recordList
                        // $.ajax({
                        //     type: "POST",
                        //     url: localUrl,
                        //     async: true,
                        //     data: {
                        //         deletedRecordsList: recordList
                        //     },
                        //     success: function(result) {
                        //         if (result.Status) {
                        //             notify("success", "İşlem başarıyla tamamlandı.Sayfa yenileniyor lütfen bekleyiniz...");
                        //             setTimeout(() => {
                        //                 window.location.reload();
                        //             }, 500);
                        //         } else {
                        //             notify("danger", result.Message);
                        //         }
                        //     }
                        // });
                    $.post(url, data, function(result) {
                        if (result.Status) {
                            notify("success", "İşlem başarıyla tamamlandı.Sayfa yenileniyor lütfen bekleyiniz...");
                            setTimeout(() => {
                                window.location.reload();
                            }, 500);
                        } else {
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