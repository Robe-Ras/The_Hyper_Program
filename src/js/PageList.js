export const PageList = (argument = '') => {  
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, '-');

const PLATFORM_ICONS = {
  4: "windows.svg", // PC
  187: "ps4.svg", // PlayStation 5
  18: "ps4.svg", // PlayStation 4
  16: "ps4.svg", // PlayStation 3
  15: "ps4.svg", // PlayStation 2
  27: "ps4.svg", // PlayStation
  19: "ps4.svg", // PS Vita
  17: "ps4.svg", // PSP
  1: "xbox.svg", // Xbox One
  186: "xbox.svg", // Xbox Series S/X
  14: "xbox.svg", // Xbox 360
  80: "xbox.svg", // Xbox
  3: "mobile.svg", // iOS
  21: "mobile.svg", // Android
  6: "linux.svg", // Linux
  7: "switch.svg", // Nintendo Switch
};

const displayResults = (articles) => {
  const slicedArticles = articles.slice(0, 9); 
  const resultsContent = slicedArticles.map((article) => {
    const platformsIcons = article.platforms.map(platform => {
      const iconPath = PLATFORM_ICONS[platform.id] || 'error.svg'; 
      return `<img src="../src/assets/images/${iconPath}" alt="${article.name}" class="platform-icon">`;
    }).join('');

    return `<article class="cardGame">
      <img class="image_card" src="${article.background_image}" alt="Image de ${article.name}">
      <h1 class="title_card">${article.name}</h1>
      <div class="platforms">${platformsIcons}</div>
    </article>`;
  });
  const resultsContainer = document.querySelector('.page-list .articles');
  resultsContainer.innerHTML = resultsContent.join("\n");
};


    const fetchList = (url, argument) => {
      const finalURL = argument ? `${url}&search=${argument}` : `${url}&ordering=released`;
      fetch(finalURL)
        .then((response) => response.json())
        .then((responseData) => {
          displayResults(responseData.results);
        })
        .catch((error) => {
          console.log(error.message);
        }); 
    }; 

    fetchList(`https://api.rawg.io/api/games?key=${process.env.API_KEY}`, cleanedArgument);
  };

  const render = () => {
    const pageContent = document.querySelector('.page-content');
    pageContent.innerHTML = `
      <section class="page-list">
        <div class="articles">Loading...</div>
      </section>
    `;

    preparePage();
  };

  render();
};