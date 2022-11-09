$(function() {
    window.setModal.Create({
        id: 'modalRiskRaporu',
        html: {
            // header: `<div class="row"><div class='col-md-8'><h4 class='center'> Risk Raporu Görüntüle</h4></div><div><button id="btnRiskRaporuExcel" class="btn btn-warning btn-sm pull-right" style="margin-left:10px;background-color: #3fb618; border-color: #3fb618;"><i class="fas fa-fw fa-2xl fa-file-excel" style="font-size:24px"></i>Excel Olarak İndir</button></div> </div>`,
            header: `<div class="row"><div class='col-md-11 text-center'><h4 class='center'> Risk Raporu Görüntüle</h4></div><div class='col-md-1'><button id="btnRiskRaporuExcel" class="btn btn-warning btn-sm pull-right" style="margin-left:10px;background-color: #3fb618; border-color: #3fb618;"><i class="fas fa-fw fa-2xl fa-file-excel" style="font-size:24px"></i>Excel Olarak İndir</button></div> </div>`,
            body: '<div id="risk" style="width: 100%;">' +
                '<div id="riskDetail" style="width: 50%;">',
            footer: '<button id="btnRiskClose" data-dismiss="modal" class="btn btn-success btn-sm">Kapat</button>'
        }
    });

    var cariKod = $('label[for=5FC1C22310924945B865217AB3EAFC00]').parent().data('value');
    if (!String.isNullOrWhiteSpace(cariKod)) {
        $('.well .pull-right:eq(0)').prepend('<a id="btnRiskRaporu" class="btn btn-sm btn-success" style="margin-right: 3px; background-color: #db3232; border-color: #db3232;">Risk Raporu Görüntüle</a>');
    }
    $('body').on('click', '#btnRiskRaporu', function() {
        $('#risk').html('');
        $('#modalRiskRaporu').modal('toggle');
        $('#modalRiskRaporu .modal-dialog').css('width', '100%');
        var localUrl = String.format("http://localhost:54779/api/logo/GetRiskRaporu?carikod={0}", cariKod),
            realUrl = String.format("https://krallogowebapi.setcrm.com/api/logo/GetRiskRaporu?carikod={0}", cariKod);

        $.get(realUrl, function(r) {
            if (r.Status && r.RiskRaporuListe.length > 0) {
                $('#newRiskTbl thead').html('');
                $('#newRiskTbl tbody').html('');
                var newRiskTbl = $('<table id="newTbl" style="width: 100%" />');
                var thead = $('<thead />');
                var newRow = $('<tr class="table table-bordered table-hover" style="background-color:lightblue"/>');
                // newRow.append($('<th style="text-align: left;" class="col-md-1"/>').text('Cari Kodu'));
                // newRow.append($('<th style="text-align: left;" class="col-md-1"/>').text('Cari Adı'));
                newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('Doviz Tipi'));
                newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('Cari Bakiye'));
                newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('Döviz Cari Bakiye'));
                newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('Yıllık Ciro'));
                newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('Protestolu Senet'));
                newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('Karşılıksız Çek'));
                newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('Ödenmemiş Çek'));
                newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('Ödenmemiş Senet'));
                newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('İrsaliye Risk'));
                newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('Sipariş Risk'));
                newRow.append($('<th style="text-align: center;" class="col-md-1"/>').text('Risk Toplamı'));
                thead.append(newRow);
                newRiskTbl.append(thead);
                var tbody = $('<tbody />');
                $.each(r.RiskRaporuListe, function(i, v) {
                    var newRow = $('<tr class="table table-bordered table-hover"/>');
                    newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(v.DOVIZTIPI));
                    newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(v.CARIBAKIYE));
                    newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(v.DOVIZCARIBAKIYE));
                    newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(v.YILLIKCIRO));
                    newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(v.PROTESTOLU_SENET));
                    newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(v.KARSILIKSIZ_CEK));
                    newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(v.ODENMEMIS_CEK));
                    newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(v.ODENMEMIS_SENET));
                    newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(v.IRSALIYE_RISK));
                    newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(v.SIPARIS_RISK));
                    newRow.append($('<td style="text-align: center;" class="col-md-1" />').text(v.RISKTOPLAMI));
                    tbody.append(newRow);
                    newRiskTbl.append(tbody);
                });
                $('#risk').html('');
                $('#risk').append(newRiskTbl);
            } else {
                $('#risk').html('');
                $('#risk').append('Görüntülenecek kayıt bulunamadı.');
            }
        });

    });

    $('body').on('click', '#btnRiskRaporuExcel', function() {
        window.open('https://krallogowebapi.setcrm.com/api/logo/RiskRaporuExcel?carikod=' + cariKod);
    });

    function addSeparatorsNF(nStr, inD, outD, sep) {
        nStr += '';
        var dpos = nStr.indexOf(inD);
        var nStrEnd = '';
        if (dpos != -1) {
            nStrEnd = outD + nStr.substring(dpos + 1, nStr.length);
            nStr = nStr.substring(0, dpos);
        }
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(nStr)) {
            nStr = nStr.replace(rgx, '$1' + sep + '$2');
        }
        return nStr + nStrEnd;
    }
});