//detail
var sikayetTipi = $('label[for=AC5365F9E7774810978036BB26543088]').parent().data('publicids');


if (sikayetTipi != "F1672A8956F44871AFA8416201E3008D") {

    $('div[data-id= 2F91815A380B4563950FDA9DDA6961EF]').closest('td').hide();
}


//edit
var sikayetTipi = $('#AC5365F9E7774810978036BB26543088').val()

if (sikayetTipi != "F1672A8956F44871AFA8416201E3008D") {

    $('div[data-publicid=2F91815A380B4563950FDA9DDA6961EF]').hide();

}