import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Classes for animation :-
// anim-fade-left  for left fade
// anim-fade-right  for right fade
// anim-fade-bot  for bottom fade
// anim-fade-scrub  for fade with scroll

export const Leftfade = () => {
  const elements = document.querySelectorAll(".anim-fade-left");
  elements.forEach((element) => {
    gsap.registerPlugin(ScrollTrigger);
    const anim = gsap.timeline({ paused: true });
    anim.fromTo(
      element,
      {
        opacity: 0,
        x: -100,
      },
      {
        opacity: 1,
        x: 0,
        ease: "Power2.easeInOut",
        duration: 1,
      }
    );
    ScrollTrigger.create({
      trigger: element,
      start: "top 95%",
      end: "bottom 95%",
      onEnter: () => anim.play(),
    });
  });
};

export const Rightfade = () => {
  const elements = document.querySelectorAll(".anim-fade-right");
  elements.forEach((element) => {
    gsap.registerPlugin(ScrollTrigger);
    const anim = gsap.timeline({ paused: true });
    anim.fromTo(
      element,
      {
        opacity: 0,
        x: 100,
      },
      {
        opacity: 1,
        x: 0,
        ease: "Power2.easeInOut",
        duration: 1,
      }
    );
    ScrollTrigger.create({
      trigger: element,
      start: "top 95%",
      end: "bottom 95%",
      onEnter: () => anim.play(),
    });
  });
};
export const Bottomfade = () => {
  const elements = document.querySelectorAll(".anim-fade-bot");
  elements.forEach((element) => {
    gsap.registerPlugin(ScrollTrigger);
    const anim = gsap.timeline({ paused: true });
    anim.fromTo(
      element,
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        ease: "Power2.easeInOut",
        duration: 1,
      }
    );
    ScrollTrigger.create({
      trigger: element,
      start: "top 100%",
      end: "bottom 95%",
      onEnter: () => anim.play(),
    });
  });
};

// export const Discanim = () => {
//   const elements = document.querySelectorAll(".anim-disc");
//   elements.forEach((element) => {
//     gsap.registerPlugin(ScrollTrigger);
//     const anim = gsap.timeline({ paused: true });
//     const childSplit = new SplitText(element, {
//         type: "lines",
//         linesClass: "split-child"
//       });
//     anim.fromTo(
//       ".split-child",
//       {
//         opacity: 0,
//         y: 100,
//       },
//       {
//         opacity: 1,
//         y: 0,
//         ease: "Power2.easeInOut",
//         stagger: 0.2,
//         duration: 1,
//       }
//     );
//     ScrollTrigger.create({
//       trigger: element,
//       start: "top 100%",
//       end: "bottom 95%",
//       markers: true,
//       onEnter: () => anim.play(),
//     });
//   });
// };

export const FadeSrub = () => {
  const elements = document.querySelectorAll(".anim-fade-scrub");
  elements.forEach((element) => {
    gsap.registerPlugin(ScrollTrigger);
    const anim = gsap.timeline();
    anim.fromTo(
      element,
      {
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "15% 80%",
          scrub: true,
          markers: true,
        },
        opacity: 0.2,
      },
      {
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "15% 80%",
          scrub: true,
          markers: true,
        },
        opacity: 1,
        ease: "expo.out",
        duration: 2,
      }
    );
  });
};
