/* Traditional is derived from the Simplified copy at runtime, so new prompts
   only ever need one Chinese version. S2T_PAIRS covers every Simplified
   character this app uses; S2T_WORDS handles the few whose Traditional form
   depends on the word around them.
   ponytail: characters outside the map pass through unchanged -- when new copy
   introduces one, append its pair here (and check it is not context-dependent). */
const S2T_PAIRS =
  "与與东東两兩个個丰豐为為举舉么麼义義乐樂习習乡鄉书書争爭于於亏虧云雲亚亞从從们們众眾会會传傳体體儿兒关關养養写寫农農划劃刚剛创創别別务務动動励勵华華单單却卻历歷厨廚参參双雙发發变變号號后後吗嗎" +
  "听聽启啟咸鹹团團围圍国國圆圓圣聖场場坚堅墙牆声聲处處备備头頭学學实實宠寵宾賓对對寻尋导導将將带帶帮幫并並庆慶应應开開张張归歸当當录錄忆憶惯慣愿願戏戲扬揚护護择擇换換据據数數无無时時显顯晓曉暂暫" +
  "机機条條来來松鬆样樣横橫欢歡气氣没沒浏瀏温溫游遊满滿灭滅灯燈点點烛燭烧燒热熱爱愛献獻环環现現电電着著礼禮祷禱离離种種称稱稣穌竖豎竞競笔筆笼籠简簡红紅约約线線组組绍紹经經结結给給统統绳繩联聯聪聰" +
  "胜勝脑腦脚腳腊臘节節苍蒼荣榮蜡蠟见見览覽计計认認讨討让讓训訓记記讲講许許论論设設识識词詞诗詩诚誠话話该該语語说說请請诸諸读讀课課谁誰谜謎谢謝负負责責贵貴资資赏賞赛賽赶趕车車轮輪轻輕载載辩辯边邊" +
  "达達过過还還这這进進连連适適选選里裡钟鐘铅鉛错錯门門闭閉问問间間闹鬧队隊阳陽随隨难難静靜页頁项項预預题題风風饭飯饺餃饼餅馅餡马馬验驗骑騎";

/* 台 / 只 / 斗 are left alone: they are valid Traditional on their own, and a
   blanket swap would turn 只有 into 隻有 or 斗底下 into 鬥底下. */
const S2T_WORDS = { "灯台": "燈臺", "农历": "農曆", "一只": "一隻" };

const S2T = new Map();
for (let i = 0; i < S2T_PAIRS.length; i += 2) S2T.set(S2T_PAIRS[i], S2T_PAIRS[i + 1]);

const toTW = (text) => {
  let out = text;
  for (const [word, tw] of Object.entries(S2T_WORDS)) out = out.split(word).join(tw);
  return out.replace(/[\u4e00-\u9fff]/g, (ch) => S2T.get(ch) || ch);
};

const I18N = {
  zh: {
    collection: "节日游戏", ready: "随时开场", eyebrow: "给教会节日聚会的互动游戏",
    title: "欢聚，也彼此看见", intro: "一台电脑投屏就能玩。轻松破冰，也为感谢、祝福与真诚分享留一点空间。",
    choose: "选择游戏",
    how: "玩法", present: "投屏", tipsTitle: "让第一次来的朋友也玩得自在",
    tip1Title: "从轻松题开始", tip1Body: "先聊食物、家乡和记忆，再进入感谢与信仰。",
    tip2Title: "先听，再回应", tip2Body: "主持人留一点安静，让每个人把话说完整。",
    tip3Title: "分享比得分重要", tip3Body: "竞争只负责热场；有人认真开口时，给他完整的时间。",
    footer: "为教会而造的开源工具 · 无需登录，不收集参与者资料", gotIt: "明白，开始吧",
    draw: "换一张", startTimer: "开始计时", pauseTimer: "暂停", resetTimer: "重置 60 秒", seconds: "秒",
    faith: "信仰分享", warmup: "轻松破冰", story: "故事与记忆", gratitude: "感谢与盼望",
    moonHint: "每人最多分享 60 秒", passes: "已分享", people: "人",
    deckReset: "所有问题都抽过了 · 重新洗牌",
    nextStep: "下一步", nextRound: "下一棒", round: "第", roundUnit: "棒", teamScore: "团队暖心值",
    chooseAnswer: "请选择答案", nextQuestion: "下一题", restartQuiz: "再玩一轮", correct: "答对了！", notQuite: "差一点。",
    score: "得分", question: "题", answer: "答案", newBoard: "换一张卡", bingo: "连线成功！请邀请其中一位朋友分享故事。", marked: "已找到",
    fullOn: "已进入投屏模式", fullOff: "已退出投屏模式", timerDone: "时间到，感谢你的分享！",
    copied: "游戏已切换", ariaTheme: "切换明暗主题", hostNote: "主持提醒：掌握整体节奏，也给每一位分享者完整表达的时间。",
    skip: "跳到游戏", htmlLang: "zh-CN", docTitle: "欢聚 · 节日互动游戏｜slashai.app",
    sharedCount: "已分享人数", roundLabel: "接力回合", fullBlocked: "浏览器未允许全屏，请使用浏览器菜单。",
    step1: "回望恩典", step2: "说出感谢", step3: "送上祝福", namePlaceholder: "写下朋友的名字"
  },
  en: {
    collection: "Festival games", ready: "Ready to play", eyebrow: "Interactive games for church festival gatherings",
    title: "Gather, and truly see one another", intro: "All you need is one screen. Break the ice, then make room for gratitude, blessing, and honest conversation.",
    choose: "Choose a game",
    how: "How to play", present: "Present", tipsTitle: "Help every newcomer feel at ease",
    tip1Title: "Begin light", tip1Body: "Start with food, hometowns, and memories before moving toward gratitude and faith.",
    tip2Title: "Listen before responding", tip2Body: "Leave a little quiet and give each person room to finish.",
    tip3Title: "Stories over scores", tip3Body: "Competition creates energy. When someone opens up, give them the room to finish.",
    footer: "Open-source tools for churches · No sign-in and no participant data collection", gotIt: "Got it — let's play",
    draw: "Draw another", startTimer: "Start timer", pauseTimer: "Pause", resetTimer: "Reset 60 sec", seconds: "sec",
    faith: "Faith reflection", warmup: "Easy opener", story: "Story & memory", gratitude: "Gratitude & hope",
    moonHint: "Up to 60 seconds for each person", passes: "Shared", people: "people",
    deckReset: "Every prompt has been drawn · reshuffling",
    nextStep: "Next step", nextRound: "Pass it on", round: "Round", roundUnit: "", teamScore: "Warmth points",
    chooseAnswer: "Choose an answer", nextQuestion: "Next question", restartQuiz: "Play again", correct: "That's right!", notQuite: "Not quite.",
    score: "Score", question: "Question", answer: "Answer", newBoard: "New card", bingo: "Line complete! Invite one person in the line to share their story.", marked: "Found",
    fullOn: "Presentation mode on", fullOff: "Presentation mode off", timerDone: "Time — thank you for sharing!",
    copied: "Game changed", ariaTheme: "Toggle light and dark theme", hostNote: "Host note: keep the overall pace while giving each speaker time to finish.",
    skip: "Skip to the game", htmlLang: "en", docTitle: "Gather · Festival Games | slashai.app",
    sharedCount: "PEOPLE SHARED", roundLabel: "ROUND", fullBlocked: "Fullscreen was blocked; use your browser menu instead.",
    step1: "Remember grace", step2: "Name gratitude", step3: "Offer blessing", namePlaceholder: "Write the friend's name"
  }
};

