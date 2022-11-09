$(function() {
    var sirketId = $('label[for=D601A2D9FC19438882973923AF984195]').parent().data('publicids');
    if (sirketId == 'DE38C3E6488F494C89A150F5BE7A602B') {
        //kültürse
        var data = {
            customObjectId: '9392DB59C6F34492BE018315EEB65DD6',
            recordId: $('#RecordPublicId').val(),
            fieldId: 'AF53A184DA864D13B7AA97B77E866A9D',
            value: 'A70BC007EA0443BDA70FF22866F0558B'
        };
        $.post('/Set/UpdateFieldValue', data, function(r) {
            debugger;
            if (r.IsOk) {} else {
                //başarısız
            }
        });
    } else if (sirketId == '1DBAA1E213FC4DA3B49A1D77B1F04782') {
        //kentse
        debugger;
        var yaklasikMaliyet = $('label[for=4EEC79BC63B6473DA9785641837B8C4D]').parent().data('value');
        if (yaklasikMaliyet < 5000) {
            var data = {
                customObjectId: '9392DB59C6F34492BE018315EEB65DD6',
                recordId: $('#RecordPublicId').val(),
                fieldId: 'AF53A184DA864D13B7AA97B77E866A9D',
                value: 'DDA8F18788384EF9BE613532A87189AB'
            };
            $.post('/Set/UpdateFieldValue', data, function(r) {
                debugger;
                if (r.IsOk) {} else {
                    //başarısız
                }
            });
        } else {
            var data = {
                customObjectId: '9392DB59C6F34492BE018315EEB65DD6',
                recordId: $('#RecordPublicId').val(),
                fieldId: 'AF53A184DA864D13B7AA97B77E866A9D',
                value: 'A70BC007EA0443BDA70FF22866F0558B'
            };
            $.post('/Set/UpdateFieldValue', data, function(r) {
                debugger;
                if (r.IsOk) {} else {
                    //başarısız
                }
            });
        }



    }
});