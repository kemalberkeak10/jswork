$(function() {
    $('.well .pull-right:eq(0)').prepend("<a id='btnChangeStatus' class='btn btn-sm btn-info pull-left'  style='margin-right:10px;'>Change Status</a>");

    $('body').on('click', '#btnChangeStatus', function() {
        var isExist = false;
        var chcList = $('.sec');
        var recordList = '';
        $.each(chcList, function(i, el) {
            if ($(this).prop('checked')) {
                isExist = true;
                var recordId = $(this).parents('tr').attr('data-id');
                recordList += recordId + '|';
            }
        });
        if (!isExist) {
            alert("Bu işlemi gerçekleştirmek için en az bir kayıt seçmelisiniz.");
        } else {
            $('#modalChangeStatus').remove();
            window.setModal.Create({
                id: 'modalChangeStatus',
                html: {
                    header: 'Change Status',
                    body: '<div id="msg" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>' +
                        '<table id=modalTable class="table" style="width: 100%">' +
                        '<tbody>' +
                        '<tr>' +
                        '<td colspan="1" rowspan="1"><a id="btnNotConfirmed" class="btn btn-sm btn-primary style="margin-right:10px;">Not Confirmed</a></td>' +
                        '<td colspan="1" rowspan="1"><a id="btnConfirmed" class="btn btn-sm btn-info style="margin-right:10px;">Confirmed</a></td>' +
                        '<td colspan="1" rowspan="1"><a id="btnSent" class="btn btn-sm btn-success style="margin-right:10px;">Sent</a></td>' +
                        '<td colspan="1" rowspan="1"><a id="btnCancelled" class="btn btn-sm btn-danger style="margin-right:10px;">Cancelled</a></td>' +
                        '</tr>' +
                        '</tbody>' +
                        '</table>',
                    footer: '<button class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>',
                }
            });
            $('#msg').hide();
            $('#modalChangeStatus').modal('toggle');
            var statusVal = "";
            $('body').on('click', '#btnNotConfirmed', function() {
                $('#msg').show();
                statusVal = "D2097C2422DA4F84B923AB111B357B1F";
                ChangeStatus(recordList, statusVal);
            });
            $('body').on('click', '#btnConfirmed', function() {
                $('#msg').show();
                statusVal = "D008B70583D04BAB86414C3E95FBF5F6";
                ChangeStatus(recordList, statusVal);
            });
            $('body').on('click', '#btnSent', function() {
                $('#msg').show();
                statusVal = "1326C8E950304ABC9942ABE685D94168";
                ChangeStatus(recordList, statusVal);
            });
            $('body').on('click', '#btnCancelled', function() {
                $('#msg').show();
                statusVal = "B8ED0D50218441A8BD50D16DB2FC5E38";
                ChangeStatus(recordList, statusVal);
            });
        };
    });

    function ChangeStatus(recordList, statusVal) {

        var localUrl = String.format('http://localhost:52129/api/ProfessorElevator/SatinAlmaFormuChangeStatu?records={0}&statu={1}', recordList, statusVal),
            realUrl = String.format('https://templateprocess.setcrm.com/api/ProfessorElevator/SatinAlmaFormuChangeStatu?records={0}&statu={1}', recordList, statusVal);
        //$('#modalSablon .modal-body').html('<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>');
        $('#modalTable').hide();
        $.get(localUrl, function(r) {

            if (r.guncellenemeyenler.length > 0) {
                $('#modalChangeStatus #msg').html('<div class="alert alert-info" id="alertRecords">Güncellenemeyen kayıtlar var. Kayıtların Id leri aşağıdaki gibidir.</div>');
                $.each(r.guncellenemeyenler, function(i, el) {
                    $('#alertRecords').append('RecordId: ' + el);
                });
            } else {
                $('#modalChangeStatus #msg').html('<div class="alert alert-info">İşleminiz başarı ile gerçekleştirildi.</div>');
                setTimeout(() => {

                    window.location.reload();
                }, 1500);
            }
        });
    }



});