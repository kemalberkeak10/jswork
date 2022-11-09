    $(function () {
        var urunGrubu =$('label[for=EF1A5028CBBD4AC09AD4D263F6FBBB72]').parent().data('publicids');
        var statu =$('label[for=663DD58F66B04DF29C4E0B880A4A7CE3]').parent().data('publicids');


        if(urunGrubu !== "0387CC0842FC427EA88B11E1C5041475" || statu !== "E828C09FFC1A4F7B920B9629D7120350"){
        $('[data-publicid=29E39C84B5834B7F87FEED0729712944]').parent().hide();
        }

        $('.btn-br-actions[data-publicid=29E39C84B5834B7F87FEED0729712944]').hide();
        $('.btn-br-actions[data-publicid=29E39C84B5834B7F87FEED0729712944]').closest('td').prepend('<a id="btnUrunDegisim" class="btn btn-sm btn-warning"  style="margin-right:10px;" >Ürün Değişim Tarihi</a>');

        $('body').on('click', '#btnUrunDegisim', function () {
        $('#modalUrunDegisim').remove();
        window.setModal.Create({
        id: 'modalUrunDegisim',
        html: {
        content: 'style="width:900px !important"',
        header: 'Ürün Değişim Tarihi',
        body: '<div id="msg" style="margin:0 23px 5px; width: 80%;font-size:15px;"></div>' +
        '<table class="table" style="width: 100%">' +
        '<thead>' +
        '<tr><th>Ürün Değişim Tarihi</th></tr>' +
        '</thead>' +
        '<tbody>' +
        '<tr>' +
        '<td colspan="1" rowspan="1"><input id="urunDegisimTarihi" type="text" style="width:100%; border-radius: 3px; border: 1px solid #5BC0DE; padding: 8px 12px;"></td>' +
        '</tr>' +
        '</tbody>' +
        '</table>' ,
        footer: '<button id="btnKaydet" type="button" class="btn btn-sm btn-success" >Kaydet</button>' + '<button type="button" class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>'
        },
        settings:{
            withClass:'modal-sm'
        }
        });

        $('#modalUrunDegisim').modal('toggle');
        
        $('#urunDegisimTarihi').datetimepicker({
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
        var UrunDegisimTarihi = $('label[for=6A6BD4E8C4344554A39F7C9ED73AC579 ]').parent().data('value').split(' ')[0];
        $('#urunDegisimTarihi').val(UrunDegisimTarihi);
        });
        $('body').on('click', '#btnKaydet', function () {
        var data = {
        RecordId: $('#RecordPublicId').val(),
        UrunDegisimTarihi: $('#urunDegisimTarihi').val(),

        }
        $(this).prop('disabled',true);
        var url = 'https://meyicki.setcrm.com/api/data/UrunDegisimTarihi';
        // var url2 = 'http://localhost:12321/api/data/UrunDegisimTarihi';
        $('#modalUrunDegisim .modal-body').html('<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>');
        
        $.post(url, data, function (r) {
        if (r.Status) {
        $('#modalUrunDegisim').modal('toggle');
        $('.btn-br-actions[data-publicid=29E39C84B5834B7F87FEED0729712944]').trigger('click');
    
        } else {
        setUtil.alert({
        container: '#modalUrunDegisim .modal-body #msg',
        message: r.Message,
        alertClass: 'alert-danger',
        autoClose: true
        });
        }
        });
        });
        
        });
