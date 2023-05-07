import Dashboard from "./views/Dashboard.js";
import Posts from "./views/Posts.js";
import PostView from "./views/PostView.js";
import Settings from "./views/Settings.js";
import Projects from './views/Projects.js';
import { transition } from "./transition3.js";
import "/src/css/index.scss";
import Cursors from "./Cursors.js";

const loaderContainer = document.querySelector('.loader-container');
window.addEventListener('load', () => {
    loaderContainer.parentElement.removeChild(loaderContainer);
})

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        { path: "/", view: Dashboard },
        { path: "/posts", view: Posts },
        { path: "/posts/:id", view: PostView },
        { path: "/settings", view: Settings },
        { path: "/projects", view: Projects }
    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }

    const view = new match.route.view(getParams(match));

    document.querySelector("#app").innerHTML = await view.getHtml();
};

window.addEventListener("popstate", router);


function addAnimation() {
    const app = document.querySelector('#app')
    app.classList.add('hidden')
}
// added this from code testing below

// original code before 
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        // const canvas = (canvas) => {
        //     const color = ['black', 'blue', 'red']
        const links = document.getElementsByClassName('headerLink')
        const currentLocation = e.target.href
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            // setTimeout(function)
            // canvas.style.backgroundColor = color[0]
            // links.classList.add('active')
            // links.style.color = color[1]
            const menuLength = links.length
            for (let i = 0; i < menuLength; i++) {
                if (links[i].href === currentLocation) {
                    links[i].classList.add('active')
                } else {
                    links[i].classList.remove('active')
                }
            }
            transition()
            setTimeout(() => {
                navigateTo(e.target.href);
            },500)
            addAnimation()
            
        } 
    // }
    // canvas(document.querySelector('#webgl'));
    });
    
    router();
    Cursors.init();
});

// changes adding custom event
// document.addEventListener("DOMContentLoaded", () => {
//     document.body.addEventListener("click", e => {
//         if (e.target.matches("[data-link]")) {
//             e.preventDefault();
//             const callnavigation = new CustomEvent("navigation", {
//                 detail: {
//                     page: e.target.href,
//                     // all the datas you want
//                 },
//                 bubbles: true
//             });
//             document.dispatchEvent(callnavigation)
            
//         }
//     });
//     const canvas = (canvas) => {
//         const color = ['black', 'blue', 'red']
    
//     window.addEventListener('navigation', event => {
//         const { page } = event.detail;
//         // call custom transtion here
//         console.log(page, 'page?');
//         console.log(event.target, 'event')
//         console.log(navigation, "nav")
//         if (page === router.routes.path.view('/')) {
//             console.log(event.target, 'dash')
//             canvas.style.backgroundColor = color[0]
//         } else if (page === 'something') {
//             canvas.style.backgroundColor = color[1]
//         } else if (event.target.Settings) {
//             canvas.style.backgroundColor = color[3]
//         }
        
//         console.log(transition, 'wth')
//         // call custom transtion here
//         // if (router.view === Posts) {
//         //     canvas.style.backgroundColor = color[0]
//         // } else if (page === '/settings') {
//         //     canvas.style.backgroundColor = color[0]
//         // }
//         navigateTo(page);
    
        
//         // router();
//     });
//     }
//     canvas(document.querySelector('#webgl'));
// });
// // const canvas = (canvas) => {
// //     const color = ['black', 'blue', 'red']

// document.addEventListener('navigation', event => {
//     const { page } = event.detail;
//     console.log(page, 'page?');
//     console.log(event, 'event')
//     canvas.style.backgroundColor = color[0]
//     console.log(transition, 'wth')
//     // call custom transtion here
//     // if (router.view === Posts) {
//     //     canvas.style.backgroundColor = color[0]
//     // } else if (page === '/settings') {
//     //     canvas.style.backgroundColor = color[0]
//     // }
//     navigateTo(page);

    
//     router();
// });
// }
// canvas(document.querySelector('#webgl'));