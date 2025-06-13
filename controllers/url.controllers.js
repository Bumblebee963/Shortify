import {nanoid} from 'nanoid'
import {URL} from '../models/url.model.js'
const generateNewShortURL=async(req,res)=>{
    const {redirectURL}=req.body;
    if(!redirectURL){
        return res
        .status(400)
        .json({error: 'url is required'})
    }
    const shortId=nanoid(8);
    await URL.create({
        shortId,
        redirectURL,
        visitHistory:[]
    })

    return res
    .status(201)
    .json({
        id: shortId
    })
}

const getAnalytics=async(req,res)=>{
    const shortId=req.params.shortId;
    const result=await URL.findOne({shortId});

    return res.json({
        totalClicks: result.visitHistory.length,
        analytics:result.visitHistory 
    }
    
)
}
export {generateNewShortURL,
        getAnalytics
    }