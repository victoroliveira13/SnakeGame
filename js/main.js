window.onload = function () {
    var stage = document.getElementById('stage');
    var ctx = stage.getContext("2d");
    document.addEventListener("keydown", keyPush);

    //chamada de funcao auto
    setInterval(game, 90);

    const vel = 1; //pulo de casa por chamada de funcao
    var vx = vy = 0; //velociade X e Y;
    var cobraX = cobraY = 1; //posicao inicial da cabeca da cobra
    var peca = 30; //tamanho das casas no tabuleiro
    var qtdePeca = 15; //quantidade de casas no tabuleiro
    var ax = Math.floor(Math.random() * qtdePeca); //sorteia posicao  X inical da maça
    var ay = Math.floor(Math.random() * qtdePeca);//sorteia posicao Y inical da maça

    var trail = [];
    tail = 5;

    function game() {
        cobraX += vx;
        cobraY += vy;

        //tratando passagem da cobra nas bordas
        //left
        if (cobraX < 0) {
            cobraX = qtdePeca - 1;
        }
        //right
        if (cobraX > qtdePeca - 1) {
            cobraX = 0;
        }
        //top
        if (cobraY < 0) {
            cobraY = qtdePeca - 1;
        }
        //bottom
        if (cobraY > qtdePeca - 1) {
            cobraY = 0;
        }

        //tabuleiro
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, stage.width, stage.height);
        //maca
        ctx.fillStyle = "red";
        ctx.fillRect(ax * peca, ay * peca, peca, peca);
        //cobra
        ctx.fillStyle = "green";

        //tratando calda
        for (var i = 0; i < trail.length; i++) {
            ctx.fillRect(trail[i].x * peca, trail[i].y * peca, peca - 1, peca - 1);
            if (trail[i].x == cobraX && trail[i].y == cobraY) {
                vx = vy = 0; //gameover
                tail = 5;
            }
        }
        trail.push({ x: cobraX, y: cobraY })
        while (trail.length > tail) {
            trail.shift(); //remove calda a cada pulo
        }

        //tratando captura da maca
        if (ax == cobraX && ay == cobraY) {
            tail++;
            ax = Math.floor(Math.random() * qtdePeca);
            ay = Math.floor(Math.random() * qtdePeca);
        }

    }

    var ultimaTecla; //impede colisao de re
    function keyPush(event) {
        //controladores
        if (true) {
            var tecla = event.keyCode;

            //left
            if (tecla == 37 && ultimaTecla != 39) {
                ultimaTecla = 37;
                vx = -vel;
                vy = 0;
            }
            //up
            if (tecla == 38 && ultimaTecla != 40) {
                ultimaTecla = 38;
                vx = 0;
                vy = -vel;
            }
            //right
            if (tecla == 39 && ultimaTecla != 37) {
                ultimaTecla = 39;
                vx = vel;
                vy = 0;
            }
            //down
            if (tecla == 40 && ultimaTecla != 38) {
                ultimaTecla = 40;
                vx = 0;
                vy = vel;
            }

        }
    }

}

