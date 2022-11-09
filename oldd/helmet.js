//detay
var urunTipi = $('label[for=D41153D00DCC40B6B94CB98A61D636E8]').parent().data('publicids');
$('.panel-lookup[data-panelid=22F19282E90746CCA12D82A57B4F39E8]').closest('tr').hide();
$('div[id=4C06EB184E1444A1AC5CCE9E3A24C7AC]').parent().hide(); //kasko
$('div[id=861D939CF5BC4AD3A6C348B19F63F92D]').parent().hide(); //konut
$('div[id=8752D9D7974840E48F688D7D581FB5A7]').parent().hide(); //dask
$('div[id=87BDECA0B72145749ED48A072B9A77C9]').parent().hide(); //yangın
$('div[id=8AEC0454223746FDBF39C64D0A5ACEA2]').parent().hide(); //kasko filo
$('div[id=4D6FEF927C1A427C9DB7F32B1A4E84B6]').parent().hide(); //trafik filo
$('div[id=03AC89E368E040008C7B81903955414D]').parent().hide(); //nakliyat
$('div[id=90804B91517F4A2B858AA8338277CE38]').parent().hide(); //enerji
$('div[id=A0B345B133BC4E7E8566A6A174EDD622]').parent().hide(); //mühendislik
$('div[id=51EFC26E4F814B128E4AC07C1AAF7C0D]').parent().hide(); //sorumluluk
$('div[id=858E19E9A93A4DA6BB8F17F719DC034E]').parent().hide(); //sağlık

switch(urunTipi) {
    case 'B325F8C8AEB344E598CBE1BC7AEAF2CF' : //trafik
    $('.panel-lookup[data-panelid=22F19282E90746CCA12D82A57B4F39E8]').closest('tr').show();
      break;
    case '7778AD3CE63C452BBA6E8A92AC071787': //kasko
    $('div[id=4C06EB184E1444A1AC5CCE9E3A24C7AC]').parent().show();
      break;
      case '46EBB4974F8741AD8277CB19C8C4B3C5' : //konut
      $('div[id=861D939CF5BC4AD3A6C348B19F63F92D]').parent().show();
      break;
    case '0D549A0081C046FE83FB04A0CAA41719': //dask
    $('div[id=8752D9D7974840E48F688D7D581FB5A7]').parent().show();
      break;
      case '9A4634F0AAAE44A4AE34BACFE3D4903B' : //yangin
      $('div[id=87BDECA0B72145749ED48A072B9A77C9]').parent().show(); //yangın
      break;
    case '795D0B16D63C434D8DAD1A2992329D36': //kasko filo
    $('div[id=8AEC0454223746FDBF39C64D0A5ACEA2]').parent().show(); //kasko filo
      break;
      case '5B316637405F4E2485E35B25E0859349' : //trafik filo
      $('div[id=4D6FEF927C1A427C9DB7F32B1A4E84B6]').parent().show(); //trafik filo
      break;
    case '08D5EE160DBE45BAA9C913C05A067E64': //nakliyat
    $('div[id=03AC89E368E040008C7B81903955414D]').parent().show(); //nakliyat
      break;
      case '2EB9558EE76E411D9EFF0BB843698929' : //enerji
      $('div[id=90804B91517F4A2B858AA8338277CE38]').parent().show(); //enerji
      break;
    case '0A68128FBE1346429FE9EA44890246F6': //mühendislik
    $('div[id=A0B345B133BC4E7E8566A6A174EDD622]').parent().show(); //mühendislik
      break;
      case 'F61D963C984048D085588E411553DA06' : //sorumlulk
      $('div[id=51EFC26E4F814B128E4AC07C1AAF7C0D]').parent().show(); //sorumluluk
      break;
    case '1EA1574F356B4111B6627D80CC443C47': //sağlık
    $('div[id=858E19E9A93A4DA6BB8F17F719DC034E]').parent().show(); //sağlık
      break;
    default:

  }





//new

