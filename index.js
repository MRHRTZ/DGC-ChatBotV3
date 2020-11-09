const { create, Client } = require('@open-wa/wa-automate')
const welcome = require('./lib/welcome')
const fs = require('fs-extra')
const welcomeF = require('./lib/freedom')
//const cron = require('node-cron')
const welcomeD = require('./lib/dmff')
const moment = require('moment-timezone')
//const msgHandler = require('./msgHndlr')
const options = require('./options')

//let setting = JSON.parse(fs.readFileSync('./lib/config.json'));
//let {prefix, banChats, restartState: isRestart,mtc: mtcState, whitelist ,sAdmin, limitCount, memberLimit, groupLimit} = setting

moment.tz.setDefault('Asia/Jakarta').locale('id')
const time = moment().format('MMMM Do YYYY, h:mm:ss a')
// Cache handler and check for file change
require('./msgHndlr')
nocache('./msgHndlr', module => console.log(`${time} '${module}' Updated!`))

const start = async (client = new Client()) => {
        console.log('[SERVER] Server Started!')
        // Force it to keep the current session
        client.onStateChanged(state=>{
            console.log('statechanged', state)
            if(state==="CONFLICT" || state==="UNLAUNCHED") client.forceRefocus();
        })
        // cron.schedule('* * * * *', () =>  {
        //     const obj = [{id: sAdmin, msg: 1}]
        //     msgLimit = obj
        //     fs.writeFileSync('./lib/msgLimit.json', JSON.stringify(obj))
        // });
        
        // listening on message


        client.onMessage((async (message) => {
            client.getAmountOfLoadedMessages()
            .then((msg) => {
                if (msg >= 500) {
                    client.cutMsgCache()
                }
            })
        //    msgHandler(client, message)
        // Message Handler (Loaded from recent cache)
        require('./msgHndlr')(client, message)
        }))

        client.onGlobalParicipantsChanged((async (xixi) => {
            console.log('Somegroup '+heuh.action+'ing')
            if (xixi.action === 'remove' || xixi.action === 'leave') await client.sendTextWithMentions(event.chat, `Selamat tinggal @${event.who.replace('@c.us', '')}, Semoga tenang dialam sana..`)
            //console.log(client)
            //left(client, heuh)
            }))
        
         client.onAddedToGroup((async (chat) => {
            // let totalMem = await chat.groupMetadata.participants.length
            // if (totalMem < 20) { 
            //     client.sendText(chat.id, `Yaampun member nya cuma ${totalMem}, Kalo mau invite bot, minimal jumlah mem ada 20 atau chat owner!`).then(() => client.leaveGroup(chat.id)).then(() => client.deleteChat(chat.id))
            // } else {
            //     client.sendText(chat.groupMetadata.id, `Halo warga grup *${chat.contact.name}* terimakasih sudah menginvite bot ini, untuk melihat menu silahkan kirim *!menu*`)
            // } 
            client.sendText(chat.id, `Berhubungan Server terbatas bot ini hanya untuk grup DGC dan cabangnya!\n\nJika ada pihak yang membutuhkan bot ini untuk digrup donasi MIN 10K (tanpa request) ke 085559038021 (DANA/GOPAY/OVO) dan konfirmasi owner bot wa.me/6285559038021\n\nterima kasih.`).then(() => client.leaveGroup(chat.id)).then(() => client.deleteChat(chat.id))
        }))


        /*client.onAck((x => {
            const { from, to, ack } = x
            if (x !== 3) client.sendSeen(to)
        }))*/

        // listening on Incoming Call
        client.onIncomingCall(( async (call) => {
            await client.sendText(call.peerJid, 'Maaf, saya tidak bisa menerima panggilan. Telah ditetapkan telpon/vc = block')
            .then(() => client.contactBlock(call.peerJid))
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


create(options(true, start))
    .then(client => start(client))
    .catch((error) => console.log(error))