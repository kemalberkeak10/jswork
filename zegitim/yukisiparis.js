$(function() {
    var pageId = $('#LayoutPublicId').val();
    if (pageId === '498D5FA778074E149DE4DFBB3AFF8CDC') {
        var seciliGetirme = function(talepEden) {
            var q = talepEden.replaceAll(' ', '');
            var lookupUrlFormat = '/Summary/LookupFieldValues?coId=86BC14FFBD184007A92C8B5BD9A408A5&id=A6415F8261C4412591431F7CE40A28EC&viewFilterId=A18C9DB1FEE14498B628ADEFDE7E5EE8&pageSize=8&q=&pageNumber=1&_=1641279532211';
            // console.log(lookupUrlFormat);
            $.get(lookupUrlFormat).done(function(result) {
                $.each(result.Items, function(i, v) {
                    var kurumId = v.Key;
                    var kurumUrl = "https://maya.setcrm.com/set/firma/detail/" + kurumId;
                    $.get(kurumUrl,
                        function(sdata) {
                            var elem = $('<div/>').html(sdata);
                            var talepeden = elem.find('label[for=E52B9C8A1EBF4CB4BE0DD13E00C977FD]').parent().data('value');
                            // debugger;
                            if (talepeden == talepEden) {
                                window.prepareSelect2SelectedOneItem('#A6415F8261C4412591431F7CE40A28EC', v.Key, v.Value);
                                return false;
                            }
                        });
                });
            });
        };
        if ($('#0C6F06BE1AAA4688B95DB24DA18CF2DD').val() !== '') {
            talepEden = $('#0C6F06BE1AAA4688B95DB24DA18CF2DD').select2('data').text;
            seciliGetirme(talepEden);
        }

        $('body').on('change', '#0C6F06BE1AAA4688B95DB24DA18CF2DD', function() {
            talepEden = $('#0C6F06BE1AAA4688B95DB24DA18CF2DD').select2('data').text;
            seciliGetirme(talepEden);
        });
        $('#CHECKBOX-B9CC71E1C99B45398C7F542FF337B733').prop('checked', true)
    }

});