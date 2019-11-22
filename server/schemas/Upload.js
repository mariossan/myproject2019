const { Schema, model, Types } = require('mongoose')

const UploadSchema = new Schema({
    title: {
        type: String,
        required: [true, "El título es obligatorio"]
    },
    recipients: {
        type: [],
        required: true
    },
    message: {
        type: String,
        required: [true, "El mensaje es obligatorio"]
    },
    file_to_download: {
        type: String,
        required: [true, "El archivo para descargar es mandatorio para antes de hacer cualquier cosa"]
    },
    final_size: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    time_to_dead: {
        type: Date,
        required: true
    },
    total_downloads: {
        type: Number,
        default: 0
    },
    user_id: { 
        type: Types.ObjectId, 
        ref: "User"
    }
})

const Upload    = model( "Upload", UploadSchema )
module.exports  = Upload