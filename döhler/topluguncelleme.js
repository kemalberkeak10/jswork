$(function() {
    $(('div[data-id=507E9A3E89A0407DB295F228BDAC9EF3]')).prepend('<a id="btnTopluGuncelle" class="btn btn-sm btn-warning pull-right"  style="margin-right:10px;" >Toplu Güncelle</a>');
    $(('div[data-id=507E9A3E89A0407DB295F228BDAC9EF3]')).prepend('<a id="btnTopluKaydet" class="btn btn-sm btn-info pull-right"  style="margin-right:10px;" >Kaydet</a>');
    $('#btnTopluKaydet').hide();
    var panel1 = $('[data-id=507E9A3E89A0407DB295F228BDAC9EF3]');
    $('#modalTopluGuncelle').remove();
    window.setModal.Create({
        id: 'modalTopluGuncelle',
        html: {
            header: 'Toplu Güncelleme',
            body: '<div id="msg" style="margin:0 0 5px; width: 100%;">' +
                '<div id="loading" style="margin:0 0 5px; width: 100%;display:none;"><br/> <img src="/Public/img/loading_bar.gif"></div>',
            footer: ''
        },
        settings: {
            widthClass: 'modal-lg'
        },
    });
    $("#modalTopluGuncelle .modal-body").find('#loading').show();
    $('#btnTopluGuncelle').on('click', function() {
        $('#modalTopluGuncelle').modal('toggle');
        if ($('div[data-id=C76C1DAACF6C4834B597A70F6E3CC76C]').data().value == "True") {
            $('#loading').hide();
            setUtil.alert({
                container: '#modalTopluGuncelle .modal-body #msg',
                message: "Bu Kayıtta toplu güncelleme yapılmıştır. Toplu Güncelleme yapamazsınız.",
                alertClass: 'alert-warning',
                autoClose: true
            });
        } else {
            $('#btnTopluGuncelle').hide();
            $('#btnTopluKaydet').show();

            panel1.find('table tbody tr').each(function(i, v) {
                var id = $(v).data('id'),
                    aciklamaColumn = $(v).find('[data-id=7E3F6A981BE144FD95A7C1FE673AEF37]'),
                    aciklamaColumnText = aciklamaColumn.text(),
                    bulguColumn = $(v).find('[data-id=2A7A4158A48A4984B8513E9F5E535CF0]'),
                    bulguColumnId = bulguColumn.data('value'),
                    bulguColumnText = bulguColumn.data('text');

                bulguColumn.html(String.format('<div class="bulgu" id="bulgu_{0}"></div>', id));
                prepareSelect2(String.format("#bulgu_{0}", id), '/summary/fielditems', { id: '2A7A4158A48A4984B8513E9F5E535CF0' }, null, null);
                if (!String.isNullOrWhiteSpace(bulguColumnId) && !String.isNullOrWhiteSpace(bulguColumnText)) {
                    $(String.format("#bulgu_{0}", id)).select2('data', {
                        id: bulguColumnId,
                        text: bulguColumnText
                    });
                }

                aciklamaColumn.html(String.format('<textarea class="form-control aciklama" rows="2" maxlength="">{0}</textarea>', aciklamaColumnText));
            });
        }
    });

    $('body').on('click', '#btnTopluKaydet', function() {
        $('#modalTopluGuncelle').modal('toggle');
        var array = [];
        var data = {};
        panel1.find('table tbody tr').each(function(i, v) {
            var id = $(v).data('id'),
                aciklama = $(v).find('.aciklama').val(),
                bulgu = $(v).find(String.format("#bulgu_{0}", id)).select2('data'),
                bulguId = bulgu !== null ? bulgu.id : "";
            if (!String.isNullOrWhiteSpace(aciklama) || bulguId != "")
                array.push({
                    RecordId: id,
                    Aciklama: aciklama,
                    BulguId: bulguId
                });
        });
        data.CheckListe = array;
        console.log(data.CheckListe);
        var url2 = 'http://localhost:55073/api/data/TopluDurumGuncelle ';
        var url = 'https://dohlerwebapi.setcrm.com/api/data/TopluDurumGuncelle';
        $.post(url,
            data,
            function(result) {
                if (result.Status) {
                    var checkboxData = {
                        customObjectId: "64F3022878234767B5C1B0F04FE6127A",
                        recordId: $('#RecordPublicId').val(),
                        fieldId: 'C76C1DAACF6C4834B597A70F6E3CC76C',
                        value: true
                    };
                    $.post('/Set/UpdateFieldValue', checkboxData, function(r) {

                    });
                    $('#loading').hide();
                    setUtil.alert({
                        container: '#modalTopluGuncelle .modal-body #msg',
                        message: "İşleminiz başarıyla gerçekleşti sayfa yenileniyor lütfen bekleyiniz",
                        alertClass: 'alert-success',
                        autoClose: false
                    });
                    setInterval(() => {
                        window.location.reload();
                    }, 1000);
                } else {
                    $('#loading').hide();
                    setUtil.alert({
                        container: '#modalTopluGuncelle .modal-body #msg',
                        message: result.Message,
                        alertClass: 'alert-success',
                        autoClose: false
                    });
                }
            });

    });

});