import json
with open('src/translations/index.ts', 'r') as f:
    text = f.read()

text = text.replace(
    "export type Language = 'en' | 'id' | 'es' | 'ja' | 'fr';",
    "import { homeTranslations } from './home';\nexport type Language = 'en' | 'id' | 'es' | 'ja' | 'zh';"
)
text = text.replace(
    "quickActions: 'Quick Actions'\n        }\n    },",
    "quickActions: 'Quick Actions'\n        },\n        ...homeTranslations.en\n    },"
)
text = text.replace(
    "quickActions: 'Tindakan Cepat'\n        }\n    },",
    "quickActions: 'Tindakan Cepat'\n        },\n        ...homeTranslations.id\n    },"
)
text = text.replace(
    "quickActions: 'Acciones Rápidas'\n        }\n    },",
    "quickActions: 'Acciones Rápidas'\n        },\n        ...homeTranslations.es\n    },"
)
text = text.replace(
    "quickActions: 'クイックアクション'\n        }\n    },",
    "quickActions: 'クイックアクション'\n        },\n        ...homeTranslations.ja\n    },"
)

fr_start = text.find("    fr: {")
if fr_start != -1:
    zh_content = """    zh: {
        common: {
            save: '保存',
            cancel: '取消',
            edit: '编辑',
            logout: '登出',
            changeLanguage: '改变语言',
            home: '主页',
            about: '关于',
            services: '服务',
            profile: '个人资料',
            myProfile: '我的预资料',
            viewAll: '查看全部'
        },
        sidebar: {
            myProfile: '我的预资料',
            security: '安全',
            notification: '通知',
            dashboard: '仪表板',
            rate: '评分',
            support: '帮助与支持',
            terms: '条款和条件'
        },
        profile: {
            identity: '身份',
            personalInfo: '个人信息',
            address: '地址',
            firstName: '名字',
            lastName: '姓氏',
            email: '电子邮件地址',
            phone: '电话',
            bio: '简介',
            country: '国家',
            street: '街道地址',
            postalCode: '邮政编码',
            taxId: '税号',
            fullName: '全名',
            location: '位置'
        },
        rate: {
            title: '评价我们的服务',
            subtitle: '您的反馈有助于我们改进',
            overallExperience: '总体体验',
            cleanliness: '清洁度',
            punctuality: '守时',
            professionalism: '专业水平',
            comment: '补充评论',
            submit: '提交评论',
            thankYou: '感谢您的反馈！'
        },
        support: {
            title: '帮助与支持',
            subtitle: '我们在这里帮助您解决任何问题',
            contactUs: '联系我们',
            faq: '常见问题',
            emailSupport: '电子邮件支持',
            phoneSupport: '电话支持',
            liveChat: '在线聊天',
            message: '您的信息',
            sendMessage: '发送信息',
            successMessage: '您的信息已成功发送！'
        },
        terms: {
            title: '条款和条件',
            subtitle: '请仔细阅读我们的条款和条件',
            privacyPolicy: '隐私政策',
            usageTerms: '使用条款',
            serviceAgreement: '服务协议',
            lastUpdated: '最后更新'
        },
        dashboard: {
            title: '仪表板',
            welcome: '欢迎回来！这是您的服务情况。',
            totalBookings: '总预订量',
            pendingServices: '待定服务',
            completedTasks: '已完成的任务',
            unpaidInvoices: '未付发票',
            recentBookings: '最近预订',
            bookNow: '预订新服务',
            quickActions: '快速操作'
        },
        ...homeTranslations.zh
    }
};
"""
    text = text[:fr_start] + zh_content

with open('src/translations/index.ts', 'w') as f:
    f.write(text)
print("Translations patched successfully.")
