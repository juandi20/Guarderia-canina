CREATE DATABASE guarderia;
USE guarderia;

-- Tabla cliente
CREATE TABLE cliente (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(55) NOT NULL,
    documento BIGINT,
    ciudad VARCHAR(50),
    direccion VARCHAR(50),
    celular VARCHAR(20),
    correo_electronico VARCHAR(100) UNIQUE,
    contraseña VARCHAR(255) -- Ampliado para mayor seguridad
);

-- indice tabla cliente --
CREATE INDEX idx_cliente_documento ON cliente (documento); 
show index from cliente;

-- Tabla mascotas
CREATE TABLE mascotas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(40) NOT NULL,
    raza VARCHAR(30),
    edad INT,
    genero VARCHAR(20),
    peso INT, 
    esterilizacion BOOLEAN,
    reactivo BOOLEAN,
    vacunas BOOLEAN,
    alergias VARCHAR(55) NOT NULL,
    tipo_alergias VARCHAR(55) NULL,
    tipo_medicamento VARCHAR(55) NOT NULL,
    tipo_alimentos VARCHAR(55) NOT NULL,
    veces_alimento INT,
    cliente_id BIGINT,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id)
);

-- Indices tabla mascotas --
CREATE INDEX idx_mascotas_cliente_id ON mascotas (cliente_id);
show index from mascotas;


-- Tabla empleados
CREATE TABLE empleados (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    documento INT NOT NULL,
    celular VARCHAR(20),
    correo_electronico VARCHAR(100) UNIQUE,
    contraseña VARCHAR(255) -- Ampliado para mayor seguridad
);
CREATE INDEX idx_empleados_documento ON empleados (documento);
show index from empleados;

-- Tabla reserva
CREATE TABLE reserva (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    fecha_entrada DATETIME NOT NULL,
    fecha_salida DATETIME NOT NULL,
    hora TIME NOT NULL,
    cliente_id BIGINT,
    empleado_id BIGINT NULL, -- Empleado responsable de la reserva
    tipo_acomodacion ENUM('Estandar', 'Suite', 'Grande') NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id),
    FOREIGN KEY (empleado_id) REFERENCES empleados(id) -- Relación con empleado
);

-- Indices para la tabla reserva --
CREATE INDEX idx_reserva_fecha_entrada ON reserva (fecha_entrada);
CREATE INDEX idx_reserva_fecha_salida ON reserva (fecha_salida);
show index from reserva;

-- Tabla check-in
CREATE TABLE check_in (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    fecha DATETIME NOT NULL,
    documento BIGINT,
    reserva_id BIGINT,
    empleado_id BIGINT NULL, -- Empleado que realiza el check-in
    FOREIGN KEY (reserva_id) REFERENCES reserva(id),
    FOREIGN KEY (empleado_id) REFERENCES empleados(id) -- Relación con empleado
);

-- Indices para la tabla check_in
CREATE INDEX idx_check_in_documento ON check_in (documento);
show index from check_in;

-- Tabla check-out
CREATE TABLE check_out (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    fecha DATETIME NOT NULL,
    documento BIGINT,
    reserva_id BIGINT,
    check_in_id BIGINT, -- Relación con check-in
    empleado_id BIGINT NULL, -- Empleado que realiza el check-out
    FOREIGN KEY (reserva_id) REFERENCES reserva(id),
    FOREIGN KEY (check_in_id) REFERENCES check_in(id), -- Relación con check-in
    FOREIGN KEY (empleado_id) REFERENCES empleados(id) -- Relación con empleado
);

-- Datos de las tablas --

