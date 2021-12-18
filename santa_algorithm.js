require('dotenv').config()
const {sendEmail} = require("./sendEmail");
const {input_participants} = require("./config");

function santaAlgorithm(list) {

    const participantsList = addSelfInBlockList(list)
    let emails =  participantsList.map((participant) => {
        const email = participant["email"]
        return email;
    })
    emails = shuffle(emails)
    ;
    const extracted = []
    const result =  participantsList.map((participant) => {
        const blackList = participant["blackList"];
        const receiverEmail = getElementRandomFromArray(emails,blackList,extracted)
        if(receiverEmail != null) {
            extracted.push(receiverEmail)
        }
        const recevierObj = participantsList.find((participant) => (participant.email === receiverEmail))
        return [{email:participant["email"],name:participant["name"]}, {email:recevierObj["email"],name:recevierObj["name"]}]
    })
    return result;
}

function  addSelfInBlockList(list) {
    const newList = list
    for (const participant of newList ) {
        participant["blackList"].push(participant["email"])
    }
    return newList
}

function getElementRandomFromArray(emails ,not_toExtract,extracted) {
    const arrayToPickRandom=emails.filter(x => ![...not_toExtract,...extracted].includes(x));
    const item = arrayToPickRandom[Math.floor(Math.random()*arrayToPickRandom.length)];
    return item;
}

function checkSolution(result,participantsNumber) {
    let solutionRight = true;
    for (const element of result){
        solutionRight = solutionRight && element[0] != null && element[1] != null
    }
    return solutionRight && result.length === participantsNumber;
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

async function sendEmailToAll(blackList){
    const result = santaAlgorithm(blackList)
    const check = checkSolution(result,blackList.length);
    console.log(result.length)
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
        console.log("Email sent successfully");
    }
    else {
        console.log("Problems with sending of the emails");
    }
}

async function main() {
   await sendEmailToAll(input_participants)
}

main().catch(console.error)



