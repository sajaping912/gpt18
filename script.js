const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const coffeeSteamVideo = document.getElementById('coffeeSteamVideo'); // 김 효과 비디오 요소

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// --- START: New variable and function for top offset calculation ---
let topOffset = 0;

function calculateTopOffset() {
  const topControlsElement = document.getElementById('topControls');
  if (topControlsElement) {
    topOffset = topControlsElement.offsetHeight;
  } else {
    topOffset = 0; // Default if element not found
  }
}
// Initial calculation attempt. More reliable calculation in startGame and resize.
calculateTopOffset();
// --- END: New variable and function for top offset calculation ---


window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  calculateTopOffset(); // Recalculate offset on resize
});

// --- START: 새로운 96개 영어 문장 ---
const sentences = [
  "What will we build with these big boxes?", // 1.txt
  "We will make a spaceship for our trip.", // 2.txt
  "When will they come to the backyard party?", // 3.txt
  "I will wear it because we fight monsters.", // 4.txt
  "When will they come to the backyard party?", // 5.txt
  "They will come right after their nap time.", // 6.txt
  "Where will you hide the birthday surprise gift?", // 7.txt
  "I will hide it under the big green slide.", // 8.txt
  "Who will bring the cake for the picnic today?", // 9.txt
  "My mom will bring it in her blue basket.", // 10.txt
  "How will we catch the tiny rainbow butterfly?", // 11.txt
  "We will use a net and be very gentle.", // 12.txt
  "What won’t you share from your lunchbox today?", // 13.txt
  "I won’t share my jelly because it’s special.", // 14.txt
  "Why won’t your sister play tag with us?", // 15.txt
  "She won’t play because she feels too sleepy.", // 16.txt
  "When won’t we have to clean our playroom?", // 17.txt
  "We won’t clean it if it's already tidy.", // 18.txt
  "Where won’t we be allowed to bring snacks?", // 19.txt
  "We won’t bring them into the library room.", // 20.txt
  "Who won’t join us at the zoo tomorrow?", // 21.txt
  "Grandpa won’t join us because of his knee.", // 22.txt
  "How won’t the toy car break again soon?", // 23.txt
  "It won’t break if we don’t crash it hard.", // 24.txt
  "What would you do with a flying carpet?", // 25.txt
  "I would fly to grandma’s house for cookies.", // 26.txt
  "Why would he cry after watching that movie?", // 27.txt
  "He would cry because the puppy got lost.", // 28.txt
  "When would we visit the underwater castle?", // 29.txt
  "We would visit it during our summer dream.", // 30.txt
  "Where would you go if you had fairy wings?", // 31.txt
  "I would fly to the rainbow island in sky.", // 32.txt
  "How would we talk to a tiny forest elf?", // 33.txt
  "We would whisper and use our magic ring.", // 34.txt
  "Who would help if our kite got stuck again?", // 35.txt
  "Dad would help us with his long stick.", // 36.txt
  "What wouldn’t you eat even if you were hungry?", // 37.txt
  "I wouldn’t eat broccoli ice cream, it’s yucky!", // 38.txt
  "Why wouldn’t your teddy bear come to tea time?", // 39.txt
  "He wouldn’t come because he was too sleepy.", // 40.txt
  "When wouldn’t we go outside to play together?", // 41.txt
  "We wouldn’t go if it started thunderstorming.", // 42.txt
  "Where wouldn’t you hide your secret treasure box?", // 43.txt
  "I wouldn’t hide it in the bathroom, too wet.", // 44.txt
  "How wouldn’t the snowman melt so quickly today?", // 45.txt
  "He wouldn’t melt if we built him in shade.", // 46.txt
  "Who wouldn’t laugh at your funny dance moves?", // 47.txt
  "Even the teacher wouldn’t stop laughing today.", // 48.txt
  "What can you do with this shiny rock?", // 49.txt
  "I can make it my secret magic stone.", // 50.txt
  "Why can we not play outside right now?", // 51.txt
  "It is raining and Mommy said it’s muddy.", // 52.txt
  "When can I see your new puppy again?", // 53.txt
  "You can come over after lunch tomorrow.", // 54.txt
  "Where can we hide from the space aliens?", // 55.txt
  "We can hide behind the big backyard tree.", // 56.txt
  "Who can help me fix my toy robot?", // 57.txt
  "My dad can fix it after his dinner.", // 58.txt
  "How can you jump so high like that?", // 59.txt
  "I practiced every day on my trampoline.", // 60.txt
  "What can’t you eat before dinner time?", // 61.txt
  "I can’t eat cookies before dinner time.", // 62.txt
  "Why can’t you open the cookie jar?", // 63.txt
  "I can’t open it because it’s locked tight.", // 64.txt
  "When can’t we go into the kitchen?", // 65.txt
  "We can’t go there when Mom is cooking.", // 66.txt
  "Where can’t he hide the cookie crumbs?", // 67.txt
  "He can’t hide them under the couch again.", // 68.txt
  "Who can’t keep the cookie secret long?", // 69.txt
  "She can’t keep secrets longer than two hours.", // 70.txt
  "How can’t they hear the cookie crunch?", // 71.txt
  "They can’t hear it with cartoons playing loudly.", // 72.txt
  "What could you find under the big bed?", // 73.txt
  "I could find my teddy bear under there.", // 74.txt
  "Why could he be hiding from us now?", // 75.txt
  "He could be scared of the vacuum cleaner noise.", // 76.txt
  "When could we start looking for him?", // 77.txt
  "We could start right after our afternoon snack.", // 78.txt
  "Where could it have gone last night?", // 79.txt
  "It could have rolled behind the toy chest.", // 80.txt
  "Who could have taken it to the garden?", // 81.txt
  "You could have taken it while playing outside.", // 82.txt
  "How could we bring him back safely?", // 83.txt
  "We could carry him in your superhero backpack.", // 84.txt
  "What couldn’t we play with in the rain?", // 85.txt
  "We couldn’t play with the paper kite outside.", // 86.txt
  "Why couldn’t you come to my puppet show?", // 87.txt
  "I couldn’t come because my boots were missing.", // 88.txt
  "When couldn’t they start the backyard race?", // 89.txt
  "They couldn’t start when the thunder was loud.", // 90.txt
  "Where couldn’t she set up her lemonade stand?", // 91.txt
  "She couldn’t set it up under the dripping tree.", // 92.txt
  "Who couldn’t join us for the snack picnic?", // 93.txt
  "He couldn’t join us because he caught a cold.", // 94.txt
  "How couldn’t we keep our socks from getting wet?", // 95.txt
  "We couldn’t keep them dry without rain boots on." // 96.txt
];
// --- END: 새로운 96개 영어 문장 ---

// --- START: 새로운 96개 한국어 번역 (자리 표시자) ---
const translations = [
  "이 큰 상자들로 무엇을 만들 건가요?", // 1.txt 번역 예시
  "우리는 여행을 위한 우주선을 만들 거예요.", // 2.txt 번역 예시
  "그들은 언제 뒷마당 파티에 올 건가요?", // 3.txt 번역 예시
  "우리가 괴물과 싸우니까 그걸 입을 거예요.", // 4.txt 번역 예시
  "그들은 언제 뒷마당 파티에 올 건가요?", // 5.txt 번역 예시
  "낮잠 시간 바로 후에 올 거예요.", // 6.txt 번역 예시
  "생일 깜짝 선물은 어디에 숨길 건가요?", // 7.txt 번역 예시
  "큰 초록색 미끄럼틀 아래에 숨길 거예요.", // 8.txt 번역 예시
  "오늘 소풍에 누가 케이크를 가져올 건가요?", // 9.txt 번역 예시
  "엄마가 파란 바구니에 담아 가져오실 거예요.", // 10.txt 번역 예시
  "작은 무지개 나비는 어떻게 잡을 건가요?", // 11.txt 번역 예시
  "그물을 사용하고 아주 부드럽게 다룰 거예요.", // 12.txt 번역 예시
  "오늘 점심 도시락에서 무엇을 나눠주지 않을 건가요?", // 13.txt 번역 예시
  "내 젤리는 특별해서 나눠주지 않을 거예요.", // 14.txt 번역 예시
  "언니는 왜 우리랑 술래잡기를 안 하나요?", // 15.txt 번역 예시
  "너무 졸려서 안 할 거예요.", // 16.txt 번역 예시
  "언제 놀이방 청소를 안 해도 되나요?", // 17.txt 번역 예시
  "이미 깨끗하면 청소 안 할 거예요.", // 18.txt 번역 예시
  "어디에 간식을 가져가면 안 되나요?", // 19.txt 번역 예시
  "도서관에는 가져가지 않을 거예요.", // 20.txt 번역 예시
  "내일 동물원에 누가 같이 안 가나요?", // 21.txt 번역 예시
  "할아버지는 무릎 때문에 같이 안 가실 거예요.", // 22.txt 번역 예시
  "장난감 자동차가 어떻게 하면 곧 다시 고장 나지 않을까요?", // 23.txt 번역 예시
  "세게 부딪치지 않으면 고장 나지 않을 거예요.", // 24.txt 번역 예시
  "하늘을 나는 양탄자가 있다면 무엇을 할 건가요?", // 25.txt 번역 예시
  "할머니 댁에 쿠키 먹으러 날아갈 거예요.", // 26.txt 번역 예시
  "그는 왜 그 영화를 보고 울었을까요?", // 27.txt 번역 예시
  "강아지를 잃어버려서 울었을 거예요.", // 28.txt 번역 예시
  "언제 수중 성을 방문할 건가요?", // 29.txt 번역 예시
  "여름 꿈속에서 방문할 거예요.", // 30.txt 번역 예시
  "요정 날개가 있다면 어디로 갈 건가요?", // 31.txt 번역 예시
  "하늘에 있는 무지개 섬으로 날아갈 거예요.", // 32.txt 번역 예시
  "작은 숲 속 요정과 어떻게 이야기할 건가요?", // 33.txt 번역 예시
  "속삭이고 마법 반지를 사용할 거예요.", // 34.txt 번역 예시
  "연이 다시 걸리면 누가 도와줄까요?", // 35.txt 번역 예시
  "아빠가 긴 막대기로 도와주실 거예요.", // 36.txt 번역 예시
  "배가 고파도 절대 먹지 않을 것은 무엇인가요?", // 37.txt 번역 예시
  "브로콜리 아이스크림은 안 먹을 거예요, 맛없어요!", // 38.txt 번역 예시
  "곰 인형은 왜 티타임에 오지 않았나요?", // 39.txt 번역 예시
  "너무 졸려서 오지 않았을 거예요.", // 40.txt 번역 예시
  "언제 밖에 나가서 같이 놀지 않을 건가요?", // 41.txt 번역 예시
  "천둥 번개가 치기 시작하면 안 나갈 거예요.", // 42.txt 번역 예시
  "비밀 보물 상자를 어디에 숨기지 않을 건가요?", // 43.txt 번역 예시
  "화장실에는 숨기지 않을 거예요, 너무 축축해요.", // 44.txt 번역 예시
  "눈사람이 오늘 어떻게 하면 빨리 녹지 않을까요?", // 45.txt 번역 예시
  "그늘에 만들면 녹지 않을 거예요.", // 46.txt 번역 예시
  "누가 당신의 웃긴 춤 동작을 보고 웃지 않을까요?", // 47.txt 번역 예시
  "선생님조차도 오늘 웃음을 멈추지 못했을 거예요.", // 48.txt 번역 예시
  "이 반짝이는 돌로 무엇을 할 수 있나요?", // 49.txt 번역 예시
  "나의 비밀 마법 돌로 만들 수 있어요.", // 50.txt 번역 예시
  "왜 지금 밖에 나가서 놀 수 없나요?", // 51.txt 번역 예시
  "비가 오고 엄마가 진흙탕이라고 하셨어요.", // 52.txt 번역 예시
  "언제 새 강아지를 다시 볼 수 있나요?", // 53.txt 번역 예시
  "내일 점심 먹고 놀러 와도 돼요.", // 54.txt 번역 예시
  "우주 외계인으로부터 어디에 숨을 수 있나요?", // 55.txt 번역 예시
  "뒷마당 큰 나무 뒤에 숨을 수 있어요.", // 56.txt 번역 예시
  "누가 내 장난감 로봇 고치는 것을 도와줄 수 있나요?", // 57.txt 번역 예시
  "아빠가 저녁 식사 후에 고쳐주실 수 있어요.", // 58.txt 번역 예시
  "어떻게 그렇게 높이 뛸 수 있나요?", // 59.txt 번역 예시
  "매일 트램펄린에서 연습했어요.", // 60.txt 번역 예시
  "저녁 식사 전에 무엇을 먹으면 안 되나요?", // 61.txt 번역 예시
  "저녁 식사 전에는 쿠키를 먹을 수 없어요.", // 62.txt 번역 예시
  "왜 쿠키 단지를 열 수 없나요?", // 63.txt 번역 예시
  "단단히 잠겨 있어서 열 수 없어요.", // 64.txt 번역 예시
  "언제 부엌에 들어가면 안 되나요?", // 65.txt 번역 예시
  "엄마가 요리하실 때는 거기에 가면 안 돼요.", // 66.txt 번역 예시
  "그는 쿠키 부스러기를 어디에 숨길 수 없나요?", // 67.txt 번역 예시
  "소파 밑에는 다시 숨길 수 없을 거예요.", // 68.txt 번역 예시
  "누가 쿠키 비밀을 오래 지키지 못하나요?", // 69.txt 번역 예시
  "그녀는 두 시간 이상 비밀을 지키지 못해요.", // 70.txt 번역 예시
  "그들은 어떻게 쿠키 바삭거리는 소리를 듣지 못할까요?", // 71.txt 번역 예시
  "만화가 시끄럽게 틀어져 있어서 듣지 못해요.", // 72.txt 번역 예시
  "큰 침대 밑에서 무엇을 찾을 수 있었나요?", // 73.txt 번역 예시
  "거기서 내 곰 인형을 찾을 수 있었어요.", // 74.txt 번역 예시
  "그는 왜 지금 우리에게서 숨어 있을까요?", // 75.txt 번역 예시
  "진공청소기 소리를 무서워할 수도 있어요.", // 76.txt 번역 예시
  "언제 그를 찾기 시작할 수 있을까요?", // 77.txt 번역 예시
  "오후 간식 먹고 바로 시작할 수 있어요.", // 78.txt 번역 예시
  "어젯밤에 그것은 어디로 갔을까요?", // 79.txt 번역 예시
  "장난감 상자 뒤로 굴러갔을 수도 있어요.", // 80.txt 번역 예시
  "누가 그것을 정원으로 가져갔을까요?", // 81.txt 번역 예시
  "밖에서 놀다가 네가 가져갔을 수도 있어.", // 82.txt 번역 예시
  "어떻게 그를 안전하게 데려올 수 있을까요?", // 83.txt 번역 예시
  "너의 슈퍼히어로 배낭에 넣어 데려올 수 있어.", // 84.txt 번역 예시
  "비 오는 날에는 무엇을 가지고 놀 수 없었나요?", // 85.txt 번역 예시
  "종이 연은 밖에서 가지고 놀 수 없었어요.", // 86.txt 번역 예시
  "왜 내 인형극에 오지 못했나요?", // 87.txt 번역 예시
  "장화가 없어져서 오지 못했어요.", // 88.txt 번역 예시
  "언제 그들은 뒷마당 경주를 시작할 수 없었나요?", // 89.txt 번역 예시
  "천둥소리가 클 때는 시작할 수 없었어요.", // 90.txt 번역 예시
  "그녀는 레모네이드 가판대를 어디에 설치할 수 없었나요?", // 91.txt 번역 예시
  "물이 뚝뚝 떨어지는 나무 아래에는 설치할 수 없었어요.", // 92.txt 번역 예시
  "누가 간식 소풍에 우리와 함께하지 못했나요?", // 93.txt 번역 예시
  "그는 감기에 걸려서 우리와 함께하지 못했어요.", // 94.txt 번역 예시
  "양말이 젖지 않게 하려면 어떻게 해야 했을까요?", // 95.txt 번역 예시
  "장화를 신지 않고는 마른 상태로 유지할 수 없었어요." // 96.txt
];
// --- END: 새로운 96개 한국어 번역 ---