INSERT INTO cliente (nombre, documento, ciudad, direccion, celular, correo_electronico, contraseña) VALUES
('Carlos Pérez', 123456789, 'Madrid', 'Calle Falsa 123', '612345678', 'carlos.perez@email.com', 'password123'),
('Ana Gómez', 987654321, 'Barcelona', 'Avenida Diagonal 456', '633456789', 'ana.gomez@email.com', 'password456'),
('Luis Martínez', 112233445, 'Sevilla', 'Calle Real 789', '644567890', 'luis.martinez@email.com', 'password789'),
('María Fernández', 223344556, 'Valencia', 'Plaza Mayor 101', '655678901', 'maria.fernandez@email.com', 'password321'),
('José Rodríguez', 334455667, 'Madrid', 'Calle Libertad 202', '666789012', 'jose.rodriguez@email.com', 'password654'),
('Sofía López', 445566778, 'Bilbao', 'Avenida del Norte 303', '677890123', 'sofia.lopez@email.com', 'password987'),
('David González', 556677889, 'Granada', 'Calle Gran Vía 404', '688901234', 'david.gonzalez@email.com', 'password852'),
('Paula Sánchez', 667788990, 'Málaga', 'Calle Sol 505', '699012345', 'paula.sanchez@email.com', 'password753'),
('Antonio Díaz', 778899001, 'Zaragoza', 'Calle del Pilar 606', '710123456', 'antonio.diaz@email.com', 'password159'),
('Carmen Martínez', 889900112, 'Murcia', 'Avenida de la Reina 707', '721234567', 'carmen.martinez@email.com', 'password951'),
('Pedro Romero', 990011223, 'Alicante', 'Calle del Mar 808', '732345678', 'pedro.romero@email.com', 'password741'),
('Beatriz Jiménez', 101112334, 'Córdoba', 'Avenida de los Olivos 909', '743456789', 'beatriz.jimenez@email.com', 'password369'),
('Javier Pérez', 112233445, 'Pamplona', 'Calle de Navarra 100', '754567890', 'javier.perez@email.com', 'password258'),
('Lucía García', 223344556, 'Vigo', 'Calle del Lago 200', '765678901', 'lucia.garcia@email.com', 'password147'),
('Miguel López', 334455667, 'Santander', 'Avenida de Cantabria 300', '776789012', 'miguel.lopez@email.com', 'password963'),
('Julia Fernández', 445566778, 'León', 'Calle del Sol 400', '787890123', 'julia.fernandez@email.com', 'password852'),
('Ricardo Martín', 556677889, 'Oviedo', 'Calle del Arco 500', '798901234', 'ricardo.martin@email.com', 'password741'),
('Verónica Sánchez', 667788990, 'Gijón', 'Calle de la Paz 600', '809012345', 'veronica.sanchez@email.com', 'password258'),
('Francisco Ruiz', 778899001, 'Burgos', 'Avenida Castilla 700', '820123456', 'francisco.ruiz@email.com', 'password369'),
('Lola Castro', 889900112, 'Huelva', 'Calle de la Luna 800', '831234567', 'lola.castro@email.com', 'password951');

