import axios from "axios";
import { Crypto  } from "../models/crypto.models.js";


const fetchData = async () => {
    try {
        const Api = "https://api.coincap.io/v2/assets"; 
        const response = await axios.get(Api);
        const data = response.data.data;  
        if (!data || !Array.isArray(data)){
            throw new Error("Invalid data format from API!!");
        }      
        
        const transformedData = data.map((crypto) => ({
            name: crypto.name.charAt(0).toLowerCase() + crypto.name.slice(1), 
            price_usd: crypto.priceUsd,
            market_cap_usd: crypto.marketCapUsd,
            change_24h: crypto.changePercent24Hr,
        }));
        await Crypto.insertMany(transformedData, { ordered: false });
        console.log("Data successfully stored in the database.");

        // for (const crypto of data) {
        //     try {
        //         await Crypto.findOneAndUpdate(
        //             { 
        //               name: new RegExp(`^${crypto.name}$`, 'i')
        //             }, 
        //             {
        //                 name: crypto.name.charAt(0).toLowerCase() + crypto.name.slice(1),
        //                 price_usd: crypto.priceUsd,
        //                 market_cap_usd: crypto.marketCapUsd,
        //                 change_24h: crypto.changePercent24Hr,
        //             },
        //             { 
        //                 upsert: true, 
        //                 new: true 
        //             } 
        //         );
            // }
            //  catch (err) {
            //     console.error(`Error saving ${crypto.name}:`, err.message);
            // }
        // }
        
    } catch (error) {
        console.error(error.message);
    }
 };

export default fetchData;