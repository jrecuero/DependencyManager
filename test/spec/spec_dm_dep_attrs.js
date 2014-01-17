describe("Dependency Manager Dependecy Attributes", function() {
    var instance;

    beforeEach(function() {
        instance = new DM_DepAttrs();
    });

    afterEach(function() {
        instance = null;
    });

    describe("New Instance", function() {
        it("name is null", function() {
            expect(instance.name).toBe(null);
        });
        it("attrs is empty", function() {
            expect(instance.attrs.length).toBe(0);
        });
        it("relation is NONE", function() {
            expect(instance.relation).toEqual(DM_Relation.NONE);
        });
    });

    describe("New Instance Dependency", function() {

        var reto;
        var name     = "new instance dependency";
        var attrs    = [1, 2, 3];
        var relation = DM_Relation.MAIN;

        beforeEach(function() {
            reto = instance.create(name, attrs, relation);
        });

        it("Register call returns true", function() {
            expect(reto).toBe(reto);
        });
        it("name is 'new instance dependency'", function() {
            expect(instance.name).toEqual(name);
        });
        it("attrs is [1, 2, 3]", function() {
            expect(instance.attrs).toEqual(attrs);
        });
        it("relation is MAIN", function() {
            expect(instance.relation).toEqual(DM_Relation.MAIN);
        });
    });
});