INSERT INTO mascotas (nombre, raza, edad, genero, peso, esterilizacion, reactivo, vacunas, alergias, tipo_alergias, tipo_medicamento, tipo_alimentos, veces_alimento, cliente_id)
VALUES
('Rocky', 'Pastor Alemán', 5, 'Macho', 30, TRUE, FALSE, TRUE, 'Polvo', 'Aire', 'Antihistamínico', 'Croquetas', 2, 1),
('Bella', 'Labrador', 3, 'Hembra', 25, TRUE, TRUE, TRUE, 'Granos', 'Alimento', 'Antialérgico', 'Carne', 3, 2),
('Luna', 'Bulldog Francés', 4, 'Hembra', 12, TRUE, TRUE, TRUE, 'Hierba', 'Pólen', 'Antibiótico', 'Comida húmeda', 2, 3),
('Max', 'Golden Retriever', 6, 'Macho', 35, TRUE, FALSE, TRUE, 'Polvo', 'Alimentos', 'Alergias alimentarias', 'Croquetas', 3, 4),
('Rex', 'Chihuahua', 2, 'Macho', 5, FALSE, FALSE, TRUE, 'Frutas', 'Pesticidas', 'Antiinflamatorio', 'Comida seca', 2, 5),
('Cleo', 'Persa', 4, 'Hembra', 8, TRUE, FALSE, TRUE, 'Plantas', 'Hormonas', 'Antiparasitario', 'Pescado', 3, 6),
('Tiger', 'Siamés', 5, 'Macho', 6, TRUE, TRUE, TRUE, 'Alergias alimenticias', 'Insectos', 'Antibiótico', 'Comida seca', 2, 7),
('Rocky', 'Pitbull', 3, 'Macho', 28, FALSE, TRUE, TRUE, 'Polvo', 'Aire', 'Antiácido', 'Carne', 4, 8),
('Lola', 'Cocker Spaniel', 4, 'Hembra', 10, TRUE, FALSE, TRUE, 'Granos', 'Cereales', 'Antihistamínico', 'Croquetas', 3, 9),
('Duke', 'Rottweiler', 6, 'Macho', 40, TRUE, FALSE, TRUE, 'Pólen', 'Alergia alimentaria', 'Antifúngico', 'Pescado', 3, 10),
('Chester', 'Dálmata', 5, 'Macho', 23, TRUE, TRUE, TRUE, 'Humo', 'Alimento', 'Antiinflamatorio', 'Comida húmeda', 2, 11),
('Nala', 'Buldog', 2, 'Hembra', 15, FALSE, TRUE, TRUE, 'Plantas', 'Químicos', 'Antibiótico', 'Carne', 4, 12),
('Toby', 'Beagle', 3, 'Macho', 20, TRUE, TRUE, TRUE, 'Pólen', 'Alimentos', 'Alergias estacionales', 'Croquetas', 2, 13),
('Charlie', 'Cocker', 7, 'Macho', 22, TRUE, FALSE, TRUE, 'Frutas', 'Plantas', 'Antihistamínico', 'Comida seca', 3, 14),
('Sasha', 'Poodle', 4, 'Hembra', 10, TRUE, FALSE, TRUE, 'Frutos secos', 'Náuseas', 'Antiácido', 'Pescado', 3, 15),
('Rex', 'Terrier', 6, 'Macho', 11, FALSE, FALSE, TRUE, 'Granos', 'Alimentos', 'Antialérgico', 'Carne', 4, 16),
('Mia', 'Shih Tzu', 4, 'Hembra', 7, TRUE, TRUE, TRUE, 'Hierba', 'Parásitos', 'Antibiótico', 'Comida húmeda', 2, 17),
('Bobby', 'Boxer', 5, 'Macho', 25, TRUE, FALSE, TRUE, 'Pólen', 'Alimentos', 'Alergias alimenticias', 'Croquetas', 4, 18),
('Nina', 'Chihuahua', 3, 'Hembra', 4, TRUE, TRUE, TRUE, 'Frutos secos', 'Insectos', 'Antiinflamatorio', 'Carne', 3, 19),
('Oscar', 'Rottweiler', 6, 'Macho', 30, TRUE, FALSE, TRUE, 'Granos', 'Cereales', 'Antihistamínico', 'Pescado', 2, 20);

