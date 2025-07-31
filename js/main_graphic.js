$(function () {
  let currentIndex = 0;
  let activeSlides, activeDots, prevBtn, nextBtn;

  // 슬라이드 업데이트
  function updateSlide(index) {
    activeSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
      activeDots[i]?.classList.toggle('active', i === index);
    });
  }

  // 버튼 핸들러
  function handlePrev() {
    currentIndex = (currentIndex === 0) ? activeSlides.length - 1 : currentIndex - 1;
    updateSlide(currentIndex);
  }

  function handleNext() {
    currentIndex = (currentIndex + 1) % activeSlides.length;
    updateSlide(currentIndex);
  }

  // 버튼 이벤트 재연결
  function bindButtonEvents() {
    prevBtn?.removeEventListener('click', handlePrev);
    nextBtn?.removeEventListener('click', handleNext);

    prevBtn = document.querySelector('.tab-content.active .swiper-button.prev');
    nextBtn = document.querySelector('.tab-content.active .swiper-button.next');

    prevBtn?.addEventListener('click', handlePrev);
    nextBtn?.addEventListener('click', handleNext);
  }

  // 도트 재연결
  function bindDotEvents() {
    activeDots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateSlide(currentIndex);
      });
    });
  }

  // 현재 활성 탭 기준 슬라이더 초기화
  function initSwiperForActiveTab() {
    const activeTab = document.querySelector('.tab-content.active');
    if (!activeTab) return;

    activeSlides = activeTab.querySelectorAll('.swiper-slide');
    activeDots = activeTab.querySelectorAll('.swiper-dot');

    currentIndex = 0;
    updateSlide(currentIndex);
    bindButtonEvents();
    bindDotEvents();
  }

  // 탭 전환 이벤트
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-tab');

      // 탭 버튼 상태
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // 탭 콘텐츠 전환
      tabContents.forEach(content => content.classList.remove('active'));
      const targetContent = document.getElementById(targetId);
      targetContent.classList.add('active');

      // 해당 탭의 슬라이드 설정
      initSwiperForActiveTab();
    });
  });

  // 최초 실행
  initSwiperForActiveTab();


/* 이미지 돌아가기  */

const icons = document.querySelectorAll('.b_icon > div');
let current = 0;

// 초기화
icons[current].classList.add('active');

// 자동 전환
setInterval(() => {
  icons[current].classList.remove('active');
  current = (current + 1) % icons.length;
  icons[current].classList.add('active');
}, 1500); // 3초마다 전환





});