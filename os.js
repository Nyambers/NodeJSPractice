const os = require('os');

console.log(`CPU Uptime: ${os.uptime()}`)

console.log(`Avg CPU Load at 1/5/15 mins: ${os.loadavg()}`)

console.log(`Info about each CPU: ${JSON.stringify(os.cpus())}`)