INSERT INTO empleados (nombre, documento, celular, correo_electronico, contraseña)
VALUES
('Pedro García', 123456, '610123456', 'pedro.garcia@empresa.com', 'emp123'),
('Ana Martín', 234567, '611234567', 'ana.martin@empresa.com', 'emp456'),
('Juan López', 345678, '612345678', 'juan.lopez@empresa.com', 'emp789'),
('Lucía Rodríguez', 456789, '613456789', 'lucia.rodriguez@empresa.com', 'emp321'),
('Carlos Sánchez', 567890, '614567890', 'carlos.sanchez@empresa.com', 'emp654'),
('Sofía Pérez', 678901, '615678901', 'sofia.perez@empresa.com', 'emp987'),
('José González', 789012, '616789012', 'jose.gonzalez@empresa.com', 'emp852'),
('David Díaz', 890123, '617890123', 'david.diaz@empresa.com', 'emp753'),
('María Fernández', 901234, '618901234', 'maria.fernandez@empresa.com', 'emp159'),
('Antonio López', 123459, '619012345', 'antonio.lopez@empresa.com', 'emp951'),
('Beatriz Romero', 234560, '620123456', 'beatriz.romero@empresa.com', 'emp741'),
('Javier Ruiz', 345671, '621234567', 'javier.ruiz@empresa.com', 'emp258'),
('Verónica Sánchez', 456782, '622345678', 'veronica.sanchez@empresa.com', 'emp369'),
('Ricardo González', 567893, '623456789', 'ricardo.gonzalez@empresa.com', 'emp963'),
('Isabel Díaz', 678904, '624567890', 'isabel.diaz@empresa.com', 'emp852'),
('Laura Martínez', 789015, '625678901', 'laura.martinez@empresa.com', 'emp741'),
('Sergio Fernández', 890126, '626789012', 'sergio.fernandez@empresa.com', 'emp258'),
('Carlos Jiménez', 901237, '627890123', 'carlos.jimenez@empresa.com', 'emp369'),
('Marta Romero', 123470, '628901234', 'marta.romero@empresa.com', 'emp951'),
('Tomás Pérez', 234581, '629012345', 'tomas.perez@empresa.com', 'emp741');

INSERT INTO reserva (fecha_entrada, fecha_salida, hora, cliente_id, empleado_id, tipo_acomodacion) 
VALUES
('2024-12-01 10:00:00', '2024-12-07 10:00:00', '12:00', 1, 1, 'Estandar'),
('2024-12-02 11:00:00', '2024-12-05 10:00:00', '14:00', 2, 2, 'Suite'),
('2024-12-03 09:00:00', '2024-12-08 12:00:00', '10:00', 3, 3, 'Grande'),
('2024-12-04 13:00:00', '2024-12-06 10:00:00', '15:00', 4, 4, 'Estandar'),
('2024-12-05 14:00:00', '2024-12-09 09:00:00', '16:00', 5, 5, 'Suite'),
('2024-12-06 11:00:00', '2024-12-12 11:00:00', '13:00', 6, 6, 'Grande'),
('2024-12-07 08:00:00', '2024-12-10 09:00:00', '14:00', 7, 7, 'Estandar'),
('2024-12-08 12:00:00', '2024-12-12 15:00:00', '10:00', 8, 8, 'Suite'),
('2024-12-09 09:00:00', '2024-12-14 10:00:00', '11:00', 9, 9, 'Grande'),
('2024-12-10 10:00:00', '2024-12-13 11:00:00', '12:00', 10, 10, 'Estandar'),
('2024-12-11 14:00:00', '2024-12-14 12:00:00', '13:00', 11, 11, 'Suite'),
('2024-12-12 10:00:00', '2024-12-15 14:00:00', '15:00', 12, 12, 'Grande'),
('2024-12-13 11:00:00', '2024-12-16 13:00:00', '16:00', 13, 13, 'Estandar'),
('2024-12-14 14:00:00', '2024-12-17 12:00:00', '17:00', 14, 14, 'Suite'),
('2024-12-15 09:00:00', '2024-12-20 10:00:00', '12:00', 15, 15, 'Grande'),
('2024-12-16 11:00:00', '2024-12-18 09:00:00', '13:00', 16, 16, 'Estandar'),
('2024-12-17 10:00:00', '2024-12-19 14:00:00', '15:00', 17, 17, 'Suite'),
('2024-12-18 08:00:00', '2024-12-22 10:00:00', '16:00', 18, 18, 'Grande'),
('2024-12-19 14:00:00', '2024-12-21 12:00:00', '12:00', 19, 19, 'Estandar'),
('2024-12-20 11:00:00', '2024-12-23 09:00:00', '14:00', 20, 20, 'Suite');

