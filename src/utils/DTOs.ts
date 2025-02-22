import z from "zod"
export const userSchema = z.object({
    fullname:z.string().min(5,"fullname must be at least 5 characters"),
    username:z.string().min(3,"username must be at least 3 characters").optional(),
    email:z.string().email(),
    password:z.string().min(8)
})
export const  loginInput = z.object({
    username:z.string().min(3,"username must be at least 3 characters").optional(),
    email:z.string().email().optional(),
    password:z.string().min(8)
})
export const updateUserSchema = z.object({
    fullname:z.string().min(5,"fullname must be at least 5 characters").optional(),
    username:z.string().min(3,"username must be at least 3 characters").optional(),
    email:z.string().email().optional(),
    password:z.string().min(8).optional(),
    profilePic:z.string().optional()
})