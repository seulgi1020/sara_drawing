$(function () {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

  function createIntroAnimation() {
    ScrollTrigger.create({
      trigger: ".mid_short_show",
      start: "top top",
      end: "+=1500",
        pinSpacing: true, 
      pin: true,
      scrub: false,
      onEnter: () => {
        gsap.set(".ligt", { scale: 0.5, opacity: 0 });

        const tl = gsap.timeline();

        tl.to(".mid_short_show", {
          opacity: 1,
          duration: 0.3,
          ease: "power1.out",
          delay: 0.1
        })

        .to(".ligt", {
          scale: 0.3,
          duration: 0.2,
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
          duration: 2.2,
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
          duration: 2.2,
          rotation: "+=1080",
          ease: "none"
        }, "<")

        .to(".ligt", {
          y: "+=312",
          scale: 12,
          rotation: 360 * 2,
          duration: 0.8,
          ease: "power2.out"
        })

       .to(".mid_short_show", {
  opacity: 0,
  duration: 0.5,
  onComplete: () => {
    document.querySelector('.mid_short_show').remove(); // ✅ 아예 DOM에서 제거
  }
});
      }
    });
  }

  createIntroAnimation();
});