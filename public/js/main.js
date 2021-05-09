$(document).ready(function () {
  $('.nav-link').click(() => {
    if ($(".navbar-toggler").attr('aria-expanded') === "true") {
      $(".navbar-toggler").click();
    }
  })
});