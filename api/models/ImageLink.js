const mongoose = require('mongoose')


const imageLinkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    photos: [String],
    installation: String,
    docs: String
});

const ImageLinkModel = mongoose.model('ImageLink', imageLinkSchema);

module.exports = ImageLinkModel 