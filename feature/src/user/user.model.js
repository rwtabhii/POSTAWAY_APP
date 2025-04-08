export class userModel {
    constructor(id, name, email, password, type) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static signup(data) {
        const { name, email, password } = data;
        const newUser = new userModel(users.length + 1, name, email, password);
        users.push(newUser);
        return newUser;


    }

    static signin(email, password) {
        const findUser = users.find(user => user.email == email && user.password == password)
        return findUser;

    }



}


export const users = [
    {
        id: 1,
        name: "abc",
        email: "abc@gmail.com",
        password: "pass1",
    },
    {
        id: 2,
        name: "def",
        email: "def@gmail.com",
        password: "pass2",
        

    },
    {
        id: 3,
        name: "ijk",
        email: "ijk@gmail.com",
        password: "pass3",
        

    },
    {
        id: 4,
        name: "lmn",
        email: "lmn@gmail.com",
        password: "pass4",
        

    }
];