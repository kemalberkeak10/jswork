$(function() {
    $('body').on('change', '#2100C1F0D8454746A6A57B82FDEC34F9', function() {
        var pesinatSayisi = $('#2100C1F0D8454746A6A57B82FDEC34F9').val();
        if (pesinatSayisi != "AEC885C1EAF74CD193EBDE5B13BBB7C5") {
            //pesinat sayisi 2
            $('label[for=F427FD07917140EDBD3E5A26FB144039]').closest('td').hide()
        } else {
            $('label[for=F427FD07917140EDBD3E5A26FB144039]').closest('td').show();
        }
    });
    $('#2100C1F0D8454746A6A57B82FDEC34F9').trigger('change');

    var prevSiraNo = $('td [data-id=651CEA34DA6B4EBBB65A823C72E3A5EE]').eq(0).text();
    if (prevSiraNo == '') {
        $('#651CEA34DA6B4EBBB65A823C72E3A5EE').prop("disabled", true);
        $('#651CEA34DA6B4EBBB65A823C72E3A5EE').val(1);
    } else {

        var prevSiraNoNumber = parseInt(prevSiraNo) + 1;
        $('#651CEA34DA6B4EBBB65A823C72E3A5EE').prop("disabled", true);
        $('#651CEA34DA6B4EBBB65A823C72E3A5EE').val(prevSiraNoNumber);
    }
    $('body').on('click', '.add-row', function() {
        var prevSiraNo = $('td [data-id=651CEA34DA6B4EBBB65A823C72E3A5EE]').eq(0).text();
        var prevSiraNoNumber = parseInt(prevSiraNo) + 1;
        $('#651CEA34DA6B4EBBB65A823C72E3A5EE').prop("disabled", true);
        $('#651CEA34DA6B4EBBB65A823C72E3A5EE').val(prevSiraNoNumber);
        $('#1E5F255369074F6580FF7B4E41D8BD7F').val(prevSiraNoNumber - 1 + " Daire");
    });

});


//detail
$(function() {
    var pesinatTaksitSayisiData = $('label[for=2100C1F0D8454746A6A57B82FDEC34F9]').closest('div').data();
    if (!String.isNullOrWhiteSpace(pesinatTaksitSayisiData)) {
        var pesinatSayisi = $('label[for=2100C1F0D8454746A6A57B82FDEC34F9]').closest('div').data('publicids')
        if (pesinatSayisi != "AEC885C1EAF74CD193EBDE5B13BBB7C5") {
            $('label[for=F427FD07917140EDBD3E5A26FB144039]').closest('div').hide();
        } else {
            $('label[for=F427FD07917140EDBD3E5A26FB144039]').closest('div').show();
        }
    } else {
        $('label[for=F427FD07917140EDBD3E5A26FB144039]').closest('div').hide();
    }
});