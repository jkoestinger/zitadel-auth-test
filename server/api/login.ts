export default defineEventHandler(async (event) => {

    const body = await readBody(event)

    // Creating session

    const data = {
        checks: {
            user: {
                loginName: body.username
            },
            password: {
                password: body.password
            }
        }
    }

    const url = `https://${process.env["ZITADEL_HOST"]}/v2beta/sessions`

    const sessionCreateResponse = await fetch(url, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            Authorization: `Bearer ${process.env["USER_TOKEN"]}`,
            "Content-Type": "application/json",
            "X-Zitadel-Login-Client": process.env["USER_ID"] as string
        },
    })

    const { sessionId, sessionToken } = await sessionCreateResponse.json()

    // Finalizing auth request

    const sessionFinalizeData = {
        session: { sessionId, sessionToken }
    }

    const sessionFinalizeResponse = await fetch(`https://${process.env["ZITADEL_HOST"]}/v2beta/oidc/auth_requests/${body.authRequestId}`, {
        method: 'post',
        body: JSON.stringify(sessionFinalizeData),
        headers: {
            Authorization: `Bearer ${process.env["USER_TOKEN"]}`,
            "Content-Type": "application/json",
            "X-Zitadel-Login-Client": process.env["USER_ID"] as string
        },
    })

    // Currently this fails with a "Auth Request does not exist" message
    console.log(await sessionFinalizeResponse.json())

    return ""
})
