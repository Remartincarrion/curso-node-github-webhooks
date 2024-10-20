import { GitHubIssuePayload, GitHubStarPayload } from "../../interfaces";



export class GithubService {

    constructor() {}


    onStar( payload:GitHubStarPayload ): string {

        let message:string = '';

        const { action, sender, repository, starred_at } = payload

        if( starred_at ) {
            message = `User ${ sender.login } **is awesome** ${ action } star on ${ repository.full_name }`;
        } else {
            message = `User ${ sender.login } **is boring** and ${ action } star on ${ repository.full_name }`;
            
        }

        return message;
    }


    onIssue( payload:GitHubIssuePayload ) {

        const { action, issue } = payload;

        if( action === 'opened' ) return `An issue was opened with this title ${ issue.title }`
        if( action === 'closed' ) return `An issue was closed by ${ issue.user.login }`
        if( action === 'reopened' ) return `An issue was reopened by ${ issue.user.login }`

        return `Unhandled action for the issue event ${ action }`


    }


}