$(function() {
    var vfId = $("#ViewFilterPublicId").val();
    if (vfId == "75BDC9EDB9394DA09350F66F5E8F555F" || vfId == "E3358A852F5D4CC68D0D2E51C7D4CBC8" || vfId == "4A4ED191151F4EA087BBBE50E841526B" || vfId == "5FAD36ADA33D43EBA6D0B8AAF00BF54A" || vfId == "D5CB46A478C144BDB20725CCAA216FFC" || vfId == "EBC8CA9BB3C54A7FA49A2532366D4F67") {

        $('.table-bordered').find('tbody tr').each(function(i, v) {
            $(v).find('td:last').prepend('<div class="btn-group stok"> <button type="button" class="btn btn-sm btn-success stokpasif pull-left" style="margin-top: 4px;"> R</button></div>');
        });
        $('body').on('click',
            '.stokpasif',
            function() {
                var recordId = $(this).closest('td').parents('tr').data('id');
                var type = $(this).attr('data-type');
                ModalCreate(recordId);
            });
        $('body').on('click',
            '#btnRezervKayıt',
            function() {
                $('#btnRezervKayıt').prop('disabled', true);
                var newRecordId = $(this).data('id');
                var userId = userData.id;
                var aciklama = $('#aciklamaTxt').val();
                var miktar = $('#stokMiktar').val();
                data = {
                    RecordId: newRecordId,
                    UserId: userId,
                    Aciklama: aciklama,
                    Miktar: miktar,
                    Status: "D957D4F807074D4DA96A26DF90E316EF"
                }
                var url = 'https://nefwebapi.setcrm.com/api/data/RezervStokOlustur';
                var url2 = 'https://localhost:44305/api/data/RezervStokOlustur';
                $.post(url, data, function(r) {
                    if (r.Status) {
                        GetItems(data.RecordId);
                        notify("success", "Kayıt başarıyla eklendi.");
                        $('#btnRezervKayıt').prop('disabled', false);
                        $('#stokMiktar').val('');
                        $('#aciklamaTxt').val('');
                    } else {
                        notify("danger", r.Message);
                        $('#btnRezervKayıt').prop('disabled', false);
                    }
                });
            });

        function ModalCreate(recordId) {
            $('#modalStokPasif').remove();
            window.setModal.Create({
                id: 'modalStokPasif',
                html: {
                    header: ' <h3 class="text-center"><strong>Stok</strong></h3>',
                    body: '<div class="row justify-content-center align-items-center mx-auto d-flex"><div class="col-md-3"><input id="stokMiktar" placeholder="Miktar" type="number" min="0" class="form-control"></div><div class="col-md-4"><textarea rows="1" class="form-control" placeholder="Açıklama" id="aciklamaTxt" style="resize:vertical"></textarea></div><div class="col-md-3"><button class="form-control btn btn-success" id="btnRezervKayıt" data-id="' + recordId + '">Rezerv kaydı oluştur</button></div></div>' +
                        '<hr><div class="text-center"><h4 style="margin-top:0">MEVCUT YAPILAN REZERVLER</h4></div>' +
                        '<table id="rezervTbl" class="table">' +
                        '<thead>' +
                        '<th class="text-center" style="background:#d2f7f7; width:180px;">Ürun Adı</th>' +
                        '<th class="text-center" style="background:#d2f7f7; width:180px;">Miktar</th>' +
                        '<th class="text-center" style="background:#d2f7f7; width:180px;">Açıklama</th>' +
                        '<th class="text-center" style="background:#d2f7f7; width:180px;">Kayıt Yapan Kullanıcı</th>' +
                        '<th class="text-center" style="background:#d2f7f7; width:180px;">Kayıt Tarihi</th>' +
                        '<th class="text-center" style="background:#d2f7f7; width:180px;">Statü</th>' +
                        '<th class="text-center" style="background:#d2f7f7;width:100px;"></th>' +
                        '</thead>' +
                        '<tbody>' +
                        '</tbody>' +
                        '</table>',
                    footer: '<button data-dismiss="modal" class="btn btn-danger btn-sm btn-kapat">Kapat</button>'
                },
                // settings: {
                //     widthClass: 'modal-full-width'
                // }
            });
            $('#modalStokPasif .close').hide();
            $('#modalStokPasif .modal-dialog').css('width', '75%');
            $('#modalStokPasif').modal('toggle');
            var lrId = "38872474BFC546B4B42E187264DAEB5A";
            var url = 'https://nefwebapi.setcrm.com/api/data/LrOkuma?recordId=' + recordId + '&lrId=' + lrId;
            var url2 = 'https://localhost:44305/api/data/LrOkuma?recordId=' + recordId + '&lrId=' + lrId;
            $.get(url,
                function(r) {
                    if (r.IsOk == true) {
                        $.each(r.Records, function(i, v) {
                            var kullanici = v.Values.first('FieldPublicId', '51A31BBFD1094CB8BE7A5FB411B82263').Value;
                            var miktar = v.Values.first('FieldPublicId', '40E47D701C8348C7BFD738459206EBA2').Value;
                            var pasifeAlinmaTarihi = v.Values.first('FieldPublicId', '72535A96B9E2426EA9E55B5366E6B017').Value.split(' ')[0];;
                            var statu = v.Values.first('FieldPublicId', '133CA4A3086E440EB22CDDDA58974E2C').SelectedItemPublicIds;
                            var statuVal = v.Values.first('FieldPublicId', '133CA4A3086E440EB22CDDDA58974E2C').Value;
                            var urun = v.Values.first('FieldPublicId', '01810204D49A48D1A1870B63CB155C58').Value;
                            var aciklama = v.Values.first('FieldPublicId', '2EE1B6CCAC324C1091276E012350369D').Value;
                            var newRow = $('<tr>', {
                                'data-id': v.PublicId,
                                'data-rowid': i
                            });
                            newRow.append('<td style="width:20%"><span class="form-control urun text-center">' + urun + '</span></td><td style="width:10%"><span class="form-control miktar text-center">' + miktar + '</span></td><td><span class="form-control aciklama text-center">' + aciklama + '</span></td><td><span class="form-control kullanici text-center">' + kullanici + '</span></td><td><span class="form-control tarih text-center">' + pasifeAlinmaTarihi + '</span></td><td colspan="1" rowspan="1"><input class="statusSelect" id="status_' + v.PublicId + '" type="select"  style="resize:none;width:100%;"></td><td style="text-align:center;"  data-id="' + recordId + '"><button class="btn btn-success updateBtn"  id=' + String.format('updateBtn_{0}', v.PublicId) + '><i class="fa fa-save"></i></button></td>');
                            $('#rezervTbl tbody').append(newRow);
                            prepareSelect2(String.format('#status_{0}', v.PublicId), '/summary/fielditems', {
                                id: '133CA4A3086E440EB22CDDDA58974E2C'
                            }, null, null);
                            $(String.format('#status_{0}', v.PublicId)).select2('data', {
                                id: statu,
                                text: statuVal
                            })
                            $('.updateBtn').hide();
                        });

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

        function GetItems(recordId) {
            var lrId = "38872474BFC546B4B42E187264DAEB5A";
            var url = 'https://nefwebapi.setcrm.com/api/data/LrOkuma?recordId=' + recordId + '&lrId=' + lrId;
            var url2 = 'https://localhost:44305/api/data/LrOkuma?recordId=' + recordId + '&lrId=' + lrId;
            $.get(url,
                function(r) {
                    if (r.IsOk == true) {
                        var v = r.Records[0];
                        var kullanici = v.Values.first('FieldPublicId', '51A31BBFD1094CB8BE7A5FB411B82263').Value;
                        var miktar = v.Values.first('FieldPublicId', '40E47D701C8348C7BFD738459206EBA2').Value;
                        var pasifeAlinmaTarihi = v.Values.first('FieldPublicId', '72535A96B9E2426EA9E55B5366E6B017').Value.split(' ')[0];;
                        var statu = v.Values.first('FieldPublicId', '133CA4A3086E440EB22CDDDA58974E2C').SelectedItemPublicIds;
                        var statuVal = v.Values.first('FieldPublicId', '133CA4A3086E440EB22CDDDA58974E2C').Value;
                        var urun = v.Values.first('FieldPublicId', '01810204D49A48D1A1870B63CB155C58').Value;
                        var aciklama = v.Values.first('FieldPublicId', '2EE1B6CCAC324C1091276E012350369D').Value;
                        var newRow = $('<tr>', {
                            'data-id': v.PublicId,
                        });
                        newRow.append('<td style="width:20%"><span class="form-control urun text-center">' + urun + '</span></td><td style="width:10%"><span class="form-control miktar text-center">' + miktar + '</span></td><td><span class="form-control aciklama text-center">' + aciklama + '</span></td><td><span class="form-control kullanici text-center">' + kullanici + '</span></td><td><span class="form-control tarih text-center">' + pasifeAlinmaTarihi + '</span></td><td colspan="1" rowspan="1"><input class="statusSelect" id="status_' + v.PublicId + '" type="select"  style="resize:none;width:100%;"></td><td style="text-align:center;"  data-id="' + recordId + '"><button class="btn btn-success updateBtn"  id=' + String.format('updateBtn_{0}', v.PublicId) + '><i class="fa fa-save"></i></button></td>');
                        $('#rezervTbl tbody').prepend(newRow);
                        prepareSelect2(String.format('#status_{0}', v.PublicId), '/summary/fielditems', {
                            id: '133CA4A3086E440EB22CDDDA58974E2C'
                        }, null, null);
                        $(String.format('#status_{0}', v.PublicId)).select2('data', {
                            id: statu,
                            text: statuVal
                        })
                        $('.updateBtn').hide();
                    }
                });
        }
        $('body').on('change',
            '.statusSelect',
            function() {
                var recordId = $(this).closest('td').parents('tr').data('id');
                $('#updateBtn_' + recordId).show();
            });
        $('body').on('click',
            '.updateBtn',
            function() {
                var urunRecordId = $(this).closest('td').data('id');
                var miktar = $(this).closest('td').parents('tr').find('.miktar').text();
                var recordId = $(this).closest('td').parents('tr').data('id');
                var status = $('#status_' + recordId).val();
                data = {
                    RecordId: recordId,
                    Status: status,
                    Miktar: miktar,
                    UrunRecordId: urunRecordId
                }
                var url = 'https://nefwebapi.setcrm.com/api/data/RezervStokGuncelle';
                var url2 = 'https://localhost:44305/api/data/RezervStokGuncelle'
                $.post(url, data, function(r) {
                    if (r.Status) {
                        notify("success", "Kayıt başarıyla güncellendi.");
                        $('#updateBtn_' + recordId).hide();
                    } else {
                        notify("danger", r.message);
                    }
                });
            });
    }

});