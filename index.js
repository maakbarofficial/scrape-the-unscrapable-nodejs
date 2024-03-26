const axios = require("axios");
const cheerio = require("cheerio");

const fetchGames = async () => {
  try {
    const response = await axios.get(
      "https://www.amazon.com/s?k=games&page=2&crid=2YCAKARZ9TNF&qid=1711480032&sprefix=gam%2Caps%2C838&ref=sr_pg_2"
    );
    // console.log(response.data);
    const html = response.data;
    const $ = cheerio.load(html);
    // console.log($);
    const games = [];

    $(
      "div.sg-col-4-of-24.s-result-item.s-asin.sg-col-4-of-16.sg-col.sg-col-4-of-20"
    ).each((index, el) => {
      const game = $(el);
      const title = game.find(
        "span.a-size-base-plus.a-color-base.a-text-normal"
      );
      games.push(title);
    });

    return games;
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

fetchGames().then((games) => console.log(games));
