$(document).ready(function() {
    ///*Modal*/
    const Toast = Swal.mixin({
        toast: false,
        position: 'center',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: false,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    Toast.fire({
        icon: 'info',
        title: 'Hoşgeldiniz ' + userData.name,
        width: 1000,
    })
    window.setModal.Create({
        id: 'modalUyari',
        html: {
            header: 'Açılış Mesajı',
            body: '<div id="msg" style="margin:0 0 5px"></div>',
            footer: ''
        }
    });

    ///*Modal Son*/
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
});