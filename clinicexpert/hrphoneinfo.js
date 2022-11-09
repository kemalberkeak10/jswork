$(function() {
    $('.well .pull-right:eq(0)').prepend('<a id="btnWorkMobileInfo" class="btn btn-sm btn-success"  style="margin-right:10px;" title=""><span>HR Work Mobile</a>');
    var contactOwner = $('label[for=9CA2376B3DD24534A15A8333C036108A]').parent().data();
    var contactOwnerName = "";
    var contactOwnerId = "";
    if (!String.isNullOrWhiteSpace(contactOwner)) {
        contactOwnerName = contactOwner.value;
        contactOwnerId = contactOwner.publicids;
    }
    $('body').on('click', '#btnWorkMobileInfo', function() {
        var localUrl = String.format("http://localhost:62896/api/data/HRPhoneInfo?contactOwner={0}", contactOwnerId),
            realUrl = String.format("https://clinicexpertwebapi.setcrm.com/api/data/HRPhoneInfo?contactOwner={0}", contactOwnerId);
        $('#modalLoading').remove();
        window.setModal.Create({
            id: 'modalLoading',
            html: {
                header: '<i class="fa fa-share-square"></i> Human Resources Work Mobile',
                body: '<div id="workMobile"></div><div id="txt" style="margin:0 0 5px; width: 100%;">İşleminiz yapılıyor, lütfen bekleyiniz..<br/> <img src="/Public/img/loading_bar.gif"></div>',
                footer: '<button data-dismiss="modal" class="btn btn-default btn-sm">Kapat</button>'
            },
            settings: {
                widthClass: 'modal-md'
            }
        });
        $('#modalLoading').modal("toggle");
        $.get(realUrl, "", function(r) {
            if (r.Status) {
                $('#modalLoading').find('#txt').hide();
                $('#modalLoading .modal-body #workMobile').html(contactOwner.value + " : " + r.Message);
            } else {
                $('#modalLoading').find('#txt').hide();
            }
        });
    });
});