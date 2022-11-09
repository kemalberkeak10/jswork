$(function() {
    $('body').on('change', '#8E8A780FA37940798219C4710B4918D6', function() {
        var birimSorumlusu = $('#8E8A780FA37940798219C4710B4918D6').select2('data').id;

    });
    $('body').on('change', '#38E8FA960AC847019CDDED37FB3638AF', function() {
        var durumId = $('#38E8FA960AC847019CDDED37FB3638AF').select2('data').id;
    });
    $('body').on('change', '#564D1745F76C40FCAB7EA1EA6E0C01DD', function() {
        var dofAcanKisi = $('#564D1745F76C40FCAB7EA1EA6E0C01DD').select2('data').id;
    });
    $('#8E8A780FA37940798219C4710B4918D6').trigger('change');
    $('#38E8FA960AC847019CDDED37FB3638AF').trigger('change');
    $('#564D1745F76C40FCAB7EA1EA6E0C01DD').trigger('change');

    if (durumId === "8C6E5C7564E841BC807231B806FB4F1B" && birimSorumlusu === userData.id) {
        console.log('if');
    } else {

    }
    if (durumId === "8C6E5C7564E841BC807231B806FB4F1B" && dofAcanKisi === userData.id) {
        console.log('if2');
    } else {

    }

});


$(function() {
    var lab = $('label[for=AD89469AB88A4450A90683DD12BCDAE8]').closest('div').data('publicids');

    if (lab === "E80E5A23C4854BA4AC39853FFF9140E2") {
        $('label[for=4E89F623ACFA42F183CF96AB30AAD76B]').closest('div').hide();
        $('label[for=41EDD568081343D9850DFDAECF750066]').closest('div').hide();
        $('label[for=A982E0E0D5204B25BE5300F846A7FD60]').closest('div').hide();
        $('label[for=DEFA37C036604BCFA831402146CB0CB0]').closest('div').hide();
        $('label[for=5B44F44444D54F39A264F862C967B298]').closest('div').hide();
        $('label[for=0054826E55004EE388000D5D4F707539]').closest('div').hide();
        $('label[for=079CCCB0AB944241B013AA7BD095B757]').closest('div').hide();
        $('label[for=C29A564A0CC24084A40BBC0C598155D8]').closest('div').hide();
        $('label[for=68C88B96C3CE4A4E913143F0C264371A]').closest('div').hide();
    } else {
        $('label[for=4E89F623ACFA42F183CF96AB30AAD76B]').closest('div').show();
        $('label[for=41EDD568081343D9850DFDAECF750066]').closest('div').show();
        $('label[for=A982E0E0D5204B25BE5300F846A7FD60]').closest('div').show();
        $('label[for=DEFA37C036604BCFA831402146CB0CB0]').closest('div').show();
        $('label[for=5B44F44444D54F39A264F862C967B298]').closest('div').show();
        $('label[for=0054826E55004EE388000D5D4F707539]').closest('div').show();
        $('label[for=079CCCB0AB944241B013AA7BD095B757]').closest('div').show();
        $('label[for=C29A564A0CC24084A40BBC0C598155D8]').closest('div').show();
        $('label[for=68C88B96C3CE4A4E913143F0C264371A]').closest('div').show();
    }
});

var lab = $('label[for=AD89469AB88A4450A90683DD12BCDAE8]').closest('div').data('publicids');
if (lab != "E80E5A23C4854BA4AC39853FFF9140E2") {
    $('.btn-br-actions[data-publicid=5B44F44444D54F39A264F862C967B298]').closest('td').prepend('<a id="btnSonucmgm" class="btn btn-sm btn-warning"style="margin-right:10px;" >Not Interesting</a>');
}


$(function() {
    $('.btn-br-actions[data-publicid=5B44F44444D54F39A264F862C967B298]').hide();


    var requestVerificationToken = $('input[name=__RequestVerificationToken]').val();

    var lab = $('label[for=AD89469AB88A4450A90683DD12BCDAE8]').closest('div').data('publicids');
    if (lab != "E80E5A23C4854BA4AC39853FFF9140E2") {
        $('.btn-br-actions[data-publicid=5B44F44444D54F39A264F862C967B298]').closest('td').prepend('<a id="btnSonucmgm" class="btn btn-sm btn-warning"style="margin-right:10px;" >Not Interesting</a>');
    }

    $('body').on('click', '#btnSonucmgm', function() {
        $('#modalDesctgm').remove();
        window.setModal.Create({
            id: 'modalDesctgm',
            html: {
                header: 'Not Interesting Description',
                body: '<div id="atamaMessage" style="margin:0 0 5px; width: 100%;"></div>',
                footer: '<button id="btnactionmgm" type="button" class="btn btn-sm btn-success">Kaydet</button><button id="btnKpt" type="button" class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>'
            }
        });
        $('#modalDesctgm').modal('toggle');
        $('#modalDesctgm .modal-body').append($('<textarea/>', {
            'type': 'textarea',
            'id': 'aciklamamgm',
            'name': 'txtswapno',
            'class': 'row',
            'width': '100%',
            'value': '',
            'height': '220px'
        }));
    });
    $('body').on('click', '#btnactionmgm', function() {
        var data = {
            customObjectId: $('#CustomObjectPublicId').val(),
            recordId: $('#RecordPublicId').val(),
            fieldId: '451D2532D1ED4ACEBAA202D253986437',
            value: $('#aciklamamgm').val()
        };
        $.post('/Set/UpdateFieldValue', data, function(r) {
            if (r.IsOk) {
                $('#modalDesctgm').modal('hide');
                $('.btn-br-actions[data-publicid=5B44F44444D54F39A264F862C967B298]').trigger('click');
            }
        });
    });
});