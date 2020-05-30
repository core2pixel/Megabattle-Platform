-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Май 30 2020 г., 20:27
-- Версия сервера: 10.4.11-MariaDB
-- Версия PHP: 7.2.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `megabattle_platform`
--

-- --------------------------------------------------------

--
-- Структура таблицы `bangers`
--

CREATE TABLE `bangers` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `text` varchar(50) NOT NULL,
  `fraction` varchar(5) NOT NULL,
  `youtube_link` varchar(20) NOT NULL,
  `bangers_is_enabled` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `bangers`
--

INSERT INTO `bangers` (`id`, `name`, `text`, `fraction`, `youtube_link`, `bangers_is_enabled`) VALUES
(1, 'Ленинградский эксперимент', 'Бэнгер факультета Фотоники', 'mff', 'pB-GfkFu_lM', 1),
(4, 'Ленинградский эксперимент', 'Бэнгер ФТМИ', 'ftmi', '5mm163wWKL8', 1),
(5, 'Ленинградский эксперимент', 'Бэнгер факультета КТиУ', 'ktu', 'oYhB8F7LF2I', 1),
(6, 'Ленинградский эксперимент', 'Бэнгер факультета БТИНС', 'btins', 'g9wFQTzRfog', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `value` int(11) NOT NULL,
  `vk_id` int(11) NOT NULL,
  `fraction` varchar(5) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `likes`
--

INSERT INTO `likes` (`id`, `value`, `vk_id`, `fraction`, `time`) VALUES
(2, 1, 215059409, 'mff', '2020-05-29 16:06:02'),
(4, 1, 215059409, 'ktu', '2020-05-29 16:38:56'),
(7, 1, 215059409, 'ftmi', '2020-05-29 16:39:55'),
(8, 1, 215059409, 'btins', '2020-05-29 20:29:11');

-- --------------------------------------------------------

--
-- Структура таблицы `links`
--

CREATE TABLE `links` (
  `id` int(11) NOT NULL,
  `link` varchar(20) NOT NULL,
  `type` varchar(20) NOT NULL,
  `fraction` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Структура таблицы `progress`
--

CREATE TABLE `progress` (
  `id` int(11) NOT NULL,
  `vk_id` int(11) NOT NULL,
  `fraction` varchar(5) NOT NULL,
  `type` varchar(6) NOT NULL,
  `points` int(11) NOT NULL,
  `link` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `progress`
--

INSERT INTO `progress` (`id`, `vk_id`, `fraction`, `type`, `points`, `link`) VALUES
(11, 215059409, 'ftmi', 'banger', 3, '5mm163wWKL8'),
(13, 215059409, 'ktu', 'banger', 3, 'oYhB8F7LF2I'),
(14, 215059409, 'mff', 'banger', 3, 'pB-GfkFu_lM'),
(15, 215059409, 'btins', 'banger', 3, 'g9wFQTzRfog');

-- --------------------------------------------------------

--
-- Структура таблицы `series`
--

CREATE TABLE `series` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `youtube_link` varchar(50) NOT NULL,
  `descr` text NOT NULL,
  `year` int(11) NOT NULL,
  `genre` varchar(20) NOT NULL,
  `duration` varchar(10) NOT NULL,
  `fraction` varchar(5) NOT NULL,
  `fraction_name` varchar(15) NOT NULL,
  `likes` int(11) NOT NULL,
  `bangers_is_enabled` tinyint(1) NOT NULL,
  `series_is_enabled` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `series`
--

INSERT INTO `series` (`id`, `name`, `youtube_link`, `descr`, `year`, `genre`, `duration`, `fraction`, `fraction_name`, `likes`, `bangers_is_enabled`, `series_is_enabled`) VALUES
(1, 'Ленинградский эксперимент', 'L0blnTRD2qU', '', 2020, 'Комедия', '4 мин', 'mff', 'МФФ', 0, 1, 0),
(3, 'Ленинградский эксперимент', 'K09_5IsgGe8', '', 2020, 'Комедия', '4 мин', 'ftmi', 'ФТМИ', 0, 1, 0),
(4, 'Ленинградский эксперимент', 'jPan651rVMs', '', 2020, 'Комедия', '4 мин', 'ktu', 'КТиУ', 0, 1, 0),
(6, 'Ленинградский эксперимент', 'pz1ztvu77FM', '', 2020, 'Комедия', '4 мин', 'btins', 'БТИНС', 0, 1, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(20) DEFAULT NULL,
  `fraction` varchar(5) NOT NULL,
  `vk_id` int(11) NOT NULL,
  `vk_image` varchar(100) NOT NULL,
  `vk_token` varchar(100) NOT NULL,
  `vk_expires_in` int(11) NOT NULL,
  `creation_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `username`, `fraction`, `vk_id`, `vk_image`, `vk_token`, `vk_expires_in`, `creation_time`) VALUES
(35, 'Danil', 'mff', 215059409, 'https://sun9-55.userapi.com/c857328/v857328046/91bf2/u_I4fL9LLh8.jpg?ava=1', '26cf9cae751e1555c32b51be7c720e872f5cff8426e638a0e53c8872c54172a3edcc964009b9c24e98035', 86400, '2020-05-30 18:00:02');

-- --------------------------------------------------------

--
-- Структура таблицы `voting`
--

CREATE TABLE `voting` (
  `id` int(11) NOT NULL,
  `fraction` varchar(5) NOT NULL,
  `fraction_name` varchar(15) NOT NULL,
  `type` varchar(10) NOT NULL,
  `is_enabled` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `voting`
--

INSERT INTO `voting` (`id`, `fraction`, `fraction_name`, `type`, `is_enabled`) VALUES
(1, 'mff', 'МФФ', 'banger', 1),
(2, 'ftmi', 'ФТМИ', 'banger', 1),
(4, 'ktu', 'КТУ', 'banger', 1),
(5, 'btins', 'БТИНС', 'banger', 1),
(6, 'mff', 'МФФ', 'series', 0),
(7, 'ftmi', 'ФТМИ', 'series', 0),
(9, 'ktu', 'КТУ', 'series', 0),
(10, 'btins', 'БТИНС', 'series', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `voting_results`
--

CREATE TABLE `voting_results` (
  `id` int(11) NOT NULL,
  `vk_id` int(11) NOT NULL,
  `fraction` varchar(5) NOT NULL,
  `score` int(11) NOT NULL,
  `user_fraction` varchar(15) NOT NULL,
  `type` varchar(20) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `voting_results`
--

INSERT INTO `voting_results` (`id`, `vk_id`, `fraction`, `score`, `user_fraction`, `type`, `time`) VALUES
(114, 215059409, 'ftmi', 3, 'mff', 'banger', '2020-05-30 17:43:30'),
(115, 215059409, 'ktu', 5, 'mff', 'banger', '2020-05-30 17:44:23'),
(116, 215059409, 'btins', 2, 'mff', 'banger', '2020-05-30 17:44:24');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `bangers`
--
ALTER TABLE `bangers`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `links`
--
ALTER TABLE `links`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `progress`
--
ALTER TABLE `progress`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `series`
--
ALTER TABLE `series`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `voting`
--
ALTER TABLE `voting`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `voting_results`
--
ALTER TABLE `voting_results`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `bangers`
--
ALTER TABLE `bangers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `links`
--
ALTER TABLE `links`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `progress`
--
ALTER TABLE `progress`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT для таблицы `series`
--
ALTER TABLE `series`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT для таблицы `voting`
--
ALTER TABLE `voting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `voting_results`
--
ALTER TABLE `voting_results`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
