import Blockchain from "../src/blockchain";
import Block from "../src/block";

describe("Blockchain", () => {
  let blockchain, newChain, originalChain;
  //   const block = new Block();

  beforeEach(() => {
    blockchain = new Blockchain();
    newChain = new Blockchain();

    originalChain = blockchain.chain;
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
          console.log("blockchain.chain: ", blockchain.chain);
          expect(blockchain.isValidChain(blockchain.chain)).toBe(true);
        });
      });
    });
  });

  describe("replaceChain()", () => {
    let errorMock, logMock;

    // beforeEach(() => {
    //   errorMock = jest.fn();
    //   logMock = jest.fn();

    //   global.console.error = errorMock;
    //   global.console.log = logMock;
    // });
    describe("when the new chain is not longer", () => {
      beforeEach(() => {
        newChain.chain[0] = { new: "chain" };
        blockchain.replaceChain(newChain.chain);
      });

      it("does not replace the chain", () => {
        expect(blockchain.chain).toEqual(originalChain);
      });

      // it("logs an error", () => {
      //   expect(errorMock).toHaveBeenCalled();
      // });
    });

    describe("when the new chain is longer", () => {
      beforeEach(() => {
        newChain.addBlock({ data: "B" });
        newChain.addBlock({ data: "C" });
        newChain.addBlock({ data: "D" });
      });
      describe("and the new chain is invalid", () => {
        beforeEach(() => {
          newChain.chain[2].hash = "evil-hash";
          blockchain.replaceChain(newChain.chain);
        });

        it("does not replace the chain", () => {
          expect(blockchain.chain).toEqual(originalChain);
        });

        // it("logs an error", () => {
        //   expect(errorMock).toHaveBeenCalled();
        // });
      });

      describe("and the new chain is valid", () => {
        beforeEach(() => {
          blockchain.replaceChain(newChain.chain);
        });

        it("replaces the chain", () => {
          expect(blockchain.chain).toEqual(newChain.chain);
        });

        // it("logs the replacement", () => {
        //   expect(logMock).toHaveBeenCalled();
        // });
      });
    });
  });
});
