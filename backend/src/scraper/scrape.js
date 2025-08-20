import Subscription from "../models/Subscription.js";
import axios from "axios";
import * as cheerio from "cheerio";


const scrapeSubscription = async () => {
    axios.get("https://oscar.gatech.edu/bprod/bwckschd.p_disp_detail_sched?term_in=202508&crn_in=81327")
    .then(({data}) => {
        const $ = cheerio.load(data);

        const scrapedData = $(".datadisplaytable .dddefault")
            .map((_, text) => {
                const $text = $(text);
                return $text.text();
            })
            .toArray();
        console.log(scrapedData);
        console.log("Scraped");
    });
}

scrapeSubscription();