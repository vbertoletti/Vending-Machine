class VendingMachine {
  constructor(data) {
    this.data = require(data);
  }

  queryByCode(slot) {
    const entries = Object.entries(this.data.products);
    let productByCode = null;

    entries.map(product => {
      if (product[1].code === slot) {
        return (productByCode = `You chose ${
          product[1].name
        } and the price is: ${product[1].price}`);
      } else {
        return productByCode;
      }
    });
    return productByCode;
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

  resupplyChange() {
    const payments = Object.entries(this.data.payment);
    let total = 0;
    payments.map(payment => {
      if (payment[1].inventory < payment[1].maxInventory) {
        payment[1].inventory = payment[1].maxInventory;
      }
      total += payment[1].maxInventory;
    });
    return total;
  }

  dispenseProductPayment(title, money) {
    let item = this.data.products[title];

    let purchase = {
      change: null,
      item: "",
      sold: false
    };

    if (money === item.price) {
      purchase.change = "no change needed";
      purchase.item = item.name;
      purchase.sold = true;
      return purchase;
    }

    if (money > item.price) {
      let change = money - item.price;
      change = change.toFixed(2);
      //0.70

      let changeGiven = this.data.payment.reduce((acc, usedCoin) => {
        let coinsGiven = 0;
        //while 0.70 is greater or equal to penny == 0.01 and invetory of penny is greater than 0
        while (change >= usedCoin.value && usedCoin.inventory > 0) {
          coinsGiven++;
          usedCoin.inventory--;
          change = change - usedCoin.value;
          change = change.toFixed(2);
        }
        if (coinsGiven > 0) {
          acc = `Machine gave ${coinsGiven} coins of ${[
            usedCoin.name
          ]}. Change is ${(coinsGiven * usedCoin.value).toFixed(2)}`;
        }
        purchase.change = acc;
        return purchase.change;
      }, {});
      return changeGiven;
    }

    if (money < item.price) {
      return "you have inserted less money than the product's price";
    }
  }

  coinsInventory() {
    let arraypayment = this.data.payment;

    const filtered = arraypayment
      .map(filter => {
        if (filter.inventory === filter.maxInventory) {
          return `${filter.name} is full`;
        } else {
          return `${filter.name} needs re-supply`;
        }
      })
      .join(", ");

    return filtered;
  }

  checkProductExist(product) {
    const entries = Object.entries(this.data.products);
    let exist;

    entries.filter(str => {
      if (str[1].name.includes(product)) {
        return (exist = "This item already exists in the machine");
      } else {
        return (exist = "This item does not exist in the machine");
      }
    });

    return exist;
  }
}

module.exports = VendingMachine;