let sentenceIndex = Number(localStorage.getItem('sentenceIndex') || 0);
sentenceIndex = sentenceIndex % sentences.length; // Ensure it's within bounds

const playerImg = new Image();
playerImg.src = 'images/player.png';

const enemyImgs = [
  'images/enemy1.png', // 0
  'images/enemy2.png', // 1 (coffee cup)
  'images/enemy3.png', // 2 (cosmos)
  'images/enemy4.png', // 3 (maple leaf)
  'images/enemy5.png'  // 4
].map(src => {
  const img = new Image();
  img.src = src;
  return img;
});

const bulletImg = new Image();
bulletImg.src = 'images/bubble_bullet.png';

const bgmFiles = [
  'sounds/background.mp3'
];
let bgmIndex = 0;
let bgmAudio = new Audio(bgmFiles[bgmIndex]);
bgmAudio.volume = 0.021;
bgmAudio.loop = true;

const volumeBtn = document.getElementById('volumeBtn');
let isMuted = false;
function updateVolumeIcon() {
  volumeBtn.textContent = isMuted ? "🔇" : "🔊";
}

let currentSentenceAudio = null;

async function playSentenceAudio(index) {
  return new Promise((resolve, reject) => {
    if (currentSentenceAudio) {
      currentSentenceAudio.pause();
      currentSentenceAudio.currentTime = 0;
      currentSentenceAudio.onended = null;
      currentSentenceAudio.onerror = null;
    }

    const audioFilePath = `sounds/96_audio/${index + 1}.mp3`;
    currentSentenceAudio = new Audio(audioFilePath);
    currentSentenceAudio.volume = 0.8;

    currentSentenceAudio.onended = () => {
      currentSentenceAudio = null;
      resolve();
    };
    currentSentenceAudio.onerror = (e) => {
      console.error(`Error playing sentence audio: ${audioFilePath}`, e);
      currentSentenceAudio = null;
      reject(e);
    };

    currentSentenceAudio.play().catch(e => {
      console.error(`Failed to play ${audioFilePath}`, e);
      currentSentenceAudio = null;
      reject(e);
    });
  });
}


volumeBtn.onclick = function () {
  isMuted = !isMuted;
  const targetVolume = isMuted ? 0 : 0.021;
  if (bgmAudio) {
    bgmAudio.volume = targetVolume;
    if (!isMuted && bgmAudio.paused && isGameRunning && !isGamePaused) {
      bgmAudio.play().catch(e => console.error("BGM play on unmute error:", e));
    }
  }
  updateVolumeIcon();
};
updateVolumeIcon();


const sounds = {
  shoot: new Audio('sounds/shoot.mp3'),
  explosion: new Audio('sounds/explosion.mp3')
};
sounds.shoot.volume = 0.05;
sounds.explosion.volume = 0.05;

setInterval(() => {
  if (bgmAudio) {
    const targetVolume = isMuted ? 0 : 0.021;
    if (bgmAudio.volume !== targetVolume) {
      bgmAudio.volume = targetVolume;
    }
  }
}, 1000);


let allAssetsReady = false;
let assetsToLoad = 1 + enemyImgs.length + 1;
let loadedAssetCount = 0;
let coffeeVideoAssetReady = false;

function assetLoaded() {
  loadedAssetCount++;
  checkAllAssetsReady();
}

function coffeeVideoReady() {
  if (!coffeeVideoAssetReady) {
    coffeeVideoAssetReady = true;
    checkAllAssetsReady();
  }
}

function coffeeVideoError() {
  if (!coffeeVideoAssetReady) {
    console.error("Coffee steam video could not be loaded. Steam effect will be disabled.");
    coffeeVideoAssetReady = true;
    checkAllAssetsReady();
  }
}

function checkAllAssetsReady() {
  if (loadedAssetCount >= assetsToLoad && coffeeVideoAssetReady) {
    allAssetsReady = true;
    console.log("All game assets (images and video) are ready.");
  }
}

playerImg.onload = assetLoaded;
playerImg.onerror = () => { console.error("Failed to load player image."); assetLoaded(); };

enemyImgs.forEach(img => {
  img.onload = assetLoaded;
  img.onerror = () => { console.error(`Failed to load enemy image: ${img.src}`); assetLoaded(); };
});

bulletImg.onload = assetLoaded;
bulletImg.onerror = () => { console.error("Failed to load bullet image."); assetLoaded(); };


if (coffeeSteamVideo) {
  coffeeSteamVideo.oncanplaythrough = coffeeVideoReady;
  coffeeSteamVideo.onerror = coffeeVideoError;
  if (coffeeSteamVideo.readyState >= HTMLVideoElement.HAVE_ENOUGH_DATA) coffeeVideoReady();
  else if (coffeeSteamVideo.error) coffeeVideoError();
} else {
  console.warn("coffeeSteamVideo element not found in HTML. Assuming ready without steam effect.");
  coffeeVideoAssetReady = true;
  checkAllAssetsReady();
}


const PLAYER_SIZE = 50;
const ENEMY_SIZE = 40;
const ENEMY_MOVEMENT_SPEED_PPS = 60;

const MIN_BUBBLE_SIZE = 15;
const MAX_BUBBLE_SIZE = 35;

const BUBBLE_BASE_SPEED_Y_PPS = -120;
const BUBBLE_SPEED_Y_VARIATION_PPS = 40;

const BUBBLE_SWAY_FREQUENCY_MIN = 1.5;
const BUBBLE_SWAY_FREQUENCY_MAX = 3.5;

const BUBBLE_SWAY_AMPLITUDE_FACTOR_MIN = 0.3;
const BUBBLE_SWAY_AMPLITUDE_FACTOR_MAX = 0.8;

const BUBBLE_HORIZONTAL_DRIFT_PPS_MAX = 25;

const PETAL_SIZE = 20;
const PETAL_FALL_SPEED_PPS = 25;
const PETAL_ROTATION_SPEED_BASE = 1.5;
const PETAL_SWAY_AMPLITUDE_BASE = 12;
const PETAL_SWAY_SPEED_BASE = 1.8;
const PETAL_DRIFT_X_PPS_BASE = 30;
const PETAL_FLUTTER_AMPLITUDE_BASE = 3.5;
const PETAL_FLUTTER_SPEED_BASE = 3.0;

const SENTENCE_VERTICAL_ADJUSTMENT = -86;
const ANSWER_OFFSET_Y = 82;
const LINE_HEIGHT = 30;
const PLAYER_TOUCH_Y_OFFSET = 15;

let player = { x: 0, y: 0, w: PLAYER_SIZE, h: PLAYER_SIZE };
let bullets = [];
let enemies = [];
let enemyBullets = [];
let detachedPetals = [];

let isGameRunning = false;
let isGamePaused = false;
let lastTime = 0;

const burstColors = [
  '#FF5252', '#FF9800', '#FFD600', '#4CAF50', '#2196F3',
  '#9C27B0', '#E040FB', '#00BCD4', '#FFEB3B', '#FF69B4'
];

let fireworks = null;
let fireworksState = null;

let currentQuestionSentence = null;
let currentAnswerSentence = null;
let currentQuestionSentenceIndex = null;
let currentAnswerSentenceIndex = null;

let centerAlpha = 1.0;
let sentenceActive = false;

let showPlayButton = false;
let playButtonRect = null;
let showPlayButtonQuestion = false;
let playButtonRectQuestion = null;

let showTranslationForQuestion = false;
let showTranslationForAnswer = false;
let isActionLocked = false;

let centerSentenceWordRects = [];
let activeWordTranslation = null;
let wordTranslationTimeoutId = null;
const WORD_TRANSLATION_DURATION = 3000;

const MODAL_AUX = [
  "can", "cant", "cannot", "could", "couldnt", "will", "would", "shall", "should",
  "may", "might", "must", "wont", "wouldnt", "shant", "shouldnt", "maynt", "mightnt", "mustnt"
];
const DO_AUX = [
  "do", "does", "did", "dont", "doesnt", "didnt"
];
const notVerbIng = [
  "morning", "evening", "everything", "anything", "nothing", "something",
  "building", "ceiling", "meeting", "feeling", "wedding", "clothing"
];

