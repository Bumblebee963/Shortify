import express from 'express'
import urlRouter from './routes/url.routes.js'
import {URL} from './models/url.model.js';
import dotenv from 'dotenv'
dotenv.config();


import connectDB from './db/connect.js'
const app =express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/users',urlRouter);

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                }
            }
        }
    );

    if (!entry) {
        return res.status(404).json({ error: "Short URL not found" });
    }

    res.redirect(entry.redirectURL);
});





connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running at port : ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("MONGO DB connection failed !!!",err)
})

