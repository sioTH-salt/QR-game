const FALLBACK_CONFIG = {
  app: {
    title: "バグなおしラン",
    language: "ja",
    cta_url: "/reserve.html",
    privacy_note: "ゲーム中に個人情報入力はありません。"
  },
  stage: {
    default_stage_id: "flyer_default_001",
    time_limit_sec: 90,
    mid_bug_event_count: 1,
    final_bug_quiz_count: 1
  },
  difficulty: {
    easy: {
      label: "かんたん",
      speed: 0.55,
      gimmick_level: 0,
      bug_frequency: 0,
      spawn_chance: 0.5
    },
    normal: { label: "ふつう", speed: 0.85, gimmick_level: 1, bug_frequency: 1, spawn_chance: 1 },
    hard: { label: "むずかしい", speed: 1.05, gimmick_level: 2, bug_frequency: 1, spawn_chance: 1 }
  }
};

const TYPE_META = {
  debug_detective: {
    name: "デバッグ探偵",
    comment: "細かい違和感をすぐ見つけられる観察名人！"
  },
  logical_runner: {
    name: "ロジカルランナー",
    comment: "落ち着いた判断で安定して攻略できる！"
  },
  sprint_challenger: {
    name: "スプリントチャレンジャー",
    comment: "勢いよく突破するチャレンジ力がすごい！"
  },
  adapter: {
    name: "アダプター",
    comment: "バランスよく力を発揮できる万能タイプ！"
  }
};

const DIFFICULTY_ORDER = ["easy", "normal", "hard"];
const TOTAL_BUGS = 4;
const BIG_ENEMY_SIZE = { w: 180, h: 210 };
const SMALL_ENEMY_SIZE = { w: 84, h: 68 };
const HAZARD_START_DISTANCE = 100;
const BIG_ENEMY_DISTANCE = 500;
const JUMP_BUG_TRIGGER_OFFSET = 60;
const BIG_ENEMY_PREVIEW_MS = 1600;
const BIG_ENEMY_RETURN_MS = 480;
const BIG_ENEMY_PREVIEW_PAN = 240;
const JUMP_TRIGGER_DISTANCE = 150;
const SKILL_DOUBLE_JUMP_DISTANCE = 1000;
const SKILL_STOMP_DISTANCE = 2000;
const RESERVE_DISTANCE_GATE_M = 500;
const MISS_MESSAGES_500 = [
  "まずは500mを目指そう！",
  "500m帯: ナイススタート！",
  "1000m帯: 集中力がすごい！",
  "1500m帯: 反応が速い！",
  "2000m帯: 回避がうまい！",
  "2500m帯: 流れに乗れてる！",
  "3000m帯: 実力派だね！",
  "3500m帯: センスが光る！",
  "4000m帯: 安定感ばつぐん！",
  "4500m帯: もう上級者！",
  "5000m帯: ここから本番！",
  "5500m帯: かなり強い！",
  "6000m帯: 目が鍛えられてる！",
  "6500m帯: 神プレイの予感！",
  "7000m帯: 圧倒的にうまい！",
  "7500m帯: ほぼプロ級！",
  "8000m帯: レジェンド候補！",
  "8500m帯: 天才ムーブ連発！",
  "9000m帯: 覚醒してる！",
  "9500m帯: 伝説まであと少し！",
  "10000m帯: 伝説級の天才！！"
];

const PUZZLES = {
  move_right: {
    variants: {
      easy: {
        title: "ばぐなおし：みぎ",
        status: "みぎにすすめない",
        desc: "みぎにすすめるようにしよう。",
        scene: "いま：みぎにすすめない / なおす：みぎにすすめる",
        slots: ["ここ"],
        slotHints: ["みぎ"],
        blocks: [
          { id: "move_right", label: "みぎにすすめるようにする", bad: false },
          { id: "move_left", label: "ひだりにすすめるようにする", bad: true },
          { id: "move_right_off", label: "みぎにすすめない", bad: true }
        ],
        answer: ["move_right"],
        hints: ["ひんと：『みぎにすすめるようにする』をいれてみよう。", "こたえ：みぎにすすめるようにする"],
        answerText: "こたえ：みぎにすすめるようにする",
        buildCode: "いま：みぎ = できない\nめざす：みぎ = できる"
      },
      normal: {
        title: "バグなおし：右へ",
        status: "右にすすめない",
        desc: "右にすすめるようにしよう。",
        scene: "いま：右にすすめない / なおす：右にすすめる",
        slots: ["ここ"],
        slotHints: ["右"],
        blocks: [
          { id: "move_right", label: "右にすすめるようにする", bad: false },
          { id: "move_left", label: "左にすすめるようにする", bad: true },
          { id: "move_right_off", label: "右にすすめない", bad: true }
        ],
        answer: ["move_right"],
        hints: ["ヒント：『右にすすめるようにする』を入れてみよう。", "こたえ：右にすすめるようにする"],
        answerText: "こたえ：右にすすめるようにする",
        buildCode: "いま：右 = できない\nめざす：右 = できる"
      },
      hard: {
        title: "バグなおし：右へ",
        status: "右にすすめない",
        desc: "条件をつかって右にすすめるようにしよう。",
        scene: "いま：右にすすめない / なおす：もし 右側をタップしたら 右にすすめる",
        slots: ["もし", "する"],
        slotHints: ["右側をタップしたら", "右にすすめる"],
        blocks: [
          { id: "if_tap_right", label: "もし 右側をタップしたら", bad: false },
          { id: "if_tap_left", label: "もし 左側をタップしたら", bad: true },
          { id: "move_right", label: "右にすすめるようにする", bad: false },
          { id: "move_left", label: "左にすすめるようにする", bad: true }
        ],
        answer: ["if_tap_right", "move_right"],
        hints: [
          "ヒント：『もし 右側をタップしたら』を入れてみよう。",
          "ヒント：『右にすすめるようにする』を入れてみよう。"
        ],
        answerText: "こたえ：もし 右側をタップしたら → 右にすすめるようにする",
        buildCode: "もし 右側をタップしたら\n  右にすすめるようにする"
      }
    }
  },
  move_left: {
    variants: {
      easy: {
        title: "ばぐなおし：ひだり",
        status: "ひだりにすすめない",
        desc: "ひだりにすすめるようにしよう。",
        scene: "いま：ひだりにすすめない / なおす：ひだりにすすめる",
        slots: ["ここ"],
        slotHints: ["ひだり"],
        blocks: [
          { id: "move_left", label: "ひだりにすすめるようにする", bad: false },
          { id: "move_right", label: "みぎにすすめるようにする", bad: true },
          { id: "move_left_off", label: "ひだりにすすめない", bad: true }
        ],
        answer: ["move_left"],
        hints: ["ひんと：『ひだりにすすめるようにする』をいれてみよう。", "こたえ：ひだりにすすめるようにする"],
        answerText: "こたえ：ひだりにすすめるようにする",
        buildCode: "いま：ひだり = できない\nめざす：ひだり = できる"
      },
      normal: {
        title: "バグなおし：左へ",
        status: "左にすすめない",
        desc: "左にすすめるようにしよう。",
        scene: "いま：左にすすめない / なおす：左にすすめる",
        slots: ["ここ"],
        slotHints: ["左"],
        blocks: [
          { id: "move_left", label: "左にすすめるようにする", bad: false },
          { id: "move_right", label: "右にすすめるようにする", bad: true },
          { id: "move_left_off", label: "左にすすめない", bad: true }
        ],
        answer: ["move_left"],
        hints: ["ヒント：『左にすすめるようにする』を入れてみよう。", "こたえ：左にすすめるようにする"],
        answerText: "こたえ：左にすすめるようにする",
        buildCode: "いま：左 = できない\nめざす：左 = できる"
      },
      hard: {
        title: "バグなおし：左へ",
        status: "左にすすめない",
        desc: "条件をつかって左にすすめるようにしよう。",
        scene: "いま：左にすすめない / なおす：もし 左側をタップしたら 左にすすめる",
        slots: ["もし", "する"],
        slotHints: ["左側をタップしたら", "左にすすめる"],
        blocks: [
          { id: "if_tap_left", label: "もし 左側をタップしたら", bad: false },
          { id: "if_tap_right", label: "もし 右側をタップしたら", bad: true },
          { id: "move_left", label: "左にすすめるようにする", bad: false },
          { id: "move_right", label: "右にすすめるようにする", bad: true }
        ],
        answer: ["if_tap_left", "move_left"],
        hints: [
          "ヒント：『もし 左側をタップしたら』を入れてみよう。",
          "ヒント：『左にすすめるようにする』を入れてみよう。"
        ],
        answerText: "こたえ：もし 左側をタップしたら → 左にすすめるようにする",
        buildCode: "もし 左側をタップしたら\n  左にすすめるようにする"
      }
    }
  },
  jump: {
    variants: {
      easy: {
        title: "ばぐなおし：じゃんぷ",
        status: "じゃんぷできない",
        desc: "じゃんぷできるようにしよう。",
        scene: "いま：じゃんぷ できない / なおす：じゃんぷ できる",
        slots: ["ここ"],
        slotHints: ["じゃんぷ"],
        blocks: [
          { id: "jump_on", label: "じゃんぷをできるようにする", bad: false },
          { id: "jump_off", label: "じゃんぷをできなくする", bad: true },
          { id: "tap_ignore", label: "たっぷをむしする", bad: true }
        ],
        answer: ["jump_on"],
        hints: ["ひんと：『じゃんぷをできるようにする』をいれてみよう。", "こたえ：じゃんぷをできるようにする"],
        answerText: "こたえ：じゃんぷをできるようにする",
        buildCode: "いま：じゃんぷ = できない\nめざす：じゃんぷ = できる"
      },
      normal: {
        title: "バグなおし：ジャンプ",
        status: "ジャンプできない",
        desc: "ジャンプできるようにしよう。",
        scene: "いま：ジャンプ できない / なおす：ジャンプ できる",
        slots: ["ここ"],
        slotHints: ["ジャンプ"],
        blocks: [
          { id: "jump_on", label: "ジャンプをできるようにする", bad: false },
          { id: "jump_off", label: "ジャンプをできなくする", bad: true },
          { id: "tap_ignore", label: "タップをむしする", bad: true }
        ],
        answer: ["jump_on"],
        hints: ["ヒント：『ジャンプをできるようにする』を入れてみよう。", "こたえ：ジャンプをできるようにする"],
        answerText: "こたえ：ジャンプをできるようにする",
        buildCode: "いま：ジャンプ = できない\nめざす：ジャンプ = できる"
      },
      hard: {
        title: "バグなおし：ジャンプ",
        status: "ジャンプできない",
        desc: "条件をつかってジャンプできるようにしよう。",
        scene: "いま：ジャンプ できない / なおす：もし まんなかをタップしたら ジャンプできる",
        slots: ["もし", "する"],
        slotHints: ["まんなかをタップしたら", "ジャンプ"],
        blocks: [
          { id: "if_tap_center", label: "もし まんなかをタップしたら", bad: false },
          { id: "if_tap_side", label: "もし すみをタップしたら", bad: true },
          { id: "jump_on", label: "ジャンプをできるようにする", bad: false },
          { id: "jump_off", label: "ジャンプをできなくする", bad: true }
        ],
        answer: ["if_tap_center", "jump_on"],
        hints: [
          "ヒント：『もし まんなかをタップしたら』を入れてみよう。",
          "ヒント：『ジャンプをできるようにする』を入れてみよう。"
        ],
        answerText: "こたえ：もし まんなかをタップしたら → ジャンプをできるようにする",
        buildCode: "もし まんなかをタップしたら\n  ジャンプをできるようにする"
      }
    }
  },
  shrink: {
    variants: {
      easy: {
        title: "ばぐなおし：おおきなてき",
        status: "おおきなてきがでかすぎる",
        desc: "てきをちいさくしてとびこえよう。",
        scene: "いま：てきがおおきい / なおす：てきをちいさくする",
        slots: ["ここ"],
        slotHints: ["ちいさく"],
        blocks: [
          { id: "size_small", label: "てきをちいさくする", bad: false },
          { id: "size_big", label: "てきをおおきくする", bad: true },
          { id: "hitbox_big", label: "あたりはんていをおおきくする", bad: true }
        ],
        answer: ["size_small"],
        hints: ["ひんと：『てきをちいさくする』をいれてみよう。", "こたえ：てきをちいさくする"],
        answerText: "こたえ：てきをちいさくする",
        buildCode: "いま：てきさいず = おおきい\nめざす：てきさいず = ちいさい"
      },
      normal: {
        title: "バグなおし：巨大な敵",
        status: "巨大な敵が大きすぎる",
        desc: "敵を小さくして飛びこえよう。",
        scene: "いま：敵が大きい / なおす：敵を小さくする",
        slots: ["ここ"],
        slotHints: ["小"],
        blocks: [
          { id: "size_small", label: "敵を小さくする", bad: false },
          { id: "size_big", label: "敵を大きくする", bad: true },
          { id: "hitbox_big", label: "当たり判定を大きくする", bad: true }
        ],
        answer: ["size_small"],
        hints: ["ヒント：『敵を小さくする』を入れてみよう。", "こたえ：敵を小さくする"],
        answerText: "こたえ：敵を小さくする",
        buildCode: "いま：敵サイズ = 大\nめざす：敵サイズ = 小"
      },
      hard: {
        title: "バグなおし：巨大な敵",
        status: "巨大な敵が大きすぎる",
        desc: "敵を小さくして飛びこえよう。",
        scene: "いま：敵が大きい / なおす：敵を小さくする",
        slots: ["①", "②"],
        slotHints: ["小", "当たり"],
        blocks: [
          { id: "size_small", label: "敵を小さくする", bad: false },
          { id: "hitbox_small", label: "当たり判定を小さくする", bad: false },
          { id: "size_big", label: "敵を大きくする", bad: true },
          { id: "hitbox_big", label: "当たり判定を大きくする", bad: true }
        ],
        answer: ["size_small", "hitbox_small"],
        hints: [
          "ヒント：小さくするブロックが必要だよ。",
          "ヒント：『敵を小さくする → 当たり判定を小さくする』だよ。"
        ],
        answerText: "こたえ：敵を小さくする → 当たり判定を小さくする",
        buildCode: "いま：敵サイズ = 大\nめざす：敵サイズ = 小"
      }
    }
  },
  double_jump: {
    category: "skill",
    variants: {
      easy: {
        title: "すきるかいほう：にだんじゃんぷ",
        status: "にだんじゃんぷをかいほう",
        desc: "にだんじゃんぷができるようにしよう。",
        scene: "いま：1かいだけ / なおす：にだんじゃんぷ",
        slots: ["ここ"],
        blocks: [
          { id: "double_jump_on", label: "にだんじゃんぷをできるようにする", bad: false },
          { id: "double_jump_off", label: "にだんじゃんぷをできなくする", bad: true },
          { id: "jump_one", label: "1かいだけにする", bad: true }
        ],
        answer: ["double_jump_on"],
        hints: [
          "ひんと：『にだんじゃんぷをできるようにする』をいれてみよう。",
          "こたえ：にだんじゃんぷをできるようにする"
        ],
        answerText: "こたえ：にだんじゃんぷをできるようにする",
        buildCode: "いま：じゃんぷ = 1かい\nめざす：じゃんぷ = 2かい"
      },
      normal: {
        title: "スキル解放：二段ジャンプ",
        status: "二段ジャンプを解放",
        desc: "二段ジャンプができるようにしよう。",
        scene: "いま：1回だけ / なおす：二段ジャンプ",
        slots: ["ここ"],
        blocks: [
          { id: "double_jump_on", label: "二段ジャンプをできるようにする", bad: false },
          { id: "double_jump_off", label: "二段ジャンプをできなくする", bad: true },
          { id: "jump_one", label: "1回だけにする", bad: true }
        ],
        answer: ["double_jump_on"],
        hints: ["ヒント：『二段ジャンプをできるようにする』を入れてみよう。", "こたえ：二段ジャンプをできるようにする"],
        answerText: "こたえ：二段ジャンプをできるようにする",
        buildCode: "いま：ジャンプ = 1回\nめざす：ジャンプ = 2回"
      },
      hard: {
        title: "スキル解放：二段ジャンプ",
        status: "二段ジャンプを解放",
        desc: "条件をつかって2回目のジャンプをできるようにしよう。",
        scene: "いま：1回だけ / なおす：もし 2回目なら もう1回ジャンプできる",
        slots: ["もし", "する"],
        blocks: [
          { id: "if_second_jump", label: "もし 2回目なら", bad: false },
          { id: "if_first_jump", label: "もし 1回目なら", bad: true },
          { id: "double_jump_on", label: "もう1回ジャンプできるようにする", bad: false },
          { id: "double_jump_off", label: "もう1回ジャンプできない", bad: true }
        ],
        answer: ["if_second_jump", "double_jump_on"],
        hints: ["ヒント：『もし 2回目なら』を入れてみよう。", "ヒント：『もう1回ジャンプできるようにする』を入れてみよう。"],
        answerText: "こたえ：もし 2回目なら → もう1回ジャンプできるようにする",
        buildCode: "もし 2回目なら\n  もう1回ジャンプできるようにする"
      }
    }
  },
  stomp: {
    category: "skill",
    variants: {
      easy: {
        title: "すきるかいほう：ふみつけ",
        status: "うえからふんだらたおせる",
        desc: "てきのうえをふんだらたおせるようにしよう。",
        scene: "いま：ふんでもだめ / なおす：ふんだらたおせる",
        slots: ["ここ"],
        blocks: [
          { id: "stomp_on", label: "うえからふんだらたおせるようにする", bad: false },
          { id: "stomp_off", label: "ふんでもたおせない", bad: true },
          { id: "touch_damage", label: "さわったらだめーじ", bad: true }
        ],
        answer: ["stomp_on"],
        hints: [
          "ひんと：『うえからふんだらたおせるようにする』をいれてみよう。",
          "こたえ：うえからふんだらたおせるようにする"
        ],
        answerText: "こたえ：うえからふんだらたおせるようにする",
        buildCode: "いま：ふんでも たおせない\nめざす：ふんだら たおせる"
      },
      normal: {
        title: "スキル解放：踏みつけ",
        status: "上から踏んだら倒せる",
        desc: "敵の上を踏んだら倒せるようにしよう。",
        scene: "いま：踏んでもダメ / なおす：踏んだら倒せる",
        slots: ["ここ"],
        blocks: [
          { id: "stomp_on", label: "上から踏んだら倒せるようにする", bad: false },
          { id: "stomp_off", label: "踏んでも倒せない", bad: true },
          { id: "touch_damage", label: "触ったらダメージ", bad: true }
        ],
        answer: ["stomp_on"],
        hints: ["ヒント：『上から踏んだら倒せるようにする』を入れてみよう。", "こたえ：上から踏んだら倒せるようにする"],
        answerText: "こたえ：上から踏んだら倒せるようにする",
        buildCode: "いま：踏んでも 倒せない\nめざす：踏んだら 倒せる"
      },
      hard: {
        title: "スキル解放：踏みつけ",
        status: "上から踏んだら倒せる",
        desc: "条件をつかって踏みつけで倒せるようにしよう。",
        scene: "いま：踏んでもダメ / なおす：もし 上から踏んだら 倒せる",
        slots: ["もし", "する"],
        blocks: [
          { id: "if_stomp", label: "もし 上から踏んだら", bad: false },
          { id: "if_touch", label: "もし さわったら", bad: true },
          { id: "stomp_on", label: "敵を倒せるようにする", bad: false },
          { id: "stomp_off", label: "敵を倒せない", bad: true }
        ],
        answer: ["if_stomp", "stomp_on"],
        hints: ["ヒント：『もし 上から踏んだら』を入れてみよう。", "ヒント：『敵を倒せるようにする』を入れてみよう。"],
        answerText: "こたえ：もし 上から踏んだら → 敵を倒せるようにする",
        buildCode: "もし 上から踏んだら\n  敵を倒せるようにする"
      }
    }
  }
};

