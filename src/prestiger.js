var r = require('get-iterator'), i = n(r);

class Prestiger {
    registeredObjects = [];

    register(registerObject) {
        this.registeredObjects.push(registerObject);
    }

    prestige(module=true) {
        for (let registeredObject of this.registeredObjects) {
            registeredObject.prestige(module);
        }
        var u = !0, l = !1, c = void 0;
        try {
            for (var d, f = (0, i.default)(this.registeredObjects); !(u = (d = f.next()).done); u = !0) {
                var v = d.value;
                v.update();
            }
        } catch (module) {
            l = !0, c = module;
        } finally {
            try {
                !u && f.return && f.return();
            } finally {
                if (l)
                    throw c;
            }
        }
        if (module) {
            var h = !0, p = !1, m = void 0;
            try {
                for (var y, g = (0, i.default)(this.registeredObjects); !(h = (y = g.next()).done); h = !0) {
                    var _ = y.value;
                    _.postPrestigeAssert();
                }
            } catch (module) {
                p = !0, m = module;
            } finally {
                try {
                    !h && g.return && g.return();
                } finally {
                    if (p)
                        throw m;
                }
            }
        }
    }

    grandPrestige() {
        var module = !0, exports = !1, require = void 0;
        try {
            for (var n, r = (0, i.default)(this.registeredObjects); !(module = (n = r.next()).done); module = !0) {
                var s = n.value;
                s.grandPrestige();
            }
        } catch (module) {
            exports = !0, require = module;
        } finally {
            try {
                !module && r.return && r.return();
            } finally {
                if (exports)
                    throw require;
            }
        }
        var o = !0, u = !1, l = void 0;
        try {
            for (var c, d = (0, i.default)(this.registeredObjects); !(o = (c = d.next()).done); o = !0) {
                var f = c.value;
                f.update();
            }
        } catch (module) {
            u = !0, l = module;
        } finally {
            try {
                !o && d.return && d.return();
            } finally {
                if (u)
                    throw l;
            }
        }
        var v = !0, h = !1, p = void 0;
        try {
            for (var m, y = (0, i.default)(this.registeredObjects); !(v = (m = y.next()).done); v = !0) {
                var g = m.value;
                g.postPrestigeAssert();
            }
        } catch (module) {
            h = !0, p = module;
        } finally {
            try {
                !v && y.return && y.return();
            } finally {
                if (h)
                    throw p;
            }
        }
    }
}

export let prestiger  = new Prestiger();

