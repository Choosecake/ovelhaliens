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
const MAX_FALLING_WOOL_PIECES = 4;
