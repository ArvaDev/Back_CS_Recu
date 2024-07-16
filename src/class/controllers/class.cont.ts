import { Request, Response } from 'express';
import { ChatMessage } from '../../message/message';
import { ClassModel } from "../models/class.model";

export const createClass = async (req: Request, res: Response) => {
    try {
        const clase = new ClassModel(req.body);
        clase.uniqueID = String(clase.generateUniqueID());
        await clase.save();
        res.status(200).json({ success: true, classID: clase.uniqueID });
    } catch {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const addWebHook = async (req: Request, res: Response) => {
    try {
        const clase = await ClassModel.findOne({uniqueID: req.params.uniqueID});
        if(!clase) {
            return res.status(404).json({ message: "Clase no encontrada" });
        }
        clase.webhooks.push(req.body.webhook);
        clase.save();
        res.status(200).json({success: true, message: "Webhook add"});
    } catch {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getUserByClass = async (req: Request, res: Response) => {
    try {
        const clase = await ClassModel.findOne({ uniqueID: req.params.uniqueID });
        if(!clase){
            return res.status(404).json({ message: "Clase no encontrada" });
        }
        res.status(200).json({ success: true, users: clase.users });
    } catch {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const putClassUserID = async (req: Request, res: Response) => {
    try {
        const clase = await ClassModel.findOne({ uniqueID: req.params.uniqueID });
        if (!clase) {
            return res.status(404).json({ message: "Clase no encontrada" });
        }
        if (!clase.users) {
            clase.users = [];
        }
        clase.users.push(req.body.user);
        await clase.save();
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error al obtener la clase:', error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const getClass = async (req: Request, res: Response) => {
    try {
        const clase = await ClassModel.findOne({ uniqueID: req.params.uniqueID });
        if (!clase) {
            return res.status(404).json({ message: "Clase no encontrada" });
        }
        res.status(200).json(clase);
    } catch (error) {
        console.error('Error al obtener la clase:', error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const deleteClass = async (req: Request, res: Response) => {
    try {
        const clase = await ClassModel.findOne({ uniqueID: req.params.uniqueID });
        if (!clase) {
            return res.status(404).json({ message: "Class not found" });
        }
        await clase.deleteOne({ uniqueID: req.params.uniqueID });
        res.status(200).json({ success: true });
    } catch {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const putChat = async (msg: ChatMessage) => {
    try {
        const clase = await ClassModel.findOne({ uniqueID: msg.classID });
        if (clase) {
            clase.chat.push(msg);
            await clase.save();
            console.log('Message saved to class:', msg.classID);
        } else {
            console.log("Class not found");
        }
    } catch (error) {
        console.error('Error saving chat message:', error);
        throw error;
    }
};

export const getChat = async (classID: String) => {
    try {
        const clase = await ClassModel.findOne({ uniqueID: classID });
        if (clase) {
            return clase.chat;
        } else {
            console.log("Class not found");
        }
    } catch (error) {
        console.error('Error saving chat message:', error);
        throw error;
    }
}

export const getClassChat = async (req: Request, res: Response) => {
    try{
        const { uniqueID } = req.params;
        const clase = await ClassModel.findOne({uniqueID: uniqueID});
        if(!clase) {
            return res.status(404).json({message: "Class not found"});
        }
        res.status(200).json({chat: clase.chat});

    } catch {
        res.status(500).json({ message: "Internal server error" });
    }
}