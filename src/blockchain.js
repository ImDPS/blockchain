import Block from "./block.js";
import cryptoHash from "./crypto-hash.js";

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

  replaceChain(chain) {
    if (chain.length <= this.chain.length) {
      console.log("The incoming chain is not longer than the current chain.");
      return;
    } else if (!this.isValidChain(chain)) {
      console.log("The incoming chain is invalid.");
      return;
    } else {
      console.log("Replacing blockchain with ", chain);
      this.chain = chain;

      console.log("The incoming chain has been replaced.");
    }
  }

  isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      // console.log("------");
      return false;
    }

    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];

      const actualPrevHash = chain[i - 1].hash;
      const { timestamp, data, prevHash, nonce, difficulty, hash } = block;

      if (prevHash !== actualPrevHash) {
        console.log("The previous hash is not correct.");
        return false;
      }

      if (hash !== cryptoHash(timestamp, prevHash, data, nonce, difficulty)) {
        console.log("The hash is not correct.");
        return false;
      }
    }
    console.log("The chain is valid.");
    return true;
  }
}

export default Blockchain;
