# التوثيق باللغة العربية

مرحباً بك في التوثيق العربي لمشروع خدمة مسابقة القرآن الكريم. يحتوي هذا المجلد على جميع الأدلة والمراجع باللغة العربية.

## 📚 هيكل التوثيق العربي

### 🧠 المفاهيم الأساسية
- **[المحركات](./engines.md)** - تفاصيل محرك الأسئلة ومحرك التخصيص
- **[الاستراتيجيات](./strategies.md)** - استراتيجيات التعلم والخوارزميات
- **[توليد الأسئلة](./question-generation.md)** - كيفية توليد وتخصيص الأسئلة

### 🚀 النشر والتشغيل
- **[نشر Heroku](./heroku.md)** - دليل شامل لإدارة تطبيقات Heroku من سطر الأوامر
- **[إعداد البيئة](./environment.md)** - إعداد وتكوين البيئة

### 🔧 التطوير
- **[مرجع API](./api.md)** - توثيق API والنقاط النهائية
- **[إعداد التطوير](./development.md)** - دليل إعداد بيئة التطوير
- **[دليل الاختبار](./testing.md)** - إجراءات وإرشادات الاختبار
- **[أسلوب الكود](./style.md)** - أسلوب واتفاقيات الكود

### 📖 أدلة المستخدم
- **[دليل المستخدم](./user-manual.md)** - توثيق المستخدم النهائي
- **[الأسئلة الشائعة](./faq.md)** - الأسئلة المتكررة
- **[استكشاف الأخطاء](./troubleshooting.md)** - المشاكل الشائعة والحلول

## روابط سريعة

- [المحركات والاستراتيجيات](./engines.md) - المفاهيم الأساسية للنظام
- [نشر Heroku](./heroku.md) - الأوامر الأساسية لإدارة تطبيقات Heroku
- [فهرس التوثيق الرئيسي](../README.md) - العودة لفهرس التوثيق الرئيسي
- [التوثيق الرئيسي للمشروع](../../README.md) - نظرة عامة على المشروع

## المساهمة في التوثيق

عند إضافة توثيق جديد:

1. **استخدم أسماء وصفية** - جميع الأحرف صغيرة مع شرطات (مثل `api-reference.md`)
2. **حدث هذا الملف** - أضف روابط للتوثيق الجديد
3. **اتبع اتفاقية التسمية** - استخدم أسماء ملفات واضحة ووصفية
4. **أنشئ النسخة الإنجليزية** - أضف الملف المقابل في مجلد `../en/`

### اتفاقيات التسمية

- **الملفات**: `lowercase-with-hyphens.md`
- **وصفي**: استخدم أسماء توضح المحتوى بوضوح
- **متسق**: نفس أسماء الملفات يجب أن توجد في مجلدي `en/` و `ar/`

### مثال على الهيكل

```
ar/
├── README.md                    # هذا الملف - فهرس التوثيق العربي
├── engines.md                   # المحركات والاستراتيجيات الأساسية
├── question-generation.md       # عملية توليد الأسئلة
├── heroku.md                    # دليل نشر Heroku
├── environment.md               # إعداد البيئة
├── api.md                       # توثيق API
├── development.md               # إعداد التطوير
├── testing.md                   # دليل الاختبار
├── style.md                     # دليل أسلوب الكود
├── user-manual.md               # دليل المستخدم
├── faq.md                       # الأسئلة الشائعة
└── troubleshooting.md           # دليل استكشاف الأخطاء
```

## تحتاج مساعدة؟

إذا لم تجد ما تبحث عنه أو تحتاج مساعدة في التوثيق:

1. تحقق من [فهرس التوثيق الرئيسي](../README.md) للنظرة العامة
2. ابحث في الفئة المناسبة أعلاه
3. تحقق من [التوثيق الرئيسي للمشروع](../../README.md) للمعلومات الأساسية
4. أنشئ مشكلة إذا كان التوثيق مفقوداً أو غير واضح 