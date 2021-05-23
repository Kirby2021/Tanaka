const { Intents, WebhookClient, Collection } = require('discord.js');
const { MongoDBProvider } = require('commando-provider-mongo');
const { CommandoClient } = require('discord.js-commando');
const TimerManager = require('./TimerManager');
const { execSync } = require('child_process');
const { MongoClient } = require('mongodb');
const { Database } = require('quickmongo');
const { Manager } = require('erela.js');
const OpenEval = require('open-eval');
const glob = require('glob-promise');
const Turndown = require('turndown');
const snoowrap = require('snoowrap');
const BotList = require('./BotList');
const logger = require('./Logger');
const Redis = require('./Redis');
const web = require('../Web');
const path = require('path');

module.exports = class Client extends CommandoClient {
	constructor(options) {
		super({
			commandPrefix: process.env.COMMAND_PREFIX,
			owner: process.env.OWNER_ID,
			intents: [Intents.NON_PRIVILEGED, Intents.FLAGS.GUILDS],
			partials: ['CHANNEL'],
			allowedMentions: {
				repliedUser: false,
				parse: ['roles', 'users'],
			},
			...options,
		});

		this.db = new Database(process.env.MONGO_URI, 'tanaka', {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		this.logger = logger;

		this.testWebhook = new WebhookClient(process.env.TEST_WEBHOOK_ID, process.env.TEST_WEBHOOK_TOKEN);

		this.redis = new Redis(this).db;

		this.timers = new TimerManager(this);

		this.converter = new Turndown();

		this.bl = new BotList(this);

		this.client = this;

		this.manager = new Manager({
			send: (id, payload) => {
				const guild = this.guilds.cache.get(id);

				if (guild) guild.shard.send(payload);
			},
		});

		this.events = new Collection();

		this.piston = new OpenEval();

		this.reddit = new snoowrap({
			userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2869.0 Safari/537.36',
			clientId: process.env.REDDIT_CLIENT_ID,
			clientSecret: process.env.REDDIT_CLIENT_SECRET,
			username: 'TomioCodes',
			password: process.env.REDDIT_PASSWORD,
		});
	}

	get ip() {
		const ip = execSync('curl https://ipecho.net/plain', { timeout: 30000, encoding: 'utf-8' });
		return ip;
	}

	get directory() {
		return `${path.dirname(require.main.filename)}${path.sep}`;
	}

	async userCount() {
		if (this.shard) {
			const count = await this.shard.broadcastEval(
				'this.guilds.cache.reduce((a, b) => a + b.memberCount, 0)',
			);

			return count.reduce((a, b) => a + b, 0);
		}

		return this.guilds.cache.reduce((a, b) => a + b.memberCount, 0);
	}

	async guildCount() {
		if (this.shard) {
			const count = await this.shard.fetchClientValues('guilds.cache.size');

			return count.reduce((a, b) => a + b, 0);
		}

		return this.guilds.cache.size;
	}

	async channelCount() {
		if (this.shard) {
			const count = await this.shard.fetchClientValues('channels.cache.size');

			return count.reduce((a, b) => a + b, 0);
		}

		return this.channels.cache.size;
	}

	async login(token = process.env.DISCORD_TOKEN) {
		this.registerCommands();
		web(this);

		await this.loadEvents();
		await this.registerProvider();

		return super.login(token);
	}

	async loadEvents() {
		const events = await glob(`${this.directory}Events/**/*.js`);

		for (const eventFile of events) {
			delete require.cache[eventFile];

			const File = require(eventFile);
			const event = new File(this.client);

			this.events.set(event.name, event);
			event.emitter[event.type](event.name, (...args) => event.run(...args));
		}
	}

	generateCommandList() {
		const list = this.registry.groups
			.map((g) => {
				const commands = g.commands.filter((c) => !c.hidden);
				return `\n<h3>${g.name}:</h3>\n\n<ul>${commands
					.map((c) => {
						const extra = `${c.ownerOnly ? ' (Owner-Only)' : ''}${
							c.nsfw ? ' (NSFW)' : ''
						}`;
						return `<li> <strong>${c.name}:</strong> ${c.description}${extra}</li>`;
					})
					.join('</ul>\n')}`;
			})
			.join('\n');

		return list;
	}

	registerCommands() {
		this.client.registry
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
				{ id: 'nsfw', name: 'NSFW' },
			])
			.registerDefaultGroups()
			.registerDefaultCommands({
				unknownCommand: false,
				help: false,
				eval: false,
				ping: false,
				commandState: false,
				prefix: false,
			})
			.registerTypesIn(path.join(__dirname, '..', 'Types'))
			.registerCommandsIn(path.join(__dirname, '..', 'Commands'));
	}

	async registerProvider() {
		const mongo = await MongoClient.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		this.setProvider(new MongoDBProvider(mongo, 'tanaka'));
	}
};
