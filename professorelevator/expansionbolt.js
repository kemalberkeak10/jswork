$('body').on('change',
    '#7BBE9B6E0951493195F345E6A5C0C2ED',
    function() {
        var customerId = $('#7BBE9B6E0951493195F345E6A5C0C2ED').val();
        var asansorModel = $('#1B9465A5B7B34B28A9F5716F52319A8E').val();
        var cabinatType = $('#589C8B8CABA44D8F83F88F6467074FF2').val();
        if (customerId === "CA76C2A1F05145379AFF0C9F2F2D6B61" && asansorModel === "83BE75A799F14706B37604932A5C6B86") {
            $("#750CAC46B82D47DD91B8FBA844B694E4").select2('data', {
                id: "D16D37C6F5C946EF9BF8222C2DE24240",
                text: "Yes"
            }).trigger('change');
        }
        if (customerId === "A6CEB4B3927040EDBBB40A45D57A8F8E" && cabinatType === "383CECEFEE87489A91D89E061B960D05") {
            $("#5EAC1430FE31467D97FC632F5578FF88").select2('data', {
                id: "0CDE43FC50CD41E6ACD0710365A79EDD",
                text: "Yes"
            }).trigger('change');
        } else {
            ClearSelect("#5EAC1430FE31467D97FC632F5578FF88");
        }
    });

$('body').on('change',
    '#1B9465A5B7B34B28A9F5716F52319A8E',
    function() {
        var customerId = $('#7BBE9B6E0951493195F345E6A5C0C2ED').val();
        var asansorModel = $('#1B9465A5B7B34B28A9F5716F52319A8E').val();
        var cabinatType = $('#589C8B8CABA44D8F83F88F6467074FF2').val();
        if (customerId === "CA76C2A1F05145379AFF0C9F2F2D6B61" && asansorModel === "83BE75A799F14706B37604932A5C6B86") {
            $("#750CAC46B82D47DD91B8FBA844B694E4").select2('data', {
                id: "D16D37C6F5C946EF9BF8222C2DE24240",
                text: "Yes"
            }).trigger('change');
        }
        if (customerId === "A6CEB4B3927040EDBBB40A45D57A8F8E" && cabinatType === "383CECEFEE87489A91D89E061B960D05") {
            $("#5EAC1430FE31467D97FC632F5578FF88").select2('data', {
                id: "0CDE43FC50CD41E6ACD0710365A79EDD",
                text: "Yes"
            }).trigger('change');
        } else {
            ClearSelect("#5EAC1430FE31467D97FC632F5578FF88");
        }
    });