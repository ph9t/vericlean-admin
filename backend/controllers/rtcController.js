const { RtcTokenBuilder, RtcRole } = require('agora-access-token')

const appId = process.env.APP_ID
const appCert = process.env.APP_CERTIFICATE

const generateRTCToken = (req, res) => {
    res.header('Acess-Control-Allow-Origin', '*')

    const channelName = req.params.channel
    if (!channelName) {
        res.status(500)
        throw new Error('Channel is required.')
    }

    let uid = req.params.uid;
    if(!uid || uid === '') {
        res.status(500)
        throw new Error('UID is required.')
    }

    let role;
    if (req.params.role === 'publisher') {
        role = RtcRole.PUBLISHER;
    } else if (req.params.role === 'audience') {
        role = RtcRole.SUBSCRIBER
    } else {
        res.status(500)
        throw new Error('Role is incorrect.')
    }

    let expireTime = req.query.expiry;
        if (!expireTime || expireTime === '') {
        expireTime = 3600;
    } else {
        expireTime = parseInt(expireTime, 10);
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const privilegeExpireTime = currentTime + expireTime;
    
    let token;
    if (req.params.tokentype === 'userAccount') {
        token = RtcTokenBuilder.buildTokenWithAccount(appId, appCert, channelName, uid, role, privilegeExpireTime);
    } else if (req.params.tokentype === 'uid') {
        token = RtcTokenBuilder.buildTokenWithUid(appId, appCert, channelName, uid, role, privilegeExpireTime);
    } else {
        res.status(500)
        throw new Error('Token type is invalid.')
    }

    return res.json({ 'rtcToken': token })
}

module.exports = {
    generateRTCToken
}