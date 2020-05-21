//�ҰʼҲ�
const cp = require('child_process');
const token = process.env.token;
const forkBot = function (code) {
    const token = process.env['token_' + code]; //get your Bot's Token on Heroku Auto
    const env = { token: token };
    const bot = cp.fork(`${__dirname}/${code}.js`, { env: env }); //bot on or off
    bot.on('exit', () => {
        //refork after 10s
        setTimeout(() => { forkBot(code); }, 10000);
    });
}
//決定哪些BOT要運作
forkBot('bot_A');
forkBot('bot_B');

//listen port
const http = require('http');
http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('BOT is running\n');
}).listen(process.env.PORT || 5239);
//ping automatically
const request = require('request');
const makeItAlive = function () {
    request.get
        (
        'Your GitHub repo URL',
        {},
        function (error, response, body) {
            console.log(`send a post`);
            if (!error && response.statusCode == 200)
                console.log(`OK`);
            else
                console.log(`return code: ${response.statusCode}`);
        }
        );
};
setInterval(makeItAlive, 600000);

//特別感謝Sup初音姊姊