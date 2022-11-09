$(function () {

    $('body').on('lookupRelationLoadTriggerEvent', function (e, relationId) {
    if (relationId === "8BA9A8C743184CA99BF1EFAE9688514F") {
    $(String.format('div[data-id={0}]', relationId)).prepend('<button type="button" class="btn btn-warning btn-sm pull-right btn-gcub"  style="margin-right:10px;margin-top:2px;"><i class="fas fa-plus"></i> GCUB Parametre Hesapla</button>');
    $('body').on('click', '.btn-gcub', function () {
    window.setModal.Create({
    id: 'modalLoadingGcu',
    html: {
    header: 'Bilgi',
    body: '<div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz Yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>',
    footer: '<button id="btnClose" data-dismiss="modal" class="btn btn-success btn-sm">Kapat</button>'
    }
    });
    $('#modalLoadingGcu').modal('toggle');
    var url = 'https://meyicki.setcrm.com/api/data/GcubParametreCreate?recordId=' + $('#RecordPublicId').val();
    var url2 = 'http://localhost:50058/api/data/GcubParametreCreate?recordId=' + $('#RecordPublicId').val();
    $.get(url, function (r) {
    if (r.Status) {
    window.location.reload();
    } else {
    $('#modalLoadingGcu .modal-body').html(r.Message);
    }
    });
    });
    }
    });
    });