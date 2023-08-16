$(function () {
  var kayitTipi = $("label[for=5F11C4AA7179460581A55D45D132D410]")
    .parent()
    .data("publicids");
  if (kayitTipi === "F222574B500140F0B4F903636F09D249") {
    $(".panel-lookup[data-id=6A697FA9ED974F608ED72885FDFFB9B2]").show();
    $(".panel-lookup[data-id=C5565F406F454279AA7E46DB748018BA]").hide();
  } else {
    $(".panel-lookup[data-id=6A697FA9ED974F608ED72885FDFFB9B2]").hide();
    $(".panel-lookup[data-id=C5565F406F454279AA7E46DB748018BA]").show();
  }
});
