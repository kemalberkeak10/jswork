$(function() {
    var recordId = $('#RecordPublicId').val();
    $('.close').hide();
    $('.modal-title').hide();

    $('.modal-header').append('<div class="pull-right"><button type="button" style="margin-top:5px;" class="close pull-right" data-dismiss="modal" aria-label="Close" onclick="window.location.reload()"><span aria-hidden="true">&times;</span></button><button id="screenshot" type="button" class="btn btn-sm btn-success" style="margin-right:10px"> Screenshot Al</button></div>');
    $('.modal-header').append('<div class="pull-left"><h4 class="modal-title"> Lr Kayıt Ekle</h4></div>');
    $("body").on("click",
        "#screenshot",
        function() {
            //iframede screenshot alma
            // const iframe = document.getElementsByTagName('iframe');
            // const screen = iframe[0] ? .contentDocument ? .body;
            // html2canvas(screen).then(function(canvas) {

            //     saveAs(canvas.toDataURL(), String.format('modal_name_{0}.png', recordId));
            // });

            //modalda screenshot alma
            html2canvas(document.querySelector('#modalLabSonuc .modal-dialog ')).then(function(canvas) {
                saveAs(canvas.toDataURL(), String.format('modal_name_{0}.png', recordId));
            });

        });
});



$(function() {
    var recordId = $('#RecordPublicId').val();
    $('.close').hide();
    $('.modal-title').hide();

    $('.modal-header').append('<div class="pull-right"><button type="button" style="margin-top:5px;" class="close pull-right" data-dismiss="modal" aria-label="Close" onclick="window.location.reload()"><span aria-hidden="true">&times;</span></button><button id="screenshot" type="button" class="btn btn-sm btn-success" style="margin-right:10px"> Screenshot Al</button></div>');
    $('.modal-header').append('<div class="pull-left"><h4 class="modal-title"> Lr Kayıt Ekle</h4></div>');
    $("body").on("click",
        "#screenshot",
        function() {
            const iframe = document.getElementsByTagName('iframe');
            const screen = iframe[0] ? .contentDocument ? .body;
            html2canvas(screen).then(function(canvas) {
                saveAs(canvas.toDataURL(), String.format('modal_name_{0}.png', recordId));
            });
        });
});