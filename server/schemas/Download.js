const { Schema, model, Types } = require('mongoose')


const DownloadSchema = new Schema({
    upload_id: {
        type: Types.ObjectId,
        ref: "Upload"
    },
    user_ip: {
        type: String,
        required: true
    },
    download_at: {
        type: Date,
        default: Date.now
    }
})

const Download  = model( "Download", DownloadSchema )
module.exports  = Download