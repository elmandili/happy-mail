import User from '../model/userModel.js'

export const create = async (req,res) =>{
    try {
        if(!req.body){
            return res.status(400).json("body is empty the body looks like this " + req.body);
        }
        const userData= new User(req.body);
        
        const {email} = userData;
        const userExist = await User.findOne({email});

        if(userExist){
            console.log(userExist);
            return res.status(400).json({message: "User already exist."});
        }

        const savedUser = await userData.save();
        res.status(200).json({savedUser});

    } catch (error) {
        res.status(500).json({error: "Internal Server Error: " + error})
    }
}
export const fetch = async (req, res) =>{
    try {
        const users = await User.find();
        if(users.length === 0){
            return res.status(404).json({message: "User not Found."})
        }

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error: "internal server error!"})
    }
}

export const update = async (req,res)=>{
    try {
        const id = req.params.id;
        const userExist = await User.findOne({_id: id});
        if(!userExist){
            return res.status(404).json({message: "user not found"})
        }

        if(!req.body){
            return res.status(400).json({message: "request body is empty"});
        }

        const updateUser = await User.findByIdAndUpdate(id, req.body, {new: true});
        res.status(201).json(updateUser);
    }
    catch(error){
        res.status(500).json({error: "Internal Server Error"})
    }
}

export const deleteUser = async (req, res) =>{
    try {
        const id = req.params.id;
        const userExist = await User.findOne({_id:id});
        if(!userExist){
            return res.status(404).json({message: "User not found"});
        }
        await User.findByIdAndDelete(id);
        res.status(201).json({message: "User deteled Successfully."});
    } catch (error) {
        res.status(500).json({error: "Internal server erro"});
    }
}