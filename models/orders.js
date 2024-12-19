const mongoose = require('mongoose');
const {Schema} =  mongoose;

const OrderSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    order_data:{
        type:Array,
        required:true,
       
    },
    isPreOrder:{
        type:Boolean,
        required:true,
        default:false
    },
    preOrderTime:{
        type:String,// Using string to store time in HH:MM format
        required: function () {
            return this.isPreOrder; // Only required if isPreOrder is true
        }
    }
})

module.exports = mongoose.model('orders', OrderSchema);