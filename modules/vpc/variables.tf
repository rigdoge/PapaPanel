variable "environment" {
  description = "环境名称"
  type        = string
}

variable "vpc_cidr" {
  description = "VPC CIDR 块"
  type        = string
}

variable "public_subnets" {
  description = "公共子网 CIDR 列表"
  type        = list(string)
}

variable "private_subnets" {
  description = "私有子网 CIDR 列表"
  type        = list(string)
}

variable "database_subnets" {
  description = "数据库子网 CIDR 列表"
  type        = list(string)
}

variable "allowed_ips" {
  description = "允许访问堡垒机的 IP 列表"
  type        = list(string)
  default     = ["0.0.0.0/0"]  # 注意：生产环境应该限制为特定 IP
} 