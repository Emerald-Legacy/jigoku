describe('Agasha Ayako', function () {
    integration(function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'dynasty',
                player1: {
                    inPlay: ['agasha-swordsmith', 'kitsuki-chiari', 'enigmatic-magistrate'],
                    dynastyDiscard: ['agasha-ayako']
                },
                player2: {
                    inPlay: [],
                    hand: []
                }
            });

            this.agashaAyako = this.player1.placeCardInProvince('agasha-ayako');

            this.chiari = this.player1.findCardByName('kitsuki-chiari');
            this.player1.player.moveCard(this.chiari, 'dynasty deck');
            this.swordsmith = this.player1.findCardByName('agasha-swordsmith');
            this.player1.player.moveCard(this.swordsmith, 'dynasty deck');
            this.enigmaticMagistrate = this.player1.findCardByName('enigmatic-magistrate');
            this.player1.player.moveCard(this.enigmaticMagistrate, 'dynasty deck');
        });

        it('should trigger when it enters play', function () {
            expect(this.player1).toHavePrompt('Play cards from provinces');
            this.player1.clickCard(this.agashaAyako);
            this.player1.clickPrompt('0');
            expect(this.player1).toHavePrompt('Triggered Abilities');
            expect(this.player1).toBeAbleToSelect(this.agashaAyako);
        });

        it('should prompt to select a 2 cost non-unique character', function () {
            this.player1.clickCard(this.agashaAyako);
            this.player1.clickPrompt('0');
            this.player1.clickCard(this.agashaAyako);

            expect(this.player1).toHavePrompt('Choose a character to play');
            expect(this.player1).toHavePromptButton('Agasha Swordsmith');
            expect(this.player1).not.toHavePromptButton('Enigmatic Magistrate');
            expect(this.player1).not.toHavePromptButton('Kitsuki Chiari');
        });

        it('plays the character costing 1 less', function () {
            this.player1.clickCard(this.agashaAyako);
            this.player1.clickPrompt('0');
            this.player1.clickCard(this.agashaAyako);

            const initialFate = this.player1.fate;
            expect(this.player1).toHavePrompt('Choose a character to play');
            expect(this.player1).toHavePromptButton('Agasha Swordsmith');
            expect(this.player1).not.toHavePromptButton('Enigmatic Magistrate');
            expect(this.player1).not.toHavePromptButton('Kitsuki Chiari');

            this.player1.clickPrompt('Agasha Swordsmith');
            expect(this.player1).toHavePrompt('Agasha Swordsmith');

            this.player1.clickPrompt('1');
            expect(this.swordsmith.location).toBe('play area');
            expect(this.swordsmith.fate).toBe(1);
            expect(this.player1.fate).toBe(initialFate - 2);
        });
    });
});
