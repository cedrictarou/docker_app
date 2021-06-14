'use strict';
(() => {
  // likeBtns要素を取得
  const likeBtns = document.querySelectorAll('.likeBtn');
  // boolean型へ変換する処理
  function toBoolean(data) {
    return data.toLowerCase() === 'true';
  }

  likeBtns.forEach((likeBtn) => {
    // likeBtnの表示をture/falseで管理する
    let isLiked = toBoolean(likeBtn.dataset.is_liked);
    // svgを操作してiconを替える
    const likeIcon = likeBtn.children;
    // 隣のlikeCountを取得する
    const likeNumEl = likeBtn.nextElementSibling;
    let likeNum = parseInt(likeNumEl.textContent);
    const postId = parseInt(likeBtn.dataset.post_id);
    // fetchでサーバへ送る設定
    async function sendPostId(postId, action) {
      const data = { postId };
      // FetchAPIのオプション準備
      const param = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data),
      };
      // fetchで送る
      const response = await fetch(`/like/${action}`, param);
      const message = await response.json();
      if (message === 'no user') {
        alert('Please Login.');
        return;
      } else {
        // ハートの色を変える処理
        if (isLiked) {
          // isLikedがtureならfalseでハートを白に替える
          isLiked = false;
          likeNum -= 1;
          likeIcon[0].dataset.prefix = 'far';
          likeNumEl.textContent = likeNum;
        } else {
          // isLikedがfalseならtureにしてハートを黒に替える
          likeNum += 1;
          isLiked = true;
          likeIcon[0].dataset.prefix = 'fas';
          likeNumEl.textContent = likeNum;
        }
      }
    }

    likeBtn.addEventListener('click', () => {
      let action;
      if (isLiked) {
        // 削除する処理
        action = 'destroy';
        sendPostId(postId, action);
      } else {
        // 追加する処理
        action = 'create';
        sendPostId(postId, action);
      }
    });
  });
})();
