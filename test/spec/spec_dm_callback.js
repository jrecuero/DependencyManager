describe("Dependency Manager Callback", function() {

    var cb  = null;
    var cbs = [1, 2, 3, 4, 5, 6];

    beforeEach(function () {
        cb = new DM_Callback();
    });

    it("New", function () {
        expect(cb.created).toBe(null);    
        expect(cb.partial).toBe(null);    
        expect(cb.active).toBe(null);    
        expect(cb.inactive).toBe(null);    
        expect(cb.deleted).toBe(null);    
        expect(cb.destroyed).toBe(null);    
    });

    it("Create With Data", function () {
        expect(cb.create(cbs[0], cbs[1], cbs[2], cbs[3], cbs[4], cbs[5])).toEqual(cb);
        expect(cb.created).toBe(cbs[0]);    
        expect(cb.partial).toBe(cbs[1]);    
        expect(cb.active).toBe(cbs[2]);    
        expect(cb.inactive).toBe(cbs[3]);    
        expect(cb.deleted).toBe(cbs[4]);    
        expect(cb.destroyed).toBe(cbs[5]);    
    });
});

