$(function() {
    window.setModal.Create({
        id: 'modalRiskRaporu',
        html: {
            header: 'Risk Raporu Görüntüle',
            body: '<div id="risk" style="width: 100%;">',
            footer: '<button id="btnRiskClose" data-dismiss="modal" class="btn btn-success btn-sm">Kapat</button>'
        }
    });
    $('.well .pull-right:eq(0)').prepend('<a id="btnRiskRaporu" class="btn btn-sm btn-success" style="margin-right: 3px; background-color: #e39595; border-color: #e39595;">Risk Raporu Görüntüle</a>');
    $('body').on('click', '#btnRiskRaporu', function() {
        $('#risk').html('');
        $('#modalRiskRaporu').modal('toggle');
        $('#modalRiskRaporu .modal-dialog').css('width', '100%');
        var cariKod = $('label[for=A9D3312D1B9E4AB4AB0B39C4D27B1B16]').parent().justText();
        var url = String.format('https://yukimotor.setcrm.com/api/logo/GetRiskRaporu?carikod={0}', cariKod);
        $.get(url, function(r) {
            if (r.Status && r.count != 0) {
                $('#newRiskTbl thead').html('');
                $('#newRiskTbl tbody').html('');
                var newRiskTbl = $('<table id="newTbl" style="width: 100%" />');
                var thead = $('<thead />');
                var newRow = $('<tr class="table table-bordered table-hover" style="background-color:lightblue"/>');
                newRow.append($('<th style="text-align: left;" class="col-md-1"/>').text('Cari Kodu'));
                newRow.append($('<th style="text-align: left;" class="col-md-1"/>').text('Cari Adı'));
                newRow.append($('<th style="text-align: left;" class="col-md-1"/>').text('Satış Elemanı'));
                newRow.append($('<th style="text-align: left;" class="col-md-1"/>').text('Özel Kod'));
                newRow.append($('<th style="text-align: left;" class="col-md-1"/>').text('Şehir'));
                newRow.append($('<th style="text-align: left;" class="col-md-1"/>').text('İlçe'));
                newRow.append($('<th style="text-align: left;" class="col-md-1"/>').text('Çalışma Şekli'));
                newRow.append($('<th style="text-align: left;" class="col-md-1"/>').text('Dbs Durumu'));
                newRow.append($('<th style="text-align: left;" class="col-md-1"/>').text('Dbs Limiti'));
                newRow.append($('<th style="text-align: left;" class="col-md-1"/>').text('Vade'));
                newRow.append($('<th style="text-align: left;" class="col-md-1"/>').text('C/H Bakiyesi'));
                newRow.append($('<th style="text-align: left;" class="col-md-1"/>').text('Çek/Senet Riski'));
                newRow.append($('<th style="text-align: left;" class="col-md-1"/>').text('Risk Toplamı'));
                newRow.append($('<th style="text-align: left;" class="col-md-1"/>').text('Satış Cirosu 2019'));
                newRow.append($('<th style="text-align: left;" class="col-md-1"/>').text('Satış Cirosu 2020'));
                newRow.append($('<th style="text-align: left;" class="col-md-1"/>').text('Satış Cirosu 2021'));
                newRow.append($('<th style="text-align: left;" class="col-md-1"/>').text('Açık Hesap Limiti'));
                newRow.append($('<th style="text-align: left;" class="col-md-1"/>').text('Müşteri Çek/Senet Limiti'));
                newRow.append($('<th style="text-align: left;" class="col-md-1"/>').text('Teminat'));
                thead.append(newRow);
                newRiskTbl.append(thead);
                var tbody = $('<tbody />');
                $.each(r.model, function(i, v) {
                    var newRow = $('<tr class="table table-bordered table-hover"/>');
                    newRow.append($('<td style="text-align: left;" class="col-md-1" />').text(v.CariKodu));
                    newRow.append($('<td style="text-align: left;" class="col-md-1" />').text(v.CariAdi));
                    newRow.append($('<td style="text-align: left;" class="col-md-1" />').text(v.SatisElemani));
                    newRow.append($('<td style="text-align: left;" class="col-md-1" />').text(v.OzelKod));
                    newRow.append($('<td style="text-align: left;" class="col-md-1" />').text(v.Sehir));
                    newRow.append($('<td style="text-align: left;" class="col-md-1" />').text(v.Ilce));
                    newRow.append($('<td style="text-align: left;" class="col-md-1" />').text(v.CalismaSekli));
                    newRow.append($('<td style="text-align: left;" class="col-md-1" />').text(v.DbsDurumu));
                    newRow.append($('<td style="text-align: left;" class="col-md-1" />').text(addSeparatorsNF(v.DbsLimiti, '.', '.', ',')));
                    newRow.append($('<td style="text-align: left;" class="col-md-1" />').text(addSeparatorsNF(v.Vade, '.', '.', ',')));
                    newRow.append($('<td style="text-align: left;" class="col-md-1" />').text(addSeparatorsNF(v.CariHesapBakiyesi, '.', '.', '.', '.', '.').replace(',', '.')));
                    newRow.append($('<td style="text-align: left;" class="col-md-1" />').text(addSeparatorsNF(v.CekSenetRiski, '.', '.', ',')));
                    newRow.append($('<td style="text-align: left;" class="col-md-1" />').text(addSeparatorsNF(v.RiskToplami, '.', '.', '.', '.', '.').replace(',', '.')));
                    newRow.append($('<td style="text-align: left;" class="col-md-1" />').text(addSeparatorsNF(v.SatisCirosu2019, '.', '.', ',')));
                    newRow.append($('<td style="text-align: left;" class="col-md-1" />').text(addSeparatorsNF(v.SatisCirosu2020, '.', '.', ',')));
                    newRow.append($('<td style="text-align: left;" class="col-md-1" />').text(addSeparatorsNF(v.SatisCirosu, '.', ',', '.')));
                    newRow.append($('<td style="text-align: left;" class="col-md-1" />').text(addSeparatorsNF(v.AcikHesapLimiti, '.', ',', '.').replace(',', '.')));
                    newRow.append($('<td style="text-align: left;" class="col-md-1" />').text(addSeparatorsNF(v.MusteriCekSenetLimiti, '.', '.', ',').replace(',', '.')));
                    newRow.append($('<td style="text-align: left;" class="col-md-1" />').text(addSeparatorsNF(v.Teminat, '.', '.', ',')));
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