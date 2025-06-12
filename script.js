// ✅ عداد تنازلي للتسجيل (ينتهي بعد 5 أيام من الآن)
// يحدد تاريخ انتهاء العد التنازلي. يمكن تعديل هذا التاريخ ليكون ثابتاً إذا كان الكورس له تاريخ محدد.
const countdownTarget = new Date();
countdownTarget.setDate(countdownTarget.getDate() + 5); // يضاف 5 أيام من وقت التحميل الحالي

let countdownIntervalId; // لتخزين معرف الـ interval لتمكين إيقافه

function updateCountdown() {
    const countdownElement = document.getElementById('countdown');

    // تحقق من وجود العنصر قبل محاولة التفاعل معه لتجنب الأخطاء
    if (!countdownElement) {
        console.warn("عنصر العد التنازلي (id='countdown') غير موجود في الصفحة.");
        // إذا لم يتم العثور على العنصر، لا داعي للاستمرار في تحديث العداد
        if (countdownIntervalId) {
            clearInterval(countdownIntervalId);
        }
        return;
    }

    const now = new Date();
    const diff = countdownTarget - now;

    if (diff <= 0) {
        countdownElement.innerHTML = '<span class="text-danger">انتهى التسجيل!</span>';
        // إذا انتهى العد التنازلي، توقف عن تحديثه لمنع استهلاك الموارد بلا داعي
        clearInterval(countdownIntervalId);
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdownElement.innerHTML = `
        <div><span class="fw-bold">${days}</span> يوم</div>
        <div><span class="fw-bold">${hours}</span> ساعة</div>
        <div><span class="fw-bold">${minutes}</span> دقيقة</div>
        <div><span class="fw-bold">${seconds}</span> ثانية</div>
    `;
}

// تشغيل الدالة فوراً عند تحميل الصفحة ثم تكرارها كل ثانية
countdownIntervalId = setInterval(updateCountdown, 1000);
updateCountdown();


// ✅ عداد الطلاب (يتكرر مرتين فقط)
function animateStudentsCount(id, target, repeat = 2) {
    let count = 0;
    // سرعة متوسطة تعتمد على حجم الهدف. لعدد 1200، الخطوة تكون 12.
    // يمكن تعديل 100 لضبط السرعة (قيمة أقل = أسرع)
    const step = Math.ceil(target / 100); 
    const el = document.getElementById(id);
    let iterations = 0;
    let currentInterval; // لتخزين معرف الـ interval لتمكين إيقافه

    // تحقق من وجود العنصر قبل البدء في الرسوم المتحركة
    if (!el) {
        console.warn(`عنصر عداد الطلاب (id='${id}') غير موجود في الصفحة.`);
        return;
    }

    function startAnimation() {
        count = 0; // إعادة تعيين العداد لكل تكرار
        currentInterval = setInterval(() => {
            count += step;
            if (count >= target) {
                el.textContent = target; // تأكد من الوصول للرقم المستهدف بدقة
                clearInterval(currentInterval); // توقف العداد الحالي
                iterations++;
                if (iterations < repeat) {
                    setTimeout(startAnimation, 5000); // إعادة التشغيل بعد 5 ثواني
                }
            } else {
                el.textContent = count;
            }
        }, 40); // سرعة تحديث العداد (كل 40 ميلي ثانية)
    }

    startAnimation();
}

// ✅ التشغيل مرتين فقط لعداد الطلاب
// بناءً على كود HTML المقدم، هناك عنصر واحد فقط بمعرف 'students-count-badge'
animateStudentsCount('students-count-badge', 1200, 2);

// إذا كان هناك عنصر آخر بمعرف 'students-count' غير ظاهر في HTML،
// يمكنك إلغاء التعليق عن السطر التالي أو حذفه إذا لم يكن مستخدمًا
// animateStudentsCount('students-count', 1200, 2);