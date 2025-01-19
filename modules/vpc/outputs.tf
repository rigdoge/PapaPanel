output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main.id
}

output "public_subnet_ids" {
  description = "公共子网 ID 列表"
  value       = aws_subnet.public[*].id
}

output "private_subnet_ids" {
  description = "私有子网 ID 列表"
  value       = aws_subnet.private[*].id
}

output "database_subnet_ids" {
  description = "数据库子网 ID 列表"
  value       = aws_subnet.database[*].id
}

output "bastion_security_group_id" {
  description = "堡垒机安全组 ID"
  value       = aws_security_group.bastion.id
}

output "nat_gateway_ids" {
  description = "NAT Gateway ID 列表"
  value       = aws_nat_gateway.main[*].id
}

output "availability_zones" {
  description = "可用区列表"
  value       = data.aws_availability_zones.available.names
} 