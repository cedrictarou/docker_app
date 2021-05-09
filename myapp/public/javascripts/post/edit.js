'use strict';
// formを操作する
// buttonタイプがsubmitのものを全て取得する
const submitBtns = document.querySelectorAll("button[type='submit']");
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
