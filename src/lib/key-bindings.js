import { BasicEntity } from './basic-entity';

class Keys {
    tlp = 'qwertyui';
    slp = 'asdfghj';
    boost = 'b';
    pause = 'p';
    speedup = 'n';
}

class KeyBindings extends BasicEntity {
    constructor() {
        super('keybindings', 'Key Bindings', new Keys());
    }
}

export { KeyBindings as keyBindings };
