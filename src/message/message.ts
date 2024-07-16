import { Document } from "mongoose";
export interface ChatMessage extends Document {
    name: string;
    classID: string;
    message: string;
}