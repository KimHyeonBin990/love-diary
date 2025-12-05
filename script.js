// ===============================
// 🔐 비밀번호 체크 + 폭죽
// ===============================
const passwordOverlay = document.getElementById("password-overlay");
const passwordInput = document.getElementById("password-input");
const passwordButton = document.getElementById("password-button");
const passwordError = document.getElementById("password-error");
const passwordBox = document.querySelector(".password-box");

// 🔹 한 번 만들 공용 컨테이너
const confettiContainer = document.createElement("div");
confettiContainer.id = "confetti-container";
document.body.appendChild(confettiContainer);

passwordButton.addEventListener("click", () => {
  const value = passwordInput.value;

  if (value === "1209") {
    handlePasswordSuccess();
  } else {
    // 실패 애니메이션 그대로
    passwordError.textContent = "실망이야..";
    passwordError.classList.remove("shake");
    void passwordError.offsetWidth;
    passwordError.classList.add("shake");
  }
});

function handlePasswordSuccess() {
  // 버튼 여러 번 못 누르게 막기
  passwordButton.disabled = true;

  // 박스 터지는 애니메이션 클래스
  passwordOverlay.classList.add("success-burst");

  // 폭죽 발사
  launchConfetti();

  // ⭐ 비밀번호 통과 후 BGM 재생 → 여기!
  const bgm = document.getElementById("bgm");
  if (bgm) {
    bgm.volume = 0.65;
    bgm.play().catch(() => {});
  }

  // 애니메이션 조금 보여주고 오버레이 제거
  setTimeout(() => {
    passwordOverlay.style.display = "none";
  }, 650);
}


// 🎉 폭죽(컨페티) 생성
function launchConfetti() {
  const CONFETTI_COUNT = 45;

  const rect = passwordBox.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < CONFETTI_COUNT; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";

    // 시작 위치 : 비밀번호 박스 중앙
    piece.style.left = `${centerX}px`;
    piece.style.top = `${centerY}px`;

    // 랜덤 방향/거리/회전
    const dx = (Math.random() - 0.5) * 420; // 좌우
    const dy = (Math.random() - 0.6) * 360; // 위로 조금 더
    const rot = (Math.random() * 720 - 360); // -360~360도

    piece.style.setProperty("--dx", `${dx}px`);
    piece.style.setProperty("--dy", `${dy}px`);
    piece.style.setProperty("--rot", `${rot}deg`);

    confettiContainer.appendChild(piece);

    // 다음 프레임에 애니메이션 시작
    requestAnimationFrame(() => {
      piece.classList.add("animate");
    });

    // 다 떨어지면 제거
    setTimeout(() => {
      piece.remove();
    }, 1000);
  }
}

// ===============================
// 🔽🔼 섹션 이동
// ===============================
const sections = document.querySelectorAll(".full-section");

// id → 섹션 맵
const sectionMap = {};
sections.forEach((sec) => {
  if (sec.id) sectionMap[sec.id] = sec;
});

function showSection(targetId) {
  sections.forEach((sec) => {
    const isTarget = sec.id === targetId;
    sec.classList.toggle("active", isTarget);
    if (isTarget) {
      sec.scrollTop = 0;
    }
  });

  const activeSec = sectionMap[targetId];
  if (activeSec) {
    activeSec.scrollTop = 0;
  }

  // ⭐ 타임라인 섹션으로 이동할 때 옵저버 세팅
  if (targetId === "timeline") {
    setupTimelineObserver();
  }
}

// 처음에는 인트로부터 시작
showSection("intro");

// 모든 nav-button에 클릭 이벤트 연결
document.querySelectorAll(".nav-button[data-target]").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = button.dataset.target;
    if (!targetId) return;
    showSection(targetId);
  });
});

// ===============================
// 🗓 우리가 만난 지 N일째 표시
// ===============================
(function () {
  const daysEl = document.getElementById("days-counter");
  if (!daysEl) return;

  // 기준일: 2024년 12월 9일
  const startDate = new Date(2024, 11, 8); // 0=1월, 11=12월
  const today = new Date();

  startDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffMs = today - startDate;
  const oneDayMs = 1000 * 60 * 60 * 24;
  const diffDays = Math.floor(diffMs / oneDayMs);

  daysEl.textContent = `우리가 만난 지 오늘로 ${diffDays}일째`;
})();

// ===============================
// 💌 편지봉투 열기/닫기 + 타이핑
// ===============================
const letterTrigger = document.getElementById("letter-trigger"); // (지금은 안 씀)
const letterWrapper = document.getElementById("letter-envelope-wrapper");
const letterTextEl = document.getElementById("letter-text");
const closeLetterBtn = document.querySelector(".close-letter");

