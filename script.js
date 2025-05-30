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

// --- START: Bullet image loading ---
const bulletImg = new Image();
bulletImg.src = 'images/bubble_bullet.png';
// --- END: Bullet image loading ---

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

// --- START: 문장 오디오 재생을 위한 변수 및 함수 ---
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
// --- END: 문장 오디오 재생을 위한 변수 및 함수 ---


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


// Asset 로딩 관리
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
    coffeeVideoAssetReady = true; // Mark as "ready" to not block game start, even if failed
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
  coffeeSteamVideo.onerror = coffeeVideoError; // Handle loading errors for the video
  // Check if video might already be ready (e.g., cached)
  if (coffeeSteamVideo.readyState >= HTMLVideoElement.HAVE_ENOUGH_DATA) coffeeVideoReady();
  else if (coffeeSteamVideo.error) coffeeVideoError(); // Or if it already errored
} else {
  // If the video element itself is missing, assume ready without steam effect
  console.warn("coffeeSteamVideo element not found in HTML. Assuming ready without steam effect.");
  coffeeVideoAssetReady = true; 
  checkAllAssetsReady(); // Ensure this path also calls checkAllAssetsReady
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

// --- START: Cosmos Petal Constants ---
const PETAL_SIZE = 20; // 코스모스 꽃잎 크기
const PETAL_FALL_SPEED_PPS = 25; // 꽃잎 기본 낙하 속도
const PETAL_ROTATION_SPEED_BASE = 1.5; // 꽃잎 회전 속도 (rad/s)
const PETAL_SWAY_AMPLITUDE_BASE = 12; // 꽃잎 좌우 흔들림 폭
const PETAL_SWAY_SPEED_BASE = 1.8;    // 꽃잎 좌우 흔들림 속도
const PETAL_DRIFT_X_PPS_BASE = 30;  // 꽃잎 수평 바람 영향
const PETAL_FLUTTER_AMPLITUDE_BASE = 3.5; // 꽃잎 상하 떨림 폭
const PETAL_FLUTTER_SPEED_BASE = 3.0;   // 꽃잎 상하 떨림 속도
// --- END: Cosmos Petal Constants ---

const SENTENCE_VERTICAL_ADJUSTMENT = -70;
const ANSWER_OFFSET_Y = 60;
const LINE_HEIGHT = 30;
const PLAYER_TOUCH_Y_OFFSET = 15;

let player = { x: 0, y: 0, w: PLAYER_SIZE, h: PLAYER_SIZE };
let bullets = [];
let enemies = [];
let enemyBullets = []; 
let detachedPetals = []; // 떨어진 코스모스 꽃잎을 관리할 배열

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
  return MODAL_AUX.includes(word.toLowerCase()) || DO_AUX.includes(word.toLowerCase());
}
function isWh(word) {
  const whs = ["what","when","where","who","whom","whose","which","why","how"];
  return whs.includes(word.toLowerCase());
}
function isVerb(word) {
  const verbs = [
    "build", "make", "come", "wear", "fight", "hide", "bring", "catch", "use", "share", "play", "feel", "clean",
    "allowed", "join", "break", "crash", "do", "fly", "cry", "got", "lost", "visit", "talk", "help", "stuck", "eat",
    "go", "melt", "laugh", "can", "see", "fix", "jump", "practiced", "open", "hear", "find", "hiding", "start",
    "taken", "rolled", "bring", "carry", "set", "keep"
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

async function getWordTranslation(word, targetLang = 'ko') {
  const cleanedWord = word.replace(/[^a-zA-Z0-9]/g, "").toLowerCase().trim();
  if (!cleanedWord) return "Error: Invalid word";
  await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200)); // Simulate API call delay
  const mockTranslations = { /* translations as before */ };
  if (mockTranslations[cleanedWord]) return mockTranslations[cleanedWord];
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
                window.speechSynthesis.getVoices(); // Trigger loading
            } else {
                // Fallback for browsers that don't support onvoiceschanged
                let attempts = 0;
                const maxAttempts = 20; // Poll for up to 4 seconds
                const intervalId = setInterval(() => {
                    attempts++;
                    if (tryGetAndResolveVoices()) {
                        clearInterval(intervalId);
                    } else if (attempts >= maxAttempts) {
                        clearInterval(intervalId);
                        console.warn("getVoicesReliably: Voices NOT loaded after multiple polling attempts.");
                        resolve([]); // Resolve with empty if still not loaded
                    }
                }, 200);
            }
        }).catch(error => {
            console.error("Error within getVoicesReliably promise:", error);
            voicesPromise = null; // Reset promise on error
            _voices = []; // Clear voices cache
            return []; // Return empty array or rethrow, depending on desired error handling
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
    return null; // Or handle error as appropriate
  }

  if (!availableVoices || availableVoices.length === 0) {
      console.warn("getVoice: No voices available after getVoicesReliably resolved.");
      return null;
  }

  const langNormalized = lang.toLowerCase();
  const langVoices = availableVoices.filter(v => v.lang.toLowerCase() === langNormalized);

  if (langVoices.length === 0) {
    // Fallback to primary language if specific locale not found (e.g., 'en' for 'en-US')
    const primaryLang = langNormalized.split('-')[0];
    const primaryLangVoices = availableVoices.filter(v => v.lang.toLowerCase().startsWith(primaryLang));
    if (primaryLangVoices.length > 0) {
        // Could add gender preference here too if desired for primary lang fallback
        return primaryLangVoices[0]; // Or a more sophisticated selection
    }
    // Further fallback if primary language also not found
  } else {
    // Specific language locale found, try to match gender
    if (gender === 'female') {
        const femaleVoices = langVoices.filter(v => v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('zira') || v.name.toLowerCase().includes('samantha') || v.name.toLowerCase().includes('susan') || v.name.toLowerCase().includes('eva') || v.name.toLowerCase().includes('google us english') || v.name.toLowerCase().includes('여자') || v.name.toLowerCase().includes(' 여성'));
        if (femaleVoices.length > 0) return femaleVoices[0];
    } else if (gender === 'male') {
        const maleVoices = langVoices.filter(v => v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('daniel') || v.name.toLowerCase().includes('tom') || v.name.toLowerCase().includes('google us english') || v.name.toLowerCase().includes('남자') || v.name.toLowerCase().includes(' 남성'));
        if (maleVoices.length > 0) return maleVoices[0];
    }
    // If gender match fails but lang matches, return first available for that lang
    return langVoices[0];
  }

  // Ultimate fallbacks
  const defaultVoice = availableVoices.find(v => v.default);
  if (defaultVoice) return defaultVoice;
  if (availableVoices.length > 0) return availableVoices[0]; // Last resort: any voice

  console.warn("getVoice: Exhausted all fallbacks. No voice found.");
  return null;
}


async function speakWord(word) {
  const cleanWord = word.replace(/[^a-zA-Z0-9]/g, "").trim();
  if (!cleanWord) return;

  try {
    await getVoicesReliably(); // Ensure voices are loaded or loading has been attempted
  } catch (error) {
    console.error(`speakWord: Critical error ensuring voices were loaded for word "${cleanWord}":`, error);
    // Decide if you want to proceed without a specific voice or just return/reject
    return; // Or reject(error);
  }

  return new Promise(async (resolve, reject) => {
    try {
      const utter = new window.SpeechSynthesisUtterance(cleanWord);
      utter.lang = 'en-US';
      utter.rate = 0.92;
      utter.pitch = 1.0;
      utter.volume = 1.0; // Ensure full volume for word speech

      const voice = await getVoice('en-US', 'female'); // Attempt to get the desired voice
      if (voice) {
        utter.voice = voice;
      } else {
        console.warn(`speakWord: No specific voice found for 'en-US' female for word "${cleanWord}". Using system default for this lang if available.`);
        // SpeechSynthesis will use a default voice if utter.voice is not set or is null,
        // typically trying to match utter.lang.
      }

      utter.onend = () => resolve();
      utter.onerror = (event) => {
        console.error(`speakWord: Event 'onerror' for word "${cleanWord}". Error: ${event.error}`, event);
        reject(event.error || new Error(`Unknown speech synthesis error for "${cleanWord}"`));
      };
      window.speechSynthesis.speak(utter);
    } catch (error) {
        // This catch block handles errors from creating SpeechSynthesisUtterance or calling speak()
        console.error(`speakWord: Exception during speakWord execution for "${cleanWord}":`, error);
        reject(error);
    }
  });
}

