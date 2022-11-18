var college = ["Center for Testing and Career Certification",
    "College of Arts, Sciences and Education",
    "College of Business",
    "College of Communications, Architecture and the Arts",
    "College of Engineering and Computing",
    "College of Law",
    "College of Medicine",
    "College of Nursing and Health Sciences",
    "College of Public Health and Social Work",
    "valueContinued Education",
    "Honors College",
    "International Student Exchange",
    "Military Science",
    "National Student Exchange",
    "School of Hospitality and Tourism Management",
    "School of International and Public Affairs",
    "Undergraduate Education",
    "University Graduate School",
]

var department = ["African Studies", "Anesthesiology", "Architecture", "Art & Art History", "Asian Studies", "Athletic Training", "Biological Sciences", "Biomedical Engineering", "Biostatistics", "CASE NonCredit", "Chemistry", "Civil & Environ Engr", "Col Nurs & Hlth Sciences", "Col of Arts,Sciences&Education", "Coll of Comm, Arch + The Arts", "College of Arch and The Arts", "College of Arts and Sciences", "College of Business", "College of Education", "College of Engineering", "College of Medicine", "College of Pub Hlth & Soc Wrk", "Commun Sci & Disorders", "Communication", "Construction Management", "Counsel Rec & Sch Psych", "Criminal Just", "Ctr for the Transf Tching Math", "Curriculum & Instruction", "Dance", "Decis Sci & Info Sys", "Department of Finance", "Dietetics & Nutrition", "Disaster Management", "Earth & Environment", "Economics", "Educ & Pyschological St", "Educ Leadrship & Pol Stu", "Educ Policy Studies", "Electr & Computer Engr", "Engineering Management", "English", "Entrepreneurship", "Environ & Occupatnl Hlth", "Epidemiology & Biostats", "Epidemiology", "Finance", "Glob Leader & Manag", "Global & Sociocultural St", "Graduate Medicine", "Green Sch of Intl & Public Aff", "Health Information Mgmt", "Health Sciences", "Health Services Admin", "Health, Phys Ed & Rec", "Healthcare Management", "History", "Hlth Policy & Mgmt", "Hlth Promo & Disease Prv", "Hlth Promo & Disease Prv", "Hlth Services Admin", "Honors", "Honors College", "Hospitality Management", "Humanities", "Industrial & Syst Engr", "Interdisc Courses", "Interdisc Courses", "Interdisc Curriculum", "Interdisc Curriculum", "Interdisc Curriculum", "Interdiscipline Courses", "Interior Architecture", "Interior Design", "International Business", "International Student Exchange", "Journalism+Media", "Journalism-Mass Communication", "Knight Fnd Sch Comp&Info", "Landscape Arch + E&UD", "Landscape Architecture", "Law", "Leadership & Prof Studies", "Leadership & Professional Stud", "Legal Studies", "Liberal Studies", "Marketing", "Math and Stats Sciences", "Mech & Materials Engr", "Mgmt & International Bus", "Military Science", "Modern Languages", "Music", "National Student Exchange", "Non-Degree Certificates", "Nursing", "Occupational Therapy", "Philosophy", "Physical Therapy", "Physics", "Politics& Intl Relations", "Psychology", "Public Administration", "Public Health Department", "Real Estate ", "Religious Studies", "Sandbox Courses", "Sch of Journ & Mass Communic", "Schl of Comp & Info Sci", "School of Accounting", "School of Crimnal Just", "School of Hospitality Mgmt", "School of Social Work", "School of Testing", "School of TTTesting", "Speech Communication", "SUCCEED", "Teaching & Learning", "Teaching & Learning", "Testing Center", "Theatre", "Undergraduate Advising", "Undergraduate Education", "University Graduate School", 'Women"s & Gender Studies']

var semester = ["Spring", "Fall", "Summer"]
var courseLevel = ["Graduate", "underGraduate"]

var data = {
    "mode": ["Online", "In Person", "Hybrid"],
    college,
    department,
    semester,
    courseLevel
}


var appControlListService = require("./services/AppControlList");
function start() {
    return appControlListService.dropData().then(function (res) {
        console.log('========================== Dropdata response', res);
        return appControlListService.insertData(data).then(function (res) {
            console.log('=================================== Res',res);
            process.exit(0)
        })
        .catch(function (err) {
            console.log('========================== Error during data insertion ', err);
            process.exit(1);
        })
    })
    .catch(function (err) {
        console.log('=========================== Error during drop data ', err);
        process.exit(1);
    })
}



start();

































































