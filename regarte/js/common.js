$(function () {
  AOS.init();

  //햄버거 메뉴 클릭
  $('.ham').click(function () {
    $('header').toggleClass('on');
  });

  const $gnbLi = $('.fix .gnb>ul>li');
  for (let i = 0; i < $gnbLi.length; i++) {
    $gnbLi.eq(i).css({
      'transition-delay' : 0.2 * (i+1) + 's',
    });
  }


  $(window).on('scroll',function(){
    let st = $(this).scrollTop();
    // console.log(st);
    if(st >= 80){
      $('header').addClass('sc');
    }else{
      $('header').removeClass('sc');
    }
  });




  (function () {
  const logo = document.querySelector(".mainlogo");
  if (!logo) return;

  // 처음 들어왔을 때 1.7초 후 사라지기
  setTimeout(() => {
    logo.classList.add("fade");
  }, 1700);

  // 다시 화면에 보이면 fade-in → 1.7초 후 fade-out
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          logo.classList.remove("fade");       // 다시 보이게
          void logo.offsetWidth;               // 강제 리플로우 → 재실행
          setTimeout(() => {
            logo.classList.add("fade");        // 다시 천천히 사라짐
          }, 1700);
        }
      });
    },
    {
      threshold: 0.6, // 정면에 60% 이상 보이면 실행
    }
  );

  observer.observe(logo);
})();

//    메인제품 스와이퍼

  const $wrapper = $('#swiper-wrapper');
  const $originalCards = $wrapper.find('.cc');
  const cardWidth = 335;
  const cardGap = 40;
  const fullCardWidth = cardWidth + cardGap;
  const visibleCards = 4; // 맨 처음 보이는 카드 개수
  const originalCount = $originalCards.length;

  let currentIndex = visibleCards;

  // 1. 앞뒤 복제 카드 삽입
  if (!$wrapper.hasClass('cloned')) {
    const $firstClones = $originalCards.slice(0, visibleCards).clone(true).addClass('clone');
    const $lastClones = $originalCards.slice(-visibleCards).clone(true).addClass('clone');
    $wrapper.prepend($lastClones);
    $wrapper.append($firstClones);
    $wrapper.addClass('cloned');
  }

  const $allCards = $wrapper.find('.cc');
  const totalCards = $allCards.length;

  // 2. wrapper 스타일 설정
  $wrapper.css({
    display: 'flex',
    gap: `${cardGap}px`,
    width: `${totalCards * fullCardWidth}px`,
    transform: `translateX(-${currentIndex * fullCardWidth}px)`
  });

  // 3. 이동 함수
  function slideTo(index) {
    $wrapper.css({
      transition: 'transform 0.4s ease-in-out',
      transform: `translateX(-${index * fullCardWidth}px)`
    });
  }

  // 4. 루프 복귀 처리
  function handleLoop() {
    setTimeout(() => {
      $wrapper.css('transition', 'none');

      if (currentIndex >= originalCount + visibleCards) {
        currentIndex = visibleCards;
        $wrapper.css('transform', `translateX(-${currentIndex * fullCardWidth}px)`);
      }

      if (currentIndex < visibleCards) {
        currentIndex = originalCount + visibleCards - 1;
        $wrapper.css('transform', `translateX(-${currentIndex * fullCardWidth}px)`);
      }
    }, 400);
  }

  // 5. 버튼 이벤트
  $('.Main_product .nav.next').on('click', function () {
    currentIndex++;
    slideTo(currentIndex);
    handleLoop();
  });

  $('.Main_product .nav.prev').on('click', function () {
    currentIndex--;
    slideTo(currentIndex);
    handleLoop();
  });


 

});