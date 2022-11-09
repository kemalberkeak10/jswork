$(function() {
    $('.well .pull-right:eq(0)').prepend('<a id="btnTopluServis" class="btn btn-sm btn-info" style="margin-right:10px;">Toplu Servis Girisi</a>');
    var sira = 0;
    var modelList = {
        TopluServis: []
    };
    //var List = [];
    $('body').on('click', '#btnTopluServis', function() {
        $('#modalServisIslemleri').remove();
        window.setModal.Create({
            id: 'modalServisIslemleri',
            html: {
                header: '<i class="fas fa-check-circle"></i> Toplu Servis Girisi',
                body: String.format('<div class="servis-islemleri-new-row"><h4 style="margin-top:0"><i class="fa fa-info"></i> Yeni Kayit Ekle</h4></div><hr><div class="servis-islemleri-records"><h4 style="margin-top:0"><i class="fa fa-info"></i> Eklenen Kayitlar </h4></div>'),
                footer: '<button id="btnKaydetServis" type="button" class="btn btn-sm btn-success" >Kaydet</button>' + '<button class="btn btn-danger btn-sm" data-dismiss="modal" onclick="window.location.reload()">Kapat</button>'
            },
            settings: {
                widthClass: 'modal-full-width'
            }
        });
        var modalBody = $('#modalServisIslemleri .modal-body'),
            bodyNewRow = modalBody.find('.servis-islemleri-new-row'),
            bodyRecords = modalBody.find('.servis-islemleri-records');

        bodyNewRow.append($('<table/>', {
            class: 'table table-bordered table-hover',
            'style': 'margin-bottom:0;'
        }).append("<thead><tr><th style='width:50%; text-align: center;'>Sicil No</th><th style='width:20%; text-align: center;'>Servis</th><th style='width:10%; text-align: center;'>Statü</th><th style='width: 20% !important;text-align: center;'>Ekle</th></tr></thead><tbody style='background:white !important'><tr><td><textarea rows='1' class='form-control sicilNo' style='resize:vertical'></textarea></td><td><input id='Servis' type='select' class='form-control servis' style='width:500px;'></input></td><td><input id='Statu' type='select' class='form-control statu' style='width:500px;'></input></td><td style='text-align:center;'><a class='btn btn-success btn-sm btn-servis-islemleri-save-row' style='margin-right:5px;'><i class='fas fa-plus'></i></a><a class='btn btn-danger btn-sm btn-servis-islemleri-cancel-row' href='#'><i class='fas fa-times-circle'></i></a></td></tr></tbody>"));

        bodyRecords.append($('<table/>', {
            class: 'table table-bordered table-hover',
            'style': 'margin-bottom:0;table-layout: fixed;'
        }).append($("<thead/>").html('<tr><th style="width:50%; text-align: center;">Sicil No</th><th style="width:25%; text-align: center;">Servis</th><th style="width:25%; text-align: center;">Statü</th></tr>')).append($("<tbody/>")));

        prepareSelect2('#Servis', '/Summary/LookupFieldValues', {
            coId: '3447F4F89A62486F9FF96D5F02B924C7',
            id: 'E51038BFF4584AFAA060AED09ECB4A50',
            viewFilterId: 'EE85D867615141F2A238CBB94D8860A3'
        }, null, false); //servis lookupi için seçim

        prepareSelect2('#Statu', '/summary/fielditems', {
            id: '323D4DCB8F0A4E1C9D50A5D1BF17DACF'
        }, null, null);

        $('#modalServisIslemleri').modal({
            backdrop: 'static',
            keyboard: false
        });

    });

    $('body').on('click', '.btn-servis-islemleri-save-row', function() {

        sira++;
        var tbody = bodyRecords.find('tbody'),
            thead = bodyRecords.find('thead');
        tbody.attr('style', 'background:white !important');

        var sicilNo = $('.sicilNo').val(),
            servisId = $('.servis').select2('data').id,
            statuId = $('.statu').select2('data').id,
            servisText = $('.servis').select2('data').text,
            statuText = $('.statu').select2('data').text;

        if (String.isNullOrWhiteSpace(sicilNo)) {
            notify("danger", "Sicil No alanini lütfen doldurunuz.");
            return;
        }
        if (String.isNullOrWhiteSpace(servisId)) {
            notify("danger", "Servis alanini lütfen doldurunuz.");
            return;
        }
        if (String.isNullOrWhiteSpace(statuId)) {
            notify("danger", "Statü alanini lütfen doldurunuz.");
            return;
        }

        modelList.TopluServis.push({
            SicilNo: sicilNo,
            Servis: servisId,
            Durum: statuId
        });

        //List.push(modelList);

        var newRow = $('<tr>', {
            'data-id': sira,
            'data-rowid': sira
        });

        newRow.append('<td style="width:50%"><textarea id="' + String.format('sicilNo_{0}', sira) + '" class="form-control sicil-no" autocomplete="off">' + sicilNo + '</textarea></td>');
        $('.servis-islemleri-records tbody').append(newRow);
        console.log(sicilNo);

        newRow.append(String.format('<td style="width:25%;"><div id="servis_{0}" class="servis-no"></div></td>', sira));

        $('.servis-islemleri-records tbody').append(newRow);

        prepareSelect2(String.format('#servis_{0}', sira), '/Summary/LookupFieldValues', {
            coId: '3447F4F89A62486F9FF96D5F02B924C7',
            id: 'E51038BFF4584AFAA060AED09ECB4A50',
            viewFilterId: 'EE85D867615141F2A238CBB94D8860A3'
        }, null, false); //servis lookupi için seçim
        prepareSelect2SelectedOneItem(String.format('#servis_{0}', sira), servisId, servisText, false);

        newRow.append(String.format('<td style="width:25%;"><div id="statu_{0}" class="statu-turu"></div></td>', sira));
        $('.servis-islemleri-records tbody').append(newRow);

        console.log(statuText);
        console.log(statuId);

        prepareSelect2(String.format('#statu_{0}', sira), '/summary/fielditems', {
            id: '323D4DCB8F0A4E1C9D50A5D1BF17DACF'
        }, null, null);
        prepareSelect2SelectedOneItem(String.format('#statu_{0}', sira), statuId, statuText, false);

        $('.sicilNo').val('');
        $('.servis').select2('data', '');
        $('.statu').select2('data', '');
    });

    $('body').on('click',
        '#btnKaydetServis',
        function() {

            notify("warning", "Kaydediliyor, lütfen bekleyiniz.");
            console.log(modelList);
            debugger;

            var localUrl = 'http://localhost:52129/api/data/TopluServisKayitOlusturma';
            var realUrl = 'https://mayawebapi.denizbank.com/api/data/TopluServisKayitOlusturma2';
            $.post(realUrl, modelList, function(r) {
                if (r.Status) {
                    notify("success", "Islem basarili, sayfa yenileniyor...");
                    setTimeout(function() {
                        window.location.reload();
                    }, 1000);
                } else {
                    notify("danger", r.Message);
                }
            });


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