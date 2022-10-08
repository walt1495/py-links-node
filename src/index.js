const express = require('express');
const morgan = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

//INICIAR VARIBABLES
const app = express();

//CONFIGURACIONES
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views')); //CONFIGURAMOS DONDE VA A ESTAR ALMACENADAS LAS VISTAS
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));

app.set('view engine', '.hbs');

//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//VARIABLES GLOBALES

//RUTAS
app.use(require('./routes'));
// app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));
//PUBLIC
app.use(express.static(path.join(__dirname, 'public')))

//INICIAR SERVIDOR

app.listen(app.get('port'), () => console.log(`Server ON port ${app.get('port')}`));