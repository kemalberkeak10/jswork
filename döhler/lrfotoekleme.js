$(function() {
    $('body').on('lookupRelationLoadTriggerEvent', function(e, relationId) {
        if (relationId === 'DEE7874808244829ADCA60A44387BBF2') {
            var numuneFotoLr = $(String.format('div[data-id={0}]', relationId));
            numuneFotoLr.find('.table tbody tr').each(function() {
                var tr = $(this);
                var resimTd = tr.find('td:eq(3)');
                var resimId = resimTd.data('value');
                resimTd.html('<img src="/document/get/' + resimId + '" width="100%" height="100%"></img>');
            });
        }
    });
});