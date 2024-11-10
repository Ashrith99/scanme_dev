import express from 'express';
import axios from 'axios';
import { loadMenuData } from './path/to/pictures'; // Adjust the path as needed

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Function to fetch media (image or video) from a URL and convert it to Base64
const fetchMediaAsBase64 = async (url) => {
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'arraybuffer',
    });

    const base64Media = Buffer.from(response.data, 'binary').toString('base64');
    const contentType = response.headers['content-type'];

    return data:${contentType};base64,${base64Media};
  } catch (error) {
    console.error('Error fetching media:', error.message);
    throw error;
  }
};

// Endpoint to fetch all media (images and videos) from Google Sheets, convert them to Base64, and send to client
app.get('/fetch-media', async (req, res) => {
  try {
    const menuItems = await loadMenuData();

    const mediaUrls = [
      ...menuItems.map(item => item.image),
      ...menuItems.map(item => item.video),
    ].filter(Boolean); // Filter out empty or undefined URLs

    const mediaPromises = mediaUrls.map(fetchMediaAsBase64);
    const mediaBase64 = await Promise.all(mediaPromises);

    res.json({ mediaBase64 });
  } catch (error) {
    console.error('Error fetching media:', error);
    res.status(500).json({ error: 'Failed to fetch media' });
  }
});

app.listen(PORT, () => {
  console.log(Server is running on http://localhost:${PORT});
});