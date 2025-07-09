$(function () {// ✅ main ScrollTrigger 로직
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

function createIntroAnimation() {
  ScrollTrigger.create({
    trigger: ".mid_short_show",
    start: "top top",
    end: "+=1500", // ✅ 전체 길이도 살짝 줄여서 반응 빠르게
    pin: true,
    scrub: false,
    onEnter: () => {
      gsap.set(".ligt", { scale: 0.5, opacity: 0 });

      const tl = gsap.timeline();

      tl.to(".mid_short_show", {
        opacity: 1,
        duration: 0.3, // ✅ 더 빠르게
        ease: "power1.out",
        delay: 0.1 // ✅ 지연 줄임
      })

      .to(".ligt", {
        scale: 0.3,
        duration: 0.2, // ✅ 깜빡임 더 짧게
        repeat: 3,
        yoyo: true,
        ease: "sine.inOut"
      })

      .to(".ligt", {
        scale: 1,
        rotate: 360 * 3,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        onStart: () => {
          document.querySelector('.ligt').classList.add('shine');
        }
      })

      .to(".ligt", {
        duration: 2.2, // ✅ path 따라가는 시간 줄임
        ease: "power1.inOut",
        motionPath: {
          path: "#thePath",
          align: "#thePath",
          alignOrigin: [0.5, 0.5],
          start: 0.5,
          end: 1.5,
          autoRotate: false
        }
      }, "<")

      .to(".ligt", {
        duration: 2.2, // ✅ 회전도 맞춰서 같이
        rotation: "+=1080",
        ease: "none"
      }, "<")

      .to(".ligt", {
        y: "+=312",
        scale: 12,
        rotation: 360 * 2,
        duration: 0.8, // ✅ 마무리도 살짝 빠르게
        ease: "power2.out"
      })

      .to(".mid_short_show", {
        opacity: 0,
        duration: 0.5, // ✅ 화면 전환도 빠르게
        ease: "power2.inOut"
      });
    }
  });
}

createIntroAnimation();


    });