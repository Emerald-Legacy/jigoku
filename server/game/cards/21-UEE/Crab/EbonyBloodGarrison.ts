import { StrongholdCard } from '../../../StrongholdCard';
import AbilityDsl from '../../../abilitydsl';
import { CardTypes, Locations, Phases, Players } from '../../../Constants';
import { ProvinceCard } from '../../../ProvinceCard';

const MY_PROVINCE = 'myProvince';
const OPP_PROVINCE = 'oppProvince';

export default class EbonyBloodGarrison extends StrongholdCard {
    static id = 'ebony-blood-garrison';

    setupCardAbilities() {
        this.reaction({
            title: 'Break a province from each player',
            when: {
                onPhaseEnded: (event, context) => event.phase === Phases.Dynasty && context.game.roundNumber === 1
            },
            cost: AbilityDsl.costs.bowSelf(),
            targets: {
                [MY_PROVINCE]: {
                    controller: Players.Self,
                    cardType: CardTypes.Province,
                    location: Locations.Provinces,
                    cardCondition: (card: ProvinceCard) =>
                        card.facedown && card.location !== Locations.StrongholdProvince
                },
                [OPP_PROVINCE]: {
                    dependsOn: MY_PROVINCE,
                    controller: Players.Opponent,
                    cardType: CardTypes.Province,
                    location: Locations.Provinces,
                    cardCondition: (card: ProvinceCard) =>
                        card.facedown && card.location !== Locations.StrongholdProvince
                }
            },
            gameAction: AbilityDsl.actions.sequentialContext((context) => ({
                gameActions: [
                    AbilityDsl.actions.reveal({ target: context.targets[MY_PROVINCE] }),
                    AbilityDsl.actions.breakProvince({ target: context.targets[MY_PROVINCE] }),
                    AbilityDsl.actions.reveal({ target: context.targets[OPP_PROVINCE] }),
                    AbilityDsl.actions.breakProvince({ target: context.targets[OPP_PROVINCE] }),
                    AbilityDsl.actions.draw({ target: context.player, amount: 1 }),
                    AbilityDsl.actions.gainFate({ target: context.player, amount: 1 })
                ]
            })),
            effect: 'drag {1} into chaos',
            effectArgs: (context) => [context.player.opponent]
        });
    }
}
