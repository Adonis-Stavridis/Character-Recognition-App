$(document).ready(function(){
  localStorage.setItem("state","app");
  var dessin = new Dessin();

  if (localStorage.getItem("mot") != "") {
    var res = document.getElementsByClassName("text");
    var motdiv = document.createElement("div");
    motdiv.classList.add("mot");
    var p = document.createElement("p");
    var text = document.createTextNode(localStorage.getItem("mot"));
    p.appendChild(text);
    motdiv.appendChild(p);
    var but = document.createElement("button");
    but.classList.add("reset");
    var buttext = document.createTextNode("Reset");
    but.appendChild(buttext);
    motdiv.appendChild(but);
    res[0].appendChild(motdiv);
  }

  $(".app").fadeIn("slow","linear");
  $(".app").css("display","flex");

  $(window).resize(function () {
    $(".app").css("display","none");
    if (localStorage.getItem("state") == "recherche") {
      alert("The search has been cancelled!");
    }
    if (localStorage.getItem("state") == "resultats") {
      alert("I'm sorry you will lose your results... And there's nothing you can do about it!");
    }
    $(location).attr("href", "app.html");
  });

  $("canvas#draw").mousedown(function(evt) {
    if(localStorage.getItem("state") == "app") {
      var mouseX = evt.pageX-this.offsetLeft;
      var mouseY = evt.pageY-this.offsetTop;
      dessin.paint = true;
      dessin.vide = false;
      dessin.addClick(mouseX,mouseY, false);
      dessin.render();
    }
  });

  $("canvas#draw").mousemove(function(evt) {
    if (localStorage.getItem("state") == "app") {
      var mouseX = evt.pageX-this.offsetLeft;
      var mouseY = evt.pageY-this.offsetTop;
      if (dessin.paint) {
        dessin.addClick(mouseX,mouseY,true);
        dessin.render();
      }
    }
  });

  $("canvas#draw").mouseup(function(evt) {
    dessin.paint = false;
  });

  $("canvas#draw").mouseleave(function(evt) {
    dessin.paint = false;
  });

  $("button.effacer").click(function () {
    if (localStorage.getItem("state") == "app") {
      dessin.effacer();
    }
  });

  $("button.reset").click(function () {
    if (localStorage.getItem("state") == "app") {
      localStorage.setItem("mot","");
      $(".app").css("display","none");
      $(location).attr("href", "app.html");
    }
  });

  $("button.retour").click(function () {
    $(".app").css("display","none");
    if (localStorage.getItem("state") == "recherche") {
      alert("The search has been cancelled!");
    }
    $(location).attr("href", "app.html");
  });

  $("button.confirm").click(function () {
    var der = document.getElementsByClassName("res")[0].getElementsByTagName("td")[0].innerHTML;
    localStorage.setItem("mot",localStorage.getItem("mot")+der);
    $(".app").css("display","none");
    if (localStorage.getItem("state") == "recherche") {
      alert("The search has been cancelled!");
    }
    $(location).attr("href", "app.html");
  });

  if (localStorage.getItem("cara") == "lettre") {
    $("h3").text("letter");
    $("p.cara_poss").text("A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z");
  }
  else if (localStorage.getItem("cara") == "chiffre") {
    $("h3").text("number");
    $("p.cara_poss").text("0, 1, 2, 3, 4, 5, 6, 7, 8, 9");
  }

  $("button.modif_choix").click(function () {
    if (localStorage.getItem("state") == "app") {
      if (localStorage.getItem("cara") == "lettre") {
        localStorage.setItem("cara","chiffre");
        $("h3").text("number");
        $("p.cara_poss").text("0, 1, 2, 3, 4, 5, 6, 7, 8, 9");
      }
      else if (localStorage.getItem("cara") == "chiffre") {
        localStorage.setItem("cara","lettre");
        $("h3").text("letter");
        $("p.cara_poss").text("A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z");
      }
    }
  });

  $("button.rechercher").click(function () {
    if (localStorage.getItem("state") == "app") {
      if (dessin.vide) {
        alert("Hehe... Easy! Your character is Ņ̸̪̻̖͓̩̪̼̫̱͈͎̦͚͇̫̲̗͉̪̺̫͉͍͓̞̘̲̟͎͈͈̖̣̙̫̠̜͇̗͍̝͉̲̮̭̲̯͓̪͚̤͓͗̏̃̈́̋̅̾̆ͅÚ̷̟̹͇̠̫͖̺͖͇̱̜̮̀͊̀̿̌̈́L̷̨̛̛̛̗̤͍͈̬̱̯̙̜͙̖͓̙̺̩̖̪̩̞̳̲̼̮͇̳̼͋̈̏̂̾̎̒̆̐͗̊͑̄͋̀̌̒͑̉̽̆͗̓̄̀͂͆̿̿̉̅̿̅͐̇͋̒̑͆̈́̿̓̽͋̐̀̕̕̚̚͜͝͝͝ͅL̶̛̹͉̼̰͑̂͌̇͆̂̂̈̇͋̽͑́͑͂̊̃̋͂̇̅̓̍̋̾͊͗̔̒̆̈́̂̀̉͘̚̕̕̚͝͠ͅ!");
      }
      else {
        localStorage.setItem("state","recherche");
        $("div.loader").fadeIn();
        var info = dessin.infoCanvas();
        if (info[0].length >= dessin.context.canvas.width * dessin.context.canvas.height * 0.3) {
          localStorage.setItem("state","app");
          alert("Calm dow Bob Ross! I recognize characters not paintings!");
          $(".app").css("display","none");
          $(location).attr("href", "app.html");
        }
        console.log("Canvas info:");
        console.log(info);
        var comp = dessin.echelle(info);
        if (comp === undefined) {
          localStorage.setItem("state","app");
          alert("I need to take my glasses to recognize this character!\nMaybe draw something bigger!");
          $(".app").css("display","none");
          $(location).attr("href", "app.html");
        }
        else {
          console.log("Info echelleion:");
          console.log(comp);
          var cmprr = dessin.comparer(comp);
          if (cmprr === undefined) {
            localStorage.setItem("state","app");
            alert("I don't know what is happening to me...\n I'll refresh the page to prevent myself from auto-destructing...");
            $(".app").css("display","none");
            $(location).attr("href", "app.html");
          }
          else {
            localStorage.setItem("state","resultats");
            $("div.text").fadeOut("slow","linear", function () {
              $("div.resultats").fadeIn("slow","linear");
            });
            console.log("Drawing structure:");
            console.log(dessin);
          }
        }
        $("div.loader").fadeOut();
      }
    }
  });
});
