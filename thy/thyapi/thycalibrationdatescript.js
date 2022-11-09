$(function() {
    var calibrationOldDate = $('#4B953A07DF7548E49D8F216950073BDC').val();
    var instrument = $('#094DC9B55B8C42938AB536168368EA23').val();


    if (!String.isNullOrWhiteSpace(instrument) && !String.isNullOrWhiteSpace(calibrationOldDate)) {
        ChangeCalibrationDueDate();
    }

    $('body').on('change', '#094DC9B55B8C42938AB536168368EA23', function() {
        calibrationOldDate = $('#4B953A07DF7548E49D8F216950073BDC').val();
        instrument = $('#094DC9B55B8C42938AB536168368EA23').val();
        if (!String.isNullOrWhiteSpace(instrument) && !String.isNullOrWhiteSpace(calibrationOldDate)) {
            ChangeCalibrationDueDate(instrument, calibrationOldDate);
        }
    });

    $('body').on('change',
        '#4B953A07DF7548E49D8F216950073BDC',
        function() {
            var oldDate = $(this).val(),
                controllingDate = $("#10B77C83A12E4D8C82DC8BDDB1806A54").val();

            if (String.isNullOrWhiteSpace(oldDate)) return;

            var momentA = moment(oldDate, "DD.MM.YYYY");
            var momentB = moment(controllingDate, "DD.MM.YYYY");

            if (moment(momentA).isAfter(moment(momentB))) {
                alert("Date of Calibration tarihi Calibration Due Date tarihinden büyük olamaz.");
                $(this).val('');
            } else {
                calibrationOldDate = $('#4B953A07DF7548E49D8F216950073BDC').val();
                instrument = $('#094DC9B55B8C42938AB536168368EA23').val();
                if (!String.isNullOrWhiteSpace(instrument) && !String.isNullOrWhiteSpace(calibrationOldDate)) {
                    ChangeCalibrationDueDate(instrument, calibrationOldDate);
                }
            }
        });


    function ChangeCalibrationDueDate(instrument, calibrationOldDate) {
        $.get('/set/device/detail/' + instrument,
            function(element) {
                var elem = $('<div />').html(element);
                var day = elem.find('label[for=DA35AC4C587744E380A79D28E329C1A5]').parent().data('value');
                var x = moment(calibrationOldDate, 'DD.MM.YYYY').format();
                var y = moment(x).add(day, "days")._d;
                y = moment(x).add(1, "years");
                $('#10B77C83A12E4D8C82DC8BDDB1806A54').val(moment(y).format("DD.MM.YYYY"));
            });
        setTimeout(() => {
            $(function() {
                var tarih = $('#10B77C83A12E4D8C82DC8BDDB1806A54').val();
                if (tarih !== "") {
                    var tList = tarih.split('.');
                    // var x = Date.parse(new Date(parseInt(tList[2]), (parseInt(tList[1]) - 1), parseInt(tList[0])))
                    var x = moment(tarih, "DD.MM.YYYY")._d;
                    $('#10B77C83A12E4D8C82DC8BDDB1806A54').datetimepicker({
                        maxDate: x,
                    });

                }
            });
        }, 1500);
    }
});