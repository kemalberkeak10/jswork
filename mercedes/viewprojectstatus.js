$(function() {
    $("body").append("<style>@-webkit-keyframes spinner-grow {0% { -webkit-transform: scale(0);transform: scale(0);}50% { opacity: 1; } }@keyframes spinner-grow { 0% {-webkit-transform: scale(0);transform: scale(0);}50% {opacity: 1;}}.spinner-grow {display: inline-block;width: 2rem;height: 2rem;vertical-align: text-bottom;background-color: currentColor;border-radius: 50%;opacity: 0;-webkit-animation: spinner-grow.75s linear infinite;animation: spinner-grow.75s linear infinite;}.spinner-grow-sm {width: 1rem;height: 1rem;}.spinner-grow-lg {width: 3rem;height: 3rem;}</style>");
    $('.well .pull-right:eq(0)').prepend('<a id="btnProjectStatus" class="btn btn-sm btn-warning" style="margin-right:10px;">View Project Status</a>');

    $('body').on('click', '#btnProjectStatus', function() {

        var projectRecordId = $('#RecordPublicId').val();
        $('#modalProjectStatusDetail').remove();
        window.setModal.Create({
            id: 'modalProjectStatusDetail',
            html: {
                header: 'Project Status Detail',
                body: '<div style="margin:50px auto;text-align: center;" class="IframSpinner"><div class="spinner-grow spinner-grow-lg text-danger" role="status"><span class="sr-only"></span></div><div class="spinner-grow spinner-grow-lg text-warning" role="status"><span class="sr-only"></span></div><div class="spinner-grow spinner-grow-lg text-success" role="status"><span class="sr-only"></span></div><br><b style="font-size:15px;letter-spacing:1px;font-weight:normal;">Please wait...</b></div><iframe id="projectStatusIframe" src="/report/viewergantt?redirectUrl=index/ViewerProjectStatus/a/a/a/' + projectRecordId + '" frameborder="0" style="overflow: hidden;height:1050px;width:100%;display:none;" scrolling="yes" height="1050px" width="100%"></iframe>',
                footer: ''
            },
            settings: {
                widthClass: 'modal-full-width',
            }
        });

        $('#projectStatusIframe').on('load', function() {
            $('.IframSpinner').remove();
            $('#projectStatusIframe').show();
            //$('#modalProjectStatusDetail .modal-header .modal-title').append('<button type="button" class="btn btn-success btn-xs btn-modal-body-print"><i class="fa fa-print"></i></button>');
        });
        $('.close').hide();
        $('.modal-title').hide();
        //$('.modal-header').append('<div class="pull-right"><button type="button" style="margin-top:5px;" class="close pull-right" data-dismiss="modal" aria-label="Close" onclick="window.location.reload()"><span aria-hidden="true">&times;</span></button><button id="screenshot" type="button" class="btn btn-sm btn-success" style="margin-right:10px">Screenshot</button></div>');
        $('.modal-header').append('<div class="pull-left"><h4 class="modal-title"> Project Status Detail</h4></div>');
        $('#modalProjectStatusDetail').modal('toggle');
    });
    $("body").on("click", "#screenshot",
        function() {
            var domain = String.format("/report/viewergantt?redirectUrl=index/ViewerProjectStatus/a/a/a/{0}", $('#RecordPublicId').val());
            var gantViewScreen = window.open(domain, "_blank");
            const screen = gantViewScreen.document.activeElement;

            html2canvas(document.querySelector('body')).then(function(canvas) {
                return Canvas2Image.saveAsJPEG(canvas);
                //saveAs(canvas.toDataURL(), String.format('project_status_{0}.png', $('#RecordPublicId').val()));

            });

        });

});