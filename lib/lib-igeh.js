const Insta = require('scraper-instagram');
const InstaClient = new Insta();


function igpost(url) {
    return new Promise((resolve, reject) => {
        if (url.includes('instagram.com')) {
            const idRegex = /([-_0-9A-Za-z]{11})/
            const id = url.match(idRegex)
            InstaClient.getPost(id[0]).then((a) => {
                const user = a.author.username
                const name = a.author.name
                const author_pic = a.author.pic
                let media = []
                for (let i = 0; i < a.contents.length; i++) {
                    const konten = a.contents[i] 
                    media.push({
                        tipe: konten.type,
                        link: konten.url
                    })
                }
                let tagged = []
                a.tagged.forEach(person => {
                    tagged.push(person)
                });
                const like = a.likes
                const caption = a.caption
                const publish = new Date(a.timestamp * 1000)
                resolve({
                    nama: name,
                    username: user,
                    author_pic: author_pic,
                    timestamp: publish,
                    like: like,
                    caption: caption,
                    media: media,
                    tagged: tagged
                })
            }).catch(reject)
        } else {
            reject('URL TIDAK VALID!')
        }
    })
}

module.exports.igpost = igpost