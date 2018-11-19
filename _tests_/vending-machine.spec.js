const VendingMachine = require("../lib/vending-machine.js");

describe("VendingMachine", () => {
  let machine;

  beforeEach(() => {
    machine = new VendingMachine("../data.json");
  });

  describe("queryInventory", () => {
    it("should return all of the products and their quantaties in the inventory", () => {
      expect(machine.queryInventory()).toEqual(
        "Coca-Cola: 10, Water: 2, Chocolate Bar: 5, Chips Bag: 12"
      );
    });
  });

  describe("refillInventory", () => {
    it("should increase product quantity to refill machine", () => {
      expect(machine.refillInventory()).toBe(40);
    });
  });

  describe("resupplyChange", () => {
    it("should return the updated total of coins inventory", () => {
      expect(machine.resupplyChange()).toEqual(400);
    });
  });

  describe("dispenseProductPayment", () => {
    it("should dispense product upon payment with no change", () => {
      expect(machine.dispenseProductPayment("coke", 2.3)).toEqual({
        change: "no change needed",
        item: "Coca-Cola",
        sold: true
      });
    });

    it("should give correct change if payment is > than the product's price", () => {
      expect(machine.dispenseProductPayment("coke", 3.0)).toEqual(
        "Machine gave 70 coins of penny. Change is 0.70"
      );
    });

    it("should throw a message if payment is < than the product's price", () => {
      expect(machine.dispenseProductPayment("coke", 2.0)).toEqual(
        "you have inserted less money than the product's price"
      );
    });
  });

  describe("queryByCode", () => {
    it("should prompt the name and price of the product based on its slot code in the machine", () => {
      expect(machine.queryByCode("B01")).toEqual(
        "You chose Chocolate Bar and the price is: 3.75"
      );
    });

    it("should return null if the slot code doesn't exist", () => {
      expect(machine.queryByCode("D20")).toEqual(null);
    });
  });

  describe("coinsInventory", () => {
    it("should return status of coins in the inventory", () => {
      expect(machine.coinsInventory()).toEqual(
        "penny needs re-supply, nickel is full, dime is full, quarter is full"
      );
    });
  });

  describe("checkProductExist", () => {
    it("should confirm that item is already in the machine", () => {
      expect(machine.checkProductExist("Chips Bag")).toEqual(
        "This item already exists in the machine"
      );
    });

    it("should inform there's no such item in the machine", () => {
      expect(machine.checkProductExist("Doritos")).toEqual(
        "This item does not exist in the machine"
      );
    });
  });
});
