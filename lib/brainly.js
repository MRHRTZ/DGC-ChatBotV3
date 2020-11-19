const brainly = require('brainly-scraper-v2')

module.exports = BrainlySearch = (pertanyaan, jumlah, lang, cb) => {
    brainly(pertanyaan.toString(),Number(jumlah),lang.toString()).then((res) => {
            console.log(res)
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
            })
            return brainlyResult
    }).then(x => {
        cb(x)
    }).catch(err => {
        console.log(err.error)
    })
}
