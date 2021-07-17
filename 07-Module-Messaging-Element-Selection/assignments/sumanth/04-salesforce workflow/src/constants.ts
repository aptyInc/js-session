export const workflow = {
    name: 'frames flow',
    steps: [
        {
            name: 'step1',
            content: 'Click on reports',
            iframes: [],
            selector:
                'body > div.desktop.container.forceStyle.oneOne.navexDesktopLayoutContainer.lafAppLayoutHost.forceAccess.tablet > div.viewport > section > div.none.navexStandardManager > div.slds-no-print.oneAppNavContainer > one-appnav > div > one-app-nav-bar > nav > div > one-app-nav-bar-item-root:nth-child(7)',
            type: 'click',
        },
        {
            name: 'step2',
            content: 'Click on new report',
            iframes: [],
            selector:
                '#brandBand_2 > div > div > div.windowViewMode-normal.oneContent.active.lafPageHost > div > div.slds-page-header.slds-has-bottom-magnet > div > div.slds-col.slds-no-flex.slds-grid.slds-align-middle > span > ul > li:nth-child(1) > a',
            type: 'click',
        },
        {
            name: 'step3',
            content: 'Type your search keyword here',
            iframes: ['#brandBand_2 > div > div > div.windowViewMode-normal.oneContent.active.lafPageHost > iframe'],
            selector: '#modal-search-input',
            type: 'keypress',
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

export const notInDomRect = {
    top: 0,
    left: 0,
    height: 0,
    width: 0,
};
