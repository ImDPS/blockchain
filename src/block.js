import { GENESIS_DATA, MINE_RATE } from "./config.js";
import cryptoHash from "./crypto-hash.js";

class Block {
  constructor({ timestamp, data, prevHash, hash, nonce, difficulty }) {
    this.timestamp = timestamp;
    this.data = data;
    this.prevHash = prevHash;
    this.hash = hash;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }

  static genesis() {
    return new this(GENESIS_DATA);
  }

  static mineBlock({ lastBlock, data }) {
    let hash, timestamp;
    const prevHash = lastBlock.hash;
    const { difficulty } = lastBlock;
    let nonce = 0;
    // const hash = Block.hash({ timestamp, data, lastHash });

    do {
      nonce++;
      timestamp = Date.now();
      hash = cryptoHash(timestamp, prevHash, data, nonce, difficulty);
    } while (hash.substring(0, difficulty) !== "0".repeat(difficulty));

    return new this({
      timestamp,
      data,
      prevHash,
      difficulty,
      nonce,
      hash: cryptoHash(timestamp, prevHash, data, nonce, difficulty),
    });
  }

  adjustDifficulty({ originalBlock, timestamp }) {
    let { difficulty } = originalBlock;

    if (difficulty < 1) {
      difficulty = 1;
    }

    if (timestamp - originalBlock.timestamp > MINE_RATE) {
      difficulty -= 1;
    } else if (timestamp - originalBlock.timestamp < MINE_RATE / 2) {
      difficulty += 1;
    }

    return difficulty;
  }
}

// const block1 = new Block({
//   timestamp: "01/01/2018",
//   data: "Block 1",
//   prevHash: "0",
// });

export default Block;
