import cheerio from "cheerio-without-node-native";

export default {
    Wikipedia(html) {
        let $ = cheerio.load(html);

        let $items = $('.mw-search-results li');
        let data = [];

        for (let i = 0; i < $items.length; i++) {
            let item = {
                title :$items.eq(i).find('.mw-search-result-heading').text(),
                content : $items.eq(i).find('.searchresult').text(),
                update_at: $items.eq(i).find('.mw-search-result-data').text(),
                url: $items.eq(i).find('a').attr('href').trim(),
            };

            if (!item.url.startsWith('http')) {
                item.url = 'https://zh.m.wikipedia.org' + item.url;
            }

            if (item.title) {
                data.push(item);
            }
        }

        return data;
    },

    Google(html) {
        let $ = cheerio.load(html);

        let $items = $('.srg > div');
        let data = [];

        for (let i = 0; i < $items.length; i++) {
            let item = {
                title :$items.eq(i).find('._ees').text(),
                content : $items.eq(i).find('._H1m').text(),
                update_at: $items.eq(i).find('._Clt').text(),
                url: $items.eq(i).find('a').attr('href'),
            };

            if (item.title) {
                data.push(item);
            }
        }

        return data;
    },

    Zhihu(text) {
        let json = JSON.parse(text);
        let data = [];

        json.htmls.map(html => {
            let $ = cheerio.load(html);

            let $items = $('.item');

            for (let i = 0; i < $items.length; i++) {
                let item = {
                    title :$items.eq(i).find('.js-title-link').text(),
                    content : $items.eq(i).find('.summary').text(),
                    update_at: $items.eq(i).find('.votenum-mobile').text(),
                    url: $items.eq(i).find('.js-title-link').attr('href')||'',
                };

                if (!item.url.startsWith('http')) {
                    item.url = 'https://www.zhihu.com' + item.url;
                }

                if (item.title && item.update_at) {
                    item.update_at = '赞同: ' + item.update_at;
                    data.push(item);
                }
            }
        });

       return data;
    }
}