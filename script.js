// Get your API key from NewsAPI and replace it here
const apiKey = 'a69a2cc311bc44b0aa9c17ef08447b95'; // Public API key for testing
const newsContainer = document.getElementById('news-container');

// Fetch news data
async function fetchNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
    console.log(`Fetching news from URL: ${url}`); // Log the API URL for debugging

    try {
        const response = await fetch(url);

        console.log(`Response status: ${response.status}`); // Log status code
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(`API response data:`, data); // Log API response for debugging

        if (data.status === 'ok') {
            displayNews(data.articles);
        } else {
            newsContainer.innerHTML = '<p>Unable to load news at this time.</p>';
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        newsContainer.innerHTML = '<p>There was an error loading news. Please check the console for details.</p>';
    }
}

// Display the news articles
function displayNews(articles) {
    newsContainer.innerHTML = '';  // Clear any previous content

    articles.forEach(article => {
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card';

        const imageUrl = article.urlToImage ? article.urlToImage : 'https://via.placeholder.com/300x150';
        const newsHTML = `
            <img src="${imageUrl}" alt="${article.title}">
            <h3>${article.title}</h3>
            <p>${article.description ? article.description : 'No description available.'}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;

        newsCard.innerHTML = newsHTML;
        newsContainer.appendChild(newsCard);
    });
}

// Fetch news when the page loads
window.onload = () => {
    fetchNews();
};
