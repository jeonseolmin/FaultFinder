CREATE TABLE accident_cases (
    case_code VARCHAR(50) PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    title VARCHAR(500) NOT NULL,
    party_a_name VARCHAR(100),
    party_b_name VARCHAR(100),
    base_fault_a INTEGER,
    base_fault_b INTEGER
);

CREATE TABLE fault_modifiers (
    id BIGSERIAL PRIMARY KEY,
    case_code VARCHAR(50) NOT NULL REFERENCES accident_cases(case_code),
    modifier_name TEXT NOT NULL,
    change_value VARCHAR(50),
    UNIQUE (case_code, modifier_name)
);

CREATE TABLE accident_case_details (
    id BIGSERIAL PRIMARY KEY,
    case_code VARCHAR(50) NOT NULL UNIQUE REFERENCES accident_cases(case_code),
    accident_situation TEXT,
    base_fault_explanation TEXT,
    modifier_explanation TEXT,
    usage_note TEXT,
    legal_reference TEXT,
    precedent TEXT
);