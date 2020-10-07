const brainly = require('brainly-scraper-v2')


/**
 * Brainly Text
 * @param  {String} text
 * @param  {String} num
 */

module.exports = brainlyv2 = (text, num, hs) => {
    brainly(text.toString(), Number(num)).then(res => {
	const hasil = res.data[1]
        for (var i = 0; i < res.length; i++){
	        const out = res.data[i]
        	const num = i+1
        	let foto = out.questionMedia
        	var jumjaw = out.jawaban.length
	}
        //console.log(jumjaw)
}).then(outbren => {
	hs(outbren)
}).catch(err = {
	//console.log(err)
})
}
