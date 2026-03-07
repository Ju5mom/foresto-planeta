let lockedScrollY = 0;

const init = () => {
  const modal = document.querySelector("#gNav");
  const openBtn = document.querySelector("#gNav__open");
  const closeBtn = document.querySelector("#gNav__close");
  const menuList = document.querySelector("#gNav__list");
  setUpModal(modal, openBtn, closeBtn, menuList);
}

const setUpModal = (modal, openBtn, closeBtn, menuList) => {
  if (!modal || !openBtn || !closeBtn || !menuList) return;

  openBtn.addEventListener("click", () => {
    if (modal.open) return;
    lockedScrollY = window.scrollY;
    modal.showModal();
  });

  closeBtn.addEventListener("click", () => {
    if (!modal.open) return;
    modal.close();
    window.scrollTo(0, lockedScrollY);
  });

  menuList.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    if (!modal.open) return;
    modal.close();
  });
}

window.addEventListener("DOMContentLoaded", init);