const englishFont = "23.52px Arial";
const translationFont = "17.0px Arial";

function drawSingleSentenceBlock(sentenceObject, baseY, isQuestionBlock, blockContext) {
    if (!sentenceObject) return { lastY: baseY, wordRects: [] };

    let localWordRects = [];
    ctx.font = englishFont;
    ctx.textAlign = "left"; // Words are placed from left to right for centering calculation
    ctx.textBaseline = "middle"; // Align text vertically to its center

    let lines = [sentenceObject.line1, sentenceObject.line2].filter(l => l && l.trim());
    if (lines.length === 0) return { lastY: baseY, wordRects: [] };

    let blockHeight = lines.length * LINE_HEIGHT;
    let yFirstLineTextCenter;

    if (isQuestionBlock) {
        // Center the entire block of text around baseY
        yFirstLineTextCenter = baseY - blockHeight / 2 + LINE_HEIGHT / 2;
    } else {
        // For answer block, baseY is the top of the block, so first line is baseY + half line height
        yFirstLineTextCenter = baseY + LINE_HEIGHT / 2;
    }

    let lastDrawnTextBottomY = baseY; // Keep track of the bottom of the drawn text

    const sentenceFullText = (sentenceObject.line1 + " " + sentenceObject.line2).trim();
    const isCurrentBlockContentQuestionType = isQuestion(sentenceFullText);


    for (let i = 0; i < lines.length; i++) {
        const lineText = lines[i];
        let currentLineCenterY = yFirstLineTextCenter + i * LINE_HEIGHT;

        const words = lineText.split(" ");
        let wordMetrics = words.map(w => ctx.measureText(w));
        let spaceWidth = ctx.measureText(" ").width;
        let totalLineWidth = wordMetrics.reduce((sum, m) => sum + m.width, 0) + spaceWidth * (words.length - 1);

        let currentX = (canvas.width - totalLineWidth) / 2; // Starting X for the first word to center the line

        const wordHeight = parseFloat(englishFont.match(/(\d*\.?\d*)px/)[1]); // Approximate height for hitboxes

        for (let j = 0; j < words.length; j++) {
            let rawWord = words[j];
            let cleanedWordForColor = rawWord.replace(/[^a-zA-Z0-9]/g, "");
            let lowerCleanedWordForColor = cleanedWordForColor.toLowerCase();

            let color = "#fff"; // Default color

            // Apply coloring rules
            if (isCurrentBlockContentQuestionType && i === 0 && j === 0 && (isAux(lowerCleanedWordForColor) || isWh(lowerCleanedWordForColor))) {
                color = "#40b8ff"; // WH/Aux question starter
            } else if (isVerb(lowerCleanedWordForColor) && !blockContext.verbColored) {
                color = "#FFD600"; // First main verb
                blockContext.verbColored = true; // Only color the first verb this way
            } else if (isAux(lowerCleanedWordForColor) || isBeen(lowerCleanedWordForColor)) {
                color = "#40b8ff"; // Other auxiliary verbs or 'been'
            } else if (isVing(lowerCleanedWordForColor)) {
                color = "#40b8ff"; // -ing forms (often part of verb phrases)
            }

            ctx.fillStyle = color;
            ctx.fillText(rawWord, currentX, currentLineCenterY);

            const measuredWidth = wordMetrics[j].width;
            localWordRects.push({
                word: rawWord,
                x: currentX, y: currentLineCenterY, // y is the vertical center of the word
                w: measuredWidth, h: wordHeight, // Use measured width and estimated height
                lineIndex: i, // Store line index for translation positioning
                isQuestionWord: isQuestionBlock // Store if it's part of the question block
            });

            currentX += measuredWidth + spaceWidth; // Move to next word position
        }
        lastDrawnTextBottomY = currentLineCenterY + LINE_HEIGHT / 2; // Update bottom Y
    }
    return { lastY: lastDrawnTextBottomY, wordRects: localWordRects };
}


function drawPlayButton(buttonRect, baseScaleForOriginalSize) {
    if (!buttonRect) return;

    const visualShrinkFactor = 0.8; // Make the button visually a bit smaller than its hitbox
    const visualWidth = buttonRect.w * visualShrinkFactor;
    const visualHeight = buttonRect.h * visualShrinkFactor;
    const visualX = buttonRect.x + (buttonRect.w - visualWidth) / 2; // Center visual part
    const visualY = buttonRect.y + (buttonRect.h - visualHeight) / 2;

    const internalElementScale = baseScaleForOriginalSize * visualShrinkFactor; // Scale for inner elements like triangle

    ctx.save();
    // Background
    ctx.globalAlpha = Math.min(1.0, centerAlpha + 0.2) * 0.82; // Slightly more opaque than text
    ctx.fillStyle = "#222"; // Dark background
    ctx.beginPath();
    const cornerRadius = 20 * internalElementScale; // Rounded corners scaled
    ctx.roundRect(visualX, visualY, visualWidth, visualHeight, cornerRadius);
    ctx.fill();

    // Border and Play Triangle
    ctx.globalAlpha = centerAlpha; // Match text alpha for these
    ctx.strokeStyle = "#4CAF50"; // Green border
    ctx.lineWidth = 3 * internalElementScale; // Scaled line width
    ctx.beginPath();
    ctx.roundRect(visualX, visualY, visualWidth, visualHeight, cornerRadius);
    ctx.stroke();

    ctx.fillStyle = "#4CAF50"; // Green play triangle
    ctx.beginPath();
    const playSize = 36 * internalElementScale; // Size of the triangle, scaled
    const btnPad = 18 * internalElementScale;   // Padding inside the button, scaled
    const triangleSymbolVerticalLineXOffset = 6 * internalElementScale; // Slight offset for better visual centering of triangle

    // Draw triangle points
    ctx.moveTo(visualX + btnPad + triangleSymbolVerticalLineXOffset, visualY + btnPad);
    ctx.lineTo(visualX + btnPad + triangleSymbolVerticalLineXOffset, visualY + visualHeight - btnPad);
    ctx.lineTo(visualX + btnPad + playSize, visualY + visualHeight / 2);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
}


