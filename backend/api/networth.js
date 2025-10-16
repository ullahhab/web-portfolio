import fetch from "node-fetch";
import 'dotenv/config';

export default async function handler(req, res){
    const ALPACA_KEY = process.env.ALPACA_KEY;
    const ALPACA_SECRETS = process.env.ALPACA_SECRET;
    const ALPACA_URL = process.env.ALPACA_URL;

    try{
        const response = await fetch(ALPACA_URL, {
            headers: {
                "APCA-API-KEY-ID": ALPACA_KEY,
                "APCA-API-SECRET-KEY": ALPACA_SECRETS
                
            }
        });
        console.log("key", ALPACA_KEY);
        console.log("secret", ALPACA_SECRETS);
        console.log("url", ALPACA_URL);
        const data = await response.json();
        console.log(data);
        //res need to be there for vercel compatiblity for function exit
        return res.status(200).json({ equity: data.equity });
    }catch(err){
        console.log(err);
        //res compatibility
        return res.status(500).json({ error: "Failed to fetch net worth" });
    }
}