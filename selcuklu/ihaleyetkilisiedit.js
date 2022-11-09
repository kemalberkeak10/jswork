$(function() {
    var sirketId = $('#D601A2D9FC19438882973923AF984195').val();
    if (sirketId == 'DE38C3E6488F494C89A150F5BE7A602B') {
        //kültürse
        $('#BB97B2F02A0747768909E09900321A99').select2('data', {
            id: 'A70BC007EA0443BDA70FF22866F0558B',
            text: 'Muhammed Said Yoğurt'
        });
    } else if (sirketId == '1DBAA1E213FC4DA3B49A1D77B1F04782') {
        //kentse
        var yaklasikMaliyet = $('#4EEC79BC63B6473DA9785641837B8C4D').val();
        $('#BB97B2F02A0747768909E09900321A99').select2('data', {
            id: 'DDA8F18788384EF9BE613532A87189AB',
            text: 'Mehmet Lütfi Özbaygın'
        });
        // if (parseFloat(yaklasikMaliyet) < 5000) {
        //     $('#AF53A184DA864D13B7AA97B77E866A9D ').select2('data', {
        //         id: 'DDA8F18788384EF9BE613532A87189AB',
        //         text: 'Mehmet Lütfi Özbaygın'
        //     });
        // } else if (yaklasikMaliyet >= 5000) {
        //     $('#AF53A184DA864D13B7AA97B77E866A9D ').select2('data', {
        //         id: 'A70BC007EA0443BDA70FF22866F0558B',
        //         text: 'Muhammed Said Yoğurt'
        //     });
        // }
    }

    $('body').on('change', '#D601A2D9FC19438882973923AF984195', function() {
        var sirketId = $('#D601A2D9FC19438882973923AF984195').val();
        if (sirketId == 'DE38C3E6488F494C89A150F5BE7A602B') {
            //kültürse
            $('#BB97B2F02A0747768909E09900321A99').select2('data', {
                id: 'A70BC007EA0443BDA70FF22866F0558B',
                text: 'Muhammed Said Yoğurt'
            });
        } else if (sirketId == '1DBAA1E213FC4DA3B49A1D77B1F04782') {
            //kentse
            $('#BB97B2F02A0747768909E09900321A99').select2('data', {
                id: 'DDA8F18788384EF9BE613532A87189AB',
                text: 'Mehmet Lütfi Özbaygın'
            });

            // var yaklasikMaliyet = $('#4EEC79BC63B6473DA9785641837B8C4D').val();
            // if (parseFloat(yaklasikMaliyet) < 5000) {
            //     $('#AF53A184DA864D13B7AA97B77E866A9D ').select2('data', {
            //         id: 'DDA8F18788384EF9BE613532A87189AB',
            //         text: 'Mehmet Lütfi Özbaygın'
            //     });
            // } else if (yaklasikMaliyet >= 5000) {
            //     $('#AF53A184DA864D13B7AA97B77E866A9D ').select2('data', {
            //         id: 'A70BC007EA0443BDA70FF22866F0558B',
            //         text: 'Muhammed Said Yoğurt'
            //     });
            // }
        }
    });
    $('#D601A2D9FC19438882973923AF984195').trigger('change');

    // $('body').on('change',
    //     '#4EEC79BC63B6473DA9785641837B8C4D ',
    //     function() {
    //         var sirketId = $('#D601A2D9FC19438882973923AF984195').val();
    //         if (sirketId == 'DE38C3E6488F494C89A150F5BE7A602B') {
    //             //kültürse
    //             $('#AF53A184DA864D13B7AA97B77E866A9D ').select2('data', {
    //                 id: 'A70BC007EA0443BDA70FF22866F0558B',
    //                 text: 'Muhammed Said Yoğurt'
    //             });
    //         } else if (sirketId == '1DBAA1E213FC4DA3B49A1D77B1F04782') {
    //             //kentse
    //             var yaklasikMaliyet = $('#4EEC79BC63B6473DA9785641837B8C4D').val();
    //             if (yaklasikMaliyet < 5000) {
    //                 $('#AF53A184DA864D13B7AA97B77E866A9D ').select2('data', {
    //                     id: 'DDA8F18788384EF9BE613532A87189AB',
    //                     text: 'Mehmet Lütfi Özbaygın'
    //                 });
    //             } else if (yaklasikMaliyet >= 5000) {
    //                 $('#AF53A184DA864D13B7AA97B77E866A9D ').select2('data', {
    //                     id: 'A70BC007EA0443BDA70FF22866F0558B',
    //                     text: 'Muhammed Said Yoğurt'
    //                 });
    //             }
    //         }
    //     });
});