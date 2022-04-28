SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema my-budget
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `my-budget` DEFAULT CHARACTER SET utf8mb4 ;
USE `my-budget` ;

-- -----------------------------------------------------
-- Table `my-budget`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `my-budget`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(150) NOT NULL,
  `password` VARCHAR(150) NOT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `my-budget`.`budget`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `my-budget`.`budget` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `type` ENUM('ENTRY', 'EGRESS') NOT NULL,
  `value` INT(11) NOT NULL,
  `concept` VARCHAR(150) NOT NULL,
  `created_at` DATE NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` DATE NULL DEFAULT CURRENT_TIMESTAMP(),
  `users_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_budget_users_idx` (`users_id` ASC),
  CONSTRAINT `fk_budget_users`
    FOREIGN KEY (`users_id`)
    REFERENCES `my-budget`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;