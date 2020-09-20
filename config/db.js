if (process.env.NODE_ENV == "production") {
    module.exports = { mongoURI: "mongodb+srv://Vinizika231199:Vinizika231199475@cluster0-aun5t.mongodb.net/youtube?retryWrites=true&w=majority" }

} else {
    module.exports = { mongoURI: "mongodb://localhost/youtube" }
}