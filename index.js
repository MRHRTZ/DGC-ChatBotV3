const wa = require('@open-wa/wa-automate')
const { ev } = require('@open-wa/wa-automate')
const welcome = require('./lib/welcome')
const fs = require('fs-extra')
const welcomeF = require('./lib/freedom')
const color = require('./lib/color')
const welcomeD = require('./lib/dmff')
const moment = require('moment-timezone')
//const msgHandler = require('./msgHndlr')
const options = require('./options')
let setting = JSON.parse(fs.readFileSync('./lib/config.json'));
let {prefix, banChats, restartState: isRestart, mtc: mtcState, whitelist ,sAdmin, limitCount, memberLimit, groupLimit} = setting
const sesi = process.argv[2] ? process.argv[2] : "MRHRTZ"

moment.tz.setDefault('Asia/Jakarta').locale('id')
const time = moment().format('DD/MM HH:mm:ss')
// Cache handler and check for file change
function INFOLOG(info) {
    return console.log('\x1b[1;34m~\x1b[1;37m>>', '[\x1b[1;33mINF\x1b[1;37m]', time, color(info))
}

function restartAwal(hurtz){
    setting.restartState = false
    isRestart = false
    hurtz.sendText(setting.restartId, '✅ _Reset config Completed!_')
    setting.restartId = 'undefined'
    fs.writeFileSync('./lib/setting.json', JSON.stringify(setting, null,2));
}

require('./msgHndlr')
nocache('./msgHndlr', module => INFOLOG(`${module} Telah diupdate!`))

const start = async (hurtz = new Hurtz()) => {

        if(isRestart){restartAwal(hurtz);}

        console.log('[SERVER] Server Started!')
        // Force it to keep the current session
        hurtz.onStateChanged(state=>{
            // console.log('statechanged', state)
            INFOLOG(`Status berubah ${state}`)
            if(state==="CONFLICT" || state==="UNLAUNCHED") hurtz.forceRefocus();
        })
        // cron.schedule('* * * * *', () =>  {
        //     const obj = [{id: sAdmin, msg: 1}]
        //     msgLimit = obj
        //     fs.writeFileSync('./lib/msgLimit.json', JSON.stringify(obj))
        // });
        
        // listening on message


        hurtz.onMessage((async (message) => {
            hurtz.getAmountOfLoadedMessages()
            .then((msg) => {
                if (msg >= 500) {
                    hurtz.cutMsgCache()
                }
            })
        //    msgHandler(hurtz, message)
        // Message Handler (Loaded from recent cache)
        require('./msgHndlr')(hurtz, message)
        }))

        hurtz.onGlobalParicipantsChanged((async (xixi) => {
            // await welcome(hurtz, xixi)
            //left(hurtz, heuh)
            if (xixi.action == 'remove' || xixi.action == 'leave') {
                hurtz.sendTextWithMentions(chat.id, `Semoga tenang dialam sana @${xixi.who} 😊`)
            } else if (xixi.action == 'add') {
                hurtz.sendTextWithMentions(chat.id, `Welcome new mem @${xixi.who} :)`)
            }
            console.log(xixi.action+'ing'+' '+xixi.who)
            }))
        
         hurtz.onAddedToGroup((async (chat) => {
            // const whitelist = ["6285216490187-1558621310@g.us","6285559038021-1603688917@g.us"]
            // if (sender.id === '6285559038021@c.us') return
            // let totalMem = await chat.groupMetadata.participants.length
            // if (totalMem < 20) { 
            //     hurtz.sendText(chat.id, `Yaampun member nya cuma ${totalMem}, Kalo mau invite bot, minimal jumlah mem ada 20 atau chat owner!`).then(() => hurtz.leaveGroup(chat.id)).then(() => hurtz.deleteChat(chat.id))
            // } else {
            //     hurtz.sendText(chat.groupMetadata.id, `Halo warga grup *${chat.contact.name}* terimakasih sudah menginvite bot ini, untuk melihat menu silahkan kirim *!menu*`)
            // } 
            // if (!whitelist.include(chat.id)) {
                hurtz.sendText(chat.id, `Berhubungan Server terbatas bot ini hanya untuk grup DGC dan cabangnya!\n\nJika ada pihak yang membutuhkan bot ini untuk digrup donasi dan konfirmasi owner bot\n\nterima kasih.`)
                .then(() => hurtz.sendContact(chat.id, '6285559038021@c.us'))
                .then(() => hurtz.leaveGroup(chat.id))
                .then(() => hurtz.deleteChat(chat.id))
            // } else {
                    // hurtz.sendText(chat.id, `Halo semua DGC ChatBot siap melayani semuanya, kecuali klo mati :'D`)
            // } 
        }))


        /*hurtz.onAck((x => {
            const { from, to, ack } = x
            if (x !== 3) hurtz.sendSeen(to)
        }))*/

        // listening on Incoming Call
        hurtz.onIncomingCall(( async (call) => {
            await hurtz.sendText(call.peerJid, 'Maaf, saya tidak bisa menerima panggilan. Telah ditetapkan telpon/vc = block')
            .then(() => hurtz.contactBlock(call.peerJid))
        }))
    }


/**
 * uncache if there is file change
 * @param {string} module module name or path
 * @param {function} cb when module updated <optional> 
 */
function nocache(module, cb = () => { }) {
    console.log('Module', `'${module}'`, 'is now being watched for changes')
    require('fs').watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

/**
 * uncache a module
 * @param {string} module module name or path
 */
function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}


wa.create({
    sessionId: sesi,
    ...options(false, start)
    })
    .then(hurtz => start(hurtz))
    .catch((error) => console.log(error))