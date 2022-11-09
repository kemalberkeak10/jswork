$(function() {
    var pageLayoutId = $('#LayoutPublicId').val()
    if (pageLayoutId == "0F5063F30DE945C2897F0A1A2FBB65F1") {
        $('body').on('lookupRelationLoadTriggerEvent', function(e, relationId) {

            if (relationId == '41139532CD42446C8941C9A9B0336487') {
                $('.panel-lookup[data-id=41139532CD42446C8941C9A9B0336487] .table-bordered thead tr th .new-lookuprow').hide()

            }
        });
    }

});