INSERT INTO check_in (fecha, documento, reserva_id, empleado_id)
VALUES
('2024-12-01 10:30:00', 123456, 1, 1),
('2024-12-02 11:15:00', 987654, 2, 2),
('2024-12-03 09:20:00', 112233, 3, 3),
('2024-12-04 13:10:00', 223344, 4, 4),
('2024-12-05 14:05:00', 334455, 5, 5),
('2024-12-06 11:30:00', 445566, 6, 6),
('2024-12-07 08:15:00', 556677, 7, 7),
('2024-12-08 12:05:00', 667788, 8, 8),
('2024-12-09 09:10:00', 778899, 9, 9),
('2024-12-10 10:45:00', 889900, 10, 10),
('2024-12-11 14:20:00', 990011, 11, 11),
('2024-12-12 10:40:00', 101112, 12, 12),
('2024-12-13 11:25:00', 112233, 13, 13),
('2024-12-14 14:35:00', 223344, 14, 14),
('2024-12-15 09:50:00', 334455, 15, 15),
('2024-12-16 11:10:00', 445566, 16, 16),
('2024-12-17 10:05:00', 556677, 17, 17),
('2024-12-18 08:25:00', 667788, 18, 18),
('2024-12-19 14:30:00', 778899, 19, 19),
('2024-12-20 11:15:00', 889900, 20, 20);

INSERT INTO check_out (fecha, documento, reserva_id, check_in_id, empleado_id)
VALUES
('2024-12-07 10:10:00', 123456, 1, 1, 2),
('2024-12-05 10:30:00', 987654, 2, 2, 3),
('2024-12-08 12:15:00', 112233, 3, 3, 4),
('2024-12-06 10:20:00', 223344, 4, 4, 5),
('2024-12-09 09:50:00', 334455, 5, 5, 6),
('2024-12-12 11:20:00', 445566, 6, 6, 7),
('2024-12-10 09:40:00', 556677, 7, 7, 8),
('2024-12-12 15:20:00', 667788, 8, 8, 9),
('2024-12-14 10:10:00', 778899, 9, 9, 10),
('2024-12-13 11:50:00', 889900, 10, 10, 11),
('2024-12-14 12:25:00', 990011, 11, 11, 12),
('2024-12-15 14:50:00', 101112, 12, 12, 13),
('2024-12-16 13:10:00', 112233, 13, 13, 14),
('2024-12-17 12:30:00', 223344, 14, 14, 15),
('2024-12-20 10:20:00', 334455, 15, 15, 16),
('2024-12-18 09:40:00', 445566, 16, 16, 17),
('2024-12-19 14:45:00', 556677, 17, 17, 18),
('2024-12-22 10:15:00', 667788, 18, 18, 19),
('2024-12-21 12:20:00', 778899, 19, 19, 20),
('2024-12-23 09:40:00', 889900, 20, 20, 1);

-- Indices para la tabla check_out
CREATE INDEX idx_check_out_documento ON check_out (documento);
show index from check_out;

-- Diccionario de datos --

-- Diccionario de la tabla cliente --
describe cliente;

-- Diccionario de la tabla mascotas --
describe  mascotas;

-- Diccionario de la tabla empleados --
describe empleados;

-- Diccionario de la tabla reserva --
describe reserva;

-- Diccionario de la tabla check_in --
describe check_in;

-- Diccionario de la tabla check_out --
describe check_out;


-- CONSULTAS DEL PROYECTO --

-- todos los clientes registrados --
SELECT * FROM cliente;

-- cliente por nombre o documento --
SELECT * FROM cliente WHERE nombre LIKE '%Carlos Pérez%' OR documento = 12345678;

-- todas las mascotas de un cliente específico --
SELECT * FROM mascotas WHERE cliente_id = 1;

