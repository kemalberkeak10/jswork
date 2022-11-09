$(function() {
    window.setModal.Create({
        id: 'modalKategoriKontrol',
        html: {
            header: 'Alt Kategori Listesi',
            body: '<div id="altKategoriSearch" style="width: 100%;">' +
                '<table id="table" class="table table-striped table-hover">' +
                '<thead style="background-color: #dcebb5;"><tr>' +
                '<th class="col-md-12">Alt Kategori Ara</th>' +
                '</tr></thead>' +
                '<tbody><tr>' +
                '<td class="col-md-"><input id="inputAltKategoriSearch" type="text" value="" tabindex="-1" style="width: 25%; margin-right: 10px; border-radius: 3px; border: 1px solid #5BC0DE; padding: 12px;"><button id="btnAltKategoriSearch" type="button" class="btn btn-sm btn-primary">Ara</button></td>' +
                '</tr></tbody>' +
                '</table>' +
                '</div>' +
                '<div id="altKategori" style="width: 100%;">',
            footer: '' +
                '<button id="btnAltKategoriClose" data-dismiss="modal" class="btn btn-success btn-sm">Kapat</button>'
        }
    });
    window.setModal.Create({
        id: 'modalLoading',
        html: {
            header: ' ',
            body: '<div id="txt" style="margin:0 0 5px; width: 100%;">Islem biraz uzun sürebilir, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>',
            footer: '<button id="btnClose" data-dismiss="modal" class="btn btn-success btn-sm">Kapat</button>'
        }
    });
    $('label[for=385FA68E91C94ED19C3B6B5FAED23889]').append('<a id="btnKategoriKontrol" class="btn btn-sm btn-success"  style="margin-right:10px;" >Kategori Kontrol</a>');
    $('body').on('click', '#btnKategoriKontrol', function() {
        $('#385FA68E91C94ED19C3B6B5FAED23889').select2('val', '')
        $('#DEDD64704B93488C8C7DCDC4BDE68F83').select2('val', '')
        $('#087E4327B26B47209AC59E4DC21F0897').select2('val', '')
        $('#66A9D96976AF48EEA3D274FAC354E085').select2('val', '')
        workGetList();
    });

    function workGetList() {
        $('#modalLoading').modal('toggle');
        $('#altKategori').html('');
        $('#inputAltKategoriSearch').val('');
        var urlAltKategoriler = String.format('https://mayawebapi.denizbank.com/api/data/VfOkuma?coId={0}&vfid={1}&q={2}', '85D7B7927E0F472FB6337633D0B4E912', '8E50F636C0C44865B20859F46FBCF454', '');
        $.get(urlAltKategoriler, function(r) {
            $('#modalKategoriKontrol .modal-dialog').css('width', '100%');
            $('#modalLoading').modal('toggle');
            $('#modalKategoriKontrol').modal('toggle');
            if (r != null && r.length > 0) {
                $('#newTblAltKategori thead').html('');
                $('#newTblAltKategori tbody').html('');
                var newTblAltKategori = $('<table id="newTblAltKategori" style="width: 100%" />');
                var thead = $('<thead />');
                var newRow = $('<tr class="table table-bordered table-hover" style="background-color:lightblue"/>');
                newRow.append($('<th style="text-align: left;" class="col-md-1"/>').text(' '));
                newRow.append($('<th style="text-align: left;" class="col-md-3"/>').text('Çagri Türü'));
                newRow.append($('<th style="text-align: left;" class="col-md-3"/>').text('*Ana Kategori'));
                newRow.append($('<th style="text-align: left;" class="col-md-3"/>').text('Kategori'));
                newRow.append($('<th style="text-align: left;" class="col-md-3"/>').text('Alt Kategori Adi'));
                thead.append(newRow);
                newTblAltKategori.append(thead);
                var tbody = $('<tbody />');
                $.each(r, function(i, v) {
                    var newRow = $('<tr class="table table-bordered table-hover" data-id="' + v.PublicId + '" />');
                    newRow.append($('<a id="btnSec" class="btn btn-primary btn-actions btn-sm"  title="Seç">Seç</a>'));
                    newRow.append($('<td style="text-align: left;" class="col-md-3" data-id="' + v.Values.first('FieldPublicId', 'B67F0A774F074845930364FADBD0386B').SelectedItemPublicIds + '" />').text(v.Values.first('FieldPublicId', 'B67F0A774F074845930364FADBD0386B').Value));
                    newRow.append($('<td style="text-align: left;" class="col-md-3" data-id="' + v.Values.first('FieldPublicId', 'C3F120FC852A4C459EEA4FE65DD824F1').SelectedItemPublicIds + '" />').text(v.Values.first('FieldPublicId', 'C3F120FC852A4C459EEA4FE65DD824F1').Value));
                    newRow.append($('<td style="text-align: left;" class="col-md-3" data-id="' + v.Values.first('FieldPublicId', 'B7B1B737E69C4A8DA0705D23B1DDB527').SelectedItemPublicIds + '" />').text(v.Values.first('FieldPublicId', 'B7B1B737E69C4A8DA0705D23B1DDB527').Value));
                    newRow.append($('<td style="text-align: left;" class="col-md-3" />').text(v.Values.first('FieldPublicId', '66A9D96976AF48EEA3D274FAC354E085').Value));
                    tbody.append(newRow);
                    newTblAltKategori.append(tbody);
                });
                $('#altKategori').html('');
                $('#altKategori').append(newTblAltKategori);
            } else {
                $('#altKategori').html('');
                $('#altKategori').append('Listelenecek kayit bulunamadi.');
            }
        });
    }

    $('body').on('click', '#btnSec', function() {
        var ths = $(this);
        var cagriTuruId = ths.closest('tr').find('td:eq(0)').data('id');
        var cagriTuru = ths.closest('tr').find('td:eq(0)').text();
        var anaKategoriId = ths.closest('tr').find('td:eq(1)').data('id');
        var anaKategori = ths.closest('tr').find('td:eq(1)').text();
        var kategoriId = ths.closest('tr').find('td:eq(2)').data('id');
        var kategori = ths.closest('tr').find('td:eq(2)').text();
        var altKategoriAdiId = ths.closest('tr').data('id');
        var altKategoriAdi = ths.closest('tr').find('td:eq(3)').text();
        $('#modalKategoriKontrol').modal('toggle');
        prepareSelect2SelectedOneItem('#385FA68E91C94ED19C3B6B5FAED23889', cagriTuruId, cagriTuru);
        prepareSelect2SelectedOneItem('#DEDD64704B93488C8C7DCDC4BDE68F83', anaKategoriId, anaKategori);
        prepareSelect2SelectedOneItem('#087E4327B26B47209AC59E4DC21F0897', kategoriId, kategori);
        prepareSelect2SelectedOneItem('#50047B5E68F145D4AD7EC26716D0C13B', altKategoriAdiId, altKategoriAdi);
    });

    $('body').on('click', '#btnAltKategoriSearch', function() {
        $('#modalKategoriKontrol .modal-dialog').css('z-index', '999');
        // Declare variables
        var input, filter, table, tr, td, i;
        input = document.getElementById("inputAltKategoriSearch");
        filter = input.value.toUpperCase();
        table = document.getElementById("newTblAltKategori");
        tr = table.getElementsByTagName("tr");
        // Loop through all table rows, and hide those who don't match the search query
        for (i = 1; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[3];
            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
        $('#modalKategoriKontrol .modal-dialog').css('z-index', '1050');
    });
});