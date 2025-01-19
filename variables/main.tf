variable "aws_region" {
  description = "AWS 区域"
  type        = string
  default     = "ap-northeast-1"
}

variable "alicloud_region" {
  description = "阿里云区域"
  type        = string
  default     = "cn-hangzhou"
}

variable "environment" {
  description = "环境名称"
  type        = string
  default     = "development"

  validation {
    condition     = contains(["development", "staging", "production"], var.environment)
    error_message = "环境必须是 development、staging 或 production 之一"
  }
}

variable "vpc_cidr" {
  description = "VPC CIDR 块"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnets" {
  description = "公共子网 CIDR 列表"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "private_subnets" {
  description = "私有子网 CIDR 列表"
  type        = list(string)
  default     = ["10.0.10.0/24", "10.0.11.0/24"]
}

variable "database_subnets" {
  description = "数据库子网 CIDR 列表"
  type        = list(string)
  default     = ["10.0.20.0/24", "10.0.21.0/24"]
}

variable "instance_type" {
  description = "EC2 实例类型"
  type        = string
  default     = "t3.medium"
}

variable "mysql_instance_class" {
  description = "RDS 实例类型"
  type        = string
  default     = "db.t3.medium"
}

variable "redis_node_type" {
  description = "Redis 节点类型"
  type        = string
  default     = "cache.t3.medium"
} 