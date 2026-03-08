const StaticEffect = require('./StaticEffect');

class DynamicEffect extends StaticEffect {
    constructor(type, calculate) {
        super(type);
        this.values = {};
        this.calculate = calculate;
    }

    apply(target) {
        super.apply(target);
        this.recalculate(target);
    }

    recalculate(target) {
        let oldValue = this.getValue(target);
        let newValue = this.setValue(target, this.calculate(target, this.context));
        if(typeof oldValue === 'function' && typeof newValue === 'function') {
            return oldValue.toString() !== newValue.toString();
        }
        if(Array.isArray(oldValue) && Array.isArray(newValue)) {
            if(oldValue.length !== newValue.length) {
                return true;
            }
            for(let i = 0; i < oldValue.length; i++) {
                if(oldValue[i] !== newValue[i]) {
                    return true;
                }
            }
            return false;
        }
        return oldValue !== newValue;
    }

    getValue(target) {
        if(target) {
            return this.values[target.uuid];
        }
    }

    setValue(target, value) {
        this.values[target.uuid] = value;
        return value;
    }
}

module.exports = DynamicEffect;