function drawCenterSentence() {
    if (!currentQuestionSentence && !currentAnswerSentence && !fireworks) {
        centerSentenceWordRects = []; // Clear rects if nothing to draw
        return;
    }

    centerSentenceWordRects = []; // Reset for current frame
    ctx.save();
    ctx.globalAlpha = centerAlpha; // Apply overall fade for sentence appearance/disappearance

    const mainRenderAreaYCenter = topOffset + (canvas.height - topOffset) / 2;
    const questionBlockCenterY = mainRenderAreaYCenter + SENTENCE_VERTICAL_ADJUSTMENT;

    let questionBlockContext = { verbColored: false }; // To color only the first verb
    let questionDrawOutput = { lastY: questionBlockCenterY - LINE_HEIGHT, wordRects: [] }; // Default if no question

    // --- Define button dimensions based on a scale factor ---
    const baseOverallScale = 0.49; // Base scale for button elements if they were at original size
    const visualReductionFactor = 0.8; // How much smaller the button looks than its hitbox
    const currentVisualScaleForHitbox = baseOverallScale * visualReductionFactor; // Effective scale for hitbox calculations

    // Calculate button width/height for hitbox based on scaled internal elements
    const btnH_forHitbox = (36 * currentVisualScaleForHitbox) + (18 * currentVisualScaleForHitbox * 2); // playSize + 2*padding
    const btnW_forHitbox = (36 * currentVisualScaleForHitbox) + (18 * currentVisualScaleForHitbox * 2); // playSize + 2*padding
    const btnX = 10; // X position from left edge

    // --- Draw Question Block ---
    if (currentQuestionSentence) {
        questionDrawOutput = drawSingleSentenceBlock(currentQuestionSentence, questionBlockCenterY, true, questionBlockContext);
        centerSentenceWordRects.push(...questionDrawOutput.wordRects);

        // Define and draw play button for question
        const questionButtonActualCenterY = questionBlockCenterY; // Button centered with the question block
        playButtonRectQuestion = { x: btnX, y: questionButtonActualCenterY - btnH_forHitbox / 2, w: btnW_forHitbox, h: btnH_forHitbox };
        if (showPlayButtonQuestion) {
            drawPlayButton(playButtonRectQuestion, currentVisualScaleForHitbox);
        }

        // Draw translation for question if active
        if (showTranslationForQuestion && currentQuestionSentenceIndex !== null && translations[currentQuestionSentenceIndex]) {
            ctx.save();
            ctx.globalAlpha = centerAlpha; // Ensure translation respects fade
            ctx.font = translationFont;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#FFD600"; // Yellow for translation
            ctx.shadowColor = "#111"; ctx.shadowBlur = 4; // Text shadow for readability
            const translationTextHeight = parseFloat(translationFont.match(/(\d*\.?\d*)px/)[1]);
            const translationBelowY = questionDrawOutput.lastY + 10 + translationTextHeight / 2; // Position below sentence
            ctx.fillText(translations[currentQuestionSentenceIndex], canvas.width / 2, translationBelowY);
            ctx.restore();
        }
    }

    // --- Draw Answer Block ---
    if (currentAnswerSentence) {
        const answerLines = [currentAnswerSentence.line1, currentAnswerSentence.line2].filter(l => l && l.trim());
        const answerBlockHeight = answerLines.length * LINE_HEIGHT;
        let topYForAnswerBlock;

        if (currentQuestionSentence) {
            topYForAnswerBlock = questionDrawOutput.lastY + ANSWER_OFFSET_Y; // Position below question
        } else {
            // If no question, center the answer block like a question block
            topYForAnswerBlock = questionBlockCenterY - (answerBlockHeight / 2);
        }

        // Define and draw play button for answer
        const answerButtonActualCenterY = topYForAnswerBlock + answerBlockHeight / 2; // Button centered with the answer block
        playButtonRect = { x: btnX, y: answerButtonActualCenterY - btnH_forHitbox / 2, w: btnW_forHitbox, h: btnH_forHitbox };
        if (showPlayButton) {
            drawPlayButton(playButtonRect, currentVisualScaleForHitbox);
        }

        let answerBlockContext = { verbColored: false }; // Reset for answer block
        const answerDrawOutput = drawSingleSentenceBlock(currentAnswerSentence, topYForAnswerBlock, false, answerBlockContext);
        centerSentenceWordRects.push(...answerDrawOutput.wordRects);

        // Draw translation for answer if active
        if (showTranslationForAnswer && currentAnswerSentenceIndex !== null && translations[currentAnswerSentenceIndex]) {
            ctx.save();
            ctx.globalAlpha = centerAlpha; // Ensure translation respects fade
            ctx.font = translationFont;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#FFD600";
            ctx.shadowColor = "#111"; ctx.shadowBlur = 4;
            const translationTextHeight = parseFloat(translationFont.match(/(\d*\.?\d*)px/)[1]);
            const translationBelowY = answerDrawOutput.lastY + 10 + translationTextHeight / 2;
            ctx.fillText(translations[currentAnswerSentenceIndex], canvas.width / 2, translationBelowY);
            ctx.restore();
        }
    }

    // --- Draw Active Word Translation ---
    if (activeWordTranslation && activeWordTranslation.show) {
        ctx.save();
        ctx.globalAlpha = centerAlpha; // Ensure word translation respects fade
        const wordTransFontFamily = "'Malgun Gothic', 'Nanum Gothic', Arial, sans-serif"; // Korean-friendly font
        const wordTransFontSize = 16;
        ctx.font = `${wordTransFontSize}px ${wordTransFontFamily}`;
        ctx.textAlign = "center";
        ctx.fillStyle = "#98FB98"; // Light green for word translation
        ctx.shadowColor = "rgba(0,0,0,0.6)"; ctx.shadowBlur = 2; ctx.shadowOffsetX = 1; ctx.shadowOffsetY = 1;

        const englishWordMiddleY = activeWordTranslation.y; // y is already middle
        const englishWordHalfHeight = activeWordTranslation.h / 2;
        const padding = 6; // Padding between English word and its translation

        let tx = activeWordTranslation.x + activeWordTranslation.w / 2; // Center of the English word
        let ty;

        // Position translation above or below based on line index
        if (activeWordTranslation.lineIndex === 0) { // First line of a sentence block
            ctx.textBaseline = "bottom";
            ty = englishWordMiddleY - englishWordHalfHeight - padding;
        } else { // Second line of a sentence block
            ctx.textBaseline = "top";
            ty = englishWordMiddleY + englishWordHalfHeight + padding;
        }
        ctx.fillText(activeWordTranslation.translation, tx, ty);
        ctx.restore();
    }
    ctx.restore(); // Restore globalAlpha and other canvas states
}


function drawFireworks() {
  if (!fireworks) return;
  ctx.save();
  ctx.font = "23.52px Arial"; // Consistent font size with sentences
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  fireworks.forEach(fw => {
    ctx.globalAlpha = 1; // Fireworks words are fully opaque during animation
    ctx.fillStyle = fw.color;
    ctx.fillText(fw.text, fw.x, fw.y);
  });

  ctx.restore();
}

function splitSentence(sentenceText) {
  if (!sentenceText) return ["", ""];
  const words = sentenceText.split(" ");
  // If sentence is short (<=4 words and < 35 chars), keep it on one line.
  if (words.length <= 4 && sentenceText.length < 35) {
      return [sentenceText, ""];
  }
  // Otherwise, split roughly in half by word count.
  const half = Math.ceil(words.length / 2);
  const line1 = words.slice(0, half).join(" ");
  const line2 = words.slice(half).join(" ");
  return [line1, line2];
}

// Helper to get angles for firework explosion (clockwise from top)
function getClockwiseAngle(index, total) {
  return -Math.PI / 2 + (index * 2 * Math.PI) / total;
}