-- mascotas con alergias específicas --
-- Consulta para obtener el nombre de la mascota y sus alergias dentro de un rango de fechas
SELECT 
    mascotas.nombre AS nombre_mascota,
    mascotas.alergias
FROM 
    mascotas
JOIN 
    cliente 
ON 
    mascotas.cliente_id = cliente.id
JOIN 
    reserva
ON 
    cliente.id = reserva.cliente_id
WHERE 
    reserva.fecha_entrada >= '2024-12-19' 
    AND reserva.fecha_salida <= '2024-12-23';


-- CONSULTA DE LAS 10 RESERVAS MAS RECIENTES DE CLIENTES -- 
SELECT
    reserva.id AS id_de_reserva,
    cliente.nombre AS nombre_cliente,
    reserva.fecha_entrada,
    reserva.fecha_salida,
    reserva.hora,
    empleados.nombre AS nombre_empleado,
    reserva.tipo_acomodacion
FROM
    reserva 
JOIN cliente ON reserva.cliente_id = cliente.id
LEFT JOIN empleados ON reserva.empleado_id = empleados.id
ORDER BY reserva.fecha_entrada DESC
LIMIT 10;

-- Consulta por clientes de una ciudad en especifico --
SELECT * FROM cliente WHERE ciudad = 'Madrid';

-- Consultar empleados por nombre -- 
SELECT * FROM empleados WHERE nombre = 'Pedro García';

-- Consultar por tipo de acomodacion --
SELECT r.tipo_acomodacion, m.nombre AS nombre_mascota
FROM reserva r
JOIN cliente c ON r.cliente_id = c.id
JOIN mascotas m ON m.cliente_id = c.id
ORDER BY r.fecha_entrada DESC
LIMIT 4;


-- Consultar mascotas por edad -- 
SELECT m.nombre AS nombre_mascota, m.edad
FROM reserva r
JOIN mascotas m ON r.cliente_id = m.cliente_id
ORDER BY r.fecha_entrada DESC
LIMIT 6;





-- CONSULTAS COMPLEJAS CON JOIN --
-- informe de reservas con detalles del cliente y mascota --
SELECT 
    reserva.id AS reserva_id, 
    reserva.fecha_entrada, 
    reserva.fecha_salida, 
    cliente.nombre AS cliente_nombre, 
    mascotas.nombre AS mascota_nombre
FROM reserva 
JOIN cliente ON reserva.cliente_id = cliente.id
JOIN mascotas ON mascotas.cliente_id = cliente.id
WHERE reserva.fecha_entrada BETWEEN '2024-12-01 10:00:00' AND '2024-12-11 10:00:00';



-- RESERVAS CON SALIDAS PROXIMAS --
SELECT 
    r.id AS reserva_id,
    r.fecha_entrada,
    r.fecha_salida,
    r.tipo_acomodacion,
    c.nombre AS cliente_nombre,
    e.nombre AS empleado_responsable
FROM 
    reserva r
JOIN 
    cliente c ON r.cliente_id = c.id
LEFT JOIN 
    empleados e ON r.empleado_id = e.id
WHERE 
    r.fecha_salida BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 7 DAY)
ORDER BY 
    r.fecha_salida ASC;



-- Consulta de reservas con detalles del cliente y del empleado que atendió la reserva --
SELECT 
    reserva.id AS reserva_id,
    reserva.fecha_entrada,
    reserva.fecha_salida,
    reserva.tipo_acomodacion,
    cliente.nombre AS cliente_nombre,
    cliente.celular AS cliente_celular,
    cliente.correo_electronico AS cliente_email,
    empleados.nombre AS nombre_empleado,
    empleados.correo_electronico AS empleado_email
FROM 
    reserva 
JOIN 
    cliente ON reserva.cliente_id = cliente.id
LEFT JOIN 
    empleados ON reserva.empleado_id = empleados.id
