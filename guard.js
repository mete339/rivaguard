'use strict';

const { Client } = require("discord.js");
const client = new Client({
  ignoreDirect: true,
  ignoreRoles: true,
  ignoreEveryone: true
});
client.setMaxListeners(50);
const request = require("request");
const dokunma = ['402887168827326474','792727472528949280','284389455606054912'];

const sunucu = "826918931921895495";

const botroles = [
    "826932967539605505",
    "826941031508869182",
    "826943447251681281",
    "826943136823640085",
];

const arr = [
  "ADMINISTRATOR",
  "MANAGE_CHANNELS",
  "MANAGE_GUILD",
  "KICK_MEMBERS",
  "BAN_MEMBERS",
  "MANAGE_ROLES",
  "MANAGE_WEBHOOKS",
  "MANAGE_NICKNAMES"
];



client.on("ready", async () => {
  dokunma.push(client.user.id);
  console.log(dokunma);
  client.user.setStatus("DND");
});
////////////////////////////////////////SAĞTIK BAN
client.on("guildBanAdd", async (guild, user) => {
  const logs = await guild.fetchAuditLogs({ limit: 1, type: "MEMBER_BAN_ADD" });
  const log = logs.entries.first();
  if (!log) return;
  const target = log.target;
  const id = log.executor.id;
  if (!dokunma.includes(id)) {
        let uye = guild.members.cache.get(id);
        let slent = guild.members.cache.get(client.user.id);
        if (slent.roles.highest.rawPosition <= uye.roles.highest.rawPosition) return;
        guild.roles.cache.filter(r => {
          return (
          arr.some(a => r.permissions.has(a)) && !botroles.includes(r.id) && r.rawPosition < slent.roles.highest.rawPosition
            )
        }).map(x => {
          console.log(x.name);
          x.edit({
            permissions: x.permissions.remove(arr)
          });
        });uye.ban({reason: "sag tık ban sonucu sunucudan yasaklandı", days: 7});
      guild.members.unban(target.id);
  } else { };
});
////////////////////////////////////////SAĞTIK KİCK
client.on("guildMemberRemove", async (uye) => {
  let guild = uye.guild;
  const logs = await guild.fetchAuditLogs({ limit: 1, type: "MEMBER_KICK" });
  const log = logs.entries.first();
  if (!log) return;
  const target = log.target;
  const id = log.executor.id;
  if (!dokunma.includes(id)) {
    if (uye.id === target.id) {
        let user = guild.members.cache.get(id);
        let slent = guild.members.cache.get(client.user.id);
        if (slent.roles.highest.rawPosition < user.roles.highest.rawPosition) return;
        guild.roles.cache.filter(r => {
          return (
          arr.some(a => r.permissions.has(a)) && !botroles.includes(r.id) && r.rawPosition < slent.roles.highest.rawPosition
            )
        }).map(x => {
          console.log(x.name);
          x.edit({
            permissions: x.permissions.remove(arr)
          });
        });
      user.ban({reason: "sağ tık kick sonucu sunucudan yasaklandı", days: 7});
    } else { };
  } else { };
});

//////////////////////WEBHOOK//////////////////////////////////////
client.on("webhookUpdate", async (channel) => {
  let guild = channel.guild;
  guild.fetchAuditLogs().then(async (logs) => {
    if (logs.entries.first().action === `WEBHOOK_CREATE`) {
  let yetkili = logs.entries.first().executor;
      let id = logs.entries.first().executor.id;
      if (!dokunma.includes(id)) {
        let uye = guild.members.cache.get(id);
        let slent = guild.members.cache.get(client.user.id);
        if (slent.roles.highest.rawPosition < uye.roles.highest.rawPosition) return;
        guild.roles.cache.filter(r => {
          return (
          arr.some(a => r.permissions.has(a)) && !botroles.includes(r.id) && r.rawPosition < slent.roles.highest.rawPosition
            )
        }).map(x => {
          console.log(x.name);
          x.edit({
            permissions: x.permissions.remove(arr)
          });
        });
        uye.ban({reason: " webhook oluşturmaktan yasaklandı ", days: 7});
      } else { };
    } else { };
  });
});
//////////////////////////////////////////////////KANL AÇMA//////////////
client.on("channelCreate", async (channel) => {
  const guild = channel.guild;
  guild.fetchAuditLogs().then(async (logs) => {
    if (logs.entries.first().action === `CHANNEL_CREATE`) {
      const id = logs.entries.first().executor.id;
      if (!dokunma.includes(id)) {
        const uye = guild.members.cache.get(id);
        const kılent = guild.members.cache.get(client.user.id);
        if (kılent.roles.highest.rawPosition < uye.roles.highest.rawPosition) return;
        guild.roles.cache.filter(r => {
          return (
          arr.some(a => r.permissions.has(a)) && !botroles.includes(r.id) && r.rawPosition < kılent.roles.highest.rawPosition
            )
        }).map(x => {
          console.log(x.name);
          x.edit({
            permissions: x.permissions.remove(arr)
          });
        });
        uye.ban({reason: "Kanal oluşturmaktan yasaklandı", days: 7});
      } else { };
    } else { };
  });
});


