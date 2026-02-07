-- OMS 小包裹订单表结构
-- 使用 PostgreSQL 分区表优化查询性能

-- 创建主订单表（分区表）
CREATE TABLE IF NOT EXISTS orders (
    id BIGSERIAL,
    airbill_no VARCHAR(50) NOT NULL UNIQUE,
    customer_name VARCHAR(200) NOT NULL,
    billing_ref VARCHAR(100),
    status VARCHAR(50) NOT NULL,
    service_type VARCHAR(100),
    service_center VARCHAR(100),
    from_city VARCHAR(100),
    to_city VARCHAR(100),
    to_attn VARCHAR(200),
    to_zip VARCHAR(20),
    create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_operation_time TIMESTAMP,
    archive_flag SMALLINT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id, archive_flag)
) PARTITION BY LIST (archive_flag);

-- 创建活跃订单分区（archive_flag = 0）
CREATE TABLE IF NOT EXISTS orders_active PARTITION OF orders
    FOR VALUES IN (0)
    PARTITION BY RANGE (create_time);

-- 创建归档订单分区（archive_flag = 1）
CREATE TABLE IF NOT EXISTS orders_archived PARTITION OF orders
    FOR VALUES IN (1)
    PARTITION BY RANGE (create_time);

-- 按月创建活跃订单子分区（2024年）
CREATE TABLE IF NOT EXISTS orders_active_2024_01 PARTITION OF orders_active
    FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');

CREATE TABLE IF NOT EXISTS orders_active_2024_02 PARTITION OF orders_active
    FOR VALUES FROM ('2024-02-01') TO ('2024-03-01');

CREATE TABLE IF NOT EXISTS orders_active_2024_03 PARTITION OF orders_active
    FOR VALUES FROM ('2024-03-01') TO ('2024-04-01');

CREATE TABLE IF NOT EXISTS orders_active_2024_04 PARTITION OF orders_active
    FOR VALUES FROM ('2024-04-01') TO ('2024-05-01');

CREATE TABLE IF NOT EXISTS orders_active_2024_05 PARTITION OF orders_active
    FOR VALUES FROM ('2024-05-01') TO ('2024-06-01');

CREATE TABLE IF NOT EXISTS orders_active_2024_06 PARTITION OF orders_active
    FOR VALUES FROM ('2024-06-01') TO ('2024-07-01');

CREATE TABLE IF NOT EXISTS orders_active_2024_07 PARTITION OF orders_active
    FOR VALUES FROM ('2024-07-01') TO ('2024-08-01');

CREATE TABLE IF NOT EXISTS orders_active_2024_08 PARTITION OF orders_active
    FOR VALUES FROM ('2024-08-01') TO ('2024-09-01');

CREATE TABLE IF NOT EXISTS orders_active_2024_09 PARTITION OF orders_active
    FOR VALUES FROM ('2024-09-01') TO ('2024-10-01');

CREATE TABLE IF NOT EXISTS orders_active_2024_10 PARTITION OF orders_active
    FOR VALUES FROM ('2024-10-01') TO ('2024-11-01');

CREATE TABLE IF NOT EXISTS orders_active_2024_11 PARTITION OF orders_active
    FOR VALUES FROM ('2024-11-01') TO ('2024-12-01');

CREATE TABLE IF NOT EXISTS orders_active_2024_12 PARTITION OF orders_active
    FOR VALUES FROM ('2024-12-01') TO ('2025-01-01');

-- 按年创建归档订单子分区
CREATE TABLE IF NOT EXISTS orders_archived_2022 PARTITION OF orders_archived
    FOR VALUES FROM ('2022-01-01') TO ('2023-01-01');

CREATE TABLE IF NOT EXISTS orders_archived_2023 PARTITION OF orders_archived
    FOR VALUES FROM ('2023-01-01') TO ('2024-01-01');

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_orders_airbill_no ON orders (airbill_no);
CREATE INDEX IF NOT EXISTS idx_orders_customer_name ON orders (customer_name);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders (status);
CREATE INDEX IF NOT EXISTS idx_orders_create_time ON orders (create_time);
CREATE INDEX IF NOT EXISTS idx_orders_archive_flag_create_time ON orders (archive_flag, create_time);

