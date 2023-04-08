migrate((db) => {
  const collection = new Collection({
    "id": "k2bjmkv7aysbdwu",
    "created": "2023-04-03 12:59:02.538Z",
    "updated": "2023-04-03 12:59:02.538Z",
    "name": "category",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ctrzd018",
        "name": "name",
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
  const collection = dao.findCollectionByNameOrId("k2bjmkv7aysbdwu");

  return dao.deleteCollection(collection);
})
