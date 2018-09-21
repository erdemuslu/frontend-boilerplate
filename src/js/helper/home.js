class Home {
    constructor(pagename) {
        this.pagename = pagename;
    }

    printName() {
		console.log(`This is ${this.pagename}`);
    }

    init() {
        this.printName();
    }
}

const home = new Home("homepage");

module.exports = home;