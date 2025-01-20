import { Crypto  } from "../models/crypto.models.js";


const getDetails = async (req, res) => {
    try {

        const { name } = req.body;
        // console.log(name)
      
        
        // console.log(upper)
        const existed = await Crypto.findOne( { name: new RegExp(`^${name}$`, 'i') } );
         
        //  console.log(existed)
        if (!existed) {
            return res.status(404).json({ message: "Crypto not found!!"});
        }
        const response = await Crypto.findById(existed._id).select(
            "-name -_id -createdAt -updatedAt -__v"
         )
        
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export { getDetails };