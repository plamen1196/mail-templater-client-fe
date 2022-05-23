import { environment } from './../environments/environment';

const API_URL = environment.apiUrl;

/**
 * Class that contains the API endpoints for the Email Templater Backend Service.
 */
 export class EmailTemplaterApi {

    /* Confirmation */
    public static readonly CONFIRM_EMAIL: string = `${API_URL}/confirmation/confirm`;
}
