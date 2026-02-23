import json
import os

with open('src/translations/home.ts', 'r', encoding='utf-8') as f:
    text = f.read()

json_str = text.split('=', 1)[1].strip().strip(';')
data = json.loads(json_str)

new_sections = {
    "en": {
        "whyChooseUs": {
            "sectionTitle": "Why Choose Us?",
            "benefit1Title": "QUALIFIED TECHNICIANS",
            "benefit1Desc": "Skilled, trained experts delivering reliable service.",
            "benefit2Title": "SAFE & TRUSTED",
            "benefit2Desc": "Verified professionals with transparent pricing.",
            "benefit3Title": "BUDGET-FRIENDLY",
            "benefit3Desc": "Upfront, fair costs that help you save.",
            "benefit4Title": "ECO-FRIENDLY CHOICE",
            "benefit4Desc": "Service reduces waste and supports sustainability."
        },
        "discover": {
            "sectionTitle": "Let's Discover",
            "description": "Explore newest and most updated informations here!",
            "article1Title": "AC Maintenance Tools: Must-Haves to Keep Your AC Optimal",
            "article1Date": "November 22, 2023",
            "article2Title": "Did You Know? Your AC \"Cries\" When Overloaded",
            "article2Date": "August 20, 2023",
            "article3Title": "How to Fix a Broken AC: Easy Steps You Can Try at Home",
            "article3Date": "August 8, 2023",
            "buttonText": "Visit All"
        },
        "testimonials": {
            "sectionTitle": "Testimonials",
            "mainHeading": "What Our Customers Say",
            "description": "Customer satisfaction is our highest priority",
            "t1Name": "Yoga Arya Saputra",
            "t1Role": "Loyal Customer",
            "t1Quote": "PERABOX is very helpful! Fast service, neat and professional technicians. The price is also friendly. Best service experience I ever had.",
            "t2Name": "Sari Dewi Anggraini",
            "t2Role": "Housewife",
            "t2Quote": "As a housewife, I need reliable AC service. PERABOX came on time, the technician was friendly, and my AC immediately got cold again. Highly recommended!",
            "t3Name": "Hj. Siti Rahayu",
            "t3Role": "Pensioner",
            "t3Quote": "At my age, I am very helped by PERABOX service. Just order from phone, technician comes to house directly. Patient and very polite service. Thanks PERABOX!"
        },
        "footer": {
             "stayInTouch": "Stay In touch",
             "company": "Company",
             "aboutUs": "About Us",
             "services": "Services",
             "contact": "Contact",
             "legal": "Legal",
             "privacyPolicy": "Privacy Policy",
             "termsOfService": "Terms of Service",
             "help": "Help",
             "faq": "FAQ",
             "support": "Support",
             "allRightsReserved": "© 2024 PERABOX. All rights reserved.",
             "slogan": "Simple. Smooth. Secure."
        }
    },
    "id": {
        "whyChooseUs": {
            "sectionTitle": "Mengapa Memilih Kami?",
            "benefit1Title": "TEKNISI TERKUALIFIKASI",
            "benefit1Desc": "Ahli terlatih dan terampil memberikan layanan yang dapat diandalkan.",
            "benefit2Title": "AMAN & TERPERCAYA",
            "benefit2Desc": "Profesional terverifikasi dengan harga transparan.",
            "benefit3Title": "RAMAH KANTONG",
            "benefit3Desc": "Biaya adil di muka yang membantu Anda berhemat.",
            "benefit4Title": "PILIHAN RAMAH LINGKUNGAN",
            "benefit4Desc": "Layanan mengurangi limbah dan mendukung keberlanjutan."
        },
        "discover": {
            "sectionTitle": "Mari Temukan",
            "description": "Jelajahi informasi terbaru dan paling update di sini!",
            "article1Title": "Peralatan Perawatan AC: Wajib Dimiliki untuk Menjaga AC Tetap Optimal",
            "article1Date": "November 22, 2023",
            "article2Title": "Tahukah Anda? AC Anda \"Menangis\" Saat Terlalu Terbebani",
            "article2Date": "August 20, 2023",
            "article3Title": "Cara Memperbaiki AC yang Rusak: Langkah Mudah yang Bisa Anda Coba di Rumah",
            "article3Date": "August 8, 2023",
            "buttonText": "Kunjungi Semua"
        },
        "testimonials": {
            "sectionTitle": "Testimoni",
            "mainHeading": "Apa Kata Pelanggan Kami",
            "description": "Kepuasan pelanggan adalah prioritas utama kami",
            "t1Name": "Yoga Arya Saputra",
            "t1Role": "Pelanggan Setia",
            "t1Quote": "PERABOX sangat membantu! Pelayanannya cepat, teknisinya rapi dan profesional. Harganya juga bersahabat. Pengalaman servis terbaik yang pernah saya rasakan.",
            "t2Name": "Sari Dewi Anggraini",
            "t2Role": "Ibu Rumah Tangga",
            "t2Quote": "Sebagai ibu rumah tangga, saya butuh servis AC yang bisa diandalkan. PERABOX datang tepat waktu, teknisinya ramah, dan AC saya langsung dingin lagi. Sangat recommended!",
            "t3Name": "Hj. Siti Rahayu",
            "t3Role": "Pensiunan",
            "t3Quote": "Di usia saya yang sudah tidak muda lagi, sangat terbantu dengan layanan PERABOX. Cukup pesan dari HP, teknisi langsung datang ke rumah. Pelayanannya sabar dan sangat sopan. Terima kasih PERABOX!"
        },
        "footer": {
             "stayInTouch": "Tetap Terhubung",
             "company": "Perusahaan",
             "aboutUs": "Tentang Kami",
             "services": "Layanan",
             "contact": "Kontak",
             "legal": "Hukum",
             "privacyPolicy": "Kebijakan Privasi",
             "termsOfService": "Syarat Ketentuan",
             "help": "Bantuan",
             "faq": "FAQ",
             "support": "Dukungan",
             "allRightsReserved": "© 2024 PERABOX. Hak cipta dilindungi undang-undang.",
             "slogan": "Simple. Smooth. Secure."
        }
    },
    "es": {
        "whyChooseUs": {
            "sectionTitle": "¿Por qué elegirnos?",
            "benefit1Title": "TÉCNICOS CUALIFICADOS",
            "benefit1Desc": "Expertos capacitados que brindan un servicio confiable.",
            "benefit2Title": "SEGURO Y CONFIABLE",
            "benefit2Desc": "Profesionales verificados con precios transparentes.",
            "benefit3Title": "ASEQUIBLE",
            "benefit3Desc": "Costos justos por adelantado que le ayudan a ahorrar.",
            "benefit4Title": "OPCIÓN ECOLÓGICA",
            "benefit4Desc": "El servicio reduce el desperdicio y apoya la sostenibilidad."
        },
        "discover": {
            "sectionTitle": "Descubramos",
            "description": "¡Explore las noticias más recientes y actualizadas aquí!",
            "article1Title": "Herramientas de mantenimiento de AC: esenciales para un AC óptimo",
            "article1Date": "Noviembre 22, 2023",
            "article2Title": "¿Sabías? Su AC \"Llora\" cuando está sobrecargado",
            "article2Date": "Agosto 20, 2023",
            "article3Title": "Cómo reparar un AC roto: pasos fáciles para probar en casa",
            "article3Date": "Agosto 8, 2023",
            "buttonText": "Visitar Todo"
        },
        "testimonials": {
            "sectionTitle": "Testimonios",
            "mainHeading": "Lo que dicen nuestros clientes",
            "description": "La satisfacción del cliente es nuestra máxima prioridad",
            "t1Name": "Yoga Arya Saputra",
            "t1Role": "Cliente Leal",
            "t1Quote": "¡PERABOX es muy útil! Servicio rápido, técnicos prolijos y profesionales. El precio también es amigable.",
            "t2Name": "Sari Dewi Anggraini",
            "t2Role": "Ama de casa",
            "t2Quote": "Como ama de casa, necesito un servicio confiable. Llegaron a tiempo, el técnico fue amable y mi aire acondicionado volvió a enfriar.",
            "t3Name": "Hj. Siti Rahayu",
            "t3Role": "Pensionista",
            "t3Quote": "A mi edad, me ayuda mucho este servicio. Simplemente pido por teléfono y el técnico viene a casa."
        },
        "footer": {
             "stayInTouch": "Mantente en contacto",
             "company": "Compañía",
             "aboutUs": "Sobre Nosotros",
             "services": "Servicios",
             "contact": "Contacto",
             "legal": "Legal",
             "privacyPolicy": "Política de Privacidad",
             "termsOfService": "Términos de Servicio",
             "help": "Ayuda",
             "faq": "Preguntas Frecuentes",
             "support": "Soporte",
             "allRightsReserved": "© 2024 PERABOX. Todos los derechos reservados.",
             "slogan": "Simple. Smooth. Secure."
        }
    },
    "ja": {
        "whyChooseUs": {
            "sectionTitle": "選ばれる理由",
            "benefit1Title": "資格のある技術者",
            "benefit1Desc": "熟練した専門家が信頼できるサービスを提供します。",
            "benefit2Title": "安全で信頼できる",
            "benefit2Desc": "透明な価格設定を備えた検証済みの専門家。",
            "benefit3Title": "予算にやさしい",
            "benefit3Desc": "節約に役立つ事前の公正なコスト。",
            "benefit4Title": "環境に優しい選択",
            "benefit4Desc": "サービスは無駄を減らし、持続可能性をサポートします。"
        },
        "discover": {
            "sectionTitle": "発見しよう",
            "description": "最新の更新情報をここで探索してください！",
            "article1Title": "エアコンメンテナンスツール：最適なエアコンを維持するための必需品",
            "article1Date": "11月 22, 2023",
            "article2Title": "知っていましたか？負担がかかりすぎるとエアコンが「泣く」",
            "article2Date": "8月 20, 2023",
            "article3Title": "壊れたエアコンの直し方：自宅で試せる簡単なステップ",
            "article3Date": "8月 8, 2023",
            "buttonText": "すべて見る"
        },
        "testimonials": {
            "sectionTitle": "お客様の声",
            "mainHeading": "お客様の声",
            "description": "顧客満足は私たちの最優先事項です",
            "t1Name": "Yoga Arya Saputra",
            "t1Role": "常連客",
            "t1Quote": "PERABOXはとても役に立ちます！サービスは迅速で、技術者もきちんとしていてプロフェッショナルです。価格もフレンドリーです。",
            "t2Name": "Sari Dewi Anggraini",
            "t2Role": "主婦",
            "t2Quote": "サービスの信頼性が必要です。時間通りに来て、技術者も親切で、エアコンもすぐに冷え始めました！",
            "t3Name": "Hj. Siti Rahayu",
            "t3Role": "年金受給者",
            "t3Quote": "スマホで注文するだけで、技術者が直接家に来てくれます。とても丁寧なサービスに感謝しています。"
        },
        "footer": {
             "stayInTouch": "連絡を取り合う",
             "company": "会社",
             "aboutUs": "私たちについて",
             "services": "サービス",
             "contact": "お問い合わせ",
             "legal": "法的",
             "privacyPolicy": "プライバシーポリシー",
             "termsOfService": "利用規約",
             "help": "ヘルプ",
             "faq": "よくある質問",
             "support": "サポート",
             "allRightsReserved": "© 2024 PERABOX。無断転載を禁じます。",
             "slogan": "Simple. Smooth. Secure."
        }
    },
    "zh": {
        "whyChooseUs": {
            "sectionTitle": "为什么选择我们？",
            "benefit1Title": "合格的技术人员",
            "benefit1Desc": "熟练且训练有素的专家提供可靠的服务。",
            "benefit2Title": "安全可靠",
            "benefit2Desc": "经过验证且价格透明的专业人士。",
            "benefit3Title": "价格实惠",
            "benefit3Desc": "前期公平的成本，帮您省钱。",
            "benefit4Title": "环保选择",
            "benefit4Desc": "服务可减少浪费并支持可持续性。"
        },
        "discover": {
            "sectionTitle": "让我们发现",
            "description": "在这里探索最新、最全面的资讯！",
            "article1Title": "空调维护工具：保持空调最佳状态的必备品",
            "article1Date": "十一月 22, 2023",
            "article2Title": "你知道吗？当你的空调超载时也会“哭”",
            "article2Date": "八月 20, 2023",
            "article3Title": "如何修理坏掉的空调：你可以在家尝试的简单步骤",
            "article3Date": "八月 8, 2023",
            "buttonText": "查看全部"
        },
        "testimonials": {
            "sectionTitle": "推荐信",
            "mainHeading": "我们的客户怎么说",
            "description": "客户满意度是我们的首要任务",
            "t1Name": "Yoga Arya Saputra",
            "t1Role": "忠实客户",
            "t1Quote": "PERABOX 非常有帮助！服务快，技术人员整洁专业，价格也很友好。",
            "t2Name": "Sari Dewi Anggraini",
            "t2Role": "家庭主妇",
            "t2Quote": "作为一个家庭主妇，我需要可靠的服务。他们准时到来，技术人员很友好，空调立马就冷了！",
            "t3Name": "Hj. Siti Rahayu",
            "t3Role": "养老金领取者",
            "t3Quote": "只需通过手机下单，技术人员就会直接上门。服务既耐心又非常有礼貌。"
        },
        "footer": {
             "stayInTouch": "保持联系",
             "company": "公司",
             "aboutUs": "关于我们",
             "services": "服务",
             "contact": "联系我们",
             "legal": "法律信息",
             "privacyPolicy": "隐私政策",
             "termsOfService": "服务条款",
             "help": "帮助",
             "faq": "常见问题",
             "support": "支持",
             "allRightsReserved": "© 2024 PERABOX. 保留所有权利。",
             "slogan": "Simple. Smooth. Secure."
        }
    }
}

for lang, sections in new_sections.items():
    if lang in data:
        data[lang].update(sections)

with open('src/translations/home.ts', 'w', encoding='utf-8') as f:
    f.write(f'export const homeTranslations = {json.dumps(data, indent=4, ensure_ascii=False)};')
