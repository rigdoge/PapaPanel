environment = "development"

# 实例配置
instance_type       = "t3.small"
mysql_instance_class = "db.t3.small"
redis_node_type     = "cache.t3.small"

# 网络配置
vpc_cidr         = "10.0.0.0/16"
public_subnets   = ["10.0.1.0/24", "10.0.2.0/24"]
private_subnets  = ["10.0.10.0/24", "10.0.11.0/24"]
database_subnets = ["10.0.20.0/24", "10.0.21.0/24"] 