I18N.tw = Object.fromEntries(Object.entries(I18N.zh).map(([key, value]) => [key, toTW(value)]));
I18N.tw.htmlLang = "zh-TW";

const GAMES = [
  {
    id: "moon", symbol: "月", accent: "#e2c57b",
    name: { zh: "同心一轮月", en: "One Moon, One Table" },
    festival: { zh: "中秋", en: "MID-AUTUMN" },
    meta: { zh: "2–12 人 · 8–15 分钟", en: "2–12 people · 8–15 min" },
    short: { zh: "抽卡分享", en: "Prompt cards" },
    description: { zh: "从月饼和家乡聊起，在同一轮月下听见彼此的故事。", en: "Begin with mooncakes and hometowns, then make space for each person's story under the same moon." },
    steps: {
      zh: ["围成一圈，由主持人抽出一张问题卡。", "每位回答者最多分享 60 秒。", "每 3–4 张轻松题后，加入一张信仰分享题。"],
      en: ["Gather in a circle and let the host draw a prompt.", "Give each person up to 60 seconds to answer.", "After 3–4 light prompts, add one faith reflection."]
    }
  },
  {
    id: "blessing", symbol: "福", accent: "#d87868",
    name: { zh: "恩典接福", en: "Pass the Blessing" },
    festival: { zh: "春节", en: "LUNAR NEW YEAR" },
    meta: { zh: "4–24 人 · 10–15 分钟", en: "4–24 people · 10–15 min" },
    short: { zh: "祝福接力", en: "Blessing relay" },
    description: { zh: "三步完成一棒：回望恩典、说出感谢、送上祝福。", en: "Complete each relay in three moves: remember grace, name gratitude, and offer a blessing." },
    steps: {
      zh: ["把大家分成两队，轮流派一位代表完成屏幕上的三步。", "每完成一步，主持人点“下一步”；真诚分享可加一分。", "第三步完成后，把祝福传给下一位。约 6 棒后一起拍照收尾。"],
      en: ["Split into two teams and send one person at a time through the three prompts.", "Tap “Next step” after each response; the host may award a point for a wholehearted answer.", "After step three, pass the blessing to the next person. Finish after about six rounds."]
    }
  },
  {
    id: "lantern", symbol: "光", accent: "#f0bd61",
    name: { zh: "灯谜寻光", en: "Lanterns of Light" },
    festival: { zh: "元宵", en: "LANTERN FESTIVAL" },
    meta: { zh: "4–40 人 · 15–20 分钟", en: "4–40 people · 15–20 min" },
    short: { zh: "分组竞猜", en: "Team quiz" },
    description: { zh: "传统灯谜的猜趣，加上圣经中关于光、道路与盼望的小问答。", en: "The fun of lantern riddles meets Bible questions about light, direction, and hope." },
    steps: {
      zh: ["全场分成 2–4 队，每题先安静讨论 20 秒。", "由每队同时举出 A、B、C 或 D；主持人再点选答案。", "答对得一分。答案揭晓后，读出简短说明再进入下一题。"],
      en: ["Divide the room into 2–4 teams and discuss each question for 20 seconds.", "Every team shows A, B, C, or D at the same time; the host then selects the answer.", "Award one point for a correct answer, read the short note, and continue."]
    }
  },
  {
    id: "bingo", symbol: "席", accent: "#88a49a",
    name: { zh: "家宴连线", en: "Welcome Table Bingo" },
    festival: { zh: "全年适用", en: "ANY GATHERING" },
    meta: { zh: "8–80 人 · 12–20 分钟", en: "8–80 people · 12–20 min" },
    short: { zh: "走动宾果", en: "People bingo" },
    description: { zh: "拿着同一张大屏任务卡，在人群中找到有共同点的新朋友。", en: "Use one shared challenge board to find new friends with stories and experiences in common." },
    steps: {
      zh: ["大家自由走动，根据格子描述寻找符合的人。", "找到后先互相介绍名字，再请对方讲一句相关故事；主持人点亮该格。", "横、竖或斜线连成四格即完成；邀请其中一人分享刚认识的朋友。"],
      en: ["Mingle and look for someone who matches a square.", "Exchange names and hear one sentence of their story, then ask the host to mark the square.", "Complete any row, column, or diagonal of four; invite someone to introduce a new friend."]
    }
  }
];

