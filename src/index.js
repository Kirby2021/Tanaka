const { MessageEmbed, WebhookClient } = require('discord.js');
const KeyvProvider = require('commando-provider-keyv');
const { htmlToText } = require('html-to-text');
const Client = require('./Structures/Client');
const path = require('path');

const client = new Client();

client.setProvider(new KeyvProvider(client.db));

client.registry
	.registerDefaultTypes()
	.registerGroups([
		{ id: 'util', name: 'Utility', guarded: true },
		{ id: 'random', name: 'Random Response' },
		{ id: 'info', name: 'Information' },
		{ id: 'search', name: 'Search' },
		{ id: 'remind', name: 'Reminder' },
		{ id: 'anime-updates', name: 'Anime Updates' },
		{ id: 'codebin', name: 'Code Bins' },
		{ id: 'img', name: 'Image Manipulation' },
		{ id: 'music', name: 'Music' },
	])
	.registerDefaultGroups()
	.registerDefaultCommands({
		unknownCommand: false,
		help: false,
		eval: false,
		ping: false,
	})
	.registerTypesIn(path.join(__dirname, 'Types'))
	.registerCommandsIn(path.join(__dirname, 'Commands'));

client.once('ready', async () => {
	client.setTimeout(() => client.manager.init(client.user.id), 5000);

	await client.timers.fetchAll();

	const userCount = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0);
	const commandCount = client.registry.commands.size;
	const guildCount = client.guilds.cache.size;

	const statuses = [
		`${userCount} users`,
		`${commandCount} commands`,
		`${guildCount} guilds`,
		'https://tanaka.1chi.tk',
	];

	const status = `t!help | ${statuses[Math.floor(Math.random() * statuses.length)]}`;

	client.setInterval(() => client.user.setActivity(status, { type: 'WATCHING' }), 30000);

	client.logger.info(`Logged in as ${client.user.tag}.`);
});

client.on('debug', client.logger.debug);

client.on('error', (e) => client.logger.error(e.stack));

client.on('raw', (d) => client.manager.updateVoiceState(d));

client.db.on('error', (e) => client.logger.error(e));

client.rss.on('item:new:anime', async (item) => {
	for (let [, guild] of client.guilds.cache) {
		if (!guild.available) guild = await client.guilds.fetch(guild.id);
		const data = await client.db.get(`animeUpdates-${guild.id}`);

		if (data === null) return false;

		const hook = new WebhookClient(data.id, data.token);
		const embed = new MessageEmbed()
			.setTitle(`**${item.title}**`)
			.setDescription(htmlToText(item.description))
			.setURL(item.link)
			.setColor('RANDOM')
			.setImage('https://i.imgur.com/R3JCtNK.jpg')
			.setTimestamp();

		hook.send(embed);
	}
});

client.manager.on('nodeConnect', (node) => client.logger.info(`Node "${node.options.identifier}" connected.`));

client.manager.on('nodeError', (node, error) =>
	client.logger.error(`Node "${node.options.identifier}" encountered an error: ${error.message}.`),
);

client.manager.on('trackStart', (player, track) => {
	const channel = client.channels.cache.get(player.textChannel);

	channel.send(`Now playing: \`${track.title}\`, requested by ${track.requester.tag}`);
});

client.manager.on('queueEnd', (player) => {
	const channel = client.channels.cache.get(player.textChannel);

	const embed = new MessageEmbed({ description: 'The queue has ended.', color: 'RANDOM' });

	channel.send(embed);
	player.destroy();
});

client.login();

module.exports = client;
