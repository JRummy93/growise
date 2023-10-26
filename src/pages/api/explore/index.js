const Trefle_API_KEY = 'token=u07N7SHuaI0uvGrVLkiI2zWl7PLb6ZgwGAfYE9SySnA';
import dbConnect from "../../../server/db";
import Plants from "../../../server/Plants";

async function FetchTrefle(req, res) {
  if (req.method === 'GET') {
    if (req.url === '/api/explore') {
    const response = await fetch(`https://trefle.io/api/v1/plants?${Trefle_API_KEY}`);
    const data = await response.json();
    res.status(200).json(data);
  }
  } else if (req.method === 'POST') {
    if (req.url === '/api/explore') {
      if (req.body.nextPage !== undefined) {
        const nextPage = req.body.nextPage;
        const response = await fetch(`https://trefle.io${nextPage}&${Trefle_API_KEY}`);
        const data = await response.json();
        res.status(200).json(data);
      } else if (req.body.newSearchQuery.includes('q=') === true) {
        let query = req.body.newSearchQuery;
        const response = await fetch(`https://trefle.io/api/v1/plants/search?${Trefle_API_KEY}${query}`);
        const data = await response.json();   
        res.status(200).json(data);
      } else {
        const response = await fetch(`https://trefle.io/api/v1/plants?${Trefle_API_KEY}${query}`);
        const data = await response.json();
        res.status(200).json(data);
      }
      if (req.body.addPlant !== undefined) { 
        await dbConnect();
        try {
          const plant = await Plants.create(req.body);
          res.status(201).json(plant);
        } catch (error) {
          res.status(500).json({ error: "Error adding plant" });
        }
      }
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }  
  
}

export default FetchTrefle;

