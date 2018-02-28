import parse_html from "./parse_html";

const UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1';

export default async (name, words) => {
    let url;

    switch (name) {
        case 'Zhihu':
            url = 'https://www.zhihu.com/r/search?q=${keyword}&correction=1&type=content';
            break;
        case 'Google':
            url = 'https://www.google.com/search?q=${keyword}';
            break;
        case 'Wikipedia':
            url = 'https://zh.m.wikipedia.org/w/index.php?search=${keyword}&fulltext=search';
            break;
    }

    let data = [];

    for (let word of words) {
        if (!word || !word.key) continue;

        let res = await fetch(url.replace('${keyword}', word.key), {
            method: 'GET',
            headers: {
                'User-Agent': UA,
                credentials: 'include',
            },
        });

        let text = await res.text();
        data = data.concat(parse_html[name](text));
    }

    return data;
}