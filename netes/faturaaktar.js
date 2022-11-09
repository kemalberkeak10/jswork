$(function() {
    var faturaNo = $('label[for=5A4B2EA85A7F4B6A9FAD32D69FCDF27A]').parent().data('value'); //fatura
    if (faturaNo == "") {
        $('.well .pull-right:eq(0)').prepend('<a id="btnAnalizEkle" class="btn btn-sm btn-warning"  style="margin-right:10px;" >Fatura Kaydet</a>');
        var data = {};
        $('body').on('click', '#btnAnalizEkle', function() {
            $('#faturaEkleModal').remove();
            window.setModal.Create({
                id: 'faturaEkleModal',
                html: {
                    header: 'FATURA AKTARIM SEÇİNİZ',
                    body: '<div id="msg" style="margin:0 0 5px"></div>' +
                        '<div class="custom-control custom-radio custom-control-inline" style="padding-left: 15px;">' +
                        '<input id="chkKalibrasyon" name="chk_' + 1 + '" value="2" type="checkbox" class="custom-control-input chk" /><label class="custom-control-label" style="margin-left:8px;margin-right:10px;">Kalibrasyon Faturası</label>' +
                        '<input id="chkKalibrasyonDegil" name="chk_' + 1 + '" value="1" type="checkbox" class="custom-control-input chk" /><label class="custom-control-label" style="margin-left:8px">Genel Fatura ( Eğitim, Sarf)</label> </div>' + '</br>',
                    footer: '<button id="faturaEkle" type="button" style="display:none;" class="btn btn-sm btn-success">Fatura Kaydet</button><button id="btnTedarikKapat" type="button" class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>'
                }
            });
            $('#faturaEkleModal .modal-dialog').css('width', '30%');
            $('#faturaEkleModal').modal('toggle');
            $('input[class="custom-control-input chk"]').click(function() {
                $('#faturaEkleModal .modal-body').css('height', '300px');
                if (!$('#chkKalibrasyon').prop('checked') && !$('#chkKalibrasyonDegil').prop('checked')) {
                    $('#faturaEkle').hide();
                } else {
                    $('#faturaEkle').show();
                }
                if ($(this).is(':checked')) {
                    if ($(this).attr('id') === "chkKalibrasyonDegil") {
                        data.recordId = $('#RecordPublicId').val();
                        data.kalibrasyonDegil = true;
                        data.kalibrasyon = false;
                    } else {
                        data.recordId = $('#RecordPublicId').val();
                        data.kalibrasyonDegil = false;
                        data.kalibrasyon = true;
                    }
                    $('input[name="' + $(this).attr('name') + '"]').prop('checked', false);
                    $(this).prop('checked', true);
                }
            });
        });

        $('body').on('click', '#faturaEkle', function() {
            $('#faturaEkle').attr('disabled', true);
            setUtil.alert({
                container: '#faturaEkleModal .modal-body #msg',
                message: 'Kontrol Ediliyor...',
                alertClass: 'alert-danger',
                autoClose: true
            });
            if (data.kalibrasyonDegil == true) {
                var chkUrl = "https://neteswebapilocal.setcrm.com/api/netes/CheckFatura?LrMi=false&recordId=" + data.recordId;
                var chkUrl2 = "http://localhost:58305/api/netes/CheckFatura?LrMi=false&recordId=" + data.recordId;
                $.get(chkUrl, function(r) {
                    if (r.Status) {
                        var iskonto = $('label[for=8E7BF51ECE90400B9D541F4F8A4A2C46]').parent().data('value');
                        if (iskonto === "" || iskonto === "0") { // Tablodaki tüm iskonto oranları 0 demektir. Sayfadaki Genel İskonto Oranı ile sorgulama yapılacaktır.
                            $('#faturaIskontoModal').remove();
                            window.setModal.Create({
                                id: 'faturaIskontoModal',
                                html: {
                                    header: 'Fatura Aktarım İskonto Uyarisi',
                                    body: '<div id="msg" style="margin:0 0 5px">Genel iskonto oranı ' + parseInt($('label[for=AA107E35288A44C3BCCA07DC7A26C830]').parent().data('value')) + ' (Genel İskonto Oranı) değeri ile devam edilecektir, onaylıyor musunuz ?</div>',
                                    footer: '<button id="faturaIskontoKaydet" type="button" class="btn btn-sm btn-info">Fatura Kaydet</button><button id="btnTedarikKapat" type="button" class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>'
                                }
                            });
                            $('#faturaIskontoModal .modal-dialog').css('width', '30%');
                            $('#faturaEkleModal').modal('toggle');
                            $('#faturaIskontoModal').modal('toggle');

                            $('body').on('click', '#faturaIskontoKaydet', function() {
                                $('#faturaEkleModal').modal('toggle');
                                $('#faturaIskontoModal').modal('toggle');
                                KayitAc();
                            });
                        } else {
                            KayitAc();
                        }
                    } else {
                        setUtil.alert({
                            container: '#faturaEkleModal .modal-body #msg',
                            message: r.Message,
                            alertClass: 'alert-danger',
                            autoClose: true
                        });
                        $('#faturaEkle').attr('disabled', false);
                    }
                });
            } else {
                var chkUrl = "https://neteswebapilocal.setcrm.com/api/netes/CheckFatura?LrMi=true&recordId=" + data.recordId;
                var chkUrl2 = "http://localhost:58305/api/netes/CheckFatura?LrMi=true&recordId=" + data.recordId;
                $.get(chkUrl, function(r) {
                    if (r.Status) {
                        KayitAc();
                    } else {
                        setUtil.alert({
                            container: '#faturaEkleModal .modal-body #msg',
                            message: r.Message,
                            alertClass: 'alert-danger',
                            autoClose: true
                        });
                        $('#faturaEkle').attr('disabled', false);
                    }
                });
            }

            function KayitAc() {
                setUtil.alert({
                    container: '#faturaEkleModal .modal-body #msg',
                    message: 'Fatura Kaydı Açılıyor.',
                    alertClass: 'alert-info',
                    autoClose: true
                });
                var url = "https://neteswebapilocal.setcrm.com/api/netes/FaturaAktar";
                var url2 = "http://localhost:58305/api/netes/FaturaAktar";
                $.get(url, data, function(r) {
                    debugger;
                    if (r.IsOk) {
                        "BAŞARILIR"
                        window.location.reload(true);
                    } else {
                        "BAŞARISIZ"
                        setUtil.alert({
                            container: '#faturaEkleModal .modal-body #msg',
                            message: 'Fatura Kaydı  Aktarılamadı..',
                            alertClass: 'alert-danger',
                            autoClose: true
                        });
                    }
                });
            }
        });
    }
});