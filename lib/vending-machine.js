class VendingMachine {
  constructor(data) {
    this.data = require(data);
  }

  test(title) {
    return { stock: this.data.products[title].units };
  }

  queryInventory() {
    const entries = Object.entries(this.data.products);
    return entries
      .reduce((acc, product) => {
        acc.push(`${product[1].name}: ${product[1].units}`);
        return acc;
      }, [])
      .join(", ");
  }

  refillInventory() {
    const entries = Object.entries(this.data.products);
    let total = 0;
    entries.map(product => {
      if (product[1].units < product[1].maxUnits) {
        product[1].units = product[1].maxUnits;
      }
      total += product[1].maxUnits;
    });
    return total;
  }
}

module.exports = VendingMachine;
