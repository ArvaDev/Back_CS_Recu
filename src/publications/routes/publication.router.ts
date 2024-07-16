import { Router } from "express";
import { postPublication, deletePub } from "../controllers/publication.cont";
const pubRt = Router();

pubRt.post('/classes/:uniqueID', postPublication);
pubRt.delete('/classes/:uniqueID/post/:postID', deletePub);

export default pubRt;