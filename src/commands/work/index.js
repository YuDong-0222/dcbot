import {SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, Embed, SelectMenuBuilder, ComponentType} from 'discord.js'
import {useAppStore} from '../../store/app'
import ecoSchema from '../../Schemas/ecoSchema'
import { StringSelectMenuBuilder } from '@discordjs/builders'

export const command = new SlashCommandBuilder()
.setName('job')
.setDescription('經濟系統-打工指令(BETA版)')
.addSubcommand(cmd=>
  cmd
  .setName('找工作')
  .setDescription('在打工之前,都需要一份工作.收國中畢業,這不看學歷.')
  )

export const action = async (interaction) =>{
  try {
    const appStore = useAppStore()
    const client = appStore.client;
    const {user} = interaction
    let Data = ecoSchema.findOne({Guild: interaction.guild.id, User: user.id});
    if(!Data) return await interaction.reply({content: `<a:wrong:1085174299628929034>丨你無法進行打工 <:jobs:1088446692262674492> \n因為你沒有帳戶`, ephemeral: true});
    
    const jobs =[
      {
        name: "老師",
        worktime: "5", //分鐘
        description: "師者,所以傳道授業解惑也",
      },
      // {
      //   name: "漁夫",
      //   worktime: "15", //5分鐘冷卻]
      //   description: "夫以狩魚為主,觀景為輔,乘舟而搏",
      // }
    ];

    const firstMsg = new EmbedBuilder()
      .setColor('Random')
      .setTitle('<:jobs:1088446692262674492>丨工作列表')
      .setDescription("📄 請查看以下資訊") 
      .setTimestamp()

      const jobSelect = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
        .setCustomId('job-menu')
        .setPlaceholder(`📃8964苦力銀行 - 工作查詢`)
        .addOptions(
          jobs.map(job=>({
            label: job.name,
            value: job.name,
            description: job.description,
          }))
        )
      )
    const selectionRespond = await interaction.reply({embeds: [firstMsg], components: [jobSelect]})
    const collector = await selectionRespond.createMessageComponentCollector({ ComponentType: ComponentType.StringSelect, ComponentType: ComponentType.Button})
    collector.on("collect", async (i)=>{
        if (i.customId === "job-menu") {
          const value = i.values[0]
          const lastMsg = new EmbedBuilder()
          .setColor('Green')
          .setTitle('<a:48:1086689450714730506>丨打工開始!')
          .setDescription(`📄 你已選擇${i.value}`) 
          .setTimestamp()

          if(value === ("老師")){
            console.log(`valuie: ${i.values}`);
            const teacher = new EmbedBuilder()
              .setColor('Random')
              .setTitle('<:jobs:1088446692262674492> - 老師')
              .setDescription("📄 請查看以下資訊") 
              .addFields({
                name:`工作名稱 - ${i.values}`,
                value: '(暫定) 老師\n開課 由群組人員進來聽課數量為主\n 越多人錢越多\n工作時間5分鐘'
              })
              .setTimestamp()
              try {
                  const btn = new ActionRowBuilder()
                  .addComponents(
                    new ButtonBuilder()
                    .setCustomId('tea')
                    .setLabel('選擇此工作')
                    .setStyle(ButtonStyle.Success)
                  )
                i.reply({embeds: [teacher], ephemeral: true, components: [btn]})
                collector.on("collect", async (b)=> {
                  if(b.customId === "tea") {
                    return i.editReply({components: [], embeds: [lastMsg]})
                  }
                })
              } catch (error) {
                console.log(`有錯誤!: ${error}`);
              }
          }
        }
    })
    
  } catch (error) {
    console.log(`/打工 有錯誤: ${error}`);
    const errorCode = new EmbedBuilder()
    .setColor('Red')
    .setTitle('<a:Animatederror:1086903258993406003>丨不好!出現了錯誤')
    .setDescription("如果不能排除，請通知給作者!:") 
    .addFields({name: `錯誤訊息:`, value: "```"+`${error}`+"```"})
    .setTimestamp()  
    return await interaction.reply({embeds: [errorCode]})
  }
}