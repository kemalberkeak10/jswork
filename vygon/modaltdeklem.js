$.get(urlFirmaBilgileri,
        function(r) {
            if (r.Status) {
                if (r.ekstreList.length > 0) {
                    $.each(r.ekstreList, function(i, v) {
                        var newRow = $('<tr/>', {
                            'data-rowid': i
                        });
                        toplamBorc = parseFloat(toplamBorc) + parseFloat(calcSeparatorRemove(v.VadesiGelenBorc));
                        toplamAlacak = parseFloat(toplamAlacak) + parseFloat(calcSeparatorRemove(v.VadesiGelenAlacak));
                        //console.log(v.WhsName);
                        newRow.append('<td><input id="' + String.format('VadeTarihi_{0}', i) + '" type="text" style="height:40px;" class="form-control vade-tarihi" disabled value="' + v.VadeTarihi + '"></td>');
                        newRow.append('<td><input id="' + String.format('VadesiGelenBorc_{0}', i) + '" type="text" style="height:40px;" class="form-control vadesigelen-borc" disabled value="' + v.VadesiGelenBorc + '"></td>');
                        newRow.append('<td><input id="' + String.format('VadesiGelenAlacak_{0}', i) + '" type="text" autocomplete="off" style="height:40px;" class="form-control vadesigelen-alacak" disabled value="' + v.VadesiGelenAlacak + '"></td>');
                        $('#bakiyeTbl tbody').append(newRow);
                    });