const letterMessage = `오오~ 숨겨놨는데 어떻게 찾았대?
역시 우리 탐정황!
이건 내가 준비한 작은 서프라이즈 편지야.

자기야, 우리 벌써 1주년이야.
시간이 진짜 말도 안 되게 빨리 지나간다.
작년 이맘때만 해도 완전 어색했는데…
이제는 가족처럼 느껴질 만큼 편해졌어.
나한테 이렇게 편한 사람 생긴 건 처음이야.

이 웹사이트 만들면서
우리 사진 하나씩 다시 보는데
괜히 뿌듯하고 행복하더라.
자기는 살짝 눈물 날지도? ㅎㅎ

요즘 많이 힘들지?
회사 끝나고 학교까지 다니는 게 쉽지 않은데
그걸 하루하루 묵묵히 해내는 모습 보면
난 진짜 자기가 대단하다고 생각해.

가족도 챙기고, 회사도 다니고, 학교까지 다니고,
마지막으로 나까지 챙기느라
정말 고생 많았어.
힘든 날에도 나한테 웃어줘서 고마워.
이제 곧 종강이니까 조금은 편해지겠다.

시간이 너무 빨리 흘러.
이 짧은 인생을 일만 하다가 보내면 슬프잖아?
우리 앞으로는 더 많이 놀러 다니고,
더 많은 추억 만들고, 더 많이 웃자.

나는 사실 부족한 사람이지만
자기라는 빛이 옆에 있으니까
자신감도 생기고, 용기도 생기고,
뭔가 더 잘해보고 싶어져.
나는 항상 그 빛을 따라갈게.

그리고 건강은 정말 1순위야!
요즘 자기 컨디션 안 좋아 보여서 걱정돼.
곧 여행 가는데 아프면 너무 속상하니까
집에서도, 학교에서도, 회사에서도
자기 몸부터 꼭 챙겨줘.

앞으로도 우리가 싸우면 금방 풀고,
서로 예쁘게 말하고,
더 많이 여행 다니고,
더 많이 웃자.

자기야, 1년 동안 정말 고생 많았어.
그리고 진심으로 고마워.
나는 자기를 많이… 정말 많이 사랑해. ❤️`;


let typingIndex = 0;
let typingTimer = null;

function startTyping() {
  if (!letterTextEl) return;

  // 혹시 남아 있던 타이머 정리
  if (typingTimer) {
    clearInterval(typingTimer);
    typingTimer = null;
  }

  letterTextEl.textContent = "";
  // 🔥 시작할 때 바로 보이게
  letterTextEl.classList.add("visible");
  typingIndex = 0;

  typingTimer = setInterval(() => {
    if (typingIndex < letterMessage.length) {
      letterTextEl.textContent += letterMessage.charAt(typingIndex);
      typingIndex++;
    } else {
      clearInterval(typingTimer);
      typingTimer = null;
      // ✅ 여기서는 더 이상 visible 건드릴 필요 없음
    }
  }, 40); // 여기 숫자는 타이핑 속도(40ms씩 한 글자)
}


function openLetter() {
  if (!letterWrapper) return;
  letterWrapper.classList.add("show");
  setTimeout(startTyping, 350);
}

function closeLetter() {
  if (!letterWrapper) return;
  letterWrapper.classList.remove("show");
  if (typingTimer) {
    clearInterval(typingTimer);
    typingTimer = null;
  }
}

if (letterTrigger) {
  letterTrigger.addEventListener("click", openLetter);
}

if (closeLetterBtn) {
  closeLetterBtn.addEventListener("click", closeLetter);
}

// ===============================
// 💗 버킷리스트 섹션 히든 하트 → 편지 열기
// ===============================
const bucketHeartTrigger = document.getElementById("bucket-heart-trigger");

if (bucketHeartTrigger) {
  bucketHeartTrigger.addEventListener("click", () => {
    bucketHeartTrigger.classList.add("clicked");
    setTimeout(() => {
      bucketHeartTrigger.classList.remove("clicked");
    }, 260);
    openLetter();
  });
}

