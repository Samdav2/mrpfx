// server.js
// Custom entry point for cPanel Phusion Passenger.
// This wraps the Next.js standalone server and handles the Passenger domain socket port correctly.

// Set environment to production
process.env.NODE_ENV = 'production';

// 1. Detect if Passenger is using a Unix Domain Socket or a Named Pipe.
// Passenger sets process.env.PORT to a socket path when reverse-proxying.
// Next.js's default server.js does:
//   const currentPort = parseInt(process.env.PORT, 10) || 3000
// Since parseInt('/path/to/socket', 10) returns NaN, it falls back to 3000, causing a 503 error.
// We override global.parseInt specifically for process.env.PORT to keep the socket path string.
if (process.env.PORT && isNaN(Number(process.env.PORT))) {
    const originalParseInt = global.parseInt;
    global.parseInt = function (value, radix) {
        if (value === process.env.PORT) {
            return value; // Return the raw socket path string instead of NaN
        }
        return originalParseInt(value, radix);
    };
}

// 2. Load the Next.js standalone server.
// We rename the generated server.js to next-server.js during deployment packaging.
require('./next-server.js');
