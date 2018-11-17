const VendingMachine = require("../lib/vending-machine.js");

describe("VendingMachine", () => {
  let machine;

  beforeEach(() => {
    machine = new VendingMachine("../data.json");
  });

  describe("queryInventory", () => {
    it("test", () => {
      expect(machine.test("coke")).toEqual({"stock": 10});
    });
  });

  describe("queryInventory", () => {
    it("should return all of the products and their quantaties in the inventory", () => {
      expect(machine.queryInventory()).toEqual("Coca-Cola: 10, Water: 2, Chocolate Bar: 5, Chips Bag: 12");
    });
  });

  describe("refillInventory", () => {
    it("should increase product quantity to refill machine", () => {
      expect(machine.refillInventory()).toBe(40);
    });
  });

  // describe("resupplyChange", () => {
  //   it("should re-supply change", () => {
  //     expect(resupplyChange()).toBe();
  //   });
  // });

  // describe("dispenseProductPayment", () => {
  //   it("should dispense product only upon payment", () => {
  //     expect(dispenseProductPayment()).toBe();
  //   });
  // });

  // describe("returnChangeCoins", () => {
  //   it("should coins change", () => {
  //     expect(returnChangeCoins()).toBe();
  //   });
  // });
});
