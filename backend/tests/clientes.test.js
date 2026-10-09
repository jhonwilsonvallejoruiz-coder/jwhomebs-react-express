// Pruebas unitarias del módulo de clientes
import request from 'supertest';
import app     from '../app.js';
import pool    from '../config/db.js';

describe('Módulo de Clientes', () => {

    let idClienteCreado;
    const sufijo = Date.now();

    // Prueba 1: Crear cliente
    test('POST /api/clientes — debe crear un nuevo cliente', async () => {
        const response = await request(app)
            .post('/api/clientes')
            .send({
                nombreCliente:   'Cliente Test',
                correoCliente:   `cliente${sufijo}@correo.com`,
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

        // Obtener el ID del cliente creado por correo único
        const [rows] = await pool.query(
            'SELECT id_cliente FROM clientes WHERE correo_cliente = ?',
            [`cliente${sufijo}@correo.com`]
        );
        idClienteCreado = rows[0]?.id_cliente;
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
                correoCliente:   `cliente${sufijo}@correo.com`,
                telefonoCliente: '3009876543'
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.mensaje).toBe('Cliente actualizado exitosamente');
    });

    // Prueba 5: Eliminar cliente
    test('DELETE /api/clientes/:id — debe eliminar el cliente', async () => {
        if (!idClienteCreado) return;

        // Eliminar primero las citas asociadas para evitar error de FK
        await pool.query(
            'DELETE FROM citas WHERE id_cliente = ?',
            [idClienteCreado]
        );

        const response = await request(app).delete(`/api/clientes/${idClienteCreado}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.mensaje).toBe('Cliente eliminado exitosamente');
    });

    afterAll(async () => {
        await pool.end();
    });
});