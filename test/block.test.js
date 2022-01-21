import Block from "../src/block";
import { GENESIS_DATA, MINE_RATE } from "../src/config";
import cryptoHash from "../src/crypto-hash";

describe("Block", () => {
  // beforeEach(() => {
  //     block = new Block({
  //     timestamp: "01/01/2018",
  //     data: "Block 1",
  //     prevHash: "0",
  //     hash: "0",
  //     });
  // });

  const timestamp = 2000;
  const data = ["Block 1", "Block 2"];
  const prevHash = "0";
  const hash = "0";
  const nonce = 1;
  const difficulty = 1;
  const block = new Block({
    timestamp,
    data,
    prevHash,
    hash,
    nonce,
    difficulty,
  });

  it("has a timestamp", () => {
    expect(block.timestamp).toEqual(timestamp);
  });

  it("has a data", () => {
    expect(block.data).toEqual(data);
  });

  it("has a prevHash", () => {
    expect(block.prevHash).toEqual(prevHash);
  });

  it("has a hash", () => {
    expect(block.hash).toEqual(hash);
  });

  it("has a nonce", () => {
    expect(block.nonce).toEqual(nonce);
  }),
    it("has a difficulty", () => {
      expect(block.difficulty).toEqual(difficulty);
    });

  describe("genesis()", () => {
    const genesisBlock = Block.genesis();

    console.log("Genesis: ", genesisBlock);

    it("returns a Block instance", () => {
      expect(genesisBlock instanceof Block).toBe(true);
    });

    it("returns the genesis data", () => {
      expect(genesisBlock).toEqual(GENESIS_DATA);
    });
  });

  describe("mineBlock()", () => {
    const lastBlock = Block.genesis();
    const data = ["Block 1", "Block 2"];
    const mineBlock = Block.mineBlock({ lastBlock, data });

    it("returns a Block instance", () => {
      expect(mineBlock instanceof Block).toBe(true);
    });

    it("set `prevHash` to be the `hash` of the last block", () => {
      expect(mineBlock.prevHash).toEqual(lastBlock.hash);
    });

    it("sets the `timestamp`", () => {
      expect(mineBlock.timestamp).not.toEqual(undefined);
    });

    it("creates a SHA-256 `hash` based on the proper inputs", () => {
      expect(mineBlock.hash).toEqual(
        cryptoHash(
          mineBlock.timestamp,
          lastBlock.hash,
          data,
          mineBlock.nonce,
          mineBlock.difficulty
        )
      );
    });

    it("sets a `hash` that matches the difficulty criteria", () => {
      expect(mineBlock.hash.substring(0, mineBlock.difficulty)).toEqual(
        "0".repeat(mineBlock.difficulty)
      );
    });
  });

  describe("adjustDifficulty", () => {
    it("raises the difficulty for a quickly mined block", () => {
      expect(
        block.adjustDifficulty({
          originalBlock: block,
          timestamp: block.timestamp - MINE_RATE - 100,
        })
      ).toEqual(block.difficulty + 1);
    });

    it("lowers the difficulty for a slowly mined block", () => {
      // block.timestamp = Date.now() + MINE_RATE * 3;
      expect(
        block.adjustDifficulty({
          originalBlock: block,
          timestamp: block.timestamp + MINE_RATE + 100,
        })
      ).toEqual(block.difficulty - 1);
    });
  });
});
