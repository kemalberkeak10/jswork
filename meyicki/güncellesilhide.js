$(function() {
    var statu = $("label[for=663DD58F66B04DF29C4E0B880A4A7CE3]").parent().data("publicids");
    var user = userData.id;
    var satisSorumlusu = $("label[for=EB645D6C559F4FF5873609BA52E07CA4]").parent().data("publicids")
    if ((statu == "E828C09FFC1A4F7B920B9629D7120350" && user == satisSorumlusu)) {
        $('#btnUrunDegisim').show();
        $('#btnSatisOnayy').hide();
        $('#btnIptalTalepEt').hide();

    }
});