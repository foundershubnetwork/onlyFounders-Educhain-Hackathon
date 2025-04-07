import axios from "axios";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { AxiosResponse } from "axios";

interface User {
    email: string;
    [key: string]: any;
}

interface Auth0Response {
    data: User[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

    try {
        const { email } = req.body as { email: string };
        if (!email) return res.status(400).json({ error: "Email is required" });

        // Get Auth0 Management API Token
        const { accessToken } = await getAccessToken(req, res, {
            scopes: "read:users",
        });

        // Query Auth0 to check if the user exists
        const response: AxiosResponse<Auth0Response> = await axios.get(
            `https://${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users-by-email?email=${encodeURIComponent(email)}`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        if (response.data.length === 0) {
            return res.json({ exists: false });
        }

        return res.json({ exists: true, user: response.data[0] });
    } catch (error: any) {
        console.error("Auth0 Error:", error.response?.data || error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
