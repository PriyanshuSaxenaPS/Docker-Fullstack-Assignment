
const express = require("express");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index", { result: null });
});

app.post("/submit", async (req, res) => {
    try {
        const { name, email, course } = req.body;

        const response = await fetch(
            `${process.env.BACKEND_URL}/submit`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, course })
            }
        );

        const result = await response.json();

        res.render("index", { result });

    } catch (error) {
        console.error(error);

        res.render("index", {
            result: {
                success: false,
                message: "Unable to connect to Flask backend."
            }
        });
    }
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Frontend running on port ${PORT}`);
});
