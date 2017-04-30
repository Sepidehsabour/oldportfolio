$(document).ready(function () {
  setupMainPage();
  setupWhatPage();
  setupContactPage();
});

function bindElementsWidth(ref, target) {
  $(window).resize(function() {
    target.width(ref.width());
  });
  target.width(ref.width());
}

function setupMainPage() {
  function goArt() {
    $("#layer-front-cover")
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
    $("#layer-front-cover")
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
    $("#layer-front-cover")
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
    var body = $(".home #layer-common-inner .__background_container");
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

  bindElementsWidth($("#layer-rear"), $("#layer-front"));
  goAccordingToMousePosition();
}

function setupWhatPage() {
  $(document).ready(function(){
    $('#__carousel_items_wrapper').slick({
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1
    });
  });
}

function setupContactPage() {
  $(document).ready(function(){
    $('#__carousel_items_wrapper').slick({
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1
    });
  });
}