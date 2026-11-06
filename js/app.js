/* 招领大厅：搜索 + 状态筛选 */
(function () {
  var input  = document.getElementById('searchInput');
  var button = document.getElementById('searchBtn');
  var cards  = Array.prototype.slice.call(document.querySelectorAll('.item'));
  var empty  = document.getElementById('emptyState');
  var chips  = Array.prototype.slice.call(document.querySelectorAll('.chip'));

  var keyword = '';      // 当前搜索词
  var status  = 'all';   // 当前状态筛选：all / wait / done

  /* 核心：按关键词和状态过滤卡片 */
  function render() {
    var visible = 0;

    cards.forEach(function (card) {
      var text = (card.dataset.name + ' ' + card.dataset.place).toLowerCase();
      var matchKeyword = keyword === '' || text.indexOf(keyword) > -1;
      var matchStatus  = status === 'all' || card.dataset.status === status;
      var show = matchKeyword && matchStatus;

      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });

    empty.hidden = visible > 0;   // 一条都没匹配上时显示空状态
  }

  /* 搜索：按钮点击 或 输入框回车 */
  function doSearch() {
    keyword = input.value.trim().toLowerCase();
    render();
  }
  button.addEventListener('click', doSearch);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') doSearch();
  });

  /* 筛选标签：待认领 = 只看待认领；全部校区/全部类别 = 重置 */
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var next = chip.dataset.filter;

      if (chip.classList.contains('on') || next === 'all') {
        status = 'all';                      // 再点一次取消筛选
        chips.forEach(function (c) { c.classList.remove('on'); });
        if (next === 'all') chip.classList.add('on');
      } else {
        status = next;
        chips.forEach(function (c) { c.classList.remove('on'); });
        chip.classList.add('on');
      }
      render();
    });
  });
})();
