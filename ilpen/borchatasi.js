$(function() {

    $.get('https://maya.setcrm.com/set/list/acilis-mesaji/?filter=09D0DF2AD8C34EEE85D7999D50D18FCC', function(sdata) {
        var metin = "";
        var elem = $('<div />').html(sdata);
        var musteriToplam = elem.find('.table-responsive tbody tr');
        $(musteriToplam).each(function() {
            if ($(this).find('td:eq(4)').find('i').attr('class') === 'fa fa-check-square-o') {
                $('#modalUyari').modal('toggle');
                metin = $(this).find('td:eq(3)').justText();
                $('#modalUyari .modal-body #msg').html(metin);
            }
        });

    });
    const Toast = Swal.mixin({
        toast: false,
        position: 'center',
        showConfirmButton: true,
        // timer: 2000,
        // timerProgressBar: false,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    Toast.fire({
        icon: 'warning',
        title: 'Bu firmanın borcu bulunmaktadır.',
        width: 1000,
    })
});

$(function() {
    var control1 = $('label[for=76EA70E6449D4605919AFD5BFF689109]').parent().data('value');
    if (control1 == "true") {
        var urunid = $('label[for=073007518CCE4C7FB3D748B1C47EFA27]').closest('div').find('a').attr('href').split('/')[4]
        $.get('https://ilpenwebapi.setcrm.com/api/data/GetAcikFaturalarMaya?carirecordID=' + urunid, function(result) {
            if (result.Status) {
                if (result.acikFatura.length > 0) {}
                console.log(result.acikFatura[0])
            }
        });
    }
});