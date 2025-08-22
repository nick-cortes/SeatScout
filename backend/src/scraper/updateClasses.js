// Takes class information from raw_course_data and creates corresponding classes
import fs from "fs";
import Class from "../models/Class.js";

const crnURL = "https://oscar.gatech.edu/bprod/bwckschd.p_disp_detail_sched?term_in=202508&crn_in="

export async function updateClasses() {
    const rawData = fs.readFileSync('./src/scraper/raw_course_data.json', 'utf8');
    const courseData = JSON.parse(rawData);

    const classes = [];

    for (const course in courseData["courses"]) {
        const courseName = course;
        const courseTitle = courseData["courses"][course][0]
        const courseTerm = 202508
        const length = courseData["courses"][course].length;
        const courseDescription = courseData["courses"][course][length - 1];
        
        const sections = courseData["courses"][course][1];
        for (const [section, sectionProperties] of Object.entries(sections)) {
            const courseSection = section;
            const crn = sectionProperties[0];
            if (typeof(sectionProperties[1][0]) === "undefined") {
                /**
                 * as far as I can tell, these are not valid classes, they do not have any enrollment, unlikely to
                 * affect users but could be worth investigating later, some are in gt-scheduler, others are not
                 */
                continue;
            }
        
            let prof = "Unknown Instructor";
            if (typeof(sectionProperties[1][0][4][0]) !== "undefined") {
                prof = sectionProperties[1][0][4][0];
                prof = prof.substring(0, prof.length - 4);
            }
            const courseURL = `${crnURL}${crn}`;
            try {
                const newClass = {
                    term: courseTerm, // do this automatically? For now, it's manual.
                    crn: crn,
                    name: courseName,
                    section: courseSection,
                    title: courseTitle,
                    prof: prof,
                    url: courseURL,
                };
                classes.push(newClass);
            } catch (error) {
                console.error("Error in creating class object:", error);
            }
        }
    }
    try {
        await Class.insertMany(classes);
        console.log("All classes updated.");
    } catch (error) {
        console.error("Error in updating classes:", error);
    }
}

export async function deleteClasses() {
    try {
        await Class.deleteMany({});
        console.log("Successfully deleted all classes.");
    } catch (error) {
        console.error("Error in deleting classes:", error);
    }
}

/**
 * To see all valid classes with links
 * const string = `${prof} ${crnURL}${crn} \n`
 * fs.writeFileSync('./src/scraper/classes.txt', string, { flag: 'a' });
 */