const newCharacters = [
  {
    _id: '45t3et5rye4a',
    name: 'Serina (Christmas)',
    school: 'Trinity',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/1/19/Serina_%28Christmas%29.png',
    damageType: 'Penetration',
    clicked: false
  },
  {
    _id: '6453e89ad',
    name: 'Hanae (Christmas)',
    School: 'Trinity',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/1/1a/Hanae_%28Christmas%29.png',
    damageType: 'Mystic',
    clicked: false
  },
  {
    _id: '89y546rt',
    name: 'Fuuka (New Year)',
    School: 'Gehenna',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/1/13/Fuuka_%28New_Year%29.png',
    damageType: 'Penetration',
    clicked: false
  },
  {
    _id: 'hi645wj', // START HERE
    name: 'Haruna (New Year)',
    School: 'Gehenna',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/b/b3/Haruna_%28New_Year%29.png',
    damageType: 'Explosive',
    clicked: false
  },
  {
    _id: 'yt6ihfj5rgkuv',
    name: 'Mine',
    School: 'Trinity',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/a/a0/Mine.png',
    damageType: 'Explosive',
    clicked: false
  },
  {
    _id: 'tgdcfuhrvj',
    name: 'Mika',
    School: 'Trinity',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/c/c8/Mika.png',
    damageType: 'Penetration',
    clicked: false
  },
  {
    _id: 'ftughkrvyj',
    name: 'Megu',
    School: 'Gehenna',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/d/d4/Megu.png',
    damageType: 'Explosive',
    clicked: false
  },
  {
    _id: 'cgvfdjh',
    name: 'Kanna',
    School: 'Valyrie',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/4/47/Kanna.png',
    damageType: 'Penetration',
    clicked: false
  },
  {
    _id: 'klbvuytghj',
    name: 'Sakurako',
    School: 'Trinity',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/f/f0/Sakurako.png',
    damageType: 'Mystic',
    clicked: false
  },
  {
    _id: 'kgio67yt',
    name: 'Nagisa',
    School: 'Trinity',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/6/6a/Nagisa.png',
    damageType: 'Explosive',
    clicked: false
  },
  {
    _id: 'y564cve',
    name: 'Toki',
    School: 'Millennium',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/e/e4/Toki.png',
    damageType: 'Explosive',
    clicked: false
  },
  {
    _id: 'y4tci7b6t',
    name: 'Koyuki',
    School: 'Millennium',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/a/af/Koyuki.png',
    damageType: 'Mystic',
    clicked: false
  },
  {
    _id: 'v46yevde',
    name: 'Kayoko (New Year)',
    School: 'Gehenna',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/0/0d/Kayoko_%28New_Year%29.png',
    damageType: 'Mystic',
    clicked: false
  },
  {
    _id: '6v5ur65v7',
    name: 'Haruka (New Year)',
    School: 'Gehenna',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/d/d9/Haruka_%28New_Year%29.png',
    damageType: 'Explosive',
    clicked: false
  },
  {
    _id: '756bub567',
    name: 'Kaho',
    School: 'Hyakkiyako',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/6/63/Kaho.png',
    damageType: 'Mystic',
    clicked: false
  },
  {
    _id: 'c6534gre',
    name: 'Arisu (Maid)',
    School: 'Millennium',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/b/b4/Arisu_%28Maid%29.png',
    damageType: 'Mystic',
    clicked: false
  },
  {
    _id: '6ub56b57v',
    name: 'Toki (Bunny)',
    School: 'Millenium',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/8/83/Toki_%28Bunny_Girl%29.png',
    damageType: 'Explosive',
    clicked: false
  },
  {
    _id: '6vu5rd4cv',
    name: 'Reisa',
    School: 'Trinity',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/3/34/Reisa.png',
    damageType: 'Penetration',
    clicked: false
  },
  {
    _id: '6y5vr445v6ghf',
    name: 'Rumi',
    School: 'Shanhaijing',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/7/7d/Rumi.png',
    damageType: 'Explosive',
    clicked: false
  },
  {
    _id: 'gi7ybtgi76',
    name: 'Mina',
    School: 'Shanhaijing',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/6/6b/Mina.png',
    damageType: 'Explosive',
    clicked: false
  },
  {
    _id: 'j89y7645y45ju89',
    name: 'Minori',
    School: 'Red Winter',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/1/1a/Minori.png',
    damageType: 'Explosive',
    clicked: false
  },
  {
    _id: 'j985h6yh465j89',
    name: 'Miyako (Swimsuit)',
    School: 'SRT',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/9/97/Miyako_%28Swimsuit%29.png',
    damageType: 'Explosive',
    clicked: false
  },
  {
    _id: 'yh465j987h4j56',
    name: 'Saki (Swimsuit)',
    School: 'SRT',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/1/13/Saki_%28Swimsuit%29.png',
    damageType: 'Explosive',
    clicked: false
  },
  {
    _id: 'g58469n7y89g7n5h6y',
    name: 'Shiroko (Swimsuit)',
    School: 'Abydos',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/4/4e/Shiroko_%28Swimsuit%29.png',
    damageType: 'Mystic',
    clicked: false
  },
  {
    _id: 'h56807unh3456879ny',
    name: 'Ui (Swimsuit)',
    School: 'Trinity',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/6/60/Ui_%28Swimsuit%29.png',
    damageType: 'Penetration',
    clicked: false
  },
  {
    _id: '8057n3yhu65h687e9n',
    name: 'Hinata (Swimsuit)',
    School: 'Trinity',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/0/08/Hinata_%28Swimsuit%29.png',
    damageType: 'Explosive',
    clicked: false
  },
  {
    _id: '8n70h5y47h865n9',
    name: 'Hanako (Swimsuit)',
    School: 'Trinity',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/c/c5/Hanako_%28Swimsuit%29.png',
    damageType: 'Sonic',
    clicked: false
  },
  {
    _id: '85967hun78nh6594',
    name: 'Mimori (Swimsuit)',
    School: 'Hyakkiyako',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/2/22/Mimori_%28Swimsuit%29.png',
    damageType: 'Mystic',
    clicked: false
  },
  {
    _id: '653hg897nyh98g756n',
    name: 'Meru',
    School: 'Red Winter',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/4/4f/Meru.png',
    damageType: 'Penetration',
    clicked: false
  },
  {
    _id: 'bn6785uy9b87n695y',
    name: 'Kotori (Cheer Squad)',
    School: 'Millennium',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/8/89/Kotori_%28Cheerleader%29.png',
    damageType: 'Explosive',
    clicked: false
  },
  {
    _id: '453y68hn97nb879456',
    name: 'Haruna (Tracksuit)',
    School: 'Gehenna',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/a/af/Haruna_%28Sportswear%29.png',
    damageType: 'Sonic',
    clicked: false
  },
  {
    _id: '6h547908mun87nh6',
    name: 'Ichika',
    School: 'Trinity',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/b/b3/Ichika.png',
    damageType: 'Sonic',
    clicked: false
  },
  {
    _id: '8n9756hy8h57e96n',
    name: 'Kasumi',
    School: 'Gehenna',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/6/6b/Kasumi.png',
    damageType: 'Sonic',
    clicked: false
  },
  {
    _id: '0897jug45879g45nf',
    name: 'Shigure (Hot Spring)',
    School: 'Red Winter',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/d/da/Shigure_%28Hot_Spring%29.png',
    damageType: 'Penetration',
    clicked: false
  },
  {
    _id: '980675hum789nh56u',
    name: 'Mikoto',
    School: 'Collab',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/7/76/Misaka_Mikoto.png',
    damageType: 'Penetration',
    clicked: false
  },
  {
    _id: '35g496m980456gemj',
    name: 'Misaki',
    School: 'Collab',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/6/66/Shokuhou_Misaki.png',
    damageType: 'Explosive',
    clicked: false
  },
  {
    _id: 'g65897ny879nh6g5',
    name: 'Yukari',
    School: 'Hyakkiyako',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/2/2b/Yukari.png',
    damageType: 'Sonic',
    clicked: false
  },
  {
    _id: '5e6j7uj678gdf',
    name: 'Renge',
    School: 'Hyakkiyako',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/e/e4/Renge.png',
    damageType: 'Sonic',
    clicked: false
  },
  {
    _id: '5h67h657g3b4e5',
    name: 'Kikyou',
    School: 'Hyakkiyako',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/6/62/Kikyou.png',
    damageType: 'Sonic',
    clicked: false
  },
  {
    _id: 'uh36576745jhu675hj',
    name: 'Eimi (Swimsuit)',
    School: 'Millennium',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/c/ce/Eimi_%28Swimsuit%29.png',
    damageType: 'Mystic',
    clicked: false
  },
  {
    _id: '5k789567ji8j6',
    name: 'Hare (Camp)',
    School: 'Millennium',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/a/a2/Hare_%28Camping%29.png',
    damageType: 'Explosive',
    clicked: false
  },
  {
    _id: '46j78hu567e65h4e',
    name: 'Kotama (Camp)',
    School: 'Millennium',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/1/19/Kotama_%28Camping%29.png',
    damageType: 'Penetration',
    clicked: false
  },
  {
    _id: '6j7r86j57h65j',
    name: 'Ako (Dress)',
    School: 'Gehenna',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/f/fc/Ako_%28Dress%29.png',
    damageType: 'Explosive',
    clicked: false
  },
  {
    _id: 'ej6tuje6576j75e',
    name: 'Makoto',
    School: 'Gehenna',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/2/20/Makoto.png',
    damageType: 'Penetration',
    clicked: false
  },
  {
    _id: '4j68746j78j678rj67r',
    name: 'Hina (Dress)',
    School: 'Gehenna',
    photoUrl: 'https://static.miraheze.org/bluearchivewiki/2/20/Hina_%28Dress%29.png',
    damageType: 'Explosive',
    clicked: false
  },
]

export default newCharacters