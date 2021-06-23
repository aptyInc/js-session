import { Express, Router, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';

const currencyRouter = new Router();


currencyRouter.get('/india/:stateId', async (req: Request, res: Response) => {
    var { stateId } = req.params;
    var { appId } = req.query
    res.status(200).send("rupee " + stateId + " " + appId);
});

const validatePost = (req: Request, res: Response, next: NextFunction) => {
    try {
        var { name } = req.body;
        if (name !== 'gaurav') {
            return res.status(400).send("invalid input");
        }
        next();
    } catch(e) {
        res.status(500).send('server error')
    }
}

currencyRouter.post('/us', validatePost, async (req: Request, res: Response) => {
    var { name } = req.body;
    res.status(200).send(name);
});


export const addRoutes = (app: Express) => {
    app.use(bodyParser.json());
    app.use('/currency', currencyRouter);
}