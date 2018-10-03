const Crawler = require('crawler');
const fs = require('fs');

let terms = {};
let c = new Crawler({
    maxConnections: 10
});
const baseUrl = 'http://www.cnrtl.fr';

c.options.callback = (err, res, done) => {
    let $ = res.$;

    // récupération de toutes les définitions de la page
    $('.hometab td a').each((i, elem) => {
        terms[$(elem).text()] = baseUrl+$(elem).attr('href');
    });

    let nextLink = $('.hometab').nextAll('table').find('td').eq(1).find('a');

    // Si on a un bouton page suivante, alors on l'ajoute a la queue
    if (nextLink.length > 0) {
        c.queue(baseUrl + nextLink.attr('href'));
    }

    done();
};
c.on('drain', () => {
    fs.writeFileSync('tlfi.json', JSON.stringify(terms));
});

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'W', 'X', 'Y', 'Z'];

letters.map((letter) => {
    c.queue(baseUrl + '/portailindex/LEXI/TLFI/' + letter);
});

