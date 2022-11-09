$(function() {
    $('#B660AA2F44664464AB04B3999F9926B9').attr('disabled', true);
    $('#56412764E98B4A6D8E5A6DC05DD8665A').attr('disabled', true);
    $('#4753E47B84E147589211562D71EA54F6').select2('enable', false).removeAttr('disabled');
    var total, sezon, lokasyon, lokasyonData, odaTipi;
    var sezonpaket;
    //$('#3A958E190AE54C1E8FC808681F7585A1')
    $('body').on('change', '#3A958E190AE54C1E8FC808681F7585A1', function() {
        $('#769B06E3E3624130A46AF09FFEBA7CF0').trigger('change');
    });
    $('body').on('click', '.add-row', function() {
            $('#ED83618582F94F40957C5548851A9EE8').select2('enable', false).removeAttr('disabled');
            tekli = $('#F8DFD79106C44812A06BCA46DE4B34B6').select2('data');
            $('#4753E47B84E147589211562D71EA54F6').select2('data', sezonpaket).trigger('change');
            $('#4753E47B84E147589211562D71EA54F6').select2('enable', false).removeAttr('disabled');
            $('#B660AA2F44664464AB04B3999F9926B9').val('');
            $('#56412764E98B4A6D8E5A6DC05DD8665A').val('');
            if (!String.isNullOrWhiteSpace(tekli)) {
                if (tekli.id == "998A6494818A4A7F967816DA197CAE2D") {
                    if (lokasyonData.text == "Alaçatı") {
                        $('#769B06E3E3624130A46AF09FFEBA7CF0').select2('data', lokasyonData).trigger('change');
                        $('#769B06E3E3624130A46AF09FFEBA7CF0').select2('enable', false).removeAttr('disabled');
                        $('.add-row').attr('disabled', false);
                        $('.reset-row').attr('disabled', false);
                        // $('#4753E47B84E147589211562D71EA54F6').select2('enable', true);
                        $('#8A8B4C702A0A49F99A1352F4C0F819E3').attr('disabled', false);
                        $('#2D00CE965F5845CAB03065004D2CE22C').attr('disabled', false);
                    } else {
                        $('#769B06E3E3624130A46AF09FFEBA7CF0').select2('data', lokasyonData).trigger('change');
                        $('#769B06E3E3624130A46AF09FFEBA7CF0').select2('enable', false).removeAttr('disabled');
                        $('.add-row').attr('disabled', false);
                        $('.reset-row').attr('disabled', false);
                        // $('#4753E47B84E147589211562D71EA54F6').select2('enable', true);
                        $('#8A8B4C702A0A49F99A1352F4C0F819E3').attr('disabled', false);
                        $('#2D00CE965F5845CAB03065004D2CE22C').attr('disabled', false);
                        // $('.add-row').attr('disabled', true);
                        // $('.reset-row').attr('disabled', true);
                        // // $('#4753E47B84E147589211562D71EA54F6').select2('enable', false);
                        // $('#8A8B4C702A0A49F99A1352F4C0F819E3').attr('disabled', true);
                        // $('#2D00CE965F5845CAB03065004D2CE22C').attr('disabled', true);
                        // $('#769B06E3E3624130A46AF09FFEBA7CF0').select2('enable', false).removeAttr('disabled');
                    }
                }
                //  else {

                //     $('.add-row').attr('disabled', false);
                //     $('.reset-row').attr('disabled', false);
                //      $('#4753E47B84E147589211562D71EA54F6').select2('enable', true);
                //     $('#8A8B4C702A0A49F99A1352F4C0F819E3').attr('disabled', false);
                //     $('#2D00CE965F5845CAB03065004D2CE22C').attr('disabled', false);
                // }
            }
        })
        // if (String.isNullOrWhiteSpace($('#F8DFD79106C44812A06BCA46DE4B34B6').select2('data'))) {
        //     $('#4753E47B84E147589211562D71EA54F6').select2('enable', false);
        // }
    $('body').on('change',
        '#F8DFD79106C44812A06BCA46DE4B34B6',
        function() {


            if (!String.isNullOrWhiteSpace($(this).select2('data'))) {
                if ($(this).select2('data').id == "998A6494818A4A7F967816DA197CAE2D") {
                    $('#F8DFD79106C44812A06BCA46DE4B34B6').select2('enable', false).removeAttr('disabled');

                    // $('#4753E47B84E147589211562D71EA54F6').select2('enable', true);
                } else {
                    $('#F8DFD79106C44812A06BCA46DE4B34B6').select2('enable', false).removeAttr('disabled');
                    $('.add-row').attr('disabled', false);
                    $('.reset-row').attr('disabled', false);
                }
            } else {
                $('.add-row').attr('disabled', false);
                $('.reset-row').attr('disabled', false);
                // $('#4753E47B84E147589211562D71EA54F6').select2('enable', false);
            }
        });
    $('body').on('change',
        '#ED83618582F94F40957C5548851A9EE8',
        function() {
            if (!String.isNullOrWhiteSpace($(this).select2('data'))) {
                sezonpaket = $(this).select2('data');
                $('#4753E47B84E147589211562D71EA54F6').select2('data', sezonpaket).trigger('change');
                $('#4753E47B84E147589211562D71EA54F6').select2('enable', false).removeAttr('disabled');
            }
        });

    $('body').on('change',
        '#4753E47B84E147589211562D71EA54F6',
        function() {
            sezon = "";
            if (!String.isNullOrWhiteSpace($(this).select2('data'))) {
                sezon = $(this).select2('data').text;
            } else {
                $('#56412764E98B4A6D8E5A6DC05DD8665A, #B660AA2F44664464AB04B3999F9926B9, #8A8B4C702A0A49F99A1352F4C0F819E3, #2D00CE965F5845CAB03065004D2CE22C').val('');
            }
            // $('label[for=ADB9B7F32201437F80DE18094BCFE440]').show()
            // $('#ADB9B7F32201437F80DE18094BCFE440').parent().show();
            // $('label[for=B660AA2F44664464AB04B3999F9926B9]').show();
            // $('#B660AA2F44664464AB04B3999F9926B9').parent().show();
        });
    $('body').on('click',
        '.edit-row',
        function() {
            $('#s2id_edit-769B06E3E3624130A46AF09FFEBA7CF0').select2('enable', false).removeAttr('disabled');
            // $('#s2id_edit-ADB9B7F32201437F80DE18094BCFE440').select2('enable', false).removeAttr('disabled');
            $('#s2id_edit-4753E47B84E147589211562D71EA54F6').select2('enable', false).removeAttr('disabled');
            $('#edit-56412764E98B4A6D8E5A6DC05DD8665A').prop('disabled', true);
            $('#edit-B660AA2F44664464AB04B3999F9926B9').prop('disabled', true);
        })
    $('body').on('change',
        '#769B06E3E3624130A46AF09FFEBA7CF0',
        function() {
            total = "";
            lokasyon = "";
            if (!String.isNullOrWhiteSpace($(this).select2('data'))) {
                lokasyon = $(this).select2('data').text;
                lokasyonData = $(this).select2('data');
                var tekli = $('#F8DFD79106C44812A06BCA46DE4B34B6').select2('data').text;
                if (lokasyon == "Alaçatı" && tekli == "Dönüşümlü") {
                    $('#769B06E3E3624130A46AF09FFEBA7CF0').select2('data', null).trigger('change');
                    notify("danger", "Dönüşümlü lokasyonda Alaçatı seçimi yapılamamaktadır.");
                }
                if (!String.isNullOrWhiteSpace(sezon)) {
                    if ($(this).select2('data').text !== "Alaçatı") {
                        //$('#ADB9B7F32201437F80DE18094BCFE440').select2('enable', false).removeAttr('disabled');

                        // $('#ADB9B7F32201437F80DE18094BCFE440').select2('enable', false);
                        // $('#ADB9B7F32201437F80DE18094BCFE440').parent().hide();
                        // $('label[for=ADB9B7F32201437F80DE18094BCFE440]').hide()
                        // total = sezon + lokasyon;
                        // FiyatHesapla(total);
                    } else {
                        // $('#ADB9B7F32201437F80DE18094BCFE440').select2('enable', false).removeAttr('disabled');
                        //$('#ADB9B7F32201437F80DE18094BCFE440').select2('enable', true);

                        // $('label[for=ADB9B7F32201437F80DE18094BCFE440]').show()
                        // $('#ADB9B7F32201437F80DE18094BCFE440').parent().show();
                        // $('#ADB9B7F32201437F80DE18094BCFE440').select2('enable', true);
                    }
                }
            } else {
                $('#56412764E98B4A6D8E5A6DC05DD8665A, #B660AA2F44664464AB04B3999F9926B9, #8A8B4C702A0A49F99A1352F4C0F819E3, #2D00CE965F5845CAB03065004D2CE22C').val('');
            }
        });
    $('body').on('change',
        '#ADB9B7F32201437F80DE18094BCFE440',
        function() {
            total = "";
            odaTipi = "";
            if (!String.isNullOrWhiteSpace($(this).select2('data'))) {
                odaTipi = $(this).select2('data').text;
                if (!String.isNullOrWhiteSpace(sezon) && !String.isNullOrWhiteSpace(lokasyon)) {
                    total = sezon + lokasyon + odaTipi;
                    FiyatHesapla(total);
                }
            } else {
                $('#56412764E98B4A6D8E5A6DC05DD8665A, #B660AA2F44664464AB04B3999F9926B9, #8A8B4C702A0A49F99A1352F4C0F819E3, #2D00CE965F5845CAB03065004D2CE22C').val('');
            }
        });
})

