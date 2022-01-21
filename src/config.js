const MINE_RATE = 1000;
const INITIAL_DIFFICULTY = 3;

const GENESIS_DATA = {
  timestamp: 1,
  data: [],
  prevHash: "0",
  hash: "0",
  nonce: 0,
  difficulty: INITIAL_DIFFICULTY,
};

export { GENESIS_DATA, MINE_RATE };
