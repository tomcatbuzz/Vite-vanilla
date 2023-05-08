import AbstractView from "./AbstractView.js";
import testImage from "../../assets/laptop.jpg"

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Dashboard");
        this.init()
    }

    async getHtml() {
        return `
            <h1 class="hero">Welcome back, Tony</h1>
            <p>
                Fugiat voluptate et nisi Lorem cillum anim sit do eiusmod occaecat irure do. Reprehenderit anim fugiat sint exercitation consequat. Sit anim laborum sit amet Lorem adipisicing ullamco duis. Anim in do magna ea pariatur et.
            </p>
            
            <p>
                <a href="/posts" data-link>View recent posts</a>.
            </p>
        `;
        // <div class="slider__image--wrapper">
        // <img src="${testImage}" class="slider__image slider__image--2 alt="test image">
        // </div>
    }

    init() {
        // const image = testImage
        const div = document.createElement('div')
        div.className = 'slider__image--wrapper'
        // div.innerHTML = '<img src=\"https://picsum.photos/200/300\" class="slider__image slider__image--2 alt="test image">'
        div.innerHTML = `<img src=${testImage} class="slider__image slider__image--2 alt="test image">`
        document.body.appendChild(div)
    }
    
}