// ===============================
// 📸 섹션2(사진): 데이터
// ===============================
const photoData = [
  { id: 1, src: "photos/Pic (0).jpg", caption: "오늘의 귀인!! 신기하게 둘이 맞아서 놀랐는데.. 처음에 합성한줄 알았엉.." },
  { id: 2, src: "photos/Pic (1).jpg", caption: "음식이랑 같이 찍어줬어야 했는데!! 센스가 부족했다... 근데 귀여웡!" },
  { id: 3, src: "photos/Pic (2).jpg", caption: "구리에서 쭈꾸미 먹고 한컷! 우리 언제 고수될까!" },
  { id: 4, src: "photos/Pic (3).jpg", caption: "을지로에서 간단히 맥주! 반지 어렵다!" },
  { id: 5, src: "photos/Pic (4).jpg", caption: "우리 공주 누가 울렸을까! 볼 만지고 싶당 ㅋㅋ" },
  { id: 6, src: "photos/Pic (5).jpg", caption: "아궁 맛있게 먹넹ㅋㅋㅋ 귀여웡!" },
  { id: 7, src: "photos/Pic (6).jpg", caption: "자기가 처음으로 나한테 보내준 사진!" },
  { id: 8, src: "photos/Pic (7).jpg", caption: "우리 크리스마스때!  첫 인생네컷이당!" },
  { id: 9, src: "photos/Pic (8).jpg", caption: "1월1일! 제야의 종소리 안 하는 줄 알아서 안 들었는데! 이번엔 꼭 같이 듣자!" },
  { id: 10, src: "photos/Pic (9).jpg", caption: "연남동 카페 인기 너무 많아.. 겨우 들어간 카페! 책이 재미없는거야~~ 컴퓨터 밑바닥 들고 갔으면 2시간 뚝딱이였어~~" },
  { id: 11, src: "photos/Pic (10).jpg", caption: "홍대에서 조개찜 먹고 한 컷! 홍대 사람 너무 많아.." },
  { id: 12, src: "photos/Pic (11).jpg", caption: "이주곱창! 저거 찍고 자기 엄청 좋아했는뎅ㅋㅋㅋ 웃기긴하당" },
  { id: 13, src: "photos/Pic (12).jpg", caption: "이 날도 쭈꾸미 먹고! 우리 둘 너무 귀여웅대!" },
  { id: 14, src: "photos/Pic (13).jpg", caption: "구리 시선! 내 최애 메뉴가 없어져서.. 안가.." },
  { id: 15, src: "photos/Pic (14).jpg", caption: "나 또 왜 이래 ㅋㅋㅋ 이 날은 우리 강남에서 전 먹은 날이다! 또 비오면 가자! 이젠 눈 오겠지??" },
  { id: 16, src: "photos/Pic (15).jpg", caption: "머지 아까랑 같은 날인데 다른 사람이 있네 ㅋㅋㅋ 자기 너무 귀욥당! 개나리색이 어울려!" },
  { id: 17, src: "photos/Pic (16).jpg", caption: "오 나 워치 차고 있넹 워치야 미안... 부산 같이 갈까??" },
  { id: 18, src: "photos/Pic (17).jpg", caption: "영등포 결혼식! 자기 너무 잘 어울리는뎅! 결혼식 같이 가야지 볼 수 있남!! 보고싶어!" },
  { id: 19, src: "photos/Pic (18).jpg", caption: "자기 호출에 호다닥 택시타고 간 날! 음.. 살 빼야겠다.. ㅋㅋㅋ" },
  { id: 20, src: "photos/Pic (19).jpg", caption: "어색어색 ㅋㅋㅋㅋㅋㅋ 미치겠다 자기 안경 잘 어울린당! 물론 언니꺼지만! 잘 어울료!" },
  { id: 21, src: "photos/Pic (20).jpg", caption: "오웅 허리 감싸는게 (˶˃ ᴗ ˂˶) 나 고데기 열심히 했나보넴 ㅋㅋ" },
  { id: 22, src: "photos/Pic (21).jpg", caption: "나 졸업! 시간 너무 빨리 간당 ㅠㅠ.. 이제 자기 졸업만 남았넹! 힘들어도 버티고!! 옆에서 항상 응원하고 곁에 있어줄겡!" },
  { id: 23, src: "photos/Pic (22).jpg", caption: "ㅋㅋㅋㅋㅋㅋㅋ 귀여워... 먹기 아까웠어!! 코 푸우욱" },
  { id: 24, src: "photos/Pic (23).jpg", caption: "ㅜㅜ 부산가서 사진 많이 찍장.. 일본은 아니지만 ㅜㅜ.. 일본은 다음에 꼭 같이 가장!" },
  { id: 25, src: "photos/Pic (24).jpg", caption: "돼지 선물 받은 날이넹! 지금도 내 위에 있는뎅! 항상 날 지켜보고 있엉 ㅋㅋ 귀여웡" },
  { id: 26, src: "photos/Pic (25).jpg", caption: "우리 찡어찡어 먹은 날! 다행히 위에서 찍어서 자기 잘 보인다! 귀여워!" },
  { id: 27, src: "photos/Pic (26).jpg", caption: "강남에서 홍미 닭발! 계란찜 엄청 컸는데! 다음에도 또 가장!" },
  { id: 28, src: "photos/Pic (27).jpg", caption: "이 날 슬픈 노래 추천 해줬넹ㅋㅋㅋㅋ 휘인에 헤어지자... 지금 들어보니까 안 좋아~~ 별루야 별로 케잌 맛있었는데! 잘 먹었오 고마워" },
  { id: 29, src: "photos/Pic (28).jpg", caption: "진짜 이쁘다! 먹기 아까웠을 거 같앙! 다음에도 사줄게용!!" },
  { id: 30, src: "photos/Pic (29).jpg", caption: "우리의 100일이다! 사진 너무 어려워.. 하루 종일 꽃 들고 다니고 힘들었찡! 시간 진짜 빠르당.. 엊그제 같은뎅.. ㅠ" },
  { id: 31, src: "photos/Pic (30).jpg", caption: "우리 이자카야에서 회 먹을 때다! 호야호야! 자기 꽃보다 이쁘네.. 쉽지않은데 대단한뎅!" },
  { id: 32, src: "photos/Pic (31).jpg", caption: "한 컷으로 주인공이 바뀌었넹.. ㅋㅋㅋㅋㅋㅋㅋㅋㅋ 탈색 몇 번 하셨을깡" },
  { id: 33, src: "photos/Pic (32).jpg", caption: "현빈아 코털 보인다.. 우리 온도계 간 날이넹! 먹구 간단히 맥주! 이 날 갑자기 비 엄청 왔었는뎅.." },
  { id: 34, src: "photos/Pic (33).jpg", caption: "자기가 준 거 요기 다 있오! 지금 이클립스까지 있어서 책 당근하고 정리해야겠당!" },
  { id: 35, src: "photos/Pic (34).jpg", caption: "벌교! 여기 갈치 젓갈은 인정이야.. 밥도둑.. 자기가 좋아하는 야장! 열심히 공부하고 소주 한잔!" },
  { id: 36, src: "photos/Pic (35).jpg", caption: "이 사진 볼 때마다 너무 귀여워서 ㅋㅋㅋㅋㅋ 우산이랑 바꾸기! 우리의 우산 누군가 잘 쓰고 있겠징??" },
  { id: 37, src: "photos/Pic (36).jpg", caption: "조개찜 먹고 한 컷! 우리 커플 옷이넹! 잘 어울령!" },
  { id: 38, src: "photos/Pic (37).jpg", caption: "지원이 숨었당! 이 날 진짜 날씨는 좋았는뎅.. 사람도 엄청 많구.. 또 가자!" },
  { id: 39, src: "photos/Pic (38).jpg", caption: "ㅋㅋㅋㅋㅋㅋㅋ 이 날 바람 엄청 불었는뎅.. 너무 재밌었엉! 다음엔 김밥 들고 등산할까!" },
  { id: 40, src: "photos/Pic (39).jpg", caption: "왜 하트가 깨졌을까..? ㅋㅋㅋㅋ 다음에는 내가 김밥 만들어줄겡! 딱 이해했어! 잘할 수 있어!" },
  { id: 41, src: "photos/Pic (40).jpg", caption: "자기 수달같아! 너무 귀여웡.... 미쳤어.. 찜질방 또 가고 싶다.." },
  { id: 42, src: "photos/Pic (41).jpg", caption: "플루엣! 우리 가락시장 구경도 하고! 물론 길이.. 아닌 곳으로 많이 갔지만 ㅋㅋㅋ 농구도 하고! 재밌었는뎅!" },
  { id: 43, src: "photos/Pic (42).jpg", caption: "크으! 맛있겠다.. 방금 엽떡 먹었는데 배고파지넴.. 자기는 지금 파이썬 공부하러 학교 갔는데 시험 범위 미쳤다고.. 화이팅 해야댕 ㅠㅠ" },
  { id: 44, src: "photos/Pic (43).jpg", caption: "내 머플러 자기가 더 잘 어울리넹! 보고싶당 ㅠㅠ" },
  { id: 45, src: "photos/Pic (44).jpg", caption: "꽃 이쁘긴 한뎅 자기가 최고당! 일요일날 만날 땐 꽃 사줘야징~~ 오늘 우리 커플 파자마도 샀는뎅! 자기 마음에 들었으면 좋겠당" },
  { id: 46, src: "photos/Pic (45).jpg", caption: "케잌은 이뻤어.. 내가 문제였지.. 파티룸을 잡았어야 했는뎅!! 내가 바보였따! 헤헤" },
  { id: 47, src: "photos/Pic (46).jpg", caption: "흰둥아!! 보고싶을고야! 맛있더라.. 구치 자기양~~ㅋㅋㅋㅋ" },
  { id: 48, src: "photos/Pic (47).jpg", caption: "우리 공주 너무 귀여웡! 미역국도 못 먹궁 ㅠㅠ 내년엔 내가 꼭 미역국 끓여서 줄겡!!" },
  { id: 49, src: "photos/Pic (48).jpg", caption: "메타몽.. 사람 진짜 많았오.. 우리 부산가서 사진 엄청 찍자!! 내 저장공간 어쩌지.. 사진 정리 좀 해야겠담.." },
  { id: 50, src: "photos/Pic (49).jpg", caption: "너무 행복해 보이는뎅!! ㅋㅋㅋㅋㅋ 귀여워! 픽사 전시회 볼 생각에 기분 좋은건강!!" },
  { id: 51, src: "photos/Pic (50).jpg", caption: "생각보다 사람 없어서 너무 좋았어! 여전히 사진 찍기.. 어려웡.." },
  { id: 52, src: "photos/Pic (51).jpg", caption: "??: 자기 너무 귀엽당!  ??:(오빠 조심해)  ??: 미안해.. 자기야.." },
  { id: 53, src: "photos/Pic (52).jpg", caption: "사진 너무 잘 나왔는뎅! 너무 귀엽다..." },
  { id: 54, src: "photos/Pic (53).jpg", caption: "그림 그리는 모습도 어쩜 이쁜지! 너모 귀여오.." },
  { id: 55, src: "photos/Pic (54).jpg", caption: "역시 황소는 람보르기니지... 그롬그롬!" },
  { id: 56, src: "photos/Pic (55).jpg", caption: "ㅋㅋㅋㅋㅋㅋ 귀여웡! 자기도 찍어줄껄.. ㅠㅠ" },
  { id: 57, src: "photos/Pic (56).jpg", caption: "여기 진짜 맛있었는데.. 또 먹으러 가장! (군침) 자기 끝나서 아버지랑 학교 앞 중국집에서 짬뽕 먹고 간댕!! 한입만.." },
  { id: 58, src: "photos/Pic (57).jpg", caption: "망우산 삼겹살! 다음에도 또 가장! 이때 너무 놀리고 싶었는뎅! 귀여워!! 날씨 좋아지면 또 가장!" },
  { id: 59, src: "photos/Pic (58).jpg", caption: "뽀뽀하기 1초 전..." },
  { id: 60, src: "photos/Pic (59).jpg", caption: "성수 호레기 먹은 날! 다시 봐도 꽃보다 예뻐.." },
  { id: 61, src: "photos/Pic (60).jpg", caption: "허씨 미안~ 사진은 고마워~ 뒤에서 봐도 잘 어울린다.." },
  { id: 62, src: "photos/Pic (61).jpg", caption: "어라라.. 사고 났낭..? ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ 웃기당" },
  { id: 63, src: "photos/Pic (62).jpg", caption: "영상도 있는데 으악 내 목소리 못 듣겠당ㅋㅋㅋㅋㅋㅋ 안녕하세요 지원씨~" },
  { id: 64, src: "photos/Pic (63).jpg", caption: "강동 이케아! 이케아처럼 방 꾸미고 싶당! 큐티걸~ 귀여웡 ㅋㅋㅋㅋㅋ" },
  { id: 65, src: "photos/Pic (64).jpg", caption: "우리 표정ㅋㅋㅋㅋㅋㅋㅋㅋ 너무 웃기넼ㅋㅋㅋㅋ 시원했어~~ 한잔해~~" },
  { id: 66, src: "photos/Pic (65).jpg", caption: "노랑가오리회! 병어회! 여기가 매운탕이 없어서 아쉬웠는뎅.. 신선도는 최상! 다음에 또 가장!" },
  { id: 67, src: "photos/Pic (66).jpg", caption: "비상용품이랑 같이 찍는 지원씨! 너무 귀여워!!!, 사진 작가: 김현빈, 전적: 저어기~ 유치원 보고 한장 찍읍시다~ 하나~ 둘~" },
  { id: 68, src: "photos/Pic (67).jpg", caption: "여름 너무 힘들었징! 너무 더웠어 ㅠㅠ 이제 겨울이야!! 근데 너무 추워!! 감기 조심해야댕!" },
  { id: 69, src: "photos/Pic (68).jpg", caption: "브루잉 커피~ 웨이팅 하는데 물까지 주는 사장님.. 센스 만점!!" },
  { id: 70, src: "photos/Pic (69).jpg", caption: "자기 이때 너무 귀여웠는뎅!! ㅋㅋㅋㅋㅋ 너무 잘 어울려서 깜짝 놀랐잖앙.. 또 보고 싶당!!" },
  { id: 71, src: "photos/Pic (70).jpg", caption: "크으.. 여기 찜질방이 더 좋았어.. 요즘 애들 따라하기 너무 힘들료.. 갑자기 불닭 땡기넴.." },
  { id: 72, src: "photos/Pic (71).jpg", caption: "이거 찍고 치맥하러 갔넹! 헉.. 이때 엘리베이터 공사였나봥.. 우리 자기 고생 많이 했엉 날도 더운댕.." },
  { id: 73, src: "photos/Pic (72).jpg", caption: "딱 나오넹! 귀여웡 ㅋㅋㅋ 여기도 괜찮았는뎅! 아이스크림이랑 같이 하던 곳!" },
  { id: 74, src: "photos/Pic (73).jpg", caption: "우리의 첫 여행! 대전 성심당! 날씨도 베스트 다 좋았는뎅! 저녁이.. 별루였지.. 빵 더 샀어야 했는데!! 다음에 또 가장!!" },
  { id: 75, src: "photos/Pic (74).jpg", caption: "빵보관소! 카페로 이동!" },
  { id: 76, src: "photos/Pic (75).jpg", caption: "진짜 더워서 사우나 가고 싶었어... 냉탕 슈우웅" },
  { id: 77, src: "photos/Pic (76).jpg", caption: "지원이랑 현빈이~ 대전 왔어요오오~~" },
  { id: 78, src: "photos/Pic (77).jpg", caption: "진짜 맛은 있었는데... 말도 안되게 더웠어.. 다 먹는건데..." },
  { id: 79, src: "photos/Pic (78).jpg", caption: "ㅋㅋㅋㅋㅋㅋㅋ 바보같당.." },
  { id: 80, src: "photos/Pic (79).jpg", caption: "이쁘게 잘 꾸몄엉 대전 또 가고 싶당.." },
  { id: 81, src: "photos/Pic (80).jpg", caption: "키야 날씨 뭐양! 현빈교를 믿으세요" },
  { id: 82, src: "photos/Pic (81).jpg", caption: "만 26세." },
  { id: 83, src: "photos/Pic (82).jpg", caption: "아쉬운 대전.. 서울가기 싫어어어.. 그 와중에 휴지 귀여웡 ㅋㅋㅋㅋ" },
  { id: 84, src: "photos/Pic (83).jpg", caption: "자기 너무 신났는뎅!! 귀여웡 ㅋㅋㅋㅋㅋㅋㅋ" },
  { id: 85, src: "photos/Pic (84).jpg", caption: "수달이당!! 너모 긔여웡... 볼 만지고 싶당.." },
  { id: 86, src: "photos/Pic (85).jpg", caption: "마라톤 선수! 손기정! 애국심이 느껴진다!" },
  { id: 87, src: "photos/Pic (86).jpg", caption: "오 나 컨버스 귀한뎅.." },
  { id: 88, src: "photos/Pic (87).jpg", caption: "ㅋㅋㅋㅋㅋㅋㅋㅋ 진짜.. 저 정도면 놀리는건데 죄송합니다..." },
  { id: 89, src: "photos/Pic (88).jpg", caption: "우리의 강릉 여행!! 두번 째 여행이요오오!" },
  { id: 90, src: "photos/Pic (89).jpg", caption: "안녕하세요오~ 등대에요오오~" },
  { id: 91, src: "photos/Pic (90).jpg", caption: "하나~ 둘~ 셋~ 헤헤헤헤헤헤헤헤헤헤" },
  { id: 92, src: "photos/Pic (91).jpg", caption: "크으.. 잘 찍었다.... 너무 이쁜댕.. 부산가서 인생샷 찍쟈!!" },
  { id: 93, src: "photos/Pic (92).jpg", caption: "내 머리 왜저래.. 바다 .. 자기랑 같이 있으니까 이쁘네! 바다는 좋겠다~" },
  { id: 94, src: "photos/Pic (93).jpg", caption: "자기 표정 ㅋㅋㅋㅋㅋ 우리 진짜 집 못 갈뻔 했는뎅.. 택시.. 닭강정.. ㅠㅠ" },
  { id: 95, src: "photos/Pic (94).jpg", caption: "제일 팔팔할 때! 추억이댜아앙" },
  { id: 96, src: "photos/Pic (95).jpg", caption: "자기 왜 화났을깡.. ㅋㅋㅋㅋㅋㅋ 내가 미안.." },
  { id: 97, src: "photos/Pic (96).jpg", caption: "점점 사진 찍는게 자연스러워 지는뎅!! " },
  { id: 98, src: "photos/Pic (97).jpg", caption: "맹구 너무 귀여웡! 너무 고마웠엉 ㅠㅠ 내년에도 맹구로 해줭! 히히" },
  { id: 99, src: "photos/Pic (98).jpg", caption: "자기가 사준 꽃!! 또 꽃 받고 싶당!" },
  { id: 100, src: "photos/Pic (99).jpg", caption: "엄마야.. ㅋㅋㅋㅋㅋㅋ 하남 스타필드 갔을 때! 짜장 맛있긴 했는데! 흠!" },
  { id: 101, src: "photos/Pic (100).jpg", caption: "120,000원 짜리 짜파게티 등장~ 자기는 항상 봐도 너무 이쁘당.." },
  { id: 102, src: "photos/Pic (101).jpg", caption: "와구와구! 나 봐봐 벌써 뽀뽀 대기중이양" },
  { id: 103, src: "photos/Pic (102).jpg", caption: "노들섬 ! 공사 끝나고 다시 와줄게 기다려~~ 그 동안 뚝섬 갈게 ~ 안뇽~" },
  { id: 104, src: "photos/Pic (103).jpg", caption: "빵 먹을 생각에 신난 김현빈씨... 배고프다..." },
  { id: 105, src: "photos/Pic (104).jpg", caption: "올림픽 공원! 골뱅이... 음... 하하하 날 진짜 좋았는데!! 돗자리 챙겨갈껄.." },
  { id: 106, src: "photos/Pic (105).jpg", caption: "크으 날씨 좋당! 봄 얼른 와랑!!" },
  { id: 107, src: "photos/Pic (106).jpg", caption: "크으 돌멍게 죽는다 죽어.. 부산가면 다 죽었어!!!" },
  { id: 108, src: "photos/Pic (107).jpg", caption: "내 최애!! 볼 만지고 싶자냥! 보고싶엉 ㅠㅠ" },
  { id: 109, src: "photos/Pic (108).jpg", caption: "ㅋㅋㅋㅋㅋㅋㅋㅋㅋ 귀여웡 아직 어색한 느낌.. 우리는 언제 고수가 될까!!" },
  { id: 110, src: "photos/Pic (109).jpg", caption: "어제 저녁에도 칼국수! 오늘 점심에도 칼국수! 근데 또 먹고 싶다!! 자기 너무 귀여웡 ㅋㅋㅋㅋㅋ" },
  { id: 111, src: "photos/Pic (110).jpg", caption: "자깈ㅋㅋㅋ 너무 잘 어울려!!! 너모 귀여웡.. 쓰다 보니까 벌써 마지막 사진이넹.. 우리 싸우지 말고 항상 이렇게 즐겁고 재밌게 지내자!! 너무 너무 사랑해❤️" }
];

