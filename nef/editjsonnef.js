$(function() {
    $('body').on('change', '#2100C1F0D8454746A6A57B82FDEC34F9', function() {
        var pesinatSayisi = $('#2100C1F0D8454746A6A57B82FDEC34F9').val();
        if (pesinatSayisi != "AEC885C1EAF74CD193EBDE5B13BBB7C5") {
            //pesinat sayisi 2
            $('label[for=F427FD07917140EDBD3E5A26FB144039]').closest('td').hide()
        } else {
            $('label[for=F427FD07917140EDBD3E5A26FB144039]').closest('td').show();
        }
    });
    $('#2100C1F0D8454746A6A57B82FDEC34F9').trigger('change');

    var prevSiraNo = $('td [data-id=651CEA34DA6B4EBBB65A823C72E3A5EE]:last').text();
    if (prevSiraNo == '') {
        $('#651CEA34DA6B4EBBB65A823C72E3A5EE').prop("disabled", true);
        $('#651CEA34DA6B4EBBB65A823C72E3A5EE').val(1);
    } else {

        var prevSiraNoNumber = parseInt(prevSiraNo) + 1;
        $('#651CEA34DA6B4EBBB65A823C72E3A5EE').prop("disabled", true);
        $('#651CEA34DA6B4EBBB65A823C72E3A5EE').val(prevSiraNoNumber);
    }
    $('body').on('click', '.add-row', function() {
        var prevSiraNo = $('td [data-id=651CEA34DA6B4EBBB65A823C72E3A5EE]').eq(0).text();
        var prevSiraNoNumber = parseInt(prevSiraNo) + 1;
        $('#651CEA34DA6B4EBBB65A823C72E3A5EE').prop("disabled", true);
        $('#651CEA34DA6B4EBBB65A823C72E3A5EE').val(prevSiraNoNumber);
        $('#1E5F255369074F6580FF7B4E41D8BD7F').val(prevSiraNoNumber - 1 + " Daire");

        var itemAmount = $('.field-responsive-area table tbody tr:first [data-id=56412764E98B4A6D8E5A6DC05DD8665A]').text();
        if (String.isNullOrWhiteSpace(itemAmount)) {
            itemAmount = 0;
        } else {
            itemAmount = parseFloat(calcSeparatorRemove(itemAmount));
        }

        var toplamSatisFiyati = $('#345C494105424121BBF5B5012107473E').val();
        if (String.isNullOrWhiteSpace(toplamSatisFiyati)) {
            toplamSatisFiyati = 0;
        } else {
            toplamSatisFiyati = parseFloat(calcSeparatorRemove(toplamSatisFiyati));
        }
        $('#345C494105424121BBF5B5012107473E').val(turkishLanguagePriceFormatedOutput(toplamSatisFiyati + itemAmount));
        $('#345C494105424121BBF5B5012107473E').trigger('change');
        $('.remove-row').after('<a class="btn btn-xs btn-danger remove-cutom"><i class="fas fa-trash"></i></a>');
        $('.remove-row').remove();
    });

    function siraNoUpdate(id) {
        var dataInput = $(String.format('#{0}', "E350D25527954D75AD23E3951A0490B2")),
            data = JSON.parse(dataInput.val()),
            siraNo = 0;

        data = data.removeItem('TempId',
            id);

        var newData = [];
        $.each(data,
            function(i, v) {
                ++siraNo;

                var rowRecord = [];
                $.each(v.RowRecord, function(o, g) {
                    if (g.PublicId === "651CEA34DA6B4EBBB65A823C72E3A5EE") {
                        $(String.format("tr[data-id='{0}']", v.TempId)).find(String.format('td[data-id="651CEA34DA6B4EBBB65A823C72E3A5EE"]')).text(siraNo);
                        g.Txt = siraNo.toString();
                        g.Value = siraNo.toString();
                    }
                    rowRecord.push(g);
                });
                newData.push({
                    TempId: v.TempId,
                    RowRecord: rowRecord
                });
            });
        dataInput.val(JSON.stringify(newData)).trigger('change');
        $("#651CEA34DA6B4EBBB65A823C72E3A5EE").val(++siraNo);
    }
    $('.remove-row').after('<a class="btn btn-xs btn-danger remove-cutom"><i class="fas fa-trash"></i></a>');
    $('.remove-row').remove();

    $('body').on('click',
        '.remove-row',
        function() {

            var button = $(this);
            var currentRow = button.closest('tr');
            var id = currentRow.data('id');
            currentRow.remove();

            siraNoUpdate(id);
            var tr = $(this).parents('tr'),
                amount = tr.find('[data-id=56412764E98B4A6D8E5A6DC05DD8665A]').text();

            if (String.isNullOrWhiteSpace(amount)) {
                amount = 0;
            } else {
                amount = parseFloat(calcSeparatorRemove(amount));
            }

            var toplamSatisFiyati = $('#345C494105424121BBF5B5012107473E').val();
            if (String.isNullOrWhiteSpace(toplamSatisFiyati)) {
                toplamSatisFiyati = 0;
            } else {
                toplamSatisFiyati = parseFloat(calcSeparatorRemove(toplamSatisFiyati));
            }
            $('#345C494105424121BBF5B5012107473E').val(turkishLanguagePriceFormatedOutput(toplamSatisFiyati - amount));
            $('#345C494105424121BBF5B5012107473E').trigger('change');

            // var siraNo = $('#651CEA34DA6B4EBBB65A823C72E3A5EE').val();
            // if (String.isNullOrWhiteSpace(siraNo)) {
            //     $('#651CEA34DA6B4EBBB65A823C72E3A5EE').val(siraNo);
            //     return;
            // } else {
            //     siraNo = parseInt(siraNo);
            //     if (siraNo > 0) {
            //         $('#651CEA34DA6B4EBBB65A823C72E3A5EE').val(siraNo - 1);
            //     }
            // }
        });

    // function sort_by_key(array, key) {
    //     return array.sort(function (a, b) {
    //         var x = a.RowRecord.find(f => f.PublicId === key).Value;
    //         var y = b.RowRecord.find(f => f.PublicId === key).Value;
    //         return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    //     });
    // }

    // function siraNoUpdate() {
    //     $(String.format('#{0}', "E350D25527954D75AD23E3951A0490B2")).trigger('change');
    //     debugger;
    //     var dataInput = $(String.format('#{0}', "E350D25527954D75AD23E3951A0490B2")),
    //         data = JSON.parse(dataInput.val()),
    //         siraNo = 0;
    //     $.each(sort_by_key(data, '651CEA34DA6B4EBBB65A823C72E3A5EE'),
    //         function (i, v) {

    //             if($(String.format("[data-id={0}]", v.TempId)).length > 0){
    //                 ++siraNo;

    //                 $.each(v.RowRecord, function (o, g) {
    //                     if (g.PublicId === "651CEA34DA6B4EBBB65A823C72E3A5EE") {
    //                         // $(String.format("tr")).eq(siraNo).find(String.format('td[data-id="651CEA34DA6B4EBBB65A823C72E3A5EE"]')).text(siraNo);
    //                         g.Txt = siraNo.toString();
    //                         g.Value = siraNo.toString();
    //                     }
    //                 });
    //             }

    //         })
    //         $('#651CEA34DA6B4EBBB65A823C72E3A5EE').val(siraNo + 1);
    //     dataInput.val(JSON.stringify(data)).trigger('change');
    // }

    function turkishLanguagePriceFormatedOutput(price, digit) {

        if (String.isNullOrWhiteSpace(digit)) {
            digit = 2;
        }

        var oldPrice = price;
        if (String.isNullOrWhiteSpace(price)) {
            price = "0";
        }

        var currency_symbol = "₺";
        var formattedOutput = new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'TRY',
            minimumFractionDigits: digit,
        });

        return isNaN(price) ? oldPrice : formattedOutput.format(price.toString()).replace(currency_symbol, '');
    }


    function calcSeparatorRemove(value) {
        var returnedString = String.isNullOrWhiteSpace(value) ? "0" : value.replace(".",
            "").replace(",",
            ".");
        return returnedString;
    }

});