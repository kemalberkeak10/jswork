$(function() {
    var status = $('label[for=19D81E12CC10444DA745D125DCDF3EA9]').parent().data('publicids');


    // Status stopken start gözükcek.
    // Status Startken Stop gözükecek.
    if (status == "86218D2471114C9BB41FF10D32B0A189") {
        // start
        $('.well .pull-right:eq(0)').prepend('<a id="btnStopTask" class="btn btn-sm btn-danger"  style="margin-right:10px;" title="Stop"><span>Stop<i class="far fa-stop-circle" style="margin-left: 5px;"></i></span></a>');

        $('body').on('click', '#btnStopTask', function() {
            $('#modalStopTr').remove();
            window.setModal.Create({
                id: 'modalStopTr',
                html: {
                    header: 'Uyarı',
                    body: ' <label style="color:red;font-size:15px;">Task Card Close edilsin mi?</label>',
                    footer: '<button id="btnYesStop"  class="btn btn-success btn-sm btnXC">Evet</button>' + '<button id="btnNoStop" class="btn btn-success btn-sm btnXC">Hayır</button>'
                }
            });
            $('#modalStopTr').modal('toggle');
            $('body').on('click', '#btnYesStop,#btnNoStop', function() {
                var localUrl = String.format('http://localhost:65474/api/data/StopTranscationList?recordId={0}&isClose={1}', $('#RecordPublicId').val(), "true"),
                    realUrl = String.format('https://thywebapi.setcrm.com/api/data/StopTranscationList?recordId={0}&isClose={1}', $('#RecordPublicId').val(), "true");

                var id = $(this).attr('id');
                if (id === "btnNoStop") {
                    localUrl = String.format('http://localhost:65474/api/data/StopTranscationList?recordId={0}&isClose={1}', $('#RecordPublicId').val(), "false"),
                        realUrl = String.format('https://thywebapi.setcrm.com/api/data/StopTranscationList?recordId={0}&isClose={1}', $('#RecordPublicId').val(), "false");
                }
                $('#modalStopTr .modal-body').html('');
                $('#modalStopTr .modal-body').html('İşleminiz yapılıyor, lütfen bekleyiniz.. <br/> <img src="/Public/img/loading_bar.gif">');
                $.get(realUrl, function(r) {
                    if (r.Status) {
                        window.location.reload();
                    } else {
                        $('#modalStartedTr .modal-body').html(r.Message);
                    }
                });
            });
        });


    } else if (status == "F251D067799D4EBEB2D5D1DA81E9FCEA" || status == "9F54A23E08A042CB95310828CF1E69F7") {
        // stop

        $('.well .pull-right:eq(0)').prepend('<a id="btnStartTask" class="btn btn-sm btn-success"  style="margin-right:10px;" title="Start"><span>Start <i class="fas fa-play-circle" style="margin-left: 5px;"></i></span></a>');
        $('body').on('click', '#btnStartTask', function() {
            $('#modalStartedTr').remove();
            window.setModal.Create({
                id: 'modalStartedTr',
                html: {
                    header: 'Waiting',
                    body: 'İşleminiz yapılıyor, lütfen bekleyiniz.. <br/> <img src="/Public/img/loading_bar.gif',
                    footer: ''
                }
            });
            $('#modalStartedTr').modal('toggle');
            var localUrl = String.format('http://localhost:65474/api/data/StartTranscationList?recordId={0}', $('#RecordPublicId').val()),
                realUrl = String.format('https://thywebapi.setcrm.com/api/data/StartTranscationList?recordId={0}', $('#RecordPublicId').val());

            $.get(realUrl, function(r) {
                if (r.Status) {
                    window.location.reload();
                } else {
                    $('#modalStartedTr .modal-body').html(r.Message);
                }
            });

        });
    }


});