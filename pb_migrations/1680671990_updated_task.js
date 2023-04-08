migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fidikt6d3gjo7py")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "j8rdevry",
    "name": "task_category_id",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cyjdlmr2",
    "name": "completed",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "x1nawdoe",
    "name": "due_date",
    "type": "date",
    "required": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "izir6iq3",
    "name": "note",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 5,
      "max": 200,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fftjjby6",
    "name": "repeat_type",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zzmag9hi",
    "name": "repeat_interval",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xn4mjdle",
    "name": "last_completed_date",
    "type": "date",
    "required": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ejxfdquu",
    "name": "reminder_date",
    "type": "date",
    "required": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fidikt6d3gjo7py")

  // remove
  collection.schema.removeField("j8rdevry")

  // remove
  collection.schema.removeField("cyjdlmr2")

  // remove
  collection.schema.removeField("x1nawdoe")

  // remove
  collection.schema.removeField("izir6iq3")

  // remove
  collection.schema.removeField("fftjjby6")

  // remove
  collection.schema.removeField("zzmag9hi")

  // remove
  collection.schema.removeField("xn4mjdle")

  // remove
  collection.schema.removeField("ejxfdquu")

  return dao.saveCollection(collection)
})
