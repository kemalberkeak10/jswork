$(function() {
    var oldTechnicianId = $('label[for=229E6919177C49229ADC807F42F67E94]').parent().data('publicids');
    if (!String.isNullOrWhiteSpace(oldTechnicianId)) {
        $('label[for=229E6919177C49229ADC807F42F67E94]').parents('div:eq(0)').prepend('<a id="btnChangeTechnician" class="btn btn-xs btn-warning" style="margin-left:170px;margin-bottom:-36px;">Change Technician<i class="fas fa-arrow-circle-right" style="margin-left:5px;"></i></a>')
    }



    $('body').on('click', '#btnChangeTechnician', function() {
        oldTechnicianId = $('label[for=229E6919177C49229ADC807F42F67E94]').parent().data('publicids');
        $('#modalTeknisyenler').remove();
        window.setModal.Create({
            id: 'modalTeknisyenler',
            html: {
                header: 'Bilgi',
                body: '<div class="row">' +
                    '<div class="col-md-5"><h4><strong>Choose Technician: </strong></h4></div>' +
                    '<div class="col-md-7"><div class="form-control" id="teknisyenSec"></div></div>' +
                    '</div>',
                footer: '<a class="btn btn-sm btn-danger pull-right" data-dismiss="modal">Kapat</a><a class="btn btn-sm btn-info pull-right " id="btnAta" style="margin-right:3px;">Atama Yap</a> '
            }
        });
        $('#modalTeknisyenler').modal('toggle');
        prepareSelect2('#teknisyenSec', '/summary/organizationalunititems', {
            publicId: '229E6919177C49229ADC807F42F67E94',
            name: 'User',
            filterType: 'UserGroup',
            groupIds: "D8531E93FD3C4D67A91B98F2E61C0A3A",
            depth: 2,
            includeItSelf: false
        }, null, false);
    });


    $('body').on('click', '#btnAta', function() {
        $('#modalTeknisyenler').modal('toggle');
        var teknisyenId = $('#teknisyenSec').val();

        if (String.isNullOrWhiteSpace(teknisyenId)) {
            alert("Teknisyen seçmeden atama yapamazsınız.");
        } else {
            $('#modalLoading').remove();
            window.setModal.Create({
                id: 'modalLoading',
                html: {
                    header: '',
                    body: '<div id="msg" style="margin:0 0 5px; width: 100%;">Kullanıcı güncellemeleri yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>',
                    footer: '<button class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>'
                }
            });

            $('#modalLoading').modal('toggle');

            var recordId = $('#RecordPublicId').val();
            var localUrl = String.format('http://localhost:65474/api/data/ChangeTechnician?technicianId={0}&oldTechnicianId={1}&recordId={2}', teknisyenId, oldTechnicianId, recordId),
                realUrl = String.format('https://thywebapi.setcrm.com/api/data/ChangeTechnician?technicianId={0}&oldTechnicianId={1}&recordId={2}', teknisyenId, oldTechnicianId, recordId);

            $.get(realUrl, function(r) {
                if (r.Status) {
                    setUtil.alert({
                        container: '#modalLoading #msg',
                        message: r.Message,
                        alertClass: 'alert-success',
                        autoClose: false
                    });

                    setTimeout(() => {
                        $('#modalLoading').modal('toggle');
                        window.location.reload();
                    }, 1500);
                } else {
                    setUtil.alert({
                        container: '#modalLoading #msg',
                        message: r.Message,
                        alertClass: 'alert-danger',
                        autoClose: false
                    });
                }

            });
        }
    });
});