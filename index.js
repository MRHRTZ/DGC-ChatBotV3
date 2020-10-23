const { create, Client } = require('@open-wa/wa-automate')
const welcome = require('./lib/welcome')
const welcomeF = require('./lib/freedom')
const msgHandler = require('./msgHndlr')
const options = require('./options')

const start = async (client = new Client()) => {
        console.log('[SERVER] Server Started!')
        // Force it to keep the current session
        client.onStateChanged((state) => {
            console.log('[Client State]', state)
            if (state === 'CONFLICT' || state === 'UNLAUNCHED') client.forceRefocus()
        })
        // listening on message
        client.onMessage((async (message) => {
            client.getAmountOfLoadedMessages()
            .then((msg) => {
                if (msg >= 3000) {
                    client.cutMsgCache()
                }
            })
            msgHandler(client, message)
        }))

        client.onGlobalParicipantsChanged((async (heuh) => {
            await welcome(client, heuh)
            await welcomeF(client, heuh)
            //left(client, heuh)
            }))
        
         client.onAddedToGroup((async (chat) => {
            // let totalMem = await chat.groupMetadata.participants.length
            // if (totalMem < 20) { 
            //     client.sendText(chat.id, `Yaampun member nya cuma ${totalMem}, Kalo mau invite bot, minimal jumlah mem ada 20 atau chat owner!`).then(() => client.leaveGroup(chat.id)).then(() => client.deleteChat(chat.id))
            // } else {
            //     client.sendText(chat.groupMetadata.id, `Halo warga grup *${chat.contact.name}* terimakasih sudah menginvite bot ini, untuk melihat menu silahkan kirim *!menu*`)
            // } 
            client.sendText(chat.id, `Berhubungan Server terbatas bot ini hanya untuk grup DGC dan cabangnya!\n\nJika ada pihak yang membutuhkan bot ini untuk digrup donasi seikhlasnya ke 085559038021 (ovo) dan konfirmasi owner bot wa.me/6285559038021\n\nterima kasih.`).then(() => client.leaveGroup(chat.id)).then(() => client.deleteChat(chat.id))
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

create('MRHRTZ', options(true, start))
    .then(client => start(client))
    .catch((error) => console.log(error))