

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event)

        const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                code: query.code,
                client_id: "1035753729216-m90u57e4p62iekvjg5b25mlknrnfttjj.apps.googleusercontent.com",
                client_secret: "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",
                redirect_uri: "https://ssr.findandconsult.com",
                grant_type: "authorization_code"
            })
        })
        

        const tokens = await tokenResponse.json()
        return { status: true, tokens };
    } catch (error) {
        return { status: false, msg: error.message };
    }

});
