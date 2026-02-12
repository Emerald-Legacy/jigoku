import type { AbilityContext } from '../AbilityContext';

export class EffectValue<V> {
    value: V;
    context: AbilityContext = {} as AbilityContext;

    constructor(value: V) {
        // @ts-ignore
        this.value = value === null || value === undefined ? true : value;
    }

    public setContext(context: AbilityContext): void {
        this.context = context;
    }

    public setValue(value: V) {
        this.value = value;
    }

    public getValue(): V {
        return this.value;
    }

    public recalculate(): boolean {
        return false;
    }

    public reset(): void {}

    public apply(_target): void {}

    public unapply(_target): void {}
}
