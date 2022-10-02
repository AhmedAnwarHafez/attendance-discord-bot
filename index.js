// Require the necessary discord.js classes
const { Client, GatewayIntentBits } = require('discord.js')
const dotenv = require('dotenv')

dotenv.config()
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] })

// When the client is ready, run this code (only once)
client.once('ready', () => {
  console.log('Ready!')
})

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return

  const { commandName } = interaction
  console.log(JSON.stringify(interaction.member, null, 2))

  if (commandName === 'list') {
    await interaction.reply({ content: 'Pong!', ephemeral: true })
  } else if (commandName === 'attend') {
    const nickname =
      interaction.member.displayName || interaction.member.nickname
    const userId = interaction.user.id
    const cohort = interaction.channel.parent.name

    const data = {
      cohort,
      nickname,
      userId,
    }

    // do something with data

    await interaction.reply({
      content: 'Kia pai te ra 😄',
      ephemeral: true,
    })
  }
})

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN)
