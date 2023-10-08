// Helps links
// https://wesbos.com/template-strings-html
// https://stackoverflow.com/questions/14379274/how-to-iterate-over-a-javascript-object
// Author Havryliuk Serhii

const root = document.getElementById('root');

// Function for generate Tank Preview Page
function generateTanksPreviewPage(){


    // добавляем hash нашим танкам (формируем из имени, удаляем пробел)
    for (let key in tanks) {
        tanks[key].hash = tanks[key].model.replace(/\s/g, '_')
    }

    // из шаблона формируем страницу Tank Preview Page
    let tankPreviewPage = `
                <h1> Most popular tanks</h1>
               `;

    // в цикле добавляем все танки (формируем из html шаблона)
    for (let key in tanks) {
        tankPreviewPage += `
            <a href="#${tanks[key].hash}"
                <div class="thumbnails-tank">
                    <img src="${tanks[key].preview}" alt="tank img">
                    <div class="thumbnails-tank-info">
                        <img src="${tanks[key].country_image}" alt="flag">
                        <span> ${tanks[key].level} </span>
                        <span> ${tanks[key].model} </span>
                    </div>

                </div>
            </a>
        `;
    }

    // добавляем сгенерированный HTML в DOM
    root.innerHTML = tankPreviewPage;

    // remove the hash from window.location (URL)
    // https://stackoverflow.com/questions/1397329/how-to-remove-the-hash-from-window-location-url-with-javascript-without-page-r
    history.pushState("", document.title, window.location.pathname
        + window.location.search);
}

// Function for generate Tank Details Page
function generateTankDetailsPage(e){

    // находим танк по которому кликнули (сравниваем хештег кликнутого танка с со всеми танками)
    let tankDetails = tanks.find(data => '#' + data.hash === window.location.hash);

    // из шаблона формируем страницу Tank Details Page
    let tankDetailsTemplate = `
        <div class="tank-details">
        <h1>
            <img src="${tankDetails.country_image}" alt="country image">
            <span> ${tankDetails.model} </span>
            <span> (level ${tankDetails.level}) </span>
        </h1>
        <div class="tank-details-container">
            <div class="tank-details-left">
                <h3> Preview </h3>
                <img class="tank-details-img" src="${tankDetails.preview}">
            </div>

            <div class="tank-details-right">
                <h3> Characteristic </h3>
                <table>
                    <tr>
                        <td> damage </td>
                        <td> ${tankDetails.details.damage} </td>
                    </tr>
                    <tr>
                        <td> breoning </td>
                        <td> ${tankDetails.details.breoning} </td>
                    </tr>
                    <tr>
                        <td> attack speed </td>
                        <td> ${tankDetails.details.attack_speed} </td>
                    </tr>
                    <tr>
                        <td> time of targeting </td>
                        <td> ${tankDetails.details.time_of_targeting} </td>
                    </tr>
                    <tr>
                        <td> ammunition </td>
                        <td> ${tankDetails.details.ammunition} </td>
                    </tr>
                </table>
            </div>
        </div>
        <span class="btn-back" onclick="generateTanksPreviewPage()">Back to list view</span>
    </div>
    `;

    // добавляем сгенерированный HTML в DOM
    root.innerHTML = tankDetailsTemplate;
}

// todo: вопрос не сработал onhashchange заменил на hashchange -->  нужно почитать
// window.addEventListener('onhashchange', generateTankDetails);
window.addEventListener("hashchange", generateTankDetailsPage);

// при старте стр генерним Tanks Preview Page
generateTanksPreviewPage();