CREATE TABLE IF NOT EXISTS `dashboard`.`users_usr` (
  `usr_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `usr_mail` VARCHAR(100) NOT NULL,
  `usr_pwd` TEXT NOT NULL,
  `usr_name` VARCHAR(50) NOT NULL,
  `usr_firstname` VARCHAR(50) NOT NULL,
  `usr_addr` VARCHAR(200) NOT NULL,
  `usr_postalcode` INT(10) NOT NULL,
  `usr_city` VARCHAR(50) NOT NULL,
  `usr_phone` INT NOT NULL,
  `usr_role` TINYINT(2) NOT NULL,
  `usr_counselorid` INT UNSIGNED NULL,
  PRIMARY KEY (`usr_id`),
  UNIQUE INDEX `usr_mail_UNIQUE` (`usr_mail` ASC),
  INDEX `usr_counselorid_idx` (`usr_counselorid` ASC),
  CONSTRAINT `usr_counselorid`
    FOREIGN KEY (`usr_counselorid`)
    REFERENCES `dashboard`.`users_usr` (`usr_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `dashboard`.`accounts_acc` (
  `acc_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `usr_id` INT UNSIGNED NOT NULL,
  `acc_date` DATE NOT NULL,
  `acc_solde` INT NOT NULL DEFAULT 0,
  `acc_type` TINYINT(2) NOT NULL DEFAULT 0,
  `acc_actions` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`acc_id`),
  INDEX `usr_id_idx` (`usr_id` ASC),
  CONSTRAINT `usr_id`
    FOREIGN KEY (`usr_id`)
    REFERENCES `dashboard`.`users_usr` (`usr_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `dashboard`.`operations_ope` (
  `ope_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `acc_id_deb` INT UNSIGNED NOT NULL,
  `acc_id_cred` INT UNSIGNED NOT NULL,
  `ope_montant` INT NOT NULL,
  `ope_date` DATETIME NOT NULL,
  PRIMARY KEY (`ope_id`),
  INDEX `acc_id_deb_idx` (`acc_id_deb` ASC),
  INDEX `acc_id_cred_idx` (`acc_id_cred` ASC),
  CONSTRAINT `acc_id_deb`
    FOREIGN KEY (`acc_id_deb`)
    REFERENCES `dashboard`.`accounts_acc` (`acc_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `acc_id_cred`
    FOREIGN KEY (`acc_id_cred`)
    REFERENCES `dashboard`.`accounts_acc` (`acc_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;