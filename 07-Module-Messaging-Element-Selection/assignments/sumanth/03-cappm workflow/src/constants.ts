export const workflow = {
    name: 'frames flow',
    steps: [
        {
            name: 'step1',
            content: 'Enter Login ID',
            iframes: [],
            selector: '#ppm_login_username',
            type: 'keypress',
        },
        {
            name: 'step2',
            content: 'Enter Password',
            iframes: [],
            selector: '#ppm_login_password',
            type: 'keypress',
        },
        {
            name: 'step3',
            content: 'Click On Login Button',
            iframes: [],
            selector: '#ppm_login_button',
            type: 'click',
        },
    ],
};

export const baloonCSS = `
.step-dialog {
	z-index: 6;
	position: fixed;
	top: 100px;
	left: 300px;
	will-change: transform;
	display: flex;
	align-items: center;
	font-family: Roboto;
	background: rgba(0, 0, 0, 0.8);
    color:white;
	min-height: 32px;
	min-width: calc(260px - 100px);
	max-width: calc(260px + 50px);
	padding: 5px 15px;
	-webkit-border-radius: 10px;
	-moz-border-radius: 10px;
	border-radius: 10px;
	word-wrap: break-word;
	cursor: default;
	-webkit-box-shadow: 0 2px 10px 0 rgb(0 0 0 / 10%);
	-moz-box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
	box-shadow: 0 2px 10px 0 rgb(0 0 0 / 10%);
	transition: box-shadow 0.6s ease;
	hyphens: none;
}

.step-dialog::after {
	content: "";
	display: block;
	position: fixed;
	width: 0;
	height: 0;
	border-color: transparent;
	border-style: solid;
	pointer-events: none;
	border-width: 5px;
	right: 100%;
	border-right-color: black;
}
`;