// ===============================
// 📸 섹션2(사진): 카드 → 모달
// ===============================

// 모달 관련 요소
const photoModal = document.getElementById("photo-modal");
const photoModalImage = document.getElementById("photo-modal-image");
const photoModalLabel = document.getElementById("photo-modal-label");
const photoModalCaption = document.getElementById("photo-modal-caption");
const photoModalClose = document.querySelector(".photo-modal-close");

// 사진 그리드 컨테이너
const photoFeed = document.querySelector(".photo-feed");

if (photoFeed && Array.isArray(photoData)) {
  photoData.forEach((p) => {
    const card = document.createElement("article");
    card.className = "photo-card";
    card.dataset.id = p.id;
    card.dataset.caption = p.caption;

    card.innerHTML = `
      <div class="photo-thumb">
        <img src="${p.src}" class="photo-img" alt="">
      </div>
    `;

    card.addEventListener("click", () => openPhotoModal(card));
    photoFeed.appendChild(card);
  });
}

// 모달 열기
function openPhotoModal(card) {
  const id = Number(card.dataset.id || 0);

  const label = id === 0 ? "추억" : `추억 ${id}`;
  const caption = card.dataset.caption || "";
  const img = card.querySelector(".photo-img");

  if (photoModalLabel) photoModalLabel.textContent = label;
  if (photoModalCaption) photoModalCaption.textContent = caption;
  if (photoModalImage && img) {
    photoModalImage.src = img.src;
  }

  if (photoModal) {
    photoModal.classList.add("show");
  }
}

