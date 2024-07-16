import { Router } from 'express';
import { createUser, signinUser, getUserById, 
        deleteUser, deleteClassOfUser, updateUser,
        deleteClassOfArray } from '../controllers/user.cont';
const userRt = Router();
userRt.post('/signup', createUser);
userRt.post('/signin', signinUser)
userRt.get('/user/:tuition', getUserById);
userRt.put('/user/:tuition', updateUser);
userRt.delete('/user', deleteUser);
userRt.delete('/user/:tuition/class/:classID', deleteClassOfArray);
userRt.delete('/user/:idUser/class/:idClass', deleteClassOfUser);
export default userRt;