$(function() {
    $(".table-responsive table tbody tr").each(function(i, v) {
        var id = $(v).data('id');
        $(v).find('td:last').prepend("<button type='button' data-recordid ='" + id + "'class='btn btn-success btn-xs btn-siparise-cevir' style='background:#16c768;border-color:#16c768;color:white;margin-top:4px;margin-right:3px;'><i class='fa fa-share-square'></i></button>");
        $(v).find('.btn-sm').addClass('btn-xs');
    });
    var talepRecordId = "";
    $('body').off('click',
        ".btn-siparise-cevir").on("click",
        ".btn-siparise-cevir",
        function() {
            $('#modalProducts').remove();
            window.setModal.Create({
                id: 'modalProducts',
                html: {
                    content: '',
                    header: 'Sipariş Ürünleri',
                    body: '<div id="risk" style="width: 100%;">',
                    footer: '<button type="button" class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>',
                },
                settings: {
                    widthClass: 'modal-full-width'
                }
            });
            $("#modalProducts").modal({
                backdrop: "static",
                keyboard: false,
            });

            talepRecordId = $(this).data('recordid');

            var realApi = "https://omniwebapi.setcrm.com/api/data/SipariseCevirUrunleriListele?recordId=" + talepRecordId,
                localApi = "https://localhost:44350/api/data/SipariseCevirUrunleriListele?recordId=" + talepRecordId;
            $.get(localApi,
                function(r) {
                    if (r.IsOk && r.TableList.length > 0) {
                        $('#urunlerTbl thead').html('');
                        $('#urunlerTbl tbody').html('');
                        var urunlerTbl = $('<table id="newTbl" style="width: 100%" />');
                        var thead = $('<thead />');
                        var newRow = $('<tr class="table table-bordered table-hover" style="background-color:lightblue"/>');
                        newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('Ürün Adı'));
                        newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('Birim'));
                        newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('Miktar'));
                        newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('Satıcı'));
                        newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('Ambalaj Brm.'));
                        newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('Birim Fiyat'));
                        newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('G.Miktar'));
                        newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('KDV'));
                        newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('Ödeme Tipi'));
                        newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('İnd%'));
                        newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('İnd2%'));
                        newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('Tklf.Notu'));
                        newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('Talep Notu'));
                        newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('Talep'));
                        newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('Sevk Edilecek Depo'));
                        newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('VT'));
                        newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('Kaydet'));
                        thead.append(newRow);
                        urunlerTbl.append(thead);
                        var tbody = $('<tbody />');
                        $.each(r.TableList, function(i, v) {
                            var newRow = $('<tr class="table table-bordered table-hover"/>');
                            newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(v.MALZEME_ADI));
                            newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(v.BIRIM));
                            newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(v.MIKTAR));
                            newRow.append($("<td  rowspan='1'>").append('<input id="satici_' + v.MALZEME_RECORDID + '" data-id="' + v.MALZEME_RECORDID + '" data-satici-name="' + v.SATICII + '"data-satici-id="' + v.SATICIRECORDID + '" class="satici " type="select" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE">'));

                            // newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(v.SATICII));
                            newRow.append($("<td rowspan='1' data-id='" + v.MALZEME_RECORDID + "'>").append('<input id="ambalajBirim_' + v.MALZEME_RECORDID + '" data-id="' + v.MALZEME_RECORDID + '" data-ambalaj-name="' + v.AMBALAJ_BIRIMI + '" data-ambalaj-id="' + v.AMBALAJ_BIRIMI_RECORDID + '" class="ambalaj-birimi" type="select" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE">'));
                            // newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(v.AMBALAJ_BIRIMI));
                            newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(v.BIRIMFIYAT));
                            newRow.append('<td  rowspan="1"><input id="' + String.format('gMiktar_{0}', i) + '" type="number"  style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;" /></td>');
                            // newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(" "));
                            newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(v.KDV)); //kdv
                            newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(" "));
                            newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(v.INDIRIMORANI));
                            newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(""));
                            newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(v.NOT));
                            newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(v.TALEPNOTU));
                            newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(v.TALEPNO));
                            newRow.append($('<td style="text-align: center;" class="col-md-1" data-depoid="' + v.SEVK_EDILECEK_DEPO_RECORDID + '" />').text(v.SEVK_EDILECEK_DEPO));
                            newRow.append(String.format("<td style='text-align:center;padding: 8px 12px;' ><a class='btn  btn-m btn-teklif-update-row' style='background:#004fee;border-color:#004fee;color:white;' value={0} data-urunid={0} >VT</a><a class='btn btn-m btn-teklif-row-hide' style='display:none;background:#004fee;border-color:#004fee;color:white;' value={0} data-urunid={0} ><i class='fa fa-table'></i></a></td>", v.MALZEME_RECORDID));
                            newRow.append(String.format("<td style='text-align:center;padding: 8px 12px;' ><a class='btn  btn-m btn-record-update-row' style='background:#16c768;border-color:#16c768;color:white;' value={0} data-urunid={0} ><i class='fas fa-save'></i></a></td>", v.MALZEME_RECORDID));

                            tbody.append(newRow);

                            urunlerTbl.append(tbody);
                        });
                        $('#risk').html('');

                        $('#risk').append(urunlerTbl);
                        prepareSelect2('.satici',
                            '/Summary/LookupFieldValues', {
                                coId: '73ECF2613F1049D4BA5CD64C4EE71258',
                                id: 'A27C020CCCDF468A863EF45C198CDE08',
                                viewFilterId: '3095C10E89FF46CBA8CCEF0869BECD24'
                            },
                            null,
                            false);


                    } else {
                        setUtil.alert({
                            container: '#msgTR',
                            message: r.Message,
                            alertClass: 'alert-danger',
                            autoClose: false
                        });
                    }
                    var ambalajBirimleri = $('.ambalaj-birimi');
                    $.each(ambalajBirimleri, function(i, v) {
                        prepareSelect2('#ambalajBirim_' + $(this).data('id'),
                            '/Summary/LookupFieldValues', {
                                id: 'FD48D1E5CF6A4F5D8AC385CFF8932BBF',
                                viewFilterId: '420D7F46748F45A091A4C758E84C03B3',
                                controllingRecordId: $(this).data('id'),
                                coId: 'B8381431FA0E47D58C7268BD31325C27',
                                itemId: "FD48D1E5CF6A4F5D8AC385CFF8932BBF",
                                groupIds: $(this).data('id'),
                                controllingId: "049D6733C32347CFBF144142B9A622B2",
                                q: "",
                                pageSize: 8
                            },
                            null,
                            false);
                        if (!String.isNullOrWhiteSpace($(this).data('ambalaj-id'))) {
                            $('#ambalajBirim_' + $(this).data('id')).select2('data', { id: $(this).data('ambalaj-id'), text: $(this).data('ambalaj-name') }).trigger('change');
                        }

                    });
                    var saticilar = $('.satici');
                    $.each(saticilar, function(i, v) {
                        if (!String.isNullOrWhiteSpace($(this).data('satici-id'))) {
                            $('#satici_' + $(this).data('id')).select2('data', { id: $(this).data('satici-id'), text: $(this).data('satici-name') }).trigger('change');
                        }
                    });
                }
            );


        });

    $('body').on("click",
        ".btn-teklif-update-row",
        function() {
            $(this).toggle();
            $(this).closest('td').find('.btn-teklif-row-hide').toggle();
            var tr = $(this).closest('tr');
            var urunId = $(this).data('urunid');

            $(String.format("#detailrow_{0}", urunId)).remove();
            tr.after(String.format('<tr id="detailrow_{0}" class="detail-row"style="background: rgb(131 220 94);"><td colspan="{1}"></td></tr>', urunId, 17, urunId));
            // $(String.format("#detailrow_{0} td", urunId)).append('<div id="txt" style="margin:0 auto;width: 100%;color:black">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>');

            $.get(String.format("https://localhost:44350/api/data/LrOkuma?recordId={0}&lrId={1}", urunId, "90D5AFC8E43E4D048C7C75CB6DAC574A"), "",
                function(r) {
                    $(String.format("#detailrow_{0} td", urunId)).html('');
                    var newTbl = $('<table id="newTbl" class="table table-bordered table-hover" style="width: 99%;table-layout:fixed;margin-bottom:0;margin-left: 16px;" />');
                    var thead = $('<thead />');
                    var newRow = $('<tr  style="background-color:lightblue"/>');
                    newRow.append($('<th style="text-align: left;"/>').text('Satıcı'));
                    newRow.append($('<th style="text-align: left;"/>').text('Ödeme Türü'));
                    newRow.append($('<th style="text-align: left;"/>').text('Fiyat'));
                    newRow.append($('<th style="text-align: left;"/>').text('Tarih'));
                    newRow.append($('<th style="text-align: left;"/>').text('Birim'));
                    newRow.append($('<th style="text-align: left;"/>').text('Varsayılan Teklif'));
                    newRow.append($('<th style="text-align: center;"/>').text('İşlem'));
                    thead.append(newRow);
                    newTbl.append(thead);
                    var tbody = $('<tbody />');

                    if (r.IsOk && r.Records.length > 0) {
                        $.each(r.Records, function(i, v) {
                            var TeklifRecordId = v.PublicId;
                            var colSatici = v.Values.first('FieldPublicId', 'A27C020CCCDF468A863EF45C198CDE08');
                            var colOdemeTuru = v.Values.first('FieldPublicId', '9C9422804C1B4300AB22AA5CC6C9AC87');
                            var colFiyat = v.Values.first('FieldPublicId', 'FB9B43C19AEE4C7EB2980BA2E12211FD');
                            var colTarih = v.Values.first('FieldPublicId', 'A6D7206ED46947A8A3E563D98B9EBAC3');
                            var colBirim = v.Values.first('FieldPublicId', '7384851706C045068C6ED70430473DCA');
                            var colVarsayilanTeklif = v.Values.first('FieldPublicId', '81D93DC6EC8B4C15A4845597578634A7');

                            var newRow = $('<tr />', {
                                'data-id': v.PublicId,
                            });
                            newRow.css('background-color', 'white');
                            newRow.append($("<td/>").append(colSatici !== null ? colSatici.Value : ""));
                            newRow.append($("<td/>").append(colOdemeTuru !== null ? colOdemeTuru.Value : ""));
                            newRow.append($("<td/>").append(colFiyat !== null ? colFiyat.Value : ""));
                            newRow.append($("<td/>").append(colTarih !== null ? colTarih.Value : ""));
                            newRow.append($("<td/>").append(colBirim !== null ? colBirim.Value : ""));
                            newRow.append($("<td/>").append(colVarsayilanTeklif !== null ? colVarsayilanTeklif.Value : ""));
                            newRow.append($("<td class='text-center'/>").append('<button style="margin-right:5px;margin-top: 3px;" class="btn btn-warning btn-varsayilan-teklif btn-sm" data-id="' + colSatici.SelectedItemPublicIds + '" data-saticiname="' + colSatici.Value + '" data-inputid="' + urunId + '" title="Varsayılan Teklif"><i class="fas fa-bolt"></i></button>'));
                            tbody.append(newRow);
                            newTbl.append(tbody);
                        });
                        $(String.format("tr[id=detailrow_{0}] td", urunId)).css('padding',
                            '15px');
                        $(String.format("#detailrow_{0} td", urunId)).html(newTbl);



                    } else {
                        setUtil.alert({
                            container: String.format("tr[id=detailrow_{0}] td", urunId),
                            message: "Varsayılan teklif bulunamadı.",
                            alertClass: 'alert-warning',
                            autoClose: false
                        });

                        $(String.format("tr[id=detailrow_{0}] td .alert", urunId)).css('margin-bottom', '0').css('background', 'rgb(131 220 94)').css({
                            'border-color': 'rgb(131 220 94)',
                            'color': 'black'
                        });
                        $(String.format("tr[id=detailrow_{0}] td", urunId)).css('padding', '0');
                    }
                }
            );
        }
    );

    $('body').on("click",
        ".btn-teklif-row-hide",
        function() {
            var urunId = $(this).data('urunid');
            $(String.format("#detailrow_{0}", urunId)).remove();
            $(this).toggle();
            $(this).closest('td').find('.btn-teklif-update-row').toggle();
        }
    );

    $('body').off('click',
        ".btn-varsayilan-teklif").on("click",
        ".btn-varsayilan-teklif",
        function() {
            var saticiName = $(this).data('saticiname');
            var saticiId = $(this).data('id');
            var selectInputId = $(this).data('inputid');
            $('#' + selectInputId).select2('data', { id: saticiId, text: saticiName }).trigger('change');
            notify('success', "Satıcı olarak " + saticiName + " atandı.");
        }
    );

    $('body').on("click",
        ".btn-record-update-row",
        function() {
            var tr = $(this).closest('tr');
            var urunId = $(this).data('urunid');
            var depoId = tr.find('td:eq(14)').data('depoid');
            var saticiId = $('#satici_' + urunId).val();
            console.log(talepRecordId, saticiId, depoId);
        }
    );

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