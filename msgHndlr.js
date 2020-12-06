const { decryptMedia } = require('@open-wa/wa-decrypt')
const getYouTubeID = require('get-youtube-id')
const sharp = require('sharp')
const fs = require('fs-extra')
const urlShortener = require('./lib/shortener')
const axios = require('axios')
const moment = require('moment-timezone')
const get = require('got')
const download = require('download-file')
// const fetch = require('node-fetch')
const speed = require('performance-now')
const google = require('google-it')
const color = require('./lib/color')
const { getUser, getPost, searchUser } = require('./lib/Insta')
const { promisify } = require('util')
const { spawn, exec } = require('child_process')
const { getLocationData } = require('./lib')
const { BrainlySearch } = require('./lib/brainly')
const util = require('util')
const nhentai = require('nhentai-js')
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor
const os = require('os')
const cron = require('node-cron')
const { API } = require('nhentai-api')
const { liriklagu, quotemaker, randomNimek, fb, ig, twt, sleep, tulis, jadwalTv, ss, between } = require('./lib/functions')
const { help, snk, info, donate, readme, listChannel, bahasa_list } = require('./lib/help')
const { yta, ytv, buffer2Stream, ytsr, baseURI, stream2Buffer, noop } = require('./lib/ytdl')
const { stdout, send } = require('process')
const ffmpeg = require('fluent-ffmpeg')
const nsfw_ = JSON.parse(fs.readFileSync('./lib/NSFW.json'))
const welkomD = JSON.parse(fs.readFileSync('./lib/dmff.json'))
const welkom = JSON.parse(fs.readFileSync('./lib/welcome.json'))
const welkomF = JSON.parse(fs.readFileSync('./lib/freedom.json'))
const { RemoveBgResult, removeBackgroundFromImageBase64, removeBackgroundFromImageFile } = require('remove.bg')
const translate = require('@vitalets/google-translate-api');
const { BikinTikel } = require('./lib/tikel_makel')
const { default: Axios } = require('axios')
const { da } = require('@vitalets/google-translate-api/languages')
const setting = JSON.parse(fs.readFileSync('./lib/config.json'))
const muted = JSON.parse(fs.readFileSync('./lib/muted.json'))
const vip = JSON.parse(fs.readFileSync('./lib/vip.json'))
let banned = JSON.parse(fs.readFileSync('./lib/banned.json'));
const limit = JSON.parse(fs.readFileSync('./lib/limit.json'));
const msgLimit = JSON.parse(fs.readFileSync('./lib/msgLimit.json'));
const {prefix, banChats, restartState: isRestart,mtc: mtcState, whitelist ,sAdmin, limitCount, memberLimit, groupLimit} = setting
//const { default: translate } = require('google-translate-open-api')

// const igGetInfo = promisify(instagram.getInfo)
// const twtGetInfo = promisify(twitter.getInfo)

moment.tz.setDefault('Asia/Jakarta').locale('id')

module.exports = msgHandler = async (hurtz, message) => {
    try {
        const { from, to, type, id, t, chatId, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList, fromMe, self } = message
        let { body } = message
        if (sender && sender.isMe) from = to
        const { name, formattedTitle } = chat
        let { pushname, verifiedName } = sender
        pushname = pushname || verifiedName
        const commands = caption || body || ''
        const command = commands.toLowerCase().split(' ')[0] || ''
        const args =  commands.split(' ')

        const msgs = (message) => {
            if (command.startsWith('!')) {
                if (message.length >= 10){
                    return `${message.substr(0, 15)}`
                }else{
                    return `${message}`
                }
            }
        }
        if (self == true) {
        console.log(`BEDANYA \n FROMME : ${fromMe}\nSELF : ${self} EMMM\n${body}`)
        }

        const mess = {
            wait: '_Permintaan anda sedang diproses mohon tunggu sebentar_ ⏲️',
            mt: '_Fitur ini masih dalam proses perbaikan._',
            error: {
                St: '_Terjadi kesalahan_ ⚠️ _Kirim gambar dengan caption *!sticker* atau tag gambar yang sudah dikirim_',
                Qm: '_Terjadi kesalahan_ ⚠️ _mungkin themenya tidak tersedia!_',
                Yt3: '_Terjadi kesalahan_ ⚠️ _tidak dapat meng konversi ke mp3!_',
                Yt4: '_Terjadi kesalahan_ ⚠️ _mungkin error di sebabkan oleh sistem._',
                Ig: '_Terjadi kesalahan_ ⚠️ _mungkin karena akunnya private_',
                Ki: '⚠️ _Bot tidak bisa mengeluarkan admin group!_',
                Ad: '⚠️ _Tidak dapat menambahkan target, mungkin karena di private  dan pastikan format nomer hanya angka contoh 62856xxxxx, tidak memakai awalan 08 dan simbol_',
                Iv: '⚠️ _Link yang anda kirim tidak valid!_'
            }
        }

        const time = moment(t * 1000).format('DD/MM HH:mm:ss')
        const botNumber = await hurtz.getHostNumber()
        const blockNumber = await hurtz.getBlockedIds()
        const serial = sender.id
        const isSadmin = serial === sAdmin
        // const groupId = isGroupMsg ? chat.id : ''
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        if (body == 'Ha') return console.log(chat.groupMetadata)
        const groupAdmins = isGroupMsg ? await hurtz.getGroupAdmins(groupId) : ''
        const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false
        const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false
        const ownerNumber = '6285559038021@c.us'
        const pengirim = JSON.parse(fs.readFileSync('./lib/pengguna.json'))
        const jelema = pengirim[Math.floor(Math.random()*pengirim.length)];
        const isOwner = sender.id === ownerNumber
        const isBlocked = blockNumber.includes(sender.id)
        const isPrivate = sender.id === chat.contact.id
        const menuPriv = `Perintah private sekarang hanya anonymous chat!\n\nHal ini dikarenakan terlalu banyak request di pc (private chat) sehingga bot rentan terblokir WhatsApp\n\nBot ini disewakan khusus grup, ketik *!SendOwner* untuk mengirim nomer pemilik bot\n\nFitur Private yg tersedia :\n 🎤〘 Anonymous Chat 〙💺\n\n➣ *!kirim _Teksnya_*\n➣ *!daftar _62855xxxx_*\n➣ *!hapus _62855xxxx_*`
        // `*Fitur bot private yang tersedia* :\n\n➣ *!sendowner*\n➣ *!bug _teksnya_*\n➣ *!tostiker _Teksnya_*\n➣ *!stikergif*\n➣ *!stiker*\n\n   🎤〘 Anonymous Chat 〙💺\n\n➣ *!kirim _Teksnya_*\n➣ *!daftar _62855xxxx_*\n➣ *!hapus _62855xxxx_*\n\n_Apabila ingin full fitur menu donasi untuk sewa bot digrup, minat? ketik *!sendOwner*_`
        const isNsfw = isGroupMsg ? nsfw_.includes(chat.id) : false
        const uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
        const isUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi)
        const isImage = type === 'image'
        const isVideo = type === 'video'
        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
        const isQuotedVideo = quotedMsg && quotedMsg.type === 'video'
        const isQuotedAudio = quotedMsg && (quotedMsg.type === 'audio' || quotedMsg.type === 'ptt')
        const isQuotedFile = quotedMsg && quotedMsg.type === 'document'
        const isQuotedSticker = quotedMsg && quotedMsg.type === 'sticker'
        if (!isGroupMsg && command.startsWith('!')) console.log('\x1b[1;31m~\x1b[1;37m>>', '[\x1b[1;32mOUT\x1b[1;37m]', time, color(msgs(command)), 'from', color(pushname))
        if (isGroupMsg && command.startsWith('!')) console.log('\x1b[1;31m~\x1b[1;37m>>', '[\x1b[1;32mOUT\x1b[1;37m]', time, color(msgs(command)), 'from', color(pushname), 'in', color(formattedTitle))
        if (!isGroupMsg && !command.startsWith('!')) console.log('\x1b[1;33m~\x1b[1;37m>>', '[\x1b[1;34mMSG\x1b[1;37m]', time, color('pesan'), 'from', color(pushname))
        if (isGroupMsg && !command.startsWith('!')) console.log('\x1b[1;33m~\x1b[1;37m>>', '[\x1b[1;34mMSG\x1b[1;37m]', time, color('pesan'), 'from', color(pushname), 'in', color(formattedTitle))
        const switch_pref = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?@#$%^&.\/\\©^]/.test(command) ? command.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?@#$%^&.\/\\©^]/gi) : ''

        
        function INFOLOG(info) {
            return console.log('\x1b[1;34m~\x1b[1;37m>>', '[\x1b[1;33mINF\x1b[1;37m]', time, color(info))
        }
        
        function ERRLOG(e) {
            return console.log('\x1b[1;31m~\x1b[1;37m>>', '[\x1b[1;31mERROR\x1b[1;37m]', time, color('\tname: ' + e.name + ' message: ' + e.message + ' at: ' + e.at))
        }
        // if (isQuotedSticker) {   
        //     mediaData = await decryptMedia(quotedMsg, uaOverride)
        //     // await hurtz.sendImage(from, `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`, `${pushname}.jpg`, `Sticker berhasil dikonversi! ${pushname}`)
        //     await hurtz.sendImageAsSticker(ownerNumber, `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`)
        //     console.log(mediaData)
        // }
 
            //hurtz.reply(from, `_Sepertinya anda telah terblokir dikarenakan vc/call bot._`)
        //if (!isOwner) return
    //try { 


        //EXPIRED BEGIN

        // cron.schedule('00 15 * * * *', () => {
        //     const hzbot = '6285559038021-1603688917@g.us'
        //     hurtz.sendText(hzbot, `Terima kasih telah menggunakan jasa DGC ChatBot grup ini telah expired pada tanggal 52 bot akan otomatis leave terima kasih.`)
        //     // .then(() => hurtz.leaveGroup(hzbot))
        //     // .then(() => hurtz.deleteChat(hzbot))
        //     console.log('Coming')
        // })
        let antli = JSON.parse(fs.readFileSync('./lib/antilink.json'))
        const isLinkOn = isGroupMsg ? antli.includes(chat.id) : false
        
        if (/(https:\/\/chat.whatsapp.com)/.test(body)){
            if (isLinkOn) {
                INFOLOG(`Terdeteksi antilink pada grup ${name}`)
                if (!isGroupMsg) return hurtz.reply(from, `*[ ! ]* Anti promosi hanya untuk grup`,id)
                hurtz.reply(from,`*⚠️ [ LINK DETECTED ] ⚠️*\n*Terdeteksi link bot akan kick otomatis member!!*`,id)

                if (!isBotGroupAdmins) return hurtz.reply(from, `*[ ! ]* Fitur kick member di anti link gc dapat bekerja jika bot menjadi admin!`,id) // bot no admin
                
                if (isOwner) {
                    hurtz.reply(from, `*⚠️* Bot tidak dapat kick owner bot!!`,id) // no kick owner bot
                } else if (isGroupAdmins) {
                    hurtz.reply(from, `*⚠️* Bot tidak dapat kick admin grup!!`,id) // no kick owner bot
                } else {
                    await hurtz.removeParticipant(groupId, sender.id).then(() => {
                        hurtz.sendTextWithMentions(from, `✅ Berhasil kick @${sender.id.replace('@c.us','')}`)
                    })
                }
            } else {
                INFOLOG(`Antilink tidak diaktifkan pada grup ${name} ❌`)
                // hurtz.sendText(from, `Ga dinyalain fiturnya gan :v`)
                // await hurtz.removeParticipant(groupId, `${sender.id}`)
            }
        }

        
        const isVIP = vip.includes(sender.id) ? "✅" : "❌"
        const isTerban = ''

        if (command == switch_pref+'profil' || command == switch_pref+'profile') {

            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)        
            
            if (isOwner) {
                //const vipny = vip.includes(chat.id)
                const biony = await hurtz.getStatus(sender.id)
                const captets = `🖋️ *Nama* : ${pushname}\n\n🔖 *Bio* : ${biony.status}\n\n📜 *Jabatan* : Bot Owner 👑\n\n🔮 *Member VIP* : ${isVIP}`
                const pepe = await hurtz.getProfilePicFromServer(sender.id)
                //console.log(isVIP+chat.id+sender.id)
                //console.log(message)

                if (pepe == '' || pepe == undefined) {
                await hurtz.sendFileFromUrl(from, 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQcODjk7AcA4wb_9OLzoeAdpGwmkJqOYxEBA&usqp=CAU', 'profile.jpg', captets, id)
                } else {
                    await hurtz.sendFileFromUrl(from, pepe, 'profile.jpg', captets, id)
                }
            } else if (isGroupAdmins) {
                //const vipny = vip.includes(chat.id)
                const biony = await hurtz.getStatus(sender.id)
                const captets = `🖋️ *Nama* : ${pushname}\n\n🔖 *Bio* : ${biony.status}\n\n📜 *Jabatan* : Admin\n\n🔮 *Member VIP* : ${isVIP}`
                const pepe = await hurtz.getProfilePicFromServer(sender.id)
                //console.log(isVIP+chat.id+sender.id)
                //console.log(message)

                if (pepe == '' || pepe == undefined) {
                await hurtz.sendFileFromUrl(from, 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQcODjk7AcA4wb_9OLzoeAdpGwmkJqOYxEBA&usqp=CAU', 'profile.jpg', captets, id)
                } else {
                    await hurtz.sendFileFromUrl(from, pepe, 'profile.jpg', captets, id)
                }
            } else if (!isGroupAdmins) {
                //const vipny = vip.includes(chat.id)
                const biony = await hurtz.getStatus(sender.id)
                const captets = `🖋️ *Nama* : ${pushname}\n\n🔖 *Bio* : ${biony.status}\n\n📜 *Jabatan* : Member\n\n🔮 *Member VIP* : ${isVIP}`
                const pepe = await hurtz.getProfilePicFromServer(sender.id)
                //console.log(isVIP+chat.id+sender.id)
                //console.log(message)

                if (pepe == '' || pepe == undefined) {
                await hurtz.sendFileFromUrl(from, 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQcODjk7AcA4wb_9OLzoeAdpGwmkJqOYxEBA&usqp=CAU', 'profile.jpg', captets, id)
                } else {
                    await hurtz.sendFileFromUrl(from, pepe, 'profile.jpg', captets, id)
                }
            }
            await hurtz.sendSeen(from)
        }


        let rawText = type === 'chat' ?
            message.body :
            (type === 'image' || type === 'video') && caption ?
            message.caption : ''

        if (rawText.startsWith('> ') && isOwner) {
            INFOLOG(pushname, 'mencoba execute perintah')
            let type = Function
            if (/await/.test(rawText)) type = AsyncFunction
            let func = new type('print', 'exec', 'chat', 'quotedMsg', 'os', 'axios', 'moment', 'ytsr', 'hurtz', 'from', 'id', 'message', 'get', 'fs' , 'yta', 'ytv', rawText.slice(2))
            let output
            try {
                output = func((...args) => {
                    INFOLOG(...args)
                    hurtz.reply(from, util.format(...args), id)
                }, exec, chat, quotedMsg, os, axios, moment, ytsr, hurtz, from, id, message, get, fs, yta, ytv)
                // console.log(output)
                // await hurtz.reply(from, '*Console Output*\n\n' + util.format(output), id)
            } catch (e) {
                await hurtz.reply(from, '*Console Error*\n\n' + util.format(e), id)
            }
        }



        //EXPIRED ENDLINE



        const isMuted = (chatId) => {
            if(muted.includes(chatId)){
                return false
            }else{
                return true
            }
        }

        // function restartAwal(hurtz){
        //     setting.restartState = false
        //     isRestart = false
        //     hurtz.sendText(setting.restartId, 'Restart Succesfull!')
        //     setting.restartId = 'undefined'
        //     fs.writeFileSync('./lib/setting.json', JSON.stringify(setting, null,2));
        // }

        //BEGIN HELPER


        if (typeof Array.prototype.splice === 'undefined') {
            Array.prototype.splice = function (index, howmany, elemes) {
                howmany = typeof howmany === 'undefined' || this.length;
                var elems = Array.prototype.slice.call(arguments, 2), newArr = this.slice(0, index), last = this.slice(index + howmany);
                newArr = newArr.concat.apply(newArr, elems);
                newArr = newArr.concat.apply(newArr, last);
                return newArr;
            }
        }

        function isMsgLimit(id){
            if (isSadmin) {return false;}
            let found = false;
            const addmsg = JSON.parse(fs.readFileSync('./lib/msgLimit.json'))
            for (let i of addmsg){
                if(i.id === id){
                    if (i.msg >= 12) {
                        found === true 
                        // console.log(i)
                        hurtz.reply(from, '*[ANTI-SPAM]*\nMaaf, akun anda kami blok karena SPAM, dan tidak bisa di UNBLOK!', id)
                        hurtz.contactBlock(id)
                        banned.push(id)
                        fs.writeFileSync('./lib/banned.json', JSON.stringify(banned))
                        return true;
                    }else if(i.msg >= 7){
                        found === true
                        hurtz.reply(from, '*[ANTI-SPAM]*\nNomor anda terdeteksi spam!\nMohon tidak spam 5 pesan lagi atau nomor anda AUTO BLOK!', id)
                        return true
                    }else{
                        found === true
                        return false;
                    }   
                }
            }
            if (found === false){
                let obj = {id: `${id}`, msg:1};
                addmsg.push(obj);
                fs.writeFileSync('./lib/msgLimit.json',JSON.stringify(addmsg));
                return false;
            }  
        }

        function addMsgLimit(id){
            if (isSadmin) {return;}
            var found = false
            const addmsg = JSON.parse(fs.readFileSync('./lib/msgLimit.json'))
            Object.keys(addmsg).forEach((i) => {
                if(addmsg[i].id == id){
                    found = i
                    // console.log(addmsg[0])
                }
            })
            if (found !== false) {
                addmsg[found].msg += 1;
                fs.writeFileSync('./lib/msgLimit.json',JSON.stringify(addmsg));
                // console.log(addmsg[0])
            }
        }

        function isLimit(id){
            //if (isSadmin) {return false;}
            let found = false;
            for (let i of limit){
                if(i.id === id){
                    let limits = i.limit;
                    if (limits >= limitCount) {
                        found = true;
                        return true;
                    }else{
                        limit
                        found = true;
                        return false;
                    }
                    }
            }
            if (found === false){
                let obj = {id: `${id}`, limit:0};
                limit.push(obj);
                fs.writeFileSync('./lib/limit.json',JSON.stringify(limit));
                return false;
            }  
        }

        function limitAdd (id) {
            //if (isSadmin) {return;}
            var found = false;
            const limidat = JSON.parse(fs.readFileSync('./lib/limit.json'))
            Object.keys(limidat).forEach((i) => {
                if(limidat[i].id == id){
                    found = i
                    //console.log(limidat[0])
                }
            })
            if (found !== false) {
                limidat[found].limit += 1;
                // console.log(limidat[found])
                fs.writeFileSync('./lib/limit.json',JSON.stringify(limidat));
            }
        }

        function uploadImages(buffData, type) {
            // eslint-disable-next-line no-async-promise-executor
            return new Promise(async function (resolve, reject) {
                const {
                    ext
                } = await fromBuffer(buffData)
                let temp = './temp'
                let name = new Date() * 1
                let filePath = path.join(temp, 'image', `${name}.${ext}`)
                const _buffData = type ? await resizeImage(buffData, false) : buffData
                fs.writeFile(filePath, _buffData, {
                    encoding: 'base64'
                }, (err) => {
                    if (err) return reject(err)
                    INFOLOG('Uploading image to telegra.ph server...')
                    const fileData = fs.readFileSync(filePath)
                    const form = new FormData()
                    form.append('file', fileData, 'tmp.' + ext)
                    fetch('https://telegra.ph/upload', {
                        method: 'POST',
                        body: form
                    })
                        .then(res => res.json())
                        .then(res => {
                            if (res.error) return reject(res.error)
                            resolve('https://telegra.ph' + res[0].src)
                        })
                        .then(() => fs.unlinkSync(filePath))
                        .catch(err => reject(err))
                })
            })
        }

        function resizeImage(buff, encode) {
            return new Promise(async function (resolve, reject) {
                console.log('Resizeing image...')
                const {
                    mime
                } = await fromBuffer(buff)
                sharp(buff, {
                    failOnError: false
                })
                    .toFormat('png')
                    .resize(512, 512, {
                        fit: 'contain',
                        background: {
                            r: 0,
                            g: 0,
                            b: 0,
                            alpha: 0
                        }
                    })
                    .toBuffer()
                    .then(resizedImageBuffer => {
                        if (!encode) return resolve(resizedImageBuffer)
                        console.log('Create base64 from resizedImageBuffer...')
                        const resizedImageData = resizedImageBuffer.toString('base64')
                        const resizedBase64 = `data:${mime};base64,${resizedImageData}`
                        resolve(resizedBase64)
                    })
                    .catch(error => reject(error))
            })
        }

        function processSticker(input) {
            return new Promise((resolve, reject) => {
                if (typeof input == 'string' && /^data/.test(input)) input = Buffer.from(input.replace(/^data:.+;base64,/, ''))
                sharp(input)
                    .toFormat('webp')
                    .resize(512, 512, {
                        fit: 'contain',
                        background: {
                            r: 0,
                            g: 0,
                            b: 0,
                            alpha: 0
                        }
                    })
                    .toBuffer()
                    .then(resolve)
                    .catch(reject)
            })
        }
        //END HELPER

        if (body === '!unmute') {
            if(isGroupMsg) {
                if (!isGroupAdmins) return hurtz.reply(from, 'Maaf, perintah ini hanya dapat dilakukan oleh admin grup!', id)
                    let index = muted.indexOf(chat.id);
                    muted.splice(index,1)
                    fs.writeFileSync('./lib/muted.json', JSON.stringify(muted, null, 2))
                    hurtz.reply(from, `Bot telah di unmute!`, id)         
            }
        }
        if (!isMuted(chat.id) == true) return INFOLOG(`Telah dimute dengan id ${chat.id} di grup ${name}`)
        //hurtz.reply(from, `_Hai ${pushname} Limit request anda sudah mencapai batas, Coba lagi besok..._`, id)

        if (args[0] == 'Tes') {
            hurtz.reply(from, `Oke nyala..`, id)
        }
        const badword = ["anjing",
                        "goblok",
                        "ngentod","bangsat"]
        if (args[0] == "Assalamualaikum" || args[0] == "Assalamu'alaikum" || args[0] == "Samlikum" || args[0] == "Samlekom"){
                return hurtz.reply(from, "Wa'alaikumsalam warahmatullahi wabarokatuh", id)
        } else if (badword.includes(args[0].toLowerCase())){
            if (!isGroupAdmins) {
                return hurtz.reply(from, "WOYY JANGAN TOXIC MEMBER BANGSAT SETAN!", id)
                .then(() => hurtz.removeParticipant(groupId, sender.id))
                .then(() => {
                    hurtz.sendText(from, `Awokawoka mampuss terwisuda🐦`)
                }).catch(() => hurtz.sendText(from, `Untung bot bukan admin kalo ngga udah terkick tuh >:(`))
            } else {
                return hurtz.reply(from, "Mohon jaga ucapannya ya mimin:)", id)
            }
        }
        if (isBlocked ) return
                        
    switch(command) {
        case switch_pref+'groupprofile':
        case switch_pref+'profilgrup':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            const fitur_antil = isLinkOn ? "✅" : "❌"
            const pepea = await hurtz.getProfilePicFromServer(chat.id)
            let totalMemny = await chat.groupMetadata.participants.length
            const captetsg = `
🗒️ *Nama grup* : ${chat.formattedTitle}

🕒 *Grup dibuat pada* : ${Date(chat.groupMetadata.creation * 1000)}

📧 *Owner grup* : ${chat.groupMetadata.owner.replace('@c.us','')}

👁️‍ *Jumlah member* : ${totalMemny}

🛠️ *Fitur antilink* : ${fitur_antil}

⌛ *Desc diubah pada* : ${Date(chat.groupMetadata.descTime * 1000)}

📚 *Desc grup* : ${chat.groupMetadata.desc}
`
            if (pepea == '' || pepea == undefined) {
                await hurtz.sendFileFromUrl(from, 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQcODjk7AcA4wb_9OLzoeAdpGwmkJqOYxEBA&usqp=CAU', 'profile.jpg', captetsg, id)
            } else {
                await hurtz.sendFileFromUrl(from, pepea, 'profile.jpg', captetsg, id)
            }
            break
        case switch_pref+'egg':
            if (isMedia || isQuotedVideo || isQuotedFile) {
        const encryptMedia = isQuotedVideo || isQuotedFile ? quotedMsg : message
        const _mimetype = encryptMedia.mismetype
        hurtz.reply(from, 'webp', 'Stiker itu pakai format *webp*', id)
        consolse.log(color('[WAPI]'), 'Downloading and decrypting media...')
        const mediaData = await decryptMedia(encryptMedia)
        if (_mimetype === 'image/webp') hurtz.sendRawWebpAsSticker(from, baseURI(mediaData.toString('base64')), true)
        const sticker = await stream2Buffer(write => {
            ffmpeg(buffer2Stream(mediaData))
                .inputOptions([
                    '-t', 15
                ])
                // .complexFilter([
                //     (30 >= 1 ? 'fps=' + 30 + ',' : '') + 'scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1'
                // ])
                .outputOptions([
                    // '-qscale', 1,
                    // '-fs', '1M' || '1M',
                    '-vcodec', 'libwebp',
                    // '-lossless', '1',
                    '-preset', 'default',
                    '-loop', '0',
                    '-an',
                    '-vsync', '0'
                ])
                .format('webp')
                .on('start', commandLine => console.log(color('[FFmpeg]'), 'commandLine'))
                .on('progress', progress => console.log(color('[FFmpeg]'), 'progress'))
                .on('end', () => console.log(color('[FFmpeg]'), 'Processing finished!'))
                .stream(write)
        })
        hurtz.sendRawWebpAsSticker(from, sticker.toString('base64'), false)
    }
            break
        case switch_pref+'bass':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            if (isQuotedAudio) {
                let dB = 58
                let freq = 75
                // if (this.args[1]) dB = clamp(parseInt(this.args[1]) || 20, 0, 50)
                // if (this.args[2]) freq = clamp(parseInt(this.args[2]) || 20, 20, 500)
                console.log(color('[WAPI]', 'green'), 'Downloading and decrypt media...')
                const mediaData = await decryptMedia(quotedMsg)
                const bass = await stream2Buffer(write => {
                    ffmpeg(buffer2Stream(mediaData))
                        .audioFilter('equalizer=f=' + freq + ':width_type=o:width=2:g=' + dB)
                        .format('mp3')
                        .on('start', commandLine => console.log(color('[FFmpeg]'), commandLine))
                        .on('progress', progress => console.log(color('[FFmpeg]'), progress))
                        .on('end', () => console.log(color('[FFmpeg]'), 'Processing finished!'))
                        .stream(write)
                })
                hurtz.sendPtt(from, baseURI(bass, 'audio/mp3'), id)
            } else {
                hurtz.reply(from, `Hanya tag data audio!`, id)
            }
            break
        case switch_pref+'sticker':
        case switch_pref+'stiker':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            if (isImage || isQuotedImage || isQuotedFile) {
                hurtz.reply(from, mess.wait, id)
                const encryptMedia = isQuotedImage || isQuotedFile ? quotedMsg : message
                const _mimetype = encryptMedia.mimetype
                const mediaData = await decryptMedia(encryptMedia)
                if (_mimetype === 'image/webp') hurtz.sendRawWebpAsSticker(from, mediaData.toString('base64'), false)
        
                const sticker = await processSticker(mediaData, 'contain')
                await hurtz.sendRawWebpAsSticker(from, sticker.toString('base64'), false)
            } else hurtz.reply(from, `Tagdata stiker atau kirim media gambar!`, id)
            break
        case switch_pref+'stiker_rename':
            try {
                const reading_ = fs.readdirSync('./media/saved_stickers')
                for (let i = 0; i < reading_.length; i++) {
                    fs.rename(`./media/saved_stickers/${reading_[i]}`, `./media/saved_stickers/${reading_[i].slice(0, -5)}.jpg`)
                    // fs.rename(reading_[i], `${reading_}jpg`)
                }
            } catch (e) {
                ERRLOG(e)
            }
            break
        case switch_pref+'botstat':
            const isCas = await hurtz.getIsPlugged() ? "Charging ⚡" : "Not Charged ❌"
            const loadedMsg = await hurtz.getAmountOfLoadedMessages()
            const chatIds = await hurtz.getAllChatIds()
            const groups = await hurtz.getAllGroups()
            const timestamp = speed();
            const latensi = speed() - timestamp
            const MyPhone = await hurtz.getMe()
            const { battery, plugged, phone } = MyPhone
            const { wa_version, mcc, mnc, os_version, device_manufacturer, device_model, os_build_number } = phone
            // console.log(os.hostname())
            hurtz.reply(from, `        〘 Server Info 〙

*HOST* : _${os.hostname()}_
*PLATFORM* : _${os.platform()}_
*CPU* : _${os.cpus()[0].model}_
*SPEED* : _${os.cpus()[0].speed} MHz_ 
*CORE* : _${os.cpus().length}_
*Penggunaan RAM* : _${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB_

*Pesan masuk* : _${loadedMsg}_ 
*Group* : _${groups.length}_ 
*Private Chat* : _${chatIds.length - groups.length}_ 
*Total* : _${chatIds.length}_ 
*Latensi* : _${latensi.toFixed(4)} detik/req_

         〘 Phone Info 〙

*Baterai* : _${battery} ${isCas}_
*Versi WhatsApp* : _${wa_version}_
*MCC* : _${mcc}_
*MNC* : _${mnc}_
*Versi OS* : _${os_version}_
*Tipe Perangkat* : _${device_manufacturer}_
*Model Perangkat* : _${device_model}_
*OS Build Number* : _${os_build_number}_`, id)
            break
        case switch_pref+'unmute':
            console.log(`Unmuted ${name}!`)
            await hurtz.sendSeen(from)
            break
        case switch_pref+'deantilink':
            if (!isGroupAdmins) return hurtz.reply(from, 'Maaf, perintah ini hanya dapat dilakukan oleh admin grup!', id)
            let antliu = JSON.parse(fs.readFileSync('./lib/antilink.json'))
            if (isLinkOn) {
                let index = antliu.indexOf(chat.id);
                antliu.splice(index, 1)
                fs.writeFileSync('./lib/antilink.json', JSON.stringify(antliu, null, 2))
                hurtz.reply(from, `❌ Fitur antilink dinonaktifkan!`, id) 
            } else {
                hurtz.reply(from, '⚠️ Fitur antilink memang belum diaktifkan!', id)
            }
            await hurtz.sendSeen(from)
            break
        case switch_pref+'antilink':
            if (!isGroupAdmins) return hurtz.reply(from, 'Maaf, perintah ini hanya dapat dilakukan oleh admin grup!', id)
            let antli = JSON.parse(fs.readFileSync('./lib/antilink.json'))
            if (isLinkOn) {
                hurtz.reply(from, '⚠️ Fitur antilink telah diaktifkan sebelumnya pada grup ini! apabila ingin menonaktifkannya ketik *!deantilink*')
            } else {
                antli.push(chat.id)
                fs.writeFileSync('./lib/antilink.json', JSON.stringify(antli, null, 2))
                hurtz.reply(from, `✅ Antilink telah diaktifkan! ketik *!deantilink* untuk mematikannya.`, id)
            }
            await hurtz.sendSeen(from)
            break
        case switch_pref+'mute':
            if (!isGroupAdmins) return hurtz.reply(from, 'Maaf, perintah ini hanya dapat dilakukan oleh admin grup!', id)
            muted.push(chat.id)
            fs.writeFileSync('./lib/muted.json', JSON.stringify(muted, null, 2))
            hurtz.reply(from, `Bot telah di mute pada chat ini! *!unmute* untuk membuka mute!`, id)
            await hurtz.sendSeen(from)
            break
        case switch_pref+'grup?':
            if (!isOwner) return hurtz.reply(from, 'Sorry gw gakenal u xixi, cuman ngerti perintah owner bot!', id)
            await hurtz.getAllGroups().then((res) => {

                let gc = `*Grup yang dimasuki bot* :\n`
                for (let i = 0; i < res.length; i++) {
                    gc += `\n*Nama grup* : ${res[i].name}\n*Pesan yang belum terbaca* : ${res[i].unreadCount} chat\n*Tidak spam?* : ${res[i].notSpam}\n`
                }
                hurtz.reply(from, gc, id)
                console.log(res[0])
            })
            break
            //PRIVATE


        case switch_pref+'kirim': {
            if (isGroupMsg) return hurtz.reply(from, `Fitur ini khusus private chat!`)
            if (args.length === 1) return hurtz.reply(from, 'Masukan pesan atau gambar dengan caption *!kirim _teksnya_*, bisa juga tag pesan dan gambar dengan pesan *!kirim _teksnya_*')  
            var cek = pengirim.includes(sender.id);
            const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
            if(!cek){
                return hurtz.reply(from, 'kamu belum terdaftar, untuk mendaftar kirim !daftar no wa kamu\ncontoh : !daftar 628523615486 ', id) //if user is not registered
            } else {           
                if (isMedia && args.length >= 1) {
                    const mediaData = await decryptMedia(message, uaOverride)
                    const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                    const opo = body.slice(6)
                    //pengirim.push(from) //otomatis menambahkan nomor ke database
                    //fs.writeFileSync('./lib/user.json', JSON.stringify(pengirim))
                    hurtz.sendImage(jelema, imageBase64, 'gambar.jpeg',`${opo}\n\nHai, kamu mendapat pesan from : wa.me/${from.replace(/[@c.us]/g, '')}`)
                        .then(() => hurtz.reply(from, 'Berhasil mengirim pesan\nTunggu pesan from seseorang, kalo ga di bales coba lagi aja', id))
                } else if (isQuotedImage && args.length >= 1) {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                    const opo = body.slice(6)
                    //pengirim.push(from) //otomatis menambahkan nomor ke database
                    //fs.writeFileSync('./lib/user.json', JSON.stringify(pengirim))
                    hurtz.sendImage(jelema, imageBase64, 'gambar.jpeg',`${opo}\n\nHai, kamu mendapat pesan from : wa.me/${from.replace(/[@c.us]/g, '')}`)
                        .then(() => hurtz.reply(from, 'Berhasil mengirim pesan\nTunggu pesan from seseorang, kalo ga di bales coba lagi aja', id))                
                } else if (args.length >= 1) {
                    const opo = body.slice(6)
                    //pengirim.push(from) //otomatis menambahkan nomor ke database
                    //fs.writeFileSync('./lib/user.json', JSON.stringify(pengirim))
                    hurtz.sendText(jelema, `${opo}\n\nHai, kamu mendapat pesan from : wa.me/${from.replace(/[@c.us]/g, '').replace(/[-]/g, '')}`)
                        .then(() => hurtz.reply(from, 'Berhasil mengirim pesan\nTunggu pesan from seseorang, kalo ga di bales coba lagi aja', id))   
                } else {
                    await hurtz.reply(from, 'Format salah! Untuk membuka daftar perintah kirim #menu', id)
                } 
            } 
        }     
            break   


            case switch_pref+'daftar': { //menambahkan nomor ke database 
                if (isGroupMsg) return hurtz.reply(from, `Fitur ini khusus private chat!`)
                if (args.length === 1) return hurtz.reply(from, 'Nomornya mana kak?\ncontoh: !daftar 6285226236155')  
                const text = body.slice(8).replace(/[-\s+]/g,'') + '@c.us'
                var cek = pengirim.includes(text);
                if(cek){
                    return hurtz.reply(from, 'Nomor sudah ada di database', id) //if number already exists on database
                } else {
                    const mentah = await hurtz.checkNumberStatus(text) //VALIDATE WHATSAPP NUMBER
                    const hasiluu = mentah.canReceiveMessage ? `Sukses menambahkan nomer ke database\nTotal data nomer sekarang : *${pengirim.length}*` : false
                    if (!hasiluu) return hurtz.reply(from, `Nomor WhatsApp tidak valid [ Tidak terdaftar di WhatsApp ]\nDan pastikan format nomer diawali dengan *62* contoh *6285559038022*`, id) 
                    {
                    pengirim.push(mentah.id._serialized)
                    fs.writeFileSync('./lib/pengguna.json', JSON.stringify(pengirim))
                        hurtz.sendText(from, hasiluu)
                    }
                }
        }
            break   


            case switch_pref+'hapus': //menghapus nomor from database
            if (isGroupMsg) return hurtz.reply(from, `Fitur ini khusus private chat!`)
            if (!isOwner) return hurtz.reply(from, 'Fitur ini hanya dapat digunakan oleh owner bot')  
            if (!args.length >= 1) return hurtz.reply(from, 'Masukkan nomornya, *GUNAKAN AWALAN 62* contoh: 6285226236155')  
            {
                let inx = pengirim.indexOf(args[0]+'@c.us')
                pengirim.splice(inx,1)
                fs.writeFileSync('./lib/pengguna.json', JSON.stringify(pengirim))
                hurtz.reply(from, 'Sukses menghapus nomor from database', id)
            }
            break

            case switch_pref+'list': //melihat daftar nomor di database 
            if (isGroupMsg) return hurtz.reply(from, `Fitur ini khusus private chat!`)
            if (!isOwner) return hurtz.reply(from, 'Fitur ini hanya dapat digunakan oleh owner bot')  
            const num = fs.readFileSync('./lib/pengguna.json')
            const daftarnum = JSON.parse(num)
            console.log(daftarnum)
            let hasiluu = `*Menampilkan daftar list chat anonymous* :\n`
            for (var i = 0; i < daftarnum.length; i++) {
                hasiluu += `\n➣ @${daftarnum[i].replace(/['"@c.us]/g,'')}\n`
            }
            // const hasiluu = daftarnum.toString().replace(/['"@c.us]/g,'').replace(/[,]/g, '\n');
            await hurtz.sendTextWithMentions(from, hasiluu).catch(() => {
                hurtz.reply(from, `_Database kosong!_`, id)
            })
            break   


            //PRIVATE END
        case switch_pref+'cobalimit':
            if (isLimit(sender.id)) return hurtz.reply(from, `limit abis`, id)
                console.log(isLimit(serial))
            await limitAdd(serial)
            await hurtz.sendSeen(from)
            break
        case switch_pref+'limit1':
            // hurtz.reply(from, `_Fitur limit dimatikan! gunakan bot seperlunya aja._`, id)
            var found = false
            const limidat = JSON.parse(fs.readFileSync('./lib/limit.json'))
            for(let lmt of limidat){
                if(lmt.id === serial){
                    let limitCounts = limitCount-lmt.limit
                    if(limitCounts <= 0) return hurtz.reply(from, `Limit request anda sudah habis\n\n_Note : Limit akan direset setiap jam 21:00!_`, id)
                    hurtz.reply(from, `Sisa limit request anda tersisa : *${limitCounts}*\n\n_Note : Limit akan direset setiap jam 21:00!_`, id)
                    found = true
                }
            }
            //console.log(limit)
            //console.log(limidat)
            if (found === false){
                const obj = {id: `${serial}`, limit:0};
                limit.push(obj);
                fs.writeFileSync('./lib/limit.json',JSON.stringify(limit));
                hurtz.reply(from, `Sisa limit request anda tersisa : *${limitCount}*\n\n_Note : Limit akan direset setiap jam 21:00!_`, id)
            }
            await hurtz.sendSeen(from)
            break
        case switch_pref+'limit':
            hurtz.reply(from, `_Fitur limit dimatikan! gunakan bot seperlunya aja._`, id)
            // var found = false
            // const limidat = JSON.parse(fs.readFileSync('./lib/limit.json'))
            // for(let lmt of limidat){
            //     if(lmt.id === serial){
            //         let limitCounts = limitCount-lmt.limit
            //         if(limitCounts <= 0) return hurtz.reply(from, `Limit request anda sudah habis\n\n_Note : Limit akan direset setiap jam 21:00!_`, id)
            //         hurtz.reply(from, `Sisa limit request anda tersisa : *${limitCounts}*\n\n_Note : Limit akan direset setiap jam 21:00!_`, id)
            //         found = true
            //     }
            // }
            // console.log(limit)
            // console.log(limidat)
            // if (found === false){
            //     let obj = {id: `${serial}`, limit:1};
            //     limit.push(obj);
            //     fs.writeFileSync('./lib/limit.json',JSON.stringify(limit, 1));
            //     hurtz.reply(from, `Sisa limit request anda tersisa : *${limitCount}*\n\n_Note : Limit akan direset setiap jam 21:00!_`, id)
            // }
            await hurtz.sendSeen(from)
            break
        case switch_pref+'restartlimit':
        case switch_pref+'restart':
        case switch_pref+'reset':
            if (!isOwner) return hurtz.reply(from, `_Hanya Owner Bot Yang Bisa Mereset config!_`, id)
            if (args.length === 1) return hurtz.reply(from, `_Masukan nama sesi!_`, id)
            hurtz.reply(from, '⚠️ *[INFO]* Reseting ...', id)
            setting.restartState = true
            setting.restartId = chat.id
            // let obj = {id: `${sender.id}`, limit:0};
            // const obj = []
            // limit.push(obj);
            // fs.writeFileSync('./lib/limit.json',JSON.stringify(obj, 1));
            fs.writeFileSync('./lib/config.json', JSON.stringify(setting, null, 2));
            // fs.writeFileSync('./lib/msgLimit.json', JSON.stringify(obj));
            const spawn = require('child_process').exec;
            function os_func() {
                this.execCommand = function (cmd) {
                    return new Promise((resolve, reject)=> {
                    spawn(cmd, (error, stdout, stderr) => {
                        if (error) {
                            reject(error);
                            return;
                        }
                        resolve(stdout)
                    });
                })
            }}
            var osa = new os_func();
            osa.execCommand(`pm2 restart ${args[1]}`).then(res => {
                hurtz.reply(from, `✅ _Reset config Completed!_`, id)
                INFOLOG(res)
            }).catch(err=> {
                ERRLOG("os >>>", err);
                hurtz.reply(from, `Kesalahan saat restart bot!`, id)
            })
            await hurtz.sendSeen(from)
            break
        case switch_pref+'ceklokasi':
            //if (type === 'chat') return hurtz.reply(from, `Mohon tag lokasi anda! (sharelok)`, id)
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)            
            try {
                hurtz.reply(from, mess.wait, id)
                if (quotedMsg.type !== 'location') return hurtz.reply(from, `Maaf, format pesan salah.\nKirimkan lokasi dan reply dengan caption !ceklokasi`, id)
                console.log(`Request Status Zona Penyebaran Covid-19 (${quotedMsg.lat}, ${quotedMsg.lng}).`)
                const zoneStatus = await getLocationData(quotedMsg.lat, quotedMsg.lng)
                if (zoneStatus.kode !== 200) hurtz.reply(from, 'Maaf, Terjadi error ketika memeriksa lokasi yang anda kirim.', id)
                console.log(zoneStatus)
                let datax = ''
                for (let i = 0; i < zoneStatus.data.length; i++) {
                    const { zone, region } = zoneStatus.data[i]
                    const _zone = zone == 'green' ? 'Hijau* (Aman) ✅\n' : zone == 'yellow' ? 'Kuning* (Waspada) ⚠️\n' : 'Merah* (Bahaya) 📛\n'
                    datax += `${i + 1}. Kel. *${region}* Berstatus *Zona ${_zone}`
                }
                const text = `*CEK LOKASI PENYEBARAN COVID-19*\nHasil pemeriksaan from lokasi yang anda kirim adalah *${zoneStatus.status}* ${zoneStatus.optional}\n\nInformasi lokasi terdampak disekitar anda:\n${datax}`
                hurtz.reply(from, text, id)
            } catch(e){
                ERRLOG(e)
                hurtz.reply(from, `Mohon tag data lokasi anda! (sharelok) lalu kirim perintah *!ceklokasi*`)
            }
            break
        case '$':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)            
            if (args.length === 1) return hurtz.reply(from, `Chat dengan simi caranya ketik perintah :\n*$* _Pesan kamu_\nContoh :\n*$* _Halo simi_`, id)
            try {
                const que = body.slice(2)
                const sigot = await get.get(`http://simsumi.herokuapp.com/api?text=${que}&lang=id`).json()
                hurtz.reply(from, sigot.success, id)
            } catch(e) {
                hurtz.reply(from, `Siminya mati kak:(`, id)
            }
            await hurtz.sendSeen(from)
            break
        case switch_pref+'fact':
        case switch_pref+'facts':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)            
            const faks = `https://api.i-tech.id/tools/fakta?key=ijmalalfafanajib`
            const getting = await get.get(faks).json()
            await hurtz.reply(from, `*FACTS* : ${getting.result}`, id).catch((e) => ERRLOG(e))
            await hurtz.sendSeen(from)
            break
        //case switch_pref+'fact':
        case switch_pref+'indoht':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)            
            const faksx = `https://test.mumetndase.my.id/indohot`
            const gettingx = await get.get(faksx).json()
            //console.log(gettingx)
            await hurtz.reply(from, `*Judul* : ${gettingx.data.judul}\n*Genre* : ${gettingx.data.genre}\n*Negara* : ${gettingx.data.country}\n*Durasi* : ${gettingx.data.durasi}\n*Link gan* : ${gettingx.data.url}`, id).catch((e) => ERRLOG(e))
            await hurtz.sendSeen(from)
            break
        case switch_pref+'pantun':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)            
            const pans = `https://api.i-tech.id/tools/pantun?key=ijmalalfafanajib`
            const gettingpa = await get.get(pans).json()
            await hurtz.reply(from, `${gettingpa.result}`, id).catch((e) => ERRLOG(e))
            await hurtz.sendSeen(from)
            break
        case switch_pref+'quran':
