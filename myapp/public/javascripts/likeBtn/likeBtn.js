'use strict';
(() => {
  // likeBtnを操作する
  const likeBtns = document.querySelectorAll('.likeBtn');
  likeBtns.forEach((likeBtn) => {
    // likeBtnの表示をture/falseで管理する
    let isLiked = likeBtn.dataset.is_liked;

    likeBtn.addEventListener('click', () => {
      // 隣のlikeCountを取得する
      const likeNumEl = likeBtn.nextElementSibling;
      let likeNum = parseInt(likeNumEl.textContent);
      // svgを操作してiconを替える
      const likeIcon = likeBtn.children;
      if (isLiked) {
        // isLikedがtureならfalseでハートを白に替える
        likeIcon[0].dataset.prefix = 'fas';
        isLiked = false;
        likeNum += 1;
        likeNumEl.textContent = likeNum;
        return;
      } else {
        // isLikedがfalseならtureにしてハートを黒に替える
        likeIcon[0].dataset.prefix = 'far';
        isLiked = true;
        likeNum -= 1;
        likeNumEl.textContent = likeNum;
      }

      // fetchでサーバへ送るデータ
      // post_idを取得する
      const postId = parseInt(likeBtn.dataset.post_id);
      const data = {
        postId,
      };
      // FetchAPIのオプション準備
      const param = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data),
      };
      // fetchで送る
      fetch('/like/create', param);
    });
  });
})();
