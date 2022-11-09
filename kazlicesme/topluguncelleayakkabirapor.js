$(function() {
    $('body').on('lookupRelationLoadTriggerEvent', function(e, relationId) {
        oldValuesArray = [];
        if (relationId == '41139532CD42446C8941C9A9B0336487') {
            var $relation = $(String.format('div[data-id={0}]', relationId));
            $relation.find('#btnTopluGuncelle, .btn-analiz-ekle').remove();
            $relation.find('#btnTopluKaydet, .btn-analiz-ekle').remove();
            $(('div[data-id=41139532CD42446C8941C9A9B0336487]')).prepend('<a id="btnTopluGuncelle" class="btn btn-sm btn-warning pull-right"  style="margin-right:10px;" >Toplu Sonuç Giriş</a>');
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
            $('body').on('change', '.changeable', function() {
                var activeDiv = $(this).closest('div');
                activeDiv.find('label').removeClass('btn-success active');
                $(this).addClass('btn-success active');
                // if($(this).hasClass('btn-success')){
                //     $(this).addClass('btn-default');
                //     $(this).removeClass('btn-success active');
                // }else{
                //     $(this).addClass('btn-success');
                //     $(this).removeClass('btn-default');
                // }
            })
            $('#btnTopluGuncelle').on('click', function() {
                $('#modalTopluGuncelle').modal('toggle');
                $('#btnTopluGuncelle').hide();
                $('#btnTopluKaydet').show();
                panel1.find('table tbody tr').each(function(i, v) {
                    var id = $(v).data('id');
                    tespitEdilemediColumn = $(v).find('[data-id=A7B86CAC615248998B6869A6999DDCB2]');
                    tespitEdilemediColumnValue = tespitEdilemediColumn[0].dataset.value.toLowerCase();
                    var isTrueSet = (tespitEdilemediColumnValue === 'true');
                    sonucColumn = $(v).find('[data-id=F2744EA2CE8244B1B162F6DC0B678738]');
                    sonucColumnText = sonucColumn.data('text');
                    var ldKaynagi = $(v).find('[data-id=24D07C2FDD0F404EBF485E551321ED8D]');
                    var ldKaynagiText = ldKaynagi.data('text');
                    ldColumn = $(v).find('[data-id=41288962BD1A4AE89F0EA52E361416E4]');
                    ldColumnText = ldColumn.data('text');
                    if (tespitEdilemediColumnValue) {
                        tespitEdilemediColumn.html(String.format('<input id=chk_{0} type="checkbox" class="tespitedilemedi">', id));
                    } else {
                        tespitEdilemediColumn.html(String.format('<input id=chk_{0} type="checkbox" class="tespitedilemedi">', id));
                    }
                    var degerlendirmeColumn = $(v).find('[data-id=60EA1547C6034B228C918798F8CCD54D]'),
                        degerlendirmeVal = degerlendirmeColumn.data('value');
                    $('#chk_' + id).prop('checked', isTrueSet);
                    sonucColumn.html(String.format('<input id={0} type="text" class="form-control sonuc" value="{1}">', id, sonucColumnText));
                    ldColumn.html(String.format('<input id={0} type="text" class="form-control limitdeger" value="{1}">', id, ldColumnText));
                    ldKaynagi.html(String.format('<input id={0} type="text" class="form-control ldKaynagi" value="{1}">', id, ldKaynagiText));

                    degerlendirmeColumn.html('<div><label for="60EA1547C6034B228C918798F8CCD54D">&nbsp;</label><input id="' + id + '" type="hidden" class="hidden degerlendirme" value="' + degerlendirmeVal + '" ><div class="btn-group btn-group-sm well well-xxs" data-toggle="buttons">' +
                        '<label id="6F161D03A7B44FB4B47488048C9BBBC4" class="btn btn-default changeable"><input type="radio" name="RADIO-60EA1547C6034B228C918798F8CCD54D" autocomplete="off" value="6F161D03A7B44FB4B47488048C9BBBC4"> U </label>' +
                        '<label id="02B4337158E74D39977528A7D4A82D75" class="btn btn-default changeable"><input type="radio" name="RADIO-60EA1547C6034B228C918798F8CCD54D" autocomplete="off" value="02B4337158E74D39977528A7D4A82D75"> U.D. </label>' +
                        '<label id="D14418A9086D459D82E4E5CB51417754" class="btn btn-default changeable"><input type="radio" name="RADIO-60EA1547C6034B228C918798F8CCD54D" autocomplete="off" value="D14418A9086D459D82E4E5CB51417754"> D.Y. </label>' +
                        '<label id="61A097D852814DE899F528EF4479D74A" class="btn btn-default changeable"><input type="radio" name="RADIO-60EA1547C6034B228C918798F8CCD54D" autocomplete="off" value="61A097D852814DE899F528EF4479D74A"> - </label></div></div>');
                    if (!String.isNullOrWhiteSpace(degerlendirmeVal)) {
                        $('#' + degerlendirmeVal).addClass('btn-success active');
                    }


                    oldValuesArray.push({
                        RecordId: id,
                        Sonuc: sonucColumnText,
                        LD: ldColumnText,
                        LDKaynagi: ldKaynagiText,
                        TespitEdilemedi: tespitEdilemediColumnValue,
                        Degerlendirme: degerlendirmeVal,
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
                    var ldKaynagi = $(v).find('.ldKaynagi').val();
                    var degerlendirme = $(v).find('.active').closest('label').attr('id');

                    //todo kontrol
                    var index = oldValuesArray.findIndex(recordId => recordId.RecordId == id);
                    if (oldValuesArray[index].Sonuc != sonuc || oldValuesArray[index].LD != ld || oldValuesArray[index].TespitEdilemedi != tespitEdilemedi || oldValuesArray[index].LDKaynagi != ldKaynagi || oldValuesArray[index].Degerlendirme != degerlendirme) {
                        if (degerlendirme == undefined) {
                            degerlendirme = "";
                        }
                        array.push({
                            RecordId: id,
                            Sonuc: sonuc,
                            LD: ld,
                            LDKaynagi: ldKaynagi,
                            TespitEdilemedi: tespitEdilemedi,
                            Degerlendirme: degerlendirme,
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
                console.log(data);
                debugger;
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