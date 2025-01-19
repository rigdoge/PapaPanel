import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from 'ra-language-english';
import { TranslationMessages } from 'ra-core';

interface Messages {
    'zh-CN': TranslationMessages;
    'en': TranslationMessages;
}

const messages: Messages = {
    'zh-CN': {
        ...englishMessages,
        ra: {
            ...englishMessages.ra,
            page: {
                ...englishMessages.ra.page,
                dashboard: '仪表盘',
            },
            navigation: {
                ...englishMessages.ra.navigation,
                page_rows_per_page: '每页行数',
            },
            auth: {
                ...englishMessages.ra.auth,
                auth_check_error: '请登录以继续',
                user_menu: '个人设置',
                username: '用户名',
                password: '密码',
                sign_in: '登录',
                sign_in_error: '认证失败，请重试',
                logout: '退出',
            },
            notification: {
                ...englishMessages.ra.notification,
                updated: '已更新',
                created: '已创建',
                deleted: '已删除',
                item_doesnt_exist: '记录不存在',
                http_error: '服务器通信错误',
            },
            validation: {
                ...englishMessages.ra.validation,
                required: '必填',
                minLength: '最少 %{min} 个字符',
                maxLength: '最多 %{max} 个字符',
                minValue: '最小值为 %{min}',
                maxValue: '最大值为 %{max}',
                number: '必须为数字',
                email: '必须为有效的电子邮箱',
                oneOf: '必须选择以下之一: %{options}',
                regex: '必须匹配指定的格式 (regexp): %{pattern}',
            },
        },
        resources: {
            servers: {
                name: '服务器',
                fields: {
                    id: 'ID',
                    name: '名称',
                    ip: 'IP地址',
                    status: '状态',
                    created_at: '创建时间',
                    updated_at: '更新时间',
                },
            },
            sites: {
                name: '站点',
                fields: {
                    id: 'ID',
                    name: '名称',
                    domain: '域名',
                    status: '状态',
                    server_id: '服务器',
                    created_at: '创建时间',
                    updated_at: '更新时间',
                },
            },
            backups: {
                name: '备份',
                fields: {
                    id: 'ID',
                    name: '名称',
                    type: '类型',
                    status: '状态',
                    site_id: '站点',
                    created_at: '创建时间',
                    updated_at: '更新时间',
                },
            },
        },
    },
    'en': englishMessages,
};

export const i18nProvider = polyglotI18nProvider(
    locale => messages[locale as keyof Messages],
    'zh-CN',
    [
        { locale: 'zh-CN', name: '中文' },
        { locale: 'en', name: 'English' },
    ],
    { allowMissing: true }
); 