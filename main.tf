terraform {
  required_version = ">= 1.0.0"

  backend "s3" {
    bucket         = "terraform-state"
    key            = "papapanel/terraform.tfstate"
    region         = "ap-northeast-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
    alicloud = {
      source  = "aliyun/alicloud"
      version = "~> 1.0"
    }
  }
}

# AWS Provider 配置
provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "PapaPanel"
      Environment = terraform.workspace
      ManagedBy   = "Terraform"
    }
  }
}

# 阿里云 Provider 配置
provider "alicloud" {
  region = var.alicloud_region
} 