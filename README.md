# secret_santa


### WHY ?
This code has the goal to pick santa secret couples. In the case of this project you can configure that there is some participants can not do gift to someone , imagine in a group there is a couple of wife and husband.
The algorithm can fail because there is a black list condition . So if fails will not send the emails , and then you can execute again.
Enjoy!
### Run
`node santa_algorithm.js`
### To use your email google to send emails follow this article
[Use nodemailer to send emails from your node js server](https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/)
### input  array in main function Example
```
[
       {email:"email@hotmail.it",name:"NAME",blackList:["email@gmail.com","email@gmail.com"]},
       {email:"email@live.it",name:"NAME",blackList:[]},
       {email:"email@gmail.com",name:"NAME",blackList:["email@hotmail.it"]},
       {email:"email@gmail.com",name:"NAME",blackList:["email@hotmail.it"]},
       {email:"email@virgilio.it",name:"NAME",blackList:[]},
       {email:"email@yahoo.com",name:"NAME",blackList:["email@yahoo.com"]},
       {email:"email@yahoo.com",name:"NAME",blackList:["email@yahoo.com"]},
       {email:"email@hotmail.it",name:"NAME",blackList:[]},
]
```
```
 {
    email:"EMAIL_PARTICIPANT",
    name:"NAME_PARTICIPANT",
    blackList:[...AN ARRAY OF PARTICIPANTS THAT CAN NOT BE A RECEVIER OF THIS PARTICIPANT]
    },
```
### output of santaAlgorithm function in santa_algorithm.js
```
[{email:"EMAIL WHO S GIFT", name: "NAME WHO S GIFT"},{email:"EMAIL WHO S RECEIVE", name:"NAME WHO S RECEIVE"}]
```