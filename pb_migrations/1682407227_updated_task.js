migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fidikt6d3gjo7py")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fjau4evs",
    "name": "isImportant",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fidikt6d3gjo7py")

  // remove
  collection.schema.removeField("fjau4evs")

  return dao.saveCollection(collection)
})
