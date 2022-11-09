$(function() {
    $('form').on('submit',
        function(e, options) {
            options = options || {};
            if (!options.lots_of_stuff_done) {
                $('#B21F2B3C8FE74673AD9984CDB9183A1F').trigger('change');
                var adinaSatinalmaYapti = $('#E31A4677BEE843FEB17C0017005B14C0').val();
                if (adinaSatinalmaYapti === "3F5BFFA89BEB4395B98223DEFB85A546") {
                    if (!String.isNullOrWhiteSpace($('#01813BA593AA4DE1BF389991EAF91482').val())) {
                        //sistem hatasına takıldı bir daha oluşturmaması için
                        indirimOraniKontrol(e);
                        e.preventDefault();
                        return;
                    }
                    adinaSatinAlma(e);
                    e.preventDefault();
                } else {
                    indirimOraniKontrol(e);
                    e.preventDefault();
                }
            }
        });

    function adinaSatinAlma(e) {
        $('#TableChangedWarning').modal('hide');
        $('#modalAdinaSatinAlma').remove();
        window.setModal.Create({
            id: 'modalAdinaSatinAlma',
            html: {
                header: 'Kişi Bilgileri',
                body: '<div id="msg"></div>',
                footer: '<button class="btn btn-success btn-sm" style="display:none" id="kisi-bilgileri-kaydetvebitir">İşlemi Bitir</button>'
            },
            settings: {
                widthClass: 'modal-full-width'
            }
        });
        $('#modalAdinaSatinAlma .modal-header button').remove();
        $('#modalAdinaSatinAlma').modal({
            backdrop: 'static',
            keyboard: false
        })
        $("#modalAdinaSatinAlma .modal-body").append("<iframe src='/set/new/adina-satin-alma?pageLayoutId=DA6736D259DC4DA8A4E23E2A06268D9B' id='frameAdinaSatinAlma' style='width:100%;height:700px;border:none;' frameborder='0'></iframe>");
        var recordId = "";
        var musteri = $("#83779721FB37432FB10BEBD630E319F1").select2('data');
        var arr = [];
        $('#frameAdinaSatinAlma').on("load",
            function() {
                calcHeight(this);
                recordId = $("#frameAdinaSatinAlma").contents().find('#RecordPublicId').val();
                if (!String.isNullOrWhiteSpace(recordId)) {
                    arr.push(recordId);
                    $('#kisi-bilgileri-kaydetvebitir').trigger('click');
                }
                $("#frameAdinaSatinAlma").contents().find('#navbarmenu, #btn_save_and_new, footer').remove();
                $("#frameAdinaSatinAlma").contents().find('.well-xxs:first').hide();
                $("#frameAdinaSatinAlma").contents().find('body').attr("style", "padding-top:0 !important");
                setTimeout(() => {
                    $("#frameAdinaSatinAlma").contents().find('body').append(String.format('<script>$("#F028288AA9C94BC885C2274FBA7CE828").select2("data", {id:"{0}", text:"{1}"}).trigger("change")<\/script>', musteri.id, musteri.text));
                }, 1000);
            });
        $('body').on('click',
            '#kisi-bilgileri-kaydetvebitir',
            function() {
                if (arr.length == 0) {
                    setUtil.alert({
                        container: '#msg',
                        message: "İşleme devam etmek için en az bir tane adına satın alma girişi yapmalısınız.",
                        alertClass: 'alert-danger',
                        autoClose: true
                    });
                    return;
                }
                $('#modalAdinaSatinAlma').modal('toggle')
                $('#01813BA593AA4DE1BF389991EAF91482').val(arr.join('|'));
                indirimOraniKontrol(e);
            });
    }

    function musteriKontrol(e) {
        // debugger;

        if ($('#modalMusteri').length > 0) return;
        var musteriModel,
            adresModel,
            musteriId = $('#83779721FB37432FB10BEBD630E319F1').val();

        if (musteriId != "") {
            ModalCreate();
            $('#txt').show();
            var localUrl = 'https://localhost:44305/api/data/MusteriKontrol?musteriId=' + musteriId;
            var realUrl = 'https://nefwebapi.setcrm.com/api/data/MusteriKontrol?musteriId=' + musteriId;
            $.get(realUrl, function(r) {
                if (r.Status) {
                    if (r.musteri) {
                        if (r.adres) {
                            indirimIndirimKontrol(e)
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
        }

        $('body').on('click',
            '#chkDiger',
            function() {
                if ($(this).prop('checked')) {
                    $('#chkYurtdisi').prop('checked', false);
                }
            })
        $('body').on('click',
            '#chkYurtdisi',
            function() {
                if ($(this).prop('checked')) {
                    $('#chkDiger').prop('checked', false);
                }
            })
        $('body').on('click',
            '#btnMusteriKaydet',
            function() {
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
                            $('#modalMusteriInfo').modal('toggle');
                            indirimIndirimKontrol(e)
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
                        $('#modalMusteriInfo').modal('toggle');
                        indirimIndirimKontrol(e)
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
            var chk = $('#chkDiger').prop('checked');
            var chkY = $('#chkYurtdisi').prop('checked');
            if (chk || chkY) {
                var il,
                    ilce;
                if (!String.isNullOrWhiteSpace($('#il').select2('data'))) {
                    il = {
                        id: $('#il').select2('data').id,
                        text: $('#il').select2('data').text
                    };
                }
                if (!String.isNullOrWhiteSpace($('#ilce').select2('data'))) {
                    ilce = {
                        id: $('#ilce').select2('data').id,
                        text: $('#ilce').select2('data').text
                    };
                }
                adresModel = {
                    YurtDisi: chkY,
                    Diger: chk,
                    Il: il,
                    Ilce: ilce,
                    Mahalle: $('#mahalle').val(),
                    Sokak: $('#sokak').val(),
                    PostaKodu: $('#postaKodu').val()
                };
            } else {
                adresModel = {
                    YurtDisi: chkY,
                    Diger: chk,
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
                    // setTimeout(function () {

                    //     $('#83779721FB37432FB10BEBD630E319F1').trigger('change');
                    // }, 3000);
                    $('#modalAdres').modal('toggle');
                    indirimIndirimKontrol(e)
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
                        '<tr><th style="background:#21d961; tex-align:left">Adres(Yurtdışı)</th><th style="background:#21d961; tex-align:left">Adres(Diğer)</th></tr>' +
                        '</thead>' +
                        '<tbody>' +
                        '<tr>' +
                        '<td style="width:500px; height:40px;"><input id="chkYurtdisi" class="chkYurtdisi" type="checkbox"></input></td><td style="width:500px; height:40px;"><input id="chkDiger" class="chkDiger" type="checkbox"></input></td>' +
                        '</tr>' +
                        '</tbody>' +
                        '</table>' +
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
            var yurtDisi = $('#chkYurtdisi').prop('checked');
            var diger = $('#chkDiger').prop('checked');
            if (yurtDisi || diger) {
                return true;
            } else if (String.isNullOrWhiteSpace($('#sokak').val()) || String.isNullOrWhiteSpace($('#mahalle').val()) || String.isNullOrWhiteSpace($('#postaKodu').val()) || String.isNullOrWhiteSpace($('#il').select2('data')) || String.isNullOrWhiteSpace($('#ilce').select2('data'))) {
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
    }

    function indirimIndirimKontrol(e) {
        if (String.isNullOrWhiteSpace($('.jsonData').val())) {
            yonlendir(e);
            return;
        }

        if (!String.isNullOrWhiteSpace($('#7982216415AC4CC9966FFA7082003752').val())) {
            yonlendir(e);
            return;
        }

        var oran = $('#E4513088813B4E048C7B5512BDE01E32').val();
        if (String.isNullOrWhiteSpace(oran)) {
            oran = 0;
        } else {
            oran = parseInt(oran);
        }

        var indirimOrani = $('#3CA2E9825B774A7DA4F296ED6A5E0916').val();
        indirimOrani = String.isNullOrWhiteSpace(indirimOrani) ? 0 : parseInt(indirimOrani);
        if (indirimOrani > parseInt(oran)) {
            $('#modalIndirimTutariWarning').remove();
            window.setModal.Create({
                id: 'modalIndirimTutariWarning',
                html: {
                    header: 'İndirim Oranı Aşıldı',
                    body: '<div id="msg" class="alert alert-warning"><b class="badge badge-primary">Maksimum indirim oranınız %' + oran + 'dir.</b> <br>İndirim oranı aşılan satış(lar) mevcut. Satışınız yönetici onayına gidecektir.<br> Devam etmek istediğinizden emin misiniz?<br> </div><input id="aciklama" type="text" class="form-control" maxlength="450" placeholder="Açıklama giriniz..">',
                    footer: '<button id="devam" type="button" class="btn btn-m btn-success btn-sm" >Evet</button><button id="duzenle" type="button" class="btn btn-m btn-default btn-sm">Hayır</button>'
                }
            });
            $('#modalIndirimTutariWarning .modal-header button').remove();
            $('#modalIndirimTutariWarning').modal({
                backdrop: 'static',
                keyboard: false
            });

            $('body').on('click', '#duzenle', function() {
                $("form").find('div #btn_save, div #btn_save_and_new').removeAttr('disabled').prop('disabled', false);
                $('#modalIndirimTutariWarning').modal('hide');
            });
            $('body').on('click', '#devam', function() {
                $('#7982216415AC4CC9966FFA7082003752').val($('#aciklama').val());
                $('#modalIndirimTutariWarning').modal('hide');
                yonlendir(e);
            });
        } else {
            yonlendir(e);
            return;
        }
    }

    function calcHeight(iframeElement) {
        var the_height = iframeElement.contentWindow.document.body.scrollHeight;
        iframeElement.height = the_height;
    }

    function indirimOraniKontrol(e) {
        // debugger;
        $('#TableChangedWarning').modal('hide');
        var adinaSatinalmaYapti = $('#E31A4677BEE843FEB17C0017005B14C0').val();
        if (adinaSatinalmaYapti == "6BD7B3CCC9DC485482C637F67BB6AF8E") {
            musteriKontrol(e);
        } else {
            indirimIndirimKontrol(e);
        }
    }

    function yonlendir(e) {
        $(e.currentTarget).trigger('submit', {
            'lots_of_stuff_done': true
        });
    }
});