class User {
    constructor(){
        this.users = [];
    }

    addNewUser(user){
        this.users.push(user);
        return true;
    }

    getAllUsers(){
        return this.users;
    }

    removeUser(id){
        if(!id) return this.users;
        this.users = this.users.filter((user)=>{
            return user.id != id;
        });
        return this.users;
    }
}

module.exports = User;