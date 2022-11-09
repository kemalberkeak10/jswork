$(function() {
    var vfId = $("#ViewFilterPublicId").val();
    if (vfId !== "0E09864502AD46E5B8C63ED89B5A8780" && vfId !== "E3358A852F5D4CC68D0D2E51C7D4CBC8" && vfId !== "5FAD36ADA33D43EBA6D0B8AAF00BF54A" && vfId !== "4A4ED191151F4EA087BBBE50E841526B" && vfId !== "D5CB46A478C144BDB20725CCAA216FFC" && vfId !== "EBC8CA9BB3C54A7FA49A2532366D4F67") {

        $('.table-bordered').find('tbody tr').each(function(i, v) {
            $(v).find('td:last').prepend('<div class="btn-group dropup"> <button type="button" class="btn btn-sm btn-warning gorusenler pull-left" style="margin-top: 4px;"> G</button></div>');
            var td = $(v).find('td[data-id=9AB7726D07D84BE89B205A3BE17C1C23]');

            if (String.isNullOrWhiteSpace(td.data('value'))) {
                $(v).find('.gorusenler').prop('disabled', true);
            }
        });
        $('body').on('click',
            '.gorusenler',
            function() {
                $('.gorusenler').prop('disabled', true);
                var recordId = $(this).closest('td').parents('tr').data('id');
                debugger;
                var type = $(this).attr('data-type');
                ModalCreate();
                GetItems(recordId);
            });

        function ModalCreate() {
            $('#modalGorusenler').remove();
            window.setModal.Create({
                id: 'modalGorusenler',
                html: {
                    header: ' <h3 class="text-center"><strong>Görüşen Kullanıcılar</strong></h3>',
                    body: '<table id="newTbl" class="table">' +
                        '<thead>' +
                        '<th style="background:#d2f7f7; width:300px; tex-align:center">Görüşen Kullanıcı</th>' +
                        '<th style="background:#d2f7f7; width:300px; tex-align:center">Durumu</th>' +
                        '</thead>' +
                        '<tbody>' +
                        '</tbody>' +
                        '</table>',
                    footer: '<button data-dismiss="modal" class="btn btn-danger btn-sm btn-kapat">Kapat</button>'
                }
            });
            $('#modalGorusenler').modal('toggle');
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
            debugger;

            // var url = 'https://nefwebapi.setcrm.com/api/data/GetKullanici?recordId=' + recordId;
            var lrId = "9FF03CAAB41841FF878292B6C2FB944C";
            var url = 'https://nefwebapi.setcrm.com/api/data/LrOkuma?recordId=' + recordId + '&lrId=' + lrId;
            var url2 = 'https://localhost:44305/api/data/GetKullanici?recordId=' + recordId;
            var toplamStok = 0;
            debugger;

            $.get(url,
                function(r) {
                    if (r.IsOk == true) {
                        $.each(r.Records, function(i, v) {

                            var kullanici = v.Values.first('FieldPublicId', '660CFEB4F00447D7ADE92D9E1BDCEC40').Value;
                            var islem = v.Values.first('FieldPublicId', '6372E86588BB48DBB99FAB021D0BC978').Value;
                            var statu = v.Values.first('FieldPublicId', 'CA0D2176B57C4C6C8A5925CC226B7C5B').SelectedItemPublicIds;
                            var newRow = $('<tr>', {
                                'data-id': i,
                                'data-rowid': i
                            });

                            if (statu == "8A6BD7B325D047EFA618D3A4232802E7") {
                                newRow.append('<td style="width:300px;"><input id="' + String.format('WhsName_{0}', i) + '" type="text" class="form-control urun-sira" disabled value="' + kullanici + '"></td>');
                                newRow.append('<td style="width:300px;"><input id="' + String.format('Islem_{0}', i) + '" type="text" class="form-control islem" disabled value="' + islem + '"></td>');
                                $('#newTbl tbody').append(newRow);
                            }

                        });
                    } else {
                        notify("danger", r.message);
                        $('.gorusenler').prop('disabled', false);

                    }
                });
        }
        $('body').on('click',
            '.btn-kapat',
            function() {
                $('.gorusenler').prop('disabled', false);
                $('.table-bordered').find('tbody tr').each(function(i, v) {
                    var td = $(v).find('td[data-id=9AB7726D07D84BE89B205A3BE17C1C23]');

                    if (String.isNullOrWhiteSpace(td.data('value'))) {
                        $(v).find('.gorusenler').prop('disabled', true);
                    }
                });
            });

    }

});