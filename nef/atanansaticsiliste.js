$(function() {
    var musteriAdayıList = [];
    if ($('#ViewFilterPublicId').val() == 'EEA98870B509401F88D95EB68CF28359' || $('#ViewFilterPublicId').val() == '37B8161AE6EE4EF3B5FB9BC07297BC0D') {
        $('.well-xxs .pull-right').prepend('<a id="btnTopluAktivite" class="btn btn-sm btn-primary" style="margin-right:10px;">Satış Temsilcisine Ata</a>');
        $('.table-bordered').find('tbody tr').each(function(i, v) {
            $('<div class="custom-control custom-radio custom-control-inline">' +
                '<input id="chkLead" name="chk_' + i + '" value="2" type="checkbox" class="custom-control-input chk" />' +
                '</div>').appendTo($(this).find('td:eq(0)')).attr('data-publicId', $(this).data('id'));
        });
    }

    $('body').on('click', '#btnTopluAktivite', function() {
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

                var durumKontrol = $('input[type=radio]:checked').parents('tr').find('.durum')[0].innerText;
                if (durumKontrol != 'Müsait') {
                    setUtil.alert({
                        container: '#temsilciAtaModal .modal-body #msg',
                        message: "Lütfen durumu müsait olan bir temsilci seçiniz!",
                        alertClass: 'alert-danger',
                        autoClose: false
                    });

                } else {
                    data = {
                        RecordId: $('input[type=radio]:checked').parents('tr').data('id'),
                        CheckedList: leadList,
                    };
                    console.log(data);
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
                }

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
                    '<div id="temsilciler" ></div>',
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
        var url = 'https://nefwebapi.setcrm.com/api/data/VfOkuma?coId=' + coId + '&vfId=' + vfId;
        var url2 = 'https://localhost:44305/api/data/VfOkuma?coId=' + coId + '&vfId=' + vfId;
        var temsilciList = [];

        $.get(url,
            function(r) {
                if (r.IsOk === true) {
                    $('#temsilciTbl thead').html('');
                    $('#temsilciTbl tbody').html('');
                    var temsilciTbl = $('<table id="temsilciTbl" class="table table-bordered table-hover" style="width: 100%;overflow-x: scroll" />');
                    var thead = $('<thead />');
                    var newRow = $('<tr  style="background-color:lightblue;"/>');
                    newRow.append($('<th style="text-align: centre; background-color:lightblue;position: sticky;top: 0;z-index: 5;" "/>').text('Seçim'));
                    newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" "/>').text('Satış Temsilcisi'));
                    newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" "/>').text('Durum'));
                    newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" "/>').text('Güncelleme Zamanı'));
                    thead.append(newRow);
                    temsilciTbl.append(thead);
                    var tbody = $('<tbody />');
                    $.each(r.Records, function(i, v) {
                        var satisTemsilcisi = v.Values.first('FieldPublicId', '233B265DFA024334AFDF6CE72C3EBBB1').Value;
                        var durum = v.Values.first('FieldPublicId', '58B829181A0B41A281F296E2560BAA9F').Value;
                        var guncellemeTarihi = v.Values.first('FieldPublicId', 'E314A2ED8C1F49399785614EE551E50F').Value;
                        if (!temsilciList.includes(satisTemsilcisi)) {
                            temsilciList.push(satisTemsilcisi);
                            var newRow = $('<tr />').attr('data-id', v.PublicId);
                            newRow.append($('<td style="text-align: center;" />').append($('<input />', {
                                'id': 'chkTablo' + v.PublicId,
                                'name': 'chkTablo',
                                'value': '',
                                'type': 'radio',
                                'style': 'width:20px;height:20px;text-align:center',
                            })));

                            newRow.append($('<td class="satisTemsilcisi" style="text-align: left;" />').text(satisTemsilcisi));
                            newRow.append($('<td class="durum" style="text-align: left;" />').text(durum));
                            newRow.append($('<td style="text-align: left;" />').text(guncellemeTarihi));
                            tbody.append(newRow);
                            temsilciTbl.append(tbody);
                        }
                    });
                    $('#temsilciAtaModal').find('.modal-body #temsilciler').append(temsilciTbl);
                    $('#temsilciAtaModal').modal('toggle');
                } else {
                    $('#temsilciAtaModal').find('#msg').text(r.Message);
                }

            });
    }

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