'use strict';
(() => {
  // likeBtnを操作する
  const likeBtns = document.querySelectorAll('.likeBtn');
  likeBtns.forEach((likeBtn) => {
    // likeBtnの表示をture/falseで管理する
    let isLiked = false;

    likeBtn.addEventListener('click', () => {
      // 隣のlikeCountを取得する
      const likeNumEl = likeBtn.nextElementSibling;
      let likeNum = parseInt(likeNumEl.textContent);
      // svgを操作してiconを替える
      const likeIcon = likeBtn.children;
      if (isLiked) {
        // isLikedがtureならfalseでハートを白に替える
        isLiked = false;
        likeIcon[0].dataset.prefix = 'far';
        // likeの数を変える
        likeNum += 1;
        likeNumEl.textContent = likeNum;
        return;
      } else {
        // isLikedがfalseならtureにしてハートを黒に替える
        isLiked = true;
        likeIcon[0].dataset.prefix = 'fas';
        // likeの数を変える
        likeNum -= 1;
        likeNumEl.textContent = likeNum;
      }
    });
  });
})();
