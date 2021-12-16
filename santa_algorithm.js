const {sendEmail} = require("./sendEmail");

// input [{email:"email",name:"Name",blackList:[...]}]
// email receiver
// output [[{email:"email",name:"name"},{email:"email",name:"name"}]]
function santaAlgorithm(participantsList) {
   /*  Object.keys(participantsList).forEach((key) => {
        participantsList[key].push(key)
    })*/
    const emails =  participantsList.map((participant) => {
        const email = participant["email"]
        return email;
    })//Object.keys(participantsList)
    console.log(emails);
    const extracted = []
    const result =  participantsList.map((participant) => {
        const blackList = participant["blackList"];
        const receiverEmail = getElementRandomFromArray(emails,blackList,extracted)
        if(receiverEmail != null) {
            extracted.push(receiverEmail)
        }
        const recevierObj = participantsList.find((participant) => (participant.email === receiverEmail))
        console.log(recevierObj);
        return [{email:participant["email"],name:participant["name"]}, {email:recevierObj["email"],name:recevierObj["name"]}]
    })
    return result;
}

function getElementRandomFromArray(emails ,not_toExtract,extracted) {
    const arrayToPickRandom=emails.filter(x => ![...not_toExtract,...extracted].includes(x));
    const item = arrayToPickRandom[Math.floor(Math.random()*arrayToPickRandom.length)];
    return item;
}

function checkSolution(result) {
    let solutionRight = true;
    for (const element of result){
        solutionRight = solutionRight && element[0] != null && element[1] != null
    }
    return solutionRight;
}

async function sendEmailToAll(blackList){
    const result = santaAlgorithm(blackList)
    const check = checkSolution(result);
    console.log(result);
    console.log(check);
    if(check) {
        for (const sendTo of result) {
            try {
                await sendEmail(sendTo);
            }
            catch (error) {
                console.log(error);
            }
        }
        console.log("Email inviate con successo");
    }
    else {
        console.log("problemi con invio email");
    }
}

async function main() {
   await sendEmailToAll( [{email:"email",name:"Name",blackList:[]},{email:"email2",name:"Name",blackList:[]},{email:"email3",name:"Name",blackList:[]}]).then()
}

main().catch(console.error)

/*const result =santaAlgorithm({a:[],b:[], c:[]})
const check = checkSolution(result)*/