const MOON_PROMPTS = [
  { type: "warmup", zh: "你心中最有“过节味”的一道食物是什么？", en: "What food makes a celebration feel complete to you?" },
  { type: "warmup", zh: "甜月饼还是咸月饼？用十秒为你的选择辩护。", en: "Sweet or savory mooncakes? Defend your choice in ten seconds." },
  { type: "story", zh: "说起“家乡”，你脑海里先出现什么声音或气味？", en: "When you hear “hometown,” what sound or smell comes to mind first?" },
  { type: "story", zh: "分享一个你小时候过节时才有的小传统。", en: "Share a small holiday tradition from your childhood." },
  { type: "gratitude", zh: "过去一年，有谁曾在你需要时陪伴你？", en: "Who showed up for you when you needed someone this past year?" },
  { type: "warmup", zh: "如果今晚能请一位历史人物来吃饭，你会请谁？", en: "If one person from history could join dinner tonight, whom would you invite?" },
  { type: "faith", zh: "“团圆”让你想到上帝怎样的心意？", en: "What might reunion reveal about God's heart?" },
  { type: "gratitude", zh: "最近一件很小、却让你感到被爱的小事是什么？", en: "What small thing recently made you feel cared for?" },
  { type: "story", zh: "谁教会了你怎样好好招待客人？", en: "Who taught you what genuine hospitality looks like?" },
  { type: "faith", zh: "诗篇说“看哪，弟兄和睦同居是何等地善、何等地美”。你在哪里体验过这种美？", en: "Psalm 133 celebrates people living in unity. Where have you experienced that kind of beauty?" },
  { type: "warmup", zh: "用三个词形容你理想中的团圆夜。", en: "Describe your ideal reunion evening in three words." },
  { type: "gratitude", zh: "此刻，你最想为哪一件事说“谢谢”？", en: "What is one thing you most want to say thank you for tonight?" },
  { type: "story", zh: "分享一次你在陌生地方被热情接待的经历。", en: "Share a time you were warmly welcomed in an unfamiliar place." },
  { type: "faith", zh: "耶稣常在饭桌上与人相遇。若祂坐在这桌，你最想问什么？", en: "Jesus often met people around a table. If he sat here tonight, what would you ask?" },
  { type: "warmup", zh: "今晚的月亮，你会给它配哪一首歌？", en: "What song would you play for tonight's moon?" },
  { type: "warmup", zh: "如果能给月饼发明一种新口味，你会做什么馅？", en: "If you could invent a new mooncake filling, what would it be?" },
  { type: "warmup", zh: "你更喜欢热闹的一大桌，还是安静的两三人？", en: "A big noisy table or a quiet one for three? Why?" },
  { type: "warmup", zh: "如果中秋多放三天假，你最想拿来做什么？", en: "If the holiday gave you three extra days, how would you spend them?" },
  { type: "story", zh: "你记得的第一个中秋，是在哪里过的？", en: "Where did you spend the first Mid-Autumn Festival you can remember?" },
  { type: "story", zh: "家里有没有一道“只有某个人会做”的菜？", en: "Is there a dish only one person in your family knows how to make?" },
  { type: "story", zh: "说一个和月亮有关的记忆——赶路、等人，或抬头的那一刻。", en: "Share a memory with the moon in it: a journey, a wait, or the moment you looked up." },
  { type: "story", zh: "第一次离家过节，你是怎么度过的？", en: "How did you spend your first festival away from home?" },
  { type: "gratitude", zh: "今年有谁的一通电话或一条消息，来得刚刚好？", en: "Whose call or message this year arrived at exactly the right moment?" },
  { type: "gratitude", zh: "这一桌里，你想当面对谁说一句谢谢？", en: "Who at this table would you like to thank out loud, right now?" },
  { type: "gratitude", zh: "有什么是你今年学会珍惜、去年却没怎么在意的？", en: "What did you learn to treasure this year that you overlooked last year?" },
  { type: "faith", zh: "月亮自己不发光，只是反射太阳。这让你想到什么？", en: "The moon makes no light of its own; it only reflects the sun. What does that stir in you?" },
  { type: "faith", zh: "有哪一件事，你还在等上帝的答案？", en: "What are you still waiting on God about?" },
  { type: "faith", zh: "如果今晚的桌上留一个空位，你会为谁祷告？", en: "If one seat at tonight's table were left empty, who would you pray for?" }
];

const BLESSING_ROUNDS = [
  [
    { zh: "说一件过去一年中意外得到的帮助。", en: "Name unexpected help you received this past year." },
    { zh: "向现场一位曾帮助你的人说声谢谢。", en: "Thank someone here who has helped you." },
    { zh: "为下一位送上一句关于勇气的祝福。", en: "Offer the next person a blessing of courage." }
  ],
  [
    { zh: "说一个你曾以为很难、后来却走过来的时刻。", en: "Recall something hard that you eventually made it through." },
    { zh: "为一件看似平常的小事献上感谢。", en: "Give thanks for one ordinary, easily missed gift." },
    { zh: "为下一位送上一句关于平安的祝福。", en: "Offer the next person a blessing of peace." }
  ],
  [
    { zh: "今年你学到的一个新功课是什么？", en: "What is one lesson you learned this year?" },
    { zh: "说出一位让你生命更丰盛的人。", en: "Name someone who makes your life richer." },
    { zh: "为下一位送上一句关于盼望的祝福。", en: "Offer the next person a blessing of hope." }
  ],
  [
    { zh: "分享一次计划改变、结果却比预期更好的经历。", en: "Share a plan that changed and turned out better than expected." },
    { zh: "感谢上帝或一位朋友所给的“第二次机会”。", en: "Give thanks to God or a friend for a second chance." },
    { zh: "为下一位送上一句关于新开始的祝福。", en: "Offer the next person a blessing for a new beginning." }
  ]
];

