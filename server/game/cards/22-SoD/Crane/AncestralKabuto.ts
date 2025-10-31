import AbilityDsl from '../../../abilitydsl';
import DrawCard from '../../../drawcard';

export default class AncestralKabuto extends DrawCard {
    static id = 'ancestral-kabuto';

    public setupCardAbilities() {
        this.attachmentConditions({ trait: 'bushi' });

        this.whileAttached({
            match: card => card.isDishonored,
            effect: AbilityDsl.effects.setGlory(0)
        });
    }
}
