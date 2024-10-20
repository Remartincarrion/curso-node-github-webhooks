import { envs } from "../../config";



export class DiscordService {

    private readonly discordWebhookUrl: string = envs.DISCORD_WEBHOOK_URL;

    constructor() {}


    async notify( message: string, githubEvent: string ) {

        let gifUrl:string ; 

        /**
         * 
         * added_star removed_star 
         * opened_issue closed_issue reopened_issue something_with_issue 
         * unknown
         */


        switch( githubEvent ) {

            case 'added_star':
                gifUrl = "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjc1dHBidmRsdTNhenlhemV6OGM4aXJqY24ybjV4dXdkOGVyYWJpaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3vR7fU71YbzRubte/giphy.gif" ;
            break;

            case 'removed_star':
                gifUrl = "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2dyZW8ydWppcjNxZXY2b3Q0MnY0YWllbmFkZHZoaThqM2hvNnBidSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ESgYN7LGXgIO4/giphy.gif" ;
            break;

            default: 
            gifUrl = "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHdqYmZiMm5iNTU0aGdrejhndG5tOWdleDl4YjljZzlicmczM2ZseSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wr1AiZ0UuYPny/giphy.gif";
        }

        const body = {
            content: message,
            embeds: [
                {
                    image: { url: gifUrl }
                }
            ]
        }

        const resp = await fetch( this.discordWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if ( !resp.ok ) {
            console.log("Error sending message to discord", );
            return false;
        } 

        return true;

    }


}