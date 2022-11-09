$(function() {
    $('[data-id=5B798C11EB1C4A4EB0DBEDAF738E6FBF] .new-lookuprow').on('click', function() {
        debugger;
        var todoPanel = $('[data-id=5B798C11EB1C4A4EB0DBEDAF738E6FBF]');
        var trList = todoPanel.find('.no-more-table tbody tr');
        console.log(trList.length);
        $('#F076E3CFF6FF4E80862F0492560EED3D').val(trList.length + 1);
    });
});