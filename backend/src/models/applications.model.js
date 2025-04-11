import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
    {
        company:{
            type: String,
            required: true,
            trim: true
        },
        role:{
            type: String,
            required: true,
            trim: true
        },
        status:{
            type: String,
            enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
            default: 'Applied'
        },
        date:{
            type: Date,
            required: true
        },
        link:{
           type: String,
            trim: true,
            validate: {
                validator: function(v) {
                    return /^https?:\/\/.+/.test(v);
                },
                message: props => `${props.value} is not a valid URL`
            }
        }
    },{
        timestamps: true
    }
)

const Application = mongoose.model('JobApplication', applicationSchema);
export default Application;