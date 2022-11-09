$(function() {
    $("#887A66A48953487499728CF035C33C7F").on('change', function() {
        var aktiviteTipi = $('#887A66A48953487499728CF035C33C7F').val();
        if (aktiviteTipi == '58A5D72BCEA14828A9FCB833BEA74ED2') { //randevu
            $('#btn_save').hide();
            $('#actionButtons').prepend('<a id="btnKaydet" class="btn btn-sm btn-primary"  style="margin-right:10px;">Kaydet</a>');
        }
    });
    $('#887A66A48953487499728CF035C33C7F').trigger('change');
    $('body').on('click', '#btnKaydet', function() {
        var gorusmeSonucu = $('#4B3A39B32A704881888ADAD7F48B152A').val();
        if (gorusmeSonucu != '') {
            var randevuNotu = $('#4C026C8581754174978356D22E93969C').val();
            if (String.isNullOrWhiteSpace(randevuNotu)) {
                notify("danger", "Randevu Notu alanı boş olamaz!");
            } else {
                $('#btn_save').trigger('click');
            }
        } else {
            $('#btn_save').trigger('click');
        }
    });

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