if (process.env.NODE_ENV === 'production') {
    module.exports = {
      mongoURI:
        "mongodb+srv://Express:express@express-kit-2krra.mongodb.net/test?retryWrites=true"
    };
} else {
    module.exports = {
      mongoURI:
        "mongodb+srv://Express:express@express-kit-2krra.mongodb.net/test?retryWrites=true"
    };
}
