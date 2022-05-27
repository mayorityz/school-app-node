import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please provide session title"],
            trim: true,
            unique: true
        },
        daysOpened: {
            type: Number,
            default: 0
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
    { timestamps: true }
)

export default mongoose.model("Session", SessionSchema)