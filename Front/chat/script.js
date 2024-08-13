const selected = document.querySelector('.select-selected');
const items = document.querySelector('.select-items');

selected.addEventListener('click', () => {
    items.style.display = items.style.display === 'block' ? 'none' : 'block';
});

items.addEventListener('click', (e) => {
    selected.innerHTML = e.target.innerHTML;
    items.style.display = 'none';
});

document.addEventListener('click', (e) => {
    if (!selected.contains(e.target)) {
        items.style.display = 'none';
    }
});

const slider = document.getElementById('formalidadeSlider');
const label = document.getElementById('formalidadeLabel');
const minusBtn = document.querySelector('.minus-btn');
const plusBtn = document.querySelector('.plus-btn');
function updateFormalidadeLabel(value) {
    let labelText = '';
    if (value == 1) {
        labelText = 'Informal';
    } else if (value == 2) {
        labelText = 'Neutro';
    } else if (value == 3) {
        labelText = 'Formal';
    }
    label.textContent = `Formalidade: ${labelText}`;
}

slider.addEventListener('input', () => {
    updateFormalidadeLabel(slider.value);
    updateSliderBackground(slider.value);
});

minusBtn.addEventListener('click', () => {
    if (slider.value > 1) {
        slider.value = parseInt(slider.value) - 1;
        updateFormalidadeLabel(slider.value);
        updateSliderBackground(slider.value);
    }
});

plusBtn.addEventListener('click', () => {
    if (slider.value < 3) {
        slider.value = parseInt(slider.value) + 1;
        updateFormalidadeLabel(slider.value);
        updateSliderBackground(slider.value);
    }
});

// Chamada inicial para garantir que o rótulo e o background estejam corretos no carregamento
updateFormalidadeLabel(slider.value);
updateSliderBackground(slider.value);
function updateSliderBackground(value) {
    let background = '';
    if (value == 1) {
        background = 'linear-gradient(90deg, #a9a9a9 0%, #a9a9a9 33%)';
    } else if (value == 2) {
        background = 'linear-gradient(90deg, #a9a9a9 0%, #333 66%)';
    } else if (value == 3) {
        background = 'linear-gradient(90deg, #3a3a3a 0%, #3a3a3a 100%)';
    }
    slider.style.background = background;
}

// Chame a função no carregamento inicial para garantir que a cor da barra esteja correta:
updateSliderBackground(slider.value);

const darkModeBtn = document.querySelector('.dark-mode-btn');
darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});