function startFireworks(sentenceTextForFireworks, globalSentenceIndex, explosionX, explosionY) {
    let roleOfNewSentence;
    let questionTextForLayout = ""; // Used if the new sentence is an answer, to position it correctly

    // Determine if the new sentence is a question or an answer based on its global index
    if (globalSentenceIndex % 2 === 0) { // Even index = question
        roleOfNewSentence = 'question';
    } else { // Odd index = answer
        roleOfNewSentence = 'answer';
    }

    // --- State Reset based on new sentence role ---
    if (roleOfNewSentence === 'question') {
        // New question: Clear both current question and answer, hide all buttons and translations
        currentQuestionSentence = null; currentAnswerSentence = null;
        currentQuestionSentenceIndex = null; currentAnswerSentenceIndex = null;
        showPlayButton = false; showPlayButtonQuestion = false;
        showTranslationForQuestion = false; showTranslationForAnswer = false;
    } else { // New sentence is an answer
        // If there was a preceding question, try to keep it displayed
        if (currentQuestionSentence && currentQuestionSentenceIndex === globalSentenceIndex - 1) {
            // The current question is indeed the one preceding this answer
            questionTextForLayout = (currentQuestionSentence.line1 + " " + currentQuestionSentence.line2).trim();
            // Keep showPlayButtonQuestion as is (should be true if question is visible)
            // Keep showTranslationForQuestion as is
        } else if (globalSentenceIndex > 0 && sentences[globalSentenceIndex - 1]) {
            // Current question isn't set or doesn't match, but a preceding sentence exists in data
            // We'll need to reconstruct it later if we want to show it. For layout, just get its text.
            questionTextForLayout = sentences[globalSentenceIndex - 1];
            // Since we might be re-showing the question, assume its button and translation are off for now
            // showPlayButtonQuestion = true; // Will be set when question is actually drawn
            // showTranslationForQuestion = false;
        } else {
            questionTextForLayout = " "; // No preceding question context
        }
        // Clear current answer, its button, and its translation
        currentAnswerSentence = null; currentAnswerSentenceIndex = null;
        showPlayButton = false; // Answer's play button
        // showTranslationForQuestion = false; // Handled above or by question display logic
        showTranslationForAnswer = false;
    }

    // Clear any active word translation popup
    if (activeWordTranslation) activeWordTranslation.show = false;
    activeWordTranslation = null;
    if (wordTranslationTimeoutId) clearTimeout(wordTranslationTimeoutId);

    centerSentenceWordRects = []; // Clear clickable word areas

    // --- Prepare fireworks words ---
    const [fireworkLine1, fireworkLine2] = splitSentence(sentenceTextForFireworks);
    const wordsForFireworks = [];
    if (fireworkLine1.trim()) wordsForFireworks.push(...fireworkLine1.split(" ").map(word => ({ word, row: 0 })));
    if (fireworkLine2.trim()) wordsForFireworks.push(...fireworkLine2.split(" ").map(word => ({ word, row: 1 })));

    if(wordsForFireworks.length === 0) { // Should not happen if sentenceText is valid
        sentenceActive = false; return;
    }

    // --- Fireworks animation parameters ---
    const baseRadius = 51.2 * 0.88; const maxRadius = 120.96 * 0.88; // Radii for explosion
    let centerX = explosionX; const margin = 8; // Ensure fireworks stay on screen
    if (centerX - maxRadius < margin) centerX = margin + maxRadius;
    if (centerX + maxRadius > canvas.width - margin) centerX = canvas.width - margin - maxRadius;

    fireworks = []; // Array to hold individual firework word objects
    fireworksState = {
        t: 0, phase: "explode", holdDuration: 60, explodeDuration: 180, gatherDuration: 45,
        originX: centerX, originY: explosionY,
        sentenceTextToDisplayAfter: sentenceTextForFireworks,
        finalSentenceIndex: globalSentenceIndex,
        roleOfNewSentence: roleOfNewSentence,
    };

    // --- Calculate final Y positions for words (targetY) ---
    const mainRenderAreaYCenter = topOffset + (canvas.height - topOffset) / 2;
    const [sL1_fw, sL2_fw] = splitSentence(sentenceTextForFireworks); // Split the incoming sentence
    const sLines_fw = [sL1_fw, sL2_fw].filter(l => l && l.trim());
    const sentenceBlockFinalHeight_fw = sLines_fw.length * LINE_HEIGHT; // Height of the new sentence block

    for (let j = 0; j < wordsForFireworks.length; j++) {
        const angle = getClockwiseAngle(j, wordsForFireworks.length);
        const color = burstColors[j % burstColors.length];
        let wordTargetY; // Final Y position for this word in the sentence line

        if (roleOfNewSentence === 'question') {
            const qBlockFinalCenterY = mainRenderAreaYCenter + SENTENCE_VERTICAL_ADJUSTMENT;
            // Y for word in question: centered block, then offset by row and half line height
            wordTargetY = qBlockFinalCenterY - sentenceBlockFinalHeight_fw / 2 + (wordsForFireworks[j].row * LINE_HEIGHT) + (LINE_HEIGHT / 2);
        } else { // New sentence is an answer
            // Need to determine the Y position of the preceding question block to place answer below it
            const [qTextL1_layout, qTextL2_layout] = splitSentence(questionTextForLayout);
            const qTextLines_layout = [qTextL1_layout, qTextL2_layout].filter(l => l && l.trim());
            const questionBlockActualHeight_layout = qTextLines_layout.length * LINE_HEIGHT;
            const questionBlockActualCenterY_layout = mainRenderAreaYCenter + SENTENCE_VERTICAL_ADJUSTMENT;
            const questionBlockActualBottomY_layout = questionBlockActualCenterY_layout + questionBlockActualHeight_layout / 2;

            let answerBlockFinalTopY_fw;
            if (qTextLines_layout.length > 0) { // If there was a question
                answerBlockFinalTopY_fw = questionBlockActualBottomY_layout + ANSWER_OFFSET_Y;
            } else { // No preceding question, center the answer like a question
                answerBlockFinalTopY_fw = questionBlockActualCenterY_layout - sentenceBlockFinalHeight_fw / 2;
            }
            // Y for word in answer: top of answer block, then offset by row and half line height
            wordTargetY = answerBlockFinalTopY_fw + (wordsForFireworks[j].row * LINE_HEIGHT) + (LINE_HEIGHT / 2);
        }

        fireworks.push({
            text: wordsForFireworks[j].word, angle: angle, rowInSentence: wordsForFireworks[j].row,
            x: centerX, y: explosionY, // Start at explosion point
            radius: baseRadius, maxRadius: maxRadius,
            color: color,
            targetX: 0, // targetX will be calculated during "gather" phase
            targetY: wordTargetY, // Final Y position
        });
    }
    sentenceActive = true; centerAlpha = 1.0; // Start fireworks animation
}


