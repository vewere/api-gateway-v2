const Service = require('../../db/models').Service

module.exports = {
  registerService: (req, res) => {
    const { service_name, base_url } = req.body

    if (!service_name || !base_url) {
      return res.status(400).json({ message: "Error: No service name or base url specified" })
    }

    const url_object = new URL(base_url)

    const serviceDetails = {
      name: service_name,
      protocol: url_object.protocol.slice(0, -1),
      host: url_object.host.split(':')[0],
      port: url_object.host.split(':')[1]
    }

    Service
      .findOne({ where: { name: service_name } })
      .then(service => {
        if (service)
          return res.json({ message: `Service with name: ${service_name} already exists` })
        else
          Service
            .create(serviceDetails)
            .then(service => {
              return res.status(201).json(service)
            })
            .catch(error => {
              return res.status(400).json(error)
            })
      })
  }


}