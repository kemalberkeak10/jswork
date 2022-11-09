$(function() {
    html2canvas($("#mdlSonDurum"), {
        onrendered: function(canvas) {
            theCanvas = canvas;


            canvas.toBlob(function(blob) {
                saveAs(blob, "Dashboard.png");
            });
        }
    });
});





$(function() {
    html2canvas(document.querySelector("#businessrule-trigger .modal-body")).then((canvas) => {
        $(".modal-body").append(canvas);
    });

});

$(function() { <
    div class = "ml-auto" >
        <
        button type = "button"
    class = "btn btn-info"
    id = "downloadLog"
    translate > Download Log < /button> < /
    div >

        $('.modal-h').prepend('<button id="screenshot" type="button" class="btn btn-sm btn-success pull-right"> Screenshot Al</button>');
    $('#close').addClass("pull-right");
    $("body").on("click",
        "#screenshot",
        function() {
            html2canvas(document.querySelector('#modalLabSonuc .modal-dialog ')).then(function(canvas) {

                saveAs(canvas.toDataURL(), 'file-name.png');
            });
        });
});