$(document).ready(function () {
  var body = $("body");
  function goArt() {
    $("#layer-eng")
      .addClass("unfocused")
      .removeClass("focused");
    $("#__paint_bucket, #__palette")
      .removeClass("hide-with-opacity");
    $(".__keyboard")
      .addClass("hide-with-opacity");
    $("#__macintosh")
      .addClass("hide-with-opacity");
  }

  function goEng() {
    $("#layer-eng")
      .removeClass("unfocused")
      .addClass("focused");
    $("#__paint_bucket, #__palette")
      .addClass("hide-with-opacity");
    $(".__keyboard")
      .removeClass("hide-with-opacity");
    $("#__macintosh")
      .removeClass("hide-with-opacity");
  }

  function goNeutral() {
    $("#layer-eng")
      .removeClass("unfocused")
      .removeClass("focused");
    $("#__paint_bucket, #__palette")
      .addClass("hide-with-opacity");
    $(".__keyboard")
      .removeClass("hide-with-opacity");
    $("#__macintosh")
      .addClass("hide-with-opacity");
  }
  body.mousemove(function (event) {
    var mousePos = event.pageX * 100 / body.width();
    if (mousePos <= 30) { goEng() }
    else if (mousePos <= 70) { goNeutral(); }
    else { goArt(); }
  }).mouseout(function (event) {
    goNeutral();
  });
});