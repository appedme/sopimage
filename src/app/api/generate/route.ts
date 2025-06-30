import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function GET(request: NextRequest) {
    try {
        // Get prompt from query parameters
        const { searchParams } = new URL(request.url);
        const prompt = searchParams.get('prompt');

        if (!prompt) {
            return NextResponse.json(
                { error: 'Prompt parameter is required' },
                { status: 400 }
            );
        }

        // Generate new UUIDs
        const sessionId = uuidv4();
        const userMessageId = uuidv4();
        const modelAMessageId = uuidv4();
        const modelBMessageId = uuidv4();

        // Build payload
        const payload = {
            id: sessionId,
            mode: "side-by-side",
            modelAId: "6e855f13-55d7-4127-8656-9168a9f4dcc0",
            modelBId: "bb97bc68-131c-4ea4-a59e-03a6252de0d2",
            userMessageId,
            modelAMessageId,
            modelBMessageId,
            modality: "image",
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
                    id: modelAMessageId,
                    role: "assistant",
                    content: "",
                    experimental_attachments: [],
                    parentMessageIds: [userMessageId],
                    participantPosition: "a",
                    modelId: "6e855f13-55d7-4127-8656-9168a9f4dcc0",
                    evaluationSessionId: sessionId,
                    status: "pending",
                    failureReason: null
                },
                {
                    id: modelBMessageId,
                    role: "assistant",
                    content: "",
                    experimental_attachments: [],
                    parentMessageIds: [userMessageId],
                    participantPosition: "b",
                    modelId: "69bbf7d4-9f44-447e-a868-abc4f7a31810",
                    evaluationSessionId: sessionId,
                    status: "pending",
                    failureReason: null
                }
            ]
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

        // Headers
        const headers = {
            'Content-Type': 'text/plain;charset=UTF-8',
            'Accept': '*/*',
            'Origin': 'https://lmarena.ai',
            'Referer': 'https://lmarena.ai/?mode=side-by-side&chat-modality=image',
            'User-Agent': 'Mozilla/5.0',
            'Cookie': cookieHeader
        };

        // Make POST request to LM Arena API
        const response = await fetch('https://lmarena.ai/api/stream/create-evaluation', {
            method: 'POST',
            headers,
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.text();

        // Return the response as plain text
        return new NextResponse(data, {
            headers: {
                'Content-Type': 'text/plain',
            },
        });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Failed to generate response' },
            { status: 500 }
        );
    }
}
