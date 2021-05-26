'use strict';
(() => {
  // formを操作する
  const submitBtns = document.querySelectorAll('.editBtn, .deleteBtn');
  // 取得したsubmitBtnsのそれぞれの要素にイベントを追加する
  submitBtns.forEach((submitBtn) => {
    submitBtn.addEventListener('click', (event) => {
      // 親要素を取得する
      const formElement = submitBtn.closest('form');
      // method属性を追加
      formElement.setAttribute('method', submitBtn.dataset.method);
      // action属性を追加
      formElement.setAttribute('action', submitBtn.dataset.action);
      formElement.submit();
    });
  });
})();
