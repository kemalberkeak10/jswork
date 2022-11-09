$(function() {
    var ekipmanTipi = $('label[for=67F883A32DD94180948ACB295FBCBA17]').parent().data('publicids');
    if (ekipmanTipi == "21AC6519CEB442F79C5C4E3D832F053A") {
        $('[data-publicid=5E94CE0BFD95418E878510C558A9B003]').parent().hide();
    }
});
//edit
$(function() {
    $('body').on('change', '#67F883A32DD94180948ACB295FBCBA17', function() {
        if ($('#67F883A32DD94180948ACB295FBCBA17').select2('data') !== null) {
            var ekipmanTipi = $('#67F883A32DD94180948ACB295FBCBA17').select2('data').id;
        }
        if (ekipmanTipi == '21AC6519CEB442F79C5C4E3D832F053A') {
            $('[data-publicid="5E94CE0BFD95418E878510C558A9B003"]').show();
        } else {
            $('[data-publicid="5E94CE0BFD95418E878510C558A9B003"]').hide();
        }
    });
    $('#67F883A32DD94180948ACB295FBCBA17').trigger('change');
});