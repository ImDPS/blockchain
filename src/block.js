import { GENESIS_DATA } from "./config";
import cryptoHash from "./crypto-hash";

class Block {
  constructor({ timestamp, data, prevHash, hash }) {
    this.timestamp = timestamp;
    this.data = data;
    this.prevHash = prevHash;
    this.hash = hash;
  }

  static genesis() {
    return new this(GENESIS_DATA);
  }

  static mineBlock({ lastBlock, data }) {
    const timestamp = Date.now();
    const prevHash = lastBlock.hash;
    // const hash = Block.hash({ timestamp, data, lastHash });
    return new this({
      timestamp,
      data,
      prevHash,
      hash: cryptoHash(timestamp, prevHash, data),
    });
  }
}

// const block1 = new Block({
//   timestamp: "01/01/2018",
//   data: "Block 1",
//   prevHash: "0",
// });

export default Block;
