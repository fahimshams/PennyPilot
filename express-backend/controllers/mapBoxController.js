const mapBoxService = require('../services/mapboxService');

exports.suggestions = async (req, res) => {
    const { query } = req.query;
  
    try {
      // Validate input
      if (!query) {
        return res.status(400).json({ message: 'Missing required parameters' });
      }
  
      // Call Amadeus service
      const mapSuggestions = await mapBoxService.getSuggestions(query);
    
      res.status(200).json(mapSuggestions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  
  } 