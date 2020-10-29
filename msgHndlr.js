const { decryptMedia } = require('@open-wa/wa-decrypt')
const fs = require('fs-extra')
const axios = require('axios')
const moment = require('moment-timezone')
const get = require('got')
const download = require('download-file')
const fetch = require('node-fetch')
const color = require('./lib/color')
const { spawn, exec } = require('child_process')
const nhentai = require('nhentai-js')
const { API } = require('nhentai-api')
const { liriklagu, quotemaker, randomNimek, fb, ig, twt, sleep, tulis, jadwalTv, ss, between } = require('./lib/functions')
const { help, snk, info, donate, readme, listChannel, bahasa_list } = require('./lib/help')
const { stdout } = require('process')
const nsfw_ = JSON.parse(fs.readFileSync('./lib/NSFW.json'))
const welkom = JSON.parse(fs.readFileSync('./lib/welcome.json'))
const welkomF = JSON.parse(fs.readFileSync('./lib/freedom.json'))
const { RemoveBgResult, removeBackgroundFromImageBase64, removeBackgroundFromImageFile } = require('remove.bg')
const translate = require('@vitalets/google-translate-api');
const { BikinTikel } = require('./lib/tikel_makel')
//const { default: translate } = require('google-translate-open-api')

moment.tz.setDefault('Asia/Jakarta').locale('id')

