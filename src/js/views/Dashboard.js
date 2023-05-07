import AbstractView from "./AbstractView.js";
import testImage from "../../assets/laptop.jpg"

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Dashboard");
    }

    async getHtml() {
        return `
            <h1 class="hero">Welcome back, Tony</h1>
            <p>
                Fugiat voluptate et nisi Lorem cillum anim sit do eiusmod occaecat irure do. Reprehenderit anim fugiat sint exercitation consequat. Sit anim laborum sit amet Lorem adipisicing ullamco duis. Anim in do magna ea pariatur et.
            </p>
            <div class="slider__image--wrapper">
            <img src="${testImage}" class="slider__image slider__image--2 alt="test image">
            </div>
            <p>
                <a href="/posts" data-link>View recent posts</a>.
            </p>
        `;
    }
}