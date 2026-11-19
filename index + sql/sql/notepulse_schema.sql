
SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS np_color (
    id        TINYINT UNSIGNED NOT NULL,
    name      VARCHAR(30)      NOT NULL,
    hex       CHAR(7)          NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uq_color_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO np_color (id, name, hex) VALUES
    (0,  'Lila',      '#6B3DB3'),
    (1,  'Blau',      '#3373E6'),
    (2,  'Türkis',    '#1A9EA8'),
    (3,  'Grün',      '#38A357'),
    (4,  'Gelb',      '#E6AD1A'),
    (5,  'Orange',    '#F28026'),
    (6,  'Rot',       '#E04045'),
    (7,  'Pink',      '#E6529E'),
    (8,  'Braun',     '#8C6140'),
    (9,  'Grau',      '#737885'),
    (10, 'Schwarz',   '#14141A'),
    (11, 'Knallgelb', '#FFD600')
ON DUPLICATE KEY UPDATE name = VALUES(name), hex = VALUES(hex);

CREATE TABLE IF NOT EXISTS np_weight (
    id        TINYINT UNSIGNED NOT NULL,
    label     VARCHAR(20)      NOT NULL,
    factor    TINYINT UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uq_weight_label (label),
    CONSTRAINT chk_weight_factor CHECK (factor BETWEEN 1 AND 10)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO np_weight (id, label, factor) VALUES
    (1, 'Einfach', 1),
    (2, 'Doppelt', 2)
ON DUPLICATE KEY UPDATE label = VALUES(label), factor = VALUES(factor);

CREATE TABLE IF NOT EXISTS np_subject (
    id          CHAR(36)          NOT NULL,
    name        VARCHAR(100)      NOT NULL,
    color_id    TINYINT UNSIGNED  NOT NULL DEFAULT 0,
    sort_order  INT UNSIGNED      NOT NULL DEFAULT 0,
    created_at  TIMESTAMP         NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP         NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_subject_name (name),
    KEY idx_subject_color (color_id),
    CONSTRAINT fk_subject_color FOREIGN KEY (color_id)
        REFERENCES np_color (id) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS np_grade (
    id          CHAR(36)          NOT NULL,
    subject_id  CHAR(36)          NOT NULL,
    value       TINYINT UNSIGNED  NOT NULL,
    weight_id   TINYINT UNSIGNED  NOT NULL DEFAULT 1,
    title       VARCHAR(100)      NOT NULL DEFAULT '',
    exam_date   DATE              NOT NULL,
    created_at  TIMESTAMP         NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP         NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_grade_subject (subject_id, exam_date),
    KEY idx_grade_weight (weight_id),
    CONSTRAINT chk_grade_value CHECK (value BETWEEN 1 AND 6),
    CONSTRAINT fk_grade_subject FOREIGN KEY (subject_id)
        REFERENCES np_subject (id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_grade_weight FOREIGN KEY (weight_id)
        REFERENCES np_weight (id) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE OR REPLACE VIEW np_v_subject_average AS
SELECT  s.id                                   AS subject_id,
        s.name                                 AS subject_name,
        c.hex                                  AS color_hex,
        COUNT(g.id)                            AS grade_count,
        ROUND(SUM(g.value * w.factor) / NULLIF(SUM(w.factor), 0), 2) AS average
FROM        np_subject s
JOIN        np_color   c ON c.id = s.color_id
LEFT JOIN   np_grade   g ON g.subject_id = s.id
LEFT JOIN   np_weight  w ON w.id = g.weight_id
GROUP BY    s.id, s.name, c.hex, s.sort_order
ORDER BY    s.sort_order, s.name;

CREATE OR REPLACE VIEW np_v_overall_average AS
SELECT  ROUND(SUM(g.value * w.factor) / NULLIF(SUM(w.factor), 0), 2) AS overall_average,
        COUNT(g.id)                                                  AS grade_count
FROM    np_grade  g
JOIN    np_weight w ON w.id = g.weight_id;
