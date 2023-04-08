migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8cgeeq3hmob047w")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tsasvmii",
    "name": "icon",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8cgeeq3hmob047w")

  // remove
  collection.schema.removeField("tsasvmii")

  return dao.saveCollection(collection)
})
