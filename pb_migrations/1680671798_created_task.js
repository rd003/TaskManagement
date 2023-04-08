migrate((db) => {
  const collection = new Collection({
    "id": "fidikt6d3gjo7py",
    "created": "2023-04-05 05:16:38.624Z",
    "updated": "2023-04-05 05:16:38.624Z",
    "name": "task",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "vckxgshk",
        "name": "title",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 4,
          "max": 30,
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
  const collection = dao.findCollectionByNameOrId("fidikt6d3gjo7py");

  return dao.deleteCollection(collection);
})
