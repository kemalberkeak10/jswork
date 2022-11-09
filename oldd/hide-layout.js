$(function () {
var ulrUg = '/company/IsUserInPermissionGroup?id={0}&groupId={1}';
// $.get(String.format(ulrUg, userData.id, '9E5B53F06E224E70B25AE8127527609E'), function (result) {
//     if (!result.IsOk || result.Result) {


var isPrintButtonHide = $('#LayoutPublicId').val() == "D0751DC329CC46CF91FF752C5D77FF8B" ? true : false;
var printBtn = $('<a/>', {
'id': 'btnPrint', 'class': 'btn btn-sm btn-warning', 'style': 'margin-right:3px'
}).text('Barkod Bas');
if(!isPrintButtonHide){
    $('.well-xxs .pull-right').prepend(printBtn);
}
$('#btnPrint').on('click', function () {
// $("#modaluyari").remove();
// window.setModal.Create({
//     id: 'modaluyari',
//     html: {
//         header: 'Form Barkod Numarası',
//         body: '',
//         footer: '<button type="button" data-dismiss="modal" class="btn btn-sm btn-danger">Kapat</button>'
//     }
// });
// $("#modaluyari").modal("toggle");
var sbarkod = $('label[for=EDD6144B6DDD4B33BC0E8792134E354D]').parent().justText();
var barcodeArea = $('<div/>', {
'id': 'barcodeArea'
});
var anaDiv = $('<div />', {
style: 'text-align: center;width:207px;margin: 0 auto;'
});
anaDiv.append($('<div />', {
style: 'text-align: center'
}).append($('<img />').JsBarcode(sbarkod, {
format: 'CODE128', displayValue: true, fontSize: 25, width: 1, height: 50, font: 'arial'
})));
barcodeArea.append(anaDiv);
// $("#modaluyari .modal-body").html(barcodeArea);
window.setTimeout(function () {
var contentWindow = window.open();
contentWindow.document.write(barcodeArea.html());
contentWindow.print();
contentWindow.close();
}, 0);
});
// }
// });
});