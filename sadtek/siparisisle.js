$(function() {

    var recordId = $('#RecordPublicId').val();
    $('body').on('click',
        '#btnSiparisIsleme',
        function() {
            $('#modalSiparisIsleme').remove();
            window.setModal.Create({
                id: 'modalSiparisIsleme',
                html: {
                    header: ' <h3 class="text-center">Sipariş İşleme</h3>',
                    body: '<div id="msgSiparis" style="margin:0 23px 5px; width: 90%;font-size:15px;"></div>' +
                        '<div id="loadingSiparis" style="margin:0 0 5px; width: 100%;">İşleminiz yapılıyor, lütfen bekleyiniz...<br> <img src="/Public/img/loading_bar.gif"></div>' +
                        '<table id="newTblSiparis" class="table">' +
                        '<thead>' +
                        '<th style="background:#21d961; tex-align:left; width:100px;">Sıra No</th>' +
                        '<th style="background:#21d961; tex-align:left; width:220px;">NSN</th>' +
                        // '<th style="background:#21d961; tex-align:left">Model</th>' +
                        '<th style="background:#21d961; tex-align:left; width:250px;">Parça Kodu</th>' +
                        '<th style="background:#21d961; tex-align:left">Ürün Adı</th>' +
                        // '<th style="background:#21d961; tex-align:left">Ürün Kategori</th>' +
                        // '<th style="background:#21d961; tex-align:left">Tedarikçi Fiyat</th>' +
                        '<th style="background:#21d961; width:150px;">Alış Fiyatı</th> ' +
                        // '<th style="background:#21d961; tex-align:left">Ürün PB</th>' +
                        // '<th style="background:#21d961">Kur</th> ' +
                        // '<th style="background:#21d961">Kar</th>' +
                        // '<th style="background:#21d961">ISK</th>' +
                        // '<th style="background:#21d961">Adet</th> ' +
                        // '<th style="background:#21d961">Satış Fiyatı</th>' +
                        // '<th style="background:#21d961">Toplam Fiyat</th> ' +
                        // '<th style="background:#21d961">Teslim</th> ' +
                        // '<th style="background:#21d961">Süresi</th> ' +
                        '<th style="background:#21d961; width:100px;">Miktar</th> ' +
                        '<th style="background:#21d961">Seç</th> ' +
                        '</thead>' +
                        '<tbody>' +
                        '</tbody>' +
                        '</table>',
                    footer: '<button id="btnOlustur" class="btn btn-warning btn-sm">Kayıt Oluştur</button><button id="btnClose" data-dismiss="modal" class="btn btn-success btn-sm">Kapat</button>'
                }

            });
            $('#loadingSiparis').show();
            var realUrl = 'https://sadtekk2webapi.setcrm.com/api/data/LrOkuma?lrRecordId=' + recordId + '&lrDataid=DA3132F05C0043758573E2F6A29C8002&q=';
            var url2 = 'http://localhost:44358/api/data/LrOkuma?lrRecordId=' + recordId + '&lrDataid=DA3132F05C0043758573E2F6A29C8002&q=';
            $.ajax({
                type: "GET",
                url: realUrl,
                // data: JSON.stringify(modelList),
                async: false,
                success: function(r) {

                    if (r.IsOk) {
                        var records = r.Records;
                        $.each(records, function(i, v) {
                            var newRow = $('<tr>', {
                                'data-id': v.PublicId,
                                'data-rowid': i
                            });
                            var siraNo = v.Values.first('FieldPublicId', 'D0721FC9D0034856AF2C52177626CB1E').Value;
                            newRow.append(String.format('<td><input class="form-control" disabled value="{0}"/></td>', siraNo));
                            var nsn = v.Values.first('FieldPublicId', 'BE80FDF2B6F74C72A29AE7FCF5C68D03').Value;
                            newRow.append(String.format('<td><input class="form-control" value="{0}" disabled></input></td>', nsn));
                            var parcaKodu = v.Values.first('FieldPublicId', '354E2A8ADF7E4464A33DE817B9B70C78').Value;
                            newRow.append(String.format('<td><input class="form-control" value="{0}" disabled></input></td>', parcaKodu));
                            var urunAdi = v.Values.first('FieldPublicId', 'AC5215D1D7204287A151F1BF4DAF457E').Value;
                            newRow.append(String.format('<td><input class="form-control" value="{0}" disabled/></td>', urunAdi));
                            // var urunKategori = v.Values.first('FieldPublicId', '0FFAD403CA604E3F94EAF18E939F6F94').Value;
                            // newRow.append(String.format('<td><input class="form-control" disabled value="{0}"></td>', urunKategori));
                            // var tedarikci = v.Values.first('FieldPublicId', '4A70A4BE8B88403BBF1CC07C55FBA8BA').Value;
                            // newRow.append(String.format('<td><input class="form-control" disabled value="{0}"></td>', tedarikci));
                            var alisFiyati = v.Values.first('FieldPublicId', '639EEA2FF1424D6F89826C4B455FAB42').Value;
                            newRow.append(String.format('<td><input class="form-control" disabled value="{0}"></td>', alisFiyati));
                            // var urunPb = v.Values.first('FieldPublicId', 'F1D41871570445F680D323F3E65747F4').Value;
                            // newRow.append(String.format('<td><input class="form-control" disabled value="{0}"></td>', urunPb));
                            // var kur = v.Values.first('FieldPublicId', '785E4802FCEB4A59B1D2DAC943B2368E').Value;
                            // newRow.append(String.format('<td><input class="form-control" disabled value="{0}"></td>', kur));
                            // var kar = v.Values.first('FieldPublicId', 'BE5DD503B70343089B5E3305045151A7').Value;
                            // newRow.append(String.format('<td><input class="form-control" disabled value="{0}"></td>', kar));
                            // var isk = v.Values.first('FieldPublicId', 'E1D0101FFDCD4295A95EF2BC00502C1E').Value;
                            // newRow.append(String.format('<td><input class="form-control" disabled value="{0}"></td>', isk));
                            // var adet = v.Values.first('FieldPublicId', '342DEBD1B9364C2AAE99584F6CCE3FC4').Value;
                            // newRow.append(String.format('<td><input class="form-control" disabled value="{0}"></td>', adet));
                            // var satisFiyati = v.Values.first('FieldPublicId', '173D32F38A3C4DB0820A3B26C43852B3').Value;
                            // newRow.append(String.format('<td><input class="form-control" disabled value="{0}"></td>', satisFiyati));
                            // var toplamFiyat = v.Values.first('FieldPublicId', '266BBFD1D756483D9E434B3C1515551C').Value;
                            // newRow.append(String.format('<td><input class="form-control" disabled value="{0}"></td>', toplamFiyat));
                            // var teslim = v.Values.first('FieldPublicId', '6F6F031188CD43C2BB73ADA26E3CB09C').Value;
                            // newRow.append(String.format('<td><input class="form-control" disabled value="{0}"></td>', teslim));
                            // var süresi = v.Values.first('FieldPublicId', '60F556533C0F42F280ABF54A0F21354D').Value;
                            // newRow.append(String.format('<td><input class="form-control" disabled value="{0}"></td>', süresi));
                            var miktar = v.Values.first('FieldPublicId', '342DEBD1B9364C2AAE99584F6CCE3FC4').Value;
                            newRow.append(String.format('<td><input class="form-control miktar" id="miktar_' + i + '" value="{0}" ></td>', parseInt(miktar)));
                            newRow.append('<td><input type="checkbox" class="sec" id="tr_' + i + '"></td>');
                            $('#modalSiparisIsleme #newTblSiparis tbody').append(newRow);
                        })
                    } else {
                        setUtil.alert({
                            container: '#modalSiparisIsleme #msgSiparis',
                            message: "Ürün kalemleri bulunamadı.",
                            alertClass: 'alert-danger',
                            autoClose: false
                        });
                    }

                }
            });
            $('#loadingSiparis').hide();

            $('#modalSiparisIsleme .modal-dialog').css('width',
                '100%');
            $('#modalSiparisIsleme').modal('toggle');
        });


    var isOk;
    $('body').on('click',
        '#btnOlustur',
        function() {
            var modelList = [];
            $('#modalLoading').remove();
            window.setModal.Create({
                id: 'modalLoading',
                html: {
                    header: '',
                    body: '<div id="txtLoading" style="margin:0 0 5px; width: 100%;">İşlem biraz uzun sürebilir, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>',

                }
            });
            $('#modalSiparisIsleme').modal('toggle'); //kapandı
            $('#modalLoading').modal('toggle'); //açıldı

            var localUrl = String.format('http://localhost:53062/api/data/SiparisIsle'),
                realUrl = String.format('https://sadtekk2webapi.setcrm.com/api/data/SiparisIsle');
            var trList = $('#newTblSiparis tbody tr input:checked');
            if (trList.length == 0) {
                $('#txtLoading').html('');
                setUtil.alert({
                    container: '#modalLoading #txtLoading',
                    message: 'Lütfen en az bir tane ürün seçiniz.',
                    alertClass: 'alert-danger',
                    autoClose: false
                });
            } else {
                $.each(trList, function(i, v) {
                    var rowId = $(v).closest('tr').data('rowid');
                    var model = {};
                    model.RecordId = $(v).closest('tr').data('id');
                    var miktarString = '#miktar_' + rowId;
                    model.Miktar = $(miktarString).val();
                    model.projeRecordId = $('#RecordPublicId').val();
                    modelList.push(model);
                    if (i == trList.length - 1) {
                        $.ajax({
                            contentType: 'application/json',
                            type: "POST",
                            url: localUrl,
                            dataType: "json",
                            data: JSON.stringify(modelList),
                            async: true,
                            success: function(r) {
                                if (r.Status) {
                                    $('#txtLoading').html('');
                                    setUtil.alert({
                                        container: '#modalLoading #txtLoading',
                                        message: "İşlem başarıyla gerçekleşmiştir.",
                                        alertClass: 'alert-success',
                                        autoClose: true
                                    });
                                    setTimeout(() => {
                                        $('#modalLoading').modal('toggle');
                                        window.location.reload();
                                    }, 1500);
                                } else {
                                    $('#txtLoading').html('');
                                    setUtil.alert({
                                        container: '#modalLoading #txtLoading',
                                        message: r.Message,
                                        alertClass: 'alert-danger',
                                        autoClose: false
                                    });
                                }
                            }
                        });

                    }
                });
            }




        });
});