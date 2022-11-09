$(function() {
    var checkedList = [];
    var newRowIndex = 0;
    $('.btn-br-actions[data-publicid=4963A57484D94CB7A5CADF82D1ACA97A]').hide();
    $('.btn-br-actions[data-publicid=4963A57484D94CB7A5CADF82D1ACA97A]').closest('td').prepend('<a id="btnTeklifOlustur" class="btn btn-sm btn-warning"  style="margin-right:10px;" >Teklif Oluştur</a>');
    $('body').on('click', '#btnTeklifOlustur', function() {
        $('#modalTeklifOlustur').remove();
        window.setModal.Create({
            id: 'modalTeklifOlustur',
            html: {
                header: 'Teklif Oluştur',
                body: '<div id="modalOnayaGonderMessage1" style="margin:0 40px 5px; width: 80%;font-size:15px;"> </div>' +
                    '<div id="modalOnayaGonderLoadingBar1" style="margin:0 0 5px; width: 100%;display:none;">İşlem yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>' +
                    '<div id="divTeklifLr" style="width: 100%; margin-top: 2%;"></div>' +
                    '<div id="subTeklif" style="width: 100%; margin-top: 2%;"></div>',
                footer: '<button id="btnKaydet1" type="button" class="btn btn-sm btn-success" >Kaydet</button>' + '<button type="button" class="btn btn-sm btn-default" data-dismiss="modal">İptal Et</button>'
            },
        });
        $('#modalTeklifOlustur .modal-dialog').css('width', '50%');
        $('#modalOnayaGonderLoadingBar1').hide();
        $('#modalTeklifOlustur').modal('toggle');
        GetTeklifKalemleri();
        SilinecekTeklifKalemleri();

    })

    function SilinecekTeklifKalemleri() {
        $('#subTeklif').html('');
        var subNewTbl = $('<table id="subNewTbl" style="width: 100%" />');
        $('#subNewTbl thead').html('');
        $('#subNewTbl tbody').html('');

        var subThead = $('<thead />');
        var subNewRow = $('<tr class="table table-bordered table-hover" style="background-color:lightblue"/>');
        subNewRow.append($('<th style="text-align: center;" class="col-md-2"/>').text('Teklif No'));
        subNewRow.append($('<th style="text-align: center;" class="col-md-2"/>').text('Teklif Durumu'));
        subNewRow.append($('<th style="text-align: center;" class="col-md-2"/>').text('Vade(Ay)'));
        subNewRow.append($('<th style="text-align: center;" class="col-md-3"/>').text('İndirim(%)'));
        subNewRow.append($('<th style="text-align: center;" class="col-md-3"/>').text('Son Durumu'));
        subNewRow.append($('<th style="text-align: center;" class="col-md-3"/>').text(' '));
        subThead.append(subNewRow);
        subNewTbl.append(subThead);
        var subTbody = $('<tbody />');
        // var subNewRow = $('<tr class="table table-bordered table-hover"/>');
        // subNewRow.append($('<td style="text-align: center;" class="col-md-2" />').text(moment(new Date).format('DD.MM.YYYY')));
        // subNewRow.append($('<td style="text-align: center;" class="col-md-2" />').text('123456789'));
        // subNewRow.append($('<td style="text-align: center;" class="col-md-2" />').text('Cari Risk'));
        // subNewRow.append($('<td style="text-align: center;" class="col-md-3" />').text('Deneme cari risk raporu'));
        // subNewRow.append($('<td style="text-align: center;" class="col-md-3" />').text('Deneme cari risk raporu'));
        // subNewRow.append($('<td ><button class="btn btn-sm btn-success" style="height:40px;" id="EkleButonu1" ><i class="fa fa-plus"></i></div></td>'))
        // subTbody.append(subNewRow);
        subNewTbl.append(subTbody);
        $('#subTeklif').append(subNewTbl);
    }

    function GetTeklifKalemleri() {
        $('#divTeklifLr').html('');

        $('#newTbl thead').html('');
        $('#newTbl tbody').html('');

        var newTbl = $('<table id="newTbl" style="width: 100%" />');
        var thead = $('<thead />');
        var newRow = $('<tr class="table table-bordered table-hover" style="background-color:lightblue"/>');
        newRow.append($('<th style="text-align: center;" class="col-md-2"/>').text('Teklif No'));
        newRow.append($('<th style="text-align: center;" class="col-md-2"/>').text('Teklif Durumu'));
        newRow.append($('<th style="text-align: center;" class="col-md-2"/>').text('Vade(Ay)'));
        newRow.append($('<th style="text-align: center;" class="col-md-3"/>').text('İndirim(%)'));
        newRow.append($('<th style="text-align: center;" class="col-md-3"/>').text('Son Durumu'));
        newRow.append($('<th style="text-align: center;" class="col-md-3"/>').text(' '));
        thead.append(newRow);
        newTbl.append(thead);

        var tbody = $('<tbody />');

        var newRow = $('<tr class="table table-bordered table-hover"/>');
        newRow.append($('<td style="text-align: center;" class="col-md-2" />').text(moment(new Date).format('DD.MM.YYYY')));
        newRow.append($('<td style="text-align: center;" class="col-md-2" />').text('123456789'));
        newRow.append($('<td style="text-align: center;" class="col-md-2" />').text('Cari Risk'));
        newRow.append($('<td style="text-align: center;" class="col-md-3" />').text('Deneme cari risk raporu'));
        newRow.append($('<td style="text-align: center;" class="col-md-3" />').text('Deneme cari risk raporu'));
        newRow.append($('<td ><button class="btn btn-sm btn-success row-ekle" style="height:40px;" ><i class="fa fa-plus"></i><button class="btn btn-sm btn-danger row-sil" style="height:40px;display: none;" ><i class="fa fa-minus"></i></div></td>'));
        tbody.append(newRow);
        newTbl.append(tbody);
        var newRow = $('<tr class="table table-bordered table-hover"/>');
        newRow.append($('<td style="text-align: center;" class="col-md-2" />').text(moment(new Date).format('DD.MM.YYYY')));
        newRow.append($('<td style="text-align: center;" class="col-md-2" />').text('123456789'));
        newRow.append($('<td style="text-align: center;" class="col-md-2" />').text('Cari Risk'));
        newRow.append($('<td style="text-align: center;" class="col-md-3" />').text('Deneme cari risk raporu'));
        newRow.append($('<td style="text-align: center;" class="col-md-3" />').text('Deneme cari risk raporu'));
        newRow.append($('<td ><button class="btn btn-sm btn-success row-ekle" style="height:40px;" ><i class="fa fa-plus"></i><button class="btn btn-sm btn-danger row-sil" style="height:40px;display: none;" ><i class="fa fa-minus"></i></div></td>'));
        tbody.append(newRow);
        newTbl.append(tbody);
        var newRow = $('<tr class="table table-bordered table-hover"/>');
        newRow.append($('<td style="text-align: center;" class="col-md-2" />').text(moment(new Date).format('DD.MM.YYYY')));
        newRow.append($('<td style="text-align: center;" class="col-md-2" />').text('123456789'));
        newRow.append($('<td style="text-align: center;" class="col-md-2" />').text('Cari Risk'));
        newRow.append($('<td style="text-align: center;" class="col-md-3" />').text('Deneme cari risk raporu'));
        newRow.append($('<td style="text-align: center;" class="col-md-3" />').text('Deneme cari risk raporu'));
        newRow.append($('<td ><button class="btn btn-sm btn-success row-ekle" style="height:40px;" ><i class="fa fa-plus"></i><button class="btn btn-sm btn-danger row-sil" style="height:40px;display: none;" ><i class="fa fa-minus"></i></div></td>'));
        tbody.append(newRow);
        newTbl.append(tbody);
        var newRow = $('<tr class="table table-bordered table-hover"/>');
        newRow.append($('<td style="text-align: center;" class="col-md-2" />').text(moment(new Date).format('DD.MM.YYYY')));
        newRow.append($('<td style="text-align: center;" class="col-md-2" />').text('123456789'));
        newRow.append($('<td style="text-align: center;" class="col-md-2" />').text('Cari Risk'));
        newRow.append($('<td style="text-align: center;" class="col-md-3" />').text('Deneme cari risk raporu'));
        newRow.append($('<td style="text-align: center;" class="col-md-3" />').text('Deneme cari risk raporu'));
        newRow.append($('<td ><button class="btn btn-sm btn-success row-ekle" style="height:40px;" ><i class="fa fa-plus"></i><button class="btn btn-sm btn-danger row-sil" style="height:40px;display: none;" ><i class="fa fa-minus"></i></div></td>'));
        tbody.append(newRow);
        newTbl.append(tbody);
        $('#divTeklifLr').append(newTbl);
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

    $('body').on('click', '.row-ekle', function() {
        var addedRow = $(this).closest('tr')
        $(addedRow).find('.row-ekle').hide();
        $(addedRow).find('.row-sil').show();
        $('#subNewTbl tbody').append(addedRow);
    })
    $('body').on('click', '.row-sil', function() {
        var deletedRow = $(this).closest('tr')
        $(deletedRow).find('.row-ekle').show();
        $(deletedRow).find('.row-sil').hide();
        $('#newTbl tbody').append(deletedRow);
    })



});