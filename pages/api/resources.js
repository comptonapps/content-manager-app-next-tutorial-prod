import axios from "axios";


export default async function (req, res) {
    if (req.method === "GET") {
        const dataRes = await fetch(`${process.env.API_URL}/resources`);
        const data = await dataRes.json()
        return res.send(data);
    } else if (req.method === "POST" || req.method === "PATCH") {
        const { title, description, link, priority, timeToFinish, id} = req.body;
        if (!title || !description || !link || !timeToFinish || !priority) {
            return res.status(422).send("Data is missing");
        }
        const url = req.method === "POST" ? `${process.env.API_URL}/resources/` : `${process.env.API_URL}/resources/` + id;
        try {
            const response = await axios[req.method.toLowerCase()](url, req.body);
            return res.json(response.data);
        } catch(error) {
            return res.status(422).send("Data cannot be stored");
        }


    }
    console.log("messed up")

}