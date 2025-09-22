import fetch from "node-fetch";
import 'dotenv/config';

export default async function handler(req, res){
    const ALPACA_KEY = process.env.ALPACA_KEY;
    const ALPACA_SECRETS = process.env.ALPACA_SECRETS;
    const ALPACA_URL = process.env.ALPACA_URL;

    try{
        const response = await fetch(ALPACA_URL, {
            headers: {
                "APCA-API-KEY-ID": ALPACA_KEY,
                "APCA-API-SECRET-KEY": ALPACA_SECRETS
                
            }
        });
        const data = await response.json();
        //res need to be there for vercel compatiblity for function exit
        return res.status(200).json({ status: "Success", equity: data.equity });
    }catch(err){
        console.log(err);
        //res compatibility
        return res.status(500).json({ status: "Error", error: err.message });
    }
}