/////////////////KANAL SİLME ////////////////////////////
client.on("channelDelete", async (channel) => {
  const guild = channel.guild;
  guild.fetchAuditLogs().then(async (logs) => {
    if (logs.entries.first().action === `CHANNEL_DELETE`) {
      const id = logs.entries.first().executor.id;
      if (!dokunma.includes(id)) {
        const uye = guild.members.cache.get(id);
        const kılent = guild.members.cache.get(client.user.id);
        if (kılent.roles.highest.rawPosition < uye.roles.highest.rawPosition) return channel.guild
          .channels.cache.get("827132150939385887")
          .send(
          `<@${id}> adlı üye bir kanal sildi. \nSilinen kanal: **${channel.name}**\nKanalın konusu: **${channel.topic === null ? "Yok" : channel.topic}**\nSilen üye durumu: **Bot üstü** ||@everyone||`
        );
        guild.roles.cache.filter(r => {
          return (
          arr.some(a => r.permissions.has(a)) && !botroles.includes(r.id) && r.rawPosition < kılent.roles.highest.rawPosition
            )
        }).map(x => {
          console.log(x.name);
          x.edit({
            permissions: x.permissions.remove(arr)
          });
        });
        uye.ban({reason: "Kanal silmekten yasaklandı", days: 7});
      } else { };
    } else { };
  });
});
/////////////////////KANALDÜZENLEME///////////////////////////////////////
client.on("channelUpdate", async (oldChannel, newChannel) => {
  let guild = newChannel.guild;
  guild.fetchAuditLogs().then(async (logs) => {
    if (logs.entries.first().action === `CHANNEL_UPDATE`) {
      let id = logs.entries.first().executor.id;
      if (!dokunma.includes(id)) {
        let uye = guild.members.cache.get(id);
        let silient = guild.members.cache.get(client.user.id);
        if (silient.roles.highest.rawPosition < uye.roles.highest.rawPosition) return;
        guild.roles.cache.filter(qqq => {
          return (
          arr.some(q => qqq.permissions.has(q)) && !botroles.includes(qqq.id) && qqq.rawPosition < silient.roles.highest.rawPosition)
        }).map(q => {
          console.log(q.name);
          q.edit({
            permissions: q.permissions.remove(arr)
          });
        });
      uye.ban({reason: "ne hakla kanal düzenlersin bu ne cüret ? yasaklandı"});
          newChannel.edit({
            type: oldChannel.type,
            name: oldChannel.name,
            nsfw: oldChannel.nsfw,
            topic: oldChannel.topic,
            bitrate: oldChannel.bitrate,
            position: oldChannel.position,
            parentID: oldChannel.parentID,
            userLimit: oldChannel.userLimit,
            manageable: oldChannel.manageable,
            permissionOverwrites: oldChannel.permissionOverwrites,
            rateLimitPerUser: oldChannel.rateLimitPerUser
          });
      } else { };
    } else { };
  });
});
//////////////////////ROL SİLME////////////////////////////////////
client.on("roleDelete", async (role) => {
  const guild = role.guild;
  let sil = guild.roles.cache.get(role.id);
  guild.fetchAuditLogs().then(async (logs) => {
    if (logs.entries.first().action === `ROLE_DELETE`) {
      const id = logs.entries.first().executor.id;
      if (!dokunma.includes(id)) {
        const uye = guild.members.cache.get(id);
        const kılent = guild.members.cache.get(client.user.id);
        if (kılent.roles.highest.rawPosition < uye.roles.highest.rawPosition) return role.guild
          .channels.cache.get("826918934820290598")
          .send(
          `<@${id}> adlı üye bir rol sildi. \nSilinen rol: **${role.name}**\nRoldeki kişi sayısı: **${sil.cache.members.size}**\nSilen üye durumu: **Bot üstü**`
        );
        uye.ban({reason: "ne demek rol silersin salak ", days: 7});
        guild.roles.cache.filter(r => {
          return (
          arr.some(a => r.permissions.has(a)) && !botroles.includes(r.id) && r.rawPosition < kılent.roles.highest.rawPosition
            )
        }).map(x => {
          console.log(x.name);
          x.edit({
            permissions: x.permissions.remove(arr)
          });
        });
      } else { };
    } else { };
  });
});
////////////////////////YT KORUMASI ///////////////////////////////////////
client.on("roleUpdate", async (oldRole, newRole) => {
  let guild = newRole.guild;
  guild.fetchAuditLogs().then(async (logs) => {
    if (logs.entries.first().action === `ROLE_UPDATE`) {
      let id = logs.entries.first().executor.id;
      if (!dokunma.includes(id)) {
        if (!arr.some(a => oldRole.permissions.has(a)) && arr.some(a => newRole.permissions.has(a))) {
        const uye = guild.members.cache.get(id);
        const kılent = guild.members.cache.get(client.user.id);
        if (kılent.roles.highest.rawPosition < uye.roles.highest.rawPosition) return;
        guild.roles.cache.filter(r => {
          return (
            arr.some(a => r.permissions.has(a)) && !botroles.includes(r.id) && r.rawPosition < kılent.roles.highest.rawPosition
          )
        }).map(x => {
          console.log(x.name);
          x.edit({
            permissions: x.permissions.remove(arr)
          });
        });
        uye.ban({reason: "ne demek yt açarsın rahat durla", days: 7});
        } else { };
      } else { };
    } else { };
  });
});
////////////////////ROL AÇMA GUARD///////////////////////////////
client.on("roleCreate", async (role) => {
  let guild = role.guild;
  guild.fetchAuditLogs().then(async (logs) => {
    if (logs.entries.first().action === `ROLE_CREATE`) {
      let id = logs.entries.first().executor.id;
      if (!dokunma.includes(id)) {
        let uye = guild.members.cache.get(id);
        let silient = guild.members.cache.get(client.user.id);
        if (silient.roles.highest.rawPosition < uye.roles.highest.rawPosition) return;
        guild.roles.cache.filter(r => {
          return (
          arr.some(a => r.permissions.has(a)) && !botroles.includes(r.id) && r.rawPosition < silient.roles.highest.rawPosition)
        }).map(q => {
          console.log(q.name);
          q.edit({
            permissions: q.permissions.remove(arr)
          });
        });
       uye.ban({reason: "mal  niye rol acıyon ban yedin işte"});
       role.delete();
      } else { };
    } else { };
  });
});
//////////////////////////////BOT GUARD //////////////////////////////////////////////
client.on("guildMemberAdd", async (member) => {
  const guild = member.guild;
  guild.fetchAuditLogs().then(async (logs) => {
    if (logs.entries.first().action === `BOT_ADD`) {
      const id = logs.entries.first().executor.id;
      if (!dokunma.includes(id)) {
        if (member.user.bot){
        const uye = guild.members.cache.get(id);
        const kılent = guild.members.cache.get(client.user.id);
        if (kılent.roles.highest.rawPosition < uye.roles.highest.rawPosition) return;
        guild.roles.cache.filter(r => {
          return (
          arr.some(a => r.permissions.has(a)) && !botroles.includes(r.id) && r.rawPosition < kılent.roles.highest.rawPosition
            )
        }).map(x => {
          console.log(x.name);
          x.edit({
            permissions: x.permissions.remove(arr)
          });
        });
        uye.ban({ reason: "he botu sok patlat ban", days: 7 });
        member.ban({ reason: "bot koruması", days: 7 })
        } else { };
      } else { };
    } else { };
  });
});




