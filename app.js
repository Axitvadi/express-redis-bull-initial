const express = require("express");
const app = express();
const Queue = require('bull');
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//queue init for queue management
const videoProcessingQueue = new Queue('videoProcessingQueue', {
    redis: {
        host: '127.0.0.1',
        port: 6379
    }
});

const emailProcessingQueue = new Queue('emailProcessingQueue', {
    redis: {
        host: '127.0.0.1',
        port: 6379
    }
});

//video processing job
app.post('/api/video-Processing', async (req, res) => {
    try {
        await videoProcessingQueue.add("videoJob", {jobData: req.body}, {
            attempts: 2
        });
        return res.status(200).send({success: true, message: "video Job added in queue !"})
    } catch (e) {
        return res.json({
            success: false,
            error: e
        });
    }
});

//email job
app.post('/api/email-Processing', async (req, res) => {
    try {
        await emailProcessingQueue.add("emailJob", {jobData: req.body}, {
            attempts: 2
        });
        return res.status(200).send({success: true, message: "email Job added in queue !"});
    } catch (e) {
        return res.json({
            success: false,
            error: e
        });
    }
});

app.listen(port, () => console.log('server successfully started at port 3000'));