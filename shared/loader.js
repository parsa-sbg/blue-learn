const createLoader = (text) => {

    
    document.body.insertAdjacentHTML('beforeend', `
        <div class="loader">
            <div class="loader__anim"></div>
            ${text ? `<span class="loader__text">${text}</span>` : ``}
        </div>
    `)

    const loader = () => {
        const loaderElem = document.querySelector('.loader')


        loader.show = function () {
            loaderElem.classList.add('loader--show')
        }

        loader.hide = function () {
            loaderElem.classList.remove('loader--show')
        }
    }

    // set styles
    const style = document.createElement('style')
    style.innerHTML = `
        .loader {
            backdrop-filter: blur(5px);

            position: fixed;
            height: 100vh;
            width: 100vw;
            background-color: rgba(0, 0, 0, .7);
            z-index: 1000;
            top:0;
            bottom:0;
            left:0;
            right:0;

            transition: all 200ms ease;

        
            display: none;
            justify-content: center;
            align-items: center;
            gap: 2rem;

            opacity: 0;
            visibility: hidden;
        }

        .loader--show {
            visibility: visible;
            opacity: 1;
            display: flex;
        }
        
        .loader__text {
            font-size: 4rem;
            color: var(--text-color);
        }
        
        .loader__anim{
            border: 1rem solid #f3f3f3;
            border-radius: 100%;
            border-top: 1rem solid var(--primary-color);
            border-bottom: 1rem solid var(--primary-color);
            width: 7rem;
            height: 7rem;
            -webkit-animation: spin 2s linear infinite;
            animation: spin 2s linear infinite;
        }
        
        @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
        }
    `
    document.head.appendChild(style)



    loader()
    return loader

}

export { createLoader }