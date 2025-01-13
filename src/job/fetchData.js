import axios from "axios";
import { Crypto  } from "../models/crypto.models.js";


const fetchData = async () => {
    try {
        const Api = "https://api.coincap.io/v2/assets"; 
        const response = await axios.get(Api);
        const data = response.data.data;            
        for (const crypto of data) {
            try {
                await Crypto.findOneAndUpdate(
                    { 
                      name: crypto.name 
                    }, 
                    {
                        name: crypto.name,
                        price_usd: crypto.priceUsd,
                        market_cap_usd: crypto.marketCapUsd,
                        change_24h: crypto.changePercent24Hr,
                    },
                    { 
                        upsert: true, 
                        new: true 
                    } 
                );
            } catch (err) {
                console.error(`Error saving ${crypto.name}:`, err.message);
            }
        }
        
    } catch (error) {
        console.error(error.message);
    }
 };

export default fetchData;