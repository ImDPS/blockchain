import cryptoHash from "../src/crypto-hash";

describe("cryptoHash()", () => {
  it("generates a SHA-256 hashed output", () => {
    expect(cryptoHash("foo")).toEqual(
      "2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae"
    );
    // expect(cryptoHash('bar')).toEqual('7d4e10274dde6f2f8c093f2c7fdc69e0dbf2b27c4df230f6062e3cdb8d8e7741');
  });
});
