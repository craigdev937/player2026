import { SER } from "./server.js";

const port = process.env.PORT || 9000;
SER.listen(port, () => {
    console.log(`Server 🌐: http://localhost:${port}`);
    console.log("Press Ctrl + C to exit.");
});