module.exports = msgHandler = async (client, message) => {
    try {
        const { type, id, from, t, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message
        let { body } = message
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

        const mess = {
            wait: '[ WAIT ] Sedang di proses⏳ silahkan tunggu sebentar',
            error: {
                St: '[❗] Kirim gambar dengan caption *!sticker* atau tag gambar yang sudah dikirim',
                Qm: '[❗] Terjadi kesalahan, mungkin themenya tidak tersedia!',
                Yt3: '[❗] Terjadi kesalahan, tidak dapat meng konversi ke mp3!',
                Yt4: '[❗] Terjadi kesalahan, mungkin error di sebabkan oleh sistem.',
                Ig: '[❗] Terjadi kesalahan, mungkin karena akunnya private',
                Ki: '[❗] Bot tidak bisa mengeluarkan admin group!',
                Ad: '[❗] Tidak dapat menambahkan target, mungkin karena di private',
                Iv: '[❗] Link yang anda kirim tidak valid!'
            }
        }

        const time = moment(t * 1000).format('DD/MM HH:mm:ss')
        const botNumber = await client.getHostNumber()
        const blockNumber = await client.getBlockedIds()
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await client.getGroupAdmins(groupId) : ''
        const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false
        const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false
        const ownerNumber = '6285559038021@c.us'
        const DGCfounder = 'Biancho Junaidi'
        const apikeyvhtear = 'APIKEY api.vhtear.com here'
        const DGCbotowner = 'MRHRTZ@kali:~#'
        const isFounder = sender.pushname === DGCfounder
        const isBOwner = sender.pushname === DGCbotowner
        const isOwner = sender.id === ownerNumber
        const isBlocked = blockNumber.includes(sender.id)
        const isNsfw = isGroupMsg ? nsfw_.includes(chat.id) : false
        const uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
        const isUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi)
        if (!isGroupMsg && command.startsWith('!')) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(msgs(command)), 'from', color(pushname))
        if (isGroupMsg && command.startsWith('!')) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(msgs(command)), 'from', color(pushname), 'in', color(formattedTitle))
        if (!isGroupMsg && !command.startsWith('!')) console.log('\x1b[1;33m~\x1b[1;37m>', '[\x1b[1;31mMSG\x1b[1;37m]', time, color(body), 'from', color(pushname))
        if (isGroupMsg && !command.startsWith('!')) console.log('\x1b[1;33m~\x1b[1;37m>', '[\x1b[1;31mMSG\x1b[1;37m]', time, color(body), 'from', color(pushname), 'in', color(formattedTitle))
        if (isBlocked) return
        //if (!isOwner) return
        switch(command) {
        case '!stikernobg':
        case '!stickernobg':
        if (!isGroupMsg) return client.reply(from, 'Bot sekarang hanya bisa digunakan digrup saja! untuk dimasukan ke grup bot ini sifatnya berbayar, konfirmasi ke owner bot wa.me/6285559038021 untuk pertanyaan lebih lanjut', id)
           // if (args.length === 1 && !isMedia || args.length === 1 && !quotedMsg) return client.reply(from, `Kirim foto dengan caption *!stickernobg*`, id)
            if (isMedia && type === 'image') {
              try {
                var mediaData = await decryptMedia(message, uaOverride)
                var imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                var base64img = imageBase64
                var outFile = './media/img/noBg.png' //5tHjBbPSh3gYoHD9rTqiVCa7 [ { title: 'Insufficient credits', code: 'insufficient_credits' } ]
                var result = await removeBackgroundFromImageBase64({ base64img, apiKey: 'C5epTF1WmcV9CeGfAk6EUzbm', size: 'auto', type: 'auto', outFile })
                    await fs.writeFile(outFile, result.base64img)
                    await client.sendImageAsSticker(from, `data:${mimetype};base64,${result.base64img}`)
                } catch(err) {
                    console.log(err)
                    client.reply(from, `Maaf, Tidak dapat mengidentifikasi background! mungkin terlalu banyak warna.\n\n_Apabila anda terus melihat pesan ini meskipun gambar jelas mohon chat owner untuk di fix!_`, id)
                }
                
            } else if (quotedMsg && quotedMsg.type == 'image') {
                client.reply(from, `Maaf, media tidak terdeteksi! Kirim foto dengan caption *!stickernobg* bukan tag`, id) 
            } else {
                client.reply(from, `Kirim foto dengan caption *!stickernobg*`, id)
            }
            break
        case '!sticker':
        case '!stiker':
        if (!isGroupMsg) return client.reply(from, 'Bot sekarang hanya bisa digunakan digrup saja! untuk dimasukan ke grup bot ini sifatnya berbayar, konfirmasi ke owner bot wa.me/6285559038021 untuk pertanyaan lebih lanjut', id)
            if (isMedia && type === 'image') {
                const mediaData = await decryptMedia(message, uaOverride)
                const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                await client.sendImageAsSticker(from, imageBase64)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg, uaOverride)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                await client.sendImageAsSticker(from, imageBase64)
            } else if (args.length === 2) {
                const url = args[1]
                if (url.match(isUrl)) {
                    await client.sendStickerfromUrl(from, url, { method: 'get' })
                        .catch(err => console.log('Caught exception: ', err))
                } else {
                    client.reply(from, mess.error.Iv, id)
                }
            } else {
                    client.reply(from, mess.error.St, id)
            }
            break
        case '!toimage':
        case '!toimg':
            if (args.length === 2) return client.reply(from, `Hai ${pushname} untuk menggunakan fitur sticker to image, mohon tag stiker! dan kirim pesan *!toimage*`, id)
            if (quotedMsg) {
                client.reply(from, '_Mohon tunggu sedang mengkonversi stiker..._', id)
                if( quotedMsg.type === 'sticker') {
                //getStickerDecryptable is an insiders feature! 
                    //let stickerDecryptable = await client.getStickerDecryptable(quotedMsg.id)
                    //if(stickerDecryptable) mediaData = await decryptMedia(stickerDecryptable, uaOverride)
                   // await client.sendImage(from, `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`, `${pushname}.jpg`, `Sticker berhasil dikonversi! ${pushname}`)
                   //    } else {
                        mediaData = await decryptMedia(quotedMsg, uaOverride)
                        await client.sendImage(from, `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`, `${pushname}.jpg`, `Sticker berhasil dikonversi! ${pushname}`)
                   //  
                   } else {
                        client.reply(from, `Hai ${pushname} sepertinya yang ada tag bukan stiker, untuk menggunakan fitur sticker to image, mohon tag stiker! dan kirim pesan *!toimage*`, id)
                   }
                } else {
                    client.reply(from, `Hai ${pushname} untuk menggunakan fitur sticker to image, mohon tag stiker! dan kirim pesan *!toimage*`, id)
                }
            break
        case '!ytsearch':
        case '!searchyt':
            if (!isGroupMsg) return client.reply(from, 'Bot sekarang hanya bisa digunakan digrup saja! untuk dimasukan ke grup bot ini sifatnya berbayar, konfirmasi ke owner bot wa.me/6285559038021 untuk pertanyaan lebih lanjut', id)
            if (args.length === 1) return client.reply(from, 'Kirim perintah *!searchyt* _Channel/Title YT yang akan dicari_')
            const keywot = body.slice(10)
            try {
                client.reply(from, '_Sedang mencari data..._')
                const response2 = await fetch(`https://api.vhtear.com/youtube?query=${encodeURIComponent(keywot)}&apikey=${apikeyvhtear}`)
                if (!response2.ok) throw new Error(`unexpected response ${response2.statusText}`)
                const jsonserc = await response2.json()
                const { result } = await jsonserc
                let xixixi = `*Hasil pencarian dari ${keywot}*\n`
                for (let i = 0; i < result.length; i++) {
                    xixixi += `\n*Title* : ${result[i].title}\n*Channel* : ${result[i].channel}\n*URL* : ${result[i].urlyt}\n*Durasi* : ${result[i].duration}\n*Views* : ${result[i].views}\n`
                }
                await client.sendFileFromUrl(from, result[0].image, 'thumbserc.jpg', xixixi, id)
            } catch (err) {
                    console.log(err)
            }
            break
        case '!translate':
            if (!isGroupMsg) return client.reply(from, 'Bot sekarang hanya bisa digunakan digrup saja! untuk dimasukan ke grup bot ini sifatnya berbayar, konfirmasi ke owner bot wa.me/6285559038021 untuk pertanyaan lebih lanjut', id)
            if (args.length === 1) return client.reply(from, `Penggunaan untuk translate teks\n\nPenggunaan 1 : *!translate [data bahasa] [teks yang akan ditranslate]* _(tanpa tag)_\nPenggunaan 2 : *!translate [data bahasa]* _(dengan tag)_\n\nContoh 1 : *!translate id hello how are you* _(tanpa tag)_\nContoh 2 : *!translate id* _(tag pesan yang akan ditranslate)_`, id)
            //if (!quotedMsg) return client.reply(from, 'Tag pesan yang akan ditranslate!', id)
            if (quotedMsg) {
                const dataTextReal = quotedMsg.type == 'chat' ? quotedMsg.body : quotedMsg.type == 'image' ? quotedMsg.caption : ''
                const lang = args[1].toString()
                    const trans = async (dataText, lang) => {
                    console.log(`Translate text to ${lang}...`)
                    const result = await translate(dataTextReal, {
                        to: lang
                        })
                      .then((res) => client.reply(from, res.text, id))
                      .catch((err) => client.reply(from, `Sepertinya tidak ada data bahasa ${lang}\n\n${bahasa_list}`, id))
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
                      .then((res) => client.reply(from, res.text, id))
                      .catch((err) => client.reply(from, `Sepertinya tidak ada data bahasa ${lang}\n\n${bahasa_list}`, id))
                    // console.log(result.data[0])
                }
                trans(dataTextManu, lang)
            } else {
                client.reply(from, `Kesalahan mentranslate`, id)
            }
            break
        case '!tostiker':
        case '!tosticker':
            //if (args.length === 1) return client.reply(from, `Penggunaan teks to sticker : *!tosticker [Teks]*\n\nContoh : !tosticker bot ganteng`)
            if (!isGroupMsg) return client.reply(from, 'Bot sekarang hanya bisa digunakan digrup saja! untuk dimasukan ke grup bot ini sifatnya berbayar, konfirmasi ke owner bot wa.me/6285559038021 untuk pertanyaan lebih lanjut', id)
            if (isMedia && type === 'image' || quotedMsg && quotedMsg.type === 'image') return client.reply(from, 'Fitur ini hanya untuk teks! bukan gambar.', id)
            const texk = body.slice(10)
            //client.reply(from, '_Sedang mengkonversi teks ke stiker..._', id)
            client.reply(from, '_Fitur ini sedang down dikarenakan terlalu banyak request._', id)
            try {
                // if (quotedMsgObj == null) {
                //     const GetData = await BikinTikel(texk)
                //     if (GetData.status == false) return client.reply(from, 'Kesalahan dalam mengkonversi teks! tag tulisan atau gunakan teks setelah perintah *!tosticker [teks]*', id)
                //     try {
                //         await client.sendImageAsSticker(from, GetData.base64)
                //     } catch (err) {
                //         console.log(err)
                //     }
                // } else {
                //     const GetData = await BikinTikel(quotedMsgObj.body)
                //     if (GetData.status == false) return client.reply(from, 'Kesalahan dalam mengkonversi teks! tag tulisan atau gunakan teks setelah perintah *!tosticker [teks]*', id)
                //     try {
                //         await client.sendImageAsSticker(from, GetData.base64)
                //     } catch (err) {
                //         console.log(err)
                //     }
                // }
            } catch (err){
                console.log(err)
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
           //                          await client.sendImageAsSticker(from, gasMake.base64)
           //                      }catch(err) {
           //                          await client.reply(from, 'Gagal membuat.', id)
           //                      } 
           //                  }else{
           //                      await client.reply(from, gasMake.reason, id)
           //                  }
           //              }else if(quotedMsgObj != null){
           //                  const gasMake = await getStickerMaker(quotedMsgObj.body)
           //                  if(gasMake.status == true)
           //                  {
           //                      try{
           //                          await client.sendImageAsSticker(from, gasMake.base64)
           //                      }catch(err) {
           //                          await client.reply(from, 'Gagal membuat.', id)
           //                      } 
           //                  }else{
           //                      await client.reply(from, gasMake.reason, id)
           //                  }
           //              }
                       
           //          }else{
           //              await client.reply(from, 'Tidak boleh kosong.', id)
           //          }
           //      }catch(error)
           //      {
           //          console.log(error)
           //      }
            break;
        case '!gambar':
        case '!images':
        case '!wallpaper':
            if (!isGroupMsg) return client.reply(from, 'Bot sekarang hanya bisa digunakan digrup saja! untuk dimasukan ke grup bot ini sifatnya berbayar, konfirmasi ke owner bot wa.me/6285559038021 untuk pertanyaan lebih lanjut', id)
            if (args.length <= 2 || args.length == 1) return await client.reply(from, 'Random image generator splash, bisa untuk wallpaper.\npenggunaan : *!gambar [halaman] [kata kunci]* contoh *!gambar 1 office*', id)
            if (args.length > 2){
            const reqpage = args[1]
            const reqimg = args.slice(2, args.length)
            const imgurl = `https://api.unsplash.com/search/photos?page=${reqpage}&query=${reqimg}&client_id=J92b7gyJFWEdgT3z6OXZlqXovHjcn9242Ob4rKdE3uA`
            const has = await get.get(imgurl).json()
            const { total, total_pages, results } = has
            if (total > 0) {
                const total_img = between(0, results.length)
                const linkUrlFull = results[total_img].urls.full
                const shortgetFull = await get.get(`https://api.haipbis.xyz/bitly?url=${linkUrlFull}`).json()
                const hazel = `*${results[total_img].alt_description}*\n\n*Deskripsi :* ${results[total_img].description}\n*Width :* ${results[total_img].width}\n*Height :* ${results[total_img].height}\n*Link HD :* ${shortgetFull.result}\n\n_Menampilkan page ${reqpage} dari ${total_pages} halaman_`
                const outsplash = results[total_img].urls.regular
                await client.sendFileFromUrl(from, outsplash, 'outimagesplash.jpeg', hazel, id)
                } else {
                    await client.reply(from, `[ERROR] Gambar dengan nama ${reqimg} tidak ditemukan!`, id)
                }
            }
            break
        case '!stickergif':
        case '!stikergif':
        case '!sgif':
        if (!isGroupMsg) return client.reply(from, 'Bot sekarang hanya bisa digunakan digrup saja! untuk dimasukan ke grup bot ini sifatnya berbayar, konfirmasi ke owner bot wa.me/6285559038021 untuk pertanyaan lebih lanjut', id)
            client.reply(from, `Halo ${pushname} fitur ini sedang diperbaiki, sementara dinonaktifkan`, id)
            // if (isMedia) {
            //     if (mimetype === 'video/mp4' && message.duration < 10 || mimetype === 'image/gif' && message.duration < 10) {
            //         const mediaData = await decryptMedia(message, uaOverride)
            //         client.reply(from, '[WAIT] Sedang di proses⏳ silahkan tunggu ± 1 min!', id)
            //         const filename = `./media/aswu.${mimetype.split('/')[1]}`
            //         await fs.writeFileSync(filename, mediaData)
            //         await exec(`ffmpeg -ss 30 -t 3 -i ${filename} -vf "fps=30,scale=240:240:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 ./media/output.gif`, async function (error, stdout, stderr) {
            //             const gif = await fs.readFileSync('./media/output.gif', { encoding: "base64" })
            //             await client.sendImageAsSticker(from, `data:image/gif;base64,${gif.toString('base64')}`)
            //         })
            //     } else (
            //         client.reply(from, '[❗] Kirim video dengan caption *!stickerGif* max 10 sec!', id)
            //     )
            // }
            break
        case '!donasi':
        case '!donate':
            client.sendLinkWithAutoPreview(from, 'https://github.com/MRHRTZ', donate)
            break
        case '!tts':
        if (!isGroupMsg) return client.reply(from, 'Bot sekarang hanya bisa digunakan digrup saja! untuk dimasukan ke grup bot ini sifatnya berbayar, konfirmasi ke owner bot wa.me/6285559038021 untuk pertanyaan lebih lanjut', id)
            try {
                if (args.length === 1) return client.reply(from, 'Kirim perintah *!tts [code_bahasa] [teks]*, contoh *!tts id halo semua*')
                var dataBhs = args[1]      
                const ttsHZ = require('node-gtts')(dataBhs)
                var dataText = body.slice(8)
                if (dataText === '') return client.reply(from, 'Masukkan teksnya', id)
               // if (dataText.length > 500) return client.reply(from, 'Teks terlalu panjang!', id)
                var dataBhs = body.slice(5, 7)
                ttsHZ.save('./media/tts/tts.mp3', dataText, function () {
                client.sendPtt(from, './media/tts/tts.mp3', id)
                })
            } catch (err){
                console.log(err)
                client.reply(from, bahasa_list, id)
            }
            break
        // case '!nulis':
        //     if (args.length === 1) return client.reply(from, 'Kirim perintah *!nulis [teks]*', id)
        //     try {
        //         client.reply(from, '_Bot sedang nulis..._')
        //         const nulis = body.slice(7)
        //         client.reply(from, mess.wait, id)
        //         let urlnulis = "https://api.vhtear.com/write?text="+nulis+"&apikey=${apikeyvhtear}"              
        //         await fetch(urlnulis)
        //         .then((gam) => {
        //             client.sendFile(from, gam, 'tulisan.jpg', `Udah di tulis ni ${pushname}`, id);
        //         }).catch(e => {
        //             client.reply(from, "Error terdeteksi, mohon jangan gunakan simbol/karakter tidak dikenal!", id)
        //             console.log(e)
        //         })  
        //     }catch (err){
        //         console.log(err)
        //     }
        //     break
        case '!lagu':
        case '!musik':
            if (!isGroupMsg) return client.reply(from, 'Bot sekarang hanya bisa digunakan digrup saja! untuk dimasukan ke grup bot ini sifatnya berbayar, konfirmasi ke owner bot wa.me/6285559038021 untuk pertanyaan lebih lanjut', id)
            if (args.length === 1) return client.reply(from, 'Kirim perintah *!musik [query]*, untuk contoh silahkan kirim perintah *!readme*')
            const serahu = body.slice(7)
            try {
                client.reply(from, '_Sedang mencari musik, mohon tunggu..._', id)
                const respons = await fetch(`https://api.vhtear.com/ytmp3?query=${serahu}&apikey=${apikeyvhtear}`)
                if (!respons.ok) throw new Error(`unexpected response ${respons.statusText}`)
                const json = await respons.json()
                const jsonre = await json.result
                if (respons.error) {                          //Send File MP3 Berbentuk Dokumen
                    client.reply(from, resp.error, id)
                    console.log(respons)
                } else {
                    const { title, duration, image, mp3 } = await jsonre
                    const captions = `*Data Berhasil Didapatkan!*\n\n*Title* : ${title}\n*Durasi* : ${duration}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                    client.sendFileFromUrl(from, image, `thumb.jpg`, captions, id)
                    await client.sendFileFromUrl(from, mp3, `${title}.mp3`, '', id).catch(() => client.reply(from, `Maaf tidak bisa mendownload lagu seperti itu!`, id)).catch((err) => console.log(err))
                }
            } catch (err) {
                client.sendText(ownerNumber, 'Error musik : '+ err)
                client.reply(from, `Error mencari data lagu, mungkin tidak ada lagu seperti itu!`, id)
            }
            break
        // case '!ytfind':
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
        //        client.sendText(from, err)
        //     })
        //     break
        case '!ytmp3':
            if (!isGroupMsg) return client.reply(from, 'Bot sekarang hanya bisa digunakan digrup saja! untuk dimasukan ke grup bot ini sifatnya berbayar, konfirmasi ke owner bot wa.me/6285559038021 untuk pertanyaan lebih lanjut', id)
            if (args.length === 1) return client.reply(from, 'Kirim perintah *!ytmp3 [linkYt]*, untuk contoh silahkan kirim perintah *!readme*')
            let isLinks = args[1].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
            if (!isLinks) return client.reply(from, mess.error.Iv, id)
            try {
                client.reply(from, mess.wait, id)
                const response1 = await fetch(`https://api.vhtear.com/ytdl?link=${args[1]}&apikey=${apikeyvhtear}`)
                const mhankyt3 = await fetch(`http://mhankbarbar.herokuapp.com/api/yta?url=${args[1]}&apiKey=MhankAPI`)
                if (!response1.ok) throw new Error(`unexpected response vhtear ${response1.statusText}`)
                if (!mhankyt3.ok) throw new Error(`Error barbaryt3 ${mhankyt3.statusText}`)
                const barbarytp3 = await mhankyt3.json()
                const json = await response1.json()
                const jsonre = await json.result
                if (response1.error) {                          //Send File MP3 Berbentuk Dokumen
                    client.reply(from, resp.error, id)
                } else {
                    // Data memenuhi syarat?

                    const { ext, filesize, result, status, thumb } = await barbarytp3
                    
                    if (Number(filesize.split(' MB')[0]) >= 30.00) return client.reply(from, '_Mohon maaf sepertinya durasi video telah melebihi batas._', id)
                    console.log(`BarBar Giliran ${ext}\n${filesize}\n${status}`)
                    const { title, UrlVideo, UrlMp3, imgUrl } = await jsonre
                    const captions = `*Data Berhasil Didapatkan!*\n\n*Title* : ${title}\n*Ext* : MP3\n*Filesize* : ${filesize}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                    client.sendFileFromUrl(from, imgUrl, `thumb.jpg`, captions, id)
                    //await client.sendAudio(from, UrlMp3, id)        
                    await client.sendFileFromUrl(from, result, `${title}.mp3`, '', id).catch(() => client.reply(from, mess.error.Yt4, id))

                }
            } catch (err) {
                client.sendText(ownerNumber, 'Error ytmp3 : '+ err)
                client.reply(from, mess.error.Yt3, id)
            }
            break   
        case '!ytmp4':
            if (!isGroupMsg) return client.reply(from, 'Bot sekarang hanya bisa digunakan digrup saja! untuk dimasukan ke grup bot ini sifatnya berbayar, konfirmasi ke owner bot wa.me/6285559038021 untuk pertanyaan lebih lanjut', id)
            if (args.length === 1) return client.reply(from, 'Kirim perintah *!ytmp4* _linkYt_, untuk contoh silahkan kirim perintah *!readme*', id)
            let isLinks2 = args[1].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
            if (!isLinks2) return client.reply(from, mess.error.Iv, id)
            try {
                client.reply(from, mess.wait, id)
                //const response1 = await fetch(`https://api.vhtear.com/ytdl?link=${args[1]}&apikey=${apikeyvhtear}`)
                const mhankyt4 = await fetch(`http://mhankbarbar.herokuapp.com/api/ytv?url=${args[1]}&apiKey=MhankAPI`)
                //if (!response1.ok) throw new Error(`unexpected response vhtear ${response1.statusText}`);
                if (!mhankyt4.ok) throw new Error(`Err mhankyt4 ${mhankyt4.statusText}`)
                //const json = await response1.json()
                const barbarytp4 = await mhankyt4.json()
                //const jsonre = await json.result
                if (mhankyt4.error) {
                    client.reply(from, resp.error, id)
                } else {
                    const { title, ext, thumb, filesize, resolution, result } = await barbarytp4
                    //const { title, UrlVideo, UrlMp3, imgUrl } = await jsonre
                    //try {
                        const captions = `*Data Berhasil Didapatkan!*\n\n*Title* : ${title}\n*Ext* : MP4\n*Filesize* : ${filesize}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                        //console.log(response1)                    
                        client.sendFileFromUrl(from, thumb, `thumb.jpg`, captions, id)
                        await client.sendFileFromUrl(from, result, `${title}.mp4`, `Video telah terkirim ${pushname}`, id).catch(() => client.reply(from, mess.error.Yt3, id))
                    //} catch (err){
                    //    console.log(err)
                    //    client.reply(from, `_Download file gagal sedang mengganti metode..._`)
                    //    await client.sendFileFromUrl(from, result, `${title}.mp4`, `Video telah terkirim ${pushname}`, id).catch(() => client.reply(from, mess.error.Yt3, id))
                    //}
                }
            } catch (err) {
                client.sendText(ownerNumber, 'Error ytmp3 : '+ err)
                client.reply(from, mess.error.Yt4, id)
                console.log(err)
            }
            break
        case '!tiktok':
            if (!isGroupMsg) return client.reply(from, 'Bot sekarang hanya bisa digunakan digrup saja! untuk dimasukan ke grup bot ini sifatnya berbayar, konfirmasi ke owner bot wa.me/6285559038021 untuk pertanyaan lebih lanjut', id)
            if (args.length === 1) return client.reply(from, 'Kirim perintah *!tiktok* _linkVideoTikTod_, untuk contoh silahkan kirim perintah *!readme*', id)
            client.reply(from, '_Mohon tunggu sebentar, sedang di proses..._', id)
            try{
                const restik = await fetch(`https://api.vhtear.com/tiktokdl?link=${args[1]}&apikey=${apikeyvhtear}`)
                if (!restik.ok) throw new Error(`Kesalahan respon : ${restik.statusText}`)
                const jsontik = await restik.json()
                if (restik.error){
                    client.reply(from, `Mohon maaf kesalahan saat mendownload data!`, id)
                } else {
                    const captik = `*Data berhasil Didapatkan*\n\n*Title* : ${jsontik.result.title}\n*Durasi* : ${jsontik.result.duration}\n*Deskripsi* : ${jsontik.result.desk}`
                    console.log(restik)
                    client.sendFileFromUrl(from, jsontik.result.image, `tiktod.jpg`, captik, id)
                    await client.sendFileFromUrl(from, jsontik.result.video, `${jsontik.result.title}.mp4`, `Video berhasil terkirim ${pushname}`, id)
                }
            } catch (err){
                console.log(err)
                client.sendText(ownerNumber, 'Error tiktod = '+err)
                client.reply(from, 'Terjadi kesalahan saat mengakses file tersebut, tidak bisa mengirim video!')
            }
            break
        case '!wiki':
            if (!isGroupMsg) return client.reply(from, 'Bot sekarang hanya bisa digunakan digrup saja! untuk dimasukan ke grup bot ini sifatnya berbayar, konfirmasi ke owner bot wa.me/6285559038021 untuk pertanyaan lebih lanjut', id)
            if (args.length === 1) return client.reply(from, 'Kirim perintah *!wiki [query]*\nContoh : *!wiki asu*', id)
            const query_ = body.slice(6)
            const wiki = await get.get(`https://api.vhtear.com/wikipedia?query=${encodeURIComponent(query_)}&apikey=${apikeyvhtear}`).json()
            if (wiki.error) {
                client.reply(from, wiki.error, id)
            } else {
                client.reply(from, '_Sedang mencari data..._', id)
                console.log(wiki)
                //client.reply(from, `_Mohon tunggu sedang mencari data.._`, id)
                //client.reply(from, `➣ *Query* : ${query_}\n\n➣ *Result* : ${wiki.result}`, id)
                client.sendFileFromUrl(from, wiki.result.ImgResult[0], wiki.jpg, `*Hasil wikipedia dari ${query_}*\n\n${wiki.result.Info}`, id).catch(() => client.reply(from, `*Hasil wikipedia dari ${query_}*\n\n${wiki.result.Info}`, id))
                //console.log(wiki.result.ImgResult[0],wiki.result.Info)
            }
            break
        // case '!cuaca':
        //     if (args.length === 1) return client.reply(from, 'Kirim perintah *!cuaca [tempat]*\nContoh : *!cuaca bandung*', id)
        //     const tempat = body.slice(7)
        //     const weather = await get.get('http://iotcampus.net/bmkg/?menu=cuaca&wilayah='+ tempat).json()
        //     if (weather.error) {
        //         client.reply(from, weather.error, id)
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
        //         client.reply(from, hihi, id)
        //     }
        //     break
        case '!cuaca':
            if (args.length === 1) return client.reply(from, 'Kirim perintah *!cuaca [tempat]*\nContoh : *!cuaca tangerang', id)
            const tempat = body.slice(7)
            client.reply(from, `_Sedang mencari data cuaca ${tempat}..._`)
            const weather = await get.get(`https://mhankbarbar.herokuapp.com/api/cuaca?q=${tempat}&apiKey=MhankAPI`).json()
            if (weather.error) {
                client.reply(from, weather.error, id)
            } else {
                client.reply(from, `➣ Tempat : ${weather.result.tempat}\n\n➣ Angin : ${weather.result.angin}\n➣ Cuaca : ${weather.result.cuaca}\n➣ Deskripsi : ${weather.result.desk}\n➣ Kelembapan : ${weather.result.kelembapan}\n➣ Suhu : ${weather.result.suhu}\n➣ Udara : ${weather.result.udara}`, id)
            }
            break
        case '!fb':
        if (!isGroupMsg) return client.reply(from, 'Bot sekarang hanya bisa digunakan digrup saja! untuk dimasukan ke grup bot ini sifatnya berbayar, konfirmasi ke owner bot wa.me/6285559038021 untuk pertanyaan lebih lanjut', id)
            try {
                if (args.length === 1) return client.reply(from, 'Kirim perintah *!fb [linkFb]* untuk contoh silahkan kirim perintah *!readme*', id)
                if (!args[1].includes('facebook.com')) return client.reply(from, mess.error.Iv, id)
                linkefbeh = args[1].toString()
                client.reply(from, mess.wait, id)
                const epbe = await fb(linkefbeh)
                console.log(linkefbeh)
                const urlnyah = epbe.url
                client.sendFileFromUrl(from, urlnyah, `Cuih${epbe.exts}`, epbe.capt, id)
            } catch (err) {
                //client.reply(from, `Kesalahan dengan kode error : ${err}`)
                console.log(err)
            }
            break
        case '!ig':
        if (!isGroupMsg) return client.reply(from, 'Bot sekarang hanya bisa digunakan digrup saja! untuk dimasukan ke grup bot ini sifatnya berbayar, konfirmasi ke owner bot wa.me/6285559038021 untuk pertanyaan lebih lanjut', id)
            try {
                if (args.length === 1) return client.reply(from, 'Kirim perintah *!ig [linkIg]* untuk contoh silahkan kirim perintah *!readme*', id)
                if (!args[1].includes('instagram.com')) return client.reply(from, mess.error.Iv, id)
                linkinsta = args[1].toString()
                client.reply(from, mess.wait, id)
                const ige = await ig(args[1])
                client.sendFileFromUrl(from, ige.url, `Ignyakk${ige.exts}`, ige.capt, id)
            } catch (err) {
                //client.reply(from, `Kesalahan dengan kode error : ${err}`)
                console.log(err)
            }
            break
        case '!twt':
        if (!isGroupMsg) return client.reply(from, 'Bot sekarang hanya bisa digunakan digrup saja! untuk dimasukan ke grup bot ini sifatnya berbayar, konfirmasi ke owner bot wa.me/6285559038021 untuk pertanyaan lebih lanjut', id)
            try {
                if (args.length === 1) return client.reply(from, 'Kirim perintah *!twt [linkVideoTwitter]* untuk contoh silahkan kirim perintah *!readme*', id)
                if (!args[1].includes('twitter.com')) return client.reply(from, mess.error.Iv, id)
                linktwit = args[1].toString()
                client.reply(from, mess.wait, id)
                const twit = await twt(args[1])
                //client.sendLinkWithAutoPreview(from, twit.link, twit.capt)
                client.sendFileFromUrl(from, twit.url, `Ignyakk${twit.exts}`, twit.capt, id)
            } catch (err) {
                //client.reply(from, `Kesalahan dengan kode error : ${err}`)
                console.log(err)
            }
            break
        case '!sendowner':
            client.sendContact(from, '6285559038021@c.us')
            break
        /*case '!ig':
            if (args.length === 1) return client.reply(from, 'Kirim perintah *!ig [linkIg]* untuk contoh silahkan kirim perintah *!readme*')
            if (!args[1].match(isUrl) && !args[1].includes('instagram.com')) return client.reply(from, mess.error.Iv, id)
            try {
                client.reply(from, mess.wait, id)
                const resp = await get.get('https://mhankbarbar.herokuapp.com/api/ig?url='+ args[1]).json()
                if (resp.result.includes('.mp4')) {
                    var ext = '.mp4'
                } else {
                    var ext = '.jpg'
                }
                await client.sendFileFromUrl(from, resp.result, `igeh${ext}`, '', id)
            } catch {
                client.reply(from, mess.error.Ig, id)
                }
            break*/
        case '!nsfw':
            if (!isGroupMsg) return client.reply(from, 'Bot sekarang hanya bisa digunakan digrup saja! untuk dimasukan ke grup bot ini sifatnya berbayar, konfirmasi ke owner bot wa.me/6285559038021 untuk pertanyaan lebih lanjut', id)
            if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh Admin group!', id)
            if (args.length === 1) return client.reply(from, 'Pilih enable atau disable!', id)
            if (args[1].toLowerCase() === 'enable') {
                nsfw_.push(chat.id)
                fs.writeFileSync('./lib/NSFW.json', JSON.stringify(nsfw_))
                client.reply(from, 'NSWF Command berhasil di aktifkan di group ini! kirim perintah *!nsfwMenu* untuk mengetahui menu', id)
            } else if (args[1].toLowerCase() === 'disable') {
                nsfw_.splice(chat.id, 1)
                fs.writeFileSync('./lib/NSFW.json', JSON.stringify(nsfw_))
                client.reply(from, 'NSFW Command berhasil di nonaktifkan di group ini!', id)
            } else {
                client.reply(from, 'Pilih enable atau disable udin!', id)
            }
            break
        case '!pubg':
            client.reply(from, `
LIST PUBG REG INDO

74 💸 = Rp 15.600
148 💸 = Rp 28.800
221 💸 = Rp 41.800
295 💸 = Rp 55.100
770 💸 = Rp 131.900
2013 💸 = Rp 329.000
4200 💸 = Rp 650.000
8750 💸 = Rp 1.300.000

ROYALE PASS = Rp 140.000

PENTING! 
MOHON BERTRANSAKSI MENGGUNAKAN FORMAT ORDER DAN BERTRANSAKSI VIA GRUP AGAR ADMIN FAST RESPON
                `, id)
            break
        case '!ff':
            client.reply(from, `
LIST DM FF

20💎 = Rp 2.700
50💎 = Rp 6.480
70💎 = Rp 8.910
100💎 = Rp 13.230
140💎 = Rp 17.820
210💎 = Rp 26.730
355💎 = Rp 44.550
425💎 = Rp 53.460
720💎 = Rp 89.100
860💎 = Rp 106.920
1000💎 = Rp 124.740

M.Mingguan = Rp 27.000
M.Bulanan = Rp 108.000

PENTING! 
MOHON BERTRANSAKSI MENGGUNAKAN FORMAT ORDER DAN BERTRANSAKSI VIA GRUP AGAR ADMIN FAST RESPON
                `, id)
            break
        case '!ml':
            client.reply(from, `
LIST DM MLBB

86💎 = Rp 18.500
172💎 = Rp 36.300
257💎 = Rp 53.800
344💎 = Rp 71.300
514💎 = Rp 106.500
706💎 = Rp 141.800
878💎 = Rp 176.750
1050💎 = Rp 211.650
1412💎 = Rp 283.200
2194💎 = Rp 423.350
2900💎 = Rp 566.950
3072💎 = Rp 603.750
3688💎 = Rp 709.150
5532💎 = Rp 1.077.200
9288💎 = Rp 1.809.350

SL/TW = Rp 117.340
SL+ = Rp 264.300

NB :
MOHON BERTRANSAKSI MENGGUNAKAN FORMAT ORDER DAN BERTRANSAKSI VIA GRUP AGAR ADMIN FAST RESPON
                `, id)
            break
        case '!payment':
            client.reply(from, `
🏛️ PAYMENT 🏛️ : 
rek (bca) : 6790287078 (a.n s*i a***h) 
No dana : 088230391819
No gopay : 088230391819
Qris : pp grup
agen : ALFAMART / INDOMARET

kode untuk payment via alfamart/indomaret silahkan minta di admin
                `, id)
            break
        case '!formatorder':
            client.reply(from, `
FORMAT PEMESANAN

ID :
NICKNAME:
JUMLAH ORDER :

KESALAHAN PENULISAN ID BUKAN TANGGUNG JAWAB ADMIN
JANGAN LUPA SERTAKAN BUKTI PEMBAYARAN NYA☺
                `, id)
            break
        case '!freedom':
            if (!isGroupMsg) return client.reply(from, 'Bot sekarang hanya bisa digunakan digrup saja! untuk dimasukan ke grup bot ini sifatnya berbayar, konfirmasi ke owner bot wa.me/6285559038021 untuk pertanyaan lebih lanjut', id)
            if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh Admin group!', id)
            if (args.length === 1) return client.reply(from, 'Pilih Aktif atau Mati!', id)
            if (args[1].toLowerCase() === 'aktif') {
                welkomF.push(chat.id)
                fs.writeFileSync('./lib/freedom.json', JSON.stringify(welkomF))
                client.reply(from, 'Fitur welcome freedom berhasil di aktifkan di group ini!', id)
            } else if (args[1].toLowerCase() === 'mati') {
                welkomF.splice(chat.id, 1)
                fs.writeFileSync('./lib/freedom.json', JSON.stringify(welkomF))
                client.reply(from, 'Fitur welcome freedom berhasil di nonaktifkan di group ini!', id)
            } else {
                client.reply(from, 'Pilih Aktif atau Mati!', id)
            }
            break
        case '!dmff':
            if (!isGroupMsg) return client.reply(from, 'Bot sekarang hanya bisa digunakan digrup saja! untuk dimasukan ke grup bot ini sifatnya berbayar, konfirmasi ke owner bot wa.me/6285559038021 untuk pertanyaan lebih lanjut', id)
            if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh Admin group!', id)
            if (args.length === 1) return client.reply(from, 'Pilih Aktif atau Mati!', id)
            if (args[1].toLowerCase() === 'aktif') {
                welkomF.push(chat.id)
                fs.writeFileSync('./lib/dmff.json', JSON.stringify(welkomF))
                client.reply(from, 'Fitur welcome dmff berhasil di aktifkan di group ini!', id)
            } else if (args[1].toLowerCase() === 'mati') {
                welkomF.splice(chat.id, 1)
                fs.writeFileSync('./lib/dmff.json', JSON.stringify(welkomF))
                client.reply(from, 'Fitur welcome dmff berhasil di nonaktifkan di group ini!', id)
            } else {
                client.reply(from, 'Pilih Aktif atau Mati!', id)
            }
            break
        case '!sambutan':
        case '!welcome':
            if (!isGroupMsg) return client.reply(from, 'Bot sekarang hanya bisa digunakan digrup saja! untuk dimasukan ke grup bot ini sifatnya berbayar, konfirmasi ke owner bot wa.me/6285559038021 untuk pertanyaan lebih lanjut', id)
            if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh Admin group!', id)
            if (args.length === 1) return client.reply(from, 'Pilih Aktif atau Mati!', id)
            if (args[1].toLowerCase() === 'aktif') {
                welkom.push(chat.id)
                fs.writeFileSync('./lib/welcome.json', JSON.stringify(welkom))
                client.reply(from, 'Fitur welcome berhasil di aktifkan di group ini!', id)
            } else if (args[1].toLowerCase() === 'mati') {
                welkom.splice(chat.id, 1)
                fs.writeFileSync('./lib/welcome.json', JSON.stringify(welkom))
                client.reply(from, 'Fitur welcome berhasil di nonaktifkan di group ini!', id)
            } else {
                client.reply(from, 'Pilih Aktif atau Mati!', id)
            }
            break
        case '!nsfwmenu':
            if (!isNsfw) return
            client.reply(from, '1. !randomHentai\n2. !randomNsfwNeko', id)
            break
        case '!listdm':
            if (!isGroupMsg) return client.reply(from, 'Bot sekarang hanya bisa digunakan digrup saja! untuk dimasukan ke grup bot ini sifatnya berbayar, konfirmasi ke owner bot wa.me/6285559038021 untuk pertanyaan lebih lanjut', id)
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
            client.sendFileFromUrl(from, 'http://mrhrtz-wabot.000webhostapp.com/Reseller.jpeg', 'res.jpeg', capsnya, id)
            break
        case '!pesandm':
            if (!isGroupMsg) return client.reply(from, 'Bot sekarang hanya bisa digunakan digrup saja! untuk dimasukan ke grup bot ini sifatnya berbayar, konfirmasi ke owner bot wa.me/6285559038021 untuk pertanyaan lebih lanjut', id)
            const capts = `!<#> FORMAT

FORMAT ORDER💎

ID:
DIAMOND:
PEMBAYARAN:

KEUNTUNGAN:💰 ABANG TF KE NO GOPAY AKU 089625370361


_Hanya isi saja formatnya, dan tidak menghapus apapun!_
                `
            client.sendFileFromUrl(from, 'http://mrhrtz-wabot.000webhostapp.com/bukti.png', 'bukti.png', capts, id)
            break
        case '!<#>':
         if (isMedia && type === 'image'){
            const ownerNumberFF = '6289625370361@c.us'
            const inputan = body.trim().split('|')
            const hapusser = from.trim().split('-')
            client.forwardMessages(ownerNumberFF, id).then(() => console.log('terkirim!'))
            client.sendText(ownerNumberFF, `HALLO OWNER ADA YANG ORDER NI FORMAT ORDER💎

${caption}

Dari grup : ${name} 
Dengan nick wa : ${pushname} 
Nomor : wa.me/${hapusser[0]}

                `).then(() => client.reply(from, `_[DONE] Data telah terkirim atas nama ${pushname}!_`))
            console.log(message)
            } else {
                client.reply(from, `*Mohon seperti format diatas! masukan foto bukti pembayaran.*`, id)
            } 
            break
        case '!igtes':
            const instaObj = require('instagram-basic-data-scraper-with-username')

            const user = 'hanif_az.sq.61'
            instaObj.specificField(user, 'fullname').then(fullname => {
                console.log(fullname);
                // => { data: 'Joie' }
              })
        break
        case '!igstalk':
            if (!isGroupMsg) return client.reply(from, 'Bot sekarang hanya bisa digunakan digrup saja! untuk dimasukan ke grup bot ini sifatnya berbayar, konfirmasi ke owner bot wa.me/6285559038021 untuk pertanyaan lebih lanjut', id)
            if (args.length === 1)  return client.reply(from, 'Kirim perintah *!igStalk @username*\nContoh *!igStalk @hanif_az.sq.61*', id)
            client.reply(from, `_Sedang mencari data profil..._`, id)
            const stalk = await get.get(`https://api.vhtear.com/igprofile?query=${args[1]}&apikey=${apikeyvhtear}`).json()
            if (stalk.error) return client.reply(from, stalk.error, id)
            const { biography, follower, follow, post_count, full_name, username, picture, is_private } = stalk.result
            const caps = `➣ *Nama* : ${full_name}\n➣ *Username* : ${username}\n➣ *Jumlah Followers* : ${follower}\n➣ *Jumlah Following* : ${follow}\n➣ *Jumlah Postingan* : ${post_count}\n➣ *Biodata* : ${biography}`
            await client.sendFileFromUrl(from, picture, 'Profile.jpg', caps, id)
            // const ig = require('instagram-scraping')
            // const requse = body.trim().split('@')
            // client.reply(from, '_Sedang mencari user..._', id)
            // ig.scrapeUserPage('hanif_az.sq.61').then(result => {
            //     const name = result.user.full_name
            //     const user = result.user.username
            //     const bio = result.user.biography
            //     const profile = result.user.profile_pic_url_hd
            //     const follower = result.user.edge_followed_by.count
            //     const following = result.user.edge_follow.count
            //     const private = result.user.is_private
            //     const post = result.user.edge_owner_to_timeline_media.count
            //     client.sendFileFromUrl(from, profile, 'Profile.jpg', `Nama : ${name}\nBio : ${bio}\nUsername : ${user}\nJumlah Post : ${post}\nFollowers : ${follower}\nFollowing : ${following}\nPrivate? : ${private}`, id);
            // }).catch((err) => {
            //     client.reply(from, '[ERROR] Tidak bisa menemukan username!', id)
            //     console.log(err)
            // }) 
                break
        case '!artinama':
            if (!isGroupMsg) return client.reply(from, 'Bot sekarang hanya bisa digunakan digrup saja! untuk dimasukan ke grup bot ini sifatnya berbayar, konfirmasi ke owner bot wa.me/6285559038021 untuk pertanyaan lebih lanjut', id)
            if (args.length === 1) return client.reply(from, 'Masukan perintah : *!artinama* _nama kamu_', id) 
            const artihah = body.slice(10)
            const arte = await get.get('https://api.vhtear.com/artinama?nama='+artihah+'&apikey=botnolepbydandyproject').json()
            const { hasil } = arte.result
            client.reply(from, hasil, id)
            break
        case '!cak':
        case '!caklontong':
            if (!isGroupMsg) return client.reply(from, 'Bot sekarang hanya bisa digunakan digrup saja! untuk dimasukan ke grup bot ini sifatnya berbayar, konfirmasi ke owner bot wa.me/6285559038021 untuk pertanyaan lebih lanjut', id)
            const sicak = await get.get('https://api.vhtear.com/funkuis&apikey=botnolepbydandyproject').json()
            const isicak = `*TTS CAK LONTONG*\n\n*Pertanyaan* : ${sicak.result.soal}\n*Jawaban* : ${sicak.result.jawaban}\n*Penjelasan* : ${sicak.result.desk}`
            client.reply(from, isicak, id)            
            break
        case '!infogempa':
            if (!isGroupMsg) return client.reply(from, 'Bot sekarang hanya bisa digunakan digrup saja! untuk dimasukan ke grup bot ini sifatnya berbayar, konfirmasi ke owner bot wa.me/6285559038021 untuk pertanyaan lebih lanjut', id)
            const bmkg = await get.get('https://api.vhtear.com/infogempa&apikey=botnolepbydandyproject').json()
            let jiah = `*Mendapatkan informasi gempa*\n\n`
            for (let i = 0; i < bmkg.result.length; i++) {
            const { Potensi, Wilayah, Kedalaman, magnitude, Tanggal, Jam } = bmkg.result[i]

            jiah += `🕰️ *Waktu* : *${Jam}* *${Tanggal}*\n📍 *Wilayah* : *${Wilayah}*\n〽️ *Kedalaman* : *${Kedalaman}*\n💢 *Magnitude* : *${magnitude}*\n🔘 *Potensi* : *${Potensi}*`
            }

            client.reply(from, jiah, id)
        //     client.sendFileFromUrl(from, map, 'shakemap.jpg', hasil, id)
            break
        // case '!anime':
        //     if (args.length === 1) return client.reply(from, 'Kirim perintah *!anime [query]*\nContoh : *!anime darling in the franxx*', id)
        //     const animek = await get.get('https://mhankbarbar.herokuapp.com/api/dewabatch?q=' + body.slice(7)).json()
        //     if (animek.error) return client.reply(from, animek.error, id)
        //     const res_animek = `${animek.result}\n\n${animek.sinopsis}`
        //     client.sendFileFromUrl(from, animek.thumb, 'dewabatch.jpg', res_animek, id)
        //     break
        case '!nh':
            if (!isOwner) return
            //if (isGroupMsg) return client.reply(from, 'Sorry this command for private chat only!', id)
            if (args.length === 2) {
                const nuklir = body.split(' ')[1]
                client.reply(from, mess.wait, id)
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
                            client.sendFileFromUrl(from, pic, 'hentod.jpg', teks, id).then(() => 
                            client.sendFile(from, `./hentong/${nuklir}.pdf/${nuklir}.pdf.pdf`, `${title}.pdf`, '', id)).catch(() => 
                            client.sendFile(from, `./hentong/${nuklir}.pdf/${nuklir}.pdf.pdf`, `${title}.pdf`, '', id))
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
                        client.reply(from, '[❗] Terjadi kesalahan, mungkin kode nuklir salah', id)
                    }
                } else {
                    client.reply(from, '[❗] Kode nuClear Salah!')
                }
            } else {
                client.reply(from, '[ WRONG ] Kirim perintah *!nh [nuClear]* untuk contoh kirim perintah *!readme*')
            }
        	break
        case '!brainly':
            if (!isGroupMsg) return client.reply(from, 'Bot sekarang hanya bisa digunakan digrup saja! untuk dimasukan ke grup bot ini sifatnya berbayar, konfirmasi ke owner bot wa.me/6285559038021 untuk pertanyaan lebih lanjut', id)
            if (args.length >= 2){
                const BrainlySearch = require('./lib/brainly')
                let tanya = body.slice(9)
                let jum = Number(tanya.split('|')[1]) || 2
                if (jum > 10) return client.reply(from, 'Max 10!', id)
                if (Number(tanya[tanya.length-1])){
                    tanya
                }
                client.reply(from, `➣ *Pertanyaan* : ${tanya.split('.')[0]}\n\n➣ *Jumlah jawaban* : ${Number(jum)}`, id)
                await BrainlySearch(tanya.split('.')[0],Number(jum), function(res){
                    res.forEach(x=>{
                        if (x.jawaban.fotoJawaban.length == 0) {
                            client.reply(from, `➣ *Pertanyaan* : ${x.pertanyaan}\n\n➣ *Jawaban* : ${x.jawaban.judulJawaban}\n`, id)
                        } else {
                            client.reply(from, `➣ *Pertanyaan* : ${x.pertanyaan}\n\n➣ *Jawaban* 〙: ${x.jawaban.judulJawaban}\n\n➣ *Link foto jawaban* : ${x.jawaban.fotoJawaban.join('\n')}`, id)
                        }
                    })
                })
            } else {
                client.reply(from, 'Usage :\n!brainly [pertanyaan] [|jumlah]\n\nEx : \n!brainly NKRI |2', id)
            }
            break
        case '!wait':
            if (isMedia && type === 'image' || quotedMsg && quotedMsg.type === 'image') {
                if (isMedia) {
                    var mediaData = await decryptMedia(message, uaOverride)
                } else {
                    var mediaData = await decryptMedia(quotedMsg, uaOverride)
                }
                const fetch = require('node-fetch')
                const imgBS4 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                client.reply(from, 'Searching....', id)
                fetch('https://trace.moe/api/search', {
                    method: 'POST',
                    body: JSON.stringify({ image: imgBS4 }),
                    headers: { "Content-Type": "application/json" }
                })
                .then(respon => respon.json())
                .then(resolt => {
                	if (resolt.docs && resolt.docs.length <= 0) {
                		client.reply(from, 'Maaf, saya tidak tau ini anime apa', id)
                	}
                    const { is_adult, title, title_chinese, title_romaji, title_english, episode, similarity, filename, at, tokenthumb, anilist_id } = resolt.docs[0]
                    teks = ''
                    if (similarity < 0.92) {
                    	teks = '*Saya memiliki keyakinan rendah dalam hal ini* :\n\n'
                    }
                    teks += `➣ *Title Japanese* : ${title}\n➣ *Title chinese* : ${title_chinese}\n➣ *Title Romaji* : ${title_romaji}\n➣ *Title English* : ${title_english}\n`
                    teks += `➣ *Ecchi* : ${is_adult}\n`
                    teks += `➣ *Eps* : ${episode.toString()}\n`
                    teks += `➣ *Kesamaan* : ${(similarity * 100).toFixed(1)}%\n`
                    var video = `https://media.trace.moe/video/${anilist_id}/${encodeURIComponent(filename)}?t=${at}&token=${tokenthumb}`;
                    client.sendFileFromUrl(from, video, 'nimek.mp4', teks, id).catch(() => {
                        client.reply(from, teks, id)
                    })
                })
                .catch(() => {
                    client.reply(from, 'Error !', id)
                })
            } else {
                client.sendFile(from, './media/img/tutod.jpg', 'Tutor.jpg', `Nih buat kamu >//< ${pushname}`, id)
            }
            break
        case '!quotesmaker':
        case '!quotemaker':
        if (!isGroupMsg) return client.reply(from, 'Bot sekarang hanya bisa digunakan digrup saja! untuk dimasukan ke grup bot ini sifatnya berbayar, konfirmasi ke owner bot wa.me/6285559038021 untuk pertanyaan lebih lanjut', id)
            try {
                arg = body.trim().split('|')
                if (arg.length >= 4) {
                    client.reply(from, mess.wait, id)
                    const quotes = arg[1]
                    const author = arg[2]
                    const theme = arg[3]
                    await quotemaker(quotes, author, theme).then(amsu => {
                        client.sendFile(from, amsu, 'quotesmaker.jpg', `Nih buat kamu >//< ${pushname}`, id).catch(() => {
                           client.reply(from, mess.error.Qm, id)
                        })
                    })
                } else {
                    client.reply(from, 'Usage: \n!quotemaker |teks|watermark|theme\n\nEx :\n!quotemaker |ini contoh|bicit|random', id)
                }
            }catch (err){
                client.reply(from, 'Gagal membuat gambar, mohon jangan gunakan simbol/kata-kata selain latin')
            }
            break
        case '!linkgrup':
        case '!linkgroup':
            if (!isBotGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (isGroupMsg) {
                const inviteLink = await client.getGroupInviteLink(groupId);
                client.sendLinkWithAutoPreview(from, inviteLink, `\nLink group *${name}*`)
            } else {
            	client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            }
            break
        // case '!bc':
        //     if (!isOwner) return client.reply(from, 'Perintah ini hanya untuk Owner bot!', id)
        //     let msg = body.slice(4)
        //     const chatz = await client.getAllChatIds()
        //     for (let ids of chatz) {
        //         var cvk = await client.getChatById(ids)
        //         if (!cvk.isReadOnly) await client.sendText(ids, `[ Shinomiya Kaguya BOT Broadcast ]\n\n${msg}`)
        //     }
        //     client.reply(from, 'Broadcast Success!', id)
        //     break
        case '!listadmin':
        case '!adminlist':
            if (!isGroupMsg) return client.reply(from, 'Bot sekarang hanya bisa digunakan digrup saja! untuk dimasukan ke grup bot ini sifatnya berbayar, konfirmasi ke owner bot wa.me/6285559038021 untuk pertanyaan lebih lanjut', id)
            let mimin = ''
            for (let admon of groupAdmins) {
                mimin += `➣ @${admon.replace(/@c.us/g, '')}\n` 
            }
            await sleep(2000)
            await client.sendTextWithMentions(from, `*Menampilkan list admin*\n\n${mimin}`)
            break
        case '!ownergroup':
            if (!isGroupMsg) return client.reply(from, 'Bot sekarang hanya bisa digunakan digrup saja! untuk dimasukan ke grup bot ini sifatnya berbayar, konfirmasi ke owner bot wa.me/6285559038021 untuk pertanyaan lebih lanjut', id)
            const Owner_ = chat.groupMetadata.owner
            await client.sendTextWithMentions(from, `Owner Group : @${Owner_}`)
            break
        case '!tagall':
        case '!mentionall':
            if (!isGroupMsg) return client.reply(from, 'Bot sekarang hanya bisa digunakan digrup saja! untuk dimasukan ke grup bot ini sifatnya berbayar, konfirmasi ke owner bot wa.me/6285559038021 untuk pertanyaan lebih lanjut', id)
            if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            /*
            const DGCfounder = 'Biancho Junaidi'
        const DGCbotowner = 'MRHRTZ@kali:~#'
            */

            //if (pushname != 'Biancho Junaidi' || pushname != 'MRHRTZ@kali:~#') return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh DGC Founder dan Owner Bot!', id)
            //if (!isFounder) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh DGC Founder dan Owner Bot!', id)
            const groupMem = await client.getGroupMembers(groupId)
            let totalMem = await chat.groupMetadata.participants.length
            let hehe = `╔══✪〘 Mention All from ${totalMem} Mem 〙✪══\n`
            for (let i = 0; i < groupMem.length; i++) {
                hehe += '╠➣'
                hehe += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
            }
            hehe += '╚═〘 DGC ChatBotV3 〙'
            await sleep(2000)
            await client.sendTextWithMentions(from, hehe)
            break
        case '!kickall':
               /*         if (!isGroupMsg) return await client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const isGroupOwner = sender.id === chat.groupMetadata.owner
            if (!isGroupOwner) return await client.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner group', id)
            if (!isBotGroupAdmins) return await client.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            const allMem = await client.getGroupMembers(groupId)
            for (let i = 0; i < allMem.length; i++) {
                if (groupAdmins.includes(allMem[i].id)) {
                    console.log('Upss this is Admin group')
                } else {
                    await client.removeParticipant(groupId, allMem[i].id)
                }
            }
     */       await client.reply(from, `Fitur kudeta dimatikan\n`, id)
            break
        case '!kickall1':
            if (!isGroupMsg) return await client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            //const isGroupOwner = sender.id === chat.groupMetadata.owner
            //if (!isGroupOwner) return await client.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner group', id)
            if (!isBotGroupAdmins) return await client.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            const allMem = await client.getGroupMembers(groupId)
            client.reply(from, `Perintah diterima ${pushname} mengeluarkan semua member!`, id)
            for (let i = 0; i < allMem.length; i++) {
                if (groupAdmins.includes(allMem[i].id)) {
                    console.log('Ini admin grup hemm gabisa dikick')
                } else {
                    await client.removeParticipant(groupId, allMem[i].id)
                }
            }
            break
        case '!leaveall':
            if (!isOwner) return client.reply(from, 'Perintah ini hanya untuk Owner bot', id)
            const allChats = await client.getAllChatIds()
            const allGroups = await client.getAllGroups()
            for (let gclist of allGroups) {
                await client.sendText(gclist.contact.id, `Maaf bot sedang pembersihan, total chat aktif : ${allChats.length}`)
                await client.leaveGroup(gclist.contact.id)
            }
            client.reply(from, 'Succes leave all group!', id)
            break
        case '!clearall':
            if (!isOwner) return client.reply(from, 'Perintah ini hanya untuk Owner bot', id)
            const allChatz = await client.getAllChats()
            for (let dchat of allChatz) {
                await client.deleteChat(dchat.id)
            }
            client.reply(from, 'Succes clear all chat!', id)
            break
        case '!add':
            const orang = args[1]
            if (!isGroupMsg) return client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (args.length === 1) return client.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *!add* 628xxxxx', id)
            if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            try {
                await client.addParticipant(from,`${orang}@c.us`)
            } catch {
                client.reply(from, mess.error.Ad, id)
            }
            break
        case '!kick':
            if (!isGroupMsg) return client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return client.reply(from, 'Untuk menggunakan Perintah ini, kirim perintah *!kick* @tagmember', id)
            await client.sendText(from, `Perintah diterima, mengeluarkan:\n${mentionedJidList.join('\n')}`)
            for (let i = 0; i < mentionedJidList.length; i++) {
                if (groupAdmins.includes(mentionedJidList[i])) return client.reply(from, mess.error.Ki, id)
                await client.removeParticipant(groupId, mentionedJidList[i])
            }
            break
        case '!leave':
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            await client.sendText(from,'Sayonara').then(() => client.leaveGroup(groupId))
            break
        case '!promote':
            if (!isGroupMsg) return client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return client.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return client.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return client.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *!promote* @tagmember', id)
            if (mentionedJidList.length >= 2) return client.reply(from, 'Maaf, perintah ini hanya dapat digunakan kepada 1 user.', id)
            if (groupAdmins.includes(mentionedJidList[0])) return client.reply(from, 'Maaf, user tersebut sudah menjadi admin.', id)
            await client.promoteParticipant(groupId, mentionedJidList[0])
            await client.sendTextWithMentions(from, `Perintah diterima, menambahkan @${mentionedJidList[0]} sebagai admin.`)
            break
        case '!demote':
            if (!isGroupMsg) return client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return client.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return client.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return client.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *!demote* @tagadmin', id)
            if (mentionedJidList.length >= 2) return client.reply(from, 'Maaf, perintah ini hanya dapat digunakan kepada 1 orang.', id)
            if (!groupAdmins.includes(mentionedJidList[0])) return client.reply(from, 'Maaf, user tersebut tidak menjadi admin.', id)
            await client.demoteParticipant(groupId, mentionedJidList[0])
            await client.sendTextWithMentions(from, `Perintah diterima, menghapus jabatan @${mentionedJidList[0]}.`)
            break
        case '!join':
            if (isGroupMsg) return client.reply(from, 'Fitur ini hanya bisa di gunakan private chat dengan botnya', id)
            if (!isOwner) return client.reply(from, 'Join ke gc lain? konfirm dulu ke owner.', id)
            if (args.length === 1) return client.reply(from, 'Kirim perintah *!join* linkgroup\n\nEx:\n!join https://chat.whatsapp.com/blablablablablabla', id)
            const link = body.slice(6)
            const tGr = await client.getAllGroups()
            const minMem = 30
            const isLink = link.match(/(https:\/\/chat.whatsapp.com)/gi)
            const check = await client.inviteInfo(link)
            if (!isLink) return client.reply(from, 'Ini link? 👊🤬', id)
            //if (tGr.length > 15) return client.reply(from, 'Maaf jumlah group sudah maksimal!', id)
            //if (check.size < minMem) return client.reply(from, 'Member group tidak melebihi 30, bot tidak bisa masuk', id)
            if (check.status === 200) {
                await client.joinGroupViaLink(link).then(() => client.reply(from, 'Bot akan segera masuk!'))
            } else {
                client.reply(from, 'Link group tidak valid!', id)
            }
            break
        case '!delete':
            if (!isGroupMsg) return client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return client.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!quotedMsg) return client.reply(from, 'Salah!!, kirim perintah *!delete [tagpesanbot]*', id)
            if (!quotedMsgObj.fromMe) return client.reply(from, 'Salah!!, Bot tidak bisa menghapus chat user lain!', id)
            client.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
            break
        case '!getses':
            if (!isOwner) return client.reply(from, 'Perintah ini hanya untuk Owner bot!', id)
            const sesPic = await client.getSnapshot()
            client.sendFile(from, sesPic, 'session.png', `Nih buat kamu >//< ${pushname}`, id)
            break
        case '!lirik':
        if (!isGroupMsg) return client.reply(from, 'Bot sekarang hanya bisa digunakan digrup saja! untuk dimasukan ke grup bot ini sifatnya berbayar, konfirmasi ke owner bot wa.me/6285559038021 untuk pertanyaan lebih lanjut', id)
            if (args.length == 1) return client.reply(from, 'Kirim perintah *!lirik [optional]*, contoh *!lirik aku bukan boneka*', id)
            const lagu = body.slice(7)
            const lirik = await liriklagu(lagu)
            client.reply(from, lirik, id)
            break
        case '!chord':
            if (args.length === 1) return client.reply(from, 'Kirim perintah *!chord [query]*, contoh *!chord aku bukan boneka*', id)
            const query__ = body.slice(7)
            client.reply(from, `_Sedang mencari chord ${query__}_`, id)
            const chord = await get.get('https://api.i-tech.id/tools/chord?key=iwEdte-kAPiT1-3Cj3JD-siWNHI-xc6jV7&query='+ query__).json()
            if (chord.error) return client.reply(from, chord.error, id)
            console.log(chord)
            client.reply(from, chord.result, id)
            break
        case '!listdaerah':
        if (!isGroupMsg) return client.reply(from, 'Bot sekarang hanya bisa digunakan digrup saja! untuk dimasukan ke grup bot ini sifatnya berbayar, konfirmasi ke owner bot wa.me/6285559038021 untuk pertanyaan lebih lanjut', id)
            const listDaerah = await get('https://api.haipbis.xyz/daerah').json()
            client.reply(from, listDaerah, id)
            break
        case '!listblock':
            if (!isOwner) return client.reply(from, `Hai ${pushname} sepertinya tidak ada perintah ${args[0]} ketik *!menu* untuk melihat perintah yang tersedia`, id)
            let hih = `This is list of blocked number\nTotal : ${blockNumber.length}\n`
            for (let i of blockNumber) {
                hih += `➣ @${i.replace(/@c.us/g,'')}\n`
            }
            client.sendTextWithMentions(from, hih, id)
            break
        case '!jadwalsholat':
        case '!jadwalshalat':
            if (args.length === 1) return client.reply(from, '[❗] Kirim perintah *!jadwalShalat [daerah]*\ncontoh : *!jadwalShalat Tangerang*\nUntuk list daerah kirim perintah *!listDaerah*')
            const daerah = body.slice(14)
            const jadwalShalat = await get.get(`https://api.haipbis.xyz/jadwalsholat?daerah=${daerah}`).json()
            if (jadwalShalat.error) return client.reply(from, jadwalShalat.error, id)
            const { Imsyak, Subuh, Dhuha, Dzuhur, Ashar, Maghrib, Isya } = await jadwalShalat
            arrbulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
            tgl = new Date().getDate()
            bln = new Date().getMonth()
            thn = new Date().getFullYear()
            const resultJadwal = `Jadwal shalat di ${daerah}, ${tgl}-${arrbulan[bln]}-${thn}\n\nImsyak : ${Imsyak}\nSubuh : ${Subuh}\nDhuha : ${Dhuha}\nDzuhur : ${Dzuhur}\nAshar : ${Ashar}\nMaghrib : ${Maghrib}\nIsya : ${Isya}`
            client.reply(from, resultJadwal, id)
            break
        case '!listchannel':
            client.reply(from, listChannel, id)
            break
        case '!jadwaltv':
        if (!isGroupMsg) return client.reply(from, 'Bot sekarang hanya bisa digunakan digrup saja! untuk dimasukan ke grup bot ini sifatnya berbayar, konfirmasi ke owner bot wa.me/6285559038021 untuk pertanyaan lebih lanjut', id)
            try {
                if (args.length === 1) return client.reply(from, 'Kirim perintah *!jadwalTv [channel]*', id)
                const query = body.slice(10).toLowerCase()
                const jadwal = await jadwalTv(query)
                client.reply(from, jadwal, id)
            } catch (err) {
                const query = body.slice(10).toLowerCase()
                client.reply(from, `Maaf terdapat kesalahan saat mengakses stasiun tv ${query}`)
            }
            break
        case '!jadwaltvnow':
        if (!isGroupMsg) return client.reply(from, 'Bot sekarang hanya bisa digunakan digrup saja! untuk dimasukan ke grup bot ini sifatnya berbayar, konfirmasi ke owner bot wa.me/6285559038021 untuk pertanyaan lebih lanjut', id)
            const jadwalNow = await get.get('https://api.haipbis.xyz/jadwaltvnow').json()
            client.reply(from, `Jam : ${jadwalNow.jam}\n\nJadwalTV : ${jadwalNow.jadwalTV}`, id)
            break
        // case '!loli':
        //     const loli = await get.get('https://mhankbarbar.herokuapp.com/api/randomloli').json()
        //     client.sendFileFromUrl(from, loli.result, 'loli.jpeg', `Nih lolinya ${pushname}`, id)
        //     break
        // case '!waifu':
        //     const waifu = await get.get('https://mhankbarbar.herokuapp.com/api/waifu').json()
        //     client.sendFileFromUrl(from, waifu.image, 'Waifu.jpg', `➣ Name : ${waifu.name}\n➣ Description : ${waifu.desc}\n\n➣ Source : ${waifu.source}`, id)
        //     break
        case '!husbu':
            const diti = fs.readFileSync('./lib/husbu.json')
            const ditiJsin = JSON.parse(diti)
            const rindIndix = Math.floor(Math.random() * ditiJsin.length)
            const rindKiy = ditiJsin[rindIndix]
            client.sendFileFromUrl(from, rindKiy.image, 'Husbu.jpg', rindKiy.teks, id)
            break
        case '!rh':
        case '!randomhentai':
            if (isGroupMsg) {
                if (!isNsfw) return client.reply(from, 'Command/Perintah NSFW belum di aktifkan di group ini!', id)
                const hentai = await randomNimek('hentai')
                if (hentai.endsWith('.png')) {
                    var ext = '.png'
                } else {
                    var ext = '.jpg'
                }
                client.sendFileFromUrl(from, hentai, `Hentai${ext}`, 'Hentai!', id)
                break
            } else {
                const hentai = await randomNimek('hentai')
                if (hentai.endsWith('.png')) {
                    var ext = '.png'
                } else {
                    var ext = '.jpg'
                }
                client.sendFileFromUrl(from, hentai, `Hentai${ext}`, 'Hentai!', id)
            }
        case '!randomnsfwneko':
            if (isGroupMsg) {
                if (!isNsfw) return client.reply(from, 'Command/Perintah NSFW belum di aktifkan di group ini!', id)
                const nsfwneko = await randomNimek('nsfw')
                if (nsfwneko.endsWith('.png')) {
                    var ext = '.png'
                } else {
                    var ext = '.jpg'
                }
                client.sendFileFromUrl(from, nsfwneko, `nsfwNeko${ext}`, 'Nsfwneko!', id)
            } else {
                const nsfwneko = await randomNimek('nsfw')
                if (nsfwneko.endsWith('.png')) {
                    var ext = '.png'
                } else {
                    var ext = '.jpg'
                }
                client.sendFileFromUrl(from, nsfwneko, `nsfwNeko${ext}`, 'Nsfwneko!', id)
            }
            break
        case '!randomnekonime':
            const nekonime = await get.get('https://mhankbarbar.herokuapp.com/api/nekonime').json()
            if (nekonime.result.endsWith('.png')) {
                var ext = '.png'
            } else {
                var ext = '.jpg'
            }
            client.sendFileFromUrl(from, nekonime.result, `Nekonime${ext}`, 'Nekonime!', id)
            break
        case '!randomtrapnime':
            const trap = await randomNimek('trap')
            if (trap.endsWith('.png')) {
                var ext = '.png'
            } else {
                var ext = '.jpg'
            }
            client.sendFileFromUrl(from, trap, `trapnime${ext}`, 'Trapnime!', id)
            break
        case '!randomanime':
            const nime = await randomNimek('anime')
            if (nime.endsWith('.png')) {
                var ext = '.png'
            } else {
                var ext = '.jpg'
            }
            client.sendFileFromUrl(from, nime, `Randomanime${ext}`, 'Randomanime!', id)
            break
        case '!inu':
            const list = ["https://cdn.shibe.online/shibes/247d0ac978c9de9d9b66d72dbdc65f2dac64781d.jpg","https://cdn.shibe.online/shibes/1cf322acb7d74308995b04ea5eae7b520e0eae76.jpg","https://cdn.shibe.online/shibes/1ce955c3e49ae437dab68c09cf45297d68773adf.jpg","https://cdn.shibe.online/shibes/ec02bee661a797518d37098ab9ad0c02da0b05c3.jpg","https://cdn.shibe.online/shibes/1e6102253b51fbc116b887e3d3cde7b5c5083542.jpg","https://cdn.shibe.online/shibes/f0c07a7205d95577861eee382b4c8899ac620351.jpg","https://cdn.shibe.online/shibes/3eaf3b7427e2d375f09fc883f94fa8a6d4178a0a.jpg","https://cdn.shibe.online/shibes/c8b9fcfde23aee8d179c4c6f34d34fa41dfaffbf.jpg","https://cdn.shibe.online/shibes/55f298bc16017ed0aeae952031f0972b31c959cb.jpg","https://cdn.shibe.online/shibes/2d5dfe2b0170d5de6c8bc8a24b8ad72449fbf6f6.jpg","https://cdn.shibe.online/shibes/e9437de45e7cddd7d6c13299255e06f0f1d40918.jpg","https://cdn.shibe.online/shibes/6c32141a0d5d089971d99e51fd74207ff10751e7.jpg","https://cdn.shibe.online/shibes/028056c9f23ff40bc749a95cc7da7a4bb734e908.jpg","https://cdn.shibe.online/shibes/4fb0c8b74dbc7653e75ec1da597f0e7ac95fe788.jpg","https://cdn.shibe.online/shibes/125563d2ab4e520aaf27214483e765db9147dcb3.jpg","https://cdn.shibe.online/shibes/ea5258fad62cebe1fedcd8ec95776d6a9447698c.jpg","https://cdn.shibe.online/shibes/5ef2c83c2917e2f944910cb4a9a9b441d135f875.jpg","https://cdn.shibe.online/shibes/6d124364f02944300ae4f927b181733390edf64e.jpg","https://cdn.shibe.online/shibes/92213f0c406787acd4be252edb5e27c7e4f7a430.jpg","https://cdn.shibe.online/shibes/40fda0fd3d329be0d92dd7e436faa80db13c5017.jpg","https://cdn.shibe.online/shibes/e5c085fc427528fee7d4c3935ff4cd79af834a82.jpg","https://cdn.shibe.online/shibes/f83fa32c0da893163321b5cccab024172ddbade1.jpg","https://cdn.shibe.online/shibes/4aa2459b7f411919bf8df1991fa114e47b802957.jpg","https://cdn.shibe.online/shibes/2ef54e174f13e6aa21bb8be3c7aec2fdac6a442f.jpg","https://cdn.shibe.online/shibes/fa97547e670f23440608f333f8ec382a75ba5d94.jpg","https://cdn.shibe.online/shibes/fb1b7150ed8eb4ffa3b0e61ba47546dd6ee7d0dc.jpg","https://cdn.shibe.online/shibes/abf9fb41d914140a75d8bf8e05e4049e0a966c68.jpg","https://cdn.shibe.online/shibes/f63e3abe54c71cc0d0c567ebe8bce198589ae145.jpg","https://cdn.shibe.online/shibes/4c27b7b2395a5d051b00691cc4195ef286abf9e1.jpg","https://cdn.shibe.online/shibes/00df02e302eac0676bb03f41f4adf2b32418bac8.jpg","https://cdn.shibe.online/shibes/4deaac9baec39e8a93889a84257338ebb89eca50.jpg","https://cdn.shibe.online/shibes/199f8513d34901b0b20a33758e6ee2d768634ebb.jpg","https://cdn.shibe.online/shibes/f3efbf7a77e5797a72997869e8e2eaa9efcdceb5.jpg","https://cdn.shibe.online/shibes/39a20ccc9cdc17ea27f08643b019734453016e68.jpg","https://cdn.shibe.online/shibes/e67dea458b62cf3daa4b1e2b53a25405760af478.jpg","https://cdn.shibe.online/shibes/0a892f6554c18c8bcdab4ef7adec1387c76c6812.jpg","https://cdn.shibe.online/shibes/1b479987674c9b503f32e96e3a6aeca350a07ade.jpg","https://cdn.shibe.online/shibes/0c80fc00d82e09d593669d7cce9e273024ba7db9.jpg","https://cdn.shibe.online/shibes/bbc066183e87457b3143f71121fc9eebc40bf054.jpg","https://cdn.shibe.online/shibes/0932bf77f115057c7308ef70c3de1de7f8e7c646.jpg","https://cdn.shibe.online/shibes/9c87e6bb0f3dc938ce4c453eee176f24636440e0.jpg","https://cdn.shibe.online/shibes/0af1bcb0b13edf5e9b773e34e54dfceec8fa5849.jpg","https://cdn.shibe.online/shibes/32cf3f6eac4673d2e00f7360753c3f48ed53c650.jpg","https://cdn.shibe.online/shibes/af94d8eeb0f06a0fa06f090f404e3bbe86967949.jpg","https://cdn.shibe.online/shibes/4b55e826553b173c04c6f17aca8b0d2042d309fb.jpg","https://cdn.shibe.online/shibes/a0e53593393b6c724956f9abe0abb112f7506b7b.jpg","https://cdn.shibe.online/shibes/7eba25846f69b01ec04de1cae9fed4b45c203e87.jpg","https://cdn.shibe.online/shibes/fec6620d74bcb17b210e2cedca72547a332030d0.jpg","https://cdn.shibe.online/shibes/26cf6be03456a2609963d8fcf52cc3746fcb222c.jpg","https://cdn.shibe.online/shibes/c41b5da03ad74b08b7919afc6caf2dd345b3e591.jpg","https://cdn.shibe.online/shibes/7a9997f817ccdabac11d1f51fac563242658d654.jpg","https://cdn.shibe.online/shibes/7221241bad7da783c3c4d84cfedbeb21b9e4deea.jpg","https://cdn.shibe.online/shibes/283829584e6425421059c57d001c91b9dc86f33b.jpg","https://cdn.shibe.online/shibes/5145c9d3c3603c9e626585cce8cffdfcac081b31.jpg","https://cdn.shibe.online/shibes/b359c891e39994af83cf45738b28e499cb8ffe74.jpg","https://cdn.shibe.online/shibes/0b77f74a5d9afaa4b5094b28a6f3ee60efcb3874.jpg","https://cdn.shibe.online/shibes/adccfdf7d4d3332186c62ed8eb254a49b889c6f9.jpg","https://cdn.shibe.online/shibes/3aac69180f777512d5dabd33b09f531b7a845331.jpg","https://cdn.shibe.online/shibes/1d25e4f592db83039585fa480676687861498db8.jpg","https://cdn.shibe.online/shibes/d8349a2436420cf5a89a0010e91bf8dfbdd9d1cc.jpg","https://cdn.shibe.online/shibes/eb465ef1906dccd215e7a243b146c19e1af66c67.jpg","https://cdn.shibe.online/shibes/3d14e3c32863195869e7a8ba22229f457780008b.jpg","https://cdn.shibe.online/shibes/79cedc1a08302056f9819f39dcdf8eb4209551a3.jpg","https://cdn.shibe.online/shibes/4440aa827f88c04baa9c946f72fc688a34173581.jpg","https://cdn.shibe.online/shibes/94ea4a2d4b9cb852e9c1ff599f6a4acfa41a0c55.jpg","https://cdn.shibe.online/shibes/f4478196e441aef0ada61bbebe96ac9a573b2e5d.jpg","https://cdn.shibe.online/shibes/96d4db7c073526a35c626fc7518800586fd4ce67.jpg","https://cdn.shibe.online/shibes/196f3ed10ee98557328c7b5db98ac4a539224927.jpg","https://cdn.shibe.online/shibes/d12b07349029ca015d555849bcbd564d8b69fdbf.jpg","https://cdn.shibe.online/shibes/80fba84353000476400a9849da045611a590c79f.jpg","https://cdn.shibe.online/shibes/94cb90933e179375608c5c58b3d8658ef136ad3c.jpg","https://cdn.shibe.online/shibes/8447e67b5d622ef0593485316b0c87940a0ef435.jpg","https://cdn.shibe.online/shibes/c39a1d83ad44d2427fc8090298c1062d1d849f7e.jpg","https://cdn.shibe.online/shibes/6f38b9b5b8dbf187f6e3313d6e7583ec3b942472.jpg","https://cdn.shibe.online/shibes/81a2cbb9a91c6b1d55dcc702cd3f9cfd9a111cae.jpg","https://cdn.shibe.online/shibes/f1f6ed56c814bd939645138b8e195ff392dfd799.jpg","https://cdn.shibe.online/shibes/204a4c43cfad1cdc1b76cccb4b9a6dcb4a5246d8.jpg","https://cdn.shibe.online/shibes/9f34919b6154a88afc7d001c9d5f79b2e465806f.jpg","https://cdn.shibe.online/shibes/6f556a64a4885186331747c432c4ef4820620d14.jpg","https://cdn.shibe.online/shibes/bbd18ae7aaf976f745bc3dff46b49641313c26a9.jpg","https://cdn.shibe.online/shibes/6a2b286a28183267fca2200d7c677eba73b1217d.jpg","https://cdn.shibe.online/shibes/06767701966ed64fa7eff2d8d9e018e9f10487ee.jpg","https://cdn.shibe.online/shibes/7aafa4880b15b8f75d916b31485458b4a8d96815.jpg","https://cdn.shibe.online/shibes/b501169755bcf5c1eca874ab116a2802b6e51a2e.jpg","https://cdn.shibe.online/shibes/a8989bad101f35cf94213f17968c33c3031c16fc.jpg","https://cdn.shibe.online/shibes/f5d78feb3baa0835056f15ff9ced8e3c32bb07e8.jpg","https://cdn.shibe.online/shibes/75db0c76e86fbcf81d3946104c619a7950e62783.jpg","https://cdn.shibe.online/shibes/8ac387d1b252595bbd0723a1995f17405386b794.jpg","https://cdn.shibe.online/shibes/4379491ef4662faa178f791cc592b52653fb24b3.jpg","https://cdn.shibe.online/shibes/4caeee5f80add8c3db9990663a356e4eec12fc0a.jpg","https://cdn.shibe.online/shibes/99ef30ea8bb6064129da36e5673649e957cc76c0.jpg","https://cdn.shibe.online/shibes/aeac6a5b0a07a00fba0ba953af27734d2361fc10.jpg","https://cdn.shibe.online/shibes/9a217cfa377cc50dd8465d251731be05559b2142.jpg","https://cdn.shibe.online/shibes/65f6047d8e1d247af353532db018b08a928fd62a.jpg","https://cdn.shibe.online/shibes/fcead395cbf330b02978f9463ac125074ac87ab4.jpg","https://cdn.shibe.online/shibes/79451dc808a3a73f99c339f485c2bde833380af0.jpg","https://cdn.shibe.online/shibes/bedf90869797983017f764165a5d97a630b7054b.jpg","https://cdn.shibe.online/shibes/dd20e5801badd797513729a3645c502ae4629247.jpg","https://cdn.shibe.online/shibes/88361ee50b544cb1623cb259bcf07b9850183e65.jpg","https://cdn.shibe.online/shibes/0ebcfd98e8aa61c048968cb37f66a2b5d9d54d4b.jpg"]
            let kya = list[Math.floor(Math.random() * list.length)]
            client.sendFileFromUrl(from, kya, 'Dog.jpeg', 'Inu')
            break
        case '!neko':
            q2 = Math.floor(Math.random() * 900) + 300;
            q3 = Math.floor(Math.random() * 900) + 300;
            client.sendFileFromUrl(from, 'http://placekitten.com/'+q3+'/'+q2, 'neko.png','Neko ')
            break
        case '!pokemon':
            q7 = Math.floor(Math.random() * 890) + 1;
            client.sendFileFromUrl(from, 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/'+q7+'.png','Pokemon.png',)
            break
        case '!dol':
            const url = "https://newcastlebeach.org/images/kopi-2.jpg"
            const options = {
                directory: "./media/img",
                filename: "tes.jpg"
            }
            download(url, options, function(err, resp, body){
                if (err) return console.log(err)
                if (resp) { 
                    console.log('Berhasil didownload ke : '+resp)
                    client.reply(from, `${resp} berhasil`, id)
                    client.sendFile(from, resp, 'tes.jpg', 'Donekan? saya bot pamit. canda wkwk', id)
                    }
                if (body) return console.log(body,'HIH')
            })
            break
        // case '!ssweb':
        //     const _query = body.slice(4)
        //     if (!_query.match(isUrl)) return client.reply(from, mess.error.Iv, id)
        //     if (args.length === 1) return client.reply(from, 'Kirim perintah *!ss [web]*\nContoh *!ssweb https://google.com*', id)
        //     await ss(_query).then(() => client.sendFile(from, './media/img/screenshot.jpeg', 'ss.jpeg', '', id))
        //     .catch(() => client.reply(from, `Error tidak dapat mengambil screenshot website ${_query}`, id))
        //     
        case '!nulis':
            if (args.length === 1) return client.reply(from, 'Kirim perintah *!nulis [teks]*', id)
            const nulis = encodeURIComponent(body.slice(7))
            client.reply(from, `_Bot lagi menulis ni ${pushname}..._`, id)
            let urlnulis = `https://mhankbarbar.herokuapp.com/nulis?text=${nulis}&apiKey=MhankAPI`
            await fetch(urlnulis, {method: "GET"})
            .then(res => res.json())
            .then(async (json) => {
                await client.sendFileFromUrl(from, json.result, 'Nulis.jpg', 'Oke done ni tulisannya', id)
            }).catch(e => client.reply(from, "Error: "+ e));
            break
        case '!quote':
        case '!quotes':
        if (!isGroupMsg) return client.reply(from, 'Bot sekarang hanya bisa digunakan digrup saja! untuk dimasukan ke grup bot ini sifatnya berbayar, konfirmasi ke owner bot wa.me/6285559038021 untuk pertanyaan lebih lanjut', id)
            const quotes = await get.get('https://api.kanye.rest').json()
            const qotues = await get.get('https://api.vhtear.com/quotes?apikey=botnolepbydandyproject').json()
            const dataTextxixi = qotues.result.content
            const dataTextReal = quotes.quote
            const lang = 'id'
            const trans = async (dataText, lang) => {
                    console.log(`Translate text to ${lang}...`)
                    const result = await translate(dataTextxixi, {
                        to: lang
                        })
                      .then((res) => client.reply(from, `*Quote* : ${res.text}\n*Author* : ${qotues.result.author}`, id))
                      .catch((err) => console.log(err))
                    // console.log(result.data[0])
                }
                trans(dataTextReal, lang) 
            //client.reply(from, `➣ *Quotes* : ${quotes.quotes}`, id)
            break
        // case '!quotesnime':
        //     const skya = await get.get('https://mhankbarbar.herokuapp.com/api/quotesnime/random').json()
        //     skya_ = skya.data
        //     client.reply(from, `➣ *Quotes* : ${skya_.quote}\n➣ *Character* : ${skya_.character}\n➣ *Anime* : ${skya_.anime}`, id)
        //     break
        // case '!meme':
        //     const response = await axios.get('https://meme-api.herokuapp.com/gimme/wholesomeanimemes');
        //     const { postlink, title, subreddit, url, nsfw, spoiler } = response.data
        //     client.sendFileFromUrl(from, `${url}`, 'meme.jpg', `${title}`)
        //     break
        case '!help':
        case '!menu':
        if (!isGroupMsg) return client.reply(from, 'Bot sekarang hanya bisa digunakan digrup saja! untuk dimasukan ke grup bot ini sifatnya berbayar, konfirmasi ke owner bot wa.me/6285559038021 untuk pertanyaan lebih lanjut', id)
            client.sendText(from, help)
            break
        case '!readme':
            client.reply(from, readme, id)
            break
        case '!info':
        if (!isGroupMsg) return client.reply(from, 'Bot sekarang hanya bisa digunakan digrup saja! untuk dimasukan ke grup bot ini sifatnya berbayar, konfirmasi ke owner bot wa.me/6285559038021 untuk pertanyaan lebih lanjut', id)
            client.sendLinkWithAutoPreview(from, 'https://github.com/MRHRTZ', info)
            break
        case '!snk':
            client.reply(from, snk, id)
            break
        case '!tiktok':
        case '!likee':
        case '!twit':
        if (!isGroupMsg) return client.reply(from, 'Bot sekarang hanya bisa digunakan digrup saja! untuk dimasukan ke grup bot ini sifatnya berbayar, konfirmasi ke owner bot wa.me/6285559038021 untuk pertanyaan lebih lanjut', id)
            client.reply(from, `Hai ${pushname} fitur ini akan segera diluncurkan, dukung pengambangan bot ini dengan donasi seikhlasnya ke owner, ketik *!donasi*`)
            break
         default:
            if (!isGroupMsg) return client.reply(from, 'Bot sekarang hanya bisa digunakan digrup saja! untuk dimasukan ke grup bot ini sifatnya berbayar, konfirmasi ke owner bot wa.me/6285559038021 untuk pertanyaan lebih lanjut', id)
            if (command.startsWith('!')) {
                client.reply(from, `Hai ${pushname} sayangnya.. bot tidak mengerti perintah ${args[0]}, mohon ketik *!menu*`, id)
            } 
        }

    } catch (err) {
        console.log(color('[ERROR]', 'red'), err)
        //client.kill().then(a => console.log(a))
    }
}
