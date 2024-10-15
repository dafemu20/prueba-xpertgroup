import 'reflect-metadata';
import application from './src/config/server';

const PORT = process.env.PORT ?? 3000;

application.instance.listen(PORT, () => {
    console.log('Servidor escuchando');
})