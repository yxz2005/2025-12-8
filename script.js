document.addEventListener('DOMContentLoaded', function() {
    const snowContainer = document.getElementById('snow-container');
    const snowCount = 40;
    let screenWidth = window.innerWidth;

    function getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }

    function createSnowflakes() {
        snowContainer.innerHTML = '';
        
        for (let i = 0; i < snowCount; i++) {
            const snowflake = document.createElement('div');
            snowflake.classList.add('snowflake');

            snowflake.style.left = `${getRandom(0, screenWidth)}px`;
            const size = getRandom(10, 25);
            snowflake.style.width = `${size}px`;
            snowflake.style.height = `${size}px`;
            const duration = getRandom(20, 40);
            snowflake.style.animationDuration = `${duration}s`;
            const delay = getRandom(0, 15);
            snowflake.style.animationDelay = `${delay}s`;
            snowflake.style.opacity = getRandom(0.7, 0.9);

            snowContainer.appendChild(snowflake);

            setTimeout(() => {
                resetSnowflake(snowflake);
                setInterval(() => resetSnowflake(snowflake), duration * 1000);
            }, (duration + delay) * 1000);
        }
    }

    function resetSnowflake(snowflake) {
        snowflake.style.left = `${getRandom(0, screenWidth)}px`;
        snowflake.style.top = '-50px';
        const newSize = getRandom(10, 25);
        snowflake.style.width = `${newSize}px`;
        snowflake.style.height = `${newSize}px`;
        snowflake.style.animationDuration = `${getRandom(20, 40)}s`;
        snowflake.style.animationDelay = '0s';
    }

    createSnowflakes();

    window.addEventListener('resize', function() {
        screenWidth = window.innerWidth;
        createSnowflakes();
    });
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('show');
        this.querySelector('i').classList.toggle('ri-menu-line');
        this.querySelector('i').classList.toggle('ri-close-line');
    });
    const navLinkItems = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    navLinkItems[0].classList.add('active');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150) && scrollY < (sectionTop + sectionHeight - 200)) {
                current = section.getAttribute('id');
            }
        });
        navLinkItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
            if (window.scrollY < 100) {
                navLinkItems.forEach(i => i.classList.remove('active'));
                navLinkItems[0].classList.add('active');
            }
        });
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.padding = '0.8rem 0';
                navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            } else {
                navbar.style.padding = '1rem 0';
                navbar.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
            }
        }
        const backToTop = document.querySelector('.back-to-top');
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                navLinks.classList.remove('show');
                mobileMenuBtn.querySelector('i').classList.add('ri-menu-line');
                mobileMenuBtn.querySelector('i').classList.remove('ri-close-line');
                navLinkItems.forEach(item => item.classList.remove('active'));
                this.classList.add('active');
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    const backToTopBtn = document.querySelector('.back-to-top');
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        navLinkItems.forEach(item => item.classList.remove('active'));
        navLinkItems[0].classList.add('active');
    });
    const filterBtns = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            blogCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    const loadMoreBtn = document.querySelector('.load-btn');
    loadMoreBtn.addEventListener('click', function() {
        this.innerHTML = '<i class="ri-loader-3-line"></i> 加载中...';
        this.disabled = true;

        setTimeout(() => {
            this.innerHTML = '<i class="ri-refresh-line"></i> 加载更多';
            this.disabled = false;
            alert('已加载全部内容～');
        }, 2000);
    });
    const contactForm = document.querySelector('.contact-form form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const verifyCode = document.getElementById('verify').value;
        if (verifyCode !== '8697') {
            alert('验证码错误！正确验证码是8697～');
            return;
        }
        
        // 模拟提交成功
        alert(`🎉 感谢${name}的留言，我会尽快回复你（${email}）！`);
        this.reset();
    });

});
