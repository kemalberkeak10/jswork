$("body").on("keyup change", ".gelen-adet", function() {
    var el = this,
        gelenSn = $(el).closest('tr').find('.gelen-sn'),
        gelenSnSplitLength = gelenSn.val().split(seperator).length;
    if (el.value != "") {
        if (gelenSnSplitLength > parseInt(el.value)) {
            gelenSn.val('');
        }

        if (parseInt(el.value) < parseInt(el.min)) {
            el.value = el.min;
        }
        if (parseInt(el.value) > parseInt(el.max)) {
            el.value = el.max;
        }
        if (el.value > 0) {
            $(el).closest('tr').find('.btn-expand-gelen-sn b').text(String.format("{0} tane yazı kutusu aç", el.value));
        } else {
            $(el).closest('tr').find('.btn-expand-gelen-sn b').text(String.format("Lütfen gelen adeti sıfırdan büyük olucak şekilde ayarlayınız!", el.value));
        }
    } else {
        $(el).closest('tr').find('.btn-expand-gelen-sn b').text(String.format("Lütfen gelen adeti doldurunuz!"));
        gelenSn.val('');
    }
});

$("body").on("keyup",
    '#',
    function(e) {
        if (e.keyCode > 31 && (e.keyCode < 48 || e.keyCode > 57)) {
            var quantity = $('#').val();
            if (quantity != "") {
                var listPrice = $('#listPrice').val();
                if (listPrice != "") {
                    $('#').val(parseInt(listPrice) * parseInt(quantity));
                }

            }
        }
    });