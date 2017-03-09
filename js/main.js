$(document).ready(function () {
  function goArt() {
    $("#layer-eng-outer")
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
    $("#layer-eng-outer")
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
    $("#layer-eng-outer")
      .removeClass("unfocused")
      .removeClass("focused");
    $("#__paint_bucket, #__palette")
      .addClass("hide-with-opacity");
    $(".__keyboard")
      .removeClass("hide-with-opacity");
    $("#__macintosh")
      .addClass("hide-with-opacity");
  }

  function goAccordingToMousePosition() {
    var body = $("#layer-common-inner .__background_container");
    body.mousemove(function (event) {
      var mousePos = (event.pageX - body.offset().left) * 100 / body.width();
      if (mousePos <= 40) {
        goEng()
      } else if (mousePos <= 60) {
        goNeutral();
      } else {
        goArt();
      }
    }).mouseout(function (event) {
      goNeutral();
    });
  }

  function bindElementsWidth(ref, target) {
    $(window).resize(function() {
      target.width(ref.width());
    });
    target.width(ref.width());
  }

  bindElementsWidth($("#layer-art-inner"), $("#layer-eng-inner"));
  goAccordingToMousePosition();

});