// Pruebas unitarias del módulo de citas
import request from 'supertest';
import app     from '../app.js';

describe('Módulo de Citas', () => {

    let idCitaCreada;
    let idCliente;
    let idBarbero;
    let idServicio;

    // Datos únicos para evitar colisiones entre ejecuciones y con otros módulos
    const sufijo         = Date.now();
    const correoCliente  = `citacliente${sufijo}@correo.com`;
    const correoBarbero  = `citabarbero${sufijo}@correo.com`;
    const nombreServicio = `Svc${sufijo}`;

    // Crear los recursos necesarios antes de las pruebas de citas
    beforeAll(async () => {
        // Crear cliente de prueba y verificar la respuesta
        const resCliente = await request(app)
            .post('/api/clientes')
            .send({
                nombreCliente:   'Cliente Cita Test',
                correoCliente,
                telefonoCliente: '3001234567'
            });
        expect(resCliente.statusCode).toBe(201);

        // Crear barbero de prueba y verificar la respuesta
        const resBarbero = await request(app)
            .post('/api/barberos')
            .send({
                nombreBarbero:       'Barbero Cita Test',
                correoBarbero,
                especialidadBarbero: 'Corte test'
            });
        expect(resBarbero.statusCode).toBe(201);

        // Crear servicio de prueba y verificar la respuesta
        const resServicio = await request(app)
            .post('/api/servicios')
            .send({
                nombreServicio,
                precioServicio:   20000,
                duracionServicio: 30
            });
        expect(resServicio.statusCode).toBe(201);

        // Obtener los IDs de los registros recién creados filtrando por sus datos únicos
        const [clientes, barberos, servicios] = await Promise.all([
            request(app).get('/api/clientes'),
            request(app).get('/api/barberos'),
            request(app).get('/api/servicios'),
        ]);

        const clienteCreado  = clientes.body.find((c) => c.correo_cliente === correoCliente);
        const barberoCreado  = barberos.body.find((b) => b.correo_barbero === correoBarbero);
        const servicioCreado = servicios.body.find((s) => s.nombre_servicio === nombreServicio);

        // Verificar que los registros creados fueron localizados
        expect(clienteCreado).toBeDefined();
        expect(barberoCreado).toBeDefined();
        expect(servicioCreado).toBeDefined();

        idCliente  = clienteCreado.id_cliente;
        idBarbero  = barberoCreado.id_barbero;
        idServicio = servicioCreado.id_servicio;
    });

    // Limpiar los registros de prueba y cerrar las conexiones de la base de datos
    afterAll(async () => {
        if (idCitaCreada) {
            await request(app).delete(`/api/citas/${idCitaCreada}`);
        }
        await request(app).delete(`/api/clientes/${idCliente}`);
        await request(app).delete(`/api/barberos/${idBarbero}`);
        await request(app).delete(`/api/servicios/${idServicio}`);

        const pool = (await import('../config/db.js')).default;
        await pool.end();
    });

    // Prueba 1: Crear cita
    test('POST /api/citas — debe crear una nueva cita', async () => {
        const response = await request(app)
            .post('/api/citas')
            .send({
                fechaCita:  '2026-12-01',
                horaCita:   '10:00',
                idCliente,
                idBarbero,
                idServicio
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.mensaje).toBe('Cita creada exitosamente');
    });

    // Prueba 2: Obtener todas las citas
    test('GET /api/citas — debe retornar array de citas', async () => {
        const response = await request(app).get('/api/citas');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);

        // Localizar la cita recién creada filtrando por sus datos únicos
        const citaCreada = response.body.find(
            (c) => c.id_cliente === idCliente
                && c.id_barbero === idBarbero
                && c.id_servicio === idServicio
        );
        if (citaCreada) {
            idCitaCreada = citaCreada.id_cita;
        }
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
    });
});