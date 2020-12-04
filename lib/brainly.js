const brainly = require('brainly-scraper-v2')

function BrainlySearch(pertanyaan, jumlah, lang, cb) {
    return new Promise((resolve, reject) => {
        brainly(pertanyaan.toString(),Number(jumlah),lang.toString()).then((res) => {
        let brainlyResult = []
        res.data.forEach((ask) => {
            let opt = {
                pertanyaan: ask.pertanyaan,
                fotoPertanyaan: ask.questionMedia
            }
            ask.jawaban.forEach(answer => {
                opt.jawaban = {
                    judulJawaban: answer.text,
                    fotoJawaban: answer.media
                }
            })
            brainlyResult.push(opt)
            resolve(brainlyResult)
            })
    }).catch(err => {
        console.log(err.error)
        reject(err)
    })
    })
}

module.exports.BrainlySearch = BrainlySearch