//https://api.i-tech.id/tools/quran?key=ijmalalfafanajib&surat=2
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)            
            if (args.length === 1) return hurtz.reply(from, `Kirim perintah Surah Quran kamu dengan cara ketik perintah :\n*!quran* _Urutan surat_\nContoh :\n*!quran* _1_`, id)
            const qura = `https://api.i-tech.id/tools/quran?key=ijmalalfafanajib&surat=${args[1]}`
            const gettingqu = await get.get(qura).json()
            let hasqu = `*Quran Surat ${args[1]}*\n\n________________________________________`
            if (gettingqu.code === '404') return hurtz.reply(from, `_Terdapat kesalahan saat mencari surat ${args[1]}_`)
            for (let i = 0; i < gettingqu.result.length; i++) {
                hasqu += `\nAyat : ${gettingqu.result[i].nomor}\n${gettingqu.result[i].ar}\n${gettingqu.result[i].id}\n________________________________________`
            }
            await hurtz.reply(from, `${hasqu}`, id).catch((e) => hurtz.reply(from, `_Terdapat kesalahan saat ,encari surat ${args[1]}_`, id))
            console.log(gettingqu)
            await hurtz.sendSeen(from)
            break
        case switch_pref+'pictquote':
        case switch_pref+'pictquotes':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)            
            try {
            hurtz.reply(from, mess.wait)
            const pictq = await get.get('https://inspirobot.me/api?generate=true')
            console.log(pictq.body)
            hurtz.sendFileFromUrl(from, pictq.body, 'QUOTES.jpg', `Quotes untuk ${pushname}`, id)
        } catch (e){
            ERRLOG(e)
            hurtz.reply(from, `Kesalahan saat mengambil data quotes!`, id)
        } 
            break
        case switch_pref+'cekjodoh':
//https://api.i-tech.id/tools/cekjodoh?key=iwEdte-kAPiT1-3Cj3JD-siWNHI-xc6jV7&query=aku-kamu
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)            
            if (args.length === 1) return hurtz.reply(from, `Kirim perintah Cek Jodoh kamu dengan cara ketik perintah :\n*!cekjodoh* _Kamu_|_nama pasanganmu_\nContoh :\n*!cekjodoh* _asep_|_udin_`, id)
            hurtz.reply(from, mess.wait, id)
            const quejod = body.slice(10)
            const jod = `https://api.i-tech.id/tools/cekjodoh?key=ijmalalfafanajib&query=${encodeURIComponent(quejod.split('|')[0])}-${encodeURIComponent(quejod.split('|')[1])}`
            const gettingjo = await get.get(jod).json()
            // console.log(gettingjo)
            await hurtz.reply(from, `${gettingjo.result}`, id).catch(() => hurtz.reply(from, '_Kesalahan! pastikan anda menggunakan perinath yang benar. Ketik *!cekjodoh*_', id))
            await hurtz.sendSeen(from)
            break
        case switch_pref+'ramalanjodoh':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)            
            if (args.length === 1) return hurtz.reply(from, `Kirim perintah Cek Jodoh kamu dengan cara ketik perintah :\n*!ramalanjodoh* _Kamu|nama pasanganmu_\nContoh :\n*!ramalanjodoh* _asep|udin_`, id)
            hurtz.reply(from, mess.wait, id)
            const quejodr = body.slice(14)
            const jodr = `https://api.i-tech.id/tools/jodoh?key=ijmalalfafanajib&p1=${encodeURIComponent(quejodr.split('|')[0])}&p2=${encodeURIComponent(quejodr.split('|')[1])}`
            const gettingjor = await get.get(jodr).json()
            // console.log(gettingjor)
            await hurtz.sendFileFromUrl(from, gettingjor.gambar, 'pirstlope.png', `*Hasil ramalan jodoh from ${quejodr.split('|')[0]} dan ${quejodr.split('|')[1]}*\n\n*Sisi Positif* : ${gettingjor.sisi.positif}\n*Sisi Negatif* : ${gettingjor.sisi.negatif}`, id).catch((e) => ERRLOG(e))
            await hurtz.sendSeen(from)