const QUIZ = [
  { q: { zh: "什么东西越分享，自己反而越多？", en: "What grows in you the more you share it?" }, opts: [{zh:"影子",en:"A shadow"},{zh:"喜乐",en:"Joy"},{zh:"秘密",en:"A secret"},{zh:"年糕",en:"Rice cake"}], a: 1, note: { zh: "喜乐常在分享中加倍；腓立比书也多次邀请信徒一同喜乐。", en: "Joy often multiplies when shared; Philippians repeatedly invites believers to rejoice together." } },
  { q: { zh: "诗篇 119:105 把上帝的话比作什么？", en: "In Psalm 119:105, God's word is compared to what?" }, opts: [{zh:"脚前的灯",en:"A lamp for our feet"},{zh:"天上的星",en:"A star in the sky"},{zh:"城墙",en:"A city wall"},{zh:"清晨的雨",en:"Morning rain"}], a: 0, note: { zh: "“你的话是我脚前的灯，是我路上的光。”（诗篇 119:105）", en: "“Thy word is a lamp unto my feet, and a light unto my path.” (Psalm 119:105)" } },
  { q: { zh: "元宵灯笼里点的是火；耶稣说，点灯以后应当放在哪里？", en: "Jesus said that after lighting a lamp, where should it be placed?" }, opts: [{zh:"斗底下",en:"Under a basket"},{zh:"门外",en:"Outside the door"},{zh:"灯台上",en:"On a stand"},{zh:"床底下",en:"Under a bed"}], a: 2, note: { zh: "灯放在灯台上，就照亮一家的人。（马太福音 5:15）", en: "A lamp is put on a stand, where it gives light to everyone in the house. (Matthew 5:15)" } },
  { q: { zh: "我没有嘴，却能述说上帝的荣耀；白天看得见，夜里也看得见。我是什么？", en: "I have no mouth, yet declare God's glory; I can be seen by day and by night. What am I?" }, opts: [{zh:"诸天",en:"The heavens"},{zh:"书卷",en:"A scroll"},{zh:"号角",en:"A trumpet"},{zh:"海浪",en:"The waves"}], a: 0, note: { zh: "“诸天述说上帝的荣耀；穹苍传扬他的手段。”（诗篇 19:1）", en: "“The heavens declare the glory of God.” (Psalm 19:1)" } },
  { q: { zh: "约翰福音称谁为“世界的光”？", en: "Who is called “the light of the world” in the Gospel of John?" }, opts: [{zh:"摩西",en:"Moses"},{zh:"施洗约翰",en:"John the Baptist"},{zh:"耶稣",en:"Jesus"},{zh:"彼得",en:"Peter"}], a: 2, note: { zh: "耶稣说：“我是世界的光。跟从我的，就不在黑暗里走。”（约翰福音 8:12）", en: "Jesus said, “I am the light of the world.” (John 8:12)" } },
  { q: { zh: "什么“光”不需要电，却能让害怕的人重新向前？", en: "What kind of “light” needs no electricity, yet helps a fearful person move forward?" }, opts: [{zh:"霓虹灯",en:"Neon"},{zh:"盼望",en:"Hope"},{zh:"手电筒",en:"A flashlight"},{zh:"月光",en:"Moonlight"}], a: 1, note: { zh: "盼望并不否认黑暗，却相信黑暗不是故事的结局。", en: "Hope does not deny darkness; it trusts that darkness is not the end of the story." } },
  { q: { zh: "耶稣说“你们是世上的光”之后，鼓励人把什么显出来？", en: "After saying “you are the light of the world,” what did Jesus tell people to let others see?" }, opts: [{zh:"聪明才智",en:"Their intelligence"},{zh:"好行为",en:"Their good works"},{zh:"宗教知识",en:"Their religious knowledge"},{zh:"个人成就",en:"Their achievements"}], a: 1, note: { zh: "让人看见好行为，便将荣耀归给天父。（马太福音 5:16）", en: "Let people see your good works and glorify your Father in heaven. (Matthew 5:16)" } },
  { q: { zh: "哪一种灯最适合带进人心？", en: "Which light is best carried into another person's heart?" }, opts: [{zh:"最大的灯",en:"The biggest one"},{zh:"最贵的灯",en:"The most expensive one"},{zh:"带着爱心的光",en:"Light carried with love"},{zh:"最亮的灯",en:"The brightest one"}], a: 2, note: { zh: "真理若没有爱容易刺眼；爱中的光，才让人看清也感到温暖。", en: "Truth without love can glare; light carried with love helps people see and feel warmth." } },
  { q: { zh: "圣经记载，上帝创造的第一样东西是什么？", en: "According to Genesis, what did God create first?" }, opts: [{zh:"天",en:"The sky"},{zh:"地",en:"The land"},{zh:"光",en:"Light"},{zh:"海",en:"The sea"}], a: 2, note: { zh: "“上帝说：要有光，就有了光。”（创世记 1:3）", en: "“And God said, Let there be light: and there was light.” (Genesis 1:3)" } },
  { q: { zh: "灯谜：越用越短，却让别人看得更清楚。我是什么？", en: "Riddle: the more I am used the shorter I get, yet others see more clearly. What am I?" }, opts: [{zh:"尺子",en:"A ruler"},{zh:"蜡烛",en:"A candle"},{zh:"绳子",en:"A rope"},{zh:"铅笔",en:"A pencil"}], a: 1, note: { zh: "蜡烛的光是烧自己换来的；有些爱也是这样。", en: "A candle spends itself to give light; some kinds of love work the same way." } },
  { q: { zh: "元宵节是农历的哪一天？", en: "On which day of the lunar calendar is the Lantern Festival?" }, opts: [{zh:"正月初一",en:"First day of the first month"},{zh:"正月十五",en:"Fifteenth day of the first month"},{zh:"八月十五",en:"Fifteenth day of the eighth month"},{zh:"腊月初八",en:"Eighth day of the twelfth month"}], a: 1, note: { zh: "正月十五，第一个满月之夜，也是春节的收尾。", en: "The fifteenth day of the first month, the year's first full moon and the close of the New Year season." } },
  { q: { zh: "以赛亚书说，在黑暗中行走的百姓看见了什么？", en: "In Isaiah, what did the people walking in darkness see?" }, opts: [{zh:"大光",en:"A great light"},{zh:"星辰",en:"The stars"},{zh:"彩虹",en:"A rainbow"},{zh:"火焰",en:"A flame"}], a: 0, note: { zh: "“在黑暗中行走的百姓看见了大光。”（以赛亚书 9:2）", en: "“The people that walked in darkness have seen a great light.” (Isaiah 9:2)" } },
  { q: { zh: "出埃及时，上帝夜间用什么引导以色列人？", en: "During the exodus, what guided Israel by night?" }, opts: [{zh:"云柱",en:"A pillar of cloud"},{zh:"火柱",en:"A pillar of fire"},{zh:"晨星",en:"The morning star"},{zh:"灯塔",en:"A lighthouse"}], a: 1, note: { zh: "“日间云柱，夜间火柱”，一路光照他们。（出埃及记 13:21）", en: "A pillar of cloud by day and a pillar of fire by night lit their way. (Exodus 13:21)" } },
  { q: { zh: "十个童女的比喻里，聪明的童女多预备了什么？", en: "In the parable of the ten virgins, what did the wise ones bring extra?" }, opts: [{zh:"新衣",en:"New clothes"},{zh:"礼物",en:"Gifts"},{zh:"器皿里的油",en:"Oil in their jars"},{zh:"更大的灯",en:"Bigger lamps"}], a: 2, note: { zh: "聪明的童女拿着灯，又预备油在器皿里。（马太福音 25:4）", en: "The wise took jars of oil along with their lamps. (Matthew 25:4)" } },
  { q: { zh: "启示录说新耶路撒冷不需要日月照耀，因为谁是城的灯？", en: "Revelation says the New Jerusalem needs no sun or moon, because who is its lamp?" }, opts: [{zh:"羔羊",en:"The Lamb"},{zh:"天使",en:"The angels"},{zh:"众星",en:"The stars"},{zh:"金灯台",en:"A golden lampstand"}], a: 0, note: { zh: "“有上帝的荣耀光照，又有羔羊为城的灯。”（启示录 21:23）", en: "“The glory of God gives it light, and the Lamb is its lamp.” (Revelation 21:23)" } },
  { q: { zh: "约翰一书说，我们若在光明中行，会有什么结果？", en: "According to 1 John, what happens when we walk in the light?" }, opts: [{zh:"不再需要休息",en:"We no longer need rest"},{zh:"彼此相交",en:"We have fellowship with one another"},{zh:"变得富足",en:"We become wealthy"},{zh:"不会再犯错",en:"We never make mistakes"}], a: 1, note: { zh: "“我们若在光明中行，就彼此相交。”（约翰一书 1:7）诚实使人靠近。", en: "“If we walk in the light, we have fellowship with one another.” (1 John 1:7) Honesty brings people closer." } },
  { q: { zh: "灯谜：一支蜡烛点亮另一支，自己的光会变少吗？", en: "Riddle: when one candle lights another, does its own light grow smaller?" }, opts: [{zh:"会少一半",en:"It halves"},{zh:"不会，反而更亮",en:"No, the room gets brighter"},{zh:"会全部熄灭",en:"It goes out"},{zh:"要看风向",en:"It depends on the wind"}], a: 1, note: { zh: "分出去的光不会亏欠自己，屋子却更亮了。", en: "Light given away costs the giver nothing, and the room ends up brighter." } },
  { q: { zh: "元宵节写在灯笼上，让人一边赏灯一边动脑的是什么？", en: "What is written on the lanterns for guests to puzzle over while they admire them?" }, opts: [{zh:"灯谜",en:"Riddles"},{zh:"对联",en:"Couplets"},{zh:"家训",en:"Family mottos"},{zh:"菜单",en:"The menu"}], a: 0, note: { zh: "猜灯谜从宋代流传至今，是元宵夜最热闹的一环。", en: "Guessing lantern riddles dates back to the Song dynasty and is still the liveliest part of the night." } }
];

