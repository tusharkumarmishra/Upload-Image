const uploadBox = document.getElementById('uploadBox');
const fileInput = document.getElementById('fileInput');
const inputContainers = document.getElementById('inputContainers');

uploadBox.addEventListener('dragover', (event) => {
    event.preventDefault();
    uploadBox.style.backgroundColor = 'rgba(231, 76, 60, 0.1)';
});

uploadBox.addEventListener('dragleave', () => {
    uploadBox.style.backgroundColor = 'transparent';
});

uploadBox.addEventListener('drop', (event) => {
    event.preventDefault();
    uploadBox.style.backgroundColor = 'transparent';
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        handleFiles(files);
    }
});

fileInput.addEventListener('change', () => {
    const files = fileInput.files;
    if (files.length > 0) {
        handleFiles(files);
    }
});

function handleFiles(files) {
    for (const file of files) {
        const reader = new FileReader();
        reader.onload = (event) => {
            createInputContainer(event.target.result);
        };
        reader.readAsDataURL(file);
    }
}

function createInputContainer(imageSrc) {
    const inputContainer = document.createElement('div');
    inputContainer.classList.add('input-container', 'carousel-item'); 

    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = 'avatar';

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Add a description...';

    const actions = document.createElement('div');
    actions.classList.add('actions');

    const confirmButton = document.createElement('button');
    confirmButton.classList.add('confirm');
    confirmButton.innerHTML = '&#x2714;';
    // Display popup message with the description when the button is clicked
    confirmButton.onclick = () => {
        const description = input.value;
        alert(`hey! Your Description added: ${description}`);
    };

    const removeButton = document.createElement('button');
    removeButton.classList.add('remove');
    removeButton.innerHTML = '&#x2716;';
    removeButton.onclick = () => inputContainer.remove();

    actions.appendChild(confirmButton);
    actions.appendChild(removeButton);

    inputContainer.appendChild(img);
    inputContainer.appendChild(input);
    inputContainer.appendChild(actions);

    inputContainers.appendChild(inputContainer);
}