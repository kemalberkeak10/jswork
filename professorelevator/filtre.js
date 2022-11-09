$(function() {
    if ($('#ViewFilterPublicId').val() === "C2881F1F3033437FB152D74F9A2C4D02") {
        $('.well .pull-right:eq(0)').prepend("<a id='btnChangeStatus' class='btn btn-sm btn-info pull-left'  style='margin-right:10px;'>Change Status</a>");
    } else {
        $('#btnChangeStatus').hide();
    }
    var trList = $('.no-more-table tbody tr');
    var tdLength = $('.no-more-table tbody tr:eq(0)').find('td').length;
    $.each(trList, function(i, el) {
        $(this).find('td:eq(' + (tdLength - 1) + ')').append('<input type="checkbox" class="sec"/>');
    });

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
                        '<td colspan="1" rowspan="1"><a id="btnShipped" class="btn btn-sm btn-primary style="margin-right:10px;">Shipped</a></td>' +
                        '<td colspan="1" rowspan="1"><a id="btnApproved" class="btn btn-sm btn-success style="margin-right:10px;">Approved</a></td>' +
                        '<td colspan="1" rowspan="1"><a id="btnDenied" class="btn btn-sm btn-warning style="margin-right:10px;">Denied</a></td>' +
                        '<td colspan="1" rowspan="1"><a id="btnCancel" class="btn btn-sm btn-danger style="margin-right:10px;">Cancel</a></td>' +
                        '<td colspan="1" rowspan="1"><a id="btndraft" class="btn btn-sm btn-info style="margin-right:10px;">Draft</a></td>' +
                        '</tr>' +
                        '</tbody>' +
                        '</table>',
                    footer: '<button class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>',
                }
            });
            $('#msg').hide();
            $('#modalChangeStatus').modal('toggle');
            var statusVal = "";
            $('body').on('click', '#btnShipped', function() {
                $('#msg').show();
                statusVal = "E36BC382C97D42E5BDEF346864C3F646";
                ChangeStatus(recordList, statusVal);
            });
            $('body').on('click', '#btnApproved', function() {
                $('#msg').show();
                statusVal = "9ACD33C34D1147D2B3A330DA4646976F";
                ChangeStatus(recordList, statusVal);
            });
            $('body').on('click', '#btnDenied', function() {
                $('#msg').show();
                statusVal = "A09C78D5949344998D03A3E8B71864F6";
                ChangeStatus(recordList, statusVal);
            });
            $('body').on('click', '#btnCancel', function() {
                $('#msg').show();
                statusVal = "EF166DB814B64F6FA4292EEC5EF6D0AF";
                ChangeStatus(recordList, statusVal);
            });
            $('body').on('click', '#btndraft', function() {
                $('#msg').show();
                statusVal = "AE50EBD97BFA407090AADD23B1282028";
                ChangeStatus(recordList, statusVal);
            });
        };
    });

    function ChangeStatus(recordList, statusVal) {

        var localUrl = String.format('http://localhost:52129/api/ProfessorElevator/SalesOfferChangeStatu?records={0}&statu={1}', recordList, statusVal),
            realUrl = String.format('https://templateprocess.setcrm.com/api/ProfessorElevator/SalesOfferChangeStatu?records={0}&statu={1}', recordList, statusVal);
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