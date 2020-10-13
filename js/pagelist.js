console.log("pagelist");
const PageList = (argument = "") => {
  console.log("Home", argument);

    const preparePage = () => {
      let cleanedArgument = argument.replace(/\s+/g, "-");
      let articles = "";
  
      const fetchList = (url, argument) => {
        let finalURL = url;
        if (argument) {
          finalURL = url + "?search=" + argument;
        }
  
        fetch(`${finalURL}`)
          .then((response) => response.json())
          .then((response) => {
            response.results.forEach((article) => {
              console.log(response);
              articles += `
                    <div class="card" style="width:25rem">
                      <img class="card-img-top" style=width:auto;max-width:25rem;height:auto;padding:1rem;" src="${article.background_image}">
                      <h1>${article.name}</h1>
                      <span>${article.platforms.map(system => {
                        return `<button>${system.platform.name}</button>`
                      }).join(' ')}</span>
                      <a href = "#pagedetail/${article.id}">${article.id}</a>
                    </div>
                  `;
            });
            document.querySelector(".page-list .articles").innerHTML = articles;
          });
      };
  
      fetchList("https://api.rawg.io/api/games", cleanedArgument);
    };
  
    const render = () => {
      pageContent.innerHTML = `
        <section class="page-list">
          <div class="articles">...loading</div>
        </section>
      `;
  
      preparePage();
    };
  
    render();
  };

  export { PageList };