import Dashboard from "./views/Dashboard.js";
import Posts from "./views/Posts.js";
import PostView from "./views/PostView.js";
import Settings from "./views/Settings.js";
import "/src/css/index.scss";

const transition = () => {
    const div = document.createElement('div');
    div.style.height = "100%";
    div.style.width = "100%";
    div.style.backgroundColor = "black";
    div.style.position = "fixed";
    div.style.zIndex = "2";
    // document.getElementById('app').appendChild(div);
    document.body.appendChild(div);
}
// transition()

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
        { path: "/settings", view: Settings }
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

// original code before 
// document.addEventListener("DOMContentLoaded", () => {
//     document.body.addEventListener("click", e => {
//         if (e.target.matches("[data-link]")) {
//             e.preventDefault();
//             navigateTo(e.target.href);
//         }
//     });

//     router();
// });

// changes adding custom event
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            const callnavigation = new CustomEvent("navigation", {
                detail: {
                    page: e.target.href,
                    // all the datas you want
                },
                bubbles: true
            });
            document.dispatchEvent(callnavigation)
        }
    });
});
const canvas = (canvas) => {
    const color = ['black', 'blue', 'red']

document.addEventListener('navigation', event => {
    const { page } = event.detail;
    console.log(page, 'page?');
    canvas.style.backgroundColor = color[0]
    console.log(transition, 'wth')
    // call custom transtion here
    // if (router.view === Posts) {
    //     canvas.style.backgroundColor = color[0]
    // } else if (page === '/settings') {
    //     canvas.style.backgroundColor = color[0]
    // }
    navigateTo(page);

    
    // router();
});
}
canvas(document.querySelector('#webgl'));