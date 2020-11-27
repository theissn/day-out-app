const axios = require('axios');
const cheerio = require('cheerio')

const ACTIVITY_BUDGET = 0.2;
const FOOD_BUDGET = 0.4;
const SHOW_BUDGET = 0.4;

exports.handler = async (event, context) => {
    const budget = parseFloat(event.queryStringParameters.budget, 10);

    return {
        statusCode: 200,
        body: JSON.stringify({
            restaurant: await getRestaurant(budget * FOOD_BUDGET),
            show: await getShow(budget * SHOW_BUDGET),
            activity: await getActivity(budget * ACTIVITY_BUDGET),
        })
    };
}

const getRestaurant = async (budget) => {
    const resp = await axios.get('https://developers.zomato.com/api/v2.1/search', {
        headers: {
            'user-key': process.env.ZOMATO_KEY
        },
        params: {
            lat: '51.507351',
            lon: '-0.127758',
            radius: '1000',
        }
    });

    return getRandomElFromArray(
        resp.data.restaurants
            .map(r => r.restaurant)
            .filter(res => parseFloat(res.average_cost_for_two) <= budget)
    );
}

const getActivity = async (budget) => {
    const resp = await axios.get('https://www.designmynight.com/london/daytime-events-in-london')
    const $ = cheerio.load(resp.data);

    const activities = $('article.card').map((i, el) => {
        const photos = JSON.parse($(el.children).find('dmn-photo-viewer').attr('photos'));
        const price = $(el.children).find('li.channels__channel:contains("Tickets from")').text().trim().replace('Tickets from £', '').split(' -')[0] || 'Free';
        
        return {
            title: $(el.children).find('h3.card__title').text().trim(),
            image: photos[0].sizes.original?.path || "https://images.unsplash.com/photo-1551524164-7d2f9ff12c70?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80",
            price,
            cost: price === 'Free' ? 0 : parseFloat(price),
            link: $(el.children).find('a[title="Tell Me More"]').attr('href'),
        };
    }).get();

    return getRandomElFromArray(activities.filter(act => act.cost <= budget));
}

const getShow = async (budget) => {
    const resp = await axios.get('https://www.londontheatredirect.com/')
    const $ = cheerio.load(resp.data);

    const shows = $('script[type="application/ld+json"]').map((i, el) => {
      const json = JSON.parse(el.children[0].data);
    
      return json['@type'] === 'TheaterEvent' ? json : null;
    }).get();

    return getRandomElFromArray(shows.filter(sh => parseFloat(sh.offers.lowPrice) <= budget));
}

const getRandomElFromArray = (array) => {
    return array[Math.floor(Math.random() * array.length - 1)];
}
  