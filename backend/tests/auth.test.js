// Pruebas unitarias del módulo de autenticación
import request from 'supertest';
import app     from '../app.js';

describe('Módulo de Autenticación', () => {

    // Prueba 1: Registro exitoso
    test('POST /api/auth/register — debe registrar un usuario nuevo', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                nombre:   'Usuario Test',
                correo:   `test${Date.now()}@correo.com`,
                password: '123456',
                rol:      'cliente'
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.exito).toBe(true);
        expect(response.body.mensaje).toBe('Usuario registrado exitosamente.');
    });

    // Prueba 2: Registro con correo duplicado
    test('POST /api/auth/register — debe rechazar correo duplicado', async () => {
        const correo = `duplicado${Date.now()}@correo.com`;
        await request(app)
            .post('/api/auth/register')
            .send({ nombre: 'Test', correo, password: '123456', rol: 'cliente' });

        const response = await request(app)
            .post('/api/auth/register')
            .send({ nombre: 'Test 2', correo, password: '123456', rol: 'cliente' });

        expect(response.statusCode).toBe(400);
        expect(response.body.exito).toBe(false);
    });

    // Prueba 3: Login exitoso
    test('POST /api/auth/login — debe retornar token con credenciales válidas', async () => {
        const correo = `login${Date.now()}@correo.com`;
        await request(app)
            .post('/api/auth/register')
            .send({ nombre: 'Test Login', correo, password: '123456', rol: 'cliente' });

        const response = await request(app)
            .post('/api/auth/login')
            .send({ correo, password: '123456' });

        expect(response.statusCode).toBe(200);
        expect(response.body.exito).toBe(true);
        expect(response.body.token).toBeDefined();
        expect(response.body.usuario).toBeDefined();
    });

    // Prueba 4: Login con credenciales incorrectas
    test('POST /api/auth/login — debe rechazar credenciales incorrectas', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({ correo: 'noexiste@correo.com', password: 'wrongpass' });

        expect(response.statusCode).toBe(401);
        expect(response.body.exito).toBe(false);
    });

    // Prueba 5: Obtener usuarios
    test('GET /api/auth/usuarios — debe retornar array de usuarios', async () => {
        const response = await request(app).get('/api/auth/usuarios');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Cerrar las conexiones de la base de datos para que Jest salga limpiamente
    afterAll(async () => {
        const pool = (await import('../config/db.js')).default;
        await pool.end();
    });
});