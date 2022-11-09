$(function() {
    var musteriAdayıList = [];
    if ($('#ViewFilterPublicId').val() == 'EEA98870B509401F88D95EB68CF28359' || $('#ViewFilterPublicId').val() == '37B8161AE6EE4EF3B5FB9BC07297BC0D' || $('[data-viewfilterpublicid="37B8161AE6EE4EF3B5FB9BC07297BC0D"]').length > 0 || $('[data-viewfilterpublicid="EEA98870B509401F88D95EB68CF28359"]').length > 0) {
        $('.well-xxs .pull-right').prepend('<a id="btnTopluAktivite" class="btn btn-sm btn-primary" style="margin-right:10px;">Satış Temsilcisine Ata</a>');
    }
    if ($('#ViewFilterPublicId').val() == '966F804FF1CC4937B2AF3DA51C6485FC' || $('[data-viewfilterpublicid="966F804FF1CC4937B2AF3DA51C6485FC"]').length > 0) {
        $('.well-xxs .pull-right').prepend('<a id="btnTopluAtananSatisci" class="btn btn-sm btn-primary" style="margin-right:10px;">Satış Temsilcisi Değiştir</a>');
    }
    if ($('#ViewFilterPublicId').val() == '56D3F204798747A2806671CD8AC67535' || $('#ViewFilterPublicId').val() == '49080BB5384B46FC8B6CDAC388427901' || $('[data-viewfilterpublicid="56D3F204798747A2806671CD8AC67535"]').length > 0 || $('[data-viewfilterpublicid="49080BB5384B46FC8B6CDAC388427901"]').length > 0) {
        $('.well-xxs .pull-right').prepend('<a id="btnTopluAtananSatisci" class="btn btn-sm btn-primary" style="margin-right:10px;">Satış Temsilcisi Değiştir</a>');
        $('.well-xxs .pull-right').prepend('<a id="btnTopluAktivite" class="btn btn-sm btn-primary" style="margin-right:10px;">Satış Temsilcisine Ata</a>');
    }
    if ($('#btnTopluAtananSatisci').length > 0 || $('#btnTopluAktivite').length > 0) {
        $('.table-bordered').find('thead tr').each(function(i, v) {
            if ($('.vf-all-check-toggle').length < 1) {
                $("<input type='checkbox' class='vf-all-check-toggle'>").appendTo($(this).find('th:eq(0)'));
                $('.table-bordered').find('tbody tr').each(function(i, v) {
                    $('<div class="custom-control custom-radio custom-control-inline">' +
                        '<input id="chkLead" name="chk_' + i + '" value="2" type="checkbox" class="custom-control-input chk" />' +
                        '</div>').appendTo($(this).find('td:eq(0)')).attr('data-publicId', $(this).data('id'));
                });
            }

        });

        // $('.table-responsive').find('thead tr').each(function(i, v) {
        //     $(v).prepend("<th><input type='checkbox' class='vf-all-check-toggle' style='margin-left:3px;margin-right:3px;'></th>");
        // });
    }

    $(".vf-all-check-toggle").on("change",
        function() {
            var checkBoxes = $(".chk");
            checkBoxes.prop("checked", !checkBoxes.prop("checked"));
        });
    $('body').on('click',
        '#btnTopluAktivite',
        function() {
            // ModalCreate();
            var checkedValues = $('input[type=checkbox]:checked').length;
            var list = $('input[type=checkbox]:checked').parents('tr').dataset;

            // var arr = $('input[type=checkbox]:checked').map(function(m) {
            //     return $(this).parents('tr').data('id')
            // }).toArray();

            prepareSelect2('#satisTemsilcisi', '/Summary/LookupFieldValues', {
                coId: '133335DAB87346F1B2A6AF043F82FC6A',
                id: 'C52F0C3D8D974FC3A3D42E81B88DF5AB',
                viewFilterId: '3BA426D8551E4608A4390C70938ED154'
            }, null, false); //çoklu seçim

            if (checkedValues < 1) {
                notify("danger", "Lütfen en az bir tane müşteri seçiniz!");
            } else {
                GetItems();
            }
        });

    $('body').on('click',
        '#btnAta',
        function() {
            var modalChecked = $('input[type=radio]:checked').length;
            if (modalChecked > 0) {
                var trList = $('.table-bordered tbody tr');
                var data = {};
                var leadList = [];
                $.each(trList, function(i, v) {
                    if ($(v).find('.custom-control-input:checked').length > 0) {
                        leadList.push($(v).closest('tr').data('id'));
                    }
                })
                data = {
                    RecordId: $('input[type=radio]:checked').parents('tr').data('id'),
                    CheckedList: leadList,
                };
                var localUrl = 'https://localhost:44305/api/data/SatisTemsilcisiAtama';
                var realUrl = 'https://nefwebapi.setcrm.com/api/data/SatisTemsilcisiAtama';
                $.post(realUrl,
                    data,
                    function(r) {
                        if (r.Status) {
                            setUtil.alert({
                                container: '#temsilciAtaModal .modal-body #msg',
                                message: "İşlem başarılı sayfa yenileniyor.",
                                alertClass: 'alert-success',
                                autoClose: false
                            });
                            setTimeout(function() {
                                window.location.reload();
                            }, 1000);
                        } else {
                            setUtil.alert({
                                container: '#temsilciAtaModal .modal-body #msg',
                                message: r.message,
                                alertClass: 'alert-danger',
                                autoClose: false
                            });
                        }
                    });
            } else {
                notify("danger", "Lütfen bir tane temsilci seçiniz.");

            }
        });

    function GetItems() {
        $('#modalLoading').remove();
        window.setModal.Create({
            id: 'modalLoading',
            html: {
                header: ' ',
                body: '<div id="errorMsg"></div>' +
                    '<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>',
                footer: ''
            }
        });
        $('#temsilciAtaModal').remove();
        window.setModal.Create({
            id: 'temsilciAtaModal',
            html: {
                header: 'Satış Temsilcisine Ata',
                body: '<div id="msg" ></div>' +
                    '<div style="width:300px;margin-bottom:10px;"><input id="searchSatisTemsilcisi" type="text"  class="form-control"></div><hr><div class="hizli-ekle-records"><h4 style="margin-top:0"><i class="fa fa-edit"></i> Satış Temsilcileri</h4></div>' +
                    '<div id="temsilciler" ></div>' +
                    '<table id="temsilciTbl" class="table table-bordered table-hover" style="width: 100%;overflow-x: scroll">' +
                    '<thead>' +
                    '<th style="text-align: centre; background-color:lightblue;position: sticky;top: 0;z-index: 5;">Seçim</th>' +
                    '<th style="text-align: centre; background-color:lightblue;position: sticky;top: 0;z-index: 5;">Satış Temsilcisi</th>' +
                    '<th style="text-align: centre; background-color:lightblue;position: sticky;top: 0;z-index: 5;">Durum</th>' +
                    '<th style="text-align: centre; background-color:lightblue;position: sticky;top: 0;z-index: 5;">Güncelleme Zamanı</th>' +
                    '<thead>' +
                    '<tbody>' +
                    '</tbody>' +
                    '</table>',
                footer: '<button id="btnAta" class="btn btn-success btn-sm">Ata</button><button data-dismiss="modal" class="btn btn-danger btn-sm">Kapat</button>'
            }
        });
        $('#temsilciAtaModal .modal-body').css('max-height',
            '');
        $('#temsilciAtaModal .modal-body').css('height',
            '300px');
        $('#temsilciAtaModal .modal-dialog').css('width',
            '50%');
        var coId = "C72E5DAD28B54583BDE5D82156895BA2";
        var vfId = "8CAE6DCE9369447DB1AC5362613D8C22";
        var url = 'https://nefwebapi.setcrm.com/api/data/SatisTemsilcisiVfOkuma';
        var url2 = 'https://localhost:44305/api/data/SatisTemsilcisiVfOkuma';
        var temsilciList = [];
        $('#temsilciAtaModal').modal('toggle');
        $.get(url,
            function(r) {
                if (r.Status) {
                    // $('#temsilciTbl thead').html('');
                    $('#temsilciTbl tbody').html('');
                    //var temsilciTbl = $('<table id="temsilciTbl" class="table table-bordered table-hover" style="width: 100%;overflow-x: scroll" />');
                    // var thead = $('<thead />');
                    // var newRow = $('<tr  style="background-color:lightblue;"/>');
                    // newRow.append($('<th style="text-align: centre; background-color:lightblue;position: sticky;top: 0;z-index: 5;" "/>').text('Seçim'));
                    // newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" "/>').text('Satış Temsilcisi'));
                    // newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" "/>').text('Durum'));
                    // newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" "/>').text('Güncelleme Zamanı'));
                    // thead.append(newRow);
                    // temsilciTbl.append(thead);
                    var tbody = $('<tbody />');
                    $.each(r.modelList, function(i, v) {
                        var satisTemsilcisi = v.SatisTemsilcisi;
                        var durum = v.Durum;
                        var guncellemeTarihi = v.GuncellenmeZamani;
                        // if (!temsilciList.includes(satisTemsilcisi)) {
                        //     temsilciList.push(satisTemsilcisi);
                        var newRow = $('<tr />').attr('data-id', v.RecordId);
                        newRow.append($('<td style="text-align: center;" />').append($('<input />', {
                            'id': 'chkTablo' + v.RecordId,
                            'name': 'chkTablo',
                            'value': '',
                            'type': 'radio',
                            'style': 'width:20px;height:20px;text-align:center',
                        })));
                        newRow.append($('<td class="satisTemsilcisi" style="text-align: left;" />').text(satisTemsilcisi));
                        newRow.append($('<td class="durum" style="text-align: left;" />').text(durum));
                        newRow.append($('<td style="text-align: left;" />').text(guncellemeTarihi));
                        tbody.append(newRow);
                        $('#temsilciTbl').append(tbody);
                        // }
                    });

                    $('#temsilciAtaModal').find('.modal-body #temsilciler').append(temsilciTbl);
                    // $('#temsilciAtaModal').modal('toggle');
                } else {
                    // if (r.Records.length == 0) {
                    //     notify("warning", "Şuan da müsait durumda satış temsilcisi bulunmamaktadır.");
                    //     return;
                    // }
                    $('#temsilciAtaModal').find('#msg').text(r.Message);
                }

            });
        $("body").on("keyup",
            '#searchSatisTemsilcisi',
            function(e) {
                var trList = $('#temsilciAtaModal .modal-body #temsilciler #temsilciTbl tbody tr');
                var value = $(this).val().toLowerCase();
                trList.filter(function() {
                    $(this).toggle($(this).find('td:eq(1)').text().trim().toLowerCase().indexOf(value) != -1);
                });
            });
    }

    $('body').on('click',
        '#btnTopluAtananSatisci',
        function() {
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
                                message: r.Message,
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
});