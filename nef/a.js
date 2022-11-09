$(function() {
    var x = true; //false
    var musteriModel, adresModel, musteriId;
    $('body').on('change', '#83779721FB37432FB10BEBD630E319F1', function() {
        musteriId = $(this).select2('data').id;
        if (String.isNullOrWhiteSpace(musteriId)) return;

        if ($('#modalMusteri').length > 0) return;
        ModalCreate();
        $('#txt').show();

        // var url = 'https://localhost:44305/api/data/LrOkuma?recordId=' + musteriId + "&lrId=B4D277C2CACA450CAFA84CD8E9F86D6B&q=randevu";
        // var url2 = 'https://nefwebapi.setcrm.com/api/data/LrOkuma?recordId=' + musteriId + "&lrId=B4D277C2CACA450CAFA84CD8E9F86D6B&q=randevu";
        // $.ajax({
        //     type: "GET",
        //     url: url2,
        //     async: false,
        //     success: function(r) {
        //         if (r.IsOk) {
        //             if (r.Records.length <= 0) {
        //                 $('#txt').hide();
        //                 $('#sonucMsg').html('');
        //                 $('.newFormTable').html('');
        //                 setUtil.alert({
        //                     container: '#sonucMsg',
        //                     message: "Bu müşteriye ait randevu kaydı bulunmamaktadır. Randevu oluşturmadan satış yapamazsınız. Müşteri kartına yönlendiriliyorsunuz...",
        //                     alertClass: 'alert-danger',
        //                     autoClose: false
        //                 });
        //                 setTimeout(function() {
        //                     window.location.href = "https://proje.setcrm.com/set/musteri/detail/" + musteriId;
        //                 }, 3000);

        //             } else {
        //                 var gorusmeSonucuTamamlandi = false;
        //                 $.each(r.Records, function(i, v) {
        //                     var gorusmeSonucu = v.Values.find(f => f.FieldPublicId == "92E618F793074F6DB4AB9A15A7159836").SelectedItemPublicIds;
        //                     if (gorusmeSonucu === "492163A1C2CB4CCB86BD77A89B784EA4") {
        //                         gorusmeSonucuTamamlandi = true;
        //                     }
        //                 });

        //                 if (!gorusmeSonucuTamamlandi) {
        //                     $('#txt').hide();
        //                     $('#sonucMsg').html('');
        //                     $('.newFormTable').html('');
        //                     setUtil.alert({
        //                         container: '#sonucMsg',
        //                         message: "Randevusu kapatılmamış aktiviteleriniz bulunmaktadır. Müşteri kartına yönlendiriliyorsunuz...",
        //                         alertClass: 'alert-danger',
        //                         autoClose: false
        //                     });
        //                     setTimeout(function() {
        //                         window.location.href = "https://proje.setcrm.com/set/musteri/detail/" + musteriId;
        //                     }, 3000);
        //                     return;
        //                 }
        //                 x = true;
        //             }
        //         } else {
        //             $('.newFormTable').html('');
        //             $('#txt').hide();
        //             $('#sonucMsg').html('');
        //             setUtil.alert({
        //                 container: '#sonucMsg',
        //                 message: "Bu müşteriye ait randevu kaydı bulunmamaktadır.Satış yapamazsınız.",
        //                 alertClass: 'alert-danger',
        //                 autoClose: false
        //             });
        //             setTimeout(function() {
        //                 window.location.href = "https://proje.setcrm.com/set/musteri/detail/" + musteriId;
        //             }, 3000);
        //         }
        //     }
        // });
        // if (x) {
        var localUrl = 'https://localhost:44305/api/data/MusteriKontrol?musteriId=' + musteriId;
        var realUrl = 'https://nefwebapi.setcrm.com/api/data/MusteriKontrol?musteriId=' + musteriId;
        $.get(realUrl, function(r) {
                if (r.Status) {
                    if (r.musteri) {
                        if (r.adres) {
                            $('#modalMusteri').modal('hide');
                        } else {
                            $('#modalMusteri').modal('hide');
                            $('.modal-backdrop').remove()
                            ModalAdres();
                        }
                    } else {
                        $('#modalMusteri').modal('hide');
                        $('.modal-backdrop').remove()
                        ModalMusteri();
                        var musteri = r.Model;
                        $('#tcNo').val(musteri.TcNo);
                        // $('#uyruk').val(musteri.Uyruk);
                        if (!String.isNullOrWhiteSpace(musteri.Uyruk.id)) {
                            $('#uyruk').select2('data', {
                                id: musteri.Uyruk.id,
                                text: musteri.Uyruk.text
                            });
                        }
                        $('#dogumTarihi').val(musteri.DogumTarihi);
                        if (!String.isNullOrWhiteSpace(musteri.Meslek.id)) {
                            $('#meslek').select2('data', {
                                id: musteri.Meslek.id,
                                text: musteri.Meslek.text
                            });
                        }
                        // $('#egitimDurumu').val(musteri.EgitimDurumu);
                        if (!String.isNullOrWhiteSpace(musteri.EgitimDurumu.id)) {
                            $('#egitimDurumu').select2('data', {
                                id: musteri.EgitimDurumu.id,
                                text: musteri.EgitimDurumu.text
                            });
                        }
                        if (!String.isNullOrWhiteSpace(musteri.Cinsiyet.id)) {
                            $('#cinsiyet').select2('data', {
                                id: musteri.Cinsiyet.id,
                                text: musteri.Cinsiyet.text
                            });
                        }
                        if (!String.isNullOrWhiteSpace(musteri.MedeniDurum.id)) {
                            $('#medeniDurum').select2('data', {
                                id: musteri.MedeniDurum.id,
                                text: musteri.MedeniDurum.text
                            });
                        }
                        if (r.adres) {
                            $('#btnIleri').hide();
                            $('#btnMusteriKaydet').show();
                        } else {
                            $('#btnIleri').show();
                            $('#btnMusteriKaydet').hide();
                        }
                    }
                } else {
                    $('#txt').hide();
                    $('#sonucMsg').html('');
                    setUtil.alert({
                        container: '#sonucMsg',
                        message: r.Message,
                        alertClass: 'alert-danger',
                        autoClose: false
                    });
                }
            })
            // }
            // }
    })
    $('body').on('click', '#btnMusteriKaydet', function() {
        checkValidationMusteri();
        musteriModel = {
            RecordId: musteriId,
            TcNo: $('#tcNo').val(),
            Uyruk: {
                id: $('#uyruk').select2('data').id,
                text: $('#uyruk').select2('data').text
            },
            DogumTarihi: $('#dogumTarihi').val(),
            EgitimDurumu: {
                id: $('#egitimDurumu').select2('data').id,
                text: $('#egitimDurumu').select2('data').text
            },
            // EgitimDurumu: $('#egitimDurumu').val(),
            Cinsiyet: {
                id: $('#cinsiyet').select2('data').id,
                text: $('#cinsiyet').select2('data').text
            },
            Meslek: {
                id: $('#meslek').select2('data').id,
                text: $('#meslek').select2('data').text
            },
            MedeniDurum: {
                id: $('#medeniDurum').select2('data').id,
                text: $('#medeniDurum').select2('data').text
            },
        }
        var data = {
            Customer: musteriModel,
            Address: adresModel
        }
        var localUrl = 'https://localhost:44305/api/data/MusteriGuncelle';
        var realUrl = 'https://nefwebapi.setcrm.com/api/data/MusteriGuncelle';
        $.post(realUrl,
            data,
            function(r) {
                if (r.Status) {
                    $('#txtMusteri').hide();
                    $('#musteriMsg').html('');
                    setUtil.alert({
                        container: '#musteriMsg',
                        message: "Müşteri bilgileri güncellendi, işleme devam edebilirsiniz.",
                        alertClass: 'alert-success',
                        autoClose: false
                    });
                    setTimeout(function() {
                        $('#modalMusteriInfo').modal('toggle');
                    }, 3000);
                } else {
                    $('#txtMusteri').hide();
                    $('#musteriMsg').html('');
                    setUtil.alert({
                        container: '#musteriMsg',
                        message: r.Message,
                        alertClass: 'alert-danger',
                        autoClose: false
                    });
                }
            });
    });
    $('body').on('change', '#il', function() {
        if (!String.isNullOrWhiteSpace($(this).val())) {
            prepareSelect2('#ilce', '/Summary/LookupFieldValues', {
                coId: "33F3D538BF624136A327084DB90BAC52",
                id: "15D0583932A149DB926A2286BED8A12A",
                viewFilterId: "24B0B0B800164B1089B2811573D3D9A5",
                controllingRecordId: $(this).select2('data').id
            });
            $('#ilce').select2('enable', true);
        } else {
            $('#ilce').select2('enable', false);
        }
    })
    $('body').on('click',
        '#btnIleri',
        function() {
            if (!checkValidationMusteri()) return;
            musteriModel = {
                RecordId: musteriId,
                TcNo: $('#tcNo').val(),
                Uyruk: {
                    id: $('#uyruk').select2('data').id,
                    text: $('#uyruk').select2('data').text
                },
                DogumTarihi: $('#dogumTarihi').val(),
                EgitimDurumu: {
                    id: $('#egitimDurumu').select2('data').id,
                    text: $('#egitimDurumu').select2('data').text
                },
                // EgitimDurumu: $('#egitimDurumu').val(),
                Cinsiyet: {
                    id: $('#cinsiyet').select2('data').id,
                    text: $('#cinsiyet').select2('data').text
                },
                Meslek: {
                    id: $('#meslek').select2('data').id,
                    text: $('#meslek').select2('data').text
                },
                MedeniDurum: {
                    id: $('#medeniDurum').select2('data').id,
                    text: $('#medeniDurum').select2('data').text
                },
            }
            $('#modalMusteriInfo').modal('toggle');
            $('.modal-backdrop').remove()
            console.log(musteriModel);
            ModalAdres();
        });
    $('body').on('click',
        '#btnMusteriOlustur',
        function() {
            var data = {
                Customer: musteriModel,
                Address: adresModel
            }
            var localUrl = 'https://localhost:44305/api/data/MusteriGuncelle';
            var realUrl = 'https://nefwebapi.setcrm.com/api/data/MusteriGuncelle';
            $.post(realUrl, data, function(r) {
                if (r.Status) {
                    $('#txtMusteri').hide();
                    $('#sonucMsg').html('');
                    setUtil.alert({
                        container: '#sonucMsg',
                        message: "Müşteri bilgileri güncellendi, işleme devam edebilirsiniz.",
                        alertClass: 'alert-success',
                        autoClose: false
                    });
                    setTimeout(function() {
                        $('#modalMusteriInfo').modal('toggle');
                    }, 3000);
                } else {
                    $('#txt').hide();
                    $('#sonucMsg').html('');
                    setUtil.alert({
                        container: '#sonucMsg',
                        message: r.Message,
                        alertClass: 'alert-danger',
                        autoClose: false
                    });
                }
            });
        });
    $('body').on('click', '#btnOlustur', function() {
        var $this = $(this);
        if (!checkValidationAdres()) return;
        if (musteriModel == null || musteriModel == undefined) {
            musteriModel = {
                RecordId: musteriId
            }
        }
        adresModel = {
            Il: {
                id: $('#il').select2('data').id,
                text: $('#il').select2('data').text
            },
            Ilce: {
                id: $('#ilce').select2('data').id,
                text: $('#ilce').select2('data').text
            },
            Mahalle: $('#mahalle').val(),
            Sokak: $('#sokak').val(),
            PostaKodu: $('#postaKodu').val()
        }
        $this.prop('disabled', true);
        var data = {
            Customer: musteriModel,
            Address: adresModel
        }
        var localUrl = 'https://localhost:44305/api/data/MusteriGuncelle';
        var realUrl = 'https://nefwebapi.setcrm.com/api/data/MusteriGuncelle';
        $.post(realUrl, data, function(r) {
            if (r.Status) {
                $('#txtAdres').hide();
                $('#adresMsg').html('');
                setUtil.alert({
                    container: '#adresMsg',
                    message: "Müşteri bilgileri güncellendi, işleme devam edebilirsiniz.",
                    alertClass: 'alert-success',
                    autoClose: false
                });
                setTimeout(function() {
                    $('#modalAdres').modal('toggle');
                }, 3000);
            } else {
                $this.prop('disabled', false);
                $('#txtAdres').hide();
                $('#adresMsg').html('');
                setUtil.alert({
                    container: '#adresMsg',
                    message: r.Message,
                    alertClass: 'alert-danger',
                    autoClose: false
                });
            }
        });
    });
});

