import Block from "../src/block";
import { GENESIS_DATA } from "../src/config";
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

  const timestamp = "01/01/2018";
  const data = ["Block 1", "Block 2"];
  const prevHash = "0";
  const hash = "0";
  const block = new Block({ timestamp, data, prevHash, hash });

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
        cryptoHash(mineBlock.timestamp, lastBlock.hash, data)
      );
    });
  });
});
