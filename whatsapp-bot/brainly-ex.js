const brainly = require('brainly-scraper-v2')
//function bren(ask, page){
	const text = 'ulangan bro?'
	brainly(text, 6).then(res => {
	const hasil = res.data[1]
	//console.log(hasil)
	for (var i = 0; i < res.length; i++){
        //console.log(jumhasil, res.length, '\n',hasil.pertanyaan,':\n', hasil.jawaban[0].text)
	const out = res.data[i]
	const num = i+1
	let foto = out.questionMedia
	var jumjaw = out.jawaban.length
	//console.log(jumjaw)
	if (jumjaw === 1){
		console.log(`Soal ${num}:\nPertanyaan: ${out.pertanyaan}\nJawaban: ${out.jawaban[0].text}\nMedia: ${foto}\n\n\n`)
		}
	else if (jumjaw === 2){
		console.log(`Soal ${num}:\nPertanyaan: ${out.pertanyaan}\nJawaban 1: ${out.jawaban[0].text}\nJawaban 2: ${out.jawaban[1].text}\nMedia: ${foto}\n\n\n`)
		}
	}
	//console.log(jumjaw)
});
//}
