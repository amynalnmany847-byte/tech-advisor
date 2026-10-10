// قاعدة بيانات أفكار المشاريع التفاعلية
const projectIdeas = {
    web: {
        title: "منصة السوق الذكية المتكاملة",
        desc: "نظام إلكتروني لعرض المنتجات مع واجهة مستخدم متجاوبة، نظام مصادقة، وإدارة طلبات للعملاء.",
        tech: "HTML, CSS Flexbox, JavaScript, LocalStorage"
    },
    tracking: {
        title: "نظام تتبع وحجز الرحلات الفورية",
        desc: "تطبيق ويب لمحاكاة تتبع مسارات الحافلات وإدارة حجز التذاكر برقم مرجعي وعرض التقارير.",
        tech: "JavaScript (DOM Manipulation), CSS Grid, APA Documentation structure"
    },
    management: {
        title: "نظام إدارة المكتبات والموارد",
        desc: "تطبيق لإدارة مخزون الكتب، عمليات الاستعارة، وتخصيص صلاحيات المستخدمين (مشرف ومستخدم عادي).",
        tech: "Object-Oriented Programming Logic, Relational Database simulation"
    },
    tourism: {
        title: "نظام إدارة السياحة والفرق السياحية",
        desc: "منصة لتنظيم الرحلات السياحية، إدارة بيانات الأفواج، وتوزيع المهام على المرشدين السياحيين.",
        tech: "System Analysis & Design, Responsive UI, JavaScript Interactive Forms"
    }
};

// 1. توليد فكرة المشروع
document.getElementById('generateBtn').addEventListener('click', function() {
    const domain = document.getElementById('domainSelect').value;
    const idea = projectIdeas[domain];
    const resultBox = document.getElementById('ideaResult');

    resultBox.innerHTML = `
        <h3>📌 ${idea.title}</h3>
        <p><strong>الوصف:</strong> ${idea.desc}</p>
        <p><strong>التقنيات المقترحة:</strong> ${idea.tech}</p>
    `;
    resultBox.classList.remove('hidden');
});

// 2. حاسبة نطاق المشروع
document.getElementById('calcBtn').addEventListener('click', function() {
    const type = document.getElementById('systemType').value;
    const calcResult = document.getElementById('calcResult');
    
    let timeEstimate = "";
    let complexityText = "";

    if(type === 'small') {
        complexityText = "بسيط (مناسب للتنفيذ السريع)";
        timeEstimate = "من 3 إلى 5 أيام عمل";
    } else if(type === 'medium') {
        complexityText = "متوسط (يحتاج تنظيم واجهات وقواعد بيانات فرعية)";
        timeEstimate = "من أسبوعين إلى 3 أسابيع";
    } else {
        complexityText = "متقدم (يتطلب هندسة برمجيات وتحليل نظم دقيق)";
        timeEstimate = "أكثر من شهر من العمل المستمر";
    }

    calcResult.innerHTML = `
        <p><strong>تقييم التعقيد:</strong> ${complexityText}</p>
        <p><strong>المدد التقريبية للتطوير:</strong> ${timeEstimate}</p>
    `;
    calcResult.classList.remove('hidden');
});

// 3. متتبع المهام (Tasks Tracker) مع حفظ البيانات
document.addEventListener('DOMContentLoaded', loadTasks);

document.getElementById('addTaskBtn').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if(taskText === "") return;

    addTaskToDOM(taskText, false);
    saveTasksToStorage();
    taskInput.value = "";
});

function addTaskToDOM(text, isCompleted) {
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.className = `task-item ${isCompleted ? 'completed' : ''}`;

    li.innerHTML = `
        <span>${text}</span>
        <div class="task-actions">
            <button class="complete-btn" title="تم الإنجاز">✔️</button>
            <button class="delete-btn" title="حذف">❌</button>
        </div>
    `;

    // زر إتمام المهمة
    li.querySelector('.complete-btn').addEventListener('click', function() {
        li.classList.toggle('completed');
        saveTasksToStorage();
    });

    // زر الحذف
    li.querySelector('.delete-btn').addEventListener('click', function() {
        li.remove();
        saveTasksToStorage();
    });

    taskList.appendChild(li);
}

function saveTasksToStorage() {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach(item => {
        tasks.push({
            text: item.querySelector('span').innerText,
            completed: item.classList.contains('completed')
        });
    });
    localStorage.setItem('project_tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const saved = localStorage.getItem('project_tasks');
    if(saved) {
        const tasks = JSON.parse(saved);
        tasks.forEach(t => addTaskToDOM(t.text, t.completed));
    }
}