function FiyatHesapla(total) {
    $('.add-row').attr('disabled', true);
    $('.reset-row').attr('disabled', true);
    var sezonpaket = $('#ED83618582F94F40957C5548851A9EE8').select2('data');
    var lokasyonData = $('#769B06E3E3624130A46AF09FFEBA7CF0').select2('data');
    $('#56412764E98B4A6D8E5A6DC05DD8665A, #B660AA2F44664464AB04B3999F9926B9').attr('style', 'background:url("/public/img/spinner.gif") center center no-repeat;transition: transform 0.2s ease 0s;');
    var odemeSekli = $('#3A958E190AE54C1E8FC808681F7585A1').val();
    if (String.isNullOrWhiteSpace(odemeSekli)) {
        notify("warning", "Fiyat sorgulaması için lütfen ödeme şeklini doldurunuz.");
        return;
    }
    var localUrl = 'https://localhost:44305/api/data/FiyatSorgula?total=' + total + '&odemeSekli=' + odemeSekli;
    var realUrl = 'https://nefwebapi.setcrm.com/api/data/FiyatSorgula?total=' + total + '&odemeSekli=' + odemeSekli;

    $.get(realUrl, function(r) {
        $('#56412764E98B4A6D8E5A6DC05DD8665A, #B660AA2F44664464AB04B3999F9926B9').removeAttr('style').attr('style',
            'text-align:right');
        if (r.Status) {
            $('#56412764E98B4A6D8E5A6DC05DD8665A').val(r.Fiyat).trigger('change');
            if (!String.isNullOrWhiteSpace(r.Taahhut)) {
                // $('label[for=B660AA2F44664464AB04B3999F9926B9]').show();
                // $('#B660AA2F44664464AB04B3999F9926B9').parent().show();
                $('#B660AA2F44664464AB04B3999F9926B9').val(r.Taahhut).trigger('change');
            } else {
                // $('label[for=B660AA2F44664464AB04B3999F9926B9]').hide();
                // $('#B660AA2F44664464AB04B3999F9926B9').parent().hide();
            }
            if (!String.isNullOrWhiteSpace(r.HisseyeDusenPay)) {
                $('#088DA415B8034B6286F6DD1A085E4220').val(r.HisseyeDusenPay).trigger('change');
            }
            $('.add-row').attr('disabled', false);
            $('.reset-row').attr('disabled', false);
        } else {
            notify("danger", r.Message);
            if ($('#F8DFD79106C44812A06BCA46DE4B34B6').select2('data').id == "998A6494818A4A7F967816DA197CAE2D" && lokasyonData.text == "Alaçatı") {
                $('#769B06E3E3624130A46AF09FFEBA7CF0').select2('data', lokasyonData).trigger('change');
                $('#769B06E3E3624130A46AF09FFEBA7CF0').select2('enable', false).removeAttr('disabled');
            }
            $('#4753E47B84E147589211562D71EA54F6').select2('data', sezonpaket).trigger('change');

            $('.add-row').attr('disabled', false);
            $('.reset-row').attr('disabled', false);
        }
    })
}

function notify(type, message) {
    $.notify({
        icon: type === "success" ? 'fas fa-check-double' : 'fas fa-times-circle',
        message: message
    }, {
        z_index: '9999999',
        type: type,
        placement: {
            from: "top",
            align: "right"
        },
        offset: 50,
        animate: {
            enter: 'animated flipInY',
            exit: 'animated flipOutX'
        },
    });
}