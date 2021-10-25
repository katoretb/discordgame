const config = require("./config.json");
const Discord = require("discord.js")
const client = new Discord.Client();
const fetch = require("node-fetch");
const TicTacToe = require('discord-tictactoe');
const game = new TicTacToe({ language: 'th' })


/*console  log bot status---------------------------------------------------------------------------*/
client.once("ready", () => {
    console.log("---------------------------------------");
    console.log("|        <--Maker credit-->           |");
    console.log("|          KatoreTV#5571              |");
    console.log("---------------------------------------");
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setStatus('Online');
    client.user.setActivity( config.prefix + 'help เพื่อดูคำสั่ง');
  });
  
client.once("reconnecting", () => {
  console.log("Reconnecting!");
});
  
client.once("disconnect", () => {
  console.log("Disconnect!");
});
/*---------------------------------------------------------------------------*/



async function normalembed(message, embedtext){
    message.channel.send(
      new Discord.MessageEmbed()
      .setColor(color)
      .setTitle(botname)
      .setDescription(embedtext)
    );
  }

const app = {
    "yt": "755600276941176913",
    "fish": "814288819477020702",
    "citp": "832012774040141894",
    "bty": "773336526917861400",
    "pn": "755827207812677713"
}

async function ac(act, message){
    if (!message.member.voice.channel) return normalembed(message, "เข้าไปห้องคุยแบบเสียงก่อนสิเดียวเปิดเพลงให้");
    let activityid = ""
    if (act == "ytt"){
        activityid = app.yt
    }else if(act == "fish"){
        activityid = app.fish
    }else if(act == "chess"){
        activityid = app.citp
    }else if(act == "betrayal"){
        activityid = app.bty
    }else if(act == "poker"){
        activityid = app.pn
    }else{
        return;
    }
    fetch(`https://discord.com/api/v8/channels/${message.member.voice.channel.id}/invites`, {
        method: "POST",
        body: JSON.stringify({
            max_age: 1800,
            max_uses: 0,
            target_application_id: activityid,
            target_type: 2,
            temporary: false,
            validate: null
        }),
        headers: {
            "Authorization": `Bot ${config.token}`,
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
    .then(invite =>{
        if(!invite.code) return message.reply(":x: เกิดข้อผิดพลาดในการสร้างห้อง")
        message.channel.send(`คลิกที่ลิ้งเพื่อเริ่มกิจกรรม:\n> https://discord.com/invite/${invite.code}`)
    })
}

client.on("message", async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;
    if (message.content.startsWith(`${config.prefix}`)){
        const commans = message.content.split(" ");
        commans[0] = commans[0].substring(1);
        if(commans[0] == "ttt" || commans[0] == "xo"){
            game.handleMessage(message);
        }else if(commans[0] == "help"){
            message.channel.send(
            new Discord.MessageEmbed()
                .setColor("#e04343")
                .setTitle("OuixZ")
                .setThumbnail("https://www.pngkey.com/png/full/205-2054169_support-icon-png-for-kids-can-i-help.png")
                .setDescription(message.author.toString())
                .addFields(
                    { name: 'สร้างห้อง youtube together', value: config.prefix + "ytt"},
                    { name: 'สร้างห้อง เกมตกปลา', value: config.prefix + "fish"},
                    { name: 'สร้างห้อง หมากรุก', value: config.prefix + "chess"},
                    { name: 'สร้างห้อง betrayal', value: config.prefix + "betrayal"},
                    { name: 'สร้างห้อง โปกเกอร์', value: config.prefix + "poker"},
                    { name: 'เล่นเกม ❌⭕️', value: config.prefix + "ttt, " + config.prefix + "xo"}
                )
            );
            return;
        }else if(commans[0] == "ytt"){
            ac("ytt", message)
        }else if(commans[0] == "fish"){
            ac("fish", message)
        }else if(commans[0] == "chess"){
            ac("chess", message)
        }else if(commans[0] == "betrayal"){
            ac("betrayal", message)
        }else if(commans[0] == "poker"){
            ac("poker", message)
        }
    }
})

client.login(config.token)