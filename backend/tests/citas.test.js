// Pruebas unitarias del módulo de citas
import request from 'supertest';
import app     from '../app.js';
import pool    from '../config/db.js';

describe('Módulo de Citas', () => {

    let idCitaCreada;
    let idCliente;
    let idBarbero;
    let idServicio;

    // Crear datos necesarios antes de las pruebas de citas
    beforeAll(async () => {
        const sufijo = Date.now();

        // Crear cliente
        await request(app).post('/api/clientes').send({
            nombreCliente:   'CitaCliente',
            correoCliente:   `citacli${sufijo}@correo.com`,
            telefonoCliente: '3001234567'
        });

        // Crear barbero
        await request(app).post('/api/barberos').send({
            nombreBarbero:       'CitaBarbero',
            correoBarbero:       `citabar${sufijo}@correo.com`,
            especialidadBarbero: 'Corte test'
        });

        // Crear servicio — máximo 20 caracteres en nombre
        await request(app).post('/api/servicios').send({
            nombreServicio:   `Svc${sufijo}`.slice(0, 20),
            precioServicio:   20000,
            duracionServicio: 30
        });

        // Obtener los IDs filtrando por correo/nombre único
        const [clientes]  = await pool.query(
            'SELECT id_cliente FROM clientes WHERE correo_cliente = ?',
            [`citacli${sufijo}@correo.com`]
        );
        const [barberos]  = await pool.query(
            'SELECT id_barbero FROM barberos WHERE correo_barbero = ?',
            [`citabar${sufijo}@correo.com`]
        );
        const [servicios] = await pool.query(
            'SELECT id_servicio FROM servicios WHERE nombre_servicio = ?',
            [`Svc${sufijo}`.slice(0, 20)]
        );

        idCliente  = clientes[0]?.id_cliente;
        idBarbero  = barberos[0]?.id_barbero;
        idServicio = servicios[0]?.id_servicio;
    });

    afterAll(async () => {
        if (idCitaCreada) {
            await pool.query('DELETE FROM citas WHERE id_cita = ?', [idCitaCreada]);
        }
        if (idCliente)  await pool.query('DELETE FROM clientes  WHERE id_cliente  = ?', [idCliente]);
        if (idBarbero)  await pool.query('DELETE FROM barberos  WHERE id_barbero  = ?', [idBarbero]);
        if (idServicio) await pool.query('DELETE FROM servicios WHERE id_servicio = ?', [idServicio]);
        await pool.end();
    });

    // Prueba 1: Crear cita
    test('POST /api/citas — debe crear una nueva cita', async () => {
        expect(idCliente).toBeDefined();
        expect(idBarbero).toBeDefined();
        expect(idServicio).toBeDefined();

        const response = await request(app).post('/api/citas').send({
            fechaCita:  '2026-12-01',
            horaCita:   '10:00',
            idCliente,
            idBarbero,
            idServicio
        });
        expect(response.statusCode).toBe(201);
        expect(response.body.mensaje).toBe('Cita creada exitosamente');

        // Guardar el ID de la cita creada
        const [rows] = await pool.query(
            'SELECT id_cita FROM citas WHERE id_cliente = ? AND fecha_cita = ?',
            [idCliente, '2026-12-01']
        );
        idCitaCreada = rows[0]?.id_cita;
    });

    // Prueba 2: Obtener todas las citas
    test('GET /api/citas — debe retornar array de citas', async () => {
        const response = await request(app).get('/api/citas');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Prueba 3: Obtener cita por ID
    test('GET /api/citas/:id — debe retornar una cita por ID', async () => {
        if (!idCitaCreada) return;
        const response = await request(app).get(`/api/citas/${idCitaCreada}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.id_cita).toBe(idCitaCreada);
    });

    // Prueba 4: Actualizar estado de cita
    test('PUT /api/citas/:id/estado — debe actualizar el estado', async () => {
        if (!idCitaCreada) return;
        const response = await request(app)
            .put(`/api/citas/${idCitaCreada}/estado`)
            .send({ estadoCita: 'confirmada' });
        expect(response.statusCode).toBe(200);
        expect(response.body.mensaje).toBe('Estado de cita actualizado exitosamente');
    });

    // Prueba 5: Reagendar cita
    test('PUT /api/citas/:id/reagendar — debe reagendar la cita', async () => {
        if (!idCitaCreada) return;
        const response = await request(app)
            .put(`/api/citas/${idCitaCreada}/reagendar`)
            .send({ fechaCita: '2026-12-15', horaCita: '14:00' });
        expect(response.statusCode).toBe(200);
        expect(response.body.mensaje).toBe('Cita reagendada exitosamente');
    });

    // Prueba 6: Eliminar cita
    test('DELETE /api/citas/:id — debe eliminar la cita', async () => {
        if (!idCitaCreada) return;
        const response = await request(app).delete(`/api/citas/${idCitaCreada}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.mensaje).toBe('Cita eliminada exitosamente');
        idCitaCreada = null;
    });
});