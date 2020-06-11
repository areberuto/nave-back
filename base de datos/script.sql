-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-06-2020 a las 17:54:02
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `nave`
--
CREATE DATABASE IF NOT EXISTS `nave` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `nave`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` tinyint(4) NOT NULL,
  `categoria` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `categoria`) VALUES
(1, 'Sin categoría'),
(2, 'Ufología'),
(3, 'Psicofonías'),
(4, 'Fantasmas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `codigos_activacion`
--

CREATE TABLE `codigos_activacion` (
  `id` mediumint(9) NOT NULL,
  `idInv` mediumint(9) NOT NULL,
  `email` varchar(50) NOT NULL,
  `codigo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `id` mediumint(9) NOT NULL,
  `investigadorId` mediumint(9) NOT NULL,
  `fenomenoId` mediumint(9) NOT NULL,
  `fecha` datetime NOT NULL,
  `comentario` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`id`, `investigadorId`, `fenomenoId`, `fecha`, `comentario`) VALUES
(1, 2, 1, '2020-04-13 22:04:58', 'Wow, me ha impresionado este suceso. Le seguiré la pista. ¡Gracias!'),
(2, 1, 1, '2020-04-14 11:45:03', 'Gracias a ti por seguir mis investigaciones, Sonia. Un saludo.'),
(3, 3, 2, '2020-05-20 12:15:20', 'Sonia, te he escrito a tu correo. Creo que tengo información que te puede interesar. Contéstame tan pronto como puedas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fenomenos`
--

CREATE TABLE `fenomenos` (
  `id` mediumint(9) NOT NULL,
  `investigadorId` mediumint(9) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `descripcionCorta` varchar(400) NOT NULL,
  `contenido` varchar(3000) NOT NULL,
  `fecha` date NOT NULL,
  `publicado` date NOT NULL,
  `ciudad` varchar(40) NOT NULL,
  `pais` varchar(40) NOT NULL,
  `latitud` float(8,6) NOT NULL,
  `longitud` float(9,6) NOT NULL,
  `categoria` tinyint(4) DEFAULT NULL,
  `aprobado` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `fenomenos`
--

INSERT INTO `fenomenos` (`id`, `investigadorId`, `titulo`, `descripcionCorta`, `contenido`, `fecha`, `publicado`, `ciudad`, `pais`, `latitud`, `longitud`, `categoria`, `aprobado`) VALUES
(1, 1, 'Gritos en la Mezquita de Córdoba.', 'Escalofriantes gritos de socorro escuchados, periodicamente, en el verano de 2004 en la famosa mezquita andaluza. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tortor tellus, tempus non hendrerit eu, dapibus id mi. Aliquam erat volutpat. Fusce ultricies augue ac dignissim faucibus. Curabitur consectetur quis arcu blandit tristique. Vestibulum ante nibh, dignissim sit amet sapien q', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi fuga veniam et dolorum. Doloribus nostrum rerum unde similique iusto, placeat quia nesciunt vel, officiis necessitatibus numquam natus, nihil aspernatur! Facilis. Delectus laudantium asperiores veritatis odio similique culpa facilis quidem deserunt consequuntur nulla nostrum deleniti sed accusantium dolor rem cupiditate, quis ducimus, magni iusto sapiente distinctio? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sollicitudin laoreet nibh at maximus. Donec viverra ultricies arcu ut tincidunt. Sed a ipsum id quam eleifend dictum. Nam imperdiet, magna quis varius aliquam, urna neque fermentum risus, quis vulputate nisl diam id dolor. Praesent eu fringilla risus. Morbi ut blandit felis. Duis euismod tincidunt mauris, vitae posuere turpis egestas vel. Duis imperdiet velit id orci viverra, in ornare urna congue. Morbi ac pretium urna. Etiam pellentesque quis diam accumsan condimentum. Donec cursus feugiat nulla quis cursus. Pellentesque nisi nulla, tincidunt id lacus quis, tincidunt ullamcorper eros. Vestibulum pharetra diam odio, vel aliquet lorem posuere a. Aenean feugiat vehicula lectus, eu tincidunt dolor rhoncus pulvinar. Praesent id malesuada metus. Duis feugiat aliquet arcu, a suscipit magna. Quisque condimentum nunc sit amet fermentum faucibus. \n Morbi condimentum consequat dapibus. Nam mollis suscipit mi, ac fermentum ex posuere id. Ut bibendum, elit id bibendum eleifend, arcu lectus faucibus mauris, vel vulputate nisi lectus sed nisi. Nam justo arcu, pharetra fermentum consectetur et, hendrerit in nisl. Donec luctus eleifend orci ac efficitur. Quisque rhoncus dapibus enim in semper. Sed ac metus libero. Cras a commodo urna. Praesent enim dolor, cursus a sem eu, aliquet tincidunt nisi. Sed dapibus mauris dolor, porta aliquam sapien dignissim nec. Proin in mi nibh. Curabitur et turpis in sapien vehicula dignissim.', '2004-04-01', '2020-05-15', 'Córdoba', 'España', 37.878983, -4.779677, 1, 1),
(2, 2, 'Misteriosas apariciones estelares sobre la Ciudad de la Ciencia', 'Testimonios de vecinos colindantes a la institución granadina reportan visualizar artefactos voladores sobre dicho edificio.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tortor tellus, tempus non hendrerit eu, dapibus id mi. Aliquam erat volutpat. Fusce ultricies augue ac dignissim faucibus. Curabitur consectetur quis arcu blandit tristique. Vestibulum ante nibh, dignissim sit a', 'Dichas personas han reportado el avistamiento de objetos metálicos que emitían luces azul pálido sobrevolar el edificio cada lunes, durante dos semanas, a las doce de la ncohe. Escalofriante, horropilante, fantastartico cuanto menos. Un fenómeno digno de lorem ipsum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi fuga veniam et dolorum. Doloribus nostrum rerum unde similique iusto, placeat quia nesciunt vel, officiis necessitatibus numquam natus, nihil aspernatur! Facilis. Delectus laudantium asperiores veritatis odio similique culpa facilis quidem deserunt consequuntur nulla nostrum deleniti sed accusantium dolor rem cupiditate, quis ducimus, magni iusto sapiente distinctio? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sollicitudin laoreet nibh at maximus. Donec viverra ultricies arcu ut tincidunt. Sed a ipsum id quam eleifend dictum. Nam imperdiet, magna quis varius aliquam, urna neque fermentum risus, quis vulputate nisl diam id dolor. Praesent eu fringilla risus. Morbi ut blandit felis. Duis euismod tincidunt mauris, vitae posuere turpis egestas vel. Duis imperdiet velit id orci viverra, in ornare urna congue. Morbi ac pretium urna. Etiam pellentesque quis diam accumsan condimentum. Donec cursus feugiat nulla quis cursus. Pellentesque nisi nulla, tincidunt id lacus quis, tincidunt ullamcorper eros. Vestibulum pharetra diam odio, vel aliquet lorem posuere a. Aenean feugiat vehicula lectus, eu tincidunt dolor rhoncus pulvinar. Praesent id malesuada metus. Duis feugiat aliquet arcu, a suscipit magna. Quisque condimentum nunc sit amet fermentum faucibus. \n Morbi condimentum consequat dapibus. Nam mollis suscipit mi, ac fermentum ex posuere id. Ut bibendum, elit id bibendum eleifend, arcu lectus faucibus mauris, vel vulputate nisi lectus sed nisi. Nam justo arcu, pharetra fermentum consectetur et, hendrerit in nisl. Donec luctus eleifend orci ac efficitur. Quisque rhoncus dapibus enim in semper. Sed ac metus libero. Cras a commodo urna. Praesent enim dolor, cursus a sem eu, aliquet tincidunt nisi. Sed dapibus mauris dolor, porta aliquam sapien dignissim nec. Proin in mi nibh. Curabitur et turpis in sapien vehicula dignissim.', '2018-11-25', '2020-06-02', 'Granada', 'España', 37.162178, -3.606841, 2, 1),
(3, 1, 'El pan que hablaba', 'En el mercado de Sant Cougat, un misterioso mercader porta un pan que habla Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tortor tellus, tempus non hendrerit eu, dapibus id mi. Aliquam erat volutpat. Fusce ultricies augue ac dignissim faucibus. Curabitur consectetur quis arcu blandit tristique. Vestibulum ante nibh, dignissim sit amet sapien quis, posuere blandit enim. Vivamus mol', 'A dicho mercader se le preguntaron por los sucesos, y este, como siempre rodeado de curiosos espectadores, demostró que evidentemente, su pan, hablaba. \"Acérquense,\" decía, \"y toquen el pan: ¿cómo está\", preguntaba. \"Está blando, contestaba\". Impresionante. A dicho mercader se le preguntaron por los sucesos, y este, como siempre rodeado de curiosos espectadores, demostró que evidentemente, su pan, hablaba. \"Acérquense,\" decía, \"y toquen el pan: ¿cómo está\", preguntaba. \"Está blando, contestaba\". Impresionante. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi fuga veniam et dolorum. Doloribus nostrum rerum unde similique iusto, placeat quia nesciunt vel, officiis necessitatibus numquam natus, nihil aspernatur! Facilis. Delectus laudantium asperiores veritatis odio similique culpa facilis quidem deserunt consequuntur nulla nostrum deleniti sed accusantium dolor rem cupiditate, quis ducimus, magni iusto sapiente distinctio? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sollicitudin laoreet nibh at maximus. Donec viverra ultricies arcu ut tincidunt. Sed a ipsum id quam eleifend dictum. Nam imperdiet, magna quis varius aliquam, urna neque fermentum risus, quis vulputate nisl diam id dolor. Praesent eu fringilla risus. Morbi ut blandit felis. Duis euismod tincidunt mauris, vitae posuere turpis egestas vel. Duis imperdiet velit id orci viverra, in ornare urna congue. Morbi ac pretium urna. Etiam pellentesque quis diam accumsan condimentum. Donec cursus feugiat nulla quis cursus. Pellentesque nisi nulla, tincidunt id lacus quis, tincidunt ullamcorper eros. Vestibulum pharetra diam odio, vel aliquet lorem posuere a. Aenean feugiat vehicula lectus, eu tincidunt dolor rhoncus pulvinar. Praesent id malesuada metus. Duis feugiat aliquet arcu, a suscipit magna. Quisque condimentum nunc sit amet fermentum faucibus. \n Morbi condimentum consequat dapibus. Nam mollis suscipit mi, ac fermentum ex posuere id. Ut bibendum, elit id bibendum eleifend, arcu lectus faucibus mauris, vel vulputate nisi lectus sed nisi. Nam justo arcu, pharetra fermentum consectetur et, hendrerit in nisl. Donec luctus eleifend orci ac efficitur. Quisque rhoncus dapibus enim in semper. Sed ac metus libero. Cras a commodo urna. Praesent enim dolor, cursus a sem eu, aliquet tincidunt nisi. Sed dapibus mauris dolor, porta aliquam sapien dignissim nec. Proin in mi nibh. Curabitur et turpis in sapien vehicula dignissim.', '2017-12-29', '2020-02-09', 'Barcelona', 'España', 41.473080, 2.081366, 3, 1),
(4, 3, 'Investigadores de la policía forense de Madrid encuentran cadáver animal con dos cabezas.', 'Al llegar a la escena del crimen, los investigadores no daban crédito a lo que veían. El cuerpo sin vida de un perro adulto presentaba dos cabezas, y, libero eget pulvinar sagittis, purus sem tincidunt lacus, in aliquet justo ligula et nunc. In sit amet venenatis erat. Etiam luctus velit non lacinia placerat. Suspendisse suscipit elementum justo nec dignissim. Nulla ullamcorper ex eu ligula vestib', 'Escalofriante, horropilante, fantastartico cuanto menos. Un fenómeno digno de lorem ipsum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi fuga veniam et dolorum. Doloribus nostrum rerum unde similique iusto, placeat quia nesciunt vel, officiis necessitatibus numquam natus, nihil aspernatur! Facilis. Delectus laudantium asperiores veritatis odio similique culpa facilis quidem deserunt consequuntur nulla nostrum deleniti sed accusantium dolor rem cupiditate, quis ducimus, magni iusto sapiente distinctio? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sollicitudin laoreet nibh at maximus. Donec viverra ultricies arcu ut tincidunt. Sed a ipsum id quam eleifend dictum. Nam imperdiet, magna quis varius aliquam, urna neque fermentum risus, quis vulputate nisl diam id dolor. Praesent eu fringilla risus. Morbi ut blandit felis. Duis euismod tincidunt mauris, vitae posuere turpis egestas vel. Duis imperdiet velit id orci viverra, in ornare urna congue. Morbi ac pretium urna. Etiam pellentesque quis diam accumsan condimentum. Donec cursus feugiat nulla quis cursus. Pellentesque nisi nulla, tincidunt id lacus quis, tincidunt ullamcorper eros. Vestibulum pharetra diam odio, vel aliquet lorem posuere a. Aenean feugiat vehicula lectus, eu tincidunt dolor rhoncus pulvinar. Praesent id malesuada metus. Duis feugiat aliquet arcu, a suscipit magna. Quisque condimentum nunc sit amet fermentum faucibus. \n Morbi condimentum consequat dapibus. Nam mollis suscipit mi, ac fermentum ex posuere id. Ut bibendum, elit id bibendum eleifend, arcu lectus faucibus mauris, vel vulputate nisi lectus sed nisi. Nam justo arcu, pharetra fermentum consectetur et, hendrerit in nisl. Donec luctus eleifend orci ac efficitur. Quisque rhoncus dapibus enim in semper. Sed ac metus libero. Cras a commodo urna. Praesent enim dolor, cursus a sem eu, aliquet tincidunt nisi. Sed dapibus mauris dolor, porta aliquam sapien dignissim nec. Proin in mi nibh. Curabitur et turpis in sapien vehicula dignissim.', '2019-02-14', '2020-06-09', 'Madrid', 'España', 40.427792, -3.749819, 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `investigadores`
--

CREATE TABLE `investigadores` (
  `id` mediumint(9) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `clave` varchar(80) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `apellido1` varchar(20) NOT NULL,
  `apellido2` varchar(20) NOT NULL,
  `organismo` varchar(50) NOT NULL,
  `genero` enum('hombre','mujer') NOT NULL,
  `ciudad` varchar(40) NOT NULL,
  `pais` varchar(40) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `verificado` tinyint(1) NOT NULL DEFAULT 0,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `investigadores`
--

INSERT INTO `investigadores` (`id`, `correo`, `clave`, `nombre`, `apellido1`, `apellido2`, `organismo`, `genero`, `ciudad`, `pais`, `fechaNacimiento`, `verificado`, `isAdmin`) VALUES
(1, 'areberuto.dev@gmail.com', '$2a$10$QCsH5c.1y.2JegHw5pQ7g.HTodErI97TiWrIrC14ngGOCD0vGvBQ.', 'Areberuto', 'Foo', 'Bar', 'Universidad de Sevilla', 'hombre', 'Sevilla', 'España', '1993-09-04', 1, 1),
(2, 'ausonia@gmail.com', '$2a$10$QCsH5c.1y.2JegHw5pQ7g.HTodErI97TiWrIrC14ngGOCD0vGvBQ.', 'Sonia Aurelia', 'Márquez', 'Rovira', 'Universidad de Valencia', 'mujer', 'Valencia', 'España', '1990-12-02', 1, 0),
(3, 'carlosruiman@gmail.com', '$2a$10$QCsH5c.1y.2JegHw5pQ7g.HTodErI97TiWrIrC14ngGOCD0vGvBQ.', 'Carlos', 'Ruíz', 'Manila', 'Universidad de Barcelona', 'hombre', 'Barcelona', 'España', '1970-11-30', 1, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `codigos_activacion`
--
ALTER TABLE `codigos_activacion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idInv` (`idInv`);

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `investigadorId` (`investigadorId`),
  ADD KEY `fenomenoId` (`fenomenoId`);

--
-- Indices de la tabla `fenomenos`
--
ALTER TABLE `fenomenos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `investigadorId` (`investigadorId`),
  ADD KEY `categoria` (`categoria`);

--
-- Indices de la tabla `investigadores`
--
ALTER TABLE `investigadores`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `codigos_activacion`
--
ALTER TABLE `codigos_activacion`
  MODIFY `id` mediumint(9) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `fenomenos`
--
ALTER TABLE `fenomenos`
  MODIFY `id` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `investigadores`
--
ALTER TABLE `investigadores`
  MODIFY `id` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `codigos_activacion`
--
ALTER TABLE `codigos_activacion`
  ADD CONSTRAINT `codigos_activacion_ibfk_1` FOREIGN KEY (`idInv`) REFERENCES `investigadores` (`id`);

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`investigadorId`) REFERENCES `investigadores` (`id`),
  ADD CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`fenomenoId`) REFERENCES `fenomenos` (`id`);

--
-- Filtros para la tabla `fenomenos`
--
ALTER TABLE `fenomenos`
  ADD CONSTRAINT `fenomenos_ibfk_1` FOREIGN KEY (`investigadorId`) REFERENCES `investigadores` (`id`),
  ADD CONSTRAINT `fenomenos_ibfk_2` FOREIGN KEY (`categoria`) REFERENCES `categorias` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
