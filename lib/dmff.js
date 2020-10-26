const fs = require('fs-extra')

module.exports = welcomeD = async (client, event) => {
    //console.log(event.action)
    const welkomD = JSON.parse(fs.readFileSync('./lib/dmff.json'))
    const isWelkomD = welkomD.includes(event.chat)
    try {
        if (event.action == 'add' && isWelkomD) {
            const gChat = await client.getChatById(event.chat)
            const pChat = await client.getContact(event.who)
            const siapa = event.who.replace('@c.us','')
            const { contact, groupMetadata, name } = gChat
            console.log(contact,'\n\n',name,'\n\n',event)
            const pepe = await client.getProfilePicFromServer(event.who)
            const capt = `SELAMAT DATANG DI SHOP SAHRK DM RATE 240,245 ${siapa}👋
SILAHKAN MEMATUHI PERINTAH DI BAWAH


ATURAN DILARANG‼️:
-PROMOSI KECUALI ADMIN
-DILARANG MAIN VIRTEX
-DILARANG SPAM

Ketik perintah : 
!pesandm (untuk order)
!listdm (untuk melihat list)
`
            if (pepe == '' || pepe == undefined) {
                await client.sendFileFromUrl(event.chat, 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQcODjk7AcA4wb_9OLzoeAdpGwmkJqOYxEBA&usqp=CAU', 'profile.jpg', capt)
            } else {
                await client.sendFileFromUrl(event.chat, pepe, 'profile.jpg', capt)
            }

        }
    } catch (err) {
        console.log(err)
    }
}
