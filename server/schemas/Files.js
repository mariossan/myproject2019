const { Schema, model, Types } = requite("mongoose")

const FileSchema = new Schema({
    upload_id: {
        type: Types.ObjectId,
        ref: "Upload"
    },
    file_name: {
        type: String,
        required: true
    },
    file_size: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

const File      = model("File", FileSchema)
module.exports  = File