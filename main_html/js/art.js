// art.js文件内容
// 获取模态窗口和图片元素
const modal = document.getElementById("myModal");
const modalImg = document.getElementById("modalImg");

// 打开模态窗口并显示图片
function openModal(src) {
    modal.style.display = "block";
    modalImg.src = src;
}

// 关闭模态窗口
function closeModal() {
    modal.style.display = "none";
}

// 点击模态窗口外部也可以关闭
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
});

// 为图片添加点击事件，显示模态窗口
document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll('img');
    images.forEach(image => {
        image.addEventListener('click', function() {
            openModal(this.src);
        });
    });
});