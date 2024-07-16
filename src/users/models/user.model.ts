import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';
import { User } from '../users';

const userSchema = new Schema<User>({
    name: { type: String, required: true },
    mail: { type: String, required: true },
    password: { type: String, required: true },
    tel: { type: String, required: true },
    rol: { type: Boolean, required: true },
    classes: [{ type: String, required: true }],
    tuition: { type: String, required: true },
})

userSchema.methods.encryptPassword = async function (pass: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(pass, salt);
};

userSchema.methods.validatePassword = async function (pass: string) {
    return await bcrypt.compare(pass, this.password);
};

userSchema.methods.generateTuition = function () {
    const currentYear = new Date().getFullYear().toString().slice(-2);
    const currentDay = new Date().getDate().toString().padStart(2, '0');
    const randomNum = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    return `${currentYear}${currentDay}${randomNum}`;
};

export const UserModel = model<User>('users', userSchema);