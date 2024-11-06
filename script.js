const pickerBtn = document.querySelector('#picker-btn');
const exportBtn = document.querySelector('#export-btn');
const clearBtn = document.querySelector('#clear-btn');
const colorList = document.querySelector('.all-colors');

let pickedColors = JSON.parse(localStorage.getItem("color-list")) || [];

let currentPopUp = null;

const copyToClipboard = async (text, element) => {
    try {
        await navigator.clipboard.writeText(text);
        element.innerText = "Copied!";
        setTimeout(() => {
            element.innerText = text;
        }, 1000);
    } catch (err) {
        alert("Failed to copy text!");
    }
};

const exportColor = () => {
    const colorText = pickedColors.join("\n");
    const blob = new Blob([colorText], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = 'Colors.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

const createColorPopUp = (color) => {
    const popup = document.createElement("div");
    popup.classList.add("color-popup");
    popup.innerHTML = `
        <div class="color-popup-content">
            <span class="close-popup"></span>
            <div class="color-info">
                <div class="color-preview" style="background: ${color};"></div>
                <div class="color-details">
                    <div class="color-value">
                        <span class="label">Hex:</span>
                        <span class="value hex" data-color="${color}">${color}</span>
                    </div>
                    <div class="color-value">
                        <span class="label">RGB:</span>
                        <span class="value rgb" data-color="${hexToRgb(color)}">${hexToRgb(color)}</span>
                    </div>
                </div>
            </div>
        </div>
    `;


    // Close Button inside of the PopUp

    const closePopUp = popup.querySelector(".close-popup");
    closePopUp.addEventListener('click', () => {
        document.body.removeChild(popup);
        currentPopUp = null;
    });


    // Event Listeners to copy color values to the clipboard

    const colorValues = popup.querySelectorAll(".value");
    colorValues.forEach((value) => {
        value.addEventListener('click', (e) => {
            const text = e.currentTarget.innerText;
            copyToClipboard(text, e.currentTarget);
        });
    });

    return popup;
};

const showColors = () => {
    colorList.innerHTML = pickedColors.map(color =>
        `<li class="color">
            <span class="rect" style="background:${color}; border: 1px solid ${color === '#ffffff' ? '#ccc' : color};"></span>
            <span class="value hex" data-color="${color}">${color}</span>
        </li>`
    ).join("");

    const colorElements = document.querySelectorAll(".color");
    colorElements.forEach((li) => {
        const colorHex = li.querySelector(".value.hex");
        colorHex.addEventListener('click', (e) => {
            const color = e.currentTarget.dataset.color;
            if (currentPopUp) {
                document.body.removeChild(currentPopUp);
            }
            const popup = createColorPopUp(color);
            document.body.appendChild(popup);
            currentPopUp = popup;
        });
    });

    const pickedColorsContainer = document.querySelector(".color-list");
    pickedColorsContainer.classList.toggle("hide", pickedColors.length === 0);
};

const hexToRgb = (hex) => {
    const bigInt = parseInt(hex.slice(1), 16);
    const r = (bigInt >> 16) & 255;
    const g = (bigInt >> 8) & 255;
    const b = bigInt & 255;
    return `rgb(${r}, ${g}, ${b})`;
};

const activateEyeDropper = async () => {
    document.body.style.display = "none";
    try {
        const { sRGBHex } = await new EyeDropper().open();
        if (!pickedColors.includes(sRGBHex)) {
            pickedColors.push(sRGBHex);
            localStorage.setItem("color-list", JSON.stringify(pickedColors));
        }
        showColors();
    } catch (err) {
        alert("Failed to pick color!");
    } finally {
        document.body.style.display = "block";
    }
};

const clearAll = () => {
    pickedColors = [];
    localStorage.removeItem("color-list");
    showColors();
};

pickerBtn.addEventListener('click', activateEyeDropper);
clearBtn.addEventListener('click', clearAll);
exportBtn.addEventListener('click', exportColor);

showColors();





