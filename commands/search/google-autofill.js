const { Command } = require('discord.js-commando');
const snekfetch = require('snekfetch');

module.exports = class GoogleAutofillCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'google-autofill',
			aliases: ['google-autocomplete', 'autofill', 'autocomplete'],
			group: 'search',
			memberName: 'google-autofill',
			description: 'Responds with a list of the Google Autofill results for a particular query.',
			args: [
				{
					key: 'query',
					prompt: 'What would you like to search for?',
					type: 'string'
				}
			]
		});
	}

	async run(msg, { query }) {
		try {
			const { raw } = await snekfetch
				.get('https://suggestqueries.google.com/complete/search')
				.query({
					client: 'firefox',
					q: query
				});
			const data = JSON.parse(raw.toString())[1];
			if (!data.length) return msg.say('Could not find any results.');
			return msg.say(data.join('\n'));
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};
