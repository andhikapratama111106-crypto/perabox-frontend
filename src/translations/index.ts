import { homeTranslations } from './home';
export type Language = 'en' | 'id' | 'es' | 'ja' | 'zh';

export const translations = {
    en: {
        common: {
            save: 'Save',
            cancel: 'Cancel',
            edit: 'Edit',
            logout: 'Log Out',
            changeLanguage: 'Change Language',
            home: 'HOME',
            about: 'ABOUT',
            services: 'SERVICES',
            profile: 'PROFILE',
            myProfile: 'My Profile',
            viewAll: 'View All'
        },
        sidebar: {
            myProfile: 'My Profile',
            security: 'Security',
            notification: 'Notification',
            dashboard: 'Dashboard',
            rate: 'Rate',
            support: 'Help & Support',
            terms: 'Terms & Conditions'
        },
        profile: {
            identity: 'Identity',
            personalInfo: 'Personal Information',
            address: 'Address',
            firstName: 'First Name',
            lastName: 'Last Name',
            email: 'Email address',
            phone: 'Phone',
            bio: 'Bio',
            country: 'Country',
            street: 'Address',
            postalCode: 'Postal Code',
            taxId: 'TAX ID',
            fullName: 'Full Name',
            location: 'Location'
        },
        rate: {
            title: 'Rate Our Service',
            subtitle: 'Your feedback helps us improve',
            overallExperience: 'Overall Experience',
            cleanliness: 'Cleanliness',
            punctuality: 'Punctuality',
            professionalism: 'Professionalism',
            comment: 'Additional Comments',
            submit: 'Submit Review',
            thankYou: 'Thank you for your feedback!'
        },
        support: {
            title: 'Help & Support',
            subtitle: 'We are here to help you with any issues',
            contactUs: 'Contact Us',
            faq: 'Frequently Asked Questions',
            emailSupport: 'Email Support',
            phoneSupport: 'Phone Support',
            liveChat: 'Live Chat',
            message: 'Your Message',
            sendMessage: 'Send Message',
            successMessage: 'Your message has been sent successfully!'
        },
        terms: {
            title: 'Terms & Conditions',
            subtitle: 'Please read our terms and conditions carefully',
            privacyPolicy: 'Privacy Policy',
            usageTerms: 'Usage Terms',
            serviceAgreement: 'Service Agreement',
            lastUpdated: 'Last Updated'
        },
        dashboard: {
            title: 'Dashboard',
            welcome: 'Welcome back! Here is what is happening with your services.',
            totalBookings: 'Total Bookings',
            pendingServices: 'Pending Services',
            completedTasks: 'Completed Tasks',
            unpaidInvoices: 'Unpaid Invoices',
            recentBookings: 'Recent Bookings',
            bookNow: 'Book New Service',
            quickActions: 'Quick Actions'
        },
        ...homeTranslations.en
    },
    id: {
        common: {
            save: 'Simpan',
            cancel: 'Batal',
            edit: 'Ubah',
            logout: 'Keluar',
            changeLanguage: 'Ganti Bahasa',
            home: 'BERANDA',
            about: 'TENTANG',
            services: 'LAYANAN',
            profile: 'PROFIL',
            myProfile: 'Profil Saya',
            viewAll: 'Lihat Semua'
        },
        sidebar: {
            myProfile: 'Profil Saya',
            security: 'Keamanan',
            notification: 'Notifikasi',
            dashboard: 'Dasbor',
            rate: 'Nilai',
            support: 'Bantuan & Dukungan',
            terms: 'Syarat & Ketentuan'
        },
        profile: {
            identity: 'Identitas',
            personalInfo: 'Informasi Pribadi',
            address: 'Alamat',
            firstName: 'Nama Depan',
            lastName: 'Nama Belakang',
            email: 'Alamat Email',
            phone: 'Telepon',
            bio: 'Biodata',
            country: 'Negara',
            street: 'Alamat',
            postalCode: 'Kode Pos',
            taxId: 'ID Pajak',
            fullName: 'Nama Lengkap',
            location: 'Lokasi'
        },
        rate: {
            title: 'Berikan Nilai untuk Layanan Kami',
            subtitle: 'Masukan Anda membantu kami meningkatkan layanan',
            overallExperience: 'Pengalaman Keseluruhan',
            cleanliness: 'Kebersihan',
            punctuality: 'Ketepatan Waktu',
            professionalism: 'Profesionalisme',
            comment: 'Komentar Tambahan',
            submit: 'Kirim Ulasan',
            thankYou: 'Terima kasih atas masukan Anda!'
        },
        support: {
            title: 'Bantuan & Dukungan',
            subtitle: 'Kami di sini untuk membantu Anda dengan masalah apa pun',
            contactUs: 'Hubungi Kami',
            faq: 'Pertanyaan yang Sering Diajukan',
            emailSupport: 'Dukungan Email',
            phoneSupport: 'Dukungan Telepon',
            liveChat: 'Obrolan Langsung',
            message: 'Pesan Anda',
            sendMessage: 'Kirim Pesan',
            successMessage: 'Pesan Anda telah berhasil dikirim!'
        },
        terms: {
            title: 'Syarat & Ketentuan',
            subtitle: 'Harap baca syarat dan ketentuan kami dengan seksama',
            privacyPolicy: 'Kebijakan Privasi',
            usageTerms: 'Ketentuan Penggunaan',
            serviceAgreement: 'Perjanjian Layanan',
            lastUpdated: 'Terakhir Diperbarui'
        },
        dashboard: {
            title: 'Dasbor',
            welcome: 'Selamat datang kembali! Inilah yang terjadi dengan layanan Anda.',
            totalBookings: 'Total Pemesanan',
            pendingServices: 'Layanan Mendatang',
            completedTasks: 'Tugas Selesai',
            unpaidInvoices: 'Tagihan Belum Dibayar',
            recentBookings: 'Pemesanan Terbaru',
            bookNow: 'Pesan Layanan Baru',
            quickActions: 'Tindakan Cepat'
        },
        ...homeTranslations.id
    },
    es: {
        common: {
            save: 'Guardar',
            cancel: 'Cancelar',
            edit: 'Editar',
            logout: 'Cerrar sesión',
            changeLanguage: 'Cambiar idioma',
            home: 'INICIO',
            about: 'ACERCA DE',
            services: 'SERVICIOS',
            profile: 'PERFIL',
            myProfile: 'Mi Perfil',
            viewAll: 'Ver todo'
        },
        sidebar: {
            myProfile: 'Mi Perfil',
            security: 'Seguridad',
            notification: 'Notificación',
            dashboard: 'Tablero',
            rate: 'Calificar',
            support: 'Ayuda y Soporte',
            terms: 'Términos y Condiciones'
        },
        profile: {
            identity: 'Identidad',
            personalInfo: 'Información Personal',
            address: 'Dirección',
            firstName: 'Nombre',
            lastName: 'Apellido',
            email: 'Correo electrónico',
            phone: 'Teléfono',
            bio: 'Biografía',
            country: 'País',
            street: 'Dirección',
            postalCode: 'Código Postal',
            taxId: 'ID Fiscal',
            fullName: 'Nombre Completo',
            location: 'Ubicación'
        },
        rate: {
            title: 'Califica Nuestro Servicio',
            subtitle: 'Tus comentarios nos ayudan a mejorar',
            overallExperience: 'Experiencia General',
            cleanliness: 'Limpieza',
            punctuality: 'Puntualidad',
            professionalism: 'Profesionalismo',
            comment: 'Comentarios Adicionales',
            submit: 'Enviar Reseña',
            thankYou: '¡Gracias por tus comentarios!'
        },
        support: {
            title: 'Ayuda y Soporte',
            subtitle: 'Estamos aquí para ayudarte con cualquier problema',
            contactUs: 'Contáctanos',
            faq: 'Preguntas Frecuentes',
            emailSupport: 'Soporte por Correo',
            phoneSupport: 'Soporte Telefónico',
            liveChat: 'Chat en Vivo',
            message: 'Tu Mensaje',
            sendMessage: 'Enviar Mensaje',
            successMessage: '¡Tu mensaje ha sido enviado con éxito!'
        },
        terms: {
            title: 'Términos y Condiciones',
            subtitle: 'Por favor, lee nuestros términos y condiciones cuidadosamente',
            privacyPolicy: 'Política de Privacidad',
            usageTerms: 'Términos de Uso',
            serviceAgreement: 'Acuerdo de Servicio',
            lastUpdated: 'Última Actualización'
        },
        dashboard: {
            title: 'Tablero',
            welcome: '¡Bienvenido de nuevo! Esto es lo que está pasando con tus servicios.',
            totalBookings: 'Total de Reservas',
            pendingServices: 'Servicios Pendientes',
            completedTasks: 'Tareas Completadas',
            unpaidInvoices: 'Facturas Impagas',
            recentBookings: 'Reservas Recientes',
            bookNow: 'Reservar Nuevo Servicio',
            quickActions: 'Acciones Rápidas'
        },
        ...homeTranslations.es
    },
    ja: {
        common: {
            save: '保存',
            cancel: 'キャンセル',
            edit: '編集',
            logout: 'ログアウト',
            changeLanguage: '言語変更',
            home: 'ホーム',
            about: '私たちについて',
            services: 'サービス',
            profile: 'プロフィール',
            myProfile: 'マイプロフィール',
            viewAll: 'すべて表示'
        },
        sidebar: {
            myProfile: 'マイプロフィール',
            security: 'セキュリティ',
            notification: '通知',
            dashboard: 'ダッシュボード',
            rate: '評価する',
            support: 'ヘルプとサポート',
            terms: '利用規約'
        },
        profile: {
            identity: '身元',
            personalInfo: '個人情報',
            address: '住所',
            firstName: '名',
            lastName: '姓',
            email: 'メールアドレス',
            phone: '電話番号',
            bio: '自己紹介',
            country: '国',
            street: '住所',
            postalCode: '郵便番号',
            taxId: '納税者番号',
            fullName: 'フルネーム',
            location: '場所'
        },
        rate: {
            title: 'サービスの評価',
            subtitle: 'お客様のフィードバックは改善に役立ちます',
            overallExperience: '総合的な体験',
            cleanliness: '清潔さ',
            punctuality: '時間厳守',
            professionalism: 'プロ意識',
            comment: '追加のコメント',
            submit: 'レビューを送信',
            thankYou: 'フィードバックありがとうございます！'
        },
        support: {
            title: 'ヘルプとサポート',
            subtitle: 'いかなる問題もお手伝いします',
            contactUs: 'お問い合わせ',
            faq: 'よくある質問',
            emailSupport: 'メールサポート',
            phoneSupport: '電話サポート',
            liveChat: 'ライブチャット',
            message: 'メッセージ',
            sendMessage: 'メッセージを送信',
            successMessage: 'メッセージが正常に送信されました！'
        },
        terms: {
            title: '利用規約',
            subtitle: '利用規約をよくお読みください',
            privacyPolicy: 'プライバシーポリシー',
            usageTerms: '利用規約',
            serviceAgreement: 'サービス契約',
            lastUpdated: '最終更新日'
        },
        dashboard: {
            title: 'ダッシュボード',
            welcome: 'おかえりなさい！サービスの状況はこちらです。',
            totalBookings: '総予約数',
            pendingServices: '保留中のサービス',
            completedTasks: '完了したタスク',
            unpaidInvoices: '未払いの請求書',
            recentBookings: '最近の予約',
            bookNow: '新しいサービスを予約',
            quickActions: 'クイックアクション'
        },
        ...homeTranslations.ja
    },
    zh: {
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
