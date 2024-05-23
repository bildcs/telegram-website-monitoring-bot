


const domainListReq = (data) =>{
    const domainList = data.map((item) => {
        return {
            text: item.domain,
            callback_data: `${item.uuid}:select`,
        }
    });   
    return {
        reply_markup: {
            inline_keyboard: [domainList]
        }
    }
}



const domainSettingsReq = (data) => {
    const domainSettingList = [
        {
            text: '🕔Last Check',
            callback_data: `${data.uuid}:lastCheck`,
        },
        {
            text: '❌Delete Domain',
            callback_data: `${data.uuid}:delete`,
        }
    ]

    return {
        reply_markup: {
            inline_keyboard: [domainSettingList]
        }
    }
    

}


module.exports = {domainListReq,domainSettingsReq}