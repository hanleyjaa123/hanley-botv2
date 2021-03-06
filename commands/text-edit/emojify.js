const { Command } = require('discord.js-commando');
const { letterTrans } = require('custom-translate');
const dictionary = require('../../assets/json/emojify');

module.exports = class EmojifyCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'emojify',
			aliases: ['regional-indicator'],
			group: 'text-edit',
			memberName: 'emojify',
			description: 'Converts text to emoji form.',
			args: [
				{
					key: 'text',
					prompt: 'What text would you like to convert to emoji?',
					type: 'string',
					validate: text => {
						if (letterTrans(text.toLowerCase(), dictionary, ' ').length < 2000) return true;
						return 'Invalid text, your text is too long.';
					},
					parse: text => text.toLowerCase()
				}
			]
		});
	}

	run(msg, { text }) {
		return msg.say(letterTrans(text, dictionary, ' '));
	}
};
