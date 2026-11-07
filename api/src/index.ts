import { APP } from "./App.js";

const port = process.env.PORT || 9000;
APP.listen(port, () => {
    console.log(`Server 🌐: http://localhost:${port}`);
    console.log("Press Ctrl + C to exit.");
});


