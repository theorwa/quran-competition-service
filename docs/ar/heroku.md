# أوامر Heroku CLI لنظام Windows

يحتوي هذا المستند على أوامر Heroku CLI الشائعة التي يمكنك استخدامها في موجه الأوامر Windows لإدارة تطبيقات Heroku الخاصة بك.

## المتطلبات الأساسية

1. قم بتثبيت Heroku CLI من: https://devcenter.heroku.com/articles/heroku-cli
2. سجل الدخول إلى Heroku: `heroku login`

## إدارة التطبيقات

### عرض جميع تطبيقاتك
```cmd
heroku apps
```

### إنشاء تطبيق جديد
```cmd
heroku create your-app-name
```

### استنساخ تطبيق موجود
```cmd
heroku git:clone -a your-app-name
```

### إعادة تسمية تطبيق
```cmd
heroku apps:rename new-app-name -a old-app-name
```

### حذف تطبيق
```cmd
heroku apps:destroy your-app-name --confirm your-app-name
```

### فتح تطبيقك في المتصفح
```cmd
heroku open -a your-app-name
```

## متغيرات البيئة

### عرض جميع متغيرات البيئة للتطبيق
```cmd
heroku config -a your-app-name
```

### عرض متغير بيئة محدد
```cmd
heroku config:get VARIABLE_NAME -a your-app-name
```

### تعيين متغير بيئة واحد
```cmd
heroku config:set VARIABLE_NAME=value -a your-app-name
```

### تعيين عدة متغيرات بيئة
```cmd
heroku config:set VARIABLE1=value1 VARIABLE2=value2 -a your-app-name
```

### إزالة متغير بيئة
```cmd
heroku config:unset VARIABLE_NAME -a your-app-name
```

### تعيين متغيرات البيئة من ملف .env
```cmd
heroku config:set $(cat .env | tr '\n' ' ') -a your-app-name
```

## النشر

### النشر إلى Heroku (إذا كنت تستخدم Git)
```cmd
git push heroku main
```

### النشر إلى Heroku (إذا كنت تستخدم فرع master)
```cmd
git push heroku master
```

### النشر القسري (استبدال التغييرات البعيدة)
```cmd
git push heroku main --force
```

### نشر فرع محدد
```cmd
git push heroku your-branch:main
```

## السجلات والمراقبة

### عرض السجلات في الوقت الفعلي
```cmd
heroku logs --tail -a your-app-name
```

### عرض السجلات الحديثة
```cmd
heroku logs -a your-app-name
```

### عرض السجلات لعدد محدد من الأسطر
```cmd
heroku logs -n 200 -a your-app-name
```

### عرض السجلات لفترة زمنية محددة
```cmd
heroku logs --since 1h -a your-app-name
```

## Dynos والتوسع

### فحص حالة Dyno
```cmd
heroku ps -a your-app-name
```

### توسيع web dynos
```cmd
heroku ps:scale web=1 -a your-app-name
```

### توسيع worker dynos
```cmd
heroku ps:scale worker=1 -a your-app-name
```

### إعادة تشغيل جميع dynos
```cmd
heroku restart -a your-app-name
```

### إعادة تشغيل dyno محدد
```cmd
heroku restart web.1 -a your-app-name
```

## قاعدة البيانات

### فتح وحدة تحكم قاعدة البيانات
```cmd
heroku pg:psql -a your-app-name
```

### نسخ احتياطي لقاعدة البيانات
```cmd
heroku pg:backups:capture -a your-app-name
```

### تحميل نسخة احتياطية لقاعدة البيانات
```cmd
heroku pg:backups:download -a your-app-name
```

### استعادة قاعدة البيانات من النسخة الاحتياطية
```cmd
heroku pg:backups:restore b001 -a your-app-name
```

## الإضافات

### عرض الإضافات
```cmd
heroku addons -a your-app-name
```

### تثبيت إضافة
```cmd
heroku addons:create heroku-postgresql:hobby-dev -a your-app-name
```

### إزالة إضافة
```cmd
heroku addons:destroy heroku-postgresql -a your-app-name
```

## الصيانة

### تفعيل وضع الصيانة
```cmd
heroku maintenance:on -a your-app-name
```

### إلغاء تفعيل وضع الصيانة
```cmd
heroku maintenance:off -a your-app-name
```

### فحص حالة الصيانة
```cmd
heroku maintenance -a your-app-name
```

## استكشاف الأخطاء

### فحص حالة التطبيق
```cmd
heroku apps:info -a your-app-name
```

### عرض سجلات البناء
```cmd
heroku builds -a your-app-name
```

### فحص حالة البناء
```cmd
heroku builds:info -a your-app-name
```

### تشغيل dyno لمرة واحدة
```cmd
heroku run bash -a your-app-name
```

### تشغيل أمر محدد
```cmd
heroku run npm start -a your-app-name
```

## نصائح مفيدة

1. **حدد دائماً اسم التطبيق** مع `-a your-app-name` لتجنب الالتباس
2. **استخدم `--tail` للسجلات** لرؤية التحديثات في الوقت الفعلي
3. **تحقق من حالة dyno** قبل التوسع أو إعادة التشغيل
4. **احفظ نسخة احتياطية من قاعدة البيانات** قبل إجراء تغييرات كبيرة
5. **استخدم وضع الصيانة** للتوقف المخطط

## المشاكل الشائعة

### التطبيق غير موجود
- تحقق من تسجيل الدخول: `heroku auth:whoami`
- تحقق من اسم التطبيق: `heroku apps`
- تحقق من إمكانية الوصول للتطبيق

### فشل النشر
- تحقق من سجلات البناء: `heroku builds -a your-app-name`
- تحقق من صحة ملف Procfile
- تحقق من وجود جميع التبعيات في package.json

### مشاكل الاتصال بقاعدة البيانات
- تحقق من تفعيل إضافة قاعدة البيانات: `heroku addons -a your-app-name`
- تحقق من رابط قاعدة البيانات: `heroku config:get DATABASE_URL -a your-app-name`
- اختبر الاتصال: `heroku pg:psql -a your-app-name` 