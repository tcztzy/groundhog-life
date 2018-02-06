import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';
import { assert } from './assertions';
import { prestiger } from './prestiger';

function getName(module) {
    return `"${module.name}-${module.constructor.name}"`;
}

function getPrototypeChain(obj) {
    let prototypeChain = [getName(obj)];
    let constructorName = obj.constructor.name;
    while (constructorName !== 'BasicEntity'){
        obj = Object.getPrototypeOf(obj);
        constructorName = obj.constructor.name;
        prototypeChain.push(constructorName);
    }
    return prototypeChain;
}

let graphviz = 'digraph {\n';

function subgraph(graph, label) {
    graphviz += graph.size === 0 ? label + ';\n' : 'subgraph cluster_' + label + '{\nlabel="' + label + '!";\n';
    for (let x of graph) {
        subgraph(x[1], x[0]);
    }
    graph.size > 0 && (graphviz += '}\n');
}

class Saver {
    registeredObjects = {};
    running = true;
    saveString = '';
    itemName = 'groundhog_life_save';
    saveRequested = false;

    requestSave() {
        this.saveRequested = true;
    }

    stop() {
        this.running = false;
    }

    register(module) {
        assert(!this.registeredObjects.hasOwnProperty(module.id) || this.registeredObjects[module.id] === module, module.id);
        this.registeredObjects[module.id] = module;
        prestiger.register(module);
    }

    import(string) {
        this.loadFromString(string);
    }

    save() {
        if (this.running) {
            let module = {};
            for (let exports in this.registeredObjects)
                module[exports] = this.registeredObjects[exports].state;
            module.version = '0.6.0';
            this.saveString = compressToEncodedURIComponent(JSON.stringify(module));
            window.localStorage.setItem(this.itemName, this.saveString);
            this.saveRequested = false;
        }
    }

    merge(target, source) {
        for (let property in source)
            if (source.hasOwnProperty(property))
                target.state[property] = source[property];
    }

    hardReset() {
        window.localStorage.removeItem(this.itemName);
    }

    loadFromString(string) {
        try {
            if (string) {
                string = string.replace(/(\r\n|\n|\r)/gm, '');
                this.saveString = string;
                let saving = '';
                try {
                    saving = JSON.parse(decompressFromEncodedURIComponent(string));
                } catch (exports) {
                    console.log(exports);
                    window.alert(exports.message);
                    window.localStorage.setItem('backup_save', string);
                }
                for (let property in this.registeredObjects)
                    if (saving.hasOwnProperty(property))
                        this.merge(this.registeredObjects[property], saving[property]);
                for (let property in this.registeredObjects)
                    this.registeredObjects[property].onLoad();
            }
            for (let property in this.registeredObjects)
                this.registeredObjects[property].update();
            for (let property in this.registeredObjects)
                this.registeredObjects[property].postLoadAssert();
        } catch (e) {
            window.alert(e.message);
            window.localStorage.setItem('backup_save', string);
        }
    }

    load() {
        let module = window.localStorage.getItem(this.itemName);
        this.loadFromString(module);
    }

    dependencyGraph() {
        let module = [];
        for (let property in this.registeredObjects)
            module.push(this.registeredObjects[property]);
        let map1 = new Map();
        for (let x of module) {
            let c = getPrototypeChain(x).reverse();
            let d = map1;
            for (let y of c) {
                d.has(y) || d.set(y, new Map());
                d = d.get(y);
            }
        }
        let map2 = new Map();
        for (let xx of module) {
            map2.has(xx.constructor.name) || map2.set(xx.constructor.name, []);
            map2.get(xx.constructor.name).push(xx);
        }
        subgraph(map1, 'All');
        for (let xxx of module) {
            for (let xxxx of module) {
                graphviz += getName(xxx) + ' -> ' + getName(xxxx) + '\n';
            }
        }
        graphviz += '}';
        console.log(graphviz);
    }
}

export let saver = new Saver();
