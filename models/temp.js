const queryVariables = `{
  "signupInput" : {
    "username":"mangato",
    "password":"mysecurepassword",
    "email":"mangato@gmail.com",
    "usertype": "ADMIN"
  },
  
  "loginInput":{
     "username":"mangato",
    "password":"mysecurepassword",
    "email":"mangato@gmail.com"
  },
  "username": "mangato",
  "id": "5e6a432b33ff271c4464ddea",
   "email": "mangato@gmail.com"
}`;

//graphql query for test on graphiql
const typeDefs = `mutation singnup($signupInput:userRegistrationInput){
  signup(input:$signupInput){
    email
    username
    usertype
    token
  }
}

mutation signin($loginInput:userSigninInput){
  signin(
    input:$loginInput) {
    username
    usertype
    token
  }
}


 query getAllUsers{
 users{
  username
  email
  usertype
}
}

query getUserByUsername($username:String){
   getUserByUsername(username:$username){
    username
    usertype
    email
    token
  } 
}

query getUserByID($id:String){
   getUserByID(_id:$id){
    username
    usertype
    email
    token
    _id
  } 
}

query getUserByEmail($email:String){
   getUserByEmail(email:$email){
    username
    usertype
    email
    token
    _id
  } 
}`;

const graphiqlHeaderVariable = `{
  "authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Imxlc2ZhQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoibGVzZmEiLCJpYXQiOjE1ODM2Nzg1ODksImV4cCI6MTU4NjI3MDU4OX0.EVLGDUbyJUekN-kkWIX1JuOvWwMhk4wcx1QpOnaNvzk"
}`;
