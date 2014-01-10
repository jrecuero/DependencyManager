describe("Stat", function() {
    var stat;

    beforeEach(function() {
        stat = new Stat();
    });

    afterEach(function() {
        stat = null;
    });

    it("new stat has counter to zero", function() {
        expect(stat.counter).toEqual(0);
    });
    it("new stat is disabled", function() {
        expect(stat.enabled).toBe(false);
    });
    it("enable stat set enable to true", function() {
        stat.enable();
        expect(stat.enabled).toBe(true);
    })
    it("disable stat set enable to false", function() {
        stat.enable();
        expect(stat.enabled).toBe(true);
        stat.disable();
        expect(stat.enabled).toBe(false);
    });
    it("isEnable return if enable is true", function() {
        expect(stat.isEnable()).toBe(false);
        stat.enable();
        expect(stat.isEnable()).toBe(true);
    });
    it("getCounter returns counter value", function() {
        expect(stat.get_counter()).toEqual(0);
        stat.counter = 10;
        expect(stat.get_counter()).toEqual(10);
    });
    it("inc method increase counter value by amount (default is 1)", function() {
        expect(stat.get_counter()).toEqual(0);
        expect(stat.inc()).toEqual(1);
        expect(stat.get_counter()).toEqual(1);
        expect(stat.inc(10)).toEqual(11);
        expect(stat.get_counter()).toEqual(11);
    });
    it("dec method decrease counter.", function() {
        expect(stat.get_counter()).toEqual(0);
        expect(stat.inc()).toEqual(1);
        expect(stat.get_counter()).toEqual(1);
        expect(stat.dec()).toEqual(0);
        expect(stat.get_counter()).toEqual(0);
        expect(stat.inc(10)).toEqual(10);
        expect(stat.get_counter()).toEqual(10);
        expect(stat.dec()).toEqual(9);
        expect(stat.get_counter()).toEqual(9);
        expect(stat.dec(5)).toEqual(4);
        expect(stat.get_counter()).toEqual(4);
        expect(stat.dec(4)).toEqual(0);
        expect(stat.get_counter()).toEqual(0);
    });
    it("dec can not decrease under zero", function() {
        expect(stat.dec()).toEqual(0);
        expect(stat.get_counter()).toEqual(0);
        expect(stat.inc()).toEqual(1);
        expect(stat.get_counter()).toEqual(1);
        expect(stat.dec(10)).toEqual(0);
        expect(stat.get_counter()).toEqual(0);
    });
});

