import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please provide session title"],
            trim: true,
            unique: true
        },
        status: {
            type: String,
            default: "active",
            enum: {
                values: ["active", "concluded"],
                message: "{VALUE} is not valid for status"
            }
        }
    },
    { timestamps: true, toJSON: {virtuals: true}, toObject: {virtuals: true} }
)

SessionSchema.virtual("terms", {
    ref: "Term",
    localField: "_id",
    foreignField: "session",
    justOne: false
})

export default mongoose.model("Session", SessionSchema)