
const express = require('express');
const app = express();
const axios = require('axios');
const port = 3000;

const CLIENT_ID = '448403106695-qmmbjaj8f5ns5r3kg45asne0cg3g0ngt.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://cred-test.onrender.com/callback';

app.get('/.well-known/assetlinks.json', (req, res) => {
    const jsonData = [{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.example.webview",
    "sha256_cert_fingerprints":
    ["F6:31:00:3A:83:49:E3:B9:F9:48:03:E8:97:2C:28:BA:3B:33:FA:F5:E4:29:53:67:13:54:92:84:20:6F:4A:FD"]
  }
}]

    //res.setHeader('Content-Disposition', 'attachment; filename="assetlinks.json');
    //res.setHeader('Content-Type', 'application/json');
    //res.status(200).send(JSON.stringify(jsonData, null, 2)); 
    res.json(jsonData);
});
app.get('/callback', async (req, res) => {
    const { code, state } = req.query;
    console.log('hello')
    

    if (code) {
        try {
            // Exchange the authorization code for an access token
            console.log(code)
            const response = await axios.post('https://oauth2.googleapis.com/token', {
                code: code,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                redirect_uri: REDIRECT_URI,
                grant_type: 'authorization_code'
            });
            

             const { access_token, refresh_token, expires_in } = response.data;
            console.log(access_token);
// , refresh_token, expires_in 
            // Save the tokens securely (e.g., in a database)
            // For demonstration, we are just sending the tokens in the response
            // res.json({
            //     access_token,
            //     refresh_token,
            //     expires_in
            // });
            // const redirectUri = `${REDIRECT_URI}?access_token=${access_token}`;
            // res.redirect(redirectUri);

        } catch (error) {
            console.error('Error exchanging code for token:', error);
            res.status(500).send('Authentication failed');
        }
    } else {
        res.status(400).send('No code provided');
    }
});

app.get('/index.html',(req,res)=>{
  res.json({"name":"hello"})
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
