$(function() {
    $('.btn-success[data-viewfilterid="ED3D4DF93B444D0CB31B377D17C34382"]').hide();
    $(String.format("div[data-id={0}] .panel-body .lookuprelation-sbody table thead tr:first th:last", "D93D0A3A45C04C5799B94E372F2327FB")).prepend('<a type="button" class="btn btn-sm btn-success pull-right btn-hizli-makine-ekle"><i class="fa fa-plus"></i> Hızlı Makine Ekle</a>');
    var selectedRecords = [];
    $('body').on('click', '.btn-hizli-makine-ekle', function() {
        selectedRecords = [];
        $('#hizliMakineEkleModal').remove();
        window.setModal.Create({
            id: 'hizliMakineEkleModal',
            html: {
                header: 'Hızlı Makine Ekle',
                body: String.format('<div id="msg"></div><div id="txtMakine" style="margin:0 auto;width: 100%;">Makine(ler) yükleniyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div><div id="txtMakine2" style="margin:0 auto;width: 100%;display:none;">İşleminiz yapılıyor, lütfen bekleyiniz..<br/><img src="/Public/img/loading_bar.gif"></div><iframe id="hizlimakine"src="/set/list/makine/?filter=080FC66F38A24FB2BAE41718932A2F08"style="width:100%;height:600px;border:none;display:none;"></iframe>'),
                footer: '<button type="button" class="btn btn-success btn-sm btn-makine-olustur" style="display:none">Kaydet</button><button type="button" class="btn btn-sm btn-default" data-dismiss="modal">Kapat</button>'
            },
            settings: {
                widthClass: 'modal-full-width'
            }
        });
        $('#hizlimakine').on('load', function() {
            $('.btn-makine-olustur').show();
            $("#hizliMakineEkleModal .modal-body").css({
                padding: '5px'
            });
            $('#txtMakine').hide();
            $('#hizlimakine').show();
            $("#hizlimakine").contents().find('#navbarmenu').remove();
            $("#hizlimakine").contents().find('.well-xxs:first, footer, i.btn-column-filter, #Pager').hide();
            // $('#hizlimakine').contents().find('.table-responsive table thead tr th').removeClass('btnOrder asc desc');
            $('#hizlimakine').contents().find('.table-responsive table thead tr').each(function(i, v) {
                $.each($(v).find('th'), function(o, g) {
                    if (o == 0 || o > 2) {
                        $(this).remove();
                    } else if (o == 1) {
                        $(this).text("Öncelik");
                    }
                });
            });
            $('#hizlimakine').contents().find('.table-responsive table tbody tr').each(function(i, v) {
                $.each($(v).find('td'), function(o, g) {
                    if (o == 0 || o > 2) {
                        $(this).remove();
                    } else if (o == 1) {
                        $(this).closest('td').val("");
                        $(this).html("<input type='text' class='form-control'>");
                    }
                });
            });
            $("#hizlimakine").contents().find('body').attr("style",
                "padding-top:0 !important");
        });
        $('#hizliMakineEkleModal').modal("toggle");
    });
    $('body').on('click', '.btn-makine-olustur', function() {

        var datas = $('#hizlimakine tbody tr');
        if (datas.length > 0) {
            datas.each(function(i, v) {
                var oncelikTd = $(v).find('td[data-id=F1C6B4FCC45A408BAFA4C42DDC6ABFC6]');
                var oncelikDeger = $('#hizlimakine').contents().find('.table-responsive table tbody tr td[0]');

                console.log(oncelikDeger);
            });
        }
    });
});