$(function() {
    $('.btn-br-actions[data-publicid=9A4A6ABD7F2A48099922DE84EF49AC96]').hide();
    $('.btn-br-actions[data-publicid=9A4A6ABD7F2A48099922DE84EF49AC96]').closest('td').prepend('<a id="btnWaitingForDetails" class="btn btn-sm btn-warning"style="margin-right:10px;" >Waiting For Details</a>');

    $('body').on('click', '#btnWaitingForDetails', function() {
        $('.btn-br-actions[data-publicid=9A4A6ABD7F2A48099922DE84EF49AC96]').trigger('click');
    });
});