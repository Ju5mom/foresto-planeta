'use strict';

const initContentProtection = (container) => {
  if (!container) return;

  const images = container.querySelectorAll("img");

  // 右クリック禁止
  container.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  // ドラッグ保存禁止
  for (const img of images) {
    img.addEventListener("dragstart", (e) => {
      e.preventDefault();
    });
  }

  // DevToolsショートカット軽い抑止
  document.addEventListener("keydown", (e) => {
    if (e.key === "F12") {
      e.preventDefault();
      return;
    }

    if (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) {
      e.preventDefault();
      return;
    }

    if (e.ctrlKey && e.key === "U") {
      e.preventDefault();
      return;
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const swiperEl = document.querySelector(".swiper");
  if (!swiperEl) return;

  initContentProtection(swiperEl);
});