function getPuzzleDefinition(puzzleKey) {
  const entry = PUZZLES[puzzleKey];
  if (!entry) {
    return null;
  }
  const diffKey = game.difficulty;
  return entry.variants?.[diffKey] || entry.variants?.normal || null;
}

function puzzleHintText(active) {
  if (!active) {
    return "";
  }
  const hints = active.definition?.hints || [];
  if (active.wrongAttempts === 0) {
    return hints[0] || "ヒント：ブロックをえらんでみよう。";
  }
  if (active.wrongAttempts === 1) {
    return hints[1] || hints[0] || "ヒント：もう一度ためしてみよう。";
  }
  return hints[hints.length - 1] || "ヒント：もう一度ためしてみよう。";
}

function shuffleArray(input) {
  const list = input.slice();
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = randInt(i + 1);
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

const ui = {
  screens: {
    lp: document.getElementById("screen-lp"),
    game: document.getElementById("screen-game"),
    result: document.getElementById("screen-result")
  },
  difficultyList: document.getElementById("difficulty-list"),
  startBtn: document.getElementById("start-btn"),
  moveLeftBtn: document.getElementById("move-left-btn"),
  moveRightBtn: document.getElementById("move-right-btn"),
  quitBtn: document.getElementById("quit-btn"),
  retryBtn: document.getElementById("retry-btn"),
  ctaBtn: document.getElementById("cta-btn"),
  audioToggleBtn: document.getElementById("audio-toggle-btn"),
  hudTime: document.getElementById("hud-time"),
  hudMiss: document.getElementById("hud-miss"),
  hudBug: document.getElementById("hud-bug"),
  hudDistance: document.getElementById("hud-distance"),
  bugStatus: document.getElementById("bug-status"),
  gameHelp: document.getElementById("game-help"),
  resultTypeName: document.getElementById("result-type-name"),
  resultTypeComment: document.getElementById("result-type-comment"),
  resultScore: document.getElementById("result-score"),
  resultBugFound: document.getElementById("result-bug-found"),
  resultDistance: document.getElementById("result-distance"),
  resultMiss: document.getElementById("result-miss"),
  resultStreak: document.getElementById("result-streak"),
  reservePromptModal: document.getElementById("reserve-prompt-modal"),
  reservePromptLead: document.getElementById("reserve-prompt-lead"),
  reserveGoBtn: document.getElementById("reserve-go-btn"),
  reserveRestartBtn: document.getElementById("reserve-restart-btn"),
  axisBars: document.getElementById("axis-bars"),
  bugModal: document.getElementById("bug-modal"),
  bugCard: document.querySelector("#bug-modal .modal-card"),
  bugTitle: document.getElementById("bug-title"),
  bugDesc: document.getElementById("bug-desc"),
  bugScene: document.getElementById("bug-scene"),
  bugCode: document.getElementById("bug-code"),
  bugSlots: document.getElementById("bug-slots"),
  bugBlocks: document.getElementById("bug-blocks"),
  bugRunBtn: document.getElementById("bug-run-btn"),
  bugResetBtn: document.getElementById("bug-reset-btn"),
  bugFeedback: document.getElementById("bug-feedback"),
  alertOverlay: document.getElementById("alert-overlay"),
  alertOverlayText: document.getElementById("alert-overlay-text")
};

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const inputState = {
  left: false,
  right: false
};

const game = {
  config: null,
  difficulty: "normal",
  stageId: "",
  sessionId: "",
  running: false,
  pausedForBug: false,
  bestDistance: 0,
  startAt: 0,
  lastAt: 0,
  distance: 0,
  mistakes: 0,
  bugFound: 0,
  shakeMs: 0,
  player: {
    x: 58,
    y: 500,
    w: 34,
    h: 38,
    moveSpeed: 250,
    vy: 0,
    grounded: true
  },
  obstacles: [],
  obstacleCooldown: 0,
  obstacleCount: 0,
  obstacleCleared: 0,
  clearStreak: 0,
  bestStreak: 0,
  timingHits: 0,
  timingTotal: 0,
  moveRightBugDone: false,
  moveLeftBugDone: false,
  jumpBugDone: false,
  shrinkBugDone: false,
  moveRightFixSolved: false,
  moveLeftFixSolved: false,
  jumpFixSolved: false,
  shrinkFixSolved: false,
  doubleJumpSkillDone: false,
  stompSkillDone: false,
  doubleJumpUnlocked: false,
  stompUnlocked: false,
  doubleJumpUsed: false,
  jumpTriggerSpawned: false,
  bigEnemySpawned: false,
  bigEnemyRef: null,
  runGraceMs: 0,
  coyoteMs: 0,
  jumpBufferMs: 0,
  pendingResetMs: 0,
  easyShieldUsed: false,
  easyKeepProgressUsed: false,
  lastBadgeDistance: 0,
  toastText: "",
  toastMs: 0,
  hitFlashMs: 0,
  hitTextMs: 0,
  hitTitleText: "",
  hitSubText: "",
  puzzleGuideShown: false,
  activePuzzle: null,
  rafId: 0,
  overlayTimerId: 0,
  cameraPanX: 0,
  previewElapsedMs: 0,
  previewActive: false,
  previewPhase: "none"
};

const isEasyMode = () => game.difficulty === "easy";
const wordProgram = () => (isEasyMode() ? "ぷろぐらむ" : "プログラム");
const wordProgramming = () => (isEasyMode() ? "ぷろぐらみんぐ" : "プログラミング");

const audioState = {
  ctx: null,
  masterGain: null,
  sfxGain: null,
  bgmGain: null,
  enabled: true,
  bgmTimerId: 0,
  bgmStep: 0
};

function getStageId(config) {
  const url = new URL(window.location.href);
  return url.searchParams.get("stage_id") || config.stage.default_stage_id;
}

function randInt(max) {
  return Math.floor(Math.random() * max);
}

function newSessionId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }
  return `sid_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
}

function getAudioContext() {
  if (audioState.ctx) {
    return audioState.ctx;
  }
  const AudioCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtor) {
    return null;
  }
  const ctx = new AudioCtor();
  const masterGain = ctx.createGain();
  masterGain.gain.value = 0.46;
  const sfxGain = ctx.createGain();
  sfxGain.gain.value = 1.0;
  const bgmGain = ctx.createGain();
  bgmGain.gain.value = 1.15;
  sfxGain.connect(masterGain);
  bgmGain.connect(masterGain);
  masterGain.connect(ctx.destination);

  audioState.ctx = ctx;
  audioState.masterGain = masterGain;
  audioState.sfxGain = sfxGain;
  audioState.bgmGain = bgmGain;
  return ctx;
}

function withAudioReady(onReady) {
  const ctx = getAudioContext();
  if (!ctx) {
    return;
  }
  if (ctx.state === "running") {
    onReady(ctx);
    return;
  }
  ctx
    .resume()
    .then(() => {
      if (ctx.state === "running") {
        onReady(ctx);
      }
    })
    .catch(() => {});
}

function unlockAudio() {
  withAudioReady(() => {});
}

function updateAudioToggleButton() {
  if (!ui.audioToggleBtn) {
    return;
  }
  ui.audioToggleBtn.textContent = audioState.enabled ? "SOUND ON" : "SOUND OFF";
  ui.audioToggleBtn.classList.toggle("off", !audioState.enabled);
  ui.audioToggleBtn.setAttribute("aria-pressed", String(audioState.enabled));
}

function playTone({ freq, duration = 0.12, volume = 0.08, type = "square", channel = "sfx", offset = 0 }) {
  if (!audioState.enabled) {
    return;
  }
  withAudioReady((ctx) => {
    const destination = channel === "bgm" ? audioState.bgmGain : audioState.sfxGain;
    const startAt = ctx.currentTime + Math.max(0, offset);
    const endAt = startAt + duration;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, startAt);
    gain.gain.setValueAtTime(0.0001, startAt);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, volume), startAt + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, endAt);
    osc.connect(gain);
    gain.connect(destination);
    osc.start(startAt);
    osc.stop(endAt + 0.03);
  });
}

function playSfx(name) {
  switch (name) {
    case "jump":
      playTone({ freq: 620, duration: 0.05, volume: 0.055, type: "square" });
      playTone({ freq: 860, duration: 0.05, volume: 0.04, type: "triangle", offset: 0.03 });
      break;
    case "miss":
      playTone({ freq: 260, duration: 0.12, volume: 0.09, type: "sawtooth" });
      playTone({ freq: 180, duration: 0.12, volume: 0.07, type: "sawtooth", offset: 0.08 });
      break;
    case "puzzle_ok":
      playTone({ freq: 440, duration: 0.07, volume: 0.06, type: "triangle" });
      playTone({ freq: 554, duration: 0.08, volume: 0.06, type: "triangle", offset: 0.07 });
      playTone({ freq: 659, duration: 0.09, volume: 0.065, type: "triangle", offset: 0.14 });
      break;
    case "puzzle_ng":
      playTone({ freq: 300, duration: 0.08, volume: 0.055, type: "square" });
      playTone({ freq: 240, duration: 0.1, volume: 0.06, type: "square", offset: 0.07 });
      break;
    case "alert":
      playTone({ freq: 520, duration: 0.08, volume: 0.07, type: "square" });
      playTone({ freq: 420, duration: 0.08, volume: 0.065, type: "square", offset: 0.06 });
      playTone({ freq: 360, duration: 0.1, volume: 0.06, type: "square", offset: 0.12 });
      break;
    case "stomp":
      playTone({ freq: 190, duration: 0.08, volume: 0.08, type: "square" });
      playTone({ freq: 140, duration: 0.1, volume: 0.07, type: "square", offset: 0.06 });
      break;
    case "start":
      playTone({ freq: 392, duration: 0.07, volume: 0.055, type: "triangle" });
      playTone({ freq: 523, duration: 0.09, volume: 0.06, type: "triangle", offset: 0.07 });
      break;
    case "cta":
      playTone({ freq: 660, duration: 0.09, volume: 0.055, type: "triangle" });
      playTone({ freq: 784, duration: 0.09, volume: 0.05, type: "triangle", offset: 0.06 });
      break;
    default:
      break;
  }
}

function stopBgm() {
  if (audioState.bgmTimerId) {
    clearInterval(audioState.bgmTimerId);
    audioState.bgmTimerId = 0;
  }
}

function startBgm() {
  if (!audioState.enabled || audioState.bgmTimerId || !game.running) {
    return;
  }
  unlockAudio();
  const melody = [392, null, 440, null, 392, 330, null, 294];
  const bass = [196, null, 196, null, 175, null, 165, null];
  const tick = () => {
    if (!audioState.enabled || !game.running) {
      return;
    }
    const idx = audioState.bgmStep % melody.length;
    const m = melody[idx];
    const b = bass[idx];
    if (m) {
      playTone({ freq: m, duration: 0.16, volume: 0.05, type: "triangle", channel: "bgm" });
    }
    if (b) {
      playTone({ freq: b, duration: 0.2, volume: 0.04, type: "sine", channel: "bgm", offset: 0.02 });
    }
    audioState.bgmStep += 1;
  };
  audioState.bgmStep = 0;
  tick();
  audioState.bgmTimerId = window.setInterval(() => {
    if (!game.running || !audioState.enabled) {
      stopBgm();
      return;
    }
    tick();
  }, 330);
}

function setAudioEnabled(enabled) {
  audioState.enabled = !!enabled;
  if (!audioState.enabled) {
    stopBgm();
  } else if (game.running) {
    startBgm();
  }
  updateAudioToggleButton();
}

function normalizeCtaUrl(value) {
  if (!value || typeof value !== "string") {
    return "";
  }
  const trimmed = value.trim();
  if (!trimmed) {
    return "";
  }
  const isRelative =
    trimmed.startsWith("/") || trimmed.startsWith("./") || trimmed.startsWith("../");
  const hasScheme = /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(trimmed);
  try {
    if (isRelative) {
      return new URL(trimmed, window.location.href).toString();
    }
    return new URL(hasScheme ? trimmed : `https://${trimmed}`).toString();
  } catch (_error) {
    return "";
  }
}