$(function () {

$('body').on('change',
    '#D41153D00DCC40B6B94CB98A61D636E8',
    function() {
        var urunTipi = $('#D41153D00DCC40B6B94CB98A61D636E8').val();
        $('.panel-lookup[data-panelid=22F19282E90746CCA12D82A57B4F39E8]').closest('tr').hide();
        $('table[data-id=4C06EB184E1444A1AC5CCE9E3A24C7AC]').closest('td').parent().hide(); //kasko
        $('table[data-id=861D939CF5BC4AD3A6C348B19F63F92D]').closest('td').parent().hide(); //konut
        $('table[data-id=8752D9D7974840E48F688D7D581FB5A7]').closest('td').parent().hide(); //dask
        $('table[data-id=87BDECA0B72145749ED48A072B9A77C9]').closest('td').parent().hide(); //yangın
        $('table[data-id=8AEC0454223746FDBF39C64D0A5ACEA2]').closest('td').parent().hide(); //kasko filo
        $('table[data-id=4D6FEF927C1A427C9DB7F32B1A4E84B6]').closest('td').parent().hide(); //trafik filo
        $('table[data-id=03AC89E368E040008C7B81903955414D]').closest('td').parent().hide(); //nakliyat
        $('table[data-id=90804B91517F4A2B858AA8338277CE38]').closest('td').parent().hide(); //enerji
        $('table[data-id=A0B345B133BC4E7E8566A6A174EDD622]').closest('td').parent().hide(); //mühendislik
        $('table[data-id=51EFC26E4F814B128E4AC07C1AAF7C0D]').closest('td').parent().hide(); //sorumluluk
        $('table[data-id=858E19E9A93A4DA6BB8F17F719DC034E]').closest('td').parent().hide(); //sağlık
        
        switch(urunTipi) {
            case 'B325F8C8AEB344E598CBE1BC7AEAF2CF' : //trafik
            $('.panel-lookup[data-panelid=22F19282E90746CCA12D82A57B4F39E8]').closest('tr').show();
              break;
            case '7778AD3CE63C452BBA6E8A92AC071787': //kasko
            $('table[data-id=4C06EB184E1444A1AC5CCE9E3A24C7AC]').closest('td').parent().show();
              break;
              case '46EBB4974F8741AD8277CB19C8C4B3C5' : //konut
              $('table[data-id=861D939CF5BC4AD3A6C348B19F63F92D]').closest('td').parent().show();
              break;
            case '0D549A0081C046FE83FB04A0CAA41719': //dask
            $('table[data-id=8752D9D7974840E48F688D7D581FB5A7]').closest('td').parent().show();
              break;
              case '9A4634F0AAAE44A4AE34BACFE3D4903B' : //yangin
              $('table[data-id=87BDECA0B72145749ED48A072B9A77C9]').closest('td').parent().show(); //yangın
              break;
            case '795D0B16D63C434D8DAD1A2992329D36': //kasko filo
            $('table[data-id=8AEC0454223746FDBF39C64D0A5ACEA2]').closest('td').parent().show(); //kasko filo
              break;
              case '5B316637405F4E2485E35B25E0859349' : //trafik filo
              $('table[data-id=4D6FEF927C1A427C9DB7F32B1A4E84B6]').closest('td').parent().show(); //trafik filo
              break;
            case '08D5EE160DBE45BAA9C913C05A067E64': //nakliyat
            $('table[data-id=03AC89E368E040008C7B81903955414D]').closest('td').parent().show(); //nakliyat
              break;
              case '2EB9558EE76E411D9EFF0BB843698929' : //enerji
              $('table[data-id=90804B91517F4A2B858AA8338277CE38]').closest('td').parent().show(); //enerji
              break;
            case '0A68128FBE1346429FE9EA44890246F6': //mühendislik
            $('table[data-id=A0B345B133BC4E7E8566A6A174EDD622]').closest('td').parent().show(); //mühendislik
              break;
              case 'F61D963C984048D085588E411553DA06' : //sorumlulk
              $('table[data-id=51EFC26E4F814B128E4AC07C1AAF7C0D]').closest('td').parent().show(); //sorumluluk
              break;
            case '1EA1574F356B4111B6627D80CC443C47': //sağlık
            $('table[data-id=858E19E9A93A4DA6BB8F17F719DC034E]').closest('td').parent().show(); //sağlık
              break;
            default:
        
          };
          
    });
    $('#D41153D00DCC40B6B94CB98A61D636E8').trigger('change');
});

