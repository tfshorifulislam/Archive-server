import "dotenv/config";
import app from "../app/app.js";
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