// 모달 닫기
function closePhotoModal() {
  if (!photoModal) return;
  photoModal.classList.remove("show");
}

if (photoModalClose) {
  photoModalClose.addEventListener("click", closePhotoModal);
}

if (photoModal) {
  photoModal.addEventListener("click", (e) => {
    if (e.target === photoModal) closePhotoModal();
  });
}

// ===============================
// 🎯 섹션3: 버킷리스트
// ===============================
const bucketItems = [
  // id, text, category: date / trip / activity / record / home / special
  { id: 1,  text: "롯데월드에서 교복 데이트 하기", category: "trip" },
  { id: 2,  text: "광화문에서 한복 입고 데이트 즐기기", category: "trip" },
  { id: 3,  text: "신정에 해돋이 보러 가기", category: "trip" },
  { id: 4,  text: "커플 잠옷 맞춰 입기", category: "home" },
  { id: 5,  text: "서로의 패션 코디 바꿔 입어보기", category: "activity" },
  { id: 6,  text: "커플 일기장 함께 쓰기", category: "record" },
  { id: 7,  text: "둘이서 웃긴 영상 하나 만들어보기", category: "record" },
  { id: 8,  text: "기차 여행 떠나기", category: "trip" },
  { id: 9,  text: "같은 장소, 같은 포즈로 사계절 사진 찍기", category: "record" },
  { id: 10, text: "둘이서 밤새 이야기하며 보내기", category: "date" },
  { id: 11, text: "치킨 들고 야구장 직관 가기", category: "trip" },
  { id: 12, text: "천문대 같은 곳에서 별 보러 가기", category: "trip" },
  { id: 13, text: "같이 등산하기", category: "trip" },
  { id: 14, text: "모래사장에서 장난치며 묻어보기", category: "trip" },
  { id: 15, text: "촌캉스 즐기기", category: "trip" },
  { id: 16, text: "에펠탑 앞에서 함께 사진 찍기", category: "trip" },
  { id: 17, text: "둘이서 섬에 조용히 갇힌 듯 지내보기", category: "trip" },
  { id: 18, text: "박효신 콘서트 가서 ‘야생화’ 듣고 울기", category: "activity" },
  { id: 19, text: "전국 팔도 여행하기", category: "trip" },
  { id: 20, text: "우리만의 비밀 장소 만들기", category: "special" },

  { id: 21, text: "글램핑 여행 가기", category: "trip" },
  { id: 22, text: "한옥 숙소에서 하루 묵기", category: "trip" },
  { id: 23, text: "도서관에서 조용한 데이트하기", category: "date" },
  { id: 24, text: "갯벌에서 머드 체험하기", category: "activity" },
  { id: 25, text: "차박해보기", category: "trip" },
  { id: 26, text: "바다 배 타고 낚시 도전하기", category: "activity" },
  { id: 27, text: "울릉도·독도 여행 가기", category: "trip" },
  { id: 28, text: "볼링장에서 대결해보기", category: "activity" },
  { id: 29, text: "제주도에서 승마 체험하기", category: "activity" },
  { id: 30, text: "하루 종일 집에서 넷플릭스 보기", category: "home" },
  { id: 31, text: "산 정상에서 해돋이 감상하기", category: "trip" },
  { id: 32, text: "스키·썰매 타러 가기", category: "activity" },
  { id: 33, text: "둘이서 듀엣곡 연습하기", category: "activity" },
  { id: 34, text: "함께 봉사활동 참여하기", category: "activity" },
  { id: 35, text: "커플 온천 여행 가기", category: "trip" },
  { id: 36, text: "제야의 종소리 함께 듣기", category: "special" },
  { id: 37, text: "둘이서 번지점프 도전하기", category: "activity" },
  { id: 38, text: "사주·타로·궁합 보기", category: "special" },
  { id: 39, text: "캐리커처 함께 그리기", category: "activity" },
  { id: 40, text: "더블 데이트 해보기", category: "special" },

  { id: 41, text: "자동차 극장에서 영화 보기", category: "trip" },
  { id: 42, text: "서로에게 옷 선물해주기", category: "date" },
  { id: 43, text: "둘만의 포토북 만들기", category: "record" },
  { id: 44, text: "커플 향수 만들어주기", category: "activity" },
  { id: 45, text: "PC방 데이트하기", category: "activity" },
  { id: 46, text: "커플 배경화면 만들기", category: "record" },
  { id: 47, text: "할로윈에 이태원 가보기", category: "special" },
  { id: 48, text: "호캉스 즐기기", category: "trip" },
  { id: 49, text: "작은 화분 함께 키우기", category: "home" },
  { id: 50, text: "둘만의 타임캡슐 만들기", category: "record" },

  { id: 51, text: "생일날 미역국 끓여주기", category: "date" },
  { id: 52, text: "아플 때 정성스레 죽 끓여주기", category: "date" },
  { id: 53, text: "둘이서 마스크팩 하기", category: "home" },
  { id: 54, text: "서로의 얼굴 그려주기", category: "activity" },
  { id: 55, text: "공방 데이트 가서 체험하기", category: "activity" },
  { id: 56, text: "심야영화·조조영화 보러가기", category: "trip" },
  { id: 57, text: "커플 자전거 타기", category: "activity" },
  { id: 58, text: "커플 마사지 받기", category: "activity" },
  { id: 59, text: "서로 업어주기", category: "date" },
  { id: 60, text: "같이 운동 루틴 만들기", category: "activity" },

  { id: 61, text: "서로 좋아하는 영화 하루 종일 몰아보기", category: "home" },
  { id: 62, text: "각자 만원씩 들고 ‘최고의 선물 사오기’ 챌린지", category: "special" },
  { id: 63, text: "지도에서 랜덤으로 찍은 장소로 기차 여행 떠나기", category: "trip" },
  { id: 64, text: "우리만의 시그니처 포즈 만들고 어디서든 찍기", category: "record" },
  { id: 65, text: "서로 책 추천해서 한 달 안에 읽기", category: "activity" },
  { id: 66, text: "데이트 VLOG 1편 만들어보기", category: "record" },
  { id: 67, text: "방탈출 성공하기", category: "activity" },
  { id: 68, text: "캠핑 가서 불멍하면서 긴 대화 나누기", category: "trip" },
  { id: 69, text: "20년 뒤 서로에게 편지 쓰기", category: "record" },
  { id: 70, text: "전통시장 먹거리 도장깨기", category: "trip" },

  { id: 71, text: "새벽 등산해서 일출 보기", category: "trip" },
  { id: 72, text: "미래에 갈 여행지 3곳 정해두기", category: "trip" },
  { id: 73, text: "서로 좋아하는 노래 플레이리스트 10곡씩 공유하기", category: "record" },
  { id: 74, text: "제주도 여행 가기", category: "trip" },
  { id: 75, text: "관람차 꼭대기에서 뽀뽀하기", category: "date" },
  { id: 76, text: "서로 머리 감겨주기", category: "date" },
  { id: 77, text: "여행 가서 스케치북에 풍경 그리기", category: "record" },
  { id: 78, text: "해외에서 렌트카 타고 놀아보기", category: "trip" },
  { id: 79, text: "오래된 사진관에서 레트로 사진 촬영", category: "record" },
  { id: 80, text: "소규모 독립극장에서 영화 관람하기", category: "trip" },

  { id: 81, text: "아무 말 없이 누워서 이어폰 나눠 듣기", category: "date" },
  { id: 82, text: "놀이공원 오픈부터 마감까지 풀코스 즐기기", category: "trip" },
  { id: 83, text: "사람 많은 곳에서 일부러 구석에서 몰래 껴안기", category: "special" },
  { id: 84, text: "웃겨주려고 노력하기", category: "date" },
  { id: 85, text: "영화관 구석에서 키스하기", category: "date" },
  { id: 86, text: "밤바다에서 조용히 불꽃놀이하기", category: "trip" },
  { id: 87, text: "일하는 곳 창고에서 몰래 밥 먹기", category: "special" },
  { id: 88, text: "용기 내서 사람 많은 데서 ‘사랑해!’ 외치기", category: "special" },
  { id: 89, text: "원터치 텐트 치고 아무 데서나 같이 자기", category: "trip" },
  { id: 90, text: "해외여행 가서 커플룩 입기", category: "trip" },

  { id: 91, text: "서로 지칠 때까지 안아주기", category: "date" },
  { id: 92, text: "일상 데이트를 영상으로 남겨두기", category: "record" },
  { id: 93, text: "LP샵 가서 음악 듣기", category: "trip" },
  { id: 94, text: "사진 배워서 서로 인생샷 찍어주기", category: "record" },
  { id: 95, text: "새벽 포장마차에서 우동 먹기", category: "trip" },
  { id: 96, text: "눈 오는 날 동네 야산에서 즉석 썰매 타기", category: "activity" },
  { id: 97, text: "“미안해” 하면 못 이기는 척 바로 화 풀어주기", category: "date" },
  { id: 98, text: "싸워도 서로를 위해 빨리 풀기", category: "date" },
  { id: 99, text: "우리가 적은 버킷리스트 전부 다 해보기", category: "special" },
  { id: 100,text: "기분이 안 좋아도 서로에게 예쁘게 말하기", category: "date" },
  { id: 100,text: "하트를 찾아서 눌러봐💗", category: "date" }
];

