const { Command } = require('discord.js-commando');
const snekfetch = require('snekfetch');
const { list } = require('../../util/Util');
const colors = require('../../assets/json/osu-signature');

module.exports = class OsuSignatureCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'osu-signature',
			aliases: ['osu-sig', 'osu-card'],
			group: 'image-edit',
			memberName: 'osu-signature',
			description: 'Creates a card based on an osu! user\'s stats.',
			clientPermissions: ['ATTACH_FILES'],
			args: [
				{
					key: 'user',
					prompt: 'What user would you like to create a signature for?',
					type: 'string'
				},
				{
					key: 'color',
					prompt: `What color should the signature be? Either ${list(Object.keys(colors), 'or')}.`,
					type: 'string',
					default: 'pink',
					validate: color => {
						if (colors[color.toLowerCase()]) return true;
						return `Invalid color, please enter either ${list(Object.keys(colors), 'or')}.`;
					},
					parse: color => colors[color.toLowerCase()]
				}
			]
		});
	}

	async run(msg, { user, color }) {
		try {
			const { body, raw } = await snekfetch
				.get('https://lemmmy.pw/osusig/sig.php')
				.query({
					colour: color,
					uname: user,
					pp: 2,
					flagshadow: '',
					flagstroke: '',
					darktriangles: '',
					opaqueavatar: '',
					onlineindicator: '',
					xpbar: ''
				});
			if (raw.toString().includes('<b>Warning</b>')) return msg.say('Could not find any results.');
			return msg.say({ files: [{ attachment: body, name: 'osu-signature.png' }] });
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};
