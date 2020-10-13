console.log("pagedetail");
const PageDetail = (argument) => {
  console.log("Home", argument);

    const preparePage = () => {
      let cleanedArgument = argument.replace(/\s+/g, "-");
  
  
      const fetchGame = (url, argument) => {
        let finalURL = url + argument;
  
        fetch(`${finalURL}`)
          .then((response) => response.json())
          .then((response) => {
            console.log(response)
            let { name, released, description, background_image, clip, rating, ratings_count } = response;
            console.log(clip.clip)
            pageContent.innerHTML = `
            <section class="page-detail">
              <div class="article">
                <img class='background_image' src='${background_image}' alt='game's background'>
                <h1 class="title">${name}</h1>
                <h3>${rating}/5 on ${ratings_count} reviews</h3>
                <h5><strong>Description</strong></h5>
                <p class="descri'ption">${description}</p>
                <p class="release-date">Release date : ${released}<span></span></p>
                <h2><strong>Trailer</strong></h2>
                <video controls="controls" src="${clip.clip}"></video>
                <div id='screenshots'></div>
              </div>
            </section>
            `;
            fetch(`${finalURL}/screenshots`)
            .then((response) => response.json())
            .then((response) => {
              console.log(response)
              let screenshotsDatas = response.results.slice(0, 3)
              screenshotsDatas.forEach((sceenshotData) => {
                document.querySelector("#screenshots").insertAdjacentHTML("beforeend", `
                <img src='${sceenshotData.image}' alt="game'screenshot">
                `)
              })
            })
          });
      };
  
      fetchGame("https://api.rawg.io/api/games/", cleanedArgument);
    };
  
    const render = () => {
      pageContent.innerHTML = `
        loading...
      `;
  
      preparePage();
    };
  
    render();
  };
  
export { PageDetail };