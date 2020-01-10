$(document).ready(function(){
  localStorage.setItem("state","menu");
  localStorage.setItem("cara","lettre");
  localStorage.setItem("mot","");

  $("button.commencer").click(function() {
    $(".menu").fadeOut("slow","linear", function () {
      $(location).attr("href", "app.html");
      $(".menu").fadeIn("slow","linear");
    });
  });
});