const BINGO_PROMPTS = [
  {zh:"今年第一次来这间教会",en:"Is visiting this church for the first time"}, {zh:"会做一道拿手的家乡菜",en:"Can cook a favorite hometown dish"},
  {zh:"名字里有一种美好含义",en:"Has a name with a meaningful story"}, {zh:"曾在三个以上城市生活",en:"Has lived in three or more cities"},
  {zh:"今天认识了一位新朋友",en:"Met someone new today"}, {zh:"能教你一句家乡方言",en:"Can teach you a phrase in their dialect"},
  {zh:"有一首常带来安慰的歌",en:"Has a song that brings them comfort"}, {zh:"最近帮助过一位陌生人",en:"Recently helped a stranger"},
  {zh:"最喜欢的节日食物和你一样",en:"Shares your favorite festival food"}, {zh:"家里保留一个特别传统",en:"Keeps a special family tradition"},
  {zh:"曾被陌生人的善意感动",en:"Was moved by a stranger's kindness"}, {zh:"会演奏一种乐器",en:"Can play a musical instrument"},
  {zh:"今年学会了一项新技能",en:"Learned a new skill this year"}, {zh:"愿意分享一件感恩的事",en:"Will share one thing they are grateful for"},
  {zh:"和你来自不同的省或国家",en:"Comes from a different province or country"}, {zh:"有一个正在期待的新开始",en:"Is looking forward to a new beginning"},
  {zh:"曾邀请朋友来家里吃饭",en:"Has invited friends home for a meal"}, {zh:"能背出一句带来盼望的话",en:"Knows a hopeful quote or verse"},
  {zh:"喜欢甜食胜过咸食",en:"Prefers sweet food to savory"}, {zh:"曾参加过两种文化的新年庆祝",en:"Has celebrated New Year in two cultures"},
  {zh:"会说三种以上语言或方言",en:"Speaks three or more languages or dialects"}, {zh:"今天走路或骑车来的",en:"Walked or biked here today"},
  {zh:"有两个以上的兄弟姐妹",en:"Has more than two siblings"}, {zh:"养过一只宠物",en:"Has kept a pet"},
  {zh:"会包饺子",en:"Knows how to fold dumplings"}, {zh:"生日和你在同一个月",en:"Shares your birth month"},
  {zh:"今年读完了一本书",en:"Finished a book this year"}, {zh:"有一道家传的甜品做法",en:"Has a family recipe for a dessert"},
  {zh:"曾在海外过春节",en:"Has spent Lunar New Year abroad"}, {zh:"家里还有人也在这间教会",en:"Has family in this church too"},
  {zh:"最近换了新工作或新学校",en:"Recently started a new job or school"}, {zh:"会下棋或打牌",en:"Plays chess or cards"},
  {zh:"是六点前起床的人",en:"Is up before six in the morning"}, {zh:"今年寄出过一张手写卡片",en:"Sent a handwritten card this year"},
  {zh:"有一个很想去却还没去的地方",en:"Has a place they long to visit"}, {zh:"会修东西：家电或自行车",en:"Can fix things — appliances or bikes"},
  {zh:"喜欢在厨房里招待人",en:"Loves hosting people in the kitchen"}, {zh:"名字里有和自然有关的字",en:"Has a word from nature in their name"},
  {zh:"今年为某个人祷告过",en:"Prayed for someone this year"}, {zh:"记得第一次来教会的那一天",en:"Remembers their first day at church"},
  {zh:"会唱一首儿时的歌",en:"Can sing a song from childhood"}, {zh:"今天身上有一处红色",en:"Is wearing something red today"},
  {zh:"搬过五次以上的家",en:"Has moved house more than five times"}, {zh:"有一个坚持了一年以上的习惯",en:"Has kept one habit for over a year"}
];