function isAux(word) {
  const lowerWord = word.toLowerCase().replace(/[^a-z0-9']/g, '');
  return MODAL_AUX.includes(lowerWord) || DO_AUX.includes(lowerWord);
}
function isWh(word) {
  const whs = ["what","when","where","who","whom","whose","which","why","how"];
  return whs.includes(word.toLowerCase().replace(/[^a-z0-9]/g, ''));
}
function isVerb(word) {
  const verbs = [
    "build", "make", "come", "wear", "fight", "hide", "bring", "catch", "use", "share", "play", "feel", "clean",
    "allowed", "join", "break", "crash", "do", "fly", "cry", "got", "lost", "visit", "talk", "help", "stuck", "eat",
    "go", "melt", "laugh", "can", "see", "fix", "jump", "practiced", "open", "hear", "find", "hiding", "start",
    "taken", "rolled", "bring", "carry", "set", "keep"
    , "be", "is", "am", "are", "was", "were"
  ];
  const lowerWord = word.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (lowerWord === "bringback") return true;
  if (lowerWord === "setup") return true;
  return verbs.some(v => lowerWord === v || lowerWord.startsWith(v));
}
function isVing(word) {
  let lw = word.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (notVerbIng.includes(lw)) return false;
  if (lw.endsWith('ing') && lw.length > 3) {
    let base = lw.slice(0, -3);
    if (base.endsWith('e') && !base.endsWith('ee') && base !== 'be' && base.length > 1) {
        if(isVerb(base)) return true;
        if(isVerb(base + 'e')) return true;
        if (base.endsWith('i')) {
             base = base.slice(0, -1) + 'e';
        }
    } else if (base.length > 1 && base.charAt(base.length -1) === base.charAt(base.length-2) && !['ss','ll','ff','zz'].includes(base.slice(-2))) {
        base = base.slice(0,-1);
    }
    return isVerb(base) || (base.endsWith('y') && isVerb(base.slice(0, -1) + 'ie'));
  }
  return false;
}
function isBeen(word) {
  return word.toLowerCase().replace(/[^a-z0-9]/g, '') === 'been';
}
function isQuestion(sentenceText) {
  return sentenceText.trim().endsWith('?');
}

// --- START: New isPastParticiple function ---
function isPastParticiple(word) {
    const lowerWord = word.toLowerCase().replace(/[^a-z]/g, ''); // Keep only letters
    if (!lowerWord) return false;

    const irregularPPs = [
        "been", "begun", "broken", "brought", "built", "bought", "caught", "chosen", "come", "cost",
        "cut", "done", "drawn", "dreamt", "dreamed", "drunk", "driven", "eaten", "fallen", "felt",
        "fought", "found", "flown", "forgotten", "forgiven", "frozen", "got", "gotten", "given",
        "gone", "grown", "hung", "had", "heard", "hidden", "hit", "held", "hurt", "kept",
        "known", "laid", "led", "left", "lent", "let", "lain", "lit", "lost", "made",
        "meant", "met", "paid", "put", "quit", "read", "ridden", "rung", "risen", "run",
        "said", "seen", "sold", "sent", "set", "shaken", "shone", "shot", "shown", "shut",
        "sung", "sunk", "sat", "slept", "spoken", "spent", "spread", "stood", "stolen",
        "stuck", "sworn", "swept", "swum", "taken", "taught", "torn", "told", "thought",
        "thrown", "understood", "woken", "worn", "won", "written"
    ];

    if (irregularPPs.includes(lowerWord)) {
        return true;
    }

    if (lowerWord.length > 2 && lowerWord.endsWith("ed")) {
        const nonVerbEdEndings = ["bed", "red", "shed", "wed"];
        if (nonVerbEdEndings.includes(lowerWord)) return false;
        return true;
    }
    return false;
}
// --- END: New isPastParticiple function ---

async function getWordTranslation(word, targetLang = 'ko') {
  const cleanedWord = word.replace(/[^a-zA-Z0-9]/g, "").toLowerCase().trim();
  if (!cleanedWord) return "Error: Invalid word";

  await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 100));

  const mockTranslations = {
    "what": "무엇",
    "will": "～할 것이다",
    "we": "우리",
    "build": "짓다",
    "with": "～으로",
    "these": "이것들",
    "big": "큰",
    "boxes": "상자들",
    "make": "만들다",
    "a": "하나의",
    "spaceship": "우주선",
    "for": "～을 위한",
    "our": "우리의",
    "trip": "여행",
    "when": "언제",
    "they": "그들",
    "come": "오다",
    "to": "～으로",
    "the": "그",
    "backyard": "뒷마당",
    "party": "파티",
    "i": "나",
    "wear": "입다",
    "it": "그것",
    "because": "왜냐하면",
    "fight": "싸우다",
    "monsters": "괴물들",
    "right": "바로",
    "after": "～후에",
    "their": "그들의",
    "nap": "낮잠",
    "time": "시간",
    "where": "어디에",
    "you": "너",
    "hide": "숨기다",
    "birthday": "생일",
    "surprise": "깜짝 선물",
    "gift": "선물",
    "under": "～아래에",
    "green": "초록색",
    "slide": "미끄럼틀",
    "who": "누가",
    "bring": "가져오다",
    "cake": "케이크",
    "picnic": "소풍",
    "today": "오늘",
    "my": "나의",
    "mom": "엄마",
    "in": "～안에",
    "her": "그녀의",
    "blue": "파란",
    "basket": "바구니",
    "how": "어떻게",
    "catch": "잡다",
    "tiny": "아주 작은",
    "rainbow": "무지개",
    "butterfly": "나비",
    "net": "그물",
    "and": "그리고",
    "be": "이다",
    "very": "매우",
    "gentle": "부드러운",
    "wont": "～하지 않을 것이다",
    "share": "공유하다",
    "from": "～로부터",
    "your": "너의",
    "lunchbox": "점심 도시락",
    "jelly": "젤리",
    "special": "특별한",
    "why": "왜",
    "sister": "자매/언니/누나",
    "play": "놀다",
    "tag": "술래잡기",
    "us": "우리",
    "she": "그녀",
    "feels": "느끼다",
    "too": "너무",
    "sleepy": "졸린",
    "have": "가지다",
    "clean": "청소하다",
    "playroom": "놀이방",
    "if": "만약",
    "already": "이미",
    "tidy": "단정한",
    "allowed": "허용된",
    "snacks": "간식",
    "library": "도서관",
    "room": "방",
    "tomorrow": "내일",
    "zoo": "동물원",
    "grandpa": "할아버지",
    "his": "그의",
    "knee": "무릎",
    "toy": "장난감",
    "car": "자동차",
    "break": "고장나다",
    "again": "다시",
    "soon": "곧",
    "dont": "～하지 않다",
    "crash": "충돌하다",
    "hard": "세게",
    "would": "～일 것이다 (가정)",
    "do": "하다",
    "flying": "나는",
    "carpet": "양탄자",
    "fly": "날다",
    "grandmas": "할머니의",
    "house": "집",
    "cookies": "쿠키",
    "he": "그",
    "cry": "울다",
    "watching": "보는 중",
    "movie": "영화",
    "puppy": "강아지",
    "got": "되었다",
    "lost": "잃어버린",
    "visit": "방문하다",
    "underwater": "물속의",
    "castle": "성",
    "during": "～동안",
    "summer": "여름",
    "dream": "꿈",
    "had": "가졌었다",
    "fairy": "요정",
    "wings": "날개",
    "island": "섬",
    "sky": "하늘",
    "talk": "말하다",
    "forest": "숲",
    "elf": "요정",
    "whisper": "속삭이다",
    "use": "사용하다",
    "magic": "마법",
    "ring": "반지",
    "kite": "연",
    "stuck": "걸린",
    "dad": "아빠",
    "help": "돕다",
    "long": "긴",
    "stick": "막대기",
    "wouldnt": "～하지 않을 것이다 (가정)",
    "eat": "먹다",
    "even": "심지어",
    "hungry": "배고픈",
    "broccoli": "브로콜리",
    "ice": "얼음",
    "cream": "크림",
    "yucky": "역겨운",
    "teddy": "테디베어",
    "bear": "곰",
    "tea": "차",
    "outside": "밖에",
    "together": "함께",
    "started": "시작했다",
    "thunderstorming": "뇌우가 치는",
    "secret": "비밀",
    "treasure": "보물",
    "box": "상자",
    "bathroom": "욕실",
    "wet": "젖은",
    "snowman": "눈사람",
    "melt": "녹다",
    "quickly": "빨리",
    "built": "지었다",
    "shade": "그늘",
    "laugh": "웃다",
    "funny": "웃기는",
    "dance": "춤",
    "moves": "동작",
    "teacher": "선생님",
    "stop": "멈추다",
    "laughing": "웃는 중",
    "can": "～할 수 있다",
    "shiny": "빛나는",
    "rock": "돌",
    "stone": "돌",
    "cannot": "～할 수 없다",
    "now": "지금",
    "raining": "비가 오는",
    "mommy": "엄마",
    "said": "말했다",
    "muddy": "진흙탕의",
    "see": "보다",
    "new": "새로운",
    "over": "～너머로",
    "lunch": "점심",
    "space": "우주",
    "aliens": "외계인",
    "behind": "～뒤에",
    "tree": "나무",
    "fix": "고치다",
    "robot": "로봇",
    "dinner": "저녁",
    "jump": "뛰다",
    "so": "그렇게",
    "high": "높이",
    "like": "～처럼",
    "that": "저것",
    "practiced": "연습했다",
    "every": "매",
    "day": "날",
    "trampoline": "트램펄린",
    "cant": "～할 수 없다",
    "before": "～전에",
    "open": "열다",
    "jar": "단지",
    "locked": "잠긴",
    "tight": "단단히",
    "kitchen": "부엌",
    "cooking": "요리하는 중",
    "crumbs": "부스러기",
    "couch": "소파",
    "keep": "유지하다",
    "secrets": "비밀들",
    "longer": "더 오래",
    "than": "～보다",
    "hours": "시간들",
    "hear": "듣다",
    "crunch": "바삭거리는 소리",
    "cartoons": "만화",
    "playing": "재생 중",
    "loudly": "시끄럽게",
    "could": "～할 수 있었다",
    "find": "찾다",
    "there": "거기에",
    "hiding": "숨는 중",
    "scared": "무서워하는",
    "of": "～의",
    "vacuum": "진공청소기",
    "cleaner": "청소기",
    "noise": "소음",
    "looking": "찾는 중",
    "him": "그를",
    "snack": "간식",
    "gone": "사라진",
    "last": "지난",
    "night": "밤",
    "rolled": "굴러갔다",
    "chest": "상자",
    "taken": "가져간",
    "garden": "정원",
    "while": "～하는 동안",
    "safely": "안전하게",
    "carry": "나르다",
    "superhero": "슈퍼히어로",
    "backpack": "배낭",
    "couldnt": "～할 수 없었다",
    "paper": "종이",
    "show": "보여주다",
    "puppet": "인형",
    "missing": "사라진",
    "race": "경주",
    "thunder": "천둥",
    "loud": "시끄러운",
    "lemonade": "레모네이드",
    "stand": "가판대",
    "dripping": "물이 떨어지는",
    "caught": "걸렸다",
    "cold": "감기",
    "socks": "양말",
    "getting": "되는 중",
    "dry": "마른",
    "without": "～없이",
    "rain": "비",
    "boots": "장화"
  };

  if (mockTranslations[cleanedWord]) {
    return mockTranslations[cleanedWord];
  }
  console.warn(`Translation not found for: ${cleanedWord}. Returning placeholder.`);
  return `[${cleanedWord} 뜻]`;
}

let voicesPromise = null;
let _voices = [];

function getVoicesReliably() {
    if (voicesPromise && _voices.length > 0) {
        return Promise.resolve(_voices);
    }
    if (!voicesPromise) {
        voicesPromise = new Promise((resolve, reject) => {
            const tryGetAndResolveVoices = () => {
                const currentVoices = window.speechSynthesis.getVoices();
                if (currentVoices.length) {
                    _voices = currentVoices;
                    resolve(_voices);
                    return true;
                }
                return false;
            };
            if (tryGetAndResolveVoices()) return;
            if ('onvoiceschanged' in window.speechSynthesis) {
                window.speechSynthesis.onvoiceschanged = () => {
                    if (tryGetAndResolveVoices()) {
                        window.speechSynthesis.onvoiceschanged = null;
                    } else {
                         setTimeout(() => {
                            if(tryGetAndResolveVoices()){
                                window.speechSynthesis.onvoiceschanged = null;
                            } else {
                                console.warn("getVoicesReliably: Voices NOT loaded even after onvoiceschanged + delay.");
                                resolve([]);
                                window.speechSynthesis.onvoiceschanged = null;
                            }
                        }, 200);
                    }
                };
                window.speechSynthesis.getVoices();
            } else {
                let attempts = 0;
                const maxAttempts = 20;
                const intervalId = setInterval(() => {
                    attempts++;
                    if (tryGetAndResolveVoices()) {
                        clearInterval(intervalId);
                    } else if (attempts >= maxAttempts) {
                        clearInterval(intervalId);
                        console.warn("getVoicesReliably: Voices NOT loaded after multiple polling attempts.");
                        resolve([]);
                    }
                }, 200);
            }
        }).catch(error => {
            console.error("Error within getVoicesReliably promise:", error);
            voicesPromise = null;
            _voices = [];
            return [];
        });
    }
    return voicesPromise;
}

