$(function() {
    $('body').on('lookupRelationLoadTriggerEvent', function(e, relationId) {
        if ((relationId === 'AD7DEAC4DCD24469A397AE72E03C898E')) {
            var datas = $('.panel-lookup[data-id=AD7DEAC4DCD24469A397AE72E03C898E] tbody tr');
            if (datas.length > 0) {
                datas.each(function(i, v) {
                    var status = $(v).find('td[data-id=19D81E12CC10444DA745D125DCDF3EA9]').data('value');
                    if (status === "86218D2471114C9BB41FF10D32B0A189") {
                        $(v).find('.btn-group').prepend('<a id="btnPauseTaskLr" class="btn btn-sm btn-warning" title="Pause"><i class="far fa-pause-circle"></i></a>');
                        $(v).find('.btn-group').prepend('<a id="btnStopTaskLr" class="btn btn-sm btn-danger" title="Stop"><i class="far fa-stop-circle"></i></a>');
                    } else if (status == "F251D067799D4EBEB2D5D1DA81E9FCEA" || status == "9F54A23E08A042CB95310828CF1E69F7") {
                        // stop
                        $(v).find('.btn-group').prepend('<a id="btnStartTaskLr" class="btn btn-sm btn-success"  title="Start"><span><i class="fas fa-play-circle "></i></span></a>');
                    }

                });
            }
        }
    });
    $('body').on('click',
        '#btnStopTaskLr',
        function() {
            var recordId = $(this).closest('tr').data('id');
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
            var localUrl = String.format('http://localhost:65474/api/data/StopTranscationList?recordId={0}&isClose={1}', recordId, "true"),
                realUrl = String.format('https://thywebapi.setcrm.com/api/data/StopTranscationList?recordId={0}&isClose={1}', recordId, "true");
            $.get(localUrl, function(r) {
                if (r.Status) {
                    window.location.reload();
                } else {
                    $('#modalStopTrLr .modal-body').html(r.Message);
                }
            });
        });
    $('body').on('click',
        '#btnPauseTaskLr',
        function() {
            var recordId = $(this).closest('tr').data('id');
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
            localUrl = String.format('http://localhost:65474/api/data/StopTranscationList?recordId={0}&isClose={1}', recordId, "false"),
                realUrl = String.format('https://thywebapi.setcrm.com/api/data/StopTranscationList?recordId={0}&isClose={1}', recordId, "false");
            $.get(localUrl, function(r) {
                if (r.Status) {
                    window.location.reload();
                } else {
                    $('#modalStartedTr .modal-body').html(r.Message);
                }
            });
        });

    $('body').on('click', '#btnStartTaskLr', function() {
        var recordId = $(this).closest('tr').data('id');
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
        var localUrl = String.format('http://localhost:65474/api/data/StartTranscationList?recordId={0}', recordId),
            realUrl = String.format('https://thywebapi.setcrm.com/api/data/StartTranscationList?recordId={0}', recordId);
        $.get(realUrl, function(r) {
            if (r.Status) {
                window.location.reload();
            } else {
                $('#modalStartedTr .modal-body').html(r.Message);
            }
        });
    });

});