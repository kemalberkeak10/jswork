$(function() {
    $(".current_year").text((new Date).getFullYear());
    $('#testHavuzuCount, #testLaborantCount, #kdiOnayimiBekleyen, #testDegerlendirmede, #raporKontrolunde,#tamamlananAkrTestler, #tamamlananKdiTestler, #akrOnayimiBekleyen, #akrTestLaborantta, #akrTestHavuzunda, #akrIslerim, #gecikenCihaz, #tumCihaz, #aktifCihaz , #kalibrasyonFormlar,#firmaTanimlamalar,#sorumlularListesi').html('<div class="spinner-grow spinner-grow-lg text-warning" role="status"><span class="sr-only"></span></div>');
    $.get(window.location.href.split(':')[0] + '://maya-inklab.tr152.corpintra.net/set/list/test-formu/?filter=E8EE20EE20C84221875AA3983AABF636', function(sdata) {
        var elem = $('<div />').html(sdata);
        var test = $(elem.find('#itemCount')[0]).text();
        $('#testHavuzuCount').html(test);
    });
    $.get(window.location.href.split(':')[0] + '://maya-inklab.tr152.corpintra.net/set/list/test-formu/?filter=8A00FA7DCC7944A681C553865E38CA65', function(sdata) {
        var elem = $('<div />').html(sdata);
        var test = $(elem.find('#itemCount')[0]).text();
        $('#testLaborantCount').html(test);
    });
    $.get(window.location.href.split(':')[0] + '://maya-inklab.tr152.corpintra.net/set/list/test-formu/?filter=A9EFFD71235D4A9AB49BBF9CAD1A5E7B', function(sdata) {
        var elem = $('<div />').html(sdata);
        var test = $(elem.find('#itemCount')[0]).text();
        $('#kdiOnayimiBekleyen').html(test);
    });
    $.get(window.location.href.split(':')[0] + '://maya-inklab.tr152.corpintra.net/set/list/test-formu/?filter=F39F7DC5FBD546A8A60451B2D5135390', function(sdata) {
        var elem = $('<div />').html(sdata);
        var test = $(elem.find('#itemCount')[0]).text();
        $('#testDegerlendirmede').html(test);
    });
    $.get(window.location.href.split(':')[0] + '://maya-inklab.tr152.corpintra.net/set/list/test-formu/?filter=3960A10A2E364BE2A45D657FE4D47A0D', function(sdata) {
        var elem = $('<div />').html(sdata);
        var test = $(elem.find('#itemCount')[0]).text();
        $('#raporKontrolunde').html(test);
    });
    $.get(window.location.href.split(':')[0] + '://maya-inklab.tr152.corpintra.net/set/list/test-formu/?filter=41706594FF9D404F904837728E7D3ADE', function(sdata) {
        var elem = $('<div />').html(sdata);
        var test = $(elem.find('#itemCount')[0]).text();
        $('#tamamlananKdiTestler').html(test);
    });
    $.get(window.location.href.split(':')[0] + '://maya-inklab.tr152.corpintra.net/set/list/akredite-numune/?filter=E360ADF8926C4000B87709AAB278E6CB', function(sdata) {
        var elem = $('<div />').html(sdata);
        var test = $(elem.find('#itemCount')[0]).text();
        $('#tamamlananAkrTestler').html(test);
    });
    $.get(window.location.href.split(':')[0] + '://maya-inklab.tr152.corpintra.net/set/list/akredite-numune/?filter=5FC9BD66D8504F0C8E5F7CB4C750F067', function(sdata) {
        var elem = $('<div />').html(sdata);
        var test = $(elem.find('#itemCount')[0]).text();
        $('#akrOnayimiBekleyen').html(test);
    });
    $.get(window.location.href.split(':')[0] + '://maya-inklab.tr152.corpintra.net/set/list/akredite-numune/?filter=125E75E7DB7D4218971B729165BF7957', function(sdata) {
        var elem = $('<div />').html(sdata);
        var test = $(elem.find('#itemCount')[0]).text();
        $('#akrTestLaborantta').html(test);
    });
    $.get(window.location.href.split(':')[0] + '://maya-inklab.tr152.corpintra.net/set/list/akredite-numune/?filter=156F578715BB401DB1A901978DF0CE88', function(sdata) {
        var elem = $('<div />').html(sdata);
        var test = $(elem.find('#itemCount')[0]).text();
        $('#akrTestHavuzunda').html(test);
    });
    $.get(window.location.href.split(':')[0] + '://maya-inklab.tr152.corpintra.net/set/list/akredite-numune/?filter=4FF6C6704A124E62A920B9C919CD1EEB', function(sdata) {
        var elem = $('<div />').html(sdata);
        var test = $(elem.find('#itemCount')[0]).text();
        $('#akrIslerim').html(test);
    });
    $.get(window.location.href.split(':')[0] + '://maya-inklab.tr152.corpintra.net/set/list/kalibrasyon-cihaz-karti/?filter=873FDD4124E343EDBE8EF0221CCDC7E1', function(sdata) {
        var elem = $('<div />').html(sdata);
        var test = $(elem.find('#itemCount')[0]).text();
        $('#gecikenCihaz').html(test);
    });
    $.get(window.location.href.split(':')[0] + '://maya-inklab.tr152.corpintra.net/set/list/kalibrasyon-cihaz-karti/?filter=5D7E7F6B58BB4B379C654FFBDAEC54AB', function(sdata) {
        var elem = $('<div />').html(sdata);
        var test = $(elem.find('#itemCount')[0]).text();
        $('#tumCihaz').html(test);
    });
    $.get(window.location.href.split(':')[0] + '://maya-inklab.tr152.corpintra.net/set/list/kalibrasyon-cihaz-karti/?filter=84620E952CBE4698BB295FDB61C001F9', function(sdata) {
        var elem = $('<div />').html(sdata);
        var test = $(elem.find('#itemCount')[0]).text();
        $('#aktifCihaz').html(test);
    });
    $.get(window.location.href.split(':')[0] + '://maya-inklab.tr152.corpintra.net/set/list/kalibrasyon-cihaz-karti/?filter=873FDD4124E343EDBE8EF0221CCDC7E1', function(sdata) {
        var elem = $('<div />').html(sdata);
        var test = $(elem.find('#itemCount')[0]).text();
        $('#kalibrasyonFormlar').html(test);
    });
    $.get(window.location.href.split(':')[0] + '://maya-inklab.tr152.corpintra.net/set/list/kalibrasyon-cihaz-karti/?filter=5D7E7F6B58BB4B379C654FFBDAEC54AB', function(sdata) {
        var elem = $('<div />').html(sdata);
        var test = $(elem.find('#itemCount')[0]).text();
        $('#FirmaTanimlamalar').html(test);
    });
    $.get(window.location.href.split(':')[0] + '://maya-inklab.tr152.corpintra.net/set/list/kalibrasyon-cihaz-karti/?filter=84620E952CBE4698BB295FDB61C001F9', function(sdata) {
        var elem = $('<div />').html(sdata);
        var test = $(elem.find('#itemCount')[0]).text();
        $('#SorumlularListesi').html(test);
    });


    $("#sablon").attr("href", window.location.href.split(':')[0] + '://maya-inklab.tr152.corpintra.net/set/list/sablon/?filter=A9B7248CA2A5429797DD3AA9D881D3F7');
    $("#yenitest").attr("href", window.location.href.split(':')[0] + '://maya-inklab.tr152.corpintra.net/set/new/test-formu/?pageLayoutId=531F92F5B380406A95DD9793255A12AF');
});