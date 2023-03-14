import {SlashCommandBuilder, EmbedBuilder} from 'discord.js'
import {useAppStore} from '../../store/app'

const appStore = useAppStore()
export const command = new SlashCommandBuilder()

.setName('伺服器資訊')
.setDescription('關於本伺服器的一些資訊')

export const action = async (interaction) =>{
  const memberCount = "`"+`${interaction.guild.memberCount}`+"`"
    const serverEmbed = new EmbedBuilder()
      .setColor('#e33132')
      .setTitle(`${interaction.guild}`)
      .setDescription(`**關於本伺服器的一些資訊** 💌`)
      .addFields(   
        { name: '伺服器人數 <:user:1085144531399356518>', value:  `${memberCount}`,inline: true},
        { name: '伺服器擁有者 <a:blackcard:1084382431349579907>', value: `<@${interaction.guild.ownerId}>`,inline: true},
        { name: '創建時間 <:time:1085145666445135924>', value:  `<t:${Math.floor(interaction.guild.createdTimestamp / 1000)}:R>` ,inline: true},
        { name: '伺服器ID <:idcard:1085144829308186685>', value:  "`"+`${interaction.guild.id}`+"`",inline: true},
      )
      .setTimestamp()
      .setFooter({text: '@2023 KOSHKA-LENGEND', iconURL: 'https://i.imgur.com/clEn73Q.gif'});
      
    interaction.reply({ embeds: [serverEmbed] });
}