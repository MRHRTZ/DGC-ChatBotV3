
function help() {
    return `
▃▄▅▆▇███╬██╬███▇▆▅▄▃
█    💻 *DGC ChatBotV3* 💻    █
 

  Hi Nice to see you! ✨ 


  〘 Support me 〙

➣ *!donasi* (Bisa request fitur dan jan lupa dukungannya)

  〘 Perintah Download 〙

➣ *!tiktok [linkTiktok]* (segera)
➣ *!likee [linkLikee]* (segera)
➣ *!twt [linkVideoTwitter]*
➣ *!ytmp3 [linkYt]*
➣ *!ytmp4 [linkYt]*
➣ *!ig [linkIg]* 
➣ *!fb [linkFb]* 

  〘 Perintah Grup 〙

➣ *!add 62858xxxxx*
➣ *!kick @tagmember*
➣ *!promote @tagmember*
➣ *!demote @tagadmin*
➣ *!mentionAll*
➣ *!adminList*
➣ *!ownerGroup*
➣ *!sambutan [aktif/mati]*
➣ *!leave*
➣ *!linkGroup*
➣ *!delete [replyChatBot]*
➣ *!kickAll*



  〘 Fitur Lain 〙

➣ *!stiker*
➣ *!stikernobg*
➣ *!translate [data bahasa] [teks]*
➣ *!brainly [kata kunci] |[jumlah jawaban]*
➣ *!SendOwner*
➣ *!gambar [halaman] [kata kunci]*
➣ *!jadwalTvNow*
➣ *!jadwalShalat [daerah]*
➣ *!jadwalTv [channel]*
➣ *!cuaca [tempat]*
➣ *!tts [kode bhs] [teks]*
➣ *!info*
➣ *!quotemaker [|teks|author|theme]*
➣ *!join [linkGroup] [license key]*
➣ *!quotes*
➣ *!lirik [lagu]*
   
╰╼ _DGC_CHATBOT@3.0  ©2020_


*Untuk perintah tidak memakai "[" dan "]"*
Contoh : _!cuaca bandung_ 


*Note : Apabila bot tidak merespon chat wa.me/6285559038021 (Owner bot) Untuk segera difix*`
}
exports.help = help()
function bahasa_list() {
    return `*Data bahasa salah!*

Gunakan perintah :
_!translate [data bahasa] [teksnya]_
contoh :
_!translate en bagaimana kabarmu_

Atau untuk TTS 
Gunakan perintah :
_!tts [data bahasa] [teksnya]_
contoh :
_!tts id Hari yang cerah_

*List data bahasa yang dikenal :*

  af: Afrikaans
  sq: Albanian
  ar: Arabic
  hy: Armenian
  ca: Catalan
  zh: Chinese
  zh-cn: Chinese (Mandarin/China)
  zh-tw: Chinese (Mandarin/Taiwan)
  zh-yue: Chinese (Cantonese)
  hr: Croatian
  cs: Czech
  da: Danish
  nl: Dutch
  en: English
  en-au: English (Australia)
  en-uk: English (United Kingdom)
  en-us: English (United States)
  eo: Esperanto
  fi: Finnish
  fr: French
  de: German
  el: Greek
  ht: Haitian Creole
  hi: Hindi
  hu: Hungarian
  is: Icelandic
  id: Indonesian
  it: Italian
  ja: Japanese
  ko: Korean
  la: Latin
  lv: Latvian
  mk: Macedonian
  no: Norwegian
  pl: Polish
  pt: Portuguese
  pt-br: Portuguese (Brazil)
  ro: Romanian
  ru: Russian
  sr: Serbian
  sk: Slovak
  es: Spanish
  es-es: Spanish (Spain)
  es-us: Spanish (United States)
  sw: Swahili
  sv: Swedish
  ta: Tamil
  th: Thai
  tr: Turkish
  vi: Vietnamese
  cy: Welsh
`}
exports.bahasa_list = bahasa_list()
function readme() {
    return `
*[linkYt]* Diisi dengan link YouTube yang valid tanpa tanda “[” dan “]”
Contoh : *!ytmp3 https://youtu.be/Bskehapzke8*

*[linkYt]* Diisi dengan link YouTube yang valid tanpa tanda “[” dan “]”
Contoh : *!ytmp4 https://youtu.be/Bskehapzke8*

*[linkIg]* Diisi dengan link Instagram yang valid tanpa tanda “[” dan “]”
Contoh : *!ig https://www.instagram.com/p/CFqRZTlluAi/?igshid=1gtxkbdqhnbbe*

*[linkFb]* Diisi dengan link Facebook yang valid tanpa tanda “[” dan “]”
Contoh : *!fb https://www.facebook.com/EpochTimesTrending/videos/310155606660409*

*[daerah]* Diisi dengan daerah yang valid, tanpa tanda “[” dan “]”
Contoh : *!jadwalShalat Tangerang*

*[channel]* Diisi dengan channel televisi yang valid, tanpa tanda “[” dan “]”
Contoh : *!jadwalTv Indosiar*

*[tempat]* Diisi dengan tempat/lokasi yang valid, tanpa tanda “[” dan “]“
Contoh : *!cuaca tangerang*

*[kode bhs]* Diisi dengan kode bahasa, contoh *id*, *en*, dll. Dan *[teks]* Diisi dengan teks yang ingin di jadikan voice, Masih sama seperti di atas tanpa tanda “[” dan “]”
Contoh : *!tts id Test*
Note : Max 250 huruf

*[@username]* Diisi dengan username Instagram yang valid, tanpa tanda “[” dan “]”
Contoh : *!igStalk @duar_amjay*

*[|teks|author|theme]* Diisi dengan teks, author, dan theme, tanpa tanda “[” dan “]”
Contoh : *!quotemaker |Odading|Mang Oleh|Shark*

*[linkGroup]* Diisi dengan link group whatsapp yang valid, tanpa tanda “[” dan “]”.
Contoh : *!join https://chat.whatsapp.com/Bhhw77d5t2gjao8*

*[optional]* Diisi dengan teks|title lirik lagu, tanpa tanda “[” dan “]”.
Contoh : *!lirik aku bukan boneka*`
}
exports.readme = readme()
function info() {
    return `Bot ini di buat dengan bahasa pemrograman Node.js / JavaScript
Nama Bot : DGC ChatBotV3
Tanggal Rilis : 2 Okt 2020
Owner Bot : wa.me/6285559038021

*MRHRTZ @ Leader DGC Team Attacker*`
}
exports.info = info()
function snk() {
    return `Syarat dan Ketentuan Bot *DGC ChatBotV3*
1. Teks dan nama pengguna WhatsApp anda akan kami simpan di dalam server selama bot aktif
2. Data anda akan di hapus ketika bot Offline
3. Kami tidak menyimpan gambar, video, file, audio, dan dokumen yang anda kirim
4. Kami tidak akan pernah meminta anda untuk memberikan informasi pribadi
5. Jika menemukan Bug/Error silahkan langsung lapor ke Owner bot
6. Apapun yang anda perintah pada bot ini, KAMI TIDAK AKAN BERTANGGUNG JAWAB!

Thanks !`
}
exports.snk = snk()
function donate() {
    return `\nHaiii.. Mau donate ni?
    
Untuk donate tf ke 085559038021 (OVO) jangan lupa kasih pesan untuk dukungannya yaa.. 😊

Thanks!`
}
exports.donate = donate()
function listChannel() {
    return `Daftar channel: 
1. ANTV
2. GTV
3. Indosiar
4. iNewsTV
5. KompasTV
6. MNCTV
7. METROTV
8. NETTV
9. RCTI
10. SCTV
11. RTV
12. Trans7
13. TransTV`
}
exports.listChannel = listChannel()
