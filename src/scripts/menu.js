window.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector("#gNav");
  const openBtn = document.querySelector("#gNav__open");
  const closeBtn = document.querySelector("#gNav__close");

  openBtn.addEventListener("click", () => {
    modal.showModal();
  });

  closeBtn.addEventListener("click", () => {
    modal.close();
  });

});