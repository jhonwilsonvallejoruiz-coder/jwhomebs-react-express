// Pruebas unitarias del módulo de barberos
import request from 'supertest';
import app     from '../app.js';

describe('Módulo de Barberos', () => {

    let idBarberoCreado;

    // Prueba 1: Crear barbero
    test('POST /api/barberos — debe crear un nuevo barbero', async () => {
        const response = await request(app)
            .post('/api/barberos')
            .send({
                nombreBarbero:       'Barbero Test',
                correoBarbero:       `barbero${Date.now()}@correo.com`,
                especialidadBarbero: 'Corte clásico'
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.mensaje).toBe('Barbero creado exitosamente');
    });

    // Prueba 2: Obtener todos los barberos
    test('GET /api/barberos — debe retornar array de barberos', async () => {
        const response = await request(app).get('/api/barberos');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);

        if (response.body.length > 0) {
            idBarberoCreado = response.body[response.body.length - 1].id_barbero;
        }
    });

    // Prueba 3: Obtener barbero por ID
    test('GET /api/barberos/:id — debe retornar un barbero por ID', async () => {
        if (!idBarberoCreado) return;
        const response = await request(app).get(`/api/barberos/${idBarberoCreado}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.id_barbero).toBe(idBarberoCreado);
    });

    // Prueba 4: Actualizar barbero
    test('PUT /api/barberos/:id — debe actualizar los datos del barbero', async () => {
        if (!idBarberoCreado) return;
        const response = await request(app)
            .put(`/api/barberos/${idBarberoCreado}`)
            .send({
                nombreBarbero:       'Barbero Actualizado',
                correoBarbero:       'barbero.actualizado@correo.com',
                especialidadBarbero: 'Diseño y degradado'
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.mensaje).toBe('Barbero actualizado exitosamente');
    });

    // Prueba 5: Eliminar barbero
    test('DELETE /api/barberos/:id — debe eliminar el barbero', async () => {
        if (!idBarberoCreado) return;
        const response = await request(app).delete(`/api/barberos/${idBarberoCreado}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.mensaje).toBe('Barbero eliminado exitosamente');
    });

    // Cerrar las conexiones de la base de datos para que Jest salga limpiamente
    afterAll(async () => {
        const pool = (await import('../config/db.js')).default;
        await pool.end();
    });
});