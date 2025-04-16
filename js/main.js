// 等待文档加载完成
document.addEventListener('DOMContentLoaded', function() {
  // 导航菜单切换功能
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }
  
  // 倒计时功能
  const countdownElement = document.getElementById('countdown');
  if (countdownElement) {
    // 活动开始日期：2025年4月30日
    const eventDate = new Date('2025-04-30T00:00:00').getTime();
    
    // 更新倒计时
    function updateCountdown() {
      const now = new Date().getTime();
      const timeLeft = eventDate - now;
      
      if (timeLeft <= 0) {
        countdownElement.textContent = '活动已开始！';
      } else {
        // 计算时间差
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        // 更新显示
        countdownElement.textContent = `距离活动开始还剩：${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒`;
      }
    }
    
    // 立即执行一次
    updateCountdown();
    
    // 每秒更新一次
    setInterval(updateCountdown, 1000);
  }
  
  // 添加平滑滚动
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // 如果是移动设备且导航菜单是打开的，关闭导航菜单
        if (window.innerWidth <= 768 && nav && nav.classList.contains('active')) {
          nav.classList.remove('active');
          menuToggle.classList.remove('active');
        }
        
        // 滚动到目标元素
        window.scrollTo({
          top: targetElement.offsetTop - 80, // 减去导航栏高度
          behavior: 'smooth'
        });
      }
    });
  });
  
  // 固定导航栏效果
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
  
  // 日程选项卡切换功能
  const tabButtons = document.querySelectorAll('.schedule__tab-btn');
  const tabContents = document.querySelectorAll('.schedule__tab-content');
  
  if (tabButtons.length && tabContents.length) {
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // 移除所有激活状态
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // 添加当前按钮的激活状态
        button.classList.add('active');
        
        // 获取对应的内容并激活
        const dayId = button.getAttribute('data-day');
        const activeContent = document.getElementById(dayId);
        
        if (activeContent) {
          activeContent.classList.add('active');
        }
      });
    });
  }
  
  // 卡片和按钮的悬停效果增强
  const interactiveElements = document.querySelectorAll('.card, .guest-card, .ticket-card, .partners__logo');
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
      this.style.boxShadow = '0 12px 40px var(--color-card-shadow)';
    });
    
    element.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.boxShadow = '';
    });
  });
  
  // 添加窗口调整大小时的处理
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      // 如果在大屏幕尺寸时关闭了移动菜单
      if (window.innerWidth > 768 && nav) {
        nav.classList.remove('active');
        if (menuToggle) menuToggle.classList.remove('active');
      }
    }, 250);
  });
}); 