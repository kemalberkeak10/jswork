$(function() {

    var statu = $('label[for=AD89469AB88A4450A90683DD12BCDAE8]').parent().data('publicids');
    var stage = $('label[for=37BA8E5CBDB6446FBDFFA9D5B2FC3C68]').parent().data('publicids');
    if (statu != "E80E5A23C4854BA4AC39853FFF9140E2") {
        //$('.btn-br-actions[data-publicid=9A4A6ABD7F2A48099922DE84EF49AC96]').hide();
        $('div[id=88A3743D37264D61AA325C1A2A1091DE]').hide();
        $('.btn-br-actions[data-publicid=4E89F623ACFA42F183CF96AB30AAD76B]').hide();
        $('.btn-br-actions[data-publicid=4E89F623ACFA42F183CF96AB30AAD76B]').closest('td').prepend('<a id="btnDay1" class="btn btn-sm btn-primary"style="margin-right:10px;" >Day 1</a>');
        // $('.btn-br-actions[data-publicid=9A4A6ABD7F2A48099922DE84EF49AC96]').hide();
        // $('.btn-br-actions[data-publicid=9A4A6ABD7F2A48099922DE84EF49AC96]').closest('td').prepend('<a id="btnWaitning" class="btn btn-sm btn-primary"style="margin-right:10px;" >Waiting For Details</a>');

        // $('.btn-br-actions[data-publicid=ABEED91194DB4D3F848DB8848AB066E7]').hide();
        // $('.btn-br-actions[data-publicid=ABEED91194DB4D3F848DB8848AB066E7]').closest('td').prepend('<a id="btnSoldUnsold" class="btn btn-sm btn-success"style="margin-right:10px;" >Sold/Unsold</a>');

        // $('#btnDetailsReceiev').hide();
        // $('#requestdiagnosis').hide();
        // $('#btnOfferStage').hide();
        // $('#btnNegotiation').hide();
        // $('#btnDecision').hide();

        if (statu == "473C9F36688E4A8BA96713B2DEA2458B") {
            $('.btn-br-actions[data-publicid=4E89F623ACFA42F183CF96AB30AAD76B]').hide();
            $('#btnDay1').hide();
            $('.btn-br-actions[data-publicid=DEFA37C036604BCFA831402146CB0CB0]').hide(); //not answer at all
            $('.btn-br-actions[data-publicid=41EDD568081343D9850DFDAECF750066]').hide(); //day2
            $('.btn-br-actions[data-publicid=A982E0E0D5204B25BE5300F846A7FD60]').hide(); //day3
            $('.btn-br-actions[data-publicid=41EDD568081343D9850DFDAECF750066]').closest('td').prepend('<a id="btnDay2" class="btn btn-sm btn-primary"style="margin-right:10px;" >Day 2</a>');

        } else if (statu == "E374D86E3CED4092ABCB96223E451C09") {
            $('.btn-br-actions[data-publicid=4E89F623ACFA42F183CF96AB30AAD76B]').hide();
            $('#btnDay1').hide();
            $('#btnDay2').hide();
            $('.btn-br-actions[data-publicid=DEFA37C036604BCFA831402146CB0CB0]').hide(); //not answer at all
            $('.btn-br-actions[data-publicid=41EDD568081343D9850DFDAECF750066]').hide(); //day2
            $('.btn-br-actions[data-publicid=A982E0E0D5204B25BE5300F846A7FD60]').hide(); //day3
            $('.btn-br-actions[data-publicid=A982E0E0D5204B25BE5300F846A7FD60]').closest('td').prepend('<a id="btnDay3" class="btn btn-sm btn-primary"style="margin-right:10px;" >Day 3</a>');

        } else if (statu == "21607CE61E61449BA31CF0BB26212A7E") {
            $('.btn-br-actions[data-publicid=4E89F623ACFA42F183CF96AB30AAD76B]').hide();
            $('#btnDay1').hide();
            $('.btn-br-actions[data-publicid=DEFA37C036604BCFA831402146CB0CB0]').hide(); //not answer at all
            $('.btn-br-actions[data-publicid=41EDD568081343D9850DFDAECF750066]').hide(); //day2
            $('.btn-br-actions[data-publicid=A982E0E0D5204B25BE5300F846A7FD60]').hide(); //day3
            $('#btnDay2').hide();
            $('#btnDay3').hide();
            $('.btn-br-actions[data-publicid=DEFA37C036604BCFA831402146CB0CB0]').show();

        } else if (statu == "FE5C4A9C1CEA40B9A0D8281D9E317B2C") {
            $('.btn-br-actions[data-publicid=DEFA37C036604BCFA831402146CB0CB0]').hide(); //not answer at all
            $('.btn-br-actions[data-publicid=4E89F623ACFA42F183CF96AB30AAD76B]').hide();
            $('#btnDay1').hide();
            $('.btn-br-actions[data-publicid=41EDD568081343D9850DFDAECF750066]').hide(); //day2
            $('.btn-br-actions[data-publicid=A982E0E0D5204B25BE5300F846A7FD60]').hide(); //day3
            $('#btnDay2').hide();
            $('#btnDay3').hide();

        } else if (statu == "AEE167FFC1F34519988E46AD99D61436") {
            $('.btn-br-actions[data-publicid=DEFA37C036604BCFA831402146CB0CB0]').hide(); //not answer at all
            $('.btn-br-actions[data-publicid=41EDD568081343D9850DFDAECF750066]').hide(); //day2
            $('.btn-br-actions[data-publicid=A982E0E0D5204B25BE5300F846A7FD60]').hide(); //day3

        } else if (statu == "A38DD42AEB76414DB6546426521E263E") {
            $('.btn-br-actions[data-publicid=DEFA37C036604BCFA831402146CB0CB0]').hide(); //not answer at all
            $('.btn-br-actions[data-publicid=41EDD568081343D9850DFDAECF750066]').hide(); //day2
            $('.btn-br-actions[data-publicid=A982E0E0D5204B25BE5300F846A7FD60]').hide(); //day3
            $('#btnDay2').hide();
            $('#btnDay3').hide();
            $('.btn-br-actions[data-publicid=4E89F623ACFA42F183CF96AB30AAD76B]').hide();
            $('#btnDay1').show();
        } else {

            // $('.btn-br-actions[data-publicid=4E89F623ACFA42F183CF96AB30AAD76B]').hide();
            // $('.btn-br-actions[data-publicid=4E89F623ACFA42F183CF96AB30AAD76B]').closest('td').prepend('<a id="btnDay1" class="btn btn-sm btn-primary"style="margin-right:10px;" >Day 1</a>');

            // $('.btn-br-actions[data-publicid=9A4A6ABD7F2A48099922DE84EF49AC96]').hide();
            // $('.btn-br-actions[data-publicid=9A4A6ABD7F2A48099922DE84EF49AC96]').closest('td').prepend('<a id="btnWaitning" class="btn btn-sm btn-primary"style="margin-right:10px;" >Waiting For Details</a>');

            // $('.btn-br-actions[data-publicid=ABEED91194DB4D3F848DB8848AB066E7]').hide();
            // $('.btn-br-actions[data-publicid=ABEED91194DB4D3F848DB8848AB066E7]').closest('td').prepend('<a id="btnSoldUnsold" class="btn btn-sm btn-success"style="margin-right:10px;" >Sold/Unsold</a>');

            $('.btn-br-actions[data-publicid=DEFA37C036604BCFA831402146CB0CB0]').hide(); //not answer at all
            $('.btn-br-actions[data-publicid=41EDD568081343D9850DFDAECF750066]').hide(); //day2
            $('.btn-br-actions[data-publicid=A982E0E0D5204B25BE5300F846A7FD60]').hide(); //day3
            $('.btn-br-actions[data-publicid=4E89F623ACFA42F183CF96AB30AAD76B]').hide();
            $('#btnDay1').hide();

        }

    } else {
        $('.btn-br-actions[data-publicid=4E89F623ACFA42F183CF96AB30AAD76B]').hide();
        // $('.btn-br-actions[data-publicid=4E89F623ACFA42F183CF96AB30AAD76B]').closest('td').prepend('<a id="btnDay1" class="btn btn-sm btn-primary"style="margin-right:10px;" >Day 1</a>');
        //$('div[id=88A3743D37264D61AA325C1A2A1091DE]').show();
        $('.btn-br-actions[data-publicid=079CCCB0AB944241B013AA7BD095B757]').hide();
        $('.btn-br-actions[data-publicid=0054826E55004EE388000D5D4F707539]').hide();

        $('.btn-br-actions[data-publicid=9A4A6ABD7F2A48099922DE84EF49AC96]').hide();
        $('.btn-br-actions[data-publicid=9A4A6ABD7F2A48099922DE84EF49AC96]').closest('td').prepend('<a id="btnWaitning" class="btn btn-sm btn-primary"style="margin-right:10px;">Waiting For Details</a>');

        $('.btn-br-actions[data-publicid=ABEED91194DB4D3F848DB8848AB066E7]').hide();
        $('.btn-br-actions[data-publicid=ABEED91194DB4D3F848DB8848AB066E7]').closest('td').prepend('<a id="btnSoldUnsold" class="btn btn-sm btn-success"style="margin-right:10px;" >Sold/Unsold</a>');

        $('.btn-br-actions[data-publicid=DEFA37C036604BCFA831402146CB0CB0]').hide(); //not answer at all
        $('.btn-br-actions[data-publicid=41EDD568081343D9850DFDAECF750066]').hide(); //day2
        $('.btn-br-actions[data-publicid=A982E0E0D5204B25BE5300F846A7FD60]').hide(); //day3

        $('#btnDetailsReceiev').hide();
        $('#btnPool').hide();

        //$('#btnWaitning').hide();
        $('#requestdiagnosis').hide();
        $('#btnOfferStage').hide();
        $('#btnNegotiation').hide();
        $('#btnDecision').hide();

        if (stage == "2CC0ADFABEF94DD7A8EEC7F2C4952A6F") {
            $('.btn-br-actions[data-publicid=9A4A6ABD7F2A48099922DE84EF49AC96]').hide();
            $('#btnDetailsReceiev').show();
            $('#btnWaitning').hide();
        } else if (stage == "DBC909DAFE8D46D68418868807F3CA7E") {
            $('.btn-br-actions[data-publicid=9A4A6ABD7F2A48099922DE84EF49AC96]').hide();
            $('#requestdiagnosis').show();
            $('#btnWaitning').hide();
        } else if (stage == "58156FDCF1E74006ADFD89A037E3872B") {
            $('.btn-br-actions[data-publicid=9A4A6ABD7F2A48099922DE84EF49AC96]').hide();
            $('#btnOfferStage').show();
            $('#btnWaitning').hide();
        } else if (stage == "094A3B6806994EBABB4D0EE4A4C2F1B6") {
            $('.btn-br-actions[data-publicid=9A4A6ABD7F2A48099922DE84EF49AC96]').hide();
            $('#btnNegotiation').show();
            $('#btnWaitning').hide();
        } else if (stage == "8A3EA0E7DCE041458EBF59FCE50F9CBE") {
            $('.btn-br-actions[data-publicid=9A4A6ABD7F2A48099922DE84EF49AC96]').hide();
            $('#btnDecision').show();
            $('#btnWaitning').hide();
        } else if (stage == "31FF0A893CFE49F98F1AA0A1FC0F9B94") {
            $('#btnWaitning').hide();
            $('#btnDay1').hide();
            $('#btnDay2').hide();
            $('#btnDay3').hide();
            $('.btn-br-actions[data-publicid=DEFA37C036604BCFA831402146CB0CB0]').hide(); //not answer at all
            $('#btnNewBeggining').hide();
            $('#btnClosedLost').hide();
            $('#btnNegotiation').hide();
            $('#btnDecision').hide();
            $('.btn-br-actions[data-publicid=9A4A6ABD7F2A48099922DE84EF49AC96]').hide();
            $('#btnDetailsReceiev').hide();
            $('#requestdiagnosis').hide();
            $('#btnOfferStage').hide();
            $('#btnPool').hide();

            $('.btn-br-actions[data-publicid=19344BC44CB34D6F9D57D50D8A0322D5]').hide();
            $('.btn-br-actions[data-publicid=1E2DFB4C25F34C9D971376811D7CE19F]').hide();
            $('.btn-br-actions[data-publicid=51C4EC354E764067A7EA2CA5539E4E08]').hide();

        } else if (String.isNullOrWhiteSpace(stage)) {
            $('.btn-br-actions[data-publicid=9A4A6ABD7F2A48099922DE84EF49AC96]').hide();
            $('#btnDetailsReceiev').hide();
            //$('#btnWaitning').hide();
            $('#requestdiagnosis').hide();
            $('#btnOfferStage').hide();
            $('#btnNegotiation').hide();
            $('#btnDecision').hide();
        } else {
            $('.btn-br-actions[data-publicid=9A4A6ABD7F2A48099922DE84EF49AC96]').hide();
            $('#btnDetailsReceiev').hide();
            $('#btnWaitning').hide();
            $('#requestdiagnosis').hide();
            $('#btnOfferStage').hide();
            $('#btnNegotiation').hide();
            $('#btnDecision').hide();
        }
    }

    $('body').on('click', '#btnDay1', function() {

        $('.btn-br-actions[data-publicid=41EDD568081343D9850DFDAECF750066]').closest('td').prepend('<a id="btnDay2" class="btn btn-sm btn-primary"style="margin-right:10px;" >Day 2</a>');
        $('#btnDay1').hide();

        var dataDay1 = {
            customObjectId: $('#CustomObjectPublicId').val(),
            recordId: $('#RecordPublicId').val(),
            fieldId: 'AD89469AB88A4450A90683DD12BCDAE8',
            value: "473C9F36688E4A8BA96713B2DEA2458B"
        };
        $.post('/Set/UpdateFieldValue', dataDay1, function(r) {
            if (r.IsOk) {}
        });

        var dataDay1 = {
            customObjectId: $('#CustomObjectPublicId').val(),
            recordId: $('#RecordPublicId').val(),
            fieldId: '7EE1F10754184B2C9B591C0BB64FF62C',
            value: true
        };
        $.post('/Set/UpdateFieldValue',
            dataDay1,
            function(r) {
                if (r.IsOk) {
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                }
            });

    });

    $('body').on('click', '#btnDay2', function() {

        $('.btn-br-actions[data-publicid=A982E0E0D5204B25BE5300F846A7FD60]').closest('td').prepend('<a id="btnDay3" class="btn btn-sm btn-primary"style="margin-right:10px;" >Day 3</a>');
        $('#btnDay2').hide();

        var dataDay2 = {
            customObjectId: $('#CustomObjectPublicId').val(),
            recordId: $('#RecordPublicId').val(),
            fieldId: 'AD89469AB88A4450A90683DD12BCDAE8',
            value: "E374D86E3CED4092ABCB96223E451C09"
        };
        $.post('/Set/UpdateFieldValue',
            dataDay2,
            function(r) {
                if (r.IsOk) {}
            });

        var dataDay2 = {
            customObjectId: $('#CustomObjectPublicId').val(),
            recordId: $('#RecordPublicId').val(),
            fieldId: 'C1F55F28F34E459DA87455856405B56E',
            value: true
        };
        $.post('/Set/UpdateFieldValue',
            dataDay2,
            function(r) {
                if (r.IsOk) {
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                }
            });

    });

    $('body').on('click', '#btnDay3', function() {

        $('.btn-br-actions[data-publicid=DEFA37C036604BCFA831402146CB0CB0]').show(); //not answer at all
        $('#btnDay3').hide();

        var data3 = {
            customObjectId: $('#CustomObjectPublicId').val(),
            recordId: $('#RecordPublicId').val(),
            fieldId: 'AD89469AB88A4450A90683DD12BCDAE8',
            value: "21607CE61E61449BA31CF0BB26212A7E"
        };
        $.post('/Set/UpdateFieldValue',
            data3,
            function(r) {
                if (r.IsOk) {}
            });

        var data3 = {
            customObjectId: $('#CustomObjectPublicId').val(),
            recordId: $('#RecordPublicId').val(),
            fieldId: 'C514297E9090464CA83A9B7CE1F2EEE6',
            value: true
        };
        $.post('/Set/UpdateFieldValue',
            data3,
            function(r) {
                if (r.IsOk) {
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                }
            });

    });

    $('body').on('click', '#btnSoldUnsold', function() {

        $('#btnDay1').hide();
        $('#btnDay2').hide();
        $('#btnDay3').hide();
        $('.btn-br-actions[data-publicid=DEFA37C036604BCFA831402146CB0CB0]').hide(); //not answer at all
        $('#btnNewBeggining').hide();
        $('#btnClosedLost').hide();
        $('#btnNegotiation').hide();
        $('#btnDecision').hide();
        $('.btn-br-actions[data-publicid=9A4A6ABD7F2A48099922DE84EF49AC96]').hide();
        $('#btnDetailsReceiev').hide();
        $('#requestdiagnosis').hide();
        $('#btnOfferStage').hide();
        $('.btn-br-actions[data-publicid=19344BC44CB34D6F9D57D50D8A0322D5]').hide();
        $('.btn-br-actions[data-publicid=1E2DFB4C25F34C9D971376811D7CE19F]').hide();
        $('.btn-br-actions[data-publicid=51C4EC354E764067A7EA2CA5539E4E08]').hide();

        var data3 = {
            customObjectId: $('#CustomObjectPublicId').val(),
            recordId: $('#RecordPublicId').val(),
            fieldId: '37BA8E5CBDB6446FBDFFA9D5B2FC3C68',
            value: "31FF0A893CFE49F98F1AA0A1FC0F9B94"
        };
        $.post('/Set/UpdateFieldValue',
            data3,
            function(r) {
                if (r.IsOk) {
                    setTimeout(() => {
                        localStorage.setItem("SalesOrderId_ForContact", $("#RecordPublicId").val());

                        var link = String.format('/set/new/sales-order/');

                        window.open(link);
                        window.location.reload();

                    }, 500);
                }
            });

    });

    $('body').on('click', '#btnWaitning', function() {

        $('#btnDetailsReceiev').show();
        $('#btnWaitning').hide();

        var data3 = {
            customObjectId: $('#CustomObjectPublicId').val(),
            recordId: $('#RecordPublicId').val(),
            fieldId: '37BA8E5CBDB6446FBDFFA9D5B2FC3C68',
            value: "2CC0ADFABEF94DD7A8EEC7F2C4952A6F"
        };
        $.post('/Set/UpdateFieldValue',
            data3,
            function(r) {
                if (r.IsOk) {
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                }
            });

    });

});