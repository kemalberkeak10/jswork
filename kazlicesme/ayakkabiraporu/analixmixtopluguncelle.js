$(function() {
    $('body').on('lookupRelationLoadTriggerEvent', function(e, relationId) {
        oldValuesArray = [];
        if (relationId == '41139532CD42446C8941C9A9B0336487') {
            var $relation = $(String.format('div[data-id={0}]', relationId));
            $relation.find('#btnTopluGuncelle, .btn-analiz-ekle').remove();
            $relation.find('#btnTopluKaydet, .btn-analiz-ekle').remove();
            $(('div[data-id=41139532CD42446C8941C9A9B0336487]')).prepend('<a id="btnTopluGuncelle" class="btn btn-sm btn-warning pull-right"  style="margin-right:10px;" >Toplu Güncelle</a>');
            $(('div[data-id=41139532CD42446C8941C9A9B0336487]')).prepend('<a id="btnTopluKaydet" class="btn btn-sm btn-success pull-right"  style="margin-right:10px;" >Kaydet</a>');
            $('#btnTopluKaydet').hide();

            var panel1 = $('[data-id=41139532CD42446C8941C9A9B0336487]');
            $('#modalTopluGuncelle').remove();
            window.setModal.Create({
                id: 'modalTopluGuncelle',
                html: {
                    header: 'Toplu Güncelleme',
                    body: '<div id="msg" style="margin:0 0 5px; width: 100%;">' +
                        '<div id="loading" style="margin:0 0 5px; width: 100%;display:none;"><br/>İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>',
                    footer: ''
                },
                settings: {
                    widthClass: 'modal-lg'
                },
            });
            $("#modalTopluGuncelle .modal-body").find('#loading').show();
            $('#btnTopluGuncelle').on('click', function() {
                $('#modalTopluGuncelle').modal('toggle');
                $('#btnTopluGuncelle').hide();
                $('#btnTopluKaydet').show();
                panel1.find('table tbody tr').each(function(i, v) {
                    var id = $(v).data('id');
                    tespitEdilemediColumn = $(v).find('[data-id=A7B86CAC615248998B6869A6999DDCB2]');
                    tespitEdilemediColumnValue = tespitEdilemediColumn.data('value');
                    sonucColumn = $(v).find('[data-id=F2744EA2CE8244B1B162F6DC0B678738]');
                    sonucColumnText = sonucColumn.data('text');
                    ldColumn = $(v).find('[data-id=41288962BD1A4AE89F0EA52E361416E4]');
                    ldColumnText = ldColumn.data('text');
                    if (tespitEdilemediColumnValue) {
                        tespitEdilemediColumn.html(String.format('<input id={0} type="checkbox" class="tespitedilemedi" value="{1}"  checked="{1}" >', id, tespitEdilemediColumnValue));
                    } else {
                        tespitEdilemediColumn.html(String.format('<input id={0} type="checkbox" class="tespitedilemedi" value="{1}">', id, tespitEdilemediColumnValue));
                    }
                    sonucColumn.html(String.format('<input id={0} type="text" class="form-control sonuc" value="{1}">', id, sonucColumnText));
                    ldColumn.html(String.format('<input id={0} type="text" class="form-control limitdeger" value="{1}">', id, ldColumnText));
                    oldValuesArray.push({
                        RecordId: id,
                        Sonuc: sonucColumnText,
                        LD: ldColumnText,
                        TespitEdilemedi: tespitEdilemediColumnValue
                    });
                });
                $('#modalTopluGuncelle').modal('toggle');

            });

            $('body').on('click', '#btnTopluKaydet', function() {
                $('#modalTopluGuncelle').modal('toggle');
                var array = [];
                var data = {};
                panel1.find('table tbody tr').each(function(i, v) {
                    var id = $(v).data('id');
                    tespitEdilemedi = $(v).find('.tespitedilemedi').is(":checked");
                    sonuc = $(v).find('.sonuc').val();
                    ld = $(v).find('.limitdeger').val();
                    //todo kontrol
                    var index = oldValuesArray.findIndex(recordId => recordId.RecordId == id);
                    if (oldValuesArray[index].Sonuc != sonuc || oldValuesArray[index].LD != ld || oldValuesArray[index].TespitEdilemedi != tespitEdilemedi) {
                        array.push({
                            RecordId: id,
                            Sonuc: sonuc,
                            LD: ld,
                            TespitEdilemedi: tespitEdilemedi
                        });
                    }
                });
                data.AnalizMixList = array;
                if (data.AnalizMixList.length < 1) {
                    $('#loading').hide();
                    setUtil.alert({
                        container: '#modalTopluGuncelle .modal-body #msg',
                        message: "Herhangi bir kayıt seçilmedi. Sayfa yenileniyor lütfen bekleyiniz...",
                        alertClass: 'alert-success',
                        autoClose: false
                    });
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                }
                var url2 = 'http://localhost:44358/api/data/AnalizMixTopluUpdate ';
                var url = 'https://kazlicesmewebapi.setcrm.com/api/data/AnalizMixTopluUpdate';
                $.post(url2,
                    data,
                    function(result) {
                        if (result.Status) {
                            $('#loading').hide();
                            setUtil.alert({
                                container: '#modalTopluGuncelle .modal-body #msg',
                                message: "İşleminiz başarıyla gerçekleşti sayfa yenileniyor lütfen bekleyiniz",
                                alertClass: 'alert-success',
                                autoClose: false
                            });
                            setTimeout(() => {
                                window.location.reload();
                            }, 500);
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
        }

    });



});