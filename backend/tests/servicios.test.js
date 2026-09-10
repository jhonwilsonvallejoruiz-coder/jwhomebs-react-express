// Pruebas unitarias del módulo de servicios
import request from 'supertest';
import app     from '../app.js';

describe('Módulo de Servicios', () => {

    let idServicioCreado;

    // Prueba 1: Crear servicio
    test('POST /api/servicios — debe crear un nuevo servicio', async () => {
        const response = await request(app)
            .post('/api/servicios')
            .send({
                nombreServicio:   'Servicio Test',
                precioServicio:   25000,
                duracionServicio: 30
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.mensaje).toBe('Servicio creado exitosamente');
    });

    // Prueba 2: Obtener todos los servicios
    test('GET /api/servicios — debe retornar array de servicios', async () => {
        const response = await request(app).get('/api/servicios');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);

        if (response.body.length > 0) {
            idServicioCreado = response.body[response.body.length - 1].id_servicio;
        }
    });

    // Prueba 3: Obtener servicio por ID
    test('GET /api/servicios/:id — debe retornar un servicio por ID', async () => {
        if (!idServicioCreado) return;
        const response = await request(app).get(`/api/servicios/${idServicioCreado}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.id_servicio).toBe(idServicioCreado);
    });

    // Prueba 4: Actualizar servicio
    test('PUT /api/servicios/:id — debe actualizar los datos del servicio', async () => {
        if (!idServicioCreado) return;
        const response = await request(app)
            .put(`/api/servicios/${idServicioCreado}`)
            .send({
                nombreServicio:   'Servicio Actualizado',
                precioServicio:   30000,
                duracionServicio: 45
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.mensaje).toBe('Servicio actualizado exitosamente');
    });

    // Prueba 5: Eliminar servicio
    test('DELETE /api/servicios/:id — debe eliminar el servicio', async () => {
        if (!idServicioCreado) return;
        const response = await request(app).delete(`/api/servicios/${idServicioCreado}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.mensaje).toBe('Servicio eliminado exitosamente');
    });

    // Cerrar las conexiones de la base de datos para que Jest salga limpiamente
    afterAll(async () => {
        const pool = (await import('../config/db.js')).default;
        await pool.end();
    });
});