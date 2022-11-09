$(function() {
    $('body').on('lookupRelationLoadTriggerEvent', function(e, relationId) {

        if (relationId == '41139532CD42446C8941C9A9B0336487') {
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
                    var id = $(v).data('id'),
                        birimColumn = $(v).find('[data-id=1F79D6CD04ED462B9D4458EF76DBA94D]'),
                        birimColumnText = birimColumn.text(),
                        birimColumnId = birimColumn.data('value'),
                        sonucColumn = $(v).find('[data-id=F2744EA2CE8244B1B162F6DC0B678738]'),
                        sonucColumnText = sonucColumn.data('text'),
                        ldColumn = $(v).find('[data-id=41288962BD1A4AE89F0EA52E361416E4]'),
                        ldColumnText = ldColumn.data('text');
                    birimColumn.html(String.format('<div class="birim" id="birim_{0}"></div>', id));
                    prepareSelect2(String.format("#birim_{0}", id), '/Summary/LookupFieldValues', {
                        coId: '8797B6D012904D6790B788F5C6E71D45',
                        id: '1F79D6CD04ED462B9D4458EF76DBA94D',
                        viewFilterId: '9B360CA2D9ED4010986467956838BB62'
                    }, null, false);
                    if (!String.isNullOrWhiteSpace(birimColumnId) && !String.isNullOrWhiteSpace(birimColumnText)) {
                        $(String.format("#birim_{0}", id)).select2('data', {
                            id: birimColumnId,
                            text: birimColumnText
                        });
                    }

                    sonucColumn.html(String.format('<input id={0} type="text" class="form-control sonuc" value="{1}">', id, sonucColumnText));
                    ldColumn.html(String.format('<input id={0} type="text" class="form-control limitdeger" value="{1}">', id, ldColumnText));
                });
                $('#modalTopluGuncelle').modal('toggle');

            });

            $('body').on('click', '#btnTopluKaydet', function() {
                $('#modalTopluGuncelle').modal('toggle');
                var array = [];
                var data = {};
                panel1.find('table tbody tr').each(function(i, v) {
                    var id = $(v).data('id'),
                        sonuc = $(v).find('.sonuc').val(),
                        ld = $(v).find('.limitdeger').val(),
                        birim = $(v).find(String.format("#birim_{0}", id)).select2('data'),
                        birimId = birim !== null ? birim.id : "";
                    if (!String.isNullOrWhiteSpace(sonuc) || birimId != "" || !String.isNullOrWhiteSpace(ld))
                        array.push({
                            RecordId: id,
                            Sonuc: sonuc,
                            LD: ld,
                            BirimId: birimId
                        });
                });
                data.AnalizMixList = array;
                var url2 = 'http://localhost:44358/api/data/AnalizMixTopluUpdate ';
                var url = 'https://kazlicesmewebapi.setcrm.com/api/data/AnalizMixTopluUpdate';
                $.post(url,
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