$(function() {
    var page = 0;
    if ($('label[for=682BDEFA7B3249EE98612AFE3D78E47E]').closest('div').data().value != '' &&
        $('label[for=682BDEFA7B3249EE98612AFE3D78E47E]').closest('div').data().value != null) {
        $('.well .pull-right:eq(0)').prepend('<a id="btnCariHesapEkstra" class="btn btn-sm btn-success" style="margin-right: 3px; background-color: #7a378b; border-color: #7a378b;">Ekstre Görüntüle</a>');
    }
    //  $('.well .pull-right:eq(0)').prepend('<a id="btnCariHesapEkstra" class="btn btn-sm btn-success" style="margin-right: 3px; background-color: #7a378b; border-color: #7a378b;">Ekstre Görüntüle</a>');
    window.setModal.Create({
        id: 'modelHesapEkstre',
        html: {
            header: 'Cari Hesap Ekstre Görüntüle',
            body: 'Başlangıç Tarihi: <input id="baslangicTarihi" type="text" value="" tabindex="-1" isRequired="True" style="margin-right:13px;width:19%;">' +
                'Bitiş Tarihi: <input id="bitisTarihi" type="text" value="" tabindex="-1" isRequired="True" style="margin-right:13px;width:19%;">' +
                '<button id="btnGoruntule" class="btn btn-warning btn-sm">Görüntüle</button>' +
                // '<button id="btnEkstreExcel" class="btn btn-warning btn-sm" style="margin-left:10px;background-color: #3fb618; border-color: #3fb618;">Excel Olarak İndir</button>' +
                '<div id="Ekstre" style="width: 100%; margin-top: 2%;">',
            footer: '<button id="btnEkstreOnceki" class="btn btn-warning btn-sm">Önceki Sayfa</button>' +
                '<button id="btnEkstreSonraki" class="btn btn-warning btn-sm">Sonraki Sayfa</button>' +
                '<button id="btnEkstreClose" data-dismiss="modal" class="btn btn-success btn-sm">Kapat</button>'
        }
    });

    $('body').on('click', '#btnCariHesapEkstra', function() {
        $('#modelHesapEkstre .modal-dialog').css('width', '80%');
        $('#Ekstre').html('');
        $('#baslangicTarihi').val('');
        $('#bitisTarihi').val('');
        //$('#btnEkstreExcel').hide();
        $('#modelHesapEkstre').modal('toggle');
        $('#btnEkstreSonraki').css('display', 'none');
        $('#btnEkstreOnceki').css('display', 'none');
        $('#baslangicTarihi,#bitisTarihi').datetimepicker({
            inline: false,
            closeOnDateSelect: true,
            timepicker: false,
            format: 'd.m.Y',
            mask: false,
            scrollMonth: false,
            scrollTime: false,
            scrollInput: false,
            dayOfWeekStart: 1
        });
    });
    $('body').on('click', '#btnGoruntule', function() {
        work();
    });
    $('body').on('click', '#btnEkstreSonraki', function() {
        page++;
        work();
    });
    $('body').on('click', '#btnEkstreOnceki', function() {
        page--;
        work();
    });


    function work() {
        $('#Ekstre').html('');
        var ekstreListesi;

        if (page > 0)
            $('#btnEkstreOnceki').css('display', '');
        else
            $('#btnEkstreOnceki').css('display', 'none');

        var cariKod = $('label[for=682BDEFA7B3249EE98612AFE3D78E47E]').parent().justText();
        var bas = $('#baslangicTarihi').val();
        var bit = $('#bitisTarihi').val();
        var newBas = '';
        var newBit = '';
        if (bas !== '') {
            var baslangicTarihi = bas.split('.');
            newBas = baslangicTarihi[2] + "." + baslangicTarihi[1] + "." + baslangicTarihi[0];
        }
        if (bit !== '') {
            var bitisTarihi = bit.split('.');
            newBit = bitisTarihi[2] + "." + bitisTarihi[1] + "." + bitisTarihi[0];
        }
        var url = String.format('https://krallogowebapi.setcrm.com/api/logo/GetCariHesapEkstre?carikod={0}&baslangicTarihi={1}&bitisTarihi={2}&page={3}', cariKod, newBas, newBit, page);
        //  var url = String.format('carikod={0}&baslangicTarihi={1}&bitisTarihi={2}&page={3}', cariKod, newBas, newBit, page);
        $.get(url, function(r) {
            if (r.Status && r.ekstreListe.length > 0) {
                page = r.page;
                ekstreListesi = r.ekstreListe;
                if (ekstreListesi.length > 49) {
                    $('#btnEkstreSonraki').css('display', '');
                }
                console.log(r.ekstreListe)
                    // $('#btnEkstreExcel').show();
                $('#newTbl thead').html('');
                $('#newTbl tbody').html('');
                var newTbl = $('<table id="newTbl" style="width: 100%" />');
                var thead = $('<thead />');
                var newRow = $('<tr class="table table-bordered table-hover" style="background-color:lightblue"/>');
                newRow.append($('<th style="text-align: left;" class="col-md-2"/>').text('İşlem Tarihi'));
                newRow.append($('<th style="text-align: left;" class="col-md-2"/>').text('Belge No'));
                newRow.append($('<th style="text-align: left;" class="col-md-2"/>').text('İşlem Türü'));
                newRow.append($('<th style="text-align: left;" class="col-md-4"/>').text('Açıklama'));
                newRow.append($('<th style="text-align: left;" class="col-md-2"/>').text('Borç'));
                newRow.append($('<th style="text-align: left;" class="col-md-2"/>').text('Alacak'));
                newRow.append($('<th style="text-align: left;" class="col-md-2"/>').text('Bakiye'));
                thead.append(newRow);
                newTbl.append(thead);
                var tbody = $('<tbody />');
                $.each(r.ekstreListe, function(i, v) {
                    var newRow = $('<tr class="table table-bordered table-hover"/>').attr('data-invoiceRef', v.InvoiceRef);
                    newRow.append($('<td style="text-align: left;" class="col-md-2" />').text(v.IslemTarihi.split(' ')[0]));
                    newRow.append($('<td style="text-align: left;" class="col-md-2" />').text(v.BelgeNo));
                    newRow.append($('<td style="text-align: left;" class="col-md-2" />').text(v.IslemTuru));
                    newRow.append($('<td style="text-align: left;" class="col-md-4" />').text(v.Aciklama));
                    newRow.append($('<td style="text-align: left;" class="col-md-2" />').text(v.Borc));
                    newRow.append($('<td style="text-align: left;" class="col-md-2" />').text(v.Alacak));
                    newRow.append($('<td style="text-align: left;" class="col-md-2" />').text(v.Bakiye));
                    tbody.append(newRow);
                    newTbl.append(tbody);
                    $('#Ekstre').append(newTbl);
                });
                //TOPLAM RİSK RAPORUNDAN ÇEKİLECEK
                //var urlBakiye = String.format('https://yukimotor.setcrm.com/api/logo/GetRiskRaporu?carikod={0}', cariKod);
                //var urlBakiye = String.format('RiskRaporu?carikod={0}', cariKod);
                // $.get(urlBakiye, function(r) {
                //     if (r.Status) {
                //         var newRowToplam = $('<tr class="table table-bordered table-hover"/>');
                //         newRowToplam.append($('<td style="text-align: left;" class="col-md-2" />').text(''));
                //         newRowToplam.append($('<td style="text-align: left;" class="col-md-2" />').text(''));
                //         newRowToplam.append($('<td style="text-align: left;" class="col-md-2" />').text(''));
                //         newRowToplam.append($('<td style="text-align: left;font-weight:bold !important;font-size:16px;" class="col-md-4" />').text('Toplam'));
                //         //  newRowToplam.append($('<td style="text-align: left;font-weight:bold !important;font-size:16px;" class="col-md-2" />').text(ekstreListesi.last().ToplamBorc === "0" ? "" : ekstreListesi.last().ToplamBorc));
                //         //newRowToplam.append($('<td style="text-align: left;font-weight:bold !important;font-size:16px;" class="col-md-2" />').text(ekstreListesi.last().ToplamAlacak === "0" ? "" : ekstreListesi.last().ToplamAlacak));
                //         newRowToplam.append($('<td style="text-align: left;font-weight:bold !important;font-size:16px;" class="col-md-2" />').text(''));
                //         newRowToplam.append($('<td style="text-align: left;font-weight:bold !important;font-size:16px;" class="col-md-2" />').text(''));
                //         newRowToplam.append($('<td style="text-align: left;font-weight:bold !important;font-size:16px;" class="col-md-2" />').text(r.model.last().CariHesapBakiyesi === "0" ? "" : r.model.last().CariHesapBakiyesi));
                //         //newRowToplam.append($('<td style="text-align: left;font-weight:bold !important;font-size:16px;" class="col-md-1" />').text(r.ekstreListe.last().ToplamBorc === "0" ? "" : addSeparatorsNF(r.ekstreListe.last().ToplamBorc.replace(',', '.'), '.', '.', ',')));
                //         //newRowToplam.append($('<td style="text-align: left;font-weight:bold !important;font-size:16px;" class="col-md-1" />').text(r.ekstreListe.last().ToplamAlacak === "0" ? "" : addSeparatorsNF(r.ekstreListe.last().ToplamAlacak, '.', '.', ',')));
                //         //newRowToplam.append($('<td style="text-align: left;font-weight:bold !important;font-size:16px;" class="col-md-1" />').text(r.ekstreListe.last().Bakiye === "0" ? "" : addSeparatorsNF(r.ekstreListe.last().Bakiye, '.', '.', ',')));
                //         tbody.append(newRowToplam);
                //         newTbl.append(tbody);
                //         $('#Ekstre').html('');
                //         $('#Ekstre').append(newTbl);
                //     }
                // });
            } else {
                $('#Ekstre').html('');
                $('#Ekstre').append('Listelenecek kayıt bulunamadı.');
            }
        });
    }

});