function goToReservePage(trigger) {
  const fallbackUrl = normalizeCtaUrl(game.config?.app?.cta_url || FALLBACK_CONFIG.app.cta_url);
  const reserveUrl =
    ui.ctaBtn.dataset.url ||
    fallbackUrl ||
    new URL("./reserve.html", window.location.href).toString();

  track("form_visit", {
    cta_url: reserveUrl,
    proxy: true,
    trigger
  });
  window.location.href = reserveUrl;
}

function closeReservePrompt() {
  if (!ui.reservePromptModal) {
    return;
  }
  ui.reservePromptModal.classList.add("hidden");
}

function getMissMessageByDistance(distance) {
  const band = Math.max(0, Math.min(10000, Math.floor(distance / 500) * 500));
  const index = Math.floor(band / 500);
  return MISS_MESSAGES_500[index] || MISS_MESSAGES_500[MISS_MESSAGES_500.length - 1];
}

function openReservePrompt() {
  if (!ui.reservePromptModal) {
    goToReservePage("reserve_prompt_fallback");
    return;
  }
  stopBgm();
  if (ui.reservePromptLead) {
    const missMessage = getMissMessageByDistance(game.bestDistance);
    ui.reservePromptLead.textContent = `バグなおしもクリアして${Math.round(
      game.bestDistance
    )}m突破なんて、きみは天才だ！！ ${missMessage} 次はほんものの${wordProgramming()}体験にチャレンジしてみよう。`;
  }
  ui.reservePromptModal.classList.remove("hidden");
  track("reserve_prompt_shown", {
    best_distance: Math.round(game.bestDistance),
    mistake_count: game.mistakes
  });
}

function switchScreen(name) {
  Object.entries(ui.screens).forEach(([key, node]) => {
    node.classList.toggle("active", key === name);
  });
}

function track(event, params = {}) {
  const payload = {
    event,
    params: {
      stage_id: game.stageId,
      difficulty: game.difficulty,
      session_id: game.sessionId,
      device_hint: navigator.userAgent.slice(0, 40),
      lang: game.config?.app?.language || "ja",
      ts: Date.now(),
      ...params
    }
  };
  if (typeof window.gtag === "function") {
    window.gtag("event", event, payload.params);
  }
  console.log("[analytics]", payload);
}

function buildDifficultyButtons(config) {
  ui.difficultyList.innerHTML = "";
  DIFFICULTY_ORDER.forEach((key) => {
    const item = config.difficulty[key];
    if (!item) {
      return;
    }
    const button = document.createElement("button");
    button.type = "button";
    button.className = "difficulty-btn";
    button.textContent = item.label;
    // 難易度キーをUI属性に保持して見た目制御とアクセシビリティに使う。
    button.dataset.difficulty = key;
    button.setAttribute("aria-label", item.label);
    button.title = item.label;
    if (game.difficulty === key) {
      button.classList.add("active");
    }
    button.addEventListener("click", () => {
      game.difficulty = key;
      document
        .querySelectorAll(".difficulty-btn")
        .forEach((node) => node.classList.remove("active"));
      button.classList.add("active");
    });
    ui.difficultyList.appendChild(button);
  });
}