const storage = {
  get(key) { try { return localStorage.getItem(key); } catch (_) { return null; } },
  set(key, value) { try { localStorage.setItem(key, value); } catch (_) { /* private browsing */ } }
};
const savedLang = storage.get("festival-games.lang");
const browserLang = () => {
  const nav = (navigator.language || "en").toLowerCase();
  if (!nav.startsWith("zh")) return "en";
  return /hant|tw|hk|mo/.test(nav) ? "tw" : "zh";
};
const clock = (seconds) => `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

const shuffle = (items) => [...items].sort(() => Math.random() - .5);
const escapeAttr = (text) => text.replace(/[&<>"]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[ch]);

const state = {
  lang: ["zh", "tw", "en"].includes(savedLang) ? savedLang : browserLang(),
  game: GAMES.some(g => g.id === location.hash.slice(1)) ? location.hash.slice(1) : "moon",
  moon: { deck: shuffle(MOON_PROMPTS.map((_, i) => i)), pos: 0, shared: 0, time: 60, running: false },
  blessing: { round: 0, step: 0, score: 0 },
  quiz: { index: 0, score: 0, selected: null },
  bingo: { deck: [], prompts: [], marked: new Map(), winners: new Set() }
};

let timerId = null;
let toastId = null;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const tr = (key) => I18N[state.lang][key];
const local = (value) => state.lang === "tw" ? toTW(value.zh) : value[state.lang];
const game = () => GAMES.find(item => item.id === state.game);
function toast(message) {
  const el = $("#toast");
  clearTimeout(toastId);
  el.textContent = message;
  el.classList.add("show");
  toastId = setTimeout(() => el.classList.remove("show"), 2300);
}

function renderStaticText() {
  document.documentElement.lang = tr("htmlLang");
  document.title = tr("docTitle");
  $$('[data-i18n]').forEach(el => { el.textContent = tr(el.dataset.i18n); });
  $$('[data-lang]').forEach(button => button.setAttribute("aria-pressed", String(button.dataset.lang === state.lang)));
  $("#theme-button").setAttribute("aria-label", tr("ariaTheme"));
  $("#theme-button").title = tr("ariaTheme");
}

function renderNav() {
  $("#game-nav").innerHTML = GAMES.map(item => `
    <button class="game-tab" type="button" data-game="${item.id}" aria-current="${item.id === state.game}" style="--tab-accent:${item.accent}">
      <span class="tab-symbol" aria-hidden="true">${item.symbol}</span>
      <span class="tab-copy"><strong>${local(item.name)}</strong><small>${local(item.short)}</small></span>
      <span class="tab-arrow" aria-hidden="true">›</span>
    </button>`).join("");
}

function shell(inner, statusValue, statusLabel) {
  const item = game();
  return `<article class="game-board" data-game="${item.id}" style="--game-accent:${item.accent}">
    <header class="board-head">
      <div><p class="board-kicker">${local(item.festival)} · ${local(item.short)}</p><h2>${local(item.name)}</h2><p class="board-description">${local(item.description)}</p></div>
      <div class="board-status"><strong>${statusValue}</strong><small>${statusLabel}</small></div>
    </header>${inner}
  </article>`;
}

function moonView() {
  const prompt = MOON_PROMPTS[state.moon.deck[state.moon.pos]];
  const typeLabel = tr(prompt.type);
  const body = `<div class="board-actions board-actions-top">
      <div class="timer-wrap"><span>${clock(state.moon.time)}</span><button class="timer-toggle" type="button" data-action="timer" aria-label="${state.moon.running ? tr("pauseTimer") : tr("startTimer")}">${state.moon.running ? "Ⅱ" : "▶"}</button></div>
      <button class="secondary-button" type="button" data-action="shared">✓ ${tr("passes")}</button>
      <button class="primary-button" type="button" data-action="draw"><span>${tr("draw")}</span><svg viewBox="0 0 20 20"><path d="M4 10h11M11 6l4 4-4 4"/></svg></button>
    </div>
    <div class="board-body"><div class="prompt-card animate" key="${state.moon.deck[state.moon.pos]}">
      <span class="prompt-type">${typeLabel}</span><p class="prompt-text">${local(prompt)}</p><p class="prompt-hint">${tr("moonHint")}</p>
    </div></div>`;
  return shell(body, state.moon.shared, tr("sharedCount"));
}

function blessingView() {
  const current = BLESSING_ROUNDS[state.blessing.round % BLESSING_ROUNDS.length];
  const titles = [tr("step1"), tr("step2"), tr("step3")];
  const body = `<div class="board-body"><div class="blessing-steps">
    ${current.map((prompt, i) => `<article class="blessing-step ${i === state.blessing.step ? "active" : ""} ${i < state.blessing.step ? "done" : ""}">
      <span class="step-no">0${i + 1}</span><h3>${titles[i]}</h3><p>${local(prompt)}</p>
    </article>`).join("")}
    </div></div>
    <div class="board-actions">
      <div class="score-control"><button type="button" data-action="score-down" aria-label="-1">−</button><strong>${state.blessing.score}</strong><button type="button" data-action="score-up" aria-label="+1">+</button></div>
      <button class="primary-button" type="button" data-action="blessing-next">${state.blessing.step < 2 ? tr("nextStep") : tr("nextRound")}<svg viewBox="0 0 20 20"><path d="M4 10h11M11 6l4 4-4 4"/></svg></button>
    </div>`;
  return shell(body, `${String(state.blessing.round + 1).padStart(2,"0")}`, tr("roundLabel"));
}

function quizView() {
  const q = QUIZ[state.quiz.index];
  const answered = state.quiz.selected !== null;
  const options = q.opts.map((opt, i) => {
    const resultClass = answered && i === q.a ? "correct" : answered && i === state.quiz.selected ? "wrong" : "";
    return `<button class="quiz-option ${resultClass}" type="button" data-answer="${i}" ${answered ? "disabled" : ""}><span class="letter">${"ABCD"[i]}</span><span>${local(opt)}</span></button>`;
  }).join("");
  const feedback = answered ? `<strong>${state.quiz.selected === q.a ? tr("correct") : tr("notQuite")}</strong>&nbsp; ${local(q.note)}` : tr("chooseAnswer");
  const isLast = state.quiz.index === QUIZ.length - 1;
  const body = `<div class="board-body"><div class="quiz-wrap"><p class="quiz-question">${local(q.q)}</p><div class="quiz-options">${options}</div><div class="quiz-feedback">${feedback}</div></div></div>
    <div class="board-actions">${answered ? `<button class="primary-button" type="button" data-action="quiz-next">${isLast ? tr("restartQuiz") : tr("nextQuestion")}<svg viewBox="0 0 20 20"><path d="M4 10h11M11 6l4 4-4 4"/></svg></button>` : ""}</div>`;
  return shell(body, `${state.quiz.score}/${QUIZ.length}`, tr("score"));
}

function dealBingo() {
  const card = state.bingo.deck.splice(0, 16);
  if (card.length < 16) {
    // pool exhausted: refill, keeping the card just played off the next one too
    const unused = BINGO_PROMPTS.filter(prompt => !card.includes(prompt) && !state.bingo.prompts.includes(prompt));
    const rest = BINGO_PROMPTS.filter(prompt => !card.includes(prompt));
    state.bingo.deck = shuffle(unused.length >= 16 ? unused : rest);
    card.push(...state.bingo.deck.splice(0, 16 - card.length));
  }
  state.bingo.prompts = card;
  state.bingo.marked.clear();
  state.bingo.winners.clear();
}

function calculateWinners(marked) {
  const lines = [];
  for (let r = 0; r < 4; r++) lines.push([0,1,2,3].map(c => r * 4 + c));
  for (let c = 0; c < 4; c++) lines.push([0,1,2,3].map(r => r * 4 + c));
  lines.push([0,5,10,15], [3,6,9,12]);
  return new Set(lines.filter(line => line.every(i => marked.has(i))).flat());
}

function bingoView() {
  if (!state.bingo.prompts.length) dealBingo();
  const body = `<div class="board-body"><div class="bingo-grid">${state.bingo.prompts.map((prompt, i) => `
    <div class="bingo-cell ${state.bingo.marked.has(i) ? "marked" : ""} ${state.bingo.winners.has(i) ? "winner" : ""}">
      <button class="bingo-mark" type="button" data-cell="${i}" aria-pressed="${state.bingo.marked.has(i)}">${local(prompt)}</button>
      <input class="bingo-name" data-name="${i}" value="${escapeAttr(state.bingo.marked.get(i) || "")}" placeholder="${tr("namePlaceholder")}" aria-label="${tr("namePlaceholder")}" />
    </div>`).join("")}</div></div>
    <div class="board-actions"><button class="secondary-button" type="button" data-action="new-board"><svg viewBox="0 0 20 20"><path d="M15 7V3m0 0h-4M15 3l-3 3a6 6 0 1 0 1.3 6.5"/></svg>${tr("newBoard")}</button></div>`;
  return shell(body, `${state.bingo.marked.size}/16`, tr("marked"));
}

function renderGame() {
  const item = game();
  $("#game-stage").style.setProperty("--game-accent", item.accent);
  $("#festival-chip").textContent = local(item.festival);
  $("#stage-meta").textContent = local(item.meta);
  const renderers = { moon: moonView, blessing: blessingView, lantern: quizView, bingo: bingoView };
  $("#game-view").innerHTML = renderers[state.game]();
}

function render() {
  renderStaticText();
  renderNav();
  renderGame();
}

function selectGame(id, announce = false) {
  if (!GAMES.some(item => item.id === id)) return;
  stopTimer();
  state.game = id;
  history.replaceState(null, "", `#${id}`);
  renderNav();
  renderGame();
  if (announce) toast(tr("copied"));
}

