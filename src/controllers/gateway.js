const Service = require('../../db/models').Service
const axios = require('axios')

module.exports = {
  route: (req, res) => {
    const { service_name } = req.headers
    const remaining_path = req.url

    delete req.headers.service_name

    if (!service_name) {
      return res.status(400).json({ message: "Error: No service_name specified in request header" })
    }

    Service
      .findOne({ where: { name: service_name } })
      .then(service => {
        if (!service || !service.is_active)
          return res.status(404).json({ message: `Service with name: ${service_name} does not exist` })
        else {
          const url = `${service.protocol}://${service.host}:${service.port}${remaining_path}`

          let options = {
            url,
            method: req.method,
            headers: req.headers,
            data: req.body
          }

          axios(options)
            .then(response => {
              return res.json({
                url,
                response: response.data,
                headers: response.headers
              })
            })
            .catch(error => {
              return res.json({
                url,
                response: {
                  message: error.message
                }
              })
            })
        }
          
      })
  }

}