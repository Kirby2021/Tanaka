const Event = require('../Structures/Event');

module.exports = class ReadyEvent extends Event {
	constructor(...args) {
		super(...args, 'ready', { once: true });
	}

	async run() {
		this.client.setTimeout(() => this.client.manager.init(this.client.user.id), 5000);

		await this.client.timers.fetchAll();

		this.client.shard.shards.forEach((shard) => {
			this.client.setInterval(
				() =>
					this.client.user.setActivity(`t!help | Shard ${shard}`, {
						type: 'WATCHING',
						shardID: Number(shard),
					}),
				15000,
			);
		});

		this.client.logger.info(`Logged in as ${this.client.user.tag}.`);
	}
};
