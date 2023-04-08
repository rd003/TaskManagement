migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8cgeeq3hmob047w")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fb3ocrty",
    "name": "can_modified",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8cgeeq3hmob047w")

  // remove
  collection.schema.removeField("fb3ocrty")

  return dao.saveCollection(collection)
})