ORDER BY 
    reserva.fecha_salida DESC
LIMIT 5;


-- Consulta para listar todas las mascotas junto con el nombre del cliente al que pertenecen --
SELECT mascotas.nombre AS mascota_nombre, mascotas.raza, mascotas.edad, cliente.nombre AS cliente_nombre, cliente.ciudad, cliente.celular
FROM mascotas
INNER JOIN cliente ON mascotas.cliente_id = cliente.id;


-- Consulta de check-in con detalles del cliente y su reserva --
SELECT check_in.id AS check_in_id, check_in.fecha AS check_in_fecha, cliente.nombre AS cliente_nombre, reserva.fecha_entrada, reserva.fecha_salida, reserva.tipo_acomodacion
FROM check_in
INNER JOIN reserva ON check_in.reserva_id = reserva.id
INNER JOIN cliente ON reserva.cliente_id = cliente.id;

-- Consulta del total de check-ins realizados por empleado --
SELECT 
    empleados.nombre AS empleado_nombre,
    COUNT(check_in.id) AS total_check_ins
FROM empleados
LEFT JOIN 
    check_in ON empleados.id = check_in.empleado_id
GROUP BY empleados.id;

-- Consultar cuántas reservas ha realizado cada cliente --
SELECT 
    cliente.nombre AS cliente_nombre,
    COUNT(reserva.id) AS total_reservas
FROM cliente
JOIN reserva ON cliente.id = reserva.cliente_id
GROUP BY cliente.id;


-- vsitas del proyecto--

-- Muestra el nombre y documento del cliente --
create view InfoBasicaCliente as
select nombre, documento 
from cliente;

select * from InfoBasicaCliente;


-- Muestra el nombre, raza, edad y genero de todas las mascotas --
create view InfoMascota as
select nombre, raza, edad, genero 
from mascotas;

select * from InfoMascota;
 
 
-- Muestra el nombre y las alergias de todas las mascotas --
CREATE VIEW MascotaAlergias AS
SELECT nombre, alergias
FROM mascotas;
select * from MascotaAlergias;


-- Muestra el nombre y correo de los empleados --
CREATE VIEW InfoEmpleado AS
SELECT nombre, correo_electronico
FROM empleados;

select * from InfoEmpleado;


-- Muestra el nombre y documento del cliente, y nombre y raza de la mascota --
create view ClienteMascota as 
select cliente.nombre as NombreCliente, cliente.documento as N°Identificacion, mascotas.nombre as Nombre, mascotas.raza as Raza 
from mascotas 
inner join cliente on mascotas.cliente_id = cliente.id;

select * from ClienteMascota;


-- Muestra el nombre del cliente, la fecha de entrada de la reserva y tipo de acomodacion --

create view ClienteReserva as 
select cliente.nombre as NombreCliente, reserva.fecha_entrada as Entrada, reserva.tipo_acomodacion as Acomodacion 
from reserva
inner join cliente on reserva.cliente_id = cliente.id;

select * from ClienteReserva;

-- Vista de clientes sin reserva --

CREATE VIEW vista_clientes_sin_reservas AS
SELECT c.id AS cliente_id, c.nombre AS cliente_nombre, c.ciudad
FROM cliente c
LEFT JOIN reserva r ON c.id = r.cliente_id
WHERE r.id IS NULL;
SELECT * FROM  vista_clientes_sin_reservas;

-- Vista segun un tipo de acomodacion --
CREATE VIEW vista_reservas_tipo_acomodacion AS
SELECT r.id AS reserva_id, r.fecha_entrada, r.fecha_salida, r.hora, r.tipo_acomodacion
FROM reserva r
WHERE r.tipo_acomodacion = 'Suite';

SELECT * FROM  vista_reservas_tipo_acomodacion;


-- Variables --
-- TOTAL DE MACHOS --
SET @machos = 0;

