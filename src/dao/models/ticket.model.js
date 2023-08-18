import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"


const ticketCollection = 'tickets';

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
    },
    purchase_datetime: {
        type: Date,
        createdAt:true
 
    },
    amount: {
        type: Number,
    },
    purchaser: {
        type: String
    }
});

const ticketModel = mongoose.model(ticketCollection, ticketSchema);
export {ticketModel}