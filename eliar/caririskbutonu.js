$(function() {

    $('.btn-br-actions[data-publicid=8CFD17A05B4B4A2C94140F9A615EE4E2]').hide();
    $('.btn-br-actions[data-publicid=8CFD17A05B4B4A2C94140F9A615EE4E2]').closest('td').prepend('<a id="btnCariRiskRaporu" class="btn btn-sm btn-warning"  style="margin-right:10px;" >Cari Risk Durumu</a>');
    $('body').on('click', '#btnCariRiskRaporu', function() {
        $('#modalCariRiskRaporu').remove();
        window.setModal.Create({
            id: 'modalCariRiskRaporu',
            html: {
                header: 'Cari Risk Bilgileri',
                body: '<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>' +
                    '<div id="msg" style="margin:0 0 5px; width: 100%;"></div>' +
                    '<div id="DivCariRisk" style="width: 100%; margin-top: 2%;">',
                footer: '<button class="btn btn-danger btn-sm" data-dismiss="modal" onclick="window.location.reload()">Kapat</button>'
            },
            settings: {
                widthClass: 'modal-lg'
            }
        });
        $('.modal-header').addClass('text-center');
        $('#modalCariRiskRaporu').modal({
            backdrop: false
        });
        $('#txt').show();
        work();
    });

    function work() {
        $('#DivCariRisk').html('');
        $('#newTbl thead').html('');
        $('#newTbl tbody').html('');
        var newTbl = $('<table id="newTbl" style="width: 100%" />');
        var thead = $('<thead />');
        var newRow = $('<tr class="table table-bordered table-hover" style="background-color:lightblue"/>');
        newRow.append($('<th style="text-align: center;" class="col-md-2"/>').text('İşlem Tarihi'));
        newRow.append($('<th style="text-align: center;" class="col-md-2"/>').text('Belge No'));
        newRow.append($('<th style="text-align: center;" class="col-md-2"/>').text('İşlem Türü'));
        newRow.append($('<th style="text-align: center;" class="col-md-3"/>').text('Açıklama'));
        thead.append(newRow);
        newTbl.append(thead);
        var tbody = $('<tbody />');
        var newRow = $('<tr class="table table-bordered table-hover"/>');
        newRow.append($('<td style="text-align: center;" class="col-md-2" />').text(moment(new Date).format('DD.MM.YYYY')));
        newRow.append($('<td style="text-align: center;" class="col-md-2" />').text('123456789'));
        newRow.append($('<td style="text-align: center;" class="col-md-2" />').text('Cari Risk'));
        newRow.append($('<td style="text-align: center;" class="col-md-3" />').text('Deneme cari risk raporu'));
        tbody.append(newRow);
        newTbl.append(tbody);
        $('#DivCariRisk').append(newTbl);

        var newRow = $('<tr class="table table-bordered table-hover"/>');
        newRow.append($('<td style="text-align: center;" class="col-md-2" />').text(moment(new Date).format('DD.MM.YYYY')));
        newRow.append($('<td style="text-align: center;" class="col-md-2" />').text('123556789'));
        newRow.append($('<td style="text-align: center;" class="col-md-2" />').text('Cari Risk2'));
        newRow.append($('<td style="text-align: center;" class="col-md-3" />').text('Deneme cari risk raporu2'));
        tbody.append(newRow);
        newTbl.append(tbody);
        $('#DivCariRisk').append(newTbl);

        var newRow = $('<tr class="table table-bordered table-hover"/>');
        newRow.append($('<td style="text-align: center;" class="col-md-2" />').text(moment(new Date).format('DD.MM.YYYY')));
        newRow.append($('<td style="text-align: center;" class="col-md-2" />').text('812345789'));
        newRow.append($('<td style="text-align: center;" class="col-md-2" />').text('Cari Risk3'));
        newRow.append($('<td style="text-align: center;" class="col-md-3" />').text('Deneme cari risk raporu3'));
        tbody.append(newRow);
        newTbl.append(tbody);
        $('#DivCariRisk').append(newTbl);
        $('#txt').hide();
        // //var url = 
        // //  var url2 = 
        // $.get(url, function(r) {
        //     if (r.Status && r.liste.length > 0) {
        //         $('#newTbl thead').html('');
        //         $('#newTbl tbody').html('');
        //         var newTbl = $('<table id="newTbl" style="width: 100%" />');
        //         var thead = $('<thead />');
        //         var newRow = $('<tr class="table table-bordered table-hover" style="background-color:lightblue"/>');
        //         newRow.append($('<th style="text-align: left;" class="col-md-2"/>').text('İşlem Tarihi'));
        //         newRow.append($('<th style="text-align: left;" class="col-md-2"/>').text('Belge No'));
        //         newRow.append($('<th style="text-align: left;" class="col-md-2"/>').text('İşlem Türü'));
        //         newRow.append($('<th style="text-align: left;" class="col-md-3"/>').text('Açıklama'));
        //         thead.append(newRow);
        //         newTbl.append(thead);
        //         var tbody = $('<tbody />');

        //         $.each(r.ekstreListe, function(i, v) {
        //             borcFloat += parseFloat(v.Borc.replace(',', ''));
        //             alacakFloat += parseFloat(v.Alacak.replace(',', ''));
        //             var newRow = $('<tr class="table table-bordered table-hover"/>').attr('data-invoiceRef', v.InvoiceRef);
        //             newRow.append($('<td style="text-align: left;" class="col-md-2" />').text(v.IslemTarihi));
        //             newRow.append($('<td style="text-align: left;" class="col-md-2" />').text(v.BelgeNo));
        //             newRow.append($('<td style="text-align: left;" class="col-md-2" />').text(v.IslemTuru));
        //             newRow.append($('<td style="text-align: left;" class="col-md-3" />').text(v.Aciklama));
        //             newTbl.append(tbody);
        //             $('#Ekstre').append(newTbl);
        //         });
        //     } else {
        //         $('#DivCariRisk').html('');
        //         setUtil.alert({
        //             container: '#modalCariRiskRaporu .modal-body #msg',
        //             message: "Listelenecek kayıt bulunamadı.",
        //             alertClass: 'alert-danger',
        //             autoClose: false
        //         });
        //     }
        // });
    }
});