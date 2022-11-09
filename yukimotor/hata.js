$(function() {
    var page = 0;
    if ($('label[for=682BDEFA7B3249EE98612AFE3D78E47E]').closest('div').data().value != '' &&
        $('label[for=682BDEFA7B3249EE98612AFE3D78E47E]').closest('div').data().value != null) {
        $('.well .pull-right:eq(0)').prepend('<a id="btnCariHesapEkstra" class="btn btn-sm btn-success" style="margin-right: 3px; background-color: #7a378b; border-color: #7a378b;">Ekstre Görüntüle</a>');
    }
    window.setModal.Create({
        id: 'modelHesapEkstre',
        html: {
            header: 'Cari Hesap Ekstre Görüntüle',
            body: 'Başlangıç Tarihi: <input id="baslangicTarihi" type="text" value="" tabindex="-1" isRequired="True" style="margin-right:13px;width:19%;">' +
                'Bitiş Tarihi: <input id="bitisTarihi" type="text" value="" tabindex="-1" isRequired="True" style="margin-right:13px;width:19%;">' +
                '<button id="btnGoruntule" class="btn btn-warning btn-sm">Görüntüle</button>' +
                '<button id="btnEkstreExcel" class="btn btn-warning btn-sm" style="margin-left:10px;background-color: #3fb618; border-color: #3fb618;">Excel Olarak İndir</button>' +
                '<button id="btnPrint" class="btn btn-warning btn-sm" style="margin-left:10px;background-color: #a100f2; border-color: #a100f2;">Yazdır</button>' +
                '<div id="Ekstre" style="width: 100%; margin-top: 2%;">',
            footer: '<button id="btnEkstreOnceki" class="btn btn-warning btn-sm">Önceki Sayfa</button>' +
                '<button id="btnEkstreSonraki" class="btn btn-warning btn-sm">Sonraki Sayfa</button>' +
                '<button id="btnEkstreClose" data-dismiss="modal" class="btn btn-success btn-sm">Kapat</button>'
        }
    });
    $('#btnPrint').hide();

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

    $('body').on('click', '#btnEkstreExcel', function() {
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
        window.open('https://krallogowebapi.setcrm.com/api/logo/ExcelEkstre?carikod=' + cariKod + '&baslangicTarihi=' + newBas + '&bitisTarihi=' + newBit);
    });

    $('body').on('click',
        '#btnPrint',
        function() {
            html2canvas(document.querySelector("#modelHesapEkstre .modal-body #Ekstre"), {
                allowTaint: true,
                useCORS: true,
                logging: true
            }).then(function(canvas) {
                var dataURL = canvas.toDataURL();
                var width = canvas.width;
                var printWindow = window.open("");
                $(printWindow.document.body)
                    .html("<img id='Image' src=" + dataURL + " style='" + width + "'></img>")
                    .ready(function() {
                        printWindow.focus();
                        printWindow.print();
                    });
            });
        });


    function work() {
        $('#Ekstre').html('');
        var ekstreListesi;
        var cekListesi;

        if (page > 0)
            $('#btnEkstreOnceki').css('display', '');
        else
            $('#btnEkstreOnceki').css('display', 'none');

        var cariKod = $('label[for=682BDEFA7B3249EE98612AFE3D78E47E]').parent().justText();
        var kurumAdi = $('label[for=77727EB51469447D8CB218D3DE7A6DDF]').parent().justText();
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
        var url = String.format('https://krallogowebapi.setcrm.com/api/logo/GetCariHesapEkstre?carikod={0}&baslangicTarihi={1}&bitisTarihi={2}&page={3}&kurumAdi={4}', cariKod, newBas, newBit, page, kurumAdi);
        //  var url = String.format('carikod={0}&baslangicTarihi={1}&bitisTarihi={2}&page={3}', cariKod, newBas, newBit, page);
        $.get(url, function(r) {
            if (r.Status) {
                if (r.ekstreListe.length > 0) {
                    page = r.page;
                    ekstreListesi = r.ekstreListe;
                    if (ekstreListesi.length > 49) {
                        $('#btnEkstreSonraki').css('display', '');
                    }
                    // $('#btnEkstreExcel').show();
                    $('#newTbl thead').html('');
                    $('#newTbl tbody').html('');
                    var newTbl = $('<table id="newTbl" style="width: 100%" />');
                    var thead = $('<thead />');
                    var newRow = $('<tr class="table table-bordered table-hover" style="background-color:lightblue"/>');
                    newRow.append($('<th style="text-align: left;" class="col-md-2"/>').text('İşlem Tarihi'));
                    newRow.append($('<th style="text-align: left;" class="col-md-2"/>').text('Belge No'));
                    newRow.append($('<th style="text-align: left;" class="col-md-2"/>').text('İşlem Türü'));
                    newRow.append($('<th style="text-align: left;" class="col-md-3"/>').text('Açıklama'));
                    newRow.append($('<th style="text-align: right;" class="col-md-2"/>').text('Borç'));
                    newRow.append($('<th style="text-align: right;" class="col-md-2"/>').text('Alacak'));
                    newRow.append($('<th style="text-align: right;" class="col-md-2"/>').text('Bakiye'));
                    thead.append(newRow);
                    newTbl.append(thead);
                    var tbody = $('<tbody />');
                    var borcFloat = 0.00;
                    var alacakFloat = 0.00;
                    //prev ekstre liste
                    if (r.resultModel.Bakiye !== 0) {
                        var newRow = $('<tr class="table table-bordered table-hover"/>');
                        newRow.append($('<td style="text-align: left;" class="col-md-2" />').text(""));
                        newRow.append($('<td style="text-align: left;" class="col-md-2" />').text(""));
                        newRow.append($('<td style="text-align: left;" class="col-md-2" />').text("Devreden"));
                        newRow.append($('<td style="text-align: left;" class="col-md-3" />').text(""));
                        newRow.append($('<td style="text-align: right;" class="col-md-2" />').text(r.resultModel.Borc));
                        newRow.append($('<td style="text-align: right;" class="col-md-2" />').text(r.resultModel.Alacak));
                        newRow.append($('<td style="text-align: right;" class="col-md-2" />').text(r.resultModel.Bakiye + r.resultModel.Durum));
                        tbody.append(newRow);
                        newTbl.append(tbody);
                        $('#Ekstre').append(newTbl);
                    }
                    $.each(r.ekstreListe, function(i, v) {
                        borcFloat += parseFloat(v.Borc.replace(',', ''));
                        alacakFloat += parseFloat(v.Alacak.replace(',', ''));
                        var newRow = $('<tr class="table table-bordered table-hover"/>').attr('data-invoiceRef', v.InvoiceRef);
                        newRow.append($('<td style="text-align: left;" class="col-md-2" />').text(v.IslemTarihi.split(' ')[0]));
                        newRow.append($('<td style="text-align: left;" class="col-md-2" />').text(v.BelgeNo));
                        newRow.append($('<td style="text-align: left;" class="col-md-2" />').text(v.IslemTuru));
                        newRow.append($('<td style="text-align: left;" class="col-md-3" />').text(v.Aciklama));
                        newRow.append($('<td style="text-align: right;" class="col-md-2" />').text(v.Borc));
                        newRow.append($('<td style="text-align: right;" class="col-md-2" />').text(v.Alacak));
                        newRow.append($('<td style="text-align: right;" class="col-md-2" />').text(v.Bakiye + v.Durum));
                        tbody.append(newRow);
                        newTbl.append(tbody);
                        $('#Ekstre').append(newTbl);
                    });
                    var newRowToplam = $('<tr class="table table-bordered table-hover"/>');
                    newRowToplam.append($('<td style="text-align: left;" class="col-md-2" />').text(''));
                    newRowToplam.append($('<td style="text-align: left;" class="col-md-2" />').text(''));
                    newRowToplam.append($('<td style="text-align: left;" class="col-md-2" />').text(''));
                    newRowToplam.append($('<td style="text-align: left;font-weight:bold !important;font-size:16px;" class="col-md-3" />').text('Toplam'));
                    newRowToplam.append($('<td style="text-align: right;font-weight:bold !important;font-size:16px;" class="col-md-2" />').text(r.totalResultModel.Borc));
                    newRowToplam.append($('<td style="text-align: right;font-weight:bold !important;font-size:16px;" class="col-md-2" />').text(r.totalResultModel.Alacak));
                    newRowToplam.append($('<td style="text-align: right;font-weight:bold !important;font-size:16px;" class="col-md-2" />').text(r.totalResultModel.Bakiye + r.totalResultModel.Durum));
                    tbody.append(newRowToplam);
                    newTbl.append(tbody);
                    $('#Ekstre').html('');
                    $('#Ekstre').append(newTbl);
                    $('#btnPrint').show();
                }

                if (r.cekListe.length > 0) {
                    page = r.page;
                    cekListesi = r.cekListe;
                    // $('#btnCekExcel').show();
                    $('#newCekTbl thead').html('');
                    $('#newCekTbl tbody').html('');
                    var newCekTbl = $('<br><br><table id="newCekTbl" style="width: 100% margin-top:20px;" />');
                    var thead = $('<thead />');
                    var newRow = $('<tr class="table table-bordered table-hover" style="background-color:lightblue"/>');

                    $('<tr>');
                    newRow.append($('<th style="text-align: left;" class="col-md-2"/>').text('Portfoy No'));
                    newRow.append($('<th style="text-align: left;" class="col-md-2"/>').text('Seri No'));
                    newRow.append($('<th style="text-align: left;" class="col-md-2"/>').text('Türü'));
                    newRow.append($('<th style="text-align: left;" class="col-md-3"/>').text('Özel Kod'));
                    newRow.append($('<th style="text-align: right;" class="col-md-2"/>').text('Vade'));
                    newRow.append($('<th style="text-align: right;" class="col-md-2"/>').text('Tutarı'));
                    newRow.append($('<th style="text-align: right;" class="col-md-2"/>').text('DövizTipi'));
                    newRow.append($('<th style="text-align: right;" class="col-md-2"/>').text('Tl Tutarı'));
                    newRow.append($('<th style="text-align: right;" class="col-md-2"/>').text('Son Durum'));
                    newRow.append($('<th style="text-align: right;" class="col-md-2"/>').text('Borçlu'));
                    newRow.append($('<th style="text-align: right;" class="col-md-2"/>').text('Ödeme Yeri'));
                    newRow.append($('<th style="text-align: right;" class="col-md-2"/>').text('Ciro Eden'));
                    newRow.append($('<th style="text-align: right;" class="col-md-2"/>').text('Banka Adı'));
                    thead.append(newRow);
                    newCekTbl.append(thead);
                    var tbody = $('<tbody />');
                    //prev ekstre liste
                    $.each(r.cekListe, function(i, v) {
                        var newRow = $('<tr class="table table-bordered table-hover"/>').attr('data-portfoyNo', v.PortfoyNo).attr('data-id', i);
                        newRow.append($('<td style="text-align: left;" class="col-md-2" />').text(v.PortfoyNo));
                        newRow.append($('<td style="text-align: left;" class="col-md-2" />').text(v.SeriNo));
                        newRow.append($('<td style="text-align: left;" class="col-md-2" />').text(v.Turu));
                        newRow.append($('<td style="text-align: left;" class="col-md-3" />').text(v.OzelKod));
                        newRow.append($('<td style="text-align: right;" class="col-md-2" />').text(v.Vade));
                        newRow.append($('<td style="text-align: right;" class="col-md-2" />').text(v.Tutari));
                        newRow.append($('<td style="text-align: right;" class="col-md-2" />').text(v.DovizTipi));
                        newRow.append($('<td style="text-align: right;" class="col-md-2" />').text(v.TlTutari));
                        newRow.append($('<td style="text-align: right;" class="col-md-2" />').text(v.SonDurumu));
                        newRow.append($('<td style="text-align: right;" class="col-md-2" />').text(v.Borclu));
                        newRow.append($('<td style="text-align: right;" class="col-md-2" />').text(v.OdemeYeri));
                        newRow.append($('<td style="text-align: right;" class="col-md-2" />').text(v.CiroEden));
                        newRow.append($('<td style="text-align: right;" class="col-md-2" />').text(v.BankaAdi));

                        tbody.append(newRow);
                        newCekTbl.append(tbody);
                        $('#Ekstre').append(newCekTbl);
                    });

                    var newRowToplam = $('<tr class="table table-bordered table-hover"/>');
                    newRowToplam.append($('<td style="text-align: left;" class="col-md-2" />').text(''));
                    newRowToplam.append($('<td style="text-align: left;" class="col-md-2" />').text(''));
                    newRowToplam.append($('<td style="text-align: left;" class="col-md-2" />').text(''));
                    newRowToplam.append($('<td style="text-align: left;" class="col-md-2" />').text(''));
                    newRowToplam.append($('<td style="text-align: right;font-weight:bold !important;font-size:16px;" class="col-md-2" />').text('Dip Toplam'));
                    newRowToplam.append($('<td style="text-align: left;" class="col-md-2" />').text(''));
                    newRowToplam.append($('<td style="text-align: left;" class="col-md-2" />').text(''));
                    newRowToplam.append($('<td style="text-align: left;" class="col-md-2" />').text(''));
                    newRowToplam.append($('<td style="text-align: left;" class="col-md-2" />').text(''));
                    newRowToplam.append($('<td style="text-align: left;" class="col-md-2" />').text(''));
                    newRowToplam.append($('<td style="text-align: right;font-weight:bold !important;font-size:16px;" class="col-md-2" />').text(r.totalResultModel.DipBorc));
                    newRowToplam.append($('<td style="text-align: right;font-weight:bold !important;font-size:16px;" class="col-md-2" />').text(r.totalResultModel.Alacak));
                    newRowToplam.append($('<td style="text-align: right;font-weight:bold !important;font-size:16px;" class="col-md-2" />').text(r.totalResultModel.DipBakiye + r.totalResultModel.DipDurum));
                    tbody.append(newRowToplam);
                    newCekTbl.append(tbody);

                    $('#Ekstre').append(newCekTbl);
                }


            } else {
                $('#Ekstre').html('');
                $('#Ekstre').append('Listelenecek kayıt bulunamadı.');
                $('#btnPrint').hide();
            }
        });
        if ($('#Ekstre tbody tr').length > 0) {
            $('#btnPrint').show();
        } else {
            $('#btnPrint').hide();
        }
    }

});