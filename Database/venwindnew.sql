CREATE DATABASE  IF NOT EXISTS `venwindnew` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `venwindnew`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: venwindnew
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `about_hero`
--

DROP TABLE IF EXISTS `about_hero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `about_hero` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `subtitle` text,
  `description` text,
  `background_image` text NOT NULL,
  `logo_cards` json DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `about_hero`
--

LOCK TABLES `about_hero` WRITE;
/*!40000 ALTER TABLE `about_hero` DISABLE KEYS */;
/*!40000 ALTER TABLE `about_hero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `about_journey`
--

DROP TABLE IF EXISTS `about_journey`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `about_journey` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `summary` text,
  `image` text,
  `images` json DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `about_journey`
--

LOCK TABLES `about_journey` WRITE;
/*!40000 ALTER TABLE `about_journey` DISABLE KEYS */;
/*!40000 ALTER TABLE `about_journey` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `about_sections`
--

DROP TABLE IF EXISTS `about_sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `about_sections` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `about_sections`
--

LOCK TABLES `about_sections` WRITE;
/*!40000 ALTER TABLE `about_sections` DISABLE KEYS */;
/*!40000 ALTER TABLE `about_sections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `about_vision_mission`
--

DROP TABLE IF EXISTS `about_vision_mission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `about_vision_mission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vision_title` varchar(255) NOT NULL,
  `vision_description` text,
  `vision_image` text,
  `mission_title` varchar(255) NOT NULL,
  `mission_image` text,
  `mission_points_json` text,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `about_vision_mission`
--

LOCK TABLES `about_vision_mission` WRITE;
/*!40000 ALTER TABLE `about_vision_mission` DISABLE KEYS */;
/*!40000 ALTER TABLE `about_vision_mission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `capabilities_facility`
--

DROP TABLE IF EXISTS `capabilities_facility`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `capabilities_facility` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `capacity` varchar(255) DEFAULT NULL,
  `established` varchar(255) DEFAULT NULL,
  `image` text,
  `capabilities` json DEFAULT NULL,
  `approvals` json DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `order` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `capabilities_facility`
--

LOCK TABLES `capabilities_facility` WRITE;
/*!40000 ALTER TABLE `capabilities_facility` DISABLE KEYS */;
/*!40000 ALTER TABLE `capabilities_facility` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `capabilities_hero`
--

DROP TABLE IF EXISTS `capabilities_hero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `capabilities_hero` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `description` text,
  `sub_description` text,
  `background_image` text NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `capabilities_hero`
--

LOCK TABLES `capabilities_hero` WRITE;
/*!40000 ALTER TABLE `capabilities_hero` DISABLE KEYS */;
/*!40000 ALTER TABLE `capabilities_hero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `capabilities_research`
--

DROP TABLE IF EXISTS `capabilities_research`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `capabilities_research` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `image` text,
  `api_card` json DEFAULT NULL,
  `fdf_card` json DEFAULT NULL,
  `promise` json DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `capabilities_research`
--

LOCK TABLES `capabilities_research` WRITE;
/*!40000 ALTER TABLE `capabilities_research` DISABLE KEYS */;
/*!40000 ALTER TABLE `capabilities_research` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cms_content`
--

DROP TABLE IF EXISTS `cms_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cms_content` (
  `id` int NOT NULL AUTO_INCREMENT,
  `page` varchar(255) NOT NULL COMMENT 'Page identifier (home, about, products, technology, sustainability, careers, contact)',
  `section` varchar(255) NOT NULL COMMENT 'Section identifier (hero, stats, differentiators, etc.)',
  `data` json NOT NULL COMMENT 'JSON data for the section',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_page_section` (`page`,`section`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cms_content`
--

LOCK TABLES `cms_content` WRITE;
/*!40000 ALTER TABLE `cms_content` DISABLE KEYS */;
INSERT INTO `cms_content` VALUES (1,'home','hero','{\"title\": \"Revolutionizing Wind Energy\", \"subtitle\": \"Explore the power of cutting-edge wind turbine manufacturing technology in partnership with Vensys Energy AG, Germany \", \"videoUrl\": \"https://venwindrefex.com/wp-content/uploads/2025/01/5097121_Aerial-View_Alternative_1920x1080-1.mp4\", \"bgImageUrl\": \"\", \"buttonLink\": \"\", \"buttonText\": \"Learn more\"}','2025-11-27 12:54:04','2025-11-28 04:55:44'),(5,'about','hero','{\"title\": \"\", \"bgImageUrl\": \"\"}','2025-11-27 18:54:33','2025-11-28 04:58:10'),(8,'about','introduction','{\"label\": \"\", \"title\": \"Pioneering the Future of Renewable Energy\", \"imageUrl\": \"\", \"paragraph1\": \"Venwind Refex, a partnership between Refex and Venwind, aims to transform wind energy in India through innovation and sustainability, delivering advanced turbine technology and manufacturing excellence.\", \"paragraph2\": \"Venwind Refex strives to be a leading wind turbine OEM in India, combining global expertise with local insight. Our advanced facility is set to produce 5.3 MW turbines, aiming for a 5 GW annual capacity within five years.\", \"overlayText\": \"\"}','2025-11-27 19:06:27','2025-11-27 19:37:48'),(19,'about','partnership','{\"title\": \"\", \"partnerships\": []}','2025-11-27 19:18:10','2025-11-27 19:18:23'),(26,'products','hero','{\"title\": \"\", \"bgImageUrl\": \"\"}','2025-11-27 19:43:46','2025-11-27 19:43:59'),(28,'products','intro','{\"title\": \"\", \"paragraph1\": \"\", \"paragraph2\": \"\", \"paragraph3\": \"\"}','2025-11-27 19:44:37','2025-11-27 19:44:55'),(30,'products','specifications','{\"items\": [], \"title\": \"\"}','2025-11-27 19:46:11','2025-11-27 19:46:24'),(32,'technology','hero','{\"title\": \"\", \"bgImageUrl\": \"http://localhost:8080/uploads/images/image-1765002372198-444463982.png\"}','2025-11-27 19:53:57','2025-12-06 06:26:13'),(34,'technology','intro','{\"label\": \"\", \"title\": \"\", \"imageUrl\": \"\", \"listItems\": [\"Permanent magnet synchronous generator and full-scale power converter enables rapid dispatch response, more active power/frequency, reactive power/voltage control, and smoother fault voltage ride-through\", \"Reduced maintenance as a result of elimination of high-speed couplings and slip ring carbon brushes, cutting fault rates by 70% compared to DFIG wind turbines\"]}','2025-11-27 19:54:28','2025-12-06 07:37:05'),(37,'sustainability','hero','{\"title\": \"Sustainability\", \"bgImageUrl\": \"\"}','2025-11-27 20:22:39','2025-11-27 20:24:22'),(38,'sustainability','future-goals','{\"title\": \"Future goals\", \"bgImageUrl\": \"\", \"description\": \"Scale up production to meet India’s renewable targets and continue R&D investments for enhanced turbine efficiency.\"}','2025-11-27 20:24:04','2025-11-28 04:36:20'),(49,'contact','hero','{\"title\": \"\", \"bgImageUrl\": \"\"}','2025-11-28 04:54:47','2025-11-28 04:54:57'),(52,'home','differentiators','{\"title\": \"\", \"feature1Desc\": \"\", \"feature2Desc\": \"\", \"feature3Desc\": \"\", \"feature1Image\": \"\", \"feature1Title\": \"\", \"feature2Image\": \"\", \"feature2Title\": \"\", \"feature3Image\": \"\", \"feature3Title\": \"\"}','2025-11-28 04:56:05','2025-11-28 04:56:25'),(60,'technology','technical-advantages','{\"items\": [], \"title\": \"\", \"imageUrl\": \"http://localhost:8080/uploads/images/image-1765168852249-707771714.png\"}','2025-12-06 07:01:56','2025-12-08 04:40:54'),(75,'technology','advantages','{\"items\": [], \"title\": \"\", \"imageUrl\": \"http://localhost:8080/uploads/images/image-1765007383466-820726344.png\"}','2025-12-06 07:46:54','2025-12-06 07:49:45'),(78,'technology','benefits','{\"items\": [], \"title\": \"\", \"imageUrl\": \"http://localhost:8080/uploads/images/image-1765007417165-878985520.png\"}','2025-12-06 07:50:19','2025-12-06 07:50:19'),(82,'investor-relations','annual-return_fy-2024-25','{\"title\": \"\", \"content\": \"\", \"documents\": []}','2025-12-30 08:42:24','2025-12-30 09:14:46');
/*!40000 ALTER TABLE `cms_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `digital_solutions`
--

DROP TABLE IF EXISTS `digital_solutions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `digital_solutions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `card_title` varchar(255) NOT NULL,
  `card_subtitle` varchar(255) DEFAULT NULL,
  `card_description` text,
  `order` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `digital_solutions`
--

LOCK TABLES `digital_solutions` WRITE;
/*!40000 ALTER TABLE `digital_solutions` DISABLE KEYS */;
/*!40000 ALTER TABLE `digital_solutions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hero_slides`
--

DROP TABLE IF EXISTS `hero_slides`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hero_slides` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `image` text NOT NULL,
  `order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hero_slides`
--

LOCK TABLES `hero_slides` WRITE;
/*!40000 ALTER TABLE `hero_slides` DISABLE KEYS */;
/*!40000 ALTER TABLE `hero_slides` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `innovation_transformation`
--

DROP TABLE IF EXISTS `innovation_transformation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `innovation_transformation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `section_title` varchar(255) NOT NULL,
  `section_description` text,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `innovation_transformation`
--

LOCK TABLES `innovation_transformation` WRITE;
/*!40000 ALTER TABLE `innovation_transformation` DISABLE KEYS */;
/*!40000 ALTER TABLE `innovation_transformation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `journey_items`
--

DROP TABLE IF EXISTS `journey_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `journey_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `year` varchar(255) DEFAULT NULL,
  `image` text,
  `color` varchar(255) DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `journey_items`
--

LOCK TABLES `journey_items` WRITE;
/*!40000 ALTER TABLE `journey_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `journey_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leadership_members`
--

DROP TABLE IF EXISTS `leadership_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leadership_members` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `description` text,
  `achievements_json` text,
  `experience` varchar(255) DEFAULT NULL,
  `education` varchar(255) DEFAULT NULL,
  `image` text,
  `color` varchar(255) DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leadership_members`
--

LOCK TABLES `leadership_members` WRITE;
/*!40000 ALTER TABLE `leadership_members` DISABLE KEYS */;
/*!40000 ALTER TABLE `leadership_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login_histories`
--

DROP TABLE IF EXISTS `login_histories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login_histories` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `status` enum('Logged-In','Logged-Out') DEFAULT 'Logged-In',
  `login_time` datetime NOT NULL,
  `logout_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `login_histories_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login_histories`
--

LOCK TABLES `login_histories` WRITE;
/*!40000 ALTER TABLE `login_histories` DISABLE KEYS */;
/*!40000 ALTER TABLE `login_histories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `offerings`
--

DROP TABLE IF EXISTS `offerings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `offerings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `metric` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `gradient` varchar(255) DEFAULT NULL,
  `unit` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `offerings`
--

LOCK TABLES `offerings` WRITE;
/*!40000 ALTER TABLE `offerings` DISABLE KEYS */;
/*!40000 ALTER TABLE `offerings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_hero`
--

DROP TABLE IF EXISTS `product_hero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_hero` (
  `id` int NOT NULL AUTO_INCREMENT,
  `background_image` text,
  `overlay_from` varchar(255) DEFAULT 'rgba(0,0,0,0.5)',
  `overlay_to` varchar(255) DEFAULT 'rgba(0,0,0,0.3)',
  `title_line1` varchar(255) DEFAULT NULL,
  `title_line2` varchar(255) DEFAULT NULL,
  `subtitle` text,
  `highlight_text` varchar(255) DEFAULT NULL,
  `description` text,
  `title_color` varchar(255) DEFAULT '#ffffff',
  `subtitle_color` varchar(255) DEFAULT 'rgba(255,255,255,0.9)',
  `description_color` varchar(255) DEFAULT 'rgba(255,255,255,0.8)',
  `aos_type` varchar(255) DEFAULT NULL,
  `aos_duration` int DEFAULT NULL,
  `aos_delay` int DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_hero`
--

LOCK TABLES `product_hero` WRITE;
/*!40000 ALTER TABLE `product_hero` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_hero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `regulatory_approvals`
--

DROP TABLE IF EXISTS `regulatory_approvals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `regulatory_approvals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image` text,
  `link` text,
  `color` varchar(255) DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regulatory_approvals`
--

LOCK TABLES `regulatory_approvals` WRITE;
/*!40000 ALTER TABLE `regulatory_approvals` DISABLE KEYS */;
/*!40000 ALTER TABLE `regulatory_approvals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `research_innovations`
--

DROP TABLE IF EXISTS `research_innovations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `research_innovations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `card_title` varchar(255) NOT NULL,
  `card_subtitle` varchar(255) DEFAULT NULL,
  `card_description` text,
  `order` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `research_innovations`
--

LOCK TABLES `research_innovations` WRITE;
/*!40000 ALTER TABLE `research_innovations` DISABLE KEYS */;
/*!40000 ALTER TABLE `research_innovations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statistics`
--

DROP TABLE IF EXISTS `statistics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `statistics` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image` text NOT NULL,
  `color` varchar(255) DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statistics`
--

LOCK TABLES `statistics` WRITE;
/*!40000 ALTER TABLE `statistics` DISABLE KEYS */;
/*!40000 ALTER TABLE `statistics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sustainability_footer_section`
--

DROP TABLE IF EXISTS `sustainability_footer_section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sustainability_footer_section` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `subtitle` text,
  `cta_text` varchar(255) DEFAULT NULL,
  `cta_icon` varchar(255) DEFAULT NULL,
  `background_image_url` text,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sustainability_footer_section`
--

LOCK TABLES `sustainability_footer_section` WRITE;
/*!40000 ALTER TABLE `sustainability_footer_section` DISABLE KEYS */;
/*!40000 ALTER TABLE `sustainability_footer_section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sustainability_heart`
--

DROP TABLE IF EXISTS `sustainability_heart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sustainability_heart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `main_title` varchar(255) DEFAULT NULL,
  `main_subtitle` text,
  `sections` json DEFAULT NULL,
  `commitments` json DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sustainability_heart`
--

LOCK TABLES `sustainability_heart` WRITE;
/*!40000 ALTER TABLE `sustainability_heart` DISABLE KEYS */;
/*!40000 ALTER TABLE `sustainability_heart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sustainability_hero`
--

DROP TABLE IF EXISTS `sustainability_hero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sustainability_hero` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `background_image` text,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sustainability_hero`
--

LOCK TABLES `sustainability_hero` WRITE;
/*!40000 ALTER TABLE `sustainability_hero` DISABLE KEYS */;
/*!40000 ALTER TABLE `sustainability_hero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sustainability_policy`
--

DROP TABLE IF EXISTS `sustainability_policy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sustainability_policy` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `icon` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `order` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sustainability_policy`
--

LOCK TABLES `sustainability_policy` WRITE;
/*!40000 ALTER TABLE `sustainability_policy` DISABLE KEYS */;
/*!40000 ALTER TABLE `sustainability_policy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sustainability_sdg_card`
--

DROP TABLE IF EXISTS `sustainability_sdg_card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sustainability_sdg_card` (
  `id` int NOT NULL AUTO_INCREMENT,
  `number` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `contribution` text,
  `icon` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `order` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sustainability_sdg_card`
--

LOCK TABLES `sustainability_sdg_card` WRITE;
/*!40000 ALTER TABLE `sustainability_sdg_card` DISABLE KEYS */;
/*!40000 ALTER TABLE `sustainability_sdg_card` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sustainability_social_section`
--

DROP TABLE IF EXISTS `sustainability_social_section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sustainability_social_section` (
  `id` int NOT NULL AUTO_INCREMENT,
  `section_title` varchar(255) DEFAULT NULL,
  `section_description` text,
  `is_active` tinyint(1) DEFAULT '1',
  `csr_cards` json DEFAULT NULL,
  `csr_impact_title` varchar(255) DEFAULT NULL,
  `csr_impact_description` text,
  `csr_impact_items` json DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sustainability_social_section`
--

LOCK TABLES `sustainability_social_section` WRITE;
/*!40000 ALTER TABLE `sustainability_social_section` DISABLE KEYS */;
/*!40000 ALTER TABLE `sustainability_social_section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sustainability_vision_mission`
--

DROP TABLE IF EXISTS `sustainability_vision_mission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sustainability_vision_mission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `section_title` varchar(255) DEFAULT NULL,
  `section_subtitle` varchar(255) DEFAULT NULL,
  `vision_title` varchar(255) DEFAULT NULL,
  `vision_subtitle` varchar(255) DEFAULT NULL,
  `vision_description` text,
  `vision_points` json DEFAULT NULL,
  `mission_title` varchar(255) DEFAULT NULL,
  `mission_subtitle` varchar(255) DEFAULT NULL,
  `mission_points` json DEFAULT NULL,
  `stats` json DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sustainability_vision_mission`
--

LOCK TABLES `sustainability_vision_mission` WRITE;
/*!40000 ALTER TABLE `sustainability_vision_mission` DISABLE KEYS */;
/*!40000 ALTER TABLE `sustainability_vision_mission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `first_name` varchar(85) DEFAULT NULL,
  `last_name` varchar(85) DEFAULT NULL,
  `mobile_number` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `api_key` text,
  `user_type` enum('Admin','CHRO','HR') DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_by` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `modified_by` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `deleted_by` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `modified_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `created_by` (`created_by`),
  KEY `modified_by` (`modified_by`),
  KEY `deleted_by` (`deleted_by`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_2` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_3` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `value_items`
--

DROP TABLE IF EXISTS `value_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `value_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `value_items`
--

LOCK TABLES `value_items` WRITE;
/*!40000 ALTER TABLE `value_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `value_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'venwindnew'
--

--
-- Dumping routines for database 'venwindnew'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-30 16:58:46
