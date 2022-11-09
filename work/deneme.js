$(function() {
    var pageLayoutId = $('#LayoutPublicId').val();
    // sabit
    if (pageLayoutId == "820F5F2EC5EC4C33B70C28326345DEF7") {
        $('.well .pull-right:eq(0)').prepend('<a id="btnBidCompare" class="btn btn-sm btn-danger" style="font-size:17px; font-weight:bold" > Yardım </a>');
        $('#3E47E2F634A446AAA774CCC732EA7D67').closest('td').attr('data-step', '1').attr('data-intro', 'Manuel giriş yapılır.');
        $('#EBC03D56372548BA89A96DF7CED390E4').closest('td').attr('data-step', '2').attr('data-intro', '900-Muhtelif Şablonlar seçeneği default gelir.');
        $('#53BA8CE3AFBE47C49F789C8D47ABCC17').closest('td').attr('data-step', '3').attr('data-intro', ' Manuel giriş yapılır.');
        $('#96906A79C4AA4F00A9A16F59E7CC007F').closest('td').attr('data-step', '4').attr('data-intro', 'Birden fazla seçim yapabilirsiniz. ');
        $('#1105BB24AE49422F83D26E9C78057EEC').closest('td').attr('data-step', '5').attr('data-intro', 'Aktif seçeneği default gelir.');
        $('#FA8AD74181A14C779E846E0FE2DF0157').closest('td').attr('data-step', '6').attr('data-intro', ' Seçim yapılabilen bir alandır.');
        $('#2E957529032746D4ADED3BC6840A14E6').closest('td').attr('data-step', '7').attr('data-intro', 'İnaktif alandır.Hayır seçeneği otomatik gelir.');
        $('#B3864F30E4D84505B8E0ECC2D74C1112').closest('td').attr('data-step', '8').attr('data-intro', 'Kayıtlı kullanıcı masraf yerleri arasından seçim yapabilirsiniz. + butonu ile yeni kayıt ekleyebilirsiniz.');
        $('#F054EBC8C57A45218DE4AD2930D91D87').closest('td').attr('data-step', '9').attr('data-intro', ' Kullanıcı masraf yeri seçiminde sonra otomatik gelmektedir.');
        $('#119AB6E31056444BAC33A493C873CCA0').closest('td').attr('data-step', '10').attr('data-intro', ' Kullanıcı masraf yeri seçiminde sonra otomatik gelmektedir.');
        $('#B3C96AD9677A4CF0B426765402468B61').closest('td').attr('data-step', '11').attr('data-intro', ' Kullanıcı masraf yeri seçiminde sonra otomatik gelmektedir.');
        $('#9C847243E55D4BA3BEA8232CCB1C9B24').closest('td').attr('data-step', '12').attr('data-intro', ' Kullanıcı masraf yeri seçiminde sonra otomatik gelmektedir.');
        $('#6434502A462D41E0B1BC84CB00B0EC58').closest('td').attr('data-step', '13').attr('data-intro', ' Seçim yapılabilen bir alandır. Kullanıcıda seçeneği default  gelmektedir. ');
        $('#740F3F9AA4D740DDA7375D1AB71A4E6E ').closest('td').attr('data-step', '14').attr('data-intro', ' Dahili default gelmektedir.');
        $('#6868AB9F12A24DB8A5BDC5CCED6AA506').closest('td').attr('data-step', '15').attr('data-intro', ' Kalibrasyon firmaları arasından seçim yapabilirsiniz. MBT  Dahili Şablon Kontrol Merkezi default gelmektedir.');
        $('#3CEBB080153643478D039C8DD9BBCBFE').closest('td').attr('data-step', '16').attr('data-intro', ' Takvim üzerinden tarih seçimi yapabilirsiniz.');
        $('#CBB19FAFD34949AA96A5A988F81C43A7').closest('td').attr('data-step', '17').attr('data-intro', 'Periyod bilgisini ay olarak giriş yapabilirsiniz.');
        $('#5A96B54CF9DA4E6A9C9E44CED9D70799').closest('td').attr('data-step', '18').attr('data-intro', ' Sistem tarafından otomatik hesaplanmaktadır.');
        $('#btn_save').attr('data-step', '19').attr('data-intro', 'Kaydet butonuna basarak kalibrasyon şablon kaydı oluşturabilirsiniz.');
        // sabit
        $('body').on('click', '#btnBidCompare', function() {
            $('.modal-content').hide();
            introJs().start();
        });
    }
});