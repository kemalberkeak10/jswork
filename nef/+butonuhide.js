$(function() {
    $('body').on('lookupRelationLoadTriggerEvent', function(e, relationId) {
        if ((relationId === '74D8C3DF87364FE4B99FEDF0EF6A8B27')) {

            var datas = $('.panel-lookup[data-id=74D8C3DF87364FE4B99FEDF0EF6A8B27] tbody tr');
            if (datas.length > 0) {
                $('.panel-lookup[data-id=74D8C3DF87364FE4B99FEDF0EF6A8B27] thead tr th').find('a').hide();
            }
        }
    });
});