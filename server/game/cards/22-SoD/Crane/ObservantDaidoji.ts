import AbilityDsl from '../../../abilitydsl';
import DrawCard from '../../../drawcard';

export default class ObservantDaidoji extends DrawCard {
    static id = 'observant-daidoji';

    setupCardAbilities() {
        this.persistentEffect({
            condition: (context) => context.source.isDishonored,
            effect: AbilityDsl.effects.cardCannot({
                cannot: 'target',
                restricts: 'opponentsEvents'
            })
        });
    }
}
