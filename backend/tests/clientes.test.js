// Pruebas unitarias del módulo de clientes
import request from 'supertest';
import app     from '../app.js';

describe('Módulo de Clientes', () => {

    let idClienteCreado;

    // Prueba 1: Crear cliente
    test('POST /api/clientes — debe crear un nuevo cliente', async () => {
        const response = await request(app)
            .post('/api/clientes')
            .send({
                nombreCliente:   'Cliente Test',
                correoCliente:   `cliente${Date.now()}@correo.com`,
                telefonoCliente: '3001234567'
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.mensaje).toBe('Cliente creado exitosamente');
    });

    // Prueba 2: Obtener todos los clientes
    test('GET /api/clientes — debe retornar array de clientes', async () => {
        const response = await request(app).get('/api/clientes');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);

        // Guardar el ID del último cliente para las pruebas siguientes
        if (response.body.length > 0) {
            idClienteCreado = response.body[response.body.length - 1].id_cliente;
        }
    });

    // Prueba 3: Obtener cliente por ID
    test('GET /api/clientes/:id — debe retornar un cliente por ID', async () => {
        if (!idClienteCreado) return;
        const response = await request(app).get(`/api/clientes/${idClienteCreado}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.id_cliente).toBe(idClienteCreado);
    });

    // Prueba 4: Actualizar cliente
    test('PUT /api/clientes/:id — debe actualizar los datos del cliente', async () => {
        if (!idClienteCreado) return;
        const response = await request(app)
            .put(`/api/clientes/${idClienteCreado}`)
            .send({
                nombreCliente:   'Cliente Actualizado',
                correoCliente:   'actualizado@correo.com',
                telefonoCliente: '3009876543'
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.mensaje).toBe('Cliente actualizado exitosamente');
    });

    // Prueba 5: Eliminar cliente
    test('DELETE /api/clientes/:id — debe eliminar el cliente', async () => {
        if (!idClienteCreado) return;
        const response = await request(app).delete(`/api/clientes/${idClienteCreado}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.mensaje).toBe('Cliente eliminado exitosamente');
    });

    // Cerrar las conexiones de la base de datos para que Jest salga limpiamente
    afterAll(async () => {
        const pool = (await import('../config/db.js')).default;
        await pool.end();
    });
});