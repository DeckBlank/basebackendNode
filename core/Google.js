import { OAuth2Client } from "google-auth-library";
import credenciales  from "../credentials/gapi.json" assert { type: "json" };;

const GOOGLE_CLIENT_ID = credenciales.web.client_id;
console.log(GOOGLE_CLIENT_ID);

export class Google{
    static async sigIn ({ token }) {
        try {
            const client = new OAuth2Client({
                clientId: GOOGLE_CLIENT_ID,
                clientSecret: credenciales.web.client_secret,
                
            });
            console.log(client);
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            const { email, name, picture } = payload;
        return { email, name, picture }
        } catch (error) {
            throw error;
        }
    }
}