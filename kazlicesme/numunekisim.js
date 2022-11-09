$(function() {
    $('body').on('lookupRelationLoadTriggerEvent', function(e, relationId) {
        if (relationId == '8666B4E380484315A810BA0742F2851E') {
            if ($('[data-id=8666B4E380484315A810BA0742F2851E]').find('table tbody tr').length < 0) {
                setTimeout(() => {
                    $('.panel-lookup[data-id=EB2BD6F6384D445BB352C8214F040A14] .table-bordered thead tr:eq(0) .text-center .new-lookuprow').hide()
                }, 3000);


            }
        }
    });
});