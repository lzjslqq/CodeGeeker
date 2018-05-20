const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

const parseJsonDateTime = datetime => {
    const timestampStr = datetime.replace(/\/Date\((\d+)\)\//, "$1");
    const timestamp = parseInt(timestampStr);
    return formatTime(new Date(timestamp));
}

const out = function(msgs) {
    let args = Array.prototype.slice.call(arguments);
    let dateStr = new Date;
    console.log("-----------------[ logcat begin ] at " + dateStr + "-------------------");
    msgs && args.forEach(function(e) {
        console.log(e);
    });
    console.log("-----------------[ logcat end ]-------------------\n\n");
}


export const common = {
    formatTime,
    parseJsonDateTime,
    out,
};