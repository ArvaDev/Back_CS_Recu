import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { UserModel } from '../models/user.model';
import { transporter } from '../../../services/mailerService';
import jwt from 'jsonwebtoken';

dotenv.config();
const secret = String(process.env.SECRET);

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const existingUser = await UserModel.findOne({ mail: req.body.mail });

        if (existingUser) {
            res.status(400).json({ success: false, message: "El correo ya está en uso" });
            return;
        }

        const user = new UserModel(req.body);
        user.password = await user.encryptPassword(user.password);
        user.tuition = user.generateTuition();
        await user.save();

        await transporter.sendMail({
            from: 'Classroom',
            to: req.body.mail,
            subject: "Nueva cuenta",
            text: "",
            html: `<h3>Has creado una nueva cuenta en classroom</h3>
                   <h4>Puedes usar esta nueva matrícula para interactuar</h4>
                   <h1>${user.tuition}</h1>`,
        });

        res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const deleteClassOfArray = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedUser = await UserModel.findOneAndUpdate(
            { tuition: req.params.tuition },
            { $pull: { classes: req.params.classID } },
            { new: true }
        );

        if (!updatedUser) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }

        updatedUser.classes = [...new Set(updatedUser.classes)];
        await updatedUser.save();

        res.status(200).json({ success: true, message: "Class deleted and duplicates removed successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", error });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { tuition } = req.params;
        const { classes, ...userData } = req.body;
        const user = await UserModel.findOne({ tuition });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        Object.assign(user, userData);

        if (classes) {
            user.classes.push(classes);
        }

        await user.save();

        const token = jwt.sign(
            { user: user },
            secret,
            { expiresIn: 60 * 15 }
        );

        res.status(200).json({ success: true, message: "User updated successfully", token });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", error });
    }
};

export const signinUser = async (req: Request, res: Response): Promise<void> => {
    const { tuition, password } = req.body;

    try {
        const user = await UserModel.findOne({ tuition }).select('+password');

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const isMatch = await user.validatePassword(password);

        if (!isMatch) {
            res.status(401).json({ message: "Not authorized", token: null });
            return;
        }

        const { password: userPassword, ...userWithoutPassword } = user.toObject();

        const token = jwt.sign(
            { user: userWithoutPassword },
            secret,
            { expiresIn: 60 * 15 }
        );

        res.status(200).json({ success: true, token });
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const tuition = req.params.tuition;
        const user = await UserModel.findOne({ tuition }, { password: 0 });

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", error });
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        await UserModel.deleteOne({ tuition: req.body.tuition });
        res.status(200).json({ message: "Complete delete" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const deleteClassOfUser = async (req: Request, res: Response) => {
    try {
        const idClass = req.params.idClass;
        const idUser = req.params.idUser;
        const updatedUser = await UserModel.findOneAndUpdate(
            { tuition: idUser },
            { $pull: { classes: idClass } },
            { new: true }
        );

        if (!updatedUser) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }

        res.status(200).json({ success: true, message: "Class deleted successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", error });
    }
};
