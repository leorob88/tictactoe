import { reactive } from 'vue'

export const settings = reactive({
  data: {
    player1: "Player1",
    player2: "Player2",
    theme: 0,
    timer: false
  },
  tempData: {
    player1: "Player1",
    player2: "Player2",
    theme: 0,
    timer: false
  },
  game: {
    cpuFirst: false,
    currentPlayer: 1,
    draw: false,
    hoveredCell: "",
    movesDone: {
      upleft: "",
      upmiddle: "",
      upright: "",
      leftmiddle: "",
      centermiddle: "",
      rightmiddle: "",
      downleft: "",
      downmiddle: "",
      downright: ""
    },
    newGame: true,
    player1Score: 0,
    player2Score: 0,
    player1Sign: "X",
    player2Sign: "O",
    playing: false,
    paused: false,
    remainingTime: 20,
    svg_line: {
      winningPosition: "upleft",
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      x1: 0,
      x2: 0,
      y1: 0,
      y2: 0
    },
    timeUp: false,
    tris: false,
    vsCpu: false,
    winner: "",
    winnerId: 0,
    winnerScore: 0,
    winningTriad: {index: -1, cells: ["", "", ""]}
  },
  themes: ["dark", "light", "jrpg", "minecraft", "wario", "joker"],
  visibility: {
    welcomeVisible: true,
    virtualVisible: false,
    newGameVisible: false,
    gameVisible: false,
    settingsVisible: false,
  },
  winningCombinations: [
    ["upleft", "upmiddle", "upright"],
    ["leftmiddle", "centermiddle", "rightmiddle"],
    ["downleft", "downmiddle", "downright"],
    ["upleft", "leftmiddle", "downleft"],
    ["upmiddle", "centermiddle", "downmiddle"],
    ["upright", "rightmiddle", "downright"],
    ["upleft", "centermiddle", "downright"],
    ["downleft", "centermiddle", "upright"]
  ]
});