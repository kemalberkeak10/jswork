$(function() {
    $('body').on('change', '#7E8DA217D7FC4DAFA5317675A5301952', function() {
        getFrenModel();
    });
    $('body').on('change', '#C6DE84105FE1456E81E75E416C0DB144', function() {
        getFrenModel();
    });
    $('body').on('change', '#822F65911E9C4FE9BFE3201E61FF8DF6', function() {
        getFrenModel();
    });
    $('body').on('change', '#848915269CBD48C7BA55CC752767861A', function() {
        getFrenModel();
    });
    $('body').on('change', '#C23563FCEAF14B6F9B6111DD951354D3', function() {
        getFrenModel();
    });

    function getFrenModel() {
        if ($('#7E8DA217D7FC4DAFA5317675A5301952').val() === "") {
            //            alert("Lütfen Asansör Kapasitesi Alanını Doldurunuz.");
        } else if ($('#C6DE84105FE1456E81E75E416C0DB144').val() === "") {
            //            alert("Lütfen Asansör Hızı Alanını Doldudurunuz.");
        } else if ($('#822F65911E9C4FE9BFE3201E61FF8DF6').val() === "") {
            //            alert("Lütfen Marka Alanını Doldudurunuz.");
        } else if ($('#848915269CBD48C7BA55CC752767861A').val() === "") {
            //            alert("Lütfen Fren Yönü Alanını Doldurunuz.");
        } else if ($('#C23563FCEAF14B6F9B6111DD951354D3').val() === "") {
            //            alert("Lütfen Tedarikçi Alanını Doldudurunuz.");
        } else {
            var url = String.format("https://templateprocess.setcrm.com/api/ProfessorElevator/GetFrenModel?key={0}", $("#603C59C89B894F829CA8106254EB31D7").val());
            var localUrl = String.format("http://localhost:52129/api/ProfessorElevator/GetFrenModel?key={0}", $("#603C59C89B894F829CA8106254EB31D7").val());
            $.get(url, function(r) {
                if (r.Status) {
                    if (!String.isNullOrWhiteSpace(r.FrenId)) {
                        $("#F3E02ECEF34E47BB8A10B9DE34F07F97").select2('data', {
                            id: r.FrenId,
                            text: r.FrenText
                        }).trigger('change');
                        notify("success", "Fren Modeli " + r.FrenText + " olarak değiştirildi.");
                    }
                }
            });


        }
    }

    function notify(type, message) {
        $.notify({
            icon: type === "success" ? 'fas fa-check-double' : 'fas fa-times-circle',
            message: message
        }, {
            z_index: '9999999',
            type: type,
            placement: {
                from: "top",
                align: "right"
            },
            offset: 50,
            animate: {
                enter: 'animated flipInY',
                exit: 'animated flipOutX'
            },
        });
    }
});