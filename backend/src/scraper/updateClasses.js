// Takes class information from raw_course_data and creates corresponding classes
import fs from "fs";

// make sure to run script from backend folder
const rawData = fs.readFileSync('./src/scraper/raw_course_data.json', 'utf8');
const courseData = JSON.parse(rawData);

let i = 0;
for (const course in courseData["courses"]) {
    const courseName = course;
    const courseTitle = courseData["courses"][course][0]

    const length = courseData["courses"][course].length;
    const courseDescription = courseData["courses"][course][length - 1];
    
    const sections = courseData["courses"][course][1];
    for (const [section, sectionProperties] of Object.entries(sections)) {
        const courseSection = section;
        const crn = sectionProperties[0];
        if (typeof(sectionProperties[1][0]) === "undefined") {
            /**
             * as far as I can tell, these are not valid classes, they do not have any enrollment, unlikely to
             * affect users but could be worth investigating later
             */
            continue;
            console.log(`https://oscar.gatech.edu/bprod/bwckschd.p_disp_detail_sched?term_in=202508&crn_in=${crn}`);
        }

        let prof = "Unknown Instructor";
        if (typeof(sectionProperties[1][0][4][0]) !== "undefined") {
            prof = sectionProperties[1][0][4][0];
        } 
        // const prof = ((typeof(sectionProperties[1][0][2][4]) === "undefined") ? "Unkown Instructor" : sectionProperties[1][0][4][0]);
        console.log(prof);
        i++;
    }
}