function resetGameplayStats() {
  game.running = false;
  game.pausedForBug = false;
  stopBgm();
  closeReservePrompt();
  if (ui.alertOverlay) {
    ui.alertOverlay.classList.add("hidden");
  }
  if (game.overlayTimerId) {
    clearTimeout(game.overlayTimerId);
    game.overlayTimerId = 0;
  }
  game.cameraPanX = 0;
  game.previewElapsedMs = 0;
  game.previewActive = false;
  game.bestDistance = 0;
  game.lastBadgeDistance = 0;
  game.easyShieldUsed = false;
  game.easyKeepProgressUsed = false;
  game.toastText = "";
  game.toastMs = 0;
  game.startAt = 0;
  game.lastAt = 0;
  game.mistakes = 0;
  game.bestStreak = 0;
  game.hitFlashMs = 0;
  game.hitTextMs = 0;
  game.hitTitleText = "";
  game.hitSubText = "";
  game.puzzleGuideShown = false;
  resetRunState({ resetBugs: true });
}

function resetBugProgress() {
  game.bugFound = 0;
  game.moveRightBugDone = false;
  game.moveLeftBugDone = false;
  game.jumpBugDone = false;
  game.shrinkBugDone = false;
  game.moveRightFixSolved = false;
  game.moveLeftFixSolved = false;
  game.jumpFixSolved = false;
  game.shrinkFixSolved = false;
  game.doubleJumpSkillDone = false;
  game.stompSkillDone = false;
  game.doubleJumpUnlocked = false;
  game.stompUnlocked = false;
  game.doubleJumpUsed = false;
}

function resetRunState({ resetBugs = false } = {}) {
  inputState.left = false;
  inputState.right = false;
  game.distance = 0;
  game.shakeMs = 0;
  game.runGraceMs = 900;
  game.coyoteMs = 0;
  game.jumpBufferMs = 0;
  game.doubleJumpUsed = false;
  game.pendingResetMs = 0;
  game.player.x = 58;
  game.player.y = 500;
  game.player.vy = 0;
  game.player.grounded = true;
  game.obstacles = [];
  game.obstacleCooldown = 1700;
  game.obstacleCount = 0;
  game.obstacleCleared = 0;
  game.clearStreak = 0;
  game.timingHits = 0;
  game.timingTotal = 0;
  if (resetBugs) {
    resetBugProgress();
  }
  game.bigEnemySpawned = false;
  game.bigEnemyRef = null;
  game.jumpTriggerSpawned = false;
  game.cameraPanX = 0;
  game.previewElapsedMs = 0;
  game.previewActive = false;
  game.previewPhase = "none";
  closeBugModal();
}

function setToast(text, durationMs = 1100) {
  game.toastText = text;
  game.toastMs = durationMs;
}

function showLockedToast(text) {
  if (game.toastMs > 0) {
    return;
  }
  setToast(text, 1200);
}

function showAlertOverlay(text, variant = "alert", options = {}) {
  if (!ui.alertOverlay || !ui.alertOverlayText) {
    return;
  }
  const durationMs = options.durationMs ?? 0;
  const onDismiss = typeof options.onDismiss === "function" ? options.onDismiss : null;
  if (game.overlayTimerId) {
    clearTimeout(game.overlayTimerId);
    game.overlayTimerId = 0;
  }
  if (game.overlayDismissHandler) {
    ui.alertOverlay.removeEventListener("pointerdown", game.overlayDismissHandler);
    game.overlayDismissHandler = null;
  }
  const isAlert = variant === "alert";
  ui.alertOverlayText.textContent = text;
  ui.alertOverlay.classList.remove("hidden");
  ui.alertOverlay.classList.toggle("alert", isAlert);
  ui.alertOverlay.classList.toggle("mission", variant === "mission");
  ui.alertOverlay.classList.toggle("urgent", isAlert);
  if (isAlert) {
    playSfx("alert");
  }

  const dismiss = () => {
    ui.alertOverlay.classList.add("hidden");
    ui.alertOverlay.classList.remove("alert");
    ui.alertOverlay.classList.remove("mission");
    ui.alertOverlay.classList.remove("urgent");
    if (game.overlayTimerId) {
      clearTimeout(game.overlayTimerId);
      game.overlayTimerId = 0;
    }
    if (game.overlayDismissHandler) {
      ui.alertOverlay.removeEventListener("pointerdown", game.overlayDismissHandler);
      game.overlayDismissHandler = null;
    }
    if (onDismiss) {
      onDismiss();
    }
  };

  game.overlayDismissHandler = () => {
    dismiss();
  };
  ui.alertOverlay.addEventListener("pointerdown", game.overlayDismissHandler, { once: true });

  if (durationMs > 0) {
    game.overlayTimerId = window.setTimeout(() => {
      dismiss();
    }, durationMs);
  }
}

function easeOutQuad(value) {
  return 1 - (1 - value) * (1 - value);
}

function getPost1000Distance() {
  return Math.max(0, game.distance - SKILL_DOUBLE_JUMP_DISTANCE);
}

function getSpeedScale() {
  if (game.distance < SKILL_DOUBLE_JUMP_DISTANCE) {
    return 1;
  }
  const extra = Math.min(0.45, (getPost1000Distance() / 2000) * 0.45);
  return 1 + extra;
}

function getSpawnChanceBoost() {
  if (game.distance < SKILL_DOUBLE_JUMP_DISTANCE) {
    return 0;
  }
  return Math.min(0.25, (getPost1000Distance() / 2000) * 0.25);
}

function getDensityBoost() {
  if (game.distance < SKILL_DOUBLE_JUMP_DISTANCE) {
    return 0;
  }
  return Math.min(320, Math.floor(getPost1000Distance() / 120) * 40);
}

function startBigEnemyPreview() {
  game.previewActive = true;
  game.previewElapsedMs = 0;
  game.previewPhase = "pan";
  setToast("ウィーン...", 900);
}

function handleMissReset() {
  if (game.difficulty === "easy" && !game.easyShieldUsed) {
    game.easyShieldUsed = true;
    game.shakeMs = 120;
    game.player.vy = -260;
    setToast("まもり発動！ 1回だけセーフ");
    track("easy_shield_used", {
      distance: Math.round(game.distance),
      best_distance: Math.round(game.bestDistance)
    });
    return;
  }
  game.bestDistance = Math.max(game.bestDistance, game.distance);
  const streakBeforeMiss = game.clearStreak;
  const missMessage = getMissMessageByDistance(game.bestDistance);
  game.mistakes += 1;
  game.clearStreak = 0;
  game.hitFlashMs = 220;
  game.hitTextMs = 1050;
  game.hitTitleText = "ミス！";
  game.hitSubText = missMessage;
  playSfx("miss");

  if (game.bestDistance >= RESERVE_DISTANCE_GATE_M) {
    game.running = false;
    game.pausedForBug = false;
    closeBugModal();
    closeReservePrompt();
    cancelAnimationFrame(game.rafId);
    track("death_over_distance_gate", {
      distance: Math.round(game.distance),
      best_distance: Math.round(game.bestDistance),
      mistake_count: game.mistakes,
      streak: streakBeforeMiss,
      distance_gate: RESERVE_DISTANCE_GATE_M
    });
    openReservePrompt();
    return;
  }

  const hasFixProgress =
    game.moveRightFixSolved || game.moveLeftFixSolved || game.jumpFixSolved || game.shrinkFixSolved;
  if (game.difficulty === "easy" && !game.easyKeepProgressUsed && hasFixProgress) {
    game.easyKeepProgressUsed = true;
    game.shakeMs = 140;
    resetRunState({ resetBugs: false });
    setToast("やさしくリスタート！ なおしたバグはそのまま", 1400);
    track("easy_keep_progress_restart", {
      distance: Math.round(game.distance),
      best_distance: Math.round(game.bestDistance),
      mistake_count: game.mistakes
    });
    return;
  }

  game.shakeMs = 180;
  track("run_reset_on_miss", {
    distance: Math.round(game.distance),
    best_distance: Math.round(game.bestDistance),
    mistake_count: game.mistakes,
    streak: streakBeforeMiss
  });
  resetRunState({ resetBugs: true });
  beginMoveRightBugEvent();
}

function updateHud() {
  ui.hudTime.textContent = String(Math.round(game.bestDistance));
  ui.hudMiss.textContent = String(game.mistakes);
  ui.hudBug.textContent = `${game.bugFound}/${TOTAL_BUGS}`;
  ui.hudDistance.textContent = String(Math.round(game.distance));
  updateBugStatus();
  updateControlState();
}

function updateBugStatus() {
  if (!ui.bugStatus) {
    return;
  }
  let text = "バグなし：正常運転";
  let alert = false;
  if (game.pausedForBug && game.activePuzzle) {
    const isSkill = game.activePuzzle.definition.category === "skill";
    text = `${isSkill ? "スキル解放" : "バグ発生"}：${game.activePuzzle.definition.status}`;
    alert = true;
  } else if (game.moveRightBugDone && !game.moveRightFixSolved) {
    text = "バグ発生：右にすすめない";
    alert = true;
  } else if (game.moveLeftBugDone && !game.moveLeftFixSolved) {
    text = "バグ発生：左にすすめない";
    alert = true;
  } else if (game.jumpBugDone && !game.jumpFixSolved) {
    text = "バグ発生：ジャンプできない";
    alert = true;
  } else if (game.shrinkBugDone && !game.shrinkFixSolved) {
    text = "バグ発生：巨大な敵が大きすぎる";
    alert = true;
  }
  ui.bugStatus.textContent = text;
  ui.bugStatus.classList.toggle("alert", alert);
}

function updateControlState() {
  if (ui.moveLeftBtn) {
    const locked = !game.moveLeftFixSolved;
    ui.moveLeftBtn.classList.toggle("locked", locked);
    ui.moveLeftBtn.setAttribute("aria-disabled", String(locked));
  }
  if (ui.moveRightBtn) {
    const locked = !game.moveRightFixSolved;
    ui.moveRightBtn.classList.toggle("locked", locked);
    ui.moveRightBtn.setAttribute("aria-disabled", String(locked));
  }
  if (ui.gameHelp) {
    const moveText =
      game.moveRightFixSolved && game.moveLeftFixSolved
        ? "画面 左=移動 / 右=移動"
        : "左右はバグ修正で解放";
    let jumpText = game.jumpFixSolved ? "真ん中=ジャンプ" : "ジャンプはバグ修正で解放";
    if (game.jumpFixSolved && game.doubleJumpUnlocked) {
      jumpText = "真ん中=ジャンプ(空中でもう1回OK)";
    }
    const stompText = game.stompUnlocked ? "上からふむ=敵をたおせる" : "";
    ui.gameHelp.textContent = [moveText, jumpText, stompText].filter(Boolean).join(" / ");
  }
}

function tryConsumeJump() {
  if (game.jumpBufferMs <= 0) {
    return;
  }
  const canAirJump = game.doubleJumpUnlocked && !game.doubleJumpUsed;
  if (!game.player.grounded && game.coyoteMs <= 0 && !canAirJump) {
    return;
  }
  const usedAirJump = !game.player.grounded && game.coyoteMs <= 0;
  game.player.vy = -760;
  game.player.grounded = false;
  game.coyoteMs = 0;
  game.jumpBufferMs = 0;
  if (usedAirJump) {
    game.doubleJumpUsed = true;
  }
  playSfx("jump");
}

function playerJump() {
  if (!game.running || game.pausedForBug) {
    return;
  }
  if (!game.jumpFixSolved) {
    showLockedToast(`ジャンプバグ中！${wordProgram()}で直そう。`);
    return;
  }
  game.jumpBufferMs = 140;
  tryConsumeJump();
}

function getMoveDir() {
  const right = inputState.right && game.moveRightFixSolved ? 1 : 0;
  const left = inputState.left && game.moveLeftFixSolved ? 1 : 0;
  return right - left;
}

function spawnObstacle(difficulty) {
  const maxHeight = Math.min(44, 24 + difficulty.gimmick_level * 6 + difficulty.bug_frequency * 4);
  const height = 16 + randInt(Math.max(6, maxHeight - 15));
  const width = 16 + randInt(14 + difficulty.gimmick_level * 4);
  const speed = 125 * difficulty.speed + randInt(14);
  game.obstacles.push({
    kind: "normal",
    x: canvas.width + 30,
    y: 538 - height,
    w: width,
    h: height,
    speed,
    contactMs: 0,
    measured: false
  });
}

