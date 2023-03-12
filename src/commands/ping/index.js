import {SlashCommandBuilder} from 'discord.js'
import {useAppStore} from '../../store/app'

export const command = new SlashCommandBuilder()
.setName('延遲')
.setDescription('取得機器人的延遲')

export const action = async (interaction) =>{
  const appStore = useAppStore()
  const client = appStore.client;
  const sent = await interaction.reply({ content: '正在取得延遲🤔...', fetchReply: true });
  interaction.editReply(`<:Concerned:1084371918955753552> - 延遲: **${sent.createdTimestamp - interaction.createdTimestamp} ms**`);
}
