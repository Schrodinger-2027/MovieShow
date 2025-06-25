import { Inngest } from "inngest";
import User from "../models/UserModel.js";

export const inngest = new Inngest({ id: "movie-ticket-booking" });

// Create user
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-with-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const userdata = {
      _id: id,
      email: email_addresses?.[0]?.email_address,
      name: `${first_name || ""} ${last_name || ""}`.trim(),
      image: image_url,
    };

    try {
      await User.create(userdata);
    } catch (err) {
      if (err.code === 11000) {
        console.log("User already exists, skipping creation.");
      } else {
        console.error("User creation failed:", err.message);
        throw err;
      }
    }
  }
);

// Delete user
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;

    try {
      await User.findByIdAndDelete(id);
    } catch (err) {
      console.error("User deletion failed:", err.message);
      throw err;
    }
  }
);

// Update user
const syncUserUpdation = inngest.createFunction(
  { id: "update-user-with-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const userdata = {
      email: email_addresses?.[0]?.email_address,
      name: `${first_name || ""} ${last_name || ""}`.trim(),
      image: image_url,
    };

    try {
      await User.findByIdAndUpdate(id, userdata, { new: true });
    } catch (err) {
      console.error("User update failed:", err.message);
      throw err;
    }
  }
);

export const functions = [
  syncUserCreation,
  syncUserDeletion,
  syncUserUpdation,
];
