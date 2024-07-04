$(document).ready(function () {
  $(".overlay").keydown(function (e) {
    // left arrow
    if ((e.keyCode || e.which) == 37) {
      $(".prev").trigger();
    }
    // right arrow
    if ((e.keyCode || e.which) == 39) {
      $(".next").click();
    }
  });
});
