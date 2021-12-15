
function santaAlgorithm(blackList) {

     Object.keys(blackList).forEach((key) => {
        blackList[key].push(key)
    })
    console.log(blackList);
    const emails = Object.keys(blackList)
    console.log("tutte le email",emails);
    // const linkedWhiteList = getWhiteList(emails,blackList)
    const extracted = []
    const result =  emails.map((email) => {
        const receiver = getElementRandomFromArray(emails,blackList[email],extracted)
        if(receiver != null) {
            console.log("sto per aggiungere un reciver",receiver);
            extracted.push(receiver)
        }
        return [email,receiver]
    })
    return result;
}

/*function getWhiteList(emails,blackList) {
    const result =  Object.keys(blackList).map((key) => {
        console.log(key);
        const difference=emails.filter(x => !blackList[key].includes(x));
        return {
            key:difference
        }
    })
   return result;
}*/

function getElementRandomFromArray(emails ,not_toExtract,extracted) {

    // estrarre da emails un elemento non presente in not_toExtract, extracted
    console.log("gia estratti dentro la funzione",extracted);
    console.log("notToExtract",not_toExtract);
    const arrayToPickRandom=emails.filter(x => ![...not_toExtract,...extracted].includes(x));
    console.log("lista da scorrere ovvero differenza ",arrayToPickRandom);
    const item = arrayToPickRandom[Math.floor(Math.random()*arrayToPickRandom.length)];
    console.log("elemento estratto",item);
    return item;

}

const result =santaAlgorithm(
    {a:[],b:[], c:[]}
    )

console.log(result);

/*const getRandNotInList = (n, list) => {
    const picks = [];
    const getPickable = () => {
        var i = 0;
        dir = Math.sign(n);
        list = new Set(list);
        while (i !== n) {
            !list.has(i) && picks.push(i);
            i += dir;
        }
    }
    n = Math.floor(n);
    if (n === 0) {
        return list.includes(0) ? undefined : 0
    }
    getPickable();
    return picks[Math.random() * picks.length | 0]; // (| 0) same as Math.floorK
}        */// (only for positive ints).