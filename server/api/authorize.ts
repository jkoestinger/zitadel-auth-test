
export default defineEventHandler(async (_event) => {
    const params = {
        client_id: process.env["CLIENT_ID"] as string,
        redirect_uri: process.env["REDIRECT_URI"] as string,
        response_type: "code",
        scope: process.env["SCOPES"] as string,
        code_challenge: "9az09PjcfuENS7oDK7jUd2xAWRb-B3N7Sr3kDoWECOY", // Hardcoded for test purposes
        code_challenge_method: "S256",
    }
    const encoded = new URLSearchParams(params).toString()

    const url = `https://${process.env["ZITADEL_HOST"]}/oauth/v2/authorize?${encoded}`

    const response = await fetch(
        url
    )
    if (response.status !== 200) {
        console.error(await response.text())
        throw new Error("Invalid /authorize response")
    }

    // Assuming the url is <host>?authRequestID=...
    return response.url.split("?")[1].split("=")[1]
})
