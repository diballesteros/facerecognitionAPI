const Clarifai = require('clarifai');
//API key for Clarifai
const app = new Clarifai.App({
    apiKey: 'b0eba45ad8124cec86a3b34bef94a688'
});

//Clarifai Method to obtain coordinates of face
const handleAPICall = (req, res) => {
    app.models
        .predict(
            Clarifai.FACE_DETECT_MODEL,
            req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('Unable to work with API'))
}

// Receive ID from the request, use it to find respective user and increment the number of image entries
const handleImage = (req, res, db) => {

    const { id } = req.body;

    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('Unable to get entries'))

}

module.exports = {
    handleImage: handleImage,
    handleAPICall: handleAPICall
}