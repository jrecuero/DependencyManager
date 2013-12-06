describe("Dependency Manager", function() {
    it("init returns", function() {
        expect(depMgr.init()).toEqual('init');
    });
    it("start returns", function() {
        expect(depMgr.start()).toEqual('start');
    });
});