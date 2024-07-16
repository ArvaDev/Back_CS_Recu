import { Router } from "express";
import { createClass, deleteClass, 
        getClass, putClassUserID,
        getClassChat , getUserByClass,
        addWebHook} from "../controllers/class.cont";
const classRt = Router();
classRt.post('/classes', createClass);
classRt.delete('/classes/:uniqueID', deleteClass);
classRt.post('/classes/webhooks/:uniqueID', addWebHook);
classRt.get('/classes/:uniqueID', getClass);
classRt.get('/class/chat/:uniqueID', getClassChat);
classRt.get('/class/users/:uniqueID', getUserByClass);
classRt.put('/classes/:uniqueID', putClassUserID);
export default classRt;