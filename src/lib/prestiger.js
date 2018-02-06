class Prestiger {
    registeredObjects = [];

    register(registerObject) {
        this.registeredObjects.push(registerObject);
    }

    prestige(prestige=true) {
        for (let registeredObject of this.registeredObjects) {
            registeredObject.prestige(prestige);
        }
        for (let registeredObject of this.registeredObjects) {
            registeredObject.update();
        }
        if (prestige) {
            for (let registeredObject of this.registeredObjects) {
                registeredObject.postPrestigeAssert();
            }
        }
    }

    grandPrestige() {
        for (let registeredObject of this.registeredObjects) {
            registeredObject.grandPrestige();
        }
        for (let registeredObject of this.registeredObjects) {
            registeredObject.update();
        }
        for (let registeredObject of this.registeredObjects) {
            registeredObject.postPrestigeAssert();
        }
    }
}

export let prestiger  = new Prestiger();

