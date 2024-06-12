/* THIS DATA HAS BEEN TIDIED BY $npm run tidyCommondities */
export const COMMODITIES = [
  {
    type: 'main-dish',
    label: '🍱 餐盒',
    color: 'green',
    items: [
      {
        name: '120',
        price: 120,
        menu: [
          { name: '炸雞腿飯', textIcon: '🍗', price: 120, priority: 0 },
          { name: '滷雞腿飯', textIcon: '🍗', price: 120, priority: 1 },
        ],
        showRelevancy: true,
        hideOnMode: 'commondity',
        priority: 0,
      },
      {
        name: '110',
        price: 110,
        menu: [
          { name: '蒜泥白肉飯', textIcon: '🥓', price: 110, priority: 0 },
          { name: '排骨飯', textIcon: '🥩', price: 110, priority: 1 },
          { name: '魚排飯', textIcon: '🐟', price: 110, priority: 2 },
          { name: '焢肉飯', textIcon: '🥩', price: 110, priority: 3 },
        ],
        showRelevancy: true,
        hideOnMode: 'commondity',
        priority: 1,
      },
      {
        name: '105',
        price: 105,
        menu: [
          { name: '京醬肉絲飯', textIcon: '🥓', price: 105, priority: 0 },
          { name: '糖醋雞丁飯', textIcon: '🐔', price: 105, priority: 1 },
        ],
        showRelevancy: true,
        hideOnMode: 'commondity',
        priority: 2,
      },
      {
        name: '95',
        price: 95,
        menu: [
          { name: '雞肉絲飯', textIcon: '🐔', price: 95, priority: 0 },
          { name: '無骨雞排飯', textIcon: '🥩 ', price: 95, priority: 1 },
        ],
        showRelevancy: true,
        hideOnMode: 'commondity',
        priority: 3,
      },
      { name: '炸雞腿飯', price: 120, priority: 4 },
      { name: '滷雞腿飯', price: 120, priority: 5 },
      { name: '雞肉絲飯', price: 95, priority: 6 },
      { name: '京醬肉絲飯', price: 105, priority: 7 },
      { name: '蒜泥白肉飯', price: 110, priority: 8 },
      { name: '排骨飯', price: 110, priority: 9 },
      { name: '糖醋雞丁飯', price: 105, priority: 10 },
      { name: '無骨雞排飯', price: 95, priority: 11 },
      { name: '魚排飯', price: 110, priority: 12 },
      { name: '焢肉飯', price: 110, priority: 13 },
      { name: '油淋雞腿飯', price: 130, priority: 14 },
      { name: '蔬菜飯', price: 80, priority: 15 },
      { name: '加蛋', price: 15, priority: 16, hideOnMode: 'both' },
      { name: '加菜', price: 15, priority: 17, hideOnMode: 'both' },
    ],
  },
  {
    type: 'à-la-carte',
    label: '🍖 單點',
    color: 'brown',
    items: [
      {
        name: '炸雞腿',
        price: 80,
        priority: 0,
      },
      {
        name: '滷雞腿',
        price: 80,
        priority: 1,
      },
      { name: '雞肉絲', price: 50, priority: 2 },
      { name: '京醬肉絲', price: 65, priority: 3 },
      { name: '糖醋雞丁', price: 65, priority: 4 },
      { name: '排骨', price: 70, priority: 5 },
      { name: '蒜泥白肉', price: 70, priority: 6 },
      { name: '無骨雞排', price: 50, priority: 7 },
      { name: '魚排', price: 65, priority: 8 },
      { name: '焢肉', price: 70, priority: 9 },
      { name: '油淋雞腿', price: 90, priority: 10 },
      { name: '加蛋', price: 15, visible: false, priority: 11 },
      { name: '加菜', price: 15, visible: false, priority: 12 },
    ],
  },
  {
    type: 'others',
    label: '🧃 飲料/水餃',
    color: 'indigo',
    items: [
      { name: '干貝水餃', price: 250, priority: 0 },
      { name: '招牌水餃', price: 220, priority: 1 },
      { name: '韭菜水餃', price: 220, priority: 2 },
      { name: '養生水餃', price: 250, priority: 3 },
      { name: '4包水餃', price: 900, priority: 4 },
      { name: '果醋飲', price: 25, priority: 5 },
      { name: '原萃綠茶', price: 25, priority: 6 },
      { name: '樂天優格', price: 25, priority: 7 },
      { name: '蜂蜜牛奶', price: 23, priority: 8 },
      { name: '可口可樂Zero', price: 25, priority: 9 },
      { name: '維大力', price: 25, priority: 10 },
      { name: '樹頂蘋果汁', price: 40, priority: 11 },
      { name: '瓶裝水', price: 10, priority: 12 },
    ],
  },
]
