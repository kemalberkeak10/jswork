$(function() {
    $('body').on('lookupRelationLoadTriggerEvent', function(e,
        relationId) {
        if (relationId == 'CDC242FD3A054A72A47841E9CFCD6B3B') {
            console.log("calisti");
            $('.new-lookuprow').click(function() {
                setTimeout(() => {
                    $('#0DD8841ECCFA467FA12559E6F99EEE2F').select2('data', {
                        id: "E46B9A54DA5941B6BEA424AD56402313",
                        text: "ADET"
                    }).trigger('change');
                }, 700);
            });
        }
    });
});

$(function() {
    $('body').on('lookupRelationLoadTriggerEvent', function(e,
        relationId) {
        if (relationId == 'CDC242FD3A054A72A47841E9CFCD6B3B') {

        }
    });
});