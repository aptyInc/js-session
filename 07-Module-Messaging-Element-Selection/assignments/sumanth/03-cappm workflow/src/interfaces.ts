export interface IStep {
    name: string;
    content: string;
    iframes: string[];
    selector: string;
    type: string;
}

export interface IWorkflow {
    name: string;
    steps: IStep[];
}

export interface IMessage {
    type: string;
    [key: string]: any;
}
export interface IRectangle {
    height: number;
    width: number;
    top: number;
    left: number;
    [key: string]: any;
}
