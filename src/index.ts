//Start of paste-ing, npm i dotenv, discord.js@13, superagent
import dotenv from 'dotenv'; //Importer cocmme une variable
import { Client, Intents, Collection } from 'discord.js'; //Importer les fonctions directement
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9'
import superagent from 'superagent';

dotenv.config()

import ping from './commands/ping';

const COMMANDS = [ping.data.toJSON()];

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MEMBERS, 
        Intents.FLAGS.GUILD_BANS, 
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, 
        Intents.FLAGS.GUILD_INTEGRATIONS, 
        Intents.FLAGS.GUILD_WEBHOOKS, 
        Intents.FLAGS.GUILD_INVITES, 
        Intents.FLAGS.GUILD_VOICE_STATES, 
        Intents.FLAGS.GUILD_PRESENCES, 
        Intents.FLAGS.GUILD_MESSAGES, 
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING, 
        Intents.FLAGS.DIRECT_MESSAGES, 
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, 
        Intents.FLAGS.DIRECT_MESSAGE_TYPING, 
        Intents.FLAGS.GUILD_SCHEDULED_EVENTS
    ]
});
const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN as string);

async function main() {
    //Login et setup le bot
    client.login(process.env.BOT_TOKEN as string)

    try {
        await rest.put(
            Routes.applicationCommands(process.env.ID as string),
            {body: COMMANDS }
        )
    } catch (err) {
        console.log(err)
    }
}

main()