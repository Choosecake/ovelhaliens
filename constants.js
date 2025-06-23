const SCREEN_WIDTH = 500;
const SCREEN_HEIGHT = 500;
const INITIAL_TIMER = 60;
const MAX_SHEEP = 3;

const SHEEP_BODY_SIZE = 1024 / 8;
const APPEARING = 'appearing';
const ACTIVE = 'active';
const LEAVING = 'leaving';
const JUMPING_UP = 'jumping_up';
const JUMPING_DOWN = 'jumping_down';
const SHEEP_TYPES = ['padrao', 'alien', 'cafezinho', 'cervejinha', 'cogumelita', 'docinho', 'moranguinho', 'sorvetinho', 'trevosa'];

let allFallingWool = [];
const MAX_FALLING_WOOL_PIECES = 3;

// --- NOVAS CONSTANTES PARA A COLEÇÃO ---
const COLLECTION_ITEMS = [
    { name: 'básica', scoreRequired: 0, image: 'basica.png' }, 
    { name: 'alien', scoreRequired: 50, image: 'alien.png' },
    { name: 'cafezinho', scoreRequired: 100, image: 'cafezinho.png' },
    { name: 'cervejinha', scoreRequired: 150, image: 'cervejinha.png' },
    { name: 'cogumelito', scoreRequired: 200, image: 'cogumelito.png' },
    { name: 'docinho', scoreRequired: 250, image: 'docinho.png' },
    { name: 'moranguinho', scoreRequired: 300, image: 'moranguinho.png' },
    { name: 'sorvetinho', scoreRequired: 350, image: 'sorvetinho.png' },
    { name: 'trevosinho', scoreRequired: 400, image: 'trevosinho.png' }
];