const bucketCategoryLabels = {
  all: "전체",
  date: "💗 감성",
  trip: "✈ 여행",
  activity: "🎨 체험",
  record: "📸 기록",
  home: "🏠 집콕",
  special: "🎁 특별"
};

const bucketCardsEl = document.getElementById("bucket-cards");
const bucketTabs = document.querySelectorAll(".bucket-tab");
const bucketRandomBtn = document.getElementById("bucket-random");
const bucketRandomPopup = document.getElementById("bucket-random-popup");

function renderBucketCards(category = "all") {
  if (!bucketCardsEl) return;
  bucketCardsEl.innerHTML = "";

  const filtered = bucketItems.filter((item) => {
    if (category === "all") return true;
    return item.category === category;
  });

  filtered.forEach((item) => {
    const card = document.createElement("div");
    card.className = "bucket-card";

    const label = document.createElement("div");
    label.className = "bucket-card-category";
    label.textContent = bucketCategoryLabels[item.category] || "";

    const text = document.createElement("div");
    text.className = "bucket-card-text";
    text.textContent = item.text;

    card.appendChild(label);
    card.appendChild(text);
    bucketCardsEl.appendChild(card);
  });
}

// 탭 클릭 → 필터 변경
bucketTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const category = tab.dataset.category || "all";

    bucketTabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    renderBucketCards(category);
  });
});

