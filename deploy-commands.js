const { REST, SlashCommandBuilder, Routes } = require('discord.js')
const dotenv = require('dotenv')

dotenv.config()
const clientId = process.env.DISCORD_CLIENTID
const guildId = process.env.DISCORD_SERVERID
const token = process.env.DISCORD_TOKEN

const commands = [
  new SlashCommandBuilder().setName('attend').setDescription("I've arrived"),
  new SlashCommandBuilder()
    .setName('/list')
    .setDescription('List students and their attendance status'),
].map((command) => command.toJSON())

console.log(commands)
const rest = new REST({ version: '10' }).setToken(token)

rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then((data) => {
    console.log(`Successfully registered ${data.length} application commands.`)
  })
  .catch(console.error)

// rest
//   .delete(
//     Routes.applicationGuildCommand(clientId, guildId, '1025949360430780449')
//   )
//   .then(() => console.log('Successfully deleted guild command'))
//   .catch(console.error)
