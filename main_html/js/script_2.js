
// 获取 canvas 元素
const canvas = document.getElementById('particle-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');

    // 设置 canvas 尺寸
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 中国传统颜色数组
    const chineseTraditionalColors = [
        '#FFE4B5', // 象牙白
        '#FFD700', // 金色
        '#8A3324', // 褐色
        '#003366', // 藏青色
        '#FFA500', // 橙色
        '#DA70D6', // 紫罗兰色
        '#008080'  // 水鸭色
    ];

    // 丝绸粒子类
    class SilkParticle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * -canvas.height; // 从屏幕上方开始
            this.width = Math.random() * 50 + 30; // 增加丝绸的宽度
            this.height = Math.random() * 100 + 50; // 丝绸的长度
            this.speedY = Math.random() * 0.5 + 0.2; // 降低下落速度
            this.opacity = Math.random() * 0.3 + 0.1; // 增加透明度
            const colorHex = chineseTraditionalColors[Math.floor(Math.random() * chineseTraditionalColors.length)];
            const r = parseInt(colorHex.slice(1, 3), 16);
            const g = parseInt(colorHex.slice(3, 5), 16);
            const b = parseInt(colorHex.slice(5, 7), 16);
            this.color = `rgba(${r}, ${g}, ${b}, ${this.opacity})`; // 随机选择中国传统颜色并添加透明度
            this.waveOffset = Math.random() * Math.PI * 2; // 摆动偏移量
            // 降低摆动速度，让蠕动频率更低
            this.waveSpeed = Math.random() * 0.02 + 0.005; 
            this.waveAmplitude = Math.random() * 20 + 10; // 摆动幅度
        }

        update() {
            this.y += this.speedY;
            this.waveOffset += this.waveSpeed;

            // 如果丝绸超出屏幕底部，重新回到屏幕上方
            if (this.y > canvas.height) {
                this.y = Math.random() * -canvas.height;
                this.x = Math.random() * canvas.width;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 5; // 增加线条宽度

            const startX = this.x - this.width / 2;
            const endX = this.x + this.width / 2;
            const controlX1 = this.x + Math.sin(this.waveOffset) * this.waveAmplitude;
            const controlY1 = this.y + this.height / 3;
            const controlX2 = this.x - Math.sin(this.waveOffset + Math.PI / 2) * this.waveAmplitude;
            const controlY2 = this.y + this.height * 2 / 3;

            ctx.moveTo(startX, this.y);
            ctx.bezierCurveTo(controlX1, controlY1, controlX2, controlY2, endX, this.y + this.height);
            ctx.stroke();
            ctx.closePath();
        }
    }

    // 创建丝绸粒子数组
    const silkParticles = [];
    const particleCount = Math.min(window.innerWidth * window.innerHeight / 10000, 100); // 减少粒子数量
    for (let i = 0; i < particleCount; i++) {
        silkParticles.push(new SilkParticle());
    }

    // 动画循环
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < silkParticles.length; i++) {
            const particle = silkParticles[i];
            particle.update();
            particle.draw();
        }

        requestAnimationFrame(animate);
    }

    animate();

    // 监听窗口大小变化
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // 调整粒子数量
        const newParticleCount = Math.min(window.innerWidth * window.innerHeight / 10000, 100);
        if (newParticleCount > silkParticles.length) {
            for (let i = silkParticles.length; i < newParticleCount; i++) {
                silkParticles.push(new SilkParticle());
            }
        } else if (newParticleCount < silkParticles.length) {
            silkParticles.length = newParticleCount;
        }
    });
}

// 获取箭头元素
const arrow = document.getElementById('scroll-to-bottom-arrow');
if (arrow) {
    // 监听箭头的点击事件
    arrow.addEventListener('click', () => {
        // 获取页面的总高度
        const scrollHeight = document.documentElement.scrollHeight;
        // 滚动到页面底部
        window.scrollTo({
            top: scrollHeight,
            behavior: 'smooth' // 平滑滚动效果
        });
    });
}

// 展期倒计时
const countdownElement = document.getElementById('countdown-timer');
if (countdownElement) {
    const endDate = new Date('2024-02-15T23:59:59').getTime();

    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = endDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `${days} 天 ${hours} 小时 ${minutes} 分钟 ${seconds} 秒`;

        if (distance < 0) {
            clearInterval(countdownInterval);
            countdownElement.innerHTML = '展期已结束';
        }
    }, 1000);
}

const carouselInner = document.querySelector('.carousel-inner');
const carouselPrev = document.querySelector('.carousel-prev');
const carouselNext = document.querySelector('.carousel-next');
const carouselImages = document.querySelectorAll('.carousel-inner img');

if (carouselInner && carouselPrev && carouselNext && carouselImages.length > 0) {
    let currentIndex = 0;
    const slideWidth = carouselImages[0].clientWidth;

    function slideTo(index) {
        carouselInner.style.transform = `translateX(-${index * slideWidth}px)`;
        currentIndex = index;
    }

    carouselPrev.addEventListener('click', () => {
        if (currentIndex > 0) {
            slideTo(currentIndex - 1);
        }
    });

    carouselNext.addEventListener('click', () => {
        if (currentIndex < carouselImages.length - 1) {
            slideTo(currentIndex + 1);
        }
    });
}

// 模拟用户上传的照片
const photoWall = document.getElementById('photo-wall');
const photoUrls = [
    '../main_html/images/2025非遗.jpg',
    '../main_html/images/皮影.jpg',
    '../main_html/images/舞狮.jpg',
    '../main_html/images/图.jpg',
    '../main_html/images/伞.jpg',
	'../main_html/images/刺绣.png'
];

photoUrls.forEach(url => {
    const img = document.createElement('img');
    img.src = url;
    photoWall.appendChild(img);
});

// 模拟微博实时流
const weiboStream = document.getElementById('weibo-stream');
const weiboData = [
    {
        user: '用户1',
        content: '#我的非遗故事# 今天参观了当地的剪纸非遗工坊，太精彩了！'
    },
    {
        user: '用户2',
        content: '#我的非遗故事# 学习了传统刺绣，感觉自己离非遗更近了一步。'
    },
    {
        user: '用户3',
        content: '#我的非遗故事# 参加了一场精彩的皮影戏表演，太震撼了！'
    }
];

weiboData.forEach(post => {
    const postElement = document.createElement('p');
    postElement.innerHTML = `<strong>${post.user}</strong>: ${post.content}`;
    weiboStream.appendChild(postElement);
});