require('dotenv').config()
const {sendEmail} = require("./sendEmail");
// input [{email:"email",name:"Name",blackList:[...]}]
// email receiver
// output [[{email:"email",name:"name"},{email:"email",name:"name"}]]
function santaAlgorithm(list) {

    const participantsList = addSelfInBlockList(list)
    let emails =  participantsList.map((participant) => {
        const email = participant["email"]
        return email;
    })//Object.keys(participantsList)
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

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

async function sendEmailToAll(blackList){
    const result = santaAlgorithm(blackList)
    const check = checkSolution(result,blackList.length);
    //console.log(result);
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
        console.log("Email inviate con successo");
    }
    else {
        console.log("problemi con invio email");
    }
}

async function main() {
   await sendEmailToAll( [
       {email:"victorcarrilho94@hotmail.it",name:"Victor Carrilho",blackList:["elisabettab129@gmail.com"]},
       {email:"Xxdragone96xx@live.it",name:"Daniele Venditti",blackList:[]},
       {email:"cambone.alessandro@gmail.com",name:"Alessandro Cambone",blackList:[]},
       {email:"elisabettab129@gmail.com",name:"Elisabetta Boldrini",blackList:["victorcarrilho94@hotmail.it"]},
       {email:"dipaoloemanuele@virgilio.it",name:"Emanuele Di Paolo",blackList:[]},
       {email:"saraosmelli@yahoo.com",name:"Sara Osmelli",blackList:["utentedocappunti@yahoo.com"]},
       {email:"utentedocappunti@yahoo.com",name:"Daniele Furii",blackList:["saraosmelli@yahoo.com"]},
       {email:"chiaracarrozzino@hotmail.it",name:"Chiara Carrozzino",blackList:[]},
       ]
   )
}

main().catch(console.error)

/*const result =santaAlgorithm({a:[],b:[], c:[]})
const check = checkSolution(result)*/


