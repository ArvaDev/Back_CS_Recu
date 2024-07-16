import { ChatMessage } from "../message/message";
export interface Class {
    name: string;
    creator: string;
    uniqueID: string;
    webhooks: string[];
    post: object[];
    chat: ChatMessage[];
    users: string[];
    generateUniqueID(): Promise<string>;
}