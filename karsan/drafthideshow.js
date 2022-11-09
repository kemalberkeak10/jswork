$(function() {
    if ($('div [for=185A50CA4B1649D48D464E09318DFDEF]').parent().data().publicids != null) {
        var statu = $('div [for=185A50CA4B1649D48D464E09318DFDEF]').parent().data().publicids;
    }
    if (statu == "7593982C6E6F4B88B4957E21DC5AA10F") {
        $('a[data-publicid= A420816383D546449B226B8116C6146D]').closest('td').show();
    } else {
        $('a[data-publicid= 99CECFCC13904171B4C9016952E81A13]').closest('td').hide();
    }
});

$(function() {
    if ($('#185A50CA4B1649D48D464E09318DFDEF').val() != null) {
        var statu = $('#185A50CA4B1649D48D464E09318DFDEF').val();
    }
    if (statu == "7593982C6E6F4B88B4957E21DC5AA10F") {
        $('a[data-publicid= A420816383D546449B226B8116C6146D]').closest('td').show();
    } else {
        $('a[data-publicid= 99CECFCC13904171B4C9016952E81A13]').closest('td').hide();
    }
});