function stopTimer() {
  clearInterval(timerId);
  timerId = null;
  state.moon.running = false;
}

function paintTimer() {
  const text = $(".timer-wrap > span");
  if (text) text.textContent = clock(state.moon.time);
  const toggle = $(".timer-toggle");
  if (!toggle) return;
  toggle.textContent = state.moon.running ? "Ⅱ" : "▶";
  toggle.setAttribute("aria-label", state.moon.running ? tr("pauseTimer") : tr("startTimer"));
}

function toggleTimer() {
  if (state.moon.running) {
    stopTimer();
    paintTimer();
    return;
  }
  if (state.moon.time === 0) state.moon.time = 60;
  state.moon.running = true;
  paintTimer();
  timerId = setInterval(() => {
    state.moon.time -= 1;
    if (state.moon.time <= 0) {
      state.moon.time = 0;
      stopTimer();
      paintTimer();
      toast(tr("timerDone"));
      return;
    }
    paintTimer();
  }, 1000);
}

function drawMoon() {
  stopTimer();
  state.moon.pos += 1;
  if (state.moon.pos >= state.moon.deck.length) {
    const last = state.moon.deck[state.moon.deck.length - 1];
    do { state.moon.deck = shuffle(state.moon.deck); } while (state.moon.deck[0] === last);
    state.moon.pos = 0;
    toast(tr("deckReset"));
  }
  state.moon.time = 60;
  renderGame();
}

