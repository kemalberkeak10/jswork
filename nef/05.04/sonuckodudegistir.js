$(function() {
    var gorusmeSonucu = $('label[for=4B3A39B32A704881888ADAD7F48B152A]').parent().data('publicids');

    if (!String.isNullOrWhiteSpace(gorusmeSonucu)) {
        var userId = userData.id;
        if (userId == "F2824CB7C7AD45F0AD5E8894F72F587A" || userId == "52C755266C7A45C59EBF053BAC373236" ||
            userId == "AFA2050A8CC942EBAFAE7F6C07AC0C52" || userId == "4E3FD750716547C1AC28B80BB14D62DD") {
            $('.well .pull-right:eq(0)').prepend('<a id="btnRevizeEt" class="btn btn-sm btn-success"  style="margin-right:10px;">Sonuç Kodu Değiştir</a>');
        }
    }
    $('body').on('click', '#btnRevizeEt', function() {
        $('#modalRevizeEt').remove();
        window.setModal.Create({
            id: 'modalRevizeEt',
            html: {
                header: 'Sonuç Kodu Değiştir',
                body: '<div id="msg" style="margin:0 23px 5px; width: 80%;font-size:15px;"></div>' +
                    '<table class="table" style="width: 100%">' +
                    '<thead>' +
                    '<tr><th style="background-color:#034f84;color:white;">Görüşme Sonucu Ayrıntısı</th"><th style="background-color:#034f84;color:white;">Görüşme Sonucu Ayrıntısı 2</th><th style="background-color:#034f84;color:white;">Randevu Notu</th></tr>' +
                    '</thead>' +
                    '<tbody>' +
                    '<tr>' +
                    '<td colspan="1" rowspan="1"><input id="gorusmeSonucuAyrintisi1" type="select"  style="resize:none;width:100%;"></td>' +
                    '<td colspan="1" rowspan="1"><input id="gorusmeSonucuAyrintisi2" type="select"  style="resize:none;width:100%;"></td>' +
                    '<td colspan="1" rowspan="1"><input id="gorusmeNotu" type="text" style="width:100%; border-radius: 3px; border: 1px solid #034f84; padding: 8px 12px;"></td>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>',
                footer: '<button id="btnOnayla" type="button" class="btn btn-sm btn-success" >Kaydet</button>' + '<button type="button" class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>'
            },
            settings: {
                widthClass: 'modal-lg'
            }
        });
        $('#modalRevizeEt').modal('toggle');



        var gorusmeNotu = $('label[for=4C026C8581754174978356D22E93969C]').parent().data('value');
        $('#gorusmeNotu').val(gorusmeNotu);
        prepareSelect2('#gorusmeSonucuAyrintisi1', '/Summary/DependencyItems', {
            coId: '542C60816E884E958D0B7D2B379D79F2',
            itemId: "27C11D2B4E6D4FF18C6D40156DFBBFEF",
            groupIds: $('label[for=4B3A39B32A704881888ADAD7F48B152A]').parent().data('publicids'),
            controllingId: '4B3A39B32A704881888ADAD7F48B152A',
            controllingRecordId: $('label[for=4B3A39B32A704881888ADAD7F48B152A]').parent().data('publicids'),
        }, null, false);
        prepareSelect2('#gorusmeSonucuAyrintisi2', '/Summary/DependencyItems', {
            coId: '542C60816E884E958D0B7D2B379D79F2',
            itemId: "4BF9E6F77B974843A2730F89F060A1B9",
            groupIds: $('#gorusmeSonucuAyrintisi1').val() != '' ? $('#gorusmeSonucuAyrintisi1').select2('data').id : '',
            controllingId: '27C11D2B4E6D4FF18C6D40156DFBBFEF',
            controllingRecordId: $('#gorusmeSonucuAyrintisi1').val() != '' ? $('#gorusmeSonucuAyrintisi1').select2('data').id : '',
        }, null, false);
        var gorusmeSonucuAyrintisi1 = $('label[for=27C11D2B4E6D4FF18C6D40156DFBBFEF]').parent().data();
        if (!String.isNullOrWhiteSpace(gorusmeSonucuAyrintisi1)) {
            var gorusmeSonucuAyrintisi1Val = $('label[for=27C11D2B4E6D4FF18C6D40156DFBBFEF]').parent().data('value');
            var gorusmeSonucuAyrintisi1Id = $('label[for=27C11D2B4E6D4FF18C6D40156DFBBFEF]').parent().data('publicids');
            $('#gorusmeSonucuAyrintisi1').select2('data', {
                id: gorusmeSonucuAyrintisi1Id,
                text: gorusmeSonucuAyrintisi1Val
            }).trigger('change');
        } else {
            $('#gorusmeSonucuAyrintisi2').select2('enable', false);
        }
        var gorusmeSonucuAyrintisi2 = $('label[for=4BF9E6F77B974843A2730F89F060A1B9]').parent().data();
        if (!String.isNullOrWhiteSpace(gorusmeSonucuAyrintisi2)) {
            var gorusmeSonucuAyrintisi2Val = $('label[for=4BF9E6F77B974843A2730F89F060A1B9]').parent().data('value');
            var gorusmeSonucuAyrintisi2Id = $('label[for=4BF9E6F77B974843A2730F89F060A1B9]').parent().data('publicids');
            $('#gorusmeSonucuAyrintisi2').select2('data', {
                id: gorusmeSonucuAyrintisi2Id,
                text: gorusmeSonucuAyrintisi2Val
            }).trigger('change');
        }
        $("#gorusmeSonucuAyrintisi1").on('change', function() {

            if (String.isNullOrWhiteSpace($('#gorusmeSonucuAyrintisi1').val())) {
                $('#gorusmeSonucuAyrintisi2').select2('enable', false);
                $('#gorusmeSonucuAyrintisi2').select2('data', null);
            } else {
                $('#gorusmeSonucuAyrintisi2').select2('enable', true);
                prepareSelect2('#gorusmeSonucuAyrintisi2', '/Summary/DependencyItems', {
                    coId: '542C60816E884E958D0B7D2B379D79F2',
                    itemId: "4BF9E6F77B974843A2730F89F060A1B9",
                    groupIds: $('#gorusmeSonucuAyrintisi1').select2('data').id,
                    controllingId: '27C11D2B4E6D4FF18C6D40156DFBBFEF',
                    controllingRecordId: $('#gorusmeSonucuAyrintisi1').select2('data').id,
                }, null, false);
            }
        });
    });

    $('body').on('click', '#btnOnayla', function() {
        var data = {
            RecordPublicId: $('#RecordPublicId').val(),
            GorusmeSonucuAyrintisi1: $('#gorusmeSonucuAyrintisi1').val(),
            GorusmeSonucuAyrintisi2: $('#gorusmeSonucuAyrintisi2').val(),
            GorusmeNotu: $('#gorusmeNotu').val(),
            UserId: userData.id,
        }
        var url = 'https://nefwebapi.setcrm.com/api/data/RevizeEt';
        var url2 = 'https://localhost:44305/api/data/RevizeEt';
        $('#modalRevizeEt .modal-body').html('<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>');
        $.post(url,
            data,
            function(r) {
                if (r.IsOk) {
                    $('#modalRevizeEt').modal('toggle');
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                } else {
                    setUtil.alert({
                        container: '#modalRevizeEt .modal-body #msg',
                        message: r.Message,
                        alertClass: 'alert-danger',
                        autoClose: true
                    });
                }
            });
    });

});