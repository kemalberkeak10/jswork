$(function() {

    $('#A957B9FB46494254A066EADF96BEFE70').closest("div").hide();
    $('#A957B9FB46494254A066EADF96BEFE70').closest("td").append('<a id="btn-motor" class="btn btn-sm btn-success"  style="margin:20px;" >Motor</a>');

    $('body').on('click', '#btn-motor', function() {

        $('#7E8DA217D7FC4DAFA5317675A5301952').val();

        if ($('#7E8DA217D7FC4DAFA5317675A5301952').val() === "") {
            // asansör kapasitesi
            alert("Lütfen Asansör Kapasitesi Alanını Doldurunuz.");
        } else if ($('#C6DE84105FE1456E81E75E416C0DB144').val() === "") {
            // asansör hızı
            alert("Lütfen Asansör Hızı Alanını Doldudurunuz.");
        } else if ($('#9FE614A618C245EEA7089CD5D0FC2EC4').val() === "") {
            // askı tipi
            alert("Lütfen Askı Tipi Alanını Doldudurunuz.");
        } else if ($('#46F0692AC93E4160ABF0FE231B8FA3A0').val() === "") {
            //woltaj
            alert("Lütfen Woltaj Alanını Doldudurunuz.");
        } else if ($('#234FAA6F6C324A8AA47B2403F23BA0F1').val() === "") {
            // motor dişli Tipi
            alert("Lütfen Motor Dişli Tipi Alanını Doldudurunuz.");
        } else if ($('#83D3185183E94BF6AB72CC630976C2C6').val() === "") {
            // Motor Markası
            alert("Lütfen Motor Markası Alanını Doldudurunuz.");
        } else if ($('#E64544AF89C34A22A1703AEE9AD81464').val() === "") {
            // Tahrik Kasnak Capı
            alert("Lütfen Tahrik Kasnak Çapı Alanını Doldudurunuz.");
        } else {
            $('#modalMotorChange').remove();
            window.setModal.Create({
                id: 'modalMotorChange',
                html: {
                    header: 'Motor information',
                    body: '<div id="msg" style="margin:0 0 5px;color:red;" style="display:none"></div>' +
                        '<div id="txt" style="margin:0 0 5px; width: 100%;">Please Wait..<br/> <img src="/Public/img/loading_bar.gif"></div>',
                    footer: '<button data-dismiss="modal" id="modal-close" class="btn btn-danger btn-sm">Kapat</button>'
                },
                settings: {
                    widthClass: '',
                }
            });

            $('#modalMotorChange').modal('toggle');

            var url = String.format("https://templateprocess.setcrm.com/api/ProfessorElevator/GetMotor2?key={0}&userId={1}", $("#3B4512B4A8AF4D6A8E8C2F2A3DF9B6B1").val(), userData.id);
            var localUrl = String.format("http://localhost:52129/api/ProfessorElevator/GetMotor?key={0}&userId={1}", $("#3B4512B4A8AF4D6A8E8C2F2A3DF9B6B1").val(), userData.id);
            // var localUrl = "http://localhost:52129/api/ProfessorElevator/SatinAlmaServisOlustur?recordId=" + $('#RecordPublicId').val() + "&bagliOlduguTeklif=" + bagliOlduguKesifId + "&userId=" + userData.id;

            $.get(url, function(result) {
                if (result.Status) {
                    var r = result.data;
                    $("#34D37CA2DCA444A9A4E3F9E35F3A8C97").select2('data', {
                        id: r.MotorMId,
                        text: r.MotorM
                    }).trigger('change');
                    $("#6A53F211508F45FB9916EFA73B97BE31").val(r.Guc);
                    $("#6B331A7564E64C1C9432C3991E711333").val(r.Nomial);
                    $("#9A9CEA9927B74784906AAF57B03895AF").val(r.Inverter);
                    $("#3FBE9E5AA1DF48DE92363AB733F384BE").val(r.HalatAdedi);
                    $("#81950634C39148408119638D25D6AECF").select2('data', {
                        id: r.HalatCapiId,
                        text: r.HalatCapi
                    }).trigger('change');
                    $("#D3BBDF37F36341DCBEC2B5A5C50D6046 ").val(r.StatikYuk);
                    $("#6F2021A85C454250B8ACE0D530151B0D").val(r.FrenVotaji);
                    $('#modalMotorChange').modal('toggle');
                } else {
                    setUtil.alert({
                        container: '#modalMotorChange .modal-body #msg',
                        message: result.Message,
                        alertClass: 'alert-danger',
                        autoClose: true
                    });
                }
            });
        }
    });
});