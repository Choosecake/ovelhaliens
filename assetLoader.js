class AssetLoader {
    constructor() {
        this.assets = {};
    }

    preloadAssets() {
        this.assets.tesouraAbertaImg = loadImage('assets/tesouraAberta.png');
        this.assets.tesouraFechadaImg = loadImage('assets/tesouraFechada.png');
        this.assets.ovelhaPadraoImg = loadImage('assets/ovelhaPadrao.png');
        this.assets.ovelhaAlienImg = loadImage('assets/ovelhaAlien.png');
        this.assets.ovelhaCafezinhoImg = loadImage('assets/ovelhaCafezinho.png');
        this.assets.ovelhaCervejinhaImg = loadImage('assets/ovelhaCervejinha.png');
        this.assets.ovelhaCogumelitaImg = loadImage('assets/ovelhaCogumelita.png');
        this.assets.ovelhaDocinhoImg = loadImage('assets/ovelhaDocinho.png');
        this.assets.ovelhaMoranguinhoImg = loadImage('assets/ovelhaMoranguinho.png');
        this.assets.ovelhaSorvetinhoImg = loadImage('assets/ovelhaSorvetinho.png');
        this.assets.ovelhaTrevosaImg = loadImage('assets/ovelhaTrevosa.png');
        this.assets.ovelhaPeladaImg = loadImage('assets/ovelhaPelada.png');
        this.assets.alienPeladaImg = loadImage('assets/alienPelada.png');
        this.assets.cafezinhoPeladaImg = loadImage('assets/cafezinhoPelada.png');
        this.assets.moranguinhoPeladaImg = loadImage('assets/moranguinhoPelada.png');
        this.assets.peloAmareloImg = loadImage('assets/peloAmarelo.png');
        this.assets.peloAzulImg = loadImage('assets/peloAzul.png');
        this.assets.peloBrancoImg = loadImage('assets/peloBranco.png');
        this.assets.peloCinzaImg = loadImage('assets/peloCinza.png');
        this.assets.peloRosaImg = loadImage('assets/peloRosa.png');
        this.assets.peloVerdeImg = loadImage('assets/peloVerde.png');
        this.assets.bgImg = loadImage('assets/grass.png');
    }

    getAsset(name) {
        return this.assets[name];
    }
}
