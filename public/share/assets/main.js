const uploadBtn = document.querySelector('#upload')
upload.addEventListener('change', function() {
  const reader = new FileReader();
  const file = upload.files[0];

  reader.addEventListener('load', function() {
    const img = new Image();
    img.src = reader.result;

    img.addEventListener('load', function() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      const base64 = canvas.toDataURL('image/png');
      console.log(base64);
      imgUrl = base64
      setBackground(imgUrl)
    });
  });

  reader.readAsDataURL(file);
});

function setBackground(imgUrl) {
  const preview = document.querySelector('.preview')
  const realBg = document.querySelector('.real-bg')
  preview.style.backgroundImage = `url('${imgUrl}')`
  realBg.style.backgroundImage = `url('${imgUrl}')`
}

const themeNameInput = document.querySelector('#name')
themeNameInput.addEventListener('input', (e) => {
  const name = e.target.value
  const themeName = document.querySelector('.theme-name')
  themeName.innerText = name
})

const fontColorBtn = document.querySelector('#font-color')
fontColorBtn.addEventListener('click', () => {
  const titleNode = document.querySelector('.title')
  const themeNameNode = document.querySelector('.theme-name')
  if (titleNode.classList.contains('light')) {
    titleNode.classList.remove('light')
    themeNameNode.classList.remove('light')
  } else {
    titleNode.classList.add('light')
    themeNameNode.classList.add('light')
  }
})

const generateBtn = document.querySelector('#generate')
generateBtn.addEventListener('click', async () => {
  const target = document.querySelector('#preview')
  const canvas = await html2canvas(target)
  const url = canvas.toDataURL()
  
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = `share.png`;
  downloadLink.click();
})