function showHow() {
  const item = game();
  $("#dialog-kicker").textContent = local(item.festival);
  $("#dialog-title").textContent = local(item.name);
  const steps = state.lang === "tw" ? item.steps.zh.map(toTW) : item.steps[state.lang];
  $("#dialog-steps").innerHTML = steps.map(step => `<li>${step}</li>`).join("");
  $("#dialog-note").textContent = tr("hostNote");
  const dialog = $("#how-dialog");
  dialog.showModal();
  document.body.classList.add("dialog-open");
}

async function toggleFullscreen() {
  try {
    if (!document.fullscreenElement) {
      await $("#game-stage").requestFullscreen();
      toast(tr("fullOn"));
    } else {
      await document.exitFullscreen();
      toast(tr("fullOff"));
    }
  } catch (_) {
    toast(tr("fullBlocked"));
  }
}

function handleGameAction(target) {
  const action = target.closest("[data-action]")?.dataset.action;
  if (action === "draw") drawMoon();
  if (action === "timer") toggleTimer();
  if (action === "shared") {
    state.moon.shared += 1;
    $(".board-status strong").textContent = state.moon.shared;
  }
  if (action === "score-up") { state.blessing.score += 1; renderGame(); }
  if (action === "score-down") { state.blessing.score = Math.max(0, state.blessing.score - 1); renderGame(); }
  if (action === "blessing-next") {
    if (state.blessing.step < 2) state.blessing.step += 1;
    else { state.blessing.step = 0; state.blessing.round += 1; }
    renderGame();
  }
  if (action === "quiz-next") {
    if (state.quiz.index === QUIZ.length - 1) { state.quiz.index = 0; state.quiz.score = 0; }
    else state.quiz.index += 1;
    state.quiz.selected = null;
    renderGame();
  }
  if (action === "new-board") {
    dealBingo();
    renderGame();
  }

  const answer = target.closest("[data-answer]");
  if (answer && state.quiz.selected === null) {
    state.quiz.selected = Number(answer.dataset.answer);
    if (state.quiz.selected === QUIZ[state.quiz.index].a) state.quiz.score += 1;
    renderGame();
  }

  const cell = target.closest("[data-cell]");
  if (cell) {
    const index = Number(cell.dataset.cell);
    if (state.bingo.marked.has(index)) state.bingo.marked.delete(index); else state.bingo.marked.set(index, "");
    const hadWinner = state.bingo.winners.size > 0;
    state.bingo.winners = calculateWinners(state.bingo.marked);
    renderGame();
    /* the host marks the square and types the name in one move */
    $(`[data-name="${index}"]`)?.focus();
    if (!hadWinner && state.bingo.winners.size) toast(tr("bingo"));
  }
}

function registerWebMCP() {
  const context = document.modelContext;
  if (!context?.registerTool) return;
  const safe = fn => { try { return fn(); } catch (error) { return { error: String(error.message || error) }; } };
  void Promise.resolve(context.registerTool({
    name: "select_festival_game", title: "Select festival game",
    description: "Open one of the four visible festival games by its stable id.",
    inputSchema: { type: "object", properties: { gameId: { type: "string", enum: GAMES.map(g => g.id) } }, required: ["gameId"], additionalProperties: false },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute: ({ gameId }) => safe(() => { selectGame(gameId); return { gameId, title: local(game().name) }; })
  }));
  void Promise.resolve(context.registerTool({
    name: "advance_current_game", title: "Advance current game",
    description: "Draw or advance the currently visible game to its next prompt, relay step, quiz question, or bingo card.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute: () => safe(() => {
      if (state.game === "moon") drawMoon();
      if (state.game === "blessing") {
        if (state.blessing.step < 2) state.blessing.step += 1;
        else { state.blessing.step = 0; state.blessing.round += 1; }
        renderGame();
      }
      if (state.game === "lantern" && state.quiz.selected !== null) {
        state.quiz.index = state.quiz.index === QUIZ.length - 1 ? 0 : state.quiz.index + 1;
        state.quiz.selected = null;
        renderGame();
      }
      if (state.game === "bingo") {
        dealBingo();
        renderGame();
      }
      return { gameId: state.game, advanced: true };
    })
  }));
}

$("#game-nav").addEventListener("click", event => {
  const button = event.target.closest("[data-game]");
  if (button) selectGame(button.dataset.game, true);
});
$("#game-view").addEventListener("click", event => handleGameAction(event.target));
$("#game-view").addEventListener("input", event => {
  const field = event.target.closest("[data-name]");
  if (field) state.bingo.marked.set(Number(field.dataset.name), field.value);
});
$("#how-button").addEventListener("click", showHow);
$("#fullscreen-button").addEventListener("click", toggleFullscreen);
$("#how-dialog").addEventListener("close", () => document.body.classList.remove("dialog-open"));
$("#how-dialog").addEventListener("click", event => {
  if (event.target === $("#how-dialog")) $("#how-dialog").close();
});
$$('[data-lang]').forEach(button => button.addEventListener("click", () => {
  state.lang = button.dataset.lang;
  storage.set("festival-games.lang", state.lang);
  render();
}));
$("#theme-button").addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  storage.set("festival-games.theme", next);
});
window.addEventListener("hashchange", () => selectGame(location.hash.slice(1)));

document.documentElement.dataset.theme = storage.get("festival-games.theme") || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
render();
registerWebMCP();