async function getVoice(lang = 'en-US', gender = 'female') {
  let availableVoices;
  try {
    availableVoices = await getVoicesReliably();
  } catch (error) {
    console.error("getVoice: Failed to load voices from getVoicesReliably:", error);
    return null;
  }

  if (!availableVoices || availableVoices.length === 0) {
      console.warn("getVoice: No voices available after getVoicesReliably resolved.");
      return null;
  }

  const langNormalized = lang.toLowerCase();
  const langVoices = availableVoices.filter(v => v.lang.toLowerCase() === langNormalized);

  if (langVoices.length === 0) {
    const primaryLang = langNormalized.split('-')[0];
    const primaryLangVoices = availableVoices.filter(v => v.lang.toLowerCase().startsWith(primaryLang));
    if (primaryLangVoices.length > 0) {
        return primaryLangVoices[0];
    }
  } else {
    if (gender === 'female') {
        const femaleVoices = langVoices.filter(v => v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('zira') || v.name.toLowerCase().includes('samantha') || v.name.toLowerCase().includes('susan') || v.name.toLowerCase().includes('eva') || v.name.toLowerCase().includes('google us english') || v.name.toLowerCase().includes('여자') || v.name.toLowerCase().includes(' 여성'));
        if (femaleVoices.length > 0) return femaleVoices[0];
    } else if (gender === 'male') {
        const maleVoices = langVoices.filter(v => v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('daniel') || v.name.toLowerCase().includes('tom') || v.name.toLowerCase().includes('google us english') || v.name.toLowerCase().includes('남자') || v.name.toLowerCase().includes(' 남성'));
        if (maleVoices.length > 0) return maleVoices[0];
    }
    return langVoices[0];
  }

  const defaultVoice = availableVoices.find(v => v.default);
  if (defaultVoice) return defaultVoice;
  if (availableVoices.length > 0) return availableVoices[0];

  console.warn("getVoice: Exhausted all fallbacks. No voice found.");
  return null;
}


async function speakWord(word) {
  const cleanWord = word.replace(/[^a-zA-Z0-9]/g, "").trim();
  if (!cleanWord) return;

  try {
    await getVoicesReliably();
  } catch (error) {
    console.error(`speakWord: Critical error ensuring voices were loaded for word "${cleanWord}":`, error);
    return;
  }

  return new Promise(async (resolve, reject) => {
    try {
      const utter = new window.SpeechSynthesisUtterance(cleanWord);
      utter.lang = 'en-US';
      utter.rate = 0.92;
      utter.pitch = 1.0;
      utter.volume = 1.0;

      const voice = await getVoice('en-US', 'female');
      if (voice) {
        utter.voice = voice;
      } else {
        console.warn(`speakWord: No specific voice found for 'en-US' female for word "${cleanWord}". Using system default for this lang if available.`);
      }

      utter.onend = () => resolve();
      utter.onerror = (event) => {
        console.error(`speakWord: Event 'onerror' for word "${cleanWord}". Error: ${event.error}`, event);
        reject(event.error || new Error(`Unknown speech synthesis error for "${cleanWord}"`));
      };
      window.speechSynthesis.speak(utter);
    } catch (error) {
        console.error(`speakWord: Exception during speakWord execution for "${cleanWord}":`, error);
        reject(error);
    }
  });
}

const englishFont = "21.168px Arial";
const translationFont = "17.0px Arial";

