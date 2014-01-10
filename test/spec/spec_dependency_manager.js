describe("Dependency Manager", function() {

    var depMgr;

    beforeEach(function() {
        depMgr = new DependencyManager();
    });

    afterEach(function() {
        depMgr = null;
        DM_Instance.prototype.cleanID();
    })

    describe("Create New", function() {
        it("instances are empty", function() {
            expect(empty_obj(depMgr.instances)).toBe(true);
        });
        it("dependencies are empty", function() {
            expect(empty_obj(depMgr.deps)).toBe(true);
        });
    });

    describe("Register Instance", function() {

        var reto;
        var inst_name = "New Instance";

        beforeEach(function() {
            reto = depMgr.register(inst_name);
        });

        it("Register a valid name", function() {
            expect(reto).toBe(true);
        });

        it("Instances are not more empty", function() {
            expect(empty_obj(depMgr.instances)).toBe(false);
            expect(DM_Instance.prototype.ID).toEqual(1);
            expect(DM_Instance.prototype.COUNTER).toEqual(1);
        });

        it("Register an existant name", function() {
            expect(depMgr.register(inst_name)).toBe(false);
            expect(DM_Instance.prototype.ID).toEqual(1);
            expect(DM_Instance.prototype.COUNTER).toEqual(1);
        });
    });

    describe("Unregister Instance", function() {

        var inst_name = "New Instance";

        beforeEach(function() {
            depMgr.register(inst_name);
        });

        it("Unregister returns True", function() {
            expect(depMgr.unregister(inst_name)).toBe(true);
            expect(DM_Instance.prototype.COUNTER).toEqual(0);
        });
        it("Unregister a not registered name returns false", function() {
            expect(depMgr.unregister("other name")).toBe(false);
            expect(DM_Instance.prototype.COUNTER).toEqual(1);
        })
    });
});