//https://api.i-tech.id/tools/jodoh?key=iwEdte-kAPiT1-3Cj3JD-siWNHI-xc6jV7&p1=Andi&p2=Aurel
            break
        case switch_pref+'search':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)            
            if (args.length === 1) return hurtz.reply(from, `Kirim perintah Google search dengan cara ketik perintah :\n*!search* _Query search_\nContoh :\n*!search* _Detik News hari ini_`, id)
            hurtz.reply(from, mess.wait, id)
            const googleQuery = body.slice(8)
            if(googleQuery == undefined || googleQuery == ' ') return hurtz.reply(from, `_Kesalahan tidak bisa menemukan hasil from ${googleQuery}_`, id)
            google({ 'query': googleQuery }).then(results => {
            let captserch = `_*Hasil Pencarian Google from*_ ${googleQuery}\n`
            for (let i = 0; i < results.length; i++) {
                captserch += `\n\n=============================\n\n`
                captserch +=  `\n*Judul* : ${results[i].title}\n*Deskripsi* : ${results[i].snippet}\n*Link* : ${results[i].link}\n`
            }
                hurtz.reply(from, captserch, id);
            }).catch(e => {
                ERRLOG(e)
                hurtz.sendText(ownerNumber, e);
            })
            await hurtz.sendSeen(from)
            break
        case switch_pref+'dmlist':
            hurtz.reply(from, `Free Fire
50     💎 Rp : 6.840
70     💎 Rp : 9.405
100   💎 Rp : 13.680
140   💎 Rp : 18.810
210   💎 Rp : 28.215
355   💎 Rp : 47.025
720   💎 Rp : 94.050
1075 💎 Rp : 141.075
1440 💎 Rp : 188.100
2000 💎 Rp : 256.500
Member mingguan : 28.500
Member bulanan    : 114.000`, id)
            break
        case switch_pref+'qrcode':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)        
            if (args.length === 1) return hurtz.reply(from, `Kirim perintah create QR Code dengan cara ketik perintah :\n*!qrcode* _Ketik pesan_\nContoh :\n*!qrcode* _MRHRTZ@kali:~#_`, id)
           
            const qrdata = body.slice(8)
            try {
                hurtz.reply(from, mess.wait, id)
                await hurtz.sendFileFromUrl(from, `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${qrdata}`, 'pictqr.png', `_Berhasil membuat kode QR ${pushname}_`).catch(err => ERRLOG('[ERROR] send image'))
            } catch (err) {
                ERRLOG(err)
                await hurtz.reply(from, `_Mohon maaf tidak bisa memproses QR Code!_`, id)
            }
            await hurtz.sendSeen(from)
            break
        case switch_pref+'pembayaran':
            hurtz.reply(from, `ID:
Harga:
Pesanan:`, id)
            break
        case switch_pref+'bug':
            // if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)        
            if (args.length === 1) return hurtz.reply(from, `Kirim laporan bug dengan cara ketik perintah :\n*!bug* _Ketik pesan_\nContoh :\n*!bug* _Bug di perintah !musik tolong fix_`, id)
            const ygingin = body.slice(5)
            await hurtz.sendText(ownerNumber, `*BUG!!!* :\n\n*From* ${pushname}\n*Grup* : ${name}\n*WA* : wa.me/${sender.id.replace('@c.us','')}\n*Content* : ${ygingin}\n*TimeStamp* : ${time}\n\n\n\n|${from}|${id}|`).then(() => hurtz.reply(from, `_[DONE] Laporan telah terkirim, mohon kirim laporan dengan jelas atau kami tidak akan menerima laporan tersebut sebagai bug!_`, id))
            await hurtz.sendSeen(from)
            break
        case switch_pref+'sendbug':
            if (args.length === 1) return hurtz.reply(from, `Usage : [from, "MSG", id]`, id)
            if (!isOwner) return hurtz.reply(from, 'Perintah ini hanya untuk Owner bot!', id)
            if (!quotedMsg) return hurtz.reply(from, `Tag woeee`, id)
            const perom = quotedMsg.body.split('|')
            await hurtz.reply(perom[1], `*Pesan from owner* : ${body.slice(9)}`, perom[2]).then(() => hurtz.reply(from, `Sukses balas chat bug!`, id))
            .catch((err) => {
                ERRLOG(err)
                hurtz.reply(from, `Gunakan format yang benar! [from, "message", id]`, id)
            })
            break
        case switch_pref+'stikernobg':
        case switch_pref+'stickernobg':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
           // if (args.length === 1 && !isMedia || args.length === 1 && !quotedMsg) return hurtz.reply(from, `Kirim foto dengan caption *!stickernobg*`, id)
           
            if (isMedia && type === 'image') {
              try {
                var mediaData = await decryptMedia(message, uaOverride)
                var imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                var base64img = imageBase64
                var outFile = './media/img/noBg.png' //5tHjBbPSh3gYoHD9rTqiVCa7 [ { title: 'Insufficient credits', code: 'insufficient_credits' } ]
                var result = await removeBackgroundFromImageBase64({ base64img, apiKey: 'C5epTF1WmcV9CeGfAk6EUzbm', size: 'auto', type: 'auto', outFile })
                    await fs.writeFile(outFile, result.base64img)
                    await hurtz.sendImageAsSticker(from, `data:${mimetype};base64,${result.base64img}`)
                } catch(err) {
                    ERRLOG(err)
                    //hurtz.reply(from, `Maaf, Tidak dapat mengidentifikasi background! mungkin terlalu banyak warna.\n\n_Apabila anda terus melihat pesan ini meskipun gambar jelas mohon chat owner untuk di fix!_`, id)
                    hurtz.reply(from, `_Sepertinya anda bukan member vip._`, id)
                }
                
            } else if (quotedMsg && quotedMsg.type == 'image') {
                hurtz.reply(from, `Maaf, media tidak terdeteksi! Kirim foto dengan caption *!stickernobg* bukan tag`, id) 
            } else {
                hurtz.reply(from, `Kirim foto dengan caption *!stickernobg*`, id)
            }
            await hurtz.sendSeen(from)
            break
        case switch_pref+'stickerori':
        case switch_pref+'stikerori':
        if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            if (isMedia && type === 'image') {
                hurtz.reply(from, mess.wait, id)
                const mediaDataa = await decryptMedia(message, uaOverride)
                const filenamea = `./media/imgscale.${mimetype.split('/')[1]}`
                await fs.writeFileSync(filenamea, mediaDataa)
                const imageBase64a = `data:${mimetype};base64,${mediaDataa.toString('base64')}`
                await hurtz.sendImageAsSticker(from, imageBase64a)
                    }
             else if (quotedMsg && quotedMsg.type == 'image') {
                hurtz.reply(from, mess.wait, id)
                const mediaDataa = await decryptMedia(quotedMsg, uaOverride)
                const imageBase64a = `data:${quotedMsg.mimetype};base64,${mediaDataa.toString('base64')}`
                const filenamea = `./media/imgscale.${quotedMsg.mimetype.split('/')[1]}`
                await fs.writeFileSync(filenamea, mediaDataa)
                await hurtz.sendImageAsSticker(from, imageBase64a)
                 
                //await hurtz.sendImageAsSticker(from, imageBase64)
            } else if (args.length === 2) {
                const url = args[1]
                if (url.match(isUrl)) {
                    await hurtz.sendStickerfromUrl(from, url, { method: 'get' })
                        .catch(err => ERRLOG('Caught exception: ', err))
                } else {
                    hurtz.reply(from, mess.error.Iv, id)
                }
            } else {
                    hurtz.reply(from, mess.error.St, id)
            }
            await hurtz.sendSeen(from)
            break
        case switch_pref+'newbot':
            if (!isOwner) return hurtz.reply(from, `Hanya owner oke!`, id)
            if (args.length === 1) return hurtz.reply(from, `Masukan nama sesi!`, id)
            try {
                
                await exec(`npm start ${body.slice(8)}`, async function (error, stdout, stderr) {
                    hurtz.reply(from, util.format(stdout), id)
                    
                })
            } catch(e){
                ERRLOG(e)
            }
            break
        case switch_pref+'stickerres':
        case switch_pref+'stikerres':
        /*
if (isMedia) {
                if (mimetype === 'video/mp4' && message.duration < 10 || mimetype === 'image/gif' && message.duration < 10) {
                    const mediaData = await decryptMedia(message, uaOverride)
                    hurtz.reply(from, `_Permintaan anda sedang diproses mohon tunggu sebentar_ ⏲️ _Tunggu perkiraan kurang lebih 1 menit_`, id)
                    const filename = `./media/aswu.${mimetype.split('/')[1]}`
                    await fs.writeFileSync(filename, mediaData)
                    await exec(`gifify ${filename} -o ./media/output-stik.${mimetype} --resize=240:240`, async function (error, stdout, stderr) {
                        const gif = await fs.readFileSync('./media/output.${mimetype}', { encoding: "base64" })
                        await hurtz.sendImageAsSticker(from, `data:${mimetype};base64,${mediaData.toString('base64')}`)
                    })
                } else (
                    hurtz.reply(from, `_Kesalahan ⚠️ Hanya bisa video/gif apabila file media berbentuk gambar ketik *!stiker*_`, id)
                )
            }
        */
       
        // if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            if (isMedia && type === 'image') {
                hurtz.reply(from, mess.wait, id)
                const mediaData = await decryptMedia(message, uaOverride)
                const filename = `./media/imgscale.${mimetype.split('/')[1]}`
                await fs.writeFileSync(filename, mediaData)
                const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                //await hurtz.sendImageAsSticker(from, imageBase64)
                // const filename = `./media/aswu.${mimetype.split('/')[1]}`
                //     await fs.writeFileSync(filename, mediaData)
                    await exec(`gifify ${filename} -o ./media/output-stik.${mimetype.split('/')[1]} --resize=640:640`, async function (error, stdout, stderr) {
                        const jpeg = await fs.readFileSync(`./media/output-stik.${mimetype.split('/')[1]}`, { encoding: "base64" })
                        await hurtz.sendImageAsSticker(from, `data:${mimetype};base64,${jpeg.toString('base64')}`)
                    })
            } else if (quotedMsg && quotedMsg.type == 'image') {
                hurtz.reply(from, mess.wait, id)
                const mediaData = await decryptMedia(quotedMsg, uaOverride)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                const filename = `./media/imgscale.${quotedMsg.mimetype.split('/')[1]}`
                await fs.writeFileSync(filename, mediaData)
                //await hurtz.sendImageAsSticker(from, imageBase64)
                // const filename = `./media/aswu.${mimetype.split('/')[1]}`
                //     await fs.writeFileSync(filename, mediaData)
                    await exec(`gifify ${filename} -o ./media/output-stik.${quotedMsg.mimetype.split('/')[1]} --resize=640:640`, async function (error, stdout, stderr) {
                        const quot = await fs.readFileSync(`./media/output-stik.${quotedMsg.mimetype.split('/')[1]}`, { encoding: "base64" })
                        await hurtz.sendImageAsSticker(from, `data:${quotedMsg.mimetype};base64,${quot.toString('base64')}`)
                    })
                //await hurtz.sendImageAsSticker(from, imageBase64)
            } else if (args.length === 2) {
                const url = args[1]
                if (url.match(isUrl)) {
                    await hurtz.sendStickerfromUrl(from, url, { method: 'get' })
                        .catch(err => ERRLOG('Caught exception: ', err))
                } else {
                    hurtz.reply(from, mess.error.Iv, id)
                }
            } else {
                    hurtz.reply(from, mess.error.St, id)
            }
            await hurtz.sendSeen(from)
            break
        case switch_pref+'savestiker':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            if (args.length === 1) return hurtz.reply(from, `Hai ${pushname} untuk menggunakan fitur save stiker ketik *!savestiker* _Nama nya_`, id)
            if (quotedMsg) {
                if (quotedMsg.type === 'sticker') {
                    try {
                        mediaData = await decryptMedia(quotedMsg, uaOverride)
                        fs.writeFileSync(`./media/saved_stickers/${body.slice(12)}.jpg`, mediaData)
                        hurtz.reply(from, `Stiker berhasil tersimpan!\n\nUntuk melihat list ketik *!liststiker*`, id)
                    } catch(e) {
                        hurtz.reply(from, `Gagal save sticker!`, id)
                        hurtz.reply(owner, util.format(e), id)
                    }
                } else {
                    hurtz.reply(from, `Harus tag stiker!`, id)
                }
            } else {
                hurtz.reply(from, `Gaada data yang ditag gan`, id)
            }
            break
        case switch_pref+'liststiker':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            const listed_stick = fs.readdirSync('./media/saved_stickers/')
            let capliststik = `Ketik perintah *!getstiker _Nama nya_* untuk mengambil data stiker\n\n*Jumlah stiker* : ${listed_stick.length}\n\n*Stiker tersimpan :*\n`
            for (let i = 0; i < listed_stick.length; i++) {
                capliststik += `\n➣ ${listed_stick[i].replace('.jpg','')}`
            }
            hurtz.reply(from, capliststik, id)
            break
        case switch_pref+'getstiker':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            if (args.length === 1) return hurtz.reply(from, `Hai ${pushname} untuk menggunakan fitur get stiker ketik *!getstiker* _Nama nya_`, id)
            try {
                const get_stick = await fs.readFileSync('./media/saved_stickers/' + body.slice(11) + '.jpg', { encoding: "base64" })
                await hurtz.sendImageAsSticker(from, `data:image/jpeg;base64,${get_stick.toString('base64')}`)
            } catch (e){
                ERRLOG(e)
                hurtz.reply(from, `Kesalahan mengambil stiker! cek kembali nama stiker dengan ketik *!liststiker*`)
            }
            break
        case switch_pref+'delstiker':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            if (!isOwner) return hurtz.reply(from, `Hanya untuk owner bot!`, id)
            try {
                await fs.unlinkSync('./media/saved_stickers/' + body.slice(11) + '.jpg').then(() => {
                    hurtz.reply(from, `Menghapus Stiker ${body.slice(11)}`, id)
                })
            } catch (e) {

            }
            break
        case switch_pref+'toimage':
        case switch_pref+'toimg':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            if (args.length === 2) return hurtz.reply(from, `Hai ${pushname} untuk menggunakan fitur sticker to image, mohon tag stiker! dan kirim pesan *!toimage*`, id)
            if (quotedMsg) {
                hurtz.reply(from, '_Mohon tunggu sedang mengkonversi stiker..._', id)
                if( quotedMsg.type === 'sticker') {
                //getStickerDecryptable is an insiders feature! 
                    //let stickerDecryptable = await hurtz.getStickerDecryptable(quotedMsg.id)
                    //if(stickerDecryptable) mediaData = await decryptMedia(stickerDecryptable, uaOverride)
                   // await hurtz.sendImage(from, `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`, `${pushname}.jpg`, `Sticker berhasil dikonversi! ${pushname}`)
                   //    } else {
                        mediaData = await decryptMedia(quotedMsg, uaOverride)
                        await hurtz.sendImage(from, `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`, `${pushname}.jpg`, `Sticker berhasil dikonversi! ${pushname}`)
                   //  
                   } else {
                        hurtz.reply(from, `Hai ${pushname} sepertinya yang ada tag bukan stiker, untuk menggunakan fitur sticker to image, mohon tag stiker! dan kirim pesan *!toimage*`, id)
                   }
                } else {
                    hurtz.reply(from, `Hai ${pushname} untuk menggunakan fitur sticker to image, mohon tag stiker! dan kirim pesan *!toimage*`, id)
                }
            await hurtz.sendSeen(from)
            break
        case switch_pref+'ssweb':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            if (args.length === 1) return hurtz.reply(from, 'Kirim perintah *!ssweb* _Website yang akan discreenshot_')
            try {
                hurtz.reply(from, `_Sedang screenshot web..._`, id)
                const urlssny = await get.get('https://api.haipbis.xyz/ssweb?url='+args[1]).json()
                // if (!urlssny.ok) throw new Error(`Error ssweb ${urlssny.statusText}`)
                // const jsonss = await urlssny.json()
                await hurtz.sendFileFromUrl(from, urlssny.result, `SS_from_${args[1]}.jpg`, `Berhasil di screenshot ${pushname}`, id).catch(() => hurtz.reply(from, `Kesalahan saat mengakses dan ss web tersebut.`, id)) 
            } catch (err){
                ERRLOG(err)
                hurtz.reply(from, `Gagal screenshot web!`, id)
            }
            await hurtz.sendSeen(from)
            break
        case switch_pref+'read':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            if (args.length === 1 || args.length > 2) return hurtz.reply(from, 'Kirim perintah *!read* _Id postingan DGC_', id)
                try {
                    hurtz.reply(from, mess.wait, id)
                    const readDGC = await get.get(`http://deepgore-article-api.herokuapp.com/api/article/${args[1]}`).json()
                    const readArr = `         ☠️🇮🇩 *${readDGC.categories[0]}* 🇮🇩☠️\n\n*Judul* : ${readDGC.title}\n*Author* : ${readDGC.author}\n*Waktu Upload* : ${readDGC.published.replace('T',' ').split('.')[0]}\n\n\n${readDGC.content}`
                    await hurtz.sendFileFromUrl(from, readDGC.thumb, `thumb-dgc.png`, readArr, id)
                } catch (e) {
                    ERRLOG(e)
                    hurtz.reply(from, `Kesalahan, Periksa kembali ID read DGC Artikel!`)
                }
            break
        case switch_pref+'dgcartikel':
        case switch_pref+'artikeldgc':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            if (args.length === 1 || args.length > 2) return hurtz.reply(from, 'Kirim perintah *!artikelDgc* _Halaman_', id)
            try {
                hurtz.reply(from, mess.wait, id)
                const jsonDGC = await get.get(`http://deepgore-article-api.herokuapp.com/api/latest-update/${args[1]}`).json()
                const { result } = jsonDGC
                let capTDC = `         ☠️🇮🇩 *ARTIKEL DGC* 🇮🇩☠️\n\n*Jumlah Postingan* : ${jsonDGC.all_post}\n*Jumlah Halaman* : ${jsonDGC.all_pages}\n`
                for (var i = 0; i < result.length; i++) {
                    const iddgc = result[i].id
                    const titel = result[i].title
                    const publis = result[i].published
                    const updat = result[i].update
                    const kategor = result[i].category
                    const desc = result[i].tiny_text
                    const authh = result[i].author_post
                    capTDC += `\n===============================\n\n\n*Urutan* : ${i+1}\n*Judul* : ${titel}\n*Author* : ${authh}\n*Kategori* : ${kategor}\n*Perintah baca* : !read ${iddgc}\n*Published* : ${publis.replace('T',' ').split('.')[0]}\n*Sinopsis* : ${desc}\n`    
                }
                    capTDC += `\n===============================\n\n\n       _Menampilkan ${args[1]} from ${jsonDGC.all_pages} halaman_`
                await hurtz.reply(from, capTDC, id)
            } catch (e) {
                hurtz.reply(from, `Kesalahan! Cek kembali halaman yg tersedia.`, id)
                ERRLOG(e)
            }
            break
        case switch_pref+'play':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            if (args.length === 1) return hurtz.reply(from, 'Kirim perintah *!play* _Judul lagu yang akan dicari_')
            const playy = await get.get(`http://nzcha-api.herokuapp.com/ytsearch?q=${encodeURIComponent(body.slice(6))}`).json()
            const mulaikah = playy.result[0].url
            try {
                hurtz.reply(from, mess.wait, id)
                yta(mulaikah)
                .then((res) => {
                    const { dl_link, thumb, title, filesizeF, filesize } = res
                    axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
                    .then((a) => {
                    if (Number(filesize) >= 30000) return hurtz.sendFileFromUrl(from, thumb, `thumb.jpg`, `*Data Berhasil Didapatkan!*\n\n*Title* : ${title}\n*Ext* : MP3\n*Filesize* : ${filesizeF}\n*Link* : ${a.data}\n\n_Untuk durasi lebih dari batas disajikan dalam bentuk link_`, id)
                    const captions = `*Data Berhasil Didapatkan!*\n\n*Title* : ${title}\n*Ext* : MP3\n*Size* : ${filesizeF}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                    hurtz.sendFileFromUrl(from, thumb, `thumb.jpg`, captions, id)
                    hurtz.sendFileFromUrl(from, dl_link, `${title}.mp3`, `Audio telah terkirim ${pushname}`, id).catch(() => hurtz.reply(from, mess.error.Yt3, id))
                    })

                })
            } catch (err) {
                hurtz.sendText(ownerNumber, 'Error ytmp3 : '+ err)
                ERRLOG(err)
                hurtz.reply(from, mess.error.Yt3, id)
            }
            await hurtz.sendSeen(from)
            break
        case switch_pref+'reqmu':
            const datarqsd = await get.get(`http://nzcha-api.herokuapp.com/ytsearch?q=why`).json()
            console.log(datarqsd.result)
            break
        case switch_pref+'musik':
        case switch_pref+'music':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
           
            if (args.length === 1) return hurtz.reply(from, 'Kirim perintah *!musik* _Judul lagu yang akan dicari_')
            const quer = body.slice(7).toString()
            hurtz.reply(from, mess.wait, id)
            try {
                //hurtz.reply(from, '_Sedang mencari data..._', id)
                const jsonsercmu = await get.get(`http://nzcha-api.herokuapp.com/ytsearch?q=${encodeURIComponent(quer)}`).json()
                // console.log(jsonsercmu)
                // if (!resmus.ok) throw new Error(`unexpected response ${resmus.statusText}`)
                // const jsonsercmu = await resmus.json()
                const { result } = await jsonsercmu
                let berhitung = 1
                let xixixi = `*Hasil pencarian from ${quer}*\n\n_Note : Apabila kesusahan mengambil data id, untuk download musik tag pesan ini dan berikan perintah : *!getmusik urutan* contoh : *!getmusik 2*_\n`
                //console.log(result)
                for (let i = 0; i < result.length; i++) {
                    xixixi += `\n*Urutan* : ${berhitung+i}\n*Title* : ${result[i].title}\n*Channel* : ${result[i].author}\n*Durasi* : ${result[i].timestamp}\n*Perintah download* : _!getmusik ${result[i].id}_\n`
                }
                    xixixi += `\n\n`
                for (let ii = 0; ii < result.length; ii++) {
                    xixixi += `(#)${result[ii].id}`
                }
                await hurtz.sendFileFromUrl(from, result[0].thumb, 'thumbserc.jpg', xixixi, id)
            } catch (err){
                ERRLOG(err)
                hurtz.reply(from, `_Kesalahan saat mencari judul lagu ${quer}_`, id)
            }
            await hurtz.sendSeen(from)
            break
        case switch_pref+'vidio':
        case switch_pref+'video':
        case switch_pref+'film':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
           
            if (args.length === 1) return hurtz.reply(from, 'Kirim perintah *!video* _Judul video yang akan dicari_')
            const querv = body.slice(7)
            hurtz.reply(from, mess.wait, id)
            try {
                //hurtz.reply(from, '_Sedang mencari data..._', id)
                const jsonsercmuv = await get.get(`http://nzcha-api.herokuapp.com/ytsearch?q=${encodeURIComponent(querv)}`).json()
                // if (!resmusv.ok) throw new Error(`unexpected response ${resmusv.statusText}`)
                // const jsonsercmuv = await resmusv.json()
                // let berhitung1 = 1
                const { result } = await jsonsercmuv
                let xixixai = `*Hasil pencarian from ${querv}*\n\n_Note : Apabila kesusahan mengambil data id, untuk download video tag pesan ini dan berikan perintah : *!getvideo urutan* contoh : *!getvideo 2*_\n`
                for (let i = 0; i < result.length; i++) {
                    xixixai += `\n*Urutan* : ${i+1}\n*Title* : ${result[i].title}\n*Channel* : ${result[i].author}\n*Durasi* : ${result[i].timestamp}\n*Perintah download* : _!getvideo ${result[i].id}_\n`
                }
                    xixixai += `\n\n`
                for (let ii = 0; ii < result.length; ii++) {
                    xixixai += `(#)${result[ii].id}`
                }
                await hurtz.sendFileFromUrl(from, result[0].thumb, 'thumbserc.jpg', xixixai, id)
            } catch (err){
                ERRLOG(err)
            }
            await hurtz.sendSeen(from)
            break
        case switch_pref+'playstore':
            //https://api.vhtear.com/playstore?query=ff&apikey=Dim4z05
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
           
            if (args.length === 1) return hurtz.reply(from, 'Kirim perintah *!PlayStore* _Aplikasi/Games yang akan dicari_')
            const keywotp = body.slice(11)
            hurtz.reply(from, mess.wait, id)
            try {
                //hurtz.reply(from, '_Sedang mencari data..._', id)
                const dataplay = await get.get(`https://api.vhtear.com/playstore?query=${keywotp}&apikey=Dim4z05`).json()
                //console.log(dataplay)
                let keluarplay = `*Menampilkan list app ${keywotp}*\n`
                for (let i = 0; i < dataplay.result.length; i++) {
                    keluarplay += `\n*Nama* : ${dataplay.result[i].title}\n*Developer* : ${dataplay.result[i].developer}\n*Deskripsi* : ${dataplay.result[i].description}\n*Paket ID* : ${dataplay.result[i].app_id}\n*Harga* : ${dataplay.result[i].price}\n*Link App* : https://play.google.com${dataplay.result[i].url}\n`
                }
                await hurtz.sendFileFromUrl(from, dataplay.result[0].icon, `icon_app.webp`, keluarplay, id)
            }   catch (err){
                ERRLOG(err)
            }
            await hurtz.sendSeen(from)
            break
        case switch_pref+'igsearch':
        case switch_pref+'searchig':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            if (args.length === 1) return hurtz.reply(from, 'Kirim perintah *!igsearch* _Username_')
            const userigs = body.slice(10)
            hurtz.reply(from, mess.wait, id)
            try {
                await searchUser(userigs).then((us) => {
                    let searchigcapt = `*Hasil pencarian insta from ${userigs}*\n\n`
                    for (let i = 0; i < us.length; i++) {
                        searchigcapt += `
◼️ *Urutan* : ${us[i].number}
◼️ *Username* : ${us[i].username}
◼️ *Nama Lengkap* : ${us[i].name}
◼️ *Id Story Terbaru* : ${us[i].latest_reel}
◼️ *Terverifikasi* : ${us[i].is_verified ? "✅" : "❌"}
◼️ *Akun Private* : ${us[i].is_private ? "✅" : "❌"}
                        `
                    }
                    hurtz.sendFileFromUrl(from, us[0].pic, 'picprofserch.jpg', searchigcapt, id)
                })
            } catch(e) {
                ERRLOG(e)
                hurtz.reply(from, `Terdapat kesalahan saat mencari data ${userigs}`, id)
            }
            await hurtz.sendSeen()
            break
        case switch_pref+'ytsearch':
        case switch_pref+'searchyt':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            if (args.length === 1) return hurtz.reply(from, 'Kirim perintah *!searchyt* _Channel/Title YT yang akan dicari_')
           
            const keywot = body.slice(10)
            hurtz.reply(from, mess.wait, id)
            try {
                //hurtz.reply(from, '_Sedang mencari data..._', id)
                const jsonserc = await Axios.get(`http://nzcha-api.herokuapp.com/ytsearch?q=${encodeURIComponent(keywot)}`)
                // if (!response2.ok) throw new Error(`unexpected response ${response2.statusText}`)
                // const jsonserc = await response2.json()
                // ytsr(args[1]).then((a) => console.log(a))
                const { data } = await jsonserc
                // console.log(data)
                let xixixi = `*Hasil pencarian from ${keywot}*\n`
                for (let i = 0; i < data.result.length; i++) {
                    xixixi += `\n*Title* : ${data.result[i].title}\n*Channel* : ${data.result[i].author}\n*URL* : ${data.result[i].url}\n*Durasi* : ${data.result[i].timestamp}\n*Views* : ${data.result[i].views}\n`
                }
                await hurtz.sendFileFromUrl(from, data.result[0].thumb, 'thumbserc.jpg', xixixi, id)
            } catch (err) {
                    ERRLOG(err)
            }
            await hurtz.sendSeen(from)
            break
        case switch_pref+'sider':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            try {
                if (quotedMsg) {
                    hurtz.getMessageReaders(message.quotedMsgObj.id).then(a => {
                        let siderne = `Para sider jumlahnya ${a.length} orang : \n`
                        for (let i = 0; i < a.length; i++){
                            const nomer = a[i].id.replace('@c.us','')
                            siderne += `➣ @${nomer}\n`
                        }
                        hurtz.sendTextWithMentions(from, siderne, id)
                    })
                } else {
                    hurtz.reply(from, `Hanya tag pesan bot oke!`, id)
                }
            } catch(e) {
                ERRLOG(e)
                hurtz.reply(from, `Pastikan anda tag pesan bot!`, id)
            }
            break
        case switch_pref+'hilih':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            if (quotedMsg) {
                const dataHlih = quotedMsg.type == 'chat' ? quotedMsg.body : quotedMsg.type == 'image' ? quotedMsg.caption : ''
                hurtz.reply(from, dataHlih.replace(/a|u|e|o/gi, 'i'), id)
            } else {
                hurtz.reply(from, body.slice(7).replace(/a|u|e|o/gi, 'i'). id)
            }
            await hurtz.sendSeen(from)
            //str.replace(/a|u|e|o/gi, 'i')
            break
        case switch_pref+'translate':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            if (args.length === 1) return hurtz.reply(from, `Penggunaan untuk translate teks\n\nPenggunaan 1 : *!translate [data bahasa] [teks yang akan ditranslate]* _(tanpa tag)_\nPenggunaan 2 : *!translate [data bahasa]* _(dengan tag)_\n\nContoh 1 : *!translate id hello how are you* _(tanpa tag)_\nContoh 2 : *!translate id* _(tag pesan yang akan ditranslate)_`, id)
           
            //if (!quotedMsg) return hurtz.reply(from, 'Tag pesan yang akan ditranslate!', id)
            if (quotedMsg) {
                const dataTextReal = quotedMsg.type == 'chat' ? quotedMsg.body : quotedMsg.type == 'image' ? quotedMsg.caption : ''
                const lang = args[1].toString()
                    const trans = async (dataText, lang) => {
                    INFOLOG(`Translate text to ${lang}...`)
                    const result = await translate(dataTextReal, {
                        to: lang
                        })
                      .then((res) => hurtz.reply(from, res.text, id))
                      .catch((err) => {
                        //   hurtz.reply(from, `Sepertinya tidak ada data bahasa ${lang}\n\n${bahasa_list}`, id)
                        ERRLOG(err)
                    })
                    // console.log(result.data[0])
                }
                trans(dataTextReal, lang) 
            } else if (args.length >= 2) {
                // !translate id 
                const dataTextManu = body.slice(13)
                const lang = args[1].toString()
                    const trans = async (dataText, lang) => {
                    console.log(`Translate text to ${lang}...`)
                    const result = await translate(dataTextManu, {
                        to: lang
                        })
                      .then((res) => hurtz.reply(from, res.text, id))
                      .catch((err) => hurtz.reply(from, `Sepertinya tidak ada data bahasa ${lang}\n\n${bahasa_list}`, id))
                    // console.log(result.data[0])
                }
                trans(dataTextManu, lang)
            } else {
                hurtz.reply(from, `Kesalahan mentranslate`, id)
            }
            await hurtz.sendSeen(from)
            break
        case switch_pref+'tostiker':
        case switch_pref+'tosticker':
            //if (args.length === 1) return hurtz.reply(from, `Penggunaan teks to sticker : *!tosticker [Teks]*\n\nContoh : !tosticker bot ganteng`)
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            if (isMedia && type === 'image' || quotedMsg && quotedMsg.type === 'image') return hurtz.reply(from, 'Fitur ini hanya untuk teks! bukan gambar.', id)
           
            const texk = body.slice(10)
            hurtz.reply(from, '_Sedang mengkonversi teks ke stiker..._', id)
            //hurtz.reply(from, '_Fitur ini sedang down dikarenakan terlalu banyak request._', id)
            try {
                if (quotedMsgObj == null) {
                    if (args.length === 1) return hurtz.reply(from, `Mohon masukan teks setelah *!tostiker*\nContoh : *!tostiker Bot Ganz*`, id)
                    const GetData = await BikinTikel(texk)
                    //if (GetData.status == false) return hurtz.reply(from, 'Kesalahan dalam mengkonversi teks! tag tulisan atau gunakan teks setelah perintah *!tosticker [teks]*', id)
                    try {
                        await hurtz.sendImageAsSticker(from, GetData.base64)
                    } catch (err) {
                        ERRLOG(err)
                    }
                } else {
                    const GetData = await BikinTikel(quotedMsgObj.body)
                    if (GetData.status == false) return hurtz.reply(from, 'Kesalahan dalam mengkonversi teks! tag tulisan atau gunakan teks setelah perintah *!tosticker [teks]*', id)
                    try {
                        await hurtz.sendImageAsSticker(from, GetData.base64)
                    } catch (err) {
                        ERRLOG(err)
                    }
                }
            } catch (err){
                ERRLOG(err)
                hurtz.reply(from, `_Kesalahan! saat membuat stiker._`)
            }


           // try
           //      {
           //          const string = body.toLowerCase().includes('!ttp') ? body.slice(5) : body.slice(5)
           //          if(args)
           //          {
           //              if(quotedMsgObj == null)
           //              {
           //                  const gasMake = await getStickerMaker(string)
           //                  if(gasMake.status == true)
           //                  {
           //                      try{
           //                          await hurtz.sendImageAsSticker(from, gasMake.base64)
           //                      }catch(err) {
           //                          await hurtz.reply(from, 'Gagal membuat.', id)
           //                      } 
           //                  }else{
           //                      await hurtz.reply(from, gasMake.reason, id)
           //                  }
           //              }else if(quotedMsgObj != null){
           //                  const gasMake = await getStickerMaker(quotedMsgObj.body)
           //                  if(gasMake.status == true)
           //                  {
           //                      try{
           //                          await hurtz.sendImageAsSticker(from, gasMake.base64)
           //                      }catch(err) {
           //                          await hurtz.reply(from, 'Gagal membuat.', id)
           //                      } 
           //                  }else{
           //                      await hurtz.reply(from, gasMake.reason, id)
           //                  }
           //              }
                       
           //          }else{
           //              await hurtz.reply(from, 'Tidak boleh kosong.', id)
           //          }
           //      }catch(error)
           //      {
           //          ERRLOG(error)
           //      }
            await hurtz.sendSeen(from)
            break;
        case switch_pref+'gambar':
        case switch_pref+'images':
            // https://api.i-tech.id/dl/googlei?key=iwEdte-kAPiT1-3Cj3JD-siWNHI-xc6jV7&query=odading
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)            
            if (args.length === 1) return hurtz.reply(from, `Kirim perintah search gambar dengan cara ketik perintah :\n*!gambar* _Katakunci_\nContoh :\n*!gambar* _kopi_`, id)
            try {
                hurtz.reply(from, mess.wait, id)
                const quegam = body.slice(8)
                const gamb = `http://nzcha-api.herokuapp.com/googleimage?q=${encodeURIComponent(quegam)}`
                const gettinggam = await get.get(gamb).json()
                if (gettinggam.error) return console.log(`error ${gettinggam.error}`)
                var plorgam = Math.floor(Math.random() * gettinggam.result.length)
                // console.log(plorgam)
                await hurtz.sendFileFromUrl(from, gettinggam.result[plorgam], `gam.${gettinggam.result[plorgam].substr(-3)}`, `*Hasil pencarian google image from ${quegam}*`, id).catch((e) => { ERRLOG(e); hurtz.reply(from, `_Data tersebut tidak ditemukan!_`, id)})
            } catch (e) {
                ERRLOG(e)
            }
            await hurtz.sendSeen(from)
            break
        case switch_pref+'gambar2':
            //https://api.fdci.se/rep.php?gambar=
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)            
            if (args.length === 1) return hurtz.reply(from, `Kirim perintah search gambar dengan cara ketik perintah :\n*!gambar* _Katakunci_\nContoh :\n*!gambar* _kopi_`, id)
            try {
                hurtz.reply(from, mess.wait, id)
                const quegam2 = body.slice(8)
                const gamb2 = `https://api.fdci.se/rep.php?gambar=${encodeURIComponent(quegam2)}`
                const gettinggam2 = await get.get(gamb2).json()
                if (gettinggam2.error) return console.log(`error ${gettinggam2.error}`)
                var plorgam = Math.floor(Math.random() * gettinggam2.length)
                // console.log(plorgam)
                await hurtz.sendFileFromUrl(from, gettinggam2[plorgam], `gam.${gettinggam2[plorgam].substr(-3)}`, `*Hasil pencarian image from ${quegam2}*`, id).catch((e) => { hurtz.reply(from, `_Data tersebut tidak ditemukan!_`, id)})
            } catch (e) {
                ERRLOG(e)
                hurtz.reply(from, `Tidak bisa menemukan data ${quegam2}!`)
            }
            await hurtz.sendSeen(from)
            break
        case switch_pref+'wallpaper':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            if (args.length <= 2 || args.length == 1) return await hurtz.reply(from, 'Random image generator splash, bisa untuk wallpaper.\npenggunaan : *!gambar [halaman] [kata kunci]* contoh *!gambar 1 office*', id)
            try {
                if (args.length > 2){
                const reqpage = args[1]
                const reqimg = args.slice(2, args.length)
                const imgurl = `https://api.unsplash.com/search/photos?page=${reqpage}&query=${reqimg}&hurtz_id=J92b7gyJFWEdgT3z6OXZlqXovHjcn9242Ob4rKdE3uA`
                const has = await get.get(imgurl).json()
                const { total, total_pages, results } = has
                if (total > 0) {
                    const total_img = between(0, results.length)
                    const linkUrlFull = results[total_img].urls.full
                    const shortgetFull = await get.get(`https://api.haipbis.xyz/bitly?url=${linkUrlFull}`).json()
                    const hazel = `*${results[total_img].alt_description}*\n\n*Deskripsi :* ${results[total_img].description}\n*Width :* ${results[total_img].width}\n*Height :* ${results[total_img].height}\n*Link HD :* ${shortgetFull.result}\n\n_Menampilkan page ${reqpage} from ${total_pages} halaman_`
                    const outsplash = results[total_img].urls.regular
                    await hurtz.sendFileFromUrl(from, outsplash, 'outimagesplash.jpeg', hazel, id)
                    } else {
                        await hurtz.reply(from, `[ERROR] Gambar dengan nama ${reqimg} tidak ditemukan!`, id)
                    }
                }
            } catch (e) {
                ERRLOG(e)
            }
            await hurtz.sendSeen(from)
            break
        case switch_pref+'stickergif':
        case switch_pref+'stikergif':    
        case switch_pref+'sgif':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            // if (!isMedia) return hurtz.reply(from, '_Kesalahan! kirim video/gif dengan caption *!stikerGif* max 10 detik! bukan tag._', id)
            // if (isMedia) {
            
            hurtz.reply(from, `_Permintaan anda sedang diproses mohon tunggu sebentar_ ⏲️`, id)
            if (isMedia && type === 'video' || mimetype === 'image/gif') {
                try {
                    const mediaData = await decryptMedia(message, uaOverride)
                    await hurtz.sendMp4AsSticker(from, mediaData, {fps: 17, startTime: `00:00:00.0`, endTime : `00:00:05.0`,loop: 0})
                } catch (e) {
                    hurtz.reply(from, `Size media terlalu besar! mohon kurangi durasi video.`)
                }
            } else if (quotedMsg && quotedMsg.type == 'video' || quotedMsg && quotedMsg.mimetype == 'image/gif') {
                const mediaData = await decryptMedia(quotedMsg, uaOverride)
                await hurtz.sendMp4AsSticker(from, mediaData, {fps: 15, startTime: `00:00:00.0`, endTime : `00:00:05.0`,loop: 0})
            } else {
                hurtz.reply(from, `_Kesalahan ⚠️ Hanya bisa video/gif apabila file media berbentuk gambar ketik *!stiker*_`, id)
            } 
            await hurtz.sendSeen(from)
            break
        case switch_pref+'nuliss':
            if (args.length === 1) return hurtz.reply(from, 'Kirim perintah !nulis [teks]', id)
            const text = body.slice(7)
            hurtz.reply(from, mess.wait, id)
            const splitText = text.replace(/(\S+\s*){1,10}/g, '$&\n')
            const fixHeight = splitText.split('\n').slice(0, 25).join('\n')
            spawn('convert', [
                '-background',
                'white',
                '-font',
                'Berlin-Sans-FB',
                '-size',
                '1100x1100',
                '-gravity',
                'Center',
                'weight',
                '700',
                'Caption',
                fixHeight,
                '-fuzz',
                '10%',
                '-transparent',
                'white',
                './media/img/tstik.png'
            ])
            .on('error', () => hurtz.reply(from, 'Error gan', id))
            .on('exit', () => {
                hurtz.sendImage(from, './media/img/tstik.png', 'coba.png', 'Jadee', id)
            })
            await exec(`gifify ${filename} -o ./media/output-stik.${mimetype.split('/')[1]} --resize=640:640`, async function (error, stdout, stderr) {
                        const jpeg = await fs.readFileSync(`./media/output-stik.${mimetype.split('/')[1]}`, { encoding: "base64" })
                        await hurtz.sendImageAsSticker(from, `data:${mimetype};base64,${jpeg.toString('base64')}`)
                    })
            break
            //gifify ${filename} -o ./media/output.gif --fps=30 --resize=240:240
       //  case switch_pref+'stickergif':
       // case switch_pref+'stikergif':
       // case switch_pref+'sgif':
       //      if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
       //      if (!isMedia || type == message) return hurtz.reply(from, '_Kesalahan! kirim video/gif dengan caption *!stikerGif* max 10 detik! bukan tag._', id)
       //      if (isMedia) {
       //          if (mimetype === 'video/mp4' && message.duration < 10 || mimetype === 'image/gif' && message.duration < 10) {
       //              hurtz.reply(from, mess.wait, id)
       //              const mediaData = await decryptMedia(message, uaOverride)
       //              const filename = `./media/aswu.${mimetype.split('/')[1]}`
       //              console.log(filename)
       //              await fs.writeFileSync(filename, mediaData)
       //              await exec(`gifify ${filename} -o ./media/output-aa.gif --fps=30 --resize=240:240`, async function (error, stdout, stderr) {
       //                  const gif = await fs.readFileSync('./media/output-aa.gif', { encoding: "base64" })
       //                  await hurtz.sendImageAsSticker(from, `data:image/gif;base64,${gif.toString('base64')}`)
       //              })
       //          } else (
       //              hurtz.reply(from, `_Kesalahan ⚠️ Hanya bisa video/gif apabila file media berbentuk gambar ketik *!stikergif*_`, id)
       //          )
       //      }
       //      await hurtz.sendSeen(from)
            break
        case switch_pref+'donasi':
        case switch_pref+'donate':
            hurtz.sendLinkWithAutoPreview(from, 'https://github.com/MRHRTZ', donate)
            await hurtz.sendSeen(from)
            break
        case switch_pref+'tts':
        if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
       
            try {
                if (args.length === 1) return hurtz.reply(from, 'Kirim perintah *!tts [code_bahasa] [teks]*, contoh *!tts id halo semua*')
                var dataBhs = args[1]      
                const ttsHZ = require('node-gtts')(dataBhs)
                var dataText = body.slice(8)
                if (dataText === '') return hurtz.reply(from, 'Masukkan teksnya', id)
               // if (dataText.length > 500) return hurtz.reply(from, 'Teks terlalu panjang!', id)
                var dataBhs = body.slice(5, 7)
                ttsHZ.save('./media/tts/tts.mp3', dataText, function () {
                hurtz.sendPtt(from, './media/tts/tts.mp3', id)
                })
            } catch (err){
                ERRLOG(err)
                hurtz.reply(from, bahasa_list, id)
            }
            await hurtz.sendSeen(from)
            break
        // case 'bot':
        //     if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
        //     await hurtz.sendPtt(from, './media/sound/DGC-Sound.mp3', id).then(() => hurtz.sendText(from, 'Ketik *!menu* untuk memulai 😊'))
        //     break
        // case switch_pref+'nulis':
        //     if (args.length === 1) return hurtz.reply(from, 'Kirim perintah *!nulis [teks]*', id)
        //     try {
        //         hurtz.reply(from, '_Bot sedang nulis..._')
        //         const nulis = body.slice(7)
        //         hurtz.reply(from, mess.wait, id)
        //         let urlnulis = "https://api.vhtear.com/write?text="+nulis+"&apikey=Dim4z05"              
        //         await fetch(urlnulis)
        //         .then((gam) => {
        //             hurtz.sendFile(from, gam, 'tulisan.jpg', `Udah di tulis ni ${pushname}`, id);
        //         }).catch(e => {
        //             hurtz.reply(from, "Error terdeteksi, mohon jangan gunakan simbol/karakter tidak dikenal!", id)
        //             ERRLOG(e)
        //         })  
        //     }catch (err){
        //         ERRLOG(err)
        //     }
        //     await hurtz.sendSeen(from)
            // break
        // case switch_pref+'g-asik':
        //     if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
        //     if (args.length === 1) return hurtz.reply(from, 'Kirim perintah *!musik [query]*, untuk contoh silahkan kirim perintah *!readme*')
        //     const serahu = body.slice(7)
        //     try {
        //         hurtz.reply(from, '_Sedang mencari musik, mohon tunggu..._', id)
        //         const respons = await fetch(`https://api.vhtear.com/ytmp3?query=${serahu}&apikey=Dim4z05`)
        //         if (!respons.ok) throw new Error(`unexpected response ${respons.statusText}`)
        //         const json = await respons.json()
        //         const jsonre = await json.result
        //         if (respons.error) {                          //Send File MP3 Berbentuk Dokumen
        //             hurtz.reply(from, resp.error, id)
        //             console.log(respons)
        //         } else {
        //             const { title, duration, image, mp3 } = await jsonre
        //             const captions = `*Data Berhasil Didapatkan!*\n\n*Title* : ${title}\n*Durasi* : ${duration}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
        //             hurtz.sendFileFromUrl(from, image, `thumb.jpg`, captions, id)
        //             await hurtz.sendFileFromUrl(from, mp3, `${title}.mp3`, '', id).catch(() => hurtz.reply(from, `Maaf tidak bisa mendownload lagu seperti itu!`, id)).catch((err) => ERRLOG(err))
        //         }
        //     } catch (err) {
        //         hurtz.sendText(ownerNumber, 'Error musik : '+ err)
        //         hurtz.reply(from, `Error mencari data lagu, mungkin tidak ada lagu seperti itu!`, id)
        //     }
        //     await hurtz.sendSeen(from)
        //     break
        // case switch_pref+'ytfind':
        //     const idyt = getID(args[1])
        //     console.log('ID : '+idyt)

        //     api.searchVideo(idyt).then((data) => {
        //         //console.log(data);
        //         const hasilid = data.items[0].snippet
        //         const waktupubs = hasilid.publishedAt.replace(/T|Z/gi,' ')
        //         const descripsi = hasilid.description
                
        //         const konten = data.items[0]
        //         const durasion = konten.contentDetails.duration.replace(/PT|S/gi,'').replace('M',':')
        //         const viewers = konten.statistics.viewCount
        //         const likes = konten.statistics.likeCount
        //         const dislikes = konten.statistics.dislikeCount
        //         const komen = konten.statistics.commentCount

        //         //console.log(hasilid)
        //         console.log(`
        //          Waktu publish : ${waktupubs}
        //          Deskripsi : ${descripsi}
        //          Durasi : ${durasion}
        //          Jumlah View : ${viewers}
        //          Jumlah Like : ${likes}
        //          Jumlah Dislike : ${dislikes}
        //          Jumlah Komentar : ${komen}
        //         `)
        //     },(err) => {
        //        // console.error(err);
        //        hurtz.sendText(from, err)
        //     })
        //     await hurtz.sendSeen(from)
            break
        case switch_pref+'.':
            yta('https://youtube.com/watch?v='+args[1]).then(c => console.log(c))
            break
        case switch_pref+'getmusik':
        case switch_pref+'getmusic':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
           
            try {
                if (quotedMsg && quotedMsg.type == 'image') {
                    if (args.length === 1) return hurtz.reply(from, 'Kirim perintah *!getmusik _IdDownload_*, untuk contoh silahkan kirim perintah *!readme*')
                    if (!Number(args[1])) return hurtz.reply(from, `_Apabila ditag hanya cantumkan nomer urutan bukan ID Download!_  contoh : *!getmusik _1_*`, id)
                    const dataDownmp3 = quotedMsg.type == 'chat' ? quotedMsg.body : quotedMsg.type == 'image' ? quotedMsg.caption : ''
                    const pilur = dataDownmp3.split('(#)')
                    hurtz.reply(from, mess.wait, id)
                    
                    yta(`https://youtube.com/watch?v=${pilur[args[1]]}`)
                    .then((res) => {
                        const { dl_link, thumb, title, filesizeF, filesize } = res
                        axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
                        .then((a) => {
                        if (Number(filesize) >= 30000) return hurtz.sendFileFromUrl(from, thumb, `thumb.jpg`, `*Data Berhasil Didapatkan!*\n\n*Title* : ${title}\n*Ext* : MP3\n*Filesize* : ${filesizeF}\n*Link* : ${a.data}\n\n_Untuk durasi lebih dari batas disajikan dalam bentuk link_`, id)
                        const captions = `*Data Berhasil Didapatkan!*\n\n*Title* : ${title}\n*Ext* : MP3\n*Size* : ${filesizeF}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                        hurtz.sendFileFromUrl(from, thumb, `thumb.jpg`, captions, id)
                        hurtz.sendFileFromUrl(from, dl_link, `${title}.mp3`, `Audio telah terkirim ${pushname}`, id).catch(() => hurtz.reply(from, mess.error.Yt3, id))
                        })
                    }).catch((e) => {
                        ERRLOG(e)
                        hurtz.reply('Kesalahan saat mendownload data yg dipilih! pastikan id from perintah *!musik* sudah benar.')
                    })

                } else if (quotedMsg && quotedMsg.type == 'chat') { 
                    hurtz.reply(from, `_Salah tag! hanya tag pesan berisi data hasil from penelusuran musik._`, id)
                } else {
                    if (args.length === 1) return hurtz.reply(from, 'Kirim perintah *!getmusik _IdDownload_*, untuk contoh silahkan kirim perintah *!readme*')
                    if (args[1] <= 25) return hurtz.reply(from, `_Apabila ingin mengambil data musik dengan nomor urutan, mohon tag pesan bot tentang pencarian musik!_`,)
                    hurtz.reply(from, mess.wait, id)
                    yta(`https://youtu.be/${args[1]}`)
                    .then((res) => {
                        const { dl_link, thumb, title, filesizeF, filesize } = res
                        axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
                        .then((a) => {
                        if (Number(filesize) >= 30000) return hurtz.sendFileFromUrl(from, thumb, `thumb.jpg`, `*Data Berhasil Didapatkan!*\n\n*Title* : ${title}\n*Ext* : MP3\n*Filesize* : ${filesizeF}\n*Link* : ${a.data}\n\n_Untuk durasi lebih dari batas disajikan dalam bentuk link_`, id)
                        const captions = `*Data Berhasil Didapatkan!*\n\n*Title* : ${title}\n*Ext* : MP3\n*Size* : ${filesizeF}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                        hurtz.sendFileFromUrl(from, thumb, `thumb.jpg`, captions, id)
                        hurtz.sendFileFromUrl(from, dl_link, `${title}.mp3`, `Audio telah terkirim ${pushname}`, id).catch(() => hurtz.reply(from, mess.error.Yt3, id))
                        })

                    })
                }
            } catch (err) {
                hurtz.sendText(ownerNumber, 'Error ytmp3 : '+ err)
                hurtz.reply(from, `_Kesalahan! Pastikan id download sudah benar._`, id)
                ERRLOG(err)
            }
            await hurtz.sendSeen(from)
            break
        case switch_pref+'getvideo':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            if (args.length === 1) return hurtz.reply(from, 'Kirim perintah *!getvideo* _IdDownload_, untuk contoh silahkan kirim perintah *!readme*', id)
            //let isLinks2 = args[1].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
            //if (!isLinks2) return hurtz.reply(from, mess.error.Iv, id)
            try {    
            if (quotedMsg && quotedMsg.type == 'image') {
                if (!Number(args[1])) return hurtz.reply(from, `_Apabila ditag hanya cantumkan nomer urutan bukan ID Download!_  contoh : *!getvideo _1_*`, id)
                const dataDownmp3 = quotedMsg.type == 'chat' ? quotedMsg.body : quotedMsg.type == 'image' ? quotedMsg.caption : ''
                const pilur = dataDownmp3.split('(#)')
                console.log(pilur[args[1]])
                hurtz.reply(from, mess.wait, id)
                //const response1a = await fetch(`https://api.vhtear.com/ytdl?link=https://www.youtube.com/watch?v=${args[1]}&apikey=Dim4z05`)
                // const barbarytp45 = await get.get(`https://nzcha-api.herokuapp.com/ytdl?id=${pilur[args[1]]}`).json()
                //await get.get(`https://nzcha-api.herokuapp.com/ytdl?id=${encodeURIComponent(pilur[args[1]])}`).json()
                //if (!response1a.ok) throw new Error(`unexpected response vhtear ${response1a.statusText}`);
                // if (!mhankyt45.ok) throw new Error(`Err mhankyt4 ${mhankyt45.statusText}`)
                // if (barbarytp45.error) return console.log(barbarytp45.error)
                //const jsona = await response1a.json()
                // const barbarytp45 = await mhankyt45.json()
                //const jsonrea = await jsona.result
                ytv(`https://youtu.be/${pilur[args[1]]}`)
                    .then((res) => {
                        // console.log(res)
                        const { dl_link, thumb, title, filesizeF, filesize } = res
                        axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
                        .then((a) => {
                        if (Number(filesize) >= 40000) return hurtz.sendFileFromUrl(from, thumb, `thumb.jpg`, `*Data Berhasil Didapatkan!*\n\n*Title* : ${title}\n*Ext* : MP3\n*Filesize* : ${filesizeF}\n*Link* : ${a.data}\n\n_Untuk durasi lebih dari batas disajikan dalam bentuk link_`, id)
                        const captions = `*Data Berhasil Didapatkan!*\n\n*Title* : ${title}\n*Ext* : MP3\n*Size* : ${filesizeF}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                        hurtz.sendFileFromUrl(from, thumb, `thumb.jpg`, captions, id)
                        hurtz.sendFileFromUrl(from, dl_link, `${title}.mp4`, `Video telah terkirim ${pushname}`, id).catch(() => hurtz.reply(from, mess.error.Yt3, id))
                        })

                    })
                 
            } else if (quotedMsg && quotedMsg.type == 'chat') { 
                    hurtz.reply(from, `_Salah tag cok! hanya tag pesan berisi data hasil from penelusuran video._`, id)
            } else {
                if (args.length === 1) return hurtz.reply(from, 'Kirim perintah *!getvideo _Id Video_*, untuk contoh silahkan kirim perintah *!readme*')
                if (args[1] <= 25) return hurtz.reply(from, `_Apabila ingin mengambil data video dengan nomor urutan, mohon tag pesan bot tentang pencarian video!_`,)
                hurtz.reply(from, mess.wait, id)
                //const response1a = await fetch(`https://api.vhtear.com/ytdl?link=https://www.youtube.com/watch?v=${args[1]}&apikey=Dim4z05`)
                const barbarytp45 = await get.get(`https://st4rz.herokuapp.com/api/ytv2?url=https://youtu.be/${args[1]}`).json()
                //if (!response1a.ok) throw new Error(`unexpected response vhtear ${response1a.statusText}`);
                // if (!mhankyt45.ok) throw new Error(`Err mhankyt4 ${mhankyt45.statusText}`)
                //const jsona = await response1a.json()
                if (barbarytp45.error) return barbarytp45.error
                // const barbarytp45 = await mhankyt45.json()
                //const jsonrea = await jsona.result
                 if (barbarytp45.status != 200) {                          //Send File MP3 Berbentuk Dokumen
                    hurtz.reply(from, `_Kesalahan sedang mengganti metode download..._`, id)
                    try {
                    //     const { title, UrlVideo, UrlMp3, imgUrl } = await jsonrea
                    //     const captions = `*Data Berhasil Didapatkan!*\n\n*Title* : ${title}\n*Ext* : MP4\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                    //     hurtz.sendFileFromUrl(from, imgUrl, `thumb.jpg`, captions, id)
                    //     await hurtz.sendFileFromUrl(from, UrlVideo, `${title}.mp4`, '', id).catch(() => hurtz.reply(from, mess.error.Yt4, id))
                        hurtz.reply(from, `_Kesalahan mohon chat owner untuk di fix!_`, id)
                    } catch (err){
                        ERRLOG(err)
                    }
                } else {
                    const { title, ext, thumb, filesize, resolution, result } = await barbarytp45
                    const shortmus2 = await urlShortener(result)
                    // if (Number(barbarytp45.filesize.split(' MB')[0]) > 50.00) return hurtz.sendFileFromUrl(from, thumb, `thumb.jpg`, `*Data Berhasil Didapatkan!*\n\n*Title* : ${title}\n*Ext* : MP3\n*Filesize* : ${filesize}\n*Link* : ${shortmus2}\n\n_Untuk durasi lebih dari batas disajikan dalam bentuk link_`, id)
                    //const { title, UrlVideo, UrlMp3, imgUrl } = await jsonre
                    //try {
                        const captions = `*Data Berhasil Didapatkan!*\n\n*Title* : ${title}\n*Ext* : MP4\n*Filesize* : ${filesize}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                        //console.log(response1)                    
                        hurtz.sendFileFromUrl(from, thumb, `thumb.jpg`, captions, id)
                        await hurtz.sendFileFromUrl(from, result, `${title}.mp4`, `Video telah terkirim ${pushname}`, id).catch(() => hurtz.reply(from, mess.error.Yt3, id))

            }
            }
            } catch (err) {
                hurtz.sendText(ownerNumber, 'Error getvid4 : '+ err)
                hurtz.reply(from, mess.error.Yt4, id)
            }
            break
        case switch_pref+'fresh':
            try {
                await hurtz.refresh().then((pres) => hurtz.reply(from, `Berhadil direfresh ${pres}`, id)) 
            } catch (err){
                ERRLOG(err)
            }
            await hurtz.sendSeen(from)
            break
        case 'cekstat':
            console.log(message.sender)
            await hurtz.getStatus(id).then((hasid) => console.log(hasid))
            await hurtz.sendSeen(from)
            break
        case switch_pref+'nyanyi':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
           
            if (args.length === 1) return hurtz.reply(from, 'Kirim perintah *!nyanyi _Lagunya_*, untuk contoh silahkan kirim perintah *!readme*')
            const quernyanyi = body.slice(8)
            try {
                hurtz.reply(from, mess.wait, id)
                const datanyanyi = await get.get(`https://api.vhtear.com/music?query=${quernyanyi}&apikey=Dim4z05`).json()
                // if (!bahannyanyi) throw new Error(`Err nyanyi :( ${bahannyanyi.statusText}`)
                // const datanyanyi = await bahannyanyi.json()
    
                // console.log(datanyanyi)
                hurtz.reply(from, `_Bot sedang vn..._`)
                if (Number(datanyanyi.result[0].duration.split(':')[1]) >= 12) return hurtz.reply(from, '_Mohon maaf sepertinya durasi video telah melebihi batas._', id)
                if (!datanyanyi.result[0].judul == '') {
                    hurtz.sendFileFromUrl(from, datanyanyi.result[0].linkImg, 'Thumbnyanyi.jpg',`Bot nyanyi lagu : ${datanyanyi.result[0].judul}\nfrom penyanyi : ${datanyanyi.result[0].penyanyi}\nDurasinya : ${datanyanyi.result[0].duration}`)
                    await hurtz.sendFileFromUrl(from, datanyanyi.result[0].linkMp3, 'Laginyanyi.mp3', '', id).catch((errs) => console.log(errs))
                } else {
                    hurtz.reply(from, `_Kayanya bot gabisa nyanyi lagu itu :(_`, id)
                }
            } catch (err) {
                ERRLOG(err)
                hurtz.reply(from, `_Kayanya bot gabisa nyanyi lagu itu hemm :(_`, id)
            }
            await hurtz.sendSeen(from)
            break
        case switch_pref+'harta':

            const queha = body.slice(7)
            hurtz.sendStickerfromUrl(from, `https://api.vhtear.com/hartatahta?text=${queha}&apikey=mrhrtz-for-vhtear`, { method: 'get' })
            // .then(({ data }) => {
            //     hurtz.sendStickerfromUrl(from, `data:image/png;base64,${data.toString('base64')}`)
            // })
            break
        case switch_pref+'suit':
            const s_batu = await fs.readFileSync(`./media/suit/batu.png`, { encoding: "base64" })
            const s_gunting = await fs.readFileSync(`./media/suit/gunting.png`, { encoding: "base64" })
            const s_kertas = await fs.readFileSync(`./media/suit/kertas.png`, { encoding: "base64" })
            
            const acaksuit = Math.floor(Math.random() * 3)

            console.log(acaksuit)

            if (acaksuit === 0) {
                await hurtz.sendImageAsSticker(from, `data:image/png;base64,${s_batu.toString('base64')}`)
            } else if (acaksuit === 1) {
                await hurtz.sendImageAsSticker(from, `data:image/png;base64,${s_gunting.toString('base64')}`)
            } else {
                await hurtz.sendImageAsSticker(from, `data:image/png;base64,${s_kertas.toString('base64')}`)
            }
            break
        case switch_pref+'getstiker':
            try{
                const dbsticker = '{"key":"dgc.jpg"}'
                const stikJs = JSON.parse(dbsticker)
                // console.log(stikJs)
                const namaStick6 = await fs.readFileSync(`./media/img/${stikJs.key}`, { encoding: "base64" })
                await hurtz.sendImageAsSticker(from, `data:image/jpeg;base64,${namaStick6.toString('base64')}`)
                }catch (err) {
                    console.error(err.message)
                }
            break
        case 'done':
            if (sender.id !== '6288233282599@c.us') return
            const pnag = await fs.readFileSync(`./media/Freedom.png`, { encoding: "base64" })
            await hurtz.sendImageAsSticker(from, `data:image/png;base64,${pnag.toString('base64')}`)
            break
        case '#done':
            // if (chat.id !== '6285216810127-1602212654@g.us') return 
            const png = await fs.readFileSync(`./media/CSstik.png`, { encoding: "base64" })
            await hurtz.sendImageAsSticker(from, `data:image/png;base64,${png.toString('base64')}`)
            // hurtz.sendImageAsSticker(from, './media/CSstik.png')
            break
        case '#menu':
            if (chat.id !== '6285216810127-1602212654@g.us') return 
            hurtz.reply(from, `
#menu > Daftar Perintah Bot
#ml > Daftar Harga DM Mobile legends
#ff > Daftar Harga DM Free Fire
#pubg > Daftar Harga UC PUBG 
#Payment > Menu Pembayaran
#FormatOrder > Format untuk order
===============
Time now ${time}
                `, id)
            break
        case '#payment':
            if (chat.id !== '6285216810127-1602212654@g.us') return 
            hurtz.reply(from, `
💰 PAYMENT 💰

🏦 BANK BRI
 801001000689508
A/N : ARIF RAHMAT

💳 DANA
089516074556 
A/N : SUDINAH

💷 GOPAY
081388861086 
A/N : CRAFFTSTORE.1

NB MOHON TRANSAKSI MENGGUNAKAN BUKTI TRANFER KALO TIDAK ADA BUKTI GK AKAN KAMI PROSES
https://chat.whatsapp.com/HHfql9wXQ7O2b3laFIV1Hm
                `, id)
            break
        case '#format order':
        case '#formatorder':
            if (chat.id !== '6285216810127-1602212654@g.us') return 
            hurtz.reply(from, `
╔═══❖•ೋ° °ೋ•❖═══╗
             Format order
╚═══❖•ೋ° °ೋ•❖═══╝
📝 NICK :
🎰 ID :
📠 JUMBLAH DIAMOND :

NOTE :
HARAP SABAR BILA BER ORDER KARENA NGANTRI DAN GK USAH SPAM SPAM NANTI PASTI KITA ISIKAN DIAMONDNYA

Ig @crafftstore.1
                `, id)
            break
        case '#pubg':
            if (chat.id !== '6285216810127-1602212654@g.us') return 
            hurtz.reply(from, `
LIST PUBG REG INDO

74 💸 = Rp 15.600
148 💸 = Rp 28.800
221 💸 = Rp 41.800
295 💸 = Rp 55.100
770 💸 = Rp 131.900
2013 💸 = Rp 329.000
4200 💸 = Rp 650.000
8750 💸 = Rp 1.300.000

ROYALE PASS = Rp 145.000

PENTING! 
MOHON BERTRANSAKSI MENGGUNAKAN FORMAT ORDER DAN BERTRANSAKSI VIA GRUP AGAR ADMIN FAST RESPON
      https://chat.whatsapp.com/HHfql9wXQ7O2b3laFIV1Hm
                `, id)
            break
        case '#ml':
            if (chat.id !== '6285216810127-1602212654@g.us') return 
            hurtz.reply(from, `
LIST DM MLBB/MOBILE LEGENDS

VIA BANK  BRI, GOPAY,OVO, DANA, QRISS

86💎 = Rp 19.000
172💎 = Rp 40.000
257💎 = Rp 60.000
344💎 = Rp 72. 000
514💎 = Rp 120.000
706💎 = Rp 145. 000
878💎 = Rp 178.000
1050💎 = Rp 215.000
1412💎 = Rp 285.000
2194💎 = Rp 425.000
2900💎 = Rp 570.000
3072💎 = Rp 610.000
3688💎 = Rp 720.000
5532💎 = Rp 1.100.000
9288💎 = Rp 1.820.000

SL/TW = Rp 120.000
SL+ = Rp 266. 000


NB :
MOHON BERTRANSAKSI MENGGUNAKAN FORMAT ORDER DAN BERTRANSAKSI VIA GRUP AGAR ADMIN FAST RESPON
https://chat.whatsapp.com/HHfql9wXQ7O2b3laFIV1Hm
                `, id)
            break
        case '#ff':
            if (chat.id !== '6285216810127-1602212654@g.us') return 
            hurtz.reply(from, `
            LIST DM FF
            5 💎 = 990
            20 💎 = 2.900
            50 💎 =6.690
            70💎 =9.500
            100💎 =13.800
            140💎 =18.610
            210💎 =28.380
            355 💎 =46.700
            500 💎 =66.800
            720 💎 =93.999
            860 💎 =112.700
            1000 💎 =132.100
            1355💎 =177.400
            2000 💎 =270.300
            MM = 28.500
            MB = 112.680
            
            330 SELL 92.000
            
            NB
            MOHON BERTRANSAKSI DENGAN #FORMATORDER DAN BERTRANSAKSI DI DALAM GRUP AGAR ADMIN FAST RESPON
            https://chat.whatsapp.com/HHfql9wXQ7O2b3laFIV1Hm
                `, id)
            break
        case switch_pref+'cekgrup':
            await hurtz.reply(from, `ID GRUP : ${chat.id}`, id)
            break
        case switch_pref+'ytmp3':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            if (args.length === 1) return hurtz.reply(from, 'Kirim perintah *!ytmp3 [linkYt]*, untuk contoh silahkan kirim perintah *!readme*')
            let isLinks = args[1].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
            if (!isLinks) return hurtz.reply(from, mess.error.Iv, id)
            try {
                hurtz.reply(from, mess.wait, id)
                yta(args[1])
                .then((res) => {
                    const { dl_link, thumb, title, filesizeF, filesize } = res
                    axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
                    .then((a) => {
                    if (Number(filesize) >= 30000) return hurtz.sendFileFromUrl(from, thumb, `thumb.jpg`, `*Data Berhasil Didapatkan!*\n\n*Title* : ${title}\n*Ext* : MP3\n*Filesize* : ${filesizeF}\n*Link* : ${a.data}\n\n_Untuk durasi lebih dari batas disajikan dalam bentuk link_`, id)
                    const captions = `*Data Berhasil Didapatkan!*\n\n*Title* : ${title}\n*Ext* : MP3\n*Size* : ${filesizeF}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                    hurtz.sendFileFromUrl(from, thumb, `thumb.jpg`, captions, id)
                    hurtz.sendFileFromUrl(from, dl_link, `${title}.mp3`, `Audio telah terkirim ${pushname}`, id).catch(() => hurtz.reply(from, mess.error.Yt3, id))
                    })

                })
            } catch (err) {
                hurtz.sendText(ownerNumber, 'Error ytmp3 : '+ err)
                ERRLOG(err)
                hurtz.reply(from, mess.error.Yt3, id)
            }
            await hurtz.sendSeen(from)
            break   
        case switch_pref+'ytmp4':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
           
            if (args.length === 1) return hurtz.reply(from, 'Kirim perintah *!ytmp4* _linkYt_, untuk contoh silahkan kirim perintah *!readme*', id)
            let isLinks2 = args[1].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
            if (!isLinks2) return hurtz.reply(from, mess.error.Iv, id)
            try {
                hurtz.reply(from, mess.wait, id)
                ytv(args[1])
                .then((res) => {
                    const { dl_link, thumb, title, filesizeF, filesize } = res
                    axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
                    .then((a) => {
                    if (Number(filesize) >= 40000) return hurtz.sendFileFromUrl(from, thumb, `thumb.jpg`, `*Data Berhasil Didapatkan!*\n\n*Title* : ${title}\n*Ext* : MP3\n*Filesize* : ${filesizeF}\n*Link* : ${a.data}\n\n_Untuk durasi lebih dari batas disajikan dalam bentuk link_`, id)
                    const captionsYtmp4 = `*Data Berhasil Didapatkan!*\n\n*Title* : ${title}\n*Ext* : MP3\n*Size* : ${filesizeF}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                    hurtz.sendFileFromUrl(from, thumb, `thumb.jpg`, captionsYtmp4, id)
                    hurtz.sendFileFromUrl(from, dl_link, `${title}.mp3`, `Video telah terkirim ${pushname}`, id).catch(() => hurtz.reply(from, mess.error.Yt3, id))
                    })

                })
            } catch (err) {
                hurtz.sendText(ownerNumber, 'Error ytmp4 : '+ err)
                await hurtz.reply(from, mess.error.Yt4, id)
                ERRLOG(err)
            }
            await hurtz.sendSeen(from)
            break
        case switch_pref+'tiktok':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            if (args.length === 1) return hurtz.reply(from, 'Kirim perintah *!tiktok* _linkVideoTikTod_, untuk contoh silahkan kirim perintah *!readme*', id)
           
            try{
            hurtz.reply(from, '_Mohon tunggu sebentar, sedang di proses..._', id)
            const jsontik = await get.get(`https://api.vhtear.com/tiktokdl?link=${args[1]}&apikey=Dim4z05`).json()
                // if (!restik.ok) throw new Error(`Kesalahan respon : ${restik.statusText}`)
                // const jsontik = await restik.json()
                if (jsontik.error){
                    hurtz.reply(from, `Mohon maaf kesalahan saat mendownload data!`, id)
                } else {
                    const captik = `*Data berhasil Didapatkan*\n\n*Title* : ${jsontik.result.title}\n*Durasi* : ${jsontik.result.duration}\n*Deskripsi* : ${jsontik.result.desk}`
                    console.log(jsontik)
                    hurtz.sendFileFromUrl(from, jsontik.result.image.toString(), `tiktod.jpg`, captik, id)
                    await hurtz.sendFileFromUrl(from, jsontik.result.video.toString(), `${jsontik.result.title}.mp4`, `Video berhasil terkirim ${pushname}`, id)
                }
            } catch (err){
                ERRLOG(err)
                hurtz.sendText(ownerNumber, 'Error tiktod = '+err)
                hurtz.reply(from, `Terjadi kesalahan saat mengakses file tersebut, tidak bisa mengirim video!`)
            }
            await hurtz.sendSeen(from)
            break
        case switch_pref+'wiki':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
           
            if (args.length === 1) return hurtz.reply(from, 'Kirim perintah *!wiki [query]*\nContoh : *!wiki asu*', id)
            const query_ = body.slice(6)
            hurtz.reply(from, mess.wait, id)
            //hurtz.reply(from, '_Sedang mencari data..._', id)
            try {
                const wiki = await get.get(`https://api.vhtear.com/wikipedia?query=${encodeURIComponent(query_)}&apikey=Dim4z05`).json()
                if (wiki.error) {
                    hurtz.reply(from, wiki.error, id)
                } else {
                    // console.log(wiki)
                    //hurtz.reply(from, `_Mohon tunggu sedang mencari data.._`, id)
                    //hurtz.reply(from, `➣ *Query* : ${query_}\n\n➣ *Result* : ${wiki.result}`, id)
                    hurtz.sendFileFromUrl(from, wiki.result.ImgResult[0], wiki.jpg, `*Hasil wikipedia from ${query_}*\n\n${wiki.result.Info}`, id).catch(() => hurtz.reply(from, `*Hasil wikipedia from ${query_}*\n\n${wiki.result.Info}`, id))
                    //console.log(wiki.result.ImgResult[0],wiki.result.Info)
                }
            } catch (err){
                ERRLOG(err)
                hurtz.reply(from, `_Mohon maaf kesalahan saat mencari data ${query_}_`)
            }
            await hurtz.sendSeen(from)
            break
        // case switch_pref+'cuaca':
        //     if (args.length === 1) return hurtz.reply(from, 'Kirim perintah *!cuaca [tempat]*\nContoh : *!cuaca bandung*', id)
        //     const tempat = body.slice(7)
        //     const weather = await get.get('http://iotcampus.net/bmkg/?menu=cuaca&wilayah='+ tempat).json()
        //     if (weather.error) {
        //         hurtz.reply(from, weather.error, id)
        //     } else {
        //         let hihi = `*Menampilkan Cuaca Berdasarkan Wilayah ${args[1]}`
        //         for (let i = 0; i < weather.length; i++) {
        //         hihi += `➣ Kota : ${weather.kota}`
        //         hihi += `➣ Siang : ${weather.Siang}`
        //         hihi += `➣ Malam : ${weather.Malam}`
        //         hihi += `➣ Suhu : ${weather.Suhu} derajat celcius`
        //         hihi += `➣ Kelembaban : ${weather.Kelembaban}\n\n`
        //         }
        //         sleep(2000)
        //         hurtz.reply(from, hihi, id)
        //     }
        //     await hurtz.sendSeen(from)
            break
        case switch_pref+'cuaca':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            if (args.length === 1) return hurtz.reply(from, 'Kirim perintah *!cuaca [tempat]*\nContoh : *!cuaca tangerang', id)
            try {
                // const tempat = body.slice(7)
                hurtz.reply(from, mess.mt, id)
                // //hurtz.reply(from, `_Sedang mencari data cuaca ${tempat}..._`)
                // const weather = await get.get(`https://mhankbarbar.herokuapp.com/api/cuaca?q=${tempat}`).json()
                // if (weather.error) {
                //     hurtz.reply(from, weather.error, id)
                // } else {
                //     hurtz.reply(from, `➣ Tempat : ${weather.result.tempat}\n\n➣ Angin : ${weather.result.angin}\n➣ Cuaca : ${weather.result.cuaca}\n➣ Deskripsi : ${weather.result.desk}\n➣ Kelembapan : ${weather.result.kelembapan}\n➣ Suhu : ${weather.result.suhu}\n➣ Udara : ${weather.result.udara}`, id)
                // }
            } catch (e){
                hurtz.reply(from, `_Kesalahan saat mengambil data tempat ${tempat}_`)
            }
            await hurtz.sendSeen(from)
            
            break
        case switch_pref+'tostikergif':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            hurtz.reply(from, mess.wait, id)
            try {
                if (quotedMsgObj == null) {
                    if (args.length === 1) return hurtz.reply(from, 'Kirim perintah *!tostikergif _Teks_* Contoh : *!tostikergif _MRHRTZ Was Created This Bot!_* Atau tag pesan sebelumnya dengan menggunakan perintah *!tostikergif*', id)
                    await hurtz.sendStickerfromUrl(from, `https://api.vhtear.com/textxgif?text=${body.slice(13)}&apikey=nafiz2020prem`)
                } else {
                    await hurtz.sendStickerfromUrl(from, `https://api.vhtear.com/textxgif?text=${quotedMsg.body}&apikey=nafiz2020prem`)
                    // console.log(`OBJ : ${quotedMsgObj}\nBODY : ${quotedMsg.body}`)
                }
            } catch(e){
                ERRLOG(e)
                hurtz.reply(from, `Kesalahan saat membuat stiker gif!`, id)
            }
            break
        case switch_pref+'fb':
        if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
           
            try {
                if (args.length === 1) return hurtz.reply(from, 'Kirim perintah *!fb [linkFb]* untuk contoh silahkan kirim perintah *!readme*', id)
                if (!args[1].includes('facebook.com')) return hurtz.reply(from, mess.error.Iv, id)
                linkefbeh = args[1].toString()
                hurtz.reply(from, mess.wait, id)
                const epbe = await fb(linkefbeh)
                console.log(linkefbeh)
                const urlnyah = epbe.url
                //Shortener
                // const short = []
                // const shortener = await urlShortener(urlnyah)
                // urlnyah['short'] = shortener
                // short.push(url)
                // await hurtz.sendLinkWithAutoPreview(from, arsg[1], `${epbe.capt}\n\nUntuk server fb sementara media berbentuk link :\n${shortener}`)
                // await urlShortener(urlnyah).then((res) => hurtz.reply(from, `${epbe.capt}\n\nLink : ${res}\n\n_Dikarenakan terdapat kesalahan sistem link fb sementara dalam bentuk link_`, id))
                
                await hurtz.sendFileFromUrl(from, urlnyah, `Cuih${epbe.exts}`, epbe.capt, id).catch((e) => {
                    hurtz.reply(from, `Mohon maaf kesalahan saat mengakses url web!`)
                    ERRLOG(e)
                })
            } catch (err) {
                //hurtz.reply(from, `Kesalahan dengan kode error : ${err}`)
                ERRLOG(err)
            }
            await hurtz.sendSeen(from)
            break
        case switch_pref+'ig':
        if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            try {
                if (args.length === 1) return hurtz.reply(from, 'Kirim perintah *!ig [linkIg]* untuk contoh silahkan kirim perintah *!readme*', id)
                if (!args[1].includes('instagram.com')) return hurtz.reply(from, mess.error.Iv, id)
                hurtz.reply(from, mess.wait, id)
                let arrBln = ["Januari","Februaru","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"]
                const idRegex = /([-_0-9A-Za-z]{11})/
                const idIGG = args[1].match(idRegex)
                await getPost(idIGG[0]).then((post) => {
                    let a = new Date(post.date * 1000)
                    const jam = a.getHours()
                    const menit = a.getMinutes()
                    const bulan = a.getMonth()
                    const tanggal = a.getDate()
                    const tahun = a.getFullYear()
                    const captig = `*Media berhasil terkirim!*\n\n*Username* : ${post.owner_user}\n*Waktu Publish* : ${jam}:${menit} ${tanggal}-${arrBln[bulan - 1]}-${tahun}\n*Text* : ${post.text}`
                    hurtz.sendFileFromUrl(from, post.url, `Insta`, captig, id)
                })
                // const responseig = await Axios.get(`http://localhost:3000/igpost?url=${args[1]}`).
                // console.log(responseig.data)
                // if (responseig.error) return console.log(responseig.error)
                // await hurtz.sendFileFromUrl(from, responseig.result, `Ignyakk`, `Media telah terkirim ${pushname}`, id)
            } catch (err) {
                //hurtz.reply(from, `Kesalahan dengan kode error : ${err}`)
                ERRLOG(err)
            }
            await hurtz.sendSeen(from)
            break
        case switch_pref+'twt':
        if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
           
            try {
                if (args.length === 1) return hurtz.reply(from, 'Kirim perintah *!twt [linkVideoTwitter]* untuk contoh silahkan kirim perintah *!readme*', id)
                if (!args[1].includes('twitter.com')) return hurtz.reply(from, mess.error.Iv, id)
                linktwit = args[1].toString()
                hurtz.reply(from, mess.wait, id)
                const twit = await twt(args[1])
                //hurtz.sendLinkWithAutoPreview(from, twit.link, twit.capt)
                hurtz.sendFileFromUrl(from, twit.url, `Ignyakk${twit.exts}`, twit.capt, id)
            } catch (err) {
                //hurtz.reply(from, `Kesalahan dengan kode error : ${err}`)
                ERRLOG(err)
            }
            await hurtz.sendSeen(from)
            break
        case switch_pref+'sendowner':
            hurtz.sendContact(from, '6285559038021@c.us')
            
            
            await hurtz.sendSeen(from)
            break
        /*case switch_pref+'ig':
            if (args.length === 1) return hurtz.reply(from, 'Kirim perintah *!ig [linkIg]* untuk contoh silahkan kirim perintah *!readme*')
            if (!args[1].match(isUrl) && !args[1].includes('instagram.com')) return hurtz.reply(from, mess.error.Iv, id)
            try {
                hurtz.reply(from, mess.wait, id)
                const resp = await get.get('https://mhankbarbar.herokuapp.com/api/ig?url='+ args[1]).json()
                if (resp.result.includes('.mp4')) {
                    var ext = '.mp4'
                } else {
                    var ext = '.jpg'
                }
                await hurtz.sendFileFromUrl(from, resp.result, `igeh${ext}`, '', id)
            } catch {
                hurtz.reply(from, mess.error.Ig, id)
                }
            await hurtz.sendSeen(from)
            break*/
        case switch_pref+'nsfw':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            if (!isGroupAdmins) return hurtz.reply(from, 'Perintah ini hanya bisa di gunakan oleh Admin group!', id)
           
            if (args.length === 1) return hurtz.reply(from, 'Pilih enable atau disable!', id)
            if (args[1].toLowerCase() === 'enable') {
                nsfw_.push(chat.id)
                fs.writeFileSync('./lib/NSFW.json', JSON.stringify(nsfw_))
                hurtz.reply(from, 'NSWF Command berhasil di aktifkan di group ini! kirim perintah *!nsfwMenu* untuk mengetahui menu', id)
            } else if (args[1].toLowerCase() === 'disable') {
                nsfw_.splice(chat.id, 1)
                fs.writeFileSync('./lib/NSFW.json', JSON.stringify(nsfw_))
                hurtz.reply(from, 'NSFW Command berhasil di nonaktifkan di group ini!', id)
            } else {
                hurtz.reply(from, 'Pilih enable atau disable udin!', id)
            }
            await hurtz.sendSeen(from)
            break
        case switch_pref+'pubg':
            // 
            if (chat.id !== '6288233282599-1601304366@g.us') return
            hurtz.reply(from, `*CLOSE UNTUK SEMENTARA*`, id)
//             hurtz.reply(from, `LIST PUBG REG INDO

// 74 💸 = Rp 14.900
// 221 💸 = Rp 40.900
// 770 💸 = Rp 130.300
// 2013 💸 = Rp 321.600
// 4200 💸 = Rp 642.500
// 8750 💸 = Rp 1.279.000

// ROYALE PASS = Rp 139.400

// PENTING! 
// MOHON BERTRANSAKSI MENGGUNAKAN FORMAT ORDER DAN BERTRANSAKSI VIA GRUP AGAR ADMIN FAST RESPON`, id)
            await hurtz.sendSeen(from)
            break
        case switch_pref+'qris':
            if (chat.id !== '6288233282599-1601304366@g.us') return
            await hurtz.sendFile(from, './media/freedom-qris.jpeg', 'QRIS.jpeg', '*Freedom Store Qris*', id)
            break
        case switch_pref+'ff':
            //
            if (chat.id !== '6288233282599-1601304366@g.us') return
            hurtz.reply(from, `LIST DM FF

10💎 = Rp 1.698
20💎 = Rp 2.830
50💎 = Rp 6.792
70💎 = Rp 9.339
100💎 = Rp 13.584
140💎 = Rp 18.678
210💎 = Rp 28.017
355💎 = Rp 46.695
425💎 = Rp 56.034
500💎 = Rp 66.222
720💎 = Rp 93.390
860💎 = Rp 112.068
1000💎 = Rp 130.746
2000💎 = Rp 254.700

M.Mingguan = Rp 28.300
M.Bulanan = Rp 113.200

PENTING! 
MOHON BERTRANSAKSI MENGGUNAKAN FORMAT ORDER DAN BERTRANSAKSI VIA GRUP AGAR ADMIN FAST RESPON`, id)
            await hurtz.sendSeen(from)
            break
        case switch_pref+'ml':
        //
            if (chat.id !== '6288233282599-1601304366@g.us') return
            hurtz.reply(from, `*CLOSE UNTUK SEMENTARA*`, id)
//             hurtz.reply(from, `LIST DM MLBB

// 86💎 = 19.060 
// 172💎 = 37.820
// 257💎 = 56.350
// 344💎 = 75.190
// 429💎 = 93.860
// 514💎 = 112.480
// 600💎 = 131.160
// 706💎 = 149.930
// 878💎 = 187.300
// 963💎 = 206.880
// 1050💎 = 224.720
// 2195💎 = 445.490
// 3688💎 = 740.200
// 5532💎 = 1.112.500
// 9288💎 = 1.850.700`, id)
            await hurtz.sendSeen(from)
            break
        case switch_pref+'payment':
        //
            if (chat.id !== '6288233282599-1601304366@g.us') return
            hurtz.reply(from, `
🏛️ PAYMENT 🏛️ : 
rek (bca) : 6790287078 (a.n s**i a***h) 
No dana : 088230391819
No gopay : 088230391819
Qris : pp grup
agen : ALFAMART / INDOMARET

kode untuk payment via alfamart/indomaret silahkan minta di admin
                `, id)
            await hurtz.sendSeen(from)
            break
        case switch_pref+'formatorder':
        if (chat.id !== '6288233282599-1601304366@g.us') return
            hurtz.reply(from, `
FORMAT PEMESANAN

ID :
NICKNAME:
JUMLAH ORDER :

KESALAHAN PENULISAN ID BUKAN TANGGUNG JAWAB ADMIN
JANGAN LUPA SERTAKAN BUKTI PEMBAYARAN NYA☺
                `, id)
            await hurtz.sendSeen(from)
            break
        case switch_pref+'freedom':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            if (!isGroupAdmins) return hurtz.reply(from, 'Perintah ini hanya bisa di gunakan oleh Admin group!', id)
            if (args.length === 1) return hurtz.reply(from, 'Penggunaan *!freedom aktif* atau *!freedom mati*', id)
            if (args[1].toLowerCase() === 'aktif') {
                welkomF.push(chat.id)
                fs.writeFileSync('./lib/freedom.json', JSON.stringify(welkomF))
                hurtz.reply(from, 'Fitur penyambutan freedom berhasil di aktifkan di group ini!', id)
            } else if (args[1].toLowerCase() === 'mati') {
                const halfreehapus = welkomF.indexOf(chat.id)
                welkomF.splice(halfreehapus, 1)
                fs.writeFileSync('./lib/freedom.json', JSON.stringify(welkomF))
                hurtz.reply(from, 'Fitur penyambutan freedom berhasil di nonaktifkan di group ini!', id)
            } else {
                hurtz.reply(from, 'Penggunaan *!freedom aktif* atau *!freedom mati*', id)
            }
            await hurtz.sendSeen(from)
            break
        case switch_pref+'dmff':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            if (!isGroupAdmins) return hurtz.reply(from, 'Perintah ini hanya bisa di gunakan oleh Admin group!', id)
            if (args.length === 1) return hurtz.reply(from, 'Penggunaan *!dmff aktif* atau *!dmff mati*', id)
            if (args[1].toLowerCase() === 'aktif') {
                welkomD.push(chat.id)
                fs.writeFileSync('./lib/dmff.json', JSON.stringify(welkomD))
                hurtz.reply(from, 'Fitur penyambutan dmff berhasil di aktifkan di group ini!', id)
            } else if (args[1].toLowerCase() === 'mati') {
                const halffhapus = welkomD.indexOf(chat.id)
                welkomD.splice(halffhapus, 1)
                fs.writeFileSync('./lib/dmff.json', JSON.stringify(welkomD))
                hurtz.reply(from, 'Fitur penyambutan dmff berhasil di nonaktifkan di group ini!', id)
            } else {
                hurtz.reply(from, 'Penggunaan *!dmff aktif* atau *!dmff mati*', id)
            }
            await hurtz.sendSeen(from)
            break
        case switch_pref+'sambutan':
        case switch_pref+'welcome':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            if (!isGroupAdmins) return hurtz.reply(from, 'Perintah ini hanya bisa di gunakan oleh Admin group!', id)
            
            // hurtz.reply(from, mess.mt, id)
            if (args.length === 1) return hurtz.reply(from, 'Pilih Aktif atau Mati!', id)
            if (args[1].toLowerCase() === 'aktif') {
                welkom.push(chat.id)
                fs.writeFileSync('./lib/welcome.json', JSON.stringify(welkom))
                hurtz.reply(from, 'Fitur penyambutan berhasil di aktifkan di group ini!', id)
            } else if (args[1].toLowerCase() === 'mati') {
                welkom.splice(chat.id, 1)
                fs.writeFileSync('./lib/welcome.json', JSON.stringify(welkom))
                hurtz.reply(from, 'Fitur penyambutan berhasil di nonaktifkan di group ini!', id)
            } else {
                hurtz.reply(from, 'Penggunaan *!sambutan aktif* atau *!sambutan mati*', id)
            }
            await hurtz.sendSeen(from)
            break
        case switch_pref+'nsfwmenu':
            if (!isNsfw) return
            hurtz.reply(from, '1. !randomHentai\n2. !randomNsfwNeko', id)
            await hurtz.sendSeen(from)
            break
        case switch_pref+'listdm':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            const capsnya = `
RATE 250 
50💎  6.000
70💎  8.250
100💎12.000
140💎16.500
15💎 18.000
210💎 24.750
355💎 41.250
500💎 58.500
720💎 82.500
1000💎 115.500
1080💎 125.000
2000 💎231.000
4000 💎 462.000
M.Minguan = 25.000
M.Bulanan  = 100.000
-----------------------------------------
LIST FREE FIRE Rate 240🔥
💎5 = Rp 720
💎20 = Rp 2.400 
💎50 = Rp 5.760
💎70 = Rp 7.920
💎100 = Rp 11.520
💎140 = Rp 15.850
💎210 = Rp 23.800
💎280 = Rp 31.700
💎355 = Rp 39.600
💎360 = 40.320
💎425 = Rp 47.550
💎500 = Rp 56.200
💎720 = Rp 79.200
💎1080= Rp 119.600
 MEMBER MINGGUAN: 
Rp 24.000
MEMBER BULANAN:
Rp 96.000

-----------------------------------------
LIST FREE FIRE Rate 245🔥
💎5 = Rp 760
💎20 = Rp 2.800
💎50 = Rp 5.960
💎70 = Rp 8.020
💎100 = Rp 11.820
💎140 = Rp 15.950
💎210 = Rp 24.000
💎280 = Rp 31.900
💎355 = Rp 39.900
💎360 = 40.820
💎425 = Rp 47.850
💎500 = Rp 56.900
💎720 = Rp 79.900
💎1080= Rp 120.000
 MEMBER MINGGUAN: 
Rp 24.200
MEMBER BULANAN:
Rp 96.100


FORMAT ORDER
NICK:
ID:
ORDER:


Ketik perintah : *!pesandm* untuk order
            `
            hurtz.sendFileFromUrl(from, 'http://mrhrtz-wabot.000webhostapp.com/Reseller.jpeg', 'res.jpeg', capsnya, id)
            await hurtz.sendSeen(from)
            break
        case switch_pref+'pesandm':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            const capts = `!<#> FORMAT

FORMAT ORDER💎

ID:
DIAMOND:
PEMBAYARAN:

KEUNTUNGAN:💰 ABANG TF KE NO GOPAY AKU 089625370361


_Hanya isi saja formatnya, dan tidak menghapus apapun!_
                `
            hurtz.sendFileFromUrl(from, 'http://mrhrtz-wabot.000webhostapp.com/bukti.png', 'bukti.png', capts, id)
            await hurtz.sendSeen(from)
            break
        case switch_pref+'<#>':
        if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
         if (isMedia && type === 'image'){
            const ownerNumberFF = '6289625370361@c.us'
            const inputan = body.trim().split('|')
            const hapusser = from.trim().split('-')
            hurtz.forwardMessages(ownerNumberFF, id).then(() => console.log('terkirim!'))
            hurtz.sendText(ownerNumberFF, `HALLO OWNER ADA YANG ORDER NI FORMAT ORDER💎

${caption}

from grup : ${name} 
Dengan nick wa : ${pushname} 
Nomor : wa.me/${hapusser[0]}

                `).then(() => hurtz.reply(from, `_[DONE] Data telah terkirim atas nama ${pushname}!_`))
            console.log(message)
            } else {
                hurtz.reply(from, `*Mohon seperti format diatas! masukan foto bukti pembayaran.*`, id)
            } 
            await hurtz.sendSeen(from)
            break
        case switch_pref+'timeline':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            // 
            hurtz.reply(from, mess.wait, id)
            // await limitAdd(serial)  
            hurtz.reply(from, `_Fitur *!cogan* dan *!cecan* aktif kembalii!_`, id)          
            // const taimlen = await get.get('https://api.i-tech.id/tools/gambar?key=ijmalalfafanajib').json()                                 
            // await hurtz.sendFileFromUrl(from, taimlen.result , 'temlen.jpg',`_Timeline buat ${pushname}.._`, id)
            // await hurtz.sendSeen(from)
            break
        case switch_pref+'ciwi':
        case switch_pref+'cewek':
        case switch_pref+'cecan':
        if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
        // hurtz.reply(from, `_Fitur ini diganti kembali ke *!timeline*`, id)
            await limitAdd(serial)
        hurtz.reply(from, mess.wait, id)
        const imageToBase64 = require('image-to-base64')
        var items = ["sma cecan", "cewe cantik", "hijab cantik", "jilbab sma cantik", "jilbab sma", "cewe sma", "cantik", "sma jilbob", "sma hot"]; //Awokawoka meh laku sc uing :v
        var cewe = items[Math.floor(Math.random() * items.length)];
        var urlciw = "https://api.fdci.se/rep.php?gambar=" + cewe;
        
        axios.get(urlciw)
        .then((result) => {
        var b = JSON.parse(JSON.stringify(result.data));
        var cewek =  b[Math.floor(Math.random() * b.length)];
        imageToBase64(cewek) // Path to the image
        .then(
            (response) => {
        let img = 'data:image/jpeg;base64,'+response
        hurtz.sendFile(from, img, "result.jpg", `Nih ciwinya ${pushname}`, id)
                }) 
            .catch(
                (error) => {
                    ERRLOG(error); // Logs an error if there was one
                })
        })
            await hurtz.sendSeen(from)
            break
        case switch_pref+'cowok':
        case switch_pref+'cogan':
        if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
        // hurtz.reply(from, mess.mt, id)
        
            if(isMsgLimit(serial)){
                    return
                }else{
                    await addMsgLimit(serial)
            }
            await limitAdd(serial)
        hurtz.reply(from, mess.wait, id)
        const imageToBase64a = require('image-to-base64')
        const ithem = ["handsome boy", "cowo ganteng", "cogan"]
        var cowo = ithem[Math.floor(Math.random() * ithem.length)]
        //console.log(cowo)
        var urlciwa = "https://api.fdci.se/rep.php?gambar=" + cowo

        axios.get(urlciwa)
        .then((result) => {
        // console.log(result)
        var b = JSON.parse(JSON.stringify(result.data));
        var cowok =  b[Math.floor(Math.random() * b.length)];
        imageToBase64a(cowok) // Path to the image
        .then(
            (response) => {
        let imga = 'data:image/jpeg;base64,'+response
        hurtz.sendFile(from, imga, "result.jpg", `Nih cogans nya ${pushname}`, id)
                }) 
            .catch(
                (error) => {
                    ERRLOG(error); // Logs an error if there was one
                })
        })
            await hurtz.sendSeen(from)
            break
        case switch_pref+'igtes':
            const instaObj = require('instagram-basic-data-scraper-with-username')

            const user = 'hanif_az.sq.61'
            instaObj.specificField(user, 'fullname').then(fullname => {
                console.log(fullname);
                // => { data: 'Joie' }
              })
        await hurtz.sendSeen(from)
            break
        // case switch_pref+'textscreen':
        //     if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
        //     if (args.length === 1) return hurtz.reply(from, `Gunakan perintah *!textscreen _Teksnya_*\nContoh *!textscreen DGC BOT GANS*`)
        //     hurtz.reply(from, `_Sedang mengkonversi teks ke ASCII_`)
        //     const keasci = body.slice(12)
        //     try {
        //         const teksrin = await get.get(`https://api.vhtear.com/textscreen?query=${keasci}&apikey=Dim4z05`).json()
        //         await hurtz.reply(from, teksrin.result.text, id)
        //         console.log(teksrin.result)
        //     } catch (err){                           //INVALID!!!!
        //         ERRLOG(err)
        //     }                                
        //     await hurtz.sendSeen(from)
            break
        case switch_pref+'setpp':
            const pepes = await fs.readFileSync('./media/DGC.jpg', { encoding: "base64" })
            await hurtz.setProfilePic(`data:image/jpg;base64,${pepes.toString('base64')}`)
            .then((a) => {
                hurtz.reply(from, util.format(a), id)
            }).catch((e) => {
                hurtz.reply(from, util.format(e), id)
            })
            break
        case switch_pref+'setnick':
            await hurtz.setMyName(`DGC CHATBOT V3.5`)
            .then((c) => {
                console.log(c)
                hurtz.reply(from, util.format(c), id)
            }).catch((e) => {

                hurtz.reply(from, util.format(e), id)
            })
            break
        case switch_pref+'igstalk':
        if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
        hurtz.reply(from, mess.wait, id)
           try {
            if (args.length === 1)  return hurtz.reply(from, 'Kirim perintah *!igStalk @username*\nContoh *!igStalk @hanif_az.sq.61*', id)
            await getUser(args[1].replace('@','')).then((user) => {
                const { biography, subscribersCount, subscribtions, postsCount, fullName, username, profilePicHD, isPrivate, isVerified, posts } = user
                const priv_ = isPrivate ? "✅" : "❌"
                const verif_ = isVerified ? "✅" : "❌"
                let isi_post = ``
                for (let i = 0; i < user.posts.length; i++) {
                    const vid_post_ = user.posts[i].isVideo ?  "✅" : "❌"
                    isi_post += `
================================

Capt : ${user.posts[i].caption}
Url : ${user.posts[i].url}
Timestamp : ${new Date(user.posts[i].timestamp * 1000)}
Video : ${vid_post_}
                        `
                }
                const swtich_ = isPrivate ? "Mohon maaf akun ini private" : isi_post
                const captuserig = `➣ *Nama* : ${fullName}
➣ *Username* : ${username}
➣ *Terverifikasi* : ${verif_}
➣ *Akun Private* : ${priv_}
➣ *Jumlah Followers* : ${subscribersCount}
➣ *Jumlah Following* : ${subscribtions}
➣ *Jumlah Postingan* : ${postsCount}
➣ *Biodata* : ${biography}
➣ *Post* : ${swtich_}


                `
                hurtz.sendFileFromUrl(from, profilePicHD, 'Profile.jpg', captuserig, id)
            })
            await hurtz.sendSeen(from)
        } catch (e) {
            ERRLOG(e)
            hurtz.reply(from, `_Terdapat kesalahan saat stalk ${args[1]}_`, id)
        }
         break
        // case switch_pref+'igstalk':
        //     if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
        //     if (args.length === 1)  return hurtz.reply(from, 'Kirim perintah *!igStalk @username*\nContoh *!igStalk @hanif_az.sq.61*', id)
        //     hurtz.reply(from, `_Sedang mencari data profil..._`, id)
            // const stalk = await get.get(`https://api.vhtear.com/igprofile?query=${args[1]}&apikey=Dim4z05`).json()
            // if (stalk.error) return hurtz.reply(from, stalk.error, id)
            // const { biography, follower, follow, post_count, full_name, username, picture, is_private } = stalk.result
            // const caps = `➣ *Nama* : ${full_name}\n➣ *Username* : ${username}\n➣ *Jumlah Followers* : ${follower}\n➣ *Jumlah Following* : ${follow}\n➣ *Jumlah Postingan* : ${post_count}\n➣ *Biodata* : ${biography}`
            // await hurtz.sendFileFromUrl(from, picture, 'Profile.jpg', caps, id)
        //     // const ig = require('instagram-scraping')
        //     // const requse = body.trim().split('@')
        //     // hurtz.reply(from, '_Sedang mencari user..._', id)
        //     // ig.scrapeUserPage('hanif_az.sq.61').then(result => {
        //     //     const name = result.user.full_name
        //     //     const user = result.user.username
        //     //     const bio = result.user.biography
        //     //     const profile = result.user.profile_pic_url_hd
        //     //     const follower = result.user.edge_followed_by.count
        //     //     const following = result.user.edge_follow.count
        //     //     const private = result.user.is_private
        //     //     const post = result.user.edge_owner_to_timeline_media.count
        //     //     hurtz.sendFileFromUrl(from, profile, 'Profile.jpg', `Nama : ${name}\nBio : ${bio}\nUsername : ${user}\nJumlah Post : ${post}\nFollowers : ${follower}\nFollowing : ${following}\nPrivate? : ${private}`, id);
        //     // }).catch((err) => {
        //     //     hurtz.reply(from, '[ERROR] Tidak bisa menemukan username!', id)
        //     //     ERRLOG(err)
        //     // }) 
        //         await hurtz.sendSeen(from)
            break
        case switch_pref+'artinama':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
           
            if (args.length === 1) return hurtz.reply(from, 'Masukan perintah : *!artinama* _nama kamu_', id) 
            const artihah = body.slice(10)
            const arte = await get.get('https://api.vhtear.com/artinama?nama='+artihah+'&apikey=Dim4z05').json()
            const { hasil } = arte.result
            hurtz.reply(from, hasil, id)
            await hurtz.sendSeen(from)
            break
        case switch_pref+'cak':
        case switch_pref+'caklontong':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
           
            const sicak = await get.get('https://api.vhtear.com/funkuis&apikey=Dim4z05').json()
            const isicak = `*TTS CAK LONTONG*\n\n*Pertanyaan* : ${sicak.result.soal}\n*Jawaban* : ${sicak.result.jawaban}\n*Penjelasan* : ${sicak.result.desk}`
            hurtz.reply(from, isicak, id)            
            await hurtz.sendSeen(from)
            break
        case switch_pref+'infogempa':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
           
            const bmkg = await get.get('https://api.vhtear.com/infogempa&apikey=Dim4z05').json()
            let jiah = `*Mendapatkan informasi gempa*\n\n`
            for (let i = 0; i < bmkg.result.length; i++) {
            const { Potensi, Wilayah, Kedalaman, magnitude, Tanggal, Jam } = bmkg.result[i]

            jiah += `🕰️ *Waktu* : *${Jam}* *${Tanggal}*\n📍 *Wilayah* : *${Wilayah}*\n〽️ *Kedalaman* : *${Kedalaman}*\n💢 *Magnitude* : *${magnitude}*\n🔘 *Potensi* : *${Potensi}*`
            }

            hurtz.reply(from, jiah, id)
        //     hurtz.sendFileFromUrl(from, map, 'shakemap.jpg', hasil, id)
            await hurtz.sendSeen(from)
            break
        // case switch_pref+'anime':
        //     if (args.length === 1) return hurtz.reply(from, 'Kirim perintah *!anime [query]*\nContoh : *!anime darling in the franxx*', id)
        //     const animek = await get.get('https://mhankbarbar.herokuapp.com/api/dewabatch?q=' + body.slice(7)).json()
        //     if (animek.error) return hurtz.reply(from, animek.error, id)
        //     const res_animek = `${animek.result}\n\n${animek.sinopsis}`
        //     hurtz.sendFileFromUrl(from, animek.thumb, 'dewabatch.jpg', res_animek, id)
        //     await hurtz.sendSeen(from)
            break
        case switch_pref+'nh':
            if (!isOwner) return
            //if (isGroupMsg) return hurtz.reply(from, 'Sorry this command for private chat only!', id)
            if (args.length === 2) {
                const nuklir = body.split(' ')[1]
                hurtz.reply(from, mess.wait, id)
                const cek = await nhentai.exists(nuklir)
                if (cek === true)  {
                    try {
                        const api = new API()
                        const pic = await api.getBook(nuklir).then(book => {
                            return api.getImageURL(book.cover)
                        })
                        const dojin = await nhentai.getDoujin(nuklir)
                        const { title, details, link } = dojin
                        const { parodies, tags, artists, groups, languages, categories } = await details
                        var teks = `*Title* : ${title}\n\n*Parodies* : ${parodies}\n\n*Tags* : ${tags.join(', ')}\n\n*Artists* : ${artists.join(', ')}\n\n*Groups* : ${groups.join(', ')}\n\n*Languages* : ${languages.join(', ')}\n\n*Categories* : ${categories}\n\n*Link* : ${link}`
                        exec('nhentai --id=' + nuklir + ` -P mantap.pdf -o ./hentong/${nuklir}.pdf --format `+ `${nuklir}.pdf`, (error, stdout, stderr) => {
                            hurtz.sendFileFromUrl(from, pic, 'hentod.jpg', teks, id).then(() => 
                            hurtz.sendFile(from, `./hentong/${nuklir}.pdf/${nuklir}.pdf.pdf`, `${title}.pdf`, '', id)).catch(() => 
                            hurtz.sendFile(from, `./hentong/${nuklir}.pdf/${nuklir}.pdf.pdf`, `${title}.pdf`, '', id))
                            /*if (error) {
                                console.log('error : '+ error.message)
                                return
                            }
                            if (stderr) {
                                console.log('stderr : '+ stderr)
                                return
                            }
                            console.log('stdout : '+ stdout)*/
                            })
                    } catch (err) {
                        hurtz.reply(from, '[❗] Terjadi kesalahan, mungkin kode nuklir salah', id)
                    }
                } else {
                    hurtz.reply(from, '[❗] Kode nuClear Salah!')
                }
            } else {
                hurtz.reply(from, '[ WRONG ] Kirim perintah *!nh [nuClear]* untuk contoh kirim perintah *!readme*')
            }
        	await hurtz.sendSeen(from)
            break

        //VEZA API
        case switch_pref+'brainly':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            // hurtz.reply(from, mess.mt, id)
            await Axios.get(`https://api.vhtear.com/branly?query=${encodeURIComponent(body.slice(9))}&apikey=mrhrtz-for-vhtear`)
            .then(({ data }) => {
                hurtz.reply(from, `${data.result.data}`)
            })
            await hurtz.sendSeen(from)
            break

        case switch_pref+'alamat':
        case switch_pref+'tempat':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            await Axios.get(`https://api.vhtear.com/infoalamat?query=${encodeURIComponent(body.slice(8))}&apikey=mrhrtz-for-vhtear`)
            .then(({ data }) => {
                hurtz.reply(from, `*Info* :\n${data.result.data}\n\n*Deskripsi Tempat* :\n${data.result.deskripsi}`, id)
            })
            break
        //END VEZA API
        case switch_pref+'quotesmaker':
        case switch_pref+'quotemaker':
        if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
       
            try {
                hurtz.reply(from, mess.mt, id)
                // arg = body.trim().split('|')
                // if (arg.length >= 4) {
                //     hurtz.reply(from, mess.wait, id)
                //     const quotes = arg[1]
                //     const author = arg[2]
                //     const theme = arg[3]
                //     await quotemaker(quotes, author, theme).then(amsu => {
                //         hurtz.sendFile(from, amsu, 'quotesmaker.jpg', `Nih buat kamu >//< ${pushname}`, id).catch(() => {
                //            hurtz.reply(from, mess.error.Qm, id)
                //         })
                //     })
                // } else {
                //     hurtz.reply(from, 'Usage: \n!quotemaker |teks|watermark|theme\n\nEx :\n!quotemaker |ini contoh|bicit|random', id)
                // }
            }catch (err){
                hurtz.reply(from, 'Gagal membuat gambar, mohon jangan gunakan simbol/kata-kata selain latin')
                ERRLOG(err)
            }
            await hurtz.sendSeen(from)
            break
        case switch_pref+'linkgrup':
        case switch_pref+'linkgroup':
            if (!isBotGroupAdmins) return hurtz.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            
            if (isGroupMsg) {
                const inviteLink = await hurtz.getGroupInviteLink(groupId);
                hurtz.sendLinkWithAutoPreview(from, inviteLink, `\nLink group *${name}*`)
            } else {
            	hurtz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            }
            await hurtz.sendSeen(from)
            break
        // case switch_pref+'bc':
        //     if (!isOwner) return hurtz.reply(from, 'Perintah ini hanya untuk Owner bot!', id)
        //     let msg = body.slice(4)
        //     const chatz = await hurtz.getAllChatIds()
        //     for (let ids of chatz) {
        //         var cvk = await hurtz.getChatById(ids)
        //         if (!cvk.isReadOnly) await hurtz.sendText(ids, `[ Shinomiya Kaguya BOT Broadcast ]\n\n${msg}`)
        //     }
        //     hurtz.reply(from, 'Broadcast Success!', id)
        //     await hurtz.sendSeen(from)
            // break
            case switch_pref+'bcgc':
                if (!isOwner) return hurtz.reply(from, `Khusus owner aja yoo`, id)
                await hurtz.getAllGroups().then((ez) => {
                    let ideh = ``
                    for (let i = 0; i < ez.length; i++) {
                        hurtz.sendText(ez[0].id, '')
                     } 
                })
            break
        case switch_pref+'listadmin':
        case switch_pref+'adminlist':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            
            
            let mimin = ''
            for (let admon of groupAdmins) {
                mimin += `➣ @${admon.replace(/@c.us/g, '')}\n` 
            }
            await sleep(2000)
            await hurtz.sendTextWithMentions(from, `*Menampilkan list admin*\n\n${mimin}`)
            await hurtz.sendSeen(from)
            break
        case switch_pref+'ownergroup':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            const Owner_ = chat.groupMetadata.owner
            
            
            await hurtz.sendTextWithMentions(from, `Owner Group : @${Owner_}`)
            await hurtz.sendSeen(from)
            break
        case switch_pref+'tagall':
        case switch_pref+'mentionall':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            if (!isGroupAdmins) return hurtz.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            /*
            const DGCfounder = 'Biancho Junaidi'
        const DGCbotowner = 'MRHRTZ@kali:~#'
            */

            //if (pushname != 'Biancho Junaidi' || pushname != 'MRHRTZ@kali:~#') return hurtz.reply(from, 'Perintah ini hanya bisa di gunakan oleh DGC Founder dan Owner Bot!', id)
            //if (!isFounder) return hurtz.reply(from, 'Perintah ini hanya bisa di gunakan oleh DGC Founder dan Owner Bot!', id)
            
            
            const groupMem = await hurtz.getGroupMembers(groupId)
            let totalMem = await chat.groupMetadata.participants.length
            let hehe = `╔══✪〘 Mention All from ${totalMem} Mem 〙✪══\n`
            for (let i = 0; i < groupMem.length; i++) {
                hehe += '╠➣'
                hehe += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
            }
            hehe += '╚═〘 DGC ChatBotV3 〙'
            await sleep(2000)
            await hurtz.sendTextWithMentions(from, hehe)
            await hurtz.sendSeen(from)
            break
        case switch_pref+'kickall':
               /*         if (!isGroupMsg) return await hurtz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const isGroupOwner = sender.id === chat.groupMetadata.owner
            if (!isGroupOwner) return await hurtz.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner group', id)
            if (!isBotGroupAdmins) return await hurtz.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            const allMem = await hurtz.getGroupMembers(groupId)
            for (let i = 0; i < allMem.length; i++) {
                if (groupAdmins.includes(allMem[i].id)) {
                    console.log('Upss this is Admin group')
                } else {
                    await hurtz.removeParticipant(groupId, allMem[i].id)
                }
            }
     */       await hurtz.reply(from, `Fitur kudeta dimatikan\n`, id)
            await hurtz.sendSeen(from)
            break
        case switch_pref+'ganteng':
            if (!isGroupMsg) return await hurtz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const ranmem = await hurtz.getGroupMembers(groupId)
            const acak = await Math.floor(Math.random() * ranmem.length)
            //console.log(ranmem)
            await hurtz.sendTextWithMentions(from, `Yang paling ganteng disini adalah @${ranmem[acak].id.replace('@c.us','')}`, id)
            break
        case switch_pref+'babi':
            if (!isGroupMsg) return await hurtz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const ranmem1 = await hurtz.getGroupMembers(groupId)
            const acak1 = await Math.floor(Math.random() * ranmem1.length)
            //console.log(ranmem1)
            await hurtz.sendTextWithMentions(from, `Babyk disini adalah @${ranmem1[acak1].id.replace('@c.us','')}`, id)
            break
        case switch_pref+'kickall1':
            if (!isGroupMsg) return await hurtz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            //const isGroupOwner = sender.id === chat.groupMetadata.owner
            //if (!isGroupOwner) return await hurtz.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner group', id)
            if (!isBotGroupAdmins) return await hurtz.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            const allMem = await hurtz.getGroupMembers(groupId)
            hurtz.reply(from, `Perintah diterima ${pushname} mengeluarkan semua member!`, id)
            for (let i = 0; i < allMem.length; i++) {
                if (groupAdmins.includes(allMem[i].id)) {
                    console.log('Ini admin grup hemm gabisa dikick')
                } else {
                    await hurtz.removeParticipant(groupId, allMem[i].id)
                }
            }
            await hurtz.sendSeen(from)
            break
        case switch_pref+'leaveall':
            if (!isOwner) return hurtz.reply(from, 'Perintah ini hanya untuk Owner bot', id)
            const allChats = await hurtz.getAllChatIds()
            const allGroups = await hurtz.getAllGroups()
            for (let gclist of allGroups) {
                await hurtz.sendText(gclist.contact.id, `Maaf bot sedang pembersihan, total chat aktif : ${allChats.length}`)
                await hurtz.leaveGroup(gclist.contact.id)
            }
            hurtz.reply(from, 'Succes leave all group!', id)
            await hurtz.sendSeen(from)
            break
        case switch_pref+'clearall':
            if (!isOwner) return hurtz.reply(from, 'Perintah ini hanya untuk Owner bot', id)
            const allChatz = await hurtz.getAllChats()
            for (let dchat of allChatz) {
                await hurtz.deleteChat(dchat.id)
            }
            hurtz.reply(from, 'Succes clear all chat!', id)
            await hurtz.sendSeen(from)
            break
        case switch_pref+'add':
            try {
            const orang = body.slice(5)
            if (!isGroupMsg) return hurtz.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (args.length === 1) return hurtz.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *!add* 628xxxxx', id)
            
            if (!isGroupAdmins) return hurtz.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            //if (!isBotGroupAdmins) return hurtz.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            // console.log(isBotGroupAdmins)
            //const telahfixorg = orang.replace('+', '')
            try {
                console.log(orang+'@c.us')
                await hurtz.addParticipant(from, `${orang}@c.us`, id)
                .then((how) => {
                    console.log(how)
                })
                // await hurtz.addParticipant(from, `${orang}@c.us`).catch((err) => ERRLOG(err))
                // console.log(orang)
            } catch (e) {
                hurtz.reply(from, mess.error.Ad, id)
                ERRLOG(e)
            }
            await hurtz.sendSeen(from)
        } catch(e) {
            ERRLOG(e)
            hurtz.reply(from, `Kesalahan! pastikan bot adalah admin digrup ini.`)
            }
            break
        case switch_pref+'unblock':
            if(!isOwner) return hurtz.reply(from, `Anda siapa? Hanya owner yang dapat melakukannya! 😏`, id)
            if (args.length === 1) return hurtz.reply(from, `Mau unblock siapa nich??`, id)
            if(args.length == 2){
                let unblock = `${args[1]}@c.us`
                await hurtz.contactUnblock(unblock).then((a)=>{
                    console.log(a)
                    hurtz.reply(from, `Sukses unblok ${args[1]}!`, id)
                })
            } 
            await hurtz.sendSeen(from)
            break
        case switch_pref+'unbantag':
        try {
            if (!isGroupMsg) return hurtz.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isOwner) return hurtz.reply(from, `Hanya untuk owner bot okehh`)
            // if (!isGroupAdmins) return hurtz.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            // 
            
            //if (!isBotGroupAdmins) return hurtz.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return hurtz.reply(from, 'Untuk menggunakan Perintah ini, kirim perintah *un!bantag* @tagmember', id)
            await hurtz.sendText(from, `Perintah diterima, unban\n${mentionedJidList.join('\n')}`, id)
            for (let i = 0; i < mentionedJidList.length; i++) {
                // if (groupAdmins.includes(mentionedJidList[i])) return hurtz.reply(from, mess.error.Ki, id)
                await hurtz.contactUnblock(mentionedJidList[i])
            }
            await hurtz.sendSeen(from)
            } catch(e) {
            ERRLOG(e)
            hurtz.reply(from, `Kesalahan! pastikan bot adalah admin digrup ini.`)
            }
            break
        case switch_pref+'ban':
        case switch_pref+'block':
            if(!isOwner) return hurtz.reply(from, `Anda siapa? Hanya owner yang dapat melakukannya! 😏`, id)
            if (args.length === 1) return hurtz.reply(from, `Mau banned siapa nich??`, id)
            if(args.length == 2){
                let unblock = `${args[1]}@c.us`
                await hurtz.contactBlock(unblock).then((a)=>{
                    console.log(a)
                    hurtz.reply(from, `Sukses ban ${args[1]}!`, id)
                })
            } else {
                hurtz.reply(from, `Satu satu yachh..`, id)
            }
            await hurtz.sendSeen(from)
            break
        case switch_pref+'bantag':
        try {
            if (!isGroupMsg) return hurtz.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isOwner) return hurtz.reply(from, `Hanya untuk owner bot okehh`)
            // if (!isGroupAdmins) return hurtz.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            // 
            
            //if (!isBotGroupAdmins) return hurtz.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return hurtz.reply(from, 'Untuk menggunakan Perintah ini, kirim perintah *!bantag* @tagmember', id)
            await hurtz.sendText(from, `Perintah diterima, Telah diban :\n${mentionedJidList.join('\n')}`, id)
            for (let i = 0; i < mentionedJidList.length; i++) {
                // if (groupAdmins.includes(mentionedJidList[i])) return hurtz.reply(from, mess.error.Ki, id)
                await hurtz.contactBlock(mentionedJidList[i])
            }
            await hurtz.sendSeen(from)
            } catch(e) {
            ERRLOG(e)
            hurtz.reply(from, `Kesalahan! pastikan bot adalah admin digrup ini.`)
            }
            break
        case switch_pref+'kick':
        try {
            if (!isGroupMsg) return hurtz.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return hurtz.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            
            
            //if (!isBotGroupAdmins) return hurtz.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return hurtz.reply(from, 'Untuk menggunakan Perintah ini, kirim perintah *!kick* @tagmember', id)
            await hurtz.sendTextWithMentions(from, `Perintah diterima, mengeluarkan:\n@${mentionedJidList.join('\n')}`)
            for (let i = 0; i < mentionedJidList.length; i++) {
                if (groupAdmins.includes(mentionedJidList[i])) return hurtz.reply(from, mess.error.Ki, id)
                await hurtz.removeParticipant(groupId, mentionedJidList[i])
            }
            await hurtz.sendSeen(from)
            } catch(e) {
            ERRLOG(e)
            hurtz.reply(from, `Kesalahan! pastikan bot adalah admin digrup ini.`)
            }
            break
        case switch_pref+'leave':
            if (!isGroupMsg) return hurtz.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return hurtz.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            await hurtz.sendText(from,'Sayonara').then(() => hurtz.leaveGroup(groupId))
            await hurtz.sendSeen(from)
            break
        case switch_pref+'mutegrup':
        case switch_pref+'mutegroup':
            if (!isGroupMsg) return hurtz.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return hurtz.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            
            
            if (!isBotGroupAdmins) return hurtz.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
           
            await hurtz.setGroupToAdminsOnly(from, true)
            .then(() => hurtz.sendText(from, `Grup telah dimute hanya untuk admin! ketik *!unmutegrup* untuk membuka member chat.`))
            break
        case switch_pref+'unmutegrup':
        case switch_pref+'unmutegroup':
            if (!isGroupMsg) return hurtz.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return hurtz.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            
            
            if (!isBotGroupAdmins) return hurtz.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
           
            await hurtz.setGroupToAdminsOnly(from, false)
            .then(() => hurtz.sendText(from, `Grup telah dibuka untuk member chat.`))
            break
        case switch_pref+'promote':
            if (!isGroupMsg) return hurtz.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return hurtz.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            
            
            if (!isBotGroupAdmins) return hurtz.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return hurtz.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *!promote* @tagmember', id)
            if (mentionedJidList.length >= 2) return hurtz.reply(from, 'Maaf, perintah ini hanya dapat digunakan kepada 1 user.', id)
            if (groupAdmins.includes(mentionedJidList[0])) return hurtz.reply(from, 'Maaf, user tersebut sudah menjadi admin.', id)
            await hurtz.promoteParticipant(groupId, mentionedJidList[0])
            await hurtz.sendTextWithMentions(from, `Perintah diterima, menambahkan @${mentionedJidList[0]} sebagai admin.`)
            await hurtz.sendSeen(from)
            break
        case switch_pref+'demote':
            if (!isGroupMsg) return hurtz.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return hurtz.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return hurtz.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            
            
            if (mentionedJidList.length === 0) return hurtz.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *!demote* @tagadmin', id)
            if (mentionedJidList.length >= 2) return hurtz.reply(from, 'Maaf, perintah ini hanya dapat digunakan kepada 1 orang.', id)
            if (!groupAdmins.includes(mentionedJidList[0])) return hurtz.reply(from, 'Maaf, user tersebut tidak menjadi admin.', id)
            await hurtz.demoteParticipant(groupId, mentionedJidList[0])
            await hurtz.sendTextWithMentions(from, `Perintah diterima, menghapus jabatan @${mentionedJidList[0]}.`)
            await hurtz.sendSeen(from)
            break
        case switch_pref+'join':
            //if (isGroupMsg) return hurtz.reply(from, 'Fitur ini hanya bisa di gunakan private chat dengan botnya', id)
            if (!isOwner) return hurtz.reply(from, 'Join ke gc lain? konfirm dulu ke owner.', id)
            if (args.length <= 1) return hurtz.reply(from, 'Kirim perintah *!join* linkgroup\n\nEx:\n!join https://chat.whatsapp.com/blablablablablabla LicenseKey', id)
            // if (args[2] !== 'MRHRTZ-BOT-WHATSAPP') return hurtz.reply(from, `Kayanya LicenseKey salah! mohon chat owner. ketik *!sendOwner*`, id)
            const link = args[1]
            const tGr = await hurtz.getAllGroups()
            const minMem = 30
            const isLink = link.match(/(https:\/\/chat.whatsapp.com)/gi)
            const check = await hurtz.inviteInfo(link)
            if (!isLink) return hurtz.reply(from, 'Ini link? 👊🤬', id)
            //if (tGr.length > 15) return hurtz.reply(from, 'Maaf jumlah group sudah maksimal!', id)
            //if (check.size < minMem) return hurtz.reply(from, 'Member group tidak melebihi 30, bot tidak bisa masuk', id)
            if (check.status === 200) {
                await hurtz.joinGroupViaLink(link).then(() => hurtz.reply(from, 'Bot akan segera masuk!', id))
            } else {
                hurtz.reply(from, 'Link group tidak valid!', id)
            }
            await hurtz.sendSeen(from)
            break
            case switch_pref+'join7':
                //if (isGroupMsg) return hurtz.reply(from, 'Fitur ini hanya bisa di gunakan private chat dengan botnya', id)
                // if (!isOwner) return hurtz.reply(from, 'Join ke gc lain? konfirm dulu ke owner.', id)
                if (args.length <= 1) return hurtz.reply(from, 'Kirim perintah *!join* linkgroup\n\nEx:\n!join https://chat.whatsapp.com/blablablablablabla LicenseKey', id)
                // if (args[2] !== 'MRHRTZ-BOT-WHATSAPP') return hurtz.reply(from, `Kayanya LicenseKey salah! mohon chat owner. ketik *!sendOwner*`, id)
                const link7 = args[1]
                const tGr7 = await hurtz.getAllGroups()
                const minMem7 = 30
                const isLink7 = link7.match(/(https:\/\/chat.whatsapp.com)/gi)
                const check7 = await hurtz.inviteInfo(link7)
                if (!isLink7) return hurtz.reply(from, 'Ini link? 👊🤬', id)
                //if (tGr.length > 15) return hurtz.reply(from, 'Maaf jumlah group sudah maksimal!', id)
                //if (check.size < minMem) return hurtz.reply(from, 'Member group tidak melebihi 30, bot tidak bisa masuk', id)
                if (check7.status === 200) {
                    await hurtz.joinGroupViaLink(link7).then(() => hurtz.reply(from, 'Bot akan segera masuk!', id))
                } else {
                    hurtz.reply(from, 'Link group tidak valid!', id)
                }
                await hurtz.sendSeen(from)
                break
        case switch_pref+'delete':
            if (!isGroupMsg) return hurtz.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            // if (!isGroupAdmins) return hurtz.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!quotedMsg) return hurtz.reply(from, 'Salah!!, kirim perintah *!delete [tagpesanbot]*', id)
            if (!quotedMsgObj.fromMe) return hurtz.reply(from, 'Salah!!, Bot tidak bisa menghapus chat user lain!', id)
            hurtz.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
            await hurtz.sendSeen(from)
            break
        case switch_pref+'getses':
            if (!isOwner) return hurtz.reply(from, 'Perintah ini hanya untuk Owner bot!', id)
            const sesPic = await hurtz.getSnapshot()
            hurtz.sendFile(from, sesPic, 'session.png', `Nih buat kamu >//< ${pushname}`, id)
            await hurtz.sendSeen(from)
            break
        case switch_pref+'lirik':
        case switch_pref+'lyric':
        if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            
            if (args.length == 1) return hurtz.reply(from, 'Kirim perintah *!lirik [optional]*, contoh *!lirik aku bukan boneka*', id)
            const lagu = body.slice(7)
            const lirik = await liriklagu(lagu)
            hurtz.reply(from, lirik, id)
            await hurtz.sendSeen(from)
            break
        case switch_pref+'chord':
        if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
           
            if (args.length === 1) return hurtz.reply(from, 'Kirim perintah *!chord [query]*, contoh *!chord aku bukan boneka*', id)
            const query__ = body.slice(7)
            hurtz.reply(from, mess.wait, id)
            //hurtz.reply(from, `_Sedang mencari chord ${query__}_`, id)
            const chord = await get.get('https://mrhrtz-api.herokuapp.com/api/chord?q='+ query__).json()
            if (chord.error) return hurtz.reply(from, chord.error, id)
            console.log(chord)
            hurtz.reply(from, chord.result, id)
            await hurtz.sendSeen(from)
            break
        case switch_pref+'listdaerah':
        if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            const listDaerah = await get('https://api.haipbis.xyz/daerah').json()
            hurtz.reply(from, listDaerah, id)
            await hurtz.sendSeen(from)
            break
        case switch_pref+'ment':
            let aha = `@6285559038021`
            hurtz.sendTextWithMentions(from, aha, id)
            await hurtz.sendSeen(from)
            break
        case switch_pref+'blocklist':
        case switch_pref+'listblock':
            if (!isOwner) return hurtz.reply(from, `Hai ${pushname} sepertinya tidak ada perintah ${args[0]} ketik *!menu* untuk melihat perintah yang tersedia`, id)
            let hih = `This is list of blocked number\nTotal : ${blockNumber.length}\n`
            console.log(blockNumber)
            for (let i of blockNumber) {
                hih += `➣ @${i.replace(/@c.us/g,'')}\n`
            }
            hurtz.sendTextWithMentions(from, hih, id)
            await hurtz.sendSeen(from)
            break
        case switch_pref+'jadwalsholat':
        case switch_pref+'jadwalshalat':
            if (args.length === 1) return hurtz.reply(from, '[❗] Kirim perintah *!jadwalShalat [daerah]*\ncontoh : *!jadwalShalat Tangerang*\nUntuk list daerah kirim perintah *!listDaerah*')
            const daerah = body.slice(14)
            
            
            const jadwalShalat = await get.get(`https://api.haipbis.xyz/jadwalsholat?daerah=${daerah}`).json()
            if (jadwalShalat.error) return hurtz.reply(from, jadwalShalat.error, id)
            const { Imsyak, Subuh, Dhuha, Dzuhur, Ashar, Maghrib, Isya } = await jadwalShalat
            arrbulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
            tgl = new Date().getDate()
            bln = new Date().getMonth()
            thn = new Date().getFullYear()
            const resultJadwal = `Jadwal shalat di ${daerah}, ${tgl}-${arrbulan[bln]}-${thn}\n\nImsyak : ${Imsyak}\nSubuh : ${Subuh}\nDhuha : ${Dhuha}\nDzuhur : ${Dzuhur}\nAshar : ${Ashar}\nMaghrib : ${Maghrib}\nIsya : ${Isya}`
            hurtz.reply(from, resultJadwal, id)
            await hurtz.sendSeen(from)
            break
        case switch_pref+'listchannel':
            hurtz.reply(from, listChannel, id)
            await hurtz.sendSeen(from)
            break
        case switch_pref+'jadwaltv':
        if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
       
            try {
                if (args.length === 1) return hurtz.reply(from, 'Kirim perintah *!jadwalTv [channel]*', id)
                const query = body.slice(10).toLowerCase()
                const jadwal = await jadwalTv(query)
                hurtz.reply(from, jadwal, id)
            } catch (err) {
                const query = body.slice(10).toLowerCase()
                hurtz.reply(from, `Maaf terdapat kesalahan saat mengakses stasiun tv ${query}`)
            }
            await hurtz.sendSeen(from)
            break
        case switch_pref+'jadwaltvnow':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            const jadwalNow = await get.get('https://api.haipbis.xyz/jadwaltvnow').json()
            hurtz.reply(from, `Jam : ${jadwalNow.jam}\n\nJadwalTV : ${jadwalNow.jadwalTV}`, id)
            await hurtz.sendSeen(from)
            break
        case switch_pref+'loli':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            hurtz.reply(from, mess.wait, id)
            const loli = await get.get('https://mhankbarbar.herokuapp.com/api/randomloli').json()
            hurtz.sendFileFromUrl(from, loli.result, 'loli.jpeg', `loli buat ${pushname}`, id)
            await hurtz.sendSeen(from)
            break
        // case switch_pref+'waifu':
        //     const waifu = await get.get('https://mhankbarbar.herokuapp.com/api/waifu').json()
        //     hurtz.sendFileFromUrl(from, waifu.image, 'Waifu.jpg', `➣ Name : ${waifu.name}\n➣ Description : ${waifu.desc}\n\n➣ Source : ${waifu.source}`, id)
        //     await hurtz.sendSeen(from)
            break
        case switch_pref+'husbu':
            const diti = fs.readFileSync('./lib/husbu.json')
            const ditiJsin = JSON.parse(diti)
            const rindIndix = Math.floor(Math.random() * ditiJsin.length)
            const rindKiy = ditiJsin[rindIndix]
            hurtz.sendFileFromUrl(from, rindKiy.image, 'Husbu.jpg', rindKiy.teks, id)
            await hurtz.sendSeen(from)
            break
        case switch_pref+'rh':
        case switch_pref+'randomhentai15':
            if (isGroupMsg) {
                if (!isNsfw) return hurtz.reply(from, 'Command/Perintah NSFW belum di aktifkan di group ini!', id)
                const hentai = await randomNimek('hentai')
                if (hentai.endsWith('.png')) {
                    var ext = '.png'
                } else {
                    var ext = '.jpg'
                }
                hurtz.sendFileFromUrl(from, hentai, `Hentai${ext}`, 'Hentai!', id)
                await hurtz.sendSeen(from)
            } else {
                const hentai = await randomNimek('hentai')
                if (hentai.endsWith('.png')) {
                    var ext = '.png'
                } else {
                    var ext = '.jpg'
                }
                hurtz.sendFileFromUrl(from, hentai, `Hentai${ext}`, 'Hentai!', id)
            }
        break
        case switch_pref+'randomnsfwneko':
            if (isGroupMsg) {
                if (!isNsfw) return hurtz.reply(from, 'Command/Perintah NSFW belum di aktifkan di group ini!', id)
                const nsfwneko = await randomNimek('nsfw')
                if (nsfwneko.endsWith('.png')) {
                    var ext = '.png'
                } else {
                    var ext = '.jpg'
                }
                hurtz.sendFileFromUrl(from, nsfwneko, `nsfwNeko${ext}`, 'Nsfwneko!', id)
            } else {
                const nsfwneko = await randomNimek('nsfw')
                if (nsfwneko.endsWith('.png')) {
                    var ext = '.png'
                } else {
                    var ext = '.jpg'
                }
                hurtz.sendFileFromUrl(from, nsfwneko, `nsfwNeko${ext}`, 'Nsfwneko!', id)
            }
            await hurtz.sendSeen(from)
            break
        case switch_pref+'randomnekonimdasde':
            const nekonime = await get.get('https://mhankbarbar.herokuapp.com/api/nekonime').json()
            if (nekonime.result.endsWith('.png')) {
                var ext = '.png'
            } else {
                var ext = '.jpg'
            }
            hurtz.sendFileFromUrl(from, nekonime.result, `Nekonime${ext}`, 'Nekonime!', id)
            await hurtz.sendSeen(from)
            break
        case switch_pref+'randomtraasdpnime':
            const trap = await randomNimek('trap')
            if (trap.endsWith('.png')) {
                var ext = '.png'
            } else {
                var ext = '.jpg'
            }
            hurtz.sendFileFromUrl(from, trap, `trapnime${ext}`, 'Trapnime!', id)
            await hurtz.sendSeen(from)
            break
        case switch_pref+'randoasdmanime':
            const nime = await randomNimek('anime')
            if (nime.endsWith('.png')) {
                var ext = '.png'
            } else {
                var ext = '.jpg'
            }
            hurtz.sendFileFromUrl(from, nime, `Randomanime${ext}`, 'Randomanime!', id)
            await hurtz.sendSeen(from)
            break
        case switch_pref+'inuasd':
            const list = ["https://cdn.shibe.online/shibes/247d0ac978c9de9d9b66d72dbdc65f2dac64781d.jpg","https://cdn.shibe.online/shibes/1cf322acb7d74308995b04ea5eae7b520e0eae76.jpg","https://cdn.shibe.online/shibes/1ce955c3e49ae437dab68c09cf45297d68773adf.jpg","https://cdn.shibe.online/shibes/ec02bee661a797518d37098ab9ad0c02da0b05c3.jpg","https://cdn.shibe.online/shibes/1e6102253b51fbc116b887e3d3cde7b5c5083542.jpg","https://cdn.shibe.online/shibes/f0c07a7205d95577861eee382b4c8899ac620351.jpg","https://cdn.shibe.online/shibes/3eaf3b7427e2d375f09fc883f94fa8a6d4178a0a.jpg","https://cdn.shibe.online/shibes/c8b9fcfde23aee8d179c4c6f34d34fa41dfaffbf.jpg","https://cdn.shibe.online/shibes/55f298bc16017ed0aeae952031f0972b31c959cb.jpg","https://cdn.shibe.online/shibes/2d5dfe2b0170d5de6c8bc8a24b8ad72449fbf6f6.jpg","https://cdn.shibe.online/shibes/e9437de45e7cddd7d6c13299255e06f0f1d40918.jpg","https://cdn.shibe.online/shibes/6c32141a0d5d089971d99e51fd74207ff10751e7.jpg","https://cdn.shibe.online/shibes/028056c9f23ff40bc749a95cc7da7a4bb734e908.jpg","https://cdn.shibe.online/shibes/4fb0c8b74dbc7653e75ec1da597f0e7ac95fe788.jpg","https://cdn.shibe.online/shibes/125563d2ab4e520aaf27214483e765db9147dcb3.jpg","https://cdn.shibe.online/shibes/ea5258fad62cebe1fedcd8ec95776d6a9447698c.jpg","https://cdn.shibe.online/shibes/5ef2c83c2917e2f944910cb4a9a9b441d135f875.jpg","https://cdn.shibe.online/shibes/6d124364f02944300ae4f927b181733390edf64e.jpg","https://cdn.shibe.online/shibes/92213f0c406787acd4be252edb5e27c7e4f7a430.jpg","https://cdn.shibe.online/shibes/40fda0fd3d329be0d92dd7e436faa80db13c5017.jpg","https://cdn.shibe.online/shibes/e5c085fc427528fee7d4c3935ff4cd79af834a82.jpg","https://cdn.shibe.online/shibes/f83fa32c0da893163321b5cccab024172ddbade1.jpg","https://cdn.shibe.online/shibes/4aa2459b7f411919bf8df1991fa114e47b802957.jpg","https://cdn.shibe.online/shibes/2ef54e174f13e6aa21bb8be3c7aec2fdac6a442f.jpg","https://cdn.shibe.online/shibes/fa97547e670f23440608f333f8ec382a75ba5d94.jpg","https://cdn.shibe.online/shibes/fb1b7150ed8eb4ffa3b0e61ba47546dd6ee7d0dc.jpg","https://cdn.shibe.online/shibes/abf9fb41d914140a75d8bf8e05e4049e0a966c68.jpg","https://cdn.shibe.online/shibes/f63e3abe54c71cc0d0c567ebe8bce198589ae145.jpg","https://cdn.shibe.online/shibes/4c27b7b2395a5d051b00691cc4195ef286abf9e1.jpg","https://cdn.shibe.online/shibes/00df02e302eac0676bb03f41f4adf2b32418bac8.jpg","https://cdn.shibe.online/shibes/4deaac9baec39e8a93889a84257338ebb89eca50.jpg","https://cdn.shibe.online/shibes/199f8513d34901b0b20a33758e6ee2d768634ebb.jpg","https://cdn.shibe.online/shibes/f3efbf7a77e5797a72997869e8e2eaa9efcdceb5.jpg","https://cdn.shibe.online/shibes/39a20ccc9cdc17ea27f08643b019734453016e68.jpg","https://cdn.shibe.online/shibes/e67dea458b62cf3daa4b1e2b53a25405760af478.jpg","https://cdn.shibe.online/shibes/0a892f6554c18c8bcdab4ef7adec1387c76c6812.jpg","https://cdn.shibe.online/shibes/1b479987674c9b503f32e96e3a6aeca350a07ade.jpg","https://cdn.shibe.online/shibes/0c80fc00d82e09d593669d7cce9e273024ba7db9.jpg","https://cdn.shibe.online/shibes/bbc066183e87457b3143f71121fc9eebc40bf054.jpg","https://cdn.shibe.online/shibes/0932bf77f115057c7308ef70c3de1de7f8e7c646.jpg","https://cdn.shibe.online/shibes/9c87e6bb0f3dc938ce4c453eee176f24636440e0.jpg","https://cdn.shibe.online/shibes/0af1bcb0b13edf5e9b773e34e54dfceec8fa5849.jpg","https://cdn.shibe.online/shibes/32cf3f6eac4673d2e00f7360753c3f48ed53c650.jpg","https://cdn.shibe.online/shibes/af94d8eeb0f06a0fa06f090f404e3bbe86967949.jpg","https://cdn.shibe.online/shibes/4b55e826553b173c04c6f17aca8b0d2042d309fb.jpg","https://cdn.shibe.online/shibes/a0e53593393b6c724956f9abe0abb112f7506b7b.jpg","https://cdn.shibe.online/shibes/7eba25846f69b01ec04de1cae9fed4b45c203e87.jpg","https://cdn.shibe.online/shibes/fec6620d74bcb17b210e2cedca72547a332030d0.jpg","https://cdn.shibe.online/shibes/26cf6be03456a2609963d8fcf52cc3746fcb222c.jpg","https://cdn.shibe.online/shibes/c41b5da03ad74b08b7919afc6caf2dd345b3e591.jpg","https://cdn.shibe.online/shibes/7a9997f817ccdabac11d1f51fac563242658d654.jpg","https://cdn.shibe.online/shibes/7221241bad7da783c3c4d84cfedbeb21b9e4deea.jpg","https://cdn.shibe.online/shibes/283829584e6425421059c57d001c91b9dc86f33b.jpg","https://cdn.shibe.online/shibes/5145c9d3c3603c9e626585cce8cffdfcac081b31.jpg","https://cdn.shibe.online/shibes/b359c891e39994af83cf45738b28e499cb8ffe74.jpg","https://cdn.shibe.online/shibes/0b77f74a5d9afaa4b5094b28a6f3ee60efcb3874.jpg","https://cdn.shibe.online/shibes/adccfdf7d4d3332186c62ed8eb254a49b889c6f9.jpg","https://cdn.shibe.online/shibes/3aac69180f777512d5dabd33b09f531b7a845331.jpg","https://cdn.shibe.online/shibes/1d25e4f592db83039585fa480676687861498db8.jpg","https://cdn.shibe.online/shibes/d8349a2436420cf5a89a0010e91bf8dfbdd9d1cc.jpg","https://cdn.shibe.online/shibes/eb465ef1906dccd215e7a243b146c19e1af66c67.jpg","https://cdn.shibe.online/shibes/3d14e3c32863195869e7a8ba22229f457780008b.jpg","https://cdn.shibe.online/shibes/79cedc1a08302056f9819f39dcdf8eb4209551a3.jpg","https://cdn.shibe.online/shibes/4440aa827f88c04baa9c946f72fc688a34173581.jpg","https://cdn.shibe.online/shibes/94ea4a2d4b9cb852e9c1ff599f6a4acfa41a0c55.jpg","https://cdn.shibe.online/shibes/f4478196e441aef0ada61bbebe96ac9a573b2e5d.jpg","https://cdn.shibe.online/shibes/96d4db7c073526a35c626fc7518800586fd4ce67.jpg","https://cdn.shibe.online/shibes/196f3ed10ee98557328c7b5db98ac4a539224927.jpg","https://cdn.shibe.online/shibes/d12b07349029ca015d555849bcbd564d8b69fdbf.jpg","https://cdn.shibe.online/shibes/80fba84353000476400a9849da045611a590c79f.jpg","https://cdn.shibe.online/shibes/94cb90933e179375608c5c58b3d8658ef136ad3c.jpg","https://cdn.shibe.online/shibes/8447e67b5d622ef0593485316b0c87940a0ef435.jpg","https://cdn.shibe.online/shibes/c39a1d83ad44d2427fc8090298c1062d1d849f7e.jpg","https://cdn.shibe.online/shibes/6f38b9b5b8dbf187f6e3313d6e7583ec3b942472.jpg","https://cdn.shibe.online/shibes/81a2cbb9a91c6b1d55dcc702cd3f9cfd9a111cae.jpg","https://cdn.shibe.online/shibes/f1f6ed56c814bd939645138b8e195ff392dfd799.jpg","https://cdn.shibe.online/shibes/204a4c43cfad1cdc1b76cccb4b9a6dcb4a5246d8.jpg","https://cdn.shibe.online/shibes/9f34919b6154a88afc7d001c9d5f79b2e465806f.jpg","https://cdn.shibe.online/shibes/6f556a64a4885186331747c432c4ef4820620d14.jpg","https://cdn.shibe.online/shibes/bbd18ae7aaf976f745bc3dff46b49641313c26a9.jpg","https://cdn.shibe.online/shibes/6a2b286a28183267fca2200d7c677eba73b1217d.jpg","https://cdn.shibe.online/shibes/06767701966ed64fa7eff2d8d9e018e9f10487ee.jpg","https://cdn.shibe.online/shibes/7aafa4880b15b8f75d916b31485458b4a8d96815.jpg","https://cdn.shibe.online/shibes/b501169755bcf5c1eca874ab116a2802b6e51a2e.jpg","https://cdn.shibe.online/shibes/a8989bad101f35cf94213f17968c33c3031c16fc.jpg","https://cdn.shibe.online/shibes/f5d78feb3baa0835056f15ff9ced8e3c32bb07e8.jpg","https://cdn.shibe.online/shibes/75db0c76e86fbcf81d3946104c619a7950e62783.jpg","https://cdn.shibe.online/shibes/8ac387d1b252595bbd0723a1995f17405386b794.jpg","https://cdn.shibe.online/shibes/4379491ef4662faa178f791cc592b52653fb24b3.jpg","https://cdn.shibe.online/shibes/4caeee5f80add8c3db9990663a356e4eec12fc0a.jpg","https://cdn.shibe.online/shibes/99ef30ea8bb6064129da36e5673649e957cc76c0.jpg","https://cdn.shibe.online/shibes/aeac6a5b0a07a00fba0ba953af27734d2361fc10.jpg","https://cdn.shibe.online/shibes/9a217cfa377cc50dd8465d251731be05559b2142.jpg","https://cdn.shibe.online/shibes/65f6047d8e1d247af353532db018b08a928fd62a.jpg","https://cdn.shibe.online/shibes/fcead395cbf330b02978f9463ac125074ac87ab4.jpg","https://cdn.shibe.online/shibes/79451dc808a3a73f99c339f485c2bde833380af0.jpg","https://cdn.shibe.online/shibes/bedf90869797983017f764165a5d97a630b7054b.jpg","https://cdn.shibe.online/shibes/dd20e5801badd797513729a3645c502ae4629247.jpg","https://cdn.shibe.online/shibes/88361ee50b544cb1623cb259bcf07b9850183e65.jpg","https://cdn.shibe.online/shibes/0ebcfd98e8aa61c048968cb37f66a2b5d9d54d4b.jpg"]
            let kya = list[Math.floor(Math.random() * list.length)]
            hurtz.sendFileFromUrl(from, kya, 'Dog.jpeg', 'Inu')
            await hurtz.sendSeen(from)
            break
        case switch_pref+'neko':
            q2 = Math.floor(Math.random() * 900) + 300;
            q3 = Math.floor(Math.random() * 900) + 300;
            hurtz.sendFileFromUrl(from, 'http://placekitten.com/'+q3+'/'+q2, 'neko.png','Neko ')
            await hurtz.sendSeen(from)
            break
        case switch_pref+'pokemon':
            q7 = Math.floor(Math.random() * 890) + 1;
            hurtz.sendFileFromUrl(from, 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/'+q7+'.png','Pokemon.png',)
            await hurtz.sendSeen(from)
            break
        case switch_pref+'dol':
            const url = "https://newcastlebeach.org/images/kopi-2.jpg"
            const options = {
                directory: "./media/img",
                filename: "tes.jpg"
            }
            download(url, options, function(err, resp, body){
                if (err) return ERRLOG(err)
                if (resp) { 
                    console.log('Berhasil didownload ke : '+resp)
                    hurtz.reply(from, `${resp} berhasil`, id)
                    hurtz.sendFile(from, resp, 'tes.jpg', 'Donekan? saya bot pamit. canda wkwk', id)
                    }
                if (body) return console.log(body,'HIH')
            })
            await hurtz.sendSeen(from)
            break
        case switch_pref+'ssweb':
            const _query = body.slice(7)
            //if (!_query.match(isUrl)) return hurtz.reply(from, mess.error.Iv, id)
            if (args.length === 1) return hurtz.reply(from, 'Kirim perintah *!ss [web]*\nContoh *!ssweb https://google.com*', id)
            await ss(_query).then(() => hurtz.sendFile(from, './media/img/screenshot.jpg', 'ss.jpeg', '', id))
            .catch(() => hurtz.reply(from, `Error tidak dapat mengambil screenshot website ${_query}`, id))
            
        case switch_pref+'nulis':
            if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            if (args.length === 1) return hurtz.reply(from, 'Kirim perintah *!nulis [teks]*', id)
       
            const nulis = encodeURIComponent(body.slice(7))
            hurtz.reply(from, `_Bot lagi menulis ni ${pushname}..._`, id)
            let urlnulis = `https://mrhrtz-api.herokuapp.com/nulis?text=${nulis}`
            const awalnul = await get.get(urlnulis).json()
            // console.log(awalnul.code)
            await hurtz.sendImage(from, awalnul.result, 'Nulis.jpg', 'Oke done ni tulisannya', id).catch(e => hurtz.reply(from, "Error: "+ e));
            await hurtz.sendSeen(from)
            break
        case switch_pref+'quote':
        case switch_pref+'quotes':
        if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
       
            const quotes = await get.get('https://api.kanye.rest').json()
            const qotues = await get.get('https://mrhrtz-api.herokuapp.com/api/randomquotes').json()
            await hurtz.reply(from, `*Quote* : ${qotues.quotes}\n*Author* : ${qotues.author}`, id)
                    // console.log(result.data[0])
            //hurtz.reply(from, `➣ *Quotes* : ${quotes.quotes}`, id)
            await hurtz.sendSeen(from)
            break
        // case switch_pref+'quotesnime':
        //     const skya = await get.get('https://mhankbarbar.herokuapp.com/api/quotesnime/random').json()
        //     skya_ = skya.data
        //     hurtz.reply(from, `➣ *Quotes* : ${skya_.quote}\n➣ *Character* : ${skya_.character}\n➣ *Anime* : ${skya_.anime}`, id)
        //     await hurtz.sendSeen(from)
            break
        // case switch_pref+'meme':
        //     const response = await axios.get('https://meme-api.herokuapp.com/gimme/wholesomeanimemes');
        //     const { postlink, title, subreddit, url, nsfw, spoiler } = response.data
        //     hurtz.sendFileFromUrl(from, `${url}`, 'meme.jpg', `${title}`)
        //     await hurtz.sendSeen(from)
            break
        case '꧁ꔮ':
            console.log('Ketemuuu : '+id)
        break
        case switch_pref+'help':
        case switch_pref+'menu':
        if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
        const qotues_json = JSON.parse(fs.readFileSync('./lib/quotes.json'))
        const qotuesa = qotues_json[Math.floor(Math.random() * qotues_json.length)]
        const isCas2 = await hurtz.getIsPlugged() ? "Charging ✅⚡" : "Not Charged 🔌❌"
        const loadedMsg2 = await hurtz.getAmountOfLoadedMessages()
        const groupsaa = await hurtz.getAllGroups()
        const timestamp2 = speed();
        const MyPhone2 = await hurtz.getMe()
        const latensi2 = speed() - timestamp2
        const helpa = `
▃▄▅▆▇█████╬██╬█████▇▆▅▄▃
███   🤖 *DGC  ChatBotV3* 🤖   ███


❝${qotuesa.quotes}❞

     _quotes by ${qotuesa.author}_


💡 Follow Insta Bot Dev : @hanif_az.sq.61
💌 Contact Me On WhatsApp : @6285559038021


🔋 *Battery* : _${MyPhone2.battery}% ${isCas2}_
📬 *Loaded Message* : _${loadedMsg2}_ 
📮 *Group* : _${groupsaa.length}_ 
💻 *Host* : _${os.hostname()}_
📱 *Device* : _${MyPhone2.phone.device_manufacturer}_
⚖️ *Ram Usage* : _${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB_
🧿 *Platform* : _${os.platform()}_
🔌 *CPU* : _${os.cpus()[0].model}_
⚡ *Speed Process* : _${latensi2.toFixed(4)}_

________________________________________

            ❕ 〘 Info 〙 ❕

➣ *!donasi* (Bisa request fitur dan jan lupa dukungannya)
➣ *!profil*
➣ *!snk* (Rules syarat dan ketentuan)
➣ *!info*

________________________________________

        🎶 〘 Social & Media 〙 📲 

➣ *!igsearch* _@username_
➣ *!igstalk* _@username_
➣ *!play*
➣ *!tiktok* _linkTiktok_
➣ *!musik* _Katakunci_
➣ *!video* _KataKunci_
➣ *!twt* _linkVideoTwitter_
➣ *!ytmp3* _linkYt_
➣ *!ytmp4* _linkYt_
➣ *!ig* _linkIg_ 
➣ *!fb* _linkFb_

________________________________________

            📇 〘 Grup 〙  🛡️

➣ *!antilink*
➣ *!deantilink*
➣ *!add* _62858xxxxx_
➣ *!kick* _@tagmember_
➣ *!promote* _@tagmember_
➣ *!demote* _@tagadmin_
➣ *!mutegrup*
➣ *!unmutegrup*
➣ *!mentionAll*
➣ *!adminList*
➣ *!ownerGroup*
➣ *!sambutan* _aktif/mati_
➣ *!leave*
➣ *!linkGroup*
➣ *!delete* _tagPesanChatbot_

________________________________________

        🕹️ 〘 Kontrol Bot 〙 📋

➣ *!mute*
➣ *!unmute*
➣ *!bug* _Pesan yang akan disampaikan_

________________________________________

        🎤〘 Anonymous Chat 〙💺

_Note : Khusus Private Chat!_

➣ *!kirim _Teksnya_*
➣ *!daftar _62855xxxx_*
➣ *!hapus _62855xxxx_*
➣ *!list*

________________________________________

        ☠️〘 Artikel DGC 〙🇮🇩


➣ *!artikelDgc* _Halaman_
➣ *!read* _ID POST_

________________________________________

            🎯〘 Gacha 〙🎲

➣ *!cecan*
➣ *!cogan*
➣ *!suit*
➣ *!pictquotes*
➣ *!loli*
➣ *!quotes*
➣ *!caklontong*
➣ *!ganteng*
➣ *!babi*

________________________________________

            🧭 〘 Stiker 〙 💡

➣ *!savestiker* _Namanya_
➣ *!liststiker*
➣ *!getstiker* _Namanya_
➣ *!toimage*
➣ *!tostiker* _Teksnya_
➣ *!tostikergif* _Teksnya_
➣ *!stiker*
➣ *!stikergif*
➣ *!stikerori*
➣ *!stikernobg* (VIP)

________________________________________

            🔭 〘 Search 〙 🔍

➣ *!tempat* _Nama tempat_
➣ *!ceklokasi* (tag lokasi anda, sharelok)
➣ *!gambar* _KataKunci_
➣ *!cekjodoh*
➣ *!ramalanjodoh*
➣ *!fact*
➣ *!artinama* _namakamu_
➣ *!search* _KataKunci_
➣ *!nyanyi* _Lagunya_
➣ *!brainly* _katakunci_ |_jumlahjawaban_
➣ *!playstore* _NamaApp_
➣ *!wiki* _Katakunci_
➣ *!chord* _Lagu_
➣ *!igStalk* _@username_
➣ *!searchYT* _Katakunci_
➣ *!wallpaper* _halaman_ _katakunci_
➣ *!jadwalTvNow*
➣ *!jadwalShalat* _daerah_
➣ *!jadwalTv* _channel_
➣ *!cuaca* _Daerah_
➣ *!lirik* _lagu_

________________________________________

        🎯 〘 Fitur Lainnya 〙 🎳

➣ *!hilih* _(Tagpesan)_
➣ *!ssweb* _LinkWebsite_
➣ *$* _Masukan pesanmu_ (Fitur Chat Simsimi)
➣ *!qrcode* _Teksnya_
➣ *!nulis* _Tulisannya_
➣ *!translate* _data bahasa_ _teks_
➣ *!SendOwner*
➣ *!tts* _kode bhs_ _teks_
➣ *!quotemaker* |teks|pembuat|theme (tema dalam bahasa inggris)

________________________________________
    
Untuk perintah tidak memakai "_" dan "*"

Contoh : _!gambar mobil_ 

*Note : Apabila bot tidak merespon chat Owner bot Untuk segera difix (Kontak diatas menu)*

╰╼ _DGC_CHATBOT@3.0 ©2020 ᴍᴀᴅᴇ ʙʏ_ 💗
`
            hurtz.sendTextWithMentions(from, helpa, id)
            await hurtz.sendSeen(from)
            break
        case switch_pref+'readme':
            hurtz.reply(from, readme, id)
            await hurtz.sendSeen(from)
            break
        case switch_pref+'info':
        if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            hurtz.reply(from, `
     🕛 〘 Changes Log 〙 📒

*[5 Dec 2020]*

➣ Set Prefix To All!
➣ Fix Antilink/Deantilink
➣ Added Restart (Owner Only)


*[6 Dec 2020]*

➣ New Feature Antilink
➣ New Feature Alamat

*[Older]*

➣ Big bug fixing
➣ And other changes
            `, id)
            hurtz.sendLinkWithAutoPreview(from, 'https://github.com/MRHRTZ', info)
            await hurtz.sendSeen(from)
            break
        case switch_pref+'snk':
            hurtz.reply(from, snk, id)
            await hurtz.sendSeen(from)
            break
        case switch_pref+'short':
            await urlShortener('https://github.com/MRHRTZ/DGC-ChatBotV3').then((res) => console.log(res))

            await hurtz.sendSeen(from)
            break
        case switch_pref+'tiktok':
        case switch_pref+'likee':
        case switch_pref+'twit':
        if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
            hurtz.reply(from, `Hai ${pushname} fitur ini akan segera diluncurkan, dukung pengambangan bot ini dengan donasi seikhlasnya ke owner, ketik *!donasi*`)
            await hurtz.sendSeen(from)
            break
         default:
            if (command.startsWith('!')) {
                if (!isGroupMsg) return hurtz.reply(from, menuPriv, id)
                // hurtz.reply(from, `Hai ${pushname} sayangnya.. bot tidak mengerti perintah *${args[0]}* mohon ketik *!menu*\n\n_Fitur limit dan spam dimatikan, gunakan bot seperlunya aja_`, id)
                const que61 = body.slice(1)
                const sigot61 = await get.get(`http://simsumi.herokuapp.com/api?text=${que61}&lang=id`).json()
                hurtz.reply(from, sigot61.success, id)
                // // console.log(sigot61)
                await hurtz.sendSeen(from)}
        }

    } catch (e) {
        console.log('\x1b[1;31m~\x1b[1;37m>>', '[\x1b[1;31mERROR\x1b[1;37m]', color(e))
        //hurtz.kill().then(a => console.log(a))
    }
}
