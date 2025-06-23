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
        this.assets.peloBrancoImg = loadImage('assets/peloBranco.png');
        this.assets.bgImg = loadImage('assets/grass.png');

        this.assets.alienImg = loadImage('assets/alien.png');
        this.assets.basicaImg = loadImage('assets/basica.png');
        this.assets.cafezinhoImg = loadImage('assets/cafezinho.png');
        this.assets.cervejinhaImg = loadImage('assets/cervejinha.png');
        this.assets.cogumelitoImg = loadImage('assets/cogumelito.png');
        this.assets.docinhoImg = loadImage('assets/docinho.png');
        this.assets.moranguinhoImg = loadImage('assets/moranguinho.png');
        this.assets.sorvetinhoImg = loadImage('assets/sorvetinho.png');
        this.assets.trevosinhoImg = loadImage('assets/trevosinho.png');
    }
    getAsset(name) {
        return this.assets[name];
    }
}