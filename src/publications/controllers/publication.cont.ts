import { Request, Response } from 'express';
import { ClassModel } from '../../class/models/class.model';

export const postPublication = async (req: Request, res: Response) => {
    try{
        const clase = req.params.uniqueID;
        const post = req.body;
        const classInstance = await ClassModel.findOne({uniqueID: clase});
        if (!classInstance) {
            return res.status(404).json({ message: "Class not found" });
        }
        post.id = classInstance.generateUniqueID() + 'PostID';
        post.date = Date.now().toString();
        classInstance.post.push(post);
        classInstance.save();
        res.status(200).json({success: true});
    }catch{
        res.status(500).json({message: "Internal server error"})
    }
}

export const deletePub = async (req: Request, res: Response) => {
    try {
        const clase = req.params.uniqueID;
        const post = req.params.postID;

        const classInstance = await ClassModel.findOneAndUpdate(
            { uniqueID: clase },
            { $pull: { post: { id: post } } },
            { new: true }
        );

        if (!classInstance) {
            return res.status(404).json({ message: "Class not found" });
        }

        res.status(200).json({ message: "Post deleted successfully", classInstance });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};