//
$(function () {

    $('body').on('change',
        '#D41153D00DCC40B6B94CB98A61D636E8',
        function() {
            var urunTipi = $('#D41153D00DCC40B6B94CB98A61D636E8').val();
            $('.panel-lookup[data-panelid=22F19282E90746CCA12D82A57B4F39E8]').closest('tr').hide();
            $('table[data-id=4C06EB184E1444A1AC5CCE9E3A24C7AC]').closest('td').parent().hide(); //kasko
            $('table[data-id=861D939CF5BC4AD3A6C348B19F63F92D]').closest('td').parent().hide(); //konut
            $('table[data-id=8752D9D7974840E48F688D7D581FB5A7]').closest('td').parent().hide(); //dask
            $('table[data-id=87BDECA0B72145749ED48A072B9A77C9]').closest('td').parent().hide(); //yangın
            $('table[data-id=8AEC0454223746FDBF39C64D0A5ACEA2]').closest('td').parent().hide(); //kasko filo
            $('table[data-id=4D6FEF927C1A427C9DB7F32B1A4E84B6]').closest('td').parent().hide(); //trafik filo
            $('table[data-id=03AC89E368E040008C7B81903955414D]').closest('td').parent().hide(); //nakliyat
            $('table[data-id=90804B91517F4A2B858AA8338277CE38]').closest('td').parent().hide(); //enerji
            $('table[data-id=A0B345B133BC4E7E8566A6A174EDD622]').closest('td').parent().hide(); //mühendislik
            $('table[data-id=51EFC26E4F814B128E4AC07C1AAF7C0D]').closest('td').parent().hide(); //sorumluluk
            $('table[data-id=858E19E9A93A4DA6BB8F17F719DC034E]').closest('td').parent().hide(); //sağlık
            
            switch(urunTipi) {
                case 'B325F8C8AEB344E598CBE1BC7AEAF2CF' : //trafik
                $('.panel-lookup[data-panelid=22F19282E90746CCA12D82A57B4F39E8]').closest('tr').show();
                  break;
                case '7778AD3CE63C452BBA6E8A92AC071787': //kasko
                $('table[data-id=4C06EB184E1444A1AC5CCE9E3A24C7AC]').closest('td').parent().show();
                  break;
                  case '46EBB4974F8741AD8277CB19C8C4B3C5' : //konut
                  $('table[data-id=861D939CF5BC4AD3A6C348B19F63F92D]').closest('td').parent().show();
                  break;
                case '0D549A0081C046FE83FB04A0CAA41719': //dask
                $('table[data-id=8752D9D7974840E48F688D7D581FB5A7]').closest('td').parent().show();
                  break;
                  case '9A4634F0AAAE44A4AE34BACFE3D4903B' : //yangin
                  $('table[data-id=87BDECA0B72145749ED48A072B9A77C9]').closest('td').parent().show(); //yangın
                  break;
                case '795D0B16D63C434D8DAD1A2992329D36': //kasko filo
                $('table[data-id=8AEC0454223746FDBF39C64D0A5ACEA2]').closest('td').parent().show(); //kasko filo
                  break;
                  case '5B316637405F4E2485E35B25E0859349' : //trafik filo
                  $('table[data-id=4D6FEF927C1A427C9DB7F32B1A4E84B6]').closest('td').parent().show(); //trafik filo
                  break;
                case '08D5EE160DBE45BAA9C913C05A067E64': //nakliyat
                $('table[data-id=03AC89E368E040008C7B81903955414D]').closest('td').parent().show(); //nakliyat
                  break;
                  case '2EB9558EE76E411D9EFF0BB843698929' : //enerji
                  $('table[data-id=90804B91517F4A2B858AA8338277CE38]').closest('td').parent().show(); //enerji
                  break;
                case '0A68128FBE1346429FE9EA44890246F6': //mühendislik
                $('table[data-id=A0B345B133BC4E7E8566A6A174EDD622]').closest('td').parent().show(); //mühendislik
                  break;
                  case 'F61D963C984048D085588E411553DA06' : //sorumlulk
                  $('table[data-id=51EFC26E4F814B128E4AC07C1AAF7C0D]').closest('td').parent().show(); //sorumluluk
                  break;
                case '1EA1574F356B4111B6627D80CC443C47': //sağlık
                $('table[data-id=858E19E9A93A4DA6BB8F17F719DC034E]').closest('td').parent().show(); //sağlık
                  break;
                default:
            
              };
              
        });
        $('#D41153D00DCC40B6B94CB98A61D636E8').trigger('change');
    });