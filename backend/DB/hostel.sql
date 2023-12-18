--
-- Файл сгенерирован с помощью SQLiteStudio v3.4.4 в Пн дек 18 23:43:39 2023
--
-- Использованная кодировка текста: System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Таблица: Apartment
CREATE TABLE IF NOT EXISTS Apartment
(
ApsID integer Primary key AUTOINCREMENT,
ApsClass TEXT
);

-- Таблица: Booking
CREATE TABLE IF NOT EXISTS Booking
(
BokID integer primary key AUTOINCREMENT,
ApsID integer references Apartment (ApsId),
GstID integer references Guest (GstID),
MngID integer references Manager (MngID),
BokCoast money,
BokDateSt date,
BokDateFn date,
BokOplata bool
);

-- Таблица: Guest
CREATE TABLE IF NOT EXISTS Guest
(
GstID integer primary key AUTOINCREMENT,
GstFullName TEXT,
GstPhone TEXT unique,
GstEmail TEXT unique,
GstPassword TEXT
);

-- Таблица: Manager
CREATE TABLE IF NOT EXISTS Manager
(
MngID integer primary key AUTOINCREMENT,
MngFullName TEXT,
MngPhone TEXT unique,
MngEmail TEXT unique,
MngPassword TEXT
);

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