function ModalCreate() {
    $('#modalMusteri').remove();
    window.setModal.Create({
        id: 'modalMusteri',
        html: {
            header: 'Müşteri',
            body: '<div id="sonucMsg"></div>' +
                '<div id="txt" style="margin:0 0 5px; width: 100%;display:none;">Müşteri bilgisi getiriliyor, lütfen bekleyiniz... <br/> <img src="/Public/img/loading_bar.gif"></div><div id="msg"></div>',
            footer: ''
        }
    });
    $('#modalMusteri').modal({
        backdrop: 'static',
        keyboard: false
    });
    $('#modalMusteri .modal-header button:first').remove();
}

function ModalMusteri() {
    $('#modalMusteriInfo').remove();
    window.setModal.Create({
        id: 'modalMusteriInfo',
        html: {
            header: 'Müşteri Bilgileri',
            body: '<div id="musteriMsg"></div>' +
                '<div id="txtMusteri" style="margin:0 0 5px; width: 100%;display:none;">Müşteri bilgisi getiriliyor, lütfen bekleyiniz... <br/> <img src="/Public/img/loading_bar.gif"></div><div id="msgMusteri"></div>' +
                '<table class="table" style="width: 100%">' +
                '<thead>' +
                '<tr><th style="background:#21d961; tex-align:left">Vatandaşlık Numarası</th><th style="background:#21d961; tex-align:left">Uyruk</th></tr>' +
                '</thead>' +
                '<tbody>' +
                '<tr>' +
                '<td><input class="form-control" id="tcNo" type="text" pattern="\d*" maxLength="11" style="resize: vertical; width:100%;"></input></td><td><div id="uyruk"></div></td>' +
                '</tr>' +
                '</tbody>' +
                '</table>' +
                '<table class="table" style="width: 100%">' +
                '<thead>' +
                '<tr><th style="background:#21d961; tex-align:left">Doğum Tarihi</th><th style="background:#21d961; tex-align:left">Meslek</th></tr>' +
                '</thead>' +
                '<tbody>' +
                '<tr>' +
                '<td style="width:500px; height:40px;"><div><input id="dogumTarihi" class="dogumTarihi pull-right form-control"></div></td><td style="width:500px; height:40px;"><div id="meslek" class="meslek"></div></td>' +
                '</tr>' +
                '</tbody>' +
                '</table>' +
                '<table class="table" style="width: 100%">' +
                '<thead>' +
                '<tr><th style="background:#21d961; tex-align:left">Eğitim Durumu</th><th style="background:#21d961; tex-align:left">Cinsiyet</th></tr>' +
                '</thead>' +
                '<tbody>' +
                '<tr>' +
                '<td style="width:500px; height:40px;"><div id="egitimDurumu"></div></td><td style="width:500px; height:40px;"><div id="cinsiyet" class="cinsiyet"></div></td>' +
                '</tr>' +
                '</tbody>' +
                '</table>' +
                '<table class="table" style="width: 100%">' +
                '<thead>' +
                '<tr><th style="background:#21d961; tex-align:left">Medeni Durum</th></tr>' +
                '</thead>' +
                '<tbody>' +
                '<tr>' +
                '<td style="width:500px; height:40px;"><div id="medeniDurum" class="medeniDurum"></div></td>' +
                '</tr>' +
                '</tbody>' +
                '</table>',
            footer: '<button id="btnIleri" class="btn btn-success btn-sm">Kaydet ve İlerle</button><button id="btnMusteriKaydet" class="btn btn-success btn-sm">Kaydet</button>'
        },
        settings: {
            widthClass: 'modal-lg'
        }
    });
    $('#dogumTarihi').datetimepicker({
        inline: false,
        closeOnDateSelect: true,
        timepicker: false,
        format: 'd.m.Y',
        mask: false,
        scrollMonth: false,
        scrollTime: false,
        scrollInput: false
    });
    prepareSelect2('#meslek', '/Summary/LookupFieldValues', {
        coId: "92EA7CCE8D394022AF3239C2CCB86EF5",
        id: "D338746046EF4849891D9DB72F4F1249",
        viewFilterId: "195BBD926E484F2D821D37DA7DF2261D"
    });
    prepareSelect2WithData('#cinsiyet', [{
        id: "5D8E124E739447EE90A29302E6EF6D28",
        text: "Erkek"
    }, {
        id: "4538809D243247CEAD57A068D36FC88A",
        text: "Kadın"
    }]);
    prepareSelect2('#uyruk', '/Summary/FieldItems', {
        id: "EE606021AEC0481AA93891ED85B7A88B",
    });
    prepareSelect2('#egitimDurumu', '/Summary/FieldItems', {
        id: "7E76E907099D401FB0B99A0AE1C44267",
    });
    prepareSelect2('#medeniDurum', '/Summary/fielditems', {
        id: "CBF089E5553949588E2E1E9EF8F918C1",
    });

    $('#modalMusteriInfo').modal({
        backdrop: 'static',
        keyboard: false
    });
    $('#modalMusteriInfo .modal-header button:first').remove();
}