// 랜덤 추천 팝업
let bucketPopupTimer = null;

function showRandomBucket() {
  if (!bucketRandomPopup) return;
  const randomIndex = Math.floor(Math.random() * bucketItems.length);
  const item = bucketItems[randomIndex];

  bucketRandomPopup.textContent = `이번에 만날 때\n“${item.text}” ✨`;
  bucketRandomPopup.classList.add("show");

  if (bucketPopupTimer) {
    clearTimeout(bucketPopupTimer);
  }
  bucketPopupTimer = setTimeout(() => {
    bucketRandomPopup.classList.remove("show");
  }, 2800);
}

if (bucketRandomBtn) {
  bucketRandomBtn.addEventListener("click", showRandomBucket);
}

// ===============================
// 🌸 섹션4: 타임라인 + 엔딩 사진 애니메이션
// ===============================
let timelineObserverInitialized = false;

function setupTimelineObserver() {
  const items = document.querySelectorAll(".timeline-item");
  const scrollRoot = document.querySelector(".section4-scroll");

  if (!items.length || !scrollRoot) return;
  if (timelineObserverInitialized) return;
  timelineObserverInitialized = true;

  // IntersectionObserver 지원 안 하면 그냥 다 보이게
  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: scrollRoot, // 섹션4 내부 스크롤 기준
      threshold: 0.2
    }
  );

  items.forEach((item) => observer.observe(item));
}

