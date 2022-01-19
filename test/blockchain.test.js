import Blockchain from "../src/blockchain";
import Block from "../src/block";

describe("Blockchain", () => {
  let blockchain;
  //   const block = new Block();

  beforeEach(() => {
    blockchain = new Blockchain();
  });

  it("contains a `chain` Array instance", () => {
    expect(blockchain.chain instanceof Array).toBe(true);
  });

  it("starts with `Genesis` block", () => {
    expect(blockchain.chain[0]).toEqual(Block.genesis());
  });

  it("adds a new block to the chain", () => {
    const newData = "foo bar";
    blockchain.addBlock({ data: newData });

    expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData);
  });

  describe("isValidChain()", () => {
    describe("when the chain does not start with the genesis block", () => {
      it("returns false", () => {
        blockchain.chain[0] = { data: "fake-genesis" };
        expect(blockchain.isValidChain(blockchain.chain)).toBe(false);
      });
    });

    describe("when the chain starts with the genesis block and has multiple blocks", () => {
      beforeEach(() => {
        blockchain.addBlock({ data: "foo" });
        blockchain.addBlock({ data: "bar" });
      });

      describe("and a lastHash reference has changed", () => {
        it("returns false", () => {
          blockchain.chain[1].prevHash = "bad-lastHash";
          expect(blockchain.isValidChain(blockchain.chain)).toBe(false);
        });
      });

      describe("and the chain contains a block with invalid field", () => {
        it("returns false", () => {
          blockchain.chain[1].data = "bad-data";

          expect(blockchain.isValidChain(blockchain.chain)).toBe(false);
        });
      });

      describe("and the chain does not contain any invalid block", () => {
        it("returns true", () => {
          expect(blockchain.isValidChain(blockchain.chain)).toBe(true);
        });
      });
    });
  });
});
