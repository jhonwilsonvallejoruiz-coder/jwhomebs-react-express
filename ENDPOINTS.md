# ENDPOINTS — JW Home Barber Studio API
**Base URL:** `http://localhost:5000`

---

## 🔐 Autenticación — `/api/auth`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/register` | Registrar nuevo usuario |
| POST | `/api/auth/login` | Iniciar sesión |
| GET | `/api/auth/usuarios` | Obtener todos los usuarios |

---

## 👤 Clientes — `/api/clientes`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/clientes` | Obtener todos los clientes |
| GET | `/api/clientes/:id` | Obtener cliente por ID |
| POST | `/api/clientes` | Crear nuevo cliente |
| PUT | `/api/clientes/:id` | Actualizar cliente |
| DELETE | `/api/clientes/:id` | Eliminar cliente |

---

## ✂ Barberos — `/api/barberos`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/barberos` | Obtener todos los barberos |
| GET | `/api/barberos/:id` | Obtener barbero por ID |
| POST | `/api/barberos` | Crear nuevo barbero |
| PUT | `/api/barberos/:id` | Actualizar barbero |
| DELETE | `/api/barberos/:id` | Eliminar barbero |

---

## 💈 Servicios — `/api/servicios`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/servicios` | Obtener todos los servicios |
| GET | `/api/servicios/:id` | Obtener servicio por ID |
| POST | `/api/servicios` | Crear nuevo servicio |
| PUT | `/api/servicios/:id` | Actualizar servicio |
| DELETE | `/api/servicios/:id` | Eliminar servicio |

---

## 📅 Citas — `/api/citas`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/citas` | Obtener todas las citas |
| GET | `/api/citas/:id` | Obtener cita por ID |
| GET | `/api/citas/cliente/:idCliente` | Obtener citas de un cliente |
| POST | `/api/citas` | Crear nueva cita |
| PUT | `/api/citas/:id/estado` | Actualizar estado de cita |
| PUT | `/api/citas/:id/reagendar` | Reagendar cita |
| DELETE | `/api/citas/:id` | Eliminar cita |

---

## 📋 Detalle de Endpoints

### POST `/api/auth/register`
**Body:**
```json
{
    "nombre":   "Jhon Wilson",
    "correo":   "jhon@correo.com",
    "password": "123456",
    "rol":      "cliente"
}
```
**Respuesta exitosa (201):**
```json
{
    "exito":   true,
    "mensaje": "Usuario registrado exitosamente."
}
```
**Respuesta error (400):**
```json
{
    "exito":   false,
    "mensaje": "El correo ya está registrado en el sistema."
}
```

---

### POST `/api/auth/login`
**Body:**
```json
{
    "correo":   "jhon@correo.com",
    "password": "123456"
}
```
**Respuesta exitosa (200):**
```json
{
    "exito":   true,
    "mensaje": "Inicio de sesión exitoso.",
    "token":   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "usuario": {
        "id":     1,
        "nombre": "Jhon Wilson",
        "correo": "jhon@correo.com",
        "rol":    "cliente"
    }
}
```
**Respuesta error (401):**
```json
{
    "exito":   false,
    "mensaje": "Correo o contraseña incorrectos."
}
```

---

### GET `/api/auth/usuarios`
**Respuesta exitosa (200):**
```json
[
    {
        "id_usuario":     1,
        "nombre":         "Jhon Wilson",
        "correo":         "jhon@correo.com",
        "rol":            "cliente",
        "fecha_registro": "2026-08-18T10:30:00.000Z"
    }
]
```

---

### POST `/api/clientes`
**Body:**
```json
{
    "nombreCliente":   "Carlos Pérez",
    "correoCliente":   "carlos@correo.com",
    "telefonoCliente": "3001234567"
}
```
**Respuesta exitosa (201):**
```json
{
    "mensaje": "Cliente creado exitosamente"
}
```

---

### PUT `/api/clientes/:id`
**Body:**
```json
{
    "nombreCliente":   "Carlos Pérez Actualizado",
    "correoCliente":   "carlos@correo.com",
    "telefonoCliente": "3009876543"
}
```
**Respuesta exitosa (200):**
```json
{
    "mensaje": "Cliente actualizado exitosamente"
}
```

---

### POST `/api/barberos`
**Body:**
```json
{
    "nombreBarbero":       "Luis Martínez",
    "correoBarbero":       "luis@correo.com",
    "especialidadBarbero": "Corte clásico y barba"
}
```
**Respuesta exitosa (201):**
```json
{
    "mensaje": "Barbero creado exitosamente"
}
```

---

### POST `/api/servicios`
**Body:**
```json
{
    "nombreServicio":   "Corte clásico",
    "precioServicio":   25000,
    "duracionServicio": 30
}
```
**Respuesta exitosa (201):**
```json
{
    "mensaje": "Servicio creado exitosamente"
}
```

---

### POST `/api/citas`
**Body:**
```json
{
    "fechaCita":  "2026-09-01",
    "horaCita":   "10:00",
    "idCliente":  1,
    "idBarbero":  1,
    "idServicio": 1
}
```
**Respuesta exitosa (201):**
```json
{
    "mensaje": "Cita creada exitosamente"
}
```

---

### PUT `/api/citas/:id/estado`
**Body:**
```json
{
    "estadoCita": "confirmada"
}
```
**Respuesta exitosa (200):**
```json
{
    "mensaje": "Estado de cita actualizado exitosamente"
}
```

---

### PUT `/api/citas/:id/reagendar`
**Body:**
```json
{
    "fechaCita": "2026-09-05",
    "horaCita":  "14:00"
}
```
**Respuesta exitosa (200):**
```json
{
    "mensaje": "Cita reagendada exitosamente"
}
```