function spawnCloudPlatform(difficulty) {
  const width = 64 + randInt(40 + difficulty.gimmick_level * 12);
  const top = 330 + randInt(95);
  game.obstacles.push({
    kind: "cloud_platform",
    x: canvas.width + 36,
    y: top,
    w: width,
    h: 18,
    speed: 110 * difficulty.speed + randInt(10),
    contactMs: 0,
    measured: false
  });
}

function applyEnemySize(obstacle, size) {
  obstacle.w = size.w;
  obstacle.h = size.h;
  obstacle.y = 540 - obstacle.h;
}

function spawnBigEnemy(difficulty) {
  const obstacle = {
    kind: "big_enemy",
    x: canvas.width + 120,
    y: 540 - BIG_ENEMY_SIZE.h,
    w: BIG_ENEMY_SIZE.w,
    h: BIG_ENEMY_SIZE.h,
    speed: 130 * difficulty.speed,
    contactMs: 0,
    measured: false
  };
  if (game.shrinkFixSolved) {
    applyEnemySize(obstacle, SMALL_ENEMY_SIZE);
  }
  game.obstacles.push(obstacle);
  game.obstacleCooldown = 1400;
  game.bigEnemySpawned = true;
  game.bigEnemyRef = obstacle;
  startBigEnemyPreview();
}

function spawnPit(difficulty) {
  const maxWidth = 40 + difficulty.gimmick_level * 8;
  const width = 28 + randInt(Math.max(6, maxWidth - 27));
  const speed = 120 * difficulty.speed + randInt(10);
  game.obstacles.push({
    kind: "pit",
    x: canvas.width + 45,
    y: 540,
    w: width,
    h: 100,
    speed,
    contactMs: 0,
    measured: false
  });
}

function spawnJumpTriggerObstacle(difficulty) {
  const height = 18 + randInt(8);
  const width = 22 + randInt(10);
  const speed = 120 * difficulty.speed;
  game.obstacles.push({
    kind: "normal",
    x: canvas.width + 80,
    y: 538 - height,
    w: width,
    h: height,
    speed,
    contactMs: 0,
    measured: false,
    jumpTrigger: true
  });
}


function shrinkBigEnemy() {
  if (!game.bigEnemyRef) {
    return;
  }
  applyEnemySize(game.bigEnemyRef, SMALL_ENEMY_SIZE);
}

function hasUpcomingHazard() {
  return game.obstacles.some((obstacle) => {
    return obstacle.x > canvas.width * 0.56;
  });
}

function spawnRunHazard(difficulty) {
  if (!game.jumpFixSolved) {
    spawnObstacle(difficulty);
    return;
  }
  const canSpawnCloud = game.distance >= 55;
  const cloudChance = 14 + difficulty.gimmick_level * 5;
  if (canSpawnCloud && randInt(100) < cloudChance) {
    spawnCloudPlatform(difficulty);
    return;
  }
  const canSpawnPit = difficulty.gimmick_level > 0 && game.distance >= 90;
  const pitChance = 7 + difficulty.gimmick_level * 6;
  if (canSpawnPit && randInt(100) < pitChance) {
    spawnPit(difficulty);
    return;
  }
  spawnObstacle(difficulty);
}

function maybeAwardDistanceBadge() {
  const milestone = Math.floor(game.bestDistance / 50) * 50;
  if (milestone < 50) {
    return;
  }
  if (game.lastBadgeDistance === milestone) {
    return;
  }
  game.lastBadgeDistance = milestone;
  setToast(`${milestone}m とっぱ！`);
}

function checkSkillMilestones() {
  if (!game.doubleJumpSkillDone && game.distance >= SKILL_DOUBLE_JUMP_DISTANCE) {
    beginDoubleJumpSkillEvent();
    return true;
  }
  if (!game.stompSkillDone && game.distance >= SKILL_STOMP_DISTANCE) {
    beginStompSkillEvent();
    return true;
  }
  return false;
}

function overlaps(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function getPlayerHitbox(playerRect) {
  return {
    x: playerRect.x,
    y: playerRect.y,
    w: playerRect.w,
    h: playerRect.h
  };
}

function getObstacleHitbox(obstacle) {
  return {
    x: obstacle.x,
    y: obstacle.y,
    w: obstacle.w,
    h: obstacle.h
  };
}

function startPitFallReset() {
  if (game.pendingResetMs > 0) {
    return;
  }
  game.pendingResetMs = 280;
  game.player.grounded = false;
  game.player.vy = 240;
  game.jumpBufferMs = 0;
}

function closeBugModal() {
  ui.bugModal.classList.add("hidden");
  game.activePuzzle = null;
}

// ブロックIDをUI表示用のアイコン種別へ変換する。
function getBlockIconKind(blockId) {
  switch (blockId) {
    case "move_right":
      return "arrow-right";
    case "move_left":
      return "arrow-left";
    case "move_right_off":
    case "move_left_off":
    case "jump_off":
    case "double_jump_off":
    case "stomp_off":
    case "tap_ignore":
      return "ban";
    case "jump_on":
      return "jump";
    case "if_tap_right":
      return "tap-right";
    case "if_tap_left":
      return "tap-left";
    case "if_tap_center":
      return "tap-center";
    case "if_tap_side":
      return "tap-side";
    case "size_small":
    case "hitbox_small":
      return "shrink";
    case "size_big":
    case "hitbox_big":
      return "expand";
    case "double_jump_on":
      return "double-jump";
    case "jump_one":
      return "single-jump";
    case "if_second_jump":
    case "if_first_jump":
      return "condition";
    case "stomp_on":
      return "stomp";
    case "if_stomp":
      return "stomp-condition";
    case "touch_damage":
    case "if_touch":
      return "touch";
    default:
      return "dot";
  }
}

function renderPuzzleSlots() {
  const active = game.activePuzzle;
  if (!active) {
    return;
  }
  ui.bugSlots.innerHTML = "";
  const slotCount = active.definition.slots.length;
  active.definition.slots.forEach((_, index) => {
    const button = document.createElement("button");
    button.type = "button";
    const hasBlock = !!active.placed[index];
    // 選択中スロットを視覚的に区別する。
    const selected = index === active.selectedSlotIndex;
    button.className = `bug-slot${hasBlock ? " filled" : " empty"}${selected ? " selected" : ""}`;
    const block = active.blocksById[active.placed[index]];
    const slotTitle = slotCount > 1 ? `スロット${index + 1}` : "スロット";
    const valueText = block ? block.label : "ここにいれる";
    // スロット内容はテキストではなくアイコン属性で描画する。
    const iconKind = block ? getBlockIconKind(block.id) : "empty";
    button.setAttribute("aria-label", `${slotTitle}${selected ? " (選択中)" : ""}: ${valueText}`);
    button.innerHTML = `
      <span class="bug-slot-title">${slotTitle}</span>
      <span class="bug-slot-value${block ? "" : " hint"}" data-icon="${iconKind}" aria-hidden="true"></span>
    `;
    button.addEventListener("click", () => {
      active.selectedSlotIndex = index;
      renderPuzzleSlots();
    });
    ui.bugSlots.appendChild(button);
  });
  syncPuzzleOptionSelection();
}

// 選択中スロットの現在値と一致する候補ボタンを強調する。
function syncPuzzleOptionSelection() {
  const active = game.activePuzzle;
  if (!active) {
    return;
  }
  const selectedIndex = active.selectedSlotIndex;
  const selectedBlockId =
    typeof selectedIndex === "number" && selectedIndex >= 0 ? active.placed[selectedIndex] : null;
  ui.bugBlocks.querySelectorAll(".bug-block").forEach((button) => {
    const isCurrent = !!selectedBlockId && button.dataset.blockId === selectedBlockId;
    button.classList.toggle("is-current", isCurrent);
  });
}

function placeBlock(blockId) {
  const active = game.activePuzzle;
  if (!active) {
    return;
  }
  // 候補タップ時は選択中スロットへ反映し、未選択時は空きへ補完する。
  let targetIndex = active.selectedSlotIndex;
  if (typeof targetIndex !== "number" || targetIndex < 0 || targetIndex >= active.placed.length) {
    targetIndex = active.placed.findIndex((value) => !value);
    if (targetIndex === -1) {
      targetIndex = 0;
    }
  }
  active.placed[targetIndex] = blockId;
  const nextEmptyIndex = active.placed.findIndex((value) => !value);
  if (nextEmptyIndex !== -1) {
    active.selectedSlotIndex = nextEmptyIndex;
  } else {
    active.selectedSlotIndex = targetIndex;
  }
  ui.bugFeedback.textContent = "";
  renderPuzzleSlots();
}

function runPuzzleCheck() {
  const active = game.activePuzzle;
  if (!active) {
    return;
  }
  if (active.placed.some((value) => !value)) {
    ui.bugFeedback.style.color = "var(--danger)";
    ui.bugFeedback.textContent = "まだ1つ空いてるよ。";
    return;
  }
  const isCorrect = active.definition.answer.every((value, index) => value === active.placed[index]);
  if (!isCorrect) {
    active.wrongAttempts += 1;
    game.mistakes += 1;
    updateHud();
    ui.bugFeedback.style.color = "var(--danger)";
    ui.bugFeedback.textContent = `おしい！ ${puzzleHintText(active)}`;
    playSfx("puzzle_ng");
    return;
  }

  ui.bugFeedback.style.color = "var(--ok)";
  ui.bugFeedback.textContent = "ナイス！なおせた！";
  playSfx("puzzle_ok");
  if (ui.bugCard) {
    ui.bugCard.classList.remove("puzzle-success");
    void ui.bugCard.offsetWidth;
    ui.bugCard.classList.add("puzzle-success");
    window.setTimeout(() => {
      ui.bugCard.classList.remove("puzzle-success");
    }, 650);
  }
  const timeSpentMs = Math.round(performance.now() - active.startedAtMs);
  setTimeout(() => {
    closeBugModal();
    active.onSuccess({
      wrongAttempts: active.wrongAttempts,
      timeSpentMs
    });
  }, 320);
}

function openPuzzle(puzzleKey, onSuccess) {
  const definition = getPuzzleDefinition(puzzleKey);
  if (!definition) {
    return;
  }
  const blocksById = {};
  definition.blocks.forEach((block) => {
    blocksById[block.id] = block;
  });

  game.activePuzzle = {
    puzzleKey,
    definition,
    blocksById,
    placed: new Array(definition.slots.length).fill(null),
    // パズル開始時に先頭スロットを選択状態にする。
    selectedSlotIndex: 0,
    startedAtMs: performance.now(),
    wrongAttempts: 0,
    onSuccess
  };

  ui.bugTitle.textContent = definition.title;
  ui.bugDesc.textContent = definition.desc;
  ui.bugScene.textContent = definition.scene;
  ui.bugCode.textContent =
    typeof definition.buildCode === "function" ? definition.buildCode(game) : definition.buildCode;
  if (!game.puzzleGuideShown) {
    ui.bugFeedback.textContent = "したをタップして、うえに入れよう。";
    game.puzzleGuideShown = true;
  } else {
    ui.bugFeedback.textContent = "したをタップして、うえに入れよう。";
  }
  ui.bugFeedback.style.color = "var(--ink)";

  renderPuzzleSlots();
  ui.bugBlocks.innerHTML = "";
  const blockOrder = shuffleArray(definition.blocks);
  blockOrder.forEach((block) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `bug-block${block.bad ? " bad" : ""}`;
    // 候補ごとに識別IDを持たせて現在値ハイライト同期に使う。
    button.dataset.blockId = block.id;
    button.dataset.icon = getBlockIconKind(block.id);
    button.setAttribute("aria-label", block.label);
    button.title = block.label;
    button.textContent = block.label;
    button.addEventListener("click", () => placeBlock(block.id));
    ui.bugBlocks.appendChild(button);
  });
  syncPuzzleOptionSelection();

  ui.bugModal.classList.remove("hidden");
}

