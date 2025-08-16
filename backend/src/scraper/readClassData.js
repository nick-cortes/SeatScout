import fs from "fs";

// make sure to run script from backend folder
const raw_data = fs.readFileSync('./src/scraper/raw_course_data.json', 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading raw course data", err);
        return;
    }
    return JSON.parse(data);
});