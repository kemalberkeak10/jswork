$(function() {
    //if (filter === "6CE456F9222B4EEAB5F698E251698B33") {
    $('.well .pull-right:eq(0)').prepend("<a id='btnPassive' class='btn btn-sm btn-info pull-left'  style='margin-right:10px;'>Passive</a>");

    $('.well .pull-right:eq(0)').prepend("<a id='btnChangeStatus' class='btn btn-sm btn-info pull-left'  style='margin-right:10px;'>Change Status</a>");
    //}

    var trList = $('.no-more-table tbody tr');
    var tdLength = $('.no-more-table tbody tr:eq(0)').find('td').length;
    $.each(trList, function(i, el) {
        $(this).find('td:eq(' + (tdLength - 1) + ')').append('<input type="checkbox" class="sec"/>');
    });

    $('body').on('click', '#btnPassive', function() {
        var status = false;
        var chcList = $('.sec');
        var recordList = '';
        $.each(chcList, function(i, el) {
            if ($(this).prop('checked')) {
                status = true;
                var recordId = $(this).parents('tr').attr('data-id');
                recordList += recordId + '|';
            }
        });



        if (!status) {
            alert("Bu işlemi gerçekleştirmek için en az bir kayıt seçmelisiniz.");
        } else {
            $('#modalLoading').remove();
            window.setModal.Create({
                id: 'modalLoading',
                html: {
                    header: '',
                    body: '<div id="msg" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>',
                    footer: '<button class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>'
                }
            });
            $('#modalLoading').modal('toggle');

            var localUrl = String.format('http://localhost:52129/api/ProfessorElevator/SatinAlmaFormuPasifStatu?records={0}', recordList),
                realUrl = String.format('https://templateprocess.setcrm.com/api/ProfessorElevator/SatinAlmaFormuPasifStatu?records={0}', recordList);

            $.get(realUrl, function(r) {
                if (r.guncellenemeyenler.length > 0) {
                    $('#modalLoading #msg').html('<div class="alert alert-info" id="alertRecords">Güncellenemeyen kayıtlar var. Kayıtların Id leri aşağıdaki gibidir.</div>');
                    $.each(r.guncellenemeyenler, function(i, el) {
                        $('#alertRecords').append('RecordId: ' + el);
                    });
                } else {
                    $('#modalLoading #msg').html('<div class="alert alert-info">İşleminiz başarı ile gerçekleştirildi.</div>');
                    setTimeout(() => {

                        window.location.reload();
                    }, 1500);
                }
            });
        }

    });

    $('body').on('click', '#btnChangeStatus', function() {
        var chcList = $('.sec');
        var recordList = '';
        var isExist = false;
        $.each(chcList, function(i, el) {
            if ($(this).prop('checked')) {
                isExist = true;
                var recordId = $(this).parents('tr').attr('data-id');
                recordList += recordId + '|';
            }
        });

        if (!isExist) {
            $('#modalLoading').remove();
            window.setModal.Create({
                id: 'modalLoading',
                html: {
                    header: '',
                    body: '<div id="msg" style="margin:0 0 5px; width: 100%;">En az bir kayıt seçmek zorundasınız></div>',
                    footer: '<button class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>'
                }
            });
            $('#modalLoading').modal('toggle');
        } else {
            $('#modalLoading').remove();
            window.setModal.Create({
                id: 'modalLoading',
                html: {
                    header: '',
                    body: '<div id="msg" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>',
                    footer: '<button class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>'
                }
            });
            $('#modalLoading').modal('toggle');

            var localUrl = String.format('http://localhost:52129/api/ProfessorElevator/SatinAlmaFormuPasifStatu?records={0}', recordList),
                realUrl = String.format('https://templateprocess.setcrm.com/api/ProfessorElevator/SatinAlmaFormuPasifStatu?records={0}', recordList);

            $.get(realUrl, function(r) {
                if (r.guncellenemeyenler.length > 0) {
                    $('#modalLoading #msg').html('<div class="alert alert-info" id="alertRecords">Güncellenemeyen kayıtlar var. Kayıtların Id leri aşağıdaki gibidir.</div>');
                    $.each(r.guncellenemeyenler, function(i, el) {
                        $('#alertRecords').append('RecordId: ' + el);
                    });
                } else {
                    $('#modalLoading #msg').html('<div class="alert alert-info">İşleminiz başarı ile gerçekleştirildi.</div>');
                    setTimeout(() => {

                        window.location.reload();
                    }, 1500);
                }
            });
        }

    });



});