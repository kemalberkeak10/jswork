$(function() {
    var randevuBaslangicTarihi = $('label[for=477EDB479DB44FABB26CD8BE8796418C]').parent().data('value');
    if (randevuBaslangicTarihi != '') {
        $('#477EDB479DB44FABB26CD8BE8796418C').prop("disabled", true);
    }
});