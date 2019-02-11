var Discord = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');

//USEFUL FUNCTIONS
var cmdDiffTime = function(cmd){
    //var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    var curTime = new Date()
    var timeDiff = Math.abs(curTime - cmdTimes[cmd])
    return Math.floor(timeDiff / 1000)
}


//CMD TIME DICT
var cmdTimes = {}
cmdTimes.clap = 0
cmdTimes.respects = 0
cmdTimes.seaofthieves = 0

//BEGIN BOT

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

var bot = new Discord.Client()

bot.on('ready', () => {
        console.log('Logged in as ${bot.user.tag}!');
});

bot.on('message', msg => {
    if (msg.content.substring(0, 1) == '!') {
        var args = msg.content.substring(1).split(' ')
        var cmd = args[0]

        switch(cmd) {
            case 'clap':
                if (cmdTimes.clap != 0 && cmdDiffTime('clap') < 30) {break;}
                cmdTimes.clap = new Date()

                var numClaps = args[1]

                if (!(!isNaN(numClaps) && parseInt(Number(numClaps)) == numClaps && !isNaN(parseInt(numClaps, 10)))) { break; }

                if (numClaps > 19) { numClaps = 19 }
                reply = ''
                for (var i = 0; i < numClaps; i++)
                {
                        reply += ' :clap: '
                }
                msg.channel.send(reply)
                break;
            case 'respects':
                if (cmdTimes.respects != 0 && cmdDiffTime('respects') < 30) {break;}
                cmdTimes.respects = new Date()
                msg.channel.send("F");
                break;
            case 'seaofthieves':
                if (cmdTimes.respects != 0 && cmdDiffTime('seaofthieves') < 30) {break;}
                cmdTimes.respects = new Date()
                msg.channel.send('D-d-d-drop the anchor')
                break;
            case '69':
                if (cmdTimes.respects != 0 && cmdDiffTime('69') < 30) {break;}
                cmdTimes['69'] = new Date()
                msg.channel.send(":eggplant: Nice :sweat_drops:")
                break;
            case '420':
                if (cmdTimes.respects != 0 && cmdDiffTime('420') < 30) {break;}
                cmdTimes['420'] = new Date()
                msg.channel.send(":maple_leaf: DANK :maple_leaf:")
                break;
            default:
                msg.reply("Command not found");
                break;
        }
    }
});

bot.login(auth.token);
