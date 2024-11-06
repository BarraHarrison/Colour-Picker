# Colour-Picker
This code creates a Chrome extension that allows you to pick colors from your screen and store them for later use. Here's a breakdown of the functionality:

# 1. Selecting Colors
The extension utilizes the EyeDropper API to access your screen and pick colors. Clicking the picker button (#picker-btn) triggers the activateEyeDropper function, which opens the eye dropper tool. Once you select a color, the chosen color code (in sRGBHex format) is retrieved and stored in the pickedColors array.

# 2. Storing and Managing Colors
The pickedColors array holds all the color codes you've picked. Local storage is used to persist the pickedColors array even after you refresh the page. The showColors function dynamically generates a list of color elements based on the pickedColors array. These elements display the color code and a colored rectangle preview.

# 3. Color Popups and Details
Clicking on a color element triggers the creation of a popup window. This popup displays the color in a larger preview, along with its Hex and RGB values. Clicking on the Hex or RGB value attempts to copy it to your clipboard.

# 4. Exporting Colors
Clicking the export button (#export-btn) triggers the exportColor function. This function creates a text file containing all the picked color codes (one color per line) and allows you to download it as "Colors.txt".

# 5. Clearing Colors
Clicking the clear button (#clear-btn) triggers the clearAll function. This function removes all the picked colors from the pickedColors array and local storage. It then refreshes the color list display.

# Additional Features
Proper color code formatting, including adding a border for better visibility on white backgrounds.
Avoids duplicate entries by ensuring a color is only added once.
Includes error handling for cases where the eye dropper fails to pick a color or copying to the clipboard encounters issues.