const ENDING_PHOTO_COUNT = 14;

function setupEndingPhotos() {
  const container = document.getElementById("endingPhotos");
  if (!container) return;
  if (!Array.isArray(photoData)) return;

  const cloned = [...photoData];
  cloned.sort(() => Math.random() - 0.5);
  const selected = cloned.slice(0, ENDING_PHOTO_COUNT);

  selected.forEach((photo) => {
    const div = document.createElement("div");
    div.className = "ending-photo";
    div.style.backgroundImage = `url(${photo.src})`;

    // 위치/속도 랜덤
    div.style.left = `${8 + Math.random() * 84}%`;
    div.style.bottom = `${-30 - Math.random() * 25}vh`;
    div.style.animationDuration = `${20 + Math.random() * 10}s`;
    div.style.animationDelay = `${Math.random() * 10}s`;
    div.style.transform = `rotate(${(Math.random() * 8 - 4).toFixed(1)}deg)`;

    container.appendChild(div);
  });
}

// 맨 처음으로 돌아가기 버튼
function goToFirstSection() {
  showSection("intro");  // intro = 섹션1
}

// ===============================
// 페이지 로드 후 초기화
// ===============================
window.addEventListener("load", () => {
  // 버킷리스트 기본은 전체 카테고리
  renderBucketCards("all");

  // 타임라인 애니메이션 + 엔딩 사진
  setupTimelineObserver();
  setupEndingPhotos();
});

// 🔊 BGM 자동재생 기능
document.addEventListener("DOMContentLoaded", () => {
    const bgm = document.getElementById("bgm");

    // 사용자가 첫 액션(클릭, 키입력) 하면 자동재생 허용됨
    const startBgm = () => {
        bgm.volume = 0.65; // 볼륨 설정 (0 ~ 1)
        bgm.play().catch(() => {});
        document.removeEventListener("click", startBgm);
    };

    document.addEventListener("click", startBgm);
});

