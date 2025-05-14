document.querySelectorAll('.thumbnails img').forEach(thumb => {
  thumb.addEventListener('click', function () {
    const mainImg = document.querySelector('.image-section img');
    const temp = mainImg.src;
    mainImg.src = this.src;
    this.src = temp;
  });
});
