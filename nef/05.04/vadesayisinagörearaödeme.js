$(function() {
    var vadeSayisi = $('#1C41CF171C32431B8CBCCDA1F6185E6D').val();
    var araOdemeSayisiSelect = $('#7DF51D42E1B34E05BD3F5CCB0B34CF31').select2('data');
    var araOdemeSayisi = araOdemeSayisiSelect != null ? araOdemeSayisiSelect.text : '';
    var maxAraOdemeSayisi = (parseInt(vadeSayisi) / 12).toString();

    if (maxAraOdemeSayisi.contains(',')) {
        maxAraOdemeSayisi = maxAraOdemeSayisi.split(',')[0];
    } else if (maxAraOdemeSayisi.contains('.')) {
        maxAraOdemeSayisi = maxAraOdemeSayisi.split('.')[0];
    }
    if (araOdemeSayisi != 'Ara Ödeme Yok') {

        if (araOdemeSayisi > maxAraOdemeSayisi) {

            notify("danger", "En fazla " + maxAraOdemeSayisi + " ara ödeme seçebilirsiniz");
            //$(this).val('');
            $('#7DF51D42E1B34E05BD3F5CCB0B34CF31').select2('data', null);
            //return;
        }
    }

    $('body').on('change', '#7DF51D42E1B34E05BD3F5CCB0B34CF31', function() {
        if (!String.isNullOrWhiteSpace($('#7DF51D42E1B34E05BD3F5CCB0B34CF31').select2('data'))) {
            var araOdemeSayisi = $('#7DF51D42E1B34E05BD3F5CCB0B34CF31').select2('data').text;
            var vadeSayisi1 = $('#1C41CF171C32431B8CBCCDA1F6185E6D').val();;
            var max1 = (parseInt(vadeSayisi1) / 12).toString();

            if (max1.contains(',')) {
                max1 = max1.split(',')[0];
            } else if (max1.contains('.')) {
                max1 = max1.split('.')[0];
            }
            if (araOdemeSayisi != 'Ara Ödeme Yok') {
                if (araOdemeSayisi > max1) {

                    if (max1 == '0') {
                        notify("danger", "Ara ödeme seçemezsiniz!");
                        //$(this).val('');
                        $('#7DF51D42E1B34E05BD3F5CCB0B34CF31').select2('data', null);
                        // return;
                    } else {
                        notify("danger", "En fazla " + max1 + " ara ödeme seçebilirsiniz!");
                        //$(this).val('');
                        $('#7DF51D42E1B34E05BD3F5CCB0B34CF31').select2('data', null);
                        // return;
                    }
                }
            }
        }
    })

    $('body').on('change',
        '#1C41CF171C32431B8CBCCDA1F6185E6D',
        function() {

            var araOdemeSayisi = $('#7DF51D42E1B34E05BD3F5CCB0B34CF31').select2('data').text;
            var vadeSayisi2 = $('#1C41CF171C32431B8CBCCDA1F6185E6D').val();;
            var max = (parseInt(vadeSayisi2) / 12).toString();

            if (max.contains(',')) {
                max = max.split(',')[0];
            } else if (max.contains('.')) {
                max = max.split('.')[0];
            }
            if (araOdemeSayisi != 'Ara Ödeme Yok') {
                if (araOdemeSayisi > max1) {

                    if (max1 == '0') {
                        notify("danger", "Ara ödeme seçemezsiniz!");
                        //$(this).val('');
                        $('#7DF51D42E1B34E05BD3F5CCB0B34CF31').select2('data', null);
                        // return;
                    } else {
                        notify("danger", "En fazla " + max1 + " ara ödeme seçebilirsiniz!");
                        //$(this).val('');
                        $('#7DF51D42E1B34E05BD3F5CCB0B34CF31').select2('data', null);
                        // return;
                    }
                }
            }
        })

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
});