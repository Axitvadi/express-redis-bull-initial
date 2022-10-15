const Queue = require("bull");

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

//process the job
videoProcessingQueue.process("videoJob",1,async function(job,done){
    // our complex job operations
    try {
        //test
        const {jobData} = job.data;
        setTimeout(() => {
            console.log(`video processing job completed at ${new Date().toLocaleTimeString()}`);
            done();
        },30000);
    } catch (e) {
        console.log(e);
    }
});

emailProcessingQueue.process("emailJob",3,async function(job,done){
    // our complex job operations
    try {
        const {jobData} = job.data;
        //test
        setTimeout(() => {
            console.log(`email processing job completed at ${new Date().toLocaleTimeString()}`)
            done();
        },3000);
    } catch (e) {
        console.log(e);
    }
});