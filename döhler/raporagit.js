$(function() {
    $('.well .pull-right:eq(0)').prepend('<a id="btnRaporaGit" class="btn btn-sm btn-primary" style="margin-right:10px;" >Rapora Git</a>');
    $('body').on('click', '#btnRaporaGit', function() {
        window.open("https://maya.setcrm.com/Home/Index/710BF3C134174F9A990A87689592B03A", '_blank');
    });
});