const express = require('express');
const app = express();
const db = require('./src/models');
const uploadCon = require('./src/controllers/uploadCon');
const upload = require('./src/middleware/upload');
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const c = require('os')

const steram = require('./src/routes/stream');
const filter = require('./src/routes/sorting');
const userRoutes = require('./src/routes/userRoutes');
const home = require('./src/routes/home');
const imageSorting = require('./src/routes/imageSorting') 
const imageView = require('./src/routes/imageView')
const recoverData = require('./src/routes/recoverData')
const videoPoster = require('./src/routes/videoPoster')
const raspi_send = require('./src/routes/senddataraspi')
var cors = require('cors')

global.__basedir = __dirname

app.set('views', path.join(__basedir + '/src/', 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.post("/upload-config", uploadCon.uploadConfig);
app.post("/api/upload", upload.single('file'), uploadCon.uploadFiles);
app.post("/api/uploadimg", upload.single('file'), uploadCon.uploadImgFiles);
app.use("/api/stream", steram);
app.use("/api/display", imageView);
app.use("/api", filter);
app.use("/api", imageSorting);
app.use("/api", userRoutes);
app.use("/api", recoverData);
app.use("/api", videoPoster);
app.use("/", home);
app.use("/api", raspi_send)
app.use('/resources/upload/img', express.static( __basedir + "/resources/upload/img" ));
// app.use('show/image', express.static("../resources/upload/img" ));
const port = process.env.PORT || 3001;

db.sequelize.sync();

app.listen(port, () => {
    console.log("Express server listening on port %d in %s mode", port, app.settings.env);
});