// =======================================================================
// START OF MODIFIED splitSentence FUNCTION
// =======================================================================
function splitSentence(sentenceText, isCurrentlyQuestion = null) {
    if (!sentenceText) return ["", ""];
    const words = sentenceText.trim().split(" ");
    const originalSentenceForShortCheck = sentenceText.trim();

    let line1Words = [];
    let line2Words = [];

    let modalHavePpFoundAndSplit = false;

    for (let i = 0; i < words.length; i++) {
        if (isAux(words[i])) {
            let modalIdx = i;
            let haveIdx = -1;
            let ppIdx = -1;

            if (modalIdx + 2 < words.length &&
                words[modalIdx + 1].toLowerCase().replace(/'/g, "") === "have" &&
                isPastParticiple(words[modalIdx + 2])) {
                haveIdx = modalIdx + 1;
                ppIdx = modalIdx + 2;
            }
            else if (modalIdx + 3 < words.length &&
                     words[modalIdx + 2].toLowerCase().replace(/'/g, "") === "have" &&
                     isPastParticiple(words[modalIdx + 3])) {
                haveIdx = modalIdx + 2;
                ppIdx = modalIdx + 3;
            }

            if (ppIdx !== -1) {
                let endIndexForLine1 = ppIdx + 1;
                line1Words = words.slice(0, endIndexForLine1);
                line2Words = words.slice(endIndexForLine1);
                modalHavePpFoundAndSplit = true;
                break;
            }
        }
    }

    if (!modalHavePpFoundAndSplit) {
        const isEffectiveQuestionType = (isCurrentlyQuestion !== null) ? isCurrentlyQuestion : originalSentenceForShortCheck.endsWith('?');
        let wordsConsumed = 0;
        let wordsConsumedForLine1 = 0;

        if (isEffectiveQuestionType) {
            if (words.length > 0) {
                if (isWh(words[0])) {
                    line1Words.push(words[0]); wordsConsumed = 1;
                    if (wordsConsumed < words.length && isAux(words[wordsConsumed])) {
                        line1Words.push(words[wordsConsumed++]);
                        if (wordsConsumed < words.length) {
                            line1Words.push(words[wordsConsumed++]);
                            if (wordsConsumed < words.length && isVerb(words[wordsConsumed]) && !isAux(words[wordsConsumed])) {
                                line1Words.push(words[wordsConsumed++]);
                            }
                        }
                    } else if (wordsConsumed < words.length && (isVerb(words[wordsConsumed]) && !isAux(words[wordsConsumed]))) {
                        line1Words.push(words[wordsConsumed++]);
                    } else if (wordsConsumed < words.length) {
                        line1Words.push(words[wordsConsumed++]);
                        if (wordsConsumed < words.length && (isAux(words[wordsConsumed]) || (isVerb(words[wordsConsumed]) && !isAux(words[wordsConsumed])) ) ) {
                            if (line1Words.length < 4) { line1Words.push(words[wordsConsumed++]); }
                        }
                    }
                } else if (isAux(words[0])) {
                    line1Words.push(words[0]); wordsConsumed = 1;
                    if (wordsConsumed < words.length) {
                        line1Words.push(words[wordsConsumed++]);
                        if (wordsConsumed < words.length && isVerb(words[wordsConsumed]) && !isAux(words[wordsConsumed])) {
                            line1Words.push(words[wordsConsumed++]);
                        }
                    }
                }
            }
            if (line1Words.length === 0 && words.length > 0) {
                let splitIdx = (words.length <= 3) ? words.length : Math.min(2, words.length);
                if (words.length === 4) splitIdx = 2;
                else if (words.length === 5) splitIdx = 3;
                line1Words = words.slice(0, splitIdx);
                wordsConsumed = line1Words.length;
            }
            line2Words = words.slice(wordsConsumed);
        } else {
            let subjectEndIdx = -1;
            for (let k = 0; k < words.length; k++) {
                if (isAux(words[k]) || (isVerb(words[k]) && !isAux(words[k])) || isVing(words[k]) || isBeen(words[k])) {
                    subjectEndIdx = k; break;
                }
            }
            if (subjectEndIdx > 0) {
                for (let k = 0; k < subjectEndIdx; k++) line1Words.push(words[k]);
                wordsConsumedForLine1 = subjectEndIdx;
                if (wordsConsumedForLine1 < words.length && isAux(words[wordsConsumedForLine1])) {
                    line1Words.push(words[wordsConsumedForLine1++]);
                }
                let verbAddedToLine1 = false;
                if (wordsConsumedForLine1 < words.length && (isVerb(words[wordsConsumedForLine1]) || isVing(words[wordsConsumedForLine1]) || isBeen(words[wordsConsumedForLine1]))) {
                    let addVerb = true;
                    if (line1Words.length > subjectEndIdx && line1Words.length > 0) {
                        const lastWordInL1 = line1Words[line1Words.length - 1].toLowerCase().replace(/[^a-z0-9']/g, '');
                        const currentVerbCandidate = words[wordsConsumedForLine1].toLowerCase().replace(/[^a-z0-9']/g, '');
                        if (lastWordInL1 === currentVerbCandidate && isAux(words[wordsConsumedForLine1])) addVerb = false;
                    }
                    if (addVerb) { line1Words.push(words[wordsConsumedForLine1]); verbAddedToLine1 = true; }
                    wordsConsumedForLine1++;
                }
                if (verbAddedToLine1 && wordsConsumedForLine1 < words.length) {
                    line1Words.push(words[wordsConsumedForLine1++]);
                }
                line2Words = words.slice(wordsConsumedForLine1);
            } else if (subjectEndIdx === 0 && words.length > 0) {
                line1Words.push(words[0]); wordsConsumedForLine1 = 1;
                let verbAddedToLine1 = (isVerb(words[0]) && !isAux(words[0])) || isVing(words[0]) || isBeen(words[0]);
                if (wordsConsumedForLine1 < words.length && isAux(words[0]) && (isVerb(words[wordsConsumedForLine1]) || isVing(words[wordsConsumedForLine1]) || isBeen(words[wordsConsumedForLine1])) && !isAux(words[wordsConsumedForLine1])) {
                    line1Words.push(words[wordsConsumedForLine1++]); verbAddedToLine1 = true;
                }
                if (verbAddedToLine1 && wordsConsumedForLine1 < words.length && line1Words.length < 3) {
                    line1Words.push(words[wordsConsumedForLine1++]);
                }
                line2Words = words.slice(wordsConsumedForLine1);
            } else {
                const half = Math.max(1, Math.ceil(words.length / 2));
                line1Words = words.slice(0, half);
                line2Words = words.slice(half);
            }
        }
    }

    if (words.length <= 4 && originalSentenceForShortCheck.length < 35) {
        if (!(modalHavePpFoundAndSplit && line2Words.length === 0)) {
            line1Words = words.slice();
            line2Words = [];
        }
    }
    if (line1Words.length === 0 && words.length > 0) {
        line1Words = [words[0]];
        line2Words = words.slice(1);
    }

    return [line1Words.join(" "), line2Words.join(" ").trim()];
}
// =======================================================================
// END OF MODIFIED splitSentence FUNCTION
// =======================================================================


function drawSingleSentenceBlock(sentenceObject, baseY, isQuestionBlock, blockContext) {
    if (!sentenceObject) return { lastY: baseY, wordRects: [] };

    let localWordRects = [];
    ctx.font = englishFont;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";

    let lines = [sentenceObject.line1, sentenceObject.line2].filter(l => l && l.trim());
    if (lines.length === 0) return { lastY: baseY, wordRects: [] };

    let blockHeight = lines.length * LINE_HEIGHT;
    let yFirstLineTextCenter;

    if (isQuestionBlock) {
        yFirstLineTextCenter = baseY - blockHeight / 2 + LINE_HEIGHT / 2;
    } else {
        yFirstLineTextCenter = baseY + LINE_HEIGHT / 2;
    }

    let lastDrawnTextBottomY = baseY;

    const sentenceFullText = (sentenceObject.line1 + " " + sentenceObject.line2).trim();
    const isCurrentBlockContentQuestionType = isQuestion(sentenceFullText);


    for (let i = 0; i < lines.length; i++) {
        const lineText = lines[i];
        let currentLineCenterY = yFirstLineTextCenter + i * LINE_HEIGHT;

        if (isQuestionBlock) {
            if (i === 0) {
                currentLineCenterY -= 10;
            }
        } else {
            if (i === 1) {
                currentLineCenterY += 10;
            }
        }

        const words = lineText.split(" "); // Get words for the current line being processed
        let wordMetrics = words.map(w => ctx.measureText(w));
        const originalSpaceWidth = ctx.measureText(" ").width;
        const adjustedSpaceWidth = originalSpaceWidth * 1.20;
        let totalLineWidth = wordMetrics.reduce((sum, m) => sum + m.width, 0);
        if (words.length > 1) {
            totalLineWidth += adjustedSpaceWidth * (words.length - 1);
        }

        let currentX = (canvas.width - totalLineWidth) / 2;
        const wordHeight = parseFloat(englishFont.match(/(\d*\.?\d*)px/)[1]);

        for (let j = 0; j < words.length; j++) {
            let rawWord = words[j];
            let lowerCleanedWordForColor = rawWord.toLowerCase().replace(/[^a-z0-9']/g, "");
            
            // --- START: Modified Color Logic ---
            let color = "#fff"; // Default white

            // 1. Wh-words at the start of a question line 1 are green.
            if (isCurrentBlockContentQuestionType && i === 0 && j === 0 && isWh(lowerCleanedWordForColor)) {
                color = '#90EE90'; // Light Green for Wh-words
            }
            // 2. Auxiliaries (including at start of Q line 1 if not Wh), 'been', 'ving' are blue.
            else if (isAux(lowerCleanedWordForColor) || isBeen(lowerCleanedWordForColor) || isVing(lowerCleanedWordForColor)) {
                color = "#40b8ff"; // Blue
            }
            // 3. First main verb is yellow.
            else if (isVerb(lowerCleanedWordForColor) && !blockContext.verbColored && !isAux(lowerCleanedWordForColor)) {
                color = "#FFD600"; // Yellow
                blockContext.verbColored = true;
            }

            // 4. After the above, if it's a question's first line and the word is a subject following an Aux, color it blue.
            // This targets words that remained white.
            if (color === "#fff" && isCurrentBlockContentQuestionType && i === 0) {
                // Case: Aux + Subject (current word j=1 is Subject)
                // words[0] refers to the first word of the current line being processed.
                if (j === 1 && words.length > 1 && isAux(words[0].toLowerCase().replace(/[^a-z0-9']/g, ''))) {
                    color = "#40b8ff"; // Blue (same as auxiliary)
                }
                // Case: Wh-word (green) + Aux (blue) + Subject (current word j=2 is Subject)
                else if (j === 2 && words.length > 2 &&
                         isWh(words[0].toLowerCase().replace(/[^a-z0-9']/g, '')) &&
                         isAux(words[1].toLowerCase().replace(/[^a-z0-9']/g, ''))) {
                    color = "#40b8ff"; // Blue (same as auxiliary)
                }
            }
            // --- END: Modified Color Logic ---

            ctx.fillStyle = color;
            ctx.fillText(rawWord, currentX, currentLineCenterY);
            const measuredWidth = wordMetrics[j].width;
            localWordRects.push({
                word: rawWord,
                x: currentX, y: currentLineCenterY,
                w: measuredWidth, h: wordHeight,
                lineIndex: i,
                isQuestionWord: isQuestionBlock
            });

            if (j < words.length - 1) {
                currentX += measuredWidth + adjustedSpaceWidth;
            } else {
                currentX += measuredWidth;
            }
        }
        lastDrawnTextBottomY = currentLineCenterY + LINE_HEIGHT / 2;
         if (isQuestionBlock && i === 0) {
            lastDrawnTextBottomY -=10;
        } else if (!isQuestionBlock && i === 1) {
            lastDrawnTextBottomY +=10;
        }
    }
    return { lastY: lastDrawnTextBottomY, wordRects: localWordRects };
}


function drawPlayButton(buttonRect, baseScaleForOriginalSize) {
    if (!buttonRect) return;
    const visualShrinkFactor = 0.72;
    const visualWidth = buttonRect.w * visualShrinkFactor;
    const visualHeight = buttonRect.h * visualShrinkFactor;
    const visualX = buttonRect.x + (buttonRect.w - visualWidth) / 2;
    const visualY = buttonRect.y + (buttonRect.h - visualHeight) / 2;
    const internalElementScale = baseScaleForOriginalSize * visualShrinkFactor;

    ctx.save();
    ctx.globalAlpha = Math.min(1.0, centerAlpha + 0.2) * 0.82;
    ctx.fillStyle = "#222";
    ctx.beginPath();
    const cornerRadius = 20 * internalElementScale;
    ctx.roundRect(visualX, visualY, visualWidth, visualHeight, cornerRadius);
    ctx.fill();

    ctx.globalAlpha = centerAlpha;
    ctx.strokeStyle = "#4CAF50";
    ctx.lineWidth = 3 * internalElementScale;
    ctx.beginPath();
    ctx.roundRect(visualX, visualY, visualWidth, visualHeight, cornerRadius);
    ctx.stroke();

    ctx.fillStyle = "#4CAF50";
    ctx.beginPath();
    const playSize = 36 * internalElementScale;
    const btnPad = 18 * internalElementScale;
    const triangleSymbolVerticalLineXOffset = 6 * internalElementScale;
    ctx.moveTo(visualX + btnPad + triangleSymbolVerticalLineXOffset, visualY + btnPad);
    ctx.lineTo(visualX + btnPad + triangleSymbolVerticalLineXOffset, visualY + visualHeight - btnPad);
    ctx.lineTo(visualX + btnPad + playSize, visualY + visualHeight / 2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}


function drawCenterSentence() {
    if (!currentQuestionSentence && !currentAnswerSentence && !fireworks) {
        centerSentenceWordRects = [];
        return;
    }

    centerSentenceWordRects = [];
    ctx.save();
    ctx.globalAlpha = centerAlpha;

    const mainRenderAreaYCenter = topOffset + (canvas.height - topOffset) / 2;
    const questionBlockCenterY = mainRenderAreaYCenter + SENTENCE_VERTICAL_ADJUSTMENT;

    let questionBlockContext = { verbColored: false };
    let questionDrawOutput = { lastY: questionBlockCenterY - LINE_HEIGHT, wordRects: [] };

    const baseOverallScale = 0.49;
    const visualReductionFactor = 0.8;
    const currentVisualScaleForHitbox = baseOverallScale * visualReductionFactor;

    const btnH_forHitbox = (36 * currentVisualScaleForHitbox) + (18 * currentVisualScaleForHitbox * 2);
    const btnW_forHitbox = (36 * currentVisualScaleForHitbox) + (18 * currentVisualScaleForHitbox * 2);
    const btnX = 10;

    if (currentQuestionSentence) {
        questionDrawOutput = drawSingleSentenceBlock(currentQuestionSentence, questionBlockCenterY, true, questionBlockContext);
        centerSentenceWordRects.push(...questionDrawOutput.wordRects);

        let playButtonQuestionY = questionBlockCenterY - btnH_forHitbox / 2;
        const questionLinesForHeight = [currentQuestionSentence.line1, currentQuestionSentence.line2].filter(l => l && l.trim());
        if (questionLinesForHeight.length > 0) {
            let actualFirstLineCenterY = questionBlockCenterY - (questionLinesForHeight.length * LINE_HEIGHT) / 2 + LINE_HEIGHT / 2;
            if (questionLinesForHeight.length > 0) actualFirstLineCenterY -=10;
            playButtonQuestionY = actualFirstLineCenterY - btnH_forHitbox / 2;
        }

        playButtonRectQuestion = { x: btnX, y: playButtonQuestionY, w: btnW_forHitbox, h: btnH_forHitbox };
        if (showPlayButtonQuestion) {
            drawPlayButton(playButtonRectQuestion, currentVisualScaleForHitbox);
        }

        if (showTranslationForQuestion && currentQuestionSentenceIndex !== null && translations[currentQuestionSentenceIndex]) {
            ctx.save();
            ctx.globalAlpha = centerAlpha;
            ctx.font = translationFont;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#2E8B57"; // SeaGreen (어두운 녹색)
            ctx.shadowColor = "#111"; ctx.shadowBlur = 4;
            const translationTextHeight = parseFloat(translationFont.match(/(\d*\.?\d*)px/)[1]);
            const translationBelowY = questionDrawOutput.lastY + 10 + translationTextHeight / 2;
            ctx.fillText(translations[currentQuestionSentenceIndex], canvas.width / 2, translationBelowY);
            ctx.restore();
        }
    }

    if (currentAnswerSentence) {
        const answerLines = [currentAnswerSentence.line1, currentAnswerSentence.line2].filter(l => l && l.trim());
        const answerBlockHeight = answerLines.length * LINE_HEIGHT;
        let topYForAnswerBlock;

        if (currentQuestionSentence) {
            topYForAnswerBlock = questionDrawOutput.lastY + ANSWER_OFFSET_Y;
        } else {
            let effectiveCenterY = mainRenderAreaYCenter;
            if (answerLines.length === 2) effectiveCenterY -= 10 / 2;
             topYForAnswerBlock = effectiveCenterY - (answerBlockHeight / 2);
        }

        const answerFirstLineCenterY = topYForAnswerBlock + LINE_HEIGHT / 2;
        playButtonRect = { x: btnX, y: answerFirstLineCenterY - btnH_forHitbox / 2, w: btnW_forHitbox, h: btnH_forHitbox };
        if (showPlayButton) {
            drawPlayButton(playButtonRect, currentVisualScaleForHitbox);
        }

        let answerBlockContext = { verbColored: false };
        const answerDrawOutput = drawSingleSentenceBlock(currentAnswerSentence, topYForAnswerBlock, false, answerBlockContext);
        centerSentenceWordRects.push(...answerDrawOutput.wordRects);

        if (showTranslationForAnswer && currentAnswerSentenceIndex !== null && translations[currentAnswerSentenceIndex]) {
            ctx.save();
            ctx.globalAlpha = centerAlpha;
            ctx.font = translationFont;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#2E8B57"; // SeaGreen (어두운 녹색)
            ctx.shadowColor = "#111"; ctx.shadowBlur = 4;
            const translationTextHeight = parseFloat(translationFont.match(/(\d*\.?\d*)px/)[1]);
            // --- START: 답변 한글 해석 위치 조정 ---
            const translationBelowY = answerDrawOutput.lastY + 2 + translationTextHeight / 2; // 10에서 7로 변경하여 3px 위로 이동
            // --- END: 답변 한글 해석 위치 조정 ---
            ctx.fillText(translations[currentAnswerSentenceIndex], canvas.width / 2, translationBelowY);
            ctx.restore();
        }
    }

    if (activeWordTranslation && activeWordTranslation.show) {
        ctx.save();
        ctx.globalAlpha = centerAlpha;
        const wordTransFontFamily = "'Malgun Gothic', 'Nanum Gothic', Arial, sans-serif";
        const wordTransFontSize = 16;
        ctx.font = `${wordTransFontSize}px ${wordTransFontFamily}`;
        ctx.textAlign = "center";
        ctx.fillStyle = "#98FB98"; 
        ctx.shadowColor = "rgba(0,0,0,0.6)"; ctx.shadowBlur = 2; ctx.shadowOffsetX = 1; ctx.shadowOffsetY = 1;
        const englishWordMiddleY = activeWordTranslation.y;
        const englishWordHalfHeight = activeWordTranslation.h / 2;
        const padding = 6;
        let tx = activeWordTranslation.x + activeWordTranslation.w / 2;
        let ty;
        if (activeWordTranslation.lineIndex === 0) {
            ctx.textBaseline = "bottom";
            ty = englishWordMiddleY - englishWordHalfHeight - padding;
        } else {
            ctx.textBaseline = "top";
            ty = englishWordMiddleY + englishWordHalfHeight + padding;
        }
        ctx.fillText(activeWordTranslation.translation, tx, ty);
        ctx.restore();
    }
    ctx.restore();
}


function drawFireworks() {
  if (!fireworks) return;
  ctx.save();
  ctx.font = englishFont;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  fireworks.forEach(fw => {
    ctx.globalAlpha = 1;
    ctx.fillStyle = fw.color;
    ctx.fillText(fw.text, fw.x, fw.y);
  });
  ctx.restore();
}


function getClockwiseAngle(index, total) {
  return -Math.PI / 2 + (index * 2 * Math.PI) / total;
}


function startFireworks(sentenceTextForFireworks, globalSentenceIndex, explosionX, explosionY) {
    let roleOfNewSentence;
    let questionTextForLayout = "";
    const isNewSentenceQuestion = globalSentenceIndex % 2 === 0;
    roleOfNewSentence = isNewSentenceQuestion ? 'question' : 'answer';

    if (roleOfNewSentence === 'question') {
        currentQuestionSentence = null; currentAnswerSentence = null;
        currentQuestionSentenceIndex = null; currentAnswerSentenceIndex = null;
        showPlayButton = false; showPlayButtonQuestion = false;
        showTranslationForQuestion = false; showTranslationForAnswer = false;
    } else {
        if (currentQuestionSentence && currentQuestionSentenceIndex === globalSentenceIndex - 1) {
            questionTextForLayout = (currentQuestionSentence.line1 + " " + currentQuestionSentence.line2).trim();
        } else if (globalSentenceIndex > 0 && sentences[globalSentenceIndex - 1]) {
            questionTextForLayout = sentences[globalSentenceIndex - 1];
        } else {
            questionTextForLayout = " ";
        }
        currentAnswerSentence = null; currentAnswerSentenceIndex = null;
        showPlayButton = false;
        showTranslationForAnswer = false;
    }

    if (activeWordTranslation) activeWordTranslation.show = false;
    activeWordTranslation = null;
    if (wordTranslationTimeoutId) clearTimeout(wordTranslationTimeoutId);
    centerSentenceWordRects = [];

    const [fireworkLine1, fireworkLine2] = splitSentence(sentenceTextForFireworks, isNewSentenceQuestion);
    const wordsForFireworks = [];
    if (fireworkLine1.trim()) wordsForFireworks.push(...fireworkLine1.split(" ").map(word => ({ word, row: 0 })));
    if (fireworkLine2.trim()) wordsForFireworks.push(...fireworkLine2.split(" ").map(word => ({ word, row: 1 })));

    if(wordsForFireworks.length === 0) {
        sentenceActive = false; return;
    }

    const baseRadius = 51.2 * 0.88; const maxRadius = 120.96 * 0.88;
    let centerX = explosionX; const margin = 8;
    if (centerX - maxRadius < margin) centerX = margin + maxRadius;
    if (centerX + maxRadius > canvas.width - margin) centerX = canvas.width - margin - maxRadius;

    fireworks = [];
    fireworksState = {
        t: 0, phase: "explode", holdDuration: 60, explodeDuration: 180, gatherDuration: 45,
        originX: centerX, originY: explosionY,
        sentenceTextToDisplayAfter: sentenceTextForFireworks,
        finalSentenceIndex: globalSentenceIndex,
        roleOfNewSentence: roleOfNewSentence,
    };

    const mainRenderAreaYCenter = topOffset + (canvas.height - topOffset) / 2;
    const [sL1_fw, sL2_fw] = splitSentence(sentenceTextForFireworks, isNewSentenceQuestion);
    const sLines_fw = [sL1_fw, sL2_fw].filter(l => l && l.trim());
    const sentenceBlockFinalHeight_fw = sLines_fw.length * LINE_HEIGHT;

    for (let j = 0; j < wordsForFireworks.length; j++) {
        const angle = getClockwiseAngle(j, wordsForFireworks.length);
        const color = burstColors[j % burstColors.length];
        let wordTargetY;

        if (roleOfNewSentence === 'question') {
            const qBlockFinalCenterY = mainRenderAreaYCenter + SENTENCE_VERTICAL_ADJUSTMENT;
            wordTargetY = qBlockFinalCenterY - sentenceBlockFinalHeight_fw / 2 + (wordsForFireworks[j].row * LINE_HEIGHT) + (LINE_HEIGHT / 2);
            if (wordsForFireworks[j].row === 0) {
                wordTargetY -= 10;
            }
        } else {
            const [qTextL1_layout, qTextL2_layout] = splitSentence(questionTextForLayout, true);
            const qTextLines_layout = [qTextL1_layout, qTextL2_layout].filter(l => l && l.trim());
            let questionBlockActualHeight_layout = qTextLines_layout.length * LINE_HEIGHT;
            if (qTextLines_layout.length === 2) questionBlockActualHeight_layout +=10;

            const questionBlockActualCenterY_layout = mainRenderAreaYCenter + SENTENCE_VERTICAL_ADJUSTMENT;
            let questionBlockActualBottomY_layout = questionBlockActualCenterY_layout + questionBlockActualHeight_layout / 2;
            if (qTextLines_layout.length === 1) {
                 questionBlockActualBottomY_layout -= 10;
            } else if (qTextLines_layout.length === 0) {
                 questionBlockActualBottomY_layout = questionBlockActualCenterY_layout;
            }

            let answerBlockFinalTopY_fw;
            if (qTextLines_layout.length > 0) {
                answerBlockFinalTopY_fw = questionBlockActualBottomY_layout + ANSWER_OFFSET_Y;
            } else {
                answerBlockFinalTopY_fw = questionBlockActualCenterY_layout - sentenceBlockFinalHeight_fw / 2;
            }
            wordTargetY = answerBlockFinalTopY_fw + (wordsForFireworks[j].row * LINE_HEIGHT) + (LINE_HEIGHT / 2);
            if (wordsForFireworks[j].row === 1) {
                wordTargetY += 10;
            }
        }

        fireworks.push({
            text: wordsForFireworks[j].word, angle: angle, rowInSentence: wordsForFireworks[j].row,
            x: centerX, y: explosionY,
            radius: baseRadius, maxRadius: maxRadius,
            color: color,
            targetX: 0,
            targetY: wordTargetY,
        });
    }
    sentenceActive = true; centerAlpha = 1.0;
}


function updateFireworks() {
  if (!fireworks || !fireworksState) return false;
  fireworksState.t++;

  if (fireworksState.phase === "explode") {
    const progress = Math.min(fireworksState.t / fireworksState.explodeDuration, 1);
    const ease = 1 - Math.pow(1 - progress, 2);
    const currentRadius = 51.2 * 0.88 + (120.96 * 0.88 - 51.2 * 0.88) * ease;
    fireworks.forEach((fw) => {
      fw.radius = currentRadius;
      fw.x = fireworksState.originX + Math.cos(fw.angle) * fw.radius;
      fw.y = fireworksState.originY + Math.sin(fw.angle) * fw.radius;
    });
    if (progress >= 1) { fireworksState.phase = "hold"; fireworksState.t = 0; }
  } else if (fireworksState.phase === "hold") {
    if (fireworksState.t >= fireworksState.holdDuration) {
      fireworksState.phase = "gather"; fireworksState.t = 0;
      centerAlpha = 0;
    }
  } else if (fireworksState.phase === "gather") {
    const progress = Math.min(fireworksState.t / fireworksState.gatherDuration, 1);
    const ease = Math.pow(progress, 2);
    const tempCtx = canvas.getContext('2d');
    tempCtx.font = englishFont;
    const isGatherSentenceQuestion = fireworksState.roleOfNewSentence === 'question';
    const [sentenceLine1Gather, sentenceLine2Gather] = splitSentence(fireworksState.sentenceTextToDisplayAfter, isGatherSentenceQuestion);
    let sentenceLineWordArrays = [];
    if(sentenceLine1Gather.trim()) sentenceLineWordArrays.push(sentenceLine1Gather.split(" "));
    if(sentenceLine2Gather.trim()) sentenceLineWordArrays.push(sentenceLine2Gather.split(" "));

    const originalSpaceWidthFireworks = tempCtx.measureText(" ").width;
    const adjustedSpaceWidthFireworks = originalSpaceWidthFireworks * 1.20;

    let wordIndexInFireworks = 0;
    for (let i = 0; i < sentenceLineWordArrays.length; i++) {
        const wordsInLine = sentenceLineWordArrays[i];
        let wordMetrics = wordsInLine.map(w => tempCtx.measureText(w));
        let currentLineTotalWidth = 0;
        for(let k=0; k < wordMetrics.length; k++) {
            currentLineTotalWidth += wordMetrics[k].width;
            if (k < wordMetrics.length - 1) {
                currentLineTotalWidth += adjustedSpaceWidthFireworks;
            }
        }
        let currentXTargetForWord = (canvas.width - currentLineTotalWidth) / 2;
        for (let j = 0; j < wordsInLine.length; j++) {
            if (fireworks[wordIndexInFireworks]) {
                fireworks[wordIndexInFireworks].targetX = currentXTargetForWord;
                currentXTargetForWord += wordMetrics[j].width;
                if (j < wordsInLine.length - 1) {
                    currentXTargetForWord += adjustedSpaceWidthFireworks;
                }
            }
            wordIndexInFireworks++;
        }
    }

    fireworks.forEach((fw) => {
      const wordWidth = tempCtx.measureText(fw.text).width;
      const centeredTargetX = fw.targetX + wordWidth / 2;
      fw.x += (centeredTargetX - fw.x) * ease * 0.2;
      fw.y += (fw.targetY - fw.y) * ease * 0.2;
    });
    centerAlpha += (1.0 - centerAlpha) * ease * 0.15;

    if (progress >= 1) {
        fireworksState.phase = "done";
        const newSentenceText = fireworksState.sentenceTextToDisplayAfter;
        const newSentenceIndex = fireworksState.finalSentenceIndex;
        const roleOfNewSentence = fireworksState.roleOfNewSentence;
        const isFinalSentenceQuestion = roleOfNewSentence === 'question';
        const [newLine1, newLine2] = splitSentence(newSentenceText, isFinalSentenceQuestion);
        const newSentenceObject = { line1: newLine1, line2: newLine2 };
        let playAudioForThisSentence = false;

        if (roleOfNewSentence === 'question') {
            currentQuestionSentence = newSentenceObject; currentQuestionSentenceIndex = newSentenceIndex;
            currentAnswerSentence = null; currentAnswerSentenceIndex = null;
            showPlayButton = false; showPlayButtonQuestion = true;
            playAudioForThisSentence = true;
        } else {
            const questionIndexOfThisAnswer = newSentenceIndex - 1;
            if (questionIndexOfThisAnswer >= 0 && sentences[questionIndexOfThisAnswer]) {
                if (!currentQuestionSentence || currentQuestionSentenceIndex !== questionIndexOfThisAnswer) {
                    const [qL1, qL2] = splitSentence(sentences[questionIndexOfThisAnswer], true);
                    currentQuestionSentence = {line1: qL1, line2: qL2};
                    currentQuestionSentenceIndex = questionIndexOfThisAnswer;
                }
                 showPlayButtonQuestion = true;
            } else {
                currentQuestionSentence = null; currentQuestionSentenceIndex = null;
                showPlayButtonQuestion = false;
            }
            currentAnswerSentence = newSentenceObject; currentAnswerSentenceIndex = newSentenceIndex;
            showPlayButton = true;
            playAudioForThisSentence = true;
        }
        centerAlpha = 1.0;
        fireworks = null; fireworksState = null; sentenceActive = false;
        if (activeWordTranslation) activeWordTranslation.show = false;
        activeWordTranslation = null; if (wordTranslationTimeoutId) clearTimeout(wordTranslationTimeoutId);

        if (playAudioForThisSentence) {
            let audioIndexToPlay = null;
            if (roleOfNewSentence === 'question' && currentQuestionSentenceIndex !== null) audioIndexToPlay = currentQuestionSentenceIndex;
            else if (roleOfNewSentence === 'answer' && currentAnswerSentenceIndex !== null) audioIndexToPlay = currentAnswerSentenceIndex;
            if (audioIndexToPlay !== null) {
                setTimeout(() => {
                    window.speechSynthesis.cancel();
                    playSentenceAudio(audioIndexToPlay)
                        .catch(err => console.error(`Error playing sentence audio for index ${audioIndexToPlay} from fireworks:`, err));
                }, 300);
            }
        }
    }
  }
}


function spawnEnemy() {
  const idx = Math.floor(Math.random() * enemyImgs.length);
  const img = enemyImgs[idx];
  const x = Math.random() * (canvas.width - ENEMY_SIZE);
  const spawnYMax = canvas.height * 0.2;
  const y = topOffset + Math.random() * spawnYMax + 20;
  let enemy = {
    x, y, w: ENEMY_SIZE, h: ENEMY_SIZE, img, shot: false, imgIndex: idx,
    baseY: y, initialX: x, rotation: 0
  };
  if (idx === 3) {
    enemy.swayAngle = Math.random() * Math.PI * 2;
    enemy.swaySpeed = (Math.random() * 2 + 1.5) * (Math.random() > 0.5 ? 1 : -1);
    enemy.swayAmplitude = Math.random() * 20 + 20;
    enemy.driftXPerSecond = (Math.random() - 0.5) * 60;
    enemy.flutterAngle = Math.random() * Math.PI * 2;
    enemy.flutterSpeed = Math.random() * 5 + 3;
    enemy.flutterAmplitude = Math.random() * 3 + 3;
  } else if (idx === 2) {
    enemy.rotationSpeed = (Math.random() * 0.8 + 0.4) * (Math.random() > 0.5 ? 1 : -1);
    enemy.driftXPerSecond = (Math.random() - 0.5) * 20;
    enemy.swayAngle = Math.random() * Math.PI * 2;
    enemy.swaySpeed = (Math.random() * 0.8 + 0.4);
    enemy.swayAmplitude = Math.random() * 10 + 5;
    const petal = {
        x: enemy.x + enemy.w / 2 - PETAL_SIZE / 2, y: enemy.y + enemy.h / 2,
        w: PETAL_SIZE, h: PETAL_SIZE, img: enemyImgs[2], baseY: enemy.y + enemy.h / 2,
        initialX: enemy.x + enemy.w / 2 - PETAL_SIZE / 2, rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * PETAL_ROTATION_SPEED_BASE * 2 + (Math.random() > 0.5 ? 0.3 : -0.3),
        swayAngle: Math.random() * Math.PI * 2,
        swaySpeed: (Math.random() * 0.5 + 0.75) * PETAL_SWAY_SPEED_BASE * (Math.random() > 0.5 ? 1 : -1),
        swayAmplitude: Math.random() * (PETAL_SWAY_AMPLITUDE_BASE * 0.6) + (PETAL_SWAY_AMPLITUDE_BASE * 0.7),
        driftXPerSecond: (Math.random() - 0.5) * PETAL_DRIFT_X_PPS_BASE * 1.5,
        flutterAngle: Math.random() * Math.PI * 2,
        flutterSpeed: (Math.random() * 0.8 + 0.6) * PETAL_FLUTTER_SPEED_BASE,
        flutterAmplitude: Math.random() * (PETAL_FLUTTER_AMPLITUDE_BASE * 0.5) + (PETAL_FLUTTER_AMPLITUDE_BASE * 0.5),
        fallSpeedPPS: PETAL_FALL_SPEED_PPS * (Math.random() * 0.4 + 0.8)
    };
    detachedPetals.push(petal);
  }
  enemies.push(enemy);
}

function update(delta) {
  enemies = enemies.filter(e => e.y <= canvas.height + e.h);
  while (enemies.length < 2) { spawnEnemy(); }
  enemies.forEach(e => {
    const deltaTimeSeconds = delta / 1000.0;
    e.baseY += ENEMY_MOVEMENT_SPEED_PPS * deltaTimeSeconds;
    let newX = e.x; let newY = e.baseY;
    if (e.imgIndex === 3) {
      e.initialX += e.driftXPerSecond * deltaTimeSeconds;
      e.swayAngle += e.swaySpeed * deltaTimeSeconds;
      newX = e.initialX + Math.sin(e.swayAngle) * e.swayAmplitude;
      e.rotation = Math.sin(e.swayAngle * 0.7) * 0.7;
      e.flutterAngle += e.flutterSpeed * deltaTimeSeconds;
      newY = e.baseY + Math.sin(e.flutterAngle) * e.flutterAmplitude;
    } else if (e.imgIndex === 2) {
      e.initialX += e.driftXPerSecond * deltaTimeSeconds;
      e.rotation += e.rotationSpeed * deltaTimeSeconds;
      e.swayAngle += e.swaySpeed * deltaTimeSeconds;
      newX = e.initialX + Math.sin(e.swayAngle) * e.swayAmplitude;
    }
    e.x = newX; e.y = newY;
  });

  bullets = bullets.filter(b => b.y + b.h > 0);
  bullets.forEach(b => {
    b.timeAlive += delta;
    const deltaTimeSeconds = delta / 1000.0;
    b.y += b.velocityY * deltaTimeSeconds;
    b.baseX += b.driftXPerSecond * deltaTimeSeconds;
    const swayOffset = Math.sin( (b.timeAlive / 1000.0) * b.swayFrequency + b.swayPhaseOffset ) * b.swayAmplitude;
    b.x = b.baseX + swayOffset;
  });

  detachedPetals.forEach((p, index) => {
      const deltaTimeSeconds = delta / 1000.0;
      p.baseY += p.fallSpeedPPS * deltaTimeSeconds;
      p.initialX += p.driftXPerSecond * deltaTimeSeconds;
      p.swayAngle += p.swaySpeed * deltaTimeSeconds;
      let currentX = p.initialX + Math.sin(p.swayAngle) * p.swayAmplitude;
      p.flutterAngle += p.flutterSpeed * deltaTimeSeconds;
      let currentY = p.baseY + Math.sin(p.flutterAngle) * p.flutterAmplitude;
      p.rotation += p.rotationSpeed * deltaTimeSeconds;
      p.x = currentX; p.y = currentY;
  });
  detachedPetals = detachedPetals.filter(p => p.y <= canvas.height + p.h);

  enemyBullets = enemyBullets.filter(b => b.y < canvas.height).map(b => { b.y += b.speed; return b; });
  bullets.forEach((b, bi) => {
    enemies.forEach((e, ei) => {
      const collisionPaddingFactor = 0.25;
      const coreBulletOffsetX = b.w * collisionPaddingFactor;
      const coreBulletOffsetY = b.h * collisionPaddingFactor;
      const coreBulletX = b.x + coreBulletOffsetX;
      const coreBulletY = b.y + coreBulletOffsetY;
      const coreBulletWidth = b.w * (1 - 2 * collisionPaddingFactor);
      const coreBulletHeight = b.h * (1 - 2 * collisionPaddingFactor);
      if (coreBulletX < e.x + e.w && coreBulletX + coreBulletWidth > e.x &&
          coreBulletY < e.y + e.h && coreBulletY + coreBulletHeight > e.y) {
        if (!sentenceActive) {
            const sentenceToFirework = sentences[sentenceIndex];
            const globalIndexOfSentence = sentenceIndex;
            startFireworks(sentenceToFirework, globalIndexOfSentence, e.x + e.w / 2, e.y + e.h / 2);
            sentenceIndex = (sentenceIndex + 1) % sentences.length;
            localStorage.setItem('sentenceIndex', sentenceIndex.toString());
            sounds.explosion.play();
        }
        enemies.splice(ei, 1); bullets.splice(bi, 1);
      }
    });
  });
  if (sentenceActive) { updateFireworks(); }
  if (!currentQuestionSentence && !currentAnswerSentence && !sentenceActive) {
    showPlayButton = false; showPlayButtonQuestion = false;
    showTranslationForQuestion = false; showTranslationForAnswer = false;
    if (activeWordTranslation) activeWordTranslation.show = false;
  } else if (!sentenceActive) {
      showPlayButtonQuestion = !!currentQuestionSentence;
      showPlayButton = !!currentAnswerSentence;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(playerImg, player.x, player.y, player.w, player.h);
  enemies.forEach(e => {
    if (e.imgIndex === 2 || e.imgIndex === 3) {
      ctx.save();
      ctx.translate(e.x + e.w / 2, e.y + e.h / 2);
      ctx.rotate(e.rotation);
      ctx.drawImage(e.img, -e.w / 2, -e.h / 2, e.w, e.h);
      ctx.restore();
    } else { ctx.drawImage(e.img, e.x, e.y, e.w, e.h); }
    if (e.imgIndex === 1 && coffeeSteamVideo && coffeeSteamVideo.readyState >= HTMLVideoElement.HAVE_ENOUGH_DATA && !coffeeSteamVideo.paused) {
      const steamScale = 0.5; const steamWidth = e.w * steamScale * 1.5;
      const steamHeight = e.h * steamScale * 1.6; const steamOffsetX = (e.w - steamWidth) / 2;
      const steamOffsetY = -steamHeight * 0.85;
      const prevCompositeOperation = ctx.globalCompositeOperation;
      ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.65;
      ctx.drawImage(coffeeSteamVideo, e.x + steamOffsetX, e.y + steamOffsetY, steamWidth, steamHeight);
      ctx.globalAlpha = 1.0; ctx.globalCompositeOperation = prevCompositeOperation;
    }
  });
  bullets.forEach(b => {
    if (b.img && b.img.complete && b.img.naturalWidth > 0) {
      ctx.drawImage(b.img, b.x, b.y, b.w, b.h);
    }
  });
  detachedPetals.forEach(p => {
      ctx.save();
      ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
      ctx.rotate(p.rotation);
      ctx.drawImage(p.img, -p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
  });
  const previousGlobalCenterAlpha = centerAlpha;
  if (sentenceActive && fireworks && fireworksState) {
    if (fireworksState.roleOfNewSentence === 'answer' && currentQuestionSentence) {
      centerAlpha = 1.0;
      const tempAnswerSentence = currentAnswerSentence; const tempAnswerIndex = currentAnswerSentenceIndex;
      currentAnswerSentence = null; currentAnswerSentenceIndex = null;
      drawCenterSentence();
      currentAnswerSentence = tempAnswerSentence; currentAnswerSentenceIndex = tempAnswerIndex;
    }
    centerAlpha = previousGlobalCenterAlpha;
    drawFireworks();
  } else {
    if (currentQuestionSentence || currentAnswerSentence) {
      centerAlpha = 1.0;
      drawCenterSentence();
    }
  }
  if (!sentenceActive) centerAlpha = 1.0;
  else if (fireworksState && fireworksState.phase === "gather") { /* Alpha managed by gather */ }
  else centerAlpha = previousGlobalCenterAlpha;
}

function gameLoop(time) {
  if (!isGameRunning || isGamePaused) { if (isGamePaused) draw(); return; }
  const delta = time - lastTime; lastTime = time;
  update(delta); draw();
  requestAnimationFrame(gameLoop);
}

document.getElementById('startBtn').onclick = startGame;
document.getElementById('pauseBtn').onclick = togglePause;
document.getElementById('stopBtn').onclick = stopGame;

function resetGameStateForStartStop() {
    bullets = []; enemies = []; enemyBullets = []; detachedPetals = [];
    fireworks = null; fireworksState = null;
    currentQuestionSentence = null; currentAnswerSentence = null;
    currentQuestionSentenceIndex = null; currentAnswerSentenceIndex = null;
    sentenceActive = false; centerAlpha = 1.0;
    showPlayButton = false; playButtonRect = null;
    showPlayButtonQuestion = false; playButtonRectQuestion = null;
    showTranslationForQuestion = false; showTranslationForAnswer = false;
    if (activeWordTranslation) activeWordTranslation.show = false;
    activeWordTranslation = null;
    if (wordTranslationTimeoutId) { clearTimeout(wordTranslationTimeoutId); wordTranslationTimeoutId = null; }
    centerSentenceWordRects = []; isActionLocked = false;
}

function startGame() {
  calculateTopOffset();
  if (!allAssetsReady) {
    console.warn("Assets not ready. Please wait and try starting again.");
    ctx.fillStyle = "white"; ctx.font = "16px Arial"; ctx.textAlign = "center";
    ctx.fillText("이미지 및 비디오 로딩 중... 잠시 후 다시 시도하세요.", canvas.width / 2, canvas.height / 2);
    return;
  }
  isGameRunning = true; isGamePaused = false;
  document.getElementById('pauseBtn').textContent = 'PAUSE';
  if (bgmAudio) { bgmAudio.pause(); }
  bgmAudio = new Audio(bgmFiles[bgmIndex]);
  bgmAudio.volume = isMuted ? 0 : 0.021; bgmAudio.loop = true;
  const playPromise = bgmAudio.play();
  if (playPromise !== undefined) {
    playPromise.catch(error => { console.error('BGM play error on start:', error); });
  }
  if (coffeeSteamVideo && coffeeVideoAssetReady) {
    coffeeSteamVideo.currentTime = 0;
    const coffeePlayPromise = coffeeSteamVideo.play();
    if (coffeePlayPromise !== undefined) {
      coffeePlayPromise.catch(error => console.error("Error playing coffee steam video:", error));
    }
  }
  resetGameStateForStartStop();
  let storedIndex = Number(localStorage.getItem('sentenceIndex') || 0);
  sentenceIndex = storedIndex % sentences.length;
  localStorage.setItem('sentenceIndex', sentenceIndex.toString());
  spawnEnemy(); spawnEnemy();
  player.x = canvas.width / 2 - PLAYER_SIZE / 2;
  player.y = topOffset + (canvas.height - topOffset) - PLAYER_SIZE - 10;
  player.y = Math.max(topOffset, player.y);
  lastTime = performance.now();
  getVoicesReliably().catch(err => console.error("startGame: Error during voice pre-warming:", err));
  requestAnimationFrame(gameLoop);
}

function togglePause() {
  if (!isGameRunning) return;
  isGamePaused = !isGamePaused;
  const pauseButton = document.getElementById('pauseBtn');
  if (isGamePaused) {
    pauseButton.textContent = 'RESUME';
    if (bgmAudio && !bgmAudio.paused) bgmAudio.pause();
    if (coffeeSteamVideo && !coffeeSteamVideo.paused) coffeeSteamVideo.pause();
    window.speechSynthesis.cancel();
    if (currentSentenceAudio) currentSentenceAudio.pause();
  } else {
    pauseButton.textContent = 'PAUSE';
    if (bgmAudio && bgmAudio.paused && !isMuted) {
        bgmAudio.play().catch(e => console.error("BGM resume error:", e));
    }
    if (coffeeSteamVideo && coffeeSteamVideo.paused && coffeeVideoAssetReady) {
        coffeeSteamVideo.play().catch(error => console.error("Error resuming coffee steam video:", error));
    }
    if (currentSentenceAudio && currentSentenceAudio.paused) {
        currentSentenceAudio.volume = 0.8;
        currentSentenceAudio.play().catch(e => console.error("Sentence audio resume error:", e));
    }
    lastTime = performance.now();
    requestAnimationFrame(gameLoop);
  }
}

function stopGame() {
  isGameRunning = false; isGamePaused = false;
  document.getElementById('pauseBtn').textContent = 'PAUSE';
  if (bgmAudio) bgmAudio.pause();
  if (coffeeSteamVideo && !coffeeSteamVideo.paused) coffeeSteamVideo.pause();
  window.speechSynthesis.cancel();
  if (currentSentenceAudio) {
      currentSentenceAudio.pause(); currentSentenceAudio.currentTime = 0; currentSentenceAudio = null;
  }
  resetGameStateForStartStop();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const expandedMargin = 10;

function handleCanvasInteraction(clientX, clientY, event) {
  if (!isGameRunning || isGamePaused) return;
  if (!isActionLocked) {
    const isPlayBtnQuestionTouched = showPlayButtonQuestion && playButtonRectQuestion &&
      clientX >= (playButtonRectQuestion.x - expandedMargin) && clientX <= (playButtonRectQuestion.x + playButtonRectQuestion.w + expandedMargin) &&
      clientY >= (playButtonRectQuestion.y - expandedMargin) && clientY <= (playButtonRectQuestion.y + playButtonRectQuestion.h + expandedMargin);
    const isPlayBtnAnswerTouched = showPlayButton && playButtonRect &&
      clientX >= (playButtonRect.x - expandedMargin) && clientX <= (playButtonRect.x + playButtonRect.w + expandedMargin) &&
      clientY >= (playButtonRect.y - expandedMargin) && clientY <= (playButtonRect.y + playButtonRect.h + expandedMargin);

    if (isPlayBtnQuestionTouched) {
      showTranslationForQuestion = true; showTranslationForAnswer = false;
      if (activeWordTranslation) activeWordTranslation.show = false;
      if (wordTranslationTimeoutId) clearTimeout(wordTranslationTimeoutId);
      activeWordTranslation = null; isActionLocked = true;
      if (currentQuestionSentenceIndex !== null) {
          window.speechSynthesis.cancel();
          playSentenceAudio(currentQuestionSentenceIndex)
              .catch(err => console.error("Error playing question sentence audio from play button:", err));
      }
      event.preventDefault(); setTimeout(() => { isActionLocked = false; }, 200); return;
    }
    if (isPlayBtnAnswerTouched) {
      showTranslationForAnswer = true; showTranslationForQuestion = false;
      if (activeWordTranslation) activeWordTranslation.show = false;
      if (wordTranslationTimeoutId) clearTimeout(wordTranslationTimeoutId);
      activeWordTranslation = null; isActionLocked = true;
      if (currentAnswerSentenceIndex !== null) {
          window.speechSynthesis.cancel();
          playSentenceAudio(currentAnswerSentenceIndex)
              .catch(err => console.error("Error playing answer sentence audio from play button:", err));
      }
      event.preventDefault(); setTimeout(() => { isActionLocked = false; }, 200); return;
    }
    if ((currentQuestionSentence || currentAnswerSentence) && centerSentenceWordRects.length > 0) {
        for (const wordRect of centerSentenceWordRects) {
          if (clientX >= (wordRect.x - expandedMargin/2) && clientX <= (wordRect.x + wordRect.w + expandedMargin/2) &&
              clientY >= (wordRect.y - wordRect.h / 2 - expandedMargin/2) && clientY <= (wordRect.y + wordRect.h / 2 + expandedMargin/2) ) {
            window.speechSynthesis.cancel();
            speakWord(wordRect.word).catch(err => console.error(`Error speaking word "${wordRect.word}":`, err));
            if (wordTranslationTimeoutId) clearTimeout(wordTranslationTimeoutId);
            if (activeWordTranslation) activeWordTranslation.show = false;
            activeWordTranslation = null; isActionLocked = true;
            getWordTranslation(wordRect.word).then(translation => {
                activeWordTranslation = {
                    word: wordRect.word, translation: translation, x: wordRect.x, y: wordRect.y,
                    w: wordRect.w, h: wordRect.h, lineIndex: wordRect.lineIndex,
                    isQuestionWord: wordRect.isQuestionWord, show: true
                };
                wordTranslationTimeoutId = setTimeout(() => {
                    if (activeWordTranslation && activeWordTranslation.word === wordRect.word) activeWordTranslation.show = false;
                }, WORD_TRANSLATION_DURATION);
            }).catch(err => console.error("Error getting word translation:", err));
            showTranslationForQuestion = false; showTranslationForAnswer = false;
            event.preventDefault(); setTimeout(() => { isActionLocked = false; }, 300); return;
          }
        }
    }
  }

  player.x = clientX - player.w / 2;
  if (event.type === 'touchstart' || event.type === 'touchmove') player.y = clientY - player.h / 2 - PLAYER_TOUCH_Y_OFFSET;
  else player.y = clientY - player.h / 2;
  player.x = Math.max(0, Math.min(canvas.width - player.w, player.x));
  player.y = Math.max(topOffset, Math.min(canvas.height - player.h, player.y));
  if (activeWordTranslation && activeWordTranslation.show) {
    activeWordTranslation.show = false;
    if (wordTranslationTimeoutId) { clearTimeout(wordTranslationTimeoutId); wordTranslationTimeoutId = null; }
  }
  showTranslationForQuestion = false; showTranslationForAnswer = false;

  const size = MIN_BUBBLE_SIZE + Math.random() * (MAX_BUBBLE_SIZE - MIN_BUBBLE_SIZE);
  const spawnX = player.x + player.w / 2 - size / 2;
  bullets.push({
    x: spawnX, y: player.y, w: size, h: size, img: bulletImg, timeAlive: 0,
    velocityY: BUBBLE_BASE_SPEED_Y_PPS + (Math.random() - 0.5) * 2 * BUBBLE_SPEED_Y_VARIATION_PPS,
    baseX: spawnX,
    swayFrequency: BUBBLE_SWAY_FREQUENCY_MIN + Math.random() * (BUBBLE_SWAY_FREQUENCY_MAX - BUBBLE_SWAY_FREQUENCY_MIN),
    swayAmplitude: size * (BUBBLE_SWAY_AMPLITUDE_FACTOR_MIN + Math.random() * (BUBBLE_SWAY_AMPLITUDE_FACTOR_MAX - BUBBLE_SWAY_AMPLITUDE_FACTOR_MIN)),
    swayPhaseOffset: Math.random() * Math.PI * 2,
    driftXPerSecond: (Math.random() - 0.5) * 2 * BUBBLE_HORIZONTAL_DRIFT_PPS_MAX,
  });
  sounds.shoot.play();
  event.preventDefault();
}

canvas.addEventListener('touchstart', e => {
  const touch = e.touches[0];
  handleCanvasInteraction(touch.clientX, touch.clientY, e);
}, { passive: false });

canvas.addEventListener('mousedown', e => {
  handleCanvasInteraction(e.clientX, e.clientY, e);
});

canvas.addEventListener('touchmove', e => {
  if (!isGameRunning || isGamePaused) return;
  const touch = e.touches[0];
  const isOverPlayBtnQ = showPlayButtonQuestion && playButtonRectQuestion &&
    touch.clientX >= (playButtonRectQuestion.x - expandedMargin) && touch.clientX <= (playButtonRectQuestion.x + playButtonRectQuestion.w + expandedMargin) &&
    touch.clientY >= (playButtonRectQuestion.y - expandedMargin) && touch.clientY <= (playButtonRectQuestion.y + playButtonRectQuestion.h + expandedMargin);
  const isOverPlayBtnA = showPlayButton && playButtonRect &&
    touch.clientX >= (playButtonRect.x - expandedMargin) && touch.clientX <= (playButtonRect.x + playButtonRect.w + expandedMargin) &&
    touch.clientY >= (playButtonRect.y - expandedMargin) && clientY <= (playButtonRect.y + playButtonRect.h + expandedMargin);
  let isOverWord = false;
  if ((currentQuestionSentence || currentAnswerSentence) && centerSentenceWordRects.length > 0) {
    for (const wordRect of centerSentenceWordRects) {
      if ( touch.clientX >= wordRect.x && touch.clientX <= wordRect.x + wordRect.w &&
           touch.clientY >= wordRect.y - wordRect.h/2 && touch.clientY <= wordRect.y + wordRect.h/2 ) {
        isOverWord = true; break;
      }
    }
  }
  if (isOverPlayBtnQ || isOverPlayBtnA || isOverWord) { e.preventDefault(); return; }
  player.x = touch.clientX - player.w / 2;
  player.y = touch.clientY - player.h / 2 - PLAYER_TOUCH_Y_OFFSET;
  player.x = Math.max(0, Math.min(canvas.width - player.w, player.x));
  player.y = Math.max(topOffset, Math.min(canvas.height - player.h, player.y));
  e.preventDefault();
}, { passive: false });

canvas.addEventListener('mousemove', e => {
  if (!isGameRunning || isGamePaused) return;
  const isOverPlayBtnQ = showPlayButtonQuestion && playButtonRectQuestion &&
      e.clientX >= (playButtonRectQuestion.x - expandedMargin) && e.clientX <= (playButtonRectQuestion.x + playButtonRectQuestion.w + expandedMargin) &&
      e.clientY >= (playButtonRectQuestion.y - expandedMargin) && e.clientY <= (playButtonRectQuestion.y + playButtonRectQuestion.h + expandedMargin);
  const isOverPlayBtnA = showPlayButton && playButtonRect &&
      e.clientX >= (playButtonRect.x - expandedMargin) && e.clientX <= (playButtonRect.x + playButtonRect.w + expandedMargin) &&
      e.clientY >= (playButtonRect.y - expandedMargin) && e.clientY <= (playButtonRect.y + playButtonRect.h + expandedMargin);
  let isOverWord = false;
  if ((currentQuestionSentence || currentAnswerSentence) && centerSentenceWordRects.length > 0) {
    for (const wordRect of centerSentenceWordRects) {
      if ( e.clientX >= wordRect.x && e.clientX <= wordRect.x + wordRect.w &&
           e.clientY >= wordRect.y - wordRect.h/2 && e.clientY <= wordRect.y + wordRect.h/2 ) {
        isOverWord = true; break;
      }
    }
  }
  if (isOverPlayBtnQ || isOverPlayBtnA || isOverWord) return;
  player.x = e.clientX - player.w / 2;
  player.y = e.clientY - player.h / 2;
  player.x = Math.max(0, Math.min(canvas.width - player.w, player.x));
  player.y = Math.max(topOffset, Math.min(canvas.height - player.h, player.y));
});

window.addEventListener('load', () => {
    calculateTopOffset();
    let storedIndex = Number(localStorage.getItem('sentenceIndex') || 0);
    sentenceIndex = storedIndex % sentences.length;
    localStorage.setItem('sentenceIndex', sentenceIndex.toString());
    if (bgmFiles.length > 0) {
        console.log("BGM object initialized on load. Path: " + bgmAudio.src);
    }
});
