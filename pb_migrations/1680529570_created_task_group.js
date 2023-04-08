migrate((db) => {
  const collection = new Collection({
    "id": "rix9j3hnvcrmheu",
    "created": "2023-04-03 13:46:10.063Z",
    "updated": "2023-04-03 13:46:10.063Z",
    "name": "task_group",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "czzynabj",
        "name": "title",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
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
  const collection = dao.findCollectionByNameOrId("rix9j3hnvcrmheu");

  return dao.deleteCollection(collection);
})
