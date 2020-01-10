class Dessin {
  constructor () {
    this.clickX = new Array();
    this.clickY = new Array();
    this.clickDrag = new Array();
    this.paint = false;
    this.vide = true;

    var canvasDiv = document.getElementsByClassName("canvasDiv");
    var canvas = document.createElement("canvas");
    canvas.setAttribute("id", "draw");
    canvas.setAttribute("width", window.getComputedStyle(canvasDiv[0]).width);
    canvas.setAttribute("height", window.getComputedStyle(canvasDiv[0]).height);
    canvasDiv[0].appendChild(canvas);
    if(typeof G_vmlCanvasManager != "undefined") {
        canvas = G_vmlCanvasManager.initElement(canvas);
    }
    this.context = canvas.getContext("2d");
  }

  addClick (x,y,drag) {
    this.clickX.push(x);
    this.clickY.push(y);
    this.clickDrag.push(drag);
  }

  render () {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    this.context.strokeStyle = "dodgerblue";
    this.context.lineJoin = "round";
    this.context.lineWidth = 10;
    for (var i=0; i<this.clickX.length;i++) {
      this.context.beginPath();
      if(this.clickDrag[i] && i) {
        this.context.moveTo(this.clickX[i-1],this.clickY[i-1]);
      }
      else {
        this.context.moveTo(this.clickX[i]-1,this.clickY[i]);
      }
      this.context.lineTo(this.clickX[i],this.clickY[i]);
      this.context.closePath();
      this.context.stroke();
    }
  }

  effacer () {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    this.clickX = [];
    this.clickY = [];
    this.clickDrag = [];
  }

  infoCanvas () {
    var tableau = [];
    var cpt = 0;
    var gauche = this.context.canvas.width;
    var droite = 0;
    var imgData = this.context.getImageData(0, 0, this.context.canvas.width, this.context.canvas.height);

    for (var i = 0; i < imgData.data.length; i += 4) {
      if (imgData.data[i] != 0 && imgData.data[i+1] != 0 && imgData.data[i+2] != 0) {
        var ligne = parseInt((i/4)/this.context.canvas.width);
        var colonne = (i/4)%this.context.canvas.width;
        if (colonne < gauche) gauche = colonne;
        if (colonne > droite) droite = colonne;
        tableau[cpt] = [ligne,colonne];
        cpt++;
      }
    }

    this.context.strokeStyle = "#282828";
    this.context.lineWidth = 2;
    this.context.beginPath();
    this.context.moveTo(gauche,0);
    this.context.lineTo(gauche,this.context.canvas.height);
    this.context.stroke();
    this.context.beginPath();
    this.context.moveTo(0,tableau[0][0]);
    this.context.lineTo(this.context.canvas.width,tableau[0][0]);
    this.context.stroke();
    this.context.beginPath();
    this.context.moveTo(droite,0);
    this.context.lineTo(droite,this.context.canvas.height);
    this.context.stroke();
    this.context.beginPath();
    this.context.moveTo(0,tableau[cpt-1][0]);
    this.context.lineTo(this.context.canvas.width,tableau[cpt-1][0]);
    this.context.stroke();

    this.info = [tableau,gauche,tableau[0][0],droite,tableau[cpt-1][0]];

    return this.info;
  }

  echelle () {
    var comp = [
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0]
    ];

    var tab = this.info[0];
    var gauche = this.info[1];
    var haut = this.info[2];
    var droite = this.info[3];
    var bas = this.info[4];

    var hfact = parseInt(((bas-haut) / 9) + 1);
    var wfact = parseInt(((droite-gauche) / 9) + 1);
    var nbcase = parseInt((hfact * wfact) / 5);

    if (hfact < 8 || wfact < 8 || nbcase < 8) {
      return undefined;
    }
    else {
      for (var i = 0; i < tab.length; i++) {
        var cy = parseInt((tab[i][0] - haut) / hfact);
        var cx = parseInt((tab[i][1] - gauche) / wfact);
        comp[cy][cx] += 1 / nbcase;
      }
      this.echelle = comp;

      return comp;
    }
  }

  comparer () {
    if (localStorage.getItem("cara") == "lettre") {
      var tab = [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z];
    }
    else if (localStorage.getItem("cara") == "chiffre") {
      var tab = [c0, c1, c2, c3, c4, c5, c6, c7, c8, c9];
    }
    else {
      return undefined;
    }

    var maxprob = -1000;
    var imaxprob = 0;
    var ctab = new Array();

    for (var i = 0; i < tab.length; i++) {
      var row = document.createElement("tr");
      var cell = document.createElement("td");
      var cellText = document.createTextNode(tab[i].nom);
      cell.appendChild(cellText);
      row.appendChild(cell);

      var prob = 0;
      for (var j = 0; j < this.echelle.length; j++) {
        for (var k = 0; k < this.echelle[j].length; k++) {
          var t1 = this.echelle[j][k];
          var t2 = tab[i].tab[j][k];
          if ((t1 == 0 && t2 != 0) || (t1 != 0 && t2 == 0)) {
            prob--;
          }
          else {
            prob += (t1 * t2);
          }
        }
      }

      if (prob >= 0) {
        ctab.push("pos");
      }
      else {
        ctab.push("neg");
      }

      if (prob >= maxprob) {
        maxprob = prob;
        imaxprob = i;
      }

      var pcell = document.createElement("td");
      var pcellText = document.createTextNode(prob);
      pcell.appendChild(pcellText);
      row.appendChild(pcell);
      document.getElementsByTagName("table")[0].appendChild(row);
    }
    if (maxprob <= -12) {
      alert("Hmmm... I don't understand! I still have a lot to learn...\nI will still show the results though...");
    }

    for (var l = 0; l < ctab.length; l++) {
      document.getElementsByTagName("table")[0].rows[l+1].classList.add(ctab[l]);
    }

    document.getElementsByTagName("table")[0].rows[imaxprob+1].classList.add("res");

    return tab;
  }
}
