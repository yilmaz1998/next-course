import { Schema, model, models} from 'mongoose'

const PropertySchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
    },
    name: {
        type: String,
        required: true
    },
    yearsInOffice: {
        type: String,
        required: true
    },
    vicePresidents: [{
        type: String,
        required: true
    }],
    photo: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Property = models.Property || model('Property', PropertySchema)

export default Property