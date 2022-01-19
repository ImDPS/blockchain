import Block from "./block";
import cryptoHash from "./crypto-hash";

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock({ data }) {
    const newBlock = Block.mineBlock({
      lastBlock: this.chain[this.chain.length - 1],
      data,
    });

    this.chain.push(newBlock);
  }

  isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }

    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];

      const actualPrevHash = chain[i - 1].hash;
      const { timestamp, data, prevHash, hash } = block;

      if (prevHash !== actualPrevHash) {
        return false;
      }

      if (hash !== cryptoHash(timestamp, prevHash, data)) return false;
    }
    return true;
  }
}

module.exports = Blockchain;
