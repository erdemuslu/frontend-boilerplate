class Home {
    constructor(pagename) {
        this.pagename = "homepage";
    }

    printName() {
        console.log(`This is ${this.pagename}`);
    }

    init() {
        this.printName();
    }
};

const home = new Home();

module.exports = home;