-- 创建更新时间触发器函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 为订单表创建触发器
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 插入示例数据（用于测试）
INSERT INTO orders (airbill_no, customer_name, billing_ref, status, service_type, service_center, from_city, to_city, to_attn, to_zip, create_time, last_operation_time, archive_flag)
VALUES 
    ('SFF7JY0P', 'SHIELD HEALTH', '01997636', 'Delivered', 'LSO Ground®', 'SAT', 'Carrollton', 'CONVERSE', 'JALITZA RAMOS', '78109', '2024-02-05 10:00:00', '2024-03-05 09:00:00', 0),
    ('SFF7JR4Q', 'SHIELD HEALTH', '01991915', 'Delivered', 'LSO Ground®', 'SAT', 'Carrollton', 'SAN ANTONIO', 'SKYLES B GAR', '78201', '2024-02-05 11:00:00', '2024-03-05 09:00:00', 0),
    ('SFF7JN05', 'SHIELD HEALTH', '01995644', 'Delivered', 'LSO Ground®', 'SAT', 'Carrollton', 'SAN ANTONIO', 'SKYLES B GAR', '78250', '2024-02-05 12:00:00', '2024-03-05 09:00:00', 0),
    ('SFF7JT2K', 'SHIELD HEALTH', '01995818', 'Delivered', 'LSO Ground®', 'EHB', 'Carrollton', 'MISSOURI CITY', 'SKY BLUE M SPO', '77459', '2024-02-05 13:00:00', '2024-03-05 09:00:00', 0),
    ('SFF7JY6U', 'SHIELD HEALTH', '01997636', 'Delivered', 'LSO Ground®', 'SAT', 'Carrollton', 'SAN ANTONIO', 'AIDEN W CAMP', '78253', '2024-02-05 14:00:00', '2024-03-05 09:00:00', 0),
    ('SFF7JN0Y', 'SHIELD HEALTH', '01995605', 'Delivered', 'LSO Ground®', 'SAT', 'Carrollton', 'SAN ANTONIO', 'SKYLES B GAR', '78201', '2024-02-05 15:00:00', '2024-03-05 09:00:00', 0),
    ('SFF7JT2F', 'SHIELD HEALTH', '01995457', 'Delivered', 'LSO Ground®', 'AUS', 'Carrollton', 'CEDAR PARK', 'YOUNG S KIM', '78613', '2024-02-05 16:00:00', '2024-03-05 09:00:00', 0),
    ('SFF7JYN6', 'SHIELD HEALTH', '01951029', 'Delivered', 'LSO Ground®', 'AUS', 'Carrollton', 'KYLE', 'IVELANI R JONES', '78640', '2024-02-05 17:00:00', '2024-03-05 09:00:00', 0),
    ('SFF7JN8M', 'SHIELD HEALTH', '01951029', 'Delivered', 'LSO Ground®', 'AUS', 'Carrollton', 'KYLE', 'IVELANI R JONES', '78640', '2024-02-05 18:00:00', '2024-03-05 09:00:00', 0),
    ('SFF7JR0H', 'SHIELD HEALTH', '01995025', 'Delivered', 'LSO Ground®', 'SAT', 'Carrollton', 'SAN ANTONIO', 'AIDEN W CAMP', '78253', '2024-02-05 19:00:00', '2024-03-05 09:00:00', 0)
ON CONFLICT (airbill_no) DO NOTHING;

-- 插入归档订单示例数据
INSERT INTO orders (airbill_no, customer_name, billing_ref, status, service_type, service_center, from_city, to_city, to_attn, to_zip, create_time, last_operation_time, archive_flag)
VALUES 
    ('ARC2023001', 'SHIELD HEALTH', '01997636', 'Delivered', 'LSO Ground®', 'SAT', 'Carrollton', 'AUSTIN', 'JOHN DOE', '78701', '2023-06-15 10:00:00', '2023-07-15 09:00:00', 1),
    ('ARC2023002', 'SHIELD HEALTH', '01991915', 'Delivered', 'LSO Ground®', 'SAT', 'Carrollton', 'HOUSTON', 'JANE SMITH', '77001', '2023-08-20 11:00:00', '2023-09-20 09:00:00', 1)
ON CONFLICT (airbill_no) DO NOTHING;
