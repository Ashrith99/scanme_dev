import scanme_img from '../pictures/scanme_img.png';
import suraj_img from '../pictures/suraj_img.png';

export const generalpics = {
  scanme_img,
  suraj_img,
};

const API_KEY = 'AIzaSyA6SFA1LGwRimgKm88YUVNOj2uSzX2d5JI';
const SPREADSHEET_ID = '1bqduhfi5bmOipO0jYCTNa-xOQrHYr3Z6JADXf2AMfyY';
const RANGE = 'Sheet1!A2:H';

function convertDriveUrlToDirect(url) {
    if (!url) return '';

    const driveFileId = url.match(/[-\w]{25,}/);
    if (!driveFileId) return url;

    return `https://drive.google.com/uc?export=view&id=${driveFileId[0]}`;
}

function convertDriveUrlToThumbnail(url) {
    if (!url) return '';

    const driveFileId = url.match(/[-\w]{25,}/);
    if (!driveFileId) return url;

    return `https://drive.google.com/thumbnail?id=${driveFileId[0]}`;
}

export async function fetchSpreadsheetData() {
    try {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.values) {
            throw new Error('No data found in spreadsheet');
        }

        return data.values;
    } catch (error) {
        console.error('Error fetching spreadsheet data:', error);
        throw error;
    }
}

export async function loadMenuData() {
    try {
        const rows = await fetchSpreadsheetData();

        const menuItems = rows.map((row) => ({
            id: parseInt(row[0]),
            category: row[1],
            name: row[2],
            price: row[3],
            video: convertDriveUrlToThumbnail(row[4]),
            image: convertDriveUrlToThumbnail(row[5]),
            desc: row[6],
            // Convert the combinations string to an array and filter valid combinations
            combinations: row[7] 
                ? row[7].split(',')
                      .map((comb) => comb.trim())
                      .filter((comb) => comb.length > 0) // Filter empty combinations
                : [],
        }));

        return menuItems;
    } catch (error) {
        console.error('Error loading menu data:', error);
        throw error;
    }
}

export async function initializeMedia() {
    try {
        const mediaData = await loadMenuData();
        const images = mediaData.map(item => item.image);
        const videos = mediaData.map(item => item.video);
        console.log(images);
        console.log(videos);
    } catch (error) {
        console.error('Error initializing media:', error);
    }
}
