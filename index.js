const { Client, GatewayIntentBits } = require('discord.js')

const { addAttendance, getAttendanceByDate } = require('./db/attendance')
const dotenv = require('dotenv')

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
    const attendances = await getAttendanceByDate(cohort, new Date())
    console.log(attendances)
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

    const { error } = await addAttendance(data)

    if (error) {
      console.error(error)
      await interaction.reply({
        content: 'Something went wrong',
        ephemeral: true,
      })
    }
    await interaction.reply({
      content: 'Kia pai te ra 😄',
      ephemeral: true,
    })
  }
})

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN)
