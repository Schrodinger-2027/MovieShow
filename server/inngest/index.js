import { Inngest } from "inngest";
import User from "../models/User.js";

export const inngest = new Inngest({ id: "movie-ticket-booking" });

// to save user data to database;
const syncUserCreation = inngest.createFunction(
    {id : 'sync-user-from-clerk'},
    {event : 'clerk/user.created'},
    async ({event , step})=>{
        step.log("Received user.created event:", event.data);
        const {id , first_name , last_name , email_addresses, image_url} = event.data
        const userdata = {
            _id : id,
            email : email_addresses[0].email_address,
            name : first_name +  ' ' + last_name,
            image : image_url
        }
        await User.create(userdata)
    }
)

// to delete user from database;

const syncUserDeletion = inngest.createFunction(
    {id : 'delete-user-with-clerk'},
    {event : 'clerk/user.deleted'},
    async ({event})=>{
        
        const {id} = event.data
        await User.findByIdAndDelete(id)
    }
)

// ingest function to update user data 

const syncUserUpdation = inngest.createFunction(
    {id : 'update-user-from-clerk'},
    {event : 'clerk/user.updated'},
    async ({event})=>{
        const {id , first_name , last_name , email_addresses, image_url} = event.data
        const userdata = {
            _id : id,
            email : email_addresses[0].email_address,
            name : first_name +  " " + last_name,
            image : image_url
        }

        await User.findByIdAndUpdate(id , userdata);
    }
)

export const functions = [syncUserCreation , syncUserDeletion , syncUserUpdation];