function beginMoveRightBugEvent() {
  if (game.moveRightBugDone) {
    return;
  }
  game.pausedForBug = true;
  game.moveRightBugDone = true;
  inputState.left = false;
  inputState.right = false;
  showAlertOverlay("バグ発生!!!\n右にすすめない\nタップでなおすへ", "alert", {
    onDismiss: () => {
      openPuzzle("move_right", ({ wrongAttempts, timeSpentMs }) => {
        game.bugFound += 1;
        game.moveRightFixSolved = true;
        game.pausedForBug = false;
        updateControlState();

        track("bug_move_right_complete", {
          is_correct: true,
          wrong_attempts: wrongAttempts,
          time_spent_ms: timeSpentMs
        });
      });
    }
  });
  track("bug_move_right_start");
}

function beginMoveLeftBugEvent({ skipAlert = false } = {}) {
  if (game.moveLeftBugDone) {
    return;
  }
  if (!game.moveRightFixSolved) {
    return;
  }
  game.pausedForBug = true;
  game.moveLeftBugDone = true;
  inputState.left = false;
  inputState.right = false;
  const open = () => {
    openPuzzle("move_left", ({ wrongAttempts, timeSpentMs }) => {
      game.bugFound += 1;
      game.moveLeftFixSolved = true;
      game.player.x = Math.max(10, game.player.x - 30);
      game.pausedForBug = false;
      updateControlState();

      track("bug_move_left_complete", {
        is_correct: true,
        wrong_attempts: wrongAttempts,
        time_spent_ms: timeSpentMs
      });
    });
  };
  if (skipAlert) {
    open();
  } else {
    showAlertOverlay("バグ発生!!!\n左にすすめない\nタップでなおすへ", "alert", {
      onDismiss: () => {
        open();
      }
    });
  }
  track("bug_move_left_start");
}

function beginJumpBugEvent() {
  if (game.jumpBugDone) {
    return;
  }
  game.pausedForBug = true;
  game.jumpBugDone = true;
  inputState.left = false;
  inputState.right = false;
  showAlertOverlay("バグ発生!!!\nジャンプができない\nタップでなおすへ", "alert", {
    onDismiss: () => {
      openPuzzle("jump", ({ wrongAttempts, timeSpentMs }) => {
        game.bugFound += 1;
        game.jumpFixSolved = true;
        game.pausedForBug = false;
        updateControlState();

        track("bug_jump_complete", {
          is_correct: true,
          wrong_attempts: wrongAttempts,
          time_spent_ms: timeSpentMs
        });
      });
    }
  });
  track("bug_jump_start");
}

function beginShrinkBugEvent() {
  if (game.shrinkBugDone) {
    return;
  }
  game.pausedForBug = true;
  game.shrinkBugDone = true;
  inputState.left = false;
  inputState.right = false;
  showAlertOverlay(`バグ発生!!!\n敵が大きい！\n${wordProgramming()}で直そう\nタップでなおすへ`, "alert", {
    onDismiss: () => {
      openPuzzle("shrink", ({ wrongAttempts, timeSpentMs }) => {
        game.bugFound += 1;
        game.shrinkFixSolved = true;
        shrinkBigEnemy();
        game.pausedForBug = false;
        updateControlState();

        track("bug_shrink_complete", {
          is_correct: true,
          wrong_attempts: wrongAttempts,
          time_spent_ms: timeSpentMs
        });
      });
    }
  });
  track("bug_shrink_start");
}

function beginDoubleJumpSkillEvent() {
  if (game.doubleJumpSkillDone) {
    return;
  }
  game.doubleJumpSkillDone = true;
  game.pausedForBug = true;
  inputState.left = false;
  inputState.right = false;
  showAlertOverlay(
    "1000m とっぱ！\nここからは きみのじつりょく！\nスピードアップ！\nスキル：2だんジャンプ\nタップでプログラミングへ",
    "mission",
    {
      onDismiss: () => {
        openPuzzle("double_jump", ({ wrongAttempts, timeSpentMs }) => {
          game.doubleJumpUnlocked = true;
          game.doubleJumpUsed = false;
          game.pausedForBug = false;
          updateControlState();
          setToast("2だんジャンプ かいほう！", 1200);
          track("skill_double_jump_unlock", {
            wrong_attempts: wrongAttempts,
            time_spent_ms: timeSpentMs
          });
        });
      }
    }
  );
}

function beginStompSkillEvent() {
  if (game.stompSkillDone) {
    return;
  }
  game.stompSkillDone = true;
  game.pausedForBug = true;
  inputState.left = false;
  inputState.right = false;
  showAlertOverlay(
    "2000m とっぱ！\nここからが本番！\nスキル：ふみつけ\nタップでプログラミングへ",
    "mission",
    {
      onDismiss: () => {
        openPuzzle("stomp", ({ wrongAttempts, timeSpentMs }) => {
          game.stompUnlocked = true;
          game.pausedForBug = false;
          updateControlState();
          setToast("ふみつけ かいほう！", 1200);
          track("skill_stomp_unlock", {
            wrong_attempts: wrongAttempts,
            time_spent_ms: timeSpentMs
          });
        });
      }
    }
  );
}

function tick(now) {
  if (!game.running) {
    return;
  }

  const dt = Math.min(0.033, (now - game.lastAt) / 1000);
  game.lastAt = now;

  if (game.pendingResetMs > 0) {
    game.pendingResetMs -= dt * 1000;
    game.player.vy += 1850 * dt;
    game.player.y += game.player.vy * dt;
    draw();
    updateHud();
    if (game.pendingResetMs <= 0) {
      handleMissReset();
    }
    game.rafId = requestAnimationFrame(tick);
    return;
  }

  if (game.previewActive) {
    if (game.previewPhase === "pan") {
      game.previewElapsedMs += dt * 1000;
      const t = Math.min(1, game.previewElapsedMs / BIG_ENEMY_PREVIEW_MS);
      game.cameraPanX = easeOutQuad(t) * BIG_ENEMY_PREVIEW_PAN;
      if (t >= 1) {
        game.previewPhase = "hold";
        game.previewElapsedMs = 0;
        showAlertOverlay("ウィーン...\nでかい！！巨大な敵が見えた！\nタップで戻る", "alert", {
          onDismiss: () => {
            game.previewPhase = "return";
            game.previewElapsedMs = 0;
          }
        });
      }
    } else if (game.previewPhase === "return") {
      game.previewElapsedMs += dt * 1000;
      const t = Math.min(1, game.previewElapsedMs / BIG_ENEMY_RETURN_MS);
      game.cameraPanX = (1 - easeOutQuad(t)) * BIG_ENEMY_PREVIEW_PAN;
      if (t >= 1) {
        game.previewActive = false;
        game.previewPhase = "none";
        game.cameraPanX = 0;
        beginShrinkBugEvent();
      }
    } else {
      game.cameraPanX = BIG_ENEMY_PREVIEW_PAN;
    }
    draw();
    updateHud();
    game.rafId = requestAnimationFrame(tick);
    return;
  }

  if (!game.pausedForBug) {
    const difficulty = game.config.difficulty[game.difficulty];
    const speedScale = getSpeedScale();
    game.distance += dt * 24 * difficulty.speed * speedScale;
    if (game.distance > game.bestDistance) {
      game.bestDistance = game.distance;
    }
    maybeAwardDistanceBadge();
    if (checkSkillMilestones()) {
      draw();
      updateHud();
      game.rafId = requestAnimationFrame(tick);
      return;
    }
    game.toastMs = Math.max(0, game.toastMs - dt * 1000);

    game.jumpBufferMs = Math.max(0, game.jumpBufferMs - dt * 1000);
    game.coyoteMs = Math.max(0, game.coyoteMs - dt * 1000);
    game.runGraceMs = Math.max(0, game.runGraceMs - dt * 1000);
    tryConsumeJump();

    const moveDir = getMoveDir();
    game.player.x += moveDir * game.player.moveSpeed * dt;
    const minX = 10;
    const maxX = canvas.width - game.player.w - 10;
    if (game.player.x < minX) {
      game.player.x = minX;
    } else if (game.player.x > maxX) {
      game.player.x = maxX;
    }

    const wasGrounded = game.player.grounded;
    const previousBottom = game.player.y + game.player.h;
    let landedOnSupport = false;
    game.player.vy += 1700 * dt;
    game.player.y += game.player.vy * dt;
    if (game.player.y > 500) {
      game.player.y = 500;
      game.player.vy = 0;
      landedOnSupport = true;
    }

    if (
      !game.bigEnemySpawned &&
      game.moveRightFixSolved &&
      game.moveLeftFixSolved &&
      game.jumpFixSolved &&
      !game.shrinkFixSolved &&
      game.distance >= BIG_ENEMY_DISTANCE
    ) {
      spawnBigEnemy(difficulty);
    }

    game.obstacleCooldown -= dt * 1000;
    if (game.pausedForBug) {
      draw();
      updateHud();
      game.rafId = requestAnimationFrame(tick);
      return;
    }
    if (
      game.moveLeftFixSolved &&
      !game.jumpBugDone &&
      !game.jumpTriggerSpawned &&
      game.distance >= JUMP_TRIGGER_DISTANCE
    ) {
      spawnJumpTriggerObstacle(difficulty);
      game.jumpTriggerSpawned = true;
    }
    if (
      game.obstacleCooldown <= 0 &&
      !game.pausedForBug &&
      game.runGraceMs <= 0 &&
      game.distance >= HAZARD_START_DISTANCE &&
      game.moveLeftFixSolved &&
      game.jumpFixSolved &&
      !hasUpcomingHazard()
    ) {
      const ramp = Math.min(420, Math.floor(game.distance / 70) * 60);
      const densityBoost = getDensityBoost();
      const base =
        1400 - difficulty.gimmick_level * 160 - difficulty.bug_frequency * 110 - ramp - densityBoost;
      const baseChance = typeof difficulty.spawn_chance === "number" ? difficulty.spawn_chance : 1;
      const spawnChance = Math.min(1, baseChance + getSpawnChanceBoost());
      if (Math.random() <= spawnChance) {
        spawnRunHazard(difficulty);
      }
      const minCooldown = game.distance >= SKILL_DOUBLE_JUMP_DISTANCE ? 520 : 700;
      game.obstacleCooldown = Math.max(minCooldown, base + randInt(260));
    }

    const playerRect = {
      x: game.player.x,
      y: game.player.y,
      w: game.player.w,
      h: game.player.h
    };
    let playerHitbox = getPlayerHitbox(playerRect);

    let triggeredShrinkBug = false;
    let triggeredJumpBug = false;
    let shouldResetRun = false;
    let shouldFallReset = false;
    game.obstacles.forEach((obstacle) => {
      if (triggeredShrinkBug || triggeredJumpBug) {
        return;
      }
      obstacle.x -= obstacle.speed * speedScale * dt;

      if (
        obstacle.kind === "normal" &&
        obstacle.jumpTrigger &&
        game.moveRightFixSolved &&
        game.moveLeftFixSolved &&
        !game.jumpFixSolved &&
        !game.jumpBugDone &&
        obstacle.x < canvas.width - JUMP_BUG_TRIGGER_OFFSET
      ) {
        obstacle.remove = true;
        beginJumpBugEvent();
        triggeredJumpBug = true;
        return;
      }

      // 画面に見えたら巨大な敵のバグ修正を開く
      if (obstacle.kind === "big_enemy" && !game.shrinkFixSolved) {
        if (!game.shrinkBugDone && obstacle.x < canvas.width - 20) {
          beginShrinkBugEvent();
          triggeredShrinkBug = true;
        }
        return;
      }

      if (!landedOnSupport && obstacle.kind === "cloud_platform") {
        // 雲足場は上から落ちてきたときだけ着地できる（横や下からはすり抜け）
        const top = obstacle.y;
        const currentBottom = playerRect.y + playerRect.h;
        const overlapX =
          playerRect.x < obstacle.x + obstacle.w - 6 && playerRect.x + playerRect.w > obstacle.x + 6;
        if (game.player.vy >= 0 && overlapX && previousBottom <= top + 6 && currentBottom >= top) {
          game.player.y = obstacle.y - game.player.h;
          game.player.vy = 0;
          landedOnSupport = true;
          playerRect.y = game.player.y;
          playerHitbox = getPlayerHitbox(playerRect);
        }
      }

      const canStomp =
        game.stompUnlocked &&
        (obstacle.kind === "normal" || (obstacle.kind === "big_enemy" && game.shrinkFixSolved));
      if (canStomp) {
        const top = obstacle.y;
        const currentBottom = playerRect.y + playerRect.h;
        const overlapX =
          playerRect.x < obstacle.x + obstacle.w - 4 && playerRect.x + playerRect.w > obstacle.x + 4;
        if (game.player.vy > 0 && overlapX && previousBottom <= top + 6 && currentBottom >= top) {
          obstacle.remove = true;
          obstacle.measured = true;
          game.obstacleCount += 1;
          game.obstacleCleared += 1;
          game.clearStreak += 1;
          if (game.clearStreak > game.bestStreak) {
            game.bestStreak = game.clearStreak;
          }
          if (game.clearStreak > 0 && game.clearStreak % 5 === 0) {
            setToast(`${game.clearStreak}れんぞく回避！`, 900);
          }
          game.player.y = obstacle.y - game.player.h;
          game.player.vy = -520;
          game.player.grounded = false;
          game.coyoteMs = 0;
          game.jumpBufferMs = 0;
          game.doubleJumpUsed = false;
          playSfx("stomp");
          setToast("ふみつけ！", 800);
          return;
        }
      }

      if (obstacle.kind === "pit") {
        const footX = playerHitbox.x + playerHitbox.w * 0.5;
        const nearGround = game.player.y >= 498;
        if (
          nearGround &&
          footX > obstacle.x + 7 &&
          footX < obstacle.x + obstacle.w - 7 &&
          game.pendingResetMs <= 0
        ) {
          shouldFallReset = true;
        }
        return;
      }

      if (obstacle.kind === "cloud_platform") {
        return;
      }

      if (!obstacle.measured && obstacle.x + obstacle.w < playerHitbox.x) {
        obstacle.measured = true;
        game.obstacleCount += 1;
        game.obstacleCleared += 1;
        game.clearStreak += 1;
        if (game.clearStreak > game.bestStreak) {
          game.bestStreak = game.clearStreak;
        }
        if (game.clearStreak > 0 && game.clearStreak % 5 === 0) {
          setToast(`${game.clearStreak}れんぞく回避！`, 900);
        }
        game.timingTotal += 1;
        if (!game.player.grounded) {
          game.timingHits += 1;
        }
      }
    });

    game.obstacles = game.obstacles.filter((obstacle) => {
      if (obstacle.remove) {
        return false;
      }
      if (obstacle.x + obstacle.w < -15) {
        return false;
      }
      if (obstacle.kind === "pit") {
        return true;
      }
      if (obstacle.kind === "cloud_platform") {
        return true;
      }
      if (obstacle.kind === "big_enemy" && !game.shrinkFixSolved) {
        return true;
      }

      const obstacleHitbox = getObstacleHitbox(obstacle);
      if (overlaps(playerHitbox, obstacleHitbox)) {
        game.obstacleCount += 1;
        game.timingTotal += 1;
        shouldResetRun = true;
        return false;
      }
      obstacle.contactMs = 0;
      return true;
    });

    if (landedOnSupport) {
      game.player.grounded = true;
      game.doubleJumpUsed = false;
      game.coyoteMs = 120;
      tryConsumeJump();
    } else {
      if (wasGrounded) {
        game.coyoteMs = Math.max(game.coyoteMs, 120);
      }
      game.player.grounded = false;
    }

    if (shouldResetRun) {
      handleMissReset();
    }
    if (shouldFallReset && !shouldResetRun) {
      startPitFallReset();
    }

    if (triggeredShrinkBug || triggeredJumpBug) {
      draw();
      updateHud();
      game.rafId = requestAnimationFrame(tick);
      return;
    }
  }

  if (game.shakeMs > 0) {
    game.shakeMs -= dt * 1000;
  }
  if (game.hitFlashMs > 0) {
    game.hitFlashMs -= dt * 1000;
  }
  if (game.hitTextMs > 0) {
    game.hitTextMs -= dt * 1000;
  }

  draw();
  updateHud();
  game.rafId = requestAnimationFrame(tick);
}

