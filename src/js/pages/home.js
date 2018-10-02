class Home {
  constructor(pagename) {
    this.pagename = pagename;
  }

  printName() {
    console.log(`This is ${this.pagename}`);
  }

  render() {
    this.printName();
  }
}

const home = new Home('homepage');

module.exports = home;
