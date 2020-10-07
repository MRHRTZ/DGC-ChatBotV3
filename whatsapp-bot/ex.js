const translate = require('./translate')

const text = 'Hai Apakabar saya disini belajar buat translate dari nodejs!'
const lang = 'en'

translate(text, lang)
                .then((result) => console.log(result))
                .catch(() => console.log('Error, Kode bahasa salah.'))
