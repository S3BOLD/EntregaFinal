const express = require("express");
const app = express();
const { swaggerUi, swaggerSpec } = require("./config/swagger");
const errorHandler = require("./middlewares/errorHandler");

require("./model/associations");

app.use(express.json());

app.use("/users", require("./routes/user"));
app.use("/auth", require("./routes/auth"));
app.use("/categories", require("./routes/category"));
app.use("/expenses", require("./routes/expenses"));
app.use("/dashboard", require("./routes/dashboard"));

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

app.use(errorHandler);

app.listen(3000, () => {

    console.log("Servidor rodando na porta 3000");

});

module.exports = app;