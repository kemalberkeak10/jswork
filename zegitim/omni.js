$(function() {

    var a = $('label[for=]').parent().data('');
    var b = $('label[for=]').parent().data('');
    var data = {
        customObjectId: $('#CustomObjectPublicId').val(),
        recordId: $('#RecordPublicId').val(),
        fieldId: '', //guncelenecek field
        value: "" //deger 
    };
    $.post('/Set/UpdateFieldValue', data, function(r) {
        if (r.IsOk) {
            //güncelleme yapılınca ne yapılacaksa buraya yazılmalı
        }
    });
});