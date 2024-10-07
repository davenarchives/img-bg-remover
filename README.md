<h1>Image Background Remover</h1>

This project provides a simple web application that allows users to upload an image and automatically remove its background. It utilizes the [remove.bg](https://www.remove.bg/) API for processing images, making it easy for users to obtain images with transparent backgrounds.

## Screenshot
![Screenshot 2024-10-07 235919](https://github.com/user-attachments/assets/cb03c073-c29c-468e-8e30-cf0648d46182)


## Features

- **Drag and Drop Interface**: Users can drag and drop images directly onto the web page.
- **File Selection**: Alternatively, users can select images using a file chooser dialog.
- **Before and After Comparison**: View the original image alongside the processed image with the background removed.
- **Download Option**: Users can download the processed image with a transparent background.
- **Reset Functionality**: Clear the images and reset the interface for a new upload.

## Technologies Used

- **HTML**: For structuring the web application.
- **CSS**: For styling the application and ensuring a responsive design.
- **JavaScript**: For handling user interactions, file uploads, and API calls.
- **remove.bg API**: For processing images and removing backgrounds.

## Usage

1. **Upload an Image**:
   - Drag and drop an image onto the designated area or click the "Choose File" button to select an image from your computer.

2. **View Results**:
   - The original image will appear on the left, and the processed image (with the background removed) will appear on the right.

3. **Download the Image**:
   - Once the background has been removed, click the "Download Image" button to save the processed image to your device.

4. **Reset**:
   - If you want to upload a new image, click the "Reset" button to clear the current images and start over.

## API Key

The application uses the remove.bg API, which requires an API key for usage. Replace the placeholder API key in the `script.js` file with your own:

```javascript
headers: {
  'X-Api-Key': 'YOUR_API_KEY_HERE',
}
```

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.

## Author

Created by [DavenArchives](https://github.com/davenarchives)

