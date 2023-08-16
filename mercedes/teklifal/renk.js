$(function () {
    var filterName = $('#FilterButtonWrapper span').text();
    if (filterName.includes('Tümü')) {
    var tdList = $('.table tbody tr');
    $.each(tdList, function (i, v) {
    var statu = $(v).find('td[data-id=D6B7CE73F3574F329EF5EAE3155322CF]').data('value'); // Hangi alana göre Kontrol edelim
    if (statu === "BB4032D9E68D480E9300536762150FD1") {
    //onaylandı
    // kabul edildi
    $(this).css('background', 'lightgreen').css('font-weight', 'bold').css('color', '#000000 ');
    $(this).find('td:eq(2) a').css('font-weight', 'bold').css('color', '#000000 '); //Firma siyah renk olsun
    $(this).find('td:eq(8) a').css('font-weight', 'bold').css('color', '#000000 '); //para birimi siyah renk olsun
    }
    if (statu === "94C9B2844416491383E83794C7BEC5CD") {
    //reddedildi
    // kabul edildi
    $(this).css('background', '#F44336').css('font-weight', 'bold').css('color', '#000000 ');
    $(this).find('td:eq(2) a').css('font-weight', 'bold').css('color', '#000000 '); //Firma siyah renk olsun
    $(this).find('td:eq(8) a').css('font-weight', 'bold').css('color', '#000000 '); //para birimi siyah renk olsun
    }
    });
    }
    });