$(function() {
    var leadDevredildimi;
    if ($('#ViewFilterPublicId').val() == 'DD58F8F693904FCCAC9DE699F39A6229') {
        $('.well-xxs .pull-right').prepend('<a id="btnTopluLead" class="btn btn-sm btn-primary" style="margin-right:10px;">Toplu MT Atama</a>');
        $(".table-responsive table tbody tr").each(function(i, v) {
            $(v).prepend("<td><input type='checkbox' class='chk' style='margin-left:3px;margin-right:3px;'></td>");
        });
        $(".table-responsive table thead tr").each(function(i, v) {
            $(v).prepend("<th><input type='checkbox' class='vf-all-check-toggle' style='margin-left:3px;margin-right:3px;'></th>");
        });
        leadDevredildimi = false;
    }

    if ($('#ViewFilterPublicId').val() == '349B06D87AC641FB9345448089CC582F') {
        $('.well-xxs .pull-right').prepend('<a id="btnTopluLead" class="btn btn-sm btn-primary" style="margin-right:10px;">Lead Temsilcisi Değişikliği</a>');
        $(".table-responsive table tbody tr").each(function(i, v) {
            $(v).prepend("<td><input type='checkbox' class='chk' style='margin-left:3px;margin-right:3px;'></td>");
        });
        $(".table-responsive table thead tr").each(function(i, v) {
            $(v).prepend("<th><input type='checkbox' class='vf-all-check-toggle' style='margin-left:3px;margin-right:3px;'></th>");
        });
        leadDevredildimi = true;
    }
    $(".vf-all-check-toggle").on("change",
        function() {
            var checkBoxes = $(".chk");
            checkBoxes.prop("checked", !checkBoxes.prop("checked"));
        });

    $('body').on('click', '#btnTopluLead', function() {
        ModalCreate();
        $('#btnOnay').hide();
        $('#txt').hide();
        var checkedValues = $('input[type=checkbox]:checked').length;
        prepareSelect2('#satisTemsilcisi', '/Summary/LookupFieldValues', {
            coId: '133335DAB87346F1B2A6AF043F82FC6A',
            id: 'C52F0C3D8D974FC3A3D42E81B88DF5AB',
            viewFilterId: '0238B5B0D8A54C94B80B7C4422A3B95A'
        }, null, false); //çoklu seçim

        if (checkedValues < 1) {
            $('#selectBox').hide();
            setUtil.alert({
                container: '#leadMsg',
                message: "Lütfen en az bir tane kayıt seçiniz.",
                alertClass: 'alert-danger',
                autoClose: false
            });
        } else {
            $('#satisTemsilcisi').show();
            $('#btnOnay').show();
        }
    });
    $('body').on('click',
        '#btnOnay',
        function() {
            $('#txt').show();
            if (!String.isNullOrWhiteSpace($('#satisTemsilcisi').select2('data'))) {
                var trList = $('.table-bordered tbody tr');
                var data = {};
                var leadList = [];
                $.each(trList, function(i, v) {
                    if ($(v).find('.chk:checked').length > 0) {
                        leadList.push($(v).closest('tr').data('id'));
                    }
                })
                data = {
                    RecordId: $('#satisTemsilcisi').select2('data').id,
                    CheckedList: leadList,
                    LeadDevredildimi: leadDevredildimi
                };
                console.log(data);
                var localUrl = 'https://localhost:44305/api/data/TopluMtAtama';
                var realUrl = 'https://nefwebapi.setcrm.com/api/data/TopluMtAtama';
                $.post(realUrl,
                    data,
                    function(r) {
                        if (r.Status) {
                            $('#txt').hide();
                            setUtil.alert({
                                container: '#leadMsg',
                                message: "İşlem başarılı sayfa yenileniyor.",
                                alertClass: 'alert-success',
                                autoClose: false
                            });
                            setTimeout(function() {
                                window.location.reload();
                            }, 1000);
                        } else {
                            $('#txt').hide();
                            setUtil.alert({
                                container: '#leadMsg',
                                message: r.message,
                                alertClass: 'alert-danger',
                                autoClose: false
                            });
                        }
                    });
            } else {
                $('#txt').hide();
                setUtil.alert({
                    container: '#leadMsg',
                    message: "Lütfen müşteri temsilcisi seçiniz.",
                    alertClass: 'alert-danger',
                    autoClose: false
                });
            }
        });
})

function ModalCreate() {
    $('#modalLead').remove();
    window.setModal.Create({
        id: 'modalLead',
        html: {
            header: 'Müşteri Temsilcisi Ata',
            body: '<div id="leadMsg"></div>' +
                '<div id="selectBox"><div id="satisTemsilcisi"/></div>' +
                '<div id="txt" style="margin:0 0 5px; width: 100%;display:none;">İşleminiz yapılıyor, lütfen bekleyiniz... <br/> <img src="/Public/img/loading_bar.gif"></div><div id="msg"></div>',

            footer: '<button id="btnOnay" type="button" class="btn btn-sm btn-success">Onayla</button><button data-dismiss="modal" class="btn btn-danger btn-sm">Kapat</button>'
        }
    });
    $('#modalLead').modal('toggle');
}