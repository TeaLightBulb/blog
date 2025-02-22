import {Client, Account, ID} from 'appwrite'
import config from '../config/config.js';
export class AuthService{
    client = new Client();
    account;
    // if the object clint is created this constructor will automatically be called and create new account
    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl) // appwrite url
            .setProject(config.projectId); // project id
        this.account = new Account(this.client);
        console.log(this.account);
    }
    
    // create account method
    async createAccount ({email, password, name}){
        try {
            const userAccount = await this.account.creat(ID.unique(), email, password, name);
            if (userAccount) {
                // call login method
                return this.login({email, password});
            } else {
                return userAccount
            }
        } catch (error) {
            throw error;
        }
    }

    // login method 
    async login ({email, password}){
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error
        }
    }

    // get the user is logged in 
    async getCurrentUser () {
        try {
            console.log('this in running');
            return await this.account.get(ID.unique());
        } catch (error) {
           console.log("Appwrite :: auth_service :: error", error); 
           
        }

        return null;  // in case the user is not found 
    }


    // logout method
    async logout () {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            throw error
        }
    }
}


// exporting an object (not class) by creating a new instance
const authService = new AuthService();  

export default authService