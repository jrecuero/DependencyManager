describe("Dependency Manager Dependecy Attributes", function() {

    var dep_attrs;
    var name     = "new dep attrs dependency";
    var attrs    = [1, 2, 3];
    var relation = DM_Relation.MAIN;

    beforeEach(function() {
        dep_attrs = new DM_DepAttrs(name, attrs, relation);
    });

    afterEach(function() {
        dep_attrs = null;
    });

    describe("New Dependency Attributes", function() {
        it("name is 'new dep_attrs dependency'", function() {
            expect(dep_attrs.name).toEqual(name);
        });
        it("attrs is [1, 2, 3]", function() {
            expect(dep_attrs.attrs).toEqual(attrs);
        });
        it("relation is MAIN", function() {
            expect(dep_attrs.relation).toEqual(DM_Relation.MAIN);
        });
    });
});