function drawPixelCloudPlatform(obstacle) {
  const cx = Math.floor(obstacle.x);
  const cy = Math.floor(obstacle.y);
  const cw = Math.floor(obstacle.w);
  const ch = Math.floor(obstacle.h);
  ctx.fillStyle = "#f4fbff";
  ctx.fillRect(cx, cy + 6, cw, ch - 2);
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(cx + 14, cy + 11, 10, 0, Math.PI * 2);
  ctx.arc(cx + 32, cy + 8, 11, 0, Math.PI * 2);
  ctx.arc(cx + 52, cy + 10, 10, 0, Math.PI * 2);
  ctx.arc(cx + Math.max(58, cw - 16), cy + 11, 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#d8edf7";
  ctx.fillRect(cx + 2, cy + ch - 3, Math.max(8, cw - 4), 2);
}

function drawCreeperObstacle(obstacle) {
  const x = Math.floor(obstacle.x);
  const y = Math.floor(obstacle.y);
  const w = Math.max(8, Math.floor(obstacle.w));
  const h = Math.max(8, Math.floor(obstacle.h));
  const tile = Math.max(4, Math.floor(Math.min(w, h) / 6));
  const shades = ["#4fc75c", "#3ca84a", "#57de63", "#2f9140"];

  for (let py = 0; py < h; py += tile) {
    for (let px = 0; px < w; px += tile) {
      const tx = Math.floor(px / tile);
      const ty = Math.floor(py / tile);
      const id = (tx * 3 + ty * 5 + Math.floor(obstacle.x / 8)) % shades.length;
      ctx.fillStyle = shades[id];
      ctx.fillRect(x + px, y + py, Math.min(tile, w - px), Math.min(tile, h - py));
    }
  }

  const faceW = Math.max(10, Math.min(w - 4, Math.floor(w * 0.56)));
  const faceH = Math.max(12, Math.min(h - 4, Math.floor(h * 0.48)));
  const faceX = x + Math.floor((w - faceW) / 2);
  const faceY = y + Math.floor(h * 0.18);
  const eyeW = Math.max(2, Math.floor(faceW * 0.2));
  const eyeH = Math.max(3, Math.floor(faceH * 0.24));
  const eyeGap = Math.max(2, Math.floor(faceW * 0.16));
  const mouthW = Math.max(4, Math.floor(faceW * 0.34));
  const mouthH = Math.max(4, Math.floor(faceH * 0.36));
  const dark = "#152516";

  if (w > 16 && h > 16) {
    ctx.fillStyle = dark;
    ctx.fillRect(faceX + eyeGap, faceY + 2, eyeW, eyeH);
    ctx.fillRect(faceX + faceW - eyeGap - eyeW, faceY + 2, eyeW, eyeH);
    ctx.fillRect(faceX + Math.floor((faceW - mouthW) / 2), faceY + eyeH + 4, mouthW, mouthH);
    ctx.fillRect(faceX + Math.floor((faceW - mouthW) / 2) - 2, faceY + eyeH + 8, 2, mouthH - 2);
    ctx.fillRect(
      faceX + Math.floor((faceW - mouthW) / 2) + mouthW,
      faceY + eyeH + 8,
      2,
      mouthH - 2
    );
  }

  ctx.strokeStyle = "#1f3d22";
  ctx.lineWidth = 2;
  ctx.strokeRect(x + 1, y + 1, w - 2, h - 2);
}

function drawPixelPlayer(player) {
  const x = Math.floor(player.x);
  const y = Math.floor(player.y);
  const jump = !player.grounded;

  // head
  ctx.fillStyle = "#ffd1a2";
  ctx.fillRect(x + 11, y + 3, 12, 10);
  ctx.fillStyle = "#6b3c20";
  ctx.fillRect(x + 10, y + 1, 14, 3);
  ctx.fillRect(x + 9, y + 4, 2, 3);
  ctx.fillRect(x + 23, y + 4, 2, 3);
  // eyes
  ctx.fillStyle = "#1b2332";
  ctx.fillRect(x + 14, y + 7, 2, 2);
  ctx.fillRect(x + 18, y + 7, 2, 2);

  // body
  ctx.fillStyle = "#4a7dc7";
  ctx.fillRect(x + 10, y + 13, 14, 10);
  ctx.fillStyle = "#d9e8ff";
  ctx.fillRect(x + 15, y + 14, 3, 8);

  // arms
  ctx.fillStyle = "#ffd1a2";
  ctx.fillRect(x + 7, y + 14, 3, 8);
  ctx.fillRect(x + 24, y + 14, 3, 8);

  // legs
  ctx.fillStyle = "#223451";
  if (jump) {
    ctx.fillRect(x + 10, y + 23, 6, 8);
    ctx.fillRect(x + 18, y + 22, 6, 8);
  } else {
    ctx.fillRect(x + 10, y + 23, 5, 12);
    ctx.fillRect(x + 19, y + 23, 5, 12);
  }

  // outline for readability
  ctx.strokeStyle = "rgba(8, 14, 26, 0.85)";
  ctx.lineWidth = 1;
  ctx.strokeRect(x + 10, y + 3, 14, 20);
}

function draw() {
  const shakeX = game.shakeMs > 0 ? randInt(4) - 2 : 0;
  const panX = game.cameraPanX || 0;
  const scroll = game.distance * 3.4;
  const zone = Math.floor(game.bestDistance / 220) % 3;
  const skyList = ["#b9e4ff", "#aedfff", "#cfe8ff"];
  const hillList = ["#9ccb9f", "#8ebead", "#a6b6df"];
  const skyColor = skyList[zone];
  const hillColor = hillList[zone];

  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.translate(shakeX - panX, 0);

  ctx.fillStyle = skyColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Parallax background layers
  ctx.fillStyle = hillColor;
  for (let i = -1; i < 5; i += 1) {
    const x = i * 110 - (scroll * 0.22) % 110;
    ctx.fillRect(x, 430, 70, 110);
  }
  ctx.fillStyle = "rgba(230, 245, 255, 0.95)";
  for (let i = -1; i < 4; i += 1) {
    const x = i * 150 - (scroll * 0.35) % 150;
    ctx.fillRect(x + 10, 75, 42, 16);
    ctx.fillRect(x + 22, 63, 38, 16);
  }
  ctx.fillStyle = "#fff9a9";
  ctx.fillRect(286 - ((scroll * 0.08) % 40), 26, 44, 44);

  ctx.fillStyle = "#86b965";
  ctx.fillRect(0, 540, canvas.width, 100);
  ctx.fillStyle = "#835235";
  ctx.fillRect(0, 568, canvas.width, 72);

  const tileOffset = -Math.floor(scroll) % 24;
  for (let x = tileOffset - 24; x < canvas.width + 24; x += 24) {
    ctx.fillStyle = x % 48 === 0 ? "#93c473" : "#7dae5e";
    ctx.fillRect(x, 540, 24, 14);
  }

  // Pits (fall hazards)
  game.obstacles.forEach((obstacle) => {
    if (obstacle.kind !== "pit") {
      return;
    }
    ctx.fillStyle = skyColor;
    ctx.fillRect(obstacle.x, 540, obstacle.w, 100);
    ctx.fillStyle = "#1e2733";
    ctx.fillRect(obstacle.x + 4, 544, Math.max(8, obstacle.w - 8), 96);
    ctx.fillStyle = "#4d2f1e";
    ctx.fillRect(obstacle.x, 568, 4, 72);
    ctx.fillRect(obstacle.x + obstacle.w - 4, 568, 4, 72);
  });

  game.obstacles.forEach((obstacle) => {
    if (obstacle.kind !== "cloud_platform") {
      return;
    }
    drawPixelCloudPlatform(obstacle);
  });

  drawPixelPlayer(game.player);

  game.obstacles.forEach((obstacle) => {
    if (obstacle.kind === "pit" || obstacle.kind === "cloud_platform") {
      return;
    }
    drawCreeperObstacle(obstacle);
  });

  if (game.hitFlashMs > 0) {
    const alpha = Math.max(0, Math.min(0.45, (game.hitFlashMs / 220) * 0.45));
    ctx.fillStyle = `rgba(210, 28, 28, ${alpha})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  if (game.hitTextMs > 0) {
    ctx.fillStyle = "rgba(24, 18, 18, 0.84)";
    ctx.fillRect(28, 198, canvas.width - 56, 62);
    ctx.fillStyle = "#fff3f3";
    ctx.font = "bold 22px 'Yu Gothic UI', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(game.hitTitleText || "ミス！", canvas.width / 2, 223);
    ctx.fillStyle = "#ffe0e0";
    ctx.font = "bold 13px 'Yu Gothic UI', sans-serif";
    ctx.fillText(game.hitSubText || "次はきっといける！", canvas.width / 2, 244);
    ctx.textAlign = "start";
  }

  if (game.toastMs > 0 && game.toastText) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
    ctx.fillRect(64, 96, canvas.width - 128, 34);
    ctx.fillStyle = "#fff7d6";
    ctx.font = "bold 16px 'Yu Gothic UI', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(game.toastText, canvas.width / 2, 118);
    ctx.textAlign = "start";
  }

  ctx.restore();
}

function computeDiagnosis() {
  const bugRate = Math.min(100, Math.round((game.bugFound / TOTAL_BUGS) * 100));
  const timingRate =
    game.timingTotal > 0 ? Math.round((game.timingHits / game.timingTotal) * 100) : 0;
  const breakRate =
    game.obstacleCount > 0 ? Math.round((game.obstacleCleared / game.obstacleCount) * 100) : 0;
  const stabilityRate = Math.max(0, 100 - game.mistakes * 20);

  const axis = {
    bug: Math.round(bugRate * 0.4),
    timing: Math.round(timingRate * 0.25),
    break: Math.round(breakRate * 0.25),
    stability: Math.round(stabilityRate * 0.1)
  };

  const score = axis.bug + axis.timing + axis.break + axis.stability;
  const spread =
    Math.max(axis.bug, axis.timing, axis.break) - Math.min(axis.bug, axis.timing, axis.break);

  let type = "adapter";
  if (spread <= 5) {
    type = "adapter";
  } else if (axis.bug >= axis.timing && axis.bug >= axis.break && axis.bug >= 40) {
    type = "debug_detective";
  } else if (axis.timing >= axis.bug && axis.timing >= axis.break && axis.timing >= 25) {
    type = "logical_runner";
  } else if (axis.break >= axis.bug && axis.break >= axis.timing && axis.break >= 25) {
    type = "sprint_challenger";
  }

  return { type, axis, score };
}

function renderAxisBars(axis) {
  const rows = [
    { label: "観察/デバッグ", value: axis.bug, max: 40 },
    { label: "手順/論理", value: axis.timing, max: 25 },
    { label: "反射/突破", value: axis.break, max: 25 },
    { label: "安定性", value: axis.stability, max: 10 }
  ];

  ui.axisBars.innerHTML = rows
    .map((row) => {
      const width = Math.max(0, Math.min(100, (row.value / row.max) * 100));
      return `
        <div class="axis-row">
          <span>${row.label}</span>
          <div class="axis-track"><div class="axis-fill" style="width: ${width}%"></div></div>
          <b>${row.value}</b>
        </div>
      `;
    })
    .join("");
}

function showResult() {
  closeBugModal();
  stopBgm();
  game.bestDistance = Math.max(game.bestDistance, game.distance);
  const diagnosis = computeDiagnosis();
  const meta = TYPE_META[diagnosis.type] || TYPE_META.adapter;

  switchScreen("result");
  ui.resultTypeName.textContent = `きみは ${meta.name}！`;
  ui.resultTypeComment.textContent = meta.comment;
  ui.resultScore.textContent = String(diagnosis.score);
  ui.resultBugFound.textContent = String(game.bugFound);
  ui.resultDistance.textContent = String(Math.round(game.bestDistance));
  ui.resultMiss.textContent = String(game.mistakes);
  if (ui.resultStreak) {
    ui.resultStreak.textContent = String(game.bestStreak);
  }
  renderAxisBars(diagnosis.axis);

  track("game_complete", {
    score: diagnosis.score,
    distance: Math.round(game.distance),
    best_distance: Math.round(game.bestDistance),
    mistake_count: game.mistakes,
    best_streak: game.bestStreak,
    diagnosis_type: diagnosis.type
  });
}

function startGame() {
  unlockAudio();
  resetGameplayStats();
  game.sessionId = newSessionId();
  switchScreen("game");
  updateHud();
  draw();
  track("game_start", { selected_difficulty: game.difficulty });

  game.running = true;
  game.startAt = performance.now();
  game.lastAt = game.startAt;
  playSfx("start");
  startBgm();
  game.pausedForBug = true;
  showAlertOverlay("ミッション：\nバグをなおして\nゲームを正常にしよう！！\nタップでつぎへ", "mission", {
    onDismiss: () => {
      beginMoveRightBugEvent();
    }
  });
  cancelAnimationFrame(game.rafId);
  game.rafId = requestAnimationFrame(tick);
}

function quitGame() {
  if (!game.running && !game.pausedForBug) {
    switchScreen("lp");
    closeBugModal();
    closeReservePrompt();
    return;
  }
  game.bestDistance = Math.max(game.bestDistance, game.distance);
  game.running = false;
  game.pausedForBug = false;
  stopBgm();
  cancelAnimationFrame(game.rafId);
  closeBugModal();
  closeReservePrompt();
  track("game_quit_mid", {
    distance: Math.round(game.distance),
    best_distance: Math.round(game.bestDistance),
    mistake_count: game.mistakes
  });
  showResult();
}

function wireEvents() {
  ui.startBtn.addEventListener("click", startGame);
  ui.quitBtn.addEventListener("click", quitGame);
  ui.retryBtn.addEventListener("click", startGame);

  ui.bugRunBtn.addEventListener("click", runPuzzleCheck);
  ui.bugResetBtn.addEventListener("click", () => {
    if (!game.activePuzzle) {
      return;
    }
    game.activePuzzle.placed = game.activePuzzle.placed.map(() => null);
    ui.bugFeedback.style.color = "var(--ink)";
    ui.bugFeedback.textContent = "リセットしたよ。もう一回ゆっくり入れてみよう。";
    renderPuzzleSlots();
  });

  ui.ctaBtn.addEventListener("click", (event) => {
    const url = ui.ctaBtn.dataset.url || "";
    if (!url) {
      event.preventDefault();
      alert("予約URLが未設定です。config/game.config.json の cta_url を確認してください。");
      return;
    }
    playSfx("cta");
    track("cta_click", { cta_url: url });
    track("form_visit", { cta_url: url, proxy: true });
  });

  if (ui.audioToggleBtn) {
    ui.audioToggleBtn.addEventListener("click", () => {
      unlockAudio();
      const next = !audioState.enabled;
      setAudioEnabled(next);
      if (next) {
        playSfx("start");
      }
      track("audio_toggle", { enabled: next });
    });
  }

  if (ui.reserveGoBtn) {
    ui.reserveGoBtn.addEventListener("click", () => {
      playSfx("cta");
      track("reserve_prompt_click_cta", {
        best_distance: Math.round(game.bestDistance),
        mistake_count: game.mistakes
      });
      goToReservePage("reserve_prompt_cta");
    });
  }
  if (ui.reserveRestartBtn) {
    ui.reserveRestartBtn.addEventListener("click", () => {
      track("reserve_prompt_click_restart", {
        best_distance: Math.round(game.bestDistance),
        mistake_count: game.mistakes
      });
      closeReservePrompt();
      startGame();
    });
  }

  const getTapZone = (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const ratio = rect.width > 0 ? x / rect.width : 0.5;
    if (ratio < 0.33) {
      return "left";
    }
    if (ratio > 0.66) {
      return "right";
    }
    return "center";
  };

  const stopMove = () => {
    inputState.left = false;
    inputState.right = false;
  };

  const onCanvasDown = (event) => {
    event.preventDefault();
    unlockAudio();
    if (!game.running || game.pausedForBug) {
      return;
    }
    const zone = getTapZone(event);
    if (zone === "center") {
      playerJump();
      return;
    }
    if (zone === "left") {
      if (!game.moveLeftFixSolved) {
        if (!game.moveRightFixSolved) {
          showLockedToast("まず右をなおそう。");
          return;
        }
        if (!game.moveLeftBugDone) {
          beginMoveLeftBugEvent();
          return;
        }
        showLockedToast(`左バグ中！${wordProgram()}で直そう。`);
        return;
      }
      inputState.left = true;
      inputState.right = false;
      return;
    }
    if (!game.moveRightFixSolved) {
      showLockedToast(`右バグ中！${wordProgram()}で直そう。`);
      return;
    }
    inputState.right = true;
    inputState.left = false;
  };

  canvas.addEventListener("pointerdown", onCanvasDown);
  canvas.addEventListener("pointerup", stopMove);
  canvas.addEventListener("pointercancel", stopMove);
  canvas.addEventListener("pointerleave", stopMove);
  window.addEventListener("pointerdown", unlockAudio, { passive: true });
  window.addEventListener("keydown", (event) => {
    unlockAudio();
    if (event.code === "Space" || event.code === "ArrowUp") {
      event.preventDefault();
      playerJump();
      return;
    }
    if (event.code === "ArrowLeft" || event.code === "KeyA") {
      event.preventDefault();
      if (!game.moveLeftFixSolved) {
        if (!game.moveRightFixSolved) {
          showLockedToast("まず右をなおそう。");
          return;
        }
        if (!game.moveLeftBugDone) {
          beginMoveLeftBugEvent();
          return;
        }
        showLockedToast(`左バグ中！${wordProgram()}で直そう。`);
        return;
      }
      inputState.left = true;
      return;
    }
    if (event.code === "ArrowRight" || event.code === "KeyD") {
      event.preventDefault();
      if (!game.moveRightFixSolved) {
        showLockedToast(`右バグ中！${wordProgram()}で直そう。`);
        return;
      }
      inputState.right = true;
    }
  });
  window.addEventListener("keyup", (event) => {
    if (event.code === "ArrowLeft" || event.code === "KeyA") {
      inputState.left = false;
      return;
    }
    if (event.code === "ArrowRight" || event.code === "KeyD") {
      inputState.right = false;
    }
  });
  window.addEventListener("blur", () => {
    inputState.left = false;
    inputState.right = false;
  });
}

async function loadConfig() {
  try {
    const response = await fetch("./config/game.config.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`config load failed: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn("config load fallback", error);
    return FALLBACK_CONFIG;
  }
}

async function init() {
  game.config = await loadConfig();
  game.stageId = getStageId(game.config);
  game.sessionId = newSessionId();

  document.title = game.config.app.title;
  const ctaUrl = normalizeCtaUrl(game.config.app.cta_url);
  ui.ctaBtn.dataset.url = ctaUrl;
  ui.ctaBtn.href = ctaUrl || "#";
  updateAudioToggleButton();

  buildDifficultyButtons(game.config);
  wireEvents();
  draw();
  updateHud();
  track("page_view_qr");
}

init();
