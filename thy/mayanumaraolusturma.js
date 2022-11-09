$(function() {
            var pnCode = "";
            var sayac = "";
            var locationNumber = "";
            var yerindeKalibrasyonSubCode = "T";
            var sayacDegisti = false;
            var labId = "";

            var calibrationNo = $("#741810DA2F36462493F1323365FD5453");
            calibrationNo.prop('readonly', true);
            $("#7ACBE286F4F847BB90A429AA4C04D7FF").on("change", function() {
                if (String.isNullOrWhiteSpace($(this).val())) {
                    pnCode = "";
                } else {
                    $('button[type=submit]').prop('disabled', true);
                    $.get("/set/tool/detail/" + $(this).val(), "",
                        function(sdata) {
                            $('button[type=submit]').prop('disabled', false);
                            var elem = $('<div/>').html(sdata);
                            pnCode = elem.find('label[for=0CFBDCA8CAE546FFA3CAC7FF48458439]').parent().data('value');
                            calibrationNo.val(String.format("{0}{1}-{2}{3}", pnCode, sayac, locationNumber, yerindeKalibrasyonSubCode));
                        }
                    );
                }
            });

            $("#DDA7E7400D2F4F0397AF7CE38BBEF024").on("change",
                function() {
                    if (String.isNullOrWhiteSpace($(this).val())) {
                        sayac = "";
                        labId = "";
                    } else {
                        $('button[type=submit]').prop('disabled', true);
                        labId = $(this).val();
                        var localUrl = "https://thywebapi.setcrm.com/api/data/GetLastLabSayac?labId=" + $(this).val();
                        $.get(localUrl, "",
                            function(r) {
                                $('button[type=submit]').prop('disabled', false);
                                if (r.Status) {
                                    sayac = r.Sayac;
                                    sayacDegisti = true;
                                } else {
                                    sayac = "";
                                }
                                calibrationNo.val(String.format("{0}{1}-{2}{3}", pnCode, sayac, locationNumber, yerindeKalibrasyonSubCode));
                            }
                        );
                    }
                });

            $("#89496D1C5A394F24BC1E47C36B7DC664").on("change", function() {
                if (String.isNullOrWhiteSpace($(this).val())) {
                    locationNumber = "";
                } else {
                    setTimeout(() => {
                        locationNumber = $("#9EFA9391FCFA4E7A84BFB6A912BE991F").val();
                    }, 1000);
                }
                setTimeout(() => {
                    calibrationNo.val(String.format("{0}{1}-{2}{3}", pnCode, sayac, locationNumber, yerindeKalibrasyonSubCode));
                }, 1000);
            });

            // $("#05EA2EE20BB84C1B97109F5CABAC8B0D").on("change",
            //     function () {
            //         if ($("#CHECKBOX-05EA2EE20BB84C1B97109F5CABAC8B0D").is(":checked")) {
            //             yerindeKalibrasyonSubCode = "H";
            //         } else {
            //             yerindeKalibrasyonSubCode = "T";
            //         }
            //         calibrationNo.val(String.format("{0}{1}-{2}{3}", pnCode, sayac, locationNumber, yerindeKalibrasyonSubCode));
            //     });

            $('body').on('change',
                    '#05EA2EE20BB84C1B97109F5CABAC8B0D, #E186FC7002A346F79B76C29D74167AD9, #BA874039AEF94EA89F5AEB41C1AC29CD',
                    function() {
                        var $this = $(this);

                        // $('#CHECKBOX-05EA2EE20BB84C1B97109F5CABAC8B0D, #CHECKBOX-E186FC7002A346F79B76C29D74167AD9, #CHECKBOX-BA874039AEF94EA89F5AEB41C1AC29CD').prop('checked', false);
                        // $("#CHECKBOX-" + $this.attr('id')).prop('checked', true);

                        if ($("#CHECKBOX-" + $this.attr('id')).is(":checked")) {
                            yerindeKalibrasyonSubCode = $this.closest('div').find('label').text().trim();