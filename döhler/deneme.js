$(function() {

    if (!String.isNullOrWhiteSpace($('label[for=213F9026A8864141AB459FB2ECB148DD]').closest('div').data('publicids'))) {
        var recordId = $('#RecordPublicId').val();
        var customObjectId = $('#CustomObjectPublicId').val();
        var raporTipi = $('label[for=213F9026A8864141AB459FB2ECB148DD]').closest('div').data('publicids')
        var templateId = switchTip(raporTipi);
        var url = '/formtemplate/get/?id=' + templateId + '&coId=' + customObjectId + '&recordId=' + recordId;
        $('.well .pull-right:eq(0)').prepend('<a href="' + url + '"  id="btnRaporOlustur" class="btn btn-sm btn-success"  style="margin-right:10px;"><i class="fa fa-file" aria-hidden="true"></i> Rapor Oluştur</a>');
    }
});

function switchTip(tip) {
    switch (tip) {
        case "ECC89912E8B24A158B83EC4039778187":
            return "BF12B4807C774124B44961DDB831FBD6";
            break;
        case "E234AF44CCFC4D468AADA0420FDA9D3A":
            return "50DA437B0B1449C28D374273A93CF86D";
            break;
        case "FEE8CC6DA49A45B5A0F282E50FD047D0":
            return "5D145E577D494A5DAD49BDCC8A2ED108";
            break;
        case "56902119AC474A1398F1B300EDA1A93B":
            return "807B5649DC5E43B5B9A6192D11E290C9";
            break;
        case "108591B88E634F30A0CD794DD08BD7EC":
            return "91DCA037F63E47D0910C0F23F1F68EB5";
            break;
        case "AC01CDCA68664DD6B025CB5053BA965C":
            return "DAC343AF12054B749307586352AFB153";
            break;
        case "18A79DADF5884A0A8A77231B58F2549E":
            return "23D4F2D10FAB47899F869CEFF73D4B9D";
            break;
        case "D3C36D9BBCFC4C248E792004AE5D9A81":
            return "49717B7F7C814F4A908824FB28CC7A55";
            break;
    }
}