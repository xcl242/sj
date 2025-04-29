// JavaScript Document
const imgBtn = document.querySelector('.img__btn');
const cont = document.querySelector('.cont');
const signInForm = document.querySelector('.form.sign-in');
const signUpForm = document.querySelector('.form.sign-up');
// 获取用于显示登录和注册结果的元素
const loginMessage = document.getElementById('login-message');
const registerMessage = document.getElementById('register-message');

imgBtn.addEventListener('click', () => {
  cont.classList.toggle('s--signup');
});

// 处理注册表单提交
signUpForm.querySelector('button.submit').addEventListener('click', async () => {
  const nickname = signUpForm.querySelector('input[type="text"]').value;
  const account = signUpForm.querySelectorAll('input[type="text"]')[1].value;
  const password = signUpForm.querySelector('input[type="password"]').value;

  try {
    const response = await fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nickname, account, password })
    });
    const data = await response.json();
    registerMessage.textContent = data.message;
  } catch (error) {
    console.error('注册请求出错:', error);
    registerMessage.textContent = '注册请求出错，请稍后再试';
  }
});

// 处理登录表单提交
signInForm.querySelector('button.submit').addEventListener('click', async () => {
  const account = signInForm.querySelector('input[type="text"]').value;
  const password = signInForm.querySelector('input[type="password"]').value;

  try {
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ account, password })
    });

    const data = await response.json();

    if (response.status === 200) {
      // 登录成功，将用户名和头像路径存储到 localStorage 中
      localStorage.setItem('username', account);
      localStorage.setItem('avatar', data.avatar);

      // 登录成功，跳转回首页
      window.location.href = '../users_html/index.html'; 
    } else {
      // 登录失败，显示错误信息
      loginMessage.textContent = data.message;
    }
  } catch (error) {
    console.error('登录请求出错:', error);
    loginMessage.textContent = '登录请求出错，请稍后再试';
  }
});

// 处理头像更改
function changeAvatar() {
  const account = localStorage.getItem('username');
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '../users_html/屏幕截图 2025-04-26 182655.png';
  fileInput.addEventListener('change', async () => {
    const file = fileInput.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);
      formData.append('account', account);
      try {
        const response = await fetch('http://localhost:3001/change-avatar', {
          method: 'POST',
          body: formData
        });
        const data = await response.json();
        if (response.status === 200) {
          localStorage.setItem('avatar', data.avatar);
          const avatarDisplay = document.getElementById('avatar-display');
          avatarDisplay.src = `uploads/${data.avatar}`;
          alert('头像更改成功');
        } else {
          alert(`头像更改失败: ${data.message}`);
        }
      } catch (error) {
        console.error('头像更改请求出错:', error);
        alert(`头像更改请求出错，请稍后再试。具体错误: ${error.message}`);
      }
    }
  });
  fileInput.click();
}