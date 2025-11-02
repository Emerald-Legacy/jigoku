import AbilityDsl from '../../../abilitydsl';
import DrawCard from '../../../drawcard';

export default class AsahinaMomoko extends DrawCard {
    static id = 'asahina-momoko';

    setupCardAbilities() {
        this.reaction({
            title: 'Gain 1 honor',
            when: {
                onCardPlayed: (event, context) => event.player === context.player && event.card.hasTrait('spell')
            },
            gameAction: AbilityDsl.actions.gainHonor(),
            limit: AbilityDsl.limit.perRound(2)
        });
    }
}
