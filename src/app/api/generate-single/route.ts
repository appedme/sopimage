import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function GET(request: NextRequest) {
    try {
        // Get parameters from query
        const { searchParams } = new URL(request.url);
        const prompt = searchParams.get('prompt');
        const modelId = searchParams.get('modelId');

        if (!prompt) {
            return NextResponse.json(
                { error: 'Prompt parameter is required' },
                { status: 400 }
            );
        }

        if (!modelId) {
            return NextResponse.json(
                { error: 'ModelId parameter is required' },
                { status: 400 }
            );
        }

        // Generate new UUIDs
        const sessionId = uuidv4();
        const userMessageId = uuidv4();
        const modelMessageId = uuidv4();

        // Build payload for single model (direct mode)
        const payload = {
            id: sessionId,
            mode: "direct",
            modelAId: modelId,
            userMessageId,
            modelAMessageId: modelMessageId,
            messages: [
                {
                    id: userMessageId,
                    role: "user",
                    content: prompt,
                    experimental_attachments: [],
                    parentMessageIds: [],
                    participantPosition: "a",
                    modelId: null,
                    evaluationSessionId: sessionId,
                    status: "pending",
                    failureReason: null
                },
                {
                    id: modelMessageId,
                    role: "assistant",
                    content: "",
                    experimental_attachments: [],
                    parentMessageIds: [userMessageId],
                    participantPosition: "a",
                    modelId: modelId,
                    evaluationSessionId: sessionId,
                    status: "pending",
                    failureReason: null
                }
            ],
            modality: "image"
        };

        // Combine cookies from your Netscape file into a single Cookie header string
        const cookieHeader = [
            '_ga=GA1.1.1179075061.1751006820',
            'perf_dv6Tr4n=1',
            'arena-auth-prod-v1=base64-eyJhY2Nlc3NfdG9rZW4iOiJleUpoYkdjaU9pSklVekkxTmlJc0ltdHBaQ0k2SWtOVFQwNHhkM05uU0hkRlNFTkNNbGNpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBjM01pT2lKb2RIUndjem92TDJoMWIyZDZiMlZ4ZW1OeVpIWnJkM1IyYjJScExuTjFjR0ZpWVhObExtTnZMMkYxZEdodmRqRWlMQ0p6ZFdJaU9pSmhNRE5tTjJZeU5DMWlaVEl5TFRRMk1Ua3RZVEprTVMxbVkyVmpaREF5WldFMU5EY2lMQ0poZFdRaU9pSmhkWFJvWlc1MGFXTmhkR1ZrSWl3aVpYaHdJam94TnpVeE1qVXhOemsyTENKcFlYUWlPakUzTlRFeU5EZ3hPVFlzSW1WdFlXbHNJam9pSWl3aWNHaHZibVVpT2lJaUxDSmhjSEJmYldWMFlXUmhkR0VpT250OUxDSjFjMlZ5WDIxbGRHRmtZWFJoSWpwN0ltbGtJam9pWkdOaVpqSmxNVFl0WmpFNU1DMDBOall3TFRrMU5tWXROakZsWVRreVl6RmlPV00wSW4wc0luSnZiR1VpT2lKaGRYUm9aVzUwYVdOaGRHVmtJaXdpWVdGc0lqb2lZV0ZzTVNJc0ltRnRjaUk2VzNzaWJXVjBhRzlrSWpvaVlXNXZibmx0YjNWeklpd2lkR2x0WlhOMFlXMXdJam94TnpVeE1EQTJPREkwZlYwc0luTmxjM05wYjI1ZmFXUWlPaUppTTJZeU9UbGlNUzFsT0dGakxUUTJaR1V0WWpnNU1DMHpZbVl6TlRRek1UTTJNemNpTENKcGMxOWhibTl1ZVcxdmRYTWlPblJ5ZFdWOS44bU9ERWExb2RoS0tfT1B5OG5PVlc3OWNTLWVRVjZ0T3IxUEQ1NmRPT2dzIiwidG9rZW5fdHlwZSI6ImJlYXJlciIsImV4cGlyZXNfaW4iOjM2MDAsImV4cGlyZXNfYXQiOjE3NTEyNTE3OTYsInJlZnJlc2hfdG9rZW4iOiJ2eGZ5am1wa3F5dGIiLCJ1c2VyIjp7ImlkIjoiYTAzZjdmMjQtYmUyMi00NjE5LWEyZDEtZmNlY2QwMmVhNTQ3IiwiYXVkIjoiYXV0aGVudGljYXRlZCIsInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiZW1haWwiOiIiLCJwaG9uZSI6IiIsImxhc3Rfc2lnbl9pbl9hdCI6IjIwMjUtMDYtMjdUMDY6NDc6MDQuNjI2OTkyWiIsImFwcF9tZXRhZGF0YSI6e30sInVzZXJfbWV0YWRhdGEiOnsiaWQiOiJkY2JmMmUxNi1mMTkwLTQ2NjAtOTU2Zi02MWVhOTJjMWI5YzQifSwiaWRlbnRpdGllcyI6W10sImNyZWF0ZWRfYXQiOiIyMDI1LTA2LTI3VDA2OjQ3OjA0LjYyNTM1NVoiLCJ1cGRhdGVkX2F0IjoiMjAyNS0wNi0zMFQwMTo0OTo1Ni40ODA5NzNaIiwiaXNfYW5vbnltb3VzIjp0cnVlfX0',
            '_ga_72FK1TMV06=GS2.1.s1751248198$o3$g1$t1751249082$j59$l0$h0',
            '__cf_bm=m9g2c93HTbAOEU8WXo.jDXpeUjRq2Wg2IXNl08eyWDI-1751249102-1.0.1.1-hk5cp.qaXX53uRIYd0WCrQnY3i6jod.UqYHpr_RAVP3NzIurCyAoRoh0gU2BSTxd3eFy0dmWcTz8o7kwbuTm58y5gOMsO16CO_JqxN1Fkjo',
            'sidebar=false',
            'ph_phc_LG7IJbVJqBsk584rbcKca0D5lV2vHguiijDrVji7yDM_posthog=%7B%22distinct_id%22%3A%22dcbf2e16-f190-4660-956f-61ea92c1b9c4%22%2C%22%24sesid%22%3A%5B1751249463034%2C%220197be86-db93-7fc2-beb5-20d16abc6da9%22%2C1751248198547%5D%2C%22%24epp%22%3Atrue%2C%22%24initial_person_info%22%3A%7B%22r%22%3A%22https%3A%2F%2Fwww.google.com%2F%22%2C%22u%22%3A%22https%3A%2F%2Flmarena.ai%2F%22%7D%7D',
            'cf_clearance=O5.mM7DBqigmvn0kjXAQ8h2UDJIPc3MhZq6VPyixlnA-1751248938-1.2.1.1-6.1XhEXCenWhsaYBTAos6TX3CzpTXyMWjvlaV79utR0v1zzAIMEfxLzbCyP7HSASXD2Ij4yJxmbN78sg._IkHgPmiADvfWT.mH2wPtPp7CJOliXfr1uE61UK.qEQOmA5DvVg71sC_bmWaGR4LJAod977WkwVqV6o2FBaDDuzyBbdkeu7f3GJvCNCZVStD4S7KdIzXJyI6HLvs9glkf_bu37P9yG8UKlOcWs.r4tNF_WFc4yywDSxaOwdDA7BGZz8HIpVdueGYhPJDrKhAaXVq7lxt8NqC0I6U9OFcgHzR2qI4iU97lJYuOvoLiDkBP1E2SDLsmVERK4uWUXjm2nZuf6244Q6ZUFNvLAKFB6DAKUvmBCC1CBd_Z6VIXE.fK.D'
        ].join('; ');

        // Headers for single model request
        const headers = {
            'accept': '*/*',
            'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
            'content-type': 'text/plain;charset=UTF-8',
            'priority': 'u=1, i',
            'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'Origin': 'https://lmarena.ai',
            'Referer': 'https://lmarena.ai/?mode=direct&chat-modality=image',
            'User-Agent': 'Mozilla/5.0',
            'Cookie': cookieHeader
        };

        // Make POST request to LM Arena API
        const response = await fetch('https://lmarena.ai/api/stream/create-evaluation', {
            method: 'POST',
            headers,
            body: JSON.stringify(payload),
            mode: 'cors',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.text();

        // Parse the response to extract image URL and mimeType
        // The response format is: a2:[{"type":"image","image":"url","mimeType":"image/webp"}] ad:{"finishReason":"stop"}
        const lines = data.split('\n').map(line => line.trim()).filter(Boolean);

        let generatedImage: { image: string; mimeType: string } | null = null;

        for (const line of lines) {
            if (line.startsWith('a2:')) {
                try {
                    const arr = JSON.parse(line.slice(3));
                    if (Array.isArray(arr) && arr[0]?.image) {
                        generatedImage = { 
                            image: arr[0].image, 
                            mimeType: arr[0].mimeType 
                        };
                    }
                } catch (error) {
                    console.error('Error parsing a2 line:', error);
                }
            }
        }

        return NextResponse.json({
            prompt,
            modelId,
            generatedImage
        });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Failed to generate response' },
            { status: 500 }
        );
    }
}