function updateFireworks() {
  if (!fireworks || !fireworksState) return false; // Not active

  fireworksState.t++; // Increment frame counter for current phase

  if (fireworksState.phase === "explode") {
    const progress = Math.min(fireworksState.t / fireworksState.explodeDuration, 1);
    const ease = 1 - Math.pow(1 - progress, 2); // Ease-out quadratic
    const currentRadius = 51.2 * 0.88 + (120.96 * 0.88 - 51.2 * 0.88) * ease; // Interpolate radius

    fireworks.forEach((fw) => {
      fw.radius = currentRadius;
      fw.x = fireworksState.originX + Math.cos(fw.angle) * fw.radius;
      fw.y = fireworksState.originY + Math.sin(fw.angle) * fw.radius;
    });

    if (progress >= 1) { fireworksState.phase = "hold"; fireworksState.t = 0; }
  } else if (fireworksState.phase === "hold") {
    if (fireworksState.t >= fireworksState.holdDuration) {
      fireworksState.phase = "gather"; fireworksState.t = 0;
      centerAlpha = 0; // Start fading in the actual sentence text
    }
  } else if (fireworksState.phase === "gather") {
    const progress = Math.min(fireworksState.t / fireworksState.gatherDuration, 1);
    const ease = Math.pow(progress, 2); // Ease-in quadratic for gathering

    // Calculate target X positions for words in the final sentence layout
    // This needs to be done once or kept stable during gather phase.
    // For simplicity, calculating it here repeatedly, but could be pre-calculated.
    const tempCtx = canvas.getContext('2d'); // Use a temporary context for text measurement
    tempCtx.font = englishFont;
    const [sentenceLine1Gather, sentenceLine2Gather] = splitSentence(fireworksState.sentenceTextToDisplayAfter);
    let sentenceLineWordArrays = [];
    if(sentenceLine1Gather.trim()) sentenceLineWordArrays.push(sentenceLine1Gather.split(" "));
    if(sentenceLine2Gather.trim()) sentenceLineWordArrays.push(sentenceLine2Gather.split(" "));

    let wordIndexInFireworks = 0;
    for (let i = 0; i < sentenceLineWordArrays.length; i++) {
        const wordsInLine = sentenceLineWordArrays[i];
        let wordMetrics = wordsInLine.map(w => tempCtx.measureText(w));
        let spaceWidth = tempCtx.measureText(" ").width;
        let totalLineWidth = wordMetrics.reduce((sum, m) => sum + m.width, 0) + spaceWidth * (wordsInLine.length - 1);
        let currentXTargetForLineStart = (canvas.width - totalLineWidth) / 2; // Start X for the line

        for (let j = 0; j < wordsInLine.length; j++) {
            if (fireworks[wordIndexInFireworks]) {
                // Calculate the starting X of the current word in its line
                const wordStartTargetX = currentXTargetForLineStart + wordMetrics.slice(0, j).reduce((sum, m) => sum + m.width + spaceWidth, 0);
                fireworks[wordIndexInFireworks].targetX = wordStartTargetX; // This is the left edge of the word
            }
            wordIndexInFireworks++;
        }
    }

    // Interpolate position of each firework word towards its target
    fireworks.forEach((fw) => {
      // For targetX, we need to draw the word starting at targetX, not centered on it.
      // The .x, .y in fireworks are for drawing with fillText(text, x, y) where x,y is the start.
      // However, the drawFireworks function uses textAlign="center".
      // Let's adjust: targetX should be the center of the word.
      const wordWidth = tempCtx.measureText(fw.text).width;
      const centeredTargetX = fw.targetX + wordWidth / 2;

      fw.x += (centeredTargetX - fw.x) * ease * 0.2; // Slower interpolation for smoother gather
      fw.y += (fw.targetY - fw.y) * ease * 0.2;
    });
    centerAlpha += (1.0 - centerAlpha) * ease * 0.15; // Fade in the sentence text

    if (progress >= 1) { // Gather complete
        fireworksState.phase = "done";
        const newSentenceText = fireworksState.sentenceTextToDisplayAfter;
        const newSentenceIndex = fireworksState.finalSentenceIndex;
        const roleOfNewSentence = fireworksState.roleOfNewSentence;

        const [newLine1, newLine2] = splitSentence(newSentenceText);
        const newSentenceObject = { line1: newLine1, line2: newLine2 };
        let playAudioForThisSentence = false;

        if (roleOfNewSentence === 'question') {
            currentQuestionSentence = newSentenceObject; currentQuestionSentenceIndex = newSentenceIndex;
            currentAnswerSentence = null; currentAnswerSentenceIndex = null; // Ensure answer is cleared
            showPlayButton = false; showPlayButtonQuestion = true; // Show Q button, hide A button
            playAudioForThisSentence = true;
        } else { // Role is 'answer'
            const questionIndexOfThisAnswer = newSentenceIndex - 1;
            // Ensure the preceding question is displayed
            if (questionIndexOfThisAnswer >= 0 && sentences[questionIndexOfThisAnswer]) {
                // If currentQuestion isn't already set or is wrong, set it
                if (!currentQuestionSentence || currentQuestionSentenceIndex !== questionIndexOfThisAnswer) {
                    const [qL1, qL2] = splitSentence(sentences[questionIndexOfThisAnswer]);
                    currentQuestionSentence = {line1: qL1, line2: qL2};
                    currentQuestionSentenceIndex = questionIndexOfThisAnswer;
                }
                 showPlayButtonQuestion = true; // Always show Q button if Q exists
            } else { // No valid preceding question
                currentQuestionSentence = null; currentQuestionSentenceIndex = null;
                showPlayButtonQuestion = false;
            }
            currentAnswerSentence = newSentenceObject; currentAnswerSentenceIndex = newSentenceIndex;
            showPlayButton = true; // Show A button
            playAudioForThisSentence = true;
        }

        centerAlpha = 1.0; // Ensure fully visible
        fireworks = null; fireworksState = null; sentenceActive = false; // Fireworks animation ends

        // Clear any residual word translation pop-ups
        if (activeWordTranslation) activeWordTranslation.show = false;
        activeWordTranslation = null; if (wordTranslationTimeoutId) clearTimeout(wordTranslationTimeoutId);

        // Play audio for the newly displayed sentence
        if (playAudioForThisSentence) {
            let audioIndexToPlay = null;
            if (roleOfNewSentence === 'question' && currentQuestionSentenceIndex !== null) audioIndexToPlay = currentQuestionSentenceIndex;
            else if (roleOfNewSentence === 'answer' && currentAnswerSentenceIndex !== null) audioIndexToPlay = currentAnswerSentenceIndex;

            if (audioIndexToPlay !== null) {
                setTimeout(() => { // Short delay for visual settlement
                    window.speechSynthesis.cancel(); // Stop any ongoing TTS
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
  const spawnYMax = canvas.height * 0.2; // Spawn in the top 20% of the game area below controls
  const y = topOffset + Math.random() * spawnYMax + 20; // Ensure some margin from very top

  let enemy = {
    x, y, w: ENEMY_SIZE, h: ENEMY_SIZE, img, shot: false, imgIndex: idx,
    baseY: y, 
    initialX: x, 
    rotation: 0 
  };

  if (idx === 3) { // Maple Leaf (enemy4.png)
    enemy.swayAngle = Math.random() * Math.PI * 2;
    enemy.swaySpeed = (Math.random() * 2 + 1.5) * (Math.random() > 0.5 ? 1 : -1); 
    enemy.swayAmplitude = Math.random() * 20 + 20; 
    enemy.driftXPerSecond = (Math.random() - 0.5) * 60; 
    enemy.flutterAngle = Math.random() * Math.PI * 2;
    enemy.flutterSpeed = Math.random() * 5 + 3; 
    enemy.flutterAmplitude = Math.random() * 3 + 3; 
  } else if (idx === 2) { // Cosmos Flower (enemy3.png)
    enemy.rotationSpeed = (Math.random() * 0.8 + 0.4) * (Math.random() > 0.5 ? 1 : -1); 
    enemy.driftXPerSecond = (Math.random() - 0.5) * 20; 
    enemy.swayAngle = Math.random() * Math.PI * 2;
    enemy.swaySpeed = (Math.random() * 0.8 + 0.4); 
    enemy.swayAmplitude = Math.random() * 10 + 5; 

    // --- START: Spawn a detached petal for Cosmos ---
    const petal = {
        x: enemy.x + enemy.w / 2 - PETAL_SIZE / 2, // Start near flower center
        y: enemy.y + enemy.h / 2,
        w: PETAL_SIZE,
        h: PETAL_SIZE,
        img: enemyImgs[2], // Use the cosmos image, will be drawn smaller
        
        baseY: enemy.y + enemy.h / 2, // Base for vertical movement
        initialX: enemy.x + enemy.w / 2 - PETAL_SIZE / 2, // Base for horizontal movement
        
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * PETAL_ROTATION_SPEED_BASE * 2 + (Math.random() > 0.5 ? 0.3 : -0.3),

        swayAngle: Math.random() * Math.PI * 2,
        swaySpeed: (Math.random() * 0.5 + 0.75) * PETAL_SWAY_SPEED_BASE * (Math.random() > 0.5 ? 1 : -1),
        swayAmplitude: Math.random() * (PETAL_SWAY_AMPLITUDE_BASE * 0.6) + (PETAL_SWAY_AMPLITUDE_BASE * 0.7),

        driftXPerSecond: (Math.random() - 0.5) * PETAL_DRIFT_X_PPS_BASE * 1.5,

        flutterAngle: Math.random() * Math.PI * 2,
        flutterSpeed: (Math.random() * 0.8 + 0.6) * PETAL_FLUTTER_SPEED_BASE,
        flutterAmplitude: Math.random() * (PETAL_FLUTTER_AMPLITUDE_BASE * 0.5) + (PETAL_FLUTTER_AMPLITUDE_BASE * 0.5),
        
        fallSpeedPPS: PETAL_FALL_SPEED_PPS * (Math.random() * 0.4 + 0.8) // Vary fall speed slightly
    };
    detachedPetals.push(petal);
    // --- END: Spawn a detached petal for Cosmos ---
  }
  enemies.push(enemy);
}

function update(delta) {
  // Filter enemies that are off-screen (below)
  enemies = enemies.filter(e => e.y <= canvas.height + e.h); 
  // Spawn new enemies if count is low
  while (enemies.length < 2) spawnEnemy();

  enemies.forEach(e => {
    const deltaTimeSeconds = delta / 1000.0;
    e.baseY += ENEMY_MOVEMENT_SPEED_PPS * deltaTimeSeconds; // Basic downward movement
    
    let newX = e.x; 
    let newY = e.baseY;

    if (e.imgIndex === 3) { // Maple Leaf (enemy4.png)
      e.initialX += e.driftXPerSecond * deltaTimeSeconds;
      e.swayAngle += e.swaySpeed * deltaTimeSeconds;
      newX = e.initialX + Math.sin(e.swayAngle) * e.swayAmplitude;
      e.rotation = Math.sin(e.swayAngle * 0.7) * 0.7; 
      e.flutterAngle += e.flutterSpeed * deltaTimeSeconds;
      newY = e.baseY + Math.sin(e.flutterAngle) * e.flutterAmplitude;
    } else if (e.imgIndex === 2) { // Cosmos Flower (enemy3.png)
      e.initialX += e.driftXPerSecond * deltaTimeSeconds;
      e.rotation += e.rotationSpeed * deltaTimeSeconds; 
      e.swayAngle += e.swaySpeed * deltaTimeSeconds;
      newX = e.initialX + Math.sin(e.swayAngle) * e.swayAmplitude;
      // newY remains e.baseY for the main cosmos flower
    }
    // For other enemies (imgIndex 0, 1, 4), they fall straight based on e.baseY and their initial spawn x.
    
    e.x = newX;
    e.y = newY;
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

  // --- START: Update Detached Cosmos Petals ---
  detachedPetals.forEach((p, index) => {
      const deltaTimeSeconds = delta / 1000.0;

      p.baseY += p.fallSpeedPPS * deltaTimeSeconds;
      p.initialX += p.driftXPerSecond * deltaTimeSeconds;

      p.swayAngle += p.swaySpeed * deltaTimeSeconds;
      let currentX = p.initialX + Math.sin(p.swayAngle) * p.swayAmplitude;
      
      p.flutterAngle += p.flutterSpeed * deltaTimeSeconds;
      let currentY = p.baseY + Math.sin(p.flutterAngle) * p.flutterAmplitude;

      p.rotation += p.rotationSpeed * deltaTimeSeconds;

      p.x = currentX;
      p.y = currentY;

      // Note: Splicing inside forEach can be tricky. Filtering after is safer.
  });
  detachedPetals = detachedPetals.filter(p => p.y <= canvas.height + p.h); // Remove petals off-screen
  // --- END: Update Detached Cosmos Petals ---

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

      if (coreBulletX < e.x + e.w &&
          coreBulletX + coreBulletWidth > e.x &&
          coreBulletY < e.y + e.h &&
          coreBulletY + coreBulletHeight > e.y) {
        if (!sentenceActive) { // Only trigger fireworks if no sentence is currently active
            const sentenceToFirework = sentences[sentenceIndex];
            const globalIndexOfSentence = sentenceIndex; // Current index before increment
            startFireworks(sentenceToFirework, globalIndexOfSentence, e.x + e.w / 2, e.y + e.h / 2);
            sentenceIndex = (sentenceIndex + 1) % sentences.length; // Move to next sentence
            localStorage.setItem('sentenceIndex', sentenceIndex.toString()); // Save new index
            sounds.explosion.play();
        }
        enemies.splice(ei, 1); bullets.splice(bi, 1);
      }
    });
  });
  if (sentenceActive) updateFireworks(); // Update fireworks if they are running

  // Manage visibility of play buttons and translations when no fireworks are active
  if (!currentQuestionSentence && !currentAnswerSentence && !sentenceActive) {
    showPlayButton = false; showPlayButtonQuestion = false;
    showTranslationForQuestion = false; showTranslationForAnswer = false;
    if (activeWordTranslation) activeWordTranslation.show = false;
  } else if (!sentenceActive) { // Sentences might be displayed but no fireworks
      showPlayButtonQuestion = !!currentQuestionSentence;
      showPlayButton = !!currentAnswerSentence;
      // Translations visibility is handled by clicks/taps
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(playerImg, player.x, player.y, player.w, player.h);

  enemies.forEach(e => {
    if (e.imgIndex === 2 || e.imgIndex === 3) { // Cosmos or Maple Leaf - apply rotation
      ctx.save();
      ctx.translate(e.x + e.w / 2, e.y + e.h / 2);
      ctx.rotate(e.rotation);
      ctx.drawImage(e.img, -e.w / 2, -e.h / 2, e.w, e.h);
      ctx.restore();
    } else {
      ctx.drawImage(e.img, e.x, e.y, e.w, e.h); // Other enemies draw normally
    }

    if (e.imgIndex === 1 && coffeeSteamVideo && coffeeSteamVideo.readyState >= HTMLVideoElement.HAVE_ENOUGH_DATA && !coffeeSteamVideo.paused) {
      const steamScale = 0.5; 
      const steamWidth = e.w * steamScale * 1.5; 
      const steamHeight = e.h * steamScale * 1.6; 
      const steamOffsetX = (e.w - steamWidth) / 2; 
      const steamOffsetY = -steamHeight * 0.85; 

      ctx.globalAlpha = 0.65; 
      ctx.drawImage(coffeeSteamVideo, e.x + steamOffsetX, e.y + steamOffsetY, steamWidth, steamHeight);
      ctx.globalAlpha = 1.0; 
    }
  });

  bullets.forEach(b => {
    if (b.img && b.img.complete && b.img.naturalWidth > 0) {
      ctx.drawImage(b.img, b.x, b.y, b.w, b.h);
    }
  });

  // --- START: Draw Detached Cosmos Petals ---
  detachedPetals.forEach(p => {
      ctx.save();
      ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
      ctx.rotate(p.rotation);
      // Draw the petal using its own image (which is the cosmos image), scaled down
      ctx.drawImage(p.img, -p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
  });
  // --- END: Draw Detached Cosmos Petals ---

  // Drawing logic for sentences and fireworks
  const previousGlobalCenterAlpha = centerAlpha; // Store current alpha if fireworks modify it

  if (sentenceActive && fireworks && fireworksState) {
    // If fireworks are for an answer, and a question is already displayed, draw the question first
    if (fireworksState.roleOfNewSentence === 'answer' && currentQuestionSentence) {
      centerAlpha = 1.0; // Ensure question is fully visible if it's just sitting there
      const tempAnswerSentence = currentAnswerSentence; // Temporarily hide answer if it's being formed by fireworks
      const tempAnswerIndex = currentAnswerSentenceIndex;
      currentAnswerSentence = null; currentAnswerSentenceIndex = null;

      drawCenterSentence(); // Draw the existing question

      currentAnswerSentence = tempAnswerSentence; // Restore for fireworks logic
      currentAnswerSentenceIndex = tempAnswerIndex;
    }
    centerAlpha = previousGlobalCenterAlpha; // Restore alpha for fireworks drawing
    drawFireworks();
  } else {
    // No fireworks, just draw any static sentences
    if (currentQuestionSentence || currentAnswerSentence) {
      centerAlpha = 1.0; // Ensure static sentences are fully visible
      drawCenterSentence();
    }
  }

  // Restore alpha if it was changed for drawing static question during answer fireworks
  if (!sentenceActive) centerAlpha = 1.0; // If nothing is happening, alpha should be full for next potential sentence
  else if (fireworksState && fireworksState.phase === "gather") {
      // Alpha is handled by gather phase itself
  } else centerAlpha = previousGlobalCenterAlpha; // Otherwise, maintain current alpha (e.g. during explode/hold)
}


function gameLoop(time) {
  if (!isGameRunning || isGamePaused) {
      if (isGamePaused) draw(); // Keep drawing the paused screen
      return;
  }
  const delta = time - lastTime;
  lastTime = time;
  update(delta); draw();
  requestAnimationFrame(gameLoop);
}

document.getElementById('startBtn').onclick = startGame;
document.getElementById('pauseBtn').onclick = togglePause;
document.getElementById('stopBtn').onclick = stopGame;

function resetGameStateForStartStop() {
    bullets = []; enemies = []; enemyBullets = [];
    detachedPetals = []; // <<< 코스모스 꽃잎 배열 초기화
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
  calculateTopOffset(); // Ensure topOffset is correct before starting
  if (!allAssetsReady) {
    // Consider a more user-friendly way to inform the user, e.g., a loading message on canvas
    alert("이미지 및 비디오 로딩 중입니다. 잠시 후 다시 시도하세요.");
    return;
  }
  isGameRunning = true;
  isGamePaused = false;
  document.getElementById('pauseBtn').textContent = 'PAUSE';

  // BGM setup and play
  if (bgmAudio) {
    bgmAudio.pause(); // Stop any previous instance
  }
  // bgmIndex = 0; // Or manage BGM selection differently if multiple tracks
  bgmAudio = new Audio(bgmFiles[bgmIndex]);
  bgmAudio.volume = isMuted ? 0 : 0.021; 
  bgmAudio.loop = true;

  console.log('Attempting to play BGM. Source:', bgmAudio.src, 'Volume:', bgmAudio.volume, 'Loop:', bgmAudio.loop, 'Muted:', isMuted);
  if (navigator.userActivation) {
    console.log('navigator.userActivation.hasBeenActive:', navigator.userActivation.hasBeenActive);
  } else {
    console.log('navigator.userActivation API not available.');
  }

  const playPromise = bgmAudio.play();
  if (playPromise !== undefined) {
    playPromise.then(_ => {
      console.log('BGM playback started successfully or is already playing.');
    }).catch(error => {
      console.error('BGM play error on start:', error);
      // Inform user if BGM fails, e.g., due to browser autoplay policies
      // alert("배경음악 자동 재생에 실패했습니다. 페이지를 클릭하거나 브라우저 설정을 확인해주세요.");
    });
  } else {
     console.log('bgmAudio.play() did not return a promise. Playback might be handled differently or failed silently.');
  }

  // Coffee steam video play
  if (coffeeSteamVideo && coffeeVideoAssetReady) {
    coffeeSteamVideo.currentTime = 0; // Restart video
    const coffeePlayPromise = coffeeSteamVideo.play();
    if (coffeePlayPromise !== undefined) {
      coffeePlayPromise.catch(error => console.error("Error playing coffee steam video:", error));
    }
  }

  resetGameStateForStartStop(); // Reset all game elements
  let storedIndex = Number(localStorage.getItem('sentenceIndex') || 0);
  sentenceIndex = storedIndex % sentences.length; // Ensure index is valid
  localStorage.setItem('sentenceIndex', sentenceIndex.toString());

  spawnEnemy(); spawnEnemy(); // Initial enemies

  // Player positioning
  player.x = canvas.width / 2 - PLAYER_SIZE / 2;
  player.y = topOffset + (canvas.height - topOffset) - PLAYER_SIZE - 10; // Position at bottom, above controls
  player.y = Math.max(topOffset, player.y); // Ensure player is not above topOffset

  lastTime = performance.now(); // Set time for game loop delta calculation

  // Pre-warm voices
  getVoicesReliably().then(loadedVoices => {
      if (!loadedVoices || loadedVoices.length === 0) {
        console.warn("startGame: Voices NOT available or list empty after pre-warm attempt.");
      } else {
        // console.log("startGame: Voices pre-warmed.", loadedVoices.length, "voices available.");
      }
  }).catch(err => console.error("startGame: Error during voice pre-warming:", err));

  requestAnimationFrame(gameLoop); // Start the game loop
}


function togglePause() {
  if (!isGameRunning) return; // Can't pause if not running
  isGamePaused = !isGamePaused;
  const pauseButton = document.getElementById('pauseBtn');
  if (isGamePaused) {
    pauseButton.textContent = 'RESUME';
    if (bgmAudio && !bgmAudio.paused) bgmAudio.pause();
    if (coffeeSteamVideo && !coffeeSteamVideo.paused) coffeeSteamVideo.pause();
    window.speechSynthesis.cancel(); // Stop any TTS
    if (currentSentenceAudio) currentSentenceAudio.pause(); // Pause sentence mp3
  } else {
    pauseButton.textContent = 'PAUSE';
    if (bgmAudio && bgmAudio.paused && !isMuted) {
        bgmAudio.play().catch(e => console.error("BGM resume error:", e));
    }
    if (coffeeSteamVideo && coffeeSteamVideo.paused && coffeeVideoAssetReady) {
        coffeeSteamVideo.play().catch(error => console.error("Error resuming coffee steam video:", error));
    }
    if (currentSentenceAudio && currentSentenceAudio.paused) {
        currentSentenceAudio.volume = 0.8; // Ensure volume is set on resume
        currentSentenceAudio.play().catch(e => console.error("Sentence audio resume error:", e));
    }
    lastTime = performance.now(); // Reset lastTime to prevent large delta jump
    requestAnimationFrame(gameLoop); // Resume game loop
  }
}

function stopGame() {
  isGameRunning = false; isGamePaused = false;
  document.getElementById('pauseBtn').textContent = 'PAUSE'; // Reset pause button text
  if (bgmAudio) bgmAudio.pause();
  if (coffeeSteamVideo && !coffeeSteamVideo.paused) coffeeSteamVideo.pause();
  window.speechSynthesis.cancel(); // Stop any TTS
  if (currentSentenceAudio) { // Stop and reset sentence mp3
      currentSentenceAudio.pause(); currentSentenceAudio.currentTime = 0; currentSentenceAudio = null;
  }
  resetGameStateForStartStop(); // Reset all game elements
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
}

const expandedMargin = 10; // Increased touch/click area for buttons

function handleCanvasInteraction(clientX, clientY, event) {
  if (!isGameRunning || isGamePaused) return; // Interactions only if game is active

  if (!isActionLocked) { // Prevent rapid multi-triggering
    // Check for play button (question) touch/click
    const isPlayBtnQuestionTouched = showPlayButtonQuestion && playButtonRectQuestion &&
      clientX >= (playButtonRectQuestion.x - expandedMargin) && clientX <= (playButtonRectQuestion.x + playButtonRectQuestion.w + expandedMargin) &&
      clientY >= (playButtonRectQuestion.y - expandedMargin) && clientY <= (playButtonRectQuestion.y + playButtonRectQuestion.h + expandedMargin);

    // Check for play button (answer) touch/click
    const isPlayBtnAnswerTouched = showPlayButton && playButtonRect &&
      clientX >= (playButtonRect.x - expandedMargin) && clientX <= (playButtonRect.x + playButtonRect.w + expandedMargin) &&
      clientY >= (playButtonRect.y - expandedMargin) && clientY <= (playButtonRect.y + playButtonRect.h + expandedMargin);

    if (isPlayBtnQuestionTouched) {
      showTranslationForQuestion = true; showTranslationForAnswer = false; // Show Q translation
      if (activeWordTranslation) activeWordTranslation.show = false; // Hide word translation
      if (wordTranslationTimeoutId) clearTimeout(wordTranslationTimeoutId);
      activeWordTranslation = null; isActionLocked = true;
      if (currentQuestionSentenceIndex !== null) {
          window.speechSynthesis.cancel(); // Stop any other TTS
          playSentenceAudio(currentQuestionSentenceIndex) // Play question audio
              .catch(err => console.error("Error playing question sentence audio from play button:", err));
      }
      event.preventDefault(); setTimeout(() => { isActionLocked = false; }, 200); return;
    }

    if (isPlayBtnAnswerTouched) {
      showTranslationForAnswer = true; showTranslationForQuestion = false; // Show A translation
      if (activeWordTranslation) activeWordTranslation.show = false; // Hide word translation
      if (wordTranslationTimeoutId) clearTimeout(wordTranslationTimeoutId);
      activeWordTranslation = null; isActionLocked = true;
      if (currentAnswerSentenceIndex !== null) {
          window.speechSynthesis.cancel(); // Stop any other TTS
          playSentenceAudio(currentAnswerSentenceIndex) // Play answer audio
              .catch(err => console.error("Error playing answer sentence audio from play button:", err));
      }
      event.preventDefault(); setTimeout(() => { isActionLocked = false; }, 200); return;
    }

    // Check for word touch/click in sentences
    if ((currentQuestionSentence || currentAnswerSentence) && centerSentenceWordRects.length > 0) {
        for (const wordRect of centerSentenceWordRects) {
          // Check if click/touch is within the word's bounding box
          if (clientX >= wordRect.x && clientX <= wordRect.x + wordRect.w &&
              clientY >= wordRect.y - wordRect.h / 2 && clientY <= wordRect.y + wordRect.h / 2 ) {
            window.speechSynthesis.cancel(); // Stop other TTS
            speakWord(wordRect.word).catch(err => console.error(`Error speaking word "${wordRect.word}":`, err)); // Speak word

            if (wordTranslationTimeoutId) clearTimeout(wordTranslationTimeoutId); // Clear previous timer
            if (activeWordTranslation) activeWordTranslation.show = false; // Hide previous translation
            activeWordTranslation = null; isActionLocked = true;

            getWordTranslation(wordRect.word).then(translation => { // Get and show new translation
                activeWordTranslation = {
                    word: wordRect.word, translation: translation, x: wordRect.x, y: wordRect.y,
                    w: wordRect.w, h: wordRect.h, lineIndex: wordRect.lineIndex,
                    isQuestionWord: wordRect.isQuestionWord, show: true
                };
                wordTranslationTimeoutId = setTimeout(() => { // Timer to hide it
                    if (activeWordTranslation && activeWordTranslation.word === wordRect.word) activeWordTranslation.show = false;
                }, WORD_TRANSLATION_DURATION);
            }).catch(err => console.error("Error getting word translation:", err));

            showTranslationForQuestion = false; showTranslationForAnswer = false; // Hide full sentence translations
            event.preventDefault(); setTimeout(() => { isActionLocked = false; }, 300); return;
          }
        }
    }
  } // End of isActionLocked check

  // If no UI element was interacted with, it's a player action (move and shoot)
  player.x = clientX - player.w / 2; // Center player on touch/mouse
  if (event.type === 'touchstart' || event.type === 'touchmove') player.y = clientY - player.h / 2 - PLAYER_TOUCH_Y_OFFSET; // Adjust Y for touch
  else player.y = clientY - player.h / 2;

  // Keep player within canvas bounds (respecting topOffset)
  player.x = Math.max(0, Math.min(canvas.width - player.w, player.x));
  player.y = Math.max(topOffset, Math.min(canvas.height - player.h, player.y));

  // If a word translation was showing, hide it when player moves/shoots
  if (activeWordTranslation && activeWordTranslation.show) {
    activeWordTranslation.show = false;
    if (wordTranslationTimeoutId) { clearTimeout(wordTranslationTimeoutId); wordTranslationTimeoutId = null; }
  }
  // Hide full sentence translations too
  showTranslationForQuestion = false; showTranslationForAnswer = false;

  // Create and shoot a bubble
  const size = MIN_BUBBLE_SIZE + Math.random() * (MAX_BUBBLE_SIZE - MIN_BUBBLE_SIZE);
  const spawnX = player.x + player.w / 2 - size / 2; 

  bullets.push({
    x: spawnX,
    y: player.y, 
    w: size,
    h: size,
    img: bulletImg,
    timeAlive: 0, 
    velocityY: BUBBLE_BASE_SPEED_Y_PPS + (Math.random() - 0.5) * 2 * BUBBLE_SPEED_Y_VARIATION_PPS,
    baseX: spawnX, 
    swayFrequency: BUBBLE_SWAY_FREQUENCY_MIN + Math.random() * (BUBBLE_SWAY_FREQUENCY_MAX - BUBBLE_SWAY_FREQUENCY_MIN),
    swayAmplitude: size * (BUBBLE_SWAY_AMPLITUDE_FACTOR_MIN + Math.random() * (BUBBLE_SWAY_AMPLITUDE_FACTOR_MAX - BUBBLE_SWAY_AMPLITUDE_FACTOR_MIN)),
    swayPhaseOffset: Math.random() * Math.PI * 2, 
    driftXPerSecond: (Math.random() - 0.5) * 2 * BUBBLE_HORIZONTAL_DRIFT_PPS_MAX,
  });
  sounds.shoot.play();
  event.preventDefault(); // Prevent default actions like scrolling on touch
}

// Touch Listeners
canvas.addEventListener('touchstart', e => {
  const touch = e.touches[0]; // Get first touch point
  handleCanvasInteraction(touch.clientX, touch.clientY, e);
}, { passive: false }); // passive:false to allow preventDefault

// Mouse Listener (for desktop)
canvas.addEventListener('mousedown', e => {
  handleCanvasInteraction(e.clientX, e.clientY, e);
});

// Touch Move Listener
canvas.addEventListener('touchmove', e => {
  if (!isGameRunning || isGamePaused) return;
  const touch = e.touches[0];

  // Check if touch is over UI elements; if so, don't move player
  const isOverPlayBtnQ = showPlayButtonQuestion && playButtonRectQuestion &&
    touch.clientX >= (playButtonRectQuestion.x - expandedMargin) && touch.clientX <= (playButtonRectQuestion.x + playButtonRectQuestion.w + expandedMargin) &&
    touch.clientY >= (playButtonRectQuestion.y - expandedMargin) && touch.clientY <= (playButtonRectQuestion.y + playButtonRectQuestion.h + expandedMargin);
  const isOverPlayBtnA = showPlayButton && playButtonRect &&
    touch.clientX >= (playButtonRect.x - expandedMargin) && touch.clientX <= (playButtonRect.x + playButtonRect.w + expandedMargin) &&
    touch.clientY >= (playButtonRect.y - expandedMargin) && touch.clientY <= (playButtonRect.y + playButtonRect.h + expandedMargin);
  let isOverWord = false;
  if ((currentQuestionSentence || currentAnswerSentence) && centerSentenceWordRects.length > 0) {
    for (const wordRect of centerSentenceWordRects) {
      if ( touch.clientX >= wordRect.x && touch.clientX <= wordRect.x + wordRect.w &&
           touch.clientY >= wordRect.y - wordRect.h/2 && touch.clientY <= wordRect.y + wordRect.h/2 ) {
        isOverWord = true; break;
      }
    }
  }
  if (isOverPlayBtnQ || isOverPlayBtnA || isOverWord) { event.preventDefault(); return; } // Prevent player move if over UI

  // Move player
  player.x = touch.clientX - player.w / 2;
  player.y = touch.clientY - player.h / 2 - PLAYER_TOUCH_Y_OFFSET; // Touch Y offset
  player.x = Math.max(0, Math.min(canvas.width - player.w, player.x));
  player.y = Math.max(topOffset, Math.min(canvas.height - player.h, player.y));
  e.preventDefault(); // Prevent scrolling
}, { passive: false });

// Mouse Move Listener (for desktop)
canvas.addEventListener('mousemove', e => {
  if (!isGameRunning || isGamePaused) return;

  // Check if mouse is over UI elements; if so, don't move player
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
  if (isOverPlayBtnQ || isOverPlayBtnA || isOverWord) return; // Don't move player if over UI

  // Move player
  player.x = e.clientX - player.w / 2;
  player.y = e.clientY - player.h / 2;
  player.x = Math.max(0, Math.min(canvas.width - player.w, player.x));
  player.y = Math.max(topOffset, Math.min(canvas.height - player.h, player.y));
});

// Initial setup on window load
window.addEventListener('load', () => {
    calculateTopOffset(); // Calculate offset once elements are loaded
    let storedIndex = Number(localStorage.getItem('sentenceIndex') || 0);
    sentenceIndex = storedIndex % sentences.length;
    localStorage.setItem('sentenceIndex', sentenceIndex.toString());

    if (bgmFiles.length > 0) {
        console.log("BGM object initialized on load. Path: " + bgmAudio.src);
        // Note: Autoplay of BGM might be blocked by browser policies until user interaction.
        // startGame() handles the actual play attempt.
    }
});
