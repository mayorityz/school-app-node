import mongoose from "mongoose";

const SectionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please provide the title for this section"],
            enum: {
                values: ["creche", "kindergarten", "nursery", "primary"],
                message: "{VALUE} is not a valid section"
            },
            trim: true,
            unique: true
        }
    }, { timestamps: true }
)

export default mongoose.model("Section", SectionSchema)