function ModalAdres() {
    $('#modalAdres').remove();
    window.setModal.Create({
        id: 'modalAdres',
        html: {
            header: 'Adres Bilgileri',
            body: '<div id="adresMsg"></div>' +
                '<div id="txtAdres" style="margin:0 0 5px; width: 100%;display:none;">Adres bilgisi getiriliyor, lütfen bekleyiniz... <br/> <img src="/Public/img/loading_bar.gif"></div><div id="msgAdres"></div>' +
                '<table class="table" style="width: 100%">' +
                '<thead>' +
                '<tr><th style="background:#21d961; tex-align:left">İl</th><th style="background:#21d961; tex-align:left">İlçe</th></tr>' +
                '</thead>' +
                '<tbody>' +
                '<tr>' +
                '<td style="width:500px; height:40px;"><div id="il" class="il"></div></td><td style="width:500px; height:40px;"><div id="ilce" class="ilce"></div></td>' +
                '</tr>' +
                '</tbody>' +
                '</table>' +
                '<table class="table" style="width: 100%">' +
                '<thead>' +
                '<tr><th style="background:#21d961; tex-align:left">Mahalle/Cadde</th><th style="background:#21d961; tex-align:left">Sokak/No</th></tr>' +
                '</thead>' +
                '<tbody>' +
                '<tr>' +
                '<td><input class="form-control" id="mahalle" type="text" style="resize: vertical; width:100%;"></input></td><td><input class="form-control" id="sokak" type="text" style="resize: vertical; width:100%;"></input></td>' +
                '</tr>' +
                '</tbody>' +
                '</table>' +
                '<table class="table" style="width: 100%">' +
                '<thead>' +
                '<tr><th style="background:#21d961; tex-align:left">Posta Kodu</th></tr>' +
                '</thead>' +
                '<tbody>' +
                '<tr>' +
                '<td><input class="form-control" id="postaKodu" type="text" style="resize: vertical; width:100%;"></input></td>' +
                '</tr>' +
                '</tbody>' +
                '</table>',
            footer: '<button id="btnOlustur" class="btn btn-success btn-sm">Kaydet</button>'
        }
    });
    prepareSelect2('#il', '/Summary/LookupFieldValues', {
        coId: "33F3D538BF624136A327084DB90BAC52",
        id: "C30555CDD54845F3A94EFA5D030C33E0",
        viewFilterId: "388B0D3641EA486FBE8FDC1DE8A8D6E2"
    });
    prepareSelect2('#ilce', '/Summary/LookupFieldValues', {
        coId: "33F3D538BF624136A327084DB90BAC52",
        id: "15D0583932A149DB926A2286BED8A12A",
        viewFilterId: "24B0B0B800164B1089B2811573D3D9A5"
    });
    $('#ilce').select2('enable', false);
    $('#modalAdres').modal({
        backdrop: 'static',
        keyboard: false
    });
    $('#modalAdres .modal-header button:first').remove();
}