SELECT COUNT(*) INTO @machos
FROM mascotas
WHERE genero = 'Macho';
SELECT @machos AS total_machos;


-- TOTAL HERMBRAS --
SET @hembra= 0;

SELECT COUNT(*) INTO @hembra
FROM mascotas
WHERE genero = 'hembra';

SELECT @hembra AS total_hembras;

-- TOTAL RESERVAS DE UNA ACOMODACION EN ESPECIFICO --
SET @tipo_acomodacion = 'Grande';
SELECT COUNT(*) FROM reserva WHERE tipo_acomodacion = @tipo_acomodacion;

-- variable para obtener los empleados que han realizado una reserva en un rango de fechas --
SET @fecha_inicio = '2024-12-01';
SET @fecha_fin = '2024-12-15';

SELECT DISTINCT e.nombre AS empleado_nombre
FROM reserva r
JOIN empleados e ON r.empleado_id = e.id
WHERE r.fecha_entrada BETWEEN @fecha_inicio AND @fecha_fin;

-- Variable de mascotas con ciertas alergia--
SET @alergia = 'Polvo';
SELECT * FROM mascotas WHERE alergias LIKE CONCAT('%', @alergia, '%');


-- PROCEDIMIENTOS --
-- Procedimiento para obtener la información de un cliente por su correo electrónico --

DELIMITER $$

CREATE PROCEDURE obtener_cliente_por_email (IN correo VARCHAR(100))
BEGIN
    SELECT * FROM cliente
    WHERE correo_electronico = correo;
END $$

DELIMITER ;

CALL obtener_cliente_por_email('carlos.perez@email.com');

-- Procedimiento para obtener todas las reservas de un cliente --

DELIMITER $$
CREATE PROCEDURE obtener_reservas_por_cliente (IN cliente_id BIGINT)
BEGIN
    SELECT r.id, r.fecha_entrada, r.fecha_salida, r.hora, r.tipo_acomodacion, e.nombre AS empleado_responsable
    FROM reserva r
    LEFT JOIN empleados e ON r.empleado_id = e.id
    WHERE r.cliente_id = cliente_id;
END $$

DELIMITER ;

CALL obtener_reservas_por_cliente(1);

-- Procedimiento para obtener la información de la mascota de un cliente --

DELIMITER $$
CREATE PROCEDURE obtener_mascotas_por_cliente (IN cliente_id BIGINT)
BEGIN
    SELECT m.nombre, m.raza, m.edad, m.genero, m.peso, m.esterilizacion, m.reactivo, m.vacunas, m.alergias
    FROM mascotas m
    WHERE m.cliente_id = cliente_id;
END $$

DELIMITER ;

CALL obtener_mascotas_por_cliente(1);

-- Procedimiento para obtener las mascotas con alergias --

DELIMITER $$
CREATE PROCEDURE obtener_mascotas_con_alergias (IN alergias VARCHAR(55))
BEGIN
    SELECT nombre, raza, edad, alergias
    FROM mascotas
    WHERE alergias LIKE CONCAT('%', alergias, '%');
END $$

DELIMITER ;

CALL obtener_mascotas_con_alergias('Polvo');


-- Procedimiento para actualizar la información de un cliente --

DELIMITER $$
CREATE PROCEDURE actualizar_cliente (IN cliente_id BIGINT, IN nuevo_nombre VARCHAR(55), IN nuevo_direccion VARCHAR(50), IN nuevo_celular VARCHAR(20), IN nuevo_correo VARCHAR(100))
BEGIN
    UPDATE cliente
    SET nombre = nuevo_nombre, direccion = nuevo_direccion, celular = nuevo_celular, correo_electronico = nuevo_correo
    WHERE id = cliente_id;
END $$

DELIMITER ;

CALL actualizar_cliente(1, 'Carlos Pérez Actualizado', 'Nueva Calle 123', '612345679', 'carlos.perez.new@email.com');
select * from cliente
















