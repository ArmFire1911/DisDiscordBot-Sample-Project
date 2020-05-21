//啟動模組
const Discord = require('discord.js');
const client = new Discord.Client({ autoReconnect: true });
//於cmd回傳啟動訊息&設定BOT自訂遊戲狀態
client.on("ready", () => {
    //用於統計使用者
    console.log(`以 ${client.user.tag}身分登入了!`);
    console.log(`BOT_NAME回家囉!接觸了 ${client.users.cache.size} 位成員，看到了 ${client.channels.cache.size} 個頻道，加入了 ${client.guilds.cache.size} 個伺服器`);
    //使用者狀態(線上online、閒置idle、請勿打擾dnd、隱形invisible)
    client.user.setPresence({ activity: { name: 'Chatting with ???' }, status: 'online' })
});


//限制使用者使用的指令組
const userLock = ['commandA', 'commandB']
//限制不能於特定頻道使用的指令組
const channelLock = ['commandA', 'commandB']

//使用者記錄模組
let whoTrigger = {};

//內嵌式訊息模組
function createEmbed(data) {
    let embed = new Discord.MessageEmbed()
        .setTitle('Your Mail')
        .setThumbnail(data.avatarURL)
        .setColor(16750026)
        .addField(data.embedTitle, data.embedContent)
        .setImage(data.pictureURL)
        .setFooter(data.comefrom)
        .setTimestamp();
    return embed;
}
//大頭貼網址變數
const AvatarURL = '/http[s]?:\/\/.+\.((jpeg)|(jpg)|(png)|(gif)|(bmp))/';
//照片網址變數
const PictureURL = '/http[s]?:\/\/.+\.((jpeg)|(jpg)|(png)|(gif)|(bmp))/';
//內嵌對話框標題
const EmbedTitle = ' ';
//內嵌對話框內文
const EmbedContent = ' ';
//內容

const messageData = {
    //有第一層無第二層
    'commandA': {
        execute(message) {
            embedData = {
                avatarURL: 'https://i.imgur.com/??????.png',
                embedTitle: '',
                embedContent: '',
                pictureURL: '',
                comefrom: '',
            }
            message.channel.send(createEmbed(embedData));
        }
    },
    'commandB': {
        execute(message) {
            embedData = {
                avatarURL: 'https://i.imgur.com/DorE9hI.png',
                embedTitle: '[來自最可愛的老婆大人的訊息]',
                embedContent: '今天的便當，只是剛好有剩餘的食材才順手做的唷。 \n因為清理很麻煩，所以絕對不准你剩下來，知道了吧！',
                pictureURL: '',
                comefrom: '來自結弦のIPhone',
            }
            message.channel.send(createEmbed(embedData));
        }
    },
    '!!help': {
        execute(message) {
            whoTrigger[message.author] = {
                useWhat: []
            };
            whoTrigger[message.author].useWhat.push('!!help');
            message.channel.send(
                'any u want'
            );
        },
    },
    submessageData: {
        '01': {
            execute(message) {
                whoTrigger[message.author].useWhat.push('01');
                message.channel.send(
                    '');
            },
            submessageData: {
                '01': {
                    execute(message) {
                        embedData = {
                            avatarURL: '',
                            embedTitle: '',
                            embedContent: '',
                            pictureURL: '',
                            comefrom: '',
                        };
                        message.channel.send(createEmbed(embedData));
                        delete whoTrigger[message.author];
                    }
                },
                '02': {
                    execute(message) {
                        embedData = {
                            avatarURL: '',
                            embedTitle: '',
                            embedContent: '',
                            pictureURL: '',
                            comefrom: '',
                        };
                        message.channel.send(createEmbed(embedData));
                        delete whoTrigger[message.author];
                    }
                },
                '03': {
                    execute(message) {
                        embedData = {
                            avatarURL: '',
                            embedTitle: '',
                            embedContent: '',
                            pictureURL: '',
                            comefrom: '',
                        };
                        message.channel.send(createEmbed(embedData));
                        delete whoTrigger[message.author];
                    }
                },
            },
        },
        '02': {
            execute(message) {
                whoTrigger[message.author].useWhat.push('01');
                message.channel.send(
                    '');
            },
            submessageData: {
                '01': {
                    execute(message) {
                        embedData = {
                            avatarURL: '',
                            embedTitle: '',
                            embedContent: '',
                            pictureURL: '',
                            comefrom: '',
                        };
                        message.channel.send(createEmbed(embedData));
                        delete whoTrigger[message.author];
                    }
                },
                '02': {
                    execute(message) {
                        embedData = {
                            avatarURL: '',
                            embedTitle: '',
                            embedContent: '',
                            pictureURL: '',
                            comefrom: '',
                        };
                        message.channel.send(createEmbed(embedData));
                        delete whoTrigger[message.author];
                    }
                },
                '03': {
                    execute(message) {
                        embedData = {
                            avatarURL: '',
                            embedTitle: '',
                            embedContent: '',
                            pictureURL: '',
                            comefrom: '',
                        };
                        message.channel.send(createEmbed(embedData));
                        delete whoTrigger[message.author];
                    }
                },
            },
        },
    },
};


//禁止頻道模組
function forbid(channel) {
    if ((channel.name === 'channelNameA') || (channel.name === 'channelNameB')) {
        return true;
    }
    else {
        return false;
    }
}
//許可使用者模組
function detect(author) {
    if ((author.id !== 'userID')) {
        return true;
    }
    else {
        return false;
    }
};

//指令設定區
client.on('message', (msg) => {
    let lit, command;
    lit = msg.content;

    //偵測時間設定
    function timerCleanWhoTrigger() {
        whoTrigger[msg.author].timer = setTimeout(
            function () {
                delete whoTrigger[msg.author];
                msg.reply('dont talk to me if you dont want say anything! ')
            }
            , 5000
        );
    };
    function timerCleanWhoTriggerStop() {
        clearTimeout(whoTrigger[msg.author].timer);
    };

    //找出命令斷點
    command = lit.split(/\s/)[0];

    //使用者限制載入
    if (userLock.includes(command)) {
        if (detect(msg.author)) {
            return;
        }
    };
    //頻道限制模組載入
    if (channelLock.includes(command)) {
        if (forbid(msg.channel)) {
            return;
        }
    };
    //第一層
    if (messageData[command] !== undefined && whoTrigger[msg.author] === undefined) {
        messageData[command].execute(msg);
        if (whoTrigger[msg.author] !== undefined) {
            timerCleanWhoTrigger();
            //使用紀錄
            console.log(
                `${msg.author.username}(${msg.author})在${msg.channel}使用了: ${command}!`
            );
        }
    }
    //其他層
    else if (whoTrigger[msg.author] !== undefined && whoTrigger[msg.author].useWhat !== undefined) {
        timerCleanWhoTriggerStop();
        let commandHandler = messageData[whoTrigger[msg.author].useWhat[0]];
        for (let i = 1; i < whoTrigger[msg.author].useWhat.length; i++) {
            commandHandler = commandHandler.submessageData[whoTrigger[msg.author].useWhat[i]]
        }
        commandHandler = commandHandler.submessageData[command];
        if (commandHandler !== undefined) {
            commandHandler.execute(msg);
        }
        else {
            msg.reply('co this choose! ');
            delete whoTrigger[msg.author];
            //使用紀錄
            console.log(
                `${msg.author.username}(${msg.author})在${msg.channel}使用了: ${command}!`
            );
        }
    }
    //非法指令處理
    else {
        delete whoTrigger[msg.author];
    }
}
);

client.login(process.env['token']);