function checkValidationMusteri() {
    if (String.isNullOrWhiteSpace($('#meslek').select2('data')) || String.isNullOrWhiteSpace($('#tcNo').val()) || String.isNullOrWhiteSpace($('#egitimDurumu').select2('data')) || String.isNullOrWhiteSpace($('#uyruk').select2('data')) ||
        String.isNullOrWhiteSpace($('#dogumTarihi').val()) || String.isNullOrWhiteSpace($('#medeniDurum').select2('data')) || String.isNullOrWhiteSpace($('#cinsiyet').select2('data'))) {
        $('#musteriMsg').show();
        setUtil.alert({
            container: '#modalMusteriInfo #musteriMsg',
            message: "Lütfen tüm alanları doldurunuz.",
            alertClass: 'alert-danger',
            autoClose: false
        });
        return false;
    }
    return true;
}

function checkValidationAdres() {
    if (String.isNullOrWhiteSpace($('#il').select2('data')) || String.isNullOrWhiteSpace($('#sokak').val()) || String.isNullOrWhiteSpace($('#mahalle').val()) || String.isNullOrWhiteSpace($('#postaKodu').val()) ||
        String.isNullOrWhiteSpace($('#ilce').select2('data'))) {
        $('#musteriMsg').show();
        setUtil.alert({
            container: '#modalAdres #adresMsg',
            message: "Lütfen tüm alanları doldurunuz.",
            alertClass: 'alert-danger',
            autoClose: false
        });
        return false;
    }
    return true;

}