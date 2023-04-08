migrate((db) => {
  const collection = new Collection({
    "id": "8cgeeq3hmob047w",
    "created": "2023-04-03 13:50:17.235Z",
    "updated": "2023-04-03 13:50:17.235Z",
    "name": "task_category",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "tjiyqyok",
        "name": "task_group_id",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "pyh1uaq4",
        "name": "title",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": 4,
          "max": 20,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("8cgeeq3hmob047w");

  return dao.deleteCollection(collection);
})
