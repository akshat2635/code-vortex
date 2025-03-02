
import { v } from "convex/values";
import { mutation} from "./_generated/server"; 

export const syncUser= mutation({
    args:{
        userId: v.string(),
        email: v.string(),
        name: v.string(),
    },
    handler: async (ctx, args) => {
        const {userId, email, name} = args;
        const existingUser= await ctx.db.query("users").filter(q=>q.eq(q.field("userId"),userId)).first();
        if (existingUser) {
            // User already exists, optionally update fields if needed
            console.log(`User ${userId} already exists, skipping creation`);
            return existingUser._id;
        } else {
            // User doesn't exist, insert new user
            const newUserId = await ctx.db.insert("users", { 
                userId,
                email,
                name,
                isPro: false
            });
            console.log(`Created new user with ID ${userId}`);
            return newUserId;
        }
    }
})  