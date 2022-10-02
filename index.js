const { Client, GatewayIntentBits } = require('discord.js')
const dotenv = require('dotenv')

const { addAttendance, getAttendanceByDate } = require('./db/attendance')
const { toTable } = require('./utils')

dotenv.config()
const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.once('ready', () => {
  console.log('Ready!')
})

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return

  const { commandName } = interaction

  if (commandName === 'list') {
    const cohort = interaction.channel.parent.name
    const rows = await getAttendanceByDate(cohort, new Date())
    const table = toTable(rows)
    await interaction.reply({
      content: '```here' + table.toString() + '```',
      ephemeral: true,
    })
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

    try {
      await addAttendance(data)
      await interaction.reply({
        content: 'Kia pai te ra 😄',
        ephemeral: true,
      })
    } catch (error) {
      console.error(error)
      await interaction.reply({
        content: 'Something went wrong',
        ephemeral: true,
      })
    }
  }
})

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN)
