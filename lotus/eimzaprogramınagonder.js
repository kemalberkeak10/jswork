$(function() {
    var url = '';
    // if (window.location.href.contains('lotuslab')) {
    //     url = 'https://lotuslabservice.setxrm.com';
    // } else {
    //     url = 'http://xrmserver:8086';
    // }
    url = "http://localhost:55910";
    var imzalar = [];
    var checkKontrol = [];
    setTimeout(function() {
        if (userData.name == "Admin Lotus") {
            // if ($('#FilterId').val() === '0EA243DAD5134BB0AAA6E2103F812DA5' || $('#FilterId').val() === '8031D291FD42486CBD0F18E73C3D334C' || $('#FilterId').val() === '0B5F9F7E9B4C45A28D99A5E7860E89FC') {
            $('.well .pull-right:eq(0)').prepend('<a id="eimzaOlusturETugra" class="btn btn-sm btn-success " >E-imza Programına Gönder TEST</a>');
            var imzaBilgiler = [];
            $('.table-bordered').find('tbody tr').each(function() {
                var satirId = $(this).closest('tr').data('id');
                var imzalar = {
                    NumuneRecordId: $(this).closest('tr').find('td:eq(7)').data('value'),
                    Turu: $(this).closest('tr').find('td:eq(4)').data('value'),
                    RecordId: satirId,
                };
                imzaBilgiler.push(imzalar);
            });
            var data = {};
            var satirBilgiler = JSON.stringify(imzaBilgiler);
            data.ImzaBilgiler = satirBilgiler;
            // if ($('#FilterId').val() === '0EA243DAD5134BB0AAA6E2103F812DA5') {
            //     // lab
            //     $.post(url + '/api/data/EimzaSurecSorgulaLab?data=', data, function(result) {
            //         if (result.length > 0) {
            //             for (var i = 0; i < result.length; i++) {
            //                 var ths = $('.table-bordered').find('tbody tr[data-id=' + result[i] + ']')
            //                 ths.find('td:eq(0)').html('');
            //                 $('<input />', {
            //                     type: 'checkbox',
            //                     value: name,
            //                     checked: false
            //                 }).appendTo(ths.find('td:eq(0)'));
            //             }
            //         }
            //     });
            // } else {
            //     $.post(url + '/api/data/EimzaSurecSorgula?data=', data, function(result) {
            //         if (result.length > 0) {
            //             for (var i = 0; i < result.length; i++) {
            //                 var ths = $('.table-bordered').find('tbody tr[data-id=' + result[i] + ']')
            //                 ths.find('td:eq(0)').html('');
            //                 $('<input />', {
            //                     type: 'checkbox',
            //                     value: name,
            //                     checked: false
            //                 }).appendTo(ths.find('td:eq(0)'));
            //             }
            //         }
            //     });
            // }
        }
    }, 1500);
    $('body').on('click', '#eimzaOlusturETugra', function() {
        var sayi = $('.table-bordered tbody tr').find('td:eq(0) input:checked').length;
        if (sayi > 7) {
            alert("7 den fazla kayıt gönderilemez. Seçim sayısı : " + sayi);
        } else {
            if ($('#FilterId').val() === '8031D291FD42486CBD0F18E73C3D334C') {
                // Lab müdürü ise
                $('.table-bordered tbody tr').find('td:eq(0) input:checked').each(function() {
                    var satirId = $(this).closest('tr').data('id');
                    // imzalar.push($(this).closest('tr').data('id'));
                    $.get(url + '/api/data/LabMuduruKontrol?recordId=' + $(this).closest('tr').find('td:eq(7)').data('value') + '&tip=' + $(this).closest('tr').find('td:eq(4)').data('value'), function(result) {
                        if (result !== "islem devam edebilir") {
                            alert(result);
                        } else {
                            imzalar.push(satirId);
                            if (imzalar.length === sayi) {
                                // window.open(url + '/api/templatelotus/GetTemplateEimza?imzalar=' + imzalar);
                                window.open(url + '/api/templatelotus/TopluImzalaETugra?imzalar=' + imzalar);
                            }
                        }
                    });
                });
            } else if ($('#FilterId').val() === '0EA243DAD5134BB0AAA6E2103F812DA5') {
                // lab
                var imzaBilgiler = [];
                $('.table-bordered tbody tr').find('td:eq(0) input:checked').each(function() {
                    var satirId = $(this).closest('tr').data('id');
                    var imzalar = {
                        NumuneRecordId: $(this).closest('tr').find('td:eq(7)').data('value'),
                        Turu: $(this).closest('tr').find('td:eq(4)').data('value'),
                        RecordId: satirId,
                    };
                    imzaBilgiler.push(imzalar);
                });
                var data = {};
                var satirBilgiler = JSON.stringify(imzaBilgiler);
                data.ImzaBilgiler = satirBilgiler;
                $.post(url + '/api/data/EimzaSurecSorgulaLab?data=', data, function(result) {
                    if (result.length > 0) {
                        for (var i = 0; i < result.length; i++) {
                            imzalar.push(result[i]);
                        }

                        // window.open(url + '/api/templatelotus/GetTemplateEimza?imzalar=' + imzalar);
                        window.open(url + '/api/templatelotus/TopluImzalaETugra?imzalar=' + imzalar);
                    }
                });
            } else {
                var imzaBilgiler = [];
                $('.table-bordered tbody tr').find('td:eq(0) input:checked').each(function() {
                    var satirId = $(this).closest('tr').data('id');
                    var imzalar = {
                        NumuneRecordId: $(this).closest('tr').find('td:eq(7)').data('value'),
                        Turu: $(this).closest('tr').find('td:eq(4)').data('value'),
                        RecordId: satirId,
                    };
                    imzaBilgiler.push(imzalar);
                });
                var data = {};
                var satirBilgiler = JSON.stringify(imzaBilgiler);
                data.ImzaBilgiler = satirBilgiler;
                $.post(url + '/api/data/EimzaSurecSorgula?data=', data, function(result) {
                    if (result.length > 0) {
                        for (var i = 0; i < result.length; i++) {
                            imzalar.push(result[i]);
                        }
                        // window.open(url + '/api/templatelotus/GetTemplateEimza?imzalar=' + imzalar);
                        window.open(url + '/api/templatelotus/TopluImzalaETugra?imzalar=' + imzalar);
                    }
                });
            }
        }
    });
});