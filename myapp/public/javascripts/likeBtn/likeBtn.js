'use strict';
// likeBtnを操作する
const likeBtns = document.querySelectorAll('.likeBtn');
likeBtns.forEach((likeBtn) => {
  // likeBtnの表示をture/falseで管理する
  let isLiked = false;
  likeBtn.addEventListener('click', () => {
    // 隣のlikeCountを取得する
    const likeCountEl = likeBtn.nextElementSibling;
    // svgを操作してiconを替える
    const likeIcon = likeBtn.children;
    if (isLiked) {
      // isLikedがtureならfalseでハートを白に替える
      isLiked = false;
      likeIcon[0].dataset.prefix = 'far';
      // likeの数を変える
      likeCountEl.innerText = 0;
      return;
    } else {
      // isLikedがfalseならtureにしてハートを黒に替える
      isLiked = true;
      likeIcon[0].dataset.prefix = 'fas';
      // likeの数を変える
      // 最終て気にはDBから取得するisLikedの数を代入する
      likeCountEl.innerText = 1;
    }

    // fetchでデータを送ってみる
    const obj = {
      hello: 'world',
    };
    const data = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    };

    fetch('/new', data)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(json);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
