//detail 
var urunGrubu = $('label[for=EF1A5028CBBD4AC09AD4D263F6FBBB72]').parent().data('publicids');
var statu = $('label[for=663DD58F66B04DF29C4E0B880A4A7CE3]').parent().data('publicids');


if (urunGrubu !== "0387CC0842FC427EA88B11E1C5041475" || statu !== "E828C09FFC1A4F7B920B9629D7120350") {
    $('[data-publicid=29E39C84B5834B7F87FEED0729712944]').parent().hide();
}
//new

$(function() {

    $('body').on('change', '#83ED42FE73284EB2A5DAA02C510DA906', function() {
        if ($("#EF1A5028CBBD4AC09AD4D263F6FBBB72").val() !== '0387CC0842FC427EA88B11E1C5041475' || $("#663DD58F66B04DF29C4E0B880A4A7CE3").val() !== 'E828C09FFC1A4F7B920B9629D7120350') {
            $('[data-publicid=29E39C84B5834B7F87FEED0729712944]').parent().hide();

        } else if ($("#5000ECEAFDA0489F9D659449B7FEB4C6").val() == 'FD08D623CFCB4EECA4C003E4C2D5043D') {
            $('[data-publicid=29E39C84B5834B7F87FEED0729712944]').parent().show();
        }
    });
    $('#EF1A5028CBBD4AC09AD4D263F6FBBB72').trigger('change');
    $('#663DD58F66B04DF29C4E0B880A4A7CE3').trigger('change');
});

//edit 

$(function() {

    $('body').on('change', '#83ED42FE73284EB2A5DAA02C510DA906', function() {
        if ($("#EF1A5028CBBD4AC09AD4D263F6FBBB72").val() !== '0387CC0842FC427EA88B11E1C5041475' || $("#663DD58F66B04DF29C4E0B880A4A7CE3").val() !== 'E828C09FFC1A4F7B920B9629D7120350') {
            //button hide

        } else if ($("#5000ECEAFDA0489F9D659449B7FEB4C6").val() == 'FD08D623CFCB4EECA4C003E4C2D5043D') {
            //buton show
        }
    });
    $('#EF1A5028CBBD4AC09AD4D263F6FBBB72').trigger('change');
    $('#663DD58F66B04DF29C4E0B880A4A7CE3').trigger('change');
});