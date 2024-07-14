const { z } = require("zod");

const loginSchema = z.object({
    email: z.string({ required_error: "Email is required" }).trim().email({ message: "Invalid email address" }),
    password: z.string({ required_error: "Password is required" }).trim()
});

const registerSchema = z.object({
    email: z.string({ required_error: "Email is required" }).trim().email({ message: "Invalid email address" }),
    password: z.string({ required_error: "Password is required" }).trim().min(6, "Password must be at least 6 characters long"),
    name: z.string({ required_error: "Name is required" }).trim().min(2, "Name must be at least 2 characters long"),
});

const addBookSchema = z.object({
    isbn: z.string({ required_error: "ISBN is required" }).trim().min(10, "ISBN must be at least 10 characters long"),
})

const addLibrarianSchema = z.object({
    email: z.string({ required_error: "Email is required" }).trim().email({ message: "Invalid email address" }),
    name: z.string({ required_error: "Name is required" }).trim().min(2, "Name must be at least 2 characters long"),
    password: z.string({ required_error: "Password is required" }).trim().min(6, "Password must be at least 6 characters long"),
});

const deleteLibrarianSchema = z.object({
    userId: z.string({ required_error: "userId is required" }).trim()
});

const issueBookSchema = z.object({
    isbn: z.string({ required_error: "ISBN is required" }).trim().min(10, "ISBN must be at least 10 characters long"),
    email: z.string({ required_error: "Email is required" }).trim()
});

module.exports = {
    loginSchema,
    registerSchema,
    addBookSchema,
    addLibrarianSchema,
    deleteLibrarianSchema,
    issueBookSchema
}