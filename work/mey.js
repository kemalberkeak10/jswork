$(function() {
    var permission = userData.permissionGroups;
    if (!permission.contains('ADMİN')) {
        $($('.custom-panel').find('.panel-heading')).each(function(i, v) {
            var a = $(v).text().trim();
            if (a === 'Gizli Panel') {
                $(v).closest('td').hide();
            }
        });
    }

});

$(function() {
    if (!String.isNullOrWhiteSpace($('label[for=21BE0EC3719B4378B3A1710663F7FE75]').parent().data())) {
        var adiSoyadi = $('label[for=21BE0EC3719B4378B3A1710663F7FE75]').parent().data('publicids');
    }
    if (!String.isNullOrWhiteSpace($('label[for=EB645D6C559F4FF5873609BA52E07CA4]').parent().data())) {
        var satisSorumlusu = $('label[for=EB645D6C559F4FF5873609BA52E07CA4]').parent().data('publicids');
    }
    if (adiSoyadi == satisSorumlusu) {
        var permissionId = userData.permissionGroupIds;
        if (permissionId.contains('65D01FCC73D74155B5F93037F549EE61')) {
            $('.btn-br-actions[data-publicid=05C1537B55D04820BB14725A592FB74E]').hide();
            $('.btn-br-actions[data-publicid=D6DFFB35042946E08E1DEE4655408FB8]').hide();
            $('.btn-br-actions[data-publicid=28B6CB4751AB4D5FAF30C02286CC6A63]').hide();
        }
    }
});

$(function() {
    if (!String.isNullOrWhiteSpace($('label[for=663DD58F66B04DF29C4E0B880A4A7CE3]').parent().data())) {
        var statu = $('label[for=663DD58F66B04DF29C4E0B880A4A7CE3]').parent().data('publicids');
    }
    if (statu == "3936DB37834442FCA2A201FE615DE7E6") {

        $('.btn-br-actions[data-publicid=05C1537B55D04820BB14725A592FB74E]').show();
        $('.btn-br-actions[data-publicid=D6DFFB35042946E08E1DEE4655408FB8]').show();
        $('.btn-br-actions[data-publicid=28B6CB4751AB4D5FAF30C02286CC6A63]').show();
    }
});