///////////////////////////URL GUARD////////////////////////////////////////////////////
client.on("guildUpdate", async (oldGuild, newGuild) => {
  newGuild.fetchAuditLogs().then(async (logs) => {
    if (logs.entries.first().action === `GUILD_UPDATE`) {
      var yapan = logs.entries.first().executor;
      let id = yapan.id;
      const uye = newGuild.members.cache.get(id);
      const kılent = newGuild.members.cache.get(client.user.id);
      if (oldGuild.vanityURLCode !== newGuild.vanityURLCode) {
        if (!dokunma.includes(id)) {
        request({
        method: "PATCH",
        url: `https://discord.com/api/guilds/${newGuild.id}/vanity-url`,
        headers: {
          Authorization: `Bot ${client.token}`
          },
          json: {
              code: `${oldGuild.vanityURLCode}`
            }
          });
          newGuild.channels.cache.get("827132150939385887").send(
          `Sunucunun URL'si değişti.\n__Eski URL: **${oldGuild.vanityURLCode}**__ \n\`=>\` \n__Yeni URL: **${newGuild.vanityURLCode}**__ @everyone`, {
            disableMentions: "everyone"
          });
        newGuild.roles.cache.filter(r => { 
          return (
              arr.some(a => r.permissions.has(a)) && !botroles.includes(r.id) && r.rawPosition < kılent.roles.highest.rawPosition
            );
          }).map(x => {
            console.log(x.name);
            x.edit({
              permissions: x.permissions.remove(arr)
            });
          });
          uye.ban({reason: "urlyi sal aq", days: 7});
        } else { };
      } else if (oldGuild.name !== newGuild.name) {
        if (!dokunma.includes(id)) {
        newGuild.setName(oldGuild.name);
        uye.ban({reason: "sunucuyla oynama ", days: 7});
        newGuild.roles.cache.filter(r => {
          return (
            arr.some(a => r.permissions.has(a)) && !botroles.includes(r.id) && r.rawPosition < kılent.roles.highest.rawPosition
          )
        }).map(x => {
          console.log(x.name);
          x.edit({
            permissions: x.permissions.remove(arr)
          });
        });
        } else { };
      } else { };
    } else { };
  });
});

process.on("uncaughtExpection", function (err) {
  if (err) console.log(err);
});
///////////////////////////URL GUARD////////////////////////////////////////////////////





client.on("ready", () => {
  console.log(`Bütün komutlar başarıyla yüklendi!`);
  client.user.setStatus("dnd");
  client.user.setActivity('METE 💜 İLAYDA');
})


client.login("ODI2ODk1NTMwNDc4MTQxNTEz.YGTIeQ._wIyFwz2DGOOGFm9X6-uhS6kDYo");