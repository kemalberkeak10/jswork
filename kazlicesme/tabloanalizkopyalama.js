$(function() {
    $(String.format('div[data-id={0}]', "3F054D84126D4723ABBF419E302FA9E0")).closest('div').prepend('<button type="button" class="btn btn-warning btn-sm pull-right btn-analizleri-kopyala" style="margin-right:5px;margin-top:2px;"><i class="fas fa-plus"></i> Analizleri Kopyala</button>');
    var panelList = [];
    $('body').on('lookupRelationLoadTriggerEvent', function(e, relationId) {
        if (relationId == '1AB149AAB11446FFA88C850BAF84AB5C') {
            if ($('[data-id=1AB149AAB11446FFA88C850BAF84AB5C]').find('table tbody tr').length < 1) {
                panelList.push({
                    "panelAdi": "İlk Gün Stabilite Analiz Sonuçları(Oda Sıcaklığı Aydınlık)",
                    "id": "3B2F97ECE92E4EE79737A05199505FAC"
                })
            }
        }
        if (relationId == 'E55FDF6E102C4BD18BD0E87C1027A86A') {
            if ($('[data-id=E55FDF6E102C4BD18BD0E87C1027A86A]').find('table tbody tr').length < 1) {
                panelList.push({
                    "panelAdi": "İlk Gün Stabilite Analiz Sonuçları(4 °C)",
                    "id": "672403ACF55142E8B8CA9FB785E2C37B",
                })
            }
        }

        if (relationId == '4ECA4FEA4D3B4AD3933A18000301E236') {
            if ($('[data-id=4ECA4FEA4D3B4AD3933A18000301E236]').find('table tbody tr').length < 1) {
                panelList.push({
                    "panelAdi": "İlk Gün Stabilite Analiz Sonuçları(45 °C)",
                    "id": "0971D8819FF8470282DE55C99CF8E435",
                })
            }
        }
        if (relationId == '0C4EEFADDD834D088BF11116A480045F') {
            if ($('[data-id=0C4EEFADDD834D088BF11116A480045F]').find('table tbody tr').length < 1) {
                panelList.push({
                    "panelAdi": "28. Gün Stabilite Analiz Sonuçları(Oda Sıcaklığı Karanlık)",
                    "id": "49D53611A5B54FA2B730CE606409AE79",
                })
            }
        }
        if (relationId == '4E2BABFB3BE5414AB1133DFE5C66C69D') {
            if ($('[data-id=4E2BABFB3BE5414AB1133DFE5C66C69D]').find('table tbody tr').length < 1) {
                panelList.push({
                    "panelAdi": "28.Gün Stabilite Analiz Sonuçları(Oda Sıcaklığı Aydınlık)",
                    "id": "AA628B90B5AF4AA594963E047F1017B6",
                })
            }
        }
        if (relationId == 'E0333C92D9C745F8A3E1550558E21957') {
            if ($('[data-id=E0333C92D9C745F8A3E1550558E21957]').find('table tbody tr').length < 1) {
                panelList.push({
                    "panelAdi": "28. Gün Stabilite Analiz Sonuçları(4 °C)",
                    "id": "B6AF96196DED41B38670B240CB54DF66",
                })
            }
        }
        if (relationId == 'D5F39C930F614E14A22943497B70C41C') {
            if ($('[data-id=D5F39C930F614E14A22943497B70C41C]').find('table tbody tr').length < 1) {
                panelList.push({
                    "panelAdi": "28. Gün Stabilite Analiz Sonuçları(45 °C)",
                    "id": "7544A0E18BD44CAAB695D5A06530D49D",
                })
            }
        }
        if (relationId == '998BCF3C1308491D95BC539B5B8371DA') {
            if ($('[data-id=998BCF3C1308491D95BC539B5B8371DA]').find('table tbody tr').length < 1) {
                panelList.push({
                    "panelAdi": "90. Gün Stabilite Analiz Sonuçları(Oda Sıcaklığı Karanlık)",
                    "id": "64516079D6B144BA97716EEAC38C6EC6",
                })
            }
        }
        if (relationId == 'B971175C71414881880AD8803740BD85') {
            if ($('[data-id=B971175C71414881880AD8803740BD85]').find('table tbody tr').length < 1) {
                panelList.push({
                    "panelAdi": "90.Gün Stabilite Analiz Sonuçları(Oda Sıcaklığı Aydınlık)",
                    "id": "EC931DA14FD344E092ABA42F3B771CD3",
                })
            }
        }
        if (relationId == '2E30AC354875497A9BACF7B7EB06CE3B') {
            if ($('[data-id=2E30AC354875497A9BACF7B7EB06CE3B]').find('table tbody tr').length < 1) {
                panelList.push({
                    "panelAdi": "90. Gün Stabilite Analiz Sonuçları(4 °C)",
                    "id": "CC3D12B57E4945DD863B206318E29450",
                })
            }
        }
        if (relationId == 'FB3AE0F45CAE401994F21E1DA0864063') {
            console.log('s')
            if ($('[data-id=FB3AE0F45CAE401994F21E1DA0864063]').find('table tbody tr').length < 1) {
                panelList.push({
                    "panelAdi": "90. Gün Stabilite Analiz Sonuçları(45 °C)",
                    "id": "3A0B8F214BEC4147B4DEEF527FB61B08",
                })
            }
        }
    });
    $('body').on('click', '.btn-analizleri-kopyala', function() {
        $('#loadingAnalizleriKopyala').remove();
        window.setModal.Create({
            id: 'loadingAnalizleriKopyala',
            html: {
                header: ' ',
                body: '<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>' +
                    '<div id="msg" style="margin:0 0 5px; width: 100%;"></div>',
                footer: ''
            }
        });

        $('#analizleriKopyalaModal').remove();
        window.setModal.Create({
            id: 'analizleriKopyalaModal',
            html: {
                header: 'Analizleri Kopyala',
                body: '',
                footer: '<button type="button" class="btn btn-default  btn-xl pull-right"  data-dismiss="modal" >Kapat</button>' +
                    '<button type="button" id="btnAnalizKopyala" class="btn btn-xl btn-success pull-right">Analizleri Kopyala</button>'
            }
        });
        $('#analizleriKopyalaModal .modal-body').html('<div id="msg" ></div>' +
            '<div id="analizPanelleri" ></div>');
        // $('#analizleriKopyalaModal .modal-dialog').css('height', '50%');
        $('#newTbl thead').html('');
        $('#newTbl tbody').html('');
        var newTbl = $('<table id="newTbl" class="table table-bordered table-hover" style="width: 100%;overflow-x: scroll" />');
        var thead = $('<thead />');
        var newRow = $('<tr  style="background-color:lightblue;"/>');
        newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;"><input id=selectAll class="form-check" type="checkbox"></th>'));
        newRow.append($('<th style="text-align: left; background-color:lightblue;position: sticky;top: 0;z-index: 5;" "/>').text('Tablo Adı'));
        thead.append(newRow);
        newTbl.append(thead);
        var tbody = $('<tbody />');

        $.each(panelList, function(i, v) {
            var newRow = $('<tr />').attr('data-id', v.id);
            newRow.append($('<td style="text-align: left;" />').append($('<input />', {
                'id': 'chkTablo',
                'name': 'chkTablo',
                'value': '',
                'class': 'form-check-input',
                'type': 'checkbox',
                'style': 'margin; auto;',
            })));
            newRow.append($('<td style="text-align: left;" />').text(v.panelAdi));
            tbody.append(newRow);
            newTbl.append(tbody);
        });
        $('#analizleriKopyalaModal').find('.modal-body #analizPanelleri').append(newTbl);
        $('#analizleriKopyalaModal').modal('toggle');
    });

    $('body').on('click', '#selectAll', function() {
        if ($('#selectAll').is(':checked')) {
            $('.form-check-input').prop('checked', true);
        } else {
            $('.form-check-input').prop('checked', false);
        }
    })

    $('body').on('click', '#btnAnalizKopyala', function() {
        var model = {
            RecordPublicId: $('#RecordPublicId').val(),
            StatibiliteTabloAdi: $('#analizleriKopyalaModal tbody tr input#chkTablo:checked').map(function() {
                return $(this).parents('tr').data('id')
            }).toArray()
        };
        if (model.StatibiliteTabloAdi.length > 0) {
            $('#analizleriKopyalaModal').modal('toggle');
            $('#loadingAnalizleriKopyala').modal('toggle');
            var url = 'https://kazlicesmewebapi.setcrm.com/api/data/AnalizKopyalama';
            var localurl = 'http://localhost:44358/api/data/AnalizKopyalama';
            $.post(url, model, function(r) {
                if (r.Status) {
                    $('#loadingAnalizleriKopyala .modal-body #txt').hide();
                    setUtil.alert({
                        container: '#loadingAnalizleriKopyala .modal-body #msg',
                        message: 'İşleminiz başarıyla tamamlandı. Sayfa yenileniyor lütfen bekleyiniz.',
                        alertClass: 'alert-success',
                        autoClose: true
                    });
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                } else {
                    $('#loadingAnalizleriKopyala .modal-body #txt').hide();
                    setUtil.alert({
                        container: '#loadingAnalizleriKopyala .modal-body #msg',
                        message: r.Message,
                        alertClass: 'alert-danger',
                        autoClose: false
                    });
                }
            });
        }
        setUtil.alert({
            container: '#analizleriKopyalaModal .modal-body #msg',
            message: 'En az 1 tane Panel Seçmelisiniz.',
            alertClass: 'alert-danger',
            autoClose: true
        });

    });

});