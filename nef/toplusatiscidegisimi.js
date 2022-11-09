$(function() {
    if ($('#ViewFilterPublicId').val() == '966F804FF1CC4937B2AF3DA51C6485FC') {
        $('.well-xxs .pull-right').prepend('<a id="btnTopluAtananSatisci" class="btn btn-sm btn-primary" style="margin-right:10px;">Satış Temsilcisi Değiştir</a>');
        $(".table-responsive table tbody tr").each(function(i, v) {
            $(v).prepend("<td><input type='checkbox' class='chk' style='margin-left:3px;margin-right:3px;'></td>");
        });
        $(".table-responsive table thead tr").each(function(i, v) {
            $(v).prepend("<th><input type='checkbox' class='vf-all-check-toggle' style='margin-left:3px;margin-right:3px;'></th>");
        });
    }
    $(".vf-all-check-toggle").on("change",
        function() {
            var checkBoxes = $(".chk");
            checkBoxes.prop("checked", !checkBoxes.prop("checked"));
        });

    $('body').on('click', '#btnTopluAtananSatisci', function() {
        ModalCreate();
        $('#btnOnay').hide();
        $('#txt').hide();
        var checkedValues = $('input[type=checkbox]:checked').length;

        prepareSelect2('#satisTemsilcisi', '/Summary/organizationalunititems', {
            publicId: '39FDF2A698D746299C9D356C8A91D660',
            name: 'User',
            filterType: 'UserGroup',
            groupIds: "2928DC9AB5FF409CBABC7777F738E91A",
            depth: 2,
            includeItSelf: false
        }, null, false);
        if (checkedValues < 1) {
            $('#selectBox').hide();
            setUtil.alert({
                container: '#satisciMsg',
                message: "Lütfen en az bir tane kayıt seçiniz.",
                alertClass: 'alert-danger',
                autoClose: false
            });
        } else {
            $('#satisTemsilcisi').show();
            $('#btnOnay').show();
        }
    });
    $('body').on('click',
        '#btnOnay',
        function() {
            $('#modalAtananSatisci .modal-footer').hide();
            $('#txt').show();
            $('#selectBox').hide();
            if (!String.isNullOrWhiteSpace($('#satisTemsilcisi').select2('data'))) {
                var trList = $('.table-bordered tbody tr');
                var data = {};
                var leadList = [];
                $.each(trList, function(i, v) {
                    if ($(v).find('.chk:checked').length > 0) {
                        leadList.push($(v).closest('tr').data('id'));
                    }
                })
                data = {
                    AtananTemsilciId: $('#satisTemsilcisi').select2('data').id,
                    CheckedList: leadList,
                };
                var localUrl = 'https://localhost:44305/api/data/TopluAtananSatisciDegistir';
                var realUrl = 'https://nefwebapi.setcrm.com/api/data/TopluAtananSatisciDegistir';
                $.post(realUrl,
                    data,
                    function(r) {
                        if (r.Status) {
                            $('#txt').hide();
                            notify("success", "İşlem başarıyla tamamlandı");
                            window.location.reload();
                            // setUtil.alert({
                            //     container: '#satisciMsg',
                            //     message: "İşlem başarılı sayfa yenileniyor lütfen bekleyiniz.",
                            //     alertClass: 'alert-success',
                            //     autoClose: false
                            // });
                            // setTimeout(function() {
                            //     window.location.reload();
                            // }, 1000);
                        } else {
                            $('#txt').hide();
                            setUtil.alert({
                                container: '#satisciMsg',
                                message: r.message,
                                alertClass: 'alert-danger',
                                autoClose: false
                            });
                        }
                    });
            } else {
                $('#txt').hide();
                setUtil.alert({
                    container: '#satisciMsg',
                    message: "Lütfen satış temsilcisi seçiniz.",
                    alertClass: 'alert-danger',
                    autoClose: false
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

    function ModalCreate() {
        $('#modalAtananSatisci').remove();
        window.setModal.Create({
            id: 'modalAtananSatisci',
            html: {
                header: 'Satış Temsilcisi Değiştir',
                body: '<div id="satisciMsg"></div>' +
                    '<div id="selectBox"><div id="satisTemsilcisi"/></div>' +
                    '<div id="txt" style="margin:0 0 5px; width: 100%;display:none;">İşleminiz yapılıyor, lütfen bekleyiniz... <br/> <img src="/Public/img/loading_bar.gif"></div><div id="msg"></div>',

                footer: '<button id="btnOnay" type="button" class="btn btn-sm btn-success">Onayla</button><button data-dismiss="modal" class="btn btn-danger btn-sm">Kapat</button>'
            }
        });
        $('#modalAtananSatisci').modal('toggle');
    }
})