const fetch = require('node-fetch')

const BikinTikel = (link) => new Promise((resolve, reject) => {
    fetch('https://api.areltiyan.com/sticker_maker?text='+encodeURIComponent(link), {
        method: 'GET',
    })
    .then(async res => {
        const text = await res.json()
        resolve(text) 
     })
    .catch(err => reject(err))
});
exports.BikinTikel = BikinTikel