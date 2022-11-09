$(function() {
    $('#btnFormOlustur').hide();
    var odemeTipi = $('label[for=3A958E190AE54C1E8FC808681F7585A1]').parent().data('publicids');
    if (!String.isNullOrWhiteSpace(odemeTipi)) {
        if (odemeTipi == "6F4AE761A77148EDA2B53D77F40A00D6") {
            $('label[for=C74AD9F0EBB14636913F4593941118F0]').parent().hide();
            $('label[for=1C41CF171C32431B8CBCCDA1F6185E6D]').parent().hide();
            $('label[for=B5FF10B707D44690BB84092CB7E251ED]').parent().hide();
            $('label[for=7DF51D42E1B34E05BD3F5CCB0B34CF31]').parent().hide();
            $('label[for=D50EDC3D814E48CFA717F34FF29BC83C]').parent().hide();

            $('label[for=F748F70DBB9F45268C9DEAF1CF61C887]').parent().hide();
            $('label[for=C9BBC090DE384DD481982919D44246A9]').parent().hide();
            $('label[for=99461E8E060C469DA1C25EA4AF6F8A11]').parent().hide();
        } else {
            $('label[for=C74AD9F0EBB14636913F4593941118F0]').parent().show();
            $('label[for=1C41CF171C32431B8CBCCDA1F6185E6D]').parent().show();
            $('label[for=B5FF10B707D44690BB84092CB7E251ED]').parent().show();
            $('label[for=7DF51D42E1B34E05BD3F5CCB0B34CF31]').parent().show();
            $('label[for=D50EDC3D814E48CFA717F34FF29BC83C]').parent().show();
            $('label[for=F748F70DBB9F45268C9DEAF1CF61C887]').parent().show();
            $('label[for=C9BBC090DE384DD481982919D44246A9]').parent().show();
            $('label[for=99461E8E060C469DA1C25EA4AF6F8A11]').parent().show();
        }
    } else {
        $('label[for=C74AD9F0EBB14636913F4593941118F0]').parent().show();
        $('label[for=1C41CF171C32431B8CBCCDA1F6185E6D]').parent().show();
        $('label[for=B5FF10B707D44690BB84092CB7E251ED]').parent().show();
        $('label[for=7DF51D42E1B34E05BD3F5CCB0B34CF31]').parent().show();
        $('label[for=D50EDC3D814E48CFA717F34FF29BC83C]').parent().show();
    }
    var odemePlaniOlustuMu = $('label[for=E1968BF9DC3B47F2A03AD2D874A940D5]').parent().data('value');
    var onayDurumu = false;
    if (odemePlaniOlustuMu == 'False') {
        $('.well .pull-right:eq(0)').prepend('<a id="btnOdeme" class="btn btn-sm btn-primary" style="margin-right:5px;">Ödeme Planı Oluştur</a>');

    } else {
        $('.well .pull-right:eq(0)').prepend('<a id="btnOdemeRevize" class="btn btn-sm btn-primary" style="margin-right:5px;">Ödeme Planını Revize Et</a>');

    }
    $('#btnOdeme').hide();
    $('#btnOdemeRevize').hide();

    setTimeout(function() {
        var url = 'https://nefwebapi.setcrm.com/api/data/LrOkuma?recordId=' + $('#RecordPublicId').val() + '&lrId=7B91E21928384B5F8C421ACBAA729175';
        $.get(url, function(r) {
            if (r.IsOk) {
                var records = r.Records;
                $.each(records, function(i, v) {
                    if (v.Values[4].Value == "Reddedildi" || v.Values[4].Value == "Onay Bekleniyor") {
                        onayDurumu = true;
                    }
                });
                if (onayDurumu) {
                    $('#btnOdeme').hide();
                    $('#btnOdemeRevize').hide();
                } else {
                    $('#btnOdeme').show();
                    $('#btnOdemeRevize').show();
                }
            } else {
                $('#btnOdeme').show();
                $('#btnOdemeRevize').show();
            }
        });
        var formUrl = 'https://nefwebapi.setcrm.com/api/data/LrOkuma?recordId=' + $('#RecordPublicId').val() + '&lrId=EAE93A08EF0645D1B7B9FA1C11C8F190';
        $.get(formUrl,
            function(r) {
                if (r.IsOk) {

                    $('#btnFormOlustur').show();

                } else {
                    $('#btnFormOlustur').hide();
                }
            });
    }, 1000);

    $('body').on('click',
        '#btnOdeme',
        function() {
            //FirstModalCreate();
            debugger;
            $('#modalVClubYeni').remove();
            window.setModal.Create({
                id: 'modalVClubYeni',
                html: {
                    header: 'V Club Ödeme Planı',
                    body: '<div id="sapMsg"></div><div id="loading-bar">İşleminiz yapılıyor, Lütfen bekleyiniz...<br> <img src="/Public/img/loading_bar.gif"></div><div id="transfer-block"></div>',
                    footer: '<button data-dismiss="modal" class="btn btn-danger btn-sm">Kapat</button>'
                }
            });
            $('#modalVClubYeni').modal('toggle');
            debugger;
            var araOdeme = $('label[for=7DF51D42E1B34E05BD3F5CCB0B34CF31]').parent().data('publicids');
            if (araOdeme == '8CAADBA9C29D44B890761DE79DAA691C' || String.isNullOrWhiteSpace(araOdeme)) {
                var localUrl = 'https://localhost:44305/api/data/OdemePlaniOlusturVClub?recordId=' + $('#RecordPublicId').val() + '&araOdeme=false';
                var realUrl = 'https://nefwebapi.setcrm.com/api/data/OdemePlaniOlusturVClub?recordId=' + $('#RecordPublicId').val() + '&araOdeme=false';
                $.post(realUrl, function(r) {
                    $('#loading-bar').hide();
                    if (r.Status) {
                        setUtil.alert({
                            container: '#modalVClubYeni #sapMsg',
                            message: "İşlem başarılı, sayfa yenileniyor.",
                            alertClass: 'alert-success',
                            autoClose: false
                        });
                        setTimeout(function() {
                            window.location.reload();
                        }, 3000);
                    } else {
                        setUtil.alert({
                            container: '#modalVClubYeni #sapMsg',
                            message: r.message,
                            alertClass: 'alert-danger',
                            autoClose: false
                        });

                    }
                });
            } else {
                var araOdemeSayisi = $('label[for=7DF51D42E1B34E05BD3F5CCB0B34CF31]').parent().data('value');
                var araOdemeTutar = $('label[for=D50EDC3D814E48CFA717F34FF29BC83C]').parent().data('value');

                if (String.isNullOrWhiteSpace(araOdemeSayisi) && String.isNullOrWhiteSpace(araOdemeTutar)) {
                    $('#loading-bar').hide();
                    setUtil.alert({
                        container: '#modalVClubYeni #sapMsg',
                        message: "Lütfen ara ödeme sayısı ve tutarını kontrol ediniz!",
                        alertClass: 'alert-danger',
                        autoClose: false
                    });

                    return;

                }
                //var odemeTutari = parseFloat(araOdemeSayisi) * parseFloat(araOdemeTutar);
                var odemeTutari = parseFloat(araOdemeSayisi) * parseFloat(calcSeparatorRemove(araOdemeTutar));
                var odemeTutariEdit = turkishLanguagePriceFormatedOutput(odemeTutari);

                var localUrl = 'https://localhost:44305/api/data/OdemePlaniOlusturVClub?recordId=' + $('#RecordPublicId').val() + '&araOdeme=true&araOdemeSayisi=' + araOdemeSayisi + '&araOdemeTutari=' + odemeTutariEdit;
                var realUrl = 'https://nefwebapi.setcrm.com/api/data/OdemePlaniOlusturVClub?recordId=' + $('#RecordPublicId').val() + '&araOdeme=true&araOdemeSayisi=' + araOdemeSayisi + '&araOdemeTutari=' + odemeTutariEdit;
                $.post(realUrl, function(r) {
                    $('#loading-bar').hide();

                    if (r.Status) {
                        setUtil.alert({
                            container: '#modalVClubYeni #sapMsg',
                            message: "İşlem başarılı, sayfa yenileniyor.",
                            alertClass: 'alert-success',
                            autoClose: false
                        });
                        setTimeout(function() {
                            window.location.reload();
                        }, 3000);
                    } else {
                        setUtil.alert({
                            container: '#modalVClubYeni #sapMsg',
                            message: r.message,
                            alertClass: 'alert-danger',
                            autoClose: false
                        });

                    }
                });
            }
        });
    $('body').on('click', '#btnOdemeRevize', function() {
        //FirstModalCreate();
        debugger;
        $('#modalVClubRevize').remove();
        window.setModal.Create({
            id: 'modalVClubRevize',
            html: {
                header: 'V Club Ödeme Planı',
                body: '<div id="sapMsg"></div><div id="loading-bar">İşleminiz yapılıyor, Lütfen bekleyiniz...<br> <img src="/Public/img/loading_bar.gif"></div><div id="transfer-block"></div>',
                footer: '<button data-dismiss="modal" class="btn btn-danger btn-sm">Kapat</button>'
            }
        });
        $('#modalVClubRevize').modal('toggle');
        debugger;
        var araOdeme = $('label[for=7DF51D42E1B34E05BD3F5CCB0B34CF31]').parent().data('publicids');
        if (araOdeme == '8CAADBA9C29D44B890761DE79DAA691C' || String.isNullOrWhiteSpace(araOdeme)) {

            var localUrl = 'https://localhost:44305/api/data/OdemePlaniOlusturVClub?recordId=' + $('#RecordPublicId').val() + '&araOdeme=false';
            var realUrl = 'https://nefwebapi.setcrm.com/api/data/OdemePlaniOlusturVClub?recordId=' + $('#RecordPublicId').val() + '&araOdeme=false';
            $.post(localUrl, function(r) {
                $('#loading-bar').hide();
                if (r.Status) {
                    setUtil.alert({
                        container: '#modalVClubRevize #sapMsg',
                        message: "İşlem başarılı, sayfa yenileniyor.",
                        alertClass: 'alert-success',
                        autoClose: false
                    });
                    setTimeout(function() {
                        window.location.reload();
                    }, 3000);
                } else {
                    setUtil.alert({
                        container: '#modalVClubRevize #sapMsg',
                        message: r.message,
                        alertClass: 'alert-danger',
                        autoClose: false
                    });

                }
            });
        } else {
            var araOdemeSayisi = $('label[for=7DF51D42E1B34E05BD3F5CCB0B34CF31]').parent().data('value');
            var araOdemeTutar = $('label[for=D50EDC3D814E48CFA717F34FF29BC83C]').parent().data('value');

            if (String.isNullOrWhiteSpace(araOdemeSayisi) && String.isNullOrWhiteSpace(araOdemeTutar)) {
                $('#loading-bar').hide();
                setUtil.alert({
                    container: '#modalVClubRevize #sapMsg',
                    message: "Lütfen ara ödeme sayısı ve tutarını kontrol ediniz!",
                    alertClass: 'alert-danger',
                    autoClose: false
                });

                return;

            }
            //var odemeTutari = parseFloat(araOdemeSayisi) * parseFloat(araOdemeTutar);
            var odemeTutari = parseFloat(araOdemeSayisi) * parseFloat(calcSeparatorRemove(araOdemeTutar));
            var odemeTutariEdit = turkishLanguagePriceFormatedOutput(odemeTutari);
            var localUrl = 'https://localhost:44305/api/data/OdemePlaniOlusturVClub?recordId=' + $('#RecordPublicId').val() + '&araOdeme=' + true + '&araOdemeSayisi=' + araOdemeSayisi + '&araOdemeTutari=' + odemeTutariEdit;
            var realUrl = 'https://nefwebapi.setcrm.com/api/data/OdemePlaniOlusturVClub?recordId=' + $('#RecordPublicId').val() + '&araOdeme=' + true + '&araOdemeSayisi=' + araOdemeSayisi + '&araOdemeTutari=' + odemeTutariEdit;
            $.post(localUrl, function(r) {
                $('#loading-bar').hide();
                if (r.Status) {
                    setUtil.alert({
                        container: '#modalVClubRevize #sapMsg',
                        message: "İşlem başarılı, sayfa yenileniyor.",
                        alertClass: 'alert-success',
                        autoClose: false
                    });
                    setTimeout(function() {
                        window.location.reload();
                    }, 3000);
                } else {
                    setUtil.alert({
                        container: '#modalVClubRevize #sapMsg',
                        message: r.message,
                        alertClass: 'alert-danger',
                        autoClose: false
                    });

                }
            });
        }
    });

    function turkishLanguagePriceFormatedOutput(price, digit) {

        if (String.isNullOrWhiteSpace(digit)) {
            digit = 2;
        }

        var oldPrice = price;
        if (String.isNullOrWhiteSpace(price)) {
            price = "0";
        }

        var currency_symbol = "₺";
        var formattedOutput = new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'TRY',
            minimumFractionDigits: digit,
        });

        return isNaN(price) ? oldPrice : formattedOutput.format(price).replace(currency_symbol, '');
    }

    function calcSeparatorRemove(value) {
        var returnedString = String.isNullOrWhiteSpace(value) ? "0" : value.replace(".",
            "").replace(",",
            ".");
        return returnedString;
    }
});