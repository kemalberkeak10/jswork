$(function() {
    $('body').on('change', '#1D88510ED40E4AC19EEB7A8CF4548AB6', function() {
        var userName = userData.name;
        var userId = userData.id;
        $("#0AA4F3B3EBE244368AF1D83D445841B8").select2("data", { id: userId, text: userName }).trigger("change");
    });
    $('body').on('change', '#679C435DF7434F96A6A0DAE883A0BCF3', function() {
        var userName = userData.name;
        var userId = userData.id;
        $("#BB63C34E040C41EBB593F519310B6F47").select2("data", { id: userId, text: userName }).trigger("change");
    });
});