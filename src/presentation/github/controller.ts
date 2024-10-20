import { Request, Response } from "express";
import { GithubService } from "../services/github.service";
import { DiscordService } from "../services/discord.service";



export class GithubController {



    constructor(
        private readonly githubService = new GithubService(),
        private readonly discordService = new DiscordService(),
    ){}



    webhookHandler = ( req:Request, res:Response ) => {

        const githubEvent = req.header('x-github-event') ?? 'unknown';
        const payload = req.body;
        let message:string;
        let event = 'unknown'

        switch( githubEvent ) {

            case 'star':
                message = this.githubService.onStar( payload );

                if ( !payload.starred_at ) event = 'removed_star'
                else event = 'added_star'

            break;

            case 'issues':
                message = this.githubService.onIssue( payload );

                if ( payload.action === 'opened' ) event = 'opened_issue'
                if ( payload.action === 'closed' ) event = 'closed_issue'
                if ( payload.action === 'closed' ) event = 'reopened_issue'
                else event = 'something_with_issue'

            break;

            default: 
                message = `Unknown event ${ githubEvent }`;
        }

        this.discordService.notify(message, event)
            .then( () => res.status(202).send('Acepted') )
            .catch( () => res.status(500).json({ error: 'Internal server error' }) )


    }
















}