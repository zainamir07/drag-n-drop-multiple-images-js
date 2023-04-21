//Github Account https://github.com/zainamir07

let imageContainer = document.getElementById('img_container');
let imgInput = document.getElementById('imgInput');
let body = document.getElementById('drop_zone');

let imgArr = [];

function processing(){
    imgArr = [];
    for (let i = 0; i < imgInput.files.length; i++) {
         imgArr.push(imgInput.files[i]);
         console.log(imgInput.files[i]);
    }

    displayImage();
}

function displayImage(){
    if(imgArr){
        for (let j = 0; j < imgArr.length; j++) {
            imageContainer.classList.add('border');
            let imgUrl = URL.createObjectURL(imgArr[j]);
            let imgDiv = document.createElement('div');
            imgDiv.classList.add('imageDiv');
            let imgSrc = document.createElement('img');
            imgSrc.classList.add('image');
            imgSrc.style.width = '120px';
            imgSrc.src = imgUrl;
            imgDiv.append(imgSrc);
            imageContainer.append(imgDiv);
        }        
    }
}


function dropHandler(ev) {
    console.log('File(s) dropped');
    document.getElementById('dragcontent').innerHTML = 'Done! Drag More Files Here...';body.style.backgroundColor = '';
    body.style.border = '';
    
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
    if (ev.dataTransfer.items) {
        imgArr = [];
      // Use DataTransferItemList interface to access the file(s)
      [...ev.dataTransfer.items].forEach((item, i) => {
        // If dropped items aren't files, reject them
        if (item.kind === 'file') {
          const file = item.getAsFile();
          let filename = `… file[${i}].name = ${file.name}`;
          console.log(file);
          imgArr.push(file);
          var allowedExtensions = /(\.jfif|\.jpeg|\.png)$/i; 
          if (!allowedExtensions.exec(filename)) {
              alert('Not Extension Aloowed')
              return false;
          } 
        }
      });
      displayImage();
    } else {
      // Use DataTransfer interface to access the file(s)
      [...ev.dataTransfer.files].forEach((file, i) => {
        console.log(`… file[${i}].name = ${file.name}`);
      });
    }
    }
    
    function dragOverHandler(ev) {
    ev.preventDefault();

    // console.log('File(s) in drop zone');
    document.getElementById('dragcontent').innerHTML = 'Perfect! Drop Now';
    body.style.backgroundColor = '#00ffb8';
    body.style.border = '3px dotted black';
    }

    function dragleave(event){
     //Some code here after drag Leave
    document.getElementById('dragcontent').innerHTML = 'Or Drag n Drop your files anywhere...';
    body.style.backgroundColor = '';
    body.style.border = '';
    }


    function deleteAll(){
         if(imgArr.length == 0){
            alert('No Images Found');
         }else{
            imgArr = [];
            imgInput.value = '';
            imageContainer.innerHTML = '';
         }
    }