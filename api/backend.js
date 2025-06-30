import axios from "axios";

export default async function handler(req, res) {
  const { recurso } = req.query;
  const metodo = req.method;

  const baseURL = `https://dbgestao-1208c-default-rtdb.firebaseio.com/${recurso}`;

  try {
    if (metodo === "GET") {
      const response = await axios.get(`${baseURL}.json`);
      res.status(200).json(response.data);
    } else if (metodo === "POST") {
      const novoItem = req.body;
      const response = await axios.post(`${baseURL}.json`, novoItem);
      res.status(201).json({ id: response.data.name });
    } else if (metodo === "PATCH") {
      const { id, ...dados } = req.body;
      await axios.patch(`${baseURL}/${id}.json`, dados);
      res.status(200).json({ sucesso: true });
    } else if (metodo === "DELETE") {
      const { id } = req.query;
      await axios.delete(`${baseURL}/${id}.json`);
      res.status(200).json({ sucesso: true });
    } else {
      res.status(405).json({ erro: "Método não permitido" });
    }
  } catch (error) {
    console.error("Erro:", error.message);
    res.status(500).json({ erro: "Erro ao acessar o Firebase" });
  }
}
