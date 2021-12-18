const input_participants = [
    {email:"email@hotmail.it",name:"NAME",blackList:["email@gmail.com","email@gmail.com"]},
    {email:"email@live.it",name:"NAME",blackList:[]},
    {email:"email@gmail.com",name:"NAME",blackList:["email@hotmail.it"]},
    {email:"email@gmail.com",name:"NAME",blackList:["email@hotmail.it"]},
    {email:"email@virgilio.it",name:"NAME",blackList:[]},
    {email:"email@yahoo.com",name:"NAME",blackList:["email@yahoo.com"]},
    {email:"email@yahoo.com",name:"NAME",blackList:["email@yahoo.com"]},
    {email:"email@hotmail.it",name:"NAME",blackList:[]},
]
const email_subject = "Secret Santa"
const initial_phrase_email = "You have to do a christmas present to"

module.exports ={
    input_participants:input_participants,
    email_subject:email_subject,
    initial_phrase_email:initial_phrase_email
}